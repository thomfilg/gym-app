import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Checkbox'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'rounded', 'toggle'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: { type: 'boolean' },
    },
    ripple: {
      control: { type: 'boolean' },
    },
    glow: {
      control: { type: 'boolean' },
    },
    pulse: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default checkbox',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox variant="default" label="Default checkbox" defaultChecked />
      <Checkbox variant="rounded" label="Rounded checkbox" defaultChecked />
      <Checkbox variant="toggle" label="Toggle-style checkbox" defaultChecked />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled & Checked" disabled checked />
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Primary" color="primary" defaultChecked />
      <Checkbox label="Secondary" color="secondary" defaultChecked />
      <Checkbox label="Success" color="success" defaultChecked />
      <Checkbox label="Warning" color="warning" defaultChecked />
      <Checkbox label="Error" color="error" defaultChecked />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Small" size="small" defaultChecked />
      <Checkbox label="Medium" size="medium" defaultChecked />
      <Checkbox label="Large" size="large" defaultChecked />
    </Stack>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox
        label="Terms and Conditions"
        helperText="Please read and accept our terms and conditions"
      />
      <Checkbox label="Newsletter" helperText="Subscribe to our weekly newsletter" defaultChecked />
      <Checkbox label="Required Field" helperText="This field is required" error />
    </Stack>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <FormGroup>
      <Checkbox label="Option 1" defaultChecked />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" defaultChecked />
      <Checkbox label="Option 4 (Disabled)" disabled />
    </FormGroup>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'I accept the terms',
    error: true,
    helperText: 'You must accept the terms to continue',
  },
};

export const LoadingState: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Loading checkbox" loading />
      <Checkbox label="Loading with text" loading defaultChecked />
      <Checkbox loading /> {/* Without label */}
    </Stack>
  ),
};

export const AnimationEffects: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Glow effect" glow defaultChecked />
      <Checkbox label="Pulse effect" pulse defaultChecked />
      <Checkbox label="No ripple effect" ripple={false} />
      <Checkbox label="All effects" glow pulse defaultChecked />
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <Stack spacing={2}>
      <Checkbox
        label="Accessible checkbox"
        data-testid="accessible-checkbox"
        aria-describedby="checkbox-description"
      />
      <div id="checkbox-description">This checkbox has proper accessibility attributes</div>
      <Checkbox
        label="Required field"
        required
        error
        helperText="This field is required"
        data-testid="required-checkbox"
      />
    </Stack>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'default',
    label: 'Playground Checkbox',
    color: 'primary',
    size: 'medium',
    checked: false,
    disabled: false,
    indeterminate: false,
    error: false,
    helperText: '',
    loading: false,
    ripple: true,
    glow: false,
    pulse: false,
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Checkbox variant="default" label="Default variant" defaultChecked />
        <Checkbox variant="rounded" label="Rounded variant" defaultChecked />
        <Checkbox variant="toggle" label="Toggle variant" defaultChecked />
      </Stack>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Checkbox size="small" label="Small" defaultChecked />
      <Checkbox size="medium" label="Medium" defaultChecked />
      <Checkbox size="large" label="Large" defaultChecked />
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Checkbox label="Default" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled Checked" disabled defaultChecked />
        <Checkbox label="Loading" loading />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Checkbox label="Error" error helperText="Error message" />
        <Checkbox label="With Helper" helperText="Helper text" />
      </Stack>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2}>
        <Checkbox label="Hover me" glow />
        <Checkbox label="Focus me" pulse />
        <Checkbox label="Click me" defaultChecked />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Checkbox label="With ripple" ripple defaultChecked />
        <Checkbox label="No ripple" ripple={false} defaultChecked />
      </Stack>
    </Stack>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '360px', height: '640px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', p: 2 }}>
      <FormGroup>
        <Checkbox label="Responsive checkbox 1" defaultChecked />
        <Checkbox label="Responsive checkbox 2" />
        <Checkbox label="Responsive checkbox 3" defaultChecked />
        <Checkbox label="Responsive checkbox 4" disabled />
      </FormGroup>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 180 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Checkbox label="Compact checkbox" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 180 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Checkbox label="Normal checkbox" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 180 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Checkbox label="Spacious checkbox" />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
