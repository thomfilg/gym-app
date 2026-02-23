import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Person, Star, Verified } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { HoverCard } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'DataDisplay/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:HoverCard'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'glass', 'detailed'],
    },
    glow: {
      control: { type: 'boolean' },
    },
    pulse: {
      control: { type: 'boolean' },
    },
    enterDelay: {
      control: { type: 'number' },
    },
    exitDelay: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    title: 'Hover Card',
    description: 'This is a hover card with some information.',
    children: <Button variant="outlined">Hover me</Button>,
  },
};

export const WithCustomTrigger: Story = {
  args: {
    title: 'User Information',
    description: 'Additional details about this user.',
    trigger: (
      <Button variant="contained" startIcon={<Person />}>
        User Profile
      </Button>
    ),
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <HoverCard
        variant="default"
        title="Default Card"
        description="This is a default hover card with standard styling."
      >
        <Button variant="outlined">Default</Button>
      </HoverCard>
      <HoverCard
        variant="glass"
        title="Glass Card"
        description="This card uses glassmorphism effects."
      >
        <Button variant="outlined">Glass</Button>
      </HoverCard>
      <HoverCard
        variant="detailed"
        title="Detailed Card"
        description="This card has enhanced styling for detailed content."
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
      >
        <Button variant="outlined">Detailed</Button>
      </HoverCard>
    </Stack>
  ),
};

// User profile examples
export const UserProfile: Story = {
  render: () => (
    <HoverCard
      variant="detailed"
      title="Sarah Johnson"
      description="Senior Product Manager at TechCorp"
      avatar="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
      maxWidth={300}
    >
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        @sarah_johnson
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1}>
          <Chip icon={<Verified />} label="Verified" size="small" color="primary" />
          <Chip icon={<Star />} label="Pro" size="small" color="warning" />
        </Stack>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Building amazing products and leading great teams. Passionate about user experience and
          innovation.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Typography variant="caption">
            <strong>1.2K</strong> followers
          </Typography>
          <Typography variant="caption">
            <strong>340</strong> following
          </Typography>
        </Box>
      </Box>
    </HoverCard>
  ),
};

// Product information
export const ProductInfo: Story = {
  render: () => (
    <HoverCard
      variant="default"
      title="Premium Subscription"
      description="Unlock all features with our premium plan"
    >
      <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, cursor: 'pointer' }}>
        <Typography variant="h6">Pro Plan</Typography>
        <Typography variant="body2" color="text.secondary">
          $29/month
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Features included:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.875rem' }}>
          <li>Unlimited projects</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>Team collaboration</li>
        </ul>
      </Box>
    </HoverCard>
  ),
};

// With effects
export const WithGlow: Story = {
  args: {
    variant: 'glass',
    glow: true,
    title: 'Glowing Card',
    description: 'This card has a beautiful glow effect.',
    children: (
      <Button variant="contained" color="primary">
        Glow Effect
      </Button>
    ),
  },
};

export const WithPulse: Story = {
  args: {
    variant: 'default',
    pulse: true,
    title: 'Pulsing Card',
    description: 'This card pulses to grab attention.',
    children: (
      <Button variant="contained" color="warning">
        Pulse Effect
      </Button>
    ),
  },
};

export const WithGlowAndPulse: Story = {
  args: {
    variant: 'detailed',
    glow: true,
    pulse: true,
    title: 'Premium Feature',
    description: 'This card combines both glow and pulse effects.',
    children: (
      <Button variant="contained" color="secondary">
        Combined Effects
      </Button>
    ),
  },
};

// Different delays
export const CustomDelays: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <HoverCard
        title="Fast Hover"
        description="Shows quickly (100ms delay)"
        enterDelay={100}
        exitDelay={0}
      >
        <Button variant="outlined">Fast</Button>
      </HoverCard>
      <HoverCard
        title="Normal Hover"
        description="Shows after 700ms (default)"
        enterDelay={700}
        exitDelay={0}
      >
        <Button variant="outlined">Normal</Button>
      </HoverCard>
      <HoverCard
        title="Slow Hover"
        description="Shows after 1.5 seconds"
        enterDelay={1500}
        exitDelay={200}
      >
        <Button variant="outlined">Slow</Button>
      </HoverCard>
    </Stack>
  ),
};

