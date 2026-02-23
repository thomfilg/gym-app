# RichTextEditor

A comprehensive rich text editor component with formatting capabilities, built on MUI and integrated with modern rich text editing libraries. Provides a complete set of text editing features including bold, italic, underline, lists, links, and more.

## Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough
- **Lists**: Ordered and unordered lists
- **Links and Images**: Insert links and images
- **Code Blocks**: Formatted code blocks with syntax highlighting
- **Quotes**: Blockquote formatting
- **Character Count**: Optional character limit with visual feedback
- **Accessibility**: Full ARIA support and keyboard navigation
- **Theming**: Full MUI theme integration
- **Customizable Toolbar**: Configure which tools are available

## Usage

### Basic Usage

```tsx
import { RichTextEditor } from '@procurement/ui';

function App() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Start writing your content..."
    />
  );
}
```

### With Custom Toolbar

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  toolbar={{
    bold: true,
    italic: true,
    underline: false,
    orderedList: true,
    unorderedList: true,
    link: true,
    image: false,
  }}
/>
```

### With Character Limit

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  maxLength={500}
  placeholder="Keep it under 500 characters..."
/>
```

### Read-Only Mode

```tsx
<RichTextEditor
  value={content}
  readOnly
  toolbar={{}} // Hide toolbar in read-only mode
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | The current value of the rich text editor content |
| `onChange` | `(value: string) => void` | - | Callback when the content changes |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text when empty |
| `disabled` | `boolean` | `false` | Whether the editor is disabled |
| `readOnly` | `boolean` | `false` | Whether the editor is read-only |
| `toolbar` | `ToolbarConfig` | Default config | Configuration for toolbar buttons and features |
| `height` | `number \| string` | `300` | Height of the editor |
| `maxLength` | `number` | - | Maximum number of characters allowed |
| `onFocus` | `() => void` | - | Callback when editor receives focus |
| `onBlur` | `() => void` | - | Callback when editor loses focus |
| `className` | `string` | - | Additional CSS classes |
| `data-testid` | `string` | - | Test ID for testing purposes |
| `aria-label` | `string` | `'Rich text editor'` | ARIA label for accessibility |
| `aria-describedby` | `string` | - | ARIA described by for accessibility |

## ToolbarConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bold` | `boolean` | `true` | Show bold button |
| `italic` | `boolean` | `true` | Show italic button |
| `underline` | `boolean` | `true` | Show underline button |
| `strikethrough` | `boolean` | `false` | Show strikethrough button |
| `orderedList` | `boolean` | `true` | Show ordered list button |
| `unorderedList` | `boolean` | `true` | Show unordered list button |
| `link` | `boolean` | `true` | Show link button |
| `image` | `boolean` | `false` | Show image button |
| `codeBlock` | `boolean` | `false` | Show code block button |
| `quote` | `boolean` | `false` | Show quote button |
| `customItems` | `ToolbarItem[]` | `[]` | Custom toolbar items |

## Keyboard Shortcuts

- **Ctrl/Cmd + B**: Bold
- **Ctrl/Cmd + I**: Italic  
- **Ctrl/Cmd + U**: Underline
- **Ctrl/Cmd + K**: Insert Link
- **Tab**: Indent (in lists)
- **Shift + Tab**: Outdent (in lists)

## Accessibility

The RichTextEditor component follows WAI-ARIA guidelines:

- Proper ARIA roles and labels
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast mode support

### Screen Reader Support

- Content changes are announced
- Toolbar buttons have descriptive labels
- Character count is announced when approaching limit

### Keyboard Navigation

- All toolbar buttons are keyboard accessible
- Standard text editing keyboard shortcuts work
- Tab navigation follows logical order

## Best Practices

1. **Content Validation**: Always validate and sanitize rich text content on the server side
2. **Character Limits**: Use `maxLength` for forms with content restrictions
3. **Accessibility**: Provide meaningful `aria-label` and `aria-describedby` attributes
4. **Performance**: Consider debouncing the `onChange` callback for frequent updates
5. **Theming**: Use MUI theme tokens for consistent styling

