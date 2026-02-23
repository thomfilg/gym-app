# ToggleGroup Component

A flexible toggle button group component that allows single or multiple selection from a set of options. Built on top of MUI's ToggleButtonGroup with enhanced styling and additional features.

## Purpose

The ToggleGroup component is ideal for:

- Allowing users to select from mutually exclusive options (single selection)
- Enabling multiple selections from a group of related options
- Creating tool bars with toggle functionality (text formatting, alignment, etc.)
- Building interface controls that require on/off states for multiple items

## Features

- **Multiple Selection Modes**: Single, multiple, or exclusive selection
- **Rich Options**: Support for icons, labels, and disabled states
- **Visual Effects**: Glass morphism, gradient, and glow effects
- **Responsive Sizing**: Five size variants (xs, sm, md, lg, xl)
- **Theme Integration**: Six color themes with consistent styling
- **Accessibility**: Full keyboard navigation and screen reader support

## Props

### Core Props

| Prop      | Type                                                                          | Default     | Description                        |
| --------- | ----------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `options` | `ToggleOption[]`                                                              | -           | Array of toggle options to display |
| `variant` | `'single' \| 'multiple' \| 'exclusive'`                                       | `'single'`  | Selection behavior mode            |
| `color`   | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'primary'` | Color theme                        |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`      | Component size                     |

### Visual Enhancement Props

| Prop       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `glow`     | `boolean` | `false` | Adds subtle glow effect             |
| `glass`    | `boolean` | `false` | Applies glass morphism styling      |
| `gradient` | `boolean` | `false` | Enables gradient background effects |

### ToggleOption Interface

```typescript
interface ToggleOption {
  value: string; // Unique identifier for the option
  label: string; // Display text for the option
  icon?: ReactNode; // Optional icon to display
  disabled?: boolean; // Whether the option is disabled
}
```

## Usage Examples

### Basic Usage

```tsx
import { ToggleGroup } from '@procurement/ui';

const alignOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

function BasicExample() {
  const [value, setValue] = useState('');

  return (
    <ToggleGroup
      options={alignOptions}
      value={value}
      onChange={(event, newValue) => setValue(newValue || '')}
    />
  );
}
```

### Multiple Selection

```tsx
const formatOptions = [
  { value: 'bold', label: 'Bold', icon: <Bold size={16} /> },
  { value: 'italic', label: 'Italic', icon: <Italic size={16} /> },
  { value: 'underline', label: 'Underline', icon: <Underline size={16} /> },
];

function MultipleExample() {
  const [values, setValues] = useState(['bold']);

  return (
    <ToggleGroup
      variant="multiple"
      options={formatOptions}
      value={values}
      onChange={(event, newValues) => setValues(newValues || [])}
      color="secondary"
    />
  );
}
```

### With Visual Effects

```tsx
function StyledExample() {
  const [theme, setTheme] = useState('light');

  return (
    <ToggleGroup
      glass
      gradient
      glow
      options={themeOptions}
      value={theme}
      onChange={(event, newTheme) => setTheme(newTheme || 'light')}
      color="success"
      size="lg"
    />
  );
}
```

## Selection Modes

### Single Selection

- Default behavior
- Only one option can be selected at a time
- Clicking selected option deselects it
- Value type: `string | null`

### Multiple Selection

- Multiple options can be selected simultaneously
- Clicking toggles individual options on/off
- Value type: `string[]`

### Exclusive Selection

- Exactly one option must always be selected
- Clicking selected option does not deselect it
- Useful for required choices like themes or modes
- Value type: `string`

## Accessibility

The ToggleGroup component follows WCAG guidelines:

- **Keyboard Navigation**: Full keyboard support with Tab, Space, and Enter keys
- **Screen Readers**: Proper ARIA attributes for group role and state announcements
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Respects system high contrast preferences
- **Touch Targets**: Minimum 44px touch targets for mobile accessibility

## Best Practices

