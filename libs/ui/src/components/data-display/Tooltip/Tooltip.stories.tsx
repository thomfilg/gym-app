import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Delete,Help, Info, Settings } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'DataDisplay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Tooltip'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'light', 'glass'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
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

// Basic examples
export const Default: Story = {
  args: {
    title: 'This is a helpful tooltip',
    children: <Button variant="outlined">Hover me</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Click for more information',
    children: (
      <IconButton>
        <Help />
      </IconButton>
    ),
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Tooltip variant="default" title="Default tooltip">
        <Button variant="outlined">Default</Button>
      </Tooltip>
      <Tooltip variant="dark" title="Dark tooltip">
        <Button variant="outlined">Dark</Button>
      </Tooltip>
      <Tooltip variant="light" title="Light tooltip">
        <Button variant="outlined">Light</Button>
      </Tooltip>
      <Tooltip variant="glass" title="Glass tooltip">
        <Button variant="outlined">Glass</Button>
      </Tooltip>
    </Stack>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Tooltip size="sm" title="Small tooltip">
        <Button variant="outlined" size="small">
          Small
        </Button>
      </Tooltip>
      <Tooltip size="md" title="Medium tooltip">
        <Button variant="outlined">Medium</Button>
      </Tooltip>
      <Tooltip size="lg" title="Large tooltip">
        <Button variant="outlined" size="large">
          Large
        </Button>
      </Tooltip>
    </Stack>
  ),
};

// Placements
export const Placements: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 3,
        width: 300,
        height: 200,
      }}
    >
      <Box />
      <Tooltip placement="top" title="Top tooltip">
        <Button variant="outlined" fullWidth>
          Top
        </Button>
      </Tooltip>
      <Box />

      <Tooltip placement="left" title="Left tooltip">
        <Button variant="outlined" fullWidth>
          Left
        </Button>
      </Tooltip>
      <Box />
      <Tooltip placement="right" title="Right tooltip">
        <Button variant="outlined" fullWidth>
          Right
        </Button>
      </Tooltip>

      <Box />
      <Tooltip placement="bottom" title="Bottom tooltip">
        <Button variant="outlined" fullWidth>
          Bottom
        </Button>
      </Tooltip>
      <Box />
    </Box>
  ),
};

// With effects
export const WithGlow: Story = {
  args: {
    variant: 'dark',
    glow: true,
    title: 'This tooltip has a glow effect',
    children: (
      <Button variant="contained" color="primary">
        Glow Effect
      </Button>
    ),
  },
};

export const WithPulse: Story = {
  args: {
    variant: 'light',
    pulse: true,
    title: 'This tooltip pulses to grab attention',
    children: (
      <Button variant="contained" color="warning">
        Pulse Effect
      </Button>
    ),
  },
};

export const WithGlowAndPulse: Story = {
  args: {
    variant: 'glass',
    glow: true,
    pulse: true,
    title: 'This tooltip combines both effects',
    children: (
      <Button variant="contained" color="secondary">
        Combined Effects
      </Button>
    ),
  },
};

// Complex tooltips
export const ComplexTooltip: Story = {
  args: {
    variant: 'light',
    size: 'lg',
    title: (
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Advanced Settings
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Configure advanced options for this feature.
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: '0.875rem' }}>
          <li>Enable notifications</li>
          <li>Set custom thresholds</li>
          <li>Configure automation</li>
        </ul>
      </Box>
    ),
    children: (
      <IconButton>
        <Settings />
      </IconButton>
    ),
  },
};

// Real-world examples
export const UserInterface: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tooltip title="User profile and settings">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
          alt="User"
          sx={{ cursor: 'pointer' }}
        />
      </Tooltip>

      <Tooltip title="Get help and support" variant="light">
        <IconButton>
          <Help />
        </IconButton>
      </Tooltip>

      <Tooltip title="View system information" variant="glass">
        <IconButton>
          <Info />
        </IconButton>
      </Tooltip>

      <Tooltip
        title="This action cannot be undone. All data will be permanently deleted."
        variant="dark"
        placement="left"
        glow
      >
        <IconButton color="error">
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  ),
};

export const FormHelp: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle2">Email Address</Typography>
        <Tooltip
          title="We'll use this email to send you important updates and notifications"
          variant="light"
          size="sm"
        >
          <Help fontSize="small" sx={{ color: 'text.secondary', cursor: 'pointer' }} />
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle2">Password</Typography>
        <Tooltip
          title="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
          variant="glass"
          maxWidth={250}
        >
          <Help fontSize="small" sx={{ color: 'text.secondary', cursor: 'pointer' }} />
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle2">Two-Factor Authentication</Typography>
        <Tooltip
          title="Adds an extra layer of security to your account by requiring a second form of verification"
          variant="dark"
          glow
        >
          <Help fontSize="small" sx={{ color: 'text.secondary', cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Stack>
  ),
};

