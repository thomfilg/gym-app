import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React from 'react';

import { toast,Toaster } from './Sonner';

const meta: Meta<typeof Toaster> = {
  title: 'Feedback/Sonner',
  component: Toaster,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Beautiful, customizable toast notifications powered by Sonner. Provides elegant feedback for user actions with various styles and positions.',
      },
    },
  },
  tags: ['autodocs', 'component:Sonner'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Toast position on screen',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'system'],
      description: 'Toast theme',
    },
    expand: {
      control: 'boolean',
      description: 'Expand toasts by default',
    },
    richColors: {
      control: 'boolean',
      description: 'Use rich colors for toast types',
    },
    closeButton: {
      control: 'boolean',
      description: 'Show close button on toasts',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button variant="contained" onClick={() => toast('This is a default toast notification')}>
        Show Toast
      </Button>
    </>
  ),
};

export const ToastTypes: Story = {
  render: () => (
    <>
      <Toaster richColors closeButton />
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => toast('Default toast message')}>
          Default Toast
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => toast.success('Operation completed successfully!')}
        >
          Success Toast
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => toast.error('Something went wrong. Please try again.')}
        >
          Error Toast
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() => toast.warning('Please review before proceeding')}
        >
          Warning Toast
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => toast.info('New updates are available')}
        >
          Info Toast
        </Button>
      </Stack>
    </>
  ),
};

const ToastPositionsComponent = () => {
  const [position, setPosition] = React.useState<
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  >('bottom-right');

  return (
    <>
      <Toaster position={position} />
      <Stack spacing={3}>
        <Typography variant="h6">Toast Position</Typography>

        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <Button
            variant={position === 'top-left' ? 'contained' : 'outlined'}
            onClick={() => {
              setPosition('top-left');
              toast('Top Left Position');
            }}
          >
            Top Left
          </Button>

          <Button
            variant={position === 'top-center' ? 'contained' : 'outlined'}
            onClick={() => {
              setPosition('top-center');
              toast('Top Center Position');
            }}
          >
            Top Center
          </Button>

          <Button
            variant={position === 'top-right' ? 'contained' : 'outlined'}
            onClick={() => {
              setPosition('top-right');
              toast('Top Right Position');
            }}
          >
            Top Right
          </Button>

          <Button
            variant={position === 'bottom-left' ? 'contained' : 'outlined'}
            onClick={() => {
              setPosition('bottom-left');
              toast('Bottom Left Position');
            }}
          >
            Bottom Left
          </Button>

          <Button
            variant={position === 'bottom-center' ? 'contained' : 'outlined'}
            onClick={() => {
              setPosition('bottom-center');
              toast('Bottom Center Position');
            }}
          >
            Bottom Center
          </Button>

          <Button
            variant={position === 'bottom-right' ? 'contained' : 'outlined'}
            onClick={() => {
              setPosition('bottom-right');
              toast('Bottom Right Position');
            }}
          >
            Bottom Right
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export const ToastPositions: Story = {
  render: () => <ToastPositionsComponent />,
};

export const CustomToasts: Story = {
  render: () => (
    <>
      <Toaster richColors />
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: {
                label: 'Undo',
                onClick: () => {
                  // Undo action would go here
                },
              },
            })
          }
        >
          Toast with Icon
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            const toastId = toast.loading('Uploading file...');
            window.setTimeout(() => {
              toast.success('File uploaded successfully!', {
                id: toastId,
              });
            }, 2000);
          }}
        >
          Loading Toast
        </Button>
      </Stack>
    </>
  ),
};

export const PromiseToast: Story = {
  render: () => (
    <>
      <Toaster richColors />
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            const promise = new Promise((resolve) => {
              window.setTimeout(() => {
                resolve({ name: 'Sonner' });
              }, 2000);
            });

            toast.promise(promise, {
              loading: 'Loading data...',
              success: 'Data loaded successfully!',
              error: 'Failed to load data',
            });
          }}
        >
          Promise Toast (Success)
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            const promise = new Promise((_, reject) => {
              window.setTimeout(() => {
                reject(new Error('Network error'));
              }, 2000);
            });

            toast.promise(promise, {
              loading: 'Saving changes...',
              success: 'Changes saved!',
              error: 'Failed to save changes',
            });
          }}
        >
          Promise Toast (Error)
        </Button>
      </Stack>
    </>
  ),
};

