# Calendar / DatePicker — AI Implementation Description

A reusable calendar that supports **single date selection** and **date range selection (Airbnb-style)** with hover preview, dual-month layout, and full keyboard/a11y support.

---

## Purpose

- Let users pick a **single date** or a **start–end range**.
- Work as an inline calendar, a popover/popup attached to an input, or an always-visible panel.
- Be locale-aware and accessible.

---

## Core UX

- **Header** with month/year and previous/next controls.
- **Month grid** (role `grid`) with weekday headers and day cells (role `gridcell`).
- **Range hover preview**: when a start date is chosen, hovering days previews the end.
- **Dual month** layout for range mode (configurable).
- **Disabled/unavailable days** visibly blocked and non-interactive.
- Optional **footer** with Clear/Apply.

---

## Public API (TypeScript)

```ts
type SelectionMode = 'single' | 'range';

export interface DateRange {
  start?: Date | null;
  end?: Date | null;
}

export interface CalendarProps {
  // Mode
  selectionMode?: SelectionMode; // default: 'single'

  // Controlled values
  value?: Date | null; // single mode
  range?: DateRange; // range mode
  onChange?: (value: Date | null) => void; // single
  onRangeChange?: (range: Required<DateRange>) => void; // fired when both ends chosen
  onIntermediateRangeChange?: (partial: DateRange) => void; // while hovering/choosing

  // Display
  numberOfMonths?: number; // default: 1 in single, 2 in range
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // default: locale
  locale?: string; // e.g. 'en-US'
  showOutsideDays?: boolean; // days from prev/next month
  showWeekNumbers?: boolean;

  // Constraints
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean; // business logic disable
  minRangeLength?: number; // nights, default 1
  maxRangeLength?: number;

  // Behavior
  allowSameDayRange?: boolean; // default: true
  closeOnSelect?: boolean; // for popover host; default: single=true, range=when both set
  fixedRange?: boolean; // pick start then auto-calc end by minRangeLength
  autoFocus?: boolean;

  // Rendering hooks
  renderDay?: (args: {
    date: Date;
    inCurrentMonth: boolean;
    selected: boolean;
    inRange: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
    disabled: boolean;
    today: boolean;
  }) => React.ReactNode;
  renderHeader?: (ctx: { month: number; year: number }) => React.ReactNode;
  renderFooter?: React.ReactNode;

  // Styling hooks
  className?: string;
  dayClassName?: (args: {
    date: Date;
    inCurrentMonth: boolean;
    selected: boolean;
    inRange: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
    disabled: boolean;
    today: boolean;
    hovered?: boolean;
  }) => string;
}
```

**Notes**

- Dates are treated as **date-only**. Internally normalize to a safe noon time (`setHours(12,0,0,0)`) to avoid DST edge cases.
- For popover use, you can wrap this Calendar in an `InputDate`/`InputDateRange` component; this spec focuses on the calendar panel itself.

---

## Visual & Interaction Details

### Single mode

- Clicking a day sets `value` and triggers `onChange`.
- If `closeOnSelect` true, host popover should close.

### Range mode (Airbnb-like)

- First click sets `range.start`.
- Hovering highlights tentative `[start → hovered]` if valid.
- Second click sets `range.end` (order-agnostic: clicking an earlier date than start swaps).
- Enforce `minRangeLength`/`maxRangeLength`. If invalid, ignore or snap (configurable via your handler).
- Fire `onIntermediateRangeChange` as user hovers. Fire `onRangeChange` once both ends are chosen.

### Navigation

- Header buttons move month (or year with modifier keys if desired).
- Month pagination respects `minDate`/`maxDate`.

### States & Styles (suggested class hooks)

- `.cal-root`, `.cal-header`, `.cal-nav`, `.cal-grid`, `.cal-weekdays`, `.cal-row`, `.cal-cell`
- Day modifiers: `.is-today`, `.is-selected`, `.is-inRange`, `.is-rangeStart`, `.is-rangeEnd`, `.is-disabled`, `.is-outside`, `.is-hovered`
- Range hover overlay uses a soft background; start/end get pills with rounded caps.

