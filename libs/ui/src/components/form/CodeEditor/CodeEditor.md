# CodeEditor

A powerful Monaco-based code editor component with syntax highlighting, themes, and advanced features like auto-formatting, fullscreen mode, and live editing.

## Overview

The CodeEditor component provides a feature-rich code editing experience using the Monaco Editor (the same editor that powers VS Code). It supports multiple programming languages, themes, and includes a comprehensive toolbar for enhanced functionality.

## Features

- **Multi-language Support**: JavaScript, TypeScript, JSON, CSS, HTML, YAML, Markdown, SQL, Python
- **Theming**: Light, dark, and auto themes with custom styling
- **Interactive Toolbar**: Copy, format, word wrap, and fullscreen controls
- **Accessibility**: Full keyboard navigation and screen reader support
- **Live Editing**: Real-time change detection with save callbacks
- **Customizable**: Adjustable font size, line numbers, minimap, and more
- **Glass Effect**: Modern glassmorphism design with backdrop blur

## Usage Examples

### Basic Usage

```tsx
import { CodeEditor } from '@company/ui-components';

function App() {
  const [code, setCode] = useState('console.log("Hello World");');

  return <CodeEditor language="javascript" value={code} onChange={setCode} height="400px" />;
}
```

### Read-Only Mode

```tsx
<CodeEditor
  language="json"
  value='{"name": "example", "version": "1.0.0"}'
  readOnly
  height="300px"
/>
```

### With Save Callback

```tsx
function EditorWithSave() {
  const [code, setCode] = useState('');

  const handleSave = (value: string) => {
    console.log('Saving code:', value);
    // Implement your save logic here
  };

  return (
    <CodeEditor
      language="typescript"
      value={code}
      onChange={setCode}
      onSave={handleSave}
      height="500px"
    />
  );
}
```

## Props Documentation

### Required Props

- **`language`** (`EditorLanguage`): Programming language for syntax highlighting
  - Options: `'javascript' | 'typescript' | 'json' | 'css' | 'html' | 'yaml' | 'markdown' | 'sql' | 'python'`
- **`value`** (`string`): Current code content

### Optional Props

- **`height`** (`string`): Editor height (default: `'400px'`)
- **`theme`** (`EditorTheme`): Color theme (default: `'auto'`)
  - Options: `'light' | 'dark' | 'auto'`
- **`onChange`** (`(value: string) => void`): Callback when content changes
- **`readOnly`** (`boolean`): Read-only mode (default: `false`)
- **`lineNumbers`** (`boolean`): Show line numbers (default: `true`)
- **`minimap`** (`boolean`): Show minimap navigation (default: `false`)
- **`fontSize`** (`number`): Font size in pixels (default: `14`)
- **`wordWrap`** (`boolean`): Enable word wrapping (default: `false`)
- **`showToolbar`** (`boolean`): Display toolbar with actions (default: `true`)
- **`autoFormat`** (`boolean`): Auto-format code on load (default: `false`)
- **`placeholder`** (`string`): Placeholder text when empty
- **`onSave`** (`(value: string) => void`): Callback for Ctrl+S save action

## Accessibility

The CodeEditor component is designed with accessibility in mind:

- **Keyboard Navigation**: Full support for keyboard-only users
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order through interactive elements
- **High Contrast**: Supports system high contrast themes
- **Keyboard Shortcuts**:
  - `Ctrl+S` (or `Cmd+S`): Save current content
  - `Escape`: Exit fullscreen mode
  - Standard Monaco editor shortcuts

## Toolbar Features

### Copy to Clipboard

- Copies the entire editor content to the clipboard
- Provides visual feedback when copy is successful

### Format Code

- Auto-formats the current code using Monaco's built-in formatters
- Only available when not in read-only mode

### Word Wrap Toggle

- Toggles word wrapping on/off
- Visual indicator shows current state

### Fullscreen Mode

- Expands the editor to full screen
- Exit with button click or Escape key

## Testing

### Test IDs

The CodeEditor component provides comprehensive test IDs for automated testing. All test IDs support custom prefixes via the `dataTestId` prop.

| Element | Default Test ID | With Custom Prefix |
|---------|----------------|-------------------|
| Container | `code-editor` | `{dataTestId}` |
| Toolbar | `code-editor-toolbar` | `{dataTestId}-toolbar` |
| Language Badge | `code-editor-language-badge` | `{dataTestId}-language-badge` |
| Format Button | `code-editor-format-btn` | `{dataTestId}-format-btn` |
| Word Wrap Button | `code-editor-wrap-btn` | `{dataTestId}-wrap-btn` |
| Copy Button | `code-editor-copy-btn` | `{dataTestId}-copy-btn` |
| Fullscreen Button | `code-editor-fullscreen-btn` | `{dataTestId}-fullscreen-btn` |
| Editor Wrapper | `code-editor-editor-wrapper` | `{dataTestId}-editor-wrapper` |
| Placeholder | `code-editor-placeholder` | `{dataTestId}-placeholder` |