## Examples

See the Storybook stories for comprehensive usage examples and interactive demos.

## Testing

This section describes all `data-testid` attributes available in the RichTextEditor component for testing purposes.

### Test IDs

#### Container Elements

##### `rich-text-editor`
- **Element:** Main RichTextEditor container (Paper)
- **Location:** Root Paper element that wraps the entire editor
- **Usage:** Query the main container to verify RichTextEditor is rendered
```typescript
const editor = await canvas.findByTestId('rich-text-editor');
expect(editor).toBeInTheDocument();
```

##### `editor-toolbar`
- **Element:** Toolbar container
- **Location:** Toolbar component containing all formatting buttons
- **Usage:** Query the toolbar to verify it's rendered and accessible
```typescript
const toolbar = await canvas.findByTestId('editor-toolbar');
expect(toolbar).toBeInTheDocument();
```

##### `editor-content`
- **Element:** Editor content area
- **Location:** The contentEditable Box where users type text
- **Usage:** Query the content area for typing and content verification
```typescript
const content = await canvas.findByTestId('editor-content');
expect(content).toHaveAttribute('contenteditable', 'true');
```

#### Toolbar Buttons

##### `toolbar-bold`
- **Element:** Bold formatting button
- **Location:** Toolbar - Text formatting section
- **Usage:** Test bold text formatting functionality
```typescript
const boldButton = await canvas.findByTestId('toolbar-bold');
await userEvent.click(boldButton);
```

##### `toolbar-italic`
- **Element:** Italic formatting button
- **Location:** Toolbar - Text formatting section
- **Usage:** Test italic text formatting functionality
```typescript
const italicButton = await canvas.findByTestId('toolbar-italic');
await userEvent.click(italicButton);
```

##### `toolbar-underline`
- **Element:** Underline formatting button
- **Location:** Toolbar - Text formatting section
- **Usage:** Test underline text formatting functionality
```typescript
const underlineButton = await canvas.findByTestId('toolbar-underline');
await userEvent.click(underlineButton);
```

##### `toolbar-strikethrough`
- **Element:** Strikethrough formatting button
- **Location:** Toolbar - Text formatting section
- **Usage:** Test strikethrough text formatting functionality
```typescript
const strikethroughButton = await canvas.findByTestId('toolbar-strikethrough');
await userEvent.click(strikethroughButton);
```

##### `toolbar-orderedList`
- **Element:** Numbered list button
- **Location:** Toolbar - List formatting section
- **Usage:** Test ordered (numbered) list creation
```typescript
const orderedListButton = await canvas.findByTestId('toolbar-orderedList');
await userEvent.click(orderedListButton);
```

##### `toolbar-unorderedList`
- **Element:** Bulleted list button
- **Location:** Toolbar - List formatting section
- **Usage:** Test unordered (bulleted) list creation
```typescript
const unorderedListButton = await canvas.findByTestId('toolbar-unorderedList');
await userEvent.click(unorderedListButton);
```

##### `toolbar-link`
- **Element:** Insert link button
- **Location:** Toolbar - Insert section
- **Usage:** Test link insertion functionality (opens prompt)
```typescript
const linkButton = await canvas.findByTestId('toolbar-link');
await userEvent.click(linkButton);
// Note: Will trigger window.prompt() - mock if needed
```

##### `toolbar-image`
- **Element:** Insert image button
- **Location:** Toolbar - Insert section
- **Usage:** Test image insertion functionality (opens prompt)
```typescript
const imageButton = await canvas.findByTestId('toolbar-image');
await userEvent.click(imageButton);
// Note: Will trigger window.prompt() - mock if needed
```

##### `toolbar-codeBlock`
- **Element:** Code block button
- **Location:** Toolbar - Block formatting section
- **Usage:** Test code block formatting
```typescript
const codeButton = await canvas.findByTestId('toolbar-codeBlock');
await userEvent.click(codeButton);
```

