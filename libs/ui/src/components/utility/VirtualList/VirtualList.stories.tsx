import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { VirtualGrid,VirtualList } from './VirtualList';
import type { VirtualListItem } from './VirtualList.types';

const meta: Meta<typeof VirtualList> = {
  title: 'Utility/VirtualList',
  component: VirtualList,
  tags: ['autodocs', 'component:VirtualList'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'High-performance virtual scrolling components for large datasets with fixed and variable height support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

// Generate sample data
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
  height: 60 + Math.floor(Math.random() * 100), // Random heights between 60-160px
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

// Required story exports for validation
export const Default: Story = {
  render: () => {
    const items = generateItems(1000);

    return (
      <Paper sx={{ width: 400, height: 400 }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={400}
          itemHeight={80}
          renderItem={({ item, style }) => (
            <Box key={item.id} style={style}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={item.data.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.data.name} secondary={item.data.description} />
              </ListItem>
            </Box>
          )}
        />
      </Paper>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const fixedItems = generateItems(1000);
    const variableItems = generateVariableItems(500);

    return (
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Paper sx={{ width: 350, height: 400 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Fixed Height</Typography>
          </Box>
          <VirtualList
            items={fixedItems}
            variant="fixed"
            height={350}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary="Fixed height item" />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 350, height: 400 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Variable Height</Typography>
          </Box>
          <VirtualList
            items={variableItems}
            variant="variable"
            height={350}
            estimatedItemHeight={80}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <ListItemAvatar>
                    <Avatar>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.data.name}
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {item.data.description}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 400, height: 400 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Grid Layout</Typography>
          </Box>
          <VirtualGrid
            items={fixedItems.slice(0, 1000)}
            height={350}
            width={400}
            columnCount={3}
            rowHeight={120}
            gap={4}
            renderItem={({ item, style }) => (
              <Box
                key={item.id}
                style={style}
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
                <Avatar src={item.data.avatar} sx={{ mb: 1 }} />
                <Typography variant="body2">{item.data.name}</Typography>
              </Box>
            )}
          />
        </Paper>
      </Box>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const items = generateItems(500);

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper sx={{ width: 250, height: 300 }}>
          <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2">Small (250x300)</Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={270}
            itemHeight={50}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem dense>
                  <ListItemAvatar>
                    <Avatar size="small">{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Item ${item.id + 1}`} />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 400, height: 400 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Medium (400x400)</Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={360}
            itemHeight={70}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary="Medium size" />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 600, height: 500 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Large (600x500)</Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={450}
            itemHeight={90}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} sx={{ width: 56, height: 56 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h6">{item.data.name}</Typography>}
                    secondary={<Typography variant="body2">{item.data.description}</Typography>}
                  />
                </ListItem>
              </Box>
            )}
          />
        </Paper>
      </Box>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const items = generateItems(50);
    const emptyItems: VirtualListItem[] = [];
    const loadingItems = Array.from({ length: 5 }, (_, i) => ({ id: i }));

    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
        <Paper sx={{ width: 300, height: 250 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Normal State</Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={200}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 300, height: 250, position: 'relative' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Empty State</Typography>
          </Box>
          <VirtualList
            items={emptyItems}
            variant="fixed"
            height={200}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemText primary="Should not render" />
                </ListItem>
              </Box>
            )}
          />
          {emptyItems.length === 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography variant="body2">No items to display</Typography>
            </Box>
          )}
        </Paper>

        <Paper sx={{ width: 300, height: 250 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Loading State</Typography>
          </Box>
          <VirtualList
            items={loadingItems}
            variant="fixed"
            height={200}
            itemHeight={50}
            renderItem={({ style }) => (
              <Box style={style} sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'grey.200',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.5 },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      height: 12,
                      bgcolor: 'grey.200',
                      borderRadius: 1,
                      width: '60%',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </Box>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 300, height: 250 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Error State</Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="error.main" gutterBottom>
              ⚠ Error
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Failed to load data
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  },
};

export const InteractiveStates: Story = {
  render: () => {
    const items = generateItems(100);

    return (
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Paper sx={{ width: 350, height: 400 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Hover Effects</Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={350}
            itemHeight={70}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      transform: 'translateX(4px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary="Hover to see effect" />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 350, height: 400, position: 'relative' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1">Disabled State</Typography>
          </Box>
          <VirtualList
            items={items.slice(0, 20)}
            variant="fixed"
            height={350}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem
                  disabled
                  sx={{
                    opacity: 0.6,
                    cursor: 'not-allowed',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ filter: 'grayscale(100%)', opacity: 0.7 }}>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: 'text.disabled' }}>{item.data.name}</Typography>
                    }
                    secondary="Disabled item"
                  />
                </ListItem>
              </Box>
            )}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 50,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(1px)',
            }}
          >
            <Typography variant="h6" color="text.disabled">
              List Disabled
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  },
};

export const Responsive: Story = {
  render: () => {
    const items = generateItems(500);

    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Paper sx={{ width: '100%', height: 300 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Responsive Width</Typography>
            <Typography variant="body2" color="text.secondary">
              Adapts to container width
            </Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={250}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={item.data.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={item.data.name} secondary="Responsive list item" />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Paper sx={{ flex: '1 1 300px', minWidth: 250, height: 250 }}>
            <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2">Mobile Size</Typography>
            </Box>
            <VirtualList
              items={items}
              variant="fixed"
              height={220}
              itemHeight={50}
              renderItem={({ item, style }) => (
                <Box key={item.id} style={style}>
                  <ListItem dense>
                    <ListItemAvatar>
                      <Avatar size="small">{item.id + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Item ${item.id + 1}`} />
                  </ListItem>
                </Box>
              )}
            />
          </Paper>

          <Paper sx={{ flex: '2 1 400px', minWidth: 350, height: 250 }}>
            <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2">Desktop Size</Typography>
            </Box>
            <VirtualList
              items={items}
              variant="fixed"
              height={220}
              itemHeight={60}
              renderItem={({ item, style }) => (
                <Box key={item.id} style={style}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{item.id + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.data.name} secondary={item.data.description} />
                  </ListItem>
                </Box>
              )}
            />
          </Paper>
        </Box>
      </Box>
    );
  },
};

export const FixedHeightList: Story = {
  render: () => {
    const items = generateItems(10000);

    return (
      <Paper sx={{ width: 400, height: 400 }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={400}
          itemHeight={80}
          renderItem={({ item, style }) => (
            <Box key={item.id} style={style}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={item.data.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.data.name} secondary={item.data.description} />
              </ListItem>
            </Box>
          )}
        />
      </Paper>
    );
  },
};

export const VariableHeightList: Story = {
  render: () => {
    const items = generateVariableItems(5000);

    return (
      <Paper sx={{ width: 400, height: 400 }}>
        <VirtualList
          items={items}
          variant="variable"
          height={400}
          estimatedItemHeight={100}
          renderItem={({ item, style }) => (
            <Box key={item.id} style={style}>
              <ListItem sx={{ alignItems: 'flex-start' }}>
                <ListItemAvatar>
                  <Avatar src={item.data.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.data.name}
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {item.data.description}
                    </Typography>
                  }
                />
              </ListItem>
            </Box>
          )}
        />
      </Paper>
    );
  },
};

export const GridLayout: Story = {
  render: () => {
    const items = generateItems(10000);

    return (
      <Paper sx={{ width: 600, height: 400 }}>
        <VirtualGrid
          items={items}
          height={400}
          width={600}
          columnCount={4}
          rowHeight={150}
          gap={8}
          renderItem={({ item, style }) => (
            <Box
              key={item.id}
              style={style}
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
          )}
        />
      </Paper>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const items = generateItems(100000); // 100k items

    return (
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Paper sx={{ width: 350, height: 500 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">100,000 Items</Typography>
            <Typography variant="body2" color="text.secondary">
              Fixed height virtual list
            </Typography>
          </Box>
          <VirtualList
            items={items}
            variant="fixed"
            height={450}
            itemHeight={60}
            renderItem={({ item, style }) => (
              <Box key={item.id} style={style}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{item.id + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Item ${item.id + 1}`}
                    secondary={`Performance test item #${item.id + 1}`}
                  />
                </ListItem>
              </Box>
            )}
          />
        </Paper>

        <Paper sx={{ width: 400, height: 500 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Grid View</Typography>
            <Typography variant="body2" color="text.secondary">
              25,000 items in grid layout
            </Typography>
          </Box>
          <VirtualGrid
            items={items.slice(0, 25000)}
            height={450}
            width={400}
            columnCount={3}
            rowHeight={120}
            gap={4}
            renderItem={({ item, style }) => (
              <Box
                key={item.id}
                style={style}
                sx={{
                  bgcolor: 'primary.light',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.contrastText',
                  fontWeight: 'bold',
                }}
              >
                #{item.id + 1}
              </Box>
            )}
          />
        </Paper>
      </Box>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    const items = generateItems(1000);

    return (
      <Paper
        sx={{
          width: 500,
          height: 400,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <VirtualList
          items={items}
          variant="fixed"
          height={400}
          itemHeight={100}
          renderItem={({ item, index, style }) => (
            <Box
              key={item.id}
              style={style}
              sx={{
                px: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar
                  src={item.data.avatar}
                  sx={{
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {item.data.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Glass morphism style • Item {index + 1}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        />
      </Paper>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const emptyItems: VirtualListItem[] = [];

    return (
      <Paper sx={{ width: 400, height: 300, position: 'relative' }}>
        <VirtualList
          items={emptyItems}
          variant="fixed"
          height={300}
          itemHeight={60}
          renderItem={({ item, style }) => (
            <Box key={item.id} style={style}>
              <ListItem>
                <ListItemText primary="This should not render" />
              </ListItem>
            </Box>
          )}
        />
        {emptyItems.length === 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="h6" gutterBottom>
              No items to display
            </Typography>
            <Typography variant="body2">The virtual list is empty</Typography>
          </Box>
        )}
      </Paper>
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    const loadingItems = Array.from({ length: 8 }, (_, i) => ({ id: i }));

    return (
      <Paper sx={{ width: 400, height: 300 }}>
        <VirtualList
          items={loadingItems}
          variant="fixed"
          height={300}
          itemHeight={60}
          renderItem={({ style }) => (
            <Box style={style} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'grey.200',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        opacity: 1,
                      },
                      '50%': {
                        opacity: 0.5,
                      },
                    },
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      height: 16,
                      bgcolor: 'grey.200',
                      borderRadius: 1,
                      mb: 1,
                      width: '70%',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <Box
                    sx={{
                      height: 12,
                      bgcolor: 'grey.200',
                      borderRadius: 1,
                      width: '50%',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        />
      </Paper>
    );
  },
};

export const HoverState: Story = {
  render: () => {
    const items = generateItems(100);

    return (
      <Paper sx={{ width: 400, height: 300 }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={300}
          itemHeight={70}
          renderItem={({ item, style }) => (
            <Box key={item.id} style={style}>
              <ListItem
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    transform: 'translateX(8px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={item.data.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.data.name} secondary="Hover to see effect" />
              </ListItem>
            </Box>
          )}
        />
      </Paper>
    );
  },
};

export const DisabledState: Story = {
  render: () => {
    const items = generateItems(50);

    return (
      <Paper sx={{ width: 400, height: 300, position: 'relative' }}>
        <VirtualList
          items={items}
          variant="fixed"
          height={300}
          itemHeight={60}
          renderItem={({ item, style }) => (
            <Box key={item.id} style={style}>
              <ListItem
                disabled
                sx={{
                  opacity: 0.6,
                  cursor: 'not-allowed',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.data.avatar}
                    sx={{
                      filter: 'grayscale(100%)',
                      opacity: 0.7,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ color: 'text.disabled' }}>{item.data.name}</Typography>
                  }
                  secondary={<Typography sx={{ color: 'text.disabled' }}>Disabled item</Typography>}
                />
              </ListItem>
            </Box>
          )}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(1px)',
          }}
        >
          <Typography variant="h6" color="text.disabled">
            List Disabled
          </Typography>
        </Box>
      </Paper>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <Paper sx={{ width: 400, height: 300 }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            borderRadius: '50%',
            bgcolor: 'error.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" color="error.main">
              ⚠
          </Typography>
        </Box>
        <Typography variant="h6" color="error.main" gutterBottom>
            Failed to Load Data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Unable to fetch virtual list items. Please try again.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
              Retry
          </button>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#1976d2',
              border: '1px solid #1976d2',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
              Cancel
          </button>
        </Box>
      </Box>
    </Paper>
  ),
};