---

## Accessibility

- Container month: `role="grid"`, labelled by month/year (e.g., `aria-labelledby="cal-2025-09"`).
- Weekday headers: `role="columnheader"`, short names with `abbr` for SR if needed.
- Day cells: `role="gridcell"`, `aria-selected` true for selected day(s). For ranges, set `aria-selected="true"` on all in range or use `aria-current="date"` for today.
- Disabled days: `aria-disabled="true"`.
- Keyboard support (roving focus within the grid):
  - Arrow keys: move by 1 day (left/right) or 1 week (up/down).
  - Home/End: move to start/end of week.
  - PageUp/PageDown: previous/next month (with Shift for year).
  - Enter/Space: select day (first selects start; second sets end in range mode).
  - Escape: clears hover preview; host can close popover.

- Focus should remain inside the grid; header nav is reachable via Tab.

---

## Keyboard Selection Logic (range)

1. No selection → Enter picks start.
2. Start set, no end → Enter on a valid day sets end; if chosen day < start, swap.
3. If `allowSameDayRange=false`, prevent start==end selection.
4. Enforce range length constraints before commit.

---

## Edge Cases

- Dates outside min/max visually disabled; ensure range hover doesn’t cross blocked dates.
- Crossing month boundaries in dual-month layout keeps continuous preview.
- RTL locales: reverse arrow navigation horizontally.
- Week numbers: compute ISO-8601 if enabled.
- When `fixedRange` is true, second click is optional: end auto-computed from start and `minRangeLength`.

---

## Testing Scenarios

- Single date: click selection, keyboard selection, today highlight.
- Range: start/end selection, hover preview, crossing months, swapping when end < start.
- Constraints: min/maxDate, disabled dates, min/max range length.
- Navigation: header prev/next, PageUp/PageDown, year jump.
- A11y: roles, `aria-selected`, `aria-disabled`, roving focus, SR labels.
- Locale: first day of week, month/weekday names in different locales.
- Performance: rendering 2 months, 12 months stress, no excessive reflows.
- Edge: DST boundaries, year change (Dec→Jan), RTL mode.

---

## Storybook Stories

- `Date/Calendar/Single/Default`
- `Date/Calendar/Range/Airbnb`
- `Date/Calendar/WithDisabledDates`
- `Date/Calendar/MinMaxRangeLength`
- `Date/Calendar/LocaleFirstDayOfWeek`
- `Date/Calendar/KeyboardOnly`
- `Date/Calendar/CustomDayRenderer`
- `Date/Calendar/WithFooterApplyClear`
- `Date/Calendar/WeekNumbers`
- `Date/Calendar/RTL`

---

## Implementation Notes

- Generate month matrix once per visible month; memoize by `{year, month, locale, firstDayOfWeek}`.
- Normalize each date to noon local to avoid DST off-by-one.
- Keep internal hover state for preview (`hoveredDate`).
- Provide a small date utility module (startOfDay, isSameDay, isBetween, clampToBounds).
- For dual months, render two synchronized grids; next/prev move both together.
- Avoid external heavy date libraries if possible; if used, tree-shake.

---

## File Structure (suggestion)

```
packages/ui/src/date/calendar/
  Calendar.tsx
  hooks/useMonthMatrix.ts
  utils/date.ts
  Calendar.scss (or Tailwind)
  index.ts
  __tests__/Calendar.stories.tsx
  __tests__/Calendar.interactions.test.tsx
```

---

## Definition of Done

- Zero ESLint/TS errors.
- Keyboard and screen reader usable.
- All scenarios above covered by stories and interaction tests.
- Accurate range hover and selection across months and constraints.
- Locale and first-day-of-week honored.
- No memory leaks; minimal re-renders.

---

## Testing

### Test IDs Overview
All `data-testid` attributes available in the Calendar component for testing purposes.

### Container Elements

#### `calendar-container`
- **Element:** Main Calendar container (Paper component)
- **Location:** Root Paper element that wraps the entire calendar
- **Usage:** Query the main container to verify Calendar is rendered
```typescript
const container = await canvas.findByTestId('calendar-container');
expect(container).toBeInTheDocument();
```

