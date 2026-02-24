# PhoneInput Component

## Overview

An international phone number input component with country selection, automatic formatting, and validation using libphonenumber-js. Features a dropdown country selector with flags, dial codes, and real-time phone number validation with glass morphism styling options.

## Props

| Prop         | Type                              | Default              | Description                                     |
| ------------ | --------------------------------- | -------------------- | ----------------------------------------------- |
| variant      | 'glass' \| 'outlined' \| 'filled' | 'outlined'           | Input styling variant                           |
| label        | string                            | 'Phone Number'       | Input field label                               |
| placeholder  | string                            | 'Enter phone number' | Placeholder text                                |
| icon         | React.ReactNode                   | PhoneIcon            | Custom end adornment icon                       |
| defaultValue | string                            | ''                   | Initial phone number value                      |
| countryCode  | CountryCode                       | 'US'                 | Default selected country                        |
| floating     | boolean                           | false                | Floating label style                            |
| onChange     | function                          | undefined            | Callback with value, validity, and country code |
| helper       | string                            | undefined            | Helper text below input                         |
| error        | boolean                           | false                | Error state                                     |
| errorMessage | string                            | undefined            | Custom error message                            |
| disabled     | boolean                           | false                | Disabled state                                  |
| required     | boolean                           | false                | Required field indicator                        |
| fullWidth    | boolean                           | true                 | Full width styling                              |

## Usage Examples

### Basic Usage

```tsx
import { PhoneInput } from '@ui/components/enhanced';

<PhoneInput label="Phone Number" placeholder="Enter your phone number" />;
```

### Glass Variant

```tsx
<PhoneInput variant="glass" label="Phone Number" countryCode="BR" />
```

### With Validation

```tsx
<PhoneInput
  label="Phone Number"
  onChange={(value, isValid, countryCode) => {
    console.log('Phone:', value, 'Valid:', isValid, 'Country:', countryCode);
  }}
/>
```

### With Error Handling

```tsx
<PhoneInput label="Phone Number" error={true} errorMessage="Please enter a valid phone number" />
```

## Features

- **International Support**: Supports 15 major countries with flags and dial codes
- **Real-time Validation**: Uses libphonenumber-js for accurate validation
- **Automatic Formatting**: Formats phone numbers according to international standards
- **Glass Morphism**: Optional glass effect styling with backdrop blur
- **Accessibility**: Full keyboard navigation and screen reader support
- **Country Selection**: Dropdown with flag icons and country names

## Accessibility

- Full keyboard navigation support
- Screen reader compatible with proper ARIA labels
- Focus management between country selector and input field
- Proper error state announcements

## Best Practices

1. Always provide a meaningful label
2. Use appropriate error messages for validation
3. Consider the user's likely country when setting defaultCountryCode
4. Test with various phone number formats
5. Provide helper text when needed to guide users

## Testing

### Overview
This section describes all `data-testid` attributes available in the PhoneInput component for testing purposes.

### Test IDs

#### Container Elements

##### `phone-input-container`
- **Element:** Root wrapper Box
- **Location:** Main container that wraps the TextField and CountryMenu
- **Usage:** Query the root container to verify component is rendered
```typescript
const container = await canvas.findByTestId('phone-input-container');
expect(container).toBeInTheDocument();
```

#### Input Elements

##### `phone-input-field`
- **Element:** TextField input element (GlassTextField or standard TextField)
- **Location:** The main text input field for phone number entry
- **Type:** `tel` input
- **Usage:** Query the input to type phone numbers and verify values
```typescript
const input = await canvas.findByTestId('phone-input-field');
await userEvent.type(input, '5551234567');

// Verify formatted value
await waitFor(async () => {
  const field = await canvas.findByTestId('phone-input-field');
  expect(field).toHaveValue(/\+1.*555.*123.*4567/);
}, { timeout: 1000 });
```

#### Country Selector Elements

