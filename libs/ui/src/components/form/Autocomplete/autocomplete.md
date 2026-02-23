# Autocomplete — AI Build Instructions

> Goal: Implement an agnostic, accessible, and high‑performance Autocomplete component usable for search boxes, dataset filters, tag inputs, and command palettes. Keep it framework-idiomatic (React), type-safe (TypeScript), testable, and styling-agnostic (SCSS or Tailwind adapters allowed).

---

## Implementation Note (February 2026)

**Internal Architecture**: The Autocomplete component is now built on top of MUI's Autocomplete component internally, while maintaining 100% API compatibility with the original implementation. This provides:

- Better accessibility out of the box (WAI-ARIA compliance)
- Improved keyboard navigation
- Better integration with MUI theming
- Reduced bundle size (reuses MUI code)

**Custom Features on Top of MUI**:
1. **Ghost text** (inline completion) - Uses a positioned overlay for visual ghost text
2. **Debounced onChange** - Configurable debounce timing via `debounceMs`
3. **minChars gate** - Minimum characters before triggering onChange
4. **Density scaling** - Uses `useDensitySpacing` hook for UI density support
5. **Fuzzy matching** - Custom filterOptions implementation for fuzzy match mode

**Extracted Hooks**:
- `hooks/useFilterOptions.ts` - Creates MUI-compatible filter functions for startsWith, contains, and fuzzy matching
- `hooks/useGhostText.ts` - Manages ghost text computation and Tab/ArrowRight completion logic

---

## 1) Summary

- **Pattern**: ARIA Combobox with popup listbox.
- **Input**: Controlled string value (`value`, `onChange`).
- **Suggestions**: Controlled array of generic items (`T`).
- **Selection**: Emits `onSelect(item)`; optional multi-select with chips.
- **Inline completion**: Optional ghost remainder and `Tab/→` acceptance.
- **Modes**: Free text, async (remote), multiple (chips), custom render, command palette.
- **Performance**: Debounce, precompute highlights, (optional) virtualization for large lists.

---

## 2) Non-Functional Constraints

- **Accessibility first**: Follow WAI-ARIA Combobox with Listbox pattern.
- **No global side effects**: All listeners cleaned up; no scroll lock needed.
- **No external heavy deps**: Avoid large libs; expose escape hatches for virtualization.
- **Deterministic focus**: Works keyboard-only; predictable `Tab` order.
- **SSR-friendly**: Guard window/document usage.

---

## 3) Public API (TypeScript)

```ts
export interface AutocompleteProps<T = any> {
  /** Controlled input value */
  value: string;
  /** Input value change */
  onChange: (val: string) => void;

  /** Suggestion items (generic) */
  suggestions: T[];
  /** Unique key extractor */
  getKey?: (item: T) => string;
  /** Text label extractor */
  getLabel?: (item: T) => string;
  /** Optional description extractor (for SR and UI) */
  getDescription?: (item: T) => string | undefined;
  /** Custom row renderer */
  renderSuggestion?: (item: T, state: { active: boolean; query: string }) => React.ReactNode;
  /** Called when a suggestion is chosen */
  onSelect?: (item: T) => void;

  /** Allow values not in suggestions */
  allowFreeText?: boolean;
  /** Enable multiple selection (chips) */
  multiple?: boolean;
  /** Selected items in multiple mode */
  selectedItems?: T[];
  /** Update selected items in multiple mode */
  onSelectedItemsChange?: (items: T[]) => void;

  /** Async mode flags */
  async?: boolean;
  isLoading?: boolean;
  /** Debounce in ms for local filtering or remote fetch triggers */
  debounceMs?: number;

  /** Inline completion remainder visibility */
  showGhostText?: boolean;
  /** Case/fuzzy options (local filtering only) */
  matchMode?: 'startsWith' | 'contains' | 'fuzzy';

  /** A11y & structure */
  id?: string; // base id for combobox; derive popup ids from this
  inputAriaLabel?: string; // if no visible label is present
  placeholder?: string;
  autoFocus?: boolean;

  /** Styling hooks */
  className?: string; // root
  inputClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  chipClassName?: string;

  /** Portal the popup if desired */
  portal?: boolean | { container?: Element };
  /** Max visible items before scroll */
  maxVisibleItems?: number;
}
```

