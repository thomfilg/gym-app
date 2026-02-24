import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback,useState } from 'react';

import { InfiniteScroll } from './InfiniteScroll';

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Utility/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs', 'component:InfiniteScroll'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Infinite scroll component with support for vertical, reverse, and horizontal scrolling modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

interface Item {
  id: number;
  name: string;
  description: string;
  avatar: string;
}

const generateItems = (startIndex: number, count: number): Item[] => Array.from({ length: count }, (_, i) => ({
  id: startIndex + i,
  name: `User ${startIndex + i + 1}`,
  description: `This is a description for user ${startIndex + i + 1}. They have been using our platform for a while.`,
  avatar: `https://i.pravatar.cc/40?img=${((startIndex + i) % 70) + 1}`,
}));

const VerticalScrollComponent = () => {
  const [items, setItems] = useState<Item[]>(generateItems(0, 20));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => window.setTimeout(resolve, 1000));

    const newItems = generateItems(items.length, 10);
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);

    // Stop loading after 100 items for demo
    if (items.length >= 90) {
      setHasMore(false);
    }
  }, [items.length]);

  return (
    <Paper sx={{ width: 400, height: 500, overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">Infinite Scroll Demo</Typography>
        <Typography variant="body2" color="text.secondary">
          {items.length} items loaded
        </Typography>
      </Box>

      <Box sx={{ height: 'calc(100% - 80px)', overflow: 'auto' }}>
        <InfiniteScroll hasMore={hasMore} loading={loading} loadMore={loadMore} threshold={100}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar src={item.avatar} />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
          ))}
        </InfiniteScroll>
      </Box>
    </Paper>
  );
};

export const VerticalScroll: Story = {
  render: () => <VerticalScrollComponent />,
};

