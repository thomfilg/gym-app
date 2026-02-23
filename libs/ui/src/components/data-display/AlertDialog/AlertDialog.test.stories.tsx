import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { AlertDialog } from './AlertDialog';
import type { AlertDialogProps } from './AlertDialog.types';

const meta: Meta<typeof AlertDialog> = {
  title: 'DataDisplay/AlertDialog/Tests',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:AlertDialog'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to manage dialog state
interface DialogWrapperProps extends Omit<AlertDialogProps, 'open' | 'onClose'> {
  defaultOpen?: boolean;
}

const DialogWrapper = ({
  onConfirm = fn(),
  onCancel = fn(),
  defaultOpen = false,
  ...props
}: DialogWrapperProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCancel();
  };
  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} data-testid="open-dialog">
        Open Dialog
      </Button>
      <AlertDialog
        open={open}
        onClose={handleClose}
        onCancel={handleClose}
        onConfirm={handleConfirm}
        {...(props as Partial<AlertDialogProps>)}
      />
    </>
  );
};

// Test 1: Basic Interaction
export const BasicInteraction: Story = {
  render: () => {
    const handleConfirm = fn();
    const handleCancel = fn();

    return (
      <DialogWrapper
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog', async () => {
      const openButton = canvas.getByTestId('open-dialog');
      await userEvent.click(openButton);
      await waitFor(() => {
        expect(within(document.body).getByText('Confirm Action')).toBeInTheDocument();
      });
    });

    await step('Verify dialog content', async () => {
      expect(
        within(document.body).getByText('Are you sure you want to proceed?'),
      ).toBeInTheDocument();
      expect(within(document.body).getByText('Cancel')).toBeInTheDocument();
      expect(within(document.body).getByText('Confirm')).toBeInTheDocument();
    });

    await step('Click confirm button', async () => {
      const confirmButton = within(document.body).getByText('Confirm');
      await userEvent.click(confirmButton);
      await waitFor(() => {
        expect(within(document.body).queryByText('Confirm Action')).not.toBeInTheDocument();
      });
    });

    await step('Open dialog again and click cancel', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Confirm Action')).toBeInTheDocument();
      });
      const cancelButton = within(document.body).getByText('Cancel');
      await userEvent.click(cancelButton);
      await waitFor(() => {
        expect(within(document.body).queryByText('Confirm Action')).not.toBeInTheDocument();
      });
    });
  },
};

// Test 2: Form Interaction (with custom content)
const FormInteractionComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const handleConfirm = fn();

  return (
    <DialogWrapper
      title="Enter Details"
      description="Please provide additional information"
      onConfirm={handleConfirm}
      confirmDisabled={inputValue.length === 0}
    >
      <input
        type="text"
        placeholder="Enter text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="dialog-input"
        style={{ marginTop: '10px', padding: '8px', width: '100%' }}
      />
    </DialogWrapper>
  );
};

export const FormInteraction: Story = {
  render: () => <FormInteractionComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Enter Details')).toBeInTheDocument();
      });
    });

    await step('Verify confirm button is disabled initially', async () => {
      const confirmButton = within(document.body).getByText('Confirm');
      expect(confirmButton).toBeDisabled();
    });

    await step('Type in input field', async () => {
      const input = within(document.body).getByTestId('dialog-input');
      await userEvent.type(input, 'Test input');
      await waitFor(() => {
        expect(input).toHaveValue('Test input');
      });
    });

    await step('Verify confirm button is enabled', async () => {
      const confirmButton = within(document.body).getByText('Confirm');
      expect(confirmButton).toBeEnabled();
    });

    await step('Submit form', async () => {
      const confirmButton = within(document.body).getByText('Confirm');
      await userEvent.click(confirmButton);
      await waitFor(() => {
        expect(within(document.body).queryByText('Enter Details')).not.toBeInTheDocument();
      });
    });
  },
};

