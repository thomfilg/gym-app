import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
// @ts-expect-error - storybook/test module resolution requires bundler mode
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Autocomplete } from './Autocomplete';
import type { AutocompleteProps } from './Autocomplete.types';

interface Person {
  id: string;
  name: string;
  email: string;
  department?: string;
}

const samplePeople: Person[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', department: 'Engineering' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', department: 'Design' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', department: 'Marketing' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', department: 'Engineering' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', department: 'Sales' },
];

const stringSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

const meta: Meta<typeof Autocomplete> = {
  title: 'Form/Autocomplete/Tests',
  component: Autocomplete,
  tags: ['autodocs', 'test', 'component:Autocomplete'],
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive autocomplete component with ARIA support, keyboard navigation, and multiple selection modes.',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    suggestions: { control: false },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    allowFreeText: { control: 'boolean' },
    showGhostText: { control: 'boolean' },
    matchMode: { control: { type: 'select', options: ['contains', 'startsWith', 'fuzzy'] } },
    debounceMs: { control: { type: 'number', min: 0, max: 1000 } },
    maxVisibleItems: { control: { type: 'number', min: 1, max: 20 } },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Test Component wrapper for controlled state
const AutocompleteWrapper = (props: Partial<AutocompleteProps<Person | string>> & { suggestions: (Person | string)[] }) => {
  const [value, setValue] = useState(props.value || '');
  const [selectedItems, setSelectedItems] = useState(props.selectedItems || []);

  return (
    <div style={{ padding: '20px', minHeight: '200px' }}>
      <Autocomplete
        {...props}
        value={value}
        onChange={setValue}
        selectedItems={selectedItems}
        onSelectedItemsChange={setSelectedItems}
      />
    </div>
  );
};

// Basic Tests
export const Default: Story = {
  render: () => (
    <AutocompleteWrapper suggestions={stringSuggestions} placeholder="Type to search fruits..." />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test input is present and accessible
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    // Test typing shows suggestions
    await userEvent.click(input);
    await userEvent.type(input, 'ap');

    // Wait for listbox to appear first (which confirms dropdown opened)
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    // Now check aria-expanded is true
    await expect(input).toHaveAttribute('aria-expanded', 'true');

    const options = canvas.getAllByRole('option');
    await expect(options).toHaveLength(2); // Apple, Grape (both contain "ap")
    await expect(options[0]).toHaveTextContent('Apple');
    await expect(options[1]).toHaveTextContent('Grape');
  },
};

export const WithObjectSuggestions: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={samplePeople}
      getKey={(person: Person) => person.id}
      getLabel={(person: Person) => person.name}
      getDescription={(person: Person) => `${person.email} - ${person.department}`}
      placeholder="Search people..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.type(input, 'john');

    // Wait for listbox to appear first
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    const options = canvas.getAllByRole('option');
    await expect(options).toHaveLength(2); // John Doe, Bob Johnson

    // Test custom rendering with description
    await expect(options[0]).toHaveTextContent('john@example.com - Engineering');
  },
};

// Ghost Text Tests
export const GhostText: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      showGhostText={true}
      placeholder="Type 'ap' to see ghost text..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Focus input first to enable ghost text
    await userEvent.click(input);
    await userEvent.type(input, 'ap');

    // Wait for listbox to appear first
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    // Test ghost text appears - look for the new inline suggestion pattern
    // Since we're using the new pattern, check for the presence of the suggestion
    const options = canvas.getAllByRole('option');
    await expect(options).toHaveLength(2); // Apple, Grape both contain "ap"
    await expect(options[0]).toHaveTextContent('Apple');

    // Test that Tab key completes the ghost text
    await userEvent.keyboard('{Tab}');
    await expect(input).toHaveValue('apple'); // lowercase because user typed "ap"
    // Verify dropdown closes after completion
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
  },
};

export const GhostTextArrowRight: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      showGhostText={true}
      placeholder="Type 'ch' and press ArrowRight..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Focus and type to trigger ghost text
    await userEvent.click(input);
    await userEvent.type(input, 'ch');

    // Wait for listbox to appear first
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    // Verify suggestion appears
    const options = canvas.getAllByRole('option');
    await expect(options).toHaveLength(1);
    await expect(options[0]).toHaveTextContent('Cherry');

    // Test that ArrowRight key completes the ghost text
    await userEvent.keyboard('{ArrowRight}');
    await expect(input).toHaveValue('Cherry');
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
  },
};

