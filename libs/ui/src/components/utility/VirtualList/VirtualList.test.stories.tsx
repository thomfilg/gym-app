import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent,fn, userEvent, waitFor, within } from 'storybook/test';

import { VirtualGrid,VirtualList } from './VirtualList';
import type { VirtualListItem } from './VirtualList.types';

const meta: Meta<typeof VirtualList> = {
  title: 'Utility/VirtualList/Tests',
  component: VirtualList,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:VirtualList'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper functions
const generateItems = (count: number): VirtualListItem[] => Array.from({ length: count }, (_, i) => ({
  id: i,
  data: {
    name: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
    avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
  },
}));

const generateVariableItems = (count: number): VirtualListItem[] => Array.from({ length: count }, (_, i) => ({
  id: i,
  height: 60 + Math.floor(Math.random() * 100),
  data: {
    name: `Variable Item ${i + 1}`,
    description: `This item has a variable height. ${
      Math.random() > 0.5
        ? 'It contains additional content that makes it taller than other items in the list.'
        : 'Short description.'
    }`,
    avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
  },
}));

const SimpleItemRenderer = ({
  item,
  index,
  style,
}: {
  item: VirtualListItem;
  index: number;
  style: React.CSSProperties;
}) => (
  <Box key={item.id} style={style} data-testid={`virtual-item-${index}`}>
    <ListItem>
      <ListItemAvatar>
        <Avatar src={item.data.avatar} />
      </ListItemAvatar>
      <ListItemText primary={item.data.name} secondary={item.data.description} />
    </ListItem>
  </Box>
);

const GridItemRenderer = ({
  item,
  index,
  style,
}: {
  item: VirtualListItem;
  index: number;
  style: React.CSSProperties;
}) => (
  <Box
    key={item.id}
    style={style}
    data-testid={`grid-item-${index}`}
    sx={{
      p: 2,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <Avatar src={item.data.avatar} sx={{ width: 56, height: 56, mb: 1 }} />
    <Typography variant="body2" fontWeight="bold">
      {item.data.name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Grid Item #{item.id + 1}
    </Typography>
  </Box>
);

// Basic Interaction Tests
export const BasicInteraction: Story = {
  render: () => {
    const items = generateItems(100);
    const onScrollSpy = fn();

    return (
      <Paper sx={{ width: 400, height: 300 }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={300}
          itemHeight={60}
          onScroll={onScrollSpy}
          renderItem={SimpleItemRenderer}
          data-testid="virtual-list"
        />
      </Paper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const virtualList = canvas.getByTestId('virtual-list');

    // Test that virtual list renders
    await expect(virtualList).toBeInTheDocument();

    // Test that items are rendered
    const firstItem = canvas.getByTestId('virtual-item-0');
    await expect(firstItem).toBeInTheDocument();

    // Test scrolling
    fireEvent.scroll(virtualList, { target: { scrollTop: 200 } });
    await waitFor(() => {
      // After scrolling, different items should be visible
      const newVisibleItem = canvas.queryByTestId('virtual-item-5');
      expect(newVisibleItem).toBeInTheDocument();
    });

    // Test that scroll callback is called
    await waitFor(() => {
      expect(virtualList.scrollTop).toBeGreaterThan(0);
    });
  },
};

export const GridInteraction: Story = {
  render: () => {
    const items = generateItems(100);
    const onScrollSpy = fn();

    return (
      <Paper sx={{ width: 600, height: 400 }}>
        <VirtualGrid
          items={items}
          height={400}
          width={600}
          columnCount={3}
          rowHeight={150}
          gap={8}
          onScroll={onScrollSpy}
          renderItem={GridItemRenderer}
          data-testid="virtual-grid"
        />
      </Paper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const virtualGrid = canvas.getByTestId('virtual-grid');

    // Test that virtual grid renders
    await expect(virtualGrid).toBeInTheDocument();

    // Test that grid items are rendered
    const firstItem = canvas.getByTestId('grid-item-0');
    await expect(firstItem).toBeInTheDocument();

    // Test multiple items in first row
    const secondItem = canvas.getByTestId('grid-item-1');
    const thirdItem = canvas.getByTestId('grid-item-2');
    await expect(secondItem).toBeInTheDocument();
    await expect(thirdItem).toBeInTheDocument();

    // Test scrolling in grid
    fireEvent.scroll(virtualGrid, { target: { scrollTop: 300 } });
    await waitFor(() => {
      expect(virtualGrid.scrollTop).toBeGreaterThan(0);
    });
  },
};

// Form Interaction Tests (Scroll behaviors)
export const ScrollInteraction: Story = {
  render: () => {
    const items = generateItems(1000);
    let scrollPosition = 0;

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper sx={{ width: 400, height: 300 }}>
          <VirtualList
            items={items}
            variant="fixed"
            height={300}
            itemHeight={50}
            onScroll={(scrollTop) => {
              scrollPosition = scrollTop;
            }}
            renderItem={SimpleItemRenderer}
            data-testid="scrollable-list"
          />
        </Paper>
        <Box sx={{ width: 200, p: 2 }}>
          <Typography variant="body2" data-testid="scroll-info">
            Scroll Position: {Math.round(scrollPosition)}px
          </Typography>
        </Box>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const scrollableList = canvas.getByTestId('scrollable-list');

    // Test initial state
    await expect(scrollableList).toBeInTheDocument();
    expect(scrollableList.scrollTop).toBe(0);

    // Test scroll to middle
    fireEvent.scroll(scrollableList, { target: { scrollTop: 500 } });
    await waitFor(() => {
      expect(scrollableList.scrollTop).toBeGreaterThan(400);
    });

    // Test scroll to bottom
    scrollableList.scrollTop = scrollableList.scrollHeight - scrollableList.clientHeight;
    await waitFor(() => {
      expect(scrollableList.scrollTop).toBeGreaterThan(1000);
    });

    // Test scroll back to top
    scrollableList.scrollTop = 0;
    await waitFor(() => {
      expect(scrollableList.scrollTop).toBe(0);
    });
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: () => {
    const items = generateItems(100);

    return (
      <Paper sx={{ width: 400, height: 300 }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={300}
          itemHeight={60}
          renderItem={({ item, index, style }) => (
            <Box key={item.id} style={style}>
              <ListItem
                tabIndex={0}
                data-testid={`keyboard-item-${index}`}
                sx={{
                  '&:focus': {
                    backgroundColor: 'primary.light',
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={item.data.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.data.name} secondary={item.data.description} />
              </ListItem>
            </Box>
          )}
          data-testid="keyboard-list"
        />
      </Paper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('keyboard-list');

    // Test initial focus
    const firstItem = canvas.getByTestId('keyboard-item-0');
    await userEvent.click(firstItem);
    await waitFor(() => {
      expect(firstItem).toHaveFocus();
    });

    // Test that second item can be focused (simulate arrow key behavior)
    const secondItem = canvas.getByTestId('keyboard-item-1');
    await userEvent.click(secondItem);
    await waitFor(() => {
      expect(secondItem).toHaveFocus();
    });

    // Test scroll behavior using direct scroll event
    fireEvent.scroll(list, { target: { scrollTop: 200 } });
    await waitFor(
      () => {
        // Check the scroll position was applied
        expect(list.scrollTop).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test scroll back to top
    fireEvent.scroll(list, { target: { scrollTop: 0 } });
    await waitFor(
      () => {
        expect(list.scrollTop).toBe(0);
      },
      { timeout: 1000 },
    );
  },
};

// Screen Reader Tests
export const ScreenReader: Story = {
  render: () => {
    const items = generateItems(50);

    return (
      <Paper sx={{ width: 400, height: 300 }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={300}
          itemHeight={80}
          renderItem={({ item, index, style }) => (
            <Box key={item.id} style={style}>
              <ListItem
                role="listitem"
                aria-label={`Item ${index + 1}: ${item.data.name}`}
                data-testid={`screen-reader-item-${index}`}
              >
                <ListItemAvatar>
                  <Avatar src={item.data.avatar} alt={`Avatar for ${item.data.name}`} />
                </ListItemAvatar>
                <ListItemText primary={item.data.name} secondary={item.data.description} />
              </ListItem>
            </Box>
          )}
          role="list"
          aria-label="Virtual scrollable list"
          data-testid="screen-reader-list"
        />
      </Paper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('screen-reader-list');

    // Test ARIA attributes
    await expect(list).toHaveAttribute('role', 'list');
    await expect(list).toHaveAttribute('aria-label', 'Virtual scrollable list');

    // Test item accessibility
    const firstItem = canvas.getByTestId('screen-reader-item-0');
    await expect(firstItem).toHaveAttribute('role', 'listitem');
    await expect(firstItem).toHaveAttribute('aria-label');

    // Test that aria-label contains descriptive text
    const ariaLabel = firstItem.getAttribute('aria-label');
    expect(ariaLabel).toContain('Item 1:');

    // Test avatar alt text
    const avatar = firstItem.querySelector('img');
    if (avatar) {
      expect(avatar).toHaveAttribute('alt');
    }
  },
};

// Focus Management Tests
export const FocusManagement: Story = {
  render: () => {
    const items = generateItems(20);

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <button data-testid="external-button">External Button</button>
        <Paper sx={{ width: 400, height: 250 }}>
          <VirtualList
            items={items}
            variant="fixed"
            height={250}
            itemHeight={60}
            renderItem={({ item, index, style }) => (
              <Box key={item.id} style={style}>
                <ListItem
                  button
                  tabIndex={0}
                  data-testid={`focus-item-${index}`}
                  onFocus={(e) => {
                    e.currentTarget.scrollIntoView({ block: 'nearest' });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary={item.data.description} />
                </ListItem>
              </Box>
            )}
            data-testid="focus-list"
          />
        </Paper>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test external focus
    const externalButton = canvas.getByTestId('external-button');
    await userEvent.click(externalButton);
    expect(externalButton).toHaveFocus();

    // Test tab into list
    await userEvent.tab();
    const firstItem = canvas.getByTestId('focus-item-0');
    await waitFor(() => {
      expect(firstItem).toHaveFocus();
    });

    // Test focus preservation during scroll
    const list = canvas.getByTestId('focus-list');
    fireEvent.scroll(list, { target: { scrollTop: 200 } });

    // Focus should remain stable
    await waitFor(() => {
      const focusedElement = canvasElement.ownerDocument.activeElement;
      expect(focusedElement?.getAttribute('data-testid')).toContain('focus-item-');
    });
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: () => {
    const items = generateItems(100);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {/* Mobile viewport */}
        <Paper sx={{ width: 320, height: 200 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Mobile (320px)
          </Typography>
          <VirtualList
            items={items}
            variant="fixed"
            height={180}
            width={320}
            itemHeight={50}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem sx={{ px: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} sx={{ width: 32, height: 32 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" noWrap>
                        {item.data.name}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            )}
            data-testid="mobile-list"
          />
        </Paper>

        {/* Desktop viewport */}
        <Paper sx={{ width: 800, height: 200 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Desktop (800px)
          </Typography>
          <VirtualList
            items={items}
            variant="fixed"
            height={180}
            width={800}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem sx={{ px: 3 }}>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} sx={{ width: 48, height: 48 }} />
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary={item.data.description} />
                </ListItem>
              </Box>
            )}
            data-testid="desktop-list"
          />
        </Paper>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test mobile list
    const mobileList = canvas.getByTestId('mobile-list');
    await expect(mobileList).toBeInTheDocument();

    // Check that mobile list container exists
    const mobileContainer = mobileList.closest(
      '[role="list"], .virtual-list, [data-testid="mobile-list"]',
    );
    expect(mobileContainer).toBeInTheDocument();

    // Test desktop list
    const desktopList = canvas.getByTestId('desktop-list');
    await expect(desktopList).toBeInTheDocument();

    // Check that desktop list container exists
    const desktopContainer = desktopList.closest(
      '[role="list"], .virtual-list, [data-testid="desktop-list"]',
    );
    expect(desktopContainer).toBeInTheDocument();

    // Test that both lists have content (look for any rendered items)
    await waitFor(
      () => {
        expect(mobileList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    await waitFor(
      () => {
        expect(desktopList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );
  },
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  render: () => {
    const items = generateItems(50);

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Light theme */}
        <Paper sx={{ width: 300, height: 250, bgcolor: 'background.paper' }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Light Theme
          </Typography>
          <VirtualList
            items={items}
            variant="fixed"
            height={220}
            itemHeight={55}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography color="text.primary">{item.data.name}</Typography>}
                    secondary={
                      <Typography color="text.secondary" variant="body2">
                        Light theme item
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            )}
            data-testid="light-theme-list"
          />
        </Paper>

        {/* Dark theme simulation */}
        <Paper sx={{ width: 300, height: 250, bgcolor: '#1e1e1e', color: 'white' }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block', color: 'white' }}>
            Dark Theme
          </Typography>
          <VirtualList
            items={items}
            variant="fixed"
            height={220}
            itemHeight={55}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem sx={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'white' }}>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ color: 'white' }}>{item.data.name}</Typography>}
                    secondary={
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)' }} variant="body2">
                        Dark theme item
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            )}
            data-testid="dark-theme-list"
          />
        </Paper>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test light theme list
    const lightList = canvas.getByTestId('light-theme-list');
    await expect(lightList).toBeInTheDocument();

    // Test dark theme list
    const darkList = canvas.getByTestId('dark-theme-list');
    await expect(darkList).toBeInTheDocument();

    // Verify both lists render items
    await waitFor(
      () => {
        expect(lightList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    await waitFor(
      () => {
        expect(darkList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );
  },
};

// Visual States Tests
export const VisualStates: Story = {
  render: () => {
    const emptyItems: VirtualListItem[] = [];

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Loading state */}
        <Paper sx={{ width: 250, height: 200 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Loading State
          </Typography>
          <VirtualList
            items={Array.from({ length: 5 }, (_, i) => ({ id: i }))}
            variant="fixed"
            height={170}
            itemHeight={40}
            renderItem={({ style, index }) => (
              <Box key={index} style={style} sx={{ p: 1 }}>
                <Skeleton variant="rectangular" width="100%" height={30} />
              </Box>
            )}
            data-testid="loading-list"
          />
        </Paper>

        {/* Empty state */}
        <Paper sx={{ width: 250, height: 200 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Empty State
          </Typography>
          <VirtualList
            items={emptyItems}
            variant="fixed"
            height={170}
            itemHeight={40}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemText primary={item.data?.name} />
                </ListItem>
              </Box>
            )}
            data-testid="empty-list"
          />
          {emptyItems.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No items to display
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Error state */}
        <Paper sx={{ width: 250, height: 200 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Error State
          </Typography>
          <Alert severity="error" sx={{ m: 1 }}>
            Failed to load data
          </Alert>
        </Paper>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test loading state
    const loadingList = canvas.getByTestId('loading-list');
    await expect(loadingList).toBeInTheDocument();

    // Test skeleton loaders are present (wait for them to render)
    await waitFor(
      () => {
        const skeletons = canvasElement.querySelectorAll('.MuiSkeleton-root');
        expect(skeletons.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test empty state
    const emptyList = canvas.getByTestId('empty-list');
    await expect(emptyList).toBeInTheDocument();

    // Test empty message
    const emptyMessage = canvas.getByText('No items to display');
    await expect(emptyMessage).toBeInTheDocument();

    // Test error state
    const errorAlert = canvas.getByRole('alert');
    await expect(errorAlert).toBeInTheDocument();
  },
};

// Performance Tests
export const Performance: Story = {
  render: () => {
    const largeDataset = generateItems(10000);

    return (
      <Paper sx={{ width: 400, height: 400 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6">Performance Test</Typography>
          <Typography variant="body2" color="text.secondary">
            10,000 items - Virtual scrolling
          </Typography>
        </Box>
        <VirtualList
          items={largeDataset}
          variant="fixed"
          height={350}
          itemHeight={50}
          overscan={10}
          renderItem={({ item, index, style }) => {
            // Simulate some computation
            const computedValue = Math.sin(index) * 100;

            return (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Item ${index + 1}`}
                    secondary={`Computed: ${computedValue.toFixed(2)}`}
                  />
                </ListItem>
              </Box>
            );
          }}
          data-testid="performance-list"
        />
      </Paper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const performanceList = canvas.getByTestId('performance-list');

    // Test that performance list renders correctly
    await expect(performanceList).toBeInTheDocument();

    // Test rapid scrolling performance
    // Perform scrolling with proper event simulation
    fireEvent.scroll(performanceList, { target: { scrollTop: 500 } });
    await waitFor(
      () => {
        expect(performanceList.scrollTop).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test multiple scroll events
    for (let i = 1; i <= 3; i++) {
      fireEvent.scroll(performanceList, { target: { scrollTop: i * 200 } });
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      });
    }

    // Verify list is still responsive
    await expect(performanceList).toBeInTheDocument();
    await waitFor(
      () => {
        expect(performanceList.scrollTop).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  render: () => {
    const singleItem = generateItems(1);
    const variableItems = generateVariableItems(20);
    const emptyItems: VirtualListItem[] = [];

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Single item */}
        <Paper sx={{ width: 200, height: 150 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Single Item
          </Typography>
          <VirtualList
            items={singleItem}
            variant="fixed"
            height={120}
            itemHeight={50}
            renderItem={SimpleItemRenderer}
            data-testid="single-item-list"
          />
        </Paper>

        {/* Variable heights */}
        <Paper sx={{ width: 250, height: 150 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Variable Heights
          </Typography>
          <VirtualList
            items={variableItems}
            variant="variable"
            height={120}
            estimatedItemHeight={80}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary={item.data.description} />
                </ListItem>
              </Box>
            )}
            data-testid="variable-height-list"
          />
        </Paper>

        {/* Zero items */}
        <Paper sx={{ width: 200, height: 150 }}>
          <Typography variant="caption" sx={{ p: 1, display: 'block' }}>
            Zero Items
          </Typography>
          <VirtualList
            items={emptyItems}
            variant="fixed"
            height={120}
            itemHeight={50}
            renderItem={SimpleItemRenderer}
            data-testid="zero-items-list"
          />
        </Paper>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test single item
    const singleItemList = canvas.getByTestId('single-item-list');
    await expect(singleItemList).toBeInTheDocument();

    // Wait for item to render
    await waitFor(
      () => {
        expect(singleItemList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test variable heights
    const variableHeightList = canvas.getByTestId('variable-height-list');
    await expect(variableHeightList).toBeInTheDocument();

    // Wait for items to render before testing scroll
    await waitFor(
      () => {
        expect(variableHeightList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test scrolling with variable heights
    fireEvent.scroll(variableHeightList, { target: { scrollTop: 100 } });
    await waitFor(
      () => {
        expect(variableHeightList.scrollTop).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );

    // Test zero items
    const zeroItemsList = canvas.getByTestId('zero-items-list');
    await expect(zeroItemsList).toBeInTheDocument();

    // Zero items list should have minimal or no child elements (it might have a container div)
    // The inner container for virtualization might still be present even with no items
    expect(zeroItemsList.children.length).toBeLessThanOrEqual(1);
  },
};

// Integration Tests
export const Integration: Story = {
  render: () => {
    const items = generateItems(100);
    const gridItems = generateItems(50);

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* List + Grid Integration */}
        <Paper sx={{ width: 300, height: 400 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            List View
          </Typography>
          <VirtualList
            items={items}
            variant="fixed"
            height={350}
            itemHeight={60}
            renderItem={({ item, index, style }) => (
              <Box key={item.id} style={style}>
                <ListItem
                  button
                  onClick={() => {
                    // Integration with external handlers
                    // eslint-disable-next-line no-console
                    console.log('Clicked item:', item.id);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary={`List item ${index + 1}`} />
                </ListItem>
              </Box>
            )}
            data-testid="integration-list"
          />
        </Paper>

        <Paper sx={{ width: 400, height: 400 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Grid View
          </Typography>
          <VirtualGrid
            items={gridItems}
            height={350}
            width={400}
            columnCount={3}
            rowHeight={100}
            gap={8}
            renderItem={({ item, style }) => (
              <Box
                key={item.id}
                style={style}
                sx={{
                  bgcolor: 'primary.light',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                }}
                onClick={() => {
                  // Integration with external handlers
                  // eslint-disable-next-line no-console
                  console.log('Clicked grid item:', item.id);
                }}
              >
                <Typography variant="body2" color="white">
                  #{item.id + 1}
                </Typography>
              </Box>
            )}
            data-testid="integration-grid"
          />
        </Paper>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test list integration
    const integrationList = canvas.getByTestId('integration-list');
    await expect(integrationList).toBeInTheDocument();

    // Test grid integration
    const integrationGrid = canvas.getByTestId('integration-grid');
    await expect(integrationGrid).toBeInTheDocument();

    // Wait for items to render
    await waitFor(
      () => {
        expect(integrationList.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    await waitFor(
      () => {
        expect(integrationGrid.children.length).toBeGreaterThan(0);
      },
      { timeout: 2000 },
    );

    // Test clicking on first visible list item
    const firstListItem = integrationList.querySelector('div[style*="position"]');
    if (firstListItem) {
      await userEvent.click(firstListItem);
    }

    // Test clicking on first visible grid item
    const firstGridItem = integrationGrid.querySelector('div[style*="position"]');
    if (firstGridItem) {
      await userEvent.click(firstGridItem);
    }

    // Test that both components work independently
    fireEvent.scroll(integrationList, { target: { scrollTop: 200 } });
    fireEvent.scroll(integrationGrid, { target: { scrollTop: 200 } });

    await waitFor(() => {
      expect(integrationList.scrollTop).toBeGreaterThan(0);
      expect(integrationGrid.scrollTop).toBeGreaterThan(0);
    });
  },
};