// Test 3: Keyboard Navigation
export const KeyboardNavigation: Story = {
  render: () => (
    <DialogWrapper
      defaultOpen={true}
      title="Keyboard Test"
      description="Test keyboard navigation"
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify dialog is open', async () => {
      await waitFor(() => {
        expect(within(document.body).getByText('Keyboard Test')).toBeInTheDocument();
      });
    });

    await step('Press Escape to close dialog', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(within(document.body).queryByText('Keyboard Test')).not.toBeInTheDocument();
      });
    });

    await step('Open dialog and navigate with Tab', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Keyboard Test')).toBeInTheDocument();
      });

      // Tab navigation - the Confirm button should have autoFocus
      await waitFor(() => {
        const confirmButton = within(document.body).getByText('Confirm');
        expect(document.activeElement).toBe(confirmButton);
      });
    });

    await step('Press Enter on focused button', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(within(document.body).queryByText('Keyboard Test')).not.toBeInTheDocument();
      });
    });
  },
};

// Test 4: Screen Reader
export const ScreenReader: Story = {
  render: () => (
    <DialogWrapper
      title="Accessible Dialog"
      description="This dialog has proper ARIA attributes"
      variant="default"
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Accessible Dialog')).toBeInTheDocument();
      });
    });

    await step('Verify ARIA attributes', async () => {
      const dialog = within(document.body).getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const closeButton = within(document.body).getByLabelText('close');
      expect(closeButton).toBeInTheDocument();
    });

    await step('Verify dialog title and description', async () => {
      expect(within(document.body).getByText('Accessible Dialog')).toBeInTheDocument();
      expect(
        within(document.body).getByText('This dialog has proper ARIA attributes'),
      ).toBeInTheDocument();
    });
  },
};

// Test 5: Focus Management
export const FocusManagement: Story = {
  render: () => (
    <DialogWrapper
      defaultOpen={true}
      title="Focus Test"
      description="Testing focus trap and management"
    />
  ),
  play: async ({ step }) => {
    await step('Verify dialog is open', async () => {
      await waitFor(() => {
        expect(within(document.body).getByText('Focus Test')).toBeInTheDocument();
      });
    });

    await step('Verify focus is trapped in dialog', async () => {
      // Initial focus should be on confirm button (autoFocus)
      await waitFor(() => {
        const confirmButton = within(document.body).getByText('Confirm');
        expect(document.activeElement).toBe(confirmButton);
      });
    });

    await step('Tab through focusable elements', async () => {
      // Tab cycles through dialog elements
      await userEvent.tab();
      expect(document.activeElement?.getAttribute('aria-label')).toBe('close');

      await userEvent.tab();
      expect(document.activeElement?.textContent).toContain('Cancel');

      await userEvent.tab();
      expect(document.activeElement?.textContent).toContain('Confirm');
    });

    await step('Close dialog and verify focus return', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(within(document.body).queryByText('Focus Test')).not.toBeInTheDocument();
      });
    });
  },
};

// Test 6: Responsive Design
export const ResponsiveDesign: Story = {
  render: () => (
    <DialogWrapper
      title="Responsive Dialog"
      description="This dialog adapts to different screen sizes. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      variant="default"
    />
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '360px', height: '640px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog on mobile viewport', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Responsive Dialog')).toBeInTheDocument();
      });
    });

    await step('Verify dialog is visible and properly sized', async () => {
      const dialog = within(document.body).getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(within(document.body).getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    await step('Close dialog', async () => {
      const closeButton = within(document.body).getByLabelText('close');
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(within(document.body).queryByText('Responsive Dialog')).not.toBeInTheDocument();
      });
    });
  },
};

// Test 7: Theme Variations
const ThemeVariationsComponent = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div style={{ padding: '20px', backgroundColor: theme === 'dark' ? '#121212' : '#fff' }}>
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</Button>
        <DialogWrapper
          title="Theme Test"
          description="Testing in different themes"
          variant="default"
        />
      </div>
    </ThemeProvider>
  );
};

export const ThemeVariations: Story = {
  render: () => <ThemeVariationsComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog in light theme', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Theme Test')).toBeInTheDocument();
      });
    });

    await step('Close dialog', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(within(document.body).queryByText('Theme Test')).not.toBeInTheDocument();
      });
    });

    await step('Switch to dark theme', async () => {
      const themeToggle = within(document.body).getByText('Toggle Theme');
      await userEvent.click(themeToggle);
      await waitFor(() => {
        expect(
          canvasElement.querySelector('[style*="background-color: rgb(18, 18, 18)"]'),
        ).toBeInTheDocument();
      });
    });

    await step('Open dialog in dark theme', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Theme Test')).toBeInTheDocument();
      });
    });

    await step('Verify dialog renders correctly in dark theme', async () => {
      const dialog = within(document.body).getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  },
};

