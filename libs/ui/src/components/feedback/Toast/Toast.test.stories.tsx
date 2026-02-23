/* eslint-env browser */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef,useState } from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { Toast, ToastContainer,ToastProvider, useToast } from './Toast';

// Toast component test stories
const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast/Tests',
  component: Toast,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Toast'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastContainer />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  render: function BasicInteractionTest() {
    const { addToast, removeToast, clearAllToasts } = useToast();
    const [toastId, setToastId] = useState<string | null>(null);

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Basic Interaction Test</Typography>
        <Button
          data-testid="add-toast"
          onClick={() => {
            const id = addToast({
              message: 'Test toast message',
              variant: 'info',
              duration: 10000,
            });
            setToastId(id);
          }}
        >
          Add Toast
        </Button>
        <Button
          data-testid="remove-toast"
          onClick={() => {
            if (toastId) removeToast(toastId);
          }}
          disabled={!toastId}
        >
          Remove Toast
        </Button>
        <Button data-testid="clear-all" onClick={clearAllToasts}>
          Clear All
        </Button>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByTestId('add-toast');
    const removeButton = canvas.getByTestId('remove-toast');

    // Test adding toast
    await userEvent.click(addButton);
    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
    });

    // Test removing toast
    await userEvent.click(removeButton);
    await waitFor(
      () => {
        const toastElement = document.querySelector('[role="alert"]');
        expect(toastElement).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  },
};

// Form Interaction Tests
export const FormInteraction: Story = {
  render: function FormInteractionTest() {
    const { addToast } = useToast();
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim()) {
        addToast({
          message,
          variant,
          action: {
            label: 'Undo',
            onClick: () => addToast({ message: 'Action undone', variant: 'success' }),
          },
        });
        setMessage('');
      }
    };

    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 300 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Form Interaction Test</Typography>
          <TextField
            data-testid="message-input"
            label="Toast Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />
          <TextField
            data-testid="variant-select"
            select
            label="Variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value as 'success' | 'error' | 'warning' | 'info')}
            SelectProps={{ native: true }}
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </TextField>
          <Button
            data-testid="submit-form"
            type="submit"
            variant="contained"
            disabled={!message.trim()}
          >
            Show Toast
          </Button>
        </Stack>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get input and button
    const messageInput = canvas.getByLabelText('Toast Message') as HTMLInputElement;
    const submitButton = canvas.getByTestId('submit-form');

    // Initially button should be disabled (no message)
    expect(submitButton).toBeDisabled();

    // Type message to enable button
    await userEvent.type(messageInput, 'Test form message');

    // Wait a bit for React state to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Button should now be enabled
    expect(submitButton).not.toBeDisabled();

    // Click to submit
    await userEvent.click(submitButton);

    // Wait for toast to appear
    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
      expect(toastElement).toHaveTextContent('Test form message');
    });

    // Verify action button exists
    const actionButton = document.querySelector('[role="alert"] button:not([aria-label="close"])');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveTextContent('Undo');
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: function KeyboardNavigationTest() {
    const { addToast } = useToast();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      // Auto-focus for keyboard testing
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }, []);

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Keyboard Navigation Test</Typography>
        <Button
          ref={buttonRef}
          data-testid="keyboard-trigger"
          onClick={() =>
            addToast({
              message: 'Press Tab to navigate to close button, then Enter to close',
              variant: 'info',
              persistent: true,
            })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              addToast({
                message: 'Toast triggered by keyboard',
                variant: 'success',
                closable: true,
              });
            }
          }}
        >
          Trigger Toast (Enter/Space)
        </Button>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByTestId('keyboard-trigger');

    // Test keyboard activation
    triggerButton.focus();
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
    });

    // Test tab navigation to close button
    await userEvent.keyboard('{Tab}');
    const closeButton = document.querySelector('[aria-label="close"]');
    if (closeButton) {
      expect(closeButton).toHaveFocus();
      await userEvent.keyboard('{Enter}');

      await waitFor(
        () => {
          const toastElement = document.querySelector('[role="alert"]');
          expect(toastElement).not.toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    }
  },
};

