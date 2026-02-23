import CssBaseline from '@mui/material/CssBaseline';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

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
  { id: '6', name: 'Diana Davis', email: 'diana@example.com', department: 'HR' },
  { id: '7', name: 'Edward Miller', email: 'edward@example.com', department: 'Finance' },
  { id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', department: 'Legal' },
];

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
];
const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'India',
  'Mexico',
];

const meta: Meta<typeof Autocomplete> = {
  title: 'Form/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs', 'component:Autocomplete'],
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive autocomplete component with ARIA support, keyboard navigation, and multiple selection modes.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <div style={{ padding: '20px', minHeight: '400px', backgroundColor: '#f5f5f5' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Required story exports for validation
export const Default: Story = {
  render: () => <ControlledAutocomplete suggestions={fruits} placeholder="Select a fruit..." />,
};

// Controlled Component Wrapper
const ControlledAutocomplete = <T = string | Person,>(props: Partial<AutocompleteProps<T>>) => {
  const [value, setValue] = useState(props.value || '');
  const [selectedItems, setSelectedItems] = useState<T[]>((props.selectedItems || []) as T[]);

  return (
    <Autocomplete
      {...props}
      value={value}
      onChange={setValue}
      selectedItems={selectedItems}
      onSelectedItemsChange={setSelectedItems}
    />
  );
};

// Basic Stories
export const BasicUsage: Story = {
  render: () => <ControlledAutocomplete suggestions={fruits} placeholder="Select a fruit..." />,
};

export const WithInitialValue: Story = {
  render: () => (
    <ControlledAutocomplete value="Apple" suggestions={fruits} placeholder="Select a fruit..." />
  ),
};

export const ObjectData: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={samplePeople}
      getKey={(person: Person) => person.id}
      getLabel={(person: Person) => person.name}
      getDescription={(person: Person) => `${person.email} - ${person.department}`}
      placeholder="Search for a person..."
    />
  ),
};

// Visual States
export const Disabled: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={fruits}
      disabled={true}
      value="Cannot edit"
      placeholder="Disabled autocomplete..."
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={[]}
      async={true}
      isLoading={true}
      placeholder="Loading suggestions..."
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <ControlledAutocomplete suggestions={[]} value="xyz" placeholder="No matching results..." />
  ),
};

// Feature Demonstrations
export const WithGhostText: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={countries}
      showGhostText={true}
      placeholder="Type 'Uni' to see ghost text..."
    />
  ),
};

export const MultipleSelectionMode: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={fruits}
      multiple={true}
      selectedItems={['Apple', 'Banana']}
      placeholder="Select multiple fruits..."
    />
  ),
};

const AsyncModeComponent = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue) {
      setLoading(true);
      // Simulate API call
      window.setTimeout(() => {
        setSuggestions(fruits.filter((f) => f.toLowerCase().includes(newValue.toLowerCase())));
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      suggestions={suggestions}
      async={true}
      isLoading={loading}
      placeholder="Type to search (async)..."
    />
  );
};

export const AsyncMode: Story = {
  render: () => <AsyncModeComponent />,
};

export const CustomRenderer: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={samplePeople}
      getKey={(person: Person) => person.id}
      getLabel={(person: Person) => person.name}
      renderSuggestion={(person: Person, state) => (
        <div
          style={{
            padding: '8px',
            backgroundColor: state.active ? '#e3f2fd' : 'transparent',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontWeight: 'bold', color: '#1976d2' }}>{person.name}</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>{person.email}</div>
          <div style={{ fontSize: '0.75rem', color: '#999' }}>{person.department}</div>
        </div>
      )}
      placeholder="Custom rendered items..."
    />
  ),
};

// Match Modes
export const StartsWithMatching: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={countries}
      matchMode="startsWith"
      placeholder="Type 'U' to match countries starting with U..."
    />
  ),
};

export const ContainsMatching: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={countries}
      matchMode="contains"
      placeholder="Type 'land' to match countries containing 'land'..."
    />
  ),
};

export const FuzzyMatching: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={['JavaScript', 'TypeScript', 'CoffeeScript', 'ActionScript', 'PureScript']}
      matchMode="fuzzy"
      placeholder="Type 'jst' for fuzzy match..."
    />
  ),
};

