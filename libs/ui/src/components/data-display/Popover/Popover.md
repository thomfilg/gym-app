# Popover

A flexible popover component built on top of Material-UI's Popover, providing enhanced styling variants and interactive effects.

## Props

### `variant` (optional)

- **Type:** `'default' | 'glass' | 'arrow'`
- **Default:** `'default'`
- **Description:** The visual variant of the popover
  - `default`: Standard popover with solid background and shadow
  - `glass`: Glassmorphism effect with backdrop blur and transparency
  - `arrow`: Enhanced popover with stronger shadows (intended for arrow variants)

### `glow` (optional)

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether the popover should have a glowing effect using the primary theme color

### `pulse` (optional)

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether the popover should have a subtle pulse animation effect

### `arrow` (optional)

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether to show an arrow pointing to the anchor (currently defined in types but not implemented in component)

### `maxWidth` (optional)

- **Type:** `number`
- **Default:** `400`
- **Description:** Maximum width of the popover in pixels

### Inherited Props

All other props from Material-UI's `PopoverProps` are supported, including:

- `open`: Controls whether the popover is open
- `anchorEl`: The element the popover is anchored to
- `onClose`: Callback fired when the popover requests to be closed
- `anchorOrigin`: The anchor point on the anchor element
- `transformOrigin`: The transform origin point on the popover

## Usage Examples

### Basic Popover

```tsx
<Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
  <Typography sx={{ p: 2 }}>Basic popover content</Typography>
</Popover>
```

### Glass Effect Popover

```tsx
<Popover variant="glass" open={open} anchorEl={anchorEl} onClose={handleClose}>
  <Typography sx={{ p: 2 }}>Glass effect popover</Typography>
</Popover>
```

### Popover with Glow Effect

```tsx
<Popover glow open={open} anchorEl={anchorEl} onClose={handleClose}>
  <Typography sx={{ p: 2 }}>Glowing popover</Typography>
</Popover>
```

### Animated Popover

```tsx
<Popover pulse open={open} anchorEl={anchorEl} onClose={handleClose}>
  <Typography sx={{ p: 2 }}>Pulsing popover</Typography>
</Popover>
```

## Accessibility Notes

- The component inherits all accessibility features from Material-UI's Popover
- Proper focus management is handled automatically
- Escape key closes the popover by default
- Screen readers can navigate the content properly
- ARIA attributes are applied automatically

## Best Practices

1. **Positioning**: Use appropriate `anchorOrigin` and `transformOrigin` props to ensure the popover appears in the optimal location
2. **Content**: Keep popover content concise and focused on the primary action or information
3. **Interactive Elements**: Ensure interactive elements within the popover are keyboard accessible
4. **Mobile**: Consider the mobile experience - popovers should adapt well to smaller screens
5. **Performance**: Use the `glow` and `pulse` effects sparingly as they involve CSS animations and filters

## Testing

The Popover component includes test IDs for reliable testing. Use the `dataTestId` prop to provide custom test identifiers.

### Test IDs

| Element | Test ID Pattern | Default Test ID |
|---------|----------------|-----------------|
| Popover container | `{dataTestId}` or default | `popover-content` |

### Testing Best Practices

1. **Visibility Testing**: Always verify the popover is visible before interacting with its content
2. **Anchor Testing**: Test that the popover is properly positioned relative to its anchor element
3. **Close Behavior**: Test that clicking outside, pressing Escape, and any close buttons properly close the popover
4. **Accessibility**: Verify focus management and keyboard navigation work correctly
5. **Content Testing**: Test all interactive elements within the popover content

### Common Test Scenarios

#### Testing Popover Visibility

```tsx
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

test('shows popover when open', () => {
  const anchorEl = document.createElement('div');
  render(
    <Popover open={true} anchorEl={anchorEl} dataTestId="user-popover">
      <div>Popover content</div>
    </Popover>
  );

  expect(screen.getByTestId('user-popover')).toBeInTheDocument();
  expect(screen.getByText('Popover content')).toBeVisible();
});
```

#### Testing Popover Close Behavior

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

test('closes popover when clicking outside', async () => {
  const user = userEvent.setup();
  const handleClose = jest.fn();
  const anchorEl = document.createElement('div');

  render(
    <Popover open={true} anchorEl={anchorEl} onClose={handleClose} dataTestId="info-popover">
      <div>Information</div>
    </Popover>
  );

  // Click outside the popover
  await user.click(document.body);

  expect(handleClose).toHaveBeenCalled();
});
```

#### Testing Popover Variants

```tsx
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

test('applies glass variant styling', () => {
  const anchorEl = document.createElement('div');
  render(
    <Popover open={true} anchorEl={anchorEl} variant="glass" dataTestId="glass-popover">
      <div>Content</div>
    </Popover>
  );

  const popover = screen.getByTestId('glass-popover');
  expect(popover).toBeInTheDocument();
  // Additional style assertions can be added
});
```

#### Testing Popover with Custom Content

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

test('interacts with popover content', async () => {
  const user = userEvent.setup();
  const handleAction = jest.fn();
  const anchorEl = document.createElement('div');

  render(
    <Popover open={true} anchorEl={anchorEl} dataTestId="action-popover">
      <button onClick={handleAction}>Action Button</button>
    </Popover>
  );

  const button = screen.getByRole('button', { name: 'Action Button' });
  await user.click(button);

  expect(handleAction).toHaveBeenCalled();
});
```

#### Testing Popover Effects

```tsx
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

test('applies glow effect', () => {
  const anchorEl = document.createElement('div');
  render(
    <Popover open={true} anchorEl={anchorEl} glow dataTestId="glow-popover">
      <div>Glowing content</div>
    </Popover>
  );

  expect(screen.getByTestId('glow-popover')).toBeInTheDocument();
});

test('applies pulse animation', () => {
  const anchorEl = document.createElement('div');
  render(
    <Popover open={true} anchorEl={anchorEl} pulse dataTestId="pulse-popover">
      <div>Pulsing content</div>
    </Popover>
  );

  expect(screen.getByTestId('pulse-popover')).toBeInTheDocument();
});
```

### Integration Testing Notes

When testing components that use Popover:

1. **Mock Anchor Elements**: Always provide valid anchor elements for testing
2. **Portal Testing**: Remember that popovers render in a portal, so use appropriate queries
3. **Async Behavior**: Account for any transition/animation delays when testing visibility
4. **Cleanup**: Ensure popovers are properly cleaned up between tests to avoid state leakage
