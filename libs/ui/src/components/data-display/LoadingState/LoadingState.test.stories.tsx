import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { LoadingState } from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'DataDisplay/AsyncStates/LoadingState/Tests',
  component: LoadingState,
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:LoadingState'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SpinnerAccessibility: Story = {
  name: '🧪 Spinner Accessibility',
  args: {
    variant: 'spinner',
    message: 'Loading data...',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify loading state container exists', async () => {
      const container = canvas.getByTestId('loading-state');
      await expect(container).toBeInTheDocument();
    });

    await step('Verify ARIA attributes', async () => {
      const container = canvas.getByTestId('loading-state');
      await expect(container).toHaveAttribute('role', 'status');
      await expect(container).toHaveAttribute('aria-busy', 'true');
    });

    await step('Verify message is displayed', async () => {
      const message = canvas.getByTestId('loading-state-message');
      await expect(message).toHaveTextContent('Loading data...');
    });

    await step('Verify spinner is present', async () => {
      const spinner = canvas.getByTestId('loading-state-spinner');
      await expect(spinner).toBeInTheDocument();
    });
  },
};

export const SkeletonAccessibility: Story = {
  name: '🧪 Skeleton Accessibility',
  args: {
    variant: 'skeleton',
    skeletonRows: 3,
    dataTestId: 'skeleton-test',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify loading state container exists', async () => {
      const container = canvas.getByTestId('skeleton-test');
      await expect(container).toBeInTheDocument();
    });

    await step('Verify ARIA attributes', async () => {
      const container = canvas.getByTestId('skeleton-test');
      await expect(container).toHaveAttribute('role', 'status');
      await expect(container).toHaveAttribute('aria-busy', 'true');
    });

    await step('Verify skeleton rows are rendered', async () => {
      const skeletons = canvasElement.querySelectorAll('[class*="MuiSkeleton"]');
      await expect(skeletons.length).toBeGreaterThanOrEqual(3);
    });
  },
};

export const SizeVariations: Story = {
  name: '🧪 Size Variations',
  args: {
    variant: 'spinner',
    size: 'lg',
    message: 'Large spinner',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify large spinner renders', async () => {
      const spinner = canvas.getByTestId('loading-state-spinner');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Verify message with correct typography', async () => {
      const message = canvas.getByTestId('loading-state-message');
      await expect(message).toBeInTheDocument();
    });
  },
};
