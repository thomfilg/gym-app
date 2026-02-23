# Skeleton Component

A versatile loading placeholder component that mimics the shape and layout of content while it's loading. The Skeleton component provides smooth animations and various shape options to enhance the user experience during data loading states.

## Features

- **Multiple Variants**: Text, circular, rectangular, and wave animations
- **Customizable Animations**: Pulse, wave, or disabled animations
- **Advanced Effects**: Glassmorphism and shimmer effects
- **Multiple Instances**: Render multiple skeletons with configurable spacing
- **Intensity Control**: Adjustable opacity intensity (low, medium, high)
- **Responsive Design**: Adapts to different screen sizes and layouts
- **Accessibility**: Full ARIA support and screen reader compatibility

## Basic Usage

```tsx
import { Skeleton } from '@ui/components/layout/Skeleton';

// Basic text skeleton
<Skeleton />

// Circular avatar skeleton
<Skeleton variant="circular" width={40} height={40} />

// Rectangular image skeleton
<Skeleton variant="rectangular" width="100%" height={200} />

// Multiple skeletons with spacing
<Skeleton count={3} spacing={2} />
```

## Props

### Core Props

| Prop           | Type                                              | Default   | Description                                         |
| -------------- | ------------------------------------------------- | --------- | --------------------------------------------------- |
| `variant`      | `'text' \| 'circular' \| 'rectangular' \| 'wave'` | `'text'`  | Shape variant of the skeleton                       |
| `animation`    | `'pulse' \| 'wave' \| false`                      | `'pulse'` | Animation type (wave variant forces wave animation) |
| `width`        | `number \| string`                                | Auto      | Width of the skeleton                               |
| `height`       | `number \| string`                                | Auto      | Height of the skeleton                              |
| `count`        | `number`                                          | `1`       | Number of skeleton instances to render              |
| `spacing`      | `number`                                          | `1`       | Spacing between multiple skeletons                  |
| `borderRadius` | `number \| string`                                | -         | Custom border radius                                |

### Styling Props

| Prop            | Type                          | Default    | Description                      |
| --------------- | ----------------------------- | ---------- | -------------------------------- |
| `intensity`     | `'low' \| 'medium' \| 'high'` | `'medium'` | Opacity intensity level          |
| `glassmorphism` | `boolean`                     | `false`    | Enable glassmorphism effect      |
| `shimmer`       | `boolean`                     | `false`    | Enable shimmer animation overlay |
| `className`     | `string`                      | -          | Additional CSS classes           |
| `style`         | `React.CSSProperties`         | -          | Custom inline styles             |

### Accessibility Props

| Prop          | Type     | Default | Description                            |
| ------------- | -------- | ------- | -------------------------------------- |
| `data-testid` | `string` | -       | Test identifier for testing frameworks |

## Variants

### Text Skeleton

Default skeleton for text content with automatic width and no fixed height.

```tsx
<Skeleton variant="text" />
<Skeleton variant="text" width="60%" />
```

### Circular Skeleton

Perfect for avatars and circular placeholders.

```tsx
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="circular" width={60} height={60} />
```

### Rectangular Skeleton

Ideal for images, cards, and rectangular content areas.

```tsx
<Skeleton variant="rectangular" width="100%" height={200} />
<Skeleton variant="rectangular" width={300} height={150} />
```

### Wave Skeleton

Special rectangular variant with wave animation (overrides animation prop).

```tsx
<Skeleton variant="wave" width="100%" height={40} />
```

## Advanced Features

### Multiple Skeletons

Render multiple skeleton instances with consistent spacing.

```tsx
// Three text skeletons with spacing
<Skeleton count={3} spacing={1} />

// Multiple circular skeletons
<Skeleton variant="circular" width={40} height={40} count={5} spacing={2} />
```

### Intensity Levels

Control the opacity intensity for different visual prominence.

```tsx
<Skeleton intensity="low" />    {/* More subtle */}
<Skeleton intensity="medium" /> {/* Default */}
<Skeleton intensity="high" />   {/* More prominent */}
```

### Glassmorphism Effect

Modern glass-like appearance with backdrop blur.

```tsx
<Skeleton glassmorphism width="100%" height={100} />
```

### Shimmer Animation

Add a shimmer effect overlay for enhanced visual appeal.

```tsx
<Skeleton shimmer width="100%" height={40} />
```

## Common Patterns

### Profile Card Skeleton

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
  <Skeleton variant="circular" width={60} height={60} />
  <div style={{ flex: 1 }}>
    <Skeleton width="40%" />
    <Skeleton width="60%" />
  </div>
</div>
```

### List Item Skeletons

```tsx
<div>
  {Array.from({ length: 5 }).map((_, index) => (
    <div key={index} style={{ display: 'flex', marginBottom: 16 }}>
      <Skeleton variant="rectangular" width={80} height={60} />
      <div style={{ marginLeft: 16, flex: 1 }}>
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </div>
    </div>
  ))}
</div>
```

### Card Grid Skeleton

```tsx
<div
  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}
>
  {Array.from({ length: 6 }).map((_, index) => (
    <div key={index}>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton width="80%" style={{ marginTop: 8 }} />
      <Skeleton width="60%" />
    </div>
  ))}
</div>
```

## Accessibility

The Skeleton component follows accessibility best practices:

- **ARIA Compliance**: Automatically includes appropriate ARIA attributes
- **Screen Reader Support**: Announces loading states to screen readers
- **Focus Management**: Properly handles focus states during content transitions
- **Loading Context**: Provides semantic context for loading states

### Screen Reader Announcements

The component announces loading states and provides context about the content being loaded.

## Best Practices

### Performance

- Use `count` prop instead of mapping multiple `<Skeleton>` components
- Prefer specific dimensions over percentage widths when possible
- Avoid excessive use of advanced effects (glassmorphism, shimmer) for better performance

### UX Guidelines

- Match skeleton shapes to the actual content layout
- Use consistent animation timing across your application
- Provide realistic loading duration feedback
- Consider intensity levels based on your design system

### Responsive Design

- Use percentage widths for responsive layouts
- Test skeletons across different viewport sizes
- Consider mobile-specific skeleton layouts

## Theme Integration

The component integrates with MUI's theming system:

- Automatically adapts to light/dark mode
- Uses theme colors for skeleton backgrounds
- Respects theme spacing and typography scales
- Supports custom theme overrides

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- **Loading**: For simple loading indicators
- **Spinner**: For circular loading animations
- **ProgressBar**: For determinate progress indication
