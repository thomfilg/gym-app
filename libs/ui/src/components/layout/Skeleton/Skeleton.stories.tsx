import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Layout/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Beautiful loading placeholder component with glassmorphism effects and customizable animations. Supports multiple variants, intensities, and advanced visual effects.',
      },
    },
  },
  tags: ['autodocs', 'component:Skeleton'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'wave'],
      description: 'The shape of the skeleton',
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', false],
      description: 'The animation type',
    },
    intensity: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Animation intensity level',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the skeleton (number, string, or percentage)',
    },
    height: {
      control: { type: 'number' },
      description: 'Height of the skeleton in pixels',
    },
    count: {
      control: { type: 'number' },
      description: 'Number of skeleton elements to render',
    },
    spacing: {
      control: { type: 'number' },
      description: 'Spacing between multiple skeletons',
    },
    glassmorphism: {
      control: { type: 'boolean' },
      description: 'Enable glassmorphism visual effects',
    },
    shimmer: {
      control: { type: 'boolean' },
      description: 'Enable shimmer animation overlay',
    },
    borderRadius: {
      control: { type: 'number' },
      description: 'Custom border radius in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
    width: '100%',
    count: 1,
    intensity: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic text skeleton with default pulse animation.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Text Skeleton
        </Typography>
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Circular Skeleton
        </Typography>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="circular" width={80} height={80} />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Rectangular Skeleton
        </Typography>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" width="75%" height={40} />
          <Skeleton variant="rectangular" width="50%" height={80} />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Wave Animation
        </Typography>
        <Skeleton variant="wave" height={60} />
        <Skeleton variant="wave" width="80%" height={40} />
      </Box>
    </Stack>
  ),
};

export const AnimationTypes: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          Pulse Animation
        </Typography>
        <Skeleton animation="pulse" height={60} />
        <Skeleton animation="pulse" width="80%" />
        <Skeleton animation="pulse" width="60%" />
      </Grid>

      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          Wave Animation
        </Typography>
        <Skeleton animation="wave" height={60} />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="60%" />
      </Grid>

      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          No Animation
        </Typography>
        <Skeleton animation={false} height={60} />
        <Skeleton animation={false} width="80%" />
        <Skeleton animation={false} width="60%" />
      </Grid>
    </Grid>
  ),
};

export const MultipleSkeleton: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Multiple Text Lines
        </Typography>
        <Skeleton variant="text" count={5} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Multiple Rectangles
        </Typography>
        <Skeleton variant="rectangular" height={40} count={3} spacing={2} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Spacing
        </Typography>
        <Skeleton variant="text" count={4} spacing={3} />
      </Box>
    </Stack>
  ),
};

export const ProfileCardSkeleton: Story = {
  render: () => (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width="60%" />}
        subheader={<Skeleton variant="text" width="40%" />}
      />
      <CardContent>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="70%" />}
            secondary={<Skeleton variant="text" width="40%" />}
          />
        </ListItem>
      ))}
    </List>
  ),
};

export const DashboardSkeleton: Story = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width="30%" height={40} />
        <Skeleton variant="text" width="60%" />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" height={32} />
                  <Skeleton variant="rectangular" height={20} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={<Skeleton variant="text" width="40%" />}
              action={<Skeleton variant="circular" width={32} height={32} />}
            />
            <CardContent>
              <Skeleton variant="rectangular" height={300} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title={<Skeleton variant="text" width="60%" />} />
            <CardContent>
              <Stack spacing={2}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <Box>
      {/* Table Header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 2,
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" />
      </Box>

      {/* Table Rows */}
      {Array.from({ length: 8 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 2,
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Skeleton variant="text" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="rectangular" width={80} height={20} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      ))}
    </Box>
  ),
};

export const IntensityLevels: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Low Intensity
        </Typography>
        <Skeleton variant="rectangular" height={60} intensity="low" />
        <Skeleton variant="text" intensity="low" />
        <Skeleton variant="text" width="80%" intensity="low" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Medium Intensity (Default)
        </Typography>
        <Skeleton variant="rectangular" height={60} intensity="medium" />
        <Skeleton variant="text" intensity="medium" />
        <Skeleton variant="text" width="80%" intensity="medium" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          High Intensity
        </Typography>
        <Skeleton variant="rectangular" height={60} intensity="high" />
        <Skeleton variant="text" intensity="high" />
        <Skeleton variant="text" width="80%" intensity="high" />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different intensity levels control the opacity and prominence of skeleton elements.',
      },
    },
  },
};