##### `toolbar-quote`
- **Element:** Blockquote button
- **Location:** Toolbar - Block formatting section
- **Usage:** Test blockquote formatting
```typescript
const quoteButton = await canvas.findByTestId('toolbar-quote');
await userEvent.click(quoteButton);
```

##### `toolbar-custom-{id}`
- **Element:** Custom toolbar items
- **Location:** Toolbar - Custom items section (if configured)
- **Pattern:** `toolbar-custom-` followed by the custom item's `id` prop
- **Usage:** Test custom toolbar functionality
```typescript
// If custom item has id="highlight"
const customButton = await canvas.findByTestId('toolbar-custom-highlight');
await userEvent.click(customButton);
```

#### Status/Counter Elements

##### `editor-counter`
- **Element:** Character counter display
- **Location:** Right side of toolbar (only visible when `maxLength` prop is set)
- **Usage:** Verify character count and limit enforcement
```typescript
const counter = await canvas.findByTestId('editor-counter');
expect(counter).toHaveTextContent('25/100');
```

### Test Patterns

#### Wait for Editor to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for container
const editor = await canvas.findByTestId('rich-text-editor');

// Wait for editor to be ready
const content = await canvas.findByTestId('editor-content');
expect(content).toBeInTheDocument();
```

#### Verify Toolbar Configuration
```typescript
// Check which toolbar buttons are visible
const toolbar = await canvas.findByTestId('editor-toolbar');

// Try to find specific buttons
const boldButton = within(toolbar).queryByTestId('toolbar-bold');
const italicButton = within(toolbar).queryByTestId('toolbar-italic');

expect(boldButton).toBeInTheDocument();
expect(italicButton).toBeInTheDocument();
```

#### Test Text Input and Formatting
```typescript
// Get editor content
const content = await canvas.findByTestId('editor-content');

// Type text
await userEvent.click(content);
await userEvent.type(content, 'Hello World');

// Apply formatting
const boldButton = await canvas.findByTestId('toolbar-bold');
await userEvent.click(boldButton);

// Verify formatted HTML
await waitFor(() => {
  expect(content.innerHTML).toContain('<strong>');
});
```

#### Test Character Counter
```typescript
// Component with maxLength
const editor = await canvas.findByTestId('rich-text-editor');
const content = await canvas.findByTestId('editor-content');
const counter = await canvas.findByTestId('editor-counter');

// Type text
await userEvent.click(content);
await userEvent.type(content, 'Test text');

// Check counter updates
await waitFor(() => {
  expect(counter).toHaveTextContent(/9\/50/);
});
```

#### Test Disabled State
```typescript
const content = await canvas.findByTestId('editor-content');
const boldButton = await canvas.findByTestId('toolbar-bold');

// Verify disabled state
expect(content).toHaveAttribute('contenteditable', 'false');
expect(boldButton).toBeDisabled();
```

#### Test Read-Only State
```typescript
const content = await canvas.findByTestId('editor-content');
const toolbar = await canvas.findByTestId('editor-toolbar');

// Verify read-only state
expect(content).toHaveAttribute('contenteditable', 'false');

// Toolbar buttons should be disabled
const buttons = within(toolbar).queryAllByRole('button');
buttons.forEach(button => {
  expect(button).toBeDisabled();
});
```

### Props That Affect Test Behavior

#### `toolbar`
- **Type:** `ToolbarConfig` object
- **Impact:** Controls which toolbar buttons are visible
- **Default:** All basic formatting buttons enabled
- **Test Tip:** Query toolbar to verify only configured buttons exist
```typescript
// With toolbar={{ bold: true, italic: false }}
const boldButton = canvas.queryByTestId('toolbar-bold');
const italicButton = canvas.queryByTestId('toolbar-italic');

