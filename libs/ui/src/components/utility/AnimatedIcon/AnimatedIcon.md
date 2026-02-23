# AnimatedIcon Component

An animated icon wrapper component that can animate any icon or SVG with various effects like rotate, pulse, translate, glow, and glass morphism.

## Features

- **Icon Agnostic**: Works with any React node (MUI icons, custom SVGs, or any element)
- **Animation Variants**: Rotate, pulse, translate animations with customizable timing
- **Visual Effects**: Glow and glass morphism effects
- **Responsive**: Multiple size variants (sm, md, lg, xl)
- **Accessible**: Full ARIA support and keyboard navigation
- **Customizable**: Color, duration, delay, and loop controls

## Usage

### Basic Usage

```tsx
import { AnimatedIcon } from '@/components/enhanced/AnimatedIcon';
import { Settings } from '@mui/icons-material';

// Simple rotating animation
<AnimatedIcon variant="rotate">
  <Settings />
</AnimatedIcon>;
```

### Animation Variants

```tsx
// Rotate animation
<AnimatedIcon variant="rotate" duration={2}>
  <RefreshIcon />
</AnimatedIcon>

// Pulse animation
<AnimatedIcon variant="pulse" duration={1.5}>
  <FavoriteIcon />
</AnimatedIcon>

// Translate animation
<AnimatedIcon variant="translate" duration={1}>
  <StarIcon />
</AnimatedIcon>

// No animation (static)
<AnimatedIcon variant="none">
  <HomeIcon />
</AnimatedIcon>
```

### Effects

```tsx
// Glow effect
<AnimatedIcon variant="pulse" glow glowColor="#FFD700">
  <StarIcon />
</AnimatedIcon>

// Glass morphism effect
<AnimatedIcon variant="rotate" glass>
  <SettingsIcon />
</AnimatedIcon>

// Combined effects
<AnimatedIcon variant="pulse" glow glass glowColor="#FF6B6B">
  <FavoriteIcon />
</AnimatedIcon>
```

### Sizes and Timing

```tsx
// Different sizes
<AnimatedIcon variant="rotate" size="sm">
  <SmallIcon />
</AnimatedIcon>
<AnimatedIcon variant="pulse" size="xl">
  <LargeIcon />
</AnimatedIcon>

// Custom timing
<AnimatedIcon
  variant="rotate"
  duration={0.5}    // Fast rotation
  delay={1}         // Start after 1 second
  loop={false}      // Run only once
>
  <ProcessingIcon />
</AnimatedIcon>
```

### With Custom Icons

```tsx
// Custom SVG
<AnimatedIcon variant="pulse" size="lg">
  <svg width="44" height="44" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
</AnimatedIcon>

// Custom element
<AnimatedIcon variant="translate" size="md">
  <div style={{
    width: 28,
    height: 28,
    backgroundColor: 'currentColor',
    borderRadius: '50%'
  }} />
</AnimatedIcon>
```

### Interactive Usage

```tsx
const [isLoading, setIsLoading] = useState(false);

<AnimatedIcon
  variant={isLoading ? 'rotate' : 'none'}
  onClick={() => handleRefresh()}
  aria-label="Refresh data"
>
  <RefreshIcon />
</AnimatedIcon>;
```

## Props

| Prop         | Type                                           | Default  | Description                              |
| ------------ | ---------------------------------------------- | -------- | ---------------------------------------- |
| `children`   | `React.ReactNode`                              | -        | Icon element to animate (required)       |
| `variant`    | `'rotate' \| 'pulse' \| 'translate' \| 'none'` | `'none'` | Animation variant to apply               |
| `size`       | `'sm' \| 'md' \| 'lg' \| 'xl'`                 | `'md'`   | Size of the icon container               |
| `color`      | `string`                                       | -        | Custom color override                    |
| `duration`   | `number`                                       | `2`      | Animation duration in seconds            |
| `delay`      | `number`                                       | `0`      | Animation delay in seconds               |
| `loop`       | `boolean`                                      | `true`   | Whether animation should loop infinitely |
| `glow`       | `boolean`                                      | `false`  | Enable glow effect                       |
| `glass`      | `boolean`                                      | `false`  | Enable glass morphism effect             |
| `glowColor`  | `string`                                       | -        | Custom glow color (when glow is enabled) |
| `className`  | `string`                                       | -        | Additional CSS class name                |
| `style`      | `React.CSSProperties`                          | -        | Inline styles                            |
| `aria-label` | `string`                                       | -        | Accessibility label                      |
| `onClick`    | `(event: MouseEvent) => void`                  | -        | Click handler                            |
| `dataTestId` | `string`                                       | -        | Test ID for the icon container           |

## Animation Variants

### Rotate

Continuous 360-degree rotation animation. Perfect for loading states, refresh indicators, and processing animations.

### Pulse

Scale-based pulsing animation with opacity changes. Ideal for attention-grabbing elements, notifications, and interactive feedback.

### Translate

