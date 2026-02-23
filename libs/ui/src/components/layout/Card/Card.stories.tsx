import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  Edit,
  Email,
  Favorite,
  LocationOn,
  MoreVert,
  Phone,
  Share,
  ShoppingCart,
  Star,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DensityProvider } from '../../../utils/density/DensityProvider';
import { Card, CardActions, CardContent, CardHeader, CardMedia } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:Card'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'glass', 'gradient', 'neumorphic'],
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    interactive: {
      control: { type: 'boolean' },
    },
    glow: {
      control: { type: 'boolean' },
    },
    density: {
      control: { type: 'select' },
      options: ['compact', 'normal', 'spacious'],
      description: 'Density mode for responsive sizing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'elevated',
    interactive: false,
    glow: false,
    borderRadius: 'md',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Default Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a basic card with default styling. It can contain any content and serves as a
          container for related information.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="elevated" sx={{ height: '100%' }}>
          <CardHeader title="Elevated Card" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Classic elevated card with shadow depth for visual hierarchy.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardHeader title="Outlined Card" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Clean outlined card with subtle borders for minimal design.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="glass" sx={{ height: '100%' }}>
          <CardHeader title="Glass Card" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Modern glass morphism effect with backdrop blur and transparency.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="gradient" sx={{ height: '100%' }}>
          <CardHeader title="Gradient Card" />
          <CardContent>
            <Typography variant="body2">
              Eye-catching gradient background with beautiful color transitions.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="neumorphic" sx={{ height: '100%' }}>
          <CardHeader title="Neumorphic Card" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Soft neumorphic design with subtle shadows and highlights.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="elevated" interactive>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Interactive Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hover over this card to see the interactive effects.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="glass" interactive glow>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Glowing Glass Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card combines glass effect with glow and interactivity.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="neumorphic" interactive>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Interactive Neumorphic
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Neumorphic design that responds to hover interactions.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ),
};