**Defaults**

- `getKey = (i:any) => String((i && (i.id ?? i.key ?? i.value ?? i.label)) ?? i)`
- `getLabel = (i:any) => String(i?.label ?? i?.name ?? i?.text ?? i)`
- `debounceMs = 150`, `matchMode = 'contains'`, `showGhostText = true`

---

## 4) States & Derived Data

- `open: boolean` — popup visibility.
- `activeIndex: number` — highlighted suggestion index (−1 when none).
- `ghost: string` — inline completion remainder (if enabled).
- `inputValue: string` — mirror of `value` for IME composition handling.
- `composition: boolean` — true during IME composition (don’t navigate).
- `listId`, `activeId` — derived for aria.

Derived collections:

- `filteredSuggestions` — if **local** filtering is used; otherwise pass-through.
- `virtualWindow` — optional slice when virtualizing.

---

## 5) Accessibility (MUST)

Implement WAI-ARIA **Combobox** w/ **Listbox**:

- Input element: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls={listId}`, `aria-activedescendant={activeId || undefined}`.
- Popup list: `role="listbox"`, owns `role="option"` children with `id`.
- Keyboard:
  - `ArrowDown/ArrowUp`: move active item; open if closed and suggestions exist.
  - `Enter`: select active item (or submit free text if allowed).
  - `Tab` or `ArrowRight` when `ghost` present: accept remainder.
  - `Esc`: close popup, keep focus in input; second `Esc` clears value (optional).
  - Respect **IME composition**: ignore arrows/enter while composing.

- Focus trap not required; focus stays in input; popup click should not blur input prematurely.
- Screen reader announcements: update `aria-activedescendant` and include label + optional description via `aria-describedby`.

---

## 6) Behavior Spec

### Opening/Closing

- Open when input has focus and there are suggestions (or async loading) and either `value.length > 0` or `force open` rules.
- Close on: blur (after short timeout to allow click), `Esc`, selection, or when input emptied (configurable).

### Inline Ghost Text

- Compute `ghost` only if `showGhostText` and first suggestion label startsWith query (case-insensitive).
- Accept remainder on `Tab` or `ArrowRight`.

### Selection

- Single mode: `onSelect(item)` and optionally fill `value = getLabel(item)`.
- Multiple mode: append to `selectedItems` if not present; clear input; keep popup open.

### Async

- When `async=true`, **do not** filter locally unless asked; instead emit `onChange` with debounced value to trigger upstream fetch. Show spinner when `isLoading`.

### Virtualization (optional)

- If `suggestions.length > 200`, allow `virtualize=true` in future; for now expose `maxVisibleItems` with overflow scroll. Keep active item scrolled into view.

---

## 7) Rendering Structure (Reference)

```tsx
<div className={cx('ac-root', className)} id={id}>
  {multiple && <Chips ... />}
  <div className="ac-inputWrap">
    <input /* combobox roles/attrs */ />
    {showGhostText && <span className="ac-ghost" aria-hidden>{ghost}</span>}
    {isLoading && <Spinner className="ac-spinner" />}
  </div>
  {open && (
    <PortalIf portal={portal}>
      <ul role="listbox" id={listId} className={listClassName}>
        {visibleItems.map((it, i) => (
          <li role="option"
              id={optionId(i)}
              aria-selected={i===activeIndex}
              className={cx(itemClassName, i===activeIndex && activeItemClassName)}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(it)}>
            {renderSuggestion ? renderSuggestion(it, { active: i===activeIndex, query: value }) : (
              <DefaultRow label={getLabel(it)} query={value} />
            )}
          </li>
        ))}
      </ul>
    </PortalIf>
  )}
