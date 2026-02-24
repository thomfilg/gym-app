import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DensityProvider } from '../../../utils/density';
import { Button } from '../../form/Button';
import { InteractiveTooltip } from './InteractiveTooltip';

const meta: Meta<typeof InteractiveTooltip> = {
  title: 'DataDisplay/InteractiveTooltip',
  component: InteractiveTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive tooltip that supports click-to-pin functionality with dual content modes - brief info on hover, detailed content when pinned.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'glass'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip',
    },
    glow: {
      control: 'boolean',
      description: 'Whether tooltip has glow effect',
    },
    pulse: {
      control: 'boolean',
      description: 'Whether tooltip has pulse animation',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether tooltip can be pinned by clicking',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width of tooltip in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveTooltip>;

// Sample content components
const HoverContent = () => <span>95.2%</span>;

const PinnedContent = () => (
  <div style={{ padding: '8px' }}>
    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Performance Metrics</h4>
    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
      <li>Success Rate: 95.2%</li>
      <li>Total Requests: 1,247</li>
      <li>Avg Response: 145ms</li>
      <li>Errors: 60</li>
    </ul>
  </div>
);

export const Default: Story = {
  args: {
    hoverContent: <HoverContent />,
    pinnedContent: <PinnedContent />,
    variant: 'default',
    size: 'md',
    clickable: true,
    children: <Button>Hover or Click</Button>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <InteractiveTooltip
        hoverContent="Default variant"
        pinnedContent={<div style={{ padding: '8px' }}>Default pinned content</div>}
        variant="default"
      >
        <Button>Default</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Dark variant"
        pinnedContent={<div style={{ padding: '8px' }}>Dark pinned content</div>}
        variant="dark"
      >
        <Button>Dark</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Light variant"
        pinnedContent={<div style={{ padding: '8px' }}>Light pinned content</div>}
        variant="light"
      >
        <Button>Light</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Glass variant"
        pinnedContent={<div style={{ padding: '8px' }}>Glass pinned content</div>}
        variant="glass"
      >
        <Button>Glass</Button>
      </InteractiveTooltip>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <InteractiveTooltip
        hoverContent="Small tooltip"
        pinnedContent={<div style={{ padding: '4px' }}>Small pinned</div>}
        size="sm"
      >
        <Button variant="solid" size="sm">Small</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Medium tooltip"
        pinnedContent={<div style={{ padding: '6px' }}>Medium pinned</div>}
        size="md"
      >
        <Button variant="solid">Medium</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Large tooltip"
        pinnedContent={<div style={{ padding: '8px' }}>Large pinned</div>}
        size="lg"
      >
        <Button variant="solid" size="lg">Large</Button>
      </InteractiveTooltip>
    </div>
  ),
};

export const WithEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <InteractiveTooltip
        hoverContent="Glow effect"
        pinnedContent={<div style={{ padding: '8px' }}>Still glowing</div>}
        glow
      >
        <Button>Glow</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Pulse effect"
        pinnedContent={<div style={{ padding: '8px' }}>Still pulsing</div>}
        pulse
      >
        <Button>Pulse</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Both effects"
        pinnedContent={<div style={{ padding: '8px' }}>Glow + Pulse</div>}
        glow
        pulse
      >
        <Button>Combined</Button>
      </InteractiveTooltip>
    </div>
  ),
};

export const NonClickable: Story = {
  args: {
    hoverContent: 'This tooltip only shows on hover',
    pinnedContent: 'You will never see this',
    clickable: false,
    children: <Button>Hover Only</Button>,
  },
};

export const HeatmapExample: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 80px)', gap: '8px' }}>
      {[
        { value: 99.5, total: 1500, errors: 8 },
        { value: 95.2, total: 1247, errors: 60 },
        { value: 87.3, total: 892, errors: 113 },
        { value: 92.1, total: 1103, errors: 87 },
        { value: 98.7, total: 1890, errors: 25 },
      ].map((data, idx) => (
        <InteractiveTooltip
          key={idx}
          hoverContent={`${data.value}%`}
          pinnedContent={
            <div style={{ padding: '8px', minWidth: '180px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Database Performance</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
                <li>Success Rate: {data.value}%</li>
                <li>Total Queries: {data.total.toLocaleString()}</li>
                <li>Errors: {data.errors}</li>
              </ul>
            </div>
          }
          variant="glass"
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: data.value > 95 ? '#4caf50' : data.value > 90 ? '#ff9800' : '#f44336',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {data.value}%
          </div>
        </InteractiveTooltip>
      ))}
    </div>
  ),
};

