# Label Component

## Overview

The Label component provides accessible and visually enhanced labeling for form controls. It supports various styling options, interactive behaviors, and accessibility features to ensure proper association between labels and input elements.

## Purpose and Use Cases

The Label component is essential for:

- Creating accessible form labels that properly associate with input elements
- Providing visual indicators for required/optional fields
- Supporting interactive labels with click behaviors
- Displaying helper text and tooltips
- Screen reader-only labels for accessibility
- Enhanced visual effects (glow, pulse, ripple)

## Props

### Basic Props

- `children` (ReactNode): The label text or content
- `htmlFor` (string): Associates the label with a form control by ID
- `className` (string): Additional CSS classes
- `style` (CSSProperties): Inline styles
- `dataTestId` (string): Test identifier for automated testing

### State Props

- `required` (boolean): Shows a required field indicator (asterisk)
- `disabled` (boolean): Applies disabled state styling
- `error` (boolean): Applies error state styling
- `loading` (boolean): Shows a loading spinner

### Visual Props

- `variant` ('default' | 'filled' | 'outlined' | 'glass' | 'gradient' | 'minimal'): Visual style variant
- `size` ('xs' | 'sm' | 'md' | 'lg' | 'xl'): Label size
- `color` ('primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'): Color scheme
- `weight` ('light' | 'regular' | 'medium' | 'semibold' | 'bold'): Font weight
- `transform` ('none' | 'uppercase' | 'lowercase' | 'capitalize'): Text transformation
- `align` ('left' | 'center' | 'right'): Text alignment

### Effect Props

- `glow` (boolean): Adds a glow effect
- `pulse` (boolean): Adds a pulse animation
- `ripple` (boolean): Adds ripple effect on click
- `glass` (boolean): Applies glassmorphism effect
- `gradient` (boolean): Applies gradient text effect

### Content Props

- `icon` (ReactNode): Icon element to display
- `iconPosition` ('start' | 'end'): Position of the icon
- `tooltip` (string | ReactNode): Tooltip content
- `helperText` (string): Helper text displayed below the label
- `asteriskPlacement` ('start' | 'end'): Position of the required asterisk

### Interaction Props

- `onClick` (function): Click event handler
- `onFocus` (function): Focus event handler
- `onBlur` (function): Blur event handler

### Text Props

- `nowrap` (boolean): Prevents text wrapping
- `truncate` (boolean): Truncates overflowing text with ellipsis

### Accessibility Props

- `srOnly` (boolean): Makes the label visible only to screen readers

## Usage Examples

### Basic Label

```jsx
<Label htmlFor="username">Username</Label>
<input id="username" type="text" />
```

### Required Field

```jsx
<Label htmlFor="email" required>
  Email Address
</Label>
```

### With Helper Text

```jsx
<Label htmlFor="password" helperText="Must be at least 8 characters">
  Password
</Label>
```

### With Icon

```jsx
<Label htmlFor="search" icon={<SearchIcon />} iconPosition="start">
  Search
</Label>
```

### Different Variants

```jsx
<Label variant="filled">Filled Label</Label>
<Label variant="outlined">Outlined Label</Label>
<Label variant="glass">Glass Label</Label>
<Label variant="gradient" color="primary">Gradient Label</Label>
```

### Interactive Label

```jsx
<Label onClick={handleClick} ripple style={{ cursor: 'pointer' }}>
  Clickable Label
</Label>
```

### Screen Reader Only

```jsx
<Label htmlFor="hidden-input" srOnly>
  This label is only visible to screen readers
</Label>
```

### With Tooltip

```jsx
<Label htmlFor="complex-field" tooltip="This field requires special formatting">
  Complex Field
</Label>
```

## Accessibility Notes

### ARIA Support

- The component properly uses the `for` attribute to associate labels with form controls
- Screen reader-only mode is available via the `srOnly` prop
- Proper semantic HTML `<label>` element is used
- Required fields are indicated with accessible text

### Keyboard Navigation

- Labels with onClick handlers are keyboard accessible
- Focus states are properly managed
- Tab navigation works as expected

### Screen Reader Compatibility

- Labels are properly announced by screen readers
- Required field indicators are accessible
- Helper text is associated with the label
- Tooltips provide additional context when needed

## Best Practices

### Do's

- Always use `htmlFor` to associate labels with form controls
- Use clear, descriptive label text
- Indicate required fields with the `required` prop
- Provide helper text for complex fields
- Use appropriate size and weight for visual hierarchy
- Consider using tooltips for additional context

### Don'ts

- Don't use labels without associated form controls (unless decorative)
- Don't rely solely on color to indicate states
- Don't make labels too long or complex
- Don't use conflicting visual effects simultaneously
- Don't hide essential information in tooltips only

## Form Integration

The Label component integrates seamlessly with form controls:

```jsx
<FormControl>
  <Label htmlFor="form-input" required>
    Form Field
  </Label>
  <TextField id="form-input" />
</FormControl>
```

