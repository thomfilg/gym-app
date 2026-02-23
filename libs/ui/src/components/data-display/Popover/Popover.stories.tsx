import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'DataDisplay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Popover'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for interactive stories
const PopoverDemo = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: unknown;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...props}
      >
        {children}
      </Popover>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <PopoverDemo>
      <Typography sx={{ p: 2 }}>This is a basic popover content.</Typography>
    </PopoverDemo>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <PopoverDemo variant="default">
        <Typography sx={{ p: 2 }}>Default variant</Typography>
      </PopoverDemo>
      <PopoverDemo variant="glass">
        <Typography sx={{ p: 2 }}>Glass variant</Typography>
      </PopoverDemo>
      <PopoverDemo variant="arrow">
        <Typography sx={{ p: 2 }}>Arrow variant</Typography>
      </PopoverDemo>
    </Stack>
  ),
};

export const WithEffects: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <PopoverDemo glow>
        <Typography sx={{ p: 2 }}>Glow effect</Typography>
      </PopoverDemo>
      <PopoverDemo pulse>
        <Typography sx={{ p: 2 }}>Pulse effect</Typography>
      </PopoverDemo>
    </Stack>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <PopoverDemo variant="glass" maxWidth={300}>
      <div style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Menu Options
        </Typography>
        <List dense>
          <ListItem button>
            <ListItemText primary="Profile Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Account Security" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </div>
    </PopoverDemo>
  ),
};

export const GlassEffect: Story = {
  render: () => (
    <PopoverDemo variant="glass" glow>
      <Typography sx={{ p: 3 }}>Glass morphism with glow effect</Typography>
    </PopoverDemo>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <PopoverDemo variant="arrow">
      <Typography sx={{ p: 2 }}>Popover with arrow pointing to anchor</Typography>
    </PopoverDemo>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <PopoverDemo maxWidth={200}>
        <Typography sx={{ p: 2 }}>Small popover (200px max)</Typography>
      </PopoverDemo>
      <PopoverDemo maxWidth={400}>
        <Typography sx={{ p: 2 }}>Medium popover (400px max)</Typography>
      </PopoverDemo>
      <PopoverDemo maxWidth={600}>
        <Typography sx={{ p: 2 }}>Large popover (600px max)</Typography>
      </PopoverDemo>
    </Stack>
  ),
};

export const CombinedEffects: Story = {
  render: () => (
    <PopoverDemo variant="glass" glow pulse>
      <Typography sx={{ p: 3 }}>Combined glass, glow, and pulse effects</Typography>
    </PopoverDemo>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <PopoverDemo>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Typography color="text.secondary">No content available</Typography>
      </div>
    </PopoverDemo>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <PopoverDemo>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </div>
    </PopoverDemo>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <PopoverDemo>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Typography color="error">Error loading content</Typography>
      </div>
    </PopoverDemo>
  ),
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" spacing={4} alignItems="center">
      <PopoverDemo variant="default">
        <Typography sx={{ p: 2 }}>Default variant</Typography>
      </PopoverDemo>
      <PopoverDemo variant="glass">
        <Typography sx={{ p: 2 }}>Glass variant with translucent effect</Typography>
      </PopoverDemo>
      <PopoverDemo variant="arrow">
        <Typography sx={{ p: 2 }}>Arrow variant pointing to anchor</Typography>
      </PopoverDemo>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="column" spacing={4} alignItems="center">
      <PopoverDemo maxWidth={150}>
        <Typography sx={{ p: 2 }}>Extra small (150px)</Typography>
      </PopoverDemo>
      <PopoverDemo maxWidth={250}>
        <Typography sx={{ p: 2 }}>Small (250px)</Typography>
      </PopoverDemo>
      <PopoverDemo maxWidth={400}>
        <Typography sx={{ p: 2 }}>Medium (400px)</Typography>
      </PopoverDemo>
      <PopoverDemo maxWidth={600}>
        <Typography sx={{ p: 3 }}>Large (600px)</Typography>
      </PopoverDemo>
      <PopoverDemo maxWidth={800}>
        <Typography sx={{ p: 4 }}>Extra large (800px)</Typography>
      </PopoverDemo>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack direction="column" spacing={4} alignItems="center">
      <PopoverDemo>
        <Typography sx={{ p: 2 }}>Normal state</Typography>
      </PopoverDemo>
      <PopoverDemo>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </div>
      </PopoverDemo>
      <PopoverDemo>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Typography color="error">Error state</Typography>
        </div>
      </PopoverDemo>
      <PopoverDemo>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Typography color="text.secondary">Empty state</Typography>
        </div>
      </PopoverDemo>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <PopoverDemo>
        <Typography sx={{ p: 2 }}>Hover over me</Typography>
      </PopoverDemo>
      <PopoverDemo variant="glass" glow>
        <Typography sx={{ p: 2 }}>Glass with glow on hover</Typography>
      </PopoverDemo>
      <PopoverDemo variant="arrow" pulse>
        <Typography sx={{ p: 2 }}>Arrow with pulse effect</Typography>
      </PopoverDemo>
    </Stack>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '720px' } },
      },
    },
  },
  render: () => (
    <PopoverDemo variant="glass" glow>
      <div style={{ padding: 24 }}>
        <Typography variant="h6" gutterBottom>
          Responsive Popover
        </Typography>
        <Typography paragraph>This popover adapts to different screen sizes.</Typography>
        <Typography variant="body2" color="text.secondary">
          Try switching viewport sizes to see responsive behavior.
        </Typography>
      </div>
    </PopoverDemo>
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
          <PopoverDemo buttonText="Compact Popover">
            <div style={{ padding: 16 }}>
              <Typography variant="subtitle2">Compact Density</Typography>
              <Typography variant="body2">Content with reduced spacing.</Typography>
            </div>
          </PopoverDemo>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <PopoverDemo buttonText="Normal Popover">
            <div style={{ padding: 16 }}>
              <Typography variant="subtitle2">Normal Density</Typography>
              <Typography variant="body2">Content with standard spacing.</Typography>
            </div>
          </PopoverDemo>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <PopoverDemo buttonText="Spacious Popover">
            <div style={{ padding: 16 }}>
              <Typography variant="subtitle2">Spacious Density</Typography>
              <Typography variant="body2">Content with extra spacing.</Typography>
            </div>
          </PopoverDemo>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
