# AddressAutocomplete Component

A sophisticated address input component with Google Maps integration for autocomplete functionality. Provides structured address data with coordinates and supports different visual variants.

## Features

- **Google Maps Integration**: Real-time address suggestions via Google Places API
- **Glass Morphism Effect**: Beautiful glass variant with blur and transparency
- **Current Location Support**: Optional button to use device's current location
- **Geographic Restrictions**: Limit results to specific countries or place types
- **Structured Data**: Returns complete address details including coordinates
- **Accessible**: Full keyboard navigation and screen reader support
- **Responsive**: Adapts to different screen sizes
- **Multiple Variants**: Glass, outlined, and filled styles

## Usage

```tsx
import { AddressAutocomplete } from '@procurement/ui';

function AddressForm() {
  const handleAddressSelect = (address: AddressDetails) => {
    console.log('Selected:', address);
    // address contains: formatted, street, city, state, country, postalCode, coordinates
  };

  return (
    <AddressAutocomplete
      variant="outlined"
      label="Delivery Address"
      placeholder="Enter your address..."
      googleMapsApiKey="your-api-key"
      onSelect={handleAddressSelect}
      getCurrentLocation
      helperText="We'll deliver to this address"
    />
  );
}
```

## Props

| Prop                | Type                                        | Default      | Description                                           |
| ------------------- | ------------------------------------------- | ------------ | ----------------------------------------------------- |
| `variant`           | `'glass' \| 'outlined' \| 'filled'`        | `'outlined'` | Visual style variant                                 |
| `label`             | `string`                                    | -            | Input field label                                    |
| `placeholder`       | `string`                                    | -            | Placeholder text                                     |
| `icon`              | `ReactNode`                                 | -            | Custom icon for the input                            |
| `onSelect`          | `(address: AddressDetails) => void`        | **Required** | Callback when address is selected                    |
| `googleMapsApiKey`  | `string`                                    | **Required** | Google Maps API key                                  |
| `floating`          | `boolean`                                   | `false`      | Use floating label style                             |
| `restrictions`      | `{ country?: string[], types?: string[] }` | -            | Geographic/type restrictions                         |
| `error`             | `boolean`                                   | `false`      | Show error state                                     |
| `helperText`        | `string`                                    | -            | Helper text below input                              |
| `disabled`          | `boolean`                                   | `false`      | Disable the input                                    |
| `required`          | `boolean`                                   | `false`      | Mark as required field                               |
| `fullWidth`         | `boolean`                                   | `false`      | Take full container width                            |
| `defaultValue`      | `string`                                    | -            | Initial input value                                  |
| `getCurrentLocation`| `boolean`                                   | `false`      | Show current location button                         |

## AddressDetails Type

```typescript
interface AddressDetails {
  formatted: string;      // Full formatted address
  street: string;         // Street name and number
  city: string;           // City name
  state: string;          // State/Province
  country: string;        // Country name
  postalCode: string;     // ZIP/Postal code
  coordinates: {
    lat: number;          // Latitude
    lng: number;          // Longitude
  };
}
```

## Examples

### Basic Usage

```tsx
<AddressAutocomplete
  label="Address"
  placeholder="Enter address..."
  googleMapsApiKey="your-key"
  onSelect={(address) => console.log(address)}
/>
```

### Glass Variant with Current Location

```tsx
<AddressAutocomplete
  variant="glass"
  label="Location"
  getCurrentLocation
  googleMapsApiKey="your-key"
  onSelect={handleSelect}
/>
```

### Restricted to US Addresses

```tsx
<AddressAutocomplete
  label="US Address"
  restrictions={{ country: ['us'] }}
  googleMapsApiKey="your-key"
  onSelect={handleSelect}
  helperText="Only US addresses allowed"
/>
```

### Business Locations Only

```tsx
<AddressAutocomplete
  label="Business Location"
  icon={<BusinessIcon />}
  restrictions={{ types: ['establishment'] }}
  googleMapsApiKey="your-key"
  onSelect={handleSelect}
/>
```

### With Form Validation

```tsx
<AddressAutocomplete
  label="Required Address"
  required
  error={hasError}
  helperText={errorMessage}
  googleMapsApiKey="your-key"
  onSelect={handleSelect}
/>
```

## Accessibility

