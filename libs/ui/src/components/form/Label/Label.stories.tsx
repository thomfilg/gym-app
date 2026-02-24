import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React from 'react';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Label'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'glass', 'gradient', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'default'],
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    asteriskPlacement: {
      control: 'select',
      options: ['start', 'end'],
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email-input',
  },
};

export const Required: Story = {
  args: {
    children: 'Email Address',
    required: true,
    htmlFor: 'email-required',
  },
};

export const WithHelperText: Story = {
  args: {
    children: 'Password',
    required: true,
    helperText: 'Must be at least 8 characters long',
    htmlFor: 'password-input',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Email',
    icon: <EmailIcon fontSize="small" />,
    iconPosition: 'start',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label variant="default">Default Label</Label>
      <Label variant="filled" color="primary">
        Filled Label
      </Label>
      <Label variant="outlined" color="secondary">
        Outlined Label
      </Label>
      <Label variant="glass" glow>
        Glass Label with Glow
      </Label>
      <Label variant="gradient" color="primary">
        Gradient Label
      </Label>
      <Label variant="minimal">Minimal Label</Label>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label size="xs">Extra Small Label</Label>
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
      <Label size="xl">Extra Large Label</Label>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label color="default">Default Color</Label>
      <Label color="primary">Primary Color</Label>
      <Label color="secondary">Secondary Color</Label>
      <Label color="success">Success Color</Label>
      <Label color="error">Error Color</Label>
      <Label color="warning">Warning Color</Label>
      <Label color="info">Info Color</Label>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label>Normal State</Label>
      <Label disabled>Disabled State</Label>
      <Label error>Error State</Label>
      <Label loading>Loading State</Label>
      <Label required>Required Field</Label>
    </Stack>
  ),
};

export const Effects: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label glow color="primary">
        Label with Glow
      </Label>
      <Label pulse color="secondary">
        Label with Pulse
      </Label>
      <Label glow pulse variant="glass">
        Glass with Glow and Pulse
      </Label>
      <Label variant="gradient" glow>
        Gradient with Glow
      </Label>
      <Label onClick={() => window.alert('Interactive Label clicked')}>
        Interactive Label with Click Handler
      </Label>
    </Stack>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label weight="light">Light Weight</Label>
      <Label weight="regular">Regular Weight</Label>
      <Label weight="medium">Medium Weight</Label>
      <Label weight="semibold">Semibold Weight</Label>
      <Label weight="bold">Bold Weight</Label>
    </Stack>
  ),
};

export const TextTransform: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label transform="none">No Transform</Label>
      <Label transform="uppercase">Uppercase Transform</Label>
      <Label transform="lowercase">LOWERCASE TRANSFORM</Label>
      <Label transform="capitalize">capitalize transform</Label>
    </Stack>
  ),
};

export const WithTooltip: Story = {
  args: {
    children: 'Hover for info',
    tooltip: 'This field is required for account creation',
    icon: <InfoIcon fontSize="small" />,
    iconPosition: 'end',
  },
};

export const Clickable: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label onClick={() => window.alert('Label clicked!')} variant="filled" color="primary" ripple>
        Click me (with ripple)
      </Label>
      <Label onClick={() => window.alert('Label clicked!')} variant="outlined" color="secondary">
        Click me (outlined)
      </Label>
      <Label onClick={() => window.alert('Label clicked!')} variant="glass" glow>
        Click me (glass with glow)
      </Label>
    </Stack>
  ),
};

export const AsteriskPlacement: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label required asteriskPlacement="end">
        Asterisk at End
      </Label>
      <Label required asteriskPlacement="start">
        Asterisk at Start
      </Label>
      <Label
        required
        asteriskPlacement="end"
        icon={<PersonIcon fontSize="small" />}
        iconPosition="start"
      >
        With Icon and Asterisk
      </Label>
    </Stack>
  ),
};

