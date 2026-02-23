import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Email, Notifications, Phone,Settings } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A beautiful, animated avatar component with support for images, initials, icons, status indicators, and various visual effects.',
      },
    },
  },
  tags: ['autodocs', 'component:Avatar'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded', 'status'],
      description: 'The shape variant of the avatar',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'The size of the avatar',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
      description: 'The color scheme of the avatar',
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator (only with status variant)',
    },
    glow: {
      control: { type: 'boolean' },
      description: 'Add a glowing effect to the avatar',
    },
    pulse: {
      control: { type: 'boolean' },
      description: 'Add a pulsing animation to the avatar',
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Add a border to the avatar',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state with shimmer effect',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Make the avatar interactive with hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Default: Story = {
  args: {
    fallback: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    fallback: 'AB',
    color: 'secondary',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Settings />,
    color: 'success',
  },
};

// Size Variations
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="xxl" fallback="XXL" />
    </Stack>
  ),
};

// Shape Variants
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar variant="circle" fallback="CI" />
      <Avatar variant="square" fallback="SQ" />
      <Avatar variant="rounded" fallback="RD" />
      <Avatar variant="status" fallback="ST" status="online" />
    </Stack>
  ),
};

// Color Variations
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar color="primary" fallback="PR" />
      <Avatar color="secondary" fallback="SC" />
      <Avatar color="success" fallback="SU" />
      <Avatar color="warning" fallback="WA" />
      <Avatar color="error" fallback="ER" />
      <Avatar color="neutral" fallback="NT" />
    </Stack>
  ),
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Box textAlign="center">
        <Avatar variant="status" status="online" fallback="ON" size="lg" />
        <Typography variant="caption" display="block" mt={1}>
          Online
        </Typography>
      </Box>
      <Box textAlign="center">
        <Avatar variant="status" status="offline" fallback="OF" size="lg" />
        <Typography variant="caption" display="block" mt={1}>
          Offline
        </Typography>
      </Box>
      <Box textAlign="center">
        <Avatar variant="status" status="away" fallback="AW" size="lg" />
        <Typography variant="caption" display="block" mt={1}>
          Away
        </Typography>
      </Box>
      <Box textAlign="center">
        <Avatar variant="status" status="busy" fallback="BS" size="lg" />
        <Typography variant="caption" display="block" mt={1}>
          Busy
        </Typography>
      </Box>
    </Stack>
  ),
};

// Bordered Avatars
export const Bordered: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar bordered fallback="B1" />
      <Avatar bordered variant="square" fallback="B2" color="secondary" />
      <Avatar bordered variant="rounded" fallback="B3" color="success" />
      <Avatar
        bordered
        variant="status"
        status="online"
        src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
      />
    </Stack>
  ),
};

// Visual Effects
export const WithGlow: Story = {
  args: {
    glow: true,
    fallback: 'GW',
    color: 'primary',
    size: 'lg',
  },
};

export const WithPulse: Story = {
  args: {
    pulse: true,
    fallback: 'PL',
    color: 'success',
    size: 'lg',
  },
};

export const WithGlowAndPulse: Story = {
  args: {
    glow: true,
    pulse: true,
    fallback: 'GP',
    color: 'warning',
    size: 'lg',
  },
};

// Loading States
export const LoadingState: Story = {
  args: {
    loading: true,
    size: 'lg',
  },
};

export const LoadingStatesAllSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar loading size="xs" />
      <Avatar loading size="sm" />
      <Avatar loading size="md" />
      <Avatar loading size="lg" />
      <Avatar loading size="xl" />
      <Avatar loading size="xxl" />
    </Stack>
  ),
};

// Interactive Avatars
export const Interactive: Story = {
  render: () => {
    const InteractiveAvatar = () => {
      const [clicked, setClicked] = useState(0);
      return (
        <Stack spacing={2} alignItems="center">
          <Avatar
            interactive
            fallback="CL"
            size="lg"
            color="primary"
            onClick={() => setClicked((c) => c + 1)}
          />
          <Typography variant="caption">Clicked: {clicked} times</Typography>
        </Stack>
      );
    };
    return <InteractiveAvatar />;
  },
};

// Image Error Handling
export const ImageErrorHandling: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box textAlign="center">
        <Avatar
          src="https://invalid-url-that-will-fail.com/image.jpg"
          fallback="ER"
          alt="Error handling"
          size="lg"
        />
        <Typography variant="caption" display="block" mt={1}>
          With Fallback
        </Typography>
      </Box>
      <Box textAlign="center">
        <Avatar
          src="https://invalid-url-that-will-fail.com/image.jpg"
          fallback="NO"
          showFallbackOnError={false}
          alt="No fallback"
          size="lg"
        />
        <Typography variant="caption" display="block" mt={1}>
          No Fallback
        </Typography>
      </Box>
    </Stack>
  ),
};

