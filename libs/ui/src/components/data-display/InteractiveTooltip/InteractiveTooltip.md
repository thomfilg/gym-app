# InteractiveTooltip Component

## Overview

The InteractiveTooltip component displays contextual information with advanced interaction patterns. Unlike standard tooltips, it supports click-to-pin functionality and dual content modes - showing brief information on hover and detailed content when pinned. Built on MUI's Tooltip with custom styling and interactive behavior.

## Features

- **Click-to-Pin**: Click to keep tooltip open, click outside to close
- **Dual Content Modes**: Different content for hover vs pinned states
- **Multiple Variants**: Default, dark, light, and glass morphism styles with distinct appearances
- **Size Options**: Small, medium, and large sizes
- **Visual Effects**: Glow effect and pulse animation support
- **Outside Click Detection**: Automatically closes when clicking outside
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Responsive**: Adapts to different screen sizes and viewport widths
- **Performance**: Optimized with minimal re-renders and smooth animations

## Variant Comparison

Each variant is designed for specific use cases with distinct visual characteristics:

| Variant   | Background              | Text Color | Border       | Shadow       | Best For                           |
| --------- | ----------------------- | ---------- | ------------ | ------------ | ---------------------------------- |
| `default` | Dark gray (92% opacity) | White      | None         | Medium       | General use, neutral appearance    |
| `dark`    | Pure black (#000)       | White      | Subtle white | Strong       | High contrast, emphasis            |
| `light`   | White                   | Dark gray  | Gray border  | Soft         | Dark mode, light backgrounds       |
| `glass`   | Translucent (75%)       | Theme text | Subtle       | Soft + Blur  | Modern UI, complex backgrounds     |

## Use Cases

- **Data Visualizations**: Heatmaps, charts, and graphs where users need to compare detailed information
- **Complex Information**: Showing summary on hover, full details when pinned
- **Interactive Tables**: Cell tooltips that can be pinned for detailed inspection
- **Status Indicators**: Quick status on hover, detailed metrics when clicked

## Props

### Core Props

| Prop             | Type              | Default     | Description                                              |
| ---------------- | ----------------- | ----------- | -------------------------------------------------------- |
| `hoverContent`   | `React.ReactNode` | -           | **Required.** Content displayed when hovering (not pinned) |
| `pinnedContent`  | `React.ReactNode` | -           | **Required.** Content displayed when pinned (clicked)    |
| `children`       | `React.ReactElement` | -        | **Required.** Element that triggers the tooltip          |
| `clickable`      | `boolean`         | `true`      | Whether tooltip can be pinned by clicking                |
| `variant`        | `'default' \| 'dark' \| 'light' \| 'glass'` | `'default'` | Visual style variant |
| `size`           | `'sm' \| 'md' \| 'lg'` | `'md'`  | Size of the tooltip                                      |
| `glow`           | `boolean`         | `false`     | Whether tooltip has glow effect                          |
| `pulse`          | `boolean`         | `false`     | Whether tooltip has pulse animation                      |
| `maxWidth`       | `number`          | `300`       | Maximum width of tooltip in pixels                       |
| `className`      | `string`          | -           | Custom class name for wrapper                            |
| `dataTestId`     | `string`          | -           | Test ID for testing (applied to trigger and content)     |

### Callback Props

| Prop      | Type         | Description                        |
| --------- | ------------ | ---------------------------------- |
| `onPin`   | `() => void` | Called when tooltip is pinned      |
| `onUnpin` | `() => void` | Called when tooltip is unpinned    |

### Additional Props

All MUI TooltipProps are supported except `variant` and `title` (replaced by our custom props).

## Usage Examples

### Basic Interactive Tooltip

```tsx
import { InteractiveTooltip, Button } from '@gym-app/ui';

<InteractiveTooltip
  hoverContent="Brief description"
  pinnedContent={
    <div>
      <h4>Detailed Information</h4>
      <p>More comprehensive details shown when pinned.</p>
    </div>
  }
>
  <Button>Hover or Click</Button>
</InteractiveTooltip>;
```

### Heatmap Cell with Metrics

```tsx
import { InteractiveTooltip } from '@gym-app/ui';

<InteractiveTooltip
  hoverContent="95.2% Success Rate"
  pinnedContent={
    <div>
      <h4>Performance Metrics</h4>
      <ul>
        <li>Success Rate: 95.2%</li>
        <li>Total Requests: 1,247</li>
        <li>Avg Response: 145ms</li>
        <li>Errors: 60</li>
      </ul>
    </div>
  }
  variant="glass"
  size="md"
>
  <div className="heatmap-cell">95.2%</div>
</InteractiveTooltip>;
```

### With Callbacks

```tsx
<InteractiveTooltip
  hoverContent="Quick info"
  pinnedContent="Detailed info"
  onPin={() => console.log('Tooltip pinned')}
  onUnpin={() => console.log('Tooltip unpinned')}
>
  <Button>Interactive</Button>
</InteractiveTooltip>
```

### Non-Clickable (Standard Tooltip Behavior)

```tsx
<InteractiveTooltip
  hoverContent="Hover-only tooltip"
  pinnedContent="Never shown"
  clickable={false}
>
  <Button>Hover Only</Button>
</InteractiveTooltip>
```

### Variant Examples

Each variant has distinct visual characteristics:

```tsx
// Default - Dark gray with medium opacity and subtle shadow
// Best for: General use, matches most UI contexts
<InteractiveTooltip
  hoverContent="Default hover"
  pinnedContent="Default pinned"
  variant="default"
>
  <Button>Default</Button>
</InteractiveTooltip>

// Dark - Pure black with stronger shadow and subtle border
// Best for: High contrast, emphasis on dark backgrounds
<InteractiveTooltip
  hoverContent="Dark hover"
  pinnedContent="Dark pinned"
  variant="dark"
>
  <Button>Dark</Button>
</InteractiveTooltip>

// Light - White background with dark text and visible border
// Best for: Dark mode UIs, high contrast against dark backgrounds
<InteractiveTooltip
  hoverContent="Light hover"
  pinnedContent="Light pinned"
  variant="light"
>
  <Button>Light</Button>
</InteractiveTooltip>

// Glass - Frosted glass effect with backdrop blur (75% opacity)
// Best for: Modern UIs, overlaying complex backgrounds
<InteractiveTooltip
  hoverContent="Glass hover"
  pinnedContent="Glass pinned"
  variant="glass"
>
  <Button>Glass</Button>
</InteractiveTooltip>
```

### Size Variations

```tsx
// Small tooltip
<InteractiveTooltip
  hoverContent="Small"
  pinnedContent="Small detailed"
  size="sm"
>
  <Button size="small">Small</Button>
</InteractiveTooltip>

// Large tooltip
<InteractiveTooltip
  hoverContent="Large"
  pinnedContent="Large detailed"
  size="lg"
>
  <Button size="large">Large</Button>
</InteractiveTooltip>
```

### Visual Effects

```tsx
// Glow effect
<InteractiveTooltip
  hoverContent="Glowing"
  pinnedContent="Still glowing"
  glow
>
  <Button>Glow</Button>
</InteractiveTooltip>

// Pulse animation
<InteractiveTooltip
  hoverContent="Pulsing"
  pinnedContent="Still pulsing"
  pulse
>
  <Button>Pulse</Button>
</InteractiveTooltip>

// Combined effects
<InteractiveTooltip
  hoverContent="Glowing and pulsing"
  pinnedContent="Still animated"
  glow
  pulse
>
  <Button>Combined</Button>
</InteractiveTooltip>
```

### Custom Placement

```tsx
<InteractiveTooltip
  hoverContent="Top placement"
  pinnedContent="Detailed top"
  placement="top"
>
  <Button>Top</Button>
</InteractiveTooltip>

<InteractiveTooltip
  hoverContent="Right placement"
  pinnedContent="Detailed right"
  placement="right"
>
  <Button>Right</Button>
</InteractiveTooltip>
```

## Behavior

### Interaction Flow

1. **Hover**: Shows `hoverContent` on mouse enter
2. **Click**: Pins tooltip and switches to `pinnedContent`
3. **Click Trigger Again**: Unpins tooltip
4. **Click Outside**: Unpins tooltip
5. **Unhover (when not pinned)**: Hides tooltip

### Pinned State

When pinned:
- Tooltip remains open regardless of hover state
- Shows `pinnedContent` instead of `hoverContent`
- Click outside to close
- Click trigger again to toggle

### Non-Clickable Mode

When `clickable={false}`:
- Behaves like standard tooltip
- Only shows on hover
- Always displays `hoverContent`
- `pinnedContent` is never shown

## Accessibility

The InteractiveTooltip component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `role="tooltip"` and ARIA labeling
- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Reader**: Compatible with screen reader technologies
- **Focus Management**: Maintains focus on trigger elements
- **High Contrast**: Supports high contrast mode and theme variations
- **Interactive Content**: Pinned tooltips allow interaction with content

## Best Practices

1. **Keep hover content brief** - Show only essential info on hover
2. **Use pinned content for details** - Full information when user clicks
3. **Consider mobile users** - Pin functionality works well on touch devices
4. **Don't hide critical information** - Ensure important data is accessible without interaction
5. **Test accessibility** - Verify tooltips work with keyboard and screen readers
6. **Use appropriate variants** - Match tooltip style to your design system
7. **Provide clear indicators** - Make it obvious the tooltip is clickable
8. **Optimize content size** - Keep pinned content concise and scannable

## Theme Integration

The InteractiveTooltip component integrates with the MUI theme system:

```tsx
// Uses theme colors and spacing
<InteractiveTooltip
  hoverContent="Themed"
  pinnedContent="Fully themed"
  variant="default"
>
  <Button>Themed</Button>
</InteractiveTooltip>
```

## Performance Notes

- Minimal re-renders with optimized state management
- Efficient outside click detection with cleanup
- Lightweight animations that don't impact performance
- Portal-based rendering for optimal z-index management
- Uses React.memo and useCallback for optimization

## Common Patterns

### Data Visualization Tooltips

```tsx
<InteractiveTooltip
  hoverContent={`${percentage}%`}
  pinnedContent={
    <div>
      <h4>{database}</h4>
      <p>Success Rate: {percentage}%</p>
      <p>Total Queries: {total}</p>
      <p>Errors: {errors}</p>
    </div>
  }
  variant="glass"
>
  <div className="chart-point" />
</InteractiveTooltip>
```

### Status Indicators

```tsx
<InteractiveTooltip
  hoverContent="Healthy"
  pinnedContent={
    <div>
      <h4>Service Status</h4>
      <p>Status: Healthy</p>
      <p>Uptime: 99.9%</p>
      <p>Last Check: 2 minutes ago</p>
    </div>
  }
  variant="default"
>
  <StatusBadge status="healthy" />
</InteractiveTooltip>
```

### Table Cell Details

```tsx
<InteractiveTooltip
  hoverContent={cellValue}
  pinnedContent={
    <div>
      <h4>Cell Details</h4>
      <p>Value: {cellValue}</p>
      <p>Last Updated: {lastUpdated}</p>
      <p>Source: {source}</p>
    </div>
  }
>
  <td>{cellValue}</td>
</InteractiveTooltip>
```

## Testing

The InteractiveTooltip component provides comprehensive testIds for automated testing.

### Test IDs

When you provide a `dataTestId` prop, the following test IDs are automatically generated:

| Element          | Test ID Pattern        | Description                           |
| ---------------- | ---------------------- | ------------------------------------- |
| Trigger Element  | `{dataTestId}-trigger` | The element that triggers the tooltip |
| Tooltip Content  | `{dataTestId}-content` | The tooltip popup content             |

### Testing Examples

#### Basic Interaction Test

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InteractiveTooltip, Button } from '@gym-app/ui';