### Header Elements

#### `calendar-header`
- **Element:** Calendar header containing month name and navigation buttons
- **Location:** Box element containing month/year display and navigation buttons
- **Usage:** Query the header to verify it's rendered and contains navigation
```typescript
const header = await canvas.findByTestId('calendar-header');
expect(header).toBeInTheDocument();
```

#### `calendar-prev-month`
- **Element:** Previous month navigation button
- **Location:** IconButton in the header (only visible in the first month of multi-month view)
- **Usage:** Click to navigate to the previous month
```typescript
const prevButton = await canvas.findByTestId('calendar-prev-month');
await userEvent.click(prevButton);
```

#### `calendar-next-month`
- **Element:** Next month navigation button
- **Location:** IconButton in the header (only visible in the last month of multi-month view)
- **Usage:** Click to navigate to the next month
```typescript
const nextButton = await canvas.findByTestId('calendar-next-month');
await userEvent.click(nextButton);
```

### Calendar Grid Elements

#### `calendar-grid`
- **Element:** Calendar grid container
- **Location:** Box element with role="grid" that contains all date cells
- **Usage:** Query the grid to verify calendar dates are rendered
```typescript
const grid = await canvas.findByTestId('calendar-grid');
expect(grid).toBeInTheDocument();
```

#### `calendar-weekday-${index}`
- **Element:** Weekday header (0-6 for Sun-Sat or Mon-Sun depending on `firstDayOfWeek`)
- **Location:** Box elements in the weekday headers row with role="columnheader"
- **Usage:** Query weekday headers to verify they're displayed correctly
```typescript
// Get all weekday headers
const weekdays = [];
for (let i = 0; i < 7; i++) {
  const weekday = await canvas.findByTestId(`calendar-weekday-${i}`);
  weekdays.push(weekday);
}
expect(weekdays).toHaveLength(7);

// Get specific weekday (e.g., Sunday = 0, Monday = 1)
const sunday = await canvas.findByTestId('calendar-weekday-0');
expect(sunday).toBeInTheDocument();
```

### Date Cell Elements

#### `calendar-date-${date}`
- **Element:** Individual date cell button
- **Location:** Box element with component="button" for each date in the calendar
- **Usage:** Query and interact with specific date cells
```typescript
// Select a specific date (e.g., 15th)
const date15 = await canvas.findByTestId('calendar-date-15');
await userEvent.click(date15);

// Get all date 1 cells (appears once per visible month)
const allFirstDates = await canvas.findAllByTestId('calendar-date-1');
expect(allFirstDates.length).toBeGreaterThan(0);
```

**Note:** The `${date}` portion is the day of the month (1-31). Multiple cells may have the same testId if multiple months are visible or if showing outside days.

#### `calendar-selected-date`
- **Element:** Hidden indicator span inside a selected date cell
- **Location:** Span element with display:none inside the date button that is selected
- **Usage:** Query to verify a date is selected
```typescript
// Find the selected date cell
const selectedDate = await canvas.findByTestId('calendar-selected-date');
expect(selectedDate).toBeInTheDocument();

// Verify it's inside the correct date cell
const parentCell = selectedDate.closest('[role="gridcell"]');
expect(parentCell).toHaveAttribute('aria-selected', 'true');
```

#### `calendar-today`
- **Element:** Hidden indicator span inside today's date cell
- **Location:** Span element with display:none inside the date button representing today
- **Usage:** Query to verify today's date is marked
```typescript
// Find today's date cell
const today = await canvas.findByTestId('calendar-today');
expect(today).toBeInTheDocument();

// Verify it's inside the correct date cell
const parentCell = today.closest('[role="gridcell"]');
expect(parentCell).toHaveAttribute('aria-current', 'date');
```

### Test Patterns

#### Wait for Calendar to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for container
const container = await canvas.findByTestId('calendar-container');
expect(container).toBeInTheDocument();

// Wait for grid to be populated
const grid = await canvas.findByTestId('calendar-grid');
const cells = within(grid).getAllByRole('gridcell');
expect(cells.length).toBeGreaterThan(0);
```

#### Navigate Between Months
```typescript
// Navigate to next month
const nextButton = await canvas.findByTestId('calendar-next-month');
await userEvent.click(nextButton);