- Full keyboard navigation support
- Proper ARIA labels and roles
- Screen reader announcements for suggestions
- Focus management for dropdown
- Support for Tab, Arrow keys, Enter, and Escape

## Best Practices

1. **API Key Security**: Store Google Maps API key in environment variables
2. **Error Handling**: Implement proper error handling for API failures
3. **Loading States**: Show loading indicator while fetching suggestions
4. **Validation**: Validate selected address before form submission
5. **Restrictions**: Use geographic restrictions to improve relevance
6. **Debouncing**: Component internally debounces API calls

## Notes

- Requires valid Google Maps API key with Places API enabled
- Component handles API rate limiting internally
- Suggestions are debounced to minimize API calls
- Supports both residential and commercial addresses
- Coordinates are provided for mapping integrations

## Testing

This section describes all `data-testid` attributes available in the AddressAutocomplete component for testing purposes.

### Test IDs

#### Container Elements

##### `address-autocomplete-container`
- **Element:** Main AddressAutocomplete container
- **Location:** Root Box element that wraps the entire component
- **Usage:** Query the main container to verify AddressAutocomplete is rendered
```typescript
const container = await canvas.findByTestId('address-autocomplete-container');
expect(container).toBeInTheDocument();
```

##### `address-suggestions-dropdown`
- **Element:** Dropdown/popover containing address suggestions
- **Location:** Paper component that wraps all suggestion items
- **Usage:** Query the suggestions dropdown to verify it's visible when searching
```typescript
const dropdown = await canvas.findByTestId('address-suggestions-dropdown');
expect(dropdown).toBeInTheDocument();
```

#### Input Elements

##### `address-input`
- **Element:** Main text input field for address entry
- **Location:** Input element within the TextField/Autocomplete
- **Usage:** Query input to type addresses and trigger suggestions
```typescript
const input = await canvas.findByTestId('address-input');
await userEvent.type(input, '123 Main Street');
expect(input).toHaveValue('123 Main Street');
```

#### Suggestion Elements

##### `address-suggestion-${index}`
- **Element:** Individual suggestion item in dropdown
- **Location:** Each `<li>` element in the suggestions list
- **Usage:** Query specific suggestion by index to interact with it
```typescript
// Get first suggestion
const firstSuggestion = await canvas.findByTestId('address-suggestion-0');
await userEvent.click(firstSuggestion);

// Get all suggestions
const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
expect(suggestions).toHaveLength(5);
```

##### `address-selected`
- **Element:** Selected/displayed address text container
- **Location:** AddressText component within each suggestion item
- **Usage:** Query to verify address formatting and content
```typescript
const addressText = await canvas.findByTestId('address-selected');
expect(addressText).toBeInTheDocument();
```

#### Loading & Action Elements

##### `address-loading`
- **Element:** Loading spinner indicator
- **Location:** CircularProgress component shown during API requests
- **Usage:** Query to verify loading state during address search
```typescript
// Check if loading indicator appears
const loading = canvas.queryByTestId('address-loading');
if (loading) {
  expect(loading).toBeInTheDocument();
}
```

##### `address-current-location-button`
- **Element:** Current location button (when enabled)
- **Location:** IconButton in the input's end adornment
- **Usage:** Query and click to trigger geolocation functionality
```typescript
const locationButton = await canvas.findByTestId('address-current-location-button');
await userEvent.click(locationButton);
```

### Test Patterns

#### Wait for Component to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for container
const container = await canvas.findByTestId('address-autocomplete-container');

// Wait for input to be ready
const input = await canvas.findByTestId('address-input');
expect(input).toBeEnabled();
```

#### Type and Trigger Suggestions
```typescript
const input = await canvas.findByTestId('address-input');

// Type to trigger autocomplete (minimum 3 characters)
await userEvent.type(input, '123 main');

// Wait for suggestions to appear
await waitFor(async () => {
  const dropdown = await canvas.findByTestId('address-suggestions-dropdown');
  expect(dropdown).toBeInTheDocument();
}, { timeout: 2000 });

// Get all suggestions
const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
expect(suggestions.length).toBeGreaterThan(0);
```

#### Select an Address
```typescript
const input = await canvas.findByTestId('address-input');
await userEvent.type(input, 'main street');

