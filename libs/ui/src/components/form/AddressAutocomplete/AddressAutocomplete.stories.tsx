import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Business, Home, LocalShipping } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { AddressAutocomplete } from './AddressAutocomplete';
import type { AddressDetails } from './AddressAutocomplete.types';

const meta: Meta<typeof AddressAutocomplete> = {
  title: 'Form/AddressAutocomplete',
  component: AddressAutocomplete,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An advanced address autocomplete component with Google Maps integration, current location support, and beautiful glass morphism effects.',
      },
    },
  },
  tags: ['autodocs', 'component:AddressAutocomplete'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['glass', 'outlined', 'filled'],
      description: 'Visual style variant of the input field',
    },
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when field is empty',
    },
    error: {
      control: 'boolean',
      description: 'Shows error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the input take full width of container',
    },
    floating: {
      control: 'boolean',
      description: 'Uses floating label style',
    },
    getCurrentLocation: {
      control: 'boolean',
      description: 'Shows button to use current location',
    },
    googleMapsApiKey: {
      control: 'text',
      description: 'Google Maps API key for autocomplete functionality',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleAddressSelect = () => {
  // Handle address selection
};

export const Default: Story = {
  args: {
    label: 'Delivery Address',
    placeholder: 'Enter your delivery address',
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
  },
};

export const GlassVariant: Story = {
  args: {
    variant: 'glass',
    label: 'Address',
    placeholder: 'Search for an address...',
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
    getCurrentLocation: true,
  },
  render: (args) => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 6,
        borderRadius: 2,
      }}
    >
      <AddressAutocomplete {...args} />
    </Box>
  ),
};

export const WithCurrentLocation: Story = {
  args: {
    variant: 'outlined',
    label: 'Location',
    placeholder: 'Enter location or use current',
    getCurrentLocation: true,
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
  },
};