test('shows hover content on hover and pinned content on click', async () => {
  const user = userEvent.setup();

  render(
    <InteractiveTooltip
      hoverContent="Hover text"
      pinnedContent="Pinned text"
      dataTestId="interactive-tooltip"
    >
      <Button>Trigger</Button>
    </InteractiveTooltip>
  );

  const trigger = screen.getByTestId('interactive-tooltip-trigger');

  // Hover shows hover content
  await user.hover(trigger);
  await waitFor(() => {
    expect(screen.getByText('Hover text')).toBeInTheDocument();
  });

  // Click shows pinned content
  await user.click(trigger);
  await waitFor(() => {
    expect(screen.getByText('Pinned text')).toBeInTheDocument();
    expect(screen.queryByText('Hover text')).not.toBeInTheDocument();
  });
});
```

#### Outside Click Test

```tsx
test('closes tooltip when clicking outside', async () => {
  const user = userEvent.setup();

  render(
    <div>
      <InteractiveTooltip
        hoverContent="Hover"
        pinnedContent="Pinned"
        dataTestId="tooltip"
      >
        <Button>Trigger</Button>
      </InteractiveTooltip>
      <div data-testid="outside">Outside</div>
    </div>
  );

  const trigger = screen.getByTestId('tooltip-trigger');
  const outside = screen.getByTestId('outside');

  // Pin tooltip
  await user.click(trigger);
  await waitFor(() => {
    expect(screen.getByText('Pinned')).toBeInTheDocument();
  });

  // Click outside
  await user.click(outside);
  await waitFor(() => {
    expect(screen.queryByText('Pinned')).not.toBeInTheDocument();
  });
});
```

#### Callback Test

```tsx
test('calls callbacks when pinning and unpinning', async () => {
  const user = userEvent.setup();
  const onPin = vi.fn();
  const onUnpin = vi.fn();

  render(
    <InteractiveTooltip
      hoverContent="Hover"
      pinnedContent="Pinned"
      onPin={onPin}
      onUnpin={onUnpin}
      dataTestId="tooltip"
    >
      <Button>Trigger</Button>
    </InteractiveTooltip>
  );

  const trigger = screen.getByTestId('tooltip-trigger');

  // Pin
  await user.click(trigger);
  expect(onPin).toHaveBeenCalledTimes(1);

  // Unpin
  await user.click(trigger);
  expect(onUnpin).toHaveBeenCalledTimes(1);
});
```

## Comparison with Standard Tooltip

| Feature                  | Tooltip | InteractiveTooltip |
| ------------------------ | ------- | ------------------ |
| Hover to show            | ✅      | ✅                 |
| Click to pin             | ❌      | ✅                 |
| Dual content modes       | ❌      | ✅                 |
| Outside click detection  | ❌      | ✅                 |
| Callbacks (pin/unpin)    | ❌      | ✅                 |
| Visual variants          | ✅      | ✅                 |
| Size options             | ✅      | ✅                 |
| Effects (glow, pulse)    | ✅      | ✅                 |
| ARIA support             | ✅      | ✅                 |

## When to Use

### Use InteractiveTooltip when:
- Users need to compare multiple detailed views
- Content is too detailed for a standard tooltip
- Users benefit from keeping information visible
- Working with data visualizations
- Touch devices are primary interface

### Use standard Tooltip when:
- Information is brief and simple
- No interaction needed with content
- Quick hint or label is sufficient
- Standard hover behavior is desired