1. **Option Labels**: Use clear, concise labels that describe the action or state
2. **Icon Usage**: Combine icons with labels for better usability, use icons alone only for universally recognized actions
3. **Group Size**: Limit to 2-8 options for optimal usability
4. **Disabled States**: Provide clear visual feedback for disabled options
5. **Loading States**: Handle loading scenarios gracefully with appropriate feedback
6. **Responsive Design**: Test across different screen sizes and orientations

## Testing

The ToggleGroup component includes comprehensive test support with data-testid attributes for reliable automated testing.

### TestId Structure

The component uses a consistent pattern for testIds:

- **Container**: Uses the `dataTestId` prop value (default: `toggle-group`)
- **Toggle Items**: Format: `${dataTestId}-item-${option.value}`

### Default TestIds

```tsx
<ToggleGroup
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]}
/>
```

Generated testIds:
- Container: `toggle-group`
- Items: `toggle-group-item-left`, `toggle-group-item-center`, `toggle-group-item-right`

### Custom TestIds

```tsx
<ToggleGroup
  options={alignOptions}
  dataTestId="text-alignment"
/>
```

Generated testIds:
- Container: `text-alignment`
- Items: `text-alignment-item-left`, `text-alignment-item-center`, `text-alignment-item-right`

### Testing with React Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should allow selection via testId', async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();

  render(
    <ToggleGroup
      options={options}
      onChange={handleChange}
      dataTestId="my-toggle"
    />
  );

  // Find container
  const container = screen.getByTestId('my-toggle');
  expect(container).toBeInTheDocument();

  // Find and interact with specific item
  const item = screen.getByTestId('my-toggle-item-left');
  await user.click(item);

  expect(handleChange).toHaveBeenCalled();
});
```

### Testing with Playwright

```typescript
test('toggle selection', async ({ page }) => {
  // Navigate to page with toggle group
  await page.goto('/my-page');

  // Find container
  const toggleGroup = page.getByTestId('toggle-group');
  await expect(toggleGroup).toBeVisible();

  // Click specific toggle item
  await page.getByTestId('toggle-group-item-center').click();

  // Verify selection state
  await expect(page.getByTestId('toggle-group-item-center')).toHaveAttribute('aria-pressed', 'true');
});
```

### Testing Multiple States

```tsx
test('should handle multiple selection mode', async () => {
  const user = userEvent.setup();

  render(
    <ToggleGroup
      variant="multiple"
      options={formatOptions}
      dataTestId="format-toggle"
    />
  );

  // Select multiple items
  await user.click(screen.getByTestId('format-toggle-item-bold'));
  await user.click(screen.getByTestId('format-toggle-item-italic'));

  // Both should be selected
  expect(screen.getByTestId('format-toggle-item-bold')).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByTestId('format-toggle-item-italic')).toHaveAttribute('aria-pressed', 'true');
});
```

### Testing Disabled States

```tsx
test('should respect disabled state', async () => {
  const user = userEvent.setup();

  render(
    <ToggleGroup
      options={[
        { value: 'enabled', label: 'Enabled' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
      dataTestId="mixed-toggle"
    />
  );

  const disabledItem = screen.getByTestId('mixed-toggle-item-disabled');
  expect(disabledItem).toBeDisabled();

  // Attempt to click disabled item
  await user.click(disabledItem);

  // Should remain unselected
  expect(disabledItem).toHaveAttribute('aria-pressed', 'false');
});
```

### Best Practices for Testing

1. **Use descriptive testIds**: Choose testIds that clearly identify the component's purpose
2. **Test user interactions**: Verify click events, keyboard navigation, and state changes
3. **Check accessibility**: Ensure proper ARIA attributes are present
4. **Test edge cases**: Include tests for disabled states, empty options, and special characters
5. **Verify visual states**: Test glass, gradient, and glow effects when applicable

## Common Patterns

### Toolbar Controls

Perfect for text editor toolbars, media controls, or any interface requiring multiple toggle states.

### Settings Panels

Use exclusive mode for required settings like theme selection or display modes.

### Filtering Interfaces

Multiple selection mode works well for filter controls where users can select multiple criteria.

### Form Controls

Integration with form libraries for controlled form state management.
