import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  CheckCircle,
  Error,
  Flag,
  Inventory,
  LocalShipping,
  Payment,
  Person,
  Schedule,
  Star,
  Warning,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Enhanced/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A beautiful timeline component for displaying chronological events, processes, and historical data with various styles and animations.',
      },
    },
  },
  tags: ['autodocs', 'component:Timeline'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
      description: 'Timeline layout variant',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Timeline orientation',
    },
    showConnector: {
      control: 'boolean',
      description: 'Show connector lines between items',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    alternating: {
      control: 'boolean',
      description: 'Alternate item positions (vertical only)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const orderEvents = [
  {
    id: '1',
    title: 'Order Placed',
    description: 'Your order has been successfully placed',
    timestamp: '2024-01-15 10:30 AM',
    icon: <CheckCircle />,
    color: '#4caf50',
  },
  {
    id: '2',
    title: 'Payment Confirmed',
    description: 'Payment has been processed successfully',
    timestamp: '2024-01-15 10:35 AM',
    icon: <Payment />,
    color: '#4caf50',
  },
  {
    id: '3',
    title: 'Order Processing',
    description: 'Your order is being prepared',
    timestamp: '2024-01-15 2:00 PM',
    icon: <Inventory />,
    color: '#2196f3',
  },
  {
    id: '4',
    title: 'Shipped',
    description: 'Your order has been shipped',
    timestamp: '2024-01-16 9:00 AM',
    icon: <LocalShipping />,
    color: '#1976d2',
  },
  {
    id: '5',
    title: 'Out for Delivery',
    description: 'Your package is out for delivery',
    timestamp: '2024-01-17 8:00 AM',
    icon: <Schedule />,
    color: '#ff9800',
  },
];

export const Default: Story = {
  args: {
    items: orderEvents,
    variant: 'default',
    orientation: 'vertical',
  },
};

export const Compact: Story = {
  args: {
    items: orderEvents,
    variant: 'compact',
    orientation: 'vertical',
    animated: true,
  },
};

export const Detailed: Story = {
  args: {
    items: orderEvents,
    variant: 'detailed',
    orientation: 'vertical',
    animated: true,
  },
};

export const Alternating: Story = {
  args: {
    items: orderEvents,
    variant: 'default',
    orientation: 'vertical',
    alternating: true,
    animated: true,
  },
};

export const Horizontal: Story = {
  render: () => {
    const events = [
      {
        id: '1',
        title: '2020',
        description: 'Company Founded',
        timestamp: 'January',
        icon: <Flag />,
        color: '#1976d2',
      },
      {
        id: '2',
        title: '2021',
        description: 'Series A Funding',
        timestamp: 'March',
        icon: <Star />,
        color: '#4caf50',
      },
      {
        id: '3',
        title: '2022',
        description: 'International Expansion',
        timestamp: 'June',
        icon: <CheckCircle />,
        color: '#2196f3',
      },
      {
        id: '4',
        title: '2023',
        description: '1M Users Milestone',
        timestamp: 'September',
        icon: <Person />,
        color: '#ff9800',
      },
      {
        id: '5',
        title: '2024',
        description: 'IPO Launch',
        timestamp: 'December',
        icon: <Flag />,
        color: '#f44336',
      },
    ];

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Company History</Typography>
        <Box sx={{ overflowX: 'auto', pb: 2 }}>
          <Timeline items={events} orientation="horizontal" variant="default" animated />
        </Box>
      </Stack>
    );
  },
};