// Configuration Examples
export const NoFreeText: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={fruits}
      allowFreeText={false}
      placeholder="Must select from list..."
    />
  ),
};

export const CustomDebounce: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={fruits}
      debounceMs={500}
      placeholder="500ms debounce delay..."
    />
  ),
};

export const LimitedVisibleItems: Story = {
  render: () => (
    <ControlledAutocomplete
      suggestions={Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)}
      maxVisibleItems={5}
      placeholder="Only shows 5 items at a time..."
    />
  ),
};

// Theme Variations
export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <div style={{ padding: '20px', minHeight: '400px', backgroundColor: '#121212' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  render: () => (
    <ControlledAutocomplete suggestions={fruits} placeholder="Dark theme autocomplete..." />
  ),
};

// Responsive Behavior
export const ResponsiveWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '100%' }}>
        <h4>Full Width</h4>
        <ControlledAutocomplete suggestions={fruits} placeholder="100% width..." />
      </div>
      <div style={{ width: '300px' }}>
        <h4>Fixed 300px</h4>
        <ControlledAutocomplete suggestions={fruits} placeholder="300px width..." />
      </div>
      <div style={{ width: '150px' }}>
        <h4>Narrow 150px</h4>
        <ControlledAutocomplete suggestions={fruits} placeholder="150px..." />
      </div>
    </div>
  ),
};

// Complex Use Cases
const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    fruits: [] as string[],
  });

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
        />
      </div>

      <div>
        <label htmlFor="country-autocomplete">Country:</label>
        <div style={{ marginTop: '4px' }}>
          <ControlledAutocomplete
            id="country-autocomplete"
            suggestions={countries}
            value={formData.country}
            onChange={(value) => setFormData({ ...formData, country: value })}
            placeholder="Select your country..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="fruits-autocomplete">Favorite Fruits:</label>
        <div style={{ marginTop: '4px' }}>
          <ControlledAutocomplete
            id="fruits-autocomplete"
            suggestions={fruits}
            multiple={true}
            selectedItems={formData.fruits}
            onSelectedItemsChange={(items) => setFormData({ ...formData, fruits: items })}
            placeholder="Select multiple fruits..."
          />
        </div>
      </div>

      <button type="submit" style={{ padding: '8px 16px' }}>
        Submit
      </button>

      <pre style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </form>
  );
};

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
};

// Performance Demo
interface LargeDataItem {
  id: string;
  label: string;
  description: string;
}