Vertical translation movement animation. Great for upload/download indicators, floating effects, and subtle motion.

### None

No animation applied. The icon remains static but still benefits from the container styling and effects.

## Effects

### Glow Effect

Adds a glowing aura around the icon with customizable color. The glow pulses in sync with the animation timing.

### Glass Morphism

Applies a translucent background with blur effects, creating a modern glass-like appearance. Works well on colorful backgrounds.

## Sizes

| Size | Container | Icon |
| ---- | --------- | ---- |
| `sm` | 24px      | 20px |
| `md` | 32px      | 28px |
| `lg` | 48px      | 44px |
| `xl` | 64px      | 60px |

## Accessibility

- Proper ARIA roles and labels
- Keyboard navigation support with `tabIndex`
- Screen reader compatible
- Respects `prefers-reduced-motion` preferences
- Focus management for interactive states

## Testing

The AnimatedIcon component includes comprehensive test support through the `dataTestId` prop.

### Using Test IDs

```tsx
import { render, screen } from '@testing-library/react';
import { AnimatedIcon } from '@/components/enhanced/AnimatedIcon';
import { Settings } from '@mui/icons-material';

// In your tests
test('should render with test ID', () => {
  render(
    <AnimatedIcon variant="rotate" dataTestId="loading-icon">
      <Settings />
    </AnimatedIcon>
  );

  const icon = screen.getByTestId('loading-icon');
  expect(icon).toBeInTheDocument();
});
```

### Testing Interactions

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimatedIcon } from '@/components/enhanced/AnimatedIcon';
import { Favorite } from '@mui/icons-material';

test('should handle click events', async () => {
  const handleClick = jest.fn();

  render(
    <AnimatedIcon
      variant="pulse"
      onClick={handleClick}
      dataTestId="favorite-button"
    >
      <Favorite />
    </AnimatedIcon>
  );

  const icon = screen.getByTestId('favorite-button');
  await userEvent.click(icon);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Accessibility

```tsx
import { render, screen } from '@testing-library/react';
import { AnimatedIcon } from '@/components/enhanced/AnimatedIcon';
import { Refresh } from '@mui/icons-material';

test('should have proper accessibility attributes', () => {
  render(
    <AnimatedIcon
      variant="rotate"
      aria-label="Refreshing data"
      dataTestId="refresh-icon"
    >
      <Refresh />
    </AnimatedIcon>
  );

  const icon = screen.getByTestId('refresh-icon');
  expect(icon).toHaveAttribute('role', 'img');
  expect(icon).toHaveAttribute('aria-label', 'Refreshing data');
});
```

### Test ID Naming Conventions

Follow these conventions for consistent test IDs:

- Use kebab-case: `animated-icon-settings`
- Be descriptive: `loading-spinner-icon` instead of `icon1`
- Include context: `user-profile-icon`, `notification-badge-icon`
- Avoid dynamic values when possible for test stability

## Best Practices

1. **Choose appropriate animations**: Use `rotate` for loading states, `pulse` for notifications, `translate` for uploads/downloads
2. **Consider performance**: Limit the number of simultaneous animations on a single page
3. **Accessibility first**: Always provide meaningful `aria-label` attributes
4. **Responsive design**: Use appropriate sizes for different screen sizes
5. **Animation timing**: Keep durations between 0.5s and 3s for optimal user experience
6. **Effects sparingly**: Use glow and glass effects to highlight important elements
7. **Test IDs**: Always provide `dataTestId` for components that need to be tested

## Examples

### Status Indicators

```tsx
// Loading state
<AnimatedIcon variant="rotate" size="sm" aria-label="Loading">
  <CircularProgress />
</AnimatedIcon>

// Success state
<AnimatedIcon variant="pulse" glow glowColor="#4CAF50" aria-label="Success">
  <CheckCircleIcon />
</AnimatedIcon>

// Error state
<AnimatedIcon variant="pulse" color="#F44336" aria-label="Error">
  <ErrorIcon />
</AnimatedIcon>
```

### Interactive Elements

```tsx
// Favorite button
<AnimatedIcon
  variant={isFavorited ? "pulse" : "none"}
  glow={isFavorited}
  glowColor="#FF6B6B"
  onClick={() => toggleFavorite()}
  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
>
  <FavoriteIcon />
</AnimatedIcon>

// Settings menu trigger
<AnimatedIcon
  variant="rotate"
  glass
  onClick={() => openSettings()}
  aria-label="Open settings"
>
  <SettingsIcon />
</AnimatedIcon>
```

### Contextual Usage

```tsx
// In a card header
<Card>
  <CardHeader
    avatar={
      <AnimatedIcon variant="pulse" size="md" glow>
        <Avatar>U</Avatar>
      </AnimatedIcon>
    }
    title="User Profile"
  />
</Card>

// In a notification
<Alert
  icon={
    <AnimatedIcon variant="pulse" size="sm">
      <InfoIcon />
    </AnimatedIcon>
  }
>
  Important information
</Alert>
```