// Complex content
export const ComplexContent: Story = {
  render: () => (
    <HoverCard variant="detailed" maxWidth={350}>
      <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
        View Analytics Dashboard
      </Typography>
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Monthly Stats
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Total Views:</Typography>
            <Typography variant="body2" fontWeight={600}>
              12,345
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Unique Visitors:</Typography>
            <Typography variant="body2" fontWeight={600}>
              8,901
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Conversion Rate:</Typography>
            <Typography variant="body2" fontWeight={600} color="success.main">
              4.2%
            </Typography>
          </Box>
        </Stack>
        <Button fullWidth variant="outlined" size="small" sx={{ mt: 2 }}>
          View Details
        </Button>
      </Box>
    </HoverCard>
  ),
};

// Disabled state
export const DisabledState: Story = {
  args: {
    variant: 'default',
    disabled: true,
    title: 'Disabled HoverCard',
    description: 'This hover card is disabled and will not appear.',
    children: <Button disabled>Disabled Button</Button>,
  },
};

// Loading state
export const LoadingState: Story = {
  args: {
    variant: 'default',
    loading: true,
    children: <Button>Loading Content</Button>,
  },
};

// Loading with custom component
export const CustomLoadingState: Story = {
  args: {
    variant: 'default',
    loading: true,
    loadingComponent: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>Custom loading message...</Typography>
      </Box>
    ),
    children: <Button>Custom Loading</Button>,
  },
};

// Different placements
export const Placements: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, p: 8 }}>
      <HoverCard
        title="Top Placement"
        description="Appears above the trigger"
        placement="top"
        showArrow={true}
        enterDelay={100}
      >
        <Button variant="outlined">Top</Button>
      </HoverCard>
      <HoverCard
        title="Bottom Placement"
        description="Appears below the trigger"
        placement="bottom"
        showArrow={true}
        enterDelay={100}
      >
        <Button variant="outlined">Bottom</Button>
      </HoverCard>
      <HoverCard
        title="Left Placement"
        description="Appears to the left"
        placement="left"
        showArrow={true}
        enterDelay={100}
      >
        <Button variant="outlined">Left</Button>
      </HoverCard>
      <HoverCard
        title="Right Placement"
        description="Appears to the right"
        placement="right"
        showArrow={true}
        enterDelay={100}
      >
        <Button variant="outlined">Right</Button>
      </HoverCard>
    </Box>
  ),
};

// Different animations
export const Animations: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <HoverCard
        title="Fade Animation"
        description="Fades in smoothly"
        animation="fade"
        enterDelay={100}
      >
        <Button variant="outlined">Fade</Button>
      </HoverCard>
      <HoverCard
        title="Scale Animation"
        description="Scales up from center"
        animation="scale"
        enterDelay={100}
      >
        <Button variant="outlined">Scale</Button>
      </HoverCard>
      <HoverCard
        title="Slide Up"
        description="Slides up from below"
        animation="slide-up"
        enterDelay={100}
      >
        <Button variant="outlined">Slide Up</Button>
      </HoverCard>
      <HoverCard
        title="Slide Down"
        description="Slides down from above"
        animation="slide-down"
        enterDelay={100}
      >
        <Button variant="outlined">Slide Down</Button>
      </HoverCard>
      <HoverCard
        title="Slide Left"
        description="Slides from the right"
        animation="slide-left"
        enterDelay={100}
      >
        <Button variant="outlined">Slide Left</Button>
      </HoverCard>
      <HoverCard
        title="Slide Right"
        description="Slides from the left"
        animation="slide-right"
        enterDelay={100}
      >
        <Button variant="outlined">Slide Right</Button>
      </HoverCard>
    </Stack>
  ),
};

