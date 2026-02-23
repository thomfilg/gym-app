# DescriptionItem

A label-value pair component for displaying read-only information in a consistent vertical layout.

## Features

- **Two Orientations**: Vertical (label above value) or horizontal (label beside value)
- **Clear Visual Hierarchy**: Label displayed with distinct styling
- **Flexible Values**: Supports text, numbers, or any React node as the value
- **Uppercase Labels**: Labels are automatically styled in uppercase for consistency
- **Custom Content**: Can render custom components like chips, buttons, or complex layouts
- **Responsive**: Works well in grid or stack layouts
- **Accessible**: Proper semantic HTML with data-testid support

## Usage

### Basic Usage

```tsx
import { DescriptionItem } from '@gym-app/ui';

function MyComponent() {
  return (
    <DescriptionItem
      label="Incident ID"
      value="INC-12345"
    />
  );
}
```

### With Number Value

```tsx
<DescriptionItem
  label="Services Affected"
  value={42}
/>
```

### With Custom Component

```tsx
<DescriptionItem
  label="Status"
  value={<Chip label="Active" color="success" />}
/>
```

### Horizontal Orientation

```tsx
<DescriptionItem
  label="Name"
  value="John Doe"
  orientation="horizontal"
/>
```

### Vertical Orientation (Default)

```tsx
<DescriptionItem
  label="Name"
  value="John Doe"
  orientation="vertical"
/>
```

### Copyable Value

```tsx
<DescriptionItem
  label="Incident ID"
  value={
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Text variant="body" size="sm" weight="semibold">
        INC-12345
      </Text>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigator.clipboard.writeText('INC-12345')}
        aria-label="Copy incident ID"
      >
        <ContentCopyIcon sx={{ fontSize: 16 }} />
      </Button>
    </Box>
  }
/>
```

### Grid Layout

```tsx
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
    gap: 3,
  }}
>
  <DescriptionItem label="Incident ID" value="INC-12345" />
  <DescriptionItem label="Started" value="2 hours ago" />
  <DescriptionItem label="Duration" value="Ongoing" />
  <DescriptionItem label="Services Affected" value={5} />
</Box>
```

### Vertical Stack (Vertical Orientation)

```tsx
<Stack spacing={3}>
  <DescriptionItem label="Name" value="John Doe" />
  <DescriptionItem label="Email" value="john.doe@example.com" />
  <DescriptionItem label="Department" value="Engineering" />
</Stack>
```

### List Layout (Horizontal Orientation)

```tsx
<Stack spacing={2}>
  <DescriptionItem label="Name" value="John Doe" orientation="horizontal" />
  <DescriptionItem label="Email" value="john.doe@example.com" orientation="horizontal" />
  <DescriptionItem label="Department" value="Engineering" orientation="horizontal" />
  <DescriptionItem label="Role" value={<Chip label="Admin" />} orientation="horizontal" />
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | The label text to display |
| `value` | `ReactNode` | Required | The value to display - can be text, number, or any React node |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation: vertical (label above) or horizontal (label beside) |
| `className` | `string` | - | Optional CSS class name |
| `data-testid` | `string` | `'description-item'` | Test ID for testing purposes |

## Styling

The component uses the following styling:
- **Label**: Uppercase text, secondary color, extra-small size
- **Value**: Semibold text for string/number values, small size
- **Layout**:
  - Vertical: Flex column layout with label on top, 0.25rem gap
  - Horizontal: Flex row layout with label beside value, 1rem gap, center-aligned
- **Label Width**: In horizontal mode, label has `fit-content` width and doesn't shrink

## Value Rendering

The component intelligently renders values:
- **String/Number**: Automatically wrapped in `<Text>` component with semibold weight
- **React Node**: Rendered as-is, allowing full customization

## Common Patterns

### Detail View

```tsx
<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
  <DescriptionItem label="Order ID" value="ORD-001" />
  <DescriptionItem label="Customer" value="Acme Corp" />
  <DescriptionItem label="Total" value="$1,234.56" />
  <DescriptionItem label="Status" value={<Chip label="Completed" />} />
</Box>
```

### Profile Information

```tsx
<Stack spacing={3}>
  <DescriptionItem label="Full Name" value="Jane Smith" />
  <DescriptionItem label="Position" value="Senior Engineer" />
  <DescriptionItem label="Department" value="Platform Engineering" />
  <DescriptionItem label="Location" value="San Francisco, CA" />
</Stack>
```

### Incident Metadata

```tsx
<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
  <DescriptionItem
    label="Incident ID"
    value={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Text>INC-12345</Text>
        <Button variant="ghost" size="sm"><CopyIcon /></Button>
      </Box>
    }
  />
  <DescriptionItem label="Started" value="2 hours ago" />
  <DescriptionItem label="Duration" value="Ongoing" />
  <DescriptionItem label="Services" value={3} />
</Box>
```

## Accessibility

- Semantic HTML structure
- Proper text hierarchy
- Support for `data-testid` on container, label, and value elements
- Works with screen readers
- Supports `aria-label` on custom content

## Best Practices

1. **Use Clear Labels**: Keep labels concise and descriptive
2. **Consistent Formatting**: Use consistent value formatting across related items
3. **Choose Right Orientation**:
   - Use **vertical** for grid layouts with multiple columns
   - Use **horizontal** for list/stack layouts or narrow containers
4. **Grid Layouts**: Use CSS Grid with vertical orientation for multi-column displays
5. **List Layouts**: Use Stack with horizontal orientation for single-column lists
6. **Empty Values**: Show "N/A" or "-" for missing/empty values
7. **Interactive Elements**: When adding buttons/links, ensure proper accessibility
8. **Custom Components**: Use appropriate components (Chip, Badge) for status indicators

## Related Components

- **Text**: For custom value rendering
- **Chip**: For status/tag values
- **Badge**: For count indicators
- **Button**: For interactive actions in values