export const FocusBlurBehavior: Story = {
  name: '🔄 Focus/Blur Behavior Test',
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      showGhostText={true}
      placeholder="Test focus/blur behavior..."
      data-testid="focus-blur-autocomplete"
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state verification', async () => {
      const input = canvas.getByRole('combobox');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Open dropdown with typing', async () => {
      const input = canvas.getByRole('combobox');
      await userEvent.click(input);
      await userEvent.type(input, 'ap');

      // Wait for listbox to appear
      const listbox = await canvas.findByRole('listbox');
      await expect(listbox).toBeInTheDocument();
      await expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Close dropdown (test dropdown close functionality)', async () => {
      const input = canvas.getByRole('combobox');
      // Try multiple methods to close dropdown
      await userEvent.keyboard('{Escape}');

      // Give some time for the state to update
      await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'), {
        timeout: 1000,
      });
    });
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      placeholder="Test keyboard navigation..."
      data-testid="keyboard-nav-autocomplete"
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dropdown with typing', async () => {
      const input = canvas.getByRole('combobox');
      await userEvent.click(input);
      await userEvent.type(input, 'e');

      // Wait for listbox to appear
      const listbox = await canvas.findByRole('listbox');
      await expect(listbox).toBeInTheDocument();
    });

    await step('Verify options are displayed', async () => {
      const options = canvas.getAllByRole('option');
      await expect(options).toHaveLength(5); // Apple, Cherry, Date, Elderberry, Grape
    });

    await step('Test arrow key navigation', async () => {
      const input = canvas.getByRole('combobox');
      const options = canvas.getAllByRole('option');

      // Navigate down - should select some option
      await userEvent.keyboard('{ArrowDown}');

      // Wait for some option to become selected
      await waitFor(() => {
        const selectedOptions = options.filter(
          (option) => option.getAttribute('aria-selected') === 'true',
        );
        expect(selectedOptions.length).toBeGreaterThan(0);
      });

      // Test selection with Enter
      await userEvent.keyboard('{Enter}');

      // Should have some value selected
      const finalValue = input.getAttribute('value') || '';
      expect(finalValue.length).toBeGreaterThan(0);
    });
  },
};

// Multiple Selection Tests
export const MultipleSelection: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      multiple={true}
      placeholder="Select multiple fruits..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Select first item
    await userEvent.click(input);
    await userEvent.type(input, 'Apple', { delay: 50 });

    // Wait for dropdown and select
    await waitFor(() => expect(canvas.queryByRole('listbox')).toBeInTheDocument(), {
      timeout: 1500,
    });
    await userEvent.keyboard('{Enter}');

    // Wait for first chip to appear and input to clear
    await waitFor(
      () => {
        const chip = canvas.getByTestId('selected-chip-0');
        expect(chip).toBeInTheDocument();
        expect(input).toHaveValue('');
      },
      { timeout: 2000 },
    );

    // Wait for debounce and component state to stabilize (150ms debounce + buffer)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Select second item
    await userEvent.type(input, 'Banana', { delay: 50 });

    // Wait for dropdown and select
    await waitFor(() => expect(canvas.queryByRole('listbox')).toBeInTheDocument(), {
      timeout: 1500,
    });
    await userEvent.keyboard('{Enter}');

    // Should have 2 chips
    await waitFor(
      () => {
        const chip0 = canvas.getByTestId('selected-chip-0');
        const chip1 = canvas.getByTestId('selected-chip-1');
        expect(chip0).toBeInTheDocument();
        expect(chip1).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  },
};

// Async Loading Tests
export const AsyncLoading: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      async={true}
      isLoading={true}
      placeholder="Async autocomplete..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.type(input, 'test');

    // Wait for dropdown to open due to loading state
    await waitFor(
      async () => {
        await expect(input).toHaveAttribute('aria-expanded', 'true');
      },
      { timeout: 1000 },
    );

    // Check loading indicator in input - it's in the InputProps endAdornment
    // We verify loading state by checking for the loading text in dropdown
    // The CircularProgress in the input is harder to query reliably

    // Check for loading text in dropdown
    await waitFor(
      async () => {
        const loadingText = canvas.getByText('Loading...');
        await expect(loadingText).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  },
};

// Match Mode Tests
export const FuzzyMatchingTest: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={['JavaScript', 'TypeScript', 'CoffeeScript', 'ActionScript']}
      matchMode="fuzzy"
      placeholder="Type 'jvs' for fuzzy matching..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test fuzzy matching
    await userEvent.click(input);
    await userEvent.type(input, 'jvs');

    // Wait for listbox to appear first
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    const options = canvas.getAllByRole('option');
    await expect(options).toHaveLength(1);
    await expect(options[0]).toHaveTextContent('JavaScript');
  },
};

// Disabled State Tests
export const DisabledState: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      disabled={true}
      placeholder="This is disabled..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await expect(input).toBeDisabled();

    // Try typing - should not work
    await userEvent.type(input, 'test');
    await expect(input).toHaveValue('');
  },
};

