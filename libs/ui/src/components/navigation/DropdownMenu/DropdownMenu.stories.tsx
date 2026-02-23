import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  Add,
  Check,
  Close,
  Delete,
  Download,
  Edit,
  FileCopy,
  Logout,
  MoreVert,
  Person,
  Print,
  Refresh,
  Remove,
  Save,
  Settings,
  Share,
  Upload,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';

import { Button } from '../../form/Button';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile dropdown menu component with support for icons, shortcuts, dividers, and multiple variants.',
      },
    },
  },
  tags: ['autodocs', 'component:DropdownMenu'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'minimal'],
      description: 'Visual variant of the dropdown menu',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the menu items',
    },
    closeOnItemClick: {
      control: 'boolean',
      description: 'Whether to close the menu when an item is clicked',
    },
    showIconSpace: {
      control: 'boolean',
      description: 'Whether to reserve space for icons even when items don\'t have them',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: '1', label: 'Edit', icon: <Edit fontSize="small" /> },
  { id: '2', label: 'Duplicate', icon: <FileCopy fontSize="small" /> },
  { id: '3', label: 'Share', icon: <Share fontSize="small" /> },
  { id: 'divider1', type: 'divider' as const },
  { id: '4', label: 'Delete', icon: <Delete fontSize="small" />, color: 'error' as const },
];

const itemsWithShortcuts = [
  { id: '1', label: 'Save', icon: <Save fontSize="small" />, shortcut: 'Ctrl+S' },
  { id: '2', label: 'Save As...', icon: <Save fontSize="small" />, shortcut: 'Ctrl+Shift+S' },
  { id: '3', label: 'Print', icon: <Print fontSize="small" />, shortcut: 'Ctrl+P' },
  { id: 'divider1', type: 'divider' as const },
  { id: '4', label: 'Refresh', icon: <Refresh fontSize="small" />, shortcut: 'F5' },
  { id: '5', label: 'Settings', icon: <Settings fontSize="small" />, shortcut: 'Ctrl+,' },
];

const itemsWithHeaders = [
  { id: 'header1', type: 'header' as const, label: 'File Operations' },
  { id: '1', label: 'New File', icon: <Add fontSize="small" />, shortcut: 'Ctrl+N' },
  { id: '2', label: 'Open File', icon: <Upload fontSize="small" />, shortcut: 'Ctrl+O' },
  { id: '3', label: 'Save File', icon: <Save fontSize="small" />, shortcut: 'Ctrl+S' },
  { id: 'divider1', type: 'divider' as const },
  { id: 'header2', type: 'header' as const, label: 'Edit Operations' },
  { id: '4', label: 'Cut', shortcut: 'Ctrl+X' },
  { id: '5', label: 'Copy', shortcut: 'Ctrl+C' },
  { id: '6', label: 'Paste', shortcut: 'Ctrl+V' },
];

const userMenuItems = [
  { id: '1', label: 'Profile', icon: <Person fontSize="small" /> },
  { id: '2', label: 'Settings', icon: <Settings fontSize="small" /> },
  { id: 'divider1', type: 'divider' as const },
  { id: '3', label: 'Logout', icon: <Logout fontSize="small" />, color: 'error' as const },
];

const mixedItems = [
  { id: '1', label: 'Enabled Item', icon: <Check fontSize="small" /> },
  { id: '2', label: 'Disabled Item', icon: <Close fontSize="small" />, disabled: true },
  { id: 'divider1', type: 'divider' as const },
  { id: '3', label: 'Primary Color', color: 'primary' as const },
  { id: '4', label: 'Success Color', icon: <Check fontSize="small" />, color: 'success' as const },
  { id: '5', label: 'Warning Color', color: 'warning' as const },
  { id: '6', label: 'Error Color', icon: <Delete fontSize="small" />, color: 'error' as const },
];

export const Default: Story = {
  args: {
    items: basicItems as never,
    trigger: <Button variant="outline">Open Menu</Button>,
    variant: 'default',
    size: 'md',
  },
};