expect(boldButton).toBeInTheDocument();
expect(italicButton).not.toBeInTheDocument();
```

#### `disabled`
- **Values:** `boolean`
- **Impact:** Disables all interactions (toolbar and content)
- **Test Tip:** Check `contenteditable="false"` and button disabled states

#### `readOnly`
- **Values:** `boolean`
- **Impact:** Similar to disabled but may have different visual styling
- **Test Tip:** Check `contenteditable="false"` and button disabled states

#### `maxLength`
- **Values:** `number`
- **Impact:** Shows character counter and enforces text limit
- **Test Tip:** Counter only appears when `maxLength` is set

#### `height`
- **Values:** `number | string`
- **Impact:** Sets minimum height of editor content area
- **Test Tip:** Check computed styles if testing layout

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for editor to render
  const editor = await canvas.findByTestId('rich-text-editor');
  expect(editor).toBeInTheDocument();

  // Verify essential elements
  const toolbar = await canvas.findByTestId('editor-toolbar');
  const content = await canvas.findByTestId('editor-content');

  expect(toolbar).toBeInTheDocument();
  expect(content).toBeInTheDocument();
}
```

#### 2. Toolbar Button Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Get all toolbar buttons
  const boldButton = await canvas.findByTestId('toolbar-bold');
  const italicButton = await canvas.findByTestId('toolbar-italic');
  const underlineButton = await canvas.findByTestId('toolbar-underline');

  // Verify they're all present and enabled
  expect(boldButton).toBeEnabled();
  expect(italicButton).toBeEnabled();
  expect(underlineButton).toBeEnabled();
}
```

#### 3. Text Formatting Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const content = await canvas.findByTestId('editor-content');
  const boldButton = await canvas.findByTestId('toolbar-bold');

  // Type text
  await userEvent.click(content);
  await userEvent.type(content, 'Test text');

  // Select text and apply bold
  await userEvent.keyboard('{Control>}a{/Control}');
  await userEvent.click(boldButton);

  // Verify HTML contains strong tag
  await waitFor(() => {
    expect(content.innerHTML).toContain('<strong>');
  });
}
```

#### 4. Character Limit Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const content = await canvas.findByTestId('editor-content');
  const counter = await canvas.findByTestId('editor-counter');

  // Initial state
  expect(counter).toHaveTextContent('0/100');

  // Type text
  await userEvent.click(content);
  await userEvent.type(content, 'Hello');

  // Counter should update
  await waitFor(() => {
    expect(counter).toHaveTextContent('5/100');
  });

  // Try to exceed limit
  const longText = 'x'.repeat(120);
  await userEvent.type(content, longText);

  // Should be limited to maxLength
  await waitFor(() => {
    const textLength = content.textContent?.length || 0;
    expect(textLength).toBeLessThanOrEqual(100);
  });
}
```

#### 5. Link Insertion Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Mock window.prompt
  const originalPrompt = window.prompt;
  window.prompt = vi.fn().mockReturnValue('https://example.com');

  const content = await canvas.findByTestId('editor-content');
  const linkButton = await canvas.findByTestId('toolbar-link');

  // Type text and select it
  await userEvent.click(content);
  await userEvent.type(content, 'Click here');
  await userEvent.keyboard('{Control>}a{/Control}');

  // Insert link
  await userEvent.click(linkButton);

  // Verify link was created
  await waitFor(() => {
    expect(content.innerHTML).toContain('<a');
    expect(content.innerHTML).toContain('href="https://example.com"');
  });

  // Restore prompt
  window.prompt = originalPrompt;
}
```

#### 6. List Formatting Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const content = await canvas.findByTestId('editor-content');
  const orderedListButton = await canvas.findByTestId('toolbar-orderedList');

  // Type text
  await userEvent.click(content);
  await userEvent.type(content, 'List item');

  // Create ordered list
  await userEvent.click(orderedListButton);

  // Verify list HTML
  await waitFor(() => {
    expect(content.innerHTML).toContain('<ol>');
    expect(content.innerHTML).toContain('<li>');
  });
}
```

#### 7. Focus Management Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const content = await canvas.findByTestId('editor-content');
  const boldButton = await canvas.findByTestId('toolbar-bold');

  // Focus editor
  await userEvent.click(content);
  expect(content).toHaveFocus();

  // Click toolbar button
  await userEvent.click(boldButton);

  // Focus should return to editor
  await waitFor(() => {
    expect(content).toHaveFocus();
  });
}
```

