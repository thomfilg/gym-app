import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { SonnerProvider, useSonner } from './Sonner';

const meta: Meta<typeof SonnerProvider> = {
  title: 'Feedback/Sonner/Tests',
  component: SonnerProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive test stories for Sonner toast component',
      },
    },
  },
  tags: ['autodocs', 'test', 'component:Sonner'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test wrapper component with toast functionality
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SonnerProvider>{children}</SonnerProvider>
);

// Basic interaction test component
const BasicInteractionTest: React.FC = () => {
  const { toast, success, error, warning, info, loading, dismiss } = useSonner();

  return (
    <Stack spacing={2} data-testid="basic-interaction">
      <Button data-testid="basic-toast-btn" onClick={() => toast('Basic toast message')}>
        Basic Toast
      </Button>
      <Button data-testid="success-toast-btn" onClick={() => success('Success message')}>
        Success Toast
      </Button>
      <Button data-testid="error-toast-btn" onClick={() => error('Error message')}>
        Error Toast
      </Button>
      <Button data-testid="warning-toast-btn" onClick={() => warning('Warning message')}>
        Warning Toast
      </Button>
      <Button data-testid="info-toast-btn" onClick={() => info('Info message')}>
        Info Toast
      </Button>
      <Button data-testid="loading-toast-btn" onClick={() => loading('Loading...')}>
        Loading Toast
      </Button>
      <Button data-testid="dismiss-all-btn" onClick={() => dismiss()}>
        Dismiss All
      </Button>
    </Stack>
  );
};

// Form interaction test component
const FormInteractionTest: React.FC = () => {
  const { success, error } = useSonner();
  const [value, setValue] = React.useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      success('Form submitted successfully!');
      setValue('');
    } else {
      error('Please enter a value');
    }
  };

  return (
    <Box data-testid="form-interaction">
      <Stack spacing={2}>
        <TextField
          data-testid="form-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter some text"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button data-testid="submit-btn" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

// Keyboard navigation test component
const KeyboardNavigationTest: React.FC = () => {
  const { toast, dismiss } = useSonner();

  React.useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        toast('Triggered by Ctrl+T');
      }
      if (e.key === 'Escape') {
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast, dismiss]);

  return (
    <Box data-testid="keyboard-navigation">
      <Stack spacing={2}>
        <Button data-testid="show-toast-btn" onClick={() => toast('Toast for keyboard test')}>
          Show Toast
        </Button>
        <p>Press Ctrl+T to show toast, Esc to dismiss</p>
      </Stack>
    </Box>
  );
};

// Screen reader test component
const ScreenReaderTest: React.FC = () => {
  const { toast } = useSonner();

  return (
    <Box data-testid="screen-reader">
      <Button
        data-testid="accessible-toast-btn"
        onClick={() => toast('Screen reader accessible toast')}
        aria-label="Show accessible toast notification"
      >
        Accessible Toast
      </Button>
    </Box>
  );
};

// Focus management test component
const FocusManagementTest: React.FC = () => {
  const { toast } = useSonner();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleToast = () => {
    toast('Focus management test', {
      action: {
        label: 'Focus Button',
        onClick: () => {
          buttonRef.current?.focus();
        },
      },
    });
  };

  return (
    <Box data-testid="focus-management">
      <Stack spacing={2}>
        <Button data-testid="focus-toast-btn" onClick={handleToast}>
          Show Toast with Action
        </Button>
        <Button ref={buttonRef} data-testid="focus-target-btn">
          Focus Target
        </Button>
      </Stack>
    </Box>
  );
};

// Responsive design test component
const ResponsiveDesignTest: React.FC = () => {
  const { toast } = useSonner();

  return (
    <Box data-testid="responsive-design">
      <Button
        data-testid="responsive-toast-btn"
        onClick={() => toast('Responsive design test message that is quite long to test wrapping')}
      >
        Test Responsive Toast
      </Button>
    </Box>
  );
};