</div>
```

---

## 8) Keyboard Map

- **ArrowDown/Up**: cycle active; wrap disabled by default.
- **Enter**: select active; if no active and `allowFreeText`, confirm free text.
- **Tab/→**: accept ghost remainder (if any).
- **Esc**: close popup; keep input value.
- **Backspace** (multiple): remove last chip when input empty.

---

## 9) Styles (agnostic contract)

Provide minimal class hooks and CSS vars; leave theme to DS:

- `.ac-root`, `.ac-inputWrap`, `.ac-ghost`, `.ac-spinner`, `.ac-list`, `.ac-item`, `.ac-item--active`, `.ac-chip`.
- CSS vars: `--ac-radius`, `--ac-shadow`, `--ac-maxHeight`, `--ac-gap`.

Ghost text is positioned as a twin overlay behind the caret (use a stacked container with the real input on top, or pseudo-element when using monospace; choose the twin overlay approach for variable fonts).

---

## 10) Performance Notes

- Debounce input changes (default 150ms). Cancel on unmount.
- Memoize derived labels and highlight splits.
- Keep scrolling of active item cheap (use `scrollIntoView({ block: 'nearest' })`).
- Avoid reflow on every key by not measuring DOM repeatedly.

---

## 11) Testing Checklist

**Unit/Interaction**

- Open/close rules; blur timeout click-through works.
- Keyboard nav including IME composition guard.
- Ghost acceptance on `Tab/→`.
- `onSelect` called with correct item.
- Multiple mode: chip add/remove; backspace behavior.
- Async: spinner visibility; no local filter unless configured.
- A11y: roles, aria-\* updates, `aria-activedescendant` correctness.

**Visual/Stories**

- Default, Ghost Text, Async Loading, Multiple Tags, Custom Renderer, Accessibility story.

**Performance**

- 500-suggestion interaction within 16ms budget for nav.

Run via:

```bash
cd packages/ui
pnpm check:component inputs Autocomplete
```

---

## 12) File & Story Structure

```
packages/ui/src/inputs/autocomplete/
  Autocomplete.tsx
  Autocomplete.types.ts
  Autocomplete.scss (or .css / Tailwind variant)
  index.ts
  __tests__/Autocomplete.stories.tsx
  __tests__/Autocomplete.interactions.test.tsx
```

Storybook stories to include:

- `Inputs/Autocomplete/Default`
- `Inputs/Autocomplete/WithGhostText`
- `Inputs/Autocomplete/AsyncLoading`
- `Inputs/Autocomplete/MultipleTags`
- `Inputs/Autocomplete/CustomRenderer`
- `Inputs/Autocomplete/Accessibility`

---

## 13) Pseudocode (Core Hooks)

```ts
useEffect(() => {
  if (!showGhostText) return setGhost('');
  const first = suggestions[0];
  const label = first ? getLabel(first) : '';
  const q = value ?? '';
  if (!q || !label) return setGhost('');
  if (label.toLowerCase().startsWith(q.toLowerCase())) setGhost(label.slice(q.length));
  else setGhost('');
}, [value, suggestions, showGhostText]);

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (composition) return; // IME guard
  switch (e.key) {
    case 'ArrowDown':
      openIfAny();
      move(+1);
      e.preventDefault();
      break;
    case 'ArrowUp':
      move(-1);
      e.preventDefault();
      break;
    case 'Enter':
      selectActiveOrFreeText();
      e.preventDefault();
      break;
    case 'Tab':
    case 'ArrowRight':
      if (ghost) {
        acceptGhost();
        e.preventDefault();
      }
      break;
    case 'Escape':
      close();
      break;
  }
};
```

---

## 14) Definition of Done (DOD)

- API implemented with defaults; zero ESLint/TS errors.
- Full ARIA combobox compliance; keyboard-only usable.
- Stories + interaction tests passing.
- No memory leaks; event listeners cleaned on unmount.
- Handles 500 suggestions smoothly; optional virtualization path documented.
- Docs updated with examples for search, filter, and command palette scenarios.

---

## 15) Testing

### Test IDs Overview

This section describes all `data-testid` attributes available in the Autocomplete component for testing purposes.

### Container Elements

#### `autocomplete-container`
- **Element:** Root container Box
- **Location:** Main wrapper element containing the entire autocomplete
- **Usage:** Query the root container to verify component is rendered
```typescript
const container = await canvas.findByTestId('autocomplete-container');
expect(container).toBeInTheDocument();
```

#### `selected-items-container`
- **Element:** Container for selected item chips (multiple mode only)
- **Location:** ChipContainer Box that wraps all selected chips
- **Conditional:** Only rendered when `multiple={true}` and `selectedItems.length > 0`
- **Usage:** Query container to verify chips are rendered
```typescript
const chipContainer = await canvas.findByTestId('selected-items-container');
expect(chipContainer).toBeInTheDocument();
```

### Chip Elements (Multiple Mode)

#### `selected-chip-${index}`
- **Element:** Individual selected item chip
- **Location:** Each Chip component in the selected items container
- **Conditional:** Only in multiple mode with selected items
- **Index:** Zero-based index of selected item
- **Usage:** Query specific chips or all chips
```typescript
// Get all chips
const chips = await canvas.findAllByTestId(/selected-chip-/);
expect(chips).toHaveLength(2);

