# Switch Component

## Overview

The Switch component is a highly customizable toggle control that allows users to switch between checked and unchecked states. It provides extensive visual styling options, animations, and full accessibility support while maintaining a clean, modern interface.

## Features

- **Multiple Variants**: default, iOS, Android, Material Design, and label styles
- **Color Themes**: primary, secondary, success, warning, danger, neutral
- **Size Options**: xs, sm, md, lg, xl
- **Special Effects**: glow, glass morphism, gradient, pulse, ripple animations
- **Loading States**: Built-in loading spinner with disabled interaction
- **Icon Support**: Custom on/off icons with smooth transitions
- **Label Text**: On/off text display within the switch track
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader compatible
- **Label Positioning**: start, end, top, bottom positioning options
- **Error States**: Error styling with helper text support

## Usage

```tsx
import { Switch } from '@procurement/ui';

// Basic usage
<Switch checked={isChecked} onChange={handleChange} />

// With label
<Switch
  label="Enable notifications"
  checked={isChecked}
  onChange={handleChange}
/>

// With description and helper text
<Switch
  label="Dark mode"
  description="Switch to dark theme"
  helperText="This setting will apply to all pages"
  checked={isDarkMode}
  onChange={toggleDarkMode}
/>

// iOS style with icons
<Switch
  variant="ios"
  onIcon={<CheckIcon />}
  offIcon={<CloseIcon />}
  checked={isEnabled}
  onChange={handleToggle}
/>

// With special effects
<Switch
  variant="gradient"
  glow
  pulse
  label="Premium feature"
  checked={isPremium}
  onChange={togglePremium}
/>
```

## Props

| Prop            | Type                                                                          | Default     | Description                                      |
| --------------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `variant`       | `'default' \| 'ios' \| 'android' \| 'label' \| 'material'`                    | `'default'` | Visual style variant                             |
| `color`         | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'primary'` | Color theme                                      |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`      | Switch size                                      |
| `label`         | `string`                                                                      | -           | Label text displayed next to switch              |
| `description`   | `string`                                                                      | -           | Description text below the label                 |
| `glow`          | `boolean`                                                                     | `false`     | Adds glow animation effect when checked          |
| `glass`         | `boolean`                                                                     | `false`     | Applies glass morphism effect                    |
| `gradient`      | `boolean`                                                                     | `false`     | Adds gradient background effect                  |
| `labelPosition` | `'start' \| 'end' \| 'top' \| 'bottom'`                                       | `'end'`     | Position of the label relative to switch         |
| `onIcon`        | `ReactNode`                                                                   | -           | Icon to display when switch is on                |
| `offIcon`       | `ReactNode`                                                                   | -           | Icon to display when switch is off               |
| `onText`        | `string`                                                                      | -           | Text to display in track when switch is on       |
| `offText`       | `string`                                                                      | -           | Text to display in track when switch is off      |
| `error`         | `boolean`                                                                     | `false`     | Error state flag                                 |
| `helperText`    | `string`                                                                      | -           | Helper or error text displayed below             |
| `trackWidth`    | `number`                                                                      | -           | Custom width for the switch track                |
| `trackHeight`   | `number`                                                                      | -           | Custom height for the switch track               |
| `checked`       | `boolean`                                                                     | -           | Checked state (controlled component)             |
| `onChange`      | `(event, checked) => void`                                                    | -           | Change event handler                             |
| `animated`      | `boolean`                                                                     | `true`      | Enable/disable animations                        |
| `loading`       | `boolean`                                                                     | `false`     | Shows loading spinner and disables switch        |
| `ripple`        | `boolean`                                                                     | `false`     | Enable ripple effect on interaction              |
| `pulse`         | `boolean`                                                                     | `false`     | Enable pulse animation on thumb                  |
| `disabled`      | `boolean`                                                                     | `false`     | Disables switch interaction                      |
| `dataTestId`    | `string`                                                                      | -           | Custom test ID for testing                       |
| `onClick`       | `(event) => void`                                                             | -           | Click event handler                              |
| `onFocus`       | `(event) => void`                                                             | -           | Focus event handler                              |
| `onBlur`        | `(event) => void`                                                             | -           | Blur event handler                               |