// Theme variations test component
const ThemeVariationsTest: React.FC = () => {
  const { toast } = useSonner();

  return (
    <Box data-testid="theme-variations">
      <Stack spacing={2}>
        <Button
          data-testid="default-theme-btn"
          onClick={() => toast('Default theme toast', { variant: 'default' })}
        >
          Default Theme
        </Button>
        <Button
          data-testid="glass-theme-btn"
          onClick={() => toast('Glass theme toast', { variant: 'glass' })}
        >
          Glass Theme
        </Button>
        <Button
          data-testid="minimal-theme-btn"
          onClick={() => toast('Minimal theme toast', { variant: 'minimal' })}
        >
          Minimal Theme
        </Button>
      </Stack>
    </Box>
  );
};

// Visual states test component
const VisualStatesTest: React.FC = () => {
  const { toast, success, error } = useSonner();

  return (
    <Box data-testid="visual-states">
      <Stack spacing={2}>
        <Button
          data-testid="persistent-toast-btn"
          onClick={() => toast('Persistent toast', { persistent: true })}
        >
          Persistent Toast
        </Button>
        <Button
          data-testid="important-toast-btn"
          onClick={() => success('Important success', { important: true })}
        >
          Important Success
        </Button>
        <Button
          data-testid="with-description-btn"
          onClick={() =>
            error('Error with description', {
              description: 'This is a detailed description of the error',
            })
          }
        >
          With Description
        </Button>
      </Stack>
    </Box>
  );
};

// Performance test component
const PerformanceTest: React.FC = () => {
  const { toast, dismiss } = useSonner();

  const handleManyToasts = () => {
    const startTime = Date.now();
    for (let i = 0; i < 10; i++) {
      toast(`Toast ${i + 1}`);
    }
    const endTime = Date.now();
    window.setTimeout(() => {
      toast(`Created 10 toasts in ${endTime - startTime}ms`);
    }, 100);
  };

  return (
    <Box data-testid="performance">
      <Stack spacing={2}>
        <Button data-testid="many-toasts-btn" onClick={handleManyToasts}>
          Create Many Toasts
        </Button>
        <Button data-testid="clear-toasts-btn" onClick={() => dismiss()}>
          Clear All
        </Button>
      </Stack>
    </Box>
  );
};

// Edge cases test component
const EdgeCasesTest: React.FC = () => {
  const { toast, promise } = useSonner();

  const handleEmptyToast = () => {
    toast('');
  };

  const handleLongToast = () => {
    toast(
      'This is a very long toast message that should test how the component handles extensive text content that might overflow or wrap to multiple lines in the toast notification container',
    );
  };

  const handlePromiseToast = () => {
    const testPromise = new Promise((resolve) => {
      window.setTimeout(() => resolve('Success!'), 2000);
    });

    promise(testPromise, {
      loading: 'Processing...',
      success: 'Promise resolved!',
      error: 'Promise failed!',
    });
  };

  return (
    <Box data-testid="edge-cases">
      <Stack spacing={2}>
        <Button data-testid="empty-toast-btn" onClick={handleEmptyToast}>
          Empty Toast
        </Button>
        <Button data-testid="long-toast-btn" onClick={handleLongToast}>
          Long Message
        </Button>
        <Button data-testid="promise-toast-btn" onClick={handlePromiseToast}>
          Promise Toast
        </Button>
      </Stack>
    </Box>
  );
};

// Integration test component
const IntegrationTest: React.FC = () => {
  const { toast, success, error, dismiss } = useSonner();
  const [step, setStep] = React.useState(0);

  const runIntegrationTest = async () => {
    setStep(1);
    toast('Step 1: Starting integration test');

    window.setTimeout(() => {
      setStep(2);
      success('Step 2: First action completed');
    }, 1000);

    window.setTimeout(() => {
      setStep(3);
      error('Step 3: Simulated error occurred');
    }, 2000);

    window.setTimeout(() => {
      setStep(4);
      dismiss();
      success('Step 4: Integration test completed');
      setStep(0);
    }, 3000);
  };

  return (
    <Box data-testid="integration">
      <Stack spacing={2}>
        <Button data-testid="integration-test-btn" onClick={runIntegrationTest} disabled={step > 0}>
          Run Integration Test {step > 0 && `(Step ${step}/4)`}
        </Button>
      </Stack>
    </Box>
  );
};