export const DifferentPlacements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: '80px', padding: '100px' }}>
      <InteractiveTooltip
        hoverContent="Top"
        pinnedContent={<div style={{ padding: '8px' }}>Top placement</div>}
        placement="top"
      >
        <Button>Top</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Right"
        pinnedContent={<div style={{ padding: '8px' }}>Right placement</div>}
        placement="right"
      >
        <Button>Right</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Bottom"
        pinnedContent={<div style={{ padding: '8px' }}>Bottom placement</div>}
        placement="bottom"
      >
        <Button>Bottom</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Left"
        pinnedContent={<div style={{ padding: '8px' }}>Left placement</div>}
        placement="left"
      >
        <Button>Left</Button>
      </InteractiveTooltip>
    </div>
  ),
};

export const WithCallbacks: Story = {
  render: () => {
    const [pinnedCount, setPinnedCount] = React.useState(0);
    const [unpinnedCount, setUnpinnedCount] = React.useState(0);

    return (
      <div>
        <InteractiveTooltip
          hoverContent="Click to pin"
          pinnedContent={<div style={{ padding: '8px' }}>Pinned! Click outside to unpin.</div>}
          onPin={() => setPinnedCount((c) => c + 1)}
          onUnpin={() => setUnpinnedCount((c) => c + 1)}
        >
          <Button>Interactive</Button>
        </InteractiveTooltip>
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          <div>Pinned count: {pinnedCount}</div>
          <div>Unpinned count: {unpinnedCount}</div>
        </div>
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    hoverContent: 'Long content example',
    pinnedContent: (
      <div style={{ padding: '12px', maxWidth: '400px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>Detailed Analysis Report</h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>
          This tooltip demonstrates how InteractiveTooltip handles longer content. The pinned mode allows users to read
          and interact with more detailed information without the tooltip disappearing.
        </p>
        <h4 style={{ margin: '8px 0 4px 0', fontSize: '13px' }}>Key Metrics:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
          <li>Total Requests: 15,234</li>
          <li>Success Rate: 98.7%</li>
          <li>Average Response Time: 142ms</li>
          <li>Peak Response Time: 1,203ms</li>
          <li>Errors: 198 (1.3%)</li>
        </ul>
      </div>
    ),
    maxWidth: 450,
    children: <Button>View Report</Button>,
  },
};

// Test stories
export const InteractionTest: Story = {
  args: {
    hoverContent: 'Hover text',
    pinnedContent: <div style={{ padding: '8px' }}>Pinned text</div>,
    dataTestId: 'interaction-test',
    children: <Button>Test Button</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('interaction-test-trigger');

    // Test hover
    await userEvent.hover(trigger);
    await waitFor(() => {
      expect(canvas.getByText('Hover text')).toBeInTheDocument();
    });

    // Test click to pin
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(canvas.getByText('Pinned text')).toBeInTheDocument();
    });
  },
};

export const VariantTest: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <InteractiveTooltip
        hoverContent="Default"
        pinnedContent={<div>Default pinned</div>}
        variant="default"
        dataTestId="variant-default"
      >
        <Button>Default</Button>
      </InteractiveTooltip>

      <InteractiveTooltip
        hoverContent="Glass"
        pinnedContent={<div>Glass pinned</div>}
        variant="glass"
        dataTestId="variant-glass"
      >
        <Button>Glass</Button>
      </InteractiveTooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test default variant
    const defaultTrigger = canvas.getByTestId('variant-default-trigger');
    await userEvent.hover(defaultTrigger);
    await waitFor(() => {
      expect(canvas.getByText('Default')).toBeInTheDocument();
    });

    // Test glass variant
    const glassTrigger = canvas.getByTestId('variant-glass-trigger');
    await userEvent.hover(glassTrigger);
    await waitFor(() => {
      expect(canvas.getByText('Glass')).toBeInTheDocument();
    });
  },
};

export const AccessibilityTest: Story = {
  args: {
    hoverContent: 'Accessible tooltip',
    pinnedContent: <div style={{ padding: '8px' }}>Accessible pinned content</div>,
    dataTestId: 'a11y-test',
    children: <Button>Accessible Button</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('a11y-test-trigger');

    // Test keyboard navigation
    await userEvent.tab();
    expect(trigger).toHaveFocus();

    // Test hover shows tooltip
    await userEvent.hover(trigger);
    await waitFor(() => {
      const tooltip = canvas.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    });
  },
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <InteractiveTooltip content="Compact tooltip content">
            <Button variant="outline">Hover me</Button>
          </InteractiveTooltip>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <InteractiveTooltip content="Normal tooltip content">
            <Button variant="outline">Hover me</Button>
          </InteractiveTooltip>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <InteractiveTooltip content="Spacious tooltip content">
            <Button variant="outline">Hover me</Button>
          </InteractiveTooltip>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