## Variants

### Default

Standard Material-UI switch styling with smooth transitions.

```tsx
<Switch label="Default switch" checked={checked} onChange={handleChange} />
```

### iOS

Apple iOS-style switch with rounded appearance and subtle shadows.

```tsx
<Switch variant="ios" label="iOS style" checked={checked} onChange={handleChange} />
```

### Android

Google Material Design switch with squared corners and bold shadows.

```tsx
<Switch variant="android" label="Android style" checked={checked} onChange={handleChange} />
```

### Label

Switch with text labels (on/off) displayed within the track.

```tsx
<Switch
  variant="label"
  onText="ON"
  offText="OFF"
  checked={checked}
  onChange={handleChange}
/>
```

### Material

Material Design 3 switch with modern rounded rectangular thumb.

```tsx
<Switch variant="material" label="Material Design" checked={checked} onChange={handleChange} />
```

## Color Themes

All color themes integrate with your application's theme:

```tsx
<Switch color="primary" label="Primary" />
<Switch color="secondary" label="Secondary" />
<Switch color="success" label="Success" />
<Switch color="warning" label="Warning" />
<Switch color="danger" label="Danger" />
<Switch color="neutral" label="Neutral" />
```

## Sizes

Available sizes from extra small to extra large:

```tsx
<Switch size="xs" label="Extra Small" />
<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />
<Switch size="xl" label="Extra Large" />
```

## Special Effects

### Glow Effect

Adds an animated glow effect when the switch is checked:

```tsx
<Switch glow label="Glow effect" checked={checked} onChange={handleChange} />
```

### Glass Morphism

Applies a modern glass morphism effect with blur and transparency:

```tsx
<Switch glass label="Glass effect" checked={checked} onChange={handleChange} />
```

### Gradient

Adds gradient background with shimmer animation:

```tsx
<Switch gradient label="Gradient effect" checked={checked} onChange={handleChange} />
```

### Pulse Animation

Adds a pulse animation to the switch thumb:

```tsx
<Switch pulse label="Pulse effect" checked={checked} onChange={handleChange} />
```

### Ripple Effect

Adds a ripple animation on hover:

```tsx
<Switch ripple label="Ripple effect" checked={checked} onChange={handleChange} />
```

## Loading State

Show a loading spinner and disable interaction:

```tsx
<Switch
  loading
  label="Saving..."
  checked={checked}
  onChange={handleChange}
/>
```

## Error State

Display error styling with helper text:

```tsx
<Switch
  error
  label="Enable feature"
  helperText="This field is required"
  checked={checked}
  onChange={handleChange}
/>
```

## Label Positioning

Control the position of the label relative to the switch:

```tsx
// Label at the end (default)
<Switch labelPosition="end" label="Label at end" />

// Label at the start
<Switch labelPosition="start" label="Label at start" />

// Label on top
<Switch labelPosition="top" label="Label on top" />

// Label at bottom
<Switch labelPosition="bottom" label="Label at bottom" />
```

## Icons

Add custom icons that transition based on the switch state:

```tsx
import { Check, Close } from '@mui/icons-material';

<Switch
  onIcon={<Check />}
  offIcon={<Close />}
  label="With icons"
  checked={checked}
  onChange={handleChange}
/>
```

## Accessibility

The Switch component follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: Supports Tab and Space key activation
- **Focus Management**: Clear focus indicators with visible outline
- **ARIA Attributes**: Supports aria-label, aria-describedby, role="switch"
- **Screen Reader**: Properly announces switch state (on/off)
- **Disabled State**: Communicates disabled state to assistive technologies
- **Error State**: Associates error messages with the switch
- **Helper Text**: Properly linked via aria-describedby

### Keyboard Shortcuts

- `Tab`: Navigate to switch
- `Space`: Toggle switch state
- `Shift + Tab`: Navigate to previous element

## Best Practices

1. **Use meaningful labels**: Provide clear, concise labels that describe what the switch controls

2. **Consider label position**: Use `labelPosition="start"` for long labels or descriptions

3. **Provide feedback**: Use loading states for async operations