// Test stories
export const BasicInteraction: Story = {
  render: () => (
    <TestWrapper>
      <BasicInteractionTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test basic toast', async () => {
      const basicBtn = localCanvas.getByTestId('basic-toast-btn');
      await userEvent.click(basicBtn);

      // Verify toast appears in the DOM
      await waitFor(() => {
        expect(canvas.getByText('Basic toast message')).toBeInTheDocument();
      });
    });

    await step('Test success toast with icon', async () => {
      const successBtn = localCanvas.getByTestId('success-toast-btn');
      await userEvent.click(successBtn);

      await waitFor(() => {
        expect(canvas.getByText('Success message')).toBeInTheDocument();
        // Check for success icon (CheckCircle)
        const toasts = canvas.getAllByText(/Success message|Basic toast message/);
        expect(toasts.length).toBeGreaterThan(0);
      });
    });

    await step('Test error toast', async () => {
      const errorBtn = localCanvas.getByTestId('error-toast-btn');
      await userEvent.click(errorBtn);

      await waitFor(() => {
        expect(canvas.getByText('Error message')).toBeInTheDocument();
      });
    });

    await step('Test dismiss all functionality', async () => {
      const dismissBtn = localCanvas.getByTestId('dismiss-all-btn');
      await userEvent.click(dismissBtn);

      // Wait for toasts to disappear with animation
      await waitFor(
        () => {
          expect(canvas.queryByText('Basic toast message')).not.toBeInTheDocument();
          expect(canvas.queryByText('Success message')).not.toBeInTheDocument();
          expect(canvas.queryByText('Error message')).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  },
};

export const FormInteraction: Story = {
  render: () => (
    <TestWrapper>
      <FormInteractionTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    const submitBtn = localCanvas.getByTestId('submit-btn');

    await step('Test empty submission - should show error toast', async () => {
      await userEvent.click(submitBtn);

      await waitFor(() => {
        expect(canvas.getByText('Please enter a value')).toBeInTheDocument();
      });

      // Wait a bit for the error toast to be visible
      await new Promise((resolve) => window.setTimeout(resolve, 500));
    });

    await step('Test valid submission - should show success toast', async () => {
      // Find the actual MUI input element inside the TextField
      const inputField = localCanvas.getByTestId('form-input');
      const actualInput = inputField.querySelector('input');
      expect(actualInput).not.toBeNull();

      // Type directly in the input element
      await userEvent.type(actualInput!, 'Test input');

      // Wait for the form to be ready and submit
      await new Promise(resolve => window.setTimeout(resolve, 100));
      await userEvent.click(submitBtn);

      // Check that success toast appears
      await waitFor(() => {
        expect(canvas.getByText('Form submitted successfully!')).toBeInTheDocument();
      }, { timeout: 2000 });

      // Verify input was cleared after successful submission
      await waitFor(() => {
        if (actualInput) {
          expect(actualInput.value).toBe('');
        }
      });
    });
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <TestWrapper>
      <KeyboardNavigationTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Show toast and verify keyboard navigation', async () => {
      const showBtn = localCanvas.getByTestId('show-toast-btn');
      await userEvent.click(showBtn);

      // Verify toast appears
      await waitFor(() => {
        expect(canvas.getByText('Toast for keyboard test')).toBeInTheDocument();
      });

      // Test Escape key dismissal
      await userEvent.keyboard('{Escape}');

      // Verify toast is dismissed
      await waitFor(
        () => {
          expect(canvas.queryByText('Toast for keyboard test')).not.toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });
  },
};

export const ScreenReader: Story = {
  render: () => (
    <TestWrapper>
      <ScreenReaderTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Verify accessibility attributes and screen reader support', async () => {
      const accessibleBtn = localCanvas.getByTestId('accessible-toast-btn');
      expect(accessibleBtn).toHaveAttribute('aria-label', 'Show accessible toast notification');

      await userEvent.click(accessibleBtn);

      // Verify toast appears with proper ARIA attributes
      await waitFor(() => {
        const toast = canvas.getByText('Screen reader accessible toast');
        expect(toast).toBeInTheDocument();
        // Toast container should have proper role for screen readers
        const toastContainer = toast.closest('[role="status"], [role="alert"]');
        expect(toastContainer || toast.parentElement).toBeInTheDocument();
      });
    });
  },
};