// Avatar Groups
export const GroupedAvatars: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Small Group
        </Typography>
        <AvatarGroup max={4}>
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
          <Avatar fallback="JD" />
        </AvatarGroup>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Large Group with Overflow
        </Typography>
        <AvatarGroup max={3}>
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
          <Avatar fallback="AL" />
          <Avatar fallback="MK" />
          <Avatar fallback="PR" />
        </AvatarGroup>
      </Box>
    </Stack>
  ),
};

// Animation Delays
export const AnimationDelays: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar fallback="0" animationDelay={0} />
      <Avatar fallback="200" animationDelay={200} />
      <Avatar fallback="400" animationDelay={400} />
      <Avatar fallback="600" animationDelay={600} />
      <Avatar fallback="800" animationDelay={800} />
    </Stack>
  ),
};

// Real World Examples
export const UserProfile: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
          alt="Sarah Johnson"
          size="xl"
          variant="status"
          status="online"
          bordered
          interactive
        />
        <Box>
          <Typography variant="h6">Sarah Johnson</Typography>
          <Typography variant="body2" color="text.secondary">
            Product Manager
          </Typography>
          <Typography variant="caption" sx={{ color: 'success.main' }}>
            ● Online
          </Typography>
        </Box>
      </Stack>
    </Paper>
  ),
};

export const TeamMembers: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Team Members
      </Typography>
      <Stack spacing={2}>
        {[
          { name: 'John Smith', role: 'Designer', status: 'online' as const, initials: 'JS' },
          { name: 'Emily Davis', role: 'Developer', status: 'busy' as const, initials: 'ED' },
          { name: 'Michael Chen', role: 'Manager', status: 'away' as const, initials: 'MC' },
          { name: 'Sarah Wilson', role: 'Analyst', status: 'offline' as const, initials: 'SW' },
        ].map((member) => (
          <Stack key={member.name} direction="row" spacing={2} alignItems="center">
            <Avatar
              variant="status"
              status={member.status}
              fallback={member.initials}
              interactive
            />
            <Box flex={1}>
              <Typography variant="body1">{member.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {member.role}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Paper>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge badgeContent={4} color="primary">
        <Avatar icon={<Email />} />
      </Badge>
      <Badge badgeContent={12} color="error">
        <Avatar icon={<Notifications />} />
      </Badge>
      <Badge variant="dot" color="success">
        <Avatar icon={<Phone />} />
      </Badge>
    </Stack>
  ),
};

// All Combinations
export const AllSizes: Story = {
  name: '📏 All Sizes',
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar size="xs" fallback="XS" />
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
        <Avatar size="xl" fallback="XL" />
        <Avatar size="xxl" fallback="XXL" />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar size="xs" src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
        <Avatar size="sm" src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
        <Avatar size="md" src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
        <Avatar size="lg" src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
        <Avatar size="xl" src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
        <Avatar size="xxl" src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
      </Stack>
    </Stack>
  ),
};

export const AllVariants: Story = {
  name: '🎨 All Variants',
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="circle" fallback="CI" />
        <Avatar variant="square" fallback="SQ" />
        <Avatar variant="rounded" fallback="RD" />
        <Avatar variant="status" status="online" fallback="ST" />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="circle" src="https://i.pravatar.cc/150?img=1" alt="Circle avatar" />
        <Avatar variant="square" src="https://i.pravatar.cc/150?img=2" alt="Square avatar" />
        <Avatar variant="rounded" src="https://i.pravatar.cc/150?img=3" alt="Rounded avatar" />
        <Avatar
          variant="status"
          status="online"
          src="https://i.pravatar.cc/150?img=4"
          alt="Status avatar"
        />
      </Stack>
    </Stack>
  ),
};

export const AllStates: Story = {
  name: '🔄 All States',
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar fallback="DT" />
        <Avatar fallback="LD" loading />
        <Avatar fallback="GL" glow />
        <Avatar fallback="PL" pulse />
        <Avatar fallback="BD" bordered />
        <Avatar fallback="IN" interactive />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="status" status="online" fallback="ON" />
        <Avatar variant="status" status="offline" fallback="OF" />
        <Avatar variant="status" status="away" fallback="AW" />
        <Avatar variant="status" status="busy" fallback="BS" />
      </Stack>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  name: '🎮 Interactive States',
  args: {
    fallback: 'IN',
    interactive: true,
  },
  render: (args) => (
    <Stack spacing={4} alignItems="center">
      <Typography variant="caption">Hover over avatars to see effects</Typography>
      <Stack direction="row" spacing={2}>
        <Avatar {...args} />
        <Avatar {...args} glow />
        <Avatar {...args} pulse />
        <Avatar {...args} bordered />
      </Stack>
    </Stack>
  ),
};

