import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  CheckCircle,
  Notifications,
  Security,
  Star,
  Warning as MuiWarning,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React from 'react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'DataDisplay/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A beautiful and versatile Alert component with multiple variants, animations, and accessibility features. Supports info, success, warning, danger, glass, and gradient styles with optional glow and pulse effects.',
      },
    },
  },
  tags: ['autodocs', 'component:Alert'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger', 'glass', 'gradient'],
      description: 'The visual style variant of the alert',
      table: {
        defaultValue: { summary: 'info' },
        type: { summary: 'string' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
      description: 'Override color for the alert',
      table: {
        type: { summary: 'string' },
      },
    },
    glow: {
      control: { type: 'boolean' },
      description: 'Add a glowing shadow effect',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    pulse: {
      control: { type: 'boolean' },
      description: 'Add a pulsing animation effect',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the default icon',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be dismissed',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Alert description text',
      table: {
        type: { summary: 'string' },
      },
    },
    animate: {
      control: { type: 'boolean' },
      description: 'Whether to animate the alert on mount',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an info alert with useful information.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success! Your action was completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning! Please check your input and try again.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Error! Something went wrong. Please try again.',
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'This is a glass-morphism alert with a blurred background.',
  },
};

// With title and description
export const WithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Payment Successful',
    description:
      'Your payment has been processed successfully. You will receive a confirmation email shortly.',
  },
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    icon: <Star />,
    title: 'Pro Tip',
    children: 'You can customize the alert icon to match your content.',
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'warning',
    showIcon: false,
    children: 'This alert does not display an icon.',
  },
};

// Closable alert
export const Closable: Story = {
  args: {
    variant: 'info',
    closable: true,
    title: 'Notification',
    children: 'This alert can be closed by clicking the X button.',
  },
};

// With effects
export const WithGlow: Story = {
  args: {
    variant: 'success',
    glow: true,
    title: 'Success with Glow',
    children: 'This alert has a glowing effect around it.',
  },
};

export const WithPulse: Story = {
  args: {
    variant: 'warning',
    pulse: true,
    title: 'Attention Required',
    children: 'This alert has a pulsing animation to grab attention.',
  },
};

export const WithGlowAndPulse: Story = {
  args: {
    variant: 'danger',
    glow: true,
    pulse: true,
    title: 'Critical Alert',
    children: 'This alert combines both glow and pulse effects.',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info" title="Information" closable>
        This is an informational message with important details.
      </Alert>
      <Alert variant="success" title="Success" closable>
        Your action was completed successfully!
      </Alert>
      <Alert variant="warning" title="Warning" closable>
        Please review your settings before continuing.
      </Alert>
      <Alert variant="danger" title="Error" closable>
        An error occurred while processing your request.
      </Alert>
      <Alert variant="glass" title="Glass Effect" closable>
        This alert uses glassmorphism design with backdrop blur.
      </Alert>
    </Stack>
  ),
};

// Interactive examples
export const Interactive: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert
        variant="success"
        title="Interactive Demo"
        glow
        closable
        onClose={() => {
          /** do nothing */
        }}
      >
        Click the close button to dismiss this alert.
      </Alert>
      <Alert variant="warning" pulse icon={<MuiWarning />} title="Attention">
        This alert pulses to grab your attention.
      </Alert>
      <Alert variant="glass" glow pulse title="Combined Effects" closable>
        Glass morphism with glow and pulse effects combined.
      </Alert>
    </Stack>
  ),
};

// Gradient variant showcase
export const GradientVariant: Story = {
  args: {
    variant: 'gradient',
    title: 'Gradient Alert',
    description: 'This alert features a beautiful gradient background with shimmer effect',
    closable: true,
    color: 'primary',
  },
};

// Custom content with actions
export const WithActions: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert
        variant="info"
        title="System Update Available"
        description="A new version is available. Update now to get the latest features and improvements."
        closable
      >
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button size="small" variant="contained" color="info">
            Update Now
          </Button>
          <Button size="small" variant="outlined" color="inherit">
            Remind Me Later
          </Button>
        </Box>
      </Alert>
      <Alert
        variant="warning"
        icon={<Security />}
        title="Security Alert"
        description="Unusual activity detected on your account"
        closable
      >
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button size="small" variant="contained" color="warning">
            Review Activity
          </Button>
          <Button size="small" variant="text" color="inherit">
            Dismiss
          </Button>
        </Box>
      </Alert>
    </Stack>
  ),
};

// Long content handling
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Terms of Service Update',
    description:
      'We have updated our terms of service to better protect your privacy and improve our services. These changes include enhanced data protection measures, clearer explanations of how we use your information, and new rights regarding your personal data. Please review the updated terms carefully as they affect your use of our services.',
    closable: true,
  },
};

// Multiple alerts with different priorities
export const PriorityLevels: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert
        variant="danger"
        title="Critical Error"
        description="System failure detected. Immediate action required."
        pulse
        glow
        icon={<Notifications />}
      />
      <Alert
        variant="warning"
        title="Warning"
        description="Your session will expire in 5 minutes"
        pulse
      />
      <Alert
        variant="info"
        title="Information"
        description="New features have been added to your dashboard"
      />
      <Alert
        variant="success"
        title="Task Complete"
        description="All files have been successfully uploaded"
        icon={<CheckCircle />}
      />
    </Stack>
  ),
};

