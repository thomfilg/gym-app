import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Lightbox } from './Lightbox';
import type { LightboxItem } from './Lightbox.types';

const meta: Meta<typeof Lightbox> = {
  title: 'DataDisplay/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated lightbox component for showcasing media with advanced features like zoom, pan, autoplay, and filmstrip navigation.',
      },
    },
  },
  tags: ['autodocs', 'component:Lightbox'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Sample images for stories
const sampleImages: LightboxItem[] = [
  {
    src: 'https://picsum.photos/800/600?random=1',
    alt: 'Beautiful landscape',
    caption: 'A beautiful landscape captured during golden hour',
  },
  {
    src: 'https://picsum.photos/600/800?random=2',
    alt: 'City architecture',
    caption: 'Modern architecture in the city center',
  },
  {
    src: 'https://picsum.photos/900/600?random=3',
    alt: 'Nature scene',
    caption: 'Peaceful nature scene with trees and water',
  },
  {
    src: 'https://picsum.photos/700/700?random=4',
    alt: 'Abstract art',
    caption: 'Abstract composition with vibrant colors',
  },
];

const mixedMediaItems: LightboxItem[] = [
  {
    src: 'https://picsum.photos/800/600?random=5',
    alt: 'Image 1',
    caption: 'First image in the gallery',
    type: 'image',
  },
  {
    src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    alt: 'Sample video',
    caption: 'Sample video content',
    type: 'video',
  },
  {
    src: 'https://picsum.photos/800/600?random=6',
    alt: 'Image 2',
    caption: 'Second image in the gallery',
    type: 'image',
  },
];

// Wrapper component for stories
interface LightboxWrapperProps {
  items: LightboxItem[];
  triggerText?: string;
  thumbnails?: boolean;
  autoplay?: boolean | { interval?: number };
  loop?: boolean;
  showControls?: boolean;
  showCaptions?: boolean;
  zoomable?: boolean;
  startIndex?: number;
}

const LightboxWrapper = ({
  items,
  triggerText = 'Open Lightbox',
  ...props
}: LightboxWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ mb: 2 }}>
        {triggerText}
      </Button>
      <Typography variant="body2" color="text.secondary">
        Click the button to open the lightbox
      </Typography>
      <Lightbox isOpen={isOpen} onClose={() => setIsOpen(false)} items={items} {...props} />
    </Box>
  );
};

// Stories
export const Default: Story = {
  render: () => <LightboxWrapper items={sampleImages} />,
};

export const SingleImage: Story = {
  render: () => <LightboxWrapper items={[sampleImages[0]]} triggerText="Open Single Image" />,
};

export const WithFilmstrip: Story = {
  render: () => (
    <LightboxWrapper items={sampleImages} thumbnails={true} triggerText="Open with Thumbnails" />
  ),
};

export const Autoplay: Story = {
  render: () => (
    <LightboxWrapper items={sampleImages} autoplay={true} triggerText="Open with Autoplay" />
  ),
};

export const CustomAutoplayInterval: Story = {
  render: () => (
    <LightboxWrapper
      items={sampleImages}
      autoplay={{ interval: 2000 }}
      triggerText="Open with Fast Autoplay"
    />
  ),
};

export const WithLoop: Story = {
  render: () => <LightboxWrapper items={sampleImages} loop={true} triggerText="Open with Loop" />,
};

export const NoControls: Story = {
  render: () => (
    <LightboxWrapper
      items={sampleImages}
      showControls={false}
      triggerText="Open without Controls"
    />
  ),
};

export const NoCaptions: Story = {
  render: () => (
    <LightboxWrapper
      items={sampleImages}
      showCaptions={false}
      triggerText="Open without Captions"
    />
  ),
};

export const MixedMedia: Story = {
  render: () => <LightboxWrapper items={mixedMediaItems} triggerText="Open Mixed Media Gallery" />,
};

export const NotZoomable: Story = {
  render: () => (
    <LightboxWrapper items={sampleImages} zoomable={false} triggerText="Open without Zoom" />
  ),
};

export const StartAtIndex: Story = {
  render: () => (
    <LightboxWrapper items={sampleImages} startIndex={2} triggerText="Start at Third Image" />
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <LightboxWrapper
      items={sampleImages}
      thumbnails={true}
      autoplay={{ interval: 3000 }}
      loop={true}
      zoomable={true}
      showCaptions={true}
      showControls={true}
      triggerText="Open Full Featured"
    />
  ),
};

// Dark mode example
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <Box sx={{ bgcolor: 'grey.900', minHeight: '100vh', py: 4 }}>
      <LightboxWrapper items={sampleImages} thumbnails={true} triggerText="Open in Dark Mode" />
    </Box>
  ),
};

// Mobile responsive example
export const MobileResponsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <LightboxWrapper items={sampleImages} thumbnails={true} triggerText="Open on Mobile" />
  ),
};

// Required story exports
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Typography variant="h6">All Variants</Typography>
      <LightboxWrapper items={sampleImages} triggerText="Default" />
      <LightboxWrapper items={sampleImages} thumbnails={true} triggerText="With Thumbnails" />
      <LightboxWrapper items={sampleImages} autoplay={true} triggerText="With Autoplay" />
      <LightboxWrapper items={sampleImages} loop={true} triggerText="With Loop" />
      <LightboxWrapper items={mixedMediaItems} triggerText="Mixed Media" />
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Typography variant="h6">All Sizes (Gallery sizes)</Typography>
      <LightboxWrapper items={[sampleImages[0]]} triggerText="Single Item" />
      <LightboxWrapper items={sampleImages.slice(0, 2)} triggerText="Two Items" />
      <LightboxWrapper items={sampleImages} triggerText="Multiple Items" />
      <LightboxWrapper
        items={[...sampleImages, ...sampleImages, ...sampleImages]}
        thumbnails={true}
        triggerText="Large Gallery"
      />
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Typography variant="h6">All States</Typography>
      <LightboxWrapper items={sampleImages} triggerText="Normal State" />
      <LightboxWrapper items={[]} triggerText="Empty State" />
      <LightboxWrapper
        items={sampleImages}
        showControls={false}
        showCaptions={false}
        triggerText="Minimal State"
      />
      <LightboxWrapper
        items={sampleImages}
        thumbnails={true}
        autoplay={true}
        loop={true}
        triggerText="Full Featured State"
      />
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Typography variant="h6">Interactive States</Typography>
      <Typography variant="body2" color="text.secondary">
        Open any lightbox to test navigation, zoom, and touch gestures
      </Typography>
      <LightboxWrapper items={sampleImages} zoomable={true} triggerText="Zoomable Images" />
      <LightboxWrapper
        items={sampleImages}
        showControls={true}
        loop={true}
        triggerText="With Navigation"
      />
      <LightboxWrapper
        items={sampleImages}
        thumbnails={true}
        triggerText="With Thumbnail Navigation"
      />
    </Box>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '320px', height: '568px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Responsive Lightbox
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Resize viewport or use viewport controls to test responsiveness
      </Typography>
      <LightboxWrapper
        items={sampleImages}
        thumbnails={true}
        triggerText="Open Responsive Lightbox"
      />
    </Box>
  ),
};