4. **Use semantic colors**: Match colors to the action intent (success for enabling features, danger for destructive toggles)

5. **Add helper text**: Provide context about what the switch does

6. **Avoid nested switches**: Don't place switches inside clickable containers

7. **Test accessibility**: Ensure keyboard navigation and screen reader support

8. **Consider mobile**: Use appropriate sizes for touch targets (minimum 44x44px)

## Examples

### Settings Toggle

```tsx
<Switch
  label="Email notifications"
  description="Receive updates via email"
  checked={emailEnabled}
  onChange={handleEmailToggle}
/>
```

### Feature Flag

```tsx
<Switch
  variant="ios"
  color="success"
  label="Beta features"
  helperText="Enable experimental features (may be unstable)"
  checked={betaEnabled}
  onChange={toggleBeta}
/>
```

### Dark Mode Toggle

```tsx
<Switch
  variant="material"
  onIcon={<DarkModeIcon />}
  offIcon={<LightModeIcon />}
  label="Dark mode"
  checked={isDarkMode}
  onChange={toggleDarkMode}
/>
```

### Premium Feature

```tsx
<Switch
  variant="gradient"
  glow
  color="warning"
  label="Premium mode"
  description="Unlock premium features"
  checked={isPremium}
  onChange={togglePremium}
  disabled={!hasSubscription}
  helperText={!hasSubscription ? "Requires active subscription" : undefined}
/>
```

### Async Toggle

```tsx
<Switch
  label="Auto-save"
  loading={isSaving}
  checked={autoSave}
  onChange={handleAutoSaveToggle}
/>
```

## Theming

The Switch component integrates with MUI's theme system:

```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    success: {
      main: '#4caf50',
    },
  },
});
```

## Performance

- Component uses React.forwardRef for ref forwarding
- Styled with MUI's styled API for optimal performance
- Animation effects use CSS keyframes for smooth 60fps animations
- Conditional rendering of icons to minimize DOM nodes
- Memoized color calculations to reduce re-renders

## Testing

### Test IDs

The Switch component includes `data-testid` attributes for reliable testing:

| Test ID                     | Element        | Description                                             |
| --------------------------- | -------------- | ------------------------------------------------------- |
| `switch`                    | Switch input   | Main switch input element (default)                     |
| `{dataTestId}`              | Switch input   | Switch input with custom testId                         |
| `switch-container`          | Container Box  | Wrapper containing switch, label, and helper text       |
| `{dataTestId}-container`    | Container Box  | Container with custom testId                            |
| `switch-label`              | Typography     | Label text element (when label is provided)             |
| `{dataTestId}-label`        | Typography     | Label with custom testId                                |
| `switch-helper`             | FormHelperText | Helper text element (when helperText is provided)       |
| `{dataTestId}-helper`       | FormHelperText | Helper text with custom testId                          |

### Testing Best Practices

**Wait for Switch to Render:**
```typescript
const switchElement = await canvas.findByTestId('switch');
expect(switchElement).toBeInTheDocument();
```

**Test with Custom TestId:**
```typescript
<Switch dataTestId="dark-mode-switch" label="Dark Mode" />

const switchElement = await canvas.findByTestId('dark-mode-switch');
const container = await canvas.findByTestId('dark-mode-switch-container');
const label = await canvas.findByTestId('dark-mode-switch-label');
expect(switchElement).toBeInTheDocument();
expect(container).toBeInTheDocument();
expect(label).toHaveTextContent('Dark Mode');
```

**Test Interactions:**
```typescript
const switchElement = await canvas.findByTestId('switch');
await userEvent.click(switchElement);
expect(onChange).toHaveBeenCalledWith(expect.anything(), true);

// Toggle again
await userEvent.click(switchElement);
expect(onChange).toHaveBeenCalledWith(expect.anything(), false);
```

**Test Keyboard Navigation:**
```typescript
const switchElement = await canvas.findByTestId('switch');
switchElement.focus();
await userEvent.keyboard(' '); // Space key
expect(onChange).toHaveBeenCalled();
```