// Wait for new dates to render
await waitFor(async () => {
  const grid = await canvas.findByTestId('calendar-grid');
  expect(grid).toBeInTheDocument();
}, { timeout: 3000 });
```

#### Select a Date
```typescript
// Single date selection
const date15 = await canvas.findByTestId('calendar-date-15');
await userEvent.click(date15);

// Verify selection
const selectedIndicator = await canvas.findByTestId('calendar-selected-date');
expect(selectedIndicator).toBeInTheDocument();

// Verify callback was called
expect(args.onChange).toHaveBeenCalled();
```

#### Select a Date Range
```typescript
// Click start date
const startDate = await canvas.findByTestId('calendar-date-10');
await userEvent.click(startDate);

// Click end date
const endDate = await canvas.findByTestId('calendar-date-15');
await userEvent.click(endDate);

// Verify range was set
expect(args.onRangeChange).toHaveBeenCalledWith({
  start: expect.any(Date),
  end: expect.any(Date),
});
```

#### Verify Today's Date is Highlighted
```typescript
// Find today's marker
const todayMarker = await canvas.findByTestId('calendar-today');
expect(todayMarker).toBeInTheDocument();

// Get the parent date cell
const todayCell = todayMarker.closest('[role="gridcell"]');
expect(todayCell).toHaveAttribute('aria-current', 'date');

// Verify styling (bold text)
const style = window.getComputedStyle(todayCell);
expect(style.fontWeight).toBe('bold');
```

#### Check Weekday Headers
```typescript
// Verify all 7 weekdays are present
for (let i = 0; i < 7; i++) {
  const weekday = await canvas.findByTestId(`calendar-weekday-${i}`);
  expect(weekday).toBeInTheDocument();
  expect(weekday.textContent).toBeTruthy();
}

// Verify weekday order based on firstDayOfWeek
const firstWeekday = await canvas.findByTestId('calendar-weekday-0');
// For firstDayOfWeek=0 (Sunday), expect 'S' or 'Su'
// For firstDayOfWeek=1 (Monday), expect 'M' or 'Mo'
expect(firstWeekday.textContent).toBeTruthy();
```

#### Test Multi-Month Calendar
```typescript
// Find all grids (one per month)
const grids = await canvas.findAllByTestId('calendar-grid');
expect(grids).toHaveLength(expectedMonthCount);

// Verify navigation buttons
const prevButton = await canvas.findByTestId('calendar-prev-month');
const nextButton = await canvas.findByTestId('calendar-next-month');
expect(prevButton).toBeInTheDocument();
expect(nextButton).toBeInTheDocument();

// Navigate and verify
await userEvent.click(nextButton);
await waitFor(() => {
  // Month should have changed
  expect(canvas.getByTestId('calendar-grid')).toBeInTheDocument();
});
```

#### Verify Disabled Dates
```typescript
// Try to click a disabled date
const disabledDate = await canvas.findByTestId('calendar-date-5');
expect(disabledDate).toHaveAttribute('aria-disabled', 'true');

// Click should not trigger onChange
await userEvent.click(disabledDate);
expect(args.onChange).not.toHaveBeenCalled();

