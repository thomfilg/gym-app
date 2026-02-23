import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Resizable } from './Resizable';

const meta: Meta<typeof Resizable> = {
  title: 'Layout/Resizable',
  component: Resizable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A resizable container component that allows users to adjust dimensions by dragging handles. Supports horizontal, vertical, and both-direction resizing.',
      },
    },
  },
  tags: ['autodocs', 'component:Resizable'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'both'],
      description: 'Resize direction constraint',
      table: {
        type: { summary: 'horizontal | vertical | both' },
        defaultValue: { summary: 'both' },
      },
    },
    width: {
      control: { type: 'number', min: 50, max: 1000, step: 10 },
      description: 'Initial width of the resizable container',
    },
    height: {
      control: { type: 'number', min: 50, max: 1000, step: 10 },
      description: 'Initial height of the resizable container',
    },
    minWidth: {
      control: { type: 'number', min: 10, max: 500, step: 10 },
      description: 'Minimum width constraint',
    },
    maxWidth: {
      control: { type: 'number', min: 100, max: 2000, step: 10 },
      description: 'Maximum width constraint',
    },
    minHeight: {
      control: { type: 'number', min: 10, max: 500, step: 10 },
      description: 'Minimum height constraint',
    },
    maxHeight: {
      control: { type: 'number', min: 100, max: 2000, step: 10 },
      description: 'Maximum height constraint',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether resizing is disabled',
    },
    handles: {
      control: { type: 'check' },
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'topRight',
        'bottomRight',
        'bottomLeft',
        'topLeft',
      ],
      description: 'Custom resize handles to display',
    },
    onResize: {
      action: 'resized',
      description: 'Callback fired when component is resized',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ContentBoxProps {
  title?: string;
  description?: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  title = 'Resizable Content',
  description = 'Drag the handles to resize this container. The content will adapt to the new dimensions.',
}) => (
  <Box
    sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    data-testid="resizable-content"
  >
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" paragraph>
      {description}
    </Typography>
    <Box sx={{ flex: 1, bgcolor: 'grey.100', borderRadius: 1, p: 1 }}>
      <Typography variant="caption">Content Area</Typography>
    </Box>
  </Box>
);

export const Default: Story = {
  args: {
    width: 300,
    height: 200,
    children: <ContentBox />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic resizable container with both horizontal and vertical resizing enabled. Drag the handles on the right edge, bottom edge, or corner to resize.',
      },
    },
  },
};

export const HorizontalOnly: Story = {
  args: {
    variant: 'horizontal',
    width: 250,
    height: 150,
    children: (
      <Box sx={{ p: 2, bgcolor: 'primary.50', height: '100%' }} data-testid="horizontal-content">
        <Typography variant="body1">Horizontal Resize Only</Typography>
        <Typography variant="caption" color="text.secondary">
          Drag the right edge to resize width
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Resizable container constrained to horizontal resizing only. Only the right edge handle is available for resizing.',
      },
    },
  },
};

export const VerticalOnly: Story = {
  args: {
    variant: 'vertical',
    width: 300,
    height: 120,
    children: (
      <Box sx={{ p: 2, bgcolor: 'secondary.50', height: '100%' }} data-testid="vertical-content">
        <Typography variant="body1">Vertical Resize Only</Typography>
        <Typography variant="caption" color="text.secondary">
          Drag the bottom edge to resize height
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Resizable container constrained to vertical resizing only. Only the bottom edge handle is available for resizing.',
      },
    },
  },
};

export const BothDirections: Story = {
  args: {
    variant: 'both',
    width: 280,
    height: 180,
    children: (
      <Box sx={{ p: 2, bgcolor: 'info.50', height: '100%' }} data-testid="both-directions-content">
        <Typography variant="body1">Both Directions</Typography>
        <Typography variant="caption" color="text.secondary">
          Drag edges or corner to resize
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Resizable container with both horizontal and vertical resizing enabled. Provides handles on right edge, bottom edge, and bottom-right corner.',
      },
    },
  },
};

export const WithConstraints: Story = {
  args: {
    variant: 'both',
    width: 200,
    height: 150,
    minWidth: 150,
    maxWidth: 400,
    minHeight: 100,
    maxHeight: 300,
    children: (
      <Box sx={{ p: 2, bgcolor: 'warning.50', height: '100%' }} data-testid="constrained-content">
        <Typography variant="body2" gutterBottom>
          Constrained Resizing
        </Typography>
        <Typography variant="caption">
          Min: 150x100
          <br />
          Max: 400x300
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates size constraints in action. The container cannot be resized below 150x100 or above 400x300 pixels.',
      },
    },
  },
};

