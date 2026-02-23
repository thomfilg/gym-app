import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'DataDisplay/AsyncStates/ErrorState/Tests',
  component: ErrorState,
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:ErrorState'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AccessibilityTest: Story = {
  name: '🧪 Accessibility Attributes',
  args: {
    title: 'Error Title',
    message: 'An error occurred while loading data.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify error state container exists', async () => {
      const container = canvas.getByTestId('error-state');
      await expect(container).toBeInTheDocument();
    });

    await step('Verify alert role for accessibility', async () => {
      const container = canvas.getByTestId('error-state');
      await expect(container).toHaveAttribute('role', 'alert');
    });

    await step('Verify title is displayed', async () => {
      const title = canvas.getByTestId('error-state-title');
      await expect(title).toHaveTextContent('Error Title');
    });

    await step('Verify message is displayed', async () => {
      const message = canvas.getByTestId('error-state-message');
      await expect(message).toHaveTextContent('An error occurred while loading data.');
    });
  },
};

export const RetryButtonInteraction: Story = {
  name: '🧪 Retry Button Click',
  args: {
    message: 'Failed to load data.',
    onRetry: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Verify retry button is present', async () => {
      const retryButton = canvas.getByTestId('error-state-retry-button');
      await expect(retryButton).toBeInTheDocument();
    });

    await step('Click retry button', async () => {
      const retryButton = canvas.getByTestId('error-state-retry-button');
      await userEvent.click(retryButton);
    });

    await step('Verify onRetry callback was called', async () => {
      await expect(args.onRetry).toHaveBeenCalledTimes(1);
    });
  },
};

export const CustomRetryLabel: Story = {
  name: '🧪 Custom Retry Label',
  args: {
    message: 'Request failed.',
    onRetry: fn(),
    retryLabel: 'Try Again',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify custom retry label is displayed', async () => {
      const retryButton = canvas.getByTestId('error-state-retry-button');
      await expect(retryButton).toHaveTextContent('Try Again');
    });
  },
};

export const WarningSeverityTest: Story = {
  name: '🧪 Warning Severity',
  args: {
    severity: 'warning',
    message: 'Some items could not be loaded.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify error state renders with warning severity', async () => {
      const container = canvas.getByTestId('error-state');
      await expect(container).toBeInTheDocument();
    });

    await step('Verify icon container exists', async () => {
      const icon = canvas.getByTestId('error-state-icon');
      await expect(icon).toBeInTheDocument();
    });
  },
};

export const KeyboardNavigation: Story = {
  name: '🧪 Keyboard Navigation',
  args: {
    message: 'Error occurred.',
    onRetry: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Focus retry button via Tab', async () => {
      await userEvent.tab();
      const retryButton = canvas.getByTestId('error-state-retry-button');
      await expect(retryButton).toHaveFocus();
    });

    await step('Activate button with Enter key', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(args.onRetry).toHaveBeenCalled();
    });
  },
};