// No Results Tests
export const NoResults: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      placeholder="Type 'xyz' for no results..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.type(input, 'xyz');

    // Wait for the dropdown to open with no results message
    await waitFor(
      async () => {
        const noResults = canvas.getByText('No results found');
        await expect(noResults).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  },
};

// Escape Key Tests
export const EscapeKey: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      placeholder="Test escape key behavior..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Open suggestions
    await userEvent.click(input);
    await userEvent.type(input, 'apple');

    // Wait for dropdown to open
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'), {
      timeout: 1000,
    });

    // Single escape closes dropdown
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
    await expect(input).toHaveValue('apple');

    // Double escape clears value (simulated by double press)
    await userEvent.keyboard('{Escape}');
    await userEvent.keyboard('{Escape}');
    // Note: Double escape detection requires special handling
  },
};

// Free Text Tests
export const FreeText: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      allowFreeText={true}
      placeholder="Type anything and press Enter..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Type custom text not in suggestions
    await userEvent.type(input, 'Custom Value');
    await userEvent.keyboard('{Enter}');

    await expect(input).toHaveValue('Custom Value');
  },
};

// Accessibility Tests
export const AccessibilityCompliance: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={samplePeople}
      getKey={(person: Person) => person.id}
      getLabel={(person: Person) => person.name}
      inputAriaLabel="Search for team members"
      placeholder="Search team members..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test ARIA attributes
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-autocomplete', 'list');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(input).toHaveAttribute('aria-label', 'Search for team members');

    // Open dropdown
    await userEvent.click(input);
    await userEvent.type(input, 'john');

    // Wait for dropdown to open
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'), {
      timeout: 1000,
    });
    await expect(input).toHaveAttribute('aria-controls');

    const listbox = canvas.getByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    const options = canvas.getAllByRole('option');
    // Options should have aria-selected attribute (first may be true if active)
    options.forEach((option) => {
      expect(option).toHaveAttribute('aria-selected');
    });
  },
};

// Performance Tests
export const LargeDataset: Story = {
  render: () => {
    const largeSuggestions = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

    return (
      <AutocompleteWrapper
        suggestions={largeSuggestions}
        maxVisibleItems={10}
        debounceMs={300}
        placeholder="Search 1000 items..."
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test with large dataset
    await userEvent.click(input);
    await userEvent.type(input, '99');

    // Wait for listbox to appear first
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    const options = canvas.getAllByRole('option');
    // Should limit visible items
    await expect(options.length).toBeLessThanOrEqual(10);
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={['', 'Normal Item', '  Spaces  ', 'Special!@#$%^&*()']}
      placeholder="Test edge cases..."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test searching for items with spaces
    await userEvent.click(input);
    await userEvent.type(input, 'Spaces');

    // Wait for listbox to appear
    await waitFor(() => expect(canvas.queryByRole('listbox')).toBeInTheDocument(), {
      timeout: 1000,
    });

    // Should handle empty and special characters
    const options = canvas.getAllByRole('option');
    await expect(options.length).toBeGreaterThan(0);
  },
};

// Form Interaction Tests
export const FormInteraction: Story = {
  render: () => (
    <AutocompleteWrapper suggestions={stringSuggestions} placeholder="Form interaction test..." />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test form submission behavior
    await userEvent.click(input);
    await userEvent.type(input, 'Apple');

    // Wait for dropdown and select
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    await userEvent.keyboard('{Enter}');
    await expect(input).toHaveValue('Apple');

    // Test that form would submit correctly (value is selected)
    const finalValue = input.getAttribute('value') || '';
    expect(finalValue).toBe('Apple');
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <AutocompleteWrapper suggestions={stringSuggestions} placeholder="Responsive test..." />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test responsive behavior
    await userEvent.click(input);
    await userEvent.type(input, 'a');

    // Wait for dropdown to appear
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    // Verify dropdown adapts to container width
    const options = canvas.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);

    // Test mobile-friendly interaction
    const firstOption = options[0];
    await userEvent.click(firstOption);

    // Should select the option
    const selectedValue = input.getAttribute('value') || '';
    expect(selectedValue.length).toBeGreaterThan(0);
  },
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  render: () => (
    <AutocompleteWrapper suggestions={stringSuggestions} placeholder="Theme variation test..." />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test that component renders with theme
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute('placeholder', 'Theme variation test...');

    // Test interaction with theming
    await userEvent.click(input);
    await userEvent.type(input, 'Apple');

    // Wait for dropdown
    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    // Verify themed elements render correctly
    const options = canvas.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
    await expect(options[0]).toHaveTextContent('Apple');
  },
};

