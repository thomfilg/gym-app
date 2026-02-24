# Badge Component

A highly customizable badge component for displaying notifications, counts, status indicators, and labels with advanced visual effects and animations.

## Features

- **Multiple Variants**: Default, dot, count, gradient, glass, outline, secondary, destructive, success, and warning styles
- **Size Options**: Extra small (xs), small (sm), medium (md), and large (lg) sizes
- **Visual Effects**: Glow, pulse, shimmer, and bounce animations
- **Positioning**: Four corner positions (top-right, top-left, bottom-right, bottom-left)
- **Interactive**: Closable badges with onClose callback
- **Customizable**: Icons, custom content, and flexible styling
- **Accessible**: Full ARIA support and screen reader compatibility

## Usage

```tsx
import { Badge } from '@/components/data-display/Badge';

// Basic badge with count
<Badge badgeContent={4}>
  <MailIcon />
</Badge>

// Dot variant for status indicator
<Badge variant="dot" color="success">
  <NotificationsIcon />
</Badge>

// Gradient badge with glow effect
<Badge
  variant="gradient"
  content="New"
  glow
  color="primary"
>
  <ProductIcon />
</Badge>

// Closable badge with custom icon
<Badge
  content="Premium"
  closable
  onClose={() => console.log('Badge closed')}
  icon={<StarIcon />}
>
  <UserAvatar />
</Badge>
```

## Props

### BadgeProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'dot' \| 'count' \| 'gradient' \| 'glass' \| 'outline' \| 'secondary' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Visual style variant |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the badge |
| color | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'primary'` | Theme color for the badge |
| content | `React.ReactNode` | - | Custom content to display in badge |
| badgeContent | `React.ReactNode` | - | Badge content (alternative to content prop) |
| position | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position of badge relative to child |
| max | `number` | `99` | Maximum count to display (shows "max+" when exceeded) |
| showZero | `boolean` | `false` | Whether to show badge when count is zero |
| glow | `boolean` | `false` | Enable glow effect around badge |
| pulse | `boolean` | `false` | Enable pulse animation |
| animate | `boolean` | `true` | Animate badge appearance on mount |
| shimmer | `boolean` | `false` | Enable shimmer animation effect |
| bounce | `boolean` | `false` | Enable bounce animation on mount |
| closable | `boolean` | `false` | Show close button to dismiss badge |
| onClose | `() => void` | - | Callback when badge is closed |
| icon | `React.ReactNode` | - | Icon element to display before content |
| invisible | `boolean` | `false` | Hide the badge |
| aria-label | `string` | - | Accessibility label for screen readers |
| aria-live | `'off' \| 'polite' \| 'assertive'` | `'polite'` | ARIA live region behavior |
| aria-atomic | `boolean` | `true` | Whether live region should be atomic |
| data-testid | `string` | - | Custom test ID for testing |

Plus all standard MUI Badge props.

## Variants

### Default
Standard badge with solid background color and rounded corners.

```tsx
<Badge content="5" color="primary">
  <NotificationIcon />
</Badge>
```

### Dot
Small circular indicator without content, perfect for status indicators.

```tsx
<Badge variant="dot" color="success">
  <UserIcon />
</Badge>
```

### Count
Circular badge optimized for displaying numeric counts.

```tsx
<Badge variant="count" badgeContent={42}>
  <MessageIcon />
</Badge>
```

### Gradient
Badge with gradient background from main to dark color.

```tsx
<Badge variant="gradient" content="Pro" color="primary">
  <FeatureIcon />
</Badge>
```

### Glass
Modern glassmorphism effect with blur and transparency.

```tsx
<Badge variant="glass" content="Beta" color="primary">
  <ProductIcon />
</Badge>
```

### Outline
Transparent badge with colored border.

```tsx
<Badge variant="outline" content="Draft" color="neutral">
  <DocumentIcon />
</Badge>
```

### Secondary
Badge with light background and colored text.

```tsx
<Badge variant="secondary" content="New" color="primary">
  <ItemIcon />