const WithCallbackComponent: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 250, height: 150 });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
        <Typography variant="body2">
          Current size: {dimensions.width}px × {dimensions.height}px
        </Typography>
      </Box>

      <Resizable
        variant="both"
        width={250}
        height={150}
        onResize={(width, height) => setDimensions({ width, height })}
        data-testid="callback-resizable"
      >
        <Box sx={{ p: 2, bgcolor: 'success.50', height: '100%' }}>
          <Typography variant="body1">Resize Tracking</Typography>
          <Typography variant="caption">Size updates in real-time</Typography>
        </Box>
      </Resizable>
    </Box>
  );
};

export const WithCallback: Story = {
  render: () => <WithCallbackComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the onResize callback functionality. The current dimensions are displayed above the resizable container and update in real-time.',
      },
    },
  },
};

// Additional comprehensive stories

export const CustomHandles: Story = {
  args: {
    variant: 'both',
    width: 200,
    height: 150,
    handles: ['top', 'right', 'bottom', 'left'],
    children: (
      <Box
        sx={{ p: 2, bgcolor: 'success.50', height: '100%' }}
        data-testid="custom-handles-content"
      >
        <Typography variant="body1">Custom Handles</Typography>
        <Typography variant="caption" color="text.secondary">
          All edge handles enabled (no corners)
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom handle configuration showing only edge handles (top, right, bottom, left) without corner handles.',
      },
    },
  },
};

export const AllHandles: Story = {
  args: {
    variant: 'both',
    width: 250,
    height: 180,
    handles: ['top', 'right', 'bottom', 'left', 'topRight', 'bottomRight', 'bottomLeft', 'topLeft'],
    children: (
      <Box sx={{ p: 2, bgcolor: 'error.50', height: '100%' }} data-testid="all-handles-content">
        <Typography variant="body1">All Resize Handles</Typography>
        <Typography variant="caption" color="text.secondary">
          8 handles: 4 edges + 4 corners
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Maximum handle configuration with all 8 possible handles enabled (4 edges + 4 corners).',
      },
    },
  },
};

export const MinimalSize: Story = {
  args: {
    variant: 'both',
    width: 100,
    height: 80,
    minWidth: 80,
    minHeight: 60,
    maxWidth: 200,
    maxHeight: 150,
    children: (
      <Box
        sx={{ p: 1, bgcolor: 'info.50', height: '100%', fontSize: '0.75rem' }}
        data-testid="minimal-size-content"
      >
        <Typography variant="caption">Small</Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Resizable container starting at a small size with tight constraints to test minimal size handling.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'both',
    width: 600,
    height: 400,
    minWidth: 400,
    minHeight: 300,
    maxWidth: 800,
    maxHeight: 600,
    children: (
      <Box
        sx={{
          p: 3,
          bgcolor: 'warning.50',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        data-testid="large-size-content"
      >
        <Typography variant="h4" gutterBottom>
          Large Container
        </Typography>
        <Typography variant="body1" paragraph>
          This is a larger resizable container to test performance and behavior with bigger
          dimensions.
        </Typography>
        <Box sx={{ flex: 1, bgcolor: 'grey.100', borderRadius: 1, p: 2 }}>
          <Typography variant="body2">Large content area</Typography>
        </Box>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Large resizable container to test performance and handling of bigger dimensions.',
      },
    },
  },
};

const ResponsiveContentComponent: React.FC = () => {
  const [size, setSize] = useState({ width: 300, height: 200 });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Container: {size.width}px × {size.height}px
      </Typography>

      <Resizable
        variant="both"
        width={300}
        height={200}
        onResize={(width, height) => setSize({ width, height })}
        data-testid="responsive-resizable"
      >
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.50',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Responsive Content
          </Typography>
          <Typography variant="body2" paragraph>
            Content adapts to container size:
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns:
                size.width > 250 ? 'repeat(3, 1fr)' : size.width > 150 ? 'repeat(2, 1fr)' : '1fr',
              gap: 1,
              flex: 1,
            }}
          >
            <Paper sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="caption">Item 1</Typography>
            </Paper>
            <Paper sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="caption">Item 2</Typography>
            </Paper>
            <Paper sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="caption">Item 3</Typography>
            </Paper>
          </Box>
        </Box>
      </Resizable>
    </Box>
  );
};

export const ResponsiveContent: Story = {
  render: () => <ResponsiveContentComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how content can adapt responsively to container size changes. The grid layout changes based on available width.',
      },
    },
  },
};

