import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DensityProvider } from '../../../utils/density';
import { LoadingState } from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'DataDisplay/AsyncStates/LoadingState',
  component: LoadingState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading state component that displays a spinner or skeleton placeholder while content is being loaded.',
      },
    },
  },
  tags: ['autodocs', 'component:LoadingState'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['spinner', 'skeleton'],
      description: 'The visual style of the loading indicator',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loading indicator',
    },
    message: {
      control: 'text',
      description: 'Optional message to display below the loading indicator',
    },
    skeletonRows: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of skeleton rows (only for skeleton variant)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SpinnerSmall: Story = {
  name: 'Spinner - Small',
  args: {
    variant: 'spinner',
    size: 'sm',
  },
};

export const SpinnerMedium: Story = {
  name: 'Spinner - Medium',
  args: {
    variant: 'spinner',
    size: 'md',
  },
};

export const SpinnerLarge: Story = {
  name: 'Spinner - Large',
  args: {
    variant: 'spinner',
    size: 'lg',
  },
};

export const SpinnerWithMessage: Story = {
  name: 'Spinner with Message',
  args: {
    variant: 'spinner',
    size: 'md',
    message: 'Loading your data...',
  },
};

export const SkeletonDefault: Story = {
  name: 'Skeleton - Default',
  args: {
    variant: 'skeleton',
  },
  parameters: {
    layout: 'padded',
  },
};

export const SkeletonWithMessage: Story = {
  name: 'Skeleton with Message',
  args: {
    variant: 'skeleton',
    message: 'Preparing content...',
    skeletonRows: 4,
  },
  parameters: {
    layout: 'padded',
  },
};

export const SkeletonSmall: Story = {
  name: 'Skeleton - Small',
  args: {
    variant: 'skeleton',
    size: 'sm',
    skeletonRows: 5,
  },
  parameters: {
    layout: 'padded',
  },
};

export const SkeletonLarge: Story = {
  name: 'Skeleton - Large',
  args: {
    variant: 'skeleton',
    size: 'lg',
    skeletonRows: 3,
  },
  parameters: {
    layout: 'padded',
  },
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <LoadingState variant="spinner" size="md" message="Loading..." />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <LoadingState variant="spinner" size="md" message="Loading..." />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <LoadingState variant="spinner" size="md" message="Loading..." />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
