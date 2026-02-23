import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React, { useEffect,useState } from 'react';

import { Toast, ToastProvider, useToast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs', 'component:Toast'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible toast notification system with multiple variants and promise support.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Required story export: Default
export const Default: Story = {
  args: {
    message: 'This is a default toast notification',
    variant: 'default',
  },
};

const ToastDemo = () => {
  const { addToast, promise } = useToast();

  const showDefault = () => {
    addToast({
      message: 'Default toast notification',
      variant: 'default',
    });
  };

  const showSuccess = () => {
    addToast({
      message: 'Success! Your action was completed.',
      variant: 'success',
      duration: 4000,
    });
  };

  const showError = () => {
    addToast({
      message: 'Error: Something went wrong.',
      variant: 'error',
      duration: 6000,
    });
  };

  const showWarning = () => {
    addToast({
      message: 'Warning: Please review your input.',
      variant: 'warning',
    });
  };

  const showInfo = () => {
    addToast({
      message: 'Info: Here\'s some helpful information.',
      variant: 'info',
    });
  };

  const showWithAction = () => {
    addToast({
      message: 'Your file has been saved.',
      variant: 'success',
      action: {
        label: 'View',
        onClick: () => {
          addToast({
            message: 'Opening file...',
            variant: 'info',
          });
        },
      },
    });
  };

  const showPersistent = () => {
    addToast({
      message: 'This toast stays until you dismiss it.',
      variant: 'info',
      persistent: true,
    });
  };

  const showGlass = () => {
    addToast({
      message: 'Beautiful glass morphism effect',
      variant: 'default',
      glass: true,
      duration: 6000,
    });
  };

  const showPromise = async () => {
    const mockPromise = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Success!');
        } else {
          reject(new Error('Failed!'));
        }
      }, 2000);
    });

    try {
      await promise(mockPromise, {
        loading: 'Processing your request...',
        success: 'Request completed successfully!',
        error: 'Request failed. Please try again.',
      });
    } catch {
      // Error is already handled by the promise function
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Toast Notifications Demo
      </Typography>

      <ButtonGroup orientation="vertical" variant="outlined" fullWidth>
        <Button onClick={showDefault}>Default Toast</Button>
        <Button onClick={showSuccess} color="success">
          Success Toast
        </Button>
        <Button onClick={showError} color="error">
          Error Toast
        </Button>
        <Button onClick={showWarning} color="warning">
          Warning Toast
        </Button>
        <Button onClick={showInfo} color="info">
          Info Toast
        </Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" variant="contained" fullWidth>
        <Button onClick={showWithAction}>Toast with Action</Button>
        <Button onClick={showPersistent}>Persistent Toast</Button>
        <Button onClick={showGlass}>Glass Effect</Button>
        <Button onClick={showPromise}>Promise Toast</Button>
      </ButtonGroup>
    </Box>
  );
};

export const Interactive: Story = {
  render: () => <ToastDemo />,
};

const BasicTypesComponent = () => {
  const [showToasts, setShowToasts] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (!showToasts) return;

    // Show different types with delays
    window.setTimeout(() => addToast({ message: 'Default notification', variant: 'default' }), 100);
    window.setTimeout(
      () => addToast({ message: 'Success! Task completed.', variant: 'success' }),
      600,
    );
    window.setTimeout(
      () => addToast({ message: 'Error: Something went wrong.', variant: 'error' }),
      1100,
    );
    window.setTimeout(
      () => addToast({ message: 'Warning: Please check this.', variant: 'warning' }),
      1600,
    );
    window.setTimeout(
      () => addToast({ message: 'Info: Helpful information.', variant: 'info' }),
      2100,
    );

    setShowToasts(false);
  }, [showToasts, addToast]);

  return (
    <Button variant="contained" onClick={() => setShowToasts(true)}>
      Show All Toast Types
    </Button>
  );
};

export const BasicTypes: Story = {
  render: () => <BasicTypesComponent />,
};

const GlassMorphismComponent = () => {
  const { addToast } = useToast();

  return (
    <Box
      sx={{
        minHeight: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 4,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        onClick={() =>
          addToast({
            message: 'Glass morphism toast with blur effects',
            variant: 'success',
            glass: true,
            duration: 8000,
          })
        }
        sx={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          },
        }}
      >
        Show Glass Toast
      </Button>
    </Box>
  );
};

export const GlassMorphism: Story = {
  render: () => <GlassMorphismComponent />,
};

