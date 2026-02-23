# Resizable Component

A flexible resizable container component that allows users to dynamically adjust content dimensions through drag handles. Built with accessibility in mind and supporting various resize directions and constraints.

## Features

- **Multi-directional resizing**: Horizontal, vertical, or both directions
- **Constraint system**: Minimum and maximum width/height limits
- **Customizable handles**: Position handles on any side or corner
- **Accessibility support**: Keyboard navigation and screen reader compatible
- **Touch-friendly**: Works on mobile and tablet devices
- **Callback system**: Optional resize event handlers with dimension data

## Usage

```tsx
import { Resizable } from '@procurement/ui';

// Basic usage
<Resizable width={300} height={200}>
  <div>Resizable content</div>
</Resizable>

// With constraints and callback
<Resizable
  variant="both"
  width={400}
  height={300}
  minWidth={200}
  maxWidth={800}
  minHeight={150}
  maxHeight={600}
  onResize={(dimensions) => console.log(dimensions)}
>
  <div>Content with resize constraints</div>
</Resizable>

// Custom handle positions
<Resizable
  width={350}
  height={250}
  handles={['right', 'bottom', 'bottomRight']}
>
  <div>Custom handle positioning</div>
</Resizable>
```

## Props

| Prop           | Type                                     | Default                              | Description                                      |
| -------------- | ---------------------------------------- | ------------------------------------ | ------------------------------------------------ |
| `children`     | `ReactNode`                              | -                                    | Content to render inside the resizable container |
| `variant`      | `'horizontal' \| 'vertical' \| 'both'`   | `'both'`                             | Resize direction constraint                      |
| `width`        | `number`                                 | `300`                                | Initial width in pixels                          |
| `height`       | `number`                                 | `200`                                | Initial height in pixels                         |
| `minWidth`     | `number`                                 | `50`                                 | Minimum width constraint                         |
| `maxWidth`     | `number`                                 | -                                    | Maximum width constraint                         |
| `minHeight`    | `number`                                 | `50`                                 | Minimum height constraint                        |
| `maxHeight`    | `number`                                 | -                                    | Maximum height constraint                        |
| `onResize`     | `(dimensions: ResizeDimensions) => void` | -                                    | Callback fired during resize with new dimensions |
| `disabled`     | `boolean`                                | `false`                              | Disables resize functionality                    |
| `handles`      | `HandlePosition[]`                       | `['right', 'bottom', 'bottomRight']` | Array of handle positions                        |
| `className`    | `string`                                 | -                                    | Additional CSS class name                        |
| `data-testid`  | `string`                                 | -                                    | Test ID for automated testing                    |

## Handle Positions

The `handles` prop accepts an array of the following positions:

- `'top'` - Top edge
- `'right'` - Right edge
- `'bottom'` - Bottom edge
- `'left'` - Left edge
- `'topLeft'` - Top-left corner
- `'topRight'` - Top-right corner
- `'bottomLeft'` - Bottom-left corner
- `'bottomRight'` - Bottom-right corner

## Accessibility

The Resizable component includes comprehensive accessibility features:

- **Keyboard support**: Use Tab to focus handles, arrow keys to resize
- **Screen reader**: Proper ARIA labels and live region updates
- **Focus management**: Clear visual focus indicators
- **Semantic markup**: Appropriate roles and descriptions

### Keyboard Shortcuts

| Key                  | Action                                |
| -------------------- | ------------------------------------- |
| `Tab` / `Shift+Tab`  | Navigate between resize handles       |
| `Arrow Keys`         | Resize in the corresponding direction |
| `Shift + Arrow Keys` | Resize in larger increments           |
| `Enter` / `Space`    | Activate resize mode                  |
| `Escape`             | Cancel current resize operation       |

## Examples

### Side Panel Layout

```tsx
<Resizable variant="horizontal" width={250} minWidth={200} maxWidth={400} handles={['right']}>
  <div className="sidebar">Navigation content</div>
</Resizable>
```

### Text Editor Panes

```tsx
<div style={{ display: 'flex', gap: '8px' }}>
  <Resizable variant="horizontal" width={400} minWidth={300} handles={['right']}>
    <textarea placeholder="Write content..." />
  </Resizable>
  <Resizable variant="horizontal" width={400} minWidth={300} handles={['left']}>
    <div className="preview">Preview pane</div>
  </Resizable>
</div>
```

### Grid Layout Cell

```tsx
<Resizable
  width={200}
  height={150}
  minWidth={100}
  minHeight={100}
  onResize={({ width, height }) => {
    updateGridCellSize(width, height);
  }}
>
  <div className="grid-cell">Resizable grid item</div>
</Resizable>
```

## Best Practices

1. **Set reasonable constraints**: Always provide `minWidth` and `minHeight` to prevent unusably small containers
2. **Consider content**: Ensure resize handles don't interfere with interactive content
3. **Provide feedback**: Use the `onResize` callback to update related UI elements
4. **Test accessibility**: Verify keyboard navigation and screen reader compatibility
5. **Mobile considerations**: Ensure handles are touch-friendly (minimum 44px touch target)

