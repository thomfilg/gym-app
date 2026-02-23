# Slider Component

## Overview

The Slider component allows users to select values from a continuous or discrete range by dragging a thumb along a track. It's built on top of MUI's Slider with enhanced theming, glow effects, and comprehensive accessibility features.

## Usage

```tsx
import { Slider } from '@/components/form/Slider';

// Basic usage
<Slider value={50} onChange={(e, value) => setValue(value)} />

// Range slider
<Slider value={[20, 60]} onChange={(e, value) => setRange(value)} />

// With marks
<Slider value={30} marks step={10} min={0} max={100} />

// Vertical orientation
<Slider value={50} orientation="vertical" />

// With glow effect
<Slider value={75} enableGlow />
```

## Props

| Prop              | Type                                                                    | Default      | Description                      |
| ----------------- | ----------------------------------------------------------------------- | ------------ | -------------------------------- |
| value             | number \| number[]                                                      | -            | Current value or range           |
| onChange          | (event, value) => void                                                  | -            | Callback when value changes      |
| min               | number                                                                  | 0            | Minimum value                    |
| max               | number                                                                  | 100          | Maximum value                    |
| step              | number                                                                  | 1            | Step increment                   |
| marks             | boolean \| Mark[]                                                       | false        | Show tick marks                  |
| disabled          | boolean                                                                 | false        | Disable slider interaction       |
| orientation       | 'horizontal' \| 'vertical'                                              | 'horizontal' | Slider orientation               |
| valueLabelDisplay | 'on' \| 'auto' \| 'off'                                                 | 'off'        | When to display value label      |
| valueLabelFormat  | string \| func                                                          | -            | Format value label               |
| getAriaLabel      | (index) => string                                                       | -            | Aria label for thumbs            |
| getAriaValueText  | (value, index) => string                                                | -            | Aria value text                  |
| color             | 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success' | 'primary'    | Theme color                      |
| size              | 'small' \| 'medium'                                                     | 'medium'     | Component size                   |
| track             | 'normal' \| 'inverted' \| false                                         | 'normal'     | Track display mode               |
| disableSwap       | boolean                                                                 | false        | Disable thumb swap in range mode |
| enableGlow        | boolean                                                                 | false        | Enable glow effect               |
| sx                | SxProps                                                                 | -            | Custom MUI styles                |

## Features

### Value Selection

- Single value selection with draggable thumb
- Range selection with two thumbs
- Precise value control with step increments
- Click-to-position on track

### Keyboard Navigation

- **Arrow Keys**: Increase/decrease by step
- **Page Up/Down**: Large increment/decrement
- **Home/End**: Jump to min/max
- **Tab**: Navigate between thumbs in range mode

### Accessibility

- ARIA attributes for screen readers
- Keyboard-only navigation support
- Focus indicators
- Value announcements
- Custom labels and descriptions

### Visual Features

- Multiple color themes
- Size variants
- Glow effects for enhanced visibility
- Value labels with custom formatting
- Tick marks with labels
- Vertical and horizontal orientations

## Examples

### Basic Slider

```tsx
<Slider value={value} onChange={(e, v) => setValue(v)} min={0} max={100} />
```

### Range Slider

```tsx
<Slider value={[20, 80]} onChange={(e, v) => setRange(v)} min={0} max={100} />
```

### With Custom Marks

```tsx
const marks = [
  { value: 0, label: '0°C' },
  { value: 20, label: '20°C' },
  { value: 37, label: '37°C' },
  { value: 100, label: '100°C' },
];

<Slider value={value} marks={marks} step={null} valueLabelDisplay="auto" />;
```

### Vertical Slider

```tsx
<Slider value={value} orientation="vertical" sx={{ height: 300 }} />
```

### With Glow Effect

```tsx
<Slider value={value} enableGlow color="primary" />
```

### Custom Value Label

```tsx
<Slider value={value} valueLabelDisplay="on" valueLabelFormat={(v) => `${v}%`} />
```

## Styling

The component accepts MUI's `sx` prop for custom styling:

```tsx
<Slider
  sx={{
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      width: 24,
      height: 24,
      backgroundColor: '#fff',
      '&:before': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
      },
    },
  }}
/>
```

## Best Practices

1. **Provide Labels**: Always include aria-label or aria-labelledby for accessibility
2. **Value Feedback**: Show current value through labels or separate display
3. **Appropriate Steps**: Choose step values that make sense for your use case
4. **Range Validation**: Ensure min/max values are appropriate
5. **Keyboard Support**: Test keyboard navigation thoroughly
6. **Mobile Touch**: Ensure thumb is large enough for touch interaction
7. **Color Contrast**: Maintain sufficient contrast for visibility