const PromiseHandlingComponent = () => {
  const { promise } = useToast();

  const handleQuickPromise = () => {
    const quickPromise = new Promise((resolve) => {
      window.setTimeout(() => resolve('Quick success!'), 1000);
    });

    promise(quickPromise, {
      loading: 'Quick loading...',
      success: 'Done in 1 second!',
      error: 'Quick failed',
    });
  };

  const handleSlowPromise = () => {
    const slowPromise = new Promise((resolve) => {
      window.setTimeout(() => resolve('Slow success!'), 3000);
    });

    promise(slowPromise, {
      loading: 'This will take 3 seconds...',
      success: (data) => `Completed: ${data}`,
      error: 'Slow operation failed',
    });
  };

  const handleFailingPromise = () => {
    const failingPromise = new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('Simulated failure')), 1500);
    });

    promise(failingPromise, {
      loading: 'Processing (will fail)...',
      success: 'This won\'t show',
      error: (error: Error) => `Error: ${error.message}`,
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="contained" onClick={handleQuickPromise}>
        Quick Promise (1s)
      </Button>
      <Button variant="contained" onClick={handleSlowPromise}>
        Slow Promise (3s)
      </Button>
      <Button variant="outlined" color="error" onClick={handleFailingPromise}>
        Failing Promise
      </Button>
    </Box>
  );
};

export const PromiseHandling: Story = {
  render: () => <PromiseHandlingComponent />,
};

// Required story export: AllVariants
const AllVariantsComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Toast message="Default variant" variant="default" />
    <Toast message="Success variant" variant="success" />
    <Toast message="Error variant" variant="error" />
    <Toast message="Warning variant" variant="warning" />
    <Toast message="Info variant" variant="info" />
    <Toast message="Promise variant (loading)" variant="promise" />
  </Box>
);

export const AllVariants: Story = {
  render: () => <AllVariantsComponent />,
  parameters: {
    docs: {
      description: {
        story: 'All available toast variants displayed together.',
      },
    },
  },
};

// Required story export: AllSizes
const AllSizesComponent = () => {
  const { addToast } = useToast();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        variant="contained"
        onClick={() =>
          addToast({
            message: 'Short message',
            variant: 'info',
          })
        }
      >
        Short Toast
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          addToast({
            message: 'This is a medium length toast message with more content to display to the user.',
            variant: 'info',
          })
        }
      >
        Medium Toast
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          addToast({
            message: 'This is a very long toast message that contains a lot of information and will likely wrap to multiple lines. It includes detailed instructions and explanations that might be necessary for complex user notifications or system messages that require more context.',
            variant: 'info',
            duration: 10000,
          })
        }
      >
        Long Toast
      </Button>
    </Box>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications with different content lengths.',
      },
    },
  },
};

// Required story export: AllStates
const AllStatesComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Toast message="Normal state" variant="info" />
    <Toast message="With close button" variant="info" closable={true} />
    <Toast message="Without close button" variant="info" closable={false} />
    <Toast
      message="With action button"
      variant="success"
      action={{
        label: 'Undo',
        onClick: () => {
          // Action clicked
        },
      }}
    />
    <Toast message="Glass effect enabled" variant="info" glass={true} />
    <Toast message="Persistent toast (no auto-dismiss)" variant="warning" persistent={true} />
  </Box>
);

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Different toast states and configurations.',
      },
    },
  },
};

// Required story export: InteractiveStates
const InteractiveStatesComponent = () => {
  const { addToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          p: 2,
          border: '1px solid',
          borderColor: isHovered ? 'primary.main' : 'divider',
          borderRadius: 1,
          transition: 'all 0.3s',
        }}
      >
        <Toast
          message={isHovered ? 'Toast is hovered' : 'Hover over this area'}
          variant={isHovered ? 'success' : 'default'}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          addToast({
            message: 'Click the close button or wait 5 seconds',
            variant: 'info',
            duration: 5000,
            closable: true,
          });
        }}
      >
        Show Dismissible Toast
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          addToast({
            message: 'Interactive toast with action',
            variant: 'success',
            action: {
              label: 'View Details',
              onClick: () => {
                addToast({
                  message: 'Action button was clicked!',
                  variant: 'info',
                });
              },
            },
          });
        }}
      >
        Toast with Interactive Action
      </Button>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive toast states including hover and click interactions.',
      },
    },
  },
};

// Required story export: Responsive
const ResponsiveComponent = () => {
  const { addToast } = useToast();

  const showResponsiveToast = (position: string) => {
    addToast({
      message: `Toast at ${position}`,
      variant: 'info',
      duration: 3000,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Typography variant="h6">Responsive Toast Positions</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1 }}>
        <Button variant="outlined" onClick={() => showResponsiveToast('top-left')}>
          Top Left
        </Button>
        <Button variant="outlined" onClick={() => showResponsiveToast('top-center')}>
          Top Center
        </Button>
        <Button variant="outlined" onClick={() => showResponsiveToast('top-right')}>
          Top Right
        </Button>
        <Button variant="outlined" onClick={() => showResponsiveToast('bottom-left')}>
          Bottom Left
        </Button>
        <Button variant="outlined" onClick={() => showResponsiveToast('bottom-center')}>
          Bottom Center
        </Button>
        <Button variant="outlined" onClick={() => showResponsiveToast('bottom-right')}>
          Bottom Right
        </Button>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Toasts adapt to different screen sizes and maintain proper positioning
      </Typography>
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveComponent />,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Toast notifications adapt to different screen sizes and positions.',
      },
    },
  },
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
            <Toast message="Compact toast notification" variant="info" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Toast message="Normal toast notification" variant="success" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Toast message="Spacious toast notification" variant="warning" />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