// Wait for suggestions
await waitFor(async () => {
  const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
  expect(suggestions.length).toBeGreaterThan(0);
}, { timeout: 2000 });

// Click first suggestion
const firstSuggestion = await canvas.findByTestId('address-suggestion-0');
await userEvent.click(firstSuggestion);

// Verify callback was called
expect(args.onSelect).toHaveBeenCalledWith(
  expect.objectContaining({
    formatted: expect.any(String),
    street: expect.any(String),
    coordinates: expect.objectContaining({
      lat: expect.any(Number),
      lng: expect.any(Number),
    }),
  })
);
```

#### Test Loading State
```typescript
const input = await canvas.findByTestId('address-input');
await userEvent.type(input, '123');

// Check for loading indicator
await waitFor(() => {
  const loading = canvas.queryByTestId('address-loading');
  expect(loading).toBeInTheDocument();
}, { timeout: 1000 });
```

#### Use Current Location Feature
```typescript
// Verify button is present when getCurrentLocation=true
const locationButton = await canvas.findByTestId('address-current-location-button');
expect(locationButton).toBeInTheDocument();

// Click to trigger geolocation
await userEvent.click(locationButton);

// Wait for location to be retrieved and address populated
await waitFor(() => {
  const input = canvas.getByTestId('address-input');
  expect(input.value).not.toBe('');
}, { timeout: 3000 });
```

### Props That Affect Test Behavior

#### `googleMapsApiKey`
- **Values:** `string` (use `'demo-key'` or `'test-key'` for mock data)
- **Impact:**
  - Real API key: Uses Google Places API
  - `'demo-key'` or `'test-key'`: Uses mock address data
- **Test Tip:** Always use demo/test keys in Storybook tests

#### `getCurrentLocation`
- **Values:** `boolean`
- **Impact:** Shows/hides current location button
- **Test Tip:** Use `findByTestId('address-current-location-button')` when true

#### `loading`
- **Values:** `boolean` (internal state)
- **Impact:** Shows loading spinner during API requests
- **Test Tip:** Mock delays may cause intermittent loading states

#### `disabled`
- **Values:** `boolean`
- **Impact:** Disables input and all interactions
- **Test Tip:** Check `input.disabled` property

#### `error`
- **Values:** `boolean`
- **Impact:** Shows error state styling on input
- **Test Tip:** Verify visual error state

#### `variant`
- **Values:** `'outlined' | 'filled' | 'standard' | 'glass'`
- **Impact:** Changes TextField styling
- **Test Tip:** `'glass'` variant applies special backdrop blur effects

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for component to render
  const container = await canvas.findByTestId('address-autocomplete-container');
  expect(container).toBeInTheDocument();

  // Verify input is present
  const input = await canvas.findByTestId('address-input');
  expect(input).toBeInTheDocument();
}
```

#### 2. Autocomplete Suggestions Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('address-input');

  // Type to trigger suggestions
  await userEvent.type(input, '123 main');

  // Wait for suggestions dropdown
  await waitFor(async () => {
    const dropdown = await canvas.findByTestId('address-suggestions-dropdown');
    expect(dropdown).toBeInTheDocument();
  }, { timeout: 2000 });

  // Verify suggestions are present
  const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
  expect(suggestions.length).toBeGreaterThan(0);
}
```

#### 3. Address Selection Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('address-input');
  await userEvent.type(input, 'pine');

  // Wait for suggestions
  await waitFor(async () => {
    const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
    expect(suggestions.length).toBeGreaterThan(0);
  }, { timeout: 2000 });

  // Click first suggestion
  const firstSuggestion = await canvas.findByTestId('address-suggestion-0');
  await userEvent.click(firstSuggestion);

  // Verify onSelect callback
  await waitFor(() => {
    expect(args.onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        formatted: expect.stringContaining('Pine'),
        coordinates: expect.any(Object),
      })
    );
  });
}
```

#### 4. Loading State Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('address-input');
  await userEvent.type(input, '123');

  // Verify loading indicator appears
  await waitFor(() => {
    const loading = canvas.queryByTestId('address-loading');
    expect(loading).toBeInTheDocument();
  }, { timeout: 1000 });
}
```

#### 5. Current Location Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Find and click current location button
  const locationButton = await canvas.findByTestId('address-current-location-button');
  await userEvent.click(locationButton);

  // Wait for location to be retrieved (mock)
  await waitFor(() => {
    expect(args.onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        formatted: expect.any(String),
        coordinates: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number),
        }),
      })
    );
  }, { timeout: 2000 });

  // Verify input was populated
  const input = await canvas.findByTestId('address-input');
  expect(input.value).not.toBe('');
}
```