##### `country-selector`
- **Element:** Country selector button
- **Location:** Box inside InputAdornment (start position) that displays flag and dial code
- **Role:** `button`
- **ARIA:** `aria-label="Select country"`
- **Usage:** Click to open country selection menu
```typescript
const selector = await canvas.findByTestId('country-selector');
await userEvent.click(selector);

// Wait for menu to open
const menu = await canvas.findByTestId('country-menu');
expect(menu).toBeVisible();
```

##### `country-menu`
- **Element:** Country selection dropdown menu
- **Location:** CountryMenu (styled MUI Menu) component
- **Conditional:** Only visible when `anchorEl` is set (menu is open)
- **Usage:** Query to verify menu is open and contains country options
```typescript
// Click selector to open menu
const selector = await canvas.findByTestId('country-selector');
await userEvent.click(selector);

// Verify menu appears
const menu = await canvas.findByTestId('country-menu');
expect(menu).toBeInTheDocument();
```

##### `country-option-${countryCode}`
- **Element:** Individual country menu item
- **Location:** MenuItem inside CountryMenu
- **Country Code:** Two-letter ISO country code (e.g., `US`, `GB`, `CA`)
- **Usage:** Query specific country option to select it
```typescript
// Open menu
await userEvent.click(await canvas.findByTestId('country-selector'));

// Select United Kingdom
const ukOption = await canvas.findByTestId('country-option-GB');
await userEvent.click(ukOption);

// Verify country changed (dial code should update)
const selector = await canvas.findByTestId('country-selector');
expect(selector).toHaveTextContent('+44');
```

### Test Patterns

#### Basic Input Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Get input field
  const input = await canvas.findByTestId('phone-input-field');

  // Type phone number
  await userEvent.type(input, '5551234567');

  // Verify onChange was called
  expect(args.onChange).toHaveBeenCalled();
}
```

#### Country Selection Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Click country selector
  const selector = await canvas.findByTestId('country-selector');
  await userEvent.click(selector);

  // Wait for menu
  const menu = await canvas.findByTestId('country-menu');
  expect(menu).toBeVisible();

  // Select country
  const countryOption = await canvas.findByTestId('country-option-GB');
  await userEvent.click(countryOption);

  // Verify selector shows new country
  await waitFor(async () => {
    const updatedSelector = await canvas.findByTestId('country-selector');
    expect(updatedSelector).toHaveTextContent('+44');
  }, { timeout: 500 });
}
```

#### Phone Number Formatting Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('phone-input-field');

  // Type unformatted number
  await userEvent.type(input, '5551234567');

  // Blur to trigger formatting
  await userEvent.tab();

  // Verify formatted with country code
  await waitFor(async () => {
    const field = await canvas.findByTestId('phone-input-field');
    const value = field.getAttribute('value') || '';
    expect(value).toMatch(/\+1.*555.*123.*4567/);
  }, { timeout: 1000 });
}
```

#### Validation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('phone-input-field');

  // Type invalid number
  await userEvent.type(input, '123');

  // Blur to trigger validation
  await userEvent.tab();

  // Wait for error message
  await waitFor(() => {
    const error = canvas.getByText(/Invalid phone number/i);
    expect(error).toBeVisible();
  }, { timeout: 500 });
}
```

#### Auto-Detect Country Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('phone-input-field');

  // Type international format with +44 (UK)
  await userEvent.type(input, '+447911123456');

  // Verify country auto-detected
  await waitFor(async () => {
    const selector = await canvas.findByTestId('country-selector');
    expect(selector).toHaveTextContent('🇬🇧'); // UK flag
    expect(selector).toHaveTextContent('+44');
  }, { timeout: 500 });
}
```

#### Keyboard Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const selector = await canvas.findByTestId('country-selector');

  // Focus selector
  selector.focus();

  // Press Enter to open menu
  await userEvent.keyboard('{Enter}');

  // Verify menu opens
  const menu = await canvas.findByTestId('country-menu');
  expect(menu).toBeVisible();

  // Can also use Space key
  await userEvent.keyboard('{Escape}'); // Close first
  await waitFor(() => {
    expect(canvas.queryByTestId('country-menu')).not.toBeInTheDocument();
  }, { timeout: 500 });

  selector.focus();
  await userEvent.keyboard(' '); // Space

  const menuReopened = await canvas.findByTestId('country-menu');
  expect(menuReopened).toBeVisible();
}
```

