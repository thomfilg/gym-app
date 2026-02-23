# Checkbox Component

A flexible and customizable checkbox component with comprehensive styling options and accessibility features.

## Features

- **Multiple Variants**: Default, rounded, and toggle styles
- **Visual Effects**: Glow and pulse animations
- **Loading States**: Built-in loading spinner support
- **Error States**: Error styling with helper text
- **Customizable**: Ripple effect control and custom styling
- **Accessible**: Full keyboard navigation and screen reader support

## Usage

```tsx
import { Checkbox } from '@/components/form/Checkbox';

// Basic checkbox
<Checkbox label="Accept terms" />

// With error state
<Checkbox
  label="Required field"
  error
  helperText="This field is required"
/>

// With loading state
<Checkbox
  label="Processing"
  loading
/>

// Rounded variant with glow effect
<Checkbox
  label="Special option"
  variant="rounded"
  glow
/>
```

## Props

### CheckboxProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'rounded' \| 'toggle'` | `'default'` | Visual variant style |
| label | `string` | - | Label text displayed next to checkbox |
| error | `boolean` | `false` | Error state flag |
| helperText | `string` | - | Helper or error text displayed below |
| loading | `boolean` | `false` | Shows loading spinner and disables checkbox |
| ripple | `boolean` | `true` | Enable/disable ripple effect on click |
| glow | `boolean` | `false` | Enable glow animation |
| pulse | `boolean` | `false` | Enable pulse animation |
| disabled | `boolean` | `false` | Disable the checkbox |
| data-testid | `string` | - | Custom test ID for testing |

Plus all standard MUI Checkbox props (checked, onChange, indeterminate, etc.)

## Variants

### Default
Standard Material-UI checkbox styling with theme colors.

### Rounded
Checkbox with circular icon styling.

### Toggle
Checkbox with rounded rectangular appearance and scaled size.

## Accessibility

- Full keyboard navigation support (Space to toggle)
- Screen reader compatible with proper ARIA attributes
- Focus management with visual focus indicators
- Support for disabled and indeterminate states
- Helper text properly associated with checkbox

## Examples

### Basic Checkbox

```tsx
<Checkbox label="I agree to the terms" />
```

### With Helper Text

```tsx
<Checkbox
  label="Subscribe to newsletter"
  helperText="We'll send you updates monthly"
/>
```

### Error State

```tsx
<Checkbox
  label="Required consent"
  error
  helperText="You must accept to continue"
/>
```

### Loading State

```tsx
<Checkbox
  label="Saving preferences..."
  loading
  checked
/>
```

### Rounded with Glow Effect

```tsx
<Checkbox
  variant="rounded"
  label="Premium feature"
  glow
/>
```

## Testing

### Test IDs

The Checkbox component includes `data-testid` attributes for reliable testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `checkbox` | Main checkbox | Root checkbox input element (default) |
| `{dataTestId}` | Main checkbox | Root checkbox input with custom testId |
| `checkbox-container` | Container div | Wrapper containing checkbox, label, and helper text (default) |
| `{dataTestId}-container` | Container div | Wrapper with custom testId |
| `checkbox-helper` | Helper text | FormHelperText element (default) |
| `{dataTestId}-helper` | Helper text | Helper text with custom testId |

### Testing Best Practices

**Wait for Checkbox to Render:**
```typescript
const checkbox = await canvas.findByTestId('checkbox');
expect(checkbox).toBeInTheDocument();
```

**Test with Custom TestId:**
```typescript
<Checkbox data-testid="terms-checkbox" label="Accept Terms" />

const checkbox = await canvas.findByTestId('terms-checkbox');
const container = await canvas.findByTestId('terms-checkbox-container');
expect(checkbox).toBeInTheDocument();
expect(container).toBeInTheDocument();
```

**Test Interactions:**
```typescript
const checkbox = await canvas.findByTestId('checkbox');
await userEvent.click(checkbox);
expect(onChange).toHaveBeenCalled();
```

**Test States:**
```typescript
// Loading state
const loadingCheckbox = await canvas.findByTestId('checkbox');
expect(loadingCheckbox).toBeDisabled();

// Error state with helper text
const helperText = await canvas.findByTestId('checkbox-helper');
expect(helperText).toHaveTextContent('Error message');
expect(helperText).toHaveClass('Mui-error');
```

**Test Accessibility:**
```typescript
const checkbox = await canvas.findByRole('checkbox');
expect(checkbox).toHaveAttribute('aria-label');

// Indeterminate state
expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
```

### Common Test Scenarios

1. **Basic Rendering** - Verify checkbox renders with label
2. **Checked/Unchecked States** - Test toggling between states
3. **Indeterminate State** - Test partial selection state
4. **Loading State** - Verify spinner shows and checkbox is disabled
5. **Error State** - Test error styling and helper text display
6. **Disabled State** - Verify checkbox is not interactive when disabled
7. **Variants** - Test default, rounded, and toggle visual variants
8. **Visual Effects** - Test glow and pulse animations
9. **Keyboard Navigation** - Test Space key to toggle
10. **Accessibility** - Verify ARIA attributes and screen reader support