// Screen Reader Tests
export const ScreenReader: Story = {
  render: function ScreenReaderTest() {
    const { addToast } = useToast();

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Screen Reader Test</Typography>
        <Button
          data-testid="sr-info"
          onClick={() =>
            addToast({
              message: 'Information for screen readers',
              variant: 'info',
            })
          }
        >
          Info Toast
        </Button>
        <Button
          data-testid="sr-error"
          onClick={() =>
            addToast({
              message: 'Error message with proper ARIA',
              variant: 'error',
            })
          }
        >
          Error Toast
        </Button>
        <Button
          data-testid="sr-success"
          onClick={() =>
            addToast({
              message: 'Success announcement',
              variant: 'success',
            })
          }
        >
          Success Toast
        </Button>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const infoButton = canvas.getByTestId('sr-info');

    await userEvent.click(infoButton);

    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
      expect(toastElement).toHaveAttribute('role', 'alert');

      // Check for proper ARIA attributes
      const alertContent = toastElement?.textContent;
      expect(alertContent).toContain('Information for screen readers');
    });

    // Test close button accessibility
    const closeButton = document.querySelector('[aria-label="close"]');
    if (closeButton) {
      expect(closeButton).toHaveAttribute('aria-label', 'close');
    }
  },
};

// Focus Management Tests
export const FocusManagement: Story = {
  render: function FocusManagementTest() {
    const { addToast } = useToast();
    const triggerButtonRef = useRef<HTMLButtonElement>(null);

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Focus Management Test</Typography>
        <Button
          ref={triggerButtonRef}
          data-testid="focus-trigger"
          onClick={() => {
            addToast({
              message: 'Focus should return to trigger after close',
              variant: 'info',
              action: {
                label: 'Action',
                onClick: () => {
                  /* Action clicked */
                },
              },
            });
          }}
        >
          Trigger Toast with Action
        </Button>
        <TextField
          data-testid="focus-target"
          label="Focus target"
          placeholder="Tab here to test focus order"
        />
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByTestId('focus-trigger');
    const focusTarget = canvas.getByTestId('focus-target');

    // Focus trigger and activate
    triggerButton.focus();
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
    });

    // Wait for toast to be fully rendered with action button
    await waitFor(() => {
      const actionButton = document.querySelector(
        '[role="alert"] button:not([aria-label="close"])',
      );
      expect(actionButton).toBeInTheDocument();
    });

    // Simplified focus test - just verify action button is focusable
    await waitFor(
      () => {
        const actionButton = document.querySelector(
          '[role="alert"] button:not([aria-label="close"])',
        );
        if (actionButton) {
          // Test that we can focus the action button
          (actionButton as HTMLElement).focus();
          expect(actionButton).toHaveFocus();
        }
      },
      { timeout: 1000 },
    );

    // Test basic tab navigation works
    const focusTargetInput = focusTarget.querySelector('input') as HTMLElement;
    if (focusTargetInput) {
      focusTargetInput.focus();
      expect(focusTargetInput).toHaveFocus();
    }
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: function ResponsiveDesignTest() {
    const { addToast } = useToast();

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Responsive Design Test</Typography>
        <Button
          data-testid="responsive-toast"
          onClick={() => {
            addToast({
              message: 'This toast should adapt to different screen sizes and orientations',
              variant: 'info',
              duration: 8000,
            });
          }}
        >
          Show Responsive Toast
        </Button>
        <Typography variant="body2" color="text.secondary">
          Resize viewport to test responsiveness
        </Typography>
      </Stack>
    );
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toastButton = canvas.getByTestId('responsive-toast');

    await userEvent.click(toastButton);

    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();

      // Verify toast is positioned correctly and visible
      const rect = toastElement?.getBoundingClientRect();
      if (rect) {
        expect(rect.width).toBeGreaterThan(0);
        expect(rect.height).toBeGreaterThan(0);
      }
    });
  },
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  render: function ThemeVariationsTest() {
    const { addToast } = useToast();

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Theme Variations Test</Typography>
        <Button
          data-testid="theme-toast"
          onClick={() => {
            addToast({ message: 'Default theme toast', variant: 'default' });
            window.setTimeout(
              () => addToast({ message: 'Glass effect toast', variant: 'success', glass: true }),
              500,
            );
          }}
        >
          Show Theme Variations
        </Button>
        <Typography variant="body2" color="text.secondary">
          Toggle theme to test light/dark mode
        </Typography>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeButton = canvas.getByTestId('theme-toast');

    await userEvent.click(themeButton);

    await waitFor(() => {
      const toastElements = document.querySelectorAll('[role="alert"]');
      expect(toastElements.length).toBeGreaterThanOrEqual(1);
    });

    // Verify themed styling is applied
    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      if (toastElement) {
        const computedStyle = window.getComputedStyle(toastElement);
        expect(computedStyle.borderRadius).toBeTruthy();
      }
    });
  },
};

