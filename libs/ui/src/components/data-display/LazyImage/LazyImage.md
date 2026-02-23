# LazyImage Component

A high-performance image component with lazy loading, progressive enhancement, and comprehensive error handling.

## Overview

The LazyImage component optimizes image loading performance by:
- Loading images only when they're about to enter the viewport
- Providing multiple loading states (skeleton, spinner, placeholder)
- Handling errors gracefully with fallback options
- Supporting progressive image loading with placeholders
- Offering retry mechanisms for failed loads

## Usage

### Basic Usage

```tsx
import { LazyImage } from '@gym-app/ui';

function App() {
  return (
    <LazyImage
      src="https://example.com/image.jpg"
      alt="Example image"
      width={400}
      height={300}
    />
  );
}
```

### With Placeholder

```tsx
<LazyImage
  src="https://example.com/high-res.jpg"
  placeholder="https://example.com/low-res.jpg"
  alt="Progressive loading example"
  loadingState="placeholder"
  width={800}
  height={600}
/>
```

### With Error Fallback

```tsx
<LazyImage
  src="https://example.com/image.jpg"
  fallback="https://example.com/fallback.jpg"
  alt="Image with fallback"
  retryOnError
  maxRetries={3}
/>
```

### Custom Fallback Component

```tsx
import { BrokenImageIcon } from '@mui/icons-material';

<LazyImage
  src="https://example.com/image.jpg"
  fallback={
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BrokenImageIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
      <Typography variant="caption">Image not available</Typography>
    </Box>
  }
  alt="Image with custom fallback"
/>
```

### With Skeleton Loading

```tsx
<LazyImage
  src="https://example.com/image.jpg"
  alt="Skeleton loading example"
  loadingState="skeleton"
  skeletonProps={{
    animation: 'wave',
    intensity: 'high'
  }}
  width={400}
  height={300}
/>
```

### With Spinner Loading

```tsx
<LazyImage
  src="https://example.com/image.jpg"
  alt="Spinner loading example"
  loadingState="spinner"
  spinnerProps={{
    size: 60,
    color: '#1976d2',
    thickness: 5
  }}
/>
```

### Eager Loading (No Lazy Loading)

```tsx
<LazyImage
  src="https://example.com/critical-image.jpg"
  alt="Above the fold image"
  lazy={false}
  fetchPriority="high"
  loading="eager"
/>
```

### With Custom Styles

```tsx
<LazyImage
  src="https://example.com/image.jpg"
  alt="Styled image"
  width={200}
  height={200}
  objectFit="cover"
  borderRadius={8}
  sx={{
    boxShadow: 3,
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 0.3s'
    }
  }}
/>
```

### With Callbacks

```tsx
<LazyImage
  src="https://example.com/image.jpg"
  alt="Image with callbacks"
  onLoadStart={() => console.log('Started loading')}
  onLoad={(event) => console.log('Image loaded', event)}
  onError={(event) => console.log('Image failed to load', event)}
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | **Required.** Image source URL |
| `alt` | `string` | - | **Required.** Alternative text for accessibility |
| `width` | `number \| string` | - | Image width |
| `height` | `number \| string` | `'auto'` | Image height |

### Loading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lazy` | `boolean` | `true` | Enable lazy loading |
| `loadingState` | `'skeleton' \| 'spinner' \| 'placeholder' \| 'none'` | `'skeleton'` | Type of loading indicator |
| `placeholder` | `string` | - | Placeholder image URL |
| `rootMargin` | `string` | `'100px'` | Intersection Observer margin |
| `threshold` | `number \| number[]` | `0` | Intersection Observer threshold |

### Error Handling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `string \| ReactNode` | - | Fallback content on error |
| `retryOnError` | `boolean` | `false` | Retry loading on error |
| `maxRetries` | `number` | `3` | Maximum retry attempts |
| `retryDelay` | `number` | `1000` | Delay between retries (ms) |

### Visual Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `objectFit` | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` | Object fit CSS property |
| `objectPosition` | `string` | `'center'` | Object position CSS property |
| `borderRadius` | `number \| string` | - | Border radius |
| `fadeIn` | `boolean` | `true` | Enable fade-in animation |
| `fadeInDuration` | `number` | `300` | Fade-in duration (ms) |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `onLoad` | `(event: SyntheticEvent) => void` | Called when image loads |
| `onError` | `(event: SyntheticEvent) => void` | Called on load error |
| `onLoadStart` | `() => void` | Called when loading starts |