export const Truncate: Story = {
  render: () => (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2}>
        <Label truncate>
          This is a very long label that should be truncated when it exceeds the container width
        </Label>
        <Label nowrap>This label has nowrap and will not break to a new line</Label>
      </Stack>
    </Box>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Label htmlFor="email-field" required variant="filled" color="primary">
          Email Address
        </Label>
        <TextField
          id="email-field"
          fullWidth
          placeholder="Enter your email"
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>

      <Box>
        <Label
          htmlFor="password-field"
          required
          variant="outlined"
          color="secondary"
          helperText="Minimum 8 characters"
        >
          Password
        </Label>
        <TextField
          id="password-field"
          type="password"
          fullWidth
          placeholder="Enter your password"
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>

      <Box>
        <Label htmlFor="username-field" variant="glass" glow icon={<PersonIcon fontSize="small" />}>
          Username
        </Label>
        <TextField
          id="username-field"
          fullWidth
          placeholder="Choose a username"
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
    </Stack>
  ),
};

export const ScreenReaderOnly: Story = {
  render: () => (
    <Box>
      <Label srOnly htmlFor="sr-input">
        This label is only visible to screen readers
      </Label>
      <TextField id="sr-input" placeholder="Field with screen reader only label" fullWidth />
      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
        The label above is visually hidden but accessible to screen readers
      </Typography>
    </Box>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Label
        variant="gradient"
        color="primary"
        size="lg"
        weight="bold"
        transform="uppercase"
        glow
        pulse
        icon={<StarIcon />}
        iconPosition="start"
        required
      >
        Premium Feature
      </Label>

      <Label
        variant="glass"
        color="info"
        size="md"
        weight="medium"
        tooltip="This is a special field"
        helperText="Additional information about this field"
        icon={<InfoIcon fontSize="small" />}
        iconPosition="end"
        required
        asteriskPlacement="start"
      >
        Special Field
      </Label>

      <Label variant="filled" color="success" onClick={() => window.alert('Label clicked')}>
        Clickable Label
      </Label>
    </Stack>
  ),
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label variant="default">Default Variant</Label>
      <Label variant="filled" color="primary">
        Filled Variant
      </Label>
      <Label variant="outlined" color="secondary">
        Outlined Variant
      </Label>
      <Label variant="glass" glow>
        Glass Variant
      </Label>
      <Label variant="gradient" color="primary">
        Gradient Variant
      </Label>
      <Label variant="minimal">Minimal Variant</Label>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label size="xs">Extra Small Size</Label>
      <Label size="sm">Small Size</Label>
      <Label size="md">Medium Size</Label>
      <Label size="lg">Large Size</Label>
      <Label size="xl">Extra Large Size</Label>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label>Normal State</Label>
      <Label disabled>Disabled State</Label>
      <Label error>Error State</Label>
      <Label loading>Loading State</Label>
      <Label required>Required State</Label>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label onClick={() => window.alert('Label clicked!')} variant="filled" color="primary" ripple>
        Clickable with Ripple
      </Label>
      <Label onClick={() => window.alert('Label clicked!')} variant="outlined" color="secondary">
        Clickable Outlined
      </Label>
      <Label onClick={() => window.alert('Label clicked!')} variant="glass" glow>
        Clickable Glass
      </Label>
      <Label onClick={() => window.alert('Label clicked!')} pulse>
        Clickable with Pulse
      </Label>
    </Stack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Stack spacing={2}>
      <Label
        sx={{
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
          },
        }}
      >
        Responsive Font Size
      </Label>
      <Label
        variant="filled"
        sx={{
          padding: {
            xs: '4px 8px',
            sm: '6px 12px',
            md: '8px 16px',
            lg: '10px 20px',
          },
        }}
      >
        Responsive Padding
      </Label>
      <Label
        icon={<InfoIcon fontSize="small" />}
        sx={{
          display: {
            xs: 'flex',
            sm: 'inline-flex',
          },
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
      >
        Responsive Layout
      </Label>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Label variant="filled" color="primary">
              Compact Label
            </Label>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Label variant="filled" color="success">
              Normal Label
            </Label>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Label variant="filled" color="warning">
              Spacious Label
            </Label>
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