const MultipleAddressInputsComponent = () => {
  const [selectedAddresses, setSelectedAddresses] = React.useState<{
    home?: AddressDetails;
    work?: AddressDetails;
    shipping?: AddressDetails;
  }>({});

  return (
    <Stack spacing={4}>
      <Typography variant="h6">Manage Your Addresses</Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1" color="primary">
            <Home sx={{ mr: 1, verticalAlign: 'middle' }} />
            Home Address
          </Typography>
          <AddressAutocomplete
            variant="outlined"
            label="Home Address"
            placeholder="Enter your home address"
            icon={<Home />}
            googleMapsApiKey="demo-key"
            onSelect={(address) => {
              setSelectedAddresses((prev) => ({ ...prev, home: address }));
            }}
            helperText="This will be your default address"
          />
          {selectedAddresses.home && (
            <Alert severity="success" variant="outlined">
              Home address set: {selectedAddresses.home.formatted}
            </Alert>
          )}
        </Stack>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1" color="primary">
            <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
            Work Address
          </Typography>
          <AddressAutocomplete
            variant="outlined"
            label="Work Address"
            placeholder="Enter your work address"
            icon={<Business />}
            googleMapsApiKey="demo-key"
            onSelect={(address) => {
              setSelectedAddresses((prev) => ({ ...prev, work: address }));
            }}
          />
          {selectedAddresses.work && (
            <Alert severity="success" variant="outlined">
              Work address set: {selectedAddresses.work.formatted}
            </Alert>
          )}
        </Stack>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1" color="primary">
            <LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />
            Shipping Address
          </Typography>
          <AddressAutocomplete
            variant="filled"
            label="Shipping Address"
            placeholder="Where should we deliver?"
            icon={<LocalShipping />}
            googleMapsApiKey="demo-key"
            getCurrentLocation={true}
            onSelect={(address) => {
              setSelectedAddresses((prev) => ({ ...prev, shipping: address }));
            }}
            helperText="We deliver to this address"
          />
          {selectedAddresses.shipping && (
            <Alert severity="success" variant="outlined">
              Shipping address set: {selectedAddresses.shipping.formatted}
            </Alert>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export const MultipleAddressInputs: Story = {
  render: () => <MultipleAddressInputsComponent />,
};

const WithValidationComponent = () => {
  const [address, setAddress] = React.useState<AddressDetails | null>(null);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleSubmit = () => {
    if (!address) {
      setError(true);
      setHelperText('Please select a valid address');
    } else {
      setError(false);
      setHelperText('');
      // eslint-disable-next-line no-console
      console.log(`Address confirmed: ${address.formatted}`);
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <Typography variant="h6">Address Validation Example</Typography>
      <AddressAutocomplete
        variant="outlined"
        label="Delivery Address"
        placeholder="Enter a valid address"
        googleMapsApiKey="demo-key"
        required
        error={error}
        helperText={helperText}
        onSelect={(addr) => {
          setAddress(addr);
          setError(false);
          setHelperText('');
        }}
      />
      <button onClick={handleSubmit}>Submit Address</button>

      {address && !error && (
        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" gutterBottom>
            Selected Address Details:
          </Typography>
          <Typography variant="body2">Street: {address.street}</Typography>
          <Typography variant="body2">City: {address.city}</Typography>
          <Typography variant="body2">State: {address.state}</Typography>
          <Typography variant="body2">Postal Code: {address.postalCode}</Typography>
          <Typography variant="body2">
            Coordinates: {address.coordinates.lat}, {address.coordinates.lng}
          </Typography>
        </Paper>
      )}
    </Stack>
  );
};

export const WithValidation: Story = {
  render: () => <WithValidationComponent />,
};

export const RestrictedCountries: Story = {
  args: {
    variant: 'outlined',
    label: 'US Address Only',
    placeholder: 'Enter a US address',
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
    restrictions: {
      country: ['us'],
    },
    helperText: 'Only addresses in the United States are allowed',
  },
};

export const BusinessAddresses: Story = {
  args: {
    variant: 'outlined',
    label: 'Business Location',
    placeholder: 'Search for businesses',
    icon: <Business />,
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
    restrictions: {
      types: ['establishment'],
    },
    helperText: 'Search for business locations only',
  },
};

export const FloatingLabel: Story = {
  args: {
    variant: 'outlined',
    label: 'Floating Label Address',
    placeholder: 'Start typing...',
    floating: true,
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
  },
};

export const DisabledState: Story = {
  args: {
    variant: 'outlined',
    label: 'Address',
    placeholder: 'This field is disabled',
    disabled: true,
    googleMapsApiKey: 'demo-key',
    onSelect: handleAddressSelect,
    defaultValue: '123 Main St, San Francisco, CA',
  },
};

export const CustomIcons: Story = {
  render: () => (
    <Stack spacing={3}>
      <AddressAutocomplete
        variant="outlined"
        label="Home"
        icon={<Home />}
        googleMapsApiKey="demo-key"
        onSelect={handleAddressSelect}
      />
      <AddressAutocomplete
        variant="outlined"
        label="Office"
        icon={<Business />}
        googleMapsApiKey="demo-key"
        onSelect={handleAddressSelect}
      />
      <AddressAutocomplete
        variant="outlined"
        label="Delivery"
        icon={<LocalShipping />}
        googleMapsApiKey="demo-key"
        onSelect={handleAddressSelect}
      />
    </Stack>
  ),
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        All Variants
      </Typography>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Glass Variant
        </Typography>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3,
            borderRadius: 2,
          }}
        >
          <AddressAutocomplete
            variant="glass"
            label="Glass Address"
            placeholder="Enter address..."
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Outlined Variant
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Outlined Address"
          placeholder="Enter address..."
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Filled Variant
        </Typography>
        <AddressAutocomplete
          variant="filled"
          label="Filled Address"
          placeholder="Enter address..."
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        All Size Configurations
      </Typography>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Default Width
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Default Width"
          placeholder="Enter address..."
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Full Width
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Full Width Address"
          placeholder="Enter address..."
          fullWidth
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Floating Label
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Floating Label"
          placeholder="Enter address..."
          floating
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Icon
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Address with Icon"
          placeholder="Enter address..."
          icon={<Home />}
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        All States
      </Typography>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Default State
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Default"
          placeholder="Enter address..."
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Error State
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Error"
          placeholder="Enter address..."
          error
          helperText="This field has an error"
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Disabled State
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Disabled"
          placeholder="Enter address..."
          disabled
          defaultValue="123 Main St, San Francisco, CA"
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Required State
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="Required"
          placeholder="Enter address..."
          required
          helperText="This field is required"
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Current Location
        </Typography>
        <AddressAutocomplete
          variant="outlined"
          label="With Location"
          placeholder="Enter address or use current location..."
          getCurrentLocation
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
        />
      </Box>
    </Stack>
  ),
};

const InteractiveStatesComponent = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const states = [
    { label: 'Hover State', variant: 'outlined' as const },
    { label: 'Focus State', variant: 'outlined' as const },
    { label: 'Active State', variant: 'outlined' as const },
  ];

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Interactive States
      </Typography>
      {states.map((state, index) => (
        <Box
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Typography variant="subtitle2" gutterBottom>
            {state.label} {hoveredIndex === index && '(Hovered)'}
          </Typography>
          <AddressAutocomplete
            variant={state.variant}
            label={state.label}
            placeholder="Interact with this field..."
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
      ))}
    </Stack>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

export const Responsive: Story = {
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
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
  },
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Responsive Design (resize viewport)
      </Typography>

      <Alert severity="info">
        This component adapts to different screen sizes. Try changing the viewport size using
        Storybook&apos;s viewport addon.
      </Alert>

      <Box sx={{ width: '100%' }}>
        <AddressAutocomplete
          variant="outlined"
          label="Responsive Address"
          placeholder="Enter your address..."
          fullWidth
          getCurrentLocation
          googleMapsApiKey="demo-key"
          onSelect={handleAddressSelect}
          helperText="This field adapts to the container width"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 300px' }}>
          <AddressAutocomplete
            variant="outlined"
            label="Home Address"
            icon={<Home />}
            fullWidth
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
        <Box sx={{ flex: '1 1 300px' }}>
          <AddressAutocomplete
            variant="outlined"
            label="Work Address"
            icon={<Business />}
            fullWidth
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
      </Box>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 280 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <AddressAutocomplete
            label="Address"
            placeholder="Enter address..."
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 280 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <AddressAutocomplete
            label="Address"
            placeholder="Enter address..."
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 280 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <AddressAutocomplete
            label="Address"
            placeholder="Enter address..."
            googleMapsApiKey="demo-key"
            onSelect={handleAddressSelect}
          />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
