# Toggle Component

## Purpose and Use Cases

The Toggle component provides a button or set of buttons that allow users to switch between on/off states or select from multiple options. It's built on top of Material-UI's ToggleButton components and supports both single and group toggle functionality.

Common use cases:

- Binary on/off switches (e.g., enable/disable features)
- View mode selectors (e.g., list/grid/card views)
- Format selectors (e.g., bold/italic/underline in text editors)
- Option selectors where only one choice is valid at a time
- Multi-select option groups where multiple choices can be active

## Props Documentation

### Toggle Props

| Prop           | Type                                                                                    | Default      | Description                                                      |
| -------------- | --------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| `value`        | `string \| number`                                                                      | -            | The value associated with the toggle button                      |
| `selected`     | `boolean`                                                                               | `false`      | Whether the toggle is in the selected state                      |
| `disabled`     | `boolean`                                                                               | `false`      | If true, the toggle will be disabled                             |
| `onChange`     | `(event: React.MouseEvent<HTMLElement>, value: any) => void`                            | -            | Callback fired when the toggle's state changes                   |
| `size`         | `'small' \| 'medium' \| 'large'`                                                        | `'medium'`   | The size of the toggle button                                    |
| `color`        | `'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success' \| 'standard'` | `'standard'` | The color of the toggle button                                   |
| `variant`      | `'standard' \| 'glass'`                                                                 | `'standard'` | Visual variant of the toggle                                     |
| `fullWidth`    | `boolean`                                                                               | `false`      | If true, the toggle will take up the full width of its container |
| `children`     | `React.ReactNode`                                                                       | -            | The content of the toggle button                                 |
| `className`    | `string`                                                                                | -            | Additional CSS class name(s) to apply                            |
| `sx`           | `SxProps<Theme>`                                                                        | -            | MUI system props for custom styling                              |
| `exclusive`    | `boolean`                                                                               | `false`      | When used in ToggleButtonGroup, allows only one selection        |
| `onFocus`      | `(event: React.FocusEvent<HTMLButtonElement>) => void`                                  | -            | Callback fired when the toggle receives focus                    |
| `onBlur`       | `(event: React.FocusEvent<HTMLButtonElement>) => void`                                  | -            | Callback fired when the toggle loses focus                       |
| `aria-label`   | `string`                                                                                | -            | Accessible label for the toggle                                  |
| `aria-pressed` | `boolean`                                                                               | -            | Indicates the toggle's pressed state for screen readers          |

### ToggleGroup Props

| Prop          | Type                                                         | Default        | Description                                        |
| ------------- | ------------------------------------------------------------ | -------------- | -------------------------------------------------- |
| `value`       | `any \| any[]`                                               | -              | The currently selected value(s)                    |
| `onChange`    | `(event: React.MouseEvent<HTMLElement>, value: any) => void` | -              | Callback fired when the selection changes          |
| `exclusive`   | `boolean`                                                    | `false`        | If true, only one toggle can be selected at a time |
| `orientation` | `'horizontal' \| 'vertical'`                                 | `'horizontal'` | The orientation of the toggle group                |
| `size`        | `'small' \| 'medium' \| 'large'`                             | `'medium'`     | The size of all toggles in the group               |
| `color`       | `string`                                                     | `'standard'`   | The color of all toggles in the group              |
| `disabled`    | `boolean`                                                    | `false`        | If true, all toggles in the group will be disabled |
| `fullWidth`   | `boolean`                                                    | `false`        | If true, the group will take up the full width     |
| `children`    | `React.ReactNode`                                            | -              | The toggle buttons to display in the group         |
| `className`   | `string`                                                     | -              | Additional CSS class name(s) to apply              |
| `sx`          | `SxProps<Theme>`                                             | -              | MUI system props for custom styling                |

## Usage Examples

### Basic Toggle

```tsx
import { Toggle } from '@procurement/ui';

function BasicExample() {
  const [selected, setSelected] = useState(false);

  return (
    <Toggle selected={selected} onChange={() => setSelected(!selected)} aria-label="Toggle option">
      Toggle Me
    </Toggle>
  );
}
```

### Toggle Group (Exclusive)