export const NestedResizable: Story = {
  render: () => (
    <Box sx={{ p: 2, border: 1, borderColor: 'divider' }} data-testid="nested-layout">
      <Typography variant="h6" gutterBottom>
        Nested Resizable Containers
      </Typography>

      <Resizable variant="both" width={400} height={300} data-testid="outer-resizable">
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.50',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Outer Container
          </Typography>

          <Resizable
            variant="both"
            width={200}
            height={120}
            minWidth={100}
            minHeight={80}
            data-testid="inner-resizable"
          >
            <Box sx={{ p: 2, bgcolor: 'secondary.50', height: '100%' }}>
              <Typography variant="body2">Inner Container</Typography>
              <Typography variant="caption">Nested resizable</Typography>
            </Box>
          </Resizable>
        </Box>
      </Resizable>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Nested resizable containers to test complex scenarios where one resizable is inside another.',
      },
    },
  },
};

export const AccessibilityEnhanced: Story = {
  args: {
    variant: 'both',
    width: 300,
    height: 200,
    children: (
      <Box
        sx={{ p: 2, bgcolor: 'info.50', height: '100%' }}
        role="region"
        aria-label="Resizable content area"
        data-testid="accessible-content"
      >
        <Typography variant="h6" gutterBottom>
          Accessible Resizable
        </Typography>
        <Typography variant="body2" paragraph>
          This container includes proper ARIA attributes and semantic HTML for better accessibility.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Use mouse or touch to resize by dragging the handles.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enhanced accessibility example with proper ARIA attributes and semantic HTML structure.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    variant: 'both',
    width: 250,
    height: 150,
    disabled: true,
    children: (
      <Box sx={{ p: 2, bgcolor: 'grey.200', height: '100%' }} data-testid="disabled-content">
        <Typography variant="body1" color="text.disabled">
          Disabled Resizing
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Resizing is disabled for this container
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When disabled is true, resize handles are hidden and resizing functionality is completely disabled.',
      },
    },
  },
};

export const SidePanel: Story = {
  render: () => (
    <Box
      sx={{ display: 'flex', height: 400, border: 1, borderColor: 'divider' }}
      data-testid="side-panel-layout"
    >
      <Resizable
        variant="horizontal"
        width={200}
        minWidth={150}
        maxWidth={350}
        data-testid="resizable-sidebar"
      >
        <Box sx={{ bgcolor: 'primary.50', height: '100%', p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sidebar
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Item 2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Item 3" />
            </ListItem>
          </List>
        </Box>
      </Resizable>

      <Box sx={{ flex: 1, p: 3 }} data-testid="main-content">
        <Typography variant="h5" gutterBottom>
          Main Content
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The sidebar on the left is resizable. Drag its right edge to adjust the width.
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Common use case: Resizable sidebar panel in a layout. The sidebar can be resized horizontally while the main content area adapts.',
      },
    },
  },
};

export const TextEditor: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        border: 1,
        borderColor: 'divider',
      }}
      data-testid="text-editor-layout"
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Typography variant="h6">Code Editor</Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Box
          sx={{ flex: 1, p: 2, bgcolor: 'grey.900', color: 'common.white' }}
          data-testid="code-area"
        >
          <Typography variant="body2" fontFamily="monospace">
            {/* Main editor content */}
            <br />
            function example() {'{'}
            <br />
            {'  '}return &quot;Hello World&quot;;
            <br />
            {'}'}
          </Typography>
        </Box>

        <Resizable
          variant="vertical"
          width={300}
          height={200}
          minHeight={100}
          data-testid="resizable-console"
        >
          <Box sx={{ bgcolor: 'grey.100', height: '100%', p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Console Output
            </Typography>
            <Typography variant="body2" fontFamily="monospace" color="success.main">
              &gt; Hello World
            </Typography>
          </Box>
        </Resizable>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Code editor layout with resizable console panel. The console can be resized vertically to show more or less output.',
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, p: 2, bgcolor: 'grey.50' }}
      data-testid="grid-layout"
    >
      <Resizable variant="both" width={250} height={150} data-testid="widget-1">
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6">Widget 1</Typography>
          <Typography variant="caption">Resizable widget</Typography>
        </Paper>
      </Resizable>

      <Resizable variant="both" width={250} height={150} data-testid="widget-2">
        <Paper sx={{ p: 2, height: '100%', bgcolor: 'primary.50' }}>
          <Typography variant="h6">Widget 2</Typography>
          <Typography variant="caption">Another resizable widget</Typography>
        </Paper>
      </Resizable>

      <Resizable variant="both" width={250} height={150} data-testid="widget-3">
        <Paper sx={{ p: 2, height: '100%', bgcolor: 'secondary.50' }}>
          <Typography variant="h6">Widget 3</Typography>
          <Typography variant="caption">Dashboard component</Typography>
        </Paper>
      </Resizable>

      <Resizable variant="both" width={250} height={150} data-testid="widget-4">
        <Paper sx={{ p: 2, height: '100%', bgcolor: 'info.50' }}>
          <Typography variant="h6">Widget 4</Typography>
          <Typography variant="caption">Flexible layout</Typography>
        </Paper>
      </Resizable>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard-style grid layout with multiple resizable widgets. Each widget can be independently resized in both dimensions.',
      },
    },
  },
};

