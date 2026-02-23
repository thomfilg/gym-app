import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BugReportIcon from '@mui/icons-material/BugReport';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { fn } from 'storybook/test';

import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'DataDisplay/AsyncStates/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An error state component that displays error messages with optional retry functionality.',
      },
    },
  },
  tags: ['autodocs', 'component:ErrorState'],
  argTypes: {
    severity: {
      control: 'radio',
      options: ['error', 'warning'],
      description: 'Visual severity of the error state',
    },
    message: {
      control: 'text',
      description: 'The error message to display',
    },
    title: {
      control: 'text',
      description: 'Optional title for the error state',
    },
    retryLabel: {
      control: 'text',
      description: 'Custom label for the retry button',
    },
    onRetry: {
      action: 'retry clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Something went wrong while loading the data.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    onRetry: fn(),
  },
};

export const WithRetryButton: Story = {
  args: {
    message: 'Failed to load data. Please try again.',
    onRetry: fn(),
  },
};

export const CustomRetryLabel: Story = {
  args: {
    message: 'The request timed out.',
    onRetry: fn(),
    retryLabel: 'Try Again',
  },
};

export const WarningSeverity: Story = {
  args: {
    severity: 'warning',
    title: 'Warning',
    message: 'Some items could not be loaded. You can continue with partial data.',
    onRetry: fn(),
  },
};

export const NetworkError: Story = {
  args: {
    title: 'Network Error',
    message: 'Unable to reach the server. Please check your connection and try again.',
    onRetry: fn(),
  },
};

export const ServerError: Story = {
  args: {
    title: 'Server Error',
    message: 'The server encountered an unexpected error. Our team has been notified.',
    onRetry: fn(),
    retryLabel: 'Reload Page',
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Bug Detected',
    message: 'We\'ve found a bug in your code. Please review the error logs.',
    icon: <BugReportIcon sx={{ fontSize: 48, color: 'error.main' }} />,
    onRetry: fn(),
    retryLabel: 'View Logs',
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ErrorState message="Error state without title" />
      <ErrorState severity="error" title="Error Severity" message="This is an error state." />
      <ErrorState severity="warning" title="Warning Severity" message="This is a warning state." />
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ maxWidth: 300 }}>
        <ErrorState title="Small Container" message="Error in a narrow container." />
      </Box>
      <Box sx={{ maxWidth: 500 }}>
        <ErrorState title="Medium Container" message="Error in a medium width container." onRetry={fn()} />
      </Box>
      <Box sx={{ maxWidth: 800 }}>
        <ErrorState title="Large Container" message="Error in a wide container with more room." onRetry={fn()} retryLabel="Try Again" />
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ErrorState message="Basic error without retry" />
      <ErrorState message="Error with retry button" onRetry={fn()} />
      <ErrorState title="Error with Title" message="Error state with title and retry" onRetry={fn()} />
      <ErrorState severity="warning" title="Warning State" message="Warning severity error" onRetry={fn()} />
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ErrorState
        title="Interactive Error"
        message="Click the retry button to test interaction."
        onRetry={fn()}
        retryLabel="Retry Now"
      />
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ maxWidth: { xs: '100%', sm: 400, md: 600 } }}>
        <ErrorState
          title="Responsive Error"
          message="This error state adapts to different screen sizes."
          onRetry={fn()}
        />
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <ErrorState title="Compact Error" message="Tighter spacing" onRetry={fn()} />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <ErrorState title="Normal Error" message="Standard spacing" onRetry={fn()} />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <ErrorState title="Spacious Error" message="Extra breathing room" onRetry={fn()} />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