#### 6. Keyboard Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('address-input');
  input.focus();

  await userEvent.type(input, 'main');

  // Wait for suggestions
  await waitFor(async () => {
    const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
    expect(suggestions.length).toBeGreaterThan(0);
  }, { timeout: 2000 });

  // Navigate with arrow keys
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{Enter}');

  // Verify selection
  await waitFor(() => {
    expect(input.value).not.toBe('main');
  });
}
```

#### 7. Edge Cases Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId('address-input');

  // Test minimum characters (should not trigger suggestions)
  await userEvent.type(input, 'ab');

  // Wait briefly
  await new Promise(resolve => setTimeout(resolve, 500));

  // Suggestions should not appear
  const dropdown = canvas.queryByTestId('address-suggestions-dropdown');
  expect(dropdown).not.toBeInTheDocument();

  // Test with enough characters
  await userEvent.clear(input);
  await userEvent.type(input, 'main street');

  // Now suggestions should appear
  await waitFor(async () => {
    const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
    expect(suggestions.length).toBeGreaterThan(0);
  }, { timeout: 2000 });
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId address-input"

**Solution:** Always use `await` with `findByTestId`:
```typescript
// Wrong - synchronous
const input = canvas.getByTestId('address-input');

// Correct - asynchronous
const input = await canvas.findByTestId('address-input');
```

#### Issue: Suggestions dropdown not appearing

**Solution:** Ensure you type at least 3 characters and wait for debounce:
```typescript
const input = await canvas.findByTestId('address-input');
await userEvent.type(input, '123 main'); // At least 3 chars

// Wait with timeout for suggestions
await waitFor(async () => {
  const dropdown = await canvas.findByTestId('address-suggestions-dropdown');
  expect(dropdown).toBeInTheDocument();
}, { timeout: 2000 });
```

#### Issue: Test fails intermittently with loading state

**Solution:** Account for async nature of suggestions:
```typescript
// Use waitFor with proper timeout
await waitFor(async () => {
  const suggestions = await canvas.findAllByTestId(/address-suggestion-/);
  expect(suggestions.length).toBeGreaterThan(0);
}, { timeout: 3000 });
```

#### Issue: Can't find current location button

**Solution:** Button only appears when `getCurrentLocation=true`:
```typescript
// Check if prop is enabled
if (args.getCurrentLocation) {
  const locationButton = await canvas.findByTestId('address-current-location-button');
  expect(locationButton).toBeInTheDocument();
} else {
  const locationButton = canvas.queryByTestId('address-current-location-button');
  expect(locationButton).not.toBeInTheDocument();
}
```

#### Issue: Suggestion click not registering

**Solution:** Ensure suggestions are fully loaded before clicking:
```typescript
await userEvent.type(input, 'main');

// Wait for specific suggestion to appear
const firstSuggestion = await canvas.findByTestId('address-suggestion-0');
expect(firstSuggestion).toBeInTheDocument();

// Then click
await userEvent.click(firstSuggestion);
```

### Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when waiting for suggestions to appear (debounced)
3. **Type at least 3 characters** to trigger autocomplete suggestions
4. **Use regex patterns** for dynamic testIds: `/address-suggestion-/`
5. **Add timeouts** for async operations: `{ timeout: 2000 }`
6. **Use mock data** in tests by passing `googleMapsApiKey='demo-key'`
7. **Check conditional elements** like current location button based on props

### Mock Data Behavior

When using `googleMapsApiKey='demo-key'` or `'test-key'`, the component uses mock data:
- Mock addresses include common US cities (San Francisco, New York, Los Angeles, Chicago, Austin)
- Search is performed against mock dataset
- Simulates realistic API delays (150-350ms)
- Returns full address details with coordinates
- Current location returns first mock address

### Related Components

- **Autocomplete (MUI):** Base autocomplete functionality
- **TextField:** Input field rendering
- **Paper:** Dropdown container for suggestions
- **IconButton:** Current location button