// Required story exports for validation

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p: 2 }}>
      <Typography variant="h6">All Resizable Variants</Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Horizontal Only
          </Typography>
          <Resizable variant="horizontal" width={200} height={100}>
            <Box sx={{ p: 2, bgcolor: 'primary.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption">Horizontal</Typography>
            </Box>
          </Resizable>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Vertical Only
          </Typography>
          <Resizable variant="vertical" width={200} height={100}>
            <Box sx={{ p: 2, bgcolor: 'secondary.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption">Vertical</Typography>
            </Box>
          </Resizable>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Both Directions
          </Typography>
          <Resizable variant="both" width={200} height={100}>
            <Box sx={{ p: 2, bgcolor: 'info.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption">Both</Typography>
            </Box>
          </Resizable>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all resizable variants side by side.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p: 2 }}>
      <Typography variant="h6">All Resizable Sizes</Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Small
          </Typography>
          <Resizable variant="both" width={100} height={80}>
            <Box sx={{ p: 1, bgcolor: 'primary.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption">Small</Typography>
            </Box>
          </Resizable>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Medium
          </Typography>
          <Resizable variant="both" width={200} height={150}>
            <Box sx={{ p: 2, bgcolor: 'secondary.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="body2">Medium</Typography>
            </Box>
          </Resizable>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Large
          </Typography>
          <Resizable variant="both" width={300} height={200}>
            <Box sx={{ p: 2, bgcolor: 'info.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="body1">Large</Typography>
            </Box>
          </Resizable>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable containers in different sizes.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p: 2 }}>
      <Typography variant="h6">All Resizable States</Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Default
          </Typography>
          <Resizable variant="both" width={150} height={100}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption">Default</Typography>
            </Box>
          </Resizable>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Disabled
          </Typography>
          <Resizable variant="both" width={150} height={100} disabled>
            <Box sx={{ p: 2, bgcolor: 'grey.300', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption" color="text.disabled">
                Disabled
              </Typography>
            </Box>
          </Resizable>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            With Constraints
          </Typography>
          <Resizable
            variant="both"
            width={150}
            height={100}
            minWidth={100}
            maxWidth={200}
            minHeight={80}
            maxHeight={150}
          >
            <Box sx={{ p: 2, bgcolor: 'warning.50', height: '100%', textAlign: 'center' }}>
              <Typography variant="caption">Constrained</Typography>
            </Box>
          </Resizable>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable containers in different states.',
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p: 2 }}>
        <Typography variant="h6">Interactive States</Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box onMouseEnter={() => setHoveredId('hover')} onMouseLeave={() => setHoveredId(null)}>
            <Typography variant="subtitle2" gutterBottom>
              Hover State
            </Typography>
            <Resizable variant="both" width={150} height={100}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: hoveredId === 'hover' ? 'primary.100' : 'primary.50',
                  height: '100%',
                  textAlign: 'center',
                  transition: 'background-color 0.3s',
                }}
              >
                <Typography variant="caption">
                  {hoveredId === 'hover' ? 'Hovered' : 'Hover me'}
                </Typography>
              </Box>
            </Resizable>
          </Box>

          <Box onMouseDown={() => setActiveId('active')} onMouseUp={() => setActiveId(null)}>
            <Typography variant="subtitle2" gutterBottom>
              Active State
            </Typography>
            <Resizable variant="both" width={150} height={100}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: activeId === 'active' ? 'secondary.200' : 'secondary.50',
                  height: '100%',
                  textAlign: 'center',
                  transition: 'background-color 0.3s',
                }}
              >
                <Typography variant="caption">
                  {activeId === 'active' ? 'Active' : 'Click me'}
                </Typography>
              </Box>
            </Resizable>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Focus State
            </Typography>
            <Resizable variant="both" width={150} height={100}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'info.50',
                  height: '100%',
                  textAlign: 'center',
                  '&:focus-within': {
                    bgcolor: 'info.100',
                  },
                }}
                tabIndex={0}
              >
                <Typography variant="caption">Tab to focus</Typography>
              </Box>
            </Resizable>
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive states demonstration with hover, active, and focus states.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Responsive Resizable
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This resizable container adapts to different screen sizes
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Resizable variant="both" width={300} height={200} minWidth={150} maxWidth={500}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.50',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Responsive Container</Typography>
            <Typography variant="body2" color="text.secondary">
              Adapts to viewport size
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }}>
              Min: 150px | Max: 500px
            </Typography>
          </Box>
        </Resizable>

        <Box sx={{ flex: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2">
            Adjacent content that flows with the resizable container
          </Typography>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive resizable container that adapts to different viewport sizes.',
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