```tsx
import { ToggleGroup, Toggle } from '@procurement/ui';

function ViewSelector() {
  const [view, setView] = useState('list');

  return (
    <ToggleGroup
      value={view}
      exclusive
      onChange={(event, newView) => {
        if (newView !== null) {
          setView(newView);
        }
      }}
      aria-label="View selector"
    >
      <Toggle value="list" aria-label="List view">
        <ListIcon />
      </Toggle>
      <Toggle value="grid" aria-label="Grid view">
        <GridIcon />
      </Toggle>
      <Toggle value="card" aria-label="Card view">
        <CardIcon />
      </Toggle>
    </ToggleGroup>
  );
}
```

### Multi-Select Toggle Group

```tsx
import { ToggleGroup, Toggle } from '@procurement/ui';

function FormatSelector() {
  const [formats, setFormats] = useState<string[]>([]);

  return (
    <ToggleGroup
      value={formats}
      onChange={(event, newFormats) => {
        setFormats(newFormats);
      }}
      aria-label="Text formatting"
    >
      <Toggle value="bold" aria-label="Bold">
        <FormatBoldIcon />
      </Toggle>
      <Toggle value="italic" aria-label="Italic">
        <FormatItalicIcon />
      </Toggle>
      <Toggle value="underlined" aria-label="Underline">
        <FormatUnderlinedIcon />
      </Toggle>
    </ToggleGroup>
  );
}
```

### Glass Variant

```tsx
<Toggle variant="glass" selected={selected} onChange={handleChange}>
  Glass Toggle
</Toggle>
```

## Accessibility Notes

- **ARIA Attributes**: Always provide `aria-label` for toggles without visible text labels
- **Keyboard Navigation**:
  - `Tab` navigates between toggle buttons
  - `Space` or `Enter` activates the focused toggle
  - In groups, arrow keys navigate between toggles
- **Screen Reader Support**:
  - Use `aria-pressed` to indicate toggle state
  - Provide descriptive labels for icon-only toggles
  - Announce state changes appropriately
- **Focus Management**:
  - Clear focus indicators are provided
  - Focus trap is not needed for toggle groups
  - Disabled toggles are skipped in tab order
- **Color Contrast**: Ensure sufficient contrast between toggle states

## Testing

The Toggle component includes comprehensive test IDs for automated testing:

### Test IDs

| Element | Test ID Pattern | Description |
| ------- | --------------- | ----------- |
| Toggle Button | `dataTestId` | The main toggle button container |
| Icon | `{dataTestId}-icon` | The icon element (when icon prop is provided) |

### Testing Example

```tsx
import { Toggle } from '@procurement/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Toggle', () => {
  it('should toggle selection state on click', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Toggle
        dataTestId="my-toggle"
        selected={false}
        onChange={handleChange}
        value="test"
      >
        Toggle Me
      </Toggle>
    );

    const toggle = screen.getByTestId('my-toggle');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should render icon with test ID', () => {
    render(
      <Toggle
        dataTestId="icon-toggle"
        selected={false}
        icon={<span>★</span>}
      >
        Star
      </Toggle>
    );

    const icon = screen.getByTestId('icon-toggle-icon');
    expect(icon).toBeInTheDocument();
  });
});
```

### Integration with Storybook

All test stories use the `dataTestId` prop for interaction testing. See `Toggle.test.stories.tsx` for comprehensive examples.

## Best Practices

1. **Clear State Indication**: Make it visually obvious when a toggle is selected vs unselected
2. **Appropriate Size**: Use size variants based on touch target requirements
3. **Group Related Options**: Use ToggleGroup for related options that belong together
4. **Exclusive vs Multi-Select**: Choose the right mode based on user expectations
5. **Icon Usage**: When using icons, always include accessible labels
6. **Feedback**: Provide immediate visual feedback on interaction
7. **Disabled State**: Clearly communicate when toggles are disabled and why
8. **Mobile Optimization**: Ensure touch targets meet minimum size requirements (44x44px)
9. **Loading States**: Consider showing loading state if toggle triggers async operations
10. **Error Handling**: Handle edge cases like null values in exclusive groups gracefully
11. **Test Coverage**: Always provide `dataTestId` prop for components that need to be tested