export const BorderRadiusVariations: Story = {
  render: () => (
    <Grid container spacing={2}>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((radius) => (
        <Grid item xs={6} sm={4} md={2.4} key={radius}>
          <Card variant="outlined" borderRadius={radius}>
            <CardContent>
              <Typography variant="subtitle2" align="center">
                {radius.toUpperCase()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" interactive sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop"
        title="Product Image"
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" component="div">
            Premium Headphones
          </Typography>
          <Chip label="New" color="primary" size="small" />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Star sx={{ color: 'orange', fontSize: 16 }} />
          <Typography variant="body2" color="text.secondary">
            4.8 (324 reviews)
          </Typography>
        </Stack>
        <Typography variant="h5" color="primary" fontWeight="bold" mb={1}>
          $199.99
        </Typography>
        <Typography variant="body2" color="text.secondary">
          High-quality wireless headphones with noise cancellation and premium sound quality.
        </Typography>
      </CardContent>
      <CardActions alignment="space-between">
        <Stack direction="row" spacing={1}>
          <IconButton size="small">
            <Favorite />
          </IconButton>
          <IconButton size="small">
            <Share />
          </IconButton>
        </Stack>
        <Button variant="contained" startIcon={<ShoppingCart />} size="small">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card variant="glass" sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>JS</Avatar>}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title="John Smith"
        subtitle="Senior Software Engineer"
      />
      <CardContent>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">San Francisco, CA</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2">john.smith@example.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2">+1 (555) 123-4567</Typography>
          </Box>
          <Stack direction="row" spacing={1} mt={2}>
            <Chip label="React" size="small" variant="outlined" />
            <Chip label="TypeScript" size="small" variant="outlined" />
            <Chip label="Node.js" size="small" variant="outlined" />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions alignment="space-between">
        <Button variant="outlined" startIcon={<Edit />}>
          Edit
        </Button>
        <Button variant="contained">Contact</Button>
      </CardActions>
    </Card>
  ),
};

export const DashboardCard: Story = {
  render: () => (
    <Card variant="neumorphic" sx={{ minWidth: 300 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Revenue</Typography>
          <Chip label="+12%" color="success" size="small" />
        </Stack>
        <Typography variant="h3" color="primary" fontWeight="bold" mb={1}>
          $24,596
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Total revenue this month
        </Typography>
        <Box
          sx={{
            height: 4,
            backgroundColor: 'grey.200',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '68%',
              height: '100%',
              backgroundColor: 'primary.main',
              borderRadius: 2,
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" mt={1}>
          68% of monthly goal
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="elevated" sx={{ padding: 0 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Small Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Compact size with minimal padding for tight spaces.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="elevated" sx={{ padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Medium Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Standard size with balanced padding for most use cases.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card variant="elevated" sx={{ padding: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Large Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Spacious card with extra padding for important content.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card variant="elevated">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Default
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Normal state card
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card variant="elevated" sx={{ '&:hover': { boxShadow: 6 } }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Hover
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hover over this card
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card variant="elevated" sx={{ opacity: 0.6, pointerEvents: 'none' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Disabled
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Disabled state card
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card variant="elevated" loading>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">Loading</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: 'pulse 1.4s infinite',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: 'pulse 1.4s infinite 0.2s',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: 'pulse 1.4s infinite 0.4s',
                  }}
                />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Loading content...
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Responsive Card Layout
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Resize your browser to see how cards adapt to different screen sizes
      </Typography>

      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant="elevated">
            <CardContent>
              <Typography variant="h6">Mobile First</Typography>
              <Typography variant="body2" color="text.secondary">
                Full width on mobile, adapts to grid on larger screens
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Flexible Grid</Typography>
              <Typography variant="body2" color="text.secondary">
                12 cols on xs, 6 on sm, 4 on md, 3 on lg
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant="glass">
            <CardContent>
              <Typography variant="h6">Responsive Spacing</Typography>
              <Typography variant="body2" color="text.secondary">
                Spacing adjusts based on screen size
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant="gradient">
            <CardContent>
              <Typography variant="h6">Adaptive Content</Typography>
              <Typography variant="body2">
                Content flows naturally within responsive containers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  ),
};

export const ComplexLayoutCard: Story = {
  render: () => (
    <Card variant="elevated" sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="160"
        image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=160&fit=crop"
        title="Event Location"
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Tech Conference 2024
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              March 15-17, 2024
            </Typography>
          </Box>
          <Chip label="Premium Event" color="primary" />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">Convention Center, San Francisco</Typography>
        </Stack>

        <Typography variant="body1" mb={2}>
          Join industry leaders for three days of cutting-edge technology discussions, networking
          opportunities, and hands-on workshops.
        </Typography>

        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2} mb={2}>
          <Box textAlign="center">
            <Typography variant="h6" color="primary">
              50+
            </Typography>
            <Typography variant="caption">Speakers</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" color="primary">
              200+
            </Typography>
            <Typography variant="caption">Attendees</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" color="primary">
              3
            </Typography>
            <Typography variant="caption">Days</Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip label="AI/ML" size="small" />
          <Chip label="Web3" size="small" />
          <Chip label="Cloud" size="small" />
          <Chip label="DevOps" size="small" />
        </Stack>
      </CardContent>
      <CardActions alignment="space-between">
        <Stack direction="row" spacing={1}>
          <Typography variant="h6" color="primary">
            $299
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            $399
          </Typography>
        </Stack>
        <Button variant="contained" size="large">
          Register Now
        </Button>
      </CardActions>
    </Card>
  ),
};

export const DensityCompact: Story = {
  render: () => (
    <Card variant="elevated" sx={{ maxWidth: 345 }}>
      <CardHeader density="compact" title="Compact Header" subtitle="Less padding" />
      <CardContent density="compact">
        <Typography variant="body2" color="text.secondary">
          This card uses compact density for tighter spacing, ideal for data-dense interfaces.
        </Typography>
      </CardContent>
      <CardActions density="compact">
        <Button size="small">Action</Button>
      </CardActions>
    </Card>
  ),
};

export const DensityNormal: Story = {
  render: () => (
    <Card variant="elevated" sx={{ maxWidth: 345 }}>
      <CardHeader density="normal" title="Normal Header" subtitle="Standard padding" />
      <CardContent density="normal">
        <Typography variant="body2" color="text.secondary">
          This card uses normal density for balanced spacing, suitable for most use cases.
        </Typography>
      </CardContent>
      <CardActions density="normal">
        <Button size="small">Action</Button>
      </CardActions>
    </Card>
  ),
};

export const DensitySpacious: Story = {
  render: () => (
    <Card variant="elevated" sx={{ maxWidth: 345 }}>
      <CardHeader density="spacious" title="Spacious Header" subtitle="Extra padding" />
      <CardContent density="spacious">
        <Typography variant="body2" color="text.secondary">
          This card uses spacious density for increased readability and breathing room.
        </Typography>
      </CardContent>
      <CardActions density="spacious">
        <Button size="small">Action</Button>
      </CardActions>
    </Card>
  ),
};

export const AllDensities: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" gutterBottom>Compact</Typography>
        <Card variant="outlined">
          <CardHeader density="compact" title="Compact Card" />
          <CardContent density="compact">
            <Typography variant="body2" color="text.secondary">
              Tighter spacing for dense UIs.
            </Typography>
          </CardContent>
          <CardActions density="compact">
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" gutterBottom>Normal</Typography>
        <Card variant="outlined">
          <CardHeader density="normal" title="Normal Card" />
          <CardContent density="normal">
            <Typography variant="body2" color="text.secondary">
              Standard spacing for most cases.
            </Typography>
          </CardContent>
          <CardActions density="normal">
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" gutterBottom>Spacious</Typography>
        <Card variant="outlined">
          <CardHeader density="spacious" title="Spacious Card" />
          <CardContent density="spacious">
            <Typography variant="body2" color="text.secondary">
              Extra room for readability.
            </Typography>
          </CardContent>
          <CardActions density="spacious">
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 280 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Compact (0.8x)
          </Typography>
          <Card variant="elevated">
            <CardHeader title="Compact Card" subtitle="Tighter spacing" />
            <CardContent>
              <Typography variant="body2">
                Card content with compact density spacing.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 280 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Normal (1.0x)
          </Typography>
          <Card variant="elevated">
            <CardHeader title="Normal Card" subtitle="Standard spacing" />
            <CardContent>
              <Typography variant="body2">
                Card content with normal density spacing.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 280 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Spacious (1.25x)
          </Typography>
          <Card variant="elevated">
            <CardHeader title="Spacious Card" subtitle="Extra breathing room" />
            <CardContent>
              <Typography variant="body2">
                Card content with spacious density spacing.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};

export const DensityFromContext: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="subtitle2" gutterBottom>Context: Compact</Typography>
          <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardHeader title="From Context" subtitle="Inherits compact density" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Card content inherits density from DensityProvider context.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="subtitle2" gutterBottom>Context: Spacious</Typography>
          <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardHeader title="From Context" subtitle="Inherits spacious density" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Card content inherits density from DensityProvider context.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DensityProvider>
    </Box>
  ),
};