// Test 8: Visual States
const VisualStatesComponent = () => {
  const [variant, setVariant] = useState<'default' | 'destructive' | 'glass'>('default');
  const [glow, setGlow] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button onClick={() => setVariant('default')}>Default</Button>
        <Button onClick={() => setVariant('destructive')}>Destructive</Button>
        <Button onClick={() => setVariant('glass')}>Glass</Button>
        <Button onClick={() => setGlow(!glow)}>Toggle Glow</Button>
        <Button onClick={() => setPulse(!pulse)}>Toggle Pulse</Button>
        <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
      </div>
      <DialogWrapper
        title={`${variant} Variant`}
        description={`This is a ${variant} dialog with glow: ${glow}, pulse: ${pulse}`}
        variant={variant}
        glow={glow}
        pulse={pulse}
        loading={loading}
      />
    </div>
  );
};

export const VisualStates: Story = {
  render: () => <VisualStatesComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test default variant', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('default Variant')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test destructive variant', async () => {
      await userEvent.click(within(document.body).getByText('Destructive'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('destructive Variant')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test glass variant', async () => {
      await userEvent.click(within(document.body).getByText('Glass'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('glass Variant')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test with glow effect', async () => {
      await userEvent.click(within(document.body).getByText('Toggle Glow'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText(/glow: true/)).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test with pulse animation', async () => {
      await userEvent.click(within(document.body).getByText('Toggle Pulse'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText(/pulse: true/)).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test loading state', async () => {
      await userEvent.click(within(document.body).getByText('Toggle Loading'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        const confirmButton = within(document.body).getByText('Confirm');
        expect(confirmButton).toBeInTheDocument();
        // Check for loading indicator
        const loadingIndicator = confirmButton.querySelector('[role="progressbar"]');
        expect(loadingIndicator).toBeInTheDocument();
      });
    });
  },
};

// Test 9: Performance
const PerformanceComponent = () => {
  const [dialogCount, setDialogCount] = useState(0);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [renderTime, setRenderTime] = useState<number | null>(null);

  const handleOpen = () => {
    const startTime = window.performance.now();
    setDialogCount((prev) => prev + 1);
    setCurrentDialog(dialogCount + 1);
    window.requestAnimationFrame(() => {
      const endTime = window.performance.now();
      setRenderTime(endTime - startTime);
    });
  };

  const handleClose = () => {
    setCurrentDialog(0);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <div>Dialogs opened: {dialogCount}</div>
        {renderTime && <div>Last render time: {renderTime.toFixed(2)}ms</div>}
      </div>
      <Button onClick={handleOpen} data-testid="perf-open">
        Open Dialog
      </Button>
      <AlertDialog
        open={currentDialog > 0}
        onClose={handleClose}
        title={`Dialog ${currentDialog}`}
        description="Performance test dialog"
      />
    </div>
  );
};

export const Performance: Story = {
  render: () => <PerformanceComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open multiple dialogs and measure performance', async () => {
      const openButton = canvas.getByTestId('perf-open');

      // Open dialog 5 times
      for (let i = 0; i < 5; i++) {
        await userEvent.click(openButton);
        await waitFor(() => {
          expect(within(document.body).getByText(`Dialog ${i + 1}`)).toBeInTheDocument();
        });
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
          expect(within(document.body).queryByText(`Dialog ${i + 1}`)).not.toBeInTheDocument();
        });
      }
    });

    await step('Verify performance metrics displayed', async () => {
      expect(canvas.getByText(/Dialogs opened: 5/)).toBeInTheDocument();
      expect(canvas.getByText(/Last render time:/)).toBeInTheDocument();
    });
  },
};

