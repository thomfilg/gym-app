# Tooltip Component

## Overview

The Tooltip component displays contextual information when users hover over or focus on an element. Built on MUI's Tooltip with custom styling for variants, sizes, and effects like glow and pulse animations.

## Features

- **Multiple Variants**: Default, dark, light, and glass morphism styles
- **Size Options**: Small, medium, and large sizes
- **Visual Effects**: Glow effect and pulse animation support
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Responsive**: Adapts to different screen sizes and viewport widths
- **Performance**: Optimized with zero delays for testing and smooth animations

## Props

### Core Props

| Prop       | Type                                        | Default     | Description                                     |
| ---------- | ------------------------------------------- | ----------- | ----------------------------------------------- |
| `title`    | `React.ReactNode`                           | -           | **Required.** Tooltip content to display        |
| `children` | `React.ReactElement`                        | -           | **Required.** Element that triggers the tooltip |
| `variant`  | `'default' \| 'dark' \| 'light' \| 'glass'` | `'default'` | Visual style variant                            |
| `size`     | `'sm' \| 'md' \| 'lg'`                      | `'md'`      | Size of the tooltip                             |
| `glow`     | `boolean`                                   | `false`     | Whether tooltip has glow effect                 |
| `pulse`    | `boolean`                                   | `false`     | Whether tooltip has pulse animation             |
| `maxWidth` | `number`                                    | `300`       | Maximum width of tooltip in pixels              |

### Additional Props

All MUI TooltipProps are supported except `variant` (which is replaced by our custom variant prop).

## Usage Examples

### Basic Tooltip

```tsx
import { Tooltip, Button } from '@procurement/ui';

<Tooltip title="This is a basic tooltip">
  <Button>Hover me</Button>
</Tooltip>;
```

### Variant Examples

```tsx
// Dark variant
<Tooltip title="Dark tooltip" variant="dark">
  <Button>Dark</Button>
</Tooltip>

// Light variant
<Tooltip title="Light tooltip" variant="light">
  <Button>Light</Button>
</Tooltip>

// Glass morphism variant
<Tooltip title="Glass tooltip" variant="glass">
  <Button>Glass</Button>
</Tooltip>
```

### Size Variations

```tsx
// Small tooltip
<Tooltip title="Small tooltip" size="sm">
  <Button size="small">Small</Button>
</Tooltip>

// Large tooltip
<Tooltip title="Large tooltip" size="lg">
  <Button size="large">Large</Button>
</Tooltip>
```

### Visual Effects

```tsx
// Glow effect
<Tooltip title="Glowing tooltip" glow>
  <Button>Glow Effect</Button>
</Tooltip>

// Pulse animation
<Tooltip title="Pulsing tooltip" pulse>
  <Button>Pulse Effect</Button>
</Tooltip>

// Combined effects
<Tooltip title="Glow and pulse" glow pulse>
  <Button>Combined</Button>
</Tooltip>
```

### Click Trigger

```tsx
<Tooltip title="Click to see" trigger="click">
  <Button>Click me</Button>
</Tooltip>
```

### Placement Options

```tsx
<Tooltip title="Top placement" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip title="Right placement" placement="right">
  <Button>Right</Button>
</Tooltip>
```

## Accessibility

The Tooltip component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `role="tooltip"` and ARIA labeling
- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Reader**: Compatible with screen reader technologies
- **Focus Management**: Maintains focus on trigger elements
- **High Contrast**: Supports high contrast mode and theme variations

## Best Practices

1. **Keep content concise** - Tooltips should provide brief, helpful information
2. **Use appropriate triggers** - Hover for supplementary info, click for important details
3. **Consider mobile users** - Use click triggers or alternative patterns for touch devices
4. **Avoid essential information** - Don't put critical information only in tooltips
5. **Test accessibility** - Ensure tooltips work with keyboard navigation and screen readers
6. **Performance** - Use the component's built-in optimizations for smooth interactions

## Theme Integration

The Tooltip component integrates with the MUI theme system:

```tsx
// Uses theme colors and spacing
<Tooltip title="Themed tooltip" variant="default">
  <Button>Themed</Button>
</Tooltip>
```

## Performance Notes

- Zero enter/leave delays for optimal testing experience
- Efficient re-rendering with proper memoization
- Lightweight animations that don't impact performance
- Portal-based rendering for optimal z-index management

## Testing

The Tooltip component provides comprehensive testIds for automated testing.

### Test IDs

When you provide a `dataTestId` prop, the following test IDs are automatically generated:

| Element          | Test ID Pattern          | Description                           |
| ---------------- | ------------------------ | ------------------------------------- |
| Trigger Element  | `{dataTestId}-trigger`   | The element that triggers the tooltip |
| Tooltip Content  | `{dataTestId}-content`   | The tooltip popup content             |

### Testing Examples

#### Basic Tooltip Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip, Button } from '@procurement/ui';

