import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { EmptyState } from '../EmptyState/EmptyState';

import { AsyncStateContainer } from './AsyncStateContainer';
import { ErrorState } from '../ErrorState/ErrorState';
import { LoadingState } from '../LoadingState/LoadingState';

const meta: Meta<typeof AsyncStateContainer> = {
  title: 'DataDisplay/AsyncStates/AsyncStateContainer',
  component: AsyncStateContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A composition-based wrapper component for handling async data states consistently.

## Features
- **Priority-based rendering**: loading > error > empty > children
- **Composition pattern**: Pass custom components for each state
- **Render props**: Alternatively use render functions for more control
- **Accessible**: Proper ARIA attributes and semantic markup

## Usage Patterns

### Component Props (Composition)
\`\`\`tsx
<AsyncStateContainer
  isLoading={isLoading}
  error={error}
  isEmpty={data.length === 0}
  loadingComponent={<LoadingState variant="skeleton" />}
  errorComponent={<ErrorState message={error} onRetry={refetch} />}
  emptyComponent={<EmptyState title="No items" onCreate={handleCreate} />}
>
  <DataGrid data={data} />
</AsyncStateContainer>
\`\`\`

### Render Props
\`\`\`tsx
<AsyncStateContainer
  isLoading={isLoading}
  error={error}
  isEmpty={data.length === 0}
  renderLoading={() => <CustomLoader />}
  renderError={(error) => <CustomError error={error} />}
  renderEmpty={() => <CustomEmpty />}
>
  <DataGrid data={data} />
</AsyncStateContainer>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs', 'component:AsyncStateContainer'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Whether the container is in a loading state',
    },
    error: {
      control: 'text',
      description: 'Error message or object',
    },
    isEmpty: {
      control: 'boolean',
      description: 'Whether the data is empty',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <Box
    sx={{
      p: 4,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Data Loaded Successfully!
    </Typography>
    <Typography variant="body2" color="text.secondary">
      This is the actual content that displays when data is available.
    </Typography>
  </Box>
);

export const SuccessState: Story = {
  name: 'Success State (Children)',
  args: {
    isLoading: false,
    error: null,
    isEmpty: false,
    children: <SampleContent />,
  },
};

export const LoadingStateDefault: Story = {
  name: 'Loading State (Default)',
  args: {
    isLoading: true,
    error: null,
    isEmpty: false,
    children: <SampleContent />,
  },
};

export const LoadingStateCustom: Story = {
  name: 'Loading State (Custom Component)',
  args: {
    isLoading: true,
    error: null,
    isEmpty: false,
    loadingComponent: <LoadingState variant="skeleton" message="Fetching your data..." />,
    children: <SampleContent />,
  },
};

export const ErrorStateDefault: Story = {
  name: 'Error State (Default)',
  args: {
    isLoading: false,
    error: 'Failed to load data from the server',
    isEmpty: false,
    children: <SampleContent />,
  },
};

export const ErrorStateCustom: Story = {
  name: 'Error State (Custom Component)',
  args: {
    isLoading: false,
    error: 'Network connection failed',
    isEmpty: false,
    errorComponent: (
      <ErrorState
        title="Connection Error"
        message="Network connection failed"
        onRetry={fn()}
        retryLabel="Reconnect"
      />
    ),
    children: <SampleContent />,
  },
};

export const EmptyStateDefault: Story = {
  name: 'Empty State (Default)',
  args: {
    isLoading: false,
    error: null,
    isEmpty: true,
    children: <SampleContent />,
  },
};

export const EmptyStateCustom: Story = {
  name: 'Empty State (Custom Component)',
  args: {
    isLoading: false,
    error: null,
    isEmpty: true,
    emptyComponent: (
      <EmptyState
        title="No projects found"
        description="Get started by creating your first project"
        onCreate={fn()}
        createLabel="New Project"
        onRefresh={fn()}
      />
    ),
    children: <SampleContent />,
  },
};

export const WithRenderProps: Story = {
  name: 'Using Render Props',
  args: {
    isLoading: true,
    error: null,
    isEmpty: false,
    renderLoading: () => (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="primary">
          🔄 Custom loading via render prop...
        </Typography>
      </Box>
    ),
    children: <SampleContent />,
  },
};

export const PriorityDemonstration: Story = {
  name: 'Priority: Loading > Error > Empty',
  args: {
    isLoading: true,
    error: 'This error should not show',
    isEmpty: true,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates priority order: when isLoading is true, loading state is shown even if error and isEmpty are also set.',
      },
    },
  },
};

export const ErrorWithObject: Story = {
  name: 'Error with Error Object',
  args: {
    isLoading: false,
    error: new Error('TypeError: Cannot read property of undefined'),
    isEmpty: false,
    children: <SampleContent />,
  },
};
