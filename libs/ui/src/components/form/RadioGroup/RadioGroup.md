# RadioGroup

A versatile radio button group component with multiple visual variants, animations, and customization options.

## Features

- **Multiple Variants**: Default, Cards, Buttons, and Segments
- **Color Themes**: Primary, Secondary, Success, Warning, Danger, Neutral
- **Size Options**: XS, SM, MD, LG, XL
- **Special Effects**: Glass morphism, Gradient, Glow effects
- **Animations**: Slide, scale, and ripple animations
- **Icons Support**: Display icons alongside labels
- **Descriptions**: Optional description text for each option
- **Flexible Layout**: Row or column direction
- **Accessibility**: Full keyboard navigation and screen reader support
- **Error States**: Built-in error handling and helper text

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'cards' \| 'buttons' \| 'segments'` | `'default'` | Visual style variant |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'primary'` | Color theme |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the radio group |
| `options` | `RadioOption[]` | - | Array of radio options (required) |
| `label` | `string` | - | Label for the radio group |
| `value` | `string` | - | Currently selected value |
| `onChange` | `(event, value) => void` | - | Change handler |
| `error` | `boolean` | `false` | Whether the radio group has an error |
| `helperText` | `string` | - | Help text below the radio group |
| `glassLabel` | `boolean` | `false` | Glass effect for label |
| `glow` | `boolean` | `false` | Glow effect for selected items |
| `glass` | `boolean` | `false` | Glass morphism effect |
| `gradient` | `boolean` | `false` | Gradient effect |
| `direction` | `'row' \| 'column'` | `'column'` | Layout direction |
| `showDescriptions` | `boolean` | `true` | Show option descriptions |
| `dataTestId` | `string` | - | Test ID for component testing |

## RadioOption Interface

```typescript
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

## Usage

### Basic Usage

```tsx
import { RadioGroup } from '@gym-app/ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<RadioGroup
  options={options}
  value={selectedValue}
  onChange={(e, value) => setSelectedValue(value)}
  label="Select an option"
/>
```

### Card Variant with Icons

```tsx
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

const paymentOptions = [
  {
    value: 'card',
    label: 'Credit Card',
    icon: <CreditCard size={20} />,
    description: 'Pay with your credit or debit card',
  },
  {
    value: 'mobile',
    label: 'Mobile Pay',
    icon: <Smartphone size={20} />,
    description: 'Use your mobile wallet',
  },
  {
    value: 'cash',
    label: 'Cash',
    icon: <Banknote size={20} />,
    description: 'Pay with cash on delivery',
  },
];

<RadioGroup
  variant="cards"
  options={paymentOptions}
  value={paymentMethod}
  onChange={(e, value) => setPaymentMethod(value)}
  label="Payment Method"
  color="primary"
/>
```

### Button Variant

```tsx
import { Shield, Star, Zap } from 'lucide-react';

const priorityOptions = [
  { value: 'low', label: 'Low', icon: <Shield size={16} /> },
  { value: 'medium', label: 'Medium', icon: <Star size={16} /> },
  { value: 'high', label: 'High', icon: <Zap size={16} /> },
];

<RadioGroup
  variant="buttons"
  options={priorityOptions}
  value={priority}
  onChange={(e, value) => setPriority(value)}
  direction="row"
  color="success"
/>
```

### Segment Variant

```tsx
<RadioGroup
  variant="segments"
  options={[
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ]}
  value={period}
  onChange={(e, value) => setPeriod(value)}
  color="primary"
/>
```

### With Special Effects

```tsx
<RadioGroup
  variant="cards"
  options={options}
  value={selected}
  onChange={(e, value) => setSelected(value)}
  glass
  gradient
  glow
  glassLabel
  label="Premium Selection"
  color="primary"
/>
```

### Error State

```tsx
<RadioGroup
  options={options}
  value={selected}
  onChange={(e, value) => setSelected(value)}
  label="Required Selection"
  error={!selected}
  helperText={!selected ? 'Please select an option' : ''}