### Testing Best Practices

1. **Component Rendering**: Verify the editor renders with correct language and theme
2. **Value Changes**: Test onChange callback fires with correct values
3. **Toolbar Actions**: Test all toolbar buttons (copy, format, wrap, fullscreen)
4. **Keyboard Shortcuts**: Verify Ctrl+S triggers onSave callback
5. **Read-Only Mode**: Ensure editing is disabled in read-only mode
6. **Fullscreen Mode**: Test fullscreen toggle and ESC key exit
7. **Placeholder**: Verify placeholder appears when value is empty

### Common Test Scenarios

#### Basic Rendering Test

```tsx
import { render, screen } from '@testing-library/react';
import { CodeEditor } from '@company/ui-components';

test('renders CodeEditor with correct language', () => {
  render(
    <CodeEditor
      language="javascript"
      value="console.log('test');"
      dataTestId="custom-editor"
    />
  );

  const container = screen.getByTestId('custom-editor');
  expect(container).toBeInTheDocument();

  const languageBadge = screen.getByTestId('custom-editor-language-badge');
  expect(languageBadge).toHaveTextContent('javascript');
});
```

#### Value Change Test

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('calls onChange when content changes', async () => {
  const handleChange = jest.fn();

  render(
    <CodeEditor
      language="typescript"
      value=""
      onChange={handleChange}
      dataTestId="editor"
    />
  );

  // Monaco editor interactions require waiting for mount
  await waitFor(() => {
    expect(screen.getByTestId('editor-editor-wrapper')).toBeInTheDocument();
  });

  // Simulate typing in Monaco editor
  // Note: Direct Monaco API access may be needed for complex interactions
});
```

#### Toolbar Button Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('toggles word wrap when button is clicked', () => {
  render(
    <CodeEditor
      language="json"
      value='{"test": true}'
      dataTestId="json-editor"
    />
  );

  const wrapButton = screen.getByTestId('json-editor-wrap-btn');
  fireEvent.click(wrapButton);

  // Verify word wrap state changed (check button color or aria attributes)
});
```

#### Fullscreen Mode Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('enters and exits fullscreen mode', () => {
  render(
    <CodeEditor
      language="python"
      value="print('hello')"
      dataTestId="py-editor"
    />
  );

  const fullscreenBtn = screen.getByTestId('py-editor-fullscreen-btn');

  // Enter fullscreen
  fireEvent.click(fullscreenBtn);

  // Verify fullscreen state
  const wrapper = screen.getByTestId('py-editor-editor-wrapper');
  expect(wrapper).toHaveStyle({ position: 'fixed' });

  // Exit with ESC key
  fireEvent.keyDown(window, { key: 'Escape' });
});
```

#### Read-Only Mode Test

```tsx
import { render, screen } from '@testing-library/react';

test('hides format button in read-only mode', () => {
  render(
    <CodeEditor
      language="javascript"
      value="const x = 1;"
      readOnly
      dataTestId="readonly-editor"
    />
  );

  // Format button should not be present in read-only mode
  expect(screen.queryByTestId('readonly-editor-format-btn')).not.toBeInTheDocument();
});
```

#### Save Callback Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('calls onSave when Ctrl+S is pressed', async () => {
  const handleSave = jest.fn();

  render(
    <CodeEditor
      language="typescript"
      value="const test = 123;"
      onSave={handleSave}
      dataTestId="editor"
    />
  );

  // Simulate Ctrl+S keyboard shortcut
  // Note: This requires Monaco editor to be fully mounted
  // You may need to access the Monaco instance directly
});
```

### Testing Monaco Editor Interactions

The Monaco Editor requires special handling for testing:

1. **Async Loading**: Monaco loads asynchronously. Use `waitFor` to ensure it's mounted.
2. **Direct API Access**: For complex interactions, access the Monaco editor instance via ref.
3. **Mock Monaco**: Consider mocking `@monaco-editor/react` for unit tests.
4. **Integration Tests**: Use Playwright or Cypress for full E2E testing of editor features.

### Accessibility Testing

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('CodeEditor has no accessibility violations', async () => {
  const { container } = render(
    <CodeEditor
      language="html"
      value="<div>Test</div>"
      dataTestId="accessible-editor"
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Best Practices

1. **Language Selection**: Always specify the correct language for proper syntax highlighting
2. **Height Management**: Use appropriate height values for your use case
3. **Performance**: For large files, consider using the minimap and word wrap options
4. **Accessibility**: Always provide meaningful placeholder text for empty editors
5. **Save Handling**: Implement the `onSave` callback for better user experience
6. **Theme Consistency**: Use 'auto' theme to match your application's theme system

## Browser Support

- Chrome 70+
- Firefox 70+
- Safari 12+
- Edge 79+

## Dependencies

- `@monaco-editor/react`: Monaco Editor React wrapper
- `@mui/material`: Material-UI components and theming
- `@mui/icons-material`: Material-UI icons