// Verify disabled styling
const style = window.getComputedStyle(disabledDate);
expect(style.cursor).toBe('not-allowed');
```

### Props That Affect Test Behavior

#### `selectionMode`
- **Values:** `'single' | 'range'`
- **Impact:**
  - `single`: Clicking a date selects it and shows `calendar-selected-date` indicator
  - `range`: First click sets start, second click sets end, shows range preview on hover

#### `numberOfMonths`
- **Values:** `number` (1-3)
- **Impact:** Number of `calendar-grid` elements rendered
- **Test Tip:** Use `findAllByTestId('calendar-grid')` to count grids

#### `firstDayOfWeek`
- **Values:** `0-6` (0=Sunday, 1=Monday, etc.)
- **Impact:** Changes order of `calendar-weekday-${index}` elements
- **Test Tip:** Verify first weekday matches expected day name

#### `showOutsideDays`
- **Values:** `boolean`
- **Impact:** Whether dates from previous/next months are visible in the grid
- **Test Tip:** Check if cells with `inCurrentMonth=false` show dates

#### `minDate` / `maxDate`
- **Values:** `Date`
- **Impact:** Dates outside range have `aria-disabled="true"`
- **Test Tip:** Verify disabled dates cannot be selected

#### `isDateDisabled`
- **Values:** `(date: Date) => boolean`
- **Impact:** Custom disabled dates have `aria-disabled="true"`
- **Test Tip:** Verify callback determines which dates are disabled

#### `autoFocus`
- **Values:** `boolean`
- **Impact:** Calendar grid receives focus on mount
- **Test Tip:** Verify `calendar-container` has focus after render

### Keyboard Navigation Testing

```typescript
// Test arrow key navigation
const container = await canvas.findByTestId('calendar-container');
container.focus();

// Navigate with arrow keys
await userEvent.keyboard('{ArrowRight}'); // Move to next day
await userEvent.keyboard('{ArrowLeft}'); // Move to previous day
await userEvent.keyboard('{ArrowDown}'); // Move down one week
await userEvent.keyboard('{ArrowUp}'); // Move up one week

// Navigate months
await userEvent.keyboard('{PageDown}'); // Next month
await userEvent.keyboard('{PageUp}'); // Previous month

// Select with keyboard
await userEvent.keyboard('{Enter}'); // Select focused date
// or
await userEvent.keyboard(' '); // Select focused date with space
```

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for calendar to render
  const container = await canvas.findByTestId('calendar-container');
  expect(container).toBeInTheDocument();

  // Verify header exists
  const header = await canvas.findByTestId('calendar-header');
  expect(header).toBeInTheDocument();

  // Verify grid exists and has cells
  const grid = await canvas.findByTestId('calendar-grid');
  const cells = within(grid).getAllByRole('gridcell');
  expect(cells.length).toBeGreaterThan(0);
}
```

#### 2. Single Date Selection Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for calendar
  await canvas.findByTestId('calendar-container');

  // Click a date
  const date15 = await canvas.findByTestId('calendar-date-15');
  await userEvent.click(date15);

  // Verify selection indicator
  const selected = await canvas.findByTestId('calendar-selected-date');
  expect(selected).toBeInTheDocument();

  // Verify callback
  expect(args.onChange).toHaveBeenCalled();
}
```

#### 3. Range Selection Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for calendar
  await canvas.findByTestId('calendar-container');

  // Select range start
  const startDate = await canvas.findByTestId('calendar-date-10');
  await userEvent.click(startDate);

  // Select range end
  const endDate = await canvas.findByTestId('calendar-date-20');
  await userEvent.click(endDate);

  // Verify range callback
  await waitFor(() => {
    expect(args.onRangeChange).toHaveBeenCalledWith({
      start: expect.any(Date),
      end: expect.any(Date),
    });
  });
}
```

#### 4. Month Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for calendar
  await canvas.findByTestId('calendar-container');

  // Get initial month text
  const header = await canvas.findByTestId('calendar-header');
  const initialMonth = within(header).getByRole('heading').textContent;

  // Navigate to next month
  const nextButton = await canvas.findByTestId('calendar-next-month');
  await userEvent.click(nextButton);

  // Verify month changed
  await waitFor(() => {
    const newMonth = within(header).getByRole('heading').textContent;
    expect(newMonth).not.toBe(initialMonth);
  });
}
```

#### 5. Today Indicator Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for calendar
  await canvas.findByTestId('calendar-container');

  // Find today's marker
  const today = await canvas.findByTestId('calendar-today');
  expect(today).toBeInTheDocument();

  // Verify parent cell is marked as current date
  const todayCell = today.closest('[role="gridcell"]');
  expect(todayCell).toHaveAttribute('aria-current', 'date');
}
```