export const ActionToasts: Story = {
  render: () => (
    <>
      <Toaster closeButton richColors />
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            toast('Message deleted', {
              action: {
                label: 'Undo',
                onClick: () => toast.success('Message restored'),
              },
            });
          }}
        >
          Toast with Undo Action
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            toast.error('Connection failed', {
              action: {
                label: 'Retry',
                onClick: () => toast.success('Connected successfully'),
              },
            });
          }}
        >
          Error with Retry
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            toast('New version available', {
              action: {
                label: 'Update Now',
                onClick: () => toast.loading('Updating...'),
              },
              duration: Infinity,
            });
          }}
        >
          Persistent Toast with Action
        </Button>
      </Stack>
    </>
  ),
};

export const DurationControl: Story = {
  render: () => (
    <>
      <Toaster />
      <Stack spacing={2}>
        <Button
          variant="outlined"
          onClick={() => toast('Quick toast (2 seconds)', { duration: 2000 })}
        >
          2 Second Toast
        </Button>

        <Button
          variant="outlined"
          onClick={() => toast('Standard toast (4 seconds)', { duration: 4000 })}
        >
          4 Second Toast
        </Button>

        <Button
          variant="outlined"
          onClick={() => toast('Long toast (10 seconds)', { duration: 10000 })}
        >
          10 Second Toast
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            const id = toast('Persistent toast - click to dismiss', {
              duration: Infinity,
              onClick: () => toast.dismiss(id),
            });
          }}
        >
          Persistent Toast
        </Button>
      </Stack>
    </>
  ),
};

export const FormFeedback: Story = {
  render: () => {
    const handleSubmit = (success: boolean) => {
      if (success) {
        toast.success('Form submitted successfully!', {
          description: 'We\'ll get back to you within 24 hours.',
        });
      } else {
        toast.error('Please fix the errors below', {
          description: 'Some required fields are missing.',
        });
      }
    };

    return (
      <>
        <Toaster richColors position="top-center" />
        <Paper sx={{ p: 3, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Contact Form
          </Typography>

          <Stack spacing={2}>
            <input placeholder="Name" style={{ padding: '8px' }} />
            <input placeholder="Email" style={{ padding: '8px' }} />
            <textarea placeholder="Message" rows={4} style={{ padding: '8px' }} />

            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={() => handleSubmit(true)}>
                Submit (Success)
              </Button>

              <Button variant="outlined" color="error" onClick={() => handleSubmit(false)}>
                Submit (Error)
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => (
    <>
      <Toaster expand richColors />
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            toast.success('File 1 uploaded');
            toast.success('File 2 uploaded');
            toast.success('File 3 uploaded');
            toast.info('All files processed');
          }}
        >
          Show Multiple Toasts
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            toast('First notification');
            window.setTimeout(() => toast('Second notification'), 500);
            window.setTimeout(() => toast('Third notification'), 1000);
            window.setTimeout(() => toast('Fourth notification'), 1500);
          }}
        >
          Staggered Toasts
        </Button>

        <Button variant="outlined" color="error" onClick={() => toast.dismiss()}>
          Dismiss All
        </Button>
      </Stack>
    </>
  ),
};

