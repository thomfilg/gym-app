# AspectRatio Component

A flexible component for maintaining consistent aspect ratios for media content, images, videos, and other elements that require specific width-to-height relationships.

## Features

- Multiple preset aspect ratios (16:9, 4:3, 1:1, 3:2, 21:9)
- Custom ratio support
- Responsive design with automatic scaling
- Maximum width and height constraints
- Centered content alignment
- Overflow handling

## Basic Usage

```tsx
import { AspectRatio } from '@gym-app/ui';

function MyComponent() {
  return (
    <AspectRatio variant="16:9" maxWidth={600}>
      <img src="image.jpg" alt="Content" />
    </AspectRatio>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'16:9' \| '4:3' \| '1:1' \| '3:2' \| '21:9' \| 'custom'` | `'16:9'` | Predefined aspect ratio variant |
| `ratio` | `number` | - | Custom aspect ratio (width / height). Required when `variant="custom"` |
| `maxWidth` | `number \| string` | - | Maximum width constraint |
| `maxHeight` | `number \| string` | - | Maximum height constraint |
| `dataTestId` | `string` | - | Test ID for the container element |
| `sx` | `SxProps` | - | MUI system style overrides |

## Variants

### Standard Ratios

```tsx
// Widescreen video
<AspectRatio variant="16:9">
  <video src="video.mp4" />
</AspectRatio>

// Traditional TV/Monitor
<AspectRatio variant="4:3">
  <img src="photo.jpg" alt="Photo" />
</AspectRatio>

// Square (ideal for social media)
<AspectRatio variant="1:1">
  <div>Content</div>
</AspectRatio>

// Classic photo
<AspectRatio variant="3:2">
  <img src="landscape.jpg" alt="Landscape" />
</AspectRatio>

// Ultrawide
<AspectRatio variant="21:9">
  <iframe src="panorama.html" />
</AspectRatio>
```

### Custom Ratio

```tsx
// Custom 2.5:1 ratio
<AspectRatio variant="custom" ratio={2.5}>
  <div>Custom content</div>
</AspectRatio>
```

## Examples

### With Maximum Dimensions

```tsx
<AspectRatio
  variant="16:9"
  maxWidth={800}
  maxHeight={450}
>
  <img src="hero.jpg" alt="Hero" />
</AspectRatio>
```

### With Custom Styling

```tsx
<AspectRatio
  variant="1:1"
  sx={{
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 3,
  }}
>
  <Box sx={{ bgcolor: 'primary.main', width: '100%', height: '100%' }}>
    Content
  </Box>
</AspectRatio>
```

### Responsive Grid

```tsx
<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
  {images.map((img, index) => (
    <AspectRatio key={index} variant="1:1">
      <img src={img} alt={`Gallery ${index}`} />
    </AspectRatio>
  ))}
</Box>
```

## Testing

The AspectRatio component includes the `dataTestId` prop for testing purposes.

### Test ID Structure

```tsx
<AspectRatio dataTestId="hero-image" variant="16:9">
  <img src="hero.jpg" alt="Hero" />
</AspectRatio>
```

**Generated structure:**
- Container element: Uses the provided `dataTestId` value

### Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import { AspectRatio } from './AspectRatio';

test('renders with correct aspect ratio', () => {
  render(
    <AspectRatio dataTestId="test-ratio" variant="16:9">
      <div>Content</div>
    </AspectRatio>
  );

  const container = screen.getByTestId('test-ratio');
  expect(container).toBeInTheDocument();

  // Verify aspect ratio dimensions
  const rect = container.getBoundingClientRect();
  const aspectRatio = rect.width / rect.height;
  expect(aspectRatio).toBeCloseTo(16/9, 1);
});
```

### Testing Best Practices

1. **Container Testing**: Use `dataTestId` to verify the container renders correctly
2. **Dimension Verification**: Check actual dimensions match expected aspect ratio
3. **Content Testing**: Verify children are rendered and properly positioned
4. **Responsive Testing**: Test behavior at different viewport sizes
5. **Edge Cases**: Test extreme ratios, empty content, and maximum dimensions

## Accessibility

The component accepts all standard MUI Box props, including ARIA attributes:

```tsx
<AspectRatio
  variant="16:9"
  role="img"
  aria-label="Product showcase video"
>
  <video src="product.mp4" />
</AspectRatio>
```

## Performance Considerations

- Uses CSS-based aspect ratio calculation for optimal performance
- No JavaScript resize listeners required
- Efficient for rendering multiple instances in grids
- Minimal re-renders as aspect ratio is calculated once

## Common Use Cases

1. **Video Players**: Maintain consistent video dimensions across devices
2. **Image Galleries**: Create uniform grid layouts
3. **Card Components**: Ensure consistent card header image sizes
4. **Hero Sections**: Responsive hero images that maintain proportions
5. **Thumbnail Grids**: Social media-style square thumbnail layouts
6. **Embedded Content**: iframes and embedded media with proper sizing

## Browser Compatibility

Works with all modern browsers that support CSS Flexbox and percentage-based padding.
