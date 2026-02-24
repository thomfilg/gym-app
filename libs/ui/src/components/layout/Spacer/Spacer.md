# Spacer Component

## Purpose

The Spacer component creates consistent spacing between elements in layouts. It's a utility component that helps maintain visual rhythm and hierarchy without needing to manage margins or padding directly on other components.

## Props

| Prop      | Type                                 | Default | Description                                                 |
| --------- | ------------------------------------ | ------- | ----------------------------------------------------------- |
| size      | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md'    | Predefined spacing size based on theme spacing scale        |
| direction | 'horizontal' \| 'vertical' \| 'both' | 'both'  | Direction of spacing - affects which dimensions are applied |
| width     | number \| string                     | -       | Custom width value (overrides size when provided)           |
| height    | number \| string                     | -       | Custom height value (overrides size when provided)          |
| flex      | boolean                              | false   | When true, spacer flexes to fill available space            |
| className | string                               | -       | Additional CSS class for custom styling                     |

## Usage Examples

### Basic Spacing

```tsx
<Box>
  <Button>First</Button>
  <Spacer size="md" />
  <Button>Second</Button>
</Box>
```

### Flexible Spacer for Alignment

```tsx
<Box display="flex">
  <Logo />
  <Spacer flex />
  <Navigation />
</Box>
```

### Custom Dimensions

```tsx
<Stack>
  <Header />
  <Spacer height={100} />
  <Content />
</Stack>
```

### Directional Spacing

```tsx
// Horizontal only
<Spacer direction="horizontal" size="lg" />

// Vertical only
<Spacer direction="vertical" size="sm" />
```

## Accessibility Notes

- The Spacer component is purely presentational and has `aria-hidden="true"` to prevent screen readers from announcing it
- It has `pointer-events: none` to ensure it doesn't interfere with user interactions
- It should not contain any interactive or semantic content

## Best Practices

1. **Use predefined sizes for consistency**: Prefer the size prop over custom dimensions to maintain consistent spacing throughout your application

2. **Direction matters**: Use the appropriate direction to avoid unintended spacing in the perpendicular axis

3. **Flexible spacers for responsive layouts**: Use `flex={true}` to create spacers that adapt to available space, useful for pushing elements to opposite ends

4. **Combine with layout components**: Works well with Flex, Stack, and Grid components for structured layouts

5. **Avoid for margins**: Don't use Spacer to replace component margins - use it for deliberate spacing between distinct elements

## Common Use Cases

- **Form field separation**: Add consistent spacing between form fields
- **Navigation bars**: Use flexible spacers to push elements to opposite ends
- **Card layouts**: Create consistent gaps between cards
- **Section breaks**: Add visual separation between content sections
- **Button groups**: Maintain consistent spacing between action buttons
