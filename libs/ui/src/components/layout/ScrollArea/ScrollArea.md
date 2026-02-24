# ScrollArea Component

A custom scrollable area component that provides styled scrollbars and smooth scrolling behavior. The ScrollArea component wraps content in a scrollable container with customizable scrollbar appearance, auto-hide functionality, and native scroll behavior options.

## Features

- **Customizable Scrollbars**: Thin, medium, or thick scrollbar sizes
- **Visual Variants**: Default, overlay, and glass effect variants
- **Orientation Support**: Vertical, horizontal, or both scroll directions
- **Auto-hide Scrollbars**: Scrollbars can automatically hide when not in use
- **Smooth Scrolling**: Optional smooth scrolling behavior
- **Scroll-to-Top Button**: Configurable scroll-to-top functionality
- **Empty State**: Display custom content when no scrollable content is present
- **Loading State**: Show loading indicator during content loading
- **Responsive Design**: Supports responsive width and height configurations

## Props

| Prop                   | Type                                   | Default      | Description                                         |
| ---------------------- | -------------------------------------- | ------------ | --------------------------------------------------- |
| `children`             | `ReactNode`                            | -            | Content to be rendered inside the scrollable area   |
| `width`                | `number \| string`                     | `400`        | Width of the scroll area container                  |
| `height`               | `number \| string`                     | `300`        | Height of the scroll area container                 |
| `maxHeight`            | `number \| string`                     | -            | Maximum height before scrolling is enabled          |
| `maxWidth`             | `number \| string`                     | -            | Maximum width before scrolling is enabled           |
| `orientation`          | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Scroll orientation                                  |
| `scrollbarSize`        | `'thin' \| 'medium' \| 'thick'`        | `'medium'`   | Size of the scrollbar                               |
| `autoHide`             | `boolean`                              | `true`       | Whether scrollbars auto-hide when not in use        |
| `smoothScroll`         | `boolean`                              | `true`       | Enable smooth scrolling behavior                    |
| `variant`              | `'default' \| 'overlay' \| 'glass'`    | `'default'`  | Visual variant                                      |
| `scrollToTopButton`    | `boolean`                              | `false`      | Show scroll-to-top button                           |
| `scrollToTopThreshold` | `number`                               | `100`        | Scroll distance before showing scroll-to-top button |
| `disabled`             | `boolean`                              | `false`      | Disable scrolling                                   |
| `loading`              | `boolean`                              | `false`      | Loading state                                       |
| `emptyContent`         | `ReactNode`                            | -            | Content to display when no scrollable content       |
| `contentPadding`       | `number`                               | -            | Padding for the scrollable content                  |
| `scrollbarColor`       | `string`                               | -            | Custom scrollbar color                              |
| `scrollbarTrackColor`  | `string`                               | -            | Custom scrollbar track color                        |
| `className`            | `string`                               | -            | Additional CSS class names                          |
| `sx`                   | `SxProps`                              | -            | MUI sx prop for custom styling                      |
| `onScroll`             | `(event: Event) => void`               | -            | Scroll event handler                                |

## Usage Examples

### Basic Usage

```tsx
import { ScrollArea } from '@procurement/ui';

function BasicExample() {
  return (
    <ScrollArea width={400} height={300}>
      <div>{/* Your scrollable content here */}</div>
    </ScrollArea>
  );
}
```

### Horizontal Scrolling

```tsx
function HorizontalExample() {
  return (
    <ScrollArea width={400} height={200} orientation="horizontal">
      <div style={{ display: 'flex', width: 'max-content' }}>
        {/* Wide content that needs horizontal scrolling */}
      </div>
    </ScrollArea>
  );
}
```

### Glass Effect Variant

```tsx
function GlassExample() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <ScrollArea width={400} height={300} variant="glass">
        <div>{/* Content with glass effect backdrop */}</div>
      </ScrollArea>
    </div>
  );
}
```

### With Scroll-to-Top Button

```tsx
function ScrollToTopExample() {
  return (
    <ScrollArea width={400} height={300} scrollToTopButton scrollToTopThreshold={50}>
      <div>{/* Long content that benefits from scroll-to-top */}</div>
    </ScrollArea>
  );
}
```

## Accessibility

The ScrollArea component includes comprehensive accessibility features:

- **Keyboard Navigation**: Supports arrow keys, Page Up/Down, Home/End
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Focus Management**: Maintains focus within scrollable content
- **High Contrast**: Scrollbar visibility in high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` for smooth scrolling

## Best Practices

1. **Performance**: Use virtualization for very large lists instead of ScrollArea
2. **Mobile**: Consider native scrolling on mobile devices for better performance
3. **Nesting**: Avoid deeply nested scroll areas as they can confuse users
4. **Height**: Always provide explicit height or maxHeight for vertical scrolling
5. **Content**: Use empty state when there's no content to scroll
6. **Loading**: Show loading state during content fetch operations

## Browser Compatibility

- Modern browsers with CSS custom scrollbar support
- Fallback to native scrollbars on older browsers
- Touch device support for mobile scrolling
