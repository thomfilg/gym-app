import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, within } from 'storybook/test';

import { Modal, ModalContent } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal/Tests',
  component: Modal,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Modal'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC TESTS =====

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    open: true,
    onClose: fn(),
  },
  render: (args) => (
    <Modal {...args}>
      <ModalContent dataTestId="basic-modal-content">
        <Box data-testid="modal-inner-content">
          <Typography variant="h6" data-testid="modal-title">
            Test Modal
          </Typography>
          <Typography paragraph>This modal tests basic interaction patterns.</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button data-testid="cancel-button" onClick={args.onClose}>
              Cancel
            </Button>
            <Button variant="contained" data-testid="confirm-button" onClick={args.onClose}>
              Confirm
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  ),
  play: async ({ step }) => {
    await step('Verify modal is open and content is accessible', async () => {
      // Modal content should be in document since modal is open by default
      const modalContent = within(document.body).getByTestId('modal-inner-content');
      const modalTitle = within(document.body).getByTestId('modal-title');
      const cancelButton = within(document.body).getByTestId('cancel-button');
      const confirmButton = within(document.body).getByTestId('confirm-button');

      await expect(modalContent).toBeInTheDocument();
      await expect(modalTitle).toHaveTextContent('Test Modal');
      await expect(cancelButton).toBeInTheDocument();
      await expect(confirmButton).toBeInTheDocument();
    });

    await step('Test button interactions', async () => {
      const cancelButton = within(document.body).getByTestId('cancel-button');
      const confirmButton = within(document.body).getByTestId('confirm-button');

      // Test button hover states
      await userEvent.hover(cancelButton);
      await expect(cancelButton).toBeEnabled();

      await userEvent.hover(confirmButton);
      await expect(confirmButton).toBeEnabled();
    });
  },
};

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    open: true,
    onClose: fn(),
    'aria-labelledby': 'keyboard-modal-title',
    role: 'dialog',
    'aria-modal': true,
  },
  render: (args) => (
    <Modal {...args}>
      <ModalContent dataTestId="keyboard-modal-content">
        <Box data-testid="keyboard-modal">
          <Typography
            id="keyboard-modal-title"
            variant="h6"
            data-testid="first-focusable"
            tabIndex={0}
          >
            Keyboard Navigation Modal
          </Typography>
          <Typography paragraph>Test keyboard navigation and accessibility features.</Typography>
          <Button data-testid="second-focusable">First Button</Button>
          <Button data-testid="third-focusable" sx={{ ml: 1 }}>
            Second Button
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  ),
  play: async ({ step }) => {
    await step('Verify modal accessibility', async () => {
      const modal = within(document.body).getByRole('dialog');
      await expect(modal).toBeInTheDocument();
      await expect(modal).toHaveAttribute('aria-labelledby', 'keyboard-modal-title');
    });

    await step('Test keyboard navigation', async () => {
      const firstElement = within(document.body).getByTestId('first-focusable');
      const secondElement = within(document.body).getByTestId('second-focusable');
      const thirdElement = within(document.body).getByTestId('third-focusable');

      // Test that elements are focusable
      firstElement.focus();
      await expect(firstElement).toHaveFocus();

      // Test tab navigation
      await userEvent.tab();
      await expect(secondElement).toHaveFocus();

      await userEvent.tab();
      await expect(thirdElement).toHaveFocus();
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    open: true,
    onClose: fn(),
    size: 'lg',
  },
  render: (args) => (
    <Modal {...args}>
      <ModalContent dataTestId="responsive-modal-content">
        <Box data-testid="responsive-modal">
          <Typography variant="h6" gutterBottom>
            Responsive Modal Test
          </Typography>
          <Typography paragraph>This modal adapts to different viewport sizes.</Typography>
          <Button fullWidth variant="contained" data-testid="responsive-button">
            Full Width Action
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  ),
  play: async ({ step }) => {
    await step('Verify responsive modal content', async () => {
      const modal = within(document.body).getByTestId('responsive-modal');
      const button = within(document.body).getByTestId('responsive-button');

      await expect(modal).toBeInTheDocument();
      await expect(button).toBeInTheDocument();
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  args: {
    open: true,
    onClose: fn(),
    glass: true,
    glow: true,
    size: 'md',
  },
  render: (args) => (
    <Modal {...args}>
      <ModalContent dataTestId="visual-states-modal-content">
        <Box data-testid="visual-states-modal">
          <Typography variant="h6" gutterBottom>
            Visual States Test
          </Typography>
          <Typography paragraph>Testing various visual states and effects.</Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button data-testid="normal-button" variant="outlined">
              Normal
            </Button>
            <Button data-testid="disabled-button" disabled>
              Disabled
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  ),
  play: async ({ step }) => {
    await step('Verify visual states', async () => {
      const modal = within(document.body).getByTestId('visual-states-modal');
      const normalButton = within(document.body).getByTestId('normal-button');
      const disabledButton = within(document.body).getByTestId('disabled-button');

      await expect(modal).toBeInTheDocument();
      await expect(normalButton).toBeEnabled();
      await expect(disabledButton).toBeDisabled();
    });
  },
};

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  args: {
    open: true,
    onClose: fn(),
  },
  render: (args) => (
    <Modal {...args}>
      <ModalContent dataTestId="edge-case-modal-content">
        <Box data-testid="edge-case-modal">
          <Typography variant="h6" gutterBottom>
            Edge Cases Test
          </Typography>

          <Box
            data-testid="long-content"
            sx={{
              maxHeight: '200px',
              overflowY: 'auto',
              p: 2,
              border: '1px solid grey.300',
              borderRadius: 1,
            }}
          >
            <Typography>{'Very long content that should scroll. '.repeat(50)}</Typography>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  ),
  play: async ({ step }) => {
    await step('Verify edge case handling', async () => {
      const modal = within(document.body).getByTestId('edge-case-modal');
      const longContent = within(document.body).getByTestId('long-content');

      await expect(modal).toBeInTheDocument();
      await expect(longContent).toBeInTheDocument();

      // Verify overflow handling
      const computedStyle = window.getComputedStyle(longContent);
      await expect(computedStyle.overflowY).toBe('auto');
    });
  },
};