#### Disabled State Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('phone-input-field');

  // Verify input is disabled
  expect(input).toBeDisabled();

  // Country selector should still work (by design) or be disabled
  const selector = canvas.queryByTestId('country-selector');
  if (selector) {
    // If selector exists, it can still be clicked
    // This allows changing country even when input is disabled
  }
}
```

#### Glass Variant Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('phone-input-field');

  // Verify glass effect styling
  const inputRoot = input.closest('.MuiOutlinedInput-root');
  if (inputRoot) {
    const style = window.getComputedStyle(inputRoot);
    expect(style.backdropFilter).toContain('blur');
    expect(style.background).toContain('gradient');
  }
}
```

### Props That Affect Test Behavior

#### `variant`
- **Type:** `'outlined' | 'filled' | 'standard' | 'glass'`
- **Default:** `'outlined'`
- **Impact:**
  - `glass`: Uses GlassTextField with blur effect
  - Others: Uses standard MUI TextField

#### `countryCode`
- **Type:** `CountryCode` (e.g., `'US'`, `'GB'`)
- **Default:** `'US'`
- **Impact:** Initial country selection

#### `defaultValue`
- **Type:** `string`
- **Default:** `''`
- **Impact:** Pre-fills input field

#### `disabled`
- **Type:** `boolean`
- **Default:** `false`
- **Impact:** Disables input field

#### `error` / `errorMessage`
- **Type:** `boolean` / `string`
- **Impact:** Shows error state and custom message

#### `onChange`
- **Type:** `(value: string, valid: boolean, country: CountryCode) => void`
- **Impact:** Called on input change with validation result

### Available Countries

The component supports 46 countries. Common country codes for testing:

- `US` - United States (+1)
- `GB` - United Kingdom (+44)
- `CA` - Canada (+1)
- `AU` - Australia (+61)
- `DE` - Germany (+49)
- `FR` - France (+33)
- `JP` - Japan (+81)
- `CN` - China (+86)

Full list available in component source.

### Common Test Scenarios

#### 1. Basic Rendering
```typescript
const container = await canvas.findByTestId('phone-input-container');
expect(container).toBeInTheDocument();

const input = await canvas.findByTestId('phone-input-field');
expect(input).toHaveAttribute('type', 'tel');
```

#### 2. Typing a Phone Number
```typescript
const input = await canvas.findByTestId('phone-input-field');
await userEvent.type(input, '5551234567');
expect(input).toHaveValue('5551234567'); // Before blur
```

#### 3. Changing Country
```typescript
await userEvent.click(await canvas.findByTestId('country-selector'));
await userEvent.click(await canvas.findByTestId('country-option-FR'));

// Verify country changed
const selector = await canvas.findByTestId('country-selector');
expect(selector).toHaveTextContent('🇫🇷');
expect(selector).toHaveTextContent('+33');
```

#### 4. Validating Phone Number
```typescript
const input = await canvas.findByTestId('phone-input-field');
await userEvent.type(input, '5551234567');
await userEvent.tab(); // Blur to trigger validation

// Check for validation feedback (icon color changes, or error message)
await waitFor(() => {
  // Validation runs on blur - check onChange callback or error message
  expect(args.onChange).toHaveBeenCalledWith(
    expect.anything(),
    true, // valid = true
    'US'
  );
}, { timeout: 500 });
```