**Test States:**
```typescript
// Loading state
const loadingSwitch = await canvas.findByTestId('switch');
expect(loadingSwitch).toBeDisabled();
const loadingIndicator = container.querySelector('[class*="spin"]');
expect(loadingIndicator).toBeInTheDocument();

// Error state with helper text
const helperText = await canvas.findByTestId('switch-helper');
expect(helperText).toHaveTextContent('Error message');
expect(helperText).toHaveClass('Mui-error');

// Disabled state
const disabledSwitch = await canvas.findByTestId('switch');
expect(disabledSwitch).toBeDisabled();
expect(disabledSwitch).toHaveAttribute('aria-disabled', 'true');
```

**Test Checked State:**
```typescript
// Checked
<Switch dataTestId="test-switch" checked={true} />
const switchElement = await canvas.findByTestId('test-switch');
expect(switchElement).toBeChecked();
expect(switchElement).toHaveAttribute('aria-checked', 'true');

// Unchecked
<Switch dataTestId="test-switch" checked={false} />
expect(switchElement).not.toBeChecked();
expect(switchElement).toHaveAttribute('aria-checked', 'false');
```

**Test Accessibility:**
```typescript
const switchElement = await canvas.findByRole('switch');
expect(switchElement).toHaveAttribute('aria-label');

// With label
const switchWithLabel = await canvas.findByRole('switch', { name: /enable notifications/i });
expect(switchWithLabel).toBeInTheDocument();

// With helper text
const helperTextId = switchElement.getAttribute('aria-describedby');
expect(helperTextId).toBeTruthy();
const helperText = document.getElementById(helperTextId);
expect(helperText).toHaveTextContent('Helper text message');
```

**Test Variants:**
```typescript
// iOS variant
<Switch dataTestId="ios-switch" variant="ios" />
const iosSwitch = await canvas.findByTestId('ios-switch');
expect(iosSwitch.closest('.MuiSwitch-root')).toBeInTheDocument();

// With icons
<Switch
  dataTestId="icon-switch"
  onIcon={<CheckIcon />}
  offIcon={<CloseIcon />}
  checked={true}
/>
const iconContainer = container.querySelector('[role="img"]');
expect(iconContainer).toBeInTheDocument();
```

**Test Special Effects:**
```typescript
// Glow effect
<Switch dataTestId="glow-switch" glow checked={true} />
const glowSwitch = await canvas.findByTestId('glow-switch');
const track = glowSwitch.nextElementSibling;
expect(track).toHaveStyle({ animation: expect.stringContaining('glow') });

// Gradient effect
<Switch dataTestId="gradient-switch" gradient checked={true} />
const gradientTrack = gradientSwitch.nextElementSibling;
expect(gradientTrack).toHaveStyle({ background: expect.stringContaining('gradient') });
```

### Common Test Scenarios

1. **Basic Rendering** - Verify switch renders correctly
2. **Toggle State** - Test switching between checked and unchecked
3. **Controlled Component** - Verify checked prop controls state
4. **Change Handler** - Test onChange callback with correct arguments
5. **Loading State** - Verify loading spinner and disabled interaction
6. **Error State** - Test error styling and helper text
7. **Disabled State** - Verify switch cannot be toggled when disabled
8. **Variants** - Test all visual variants (default, iOS, Android, material, label)
9. **Sizes** - Test all size options (xs, sm, md, lg, xl)
10. **Colors** - Test all color themes
11. **Label Positioning** - Test all label positions (start, end, top, bottom)
12. **Icons** - Test on/off icon rendering and transitions
13. **Text Labels** - Test on/off text in track
14. **Special Effects** - Test glow, glass, gradient, pulse, ripple
15. **Keyboard Navigation** - Test Space key toggle
16. **Focus Management** - Test focus and blur events
17. **Accessibility** - Verify ARIA attributes and screen reader support
18. **Helper Text** - Test helper text display and association
19. **Custom Dimensions** - Test trackWidth and trackHeight props
20. **Animations** - Test animated prop and animation effects

## Related Components

- Checkbox - For multi-select scenarios
- Radio - For exclusive selection from a group
- ToggleButton - For visual toggle with button appearance
- FormControlLabel - For wrapping form controls with labels