// Accessibility showcase
export const AccessibilityFocus: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body2" gutterBottom>
        These alerts are fully accessible with proper ARIA attributes
      </Typography>
      <Alert
        variant="info"
        title="Accessible Alert"
        description="This alert uses aria-live='polite' for screen readers"
        showIcon
        closable
      />
      <Alert
        variant="danger"
        title="Urgent Alert"
        description="This critical alert uses aria-live='assertive' for immediate announcement"
        showIcon
        closable
      />
    </Stack>
  ),
};

// Real-world use cases
const RealWorldExamplesComponent = () => {
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [showNotification, setShowNotification] = React.useState(true);

  return (
    <Stack spacing={2}>
      {showWelcome && (
        <Alert
          variant="gradient"
          color="primary"
          title="Welcome Back!"
          description="You have 3 new messages and 5 pending tasks"
          icon={<Star />}
          closable
          onClose={() => setShowWelcome(false)}
        />
      )}

      {showNotification && (
        <Alert
          variant="glass"
          title="Cookie Notice"
          description="We use cookies to enhance your experience"
          closable
          onClose={() => setShowNotification(false)}
        >
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button size="small" variant="contained">
              Accept All
            </Button>
            <Button size="small" variant="outlined">
              Manage Preferences
            </Button>
          </Box>
        </Alert>
      )}

      <Alert
        variant="success"
        title="Payment Successful"
        description="Transaction ID: #TXN-2024-001234"
        icon={<CheckCircle />}
        glow
      >
        <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mt: 1 }}>
          You will receive a confirmation email shortly
        </Typography>
      </Alert>

      <Alert
        variant="warning"
        title="Subscription Expiring Soon"
        description="Your premium subscription expires in 7 days"
        pulse
      >
        <Box sx={{ mt: 2 }}>
          <Button size="small" variant="contained" color="warning" fullWidth>
            Renew Subscription
          </Button>
        </Box>
      </Alert>
    </Stack>
  );
};

export const RealWorldExamples: Story = {
  render: RealWorldExamplesComponent,
};

// Performance: Multiple alerts
export const MultipleAlerts: Story = {
  render: () => (
    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Stack spacing={1}>
        {Array.from({ length: 10 }, (_, i) => (
          <Alert
            key={i}
            variant={
              (['info', 'success', 'warning', 'danger', 'glass', 'gradient'] as const)[i % 6]
            }
            title={`Alert ${i + 1}`}
            description={`This is alert number ${i + 1} in the list`}
            closable={i % 2 === 0}
            glow={i % 3 === 0}
            pulse={i % 5 === 0}
          />
        ))}
      </Stack>
    </Box>
  ),
};

// Empty states
export const MinimalContent: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info">Simple alert with just text content</Alert>
      <Alert variant="success" showIcon={false}>
        Alert without icon
      </Alert>
      <Alert variant="warning" title="Title Only" />
      <Alert variant="danger" description="Description only, no title" />
    </Stack>
  ),
};

// Required story exports for validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info" title="Info Alert" description="Standard size alert message" />
      <Alert variant="success" title="Success Alert" description="Standard size success message" />
      <Alert variant="warning" title="Warning Alert" description="Standard size warning message" />
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info" title="Default State" description="Normal alert state" />
      <Alert variant="success" title="Success State" description="Success alert state" />
      <Alert variant="warning" title="Warning State" description="Warning alert state" />
      <Alert variant="danger" title="Error State" description="Error alert state" />
      <Alert variant="glass" title="Glass State" description="Glass morphism alert state" />
      <Alert variant="gradient" title="Gradient State" description="Gradient alert state" />
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info" title="Standard Alert" description="Non-interactive alert" />
      <Alert variant="success" title="Closable Alert" description="Click the X to close" closable />
      <Alert variant="warning" title="Glow Effect" description="Alert with glow effect" glow />
      <Alert variant="danger" title="Pulse Effect" description="Alert with pulse animation" pulse />
      <Alert
        variant="glass"
        title="Combined Effects"
        description="Closable with glow and pulse"
        closable
        glow
        pulse
      />
    </Stack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Alert
          variant="info"
          title="Responsive Alert"
          description="This alert adapts to different screen sizes and container widths"
          closable
        />
        <Box sx={{ maxWidth: 400 }}>
          <Alert
            variant="success"
            title="Narrow Container"
            description="Alert in a constrained width container"
            closable
          />
        </Box>
        <Box sx={{ maxWidth: 200 }}>
          <Alert
            variant="warning"
            title="Very Narrow"
            description="Alert in very narrow space"
            showIcon={false}
          />
        </Box>
      </Stack>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Alert variant="info" title="Compact Alert" description="Tighter spacing" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Alert variant="success" title="Normal Alert" description="Standard spacing" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Alert variant="warning" title="Spacious Alert" description="Extra breathing room" />
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