const CardGridComponent = () => {
  const [items, setItems] = useState<Item[]>(generateItems(0, 12));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1500));

    const newItems = generateItems(items.length, 8);
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);

    if (items.length >= 60) {
      setHasMore(false);
    }
  }, [items.length]);

  return (
    <Box sx={{ width: 800, height: 600, overflow: 'auto' }}>
      <Typography variant="h5" sx={{ p: 3, pb: 2 }}>
        Infinite Card Grid
      </Typography>

      <InfiniteScroll
        hasMore={hasMore}
        loading={loading}
        loadMore={loadMore}
        threshold={200}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Loading more cards...</Typography>
          </Box>
        }
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 3,
            p: 3,
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={item.avatar} sx={{ mr: 2 }} />
                  <Typography variant="h6">{item.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                  ID: {item.id}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export const CardGrid: Story = {
  render: () => <CardGridComponent />,
};

const ReverseScrollComponent = () => {
  const [messages, setMessages] = useState<Item[]>(generateItems(0, 15));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 800));

    // Add older messages at the beginning
    const olderMessages = generateItems(-messages.length - 10, 10).reverse();
    setMessages((prev) => [...olderMessages, ...prev]);
    setLoading(false);

    if (messages.length >= 50) {
      setHasMore(false);
    }
  }, [messages.length]);

  return (
    <Paper sx={{ width: 500, height: 600 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">Chat History</Typography>
        <Typography variant="body2" color="text.secondary">
          Reverse infinite scroll (loads older messages at top)
        </Typography>
      </Box>

      <Box sx={{ height: 'calc(100% - 80px)', overflow: 'auto' }}>
        <InfiniteScroll
          variant="reverse"
          hasMore={hasMore}
          loading={loading}
          loadMore={loadMore}
          threshold={50}
          loader={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Loading older messages...
              </Typography>
            </Box>
          }
        >
          {messages.map((message, index) => (
            <Box
              key={message.id}
              sx={{
                p: 2,
                borderBottom: index < messages.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <Avatar src={message.avatar} sx={{ width: 32, height: 32 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {message.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {message.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: 'block' }}
                >
                  Message ID: {message.id}
                </Typography>
              </Box>
            </Box>
          ))}
        </InfiniteScroll>
      </Box>
    </Paper>
  );
};

export const ReverseScroll: Story = {
  render: () => <ReverseScrollComponent />,
};

const HorizontalScrollComponent = () => {
  const [items, setItems] = useState<Item[]>(generateItems(0, 10));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1000));

    const newItems = generateItems(items.length, 5);
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);

    if (items.length >= 40) {
      setHasMore(false);
    }
  }, [items.length]);

  return (
    <Paper sx={{ width: 600, height: 300 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">Horizontal Infinite Scroll</Typography>
        <Typography variant="body2" color="text.secondary">
          Scroll horizontally to load more items
        </Typography>
      </Box>

      <InfiniteScroll
        variant="horizontal"
        hasMore={hasMore}
        loading={loading}
        loadMore={loadMore}
        width="100%"
        threshold={100}
        loader={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              minWidth: 120,
              height: '100%',
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="caption" sx={{ mt: 1 }}>
              Loading...
            </Typography>
          </Box>
        }
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            p: 2,
            height: '100%',
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                minWidth: 200,
                maxWidth: 200,
                height: 'fit-content',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={item.avatar}
                  sx={{
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Item #{item.id + 1}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </InfiniteScroll>
    </Paper>
  );
};

export const HorizontalScroll: Story = {
  render: () => <HorizontalScrollComponent />,
};
// Required standardized story exports for validation
export const Default: Story = {
  render: () => <VerticalScrollComponent />,
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Box sx={{ minWidth: 400 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vertical (Default)
        </Typography>
        <VerticalScrollComponent />
      </Box>
      <Box sx={{ minWidth: 500 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Reverse Scroll
        </Typography>
        <ReverseScrollComponent />
      </Box>
      <Box sx={{ minWidth: 600 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Horizontal Scroll
        </Typography>
        <HorizontalScrollComponent />
      </Box>
    </Box>
  ),
  parameters: { layout: 'fullscreen' },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
      <Paper sx={{ width: 300, height: 400, overflow: 'hidden' }}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          Small (300x400)
        </Typography>
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
          <InfiniteScroll hasMore={true} loading={false} loadMore={() => {}} threshold={50}>
            {generateItems(0, 10).map((item) => (
              <ListItem key={item.id} dense>
                <ListItemAvatar>
                  <Avatar src={item.avatar} sx={{ width: 30, height: 30 }} />
                </ListItemAvatar>
                <ListItemText primary={item.name} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Paper>
      <Paper sx={{ width: 500, height: 600, overflow: 'hidden' }}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          Medium (500x600)
        </Typography>
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
          <InfiniteScroll hasMore={true} loading={false} loadMore={() => {}} threshold={100}>
            {generateItems(0, 15).map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.description} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Paper>
    </Box>
  ),
  parameters: { layout: 'fullscreen' },
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Paper sx={{ width: 350, height: 400 }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          Default State
        </Typography>
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
          <InfiniteScroll hasMore={true} loading={false} loadMore={() => {}} threshold={100}>
            {generateItems(0, 5).map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary="Ready to load more" />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Paper>
      <Paper sx={{ width: 350, height: 400 }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          Loading State
        </Typography>
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
          <InfiniteScroll hasMore={true} loading={true} loadMore={() => {}} threshold={100}>
            {generateItems(0, 5).map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary="Loading more items..." />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Paper>
      <Paper sx={{ width: 350, height: 400 }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          End State (No More Items)
        </Typography>
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
          <InfiniteScroll
            hasMore={false}
            loading={false}
            loadMore={() => {}}
            threshold={100}
            endMessage={
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  🎉 You have reached the end! No more items to load.
                </Typography>
              </Box>
            }
          >
            {generateItems(0, 8).map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary="All items loaded" />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Paper>
      <Paper sx={{ width: 350, height: 400 }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          Error State
        </Typography>
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
          <InfiniteScroll
            hasMore={true}
            loading={false}
            loadMore={() => {}}
            threshold={100}
            error={{ message: 'Failed to load more items' }}
            errorComponent={
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="error">
                  ⚠️ Error loading more items. Please try again.
                </Typography>
              </Box>
            }
          >
            {generateItems(0, 3).map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary="Error state example" />
              </ListItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Paper>
    </Box>
  ),
  parameters: { layout: 'fullscreen' },
};

export const InteractiveStates: Story = {
  render: () => <VerticalScrollComponent />,
  parameters: { layout: 'fullscreen' },
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Responsive Infinite Scroll
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '100vw',
          height: '70vh',
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <InfiniteScroll hasMore={true} loading={false} loadMore={() => {}} threshold={100}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
              },
              gap: 2,
              p: 2,
            }}
          >
            {generateItems(0, 50).map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      src={item.avatar}
                      sx={{ mr: 2, width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      lineHeight: { xs: 1.3, sm: 1.4 },
                    }}
                  >
                    {item.description.substring(0, 60)}...
                  </Typography>
                  <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                    #{item.id + 1}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </InfiniteScroll>
      </Box>
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Grid automatically adjusts: 1 column (mobile) → 2 columns (tablet) → 3+ columns (desktop)
        </Typography>
      </Box>
    </Box>
  ),
  parameters: { layout: 'fullscreen' },
};
