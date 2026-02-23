import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentCopy, Edit, Folder, Star } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DensityProvider } from '../../../utils/density';
import { ContextMenu } from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A right-click context menu component with multiple variants and customization options. Right-click on the trigger elements to see the menu.',
      },
    },
  },
  tags: ['autodocs', 'component:ContextMenu'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'dark'],
      description: 'The visual variant of the context menu',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the menu items',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the context menu is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicMenuItems = [
  {
    id: 'copy',
    label: 'Copy',
    icon: <ContentCopy />,
    shortcut: 'Ctrl+C',
    action: () => {
      /** do nothing */
    },
  },
];

const advancedMenuItems = [
  {
    id: 'header1',
    type: 'header' as const,
    label: 'Edit Actions',
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <Edit />,
    shortcut: 'F2',
    color: 'primary' as const,
    action: () => {
      /** do nothing */
    },
  },
];

const fileMenuItems = [
  {
    id: 'open',
    label: 'Open',
    icon: <Folder />,
    shortcut: 'Enter',
    action: () => {
      /** do nothing */
    },
  },
];

export const Default: Story = {
  args: {
    items: basicMenuItems,
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="body2" color="text.secondary">
          Right-click here to open context menu
        </Typography>
      </ContextMenu>
    </Box>
  ),
};

export const GlassVariant: Story = {
  args: {
    items: basicMenuItems,
    variant: 'glass',
    size: 'md',
  },
  render: (args) => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="body2" color="white" textAlign="center">
          Right-click for glassmorphism menu
        </Typography>
      </ContextMenu>
    </Box>
  ),
};

export const DarkVariant: Story = {
  args: {
    items: basicMenuItems,
    variant: 'dark',
    size: 'md',
  },
  render: (args) => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="body2" color="text.secondary">
          Right-click for dark theme menu
        </Typography>
      </ContextMenu>
    </Box>
  ),
};

export const SmallSize: Story = {
  args: {
    items: basicMenuItems,
    variant: 'default',
    size: 'sm',
  },
  render: (args) => (
    <Box
      sx={{
        width: 250,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="caption" color="text.secondary">
          Small context menu
        </Typography>
      </ContextMenu>
    </Box>
  ),
};

export const LargeSize: Story = {
  args: {
    items: basicMenuItems,
    variant: 'default',
    size: 'lg',
  },
  render: (args) => (
    <Box
      sx={{
        width: 350,
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="h6" color="primary">
          Large context menu
        </Typography>
      </ContextMenu>
    </Box>
  ),
};

export const AdvancedMenu: Story = {
  args: {
    items: advancedMenuItems,
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Paper
      elevation={2}
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="body1" color="text.primary" textAlign="center">
          Advanced menu with headers,
          <br />
          colored items, and sections
        </Typography>
      </ContextMenu>
    </Paper>
  ),
};

export const FileContextMenu: Story = {
  args: {
    items: fileMenuItems,
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {[1, 2, 3, 4].map((item) => (
        <Card key={item} sx={{ width: 120, height: 140 }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              height: '100%',
            }}
          >
            <ContextMenu {...args}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'context-menu',
                  width: '100%',
                  height: '100%',
                  padding: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Folder sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="caption" textAlign="center">
                  File {item}
                </Typography>
              </Box>
            </ContextMenu>
          </CardContent>
        </Card>
      ))}
    </Box>
  ),
};

export const WithCustomTrigger: Story = {
  args: {
    items: [
      {
        id: 'star',
        label: 'Add to favorites',
        icon: <Star />,
        color: 'warning' as const,
        action: () => {
          /** do nothing */
        },
      },
    ],
  },
};

export const DisabledMenu: Story = {
  args: {
    items: basicMenuItems,
    variant: 'default',
    size: 'md',
    disabled: true,
  },
  render: (args) => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'action.disabled',
        borderRadius: 2,
        backgroundColor: 'action.disabledBackground',
        opacity: 0.6,
      }}
    >
      <ContextMenu {...args}>
        <Typography variant="body2" color="text.disabled">
          Context menu disabled
        </Typography>
      </ContextMenu>
    </Box>
  ),
};