// Get specific chip
const firstChip = await canvas.findByTestId('selected-chip-0');
expect(firstChip).toHaveTextContent('Option 1');
```

### Dropdown Elements

#### `suggestions-dropdown`
- **Element:** Dropdown Paper container
- **Location:** MUI Paper component that wraps the suggestions list
- **Conditional:** Only rendered when dropdown is `open`
- **Usage:** Query to verify dropdown is visible
```typescript
// Wait for dropdown to appear
const dropdown = await canvas.findByTestId('suggestions-dropdown');
expect(dropdown).toBeVisible();
```

#### `suggestions-list`
- **Element:** List element containing all suggestions
- **Location:** MUI List component inside the dropdown Paper
- **Conditional:** Only rendered when dropdown is `open`
- **Usage:** Query list to get suggestions container
```typescript
const list = await canvas.findByTestId('suggestions-list');
expect(list).toBeInTheDocument();

// Count suggestions
const items = await within(list).findAllByRole('option');
expect(items).toHaveLength(expectedCount);
```

#### Suggestion Items (ARIA-based)
- **Element:** Individual suggestion list items
- **Location:** Each option in the MUI Autocomplete listbox
- **Query Method:** Use ARIA roles instead of test IDs
- **Usage:** Query options via role
```typescript
// Get all options using ARIA role (recommended approach)
const options = await canvas.findAllByRole('option');
expect(options).toHaveLength(5);

// Click first option
await userEvent.click(options[0]);
```
> **Note (Feb 2026):** The `suggestion-item-${index}` test IDs were removed when migrating to MUI Autocomplete internally. Use ARIA role queries (`getByRole('option')`) for better accessibility-based testing.

### Test Patterns

#### Single Selection Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Find input and type
  const input = canvas.getByRole('combobox');
  await userEvent.type(input, 'test');

  // Wait for dropdown to appear
  const dropdown = await canvas.findByTestId('suggestions-dropdown');
  expect(dropdown).toBeVisible();

  // Get suggestions
  const suggestions = await canvas.findAllByTestId(/suggestion-item-/);
  expect(suggestions.length).toBeGreaterThan(0);

  // Click first suggestion
  await userEvent.click(suggestions[0]);

  // Verify selection
  expect(args.onSelect).toHaveBeenCalled();
}
```

#### Multiple Selection Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByRole('combobox');

  // Select first item
  await userEvent.type(input, 'option 1');
  const dropdown1 = await canvas.findByTestId('suggestions-dropdown');
  const suggestion1 = await within(dropdown1).findByTestId('suggestion-item-0');
  await userEvent.click(suggestion1);

  // Wait for chip to appear
  await waitFor(async () => {
    const chip = await canvas.findByTestId('selected-chip-0');
    expect(chip).toBeInTheDocument();
  }, { timeout: 1000 });

  // Clear input
  await userEvent.clear(input);

  // Select second item
  await userEvent.type(input, 'option 2');
  const dropdown2 = await canvas.findByTestId('suggestions-dropdown');
  const suggestion2 = await within(dropdown2).findByTestId('suggestion-item-0');
  await userEvent.click(suggestion2);

  // Verify both chips exist
  await waitFor(async () => {
    const chips = await canvas.findAllByTestId(/selected-chip-/);
    expect(chips).toHaveLength(2);
  }, { timeout: 1000 });
}
```

#### Remove Selected Item Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for chips to render
  const chips = await canvas.findAllByTestId(/selected-chip-/);
  expect(chips).toHaveLength(2);

  // Click delete button on first chip
  const deleteButton = within(chips[0]).getByTestId('CancelIcon');
  await userEvent.click(deleteButton);

  // Verify chip was removed
  await waitFor(async () => {
    const remainingChips = await canvas.findAllByTestId(/selected-chip-/);
    expect(remainingChips).toHaveLength(1);
  }, { timeout: 1000 });

  // Verify callback was called
  expect(args.onSelectedItemsChange).toHaveBeenCalled();
}
```