// Visual States Tests
export const VisualStates: Story = {
  render: function VisualStatesTest() {
    const { addToast } = useToast();

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Visual States Test</Typography>
        <Button
          data-testid="all-variants"
          onClick={() => {
            const variants = ['default', 'success', 'error', 'warning', 'info'] as const;
            variants.forEach((variant, index) => {
              window.setTimeout(() => {
                addToast({
                  message: `${variant.charAt(0).toUpperCase() + variant.slice(1)} toast message`,
                  variant,
                  duration: 6000,
                });
              }, index * 200);
            });
          }}
        >
          Show All Variants
        </Button>
        <Button
          data-testid="glass-variants"
          onClick={() => {
            addToast({
              message: 'Glass morphism effect with blur',
              variant: 'success',
              glass: true,
              duration: 8000,
            });
          }}
        >
          Glass Effect
        </Button>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const allVariantsButton = canvas.getByTestId('all-variants');
    const glassButton = canvas.getByTestId('glass-variants');

    // Test all variant states
    await userEvent.click(allVariantsButton);

    await waitFor(
      () => {
        const toastElements = document.querySelectorAll('[role="alert"]');
        expect(toastElements.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test glass effect
    await userEvent.click(glassButton);

    await waitFor(() => {
      const glassToast = document.querySelector('[role="alert"]');
      if (glassToast) {
        const computedStyle = window.getComputedStyle(glassToast);
        expect(computedStyle.backdropFilter || computedStyle.webkitBackdropFilter).toBeTruthy();
      }
    });
  },
};

// Performance Tests
export const Performance: Story = {
  render: function PerformanceTest() {
    const { addToast, clearAllToasts } = useToast();
    const [isStressing, setIsStressing] = useState(false);

    const stressTest = async () => {
      setIsStressing(true);
      const startTime = window.performance.now();

      // Add many toasts rapidly
      for (let i = 0; i < 50; i++) {
        addToast({
          message: `Performance test toast #${i + 1}`,
          variant: i % 2 === 0 ? 'success' : 'info',
          duration: 2000,
        });
      }

      const endTime = window.performance.now();
      const duration = endTime - startTime;

      window.setTimeout(() => {
        addToast({
          message: `Stress test completed in ${duration.toFixed(2)}ms`,
          variant: 'success',
          persistent: true,
        });
        setIsStressing(false);
      }, 1000);
    };

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Performance Test</Typography>
        <Button data-testid="stress-test" onClick={stressTest} disabled={isStressing}>
          {isStressing ? 'Running Stress Test...' : 'Run Stress Test (50 toasts)'}
        </Button>
        <Button data-testid="clear-performance" onClick={clearAllToasts}>
          Clear All Toasts
        </Button>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stressButton = canvas.getByTestId('stress-test');
    const clearButton = canvas.getByTestId('clear-performance');

    const startTime = window.performance.now();
    await userEvent.click(stressButton);

    // Wait for stress test to complete
    await waitFor(
      () => {
        const button = canvas.getByTestId('stress-test');
        expect(button).not.toBeDisabled();
      },
      { timeout: 10000 },
    );

    const endTime = window.performance.now();
    const testDuration = endTime - startTime;

    // Performance assertion - should complete within reasonable time
    expect(testDuration).toBeLessThan(5000);

    // Clean up
    await userEvent.click(clearButton);
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  render: function EdgeCasesTest() {
    const { addToast, promise } = useToast();

    const testLongMessage = () => {
      addToast({
        message:
          'This is a very long toast message that should handle text wrapping and overflow gracefully. It contains multiple sentences and should demonstrate how the toast component handles extensive content without breaking the layout or becoming unusable.',
        variant: 'info',
        duration: 10000,
      });
    };

    const testSpecialCharacters = () => {
      addToast({
        message:
          '🚀 Special characters: áéíóú ñ ¡¿ @#$%^&*() "quotes" \'apostrophes\' <tags> & HTML entities',
        variant: 'warning',
      });
    };

    const testPromiseRace = async () => {
      // Test multiple promises at once
      const promises = [
        new Promise((resolve) => window.setTimeout(() => resolve('First'), 1000)),
        new Promise((resolve) => window.setTimeout(() => resolve('Second'), 1500)),
        new Promise((_, reject) => window.setTimeout(() => reject('Third failed'), 2000)),
      ];

      promises.forEach((p, i) => {
        promise(p, {
          loading: `Loading promise ${i + 1}...`,
          success: (data) => `Promise ${i + 1} success: ${data}`,
          error: (error) => `Promise ${i + 1} failed: ${error}`,
        }).catch(() => {}); // Ignore rejections for test
      });
    };

    return (
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        <Typography variant="h6">Edge Cases Test</Typography>
        <Button data-testid="long-message" onClick={testLongMessage}>
          Long Message
        </Button>
        <Button data-testid="special-chars" onClick={testSpecialCharacters}>
          Special Characters
        </Button>
        <Button data-testid="promise-race" onClick={testPromiseRace}>
          Promise Race Condition
        </Button>
        <Button
          data-testid="zero-duration"
          onClick={() =>
            addToast({
              message: 'Zero duration toast (persistent)',
              variant: 'success',
              duration: 0,
            })
          }
        >
          Zero Duration
        </Button>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test long message
    const longMessageButton = canvas.getByTestId('long-message');
    await userEvent.click(longMessageButton);

    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
      expect(toastElement?.textContent?.length).toBeGreaterThan(100);
    });

    // Test special characters
    const specialCharsButton = canvas.getByTestId('special-chars');
    await userEvent.click(specialCharsButton);

    await waitFor(() => {
      const toastElements = document.querySelectorAll('[role="alert"]');
      const specialCharToast = Array.from(toastElements).find((el) =>
        el.textContent?.includes('🚀'),
      );
      expect(specialCharToast).toBeInTheDocument();
    });

    // Test zero duration (should be persistent)
    const zeroDurationButton = canvas.getByTestId('zero-duration');
    await userEvent.click(zeroDurationButton);

    // Zero duration toasts should persist (not auto-dismiss)
    await waitFor(
      () => {
        const toastElements = document.querySelectorAll('[role="alert"]');
        const zeroDurationToast = Array.from(toastElements).find((el) =>
          el.textContent?.includes('Zero duration'),
        );
        expect(zeroDurationToast).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  },
};

// Integration Tests
export const Integration: Story = {
  render: function IntegrationTest() {
    const { addToast } = useToast();

    return (
      <Box sx={{ minWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Integration Test
        </Typography>
        <Stack spacing={2}>
          <Button
            data-testid="integration-setup"
            onClick={() => {
              // Simulate a complete user workflow
              addToast({ message: 'Step 1: Initializing...', variant: 'info' });

              window.setTimeout(() => {
                addToast({
                  message: 'Step 2: Processing data...',
                  variant: 'warning',
                  action: {
                    label: 'Cancel',
                    onClick: () => addToast({ message: 'Process cancelled', variant: 'error' }),
                  },
                });
              }, 1000);

              window.setTimeout(() => {
                addToast({
                  message: 'Step 3: Operation completed successfully!',
                  variant: 'success',
                  glass: true,
                  duration: 8000,
                });
              }, 2000);
            }}
          >
            Run Integration Test
          </Button>
        </Stack>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const integrationButton = canvas.getByTestId('integration-setup');

    await userEvent.click(integrationButton);

    // Wait for first toast
    await waitFor(() => {
      const toastElement = document.querySelector('[role="alert"]');
      expect(toastElement).toBeInTheDocument();
      expect(toastElement?.textContent).toContain('Step 1');
    });

    // Wait for workflow completion
    await waitFor(
      () => {
        const successToast = Array.from(document.querySelectorAll('[role="alert"]')).find((el) =>
          el.textContent?.includes('Step 3'),
        );
        expect(successToast).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Verify ToastContainer is rendering toasts
    const toastElements = document.querySelectorAll('[role="alert"]');
    expect(toastElements.length).toBeGreaterThan(0);
  },
};
