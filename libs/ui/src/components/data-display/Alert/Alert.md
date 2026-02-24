# Alert Component

A beautiful and versatile Alert component with multiple variants, animations, and accessibility features. Supports info, success, warning, danger, glass, and gradient styles with optional glow and pulse effects.

## Features

- Multiple visual variants (info, success, warning, danger, glass, gradient)
- Optional title and description support
- Closable/dismissible alerts with onClose callback
- Custom icon support with default icons per variant
- Glow and pulse animation effects
- Glass morphism design variant
- Gradient backgrounds with shimmer effects
- Full accessibility support with ARIA attributes
- Responsive design that adapts to container width
- Theme integration with MUI design system

## Props

### AlertProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger' \| 'glass' \| 'gradient'` | `'info'` | The visual style variant of the alert |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | - | Override color for the alert |
| `title` | `string` | - | Alert title text |
| `description` | `string` | - | Alert description text |
| `children` | `ReactNode` | - | Custom content within alert |
| `icon` | `ReactNode` | - | Custom icon for the alert |
| `showIcon` | `boolean` | `true` | Whether to show the default icon |
| `closable` | `boolean` | `false` | Whether the alert can be dismissed |
| `onClose` | `() => void` | - | Callback for dismissible alerts |
| `glow` | `boolean` | `false` | Add a glowing shadow effect |
| `pulse` | `boolean` | `false` | Add a pulsing animation effect |
| `animate` | `boolean` | `true` | Whether to animate the alert on mount |
| `className` | `string` | - | Additional CSS classes |

## Usage Examples

### Basic Alert

```tsx
import { Alert } from '@procurement/ui';

<Alert variant="info">
  This is a basic info alert message.
</Alert>
```

### Alert with Title and Description

```tsx
<Alert 
  variant="success" 
  title="Success!" 
  description="Your action was completed successfully."
/>
```

### Closable Alert

```tsx
<Alert 
  variant="warning" 
  title="Warning" 
  closable
  onClose={() => console.log('Alert closed')}
>
  This alert can be dismissed.
</Alert>
```

### Custom Icon

```tsx
import { Star } from '@mui/icons-material';

<Alert 
  variant="info" 
  icon={<Star />}
  title="Pro Tip"
>
  You can customize the alert icon.
</Alert>
```

### With Effects

```tsx
<Alert 
  variant="danger" 
  title="Critical Alert" 
  glow
  pulse
>
  This alert has both glow and pulse effects.
</Alert>
```

### Glass Morphism

```tsx
<Alert 
  variant="glass" 
  title="Glass Effect"
  description="This alert uses glassmorphism design with backdrop blur."
/>
```

### With Actions

```tsx
<Alert variant="info" title="System Update">
  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
    <Button size="small" variant="contained">
      Update Now
    </Button>
    <Button size="small" variant="outlined">
      Later
    </Button>
  </Box>
</Alert>
```

## Variants

- **info**: Blue informational styling with info icon
- **success**: Green success styling with check icon
- **warning**: Orange warning styling with warning icon  
- **danger**: Red error styling with error icon
- **glass**: Glass morphism effect with backdrop blur
- **gradient**: Gradient background with shimmer animation

## Accessibility

The Alert component implements comprehensive accessibility features:

- Uses `role="alert"` for immediate screen reader announcement
- Implements `aria-live` regions (polite for info/success, assertive for warning/danger)
- Proper focus management for closable alerts
- Keyboard navigation support (Enter/Space to close)
- High contrast colors meeting WCAG guidelines
- Screen reader compatible content structure

## Best Practices

1. Use appropriate variants for message severity
2. Keep alert messages concise and actionable
3. Provide close functionality for non-critical alerts
4. Use custom actions sparingly to avoid overwhelming users
5. Consider animation effects for attention but don't overuse
6. Test with screen readers for accessibility compliance

## Theming

The Alert component integrates with the MUI theme system and responds to:
- Primary/secondary color palette
- Typography variants
- Spacing tokens
- Border radius settings
- Shadow/elevation tokens

## Testing

### Test IDs

| Test ID | Element | Description |
|---------|---------|-------------|
| `alert` | Alert container | Main alert wrapper element |
| `alert-icon` | Icon | Alert severity icon |
| `alert-title` | Title | Alert title text |
| `alert-message` | Message | Alert message content |
| `alert-close` | Button | Close button (when closable) |

Custom test IDs can be provided via the `dataTestId` prop:
```typescript
<Alert dataTestId="custom-alert" />
// Results in: custom-alert, custom-alert-icon, custom-alert-title, etc.
```

### Testing Best Practices

**Wait for Component to Render:**
```typescript
const alert = await canvas.findByTestId('alert');
expect(alert).toBeInTheDocument();
```

**Test Close Interaction:**
```typescript
const closeButton = await canvas.findByTestId('alert-close');
await userEvent.click(closeButton);
expect(onClose).toHaveBeenCalled();
```

**Test Different Severities:**
```typescript
const alert = await canvas.findByTestId('alert');
expect(alert).toHaveAttribute('role', 'alert');
expect(alert).toHaveClass('MuiAlert-standardSuccess');
```

### Common Test Scenarios

1. **Basic Rendering** - Verify alert renders with message
2. **Severity Variants** - Test all severity types (success, error, warning, info)
3. **Closable Alert** - Test close button functionality
4. **With Title** - Verify title renders correctly
5. **Accessibility** - Verify ARIA attributes and role