#### Dropdown Visibility Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByRole('combobox');

  // Initially, dropdown should not exist
  expect(canvas.queryByTestId('suggestions-dropdown')).not.toBeInTheDocument();

  // Type to trigger dropdown
  await userEvent.type(input, 'test');

  // Wait for dropdown to appear
  await waitFor(async () => {
    const dropdown = await canvas.findByTestId('suggestions-dropdown');
    expect(dropdown).toBeVisible();
  }, { timeout: 1000 });

  // Press Escape to close
  await userEvent.keyboard('{Escape}');

  // Verify dropdown is gone
  await waitFor(() => {
    expect(canvas.queryByTestId('suggestions-dropdown')).not.toBeInTheDocument();
  }, { timeout: 500 });
}
```

#### Keyboard Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByRole('combobox');
  await userEvent.type(input, 'test');

  // Wait for suggestions
  await canvas.findByTestId('suggestions-dropdown');
  const suggestions = await canvas.findAllByTestId(/suggestion-item-/);

  // Press ArrowDown to highlight first item
  await userEvent.keyboard('{ArrowDown}');

  // Verify first item is highlighted (via aria-selected or background color)
  const firstItem = suggestions[0];
  expect(firstItem).toHaveAttribute('aria-selected', 'true');

  // Press Enter to select
  await userEvent.keyboard('{Enter}');

  // Verify dropdown closes
  await waitFor(() => {
    expect(canvas.queryByTestId('suggestions-dropdown')).not.toBeInTheDocument();
  }, { timeout: 500 });
}
```

#### Ghost Text Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByRole('combobox');

  // Type partial match
  await userEvent.type(input, 'opt');

  // Wait for suggestions
  await canvas.findByTestId('suggestions-dropdown');

  // Verify input value (ghost text is visual only, not in input value)
  expect(input).toHaveValue('opt');

  // Press Tab to accept ghost text
  await userEvent.tab();

  // Input should now have complete value
  expect(input).toHaveValue('option'); // Assuming ghost suggested "option"
}
```

### Props That Affect Test Behavior

#### `multiple`
- **Type:** `boolean`
- **Default:** `false`
- **Impact:**
  - When `true`: Shows chips, allows multiple selections
  - When `false`: Single selection only, no chips
- **TestIds affected:**
  - `selected-items-container` (only when true)
  - `selected-chip-${index}` (only when true)

#### `allowFreeText`
- **Type:** `boolean`
- **Default:** `true`
- **Impact:** When true, allows user to submit text not in suggestions

#### `async`
- **Type:** `boolean`
- **Default:** `false`
- **Impact:** When true, shows loading spinner while fetching suggestions

#### `showGhostText`
- **Type:** `boolean`
- **Default:** `true`
- **Impact:** When true, shows inline suggestion completion

#### `maxVisibleItems`
- **Type:** `number`
- **Default:** `10`
- **Impact:** Limits number of suggestions shown in dropdown

### Common Test Scenarios

#### 1. Basic Rendering
```typescript
const container = await canvas.findByTestId('autocomplete-container');
expect(container).toBeInTheDocument();

const input = canvas.getByRole('combobox');
expect(input).toBeInTheDocument();
```

#### 2. Suggestions Appear on Input
```typescript
const input = canvas.getByRole('combobox');
await userEvent.type(input, 'search term');

