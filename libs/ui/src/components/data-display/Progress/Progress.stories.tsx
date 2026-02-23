import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'DataDisplay/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:Progress', 'checked'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['linear', 'circular', 'segmented', 'gradient'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    glow: {
      control: { type: 'boolean' },
    },
    pulse: {
      control: { type: 'boolean' },
    },
    showLabel: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    value: 65,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Indeterminate: Story = {
  args: {
    // No value = indeterminate
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Linear
        </Typography>
        <Progress variant="linear" value={60} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Circular
        </Typography>
        <Progress variant="circular" value={75} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Segmented
        </Typography>
        <Progress variant="segmented" value={45} segments={8} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Gradient
        </Typography>
        <Progress variant="gradient" value={80} showLabel />
      </Box>
    </Stack>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Small
        </Typography>
        <Progress size="sm" value={40} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Medium
        </Typography>
        <Progress size="md" value={60} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Large
        </Typography>
        <Progress size="lg" value={80} showLabel />
      </Box>
    </Stack>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Progress color="primary" value={70} showLabel />
      <Progress color="secondary" value={70} showLabel />
      <Progress color="success" value={70} showLabel />
      <Progress color="warning" value={70} showLabel />
      <Progress color="error" value={70} showLabel />
      <Progress color="neutral" value={70} showLabel />
    </Stack>
  ),
};

// Circular variations
export const CircularSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Box textAlign="center">
        <Progress variant="circular" size="sm" value={45} showLabel />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Small
        </Typography>
      </Box>
      <Box textAlign="center">
        <Progress variant="circular" size="md" value={65} showLabel />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Medium
        </Typography>
      </Box>
      <Box textAlign="center">
        <Progress variant="circular" size="lg" value={85} showLabel />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Large
        </Typography>
      </Box>
      <Box textAlign="center">
        <Progress variant="circular" circularSize={64} thickness={6} value={95} showLabel />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Custom
        </Typography>
      </Box>
    </Stack>
  ),
};

// Segmented variations
export const SegmentedVariations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          5 Segments
        </Typography>
        <Progress variant="segmented" segments={5} value={60} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          10 Segments
        </Typography>
        <Progress variant="segmented" segments={10} value={70} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          20 Segments
        </Typography>
        <Progress variant="segmented" segments={20} value={85} showLabel />
      </Box>
    </Stack>
  ),
};

// With effects
export const WithGlow: Story = {
  args: {
    variant: 'gradient',
    value: 75,
    glow: true,
    showLabel: true,
    color: 'primary',
  },
};

export const WithPulse: Story = {
  args: {
    variant: 'linear',
    value: 60,
    pulse: true,
    showLabel: true,
    color: 'success',
  },
};

export const WithGlowAndPulse: Story = {
  args: {
    variant: 'circular',
    value: 90,
    glow: true,
    pulse: true,
    showLabel: true,
    color: 'warning',
    size: 'lg',
  },
};

// Real-world examples
const FileUploadComponent = () => {
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <Box sx={{ width: 400 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        File Upload Progress
      </Typography>
      <Progress variant="gradient" value={progress} showLabel color="success" glow={isUploading} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {isUploading
            ? 'Uploading document.pdf...'
            : progress === 100
              ? 'Upload complete!'
              : 'Ready to upload'}
        </Typography>
        <Button variant="contained" size="small" onClick={startUpload} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Start Upload'}
        </Button>
      </Box>
    </Box>
  );
};

export const FileUpload: Story = {
  render: () => <FileUploadComponent />,
};

export const SkillLevels: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Typography variant="h6">Skill Levels</Typography>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">React</Typography>
          <Typography variant="body2" color="text.secondary">
            Expert
          </Typography>
        </Box>
        <Progress variant="segmented" segments={5} value={100} color="success" />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">TypeScript</Typography>
          <Typography variant="body2" color="text.secondary">
            Advanced
          </Typography>
        </Box>
        <Progress variant="segmented" segments={5} value={80} color="primary" />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Node.js</Typography>
          <Typography variant="body2" color="text.secondary">
            Intermediate
          </Typography>
        </Box>
        <Progress variant="segmented" segments={5} value={60} color="warning" />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Docker</Typography>
          <Typography variant="body2" color="text.secondary">
            Beginner
          </Typography>
        </Box>
        <Progress variant="segmented" segments={5} value={20} color="error" />
      </Box>
    </Stack>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box textAlign="center">
        <Typography variant="h6" sx={{ mb: 2 }}>
          CPU Usage
        </Typography>
        <Progress variant="circular" value={72} showLabel color="warning" size="lg" glow />
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Memory
        </Typography>
        <Progress variant="circular" value={45} showLabel color="success" size="lg" />
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Storage
        </Typography>
        <Progress variant="circular" value={89} showLabel color="error" size="lg" pulse />
      </Box>
    </Stack>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Linear Indeterminate
        </Typography>
        <Progress variant="linear" />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Circular Indeterminate
        </Typography>
        <Progress variant="circular" />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          With Effects
        </Typography>
        <Progress variant="gradient" glow pulse />
      </Box>
    </Stack>
  ),
};

// Required exports for validation
export const AllVariants = Variants;
export const AllSizes = Sizes;
export const AllStates: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Default State
        </Typography>
        <Progress variant="linear" value={60} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Loading State
        </Typography>
        <Progress variant="linear" />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Complete State
        </Typography>
        <Progress variant="linear" value={100} showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          With Glow Effect
        </Typography>
        <Progress variant="gradient" value={75} glow showLabel />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          With Pulse Effect
        </Typography>
        <Progress variant="linear" value={45} pulse showLabel />
      </Box>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(25);

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <Typography variant="h6">Interactive Progress Control</Typography>
        <Progress variant="gradient" value={progress} showLabel glow />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            -10%
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            +10%
          </Button>
          <Button variant="contained" size="small" onClick={() => setProgress(0)}>
            Reset
          </Button>
        </Stack>
      </Stack>
    );
  },
};

export const Responsive: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Mobile View (Small)
        </Typography>
        <Box sx={{ width: 300 }}>
          <Progress variant="linear" value={65} showLabel />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Tablet View (Medium)
        </Typography>
        <Box sx={{ width: 500 }}>
          <Progress variant="segmented" segments={10} value={70} showLabel />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Desktop View (Large)
        </Typography>
        <Box sx={{ width: 800 }}>
          <Progress variant="gradient" value={80} showLabel glow />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Circular Responsive
        </Typography>
        <Stack direction="row" spacing={3}>
          <Progress variant="circular" size="sm" value={40} showLabel />
          <Progress variant="circular" size="md" value={60} showLabel />
          <Progress variant="circular" size="lg" value={80} showLabel />
        </Stack>
      </Box>
    </Stack>
  ),
};
