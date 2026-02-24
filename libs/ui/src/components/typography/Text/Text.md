# Text Component

## Overview

The Text component is a versatile typography component that provides consistent text styling across the application. It supports multiple variants, sizes, colors, and styling options while maintaining accessibility standards.

## Usage

```tsx
import { Text } from '@procurement/ui';

// Basic usage
<Text>Basic text content</Text>

// With variant
<Text variant="heading">Heading text</Text>
<Text variant="caption">Caption text</Text>
<Text variant="code">Inline code</Text>

// With colors
<Text color="primary">Primary text</Text>
<Text color="secondary">Secondary text</Text>
<Text color="success">Success text</Text>

// With sizes
<Text size="xs">Extra small text</Text>
<Text size="lg">Large text</Text>

// With styling
<Text weight="bold" italic>Bold italic text</Text>
<Text underline strikethrough>Decorated text</Text>

// Custom HTML element
<Text as="p">Paragraph element</Text>
<Text as="span">Inline span element</Text>
```

## Props

| Prop            | Type                                                                          | Default     | Description                             |
| --------------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------------- |
| `variant`       | `'body' \| 'heading' \| 'caption' \| 'code'`                                  | `'body'`    | Text variant affecting typography style |
| `color`         | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | Text color from theme palette. `secondary` uses muted text color for less emphasis |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`      | Text size variant                       |
| `weight`        | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold'`                     | `'normal'`  | Font weight                             |
| `as`            | `React.ElementType`                                                           | `'span'`    | HTML element to render                  |
| `italic`        | `boolean`                                                                     | `false`     | Apply italic styling                    |
| `underline`     | `boolean`                                                                     | `false`     | Apply underline decoration              |
| `strikethrough` | `boolean`                                                                     | `false`     | Apply strikethrough decoration          |
| `children`      | `React.ReactNode`                                                             | -           | Text content                            |

## Colors

The `color` prop determines the text color using the theme palette:

- **neutral** (default): Uses primary text color for maximum readability
- **secondary**: Uses muted/secondary text color for less emphasis (e.g., descriptions, captions)
- **primary**: Uses the primary brand color for emphasis
- **success**: Green color for positive messages
- **warning**: Orange/yellow color for warnings
- **danger**: Red color for errors or critical messages

All colors maintain WCAG AA contrast ratios for accessibility.

## Variants

### Body

Default text variant for general content with standard typography settings.

### Heading

Text styled for headings with appropriate font weight and sizing.

### Caption

Smaller text for captions, labels, and secondary information.

### Code

Monospace text with background styling for inline code snippets.

## Accessibility

- Uses semantic HTML elements through the `as` prop
- Maintains proper color contrast ratios for all color variants
- Supports screen readers with appropriate text content
- Respects user's motion preferences for animations

## Best Practices

- Use appropriate variants for content hierarchy
- Choose colors that maintain good contrast ratios
- Use the `as` prop to render semantically correct HTML elements
- Combine styling props thoughtfully to maintain readability
- Consider responsive design when choosing sizes

## Examples

### Content Hierarchy

```tsx
<Text variant="heading" size="xl" weight="bold">Main Heading</Text>
<Text variant="body" size="md">Body text content goes here.</Text>
<Text variant="caption" size="sm" color="secondary">Additional details</Text>
```

### Inline Code

```tsx
<Text>
  Use the <Text variant="code">useState</Text> hook for state management.
</Text>
```

### Decorated Text

```tsx
<Text weight="bold" color="danger" underline>
  Important notice
</Text>
```

### Custom Elements

```tsx
<Text as="h2" variant="heading" size="lg">Section Title</Text>
<Text as="p" variant="body">Paragraph content</Text>
```