export const MultipleMenus: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ContextMenu items={basicMenuItems} variant="default" size="sm">
          <Paper
            elevation={1}
            sx={{
              width: 150,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
            }}
          >
            <Typography variant="caption">Default Menu</Typography>
          </Paper>
        </ContextMenu>

        <ContextMenu items={advancedMenuItems} variant="glass" size="md">
          <Paper
            elevation={1}
            sx={{
              width: 150,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Typography variant="caption">Glass Menu</Typography>
          </Paper>
        </ContextMenu>

        <ContextMenu items={fileMenuItems} variant="dark" size="lg">
          <Paper
            elevation={1}
            sx={{
              width: 150,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="caption">Dark Menu</Typography>
          </Paper>
        </ContextMenu>
      </Box>
      <Typography variant="caption" color="text.secondary" textAlign="center">
        Right-click on any of the above cards to see different menu variants
      </Typography>
    </Box>
  ),
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant="h6">All Variants</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {(['default', 'glass', 'dark'] as const).map((variant) => (
          <ContextMenu key={variant} items={basicMenuItems} variant={variant} size="md">
            <Paper
              elevation={1}
              sx={{
                width: 120,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'context-menu',
                ...(variant === 'glass' && {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }),
                ...(variant === 'dark' && {
                  backgroundColor: 'grey.100',
                }),
              }}
            >
              <Typography variant="caption">{variant}</Typography>
            </Paper>
          </ContextMenu>
        ))}
      </Box>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant="h6">All Sizes</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <ContextMenu key={size} items={basicMenuItems} variant="default" size={size}>
            <Paper
              elevation={1}
              sx={{
                width: size === 'sm' ? 80 : size === 'md' ? 120 : 160,
                height: size === 'sm' ? 60 : size === 'md' ? 80 : 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'context-menu',
              }}
            >
              <Typography variant="caption">{size}</Typography>
            </Paper>
          </ContextMenu>
        ))}
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant="h6">All States</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ContextMenu items={basicMenuItems} variant="default" size="md" disabled={false}>
          <Paper
            elevation={1}
            sx={{
              width: 120,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
            }}
          >
            <Typography variant="caption">Enabled</Typography>
          </Paper>
        </ContextMenu>
        <ContextMenu items={basicMenuItems} variant="default" size="md" disabled={true}>
          <Paper
            elevation={1}
            sx={{
              width: 120,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'not-allowed',
              backgroundColor: 'action.disabledBackground',
              opacity: 0.6,
            }}
          >
            <Typography variant="caption" color="text.disabled">
              Disabled
            </Typography>
          </Paper>
        </ContextMenu>
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant="h6">Interactive States</Typography>
      <Typography variant="caption" color="text.secondary">
        Right-click to see hover and focus states
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ContextMenu items={basicMenuItems} variant="default" size="md">
          <Paper
            elevation={1}
            sx={{
              width: 120,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
              transition: 'all 0.2s',
              '&:hover': {
                elevation: 2,
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Typography variant="caption">Hover Me</Typography>
          </Paper>
        </ContextMenu>
        <ContextMenu items={advancedMenuItems} variant="glass" size="md">
          <Paper
            elevation={1}
            sx={{
              width: 120,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Typography variant="caption">Focus Me</Typography>
          </Paper>
        </ContextMenu>
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant="h6">Responsive Design</Typography>
      <Typography variant="caption" color="text.secondary">
        Context menu adapts to different screen sizes
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ContextMenu key={item} items={basicMenuItems} variant="default" size="md">
            <Paper
              elevation={1}
              sx={{
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'context-menu',
              }}
            >
              <Typography variant="caption">Item {item}</Typography>
            </Paper>
          </ContextMenu>
        ))}
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <ContextMenu items={basicMenuItems}>
            <Paper
              sx={{
                p: 2,
                cursor: 'context-menu',
                bgcolor: 'grey.100',
              }}
            >
              <Typography variant="body2">Right-click me</Typography>
            </Paper>
          </ContextMenu>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <ContextMenu items={basicMenuItems}>
            <Paper
              sx={{
                p: 2,
                cursor: 'context-menu',
                bgcolor: 'grey.100',
              }}
            >
              <Typography variant="body2">Right-click me</Typography>
            </Paper>
          </ContextMenu>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <ContextMenu items={basicMenuItems}>
            <Paper
              sx={{
                p: 2,
                cursor: 'context-menu',
                bgcolor: 'grey.100',
              }}
            >
              <Typography variant="body2">Right-click me</Typography>
            </Paper>
          </ContextMenu>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