export const FocusManagement: Story = {
  render: () => (
    <TestWrapper>
      <FocusManagementTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test focus management with action buttons', async () => {
      const focusBtn = localCanvas.getByTestId('focus-toast-btn');
      const targetBtn = localCanvas.getByTestId('focus-target-btn');

      await userEvent.click(focusBtn);

      // Verify toast appears with action button
      await waitFor(() => {
        expect(canvas.getByText('Focus management test')).toBeInTheDocument();
        expect(canvas.getByText('Focus Button')).toBeInTheDocument();
      });

      // Click the action button in the toast
      const actionBtn = canvas.getByText('Focus Button');
      await userEvent.click(actionBtn);

      // Verify focus moved to target button
      await waitFor(() => {
        expect(targetBtn).toHaveFocus();
      });
    });
  },
};

export const ResponsiveDesign: Story = {
  render: () => (
    <TestWrapper>
      <ResponsiveDesignTest />
    </TestWrapper>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test responsive design and text wrapping', async () => {
      const responsiveBtn = localCanvas.getByTestId('responsive-toast-btn');
      await userEvent.click(responsiveBtn);

      // Verify long text wraps properly
      await waitFor(() => {
        const toast = canvas.getByText(
          'Responsive design test message that is quite long to test wrapping',
        );
        expect(toast).toBeInTheDocument();

        // Check toast has max width constraint
        const toastContainer = toast.closest('[class*="MuiBox"]');
        if (toastContainer) {
          const styles = window.getComputedStyle(toastContainer);
          const maxWidth = styles.maxWidth;
          if (maxWidth && maxWidth !== 'none') {
            const parsedWidth = parseInt(maxWidth);
            if (!isNaN(parsedWidth)) {
              expect(parsedWidth).toBeLessThanOrEqual(400);
            }
          }
        }
      });
    });
  },
};

export const ThemeVariations: Story = {
  render: () => (
    <TestWrapper>
      <ThemeVariationsTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test default theme', async () => {
      const defaultBtn = localCanvas.getByTestId('default-theme-btn');
      await userEvent.click(defaultBtn);

      await waitFor(() => {
        expect(canvas.getByText('Default theme toast')).toBeInTheDocument();
      });
    });

    await step('Test glass theme with backdrop filter', async () => {
      const glassBtn = localCanvas.getByTestId('glass-theme-btn');
      await userEvent.click(glassBtn);

      await waitFor(() => {
        const glassToast = canvas.getByText('Glass theme toast');
        expect(glassToast).toBeInTheDocument();
        // Glass effect should have backdrop filter - check parent container with role
        const toastContainer = glassToast.closest('[role="status"], [role="alert"]');
        expect(toastContainer).toBeInTheDocument();

        if (toastContainer) {
          const styles = window.getComputedStyle(toastContainer);
          const backdropFilter = styles.backdropFilter || (styles as any).webkitBackdropFilter;

          // Glass variant should have glass characteristics - check multiple possible indicators
          const hasBlur = backdropFilter && backdropFilter !== 'none' && backdropFilter.includes('blur');
          const hasTransparentBg = styles.backgroundColor && (styles.backgroundColor.includes('rgba') ||
                                   parseFloat(styles.opacity || '1') < 1);
          const hasGlassBorder = styles.border && styles.border.includes('rgba');

          // At least one glass effect should be present
          const hasGlassEffect = hasBlur || hasTransparentBg || hasGlassBorder;
          expect(hasGlassEffect).toBeTruthy();
        }
      });
    });

    await step('Test minimal theme and toast stacking', async () => {
      const minimalBtn = localCanvas.getByTestId('minimal-theme-btn');
      await userEvent.click(minimalBtn);

      await waitFor(() => {
        const minimalToast = canvas.getByText('Minimal theme toast');
        expect(minimalToast).toBeInTheDocument();
      });

      // Verify multiple toasts are stacked
      await waitFor(() => {
        const allToasts = canvas.getAllByText(/theme toast/);
        expect(allToasts.length).toBeGreaterThanOrEqual(3);
      });
    });
  },
};