#### 6. Disabled Date Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for calendar
  await canvas.findByTestId('calendar-container');

  // Find a disabled date (depends on minDate/maxDate/isDateDisabled)
  const grid = await canvas.findByTestId('calendar-grid');
  const disabledCell = within(grid).getAllByRole('gridcell')
    .find(cell => cell.getAttribute('aria-disabled') === 'true');

  if (disabledCell) {
    // Try to click disabled date
    await userEvent.click(disabledCell);

    // Verify onChange was not called
    expect(args.onChange).not.toHaveBeenCalled();
  }
}
```

#### 7. Weekday Headers Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for calendar
  await canvas.findByTestId('calendar-container');

  // Verify all weekday headers
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const weekday = await canvas.findByTestId(`calendar-weekday-${i}`);
    expect(weekday).toBeInTheDocument();
    weekdays.push(weekday.textContent);
  }

  // Verify we have 7 unique weekday names
  expect(weekdays).toHaveLength(7);
  expect(new Set(weekdays).size).toBe(7);
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId calendar-date-X"

**Possible Causes:**
1. Date X is not in the current month view
2. Date X is disabled and hidden by `showOutsideDays=false`
3. Calendar hasn't finished rendering

**Solution:**
```typescript
// Wait for calendar to render
await waitFor(async () => {
  const container = await canvas.findByTestId('calendar-container');
  expect(container).toBeInTheDocument();
}, { timeout: 3000 });

// Navigate to the correct month if needed
const nextButton = await canvas.findByTestId('calendar-next-month');
await userEvent.click(nextButton);

// Try finding the date again
const date = await canvas.findByTestId('calendar-date-15');
```

#### Issue: "Multiple elements with testId calendar-date-X"

**Cause:** Multiple months are visible or outside days are shown, causing duplicate date numbers.

**Solution:**
```typescript
// Get all instances of the date
const allDate15 = await canvas.findAllByTestId('calendar-date-15');

// Filter to get the one in the current month
const date15InCurrentMonth = allDate15.find(cell => {
  // Check if cell is in current month (not grayed out)
  const style = window.getComputedStyle(cell);
  return style.opacity === '1';
});

await userEvent.click(date15InCurrentMonth);
```

#### Issue: "Cannot find calendar-selected-date"

**Cause:** No date is currently selected.

**Solution:**
```typescript
// First select a date
const date15 = await canvas.findByTestId('calendar-date-15');
await userEvent.click(date15);

// Then wait for selection indicator
await waitFor(async () => {
  const selected = await canvas.findByTestId('calendar-selected-date');
  expect(selected).toBeInTheDocument();
});
```

#### Issue: "Navigation buttons not found"

**Cause:** In multi-month view, prev button only shows on first month, next button only shows on last month.

**Solution:**
```typescript
// For multi-month calendars, buttons are conditional
try {
  const prevButton = await canvas.findByTestId('calendar-prev-month');
  // First month is visible
} catch {
  // First month is not the leftmost visible month
}

try {
  const nextButton = await canvas.findByTestId('calendar-next-month');
  // Last month is visible
} catch {
  // Last month is not the rightmost visible month
}
```

### Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when testing user interactions that trigger state changes
3. **Scope queries** with `within()` when looking inside specific containers like grids
4. **Handle multiple months** by using `findAllByTestId` for elements that appear per-month
5. **Test keyboard navigation** to ensure accessibility compliance
6. **Verify ARIA attributes** (`aria-selected`, `aria-disabled`, `aria-current`) alongside testIds
7. **Account for outside days** when using `showOutsideDays=true` (duplicate date numbers)

### Related Components

- **Box (Paper):** Main calendar container (`calendar-container`)
- **IconButton:** Navigation buttons (`calendar-prev-month`, `calendar-next-month`)
- **Typography:** Month/year header (inside `calendar-header`)
- **Grid cells:** Date buttons (`calendar-date-${date}`)

### Change Log

- **2025-10-08:** Initial testId implementation
  - Added `calendar-container`
  - Added `calendar-header`
  - Added `calendar-prev-month`
  - Added `calendar-next-month`
  - Added `calendar-grid`
  - Added `calendar-weekday-${index}`
  - Added `calendar-date-${date}`
  - Added `calendar-selected-date`
  - Added `calendar-today`
