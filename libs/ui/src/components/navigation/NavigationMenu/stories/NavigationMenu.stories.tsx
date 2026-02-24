import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  AccountBalance,
  Analytics,
  Business,
  Category,
  Dashboard,
  Help,
  Home,
  Inventory,
  LocalShipping,
  Notifications,
  People,
  Receipt,
  Report,
  Settings,
  ShoppingCart,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../../utils/density';

import { NavigationMenu } from '../NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible navigation menu component supporting horizontal, vertical, and mega menu layouts with nested items and customization options.',
      },
    },
  },
  tags: ['autodocs', 'component:NavigationMenu'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'mega'],
      description: 'Layout variant of the navigation menu',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the menu items',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Color scheme for the menu',
    },
    minimal: {
      control: 'boolean',
      description: 'Minimal style with no borders, shadows, or container backgrounds',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the vertical menu can be collapsed',
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the vertical menu is collapsed',
    },
    showDividers: {
      control: 'boolean',
      description: 'Whether to show dividers between menu sections',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicVerticalItems = [
  {
    id: '1',
    label: 'Dashboard',
    icon: <Dashboard />,
    href: '#',
    active: true,
  },
  {
    id: '2',
    label: 'Orders',
    icon: <ShoppingCart />,
    href: '#',
    badge: 5,
  },
  {
    id: '3',
    label: 'Customers',
    icon: <People />,
    href: '#',
  },
  {
    id: '4',
    label: 'Inventory',
    icon: <Inventory />,
    href: '#',
    children: [
      { id: '4-1', label: 'All Items', href: '#' },
      { id: '4-2', label: 'Categories', href: '#' },
      { id: '4-3', label: 'Suppliers', href: '#' },
    ],
  },
  {
    id: '5',
    label: 'Reports',
    icon: <Analytics />,
    href: '#',
  },
  {
    id: '6',
    label: 'Settings',
    icon: <Settings />,
    href: '#',
  },
];

const horizontalItems = [
  { id: '1', label: 'Home', href: '#', active: true },
  { id: '2', label: 'Products', href: '#' },
  { id: '3', label: 'Services', href: '#' },
  { id: '4', label: 'About', href: '#' },
  { id: '5', label: 'Contact', href: '#' },
];

const megaMenuItems = [
  {
    id: 'operations',
    label: 'Operations',
    children: [
      { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, href: '#' },
      { id: 'orders', label: 'Orders', icon: <ShoppingCart />, href: '#' },
      { id: 'shipping', label: 'Shipping', icon: <LocalShipping />, href: '#' },
      { id: 'invoices', label: 'Invoices', icon: <Receipt />, href: '#' },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    children: [
      { id: 'inventory', label: 'Inventory', icon: <Inventory />, href: '#' },
      { id: 'customers', label: 'Customers', icon: <People />, href: '#' },
      { id: 'suppliers', label: 'Suppliers', icon: <Business />, href: '#' },
      { id: 'categories', label: 'Categories', icon: <Category />, href: '#' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    children: [
      { id: 'analytics', label: 'Analytics', icon: <Analytics />, href: '#' },
      { id: 'reports', label: 'Reports', icon: <Report />, href: '#' },
      { id: 'finance', label: 'Finance', icon: <AccountBalance />, href: '#' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    children: [
      { id: 'settings', label: 'Settings', icon: <Settings />, href: '#' },
      { id: 'help', label: 'Help & Support', icon: <Help />, href: '#' },
      { id: 'notifications', label: 'Notifications', icon: <Notifications />, href: '#' },
    ],
  },
];

const logo = (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Home color="primary" />
    <Typography variant="h6" fontWeight="bold">
      Procurement
    </Typography>
  </Box>
);

// Required default story export
export const Default: Story = {
  args: {
    variant: 'vertical',
    items: basicVerticalItems,
    size: 'md',
  },
};

// Required AllVariants story export
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vertical Variant
        </Typography>
        <Box sx={{ height: 300, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <NavigationMenu variant="vertical" items={basicVerticalItems} logo={logo} />
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Horizontal Variant
        </Typography>
        <NavigationMenu variant="horizontal" items={horizontalItems} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Mega Menu Variant
        </Typography>
        <NavigationMenu variant="mega" items={megaMenuItems} logo={logo} />
      </Box>
    </Box>
  ),
};

// Required AllSizes story export
export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Small
        </Typography>
        <Box sx={{ height: 400, width: 250, border: '1px solid', borderColor: 'divider' }}>
          <NavigationMenu variant="vertical" items={basicVerticalItems} size="sm" />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Medium
        </Typography>
        <Box sx={{ height: 400, width: 280, border: '1px solid', borderColor: 'divider' }}>
          <NavigationMenu variant="vertical" items={basicVerticalItems} size="md" />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Large
        </Typography>
        <Box sx={{ height: 400, width: 320, border: '1px solid', borderColor: 'divider' }}>
          <NavigationMenu variant="vertical" items={basicVerticalItems} size="lg" />
        </Box>
      </Box>
    </Box>
  ),
};

// Required AllStates story export
export const AllStates: Story = {
  render: () => {
    const stateItems = [
      { id: '1', label: 'Active Item', icon: <Dashboard />, active: true, href: '#' },
      { id: '2', label: 'Normal Item', icon: <ShoppingCart />, href: '#' },
      { id: '3', label: 'Disabled Item', icon: <People />, disabled: true, href: '#' },
      { id: '4', label: 'Item with Badge', icon: <Notifications />, badge: 5, href: '#' },
      {
        id: '5',
        label: 'Item with Description',
        icon: <Settings />,
        description: 'Additional info',
        href: '#',
      },
    ];

    return (
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Vertical States
          </Typography>
          <Box sx={{ height: 400, width: 280, border: '1px solid', borderColor: 'divider' }}>
            <NavigationMenu variant="vertical" items={stateItems} />
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Collapsed State
          </Typography>
          <Box sx={{ height: 400, border: '1px solid', borderColor: 'divider' }}>
            <NavigationMenu
              variant="vertical"
              items={stateItems}
              collapsed={true}
              collapsible={true}
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

// Required InteractiveStates story export
export const InteractiveStates: Story = {
  args: {
    variant: 'vertical',
    items: [
      { id: '1', label: 'Hover Me', icon: <Dashboard />, href: '#' },
      { id: '2', label: 'Focus Me', icon: <ShoppingCart />, href: '#' },
      { id: '3', label: 'Active', icon: <People />, active: true, href: '#' },
      { id: '4', label: 'Disabled', icon: <Settings />, disabled: true, href: '#' },
    ],
    size: 'md',
  },
  parameters: {
    pseudo: {
      hover: ['[role="button"]:nth-of-type(1)'],
      focus: ['[role="button"]:nth-of-type(2)'],
    },
  },
};

// Required Responsive story export
export const Responsive: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Responsive Navigation
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <NavigationMenu variant="horizontal" items={horizontalItems} size="sm" />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <NavigationMenu variant="vertical" items={basicVerticalItems} size="md" logo={logo} />
        </Box>
        <Box sx={{ flex: 1, p: 2, bgcolor: 'grey.50', minHeight: 200 }}>
          <Typography variant="body1">
            Content Area (resize viewport to see responsive behavior)
          </Typography>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const MegaMenu: Story = {
  args: {
    variant: 'mega',
    items: megaMenuItems,
    size: 'md',
    logo,
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '300px' }}>
          <Typography variant="h4">Content Below Mega Menu</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            The mega menu organizes navigation items into logical sections.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const MinimalHorizontal: Story = {
  args: {
    variant: 'horizontal',
    items: [
      { id: '1', label: 'Dashboard', icon: <Home />, href: '#', active: true },
      {
        id: '2',
        label: 'Products',
        icon: <ShoppingCart />,
        href: '#',
        children: [
          { id: '2-1', label: 'Electronics', icon: <Inventory />, href: '#' },
          { id: '2-2', label: 'Clothing', href: '#' },
        ],
      },
      {
        id: '3',
        label: 'Services',
        icon: <Business />,
        href: '#',
        children: [
          { id: '3-1', label: 'Consulting', icon: <Help />, href: '#' },
          { id: '3-2', label: 'Support', icon: <People />, href: '#' },
        ],
      },
      { id: '4', label: 'Analytics', icon: <Analytics />, href: '#' },
      { id: '5', label: 'Settings', icon: <Settings />, href: '#' },
    ],
    size: 'md',
    minimal: true,
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '400px' }}>
          <Typography variant="h4">Minimal Horizontal Navigation</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This demonstrates the horizontal navigation with the minimal prop enabled, removing all
            decorative borders, shadows, and background styling while maintaining full functionality.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Ideal for clean, text-focused navigation bars where you want minimal visual weight.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const MinimalVertical: Story = {
  args: {
    variant: 'vertical',
    items: basicVerticalItems,
    size: 'md',
    minimal: true,
    logo,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '600px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">Minimal Vertical Navigation</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Vertical navigation with minimal styling - no decorative backgrounds, borders, or shadows.
            Perfect for sidebar navigation where you want a clean, unobtrusive appearance.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const MinimalMega: Story = {
  args: {
    variant: 'mega',
    items: megaMenuItems,
    size: 'md',
    minimal: true,
    logo,
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '300px' }}>
          <Typography variant="h4">Minimal Mega Menu</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Mega menu layout with minimal prop - removes container backgrounds and decorative styling
            while maintaining the structured grid layout.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const MinimalComparison: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Default Horizontal (with styling)
        </Typography>
        <NavigationMenu
          variant="horizontal"
          items={[
            { id: '1', label: 'Home', icon: <Home />, href: '#', active: true },
            { id: '2', label: 'Products', icon: <ShoppingCart />, href: '#' },
            { id: '3', label: 'Analytics', icon: <Analytics />, href: '#' },
            { id: '4', label: 'Settings', icon: <Settings />, href: '#' },
          ]}
          size="md"
        />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Minimal Horizontal (no decorative styling)
        </Typography>
        <NavigationMenu
          variant="horizontal"
          items={[
            { id: '1', label: 'Home', icon: <Home />, href: '#', active: true },
            { id: '2', label: 'Products', icon: <ShoppingCart />, href: '#' },
            { id: '3', label: 'Analytics', icon: <Analytics />, href: '#' },
            { id: '4', label: 'Settings', icon: <Settings />, href: '#' },
          ]}
          size="md"
          minimal
        />
      </Box>
      <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body1">
          The minimal prop removes all decorative backgrounds, borders, and shadows from the
          navigation container while maintaining full interactive functionality. It's perfect for
          scenarios where you want clean, text-focused navigation without visual weight.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Compare the visual difference between the two menus above - the minimal version has no
          container background or shadow, creating a lighter appearance.
        </Typography>
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {
    const simpleItems = [
      { id: '1', label: 'Dashboard', icon: <Dashboard />, href: '#', active: true },
      { id: '2', label: 'Orders', icon: <ShoppingCart />, href: '#', badge: 5 },
      { id: '3', label: 'Customers', icon: <People />, href: '#' },
      { id: '4', label: 'Settings', icon: <Settings />, href: '#' },
    ];

    return (
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Box sx={{ height: 300, width: 220, border: '1px solid', borderColor: 'divider' }}>
              <NavigationMenu variant="vertical" items={simpleItems} size="sm" />
            </Box>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Box sx={{ height: 300, width: 240, border: '1px solid', borderColor: 'divider' }}>
              <NavigationMenu variant="vertical" items={simpleItems} size="md" />
            </Box>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Box sx={{ height: 350, width: 280, border: '1px solid', borderColor: 'divider' }}>
              <NavigationMenu variant="vertical" items={simpleItems} size="lg" />
            </Box>
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