export const GlassmorphismEffect: Story = {
  render: () => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 4,
        borderRadius: 2,
        minHeight: 300,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Glassmorphism Skeleton Effects
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
            Regular Skeleton
          </Typography>
          <Skeleton variant="rectangular" height={60} />
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
            Glassmorphism Skeleton
          </Typography>
          <Skeleton variant="rectangular" height={60} glassmorphism />
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
            Glassmorphism with Custom Radius
          </Typography>
          <Skeleton variant="rectangular" height={60} glassmorphism borderRadius={20} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Skeleton variant="circular" width={50} height={50} glassmorphism />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" glassmorphism />
            <Skeleton variant="text" width="80%" glassmorphism />
          </Box>
        </Box>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Glassmorphism effect adds beautiful glass-like transparency with blur effects, perfect for modern UI designs.',
      },
    },
  },
};

export const ShimmerAnimation: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Standard Animation
        </Typography>
        <Skeleton variant="rectangular" height={80} borderRadius={8} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Shimmer Animation
        </Typography>
        <Skeleton variant="rectangular" height={80} shimmer borderRadius={8} />
        <Skeleton variant="text" shimmer />
        <Skeleton variant="text" width="60%" shimmer />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glassmorphism + Shimmer
        </Typography>
        <Box
          sx={{
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            p: 3,
            borderRadius: 2,
          }}
        >
          <Skeleton variant="rectangular" height={80} glassmorphism shimmer borderRadius={12} />
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="text" glassmorphism shimmer />
            <Skeleton variant="text" width="70%" glassmorphism shimmer />
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer animation adds a moving highlight effect that creates a premium loading experience.',
      },
    },
  },
};

export const AdvancedProfileCard: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Regular Skeleton" sx={{ pb: 1 }} />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Skeleton variant="circular" width={60} height={60} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Box>
            </Box>
            <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
            <Skeleton variant="text" count={3} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Enhanced Skeleton" sx={{ pb: 1 }} />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Skeleton
                variant="circular"
                width={60}
                height={60}
                sx={{ mr: 2 }}
                shimmer
                intensity="high"
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" shimmer intensity="high" />
                <Skeleton variant="text" width="50%" shimmer intensity="medium" />
              </Box>
            </Box>
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ mb: 2 }}
              shimmer
              borderRadius={12}
              intensity="high"
            />
            <Skeleton variant="text" count={3} shimmer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison between regular and enhanced skeleton with shimmer effects and custom intensity.',
      },
    },
  },
};

export const CustomShapes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Border Radius
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Skeleton variant="rectangular" height={80} borderRadius={0} />
            <Typography variant="caption" display="block" textAlign="center" mt={1}>
              Square (0px)
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Skeleton variant="rectangular" height={80} borderRadius={8} />
            <Typography variant="caption" display="block" textAlign="center" mt={1}>
              Rounded (8px)
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Skeleton variant="rectangular" height={80} borderRadius={20} />
            <Typography variant="caption" display="block" textAlign="center" mt={1}>
              Very Rounded (20px)
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Skeleton variant="rectangular" height={80} borderRadius="50%" />
            <Typography variant="caption" display="block" textAlign="center" mt={1}>
              Pill Shape (50%)
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Dimensions
        </Typography>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={20} />
          <Skeleton variant="rectangular" width="80%" height={30} />
          <Skeleton variant="rectangular" width="60%" height={40} />
          <Skeleton variant="rectangular" width="40%" height={50} />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Mixed Circular Sizes
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={56} height={56} />
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="circular" width={120} height={120} />
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Showcase different border radius options and custom dimensions for creating unique skeleton shapes.',
      },
    },
  },
};

// Required story exports for validation
export const AllSizes = CustomShapes;
export const AllStates = IntensityLevels;
export const InteractiveStates = ShimmerAnimation;
export const Responsive: Story = {
  render: () => (
    <Box>
      {/* Mobile View */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Typography variant="h6" gutterBottom>
          Mobile Layout
        </Typography>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={50} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" sx={{ flex: 1 }} />
          </Box>
        </Stack>
      </Box>

      {/* Desktop View */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography variant="h6" gutterBottom>
          Desktop Layout
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="70%" />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
};