#### 5. International Format Detection
```typescript
const input = await canvas.findByTestId('phone-input-field');
await userEvent.type(input, '+447911123456');

// Country should auto-switch to GB
await waitFor(async () => {
  const selector = await canvas.findByTestId('country-selector');
  expect(selector).toHaveTextContent('+44');
}, { timeout: 500 });
```

### Troubleshooting

#### Issue: "Cannot find phone-input-field"

**Reason:** Using synchronous query

**Solution:** Always use `await` with `findByTestId`:
```typescript
// ❌ Wrong
const input = canvas.getByTestId('phone-input-field');

// ✅ Correct
const input = await canvas.findByTestId('phone-input-field');
```

#### Issue: "country-menu not found"

**Reason:** Menu only renders when open

**Solution:** Click country selector first:
```typescript
const selector = await canvas.findByTestId('country-selector');
await userEvent.click(selector);

// Now menu will be available
const menu = await canvas.findByTestId('country-menu');
```

#### Issue: "Formatted value doesn't match expected pattern"

**Reason:** Formatting happens on blur, not immediately after typing

**Solution:** Trigger blur event:
```typescript
const input = await canvas.findByTestId('phone-input-field');
await userEvent.type(input, '5551234567');

// Trigger blur
await userEvent.tab();

// Now check formatted value
await waitFor(async () => {
  const field = await canvas.findByTestId('phone-input-field');
  expect(field).toHaveValue(/\+1/);
}, { timeout: 1000 });
```

#### Issue: "Country option testId not working"

**Reason:** Menu must be open before querying options

**Solution:**
```typescript
// Open menu first
await userEvent.click(await canvas.findByTestId('country-selector'));

// Wait for menu to fully render
const menu = await canvas.findByTestId('country-menu');

// Now query options within menu
const option = await within(menu).findByTestId('country-option-GB');
```

#### Issue: "onChange not called with expected arguments"

**Reason:** onChange signature includes 3 parameters

**Solution:** Check all 3 parameters:
```typescript
expect(args.onChange).toHaveBeenCalledWith(
  '5551234567',  // value
  true,          // isValid
  'US'           // countryCode
);
```

### Known Issues

#### Issue: Country Code Not in Formatted Output

**Status:** BUG - All 11 PhoneInput tests failing
**Description:** The `formatPhoneNumber` function returns formatted number but doesn't always include country code prefix

**Expected:**
```typescript
formatPhoneNumber('5551234567', 'US') // Should return: '+1 555 123 4567'
```

**Actual:**
```typescript
formatPhoneNumber('5551234567', 'US') // Returns: '555-123-4567' or '5551234567'
```

**Workaround for Tests:**
Until fixed, adjust test expectations or add explicit country code check:
```typescript
// Instead of expecting formatted with country code
expect(input).toHaveValue(/\+1.*555.*123.*4567/);

// Temporarily check without country code requirement
expect(input).toHaveValue(/555.*123.*4567/);
```

**Fix Required:**
Update `formatPhoneNumber` function to ensure `phoneNumber.formatInternational()` properly includes country code.

### Testing Best Practices

1. **Always use `await`** with testId queries
2. **Trigger blur** after typing to test formatting/validation
3. **Open menu before querying options** using country-selector
4. **Use waitFor** for async state changes (formatting, validation)
5. **Test with multiple countries** to ensure international support
6. **Verify both value and validation** in onChange callback
7. **Check visual feedback** (icon color, error messages) for validation state

### Related Elements Without TestIds

#### Input Field (Alternative Query)
- **Query Method:** `canvas.getByRole('textbox')` or `canvas.getByLabelText('Phone Number')`
- **Type Attribute:** `type="tel"`

#### Country Flag/Dial Display
- **No testId** - Query via parent country-selector
- **Contains:** Flag emoji and dial code text

#### Validation Icon
- **No testId** - Located in endAdornment
- **Query Method:** Look for PhoneIcon within InputAdornment

#### Helper Text / Error Message
- **No testId** - Query by text content
- **Query Method:** `canvas.getByText(/Invalid phone number/i)`
