import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,Mock,userEvent, waitFor, within } from 'storybook/test';

import { AddressAutocomplete } from './AddressAutocomplete';

const meta: Meta<typeof AddressAutocomplete> = {
  title: 'Form/AddressAutocomplete/Tests',
  component: AddressAutocomplete,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:AddressAutocomplete'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Test - Tests autocomplete suggestions appear
export const BasicInteraction: Story = {
  args: {
    label: 'Address',
    placeholder: 'Enter address...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    try {
      // Wait for component to finish loading, then find the input field
      const input = await canvas.findByPlaceholderText('Enter address...') as HTMLInputElement;
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();

      // Type in the input to trigger autocomplete
      await userEvent.type(input, '123 main');
      await expect(input).toHaveValue('123 main');

      // Wait for autocomplete suggestions to appear
      // Note: suggestions are portaled to document.body, not in canvas
      const body = within(document.body);
      await waitFor(
        () => {
          const firstSuggestion = body.getByTestId('address-suggestion-0');
          expect(firstSuggestion).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Verify first suggestion contains main street text
      const firstSuggestion = body.getByTestId('address-suggestion-0');
      await expect(firstSuggestion).toBeInTheDocument();
      await expect(firstSuggestion.textContent).toContain('Main Street');

      // Click on the first suggestion
      await userEvent.click(firstSuggestion);

      // Verify the callback was called with address details
      await waitFor(() => {
        expect(args.onSelect).toHaveBeenCalledWith(
          expect.objectContaining({
            formatted: expect.stringContaining('Main Street'),
            street: expect.stringContaining('Main Street'),
            coordinates: expect.objectContaining({
              lat: expect.any(Number),
              lng: expect.any(Number),
            }),
          }),
        );
      });

      // Verify input shows the formatted address
      await waitFor(() => {
        expect(input.value).toContain('Main Street');
      });

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Form Interaction Test - Tests address selection and data extraction
export const FormInteraction: Story = {
  args: {
    label: 'Delivery Address',
    placeholder: 'Enter delivery address...',
    googleMapsApiKey: 'demo-key',
    required: true,
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    try {
      // Wait for component to finish loading, then find the input field
      const input = await canvas.findByPlaceholderText('Enter delivery address...');
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();

      // Verify required attribute
      const label = canvas.getByText('Delivery Address');
      await expect(label).toBeInTheDocument();

      // Type to trigger suggestions
      await userEvent.type(input, '456 oak');
      await expect(input).toHaveValue('456 oak');

      // Wait for autocomplete suggestions
      // Note: suggestions are portaled to document.body, not in canvas
      const body = within(document.body);
      await waitFor(
        () => {
          const firstSuggestion = body.getByTestId('address-suggestion-0');
          expect(firstSuggestion).toBeInTheDocument();
        },
        { timeout: 1500 },
      );

      // Find and click the New York address (Oak Avenue)
      // Mock data returns Oak Avenue as second suggestion for 'oak'
      const oakSuggestion = body.getByTestId('address-suggestion-0');
      await expect(oakSuggestion).toBeInTheDocument();
      await expect(oakSuggestion.textContent).toContain('Oak Avenue');
      await userEvent.click(oakSuggestion);

      // Verify the onSelect callback was called with address details
      await waitFor(() => {
        expect(args.onSelect).toHaveBeenCalledWith(
          expect.objectContaining({
            formatted: expect.stringContaining('456 Oak Avenue'),
            street: expect.stringContaining('Oak Avenue'),
            city: 'New York',
            state: 'New York',
            country: 'United States',
            postalCode: '10001',
            coordinates: expect.objectContaining({
              lat: expect.any(Number),
              lng: expect.any(Number),
            }),
          }),
        );
      });

      // Verify input shows the formatted address
      await waitFor(() => {
        expect(input).toHaveValue('456 Oak Avenue, New York, NY 10001, USA');
      });

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Keyboard Navigation Test - Tests keyboard navigation through suggestions
export const KeyboardNavigation: Story = {
  args: {
    label: 'Navigate with keyboard',
    placeholder: 'Use Tab and Enter...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      // Wait for component to finish loading, then find the input
      const input = await canvas.findByPlaceholderText('Use Tab and Enter...');
      await expect(input).not.toBeDisabled();

      // Focus the input
      input.focus();
      await expect(input).toHaveFocus();

      // Type to trigger suggestions
      await userEvent.type(input, 'main');

      // Wait for suggestions to appear
      // Note: suggestions are portaled to document.body, not in canvas
      // With optimized mock delays: 300ms debounce + 100ms mock API = ~400ms + overhead
      const body = within(document.body);
      await waitFor(
        () => {
          const firstSuggestion = body.getByTestId('address-suggestion-0');
          expect(firstSuggestion).toBeInTheDocument();
        },
        { timeout: 1500 },
      );

      // Test keyboard navigation (arrow keys)
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowUp}');
      await userEvent.keyboard('{ArrowDown}');

      // Try to select with Enter key
      await userEvent.keyboard('{Enter}');

      // Wait a moment for any selection to process
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Test Escape key closes suggestions
      await userEvent.clear(input);
      await userEvent.type(input, 'main');
      await waitFor(
        () => {
          const firstSuggestion = body.getByTestId('address-suggestion-0');
          expect(firstSuggestion).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      await userEvent.keyboard('{Escape}');
      await waitFor(
        () => {
          const firstSuggestion = body.queryByTestId('address-suggestion-0');
          expect(firstSuggestion).not.toBeInTheDocument();
        },
        { timeout: 1000 },
      );

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Screen Reader Test
export const ScreenReaderTest: Story = {
  args: {
    label: 'Accessible Address',
    placeholder: 'Screen reader friendly...',
    googleMapsApiKey: 'demo-key',
    helperText: 'Enter your complete address',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      // First wait for component to finish loading
      const input = await canvas.findByPlaceholderText('Screen reader friendly...');
      await expect(input).not.toBeDisabled();

      // Now check for combobox role after loading is complete
      await waitFor(() => {
        const inputField = canvas.getByRole('combobox', { name: /accessible address/i });
        expect(inputField).toBeInTheDocument();
      });

      const inputField = canvas.getByRole('combobox', { name: /accessible address/i });
      await expect(inputField).toHaveAttribute('type', 'text');

      // Check for helper text
      const helperText = canvas.getByText('Enter your complete address');
      await expect(helperText).toBeInTheDocument();

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Focus Management Test
export const FocusManagementTest: Story = {
  args: {
    label: 'Focus Test',
    placeholder: 'Test focus behavior...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      const input = await canvas.findByPlaceholderText('Test focus behavior...');
      await expect(input).not.toBeDisabled();

      // Test focus
      input.focus();
      await expect(input).toHaveFocus();

      // Test blur
      input.blur();
      await expect(input).not.toHaveFocus();

      // Focus again and type
      input.focus();
      await userEvent.type(input, 'Focus test');
      await expect(input).toHaveValue('Focus test');

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Responsive Design Test
export const ResponsiveDesignTest: Story = {
  args: {
    label: 'Responsive Address',
    placeholder: 'Adapts to screen size...',
    fullWidth: true,
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
      },
      defaultViewport: 'mobile',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      // Check component renders in mobile view
      const input = await canvas.findByPlaceholderText('Adapts to screen size...');
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();

      // Verify full width behavior
      const container = input.closest('.MuiTextField-root');
      await expect(container).toBeInTheDocument();

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Theme Variations Test
export const ThemeVariationsTest: Story = {
  args: {
    variant: 'glass',
    label: 'Glass Theme',
    placeholder: 'Glass effect...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      // Verify glass variant renders
      const input = await canvas.findByPlaceholderText('Glass effect...');
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();

      // Check for glass styling elements
      const container = input.closest('.MuiAutocomplete-root');
      await expect(container).toBeInTheDocument();

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Visual States Test
export const VisualStatesTest: Story = {
  args: {
    label: 'Visual States',
    placeholder: 'Test visual states...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      const input = await canvas.findByPlaceholderText('Test visual states...');
      await expect(input).not.toBeDisabled();

      // Test hover state
      await userEvent.hover(input);
      await waitFor(() => expect(input).toBeInTheDocument());

      // Test focus state
      await userEvent.click(input);
      await expect(input).toHaveFocus();

      // Test typing state
      await userEvent.type(input, 'Testing');
      await expect(input).toHaveValue('Testing');

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Performance Test
export const PerformanceTest: Story = {
  args: {
    label: 'Performance Test',
    placeholder: 'Testing performance...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      const startTime = window.performance.now();

      // Find and interact with input
      const input = await canvas.findByPlaceholderText('Testing performance...');
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();

      // Rapid typing test
      await userEvent.type(input, 'Performance test address input');

      // Clear and retype
      await userEvent.clear(input);
      await userEvent.type(input, 'Second performance test');

      const endTime = window.performance.now();
      const duration = endTime - startTime;

      // Performance should be under 3 seconds
      await expect(duration).toBeLessThan(3000);

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Edge Cases Test - Tests error handling and edge cases
export const EdgeCasesTest: Story = {
  args: {
    label: 'Edge Cases',
    placeholder: 'Test edge cases...',
    googleMapsApiKey: 'demo-key',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Note: suggestions are portaled to document.body, not in canvas
    const body = within(document.body);

    try {
      const input = await canvas.findByPlaceholderText('Test edge cases...');
      await expect(input).not.toBeDisabled();

      // Test empty input doesn't trigger suggestions
      await expect(input).toHaveValue('');
      const initialSuggestion = body.queryByTestId('address-suggestion-0');
      expect(initialSuggestion).not.toBeInTheDocument();

      // Test minimum characters requirement (less than 3 chars)
      await userEvent.type(input, 'ab');
      await waitFor(
        () => {
          // Check that no suggestions appear for less than 3 characters
          const suggestion = body.queryByTestId('address-suggestion-0');
          expect(suggestion).not.toBeInTheDocument();
        },
        { timeout: 1000 },
      );

      // Clear and test no results scenario
      await userEvent.clear(input);
      await userEvent.type(input, 'zzzzzzzzzzz');
      await waitFor(
        () => {
          // With invalid search, no suggestions should appear
          const suggestion = body.queryByTestId('address-suggestion-0');
          expect(suggestion).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Test reasonable length input that should find matches
      await userEvent.clear(input);
      await userEvent.type(input, 'main street');
      await waitFor(
        () => {
          const firstSuggestion = body.getByTestId('address-suggestion-0');
          expect(firstSuggestion).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Test special characters in search
      await userEvent.clear(input);
      await userEvent.type(input, '123 main & oak');
      await expect(input).toHaveValue('123 main & oak');

      // Test numbers in address (with enough characters to trigger search)
      await userEvent.clear(input);
      await userEvent.type(input, '123 main');
      await waitFor(
        async () => {
          const firstSuggestion = await body.findByTestId('address-suggestion-0');
          expect(firstSuggestion).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};

// Integration Test - Tests geolocation and current location feature
export const IntegrationTest: Story = {
  args: {
    label: 'Integration Test',
    placeholder: 'Test with other components...',
    googleMapsApiKey: 'demo-key',
    error: false,
    helperText: 'Helper text for integration',
    required: true,
    fullWidth: true,
    getCurrentLocation: true,
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    // Note: suggestions are portaled to document.body, not in canvas
    const body = within(document.body);

    try {
      // Test all props work together
      const input = await canvas.findByPlaceholderText('Test with other components...') as HTMLInputElement;
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();

      // Check helper text
      const helperText = canvas.getByText('Helper text for integration');
      await expect(helperText).toBeInTheDocument();

      // Check label
      const label = canvas.getByText('Integration Test');
      await expect(label).toBeInTheDocument();

      // Check current location button is present
      const locationButton = canvas.getByTitle('Use current location');
      await expect(locationButton).toBeInTheDocument();

      // Click current location button
      await userEvent.click(locationButton);

      // Wait for location to be retrieved (mock)
      await waitFor(
        () => {
          expect(args.onSelect).toHaveBeenCalledWith(
            expect.objectContaining({
              formatted: expect.stringContaining('123 Main Street'),
              coordinates: expect.objectContaining({
                lat: expect.any(Number),
                lng: expect.any(Number),
              }),
            }),
          );
        },
        { timeout: 2000 },
      );

      // Verify input was populated
      await waitFor(() => {
        expect(input.value).toContain('123 Main Street');
      });

      // Clear and test normal typing with all features
      await userEvent.clear(input);
      await userEvent.type(input, 'pine');

      // Wait for suggestions with full integration
      await waitFor(() => {
        const firstSuggestion = body.getByTestId('address-suggestion-0');
        expect(firstSuggestion).toBeInTheDocument();
      });

      // Select an address containing Pine (should be in suggestions)
      const pineSuggestion = body.getByTestId('address-suggestion-0');
      await expect(pineSuggestion).toBeInTheDocument();
      await expect(pineSuggestion.textContent).toContain('Pine');
      await userEvent.click(pineSuggestion);

      // Verify full address details were extracted
      await waitFor(() => {
        const calls = (args.onSelect as Mock).mock.calls;
        const lastCall = calls[calls.length - 1][0];
        expect(lastCall).toMatchObject({
          formatted: expect.stringContaining('Pine Boulevard'),
          street: expect.stringContaining('Pine Boulevard'),
          city: 'Los Angeles',
          state: 'California',
          country: 'United States',
          postalCode: '90001',
        });
      });

      // Set status to pass
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      canvasElement.appendChild(statusElement);
    } catch (error) {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'FAIL';
      canvasElement.appendChild(statusElement);
      throw error;
    }
  },
};
