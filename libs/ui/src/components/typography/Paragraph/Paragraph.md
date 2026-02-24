# Paragraph Component

A semantic paragraph component with multiple visual variants for different content contexts. Features lead text styling, muted text, small text, and configurable sizing options. Optimized for readability with proper line height and typography scaling across different use cases.

## Purpose and Use Cases

- Standard paragraph text in body content
- Lead paragraphs for article introductions and emphasis  
- Muted secondary text for supporting content
- Small text for captions, footnotes, and fine print
- Scalable typography that maintains readability across different sizes

## Props

### `variant?: ParagraphVariant`
- **Type:** `'default' | 'lead' | 'muted' | 'small'`
- **Default:** `'default'`
- **Description:** Text style variant
  - `default`: Standard paragraph styling
  - `lead`: Emphasized intro text with larger font and enhanced spacing
  - `muted`: Secondary text with reduced opacity
  - `small`: Smaller text for captions and fine print

### `color?: string`
- **Type:** `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'`
- **Default:** `'neutral'`
- **Description:** Theme color for the text

### `size?: string`
- **Type:** `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- **Default:** `'md'`
- **Description:** Size scaling for the paragraph text

### `children: React.ReactNode`
- **Required:** Yes
- **Description:** The paragraph content to render

## Usage Examples

### Basic Paragraph
```tsx
<Paragraph>
  This is a standard paragraph with default styling.
</Paragraph>
```

### Lead Paragraph
```tsx
<Paragraph variant="lead">
  This is a lead paragraph used for article introductions with enhanced typography.
</Paragraph>
```

### Color and Size Variations
```tsx
<Paragraph color="primary" size="lg">
  A larger primary-colored paragraph.
</Paragraph>

<Paragraph variant="muted" size="sm">
  A smaller muted paragraph for supporting content.
</Paragraph>
```

## Accessibility Notes

- Uses semantic `<p>` element for proper document structure
- Maintains appropriate color contrast ratios
- Supports screen readers with proper text semantics
- Line height optimized for readability across all sizes
- Respects user font size preferences

## Best Practices

- Use `variant="lead"` sparingly for emphasis and introductions
- Apply `variant="muted"` to secondary content that supports main text
- Choose appropriate `size` values that maintain readability
- Ensure sufficient color contrast when using colored variants
- Keep paragraph length reasonable for good readability (typically 45-75 characters per line)
- Use consistent margin and spacing with other typography elements