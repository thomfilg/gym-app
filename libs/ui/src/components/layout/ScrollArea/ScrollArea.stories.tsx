import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useCallback, useMemo, useState } from 'react';

import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom scrollable area component with styled scrollbars and smooth scrolling behavior.',
      },
    },
  },
  tags: ['autodocs', 'component:ScrollArea'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the scroll area container',
    },
    height: {
      control: 'text',
      description: 'Height of the scroll area container',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height before scrolling is enabled',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Scroll orientation',
    },
    scrollbarSize: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Size of the scrollbar',
    },
    autoHide: {
      control: 'boolean',
      description: 'Whether scrollbars auto-hide when not in use',
    },
    smoothScroll: {
      control: 'boolean',
      description: 'Enable smooth scrolling behavior',
    },
    variant: {
      control: 'select',
      options: ['default', 'overlay', 'glass'],
      description: 'Visual variant of the scroll area',
    },
    scrollToTopButton: {
      control: 'boolean',
      description: 'Show scroll-to-top button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable scrolling',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to generate scrollable content
const ScrollableContent = ({ lines = 30 }: { lines?: number }) => (
  <Box sx={{ p: 2 }}>
    {Array.from({ length: lines }, (_, i) => (
      <Typography key={i} paragraph>
        Line {i + 1}: This is a sample text line to demonstrate scrolling functionality. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </Typography>
    ))}
  </Box>
);

// Helper component for list content
const ListContent = ({ items = 50 }: { items?: number }) => (
  <List>
    {Array.from({ length: items }, (_, i) => (
      <ListItem key={i} divider>
        <ListItemText primary={`Item ${i + 1}`} secondary={`Description for item ${i + 1}`} />
      </ListItem>
    ))}
  </List>
);

export const Default: Story = {
  args: {
    width: 400,
    height: 300,
    children: <ScrollableContent />,
  },
};

export const VerticalScroll: Story = {
  args: {
    width: 400,
    height: 300,
    orientation: 'vertical',
    children: <ScrollableContent lines={50} />,
  },
};

export const HorizontalScroll: Story = {
  args: {
    width: 400,
    height: 200,
    orientation: 'horizontal',
    children: (
      <Box sx={{ display: 'flex', gap: 2, p: 2, width: 'max-content' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Paper key={i} sx={{ p: 2, minWidth: 150 }}>
            <Typography>Card {i + 1}</Typography>
          </Paper>
        ))}
      </Box>
    ),
  },
};

export const BothDirections: Story = {
  args: {
    width: 400,
    height: 300,
    orientation: 'both',
    children: (
      <Box sx={{ width: 800, p: 2 }}>
        <ScrollableContent lines={50} />
      </Box>
    ),
  },
};

export const ThinScrollbar: Story = {
  args: {
    width: 400,
    height: 300,
    scrollbarSize: 'thin',
    children: <ScrollableContent />,
  },
};

export const ThickScrollbar: Story = {
  args: {
    width: 400,
    height: 300,
    scrollbarSize: 'thick',
    children: <ScrollableContent />,
  },
};

export const AutoHideDisabled: Story = {
  args: {
    width: 400,
    height: 300,
    autoHide: false,
    alwaysShowScrollbar: true,
    children: <ScrollableContent />,
  },
};

export const SmoothScrollDisabled: Story = {
  args: {
    width: 400,
    height: 300,
    smoothScroll: false,
    children: <ScrollableContent />,
  },
};

export const OverlayVariant: Story = {
  args: {
    width: 400,
    height: 300,
    variant: 'overlay',
    children: <ScrollableContent />,
  },
};