const dropdown = await canvas.findByTestId('suggestions-dropdown');
expect(dropdown).toBeVisible();
```

#### 3. Clicking a Suggestion
```typescript
await userEvent.type(input, 'test');
const suggestions = await canvas.findAllByTestId(/suggestion-item-/);
await userEvent.click(suggestions[0]);

expect(args.onSelect).toHaveBeenCalledWith(expectedItem);
```

#### 4. Multiple Selections
```typescript
// Make selections...
const chips = await canvas.findAllByTestId(/selected-chip-/);
expect(chips).toHaveLength(expectedCount);
```

#### 5. Removing a Selection
```typescript
const chip = await canvas.findByTestId('selected-chip-0');
const deleteButton = within(chip).getByTestId('CancelIcon');
await userEvent.click(deleteButton);

await waitFor(() => {
  expect(canvas.queryByTestId('selected-chip-0')).not.toBeInTheDocument();
});
```

### Troubleshooting

#### Issue: "Unable to find dropdown"

**Reason:** Dropdown only renders when `open` state is true

**Solution:** Type in input first to trigger dropdown:
```typescript
const input = canvas.getByRole('combobox');
await userEvent.type(input, 'text');
const dropdown = await canvas.findByTestId('suggestions-dropdown');
```

#### Issue: "Chip testIds not found"

**Reason:** Chips only render in `multiple` mode with selected items

**Solution:** Verify component has `multiple={true}` and items are selected:
```typescript
// Only query chips if multiple mode is enabled
if (args.multiple) {
  const chips = await canvas.findAllByTestId(/selected-chip-/);
}
```

#### Issue: "Test timing out when finding suggestions"

**Reason:** Debounce delay or async loading

**Solution:** Increase timeout and wait for dropdown:
```typescript
await waitFor(async () => {
  const suggestions = await canvas.findAllByTestId(/suggestion-item-/);
  expect(suggestions.length).toBeGreaterThan(0);
}, { timeout: 2000 });
```

#### Issue: "Suggestions not visible after typing"

**Reason:** No matching suggestions or `open` state is false

**Solution:** Check filtered results and verify suggestions exist:
```typescript
// Check if dropdown exists at all
const dropdown = canvas.queryByTestId('suggestions-dropdown');
if (!dropdown) {
  // Dropdown didn't open - check why
  // - Is there a matching suggestion?
  // - Was user closed dropdown previously?
}
```

### Best Practices

1. **Always wait for dropdown** before querying suggestions
2. **Use regex patterns** for dynamic testIds: `/selected-chip-/`, `/suggestion-item-/`
3. **Check conditional rendering** before asserting existence (multiple mode, open state)
4. **Clear input between selections** in multiple mode tests
5. **Use waitFor** when expecting DOM changes (chips added/removed, dropdown opens/closes)
6. **Account for debounce** - default 150ms delay before suggestions update

### Related Elements Without TestIds

#### Input Field
- **Query Method:** `canvas.getByRole('combobox')`
- **ARIA Attributes:**
  - `role="combobox"`
  - `aria-expanded` (true when dropdown open)
  - `aria-controls` (points to listbox ID)
  - `aria-activedescendant` (points to active suggestion)

#### List Container
- **Query Method:** `canvas.getByRole('listbox')`
- **Location:** The List element inside `suggestions-list` testId

#### List Items
- **Query Method:** `canvas.getAllByRole('option')`
- **Alternative:** Use `suggestion-item-${index}` testIds

#### Ghost Text
- **No direct query** - visual only, not in DOM as queryable element
- **Test approach:** Verify behavior by Tab/ArrowRight completion

### Change Log

- **2026-02-06:** Refactored to use MUI Autocomplete internally
  - Maintains 100% API compatibility
  - Extracted `useFilterOptions` and `useGhostText` hooks
  - Removed `suggestion-item-${index}` test IDs (use ARIA roles instead)
  - Improved accessibility and keyboard navigation
- **2025-10-08:** Initial testId implementation
  - Added `autocomplete-container`
  - Added `selected-items-container`
  - Added `selected-chip-${index}`
  - Added `suggestions-dropdown`
  - Added `suggestions-list`
  - Added `suggestion-item-${index}`