export const LargeDatasetPerformance: Story = {
  render: () => {
    const largeDataset: LargeDataItem[] = Array.from({ length: 10000 }, (_, i) => ({
      id: `item-${i}`,
      label: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
    }));

    return (
      <ControlledAutocomplete<LargeDataItem>
        suggestions={largeDataset}
        getKey={(item) => item.id}
        getLabel={(item) => item.label}
        getDescription={(item) => item.description}
        maxVisibleItems={20}
        debounceMs={300}
        placeholder="Search 10,000 items..."
      />
    );
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>Default</h4>
        <ControlledAutocomplete suggestions={fruits} placeholder="Default autocomplete..." />
      </div>
      <div>
        <h4>With Ghost Text</h4>
        <ControlledAutocomplete
          suggestions={countries}
          showGhostText={true}
          placeholder="Type to see ghost text..."
        />
      </div>
      <div>
        <h4>Multiple Selection</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          multiple={true}
          placeholder="Select multiple items..."
        />
      </div>
      <div>
        <h4>Custom Renderer</h4>
        <ControlledAutocomplete
          suggestions={samplePeople}
          getKey={(person: Person) => person.id}
          getLabel={(person: Person) => person.name}
          renderSuggestion={(person: Person, state) => (
            <div
              style={{
                padding: '8px',
                backgroundColor: state.active ? '#e3f2fd' : 'transparent',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{person.name}</div>
              <div style={{ fontSize: '0.875rem' }}>{person.email}</div>
            </div>
          )}
          placeholder="Custom rendered items..."
        />
      </div>
      <div>
        <h4>Async Mode</h4>
        <AsyncModeComponent />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>Small (Default MUI Input Size)</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          placeholder="Small size..."
        />
      </div>
      <div>
        <h4>Medium (Default)</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          placeholder="Medium size..."
        />
      </div>
      <div>
        <h4>Large (Custom styling)</h4>
        <div style={{ fontSize: '1.25rem' }}>
          <ControlledAutocomplete
            suggestions={fruits}
            placeholder="Large size..."
          />
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>Default</h4>
        <ControlledAutocomplete suggestions={fruits} placeholder="Default state..." />
      </div>
      <div>
        <h4>With Value</h4>
        <ControlledAutocomplete
          value="Apple"
          suggestions={fruits}
          placeholder="Has value..."
        />
      </div>
      <div>
        <h4>Disabled</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          disabled={true}
          value="Disabled"
          placeholder="Disabled state..."
        />
      </div>
      <div>
        <h4>Loading</h4>
        <ControlledAutocomplete
          suggestions={[]}
          async={true}
          isLoading={true}
          placeholder="Loading state..."
        />
      </div>
      <div>
        <h4>Empty Results</h4>
        <ControlledAutocomplete
          suggestions={[]}
          value="xyz"
          placeholder="No results..."
        />
      </div>
      <div>
        <h4>Multiple Selected</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          multiple={true}
          selectedItems={['Apple', 'Banana', 'Cherry']}
          placeholder="Multiple selected..."
        />
      </div>
    </div>
  ),
};

const InteractiveStatesComponent = () => {
  const [hoverValue, setHoverValue] = useState('');
  const [focusValue, setFocusValue] = useState('');
  const [activeValue, setActiveValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>Hover State</h4>
        <div
          onMouseEnter={() => setHoverValue('Hovered')}
          onMouseLeave={() => setHoverValue('')}
          style={{
            border: hoverValue ? '2px solid #1976d2' : 'none',
            padding: '2px',
            borderRadius: '4px'
          }}
        >
          <ControlledAutocomplete
            suggestions={fruits}
            placeholder="Hover over me..."
            value={hoverValue}
          />
        </div>
      </div>
      <div>
        <h4>Focus State</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          placeholder="Click to focus..."
          value={focusValue}
          onChange={(value) => setFocusValue(value)}
          onFocus={() => setFocusValue('Focused')}
          onBlur={() => setFocusValue('')}
        />
      </div>
      <div>
        <h4>Active/Typing State</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          placeholder="Start typing..."
          value={activeValue}
          onChange={(value) => setActiveValue(value)}
        />
      </div>
      <div>
        <h4>Dropdown Open State</h4>
        <ControlledAutocomplete
          suggestions={fruits}
          placeholder="Click to open dropdown..."
          defaultOpen={true}
        />
      </div>
    </div>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  render: () => (
    <div style={{ padding: '20px' }}>
      <h3>Responsive Autocomplete</h3>
      <p>Resize the viewport to see responsive behavior</p>
      <div style={{ marginTop: '20px' }}>
        <ControlledAutocomplete
          suggestions={countries}
          placeholder="Responsive autocomplete..."
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <h4>In a flex container</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <ControlledAutocomplete
              suggestions={fruits}
              placeholder="Flex item 1..."
            />
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <ControlledAutocomplete
              suggestions={countries}
              placeholder="Flex item 2..."
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h4>In a grid container</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          <ControlledAutocomplete
            suggestions={fruits}
            placeholder="Grid item 1..."
          />
          <ControlledAutocomplete
            suggestions={countries}
            placeholder="Grid item 2..."
          />
          <ControlledAutocomplete
            suggestions={fruits}
            placeholder="Grid item 3..."
          />
        </div>
      </div>
    </div>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <div style={{ width: '250px' }}>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Compact (0.8x)</p>
            <ControlledAutocomplete
              suggestions={fruits}
              placeholder="Compact autocomplete..."
            />
          </div>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <div style={{ width: '250px' }}>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Normal (1.0x)</p>
            <ControlledAutocomplete
              suggestions={fruits}
              placeholder="Normal autocomplete..."
            />
          </div>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <div style={{ width: '250px' }}>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Spacious (1.25x)</p>
            <ControlledAutocomplete
              suggestions={fruits}
              placeholder="Spacious autocomplete..."
            />
          </div>
        </DensityProvider>
      </div>
    );
  },
};