export const GlassVariant: Story = {
  args: {
    width: 400,
    height: 300,
    variant: 'glass',
    children: <ScrollableContent />,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 4,
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export const WithScrollToTop: Story = {
  args: {
    width: 400,
    height: 300,
    scrollToTopButton: true,
    scrollToTopThreshold: 50,
    children: <ScrollableContent lines={100} />,
  },
};

export const CustomColors: Story = {
  args: {
    width: 400,
    height: 300,
    scrollbarColor: '#ff6b6b',
    scrollbarTrackColor: '#ffe0e0',
    children: <ScrollableContent />,
  },
};

export const WithPadding: Story = {
  args: {
    width: 400,
    height: 300,
    contentPadding: 3,
    children: <ScrollableContent />,
  },
};

export const MaxHeightExample: Story = {
  args: {
    width: 400,
    maxHeight: 300,
    children: <ScrollableContent lines={5} />,
  },
};

export const DisabledState: Story = {
  args: {
    width: 400,
    height: 300,
    disabled: true,
    children: <ScrollableContent />,
  },
};

export const LoadingState: Story = {
  args: {
    width: 400,
    height: 300,
    loading: true,
    children: <ScrollableContent />,
  },
};

export const EmptyState: Story = {
  args: {
    width: 400,
    height: 300,
    emptyContent: (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No content available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          There is no data to display
        </Typography>
      </Box>
    ),
  },
};

export const WithListContent: Story = {
  args: {
    width: 400,
    height: 400,
    scrollToTopButton: true,
    children: <ListContent />,
  },
};

export const ResponsiveWidth: Story = {
  args: {
    width: '100%',
    maxWidth: 600,
    height: 300,
    children: <ScrollableContent />,
  },
};

export const NestedScrollAreas: Story = {
  args: {
    width: 600,
    height: 400,
    children: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Parent Scroll Area
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Paper sx={{ flex: 1 }}>
            <ScrollArea height={200} variant="overlay">
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Nested Area 1
                </Typography>
                <ScrollableContent lines={20} />
              </Box>
            </ScrollArea>
          </Paper>
          <Paper sx={{ flex: 1 }}>
            <ScrollArea height={200} variant="overlay">
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Nested Area 2
                </Typography>
                <ScrollableContent lines={20} />
              </Box>
            </ScrollArea>
          </Paper>
        </Box>
        <Box sx={{ mt: 2 }}>
          <ScrollableContent lines={10} />
        </Box>
      </Box>
    ),
  },
};

export const WithChips: Story = {
  args: {
    width: 400,
    height: 100,
    orientation: 'horizontal',
    scrollbarSize: 'thin',
    children: (
      <Box sx={{ display: 'flex', gap: 1, p: 2, width: 'max-content' }}>
        {Array.from({ length: 30 }, (_, i) => (
          <Chip key={i} label={`Tag ${i + 1}`} color="primary" variant="outlined" />
        ))}
      </Box>
    ),
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">All ScrollArea Variants</Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Default</Typography>
          <ScrollArea width={300} height={200} variant="default">
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Overlay</Typography>
          <ScrollArea width={300} height={200} variant="overlay">
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Glass</Typography>
          <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', p: 2, borderRadius: 1 }}>
            <ScrollArea width={300} height={200} variant="glass">
              <ScrollableContent lines={20} />
            </ScrollArea>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">All ScrollArea Sizes</Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Small (200x150)</Typography>
          <ScrollArea width={200} height={150}>
            <ScrollableContent lines={15} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Medium (400x300)</Typography>
          <ScrollArea width={400} height={300}>
            <ScrollableContent lines={25} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Large (600x400)</Typography>
          <ScrollArea width={600} height={400}>
            <ScrollableContent lines={35} />
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">All ScrollArea States</Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Normal</Typography>
          <ScrollArea width={300} height={200}>
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Disabled</Typography>
          <ScrollArea width={300} height={200} disabled>
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Loading</Typography>
          <ScrollArea width={300} height={200} loading>
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Empty</Typography>
          <ScrollArea
            width={300}
            height={200}
            emptyContent={
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography color="text.secondary">No content</Typography>
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Interactive ScrollArea States</Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Hover (Auto-hide scrollbar)</Typography>
          <ScrollArea width={300} height={200} autoHide>
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Active (Scrolling)</Typography>
          <ScrollArea width={300} height={200} smoothScroll>
            <ScrollableContent lines={20} />
          </ScrollArea>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">With Scroll-to-Top</Typography>
          <ScrollArea width={300} height={200} scrollToTopButton scrollToTopThreshold={50}>
            <ScrollableContent lines={30} />
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
  render: () => (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>Responsive ScrollArea</Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">100% width, max 500px</Typography>
          <ScrollArea width="100%" maxWidth={500} height={300}>
            <ScrollableContent lines={25} />
          </ScrollArea>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">Responsive height</Typography>
          <ScrollArea
            width="100%"
            height={{ xs: 200, sm: 300, md: 400 }}
            sx={{ bgcolor: 'background.paper' }}
          >
            <ScrollableContent lines={30} />
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  ),
};

// Virtualized grid component that uses ScrollArea
interface VirtualizedGridInScrollAreaProps {
  totalItems: number;
  squareSize: number;
  gap: number;
  columnCount: number;
  visibleRows: number;
}

const VirtualizedGridInScrollArea: React.FC<VirtualizedGridInScrollAreaProps> = ({
  totalItems,
  squareSize,
  gap,
  columnCount,
  visibleRows,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = squareSize + gap;
  const totalRows = Math.ceil(totalItems / columnCount);
  const totalHeight = totalRows * squareSize + Math.max(0, totalRows - 1) * gap;
  const visibleHeight = visibleRows * squareSize + Math.max(0, visibleRows - 1) * gap;
  const containerWidth = columnCount * squareSize + (columnCount - 1) * gap;

  // Calculate visible rows with buffer
  const bufferRows = 2;
  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferRows);
  const endRow = Math.min(totalRows, Math.ceil((scrollTop + visibleHeight) / rowHeight) + bufferRows);

  const visibleSquares = useMemo(() => {
    const squares = [];
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < columnCount; col++) {
        const index = row * columnCount + col;
        if (index >= totalItems) break;
        squares.push({ index, row, col, number: index + 1 });
      }
    }
    return squares;
  }, [startRow, endRow, columnCount, totalItems]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return (
    <ScrollArea
      width={containerWidth + 20}
      height={visibleHeight}
      autoHide
      autoHideDelay={800}
      onScroll={handleScroll}
    >
      <Box sx={{ position: 'relative', width: containerWidth, height: totalHeight }}>
        {visibleSquares.map(({ index, row, col, number }) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: row * rowHeight,
              left: col * (squareSize + gap),
              width: squareSize,
              height: squareSize,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            {number}
          </Box>
        ))}
      </Box>
    </ScrollArea>
  );
};

export const NumberedSquaresGrid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A virtualized grid of 100,000 numbered squares (50x50px each with 5px gap) ' +
          'inside ScrollArea. Demonstrates autoHide scrollbar with large datasets.',
      },
    },
  },
  render: () => {
    const GAP = 5;
    const SQUARE_SIZE = 50;
    const TOTAL_SQUARES = 100000;
    const COLUMN_COUNT = 9;
    const VISIBLE_ROWS = 3;

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Numbered Squares Grid (100,000 items)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          50x50px squares with 5px gap. Scroll to see the autoHide scrollbar in action.
        </Typography>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
          <VirtualizedGridInScrollArea
            totalItems={TOTAL_SQUARES}
            squareSize={SQUARE_SIZE}
            gap={GAP}
            columnCount={COLUMN_COUNT}
            visibleRows={VISIBLE_ROWS}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Total items: {TOTAL_SQUARES.toLocaleString()} | Columns: {COLUMN_COUNT} | Gap: {GAP}px
        </Typography>
      </Box>
    );
  },
};