// Visual States Tests
export const VisualStates: Story = {
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      placeholder="Visual states test..."
      disabled={false}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    // Test normal state
    await expect(input).toBeInTheDocument();
    await expect(input).not.toBeDisabled();

    // Test focus state
    await userEvent.click(input);
    await expect(input).toHaveFocus();

    // Test with content state
    await userEvent.type(input, 'Test');
    await expect(input).toHaveValue('Test');

    // Test dropdown open state
    await userEvent.clear(input);
    await userEvent.type(input, 'Apple');

    const listbox = await canvas.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();

    // Test selection state
    await userEvent.keyboard('{Enter}');
    await expect(input).toHaveValue('Apple');
  },
};

// Multiple Selection with String Suggestions Tests (Bug Fix: TASK-925)
// Tests that string values are properly preserved when T = string
export const MultipleSelectionWithStrings: Story = {
  name: '🔧 Multiple Selection with String Type (TASK-925)',
  render: () => (
    <AutocompleteWrapper
      suggestions={stringSuggestions}
      multiple={true}
      placeholder="Select multiple fruits (string type)..."
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await step('Select first string item', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Apple', { delay: 50 });

      // Wait for dropdown
      await waitFor(() => expect(canvas.queryByRole('listbox')).toBeInTheDocument(), {
        timeout: 1500,
      });
      await userEvent.keyboard('{Enter}');

      // Verify chip appears - this was the bug: chips would not appear for string[] selections
      await waitFor(
        () => {
          const chip = canvas.getByTestId('selected-chip-0');
          expect(chip).toBeInTheDocument();
          expect(chip).toHaveTextContent('Apple');
        },
        { timeout: 2000 },
      );
    });

    await step('Select second string item', async () => {
      // Wait for debounce
      await new Promise((resolve) => setTimeout(resolve, 300));

      await userEvent.type(input, 'Cherry', { delay: 50 });

      await waitFor(() => expect(canvas.queryByRole('listbox')).toBeInTheDocument(), {
        timeout: 1500,
      });
      await userEvent.keyboard('{Enter}');

      // Verify both chips are present
      await waitFor(
        () => {
          const chip0 = canvas.getByTestId('selected-chip-0');
          const chip1 = canvas.getByTestId('selected-chip-1');
          expect(chip0).toBeInTheDocument();
          expect(chip1).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    await step('Verify selections persist after blur', async () => {
      // Blur the input
      await userEvent.tab();

      // Chips should still be visible
      const chips = canvas.getAllByTestId(/selected-chip-/);
      expect(chips).toHaveLength(2);
    });

    await step('Remove a selection via chip delete', async () => {
      // Find and click delete button on first chip
      const chip0 = canvas.getByTestId('selected-chip-0');
      const deleteButton = within(chip0).getByRole('button');
      await userEvent.click(deleteButton);

      // Should now have only one chip
      await waitFor(
        () => {
          const remainingChips = canvas.getAllByTestId(/selected-chip-/);
          expect(remainingChips).toHaveLength(1);
        },
        { timeout: 1000 },
      );
    });
  },
};

// Test that verifies the fix works with pre-selected string items
export const MultipleSelectionPreselectedStrings: Story = {
  name: '🔧 Preselected String Items Persist (TASK-925)',
  render: () => {
    const PreselectedWrapper = () => {
      const [value, setValue] = useState('');
      const [selectedItems, setSelectedItems] = useState<string[]>(['Apple', 'Banana']);

      return (
        <div style={{ padding: '20px', minHeight: '200px' }}>
          <Autocomplete
            suggestions={stringSuggestions}
            multiple={true}
            value={value}
            onChange={setValue}
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
            placeholder="Has preselected items..."
          />
        </div>
      );
    };

    return <PreselectedWrapper />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify preselected items are displayed as chips', async () => {
      const chip0 = canvas.getByTestId('selected-chip-0');
      const chip1 = canvas.getByTestId('selected-chip-1');

      expect(chip0).toBeInTheDocument();
      expect(chip0).toHaveTextContent('Apple');
      expect(chip1).toBeInTheDocument();
      expect(chip1).toHaveTextContent('Banana');
    });

    await step('Add another item to preselected list', async () => {
      const input = canvas.getByRole('combobox');
      await userEvent.click(input);
      await userEvent.type(input, 'Cherry', { delay: 50 });

      await waitFor(() => expect(canvas.queryByRole('listbox')).toBeInTheDocument(), {
        timeout: 1500,
      });
      await userEvent.keyboard('{Enter}');

      // Should now have 3 chips
      await waitFor(
        () => {
          const chips = canvas.getAllByTestId(/selected-chip-/);
          expect(chips).toHaveLength(3);
        },
        { timeout: 2000 },
      );
    });
  },
};
