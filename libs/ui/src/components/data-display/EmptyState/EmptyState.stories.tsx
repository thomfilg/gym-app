import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { fn } from 'storybook/test';

import { EmptyState } from './EmptyState';

// Simple illustration component
const SearchIcon = () => (
  <SvgIcon sx={{ fontSize: 64 }}>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
    </svg>
  </SvgIcon>
);

const ErrorIcon = () => (
  <SvgIcon sx={{ fontSize: 64, color: 'error.main' }}>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  </SvgIcon>
);

const meta: Meta<typeof EmptyState> = {
  title: 'DataDisplay/AsyncStates/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Friendly placeholder for "no data / no results / error" with illustration and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'illustrated', 'minimal', 'action'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    illustration: { control: false },
    primaryAction: { control: false },
    secondaryAction: { control: false },
    helpLink: { control: false },
    className: { control: 'text' },
    // Disable auto-action generation to prevent them from being truthy when not explicitly passed
    onCreate: { action: false },
    onRefresh: { action: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No data found',
    description: 'There is no data to display at the moment.',
  },
};

export const Illustrated: Story = {
  args: {
    variant: 'illustrated',
    title: 'No search results',
    description:
      'We couldn\'t find anything matching your search. Try adjusting your filters or search terms.',
    illustration: <SearchIcon />,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    title: 'Empty',
    description: 'Nothing here yet.',
  },
};

export const WithActions: Story = {
  args: {
    variant: 'action',
    title: 'No items found',
    description: 'Get started by creating your first item.',
    primaryAction: {
      label: 'Create Item',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Import Items',
      onClick: fn(),
    },
    helpLink: {
      label: 'Learn more about items',
      href: '#',
    },
  },
};

export const NoResults: Story = {
  args: {
    title: 'No results found',
    description: 'We couldn\'t find any results for your search criteria.',
    illustration: <SearchIcon />,
    primaryAction: {
      label: 'Clear filters',
      onClick: fn(),
    },
    helpLink: {
      label: 'Search tips',
      href: '#',
    },
  },
};

export const NoPermissions: Story = {
  args: {
    title: 'Access denied',
    description:
      'You don\'t have permission to view this content. Contact your administrator for access.',
    helpLink: {
      label: 'Contact support',
      href: '#',
      external: true,
    },
  },
};

export const NetworkError: Story = {
  args: {
    title: 'Connection error',
    description: 'Unable to load content. Please check your internet connection and try again.',
    illustration: <ErrorIcon />,
    primaryAction: {
      label: 'Retry',
      onClick: fn(),
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <EmptyState
        variant="default"
        title="Default variant"
        description="Basic empty state with just text."
      />
      <EmptyState
        variant="illustrated"
        title="Illustrated variant"
        description="Empty state with a larger illustration."
        illustration={<SearchIcon />}
      />
      <EmptyState variant="minimal" title="Minimal variant" description="Compact empty state." />
      <EmptyState
        variant="action"
        title="Action variant"
        description="Empty state with action buttons."
        primaryAction={{
          label: 'Primary Action',
          onClick: fn(),
        }}
      />
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <Box sx={{ width: 300 }}>
        <EmptyState title="Small container" description="Empty state in a narrow container." />
      </Box>
      <Box sx={{ width: 600 }}>
        <EmptyState
          variant="illustrated"
          title="Medium container"
          description="Empty state with illustration in medium width."
          illustration={<SearchIcon />}
        />
      </Box>
      <Box sx={{ width: 900 }}>
        <EmptyState
          variant="action"
          title="Large container"
          description="Empty state with actions in a wide container."
          primaryAction={{
            label: 'Create',
            onClick: fn(),
          }}
          secondaryAction={{
            label: 'Import',
            onClick: fn(),
          }}
        />
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <EmptyState title="Loading state" description="Content is being loaded..." />
      <EmptyState
        title="Error state"
        description="Something went wrong. Please try again."
        illustration={<ErrorIcon />}
        primaryAction={{
          label: 'Retry',
          onClick: fn(),
        }}
      />
      <EmptyState title="Success state" description="All done! No more items to display." />
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <EmptyState
        title="Interactive buttons"
        description="Test button interactions and focus states."
        primaryAction={{
          label: 'Primary Action',
          onClick: fn(),
        }}
        secondaryAction={{
          label: 'Secondary Action',
          onClick: fn(),
        }}
        helpLink={{
          label: 'External Help',
          href: 'https://example.com',
          external: true,
        }}
      />
    </Box>
  ),
};

export const Responsive: Story = {
  args: {
    variant: 'action',
    title: 'Responsive layout',
    description:
      'This empty state adapts to different screen sizes. Buttons stack vertically on mobile.',
    illustration: <SearchIcon />,
    primaryAction: {
      label: 'Primary Action',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Secondary Action',
      onClick: fn(),
    },
    helpLink: {
      label: 'Help Documentation',
      href: '#',
    },
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
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
            <EmptyState title="Compact Empty" description="Tighter spacing for dense layouts" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <EmptyState title="Normal Empty" description="Standard spacing for regular use" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <EmptyState title="Spacious Empty" description="Extra breathing room" />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