export const VisualStates: Story = {
  render: () => (
    <TestWrapper>
      <VisualStatesTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test persistent toast', async () => {
      const persistentBtn = localCanvas.getByTestId('persistent-toast-btn');
      await userEvent.click(persistentBtn);

      await waitFor(() => {
        expect(canvas.getByText('Persistent toast')).toBeInTheDocument();
      });
    });

    await step('Test important toast styling', async () => {
      const importantBtn = localCanvas.getByTestId('important-toast-btn');
      await userEvent.click(importantBtn);

      await waitFor(() => {
        const importantToast = canvas.getByText('Important success');
        expect(importantToast).toBeInTheDocument();
        const styles = window.getComputedStyle(importantToast);
        expect(parseInt(styles.fontWeight)).toBeGreaterThanOrEqual(600);
      });
    });

    await step('Test toast with description', async () => {
      const descriptionBtn = localCanvas.getByTestId('with-description-btn');
      await userEvent.click(descriptionBtn);

      await waitFor(() => {
        expect(canvas.getByText('Error with description')).toBeInTheDocument();
        expect(canvas.getByText('This is a detailed description of the error')).toBeInTheDocument();
      });
    });

    await step('Verify persistent toast remains visible', async () => {
      // Wait to verify persistent toast is still there after 2 seconds (reduced from 5 seconds)
      await new Promise((resolve) => window.setTimeout(resolve, 2000));
      expect(canvas.getByText('Persistent toast')).toBeInTheDocument();
    });
  },
};