test('shows tooltip on hover', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip title="Helpful information" dataTestId="help-tooltip">
      <Button>Help</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('help-tooltip-trigger');

  // Hover over trigger
  await user.hover(trigger);

  // Tooltip should appear
  await waitFor(() => {
    expect(screen.getByTestId('help-tooltip-content')).toBeInTheDocument();
  });

  // Check tooltip content
  expect(screen.getByText('Helpful information')).toBeInTheDocument();
});
```

#### Testing Tooltip Variants

```tsx
test('renders different variants correctly', async () => {
  const user = userEvent.setup();

  const { rerender } = render(
    <Tooltip title="Dark tooltip" variant="dark" dataTestId="variant-tooltip">
      <Button>Hover</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('variant-tooltip-trigger');
  await user.hover(trigger);

  const tooltip = await screen.findByTestId('variant-tooltip-content');
  expect(tooltip).toBeInTheDocument();

  // Test different variants
  rerender(
    <Tooltip title="Light tooltip" variant="light" dataTestId="variant-tooltip">
      <Button>Hover</Button>
    </Tooltip>
  );

  await user.hover(trigger);
  expect(await screen.findByTestId('variant-tooltip-content')).toBeInTheDocument();
});
```

#### Testing Visual Effects

```tsx
test('applies glow effect', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip title="Glowing tooltip" glow dataTestId="glow-tooltip">
      <Button>Glow</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('glow-tooltip-trigger');
  await user.hover(trigger);

  const tooltip = await screen.findByTestId('glow-tooltip-content');
  expect(tooltip).toBeInTheDocument();
});

test('applies pulse animation', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip title="Pulsing tooltip" pulse dataTestId="pulse-tooltip">
      <Button>Pulse</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('pulse-tooltip-trigger');
  await user.hover(trigger);

  const tooltip = await screen.findByTestId('pulse-tooltip-content');
  expect(tooltip).toBeInTheDocument();
});
```

#### Testing Accessibility

```tsx
test('has proper ARIA attributes', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip title="Accessible tooltip" dataTestId="a11y-tooltip">
      <Button>Accessible</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('a11y-tooltip-trigger');
  await user.hover(trigger);

  const tooltip = await screen.findByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
  expect(tooltip).toHaveTextContent('Accessible tooltip');
});

test('supports keyboard navigation', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip title="Keyboard accessible" dataTestId="keyboard-tooltip">
      <Button>Focus me</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('keyboard-tooltip-trigger');

  // Focus trigger with keyboard
  await user.tab();
  expect(trigger).toHaveFocus();

  // Tooltip should appear on focus
  await waitFor(() => {
    expect(screen.getByTestId('keyboard-tooltip-content')).toBeInTheDocument();
  });
});
```

#### Testing Placement

```tsx
test('renders tooltip at specified placement', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip
      title="Top placement"
      placement="top"
      dataTestId="placement-tooltip"
    >
      <Button>Positioned</Button>
    </Tooltip>
  );

  const trigger = screen.getByTestId('placement-tooltip-trigger');
  await user.hover(trigger);

  const tooltip = await screen.findByTestId('placement-tooltip-content');
  expect(tooltip).toBeInTheDocument();
});
```

#### Testing Controlled Behavior

```tsx
test('shows and hides tooltip programmatically', async () => {
  const { rerender } = render(
    <Tooltip title="Controlled tooltip" open={false} dataTestId="controlled-tooltip">
      <Button>Controlled</Button>
    </Tooltip>
  );

  // Should not be visible
  expect(screen.queryByTestId('controlled-tooltip-content')).not.toBeInTheDocument();

  // Show tooltip
  rerender(
    <Tooltip title="Controlled tooltip" open={true} dataTestId="controlled-tooltip">
      <Button>Controlled</Button>
    </Tooltip>
  );

  // Should be visible
  await waitFor(() => {
    expect(screen.getByTestId('controlled-tooltip-content')).toBeInTheDocument();
  });
});
```

#### Testing Size Variations

```tsx
test('renders different sizes correctly', async () => {
  const user = userEvent.setup();

  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

  for (const size of sizes) {
    const { unmount } = render(
      <Tooltip
        title={`${size} tooltip`}
        size={size}
        dataTestId={`${size}-tooltip`}
      >
        <Button>Size {size}</Button>
      </Tooltip>
    );

    const trigger = screen.getByTestId(`${size}-tooltip-trigger`);
    await user.hover(trigger);

    const tooltip = await screen.findByTestId(`${size}-tooltip-content`);
    expect(tooltip).toBeInTheDocument();

    unmount();
  }
});
```

### Best Practices for Testing

1. **Always use dataTestId** - Provides reliable selectors for both trigger and content
2. **Test user interactions** - Verify hover, focus, and click behaviors
3. **Wait for async updates** - Use `waitFor` and `findBy` queries for tooltip appearance
4. **Test accessibility** - Check ARIA attributes and keyboard navigation
5. **Test all variants** - Ensure different visual styles render correctly
6. **Clean up properly** - Unmount components to prevent memory leaks in test suites