export const GlassVariant: Story = {
  args: {
    items: basicItems as never,
    trigger: <Button variant="glass">Glass Menu</Button>,
    variant: 'glass',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '400px',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export const MinimalVariant: Story = {
  args: {
    items: basicItems as never,
    trigger: <Button variant="ghost">Minimal Menu</Button>,
    variant: 'minimal',
    size: 'md',
  },
};

export const WithShortcuts: Story = {
  args: {
    items: itemsWithShortcuts as never,
    trigger: <Button variant="solid">File Menu</Button>,
    variant: 'default',
    size: 'md',
  },
};

export const WithHeaders: Story = {
  args: {
    items: itemsWithHeaders as never as never,
    trigger: <Button variant="outline">Operations</Button>,
    variant: 'default',
    size: 'md',
    showIconSpace: true,
  },
};

export const SmallSize: Story = {
  args: {
    items: basicItems as never,
    trigger: (
      <Button size="sm" variant="outline">
        Small Menu
      </Button>
    ),
    variant: 'default',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    items: basicItems as never,
    trigger: (
      <Button size="lg" variant="outline">
        Large Menu
      </Button>
    ),
    variant: 'default',
    size: 'lg',
  },
};

export const UserMenu: Story = {
  args: {
    items: userMenuItems as never,
    trigger: (
      <IconButton>
        <Person />
      </IconButton>
    ),
    variant: 'glass',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
          minHeight: '300px',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export const IconTrigger: Story = {
  args: {
    items: basicItems as never,
    trigger: (
      <IconButton>
        <MoreVert />
      </IconButton>
    ),
    variant: 'default',
    size: 'md',
  },
};

export const MixedStates: Story = {
  args: {
    items: mixedItems as never,
    trigger: <Button variant="outline">Mixed Items</Button>,
    variant: 'default',
    size: 'md',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: basicItems.map((item) => ({
      ...item,
      onClick: item.type !== 'divider' ? () => void 0 : undefined,
    })) as never,
    trigger: <Button variant="solid">Interactive Menu</Button>,
    variant: 'default',
    size: 'md',
  },
};

export const NoIcons: Story = {
  args: {
    items: [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
      { id: '3', label: 'Option 3' },
      { id: 'divider1', type: 'divider' as const } as never,
      { id: '4', label: 'Option 4' },
    ],
    trigger: <Button variant="outline">No Icons</Button>,
    variant: 'default',
    size: 'md',
  },
};

export const WithIconSpace: Story = {
  args: {
    items: [
      { id: '1', label: 'Has Icon', icon: <Check fontSize="small" /> },
      { id: '2', label: 'No Icon' },
      { id: '3', label: 'Also No Icon' },
      { id: '4', label: 'Has Icon Too', icon: <Settings fontSize="small" /> },
    ],
    trigger: <Button variant="outline">Mixed Icons</Button>,
    variant: 'default',
    size: 'md',
    showIconSpace: true,
  },
};

// Glass Effect Showcase - Multiple Variants
export const GlassShowcase: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => {
    const showcaseItems = [
      { id: '1', label: 'Download', icon: <Download fontSize="small" />, shortcut: 'Ctrl+D' },
      { id: '2', label: 'Share Link', icon: <Share fontSize="small" /> },
      { id: 'divider1', type: 'divider' as const },
      { id: '3', label: 'Settings', icon: <Settings fontSize="small" /> },
      { id: '4', label: 'Remove', icon: <Remove fontSize="small" />, color: 'error' as const },
    ];

    return (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          minHeight: '500px',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
          <h2>Glass Morphism Effect Showcase</h2>
          <p>Click the buttons below to see the glass effect against this colorful background</p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <DropdownMenu
            items={showcaseItems as never}
            trigger={<Button variant="glass">Glass Menu</Button>}
            variant="glass"
            size="md"
          />
          <DropdownMenu
            items={showcaseItems as never}
            trigger={<Button variant="solid">Compare: Default</Button>}
            variant="default"
            size="md"
          />
          <DropdownMenu
            items={showcaseItems as never}
            trigger={<Button variant="outline">Compare: Minimal</Button>}
            variant="minimal"
            size="md"
          />
        </Box>
        {/* Add some background elements to enhance the glass effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: 150,
            height: 80,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(5px)',
          }}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the glass morphism effect with enhanced backdrop blur, transparency, and subtle borders against colorful backgrounds.',
      },
    },
  },
};

export const LongMenu: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i}`,
      label: `Option ${i + 1}`,
      icon: i % 3 === 0 ? <Check fontSize="small" /> : undefined,
    })),
    trigger: <Button variant="outline">Long List</Button>,
    variant: 'default',
    size: 'md',
    maxHeight: 300,
  },
};

// Dark Mode Glass Effect
export const DarkModeGlass: Story = {
  args: {
    items: [
      { id: '1', label: 'New Document', icon: <Add fontSize="small" />, shortcut: 'Ctrl+N' },
      { id: '2', label: 'Open Recent', icon: <Upload fontSize="small" /> },
      { id: 'divider1', type: 'divider' as const } as never,
      { id: '3', label: 'Export PDF', icon: <Download fontSize="small" /> },
      { id: '4', label: 'Print', icon: <Print fontSize="small" />, shortcut: 'Ctrl+P' },
    ],
    trigger: <Button variant="glass">Dark Glass Menu</Button>,
    variant: 'glass',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '400px',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.3) 0%, transparent 50%)
            `,
            borderRadius: 'inherit',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Story />
        </Box>
      </Box>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Glass effect optimized for dark themes with enhanced contrast and subtle lighting effects.',
      },
    },
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button variant="outline">Default</Button>}
        variant="default"
        size="md"
      />
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button variant="glass">Glass</Button>}
        variant="glass"
        size="md"
      />
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button variant="ghost">Minimal</Button>}
        variant="minimal"
        size="md"
      />
    </Box>
  ),
};

export const AllSizes: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button size="sm">Small</Button>}
        variant="default"
        size="sm"
      />
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button size="md">Medium</Button>}
        variant="default"
        size="md"
      />
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button size="lg">Large</Button>}
        variant="default"
        size="lg"
      />
    </Box>
  ),
};

export const AllStates: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <DropdownMenu
        items={mixedItems as never}
        trigger={<Button variant="outline">Mixed States</Button>}
        variant="default"
        size="md"
      />
    </Box>
  ),
};

export const InteractiveStates: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <DropdownMenu
        items={
          basicItems.map((item) => ({
            ...item,
            onClick: item.type !== 'divider' ? () => void 0 : undefined,
          })) as never
        }
        trigger={<Button variant="solid">Click Items</Button>}
        variant="default"
        size="md"
      />
    </Box>
  ),
};

export const Responsive: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: '100%' }}>
      <DropdownMenu
        items={basicItems as never}
        trigger={<Button variant="outline">Responsive Menu</Button>}
        variant="default"
        size="md"
      />
    </Box>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DensityModes: Story = {
  args: {
    items: [],
    trigger: <Button>Dummy</Button>,
  },
  render: () => {

    return (
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box>
            <Box sx={{ mb: 1, fontSize: '0.75rem', color: 'text.secondary' }}>Compact (0.8x)</Box>
            <DropdownMenu
              items={basicItems as never}
              trigger={<Button size="sm" variant="outline">Compact</Button>}
              variant="default"
              size="sm"
            />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Box sx={{ mb: 1, fontSize: '0.75rem', color: 'text.secondary' }}>Normal (1.0x)</Box>
            <DropdownMenu
              items={basicItems as never}
              trigger={<Button variant="outline">Normal</Button>}
              variant="default"
              size="md"
            />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Box sx={{ mb: 1, fontSize: '0.75rem', color: 'text.secondary' }}>Spacious (1.25x)</Box>
            <DropdownMenu
              items={basicItems as never}
              trigger={<Button size="lg" variant="outline">Spacious</Button>}
              variant="default"
              size="lg"
            />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