/>
```

### Disabled Options

```tsx
const options = [
  { value: 'option1', label: 'Available Option' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Another Available Option' },
];

<RadioGroup
  options={options}
  value={selected}
  onChange={(e, value) => setSelected(value)}
/>
```

## Variants

### Default
Standard Material-UI radio buttons with labels and optional descriptions.

### Cards
Visual card-based selection with hover effects, perfect for presenting detailed options.

### Buttons
Button-style radio group with smooth transitions and active states.

### Segments
Segmented control style, ideal for compact horizontal selections.

## Accessibility

- Full keyboard navigation support (Arrow keys, Space, Tab)
- ARIA labels and roles properly implemented
- Screen reader friendly
- Focus management and visible focus indicators
- Proper radio group semantics

## Testing

The RadioGroup component includes comprehensive test coverage with data-testid attributes for reliable automated testing.

### Test IDs Structure

When you provide a `dataTestId` prop, the component generates the following test IDs:

#### All Variants
- `{dataTestId}` - Root container
- `{dataTestId}-label` - Group label (if label prop is provided)
- `{dataTestId}-helper-text` - Helper text element (if helperText prop is provided)

#### Default Variant
- `{dataTestId}-group` - MUI RadioGroup wrapper
- `{dataTestId}-option-{index}` - FormControlLabel for each option
- `{dataTestId}-radio-{index}` - Radio button element
- `{dataTestId}-label-{index}` - Label content for each option

#### Cards Variant
- `{dataTestId}-container` - Cards container
- `{dataTestId}-card-{index}` - Individual card element
- `{dataTestId}-label-{index}` - Label text within card

#### Buttons Variant
- `{dataTestId}-container` - Buttons container
- `{dataTestId}-button-{index}` - Individual button element
- `{dataTestId}-label-{index}` - Label content within button

#### Segments Variant
- `{dataTestId}-container` - Segment container
- `{dataTestId}-segment-{index}` - Individual segment button
- `{dataTestId}-label-{index}` - Label content within segment

### Testing Examples

#### Basic Interaction Test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

test('selects radio option on click', async () => {
  const onChange = jest.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  render(
    <RadioGroup
      options={options}
      value=""
      onChange={onChange}
      dataTestId="my-radio"
    />
  );

  // Find radio button by test ID
  const radio1 = screen.getByTestId('my-radio-radio-0');
  await userEvent.click(radio1);

  expect(onChange).toHaveBeenCalledWith(
    expect.anything(),
    'option1'
  );
});
```

#### Card Variant Test

```tsx
test('selects card option on click', async () => {
  const onChange = jest.fn();
  const options = [
    { value: 'card1', label: 'Card 1' },
    { value: 'card2', label: 'Card 2' },
  ];

  render(
    <RadioGroup
      variant="cards"
      options={options}
      value=""
      onChange={onChange}
      dataTestId="card-radio"
    />
  );

  // Find card by test ID
  const card1 = screen.getByTestId('card-radio-card-0');
  await userEvent.click(card1);

  expect(onChange).toHaveBeenCalledWith(
    expect.anything(),
    'card1'
  );
});
```

#### Error State Test

```tsx
test('displays error state and helper text', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
  ];

  render(
    <RadioGroup
      options={options}
      value=""
      error
      helperText="This field is required"
      dataTestId="error-radio"
    />
  );

  // Verify helper text is displayed
  const helperText = screen.getByTestId('error-radio-helper-text');
  expect(helperText).toHaveTextContent('This field is required');
});
```

#### Accessibility Test

```tsx
test('supports keyboard navigation', async () => {
  const onChange = jest.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  render(
    <RadioGroup
      options={options}
      value=""
      onChange={onChange}
      dataTestId="keyboard-radio"
    />
  );

  const radio1 = screen.getByTestId('keyboard-radio-radio-0');
  const radio2 = screen.getByTestId('keyboard-radio-radio-1');

  // Focus first radio
  radio1.focus();
  expect(radio1).toHaveFocus();

  // Arrow down to next radio
  await userEvent.keyboard('{ArrowDown}');
  expect(radio2).toHaveFocus();
});
```

#### Button Variant Test

```tsx
test('button variant selection works', async () => {
  const onChange = jest.fn();
  const options = [
    { value: 'btn1', label: 'Button 1' },
    { value: 'btn2', label: 'Button 2' },
  ];

  render(
    <RadioGroup
      variant="buttons"
      options={options}
      value=""
      onChange={onChange}
      dataTestId="button-radio"
    />
  );

  const button1 = screen.getByTestId('button-radio-button-0');
  await userEvent.click(button1);

  expect(onChange).toHaveBeenCalledWith(
    expect.anything(),
    'btn1'
  );
});
```

#### Segment Variant Test

```tsx
test('segment variant selection works', async () => {
  const onChange = jest.fn();
  const options = [
    { value: 'seg1', label: 'Segment 1' },
    { value: 'seg2', label: 'Segment 2' },
  ];

  render(
    <RadioGroup
      variant="segments"
      options={options}
      value=""
      onChange={onChange}
      dataTestId="segment-radio"
    />
  );

  const segment1 = screen.getByTestId('segment-radio-segment-0');
  await userEvent.click(segment1);

  expect(onChange).toHaveBeenCalledWith(
    expect.anything(),
    'seg1'
  );
});
```

### Playwright Example

```typescript
import { test, expect } from '@playwright/test';

test('radio group interaction', async ({ page }) => {
  await page.goto('/radio-group-demo');

  // Click first option
  await page.getByTestId('payment-radio-card-0').click();

  // Verify selection
  const selectedCard = page.getByTestId('payment-radio-card-0');
  await expect(selectedCard).toHaveAttribute('data-selected', 'true');
});
```

### Testing Best Practices

1. **Always use dataTestId**: Provide a unique `dataTestId` for reliable test selection
2. **Test all variants**: Ensure tests cover default, cards, buttons, and segments variants
3. **Verify interactions**: Test clicks, keyboard navigation, and focus management
4. **Check accessibility**: Validate ARIA attributes and screen reader compatibility
5. **Test error states**: Verify error and helper text display correctly
6. **Test disabled states**: Ensure disabled options cannot be selected

## Styling

The component supports all standard Material-UI styling approaches:
- `sx` prop
- Theme customization
- Styled components
- CSS classes

## Performance

- Optimized rendering for large option lists
- Smooth animations with CSS transitions
- Minimal re-renders using React best practices
- Efficient event handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
