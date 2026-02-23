import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from './AspectRatio';
import type { AspectRatioVariant } from './AspectRatio.types';

const meta: Meta<typeof AspectRatio> = {
  title: 'Utility/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs', 'component:AspectRatio'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A utility component that maintains consistent aspect ratios for content, perfect for images, videos, and responsive layouts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', '3:2', '21:9', 'custom'],
      description: 'Predefined aspect ratio variants',
    },
    ratio: {
      control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
      description: 'Custom aspect ratio (width/height) when variant is "custom"',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const DemoContent = ({ title, color }: { title: string; color: string }) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      bgcolor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      textAlign: 'center',
    }}
  >
    {title}
  </Box>
);

export const Default: Story = {
  args: {
    variant: '16:9',
    maxWidth: 400,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <DemoContent title="16:9 Aspect Ratio" color="#1976d2" />
    </AspectRatio>
  ),
};

export const Standard16x9: Story = {
  args: {
    variant: '16:9',
    maxWidth: 400,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <DemoContent title="16:9 Aspect Ratio" color="#1976d2" />
    </AspectRatio>
  ),
};

export const Square1x1: Story = {
  args: {
    variant: '1:1',
    maxWidth: 300,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <DemoContent title="1:1 Square" color="#388e3c" />
    </AspectRatio>
  ),
};

export const Classic4x3: Story = {
  args: {
    variant: '4:3',
    maxWidth: 400,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <DemoContent title="4:3 Classic" color="#f57c00" />
    </AspectRatio>
  ),
};

export const Ultrawide21x9: Story = {
  args: {
    variant: '21:9',
    maxWidth: 500,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <DemoContent title="21:9 Ultrawide" color="#7b1fa2" />
    </AspectRatio>
  ),
};

export const CustomRatio: Story = {
  args: {
    variant: 'custom',
    ratio: 2.5,
    maxWidth: 400,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <DemoContent title={`Custom ${args.ratio}:1`} color="#d32f2f" />
    </AspectRatio>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants: Array<{ variant: AspectRatioVariant; title: string; color: string }> = [
      { variant: '16:9', title: '16:9 Video', color: '#1976d2' },
      { variant: '4:3', title: '4:3 Classic', color: '#388e3c' },
      { variant: '1:1', title: '1:1 Square', color: '#f57c00' },
      { variant: '3:2', title: '3:2 Photo', color: '#7b1fa2' },
      { variant: '21:9', title: '21:9 Cinema', color: '#d32f2f' },
    ];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 3,
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {variants.map(({ variant, title, color }) => (
          <Box key={variant}>
            <Typography variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <AspectRatio variant={variant}>
              <DemoContent title={title} color={color} />
            </AspectRatio>
          </Box>
        ))}
      </Box>
    );
  },
};

export const WithImages: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 3,
        maxWidth: 900,
      }}
    >
      <Card>
        <AspectRatio variant="16:9">
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=225&fit=crop"
            alt="Breakfast"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AspectRatio>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            16:9 Image
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Perfect for video thumbnails and hero images.
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <AspectRatio variant="1:1">
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=300&fit=crop"
            alt="Burger"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AspectRatio>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            1:1 Square
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ideal for profile pictures and Instagram-style content.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  ),
};

export const ResponsiveGallery: Story = {
  render: () => {
    const images = [
      {
        src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=300',
        alt: 'Food 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300',
        alt: 'Food 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=300',
        alt: 'Food 3',
      },
      {
        src: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&h=300',
        alt: 'Food 4',
      },
      {
        src: 'https://images.unsplash.com/photo-1533725602536-5d0c7ff2f42b?w=400&h=300',
        alt: 'Food 5',
      },
      {
        src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300',
        alt: 'Food 6',
      },
    ];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
          maxWidth: 800,
        }}
      >
        {images.map((image, index) => (
          <AspectRatio key={index} variant="4:3">
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 1,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </AspectRatio>
        ))}
      </Box>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <AspectRatio variant="16:9" maxWidth={150}>
          <DemoContent title="Small" color="#1976d2" />
        </AspectRatio>
        <AspectRatio variant="16:9" maxWidth={250}>
          <DemoContent title="Medium" color="#388e3c" />
        </AspectRatio>
        <AspectRatio variant="16:9" maxWidth={400}>
          <DemoContent title="Large" color="#f57c00" />
        </AspectRatio>
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Default State
        </Typography>
        <AspectRatio variant="16:9" maxWidth={250}>
          <DemoContent title="Default" color="#1976d2" />
        </AspectRatio>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Max Constraints
        </Typography>
        <AspectRatio variant="16:9" maxWidth={200} maxHeight={150}>
          <DemoContent title="Constrained" color="#388e3c" />
        </AspectRatio>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Custom Ratio
        </Typography>
        <AspectRatio variant="custom" ratio={3} maxWidth={250}>
          <DemoContent title="3:1 Custom" color="#f57c00" />
        </AspectRatio>
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Hover Effect
        </Typography>
        <AspectRatio variant="16:9" maxWidth={250}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#1565c0',
                transform: 'scale(0.98)',
              },
            }}
          >
            Hover Me
          </Box>
        </AspectRatio>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Clickable Content
        </Typography>
        <AspectRatio variant="1:1" maxWidth={200}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: '#388e3c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              userSelect: 'none',
              '&:active': {
                bgcolor: '#2e7d32',
                transform: 'scale(0.98)',
              },
            }}
          >
            Interactive
          </Box>
        </AspectRatio>
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>
        Responsive Grid Layout
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <AspectRatio key={i} variant="4:3">
            <DemoContent
              title={`Item ${i + 1}`}
              color={['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#d32f2f', '#0288d1'][i]}
            />
          </AspectRatio>
        ))}
      </Box>
    </Box>
  ),
};