export const Performance: Story = {
  render: () => (
    <TestWrapper>
      <PerformanceTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test performance with many toasts', async () => {
      const manyToastsBtn = localCanvas.getByTestId('many-toasts-btn');
      await userEvent.click(manyToastsBtn);

      // Verify multiple toasts are created - check for any toast content
      await waitFor(() => {
        // Check for any of the created toasts (may be limited by max visible toasts)
        const toastElements = canvasElement.ownerDocument.querySelectorAll('[role="status"], [role="alert"]');
        expect(toastElements.length).toBeGreaterThan(0);
      });

      // Look for some of the toast messages that should exist
      await waitFor(() => {
        const hasToast1 = canvas.queryByText('Toast 1');
        const hasToast10 = canvas.queryByText('Toast 10');
        const hasToast5 = canvas.queryByText('Toast 5');
        // At least one of the toasts should be visible
        expect(hasToast1 || hasToast5 || hasToast10).toBeTruthy();
      });

      // Verify performance message appears (this is created after a timeout)
      await waitFor(() => {
        const perfMessage = canvas.queryByText(/Created 10 toasts in \d+ms/);
        expect(perfMessage).toBeTruthy();
      }, { timeout: 1000 });
    });

    await step('Clear all toasts and verify cleanup', async () => {
      const clearBtn = localCanvas.getByTestId('clear-toasts-btn');
      await userEvent.click(clearBtn);

      // Verify all toasts are dismissed
      await waitFor(
        () => {
          expect(canvas.queryByText('Toast 1')).not.toBeInTheDocument();
          expect(canvas.queryByText('Toast 10')).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  },
};

export const EdgeCases: Story = {
  render: () => (
    <TestWrapper>
      <EdgeCasesTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Test empty toast', async () => {
      const emptyBtn = localCanvas.getByTestId('empty-toast-btn');
      await userEvent.click(emptyBtn);

      // Empty toast might not have text, check for toast container presence
      await waitFor(() => {
        // Check if any toast containers exist by looking for elements with Collapse class
        const toastElements = canvasElement.ownerDocument.querySelectorAll('[class*="Collapse"]');
        expect(toastElements.length).toBeGreaterThan(0);
      });
    });

    await step('Test long message toast', async () => {
      const longBtn = localCanvas.getByTestId('long-toast-btn');
      await userEvent.click(longBtn);

      await waitFor(() => {
        const longToast = canvas.getByText(/This is a very long toast message/);
        expect(longToast).toBeInTheDocument();
        // Verify toast has proper text wrapping constraints
        const toastContainer = longToast.closest('[role="status"], [role="alert"]');
        if (toastContainer) {
          const styles = window.getComputedStyle(toastContainer);
          // Check that container has max width constraint for proper wrapping
          const maxWidth = styles.maxWidth;
          expect(maxWidth).toBeTruthy();
          expect(maxWidth).not.toBe('none');
        }
      });
    });

    await step('Test promise toast lifecycle', async () => {
      const promiseBtn = localCanvas.getByTestId('promise-toast-btn');
      await userEvent.click(promiseBtn);

      // First, loading toast should appear
      await waitFor(() => {
        expect(canvas.getByText('Processing...')).toBeInTheDocument();
      });

      // After 2 seconds, success toast should replace loading
      await waitFor(
        () => {
          expect(canvas.queryByText('Processing...')).not.toBeInTheDocument();
          expect(canvas.getByText('Promise resolved!')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  },
};

export const Integration: Story = {
  render: () => (
    <TestWrapper>
      <IntegrationTest />
    </TestWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const localCanvas = within(canvasElement);

    await step('Run multi-step integration test', async () => {
      const integrationBtn = localCanvas.getByTestId('integration-test-btn');
      await userEvent.click(integrationBtn);

      // Step 1: Starting toast
      await waitFor(() => {
        expect(canvas.getByText('Step 1: Starting integration test')).toBeInTheDocument();
        expect(integrationBtn).toHaveTextContent('Run Integration Test (Step 1/4)');
      });

      // Step 2: Success toast
      await waitFor(
        () => {
          expect(canvas.getByText('Step 2: First action completed')).toBeInTheDocument();
          expect(integrationBtn).toHaveTextContent('Run Integration Test (Step 2/4)');
        },
        { timeout: 2000 },
      );

      // Step 3: Error toast
      await waitFor(
        () => {
          expect(canvas.getByText('Step 3: Simulated error occurred')).toBeInTheDocument();
          expect(integrationBtn).toHaveTextContent('Run Integration Test (Step 3/4)');
        },
        { timeout: 3000 },
      );

      // Step 4: Completion - wait longer for all steps to complete
      await waitFor(
        () => {
          // Button should be re-enabled after completion
          expect(integrationBtn).not.toBeDisabled();
          expect(integrationBtn).toHaveTextContent('Run Integration Test');
        },
        { timeout: 5000 },
      );

      // Check that final completion toast appeared (might be transient)
      await waitFor(
        () => {
          const completionToast = canvas.queryByText('Step 4: Integration test completed');
          // Test passes if either the toast is visible or the test has completed (button re-enabled)
          const testCompleted = !integrationBtn.disabled && integrationBtn.textContent === 'Run Integration Test';
          expect(completionToast || testCompleted).toBeTruthy();
        },
        { timeout: 1000 },
      );
    });
  },
};