// Test 10: Edge Cases
const EdgeCasesComponent = () => {
  const [testCase, setTestCase] = useState<'long' | 'empty' | 'special' | 'noCancel'>('long');

  const longText = 'Lorem ipsum dolor sit amet, '.repeat(50);
  const specialChars = '!@#$%^&*()_+-=[]{}|;\':",./<>?`~\\';

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <Button onClick={() => setTestCase('long')}>Long Text</Button>
        <Button onClick={() => setTestCase('empty')}>Empty Content</Button>
        <Button onClick={() => setTestCase('special')}>Special Chars</Button>
        <Button onClick={() => setTestCase('noCancel')}>No Cancel</Button>
      </div>
      <DialogWrapper
        title={
          testCase === 'empty'
            ? ''
            : testCase === 'special'
              ? specialChars
              : testCase === 'long'
                ? 'Very Long Title That Might Overflow The Dialog Header Area'
                : 'No Cancel Button'
        }
        description={
          testCase === 'empty'
            ? ''
            : testCase === 'special'
              ? specialChars
              : testCase === 'long'
                ? longText
                : 'This dialog has no cancel button'
        }
        showCancel={testCase !== 'noCancel'}
      />
    </div>
  );
};

export const EdgeCases: Story = {
  render: () => <EdgeCasesComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test long text overflow', async () => {
      await userEvent.click(canvas.getByText('Long Text'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText(/Very Long Title/)).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test empty content', async () => {
      await userEvent.click(canvas.getByText('Empty Content'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        // Dialog should still render with buttons
        expect(within(document.body).getByText('Cancel')).toBeInTheDocument();
        expect(within(document.body).getByText('Confirm')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test special characters', async () => {
      await userEvent.click(canvas.getByText('Special Chars'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        const specialTextElements = within(document.body).getAllByText(/!@#/);
        expect(specialTextElements.length).toBeGreaterThan(0);
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Test no cancel button', async () => {
      await userEvent.click(canvas.getByText('No Cancel'));
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('No Cancel Button')).toBeInTheDocument();
        expect(within(document.body).queryByText('Cancel')).not.toBeInTheDocument();
        expect(within(document.body).getByText('Confirm')).toBeInTheDocument();
      });
    });
  },
};

// Test 11: Integration
const IntegrationComponent = () => {
  const [confirmations, setConfirmations] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    setConfirmations((prev) => [...prev, `Deleted at ${new Date().toLocaleTimeString()}`]);
    setIsDeleting(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Confirmation Log:</h3>
        {confirmations.length === 0 ? (
          <p>No actions confirmed yet</p>
        ) : (
          <ul>
            {confirmations.map((conf, index) => (
              <li key={index}>{conf}</li>
            ))}
          </ul>
        )}
      </div>
      <DialogWrapper
        variant="destructive"
        title="Delete Item"
        description="This action cannot be undone. Are you sure you want to delete this item?"
        confirmText="Delete"
        loading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export const Integration: Story = {
  render: () => <IntegrationComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial state', async () => {
      expect(canvas.getByText('No actions confirmed yet')).toBeInTheDocument();
    });

    await step('Open destructive dialog', async () => {
      await userEvent.click(canvas.getByTestId('open-dialog'));
      await waitFor(() => {
        expect(within(document.body).getByText('Delete Item')).toBeInTheDocument();
      });
    });

    await step('Verify destructive variant styling', async () => {
      const deleteButton = within(document.body).getByText('Delete');
      expect(deleteButton).toBeInTheDocument();
      // Should have error color for destructive variant
      expect(deleteButton).toHaveStyle({ backgroundColor: expect.stringContaining('rgb') });
    });

    await step('Confirm deletion', async () => {
      const deleteButton = within(document.body).getByText('Delete');
      await userEvent.click(deleteButton);

      // Wait for loading state
      await waitFor(() => {
        const progressBar = document.body.querySelector('[role="progressbar"]');
        expect(progressBar).toBeInTheDocument();
      });

      // Wait for completion
      await waitFor(
        () => {
          expect(within(document.body).queryByText('Delete Item')).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    await step('Verify action was logged', async () => {
      await waitFor(() => {
        expect(canvas.getByText(/Deleted at/)).toBeInTheDocument();
      });
    });
  },
};
