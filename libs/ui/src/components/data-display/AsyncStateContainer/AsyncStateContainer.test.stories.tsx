import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { EmptyState } from '../EmptyState/EmptyState';

import { AsyncStateContainer } from './AsyncStateContainer';
import { ErrorState } from '../ErrorState/ErrorState';
import { LoadingState } from '../LoadingState/LoadingState';

const meta: Meta<typeof AsyncStateContainer> = {
  title: 'DataDisplay/AsyncStates/AsyncStateContainer/Tests',
  component: AsyncStateContainer,
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:AsyncStateContainer'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TestContent = () => (
  <Typography data-testid="success-content">Content Loaded</Typography>
);

export const SuccessStateTest: Story = {
  name: '🧪 Success State Rendering',
  args: {
    isLoading: false,
    error: null,
    isEmpty: false,
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify container has success state', async () => {
      const container = canvas.getByTestId('async-state-container');
      await expect(container).toHaveAttribute('data-state', 'success');
    });

    await step('Verify children content is rendered', async () => {
      const content = canvas.getByTestId('success-content');
      await expect(content).toHaveTextContent('Content Loaded');
    });
  },
};

export const LoadingStateTest: Story = {
  name: '🧪 Loading State Rendering',
  args: {
    isLoading: true,
    error: null,
    isEmpty: false,
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify container has loading state', async () => {
      const container = canvas.getByTestId('async-state-container');
      await expect(container).toHaveAttribute('data-state', 'loading');
    });

    await step('Verify children content is NOT rendered', async () => {
      const content = canvas.queryByTestId('success-content');
      await expect(content).not.toBeInTheDocument();
    });

    await step('Verify loading component is rendered', async () => {
      const loading = canvas.getByTestId('loading-state');
      await expect(loading).toBeInTheDocument();
    });
  },
};

export const ErrorStateTest: Story = {
  name: '🧪 Error State Rendering',
  args: {
    isLoading: false,
    error: 'Something went wrong',
    isEmpty: false,
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify container has error state', async () => {
      const container = canvas.getByTestId('async-state-container');
      await expect(container).toHaveAttribute('data-state', 'error');
    });

    await step('Verify children content is NOT rendered', async () => {
      const content = canvas.queryByTestId('success-content');
      await expect(content).not.toBeInTheDocument();
    });

    await step('Verify error component is rendered', async () => {
      const error = canvas.getByTestId('error-state');
      await expect(error).toBeInTheDocument();
    });

    await step('Verify error message is displayed', async () => {
      const message = canvas.getByTestId('error-state-message');
      await expect(message).toHaveTextContent('Something went wrong');
    });
  },
};

export const EmptyStateTest: Story = {
  name: '🧪 Empty State Rendering',
  args: {
    isLoading: false,
    error: null,
    isEmpty: true,
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify container has empty state', async () => {
      const container = canvas.getByTestId('async-state-container');
      await expect(container).toHaveAttribute('data-state', 'empty');
    });

    await step('Verify children content is NOT rendered', async () => {
      const content = canvas.queryByTestId('success-content');
      await expect(content).not.toBeInTheDocument();
    });

    await step('Verify empty state component is rendered', async () => {
      const empty = canvas.getByTestId('empty-state');
      await expect(empty).toBeInTheDocument();
    });
  },
};

export const PriorityTest: Story = {
  name: '🧪 Priority: Loading > Error > Empty',
  args: {
    isLoading: true,
    error: 'This should not show',
    isEmpty: true,
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify loading state takes priority', async () => {
      const container = canvas.getByTestId('async-state-container');
      await expect(container).toHaveAttribute('data-state', 'loading');
    });

    await step('Verify loading component is rendered, not error', async () => {
      const loading = canvas.getByTestId('loading-state');
      await expect(loading).toBeInTheDocument();

      const error = canvas.queryByTestId('error-state');
      await expect(error).not.toBeInTheDocument();
    });
  },
};

export const CustomComponentsTest: Story = {
  name: '🧪 Custom Components via Props',
  args: {
    isLoading: false,
    error: null,
    isEmpty: true,
    emptyComponent: (
      <EmptyState
        title="No items found"
        description="Create your first item"
        onCreate={fn()}
        dataTestId="custom-empty"
      />
    ),
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify custom empty component is used', async () => {
      const customEmpty = canvas.getByTestId('custom-empty');
      await expect(customEmpty).toBeInTheDocument();
    });

    await step('Verify custom empty title', async () => {
      const title = canvas.getByTestId('custom-empty-title');
      await expect(title).toHaveTextContent('No items found');
    });
  },
};

export const CustomLoadingWithRetry: Story = {
  name: '🧪 Error State with Retry Interaction',
  args: {
    isLoading: false,
    error: 'Network error',
    isEmpty: false,
    errorComponent: (
      <ErrorState
        title="Connection Failed"
        message="Network error"
        onRetry={fn()}
        dataTestId="custom-error"
      />
    ),
    children: <TestContent />,
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Verify custom error component', async () => {
      const customError = canvas.getByTestId('custom-error');
      await expect(customError).toBeInTheDocument();
    });

    await step('Click retry button', async () => {
      const retryButton = canvas.getByTestId('custom-error-retry-button');
      await userEvent.click(retryButton);
    });
  },
};

export const RenderPropsTest: Story = {
  name: '🧪 Render Props Pattern',
  args: {
    isLoading: true,
    error: null,
    isEmpty: false,
    renderLoading: () => (
      <LoadingState variant="skeleton" message="Custom render prop" dataTestId="render-prop-loading" />
    ),
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify render prop loading is used', async () => {
      const loading = canvas.getByTestId('render-prop-loading');
      await expect(loading).toBeInTheDocument();
    });

    await step('Verify custom message', async () => {
      const message = canvas.getByTestId('render-prop-loading-message');
      await expect(message).toHaveTextContent('Custom render prop');
    });
  },
};

export const ErrorObjectTest: Story = {
  name: '🧪 Error Object Handling',
  args: {
    isLoading: false,
    error: new Error('TypeError: Cannot read property'),
    isEmpty: false,
    children: <TestContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify error message from Error object', async () => {
      const message = canvas.getByTestId('error-state-message');
      await expect(message).toHaveTextContent('TypeError: Cannot read property');
    });
  },
};