## Theme Integration

The Resizable component integrates with the MUI theme system for consistent styling:

- Handle colors use theme palette values
- Hover and focus states follow theme patterns
- Supports both light and dark themes
- Respects theme spacing and sizing conventions

## Testing

The Resizable component includes comprehensive testId support for automated testing.

### Test IDs

When you provide a `data-testid` prop, the component automatically generates test IDs for all interactive elements:

| Element           | Test ID Pattern                      | Example                             |
| ----------------- | ------------------------------------ | ----------------------------------- |
| Container         | `{dataTestId}`                       | `my-resizable`                      |
| Resize Handle     | `{dataTestId}-handle-{position}`     | `my-resizable-handle-right`         |

### Handle Position Values

The handle position in test IDs corresponds to the handle's location:

- `top` - Top edge handle
- `right` - Right edge handle
- `bottom` - Bottom edge handle
- `left` - Left edge handle
- `topLeft` - Top-left corner handle
- `topRight` - Top-right corner handle
- `bottomLeft` - Bottom-left corner handle
- `bottomRight` - Bottom-right corner handle

### Testing Examples

```tsx
import { render, screen } from '@testing-library/react';
import { Resizable } from '@procurement/ui';

test('renders resizable container with testId', () => {
  render(
    <Resizable data-testid="my-resizable" width={300} height={200}>
      <div>Content</div>
    </Resizable>
  );

  // Find the container
  const container = screen.getByTestId('my-resizable');
  expect(container).toBeInTheDocument();
});

test('renders resize handles with testIds', () => {
  render(
    <Resizable
      data-testid="my-resizable"
      variant="both"
      handles={['right', 'bottom', 'bottomRight']}
      width={300}
      height={200}
    >
      <div>Content</div>
    </Resizable>
  );

  // Find individual handles
  const rightHandle = screen.getByTestId('my-resizable-handle-right');
  const bottomHandle = screen.getByTestId('my-resizable-handle-bottom');
  const cornerHandle = screen.getByTestId('my-resizable-handle-bottomRight');

  expect(rightHandle).toBeInTheDocument();
  expect(bottomHandle).toBeInTheDocument();
  expect(cornerHandle).toBeInTheDocument();
});

test('tests resize interaction', async () => {
  const handleResize = jest.fn();

  render(
    <Resizable
      data-testid="my-resizable"
      width={300}
      height={200}
      onResize={handleResize}
    >
      <div>Content</div>
    </Resizable>
  );

  const rightHandle = screen.getByTestId('my-resizable-handle-right');

  // Simulate drag interaction
  fireEvent.mouseDown(rightHandle, { clientX: 300, clientY: 100 });
  fireEvent.mouseMove(document, { clientX: 350, clientY: 100 });
  fireEvent.mouseUp(document);

  expect(handleResize).toHaveBeenCalled();
});

test('verifies disabled state', () => {
  render(
    <Resizable
      data-testid="my-resizable"
      width={300}
      height={200}
      disabled
    >
      <div>Content</div>
    </Resizable>
  );

  const container = screen.getByTestId('my-resizable');
  expect(container).toBeInTheDocument();

  // Handles should not be present when disabled
  expect(screen.queryByTestId('my-resizable-handle-right')).not.toBeInTheDocument();
});
```

### Integration Testing

For multi-panel layouts with multiple resizable components:

```tsx
test('complex layout with multiple resizable panels', () => {
  render(
    <div>
      <Resizable data-testid="sidebar" variant="horizontal" width={250}>
        <div>Sidebar</div>
      </Resizable>

      <Resizable data-testid="main-panel" variant="both" width={500} height={400}>
        <div>Main Content</div>
      </Resizable>

      <Resizable data-testid="inspector" variant="horizontal" width={200}>
        <div>Inspector</div>
      </Resizable>
    </div>
  );

  // Verify all panels are present
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  expect(screen.getByTestId('main-panel')).toBeInTheDocument();
  expect(screen.getByTestId('inspector')).toBeInTheDocument();

  // Verify handles for specific panels
  expect(screen.getByTestId('sidebar-handle-right')).toBeInTheDocument();
  expect(screen.getByTestId('main-panel-handle-right')).toBeInTheDocument();
  expect(screen.getByTestId('main-panel-handle-bottom')).toBeInTheDocument();
  expect(screen.getByTestId('inspector-handle-right')).toBeInTheDocument();
});
```

### Best Practices for Testing

1. **Always provide data-testid**: Use descriptive, unique test IDs for each resizable instance
2. **Test handle interactions**: Verify that resize handles respond correctly to mouse events
3. **Test constraints**: Ensure minWidth, maxWidth, minHeight, and maxHeight are respected
4. **Test callbacks**: Verify onResize callback is triggered with correct dimensions
5. **Test disabled state**: Confirm that disabled resizable components don't allow resizing
6. **Test variants**: Verify that horizontal, vertical, and both variants work correctly
7. **Integration tests**: Test multiple resizable components working together in complex layouts