// Interactive features
export const InteractiveTooltips: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Tooltip title="This tooltip appears quickly" enterDelay={100} leaveDelay={0}>
        <Button variant="outlined">Fast</Button>
      </Tooltip>

      <Tooltip title="This tooltip has a longer delay" enterDelay={1000} leaveDelay={200}>
        <Button variant="outlined">Slow</Button>
      </Tooltip>

      <Tooltip
        title="This tooltip stays open longer"
        enterDelay={500}
        leaveDelay={1000}
        variant="glass"
        pulse
      >
        <Button variant="outlined">Persistent</Button>
      </Tooltip>
    </Stack>
  ),
};

// Long text handling
export const LongText: Story = {
  args: {
    variant: 'light',
    size: 'md',
    maxWidth: 200,
    title:
      'This is a very long tooltip text that should wrap nicely within the maximum width constraints. It demonstrates how the tooltip handles longer content.',
    children: <Button variant="outlined">Long Tooltip</Button>,
  },
};

// Required comprehensive stories
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">All Tooltip Variants</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <Tooltip variant="default" title="Default variant tooltip">
          <Button variant="outlined">Default</Button>
        </Tooltip>
        <Tooltip variant="dark" title="Dark variant tooltip">
          <Button variant="outlined">Dark</Button>
        </Tooltip>
        <Tooltip variant="light" title="Light variant tooltip">
          <Button variant="outlined">Light</Button>
        </Tooltip>
        <Tooltip variant="glass" title="Glass variant tooltip">
          <Button variant="outlined">Glass</Button>
        </Tooltip>
      </Stack>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">All Tooltip Sizes</Typography>
      <Stack direction="row" spacing={3}>
        <Tooltip size="sm" title="Small size tooltip">
          <Button variant="outlined" size="small">
            Small
          </Button>
        </Tooltip>
        <Tooltip size="md" title="Medium size tooltip">
          <Button variant="outlined">Medium</Button>
        </Tooltip>
        <Tooltip size="lg" title="Large size tooltip">
          <Button variant="outlined" size="large">
            Large
          </Button>
        </Tooltip>
      </Stack>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">All Tooltip States</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <Tooltip title="Normal state tooltip">
          <Button variant="outlined">Normal</Button>
        </Tooltip>
        <Tooltip title="Tooltip with glow effect" glow>
          <Button variant="outlined">With Glow</Button>
        </Tooltip>
        <Tooltip title="Tooltip with pulse effect" pulse>
          <Button variant="outlined">With Pulse</Button>
        </Tooltip>
        <Tooltip title="Tooltip with both effects" glow pulse>
          <Button variant="outlined">Glow + Pulse</Button>
        </Tooltip>
        <Tooltip title="Disabled element">
          <span>
            <Button variant="outlined" disabled>
              Disabled
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Interactive Tooltip States</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <Tooltip title="Hover to see tooltip" enterDelay={0} leaveDelay={0}>
          <Button variant="outlined">Instant</Button>
        </Tooltip>
        <Tooltip title="Delayed tooltip" enterDelay={500} leaveDelay={200}>
          <Button variant="outlined">Delayed</Button>
        </Tooltip>
        <Tooltip title="Click to toggle" enterTouchDelay={0}>
          <Button variant="outlined">Touch/Click</Button>
        </Tooltip>
        <Tooltip title="Focus to see tooltip" enterDelay={0}>
          <Button variant="outlined">Focus</Button>
        </Tooltip>
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
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
  render: () => (
    <Stack spacing={3} sx={{ p: 2 }}>
      <Typography variant="h6">Responsive Tooltips</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        <Tooltip title="Responsive tooltip on mobile" placement="bottom">
          <Button variant="outlined" fullWidth>
            Mobile
          </Button>
        </Tooltip>
        <Tooltip title="Responsive tooltip on tablet" placement="top">
          <Button variant="outlined" fullWidth>
            Tablet
          </Button>
        </Tooltip>
        <Tooltip title="Responsive tooltip on desktop" placement="right">
          <Button variant="outlined" fullWidth>
            Desktop
          </Button>
        </Tooltip>
        <Tooltip title="Adaptive placement" placement="auto">
          <Button variant="outlined" fullWidth>
            Adaptive
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Tooltip title="Compact density tooltip" size="sm">
              <Button variant="outlined" size="small">
                Hover me
              </Button>
            </Tooltip>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Tooltip title="Normal density tooltip" size="md">
              <Button variant="outlined">Hover me</Button>
            </Tooltip>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Tooltip title="Spacious density tooltip" size="lg">
              <Button variant="outlined" size="large">
                Hover me
              </Button>
            </Tooltip>
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