</Badge>
```

### Destructive
High-impact error badge for critical notifications.

```tsx
<Badge variant="destructive" content="!" color="error">
  <AlertIcon />
</Badge>
```

### Success
Pre-styled success badge.

```tsx
<Badge variant="success" content="Active">
  <StatusIcon />
</Badge>
```

### Warning
Pre-styled warning badge.

```tsx
<Badge variant="warning" content="Pending">
  <TaskIcon />
</Badge>
```

## Sizes

The badge component supports four sizes:

```tsx
// Extra small
<Badge size="xs" content="1" />

// Small
<Badge size="sm" content="1" />

// Medium (default)
<Badge size="md" content="1" />

// Large
<Badge size="lg" content="1" />
```

## Accessibility

- **ARIA Support**: Full ARIA attributes including labels, live regions, and atomic updates
- **Screen Readers**: Badge content is announced to screen readers with customizable behavior
- **Keyboard Navigation**: Closable badges support keyboard interaction
- **Focus Management**: Proper focus handling for interactive elements
- **Live Regions**: Dynamic content changes are announced (configurable with `aria-live`)

### ARIA Best Practices

```tsx
// Notification badge with proper ARIA
<Badge
  badgeContent={5}
  aria-label="5 unread notifications"
  aria-live="polite"
>
  <NotificationIcon />
</Badge>

// Status indicator with description
<Badge
  variant="dot"
  color="success"
  aria-label="Online"
>
  <UserAvatar />
</Badge>
```

## Examples

### Basic Notification Badge

```tsx
<Badge badgeContent={4} color="error">
  <MailIcon />
</Badge>
```

### Count with Maximum

```tsx
<Badge variant="count" badgeContent={150} max={99}>
  <NotificationIcon />
</Badge>
// Displays "99+"
```

### Status Indicator

```tsx
<Badge variant="dot" color="success" position="bottom-right">
  <Avatar src="/user.jpg" />
</Badge>
```

### Animated Badge

```tsx
<Badge
  content="New"
  glow
  pulse
  color="primary"
>
  <FeatureCard />
</Badge>
```

### Closable Badge with Icon

```tsx
<Badge
  content="Premium"
  variant="gradient"
  closable
  onClose={handleDismiss}
  icon={<StarIcon />}
  color="warning"
>
  <ProductCard />
</Badge>
```

### Glass Effect Badge

```tsx
<Badge
  variant="glass"
  content="Beta"
  shimmer
  position="top-left"
>
  <AppIcon />
</Badge>
```

### Multiple Sizes

```tsx
<Stack direction="row" spacing={2}>
  <Badge size="xs" content="1"><Icon /></Badge>
  <Badge size="sm" content="1"><Icon /></Badge>
  <Badge size="md" content="1"><Icon /></Badge>
  <Badge size="lg" content="1"><Icon /></Badge>
</Stack>
```

### Different Positions

```tsx
<Grid container spacing={2}>
  <Badge position="top-right" content="TR"><Box /></Badge>
  <Badge position="top-left" content="TL"><Box /></Badge>
  <Badge position="bottom-right" content="BR"><Box /></Badge>
  <Badge position="bottom-left" content="BL"><Box /></Badge>
</Grid>
```

### With Animations

```tsx
// Bounce on mount
<Badge bounce content="New">
  <ProductIcon />
</Badge>

// Shimmer effect
<Badge shimmer variant="gradient" content="Sale">
  <OfferCard />
</Badge>

// Glow and pulse combined
<Badge glow pulse content="Live" color="error">
  <StreamIcon />