export const WithMetadata: Story = {
  render: () => {
    const milestones = [
      {
        id: '1',
        title: 'Project Kickoff',
        description: 'Initial planning and team assembly',
        timestamp: 'Jan 1, 2024',
        icon: <Flag />,
        color: '#1976d2',
        metadata: { team: 'All Teams', status: 'Completed' },
      },
      {
        id: '2',
        title: 'Design Phase',
        description: 'UI/UX design and prototyping',
        timestamp: 'Jan 15, 2024',
        icon: <Star />,
        color: '#9c27b0',
        metadata: { team: 'Design Team', status: 'Completed' },
      },
      {
        id: '3',
        title: 'Development Sprint 1',
        description: 'Core features implementation',
        timestamp: 'Feb 1, 2024',
        icon: <CheckCircle />,
        color: '#4caf50',
        metadata: { team: 'Dev Team', status: 'Completed' },
      },
      {
        id: '4',
        title: 'Testing Phase',
        description: 'QA and bug fixes',
        timestamp: 'Mar 1, 2024',
        icon: <Warning />,
        color: '#ff9800',
        metadata: { team: 'QA Team', status: 'In Progress' },
      },
      {
        id: '5',
        title: 'Launch',
        description: 'Product release to production',
        timestamp: 'Apr 1, 2024',
        icon: <Flag />,
        color: '#757575',
        metadata: { team: 'All Teams', status: 'Pending' },
      },
    ];

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Project Timeline</Typography>
        <Timeline items={milestones} variant="detailed" orientation="vertical" animated />
      </Stack>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const tasksWithActions = [
      {
        id: '1',
        title: 'Design Review',
        description: 'Review and approve the new design mockups',
        timestamp: '2 hours ago',
        icon: <CheckCircle />,
        color: '#4caf50',
        action: {
          label: 'View Details',
          onClick: () => {
            /* View design details */
          },
        },
      },
      {
        id: '2',
        title: 'Code Review Required',
        description: 'Pull request #123 needs review',
        timestamp: '4 hours ago',
        icon: <Warning />,
        color: '#ff9800',
        action: {
          label: 'Review Code',
          onClick: () => {
            /* Review pull request */
          },
        },
      },
      {
        id: '3',
        title: 'Bug Report',
        description: 'Critical bug reported in payment system',
        timestamp: '6 hours ago',
        icon: <Error />,
        color: '#f44336',
        action: {
          label: 'Fix Bug',
          onClick: () => {
            /* Fix bug */
          },
        },
      },
    ];

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Tasks with Actions</Typography>
        <Timeline items={tasksWithActions} variant="detailed" orientation="vertical" animated />
      </Stack>
    );
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default Variant
        </Typography>
        <Timeline items={orderEvents.slice(0, 3)} variant="default" orientation="vertical" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Compact Variant
        </Typography>
        <Timeline items={orderEvents.slice(0, 3)} variant="compact" orientation="vertical" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Detailed Variant
        </Typography>
        <Timeline items={orderEvents.slice(0, 3)} variant="detailed" orientation="vertical" />
      </Box>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Small Timeline (3 items)
        </Typography>
        <Timeline items={orderEvents.slice(0, 3)} variant="default" orientation="vertical" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Medium Timeline (5 items)
        </Typography>
        <Timeline items={orderEvents} variant="default" orientation="vertical" />
      </Box>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => {
    const stateExamples = [
      {
        id: '1',
        title: 'Success State',
        description: 'Task completed successfully',
        timestamp: 'Now',
        icon: <CheckCircle />,
        color: '#4caf50',
      },
      {
        id: '2',
        title: 'Warning State',
        description: 'Task needs attention',
        timestamp: '1 hour ago',
        icon: <Warning />,
        color: '#ff9800',
      },
      {
        id: '3',
        title: 'Error State',
        description: 'Task failed',
        timestamp: '2 hours ago',
        icon: <Error />,
        color: '#f44336',
      },
      {
        id: '4',
        title: 'Default State',
        description: 'Regular task',
        timestamp: '3 hours ago',
        icon: <Schedule />,
        color: '#757575',
      },
    ];

    return <Timeline items={stateExamples} variant="default" orientation="vertical" animated />;
  },
};

const InteractiveTimelineComponent = () => {
  const [clickedItem, setClickedItem] = React.useState<string | null>(null);

  const interactiveItems = orderEvents.map((item) => ({
    ...item,
    description: clickedItem === item.id ? `${item.description} (Clicked!)` : item.description,
  }));

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Click on timeline items to see interaction</Typography>
      {clickedItem && (
        <Typography variant="body2" color="primary">
          Last clicked: {interactiveItems.find((i) => i.id === clickedItem)?.title}
        </Typography>
      )}
      <Timeline
        items={interactiveItems}
        variant="default"
        orientation="vertical"
        animated
        onItemClick={(item) => setClickedItem(item.id)}
      />
    </Stack>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveTimelineComponent />,
};

export const Responsive: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Vertical Timeline (Desktop/Mobile)</Typography>
      <Timeline items={orderEvents} variant="default" orientation="vertical" animated />
      <Typography variant="h6">Horizontal Timeline (Desktop)</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Timeline
          items={orderEvents.slice(0, 4)}
          variant="default"
          orientation="horizontal"
          animated
        />
      </Box>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Timeline items={orderEvents.slice(0, 3)} variant="default" />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Timeline items={orderEvents.slice(0, 3)} variant="default" />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Timeline items={orderEvents.slice(0, 3)} variant="default" />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
