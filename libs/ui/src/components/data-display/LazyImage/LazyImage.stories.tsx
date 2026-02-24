import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { LazyImage } from './LazyImage';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LazyImage> = {
  title: 'DataDisplay/LazyImage',
  component: LazyImage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A high-performance image component with lazy loading, progressive enhancement, and error handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    width: {
      control: 'number',
      description: 'Image width',
    },
    height: {
      control: 'number',
      description: 'Image height',
    },
    loadingState: {
      control: 'select',
      options: ['skeleton', 'spinner', 'placeholder', 'none'],
      description: 'Type of loading indicator',
    },
    objectFit: {
      control: 'select',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: 'Object fit CSS property',
    },
    lazy: {
      control: 'boolean',
      description: 'Enable lazy loading',
    },
    fadeIn: {
      control: 'boolean',
      description: 'Enable fade-in animation',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LazyImage>;

// Sample images for stories
const SAMPLE_IMAGE = 'https://picsum.photos/800/600?random=1';
const SAMPLE_PLACEHOLDER = 'https://picsum.photos/80/60?random=1&blur=2';
const INVALID_IMAGE = 'https://invalid-url-that-will-fail.com/image.jpg';
const FALLBACK_IMAGE = 'https://via.placeholder.com/800x600/cccccc/666666?text=Fallback+Image';

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Sample image',
    width: 400,
    height: 300,
  },
};

export const WithSkeletonLoading: Story = {
  args: {
    src: `https://picsum.photos/600/400?random=${Date.now()}`,
    alt: 'Image with skeleton loading',
    width: 600,
    height: 400,
    loadingState: 'skeleton',
    skeletonProps: {
      animation: 'pulse',
      intensity: 'medium',
    },
  },
};

export const WithSpinnerLoading: Story = {
  args: {
    src: `https://picsum.photos/600/400?random=${Date.now() + 1}`,
    alt: 'Image with spinner loading',
    width: 600,
    height: 400,
    loadingState: 'spinner',
    spinnerProps: {
      size: 48,
      thickness: 4,
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: `https://picsum.photos/800/600?random=${Date.now() + 2}`,
    placeholder: SAMPLE_PLACEHOLDER,
    alt: 'Progressive loading with placeholder',
    width: 800,
    height: 600,
    loadingState: 'placeholder',
  },
};

export const WithErrorFallback: Story = {
  args: {
    src: INVALID_IMAGE,
    fallback: FALLBACK_IMAGE,
    alt: 'Image with fallback on error',
    width: 400,
    height: 300,
    retryOnError: true,
    maxRetries: 2,
  },
};

export const WithCustomFallback: Story = {
  args: {
    src: INVALID_IMAGE,
    fallback: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <BrokenImageIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          Image not available
        </Typography>
      </Box>
    ),
    alt: 'Image with custom fallback component',
    width: 400,
    height: 300,
  },
};

export const CircularImage: Story = {
  args: {
    src: 'https://picsum.photos/200/200?random=3',
    alt: 'Circular avatar',
    width: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export const RoundedCorners: Story = {
  args: {
    src: 'https://picsum.photos/600/400?random=4',
    alt: 'Rounded corners image',
    width: 600,
    height: 400,
    borderRadius: 16,
    loadingState: 'skeleton',
    skeletonProps: {
      animation: 'wave',
    },
  },
};

export const NoLazyLoading: Story = {
  args: {
    src: 'https://picsum.photos/800/400?random=5',
    alt: 'Eager loading image',
    width: 800,
    height: 400,
    lazy: false,
    fetchPriority: 'high',
    loading: 'eager',
  },
};

export const ObjectFitVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Object Fit Variants</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {(['fill', 'contain', 'cover', 'none', 'scale-down'] as const).map((fit) => (
          <Box key={fit}>
            <Typography variant="caption" gutterBottom>
              {fit}
            </Typography>
            <Box sx={{ width: 200, height: 150, border: '1px solid', borderColor: 'divider' }}>
              <LazyImage
                src="https://picsum.photos/300/400?random=6"
                alt={`Object fit ${fit}`}
                width="100%"
                height="100%"
                objectFit={fit}
                fadeIn={false}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  ),
};

export const LoadingStateComparison: Story = {
  render: () => {
    const uniqueId = Date.now();
    return (
      <Stack spacing={3}>
        <Typography variant="h6">Loading State Comparison</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Skeleton Loading
            </Typography>
            <LazyImage
              src={`https://picsum.photos/250/200?random=${uniqueId + 1}&delay=2000`}
              alt="Skeleton loading"
              width={250}
              height={200}
              loadingState="skeleton"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Spinner Loading
            </Typography>
            <LazyImage
              src={`https://picsum.photos/250/200?random=${uniqueId + 2}&delay=2000`}
              alt="Spinner loading"
              width={250}
              height={200}
              loadingState="spinner"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Placeholder Loading
            </Typography>
            <LazyImage
              src={`https://picsum.photos/250/200?random=${uniqueId + 3}&delay=2000`}
              placeholder="https://picsum.photos/25/20?random=1&blur=2"
              alt="Placeholder loading"
              width={250}
              height={200}
              loadingState="placeholder"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              No Loading Indicator
            </Typography>
            <LazyImage
              src={`https://picsum.photos/250/200?random=${uniqueId + 4}&delay=2000`}
              alt="No loading indicator"
              width={250}
              height={200}
              loadingState="none"
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};

export const Gallery: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Image Gallery with Lazy Loading</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <LazyImage
            key={index}
            src={`https://picsum.photos/200/200?random=${index + 100}`}
            alt={`Gallery image ${index + 1}`}
            width="100%"
            height={200}
            objectFit="cover"
            borderRadius={8}
            loadingState="skeleton"
            skeletonProps={{
              animation: 'wave',
              intensity: 'low',
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary">
        Scroll down to see lazy loading in action
      </Typography>
    </Stack>
  ),
};

export const WithEventCallbacks: Story = {
  args: {
    src: 'https://picsum.photos/600/400?random=7',
    alt: 'Image with event callbacks',
    width: 600,
    height: 400,
    onLoadStart: () => {
      // eslint-disable-next-line no-console
      console.info('🚀 Started loading image');
    },
    onLoad: (event) => {
      // eslint-disable-next-line no-console
      console.info('✅ Image loaded successfully', event);
    },
    onError: (event) => {
      // eslint-disable-next-line no-console
      console.error('❌ Image failed to load', event);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Open browser console to see event callbacks in action',
      },
    },
  },
};

export const ResponsiveImage: Story = {
  args: {
    src: 'https://picsum.photos/1200/800?random=8',
    alt: 'Responsive image',
    width: '100%',
    height: 'auto',
    sx: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
};

const hoverSx: SxProps<Theme> = {
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
};

export const HoverEffects: Story = {
  args: {
    src: 'https://picsum.photos/400/300?random=9',
    alt: 'Image with hover effects',
    width: 400,
    height: 300,
    borderRadius: 12,
    sx: hoverSx,
  },
};

export const AccessibleImage: Story = {
  args: {
    src: 'https://picsum.photos/600/400?random=10',
    alt: 'A beautiful landscape photo showing mountains at sunset',
    'aria-label': 'Scenic mountain landscape',
    'aria-describedby': 'image-description',
    role: 'img',
    width: 600,
    height: 400,
  },
  render: (args) => (
    <Stack spacing={2}>
      <LazyImage {...args} />
      <Typography id="image-description" variant="caption">
        This image shows a stunning mountain landscape during golden hour, with peaks silhouetted against a colorful sky.
      </Typography>
    </Stack>
  ),
};