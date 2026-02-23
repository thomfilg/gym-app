# PasswordStrength Component

A comprehensive password strength indicator with visual feedback, requirement checking, and multiple display variants.

## Features

- Real-time password strength calculation
- Customizable requirements validation
- Multiple visual indicators (linear, circular, steps)
- Animated transitions and glass morphism effects
- Helpful improvement suggestions
- Full accessibility support
- Theme integration

## Usage

```tsx
import { PasswordStrength } from '@procurement/ui';

// Basic usage
<PasswordStrength value={password} />

// With custom requirements
<PasswordStrength
  value={password}
  requirements={{
    minLength: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  }}
  showSuggestions={true}
  variant="circular"
/>
```

## Props

### `value` (required)

- Type: `string`
- Description: The password string to analyze

### `showRequirements`

- Type: `boolean`
- Default: `true`
- Description: Display requirements checklist with visual indicators

### `requirements`

- Type: `PasswordRequirements`
- Default: `{ minLength: 8, uppercase: true, lowercase: true, numbers: true, special: true }`
- Description: Custom password requirements configuration

### `showStrengthLabel`

- Type: `boolean`
- Default: `true`
- Description: Display strength label (Very Weak, Weak, Fair, Good, Strong)

### `showSuggestions`

- Type: `boolean`
- Default: `false`
- Description: Show improvement suggestions for weak passwords

### `variant`

- Type: `'linear' | 'circular' | 'steps'`
- Default: `'linear'`
- Description: Visual indicator style

### `animated`

- Type: `boolean`
- Default: `true`
- Description: Enable animations and smooth transitions

## PasswordRequirements Interface

```typescript
interface PasswordRequirements {
  minLength?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  special?: boolean;
}
```

## Strength Levels

1. **Very Weak (0-20%)** - Red color, needs significant improvement
2. **Weak (21-40%)** - Orange color, basic requirements not met
3. **Fair (41-60%)** - Blue color, moderate strength
4. **Good (61-80%)** - Light green color, strong password
5. **Strong (81-100%)** - Dark green color, excellent password

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color indicators
- Clear visual feedback for all states
- Semantic HTML structure

## Visual Variants

### Linear Progress Bar

Standard horizontal progress bar with gradient colors.

### Circular Indicator

Circular progress ring with percentage display.

### Steps Indicator

Five discrete steps showing incremental progress.

## Design Tokens

Uses MUI theme tokens for:

- Colors and gradients
- Spacing and layout
- Typography scales
- Border radius values
- Animation durations

## Best Practices

- Always validate passwords on both client and server
- Use this component alongside secure password input fields
- Consider showing requirements before user starts typing
- Provide clear feedback for password improvements
- Test with screen readers for accessibility compliance
