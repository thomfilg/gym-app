# Blockquote Component

A versatile blockquote component that displays quoted content with multiple visual styles and citation support. Perfect for testimonials, quotes, and cited content in articles and documentation.

## Features

- **Multiple variants**: Default (left border), bordered (gradient frame), citation (centered with backdrop)
- **Color theming**: Support for primary, secondary, success, warning, danger, and neutral color schemes
- **Citation support**: Display author names and source references
- **Accessibility**: Proper semantic HTML with blockquote element
- **Responsive design**: Adapts to different screen sizes
- **Theme integration**: Full MUI theme compatibility with dark/light modes

## Usage

### Basic Usage

```tsx
import { Blockquote } from '@procurement/ui';

export function BasicQuote() {
  return <Blockquote>The best way to predict the future is to invent it.</Blockquote>;
}
```

### With Author Citation

```tsx
export function QuoteWithAuthor() {
  return (
    <Blockquote author="Alan Kay" variant="bordered" color="primary">
      The best way to predict the future is to invent it.
    </Blockquote>
  );
}
```

### Citation Variant with Source

```tsx
export function CitationQuote() {
  return (
    <Blockquote
      variant="citation"
      author="Steve Jobs"
      source="Stanford Commencement Address, 2005"
      color="success"
    >
      Stay hungry. Stay foolish.
    </Blockquote>
  );
}
```

## Props

| Name       | Type                                                                          | Default     | Description                      |
| ---------- | ----------------------------------------------------------------------------- | ----------- | -------------------------------- |
| `variant`  | `'default' \| 'bordered' \| 'citation'`                                       | `'default'` | Visual style of the blockquote   |
| `author`   | `string`                                                                      | -           | Author name for citation display |
| `source`   | `string`                                                                      | -           | Source reference for citation    |
| `color`    | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | Color scheme from theme          |
| `children` | `React.ReactNode`                                                             | -           | Quote content                    |

Additional props are passed through to the underlying `blockquote` element.

## Variants

### Default

Left-bordered blockquote with subtle background color and italic text.

### Bordered

Full bordered blockquote with gradient border effect, quote icon, and enhanced styling.

### Citation

Centered blockquote with backdrop blur effect (in dark mode), perfect for featured quotes with citations.

## Color Themes

The component supports all theme colors:

- **Primary**: Brand primary color
- **Secondary**: Brand secondary color
- **Success**: Green color scheme
- **Warning**: Orange/yellow color scheme
- **Danger**: Red color scheme
- **Neutral**: Gray color scheme

## Accessibility

- Uses semantic `<blockquote>` element
- Proper text contrast ratios
- Compatible with screen readers
- Citation markup follows best practices

## Best Practices

1. **Use appropriate variants**: Default for simple quotes, bordered for featured content, citation for formal references
2. **Provide citations**: Always include author and/or source when available
3. **Choose readable colors**: Consider contrast ratios, especially in dark themes
4. **Keep content concise**: Long quotes may require different formatting approaches

## Examples

### Article Quote

```tsx
<Blockquote variant="default" color="neutral">
  Design is not just what it looks like and feels like. Design is how it works.
</Blockquote>
```

### Testimonial

```tsx
<Blockquote variant="bordered" author="Sarah Johnson" source="CEO, TechCorp" color="primary">
  This product has revolutionized how our team collaborates.
</Blockquote>
```

### Featured Quote

```tsx
<Blockquote variant="citation" author="Albert Einstein" color="success">
  Imagination is more important than knowledge.
</Blockquote>
```