// Inline text hover
export const InlineText: Story = {
  render: () => (
    <Typography variant="body1">
      You can hover over{' '}
      <HoverCard
        title="Hover Definition"
        description="A hover card is a UI element that appears when you hover over a trigger element."
        variant="glass"
      >
        <Typography
          component="span"
          color="primary"
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          hover cards
        </Typography>
      </HoverCard>{' '}
      to see additional information without navigating away from the current page.
    </Typography>
  ),
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">All HoverCard Variants</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <HoverCard
          variant="default"
          title="Default Variant"
          description="Standard hover card with default styling"
        >
          <Button variant="outlined">Default</Button>
        </HoverCard>
        <HoverCard
          variant="glass"
          title="Glass Variant"
          description="Glassmorphism effect with blur and transparency"
        >
          <Button variant="outlined">Glass</Button>
        </HoverCard>
        <HoverCard
          variant="detailed"
          title="Detailed Variant"
          description="Enhanced styling for rich content display"
          avatar="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
        >
          <Button variant="outlined">Detailed</Button>
        </HoverCard>
      </Stack>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">All HoverCard Sizes</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <HoverCard title="Small Card" description="Compact size" maxWidth={200}>
          <Button variant="outlined" size="small">
            Small (200px)
          </Button>
        </HoverCard>
        <HoverCard
          title="Medium Card"
          description="Default medium size for standard content"
          maxWidth={300}
        >
          <Button variant="outlined">Medium (300px)</Button>
        </HoverCard>
        <HoverCard
          title="Large Card"
          description="Large size for detailed information and rich content display"
          maxWidth={400}
        >
          <Button variant="outlined" size="large">
            Large (400px)
          </Button>
        </HoverCard>
        <HoverCard
          title="Extra Large Card"
          description="Extra large size for complex content layouts and detailed information panels"
          maxWidth={500}
        >
          <Button variant="outlined" size="large">
            XL (500px)
          </Button>
        </HoverCard>
      </Stack>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">All HoverCard States</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <HoverCard title="Normal State" description="Default interactive state">
          <Button variant="outlined">Normal</Button>
        </HoverCard>
        <HoverCard
          title="With Glow"
          description="Glowing effect applied"
          glow={true}
          variant="glass"
        >
          <Button variant="outlined" color="primary">
            Glow Effect
          </Button>
        </HoverCard>
        <HoverCard title="With Pulse" description="Pulsing animation effect" pulse={true}>
          <Button variant="outlined" color="warning">
            Pulse Effect
          </Button>
        </HoverCard>
        <HoverCard
          title="Combined Effects"
          description="Both glow and pulse"
          glow={true}
          pulse={true}
          variant="detailed"
        >
          <Button variant="contained" color="secondary">
            Combined
          </Button>
        </HoverCard>
        <HoverCard title="Loading State" description="Content is loading" loading={true}>
          <Button variant="outlined">Loading</Button>
        </HoverCard>
        <HoverCard title="Disabled State" description="This hover card is disabled" disabled={true}>
          <Button disabled>Disabled</Button>
        </HoverCard>
      </Stack>
    </Stack>
  ),
};

const InteractiveStatesComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Interactive HoverCard States</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <HoverCard
          title="Hover Interaction"
          description="Shows on hover with 700ms delay"
          enterDelay={700}
          exitDelay={200}
        >
          <Button variant="outlined">Hover Me (700ms delay)</Button>
        </HoverCard>
        <HoverCard
          title="Quick Hover"
          description="Shows immediately on hover"
          enterDelay={0}
          exitDelay={0}
        >
          <Button variant="outlined" color="primary">
            Quick Hover (0ms)
          </Button>
        </HoverCard>
        <HoverCard
          title="With Callbacks"
          description={`Opened: ${open ? 'Yes' : 'No'}`}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Button variant="outlined" color="secondary">
            Track State: {open ? 'Open' : 'Closed'}
          </Button>
        </HoverCard>
        <HoverCard title="Click Counter" description={`Button clicked ${clickCount} times`}>
          <Button variant="contained" onClick={() => setClickCount((c) => c + 1)}>
            Click Count: {clickCount}
          </Button>
        </HoverCard>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Test hover interactions, delays, and state management
      </Typography>
    </Stack>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Stack spacing={3} alignItems="center" sx={{ p: 2 }}>
      <Typography variant="h6">Responsive HoverCard</Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <HoverCard
          title="Mobile Optimized"
          description="Touch-enabled for mobile devices"
          touchEnabled={true}
          placement="bottom"
          maxWidth={280}
        >
          <Button fullWidth variant="outlined">
            Touch & Hold (Mobile)
          </Button>
        </HoverCard>
        <HoverCard
          title="Tablet View"
          description="Optimized for tablet screens"
          placement="right"
          maxWidth={350}
        >
          <Button fullWidth variant="outlined" color="primary">
            Tablet Optimized
          </Button>
        </HoverCard>
        <HoverCard
          title="Desktop View"
          description="Full-featured desktop experience with rich content"
          variant="detailed"
          avatar="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
          maxWidth={400}
        >
          <Button fullWidth variant="contained">
            Desktop Experience
          </Button>
        </HoverCard>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
        Resize viewport to test responsive behavior
      </Typography>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <HoverCard
            content={
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">Compact Card</Typography>
                <Typography variant="body2">Reduced spacing content.</Typography>
              </Box>
            }
          >
            <Button variant="outlined">Hover me</Button>
          </HoverCard>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <HoverCard
            content={
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">Normal Card</Typography>
                <Typography variant="body2">Standard spacing content.</Typography>
              </Box>
            }
          >
            <Button variant="outlined">Hover me</Button>
          </HoverCard>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <HoverCard
            content={
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">Spacious Card</Typography>
                <Typography variant="body2">Extra spacing content.</Typography>
              </Box>
            }
          >
            <Button variant="outlined">Hover me</Button>
          </HoverCard>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
