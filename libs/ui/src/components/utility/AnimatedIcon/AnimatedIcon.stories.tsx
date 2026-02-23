import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  AccountCircle,
  AutoAwesome,
  Bolt,
  Diamond,
  Download,
  Favorite,
  FlashOn,
  Home,
  Lens,
  Lightbulb,
  Notifications,
  Psychology,
  Refresh,
  Rocket,
  Search,
  Settings,
  Star,
  Upload,
  Waves,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { AnimatedIcon } from './AnimatedIcon';

const meta: Meta<typeof AnimatedIcon> = {
  title: 'Enhanced/AnimatedIcon',
  component: AnimatedIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Advanced animated icon wrapper with 17 animation variants and multiple visual effects including glow, glass morphism, metallic, gradient, neon, and holographic styles.',
      },
    },
  },
  tags: ['autodocs', 'component:AnimatedIcon'],
  argTypes: {
    children: {
      control: false,
      description: 'Icon element to animate - can be any React node (MUI icon, SVG, etc.)',
    },
    variant: {
      control: 'select',
      options: [
        'none',
        'rotate',
        'pulse',
        'translate',
        'bounce',
        'shake',
        'flip',
        'spin',
        'fadeInOut',
        'heartbeat',
        'wobble',
        'morph',
        'swing',
        'float',
        'jello',
        'neonFlicker',
        'breathe',
      ],
      description: 'Animation variant to apply',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the animated icon container',
    },
    color: {
      control: 'color',
      description: 'Custom color override for the icon',
    },
    duration: {
      control: { type: 'range', min: 0.5, max: 5, step: 0.5 },
      description: 'Animation duration in seconds',
    },
    delay: {
      control: { type: 'range', min: 0, max: 3, step: 0.5 },
      description: 'Animation delay in seconds',
    },
    loop: {
      control: 'boolean',
      description: 'Whether the animation should loop infinitely',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect around the icon',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
    glowColor: {
      control: 'color',
      description: 'Glow color (only used when glow is true)',
    },
    metallic: {
      control: 'boolean',
      description: 'Enable metallic appearance',
    },
    gradient: {
      control: 'boolean',
      description: 'Enable gradient background',
    },
    shadow: {
      control: 'select',
      options: ['none', 'soft', 'hard', 'elevated'],
      description: 'Shadow style for the icon',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect overlay',
    },
    neon: {
      control: 'boolean',
      description: 'Enable neon glow effect',
    },
    holographic: {
      control: 'boolean',
      description: 'Enable holographic rainbow effect',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Required Default story
export const Default: Story = {
  args: {
    children: <Star />,
  },
};

export const Playground: Story = {
  args: {
    children: <Star />,
    variant: 'spin',
    size: 'lg',
    duration: 2,
    glow: true,
    glowColor: '#FFD700',
  },
};

// Showcase all animation variants
// Comprehensive showcase of all animation variants
export const AllVariants: Story = {
  args: {},
  render: () => {
    const variants = [
      { variant: 'none', icon: <Home />, description: 'No animation, static display' },
      { variant: 'rotate', icon: <Refresh />, description: 'Continuous rotation animation' },
      { variant: 'pulse', icon: <Favorite />, description: 'Scale pulsing effect' },
      { variant: 'translate', icon: <Star />, description: 'Vertical translation movement' },
      { variant: 'bounce', icon: <Download />, description: 'Bouncing with gravity effect' },
      { variant: 'shake', icon: <Notifications />, description: 'Horizontal shaking motion' },
      { variant: 'flip', icon: <AccountCircle />, description: '3D flip rotation effect' },
      { variant: 'spin', icon: <Settings />, description: 'Rotating with scale change' },
      { variant: 'fadeInOut', icon: <Search />, description: 'Opacity fade animation' },
      { variant: 'heartbeat', icon: <Favorite />, description: 'Double pulse heartbeat' },
      { variant: 'wobble', icon: <Diamond />, description: 'Wobbly side-to-side motion' },
      { variant: 'morph', icon: <Lens />, description: 'Shape morphing animation' },
      { variant: 'swing', icon: <Lightbulb />, description: 'Pendulum swing motion' },
      { variant: 'float', icon: <Rocket />, description: 'Floating in space effect' },
      { variant: 'jello', icon: <AutoAwesome />, description: 'Jelly-like elastic bounce' },
      { variant: 'neonFlicker', icon: <Bolt />, description: 'Neon sign flicker effect' },
      { variant: 'breathe', icon: <Psychology />, description: 'Gentle breathing pulse' },
    ] as const;

    return (
      <Grid container spacing={3}>
        {variants.map(({ variant, icon, description }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={variant}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <AnimatedIcon variant={variant} size="lg">
                {icon}
              </AnimatedIcon>
              <Typography
                variant="h6"
                sx={{ mt: 2, textTransform: 'capitalize', fontWeight: 'bold' }}
              >
                {variant === 'none' ? 'Static' : variant.replace(/([A-Z])/g, ' $1').trim()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  },
};

// New comprehensive animation showcase
export const AllAnimationVariants: Story = {
  args: {},
  render: () => {
    const variants = [
      { variant: 'rotate', icon: <Refresh />, description: 'Continuous rotation' },
      { variant: 'pulse', icon: <Favorite />, description: 'Scale pulsing' },
      { variant: 'translate', icon: <Upload />, description: 'Vertical movement' },
      { variant: 'bounce', icon: <Download />, description: 'Bouncing effect' },
      { variant: 'shake', icon: <Notifications />, description: 'Horizontal shake' },
      { variant: 'flip', icon: <AccountCircle />, description: '3D flip rotation' },
      { variant: 'spin', icon: <Settings />, description: 'Spin with scale' },
      { variant: 'fadeInOut', icon: <Star />, description: 'Opacity fade' },
      { variant: 'heartbeat', icon: <Favorite />, description: 'Double pulse' },
      { variant: 'wobble', icon: <Home />, description: 'Wobbly motion' },
      { variant: 'morph', icon: <Lens />, description: 'Shape morphing' },
      { variant: 'swing', icon: <Notifications />, description: 'Pendulum swing' },
      { variant: 'float', icon: <Rocket />, description: 'Floating in space' },
      { variant: 'jello', icon: <Diamond />, description: 'Jelly elastic' },
      { variant: 'neonFlicker', icon: <Bolt />, description: 'Neon flicker' },
      { variant: 'breathe', icon: <Psychology />, description: 'Gentle breathing' },
    ] as const;

    return (
      <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
        {variants.map(({ variant, icon, description }) => (
          <Grid item xs={6} sm={4} md={3} key={variant}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <AnimatedIcon variant={variant} size="lg">
                {icon}
              </AnimatedIcon>
              <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                {variant}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  },
};

// Visual Effects Showcase
export const VisualEffects: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Visual Effects Gallery</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', background: '#1a1a1a' }}>
            <AnimatedIcon variant="pulse" size="lg" glow glowColor="#FFD700">
              <Star />
            </AnimatedIcon>
            <Typography variant="subtitle1" sx={{ mt: 2, color: 'common.white' }}>
              Glow Effect
            </Typography>
            <Typography variant="caption" sx={{ color: 'gray' }}>
              Radiant aura animation
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <AnimatedIcon variant="rotate" size="lg" glass>
              <Diamond />
            </AnimatedIcon>
            <Typography variant="subtitle1" sx={{ mt: 2, color: 'common.white' }}>
              Glass Morphism
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Frosted glass effect
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="spin" size="lg" metallic>
              <Settings />
            </AnimatedIcon>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Metallic
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Chrome-like finish
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="float" size="lg" gradient>
              <Rocket />
            </AnimatedIcon>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Gradient
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Color gradient background
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', background: '#0a0a0a' }}>
            <AnimatedIcon variant="neonFlicker" size="lg" neon color="#00ffff">
              <Bolt />
            </AnimatedIcon>
            <Typography variant="subtitle1" sx={{ mt: 2, color: '#00ffff' }}>
              Neon
            </Typography>
            <Typography variant="caption" sx={{ color: 'gray' }}>
              Electric neon glow
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', background: '#1a0033' }}>
            <AnimatedIcon variant="breathe" size="lg" holographic>
              <AutoAwesome />
            </AnimatedIcon>
            <Typography variant="subtitle1" sx={{ mt: 2, color: 'common.white' }}>
              Holographic
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Rainbow shimmer
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  ),
};

// Shadow Styles
export const ShadowStyles: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Shadow Variations</Typography>
      <Grid container spacing={3}>
        {(['none', 'soft', 'hard', 'elevated'] as const).map((shadow) => (
          <Grid item xs={6} sm={3} key={shadow}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <AnimatedIcon variant="pulse" size="lg" shadow={shadow}>
                <Lightbulb />
              </AnimatedIcon>
              <Typography variant="subtitle2" sx={{ mt: 2, textTransform: 'capitalize' }}>
                {shadow === 'none' ? 'No Shadow' : `${shadow} Shadow`}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  ),
};

// Combined Effects
export const CombinedEffects: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Combined Effects</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <AnimatedIcon variant="spin" size="lg" glow glass glowColor="#ffffff">
              <Diamond />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2, color: 'common.white' }}>
              Glass + Glow + Spin
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', background: '#0f0f0f' }}>
            <AnimatedIcon variant="float" size="lg" neon ripple color="#ff00ff">
              <FlashOn />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2, color: '#ff00ff' }}>
              Neon + Ripple + Float
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="heartbeat" size="lg" gradient shadow="elevated">
              <Favorite />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Gradient + Shadow + Heartbeat
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="wobble" size="lg" metallic shadow="hard">
              <Settings />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Metallic + Hard Shadow + Wobble
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            }}
          >
            <AnimatedIcon variant="morph" size="lg" holographic glow>
              <AutoAwesome />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2, color: 'common.white' }}>
              Holographic + Glow + Morph
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="jello" size="lg" glass ripple shadow="soft">
              <Waves />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Glass + Ripple + Soft Shadow
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  args: {},
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<string>('spin');
    const [effects, setEffects] = React.useState({
      glow: false,
      glass: false,
      metallic: false,
      gradient: false,
      neon: false,
      holographic: false,
      ripple: false,
    });

    const toggleEffect = (effect: keyof typeof effects) => {
      setEffects((prev) => ({ ...prev, [effect]: !prev[effect] }));
    };

    return (
      <Stack spacing={4} sx={{ minWidth: 600 }}>
        <Typography variant="h5">Interactive Playground</Typography>

        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedIcon
            variant={selectedVariant}
            size="xl"
            {...effects}
            shadow={effects.metallic ? 'hard' : effects.glass ? 'soft' : 'none'}
            color={effects.neon ? '#00ff00' : undefined}
          >
            <Star />
          </AnimatedIcon>
        </Paper>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Animation Variant
          </Typography>
          <Grid container spacing={1}>
            {['spin', 'pulse', 'bounce', 'float', 'heartbeat', 'wobble', 'neonFlicker'].map(
              (variant) => (
                <Grid item key={variant}>
                  <Chip
                    label={variant}
                    onClick={() => setSelectedVariant(variant)}
                    color={selectedVariant === variant ? 'primary' : 'default'}
                    variant={selectedVariant === variant ? 'filled' : 'outlined'}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Visual Effects
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(effects).map((effect) => (
              <Grid item key={effect}>
                <Chip
                  label={effect}
                  onClick={() => toggleEffect(effect as keyof typeof effects)}
                  color={effects[effect as keyof typeof effects] ? 'secondary' : 'default'}
                  variant={effects[effect as keyof typeof effects] ? 'filled' : 'outlined'}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    );
  },
};

// Use Cases
export const UseCases: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Real-World Use Cases</Typography>

      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="rotate" size="md" color="#ffffff" glass>
            <Refresh />
          </AnimatedIcon>
          <Box>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Loading State
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Processing your request...
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="heartbeat" size="md" color="#ffffff" glow>
            <Favorite />
          </AnimatedIcon>
          <Box>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Like Animation
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Double-tap to like this post
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, background: '#0f0f0f' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="neonFlicker" size="md" neon color="#00ffff">
            <Bolt />
          </AnimatedIcon>
          <Box>
            <Typography variant="h6" sx={{ color: '#00ffff' }}>
              Power Mode
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              High performance enabled
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="bounce" size="md" gradient shadow="elevated">
            <Download />
          </AnimatedIcon>
          <Box>
            <Typography variant="h6">Download Ready</Typography>
            <Typography variant="body2" color="text.secondary">
              Your file is ready to download
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="float" size="md" color="#ffffff" ripple>
            <Rocket />
          </AnimatedIcon>
          <Box>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Launch Ready
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Deployment in progress
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  ),
};

// Performance Demo
export const PerformanceDemo: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Performance Test - Multiple Animations</Typography>
      <Typography variant="body2" color="text.secondary">
        All animations running simultaneously with different timings
      </Typography>

      <Grid container spacing={2}>
        {Array.from({ length: 20 }, (_, i) => {
          const variants = ['spin', 'pulse', 'bounce', 'float', 'wobble', 'heartbeat'] as const;
          const variant = variants[i % variants.length];
          const duration = 1 + (i % 4) * 0.5;

          return (
            <Grid item xs={3} sm={2} key={i}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <AnimatedIcon
                  variant={variant}
                  size="md"
                  duration={duration}
                  color={`hsl(${i * 18}, 70%, 50%)`}
                >
                  <Star />
                </AnimatedIcon>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {duration}s
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  ),
};

// Required AllSizes story
export const AllSizes: Story = {
  args: {},
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Typography variant="h5">Size Variations</Typography>
      <Grid container spacing={3} justifyContent="center">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Grid item key={size}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <AnimatedIcon variant="pulse" size={size}>
                <Star />
              </AnimatedIcon>
              <Typography variant="subtitle2" sx={{ mt: 2, textTransform: 'uppercase' }}>
                {size}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  ),
};

// Required AllStates story
export const AllStates: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">All Component States</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="none" size="lg">
              <Star />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Static State
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="rotate" size="lg">
              <Refresh />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Loading State
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="pulse" size="lg" glow glowColor="#4CAF50">
              <Favorite />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Active State
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="bounce" size="lg" color="#F44336">
              <Notifications />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Alert State
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', opacity: 0.5 }}>
            <AnimatedIcon variant="none" size="lg" color="#ccc">
              <Settings />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2, color: 'text.disabled' }}>
              Disabled State
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AnimatedIcon variant="heartbeat" size="lg" glow glowColor="#FF6B6B">
              <Bolt />
            </AnimatedIcon>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Success State
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  ),
};

// Required InteractiveStates story
export const InteractiveStates: Story = {
  args: {},
  render: () => {
    const [isActive, setIsActive] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <Stack spacing={4}>
        <Typography variant="h5">Interactive States</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <AnimatedIcon
                variant={isHovered ? 'pulse' : 'none'}
                size="lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer' }}
              >
                <Home />
              </AnimatedIcon>
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Hover to Activate
              </Typography>
              <Typography variant="caption" color="text.secondary">
                State: {isHovered ? 'Hovered' : 'Normal'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <AnimatedIcon
                variant={isActive ? 'spin' : 'none'}
                size="lg"
                glow={isActive}
                glowColor="#FFD700"
                onClick={() => setIsActive(!isActive)}
                style={{ cursor: 'pointer' }}
              >
                <Settings />
              </AnimatedIcon>
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Click to Toggle
              </Typography>
              <Typography variant="caption" color="text.secondary">
                State: {isActive ? 'Active' : 'Inactive'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <AnimatedIcon
                variant={isFocused ? 'heartbeat' : 'none'}
                size="lg"
                glass={isFocused}
                tabIndex={0}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ cursor: 'pointer', outline: isFocused ? '2px solid #1976d2' : 'none' }}
              >
                <Search />
              </AnimatedIcon>
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Focus with Tab
              </Typography>
              <Typography variant="caption" color="text.secondary">
                State: {isFocused ? 'Focused' : 'Unfocused'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    );
  },
};

// Required Responsive story
export const Responsive: Story = {
  args: {},
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Responsive Design</Typography>
      <Typography variant="body2" color="text.secondary">
        Icons adapt to different screen sizes and breakpoints
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr',
          },
          gap: 3,
        }}
      >
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <AnimatedIcon variant="pulse" size="lg" glow glowColor="#2196F3">
            <Star />
          </AnimatedIcon>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Mobile First
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Responsive sizing
          </Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <AnimatedIcon variant="rotate" size="lg">
            <Settings />
          </AnimatedIcon>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Fixed Large
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Always lg
          </Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <AnimatedIcon variant="bounce" size="md" glass>
            <Favorite />
          </AnimatedIcon>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Medium Glass
          </Typography>
          <Typography variant="caption" color="text.secondary">
            With glass effect
          </Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <AnimatedIcon variant="float" size="xl" gradient>
            <Rocket />
          </AnimatedIcon>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Extra Large
          </Typography>
          <Typography variant="caption" color="text.secondary">
            XL with gradient
          </Typography>
        </Paper>
      </Box>
    </Stack>
  ),
};