## Theme Integration

The Label component uses MUI theme tokens for consistent styling:

- Colors from `theme.palette`
- Spacing from `theme.spacing`
- Typography from `theme.typography`
- Transitions from `theme.transitions`

## Performance Considerations

- The component uses React.forwardRef for ref forwarding
- Conditional rendering is optimized
- Animations use CSS transitions for smooth performance
- The component is memoization-friendly

## Related Components

- TextField: Often used with Label for form inputs
- FormControl: Container for form elements including labels
- FormHelperText: Alternative for helper text display
- Tooltip: For additional contextual information

## Testing

### Test Identifiers

The Label component supports the `dataTestId` prop for automated testing:

```jsx
<Label dataTestId="username-label" htmlFor="username">
  Username
</Label>
```

#### Querying Labels in Tests

```jsx
// Using dataTestId
const label = screen.getByTestId('username-label');

// Using text content
const label = screen.getByText('Username');

// Using label element
const label = screen.getByLabelText('Username');
```

### Testing Examples

#### Basic Rendering Test

```jsx
test('renders label with correct text', () => {
  render(<Label dataTestId="test-label">My Label</Label>);

  const label = screen.getByTestId('test-label');
  expect(label).toBeInTheDocument();
  expect(label).toHaveTextContent('My Label');
});
```

#### Testing Required Field Indicator

```jsx
test('displays asterisk for required field', () => {
  render(
    <Label dataTestId="required-label" required>
      Required Field
    </Label>
  );

  const label = screen.getByTestId('required-label');
  expect(label).toHaveTextContent('*');
});
```

#### Testing Label Association

```jsx
test('associates label with form control', () => {
  render(
    <>
      <Label dataTestId="email-label" htmlFor="email-input">
        Email
      </Label>
      <input id="email-input" type="email" />
    </>
  );

  const label = screen.getByTestId('email-label');
  expect(label).toHaveAttribute('for', 'email-input');
});
```

#### Testing States

```jsx
test('applies error state styling', () => {
  render(
    <Label dataTestId="error-label" error>
      Error Label
    </Label>
  );

  const label = screen.getByTestId('error-label');
  const computedStyle = window.getComputedStyle(label);
  expect(computedStyle.color).toBeDefined();
});

test('displays loading spinner', () => {
  render(
    <Label dataTestId="loading-label" loading>
      Loading Label
    </Label>
  );

  const spinner = screen.getByRole('progressbar');
  expect(spinner).toBeInTheDocument();
});
```

#### Testing Interactions

```jsx
test('handles click events', async () => {
  const handleClick = jest.fn();

  render(
    <Label dataTestId="clickable-label" onClick={handleClick}>
      Click Me
    </Label>
  );

  const label = screen.getByTestId('clickable-label');
  await userEvent.click(label);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Screen Reader Only Labels

```jsx
test('applies screen reader only styles', () => {
  render(
    <Label dataTestId="sr-only-label" srOnly>
      Screen Reader Only
    </Label>
  );

  const label = screen.getByTestId('sr-only-label');
  const computedStyle = window.getComputedStyle(label);

  expect(computedStyle.position).toBe('absolute');
  expect(computedStyle.width).toBe('1px');
  expect(computedStyle.height).toBe('1px');
});
```

#### Testing Helper Text

```jsx
test('displays helper text', () => {
  render(
    <Label
      dataTestId="label-with-helper"
      helperText="This is helper text"
    >
      Field Label
    </Label>
  );

  expect(screen.getByText('This is helper text')).toBeInTheDocument();
});
```

#### Testing Variants and Sizes

```jsx
test('applies correct variant styles', () => {
  render(
    <Label dataTestId="filled-label" variant="filled">
      Filled Label
    </Label>
  );

  const label = screen.getByTestId('filled-label');
  const computedStyle = window.getComputedStyle(label);
  expect(computedStyle.backgroundColor).toBeDefined();
});

test('applies correct size', () => {
  render(
    <Label dataTestId="large-label" size="lg">
      Large Label
    </Label>
  );

  const label = screen.getByTestId('large-label');
  const computedStyle = window.getComputedStyle(label);
  expect(parseFloat(computedStyle.fontSize)).toBeGreaterThan(0);
});
```

### Accessibility Testing

```jsx
test('meets accessibility requirements', async () => {
  const { container } = render(
    <Label
      dataTestId="accessible-label"
      htmlFor="accessible-input"
      required
    >
      Accessible Field
    </Label>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Best Practices for Testing

1. **Always use dataTestId**: Prefer `dataTestId` over text-based queries for more stable tests
2. **Test accessibility**: Verify proper label associations and ARIA attributes
3. **Test states**: Ensure all states (error, disabled, loading) are properly applied
4. **Test interactions**: Verify click, focus, and blur handlers work correctly
5. **Test visual variants**: Ensure different variants and sizes render correctly
6. **Test edge cases**: Check truncation, empty content, and special characters