export const Responsive: Story = {
  name: '📱 Responsive',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Responsive Avatar Layout</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Avatar size="xs" fallback="A" />
          <Avatar size="sm" fallback="B" />
          <Avatar size="md" fallback="C" />
          <Avatar size="lg" fallback="D" />
        </Stack>
        <AvatarGroup max={3}>
          <Avatar fallback="U1" />
          <Avatar fallback="U2" />
          <Avatar fallback="U3" />
          <Avatar fallback="U4" />
          <Avatar fallback="U5" />
        </AvatarGroup>
      </Stack>
    </Box>
  ),
};

export const AllSizesWithEffects: Story = {
  render: () => (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" sx={{ width: 80 }}>
          Normal:
        </Typography>
        <Avatar size="xs" fallback="XS" />
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
        <Avatar size="xl" fallback="XL" />
        <Avatar size="xxl" fallback="XXL" />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" sx={{ width: 80 }}>
          Glow:
        </Typography>
        <Avatar size="xs" fallback="XS" glow color="primary" />
        <Avatar size="sm" fallback="SM" glow color="secondary" />
        <Avatar size="md" fallback="MD" glow color="success" />
        <Avatar size="lg" fallback="LG" glow color="warning" />
        <Avatar size="xl" fallback="XL" glow color="error" />
        <Avatar size="xxl" fallback="XXL" glow color="neutral" />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" sx={{ width: 80 }}>
          Pulse:
        </Typography>
        <Avatar size="xs" fallback="XS" pulse color="primary" />
        <Avatar size="sm" fallback="SM" pulse color="secondary" />
        <Avatar size="md" fallback="MD" pulse color="success" />
        <Avatar size="lg" fallback="LG" pulse color="warning" />
        <Avatar size="xl" fallback="XL" pulse color="error" />
        <Avatar size="xxl" fallback="XXL" pulse color="neutral" />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" sx={{ width: 80 }}>
          Interactive:
        </Typography>
        <Avatar size="xs" fallback="XS" interactive />
        <Avatar size="sm" fallback="SM" interactive />
        <Avatar size="md" fallback="MD" interactive />
        <Avatar size="lg" fallback="LG" interactive />
        <Avatar size="xl" fallback="XL" interactive />
        <Avatar size="xxl" fallback="XXL" interactive />
      </Stack>
    </Stack>
  ),
};

// Responsive Layout
export const ResponsiveGrid: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(4, 1fr)',
            sm: 'repeat(6, 1fr)',
            md: 'repeat(8, 1fr)',
          },
          gap: 2,
        }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <Avatar
            key={i}
            fallback={`U${i + 1}`}
            color={
              ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'][i % 6] as
                | 'primary'
                | 'secondary'
                | 'success'
                | 'warning'
                | 'error'
                | 'neutral'
            }
            interactive
          />
        ))}
      </Box>
    </Box>
  ),
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Keyboard Navigation & Screen Reader Support</Typography>
      <Stack direction="row" spacing={2}>
        <Avatar
          fallback="KB"
          interactive
          onClick={() => window.alert('Avatar clicked!')}
          aria-label="Keyboard navigable avatar"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe - Senior Developer"
          interactive
          onClick={() => window.alert('John Doe clicked!')}
        />
        <Avatar
          icon={<Settings />}
          interactive
          onClick={() => window.alert('Settings clicked!')}
          aria-label="Settings avatar button"
        />
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Tab through the avatars and press Enter or Space to activate
      </Typography>
    </Stack>
  ),
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar fallback="" />
        <Typography variant="caption">Empty fallback</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar fallback="VERYLONGTEXT" />
        <Typography variant="caption">Long text overflow</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar fallback="🎉" />
        <Typography variant="caption">Emoji support</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar fallback="中文" />
        <Typography variant="caption">Unicode support</Typography>
      </Stack>
    </Stack>
  ),
};

// Performance Demo
export const PerformanceDemo: Story = {
  render: () => {
    const PerformanceTest = () => {
      const [count, setCount] = useState(50);
      return (
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <button onClick={() => setCount((c) => Math.max(0, c - 10))}>-10</button>
            <Typography>Count: {count}</Typography>
            <button onClick={() => setCount((c) => c + 10)}>+10</button>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              maxWidth: 600,
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            {Array.from({ length: count }, (_, i) => (
              <Avatar
                key={i}
                fallback={`${i}`}
                size="sm"
                color={
                  ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'][i % 6] as
                    | 'primary'
                    | 'secondary'
                    | 'success'
                    | 'warning'
                    | 'error'
                    | 'neutral'
                }
                animationDelay={i * 10}
              />
            ))}
          </Box>
        </Stack>
      );
    };
    return <PerformanceTest />;
  },
};