## Accessibility

The Slider component follows WAI-ARIA authoring practices:

- Uses `role="slider"` for single value
- Provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Supports `aria-label` and `aria-labelledby`
- Full keyboard navigation support
- Focus management for range sliders
- Screen reader announcements for value changes

## Performance Considerations

- The component is optimized for smooth dragging
- Uses React.memo to prevent unnecessary re-renders
- Debounced value updates available through controlled mode
- Efficient event handling for mouse and touch events

## Testing

The Slider component supports comprehensive testing through the `dataTestId` prop. When provided, it automatically generates test identifiers for all interactive elements.

### Test ID Structure

When you pass `dataTestId="my-slider"`, the following test IDs are generated:

| Element | Test ID | Description |
| --- | --- | --- |
| Root Container | `my-slider` | Main wrapper containing the entire slider |
| Slider Component | `my-slider-slider` | The MUI Slider component itself |
| Track | `my-slider-track` | The filled track showing current value |
| Thumb | `my-slider-thumb` | The draggable thumb control |
| Label | `my-slider-label` | The label text (if label prop is provided) |
| Value Label | `my-slider-value-label` | The displayed value (if showValue is enabled) |

### Testing Examples

#### Basic Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { Slider } from '@/components/form/Slider';

test('renders slider with testId', () => {
  render(
    <Slider
      dataTestId="volume-slider"
      label="Volume"
      showValue
      value={50}
      onChange={() => {}}
    />
  );

  expect(screen.getByTestId('volume-slider')).toBeInTheDocument();
  expect(screen.getByTestId('volume-slider-label')).toHaveTextContent('Volume');
  expect(screen.getByTestId('volume-slider-slider')).toBeInTheDocument();
  expect(screen.getByTestId('volume-slider-track')).toBeInTheDocument();
  expect(screen.getByTestId('volume-slider-thumb')).toBeInTheDocument();
});
```

#### Testing Slider Interaction

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from '@/components/form/Slider';

test('interacts with slider', async () => {
  const handleChange = jest.fn();

  render(
    <Slider
      dataTestId="brightness-slider"
      value={50}
      onChange={handleChange}
    />
  );

  const thumb = screen.getByTestId('brightness-slider-thumb');
  await userEvent.hover(thumb);

  // Verify thumb is accessible
  expect(thumb).toBeInTheDocument();
});
```

#### Testing Range Slider

```tsx
test('renders range slider with testIds', () => {
  render(
    <Slider
      dataTestId="price-range"
      label="Price Range"
      showValue
      value={[20, 80]}
      onChange={() => {}}
      unit="$"
    />
  );

  const valueLabel = screen.getByTestId('price-range-value-label');
  expect(valueLabel).toHaveTextContent('20$ - 80$');
});
```

#### Testing in Forms

```tsx
test('slider works in form context', async () => {
  const onSubmit = jest.fn();

  render(
    <form onSubmit={onSubmit}>
      <Slider
        dataTestId="form-slider"
        label="Settings"
        value={75}
        onChange={() => {}}
      />
      <button type="submit">Submit</button>
    </form>
  );

  const slider = screen.getByTestId('form-slider-slider');
  expect(slider).toBeInTheDocument();

  await userEvent.click(screen.getByText('Submit'));
  expect(onSubmit).toHaveBeenCalled();
});
```

### Accessibility Testing

The slider component includes proper ARIA attributes that work seamlessly with testing:

```tsx
test('slider has correct accessibility attributes', () => {
  render(
    <Slider
      dataTestId="a11y-slider"
      value={60}
      min={0}
      max={100}
      aria-label="Volume control"
    />
  );

  const slider = screen.getByRole('slider');
  expect(slider).toHaveAttribute('aria-valuenow', '60');
  expect(slider).toHaveAttribute('aria-valuemin', '0');
  expect(slider).toHaveAttribute('aria-valuemax', '100');
  expect(slider).toHaveAttribute('aria-label', 'Volume control');
});
```

### Best Practices for Testing

1. **Always use dataTestId**: Makes tests more maintainable and readable
2. **Test user interactions**: Focus on how users interact with the slider
3. **Verify accessibility**: Ensure ARIA attributes are present and correct
4. **Test edge cases**: Min/max values, disabled states, range sliders
5. **Test visual states**: Different sizes, colors, and variants
6. **Integration testing**: Test slider within forms and complex UIs