### Performance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `decoding` | `'async' \| 'sync' \| 'auto'` | `'async'` | Image decoding hint |
| `loading` | `'eager' \| 'lazy' \| 'auto'` | `'auto'` | Native loading attribute |
| `fetchPriority` | `'high' \| 'low' \| 'auto'` | - | Fetch priority hint |

### Customization Props

| Prop | Type | Description |
|------|------|-------------|
| `skeletonProps` | `object` | Props for skeleton loader |
| `spinnerProps` | `object` | Props for spinner loader |
| `sx` | `CSSProperties` | Additional CSS styles |
| `className` | `string` | CSS class name |
| `data-testid` | `string` | Test ID for testing |

## Best Practices

### 1. Always Provide Alt Text
```tsx
// ✅ Good
<LazyImage src="profile.jpg" alt="User profile picture" />

// ❌ Bad
<LazyImage src="profile.jpg" alt="" />
```

### 2. Specify Dimensions for Layout Stability
```tsx
// ✅ Good - Prevents layout shift
<LazyImage
  src="banner.jpg"
  alt="Banner"
  width={1200}
  height={400}
/>

// ⚠️ Caution - May cause layout shift
<LazyImage src="banner.jpg" alt="Banner" />
```

### 3. Use Appropriate Loading States
```tsx
// For content images
<LazyImage
  src="content.jpg"
  alt="Article image"
  loadingState="skeleton"
/>

// For avatars or small images
<LazyImage
  src="avatar.jpg"
  alt="User avatar"
  loadingState="spinner"
  width={48}
  height={48}
/>

// For hero images with low-res placeholders
<LazyImage
  src="hero-hd.jpg"
  placeholder="hero-lowres.jpg"
  alt="Hero image"
  loadingState="placeholder"
/>
```

### 4. Handle Errors Gracefully
```tsx
// Provide meaningful fallbacks
<LazyImage
  src="product.jpg"
  alt="Product image"
  fallback={
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <ImageNotSupportedIcon />
      <Typography>Image unavailable</Typography>
    </Box>
  }
  retryOnError
/>
```

### 5. Optimize Critical Images
```tsx
// Above-the-fold images should load immediately
<LazyImage
  src="logo.png"
  alt="Company logo"
  lazy={false}
  fetchPriority="high"
/>
```

## Accessibility

The LazyImage component follows accessibility best practices:

- **Required alt text**: Ensures all images have descriptive alternative text
- **ARIA attributes**: Supports aria-label, aria-describedby, and role
- **Semantic HTML**: Uses proper img elements with appropriate attributes
- **Loading states**: Provides visual feedback during loading
- **Error handling**: Displays meaningful fallback content

## Performance Considerations

1. **Lazy Loading**: Images load only when needed, reducing initial page load
2. **Intersection Observer**: Efficient viewport detection with configurable margins
3. **Progressive Loading**: Support for placeholder images during load
4. **Retry Logic**: Automatic retry for failed loads with exponential backoff
5. **Native Loading**: Leverages browser's native lazy loading when available

## Migration from Original LazyImage

If migrating from the original LazyImage in status-site:

```tsx
// Old usage
import { LazyImage } from '../components/LazyImage';

<LazyImage
  src="image.jpg"
  alt="Description"
  width={400}
  height={300}
  sx={{ borderRadius: 4 }}
/>

// New usage (fully backward compatible)
import { LazyImage } from '@gym-app/ui';

<LazyImage
  src="image.jpg"
  alt="Description"
  width={400}
  height={300}
  sx={{ borderRadius: 4 }}
/>
```

### New Features Available After Migration

- Error handling with fallback
- Multiple loading states
- Retry mechanism
- Placeholder support
- Spinner overlay option
- Event callbacks
- Better TypeScript support
- Performance optimizations

## Related Components

- [Avatar](../Avatar/Avatar.md) - For user profile images
- [Skeleton](../../layout/Skeleton/Skeleton.md) - For loading states
- [EmptyState](../EmptyState/EmptyState.md) - For missing content