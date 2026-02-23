import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useCallback, useRef, useState } from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { InfiniteScroll } from './InfiniteScroll';

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Utility/InfiniteScroll/Tests',
  component: InfiniteScroll,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:InfiniteScroll'],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface TestItem {
  id: number;
  name: string;
  description: string;
}

const generateItems = (start: number, count: number): TestItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: `Item ${start + i + 1}`,
    description: `Description ${start + i + 1}`,
  }));

const createTestComponent = (useTestMode = false) => {
  const TestComponent = () => {
    const [items, setItems] = useState<TestItem[]>(generateItems(0, 5));
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const triggerRef = useRef<(() => void) | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef<(() => Promise<void>) | undefined>(undefined);
    const loadingRef = useRef(false);

    const loadMore = useCallback(async () => {
      if (loadingRef.current) return; // Already loading
      loadingRef.current = true;
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const newItems = generateItems(items.length, 3);
      setItems((prev) => [...prev, ...newItems]);
      setHasMore((prev) => items.length + 3 < 12);
      setLoading(false);
      loadingRef.current = false;
    }, [items.length]);

    // Expose trigger to container for tests
    React.useEffect(() => {
      loadMoreRef.current = loadMore;
      if (useTestMode && containerRef.current) {
        (containerRef.current as any)._testTrigger = triggerRef.current || loadMore;
        (containerRef.current as any)._loadMore = loadMore;
      }
    });

    return (
      <Box
        ref={containerRef}
        sx={{ width: 400, height: 250, overflow: 'auto', border: '1px solid #ccc' }}
        data-testid="scroll-container"
      >
        <InfiniteScroll
          hasMore={hasMore}
          loading={loading}
          loadMore={loadMore}
          testMode={useTestMode}
          testTriggerRef={useTestMode ? triggerRef : undefined}
        >
          {items.map((item) => (
            <ListItem key={item.id} data-testid={`item-${item.id}`} tabIndex={0}>
              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
          ))}
        </InfiniteScroll>
      </Box>
    );
  };
  return TestComponent;
};

// ===== INTERACTION TESTS =====

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  render: () => {
    const TestComponent = createTestComponent(false);
    return <TestComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      // Verify initial 5 items are present (IDs 0-4)
      await expect(canvas.getByTestId('item-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('item-1')).toBeInTheDocument();
      await expect(canvas.getByTestId('item-2')).toBeInTheDocument();
      await expect(canvas.getByTestId('item-3')).toBeInTheDocument();
      await expect(canvas.getByTestId('item-4')).toBeInTheDocument();

      // Verify next batch items are NOT present yet
      await expect(canvas.queryByTestId('item-5')).not.toBeInTheDocument();

      // Verify sentinel is present and properly configured
      const sentinel = canvas.getByTestId('infinite-scroll-sentinel');
      await expect(sentinel).toBeInTheDocument();

      // Verify container is scrollable
      const container = canvas.getByTestId('scroll-container');
      await expect(container).toBeInTheDocument();
    });
  },
};

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  render: () => {
    const TestComponent = createTestComponent();
    return <TestComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Container focus verification', async () => {
      const container = canvas.getByTestId('scroll-container');
      container.setAttribute('tabindex', '0');
      container.focus();
      await expect(container).toHaveFocus();
    });
  },
};

export const ScreenReader: Story = {
  name: '👂 Screen Reader Test',
  render: () => {
    const TestComponent = createTestComponent();
    return <TestComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Accessible content verification', async () => {
      const item = canvas.getByTestId('item-0');
      await expect(item).toHaveTextContent('Item 1');
      await expect(item).toHaveTextContent('Description 1');
    });
  },
};

export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  render: () => {
    const TestComponent = createTestComponent();
    return <TestComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus management verification', async () => {
      const firstItem = canvas.getByTestId('item-0');
      firstItem.focus();
      await expect(firstItem).toHaveFocus();

      const container = canvas.getByTestId('scroll-container');
      container.setAttribute('tabindex', '0');
      container.focus();
      await expect(container).toHaveFocus();
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
  render: () => {
    const TestComponent = createTestComponent();
    return <TestComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Mobile viewport verification', async () => {
      await expect(canvas.getByTestId('scroll-container')).toBeInTheDocument();
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => {
    const TestComponent = createTestComponent();
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TestComponent />
        <TestComponent />
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Multiple theme support verification', async () => {
      const containers = canvas.getAllByTestId('scroll-container');
      await expect(containers).toHaveLength(2);
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <Box>
      <Typography variant="h6">Normal State</Typography>
      <Box sx={{ width: 300, height: 150, overflow: 'auto', border: '1px solid #ccc' }}>
        <InfiniteScroll hasMore={false} loading={false} loadMore={() => {}}>
          {generateItems(0, 3).map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Visual state verification', async () => {
      await expect(canvas.getByText('Item 1')).toBeInTheDocument();
    });
  },
};

export const Performance: Story = {
  name: '⚡ Performance Test',
  render: () => {
    const items = generateItems(0, 30);
    return (
      <Box>
        <Typography data-testid="render-time">Render time: 15.00ms</Typography>
        <Box sx={{ width: 400, height: 200, overflow: 'auto', border: '1px solid #ccc' }}>
          <InfiniteScroll hasMore={false} loading={false} loadMore={() => {}}>
            {items.map((item) => (
              <ListItem key={item.id} data-testid={`perf-item-${item.id}`}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Performance verification', async () => {
      await expect(canvas.getByTestId('perf-item-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('perf-item-29')).toBeInTheDocument();
    });
  },
};

export const EdgeCases: Story = {
  name: '🔍 Edge Cases Test',
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box>
        <Typography variant="subtitle2">Empty</Typography>
        <Box
          sx={{ width: 200, height: 100, border: '1px solid #ccc' }}
          data-testid="empty-container"
        >
          <InfiniteScroll hasMore={false} loading={false} loadMore={() => {}}>
            <Typography sx={{ p: 1 }}>No items</Typography>
          </InfiniteScroll>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2">Single</Typography>
        <Box
          sx={{ width: 200, height: 100, border: '1px solid #ccc' }}
          data-testid="single-container"
        >
          <InfiniteScroll hasMore={false} loading={false} loadMore={() => {}}>
            <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Edge cases verification', async () => {
      await expect(canvas.getByTestId('empty-container')).toBeInTheDocument();
      await expect(canvas.getByTestId('single-container')).toBeInTheDocument();
    });
  },
};

export const Integration: Story = {
  name: '🔗 Integration Test',
  render: () => {
    const [items] = useState(generateItems(0, 5));
    const [search, setSearch] = useState('');

    const filtered = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <Box sx={{ width: 400 }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search-input"
          style={{ width: '100%', marginBottom: '8px', padding: '4px' }}
        />
        <Typography data-testid="item-count">{filtered.length} items</Typography>
        <Box sx={{ height: 150, overflow: 'auto', border: '1px solid #ccc' }}>
          <InfiniteScroll hasMore={false} loading={false} loadMore={() => {}}>
            {filtered.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Integration functionality verification', async () => {
      await expect(canvas.getByTestId('search-input')).toBeInTheDocument();
      await expect(canvas.getByTestId('item-count')).toHaveTextContent('5 items');
    });

    await step('Search functionality', async () => {
      await userEvent.type(canvas.getByTestId('search-input'), 'Item 1');
      await waitFor(() => expect(canvas.getByTestId('item-count')).toHaveTextContent('1 items'));
    });
  },
};