const ThemedToastsComponent = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme === 'dark' ? 'grey.900' : 'grey.50',
        minHeight: 300,
      }}
    >
      <Toaster theme={theme} richColors />

      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <Button
            variant={theme === 'light' ? 'contained' : 'outlined'}
            onClick={() => setTheme('light')}
          >
            Light Theme
          </Button>

          <Button
            variant={theme === 'dark' ? 'contained' : 'outlined'}
            onClick={() => setTheme('dark')}
          >
            Dark Theme
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => toast.success(`Success in ${  theme  } theme`)}
          >
            Success
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => toast.error(`Error in ${  theme  } theme`)}
          >
            Error
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() => toast.info(`Info in ${  theme  } theme`)}
          >
            Info
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const ThemedToasts: Story = {
  render: () => <ThemedToastsComponent />,
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <>
      <Toaster richColors closeButton />
      <Stack spacing={2} direction="row" flexWrap="wrap">
        <Button variant="contained" onClick={() => toast('Default toast')}>
          Default
        </Button>
        <Button variant="contained" color="success" onClick={() => toast.success('Success!')}>
          Success
        </Button>
        <Button variant="contained" color="error" onClick={() => toast.error('Error!')}>
          Error
        </Button>
        <Button variant="contained" color="warning" onClick={() => toast.warning('Warning!')}>
          Warning
        </Button>
        <Button variant="contained" color="info" onClick={() => toast.info('Info!')}>
          Info
        </Button>
        <Button variant="outlined" onClick={() => toast.loading('Loading...')}>
          Loading
        </Button>
      </Stack>
    </>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <>
      <Toaster />
      <Stack spacing={2}>
        <Button variant="outlined" onClick={() => toast('Compact', { duration: 3000 })}>
          Default Size
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            toast('Toast with description', {
              description: 'This is additional information',
              duration: 3000,
            })
          }
        >
          With Description
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            toast('Toast with action', {
              action: { label: 'Undo', onClick: () => {} },
              duration: 3000,
            })
          }
        >
          With Action
        </Button>
      </Stack>
    </>
  ),
};

export const AllStates: Story = {
  render: () => (
    <>
      <Toaster richColors closeButton />
      <Stack spacing={2}>
        <Button variant="outlined" onClick={() => toast('Normal state toast')}>
          Normal
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            const id = toast.loading('Processing...');
            window.setTimeout(() => toast.success('Complete!', { id }), 2000);
          }}
        >
          Loading → Success
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            const id = toast.loading('Processing...');
            window.setTimeout(() => toast.error('Failed!', { id }), 2000);
          }}
        >
          Loading → Error
        </Button>
        <Button variant="outlined" onClick={() => toast('Hoverable toast', { duration: 10000 })}>
          Hover to Pause
        </Button>
      </Stack>
    </>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <>
      <Toaster closeButton richColors />
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() =>
            toast('Click to dismiss', {
              duration: Infinity,
              onClick: (t) => toast.dismiss(t.id),
            })
          }
        >
          Clickable Toast
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            toast('Toast with action', {
              action: {
                label: 'Undo',
                onClick: () => toast.success('Undone!'),
              },
            })
          }
        >
          With Action Button
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            toast('Dismissible toast', {
              duration: 10000,
            })
          }
        >
          With Close Button
        </Button>
        <Button variant="outlined" color="error" onClick={() => toast.dismiss()}>
          Dismiss All
        </Button>
      </Stack>
    </>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <>
      <Toaster position="bottom-center" />
      <Stack spacing={2}>
        <Typography variant="body2">Test on different screen sizes:</Typography>
        <Button variant="contained" onClick={() => toast('Mobile responsive toast')}>
          Show Toast (Mobile)
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            toast.success('Success notification', {
              description: 'This adapts to screen size',
            })
          }
        >
          With Description
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            toast('First toast');
            toast('Second toast');
            toast('Third toast');
          }}
        >
          Multiple Toasts
        </Button>
      </Stack>
    </>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <>
        <Toaster richColors />
        <Stack direction="row" spacing={4} alignItems="flex-start">
          <DensityProvider defaultMode="compact">
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                Compact (0.8x)
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => toast.success('Compact toast')}
              >
                Show Toast
              </Button>
            </Box>
          </DensityProvider>
          <DensityProvider defaultMode="normal">
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                Normal (1.0x)
              </Typography>
              <Button variant="outlined" onClick={() => toast.info('Normal toast')}>
                Show Toast
              </Button>
            </Box>
          </DensityProvider>
          <DensityProvider defaultMode="spacious">
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                Spacious (1.25x)
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => toast.warning('Spacious toast')}
              >
                Show Toast
              </Button>
            </Box>
          </DensityProvider>
        </Stack>
      </>
    );
  },
};
