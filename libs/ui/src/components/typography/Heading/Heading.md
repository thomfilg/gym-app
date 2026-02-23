# Heading Component

A flexible heading component supporting semantic HTML heading levels (h1-h6) and a special display variant. Features gradient text effects, configurable font weights, color theming, and responsive typography scales.

## Props

| Prop       | Type                                                                          | Default     | Description                                                             |
| ---------- | ----------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `level`    | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'display'`                   | `'h2'`      | Semantic heading level. 'display' renders as h1 with larger typography. |
| `color`    | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | Theme color variant                                                     |
| `weight`   | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold'`                     | `'bold'`    | Font weight                                                             |
| `gradient` | `boolean`                                                                     | `false`     | Enable gradient text effect                                             |
| `children` | `React.ReactNode`                                                             | -           | Heading content                                                         |

## Usage Examples

### Basic Usage

```tsx
import { Heading } from '@procurement/ui';

// Basic heading
<Heading level="h1">Main Title</Heading>

// Colored heading
<Heading level="h2" color="primary">Section Title</Heading>

// Custom weight
<Heading level="h3" weight="light">Subtitle</Heading>
```

### Display Variant

```tsx
// Extra large display heading (renders as h1)
<Heading level="display" color="primary" weight="bold">
  Hero Title
</Heading>
```

### Gradient Text

```tsx
// Primary-secondary gradient
<Heading level="h1" color="primary" gradient>
  Gradient Heading
</Heading>

// Success gradient
<Heading level="h2" color="success" gradient>
  Success Message
</Heading>
```

### Responsive Headings

```tsx
<Heading
  level="h1"
  sx={{
    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
    textAlign: { xs: 'center', md: 'left' },
  }}
>
  Responsive Heading
</Heading>
```

## Typography Scale

- **h1**: 3rem (48px) - Line height 1.1, Letter spacing -0.02em
- **h2**: 2.5rem (40px) - Line height 1.2, Letter spacing -0.015em
- **h3**: 2rem (32px) - Line height 1.25, Letter spacing -0.01em
- **h4**: 1.5rem (24px) - Line height 1.3, Letter spacing -0.005em
- **h5**: 1.25rem (20px) - Line height 1.4
- **h6**: 1.125rem (18px) - Line height 1.4
- **display**: 4rem (64px) - Line height 0.95, Letter spacing -0.03em

## Font Weight Mapping

- **light**: 300
- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700

### Level-Specific Default Weights

- h1, h2: Bold (700) when weight="normal"
- h3, h4, h5, h6: Semibold (600) when weight="normal"
- display: Extra bold (800) when weight="normal"

## Color Theming

All colors are sourced from the MUI theme:

- **primary**: `theme.palette.primary.main`
- **secondary**: `theme.palette.secondary.main`
- **success**: `theme.palette.success.main`
- **warning**: `theme.palette.warning.main`
- **danger**: `theme.palette.error.main`
- **neutral**: `theme.palette.text.primary`

## Gradient Effects

Gradient text uses CSS `background-clip: text` with fallback support:

- **Primary**: Linear gradient from primary to secondary colors
- **Secondary**: Linear gradient from secondary to primary colors
- **Success**: Linear gradient from success.light to success.dark
- **Warning**: Linear gradient from warning.light to warning.dark
- **Danger**: Linear gradient from error.light to error.dark
- **Default**: Primary to secondary gradient

## Accessibility

- Maintains proper semantic heading hierarchy
- Supports all HTML heading attributes (`id`, `aria-label`, etc.)
- Screen reader compatible
- Keyboard focusable when `tabIndex` is set
- WCAG compliant color contrast ratios

## Best Practices

1. **Semantic Hierarchy**: Use heading levels semantically (h1 for main title, h2 for sections, etc.)
2. **Skip Levels**: Avoid skipping heading levels (don't jump from h1 to h3)
3. **Display Variant**: Use `level="display"` only for hero/marketing content, not document structure
4. **Gradient Sparingly**: Use gradient text for emphasis, not body content
5. **Color Contrast**: Ensure sufficient contrast ratios when using custom colors
6. **Responsive Design**: Consider font size scaling on mobile devices

## Browser Support

- **Gradient Text**: Modern browsers with webkit/moz prefixes
- **Typography**: All modern browsers
- **Semantic HTML**: Universal support

## Performance

- Optimized styled-component with `shouldForwardProp`
- Minimal re-renders through prop filtering
- Efficient gradient calculations
- CSS-in-JS compilation optimizations
