# Select Component

A customizable select dropdown component with comprehensive functionality for choosing from a list of options.

## Overview

The Select component provides a dropdown interface for selecting one option from a list. Built on MUI's Select component, it includes enhanced styling, accessibility features, and supports various visual variants including glass and gradient effects.

## Usage

```tsx
import { Select } from '@procurement/ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

function MyComponent() {
  return (
    <Select
      options={options}
      label="Select an option"
      placeholder="Choose one"
      onValueChange={(value) => console.log('Selected:', value)}
    />
  );
}
```

## Props

### Required Props

- `options`: Array of option objects with `value`, `label`, and optional `disabled` properties

### Optional Props

- `value`: Currently selected value (controlled)
- `defaultValue`: Initial value for uncontrolled usage
- `onValueChange`: Callback function when selection changes
- `label`: Label text displayed above the select
- `placeholder`: Placeholder text when no option is selected
- `helperText`: Helper text displayed below the select
- `error`: Whether to display error state styling
- `disabled`: Whether the select is disabled
- `size`: Size variant ('small' | 'medium')
- `variant`: Visual style ('default' | 'glass' | 'gradient')
- `glow`: Whether to show glow effect on hover/focus
- `pulse`: Whether to show pulse animation
- `fullWidth`: Whether select should take full width of container

## Visual Variants

### Default

Standard Material-UI select styling with theme colors.

### Glass

Glassmorphism effect with blur backdrop and translucent appearance.

### Gradient

Animated gradient border that changes on hover and focus.

## Accessibility Features

- Full keyboard navigation support (Arrow keys, Enter, Escape)
- Screen reader compatibility with proper ARIA labels
- Focus management and visual focus indicators
- Support for disabled states

## Examples

### Basic Usage

```tsx
<Select
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  label="Country"
  placeholder="Select your country"
/>
```

### With Error State

```tsx
<Select
  options={options}
  label="Required Field"
  placeholder="Please select an option"
  error={true}
  helperText="This field is required"
/>
```

### Glass Variant with Effects

```tsx
<Select
  options={options}
  label="Glass Select"
  variant="glass"
  glow={true}
  pulse={true}
  placeholder="Choose an option"
/>
```

## Best Practices

- Always provide descriptive labels for accessibility
- Use helper text to provide additional context
- Consider using error states for form validation
- For long lists, consider grouping options or adding search functionality
- Test keyboard navigation to ensure accessibility compliance
- Use appropriate size variants based on your layout needs

## Integration Notes

- Works seamlessly with form libraries like React Hook Form
- Supports controlled and uncontrolled usage patterns
- Integrates with MUI theme system for consistent styling
- Compatible with all major browsers and screen readers

## Testing

### Test IDs

The Select component includes `data-testid` attributes for reliable testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `{dataTestId}` | FormControl | Root FormControl wrapper element |
| `{dataTestId}-select` | Select element | The MUI Select component |
| `{dataTestId}-option-{value}` | Menu items | Individual option elements (one per option) |

**Default Test IDs (when no dataTestId prop provided):**
- `select` - The Select element
- `option-{value}` - Each option element

### Testing Best Practices

**Wait for Select to Render:**
```typescript
const select = await canvas.findByTestId('country-select-select');
expect(select).toBeInTheDocument();
```

**Test Opening Dropdown:**
```typescript
const select = await canvas.findByTestId('select-select');
await userEvent.click(select);

// Wait for dropdown to open
await waitFor(() => {
  const dropdown = document.querySelector('[role="listbox"]');
  expect(dropdown).toBeInTheDocument();
});
```

**Test Selecting Option:**
```typescript
const select = await canvas.findByTestId('country-select-select');
await userEvent.click(select);

// Find and click option
const option = await canvas.findByTestId('country-select-option-us');
await userEvent.click(option);

expect(onValueChange).toHaveBeenCalledWith('us');
expect(select).toHaveTextContent('United States');
```

**Test with Default Value:**
```typescript
const select = await canvas.findByTestId('select-select');
expect(select).toHaveTextContent('United States'); // Default selection
```

**Test Disabled State:**
```typescript
const select = await canvas.findByTestId('disabled-select-select');
expect(select).toHaveAttribute('aria-disabled', 'true');

// Clicking should not open dropdown
await userEvent.click(select);
const dropdown = document.querySelector('[role="listbox"]');
expect(dropdown).not.toBeInTheDocument();
```

**Test Error State:**
```typescript
const formControl = await canvas.findByTestId('error-select');
expect(formControl).toHaveClass('Mui-error');

// Helper text should show error
const helperText = formControl.querySelector('.MuiFormHelperText-root');
expect(helperText).toHaveTextContent('This field is required');
expect(helperText).toHaveClass('Mui-error');
```

**Test All Options Render:**
```typescript
const select = await canvas.findByTestId('select-select');
await userEvent.click(select);

// Check all options exist
for (const option of options) {
  const optionElement = await canvas.findByTestId(`select-option-${option.value}`);
  expect(optionElement).toBeInTheDocument();
  expect(optionElement).toHaveTextContent(option.label);
}
```

**Test Keyboard Navigation:**
```typescript
const select = await canvas.findByTestId('select-select');
select.focus();

// Open with Space or Enter
await userEvent.keyboard('{Space}');
await waitFor(() => {
  expect(document.querySelector('[role="listbox"]')).toBeInTheDocument();
});

// Navigate with arrow keys
await userEvent.keyboard('{ArrowDown}');
await userEvent.keyboard('{Enter}');

expect(onValueChange).toHaveBeenCalled();
```

### Common Test Scenarios

1. **Basic Rendering** - Verify select renders with label and options
2. **Option Selection** - Test clicking options and value change
3. **Default Value** - Test initial selected value
4. **Placeholder** - Verify placeholder shows when no selection
5. **Disabled State** - Test disabled select and disabled options
6. **Error State** - Test error styling and helper text
7. **Variants** - Test default, glass, and gradient styles
8. **Visual Effects** - Test glow and pulse animations
9. **Keyboard Navigation** - Test arrow keys and Enter/Space
10. **Multiple Options** - Test with many options
11. **Full Width** - Test fullWidth prop behavior
12. **Accessibility** - Verify ARIA attributes and screen reader support
13. **Form Integration** - Test with form libraries like React Hook Form