</Badge>
```

## Testing

### Test IDs

The Badge component includes comprehensive `data-testid` attributes for reliable testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `badge` | Main badge wrapper | Root badge container (default) |
| `{dataTestId}` | Main badge wrapper | Root badge with custom testId |
| `badge-content-wrapper` | Badge content wrapper | Inner badge element containing all content (default) |
| `{dataTestId}-content-wrapper` | Badge content wrapper | Inner wrapper with custom testId |
| `badge-content` | Content span | Span containing the badge text/number (default) |
| `{dataTestId}-content` | Content span | Content span with custom testId |
| `badge-icon` | Icon span | Span containing the icon element (default) |
| `{dataTestId}-icon` | Icon span | Icon span with custom testId |
| `badge-close` | Close button | IconButton for dismissing badge (default) |
| `{dataTestId}-close` | Close button | Close button with custom testId |

### Testing Best Practices

**Wait for Badge to Render:**
```typescript
const badge = await canvas.findByTestId('badge');
expect(badge).toBeInTheDocument();
```

**Test with Custom TestId:**
```typescript
<Badge data-testid="notification-badge" badgeContent={5}>
  <MailIcon />
</Badge>

const badge = await canvas.findByTestId('notification-badge');
const content = await canvas.findByTestId('notification-badge-content');
expect(content).toHaveTextContent('5');
```

**Test Badge Variants:**
```typescript
// Dot variant (no content)
const dotBadge = await canvas.findByTestId('status-badge-content-wrapper');
expect(dotBadge).toHaveClass('MuiBadge-dot');

// Count variant with max
const countBadge = await canvas.findByTestId('count-badge-content');
expect(countBadge).toHaveTextContent('99+');
```

**Test Closable Badge:**
```typescript
const closeButton = await canvas.findByTestId('badge-close');
await userEvent.click(closeButton);
expect(onClose).toHaveBeenCalled();
```

**Test Badge with Icon:**
```typescript
const icon = await canvas.findByTestId('premium-badge-icon');
expect(icon).toBeInTheDocument();

const content = await canvas.findByTestId('premium-badge-content');
expect(content).toHaveTextContent('Premium');
```

**Test Visibility:**
```typescript
// Initially visible
const badge = await canvas.findByTestId('badge');
expect(badge).toBeVisible();

// After closing
await userEvent.click(closeButton);
await waitFor(() => {
  expect(badge).not.toBeInTheDocument();
});
```

**Test Accessibility:**
```typescript
const badge = await canvas.findByTestId('notification-badge-content-wrapper');
expect(badge).toHaveAttribute('aria-label', '5 unread messages');
expect(badge).toHaveAttribute('aria-live', 'polite');
expect(badge).toHaveAttribute('aria-atomic', 'true');
```

### Common Test Scenarios

1. **Basic Rendering** - Verify badge renders with correct content
2. **Count Display** - Test numeric counts and max threshold
3. **Zero Handling** - Test showZero prop behavior
4. **Variant Styles** - Verify correct variant classes applied
5. **Size Variations** - Test different size props
6. **Positioning** - Verify badge appears in correct corner
7. **Closable** - Test close button interaction and callback
8. **With Icon** - Test icon rendering alongside content
9. **Animations** - Test glow, pulse, shimmer, bounce effects
10. **Visibility** - Test invisible prop and dynamic visibility
11. **Color Theming** - Verify theme colors applied correctly
12. **Accessibility** - Test ARIA attributes and announcements
13. **Custom Content** - Test rendering of custom React nodes

### Example Test

```typescript
import { Badge } from '@/components/data-display/Badge';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Badge', () => {
  it('should render with correct count and handle close', async () => {
    const handleClose = vi.fn();

    render(
      <Badge
        data-testid="notification-badge"
        badgeContent={42}
        closable
        onClose={handleClose}
        color="error"
      >
        <MailIcon />
      </Badge>
    );

    // Verify badge renders
    const badge = await screen.findByTestId('notification-badge');
    expect(badge).toBeInTheDocument();

    // Verify content
    const content = await screen.findByTestId('notification-badge-content');
    expect(content).toHaveTextContent('42');

    // Test close button
    const closeButton = await screen.findByTestId('notification-badge-close');
    await userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledOnce();
  });
});
```
