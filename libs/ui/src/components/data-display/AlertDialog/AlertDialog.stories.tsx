import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Delete, Logout,Warning } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import React from 'react';

import { AlertDialog } from './AlertDialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'DataDisplay/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:AlertDialog'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'glass'],
    },
    glow: {
      control: { type: 'boolean' },
    },
    pulse: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    confirmDisabled: {
      control: { type: 'boolean' },
    },
    showCancel: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to manage dialog state
const DialogWrapper = ({
  children,
  ...props
}: { children?: React.ReactNode } & Record<string, unknown>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <AlertDialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
        }}
      >
        {children}
      </AlertDialog>
    </>
  );
};

// Basic variants
export const Default: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to perform this action? This cannot be undone.',
  },
};

export const Destructive: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    variant: 'destructive',
    title: 'Delete Account',
    description:
      'This action cannot be undone. This will permanently delete your account and remove all associated data.',
    confirmText: 'Delete Account',
    cancelText: 'Cancel',
  },
};

export const Glass: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    variant: 'glass',
    title: 'Glass Effect Dialog',
    description: 'This dialog uses glassmorphism design with backdrop blur effects.',
    confirmText: 'Confirm',
  },
};

// With custom icons
export const WithCustomIcon: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    variant: 'destructive',
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    icon: <Delete color="error" />,
    confirmText: 'Delete',
  },
};

export const LogoutConfirmation: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Sign Out',
    description: 'Are you sure you want to sign out of your account?',
    icon: <Logout color="primary" />,
    confirmText: 'Sign Out',
    cancelText: 'Stay Signed In',
  },
};

// Without cancel button
export const WithoutCancel: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Information',
    description: 'This is an informational dialog that only has a confirm button.',
    showCancel: false,
    confirmText: 'Got It',
  },
};

// Loading state
export const Loading: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Processing Request',
    description: 'Please wait while we process your request...',
    loading: true,
    confirmText: 'Processing...',
  },
};

// With effects
export const WithGlow: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    variant: 'default',
    glow: true,
    title: 'Important Notice',
    description: 'This dialog has a glowing effect to grab attention.',
    confirmText: 'Understood',
  },
};

export const WithPulse: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    variant: 'destructive',
    pulse: true,
    title: 'Critical Action',
    description: 'This dialog pulses to indicate a critical action.',
    icon: <Warning color="error" />,
    confirmText: 'Proceed',
  },
};

export const WithGlowAndPulse: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    variant: 'glass',
    glow: true,
    pulse: true,
    title: 'Premium Feature',
    description: 'This dialog combines glow and pulse effects with glass morphism.',
    confirmText: 'Upgrade',
    cancelText: 'Maybe Later',
  },
};

// Interactive examples
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2} direction="row">
      <DialogWrapper
        variant="default"
        title="Default Dialog"
        description="This is a default confirmation dialog."
        confirmText="Confirm"
      />
      <DialogWrapper
        variant="destructive"
        title="Delete Confirmation"
        description="This action will permanently delete the item."
        confirmText="Delete"
        icon={<Delete />}
      />
      <DialogWrapper
        variant="glass"
        title="Glass Dialog"
        description="This dialog uses glassmorphism effects."
        confirmText="Continue"
      />
    </Stack>
  ),
};

// Complex content example
export const WithCustomContent: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <div>
          <strong>Additional Information:</strong>
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>All data will be permanently deleted</li>
          <li>This action cannot be reversed</li>
          <li>You will receive a confirmation email</li>
        </ul>
      </Stack>
    </DialogWrapper>
  ),
  args: {
    variant: 'destructive',
    title: 'Delete Account',
    description: 'Please review the following before proceeding:',
    confirmText: 'I Understand, Delete Account',
    cancelText: 'Cancel',
  },
};

// Required story exports for validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <DialogWrapper
        title="Default Size Dialog"
        description="This is the standard dialog size that fits content automatically."
        confirmText="Confirm"
      />
      <DialogWrapper
        title="Dialog with Long Content"
        description="This dialog has a longer description to demonstrate how the dialog adjusts its size based on content. The dialog will expand to accommodate longer text while maintaining proper spacing and readability. It ensures that all content is visible without requiring scrolling for reasonable amounts of text."
        confirmText="Confirm"
      />
      <DialogWrapper
        title="Compact"
        description="Short message."
        confirmText="OK"
        showCancel={false}
      />
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2} direction="row">
      <DialogWrapper
        title="Normal State"
        description="Dialog in normal interactive state."
        confirmText="Confirm"
      />
      <DialogWrapper
        title="Loading State"
        description="Dialog with loading confirmation."
        loading={true}
        confirmText="Processing..."
      />
      <DialogWrapper
        title="Disabled Confirm"
        description="Dialog with disabled confirm button."
        confirmDisabled={true}
        confirmText="Cannot Confirm"
      />
      <DialogWrapper
        title="No Cancel Button"
        description="Information only dialog."
        showCancel={false}
        confirmText="OK"
      />
    </Stack>
  ),
};

// Component for interactive states demo
const InteractiveStatesDemo = () => {
  const [loadingDialog, setLoadingDialog] = React.useState(false);

  return (
    <Stack spacing={2} direction="row">
      <DialogWrapper
        title="Hover Effects"
        description="Hover over the buttons to see their hover states."
        glow={true}
        confirmText="Hover Me"
      />
      <DialogWrapper
        title="Focus States"
        description="Tab through the dialog to see focus indicators."
        confirmText="Focus Me"
      />
      <div>
        <Button variant="contained" onClick={() => setLoadingDialog(true)}>
          Open Loading Dialog
        </Button>
        <AlertDialog
          open={loadingDialog}
          title="Processing"
          description="Simulating a loading state..."
          loading={true}
          confirmText="Processing..."
          onClose={() => setLoadingDialog(false)}
          onCancel={() => setLoadingDialog(false)}
          onConfirm={() => {
            window.setTimeout(() => setLoadingDialog(false), 2000);
          }}
        />
      </div>
      <DialogWrapper
        variant="destructive"
        pulse={true}
        title="Animated State"
        description="This dialog has pulse animation."
        confirmText="Animated"
      />
    </Stack>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesDemo />,
};

export const Responsive: Story = {
  render: () => (
    <Stack spacing={2}>
      <DialogWrapper
        title="Responsive Dialog"
        description="This dialog adapts to different screen sizes. On mobile devices, it takes up more of the viewport width, while on desktop it maintains a comfortable centered layout."
        confirmText="Confirm"
      />
      <DialogWrapper
        variant="glass"
        title="Mobile-Optimized"
        description="The touch targets are optimized for mobile interaction with appropriate spacing."
        confirmText="Continue"
      />
    </Stack>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <DialogWrapper
              title="Compact Dialog"
              description="Tighter spacing for information-dense layouts."
              confirmText="Confirm"
            />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <DialogWrapper
              title="Normal Dialog"
              description="Standard spacing for regular use."
              confirmText="Confirm"
            />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <DialogWrapper
              title="Spacious Dialog"
              description="Extra breathing room for accessibility."
              confirmText="Confirm"
            />
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