#### 8. Custom Toolbar Items Test
```typescript
// Given: toolbar={{ customItems: [{ id: 'custom', label: 'Custom', icon: <Icon />, action: fn }] }}
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const customButton = await canvas.findByTestId('toolbar-custom-custom');
  expect(customButton).toBeInTheDocument();

  await userEvent.click(customButton);

  // Verify custom action was called (if using mock)
  expect(args.toolbar.customItems[0].action).toHaveBeenCalled();
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId X"

**Solution:** Always use `await` with `findByTestId`:
```typescript
// ❌ Wrong - synchronous
const element = canvas.getByTestId('rich-text-editor');

// ✅ Correct - asynchronous
const element = await canvas.findByTestId('rich-text-editor');
```

#### Issue: Toolbar button not found

**Solution:** Check if button is enabled in toolbar config:
```typescript
// Some buttons may be disabled via toolbar prop
const button = canvas.queryByTestId('toolbar-strikethrough');
if (button === null) {
  // Button not configured in toolbar
}
```

#### Issue: Content changes not detected

**Solution:** Use `waitFor` for asynchronous content updates:
```typescript
await userEvent.type(content, 'text');
await waitFor(() => {
  expect(content.innerHTML).toContain('text');
});
```

#### Issue: Character counter not visible

**Solution:** Counter only appears when `maxLength` prop is set:
```typescript
// This will fail if maxLength is not set
const counter = canvas.queryByTestId('editor-counter');
if (counter === null) {
  // maxLength prop is not set on this instance
}
```

#### Issue: Prompt dialogs in tests

**Solution:** Mock `window.prompt` for link/image insertion:
```typescript
const originalPrompt = window.prompt;
window.prompt = vi.fn().mockReturnValue('https://example.com');

// ... perform test ...

window.prompt = originalPrompt;
```

#### Issue: HTML sanitization affects tests

**Solution:** Component uses DOMPurify - test with safe HTML:
```typescript
// Some tags/attributes may be stripped
// Check ALLOWED_TAGS and ALLOWED_ATTR in component source
await waitFor(() => {
  // Test for sanitized HTML structure
  expect(content.innerHTML).toContain('<p>');
  expect(content.innerHTML).not.toContain('<script>');
});
```

### Testing Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when testing content that updates after user interaction
3. **Scope queries** with `within()` when looking inside toolbar or content
4. **Mock prompts** when testing link/image insertion: `window.prompt = vi.fn()`
5. **Check toolbar config** before asserting button presence
6. **Test with sanitized HTML** - component uses DOMPurify security
7. **Verify focus behavior** - focus returns to editor after toolbar actions
8. **Test character limits** when `maxLength` is set
9. **Use regex patterns** for dynamic testIds: `/toolbar-custom-/`
10. **Check ARIA attributes** for accessibility testing

### Related Elements

- **Toolbar:** Contains all formatting buttons - query with `editor-toolbar`
- **Content Area:** Where user types - query with `editor-content` or role="textbox"
- **IconButtons:** Toolbar buttons - query individually by `toolbar-{name}`
- **Counter:** Character limit display - query with `editor-counter` (when visible)
- **Custom Items:** Dynamic toolbar buttons - query with `toolbar-custom-{id}`

### Security Notes

The component uses DOMPurify to sanitize HTML content. When testing:
- Scripts and dangerous tags are automatically removed
- Only allowed tags: p, br, strong, em, u, s, a, img, ul, ol, li, blockquote, pre, code, h1-h6, span, div
- Only allowed attributes: href, src, alt, target, rel, style, class
- Data attributes are not allowed (except data-testid on component root)