import Avatar from '@mui/material/Avatar';
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

import { NavigationMenu } from '../NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu/Horizontal',
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

const horizontalItems = [
  { id: '1', label: 'Home', href: '#', active: true },
  { id: '2', label: 'Products', href: '#' },
  { id: '3', label: 'Services', href: '#' },
  { id: '4', label: 'About', href: '#' },
  { id: '5', label: 'Contact', href: '#' },
];

const horizontalItemsWithSubitems = [
  { id: '1', label: 'Home', href: '#', active: true },
  {
    id: '2',
    label: 'Products',
    href: '#',
    children: [
      { id: '2-1', label: 'Electronics', href: '#' },
      { id: '2-2', label: 'Clothing', href: '#' },
      { id: '2-3', label: 'Books', href: '#' },
      { id: '2-4', label: 'Sports & Outdoors', href: '#' },
    ],
  },
  {
    id: '3',
    label: 'Services',
    href: '#',
    children: [
      { id: '3-1', label: 'Consulting', href: '#' },
      { id: '3-2', label: 'Support', href: '#' },
      { id: '3-3', label: 'Training', href: '#' },
    ],
  },
  {
    id: '4',
    label: 'Resources',
    href: '#',
    children: [
      { id: '4-1', label: 'Documentation', href: '#' },
      { id: '4-2', label: 'Blog', href: '#' },
      { id: '4-3', label: 'Case Studies', href: '#' },
      { id: '4-4', label: 'Downloads', href: '#' },
    ],
  },
  { id: '5', label: 'Contact', href: '#' },
];

const horizontalItemsWithSubitemsAndIcons = [
  { id: '1', label: 'Dashboard', icon: <Home />, href: '#', active: true },
  {
    id: '2',
    label: 'Products',
    icon: <ShoppingCart />,
    href: '#',
    children: [
      { id: '2-1', label: 'Electronics', icon: <Inventory />, href: '#' },
      { id: '2-2', label: 'Clothing', href: '#' },
      { id: '2-3', label: 'Books', href: '#' },
      { id: '2-4', label: 'Sports & Outdoors', href: '#' },
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
      { id: '3-3', label: 'Training', href: '#' },
    ],
  },
  {
    id: '4',
    label: 'Analytics',
    icon: <Analytics />,
    href: '#',
    children: [
      { id: '4-1', label: 'Reports', icon: <Report />, href: '#' },
      { id: '4-2', label: 'Dashboard', icon: <Dashboard />, href: '#' },
      { id: '4-3', label: 'Metrics', href: '#' },
    ],
  },
  { id: '5', label: 'Settings', icon: <Settings />, href: '#' },
];

export const HorizontalDefault: Story = {
  args: {
    variant: 'horizontal',
    items: horizontalItems,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '400px' }}>
          <Typography variant="h4">Page Content</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This is the main page content below the horizontal navigation.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};


export const HorizontalWithIcons: Story = {
  args: {
    variant: 'horizontal',
    items: [
      { id: '1', label: 'Home', icon: <Home />, href: '#', active: true },
      { id: '2', label: 'Dashboard', icon: <Dashboard />, href: '#' },
      { id: '3', label: 'Orders', icon: <ShoppingCart />, href: '#', badge: 3 },
      { id: '4', label: 'Analytics', icon: <Analytics />, href: '#' },
      { id: '5', label: 'Settings', icon: <Settings />, href: '#' },
    ],
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '400px' }}>
          <Typography variant="h4">Horizontal Menu with Icons</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This navigation menu demonstrates horizontal layout with icons, badges, and active states.
            Notice how the active item shows no pointer cursor and has no hover effects.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const HorizontalIconsSmall: Story = {
  args: {
    variant: 'horizontal',
    items: [
      { id: '1', label: 'Home', icon: <Home />, href: '#', active: true },
      { id: '2', label: 'Products', icon: <Inventory />, href: '#' },
      { id: '3', label: 'Orders', icon: <ShoppingCart />, href: '#', badge: 5 },
      { id: '4', label: 'Customers', icon: <People />, href: '#' },
      { id: '5', label: 'Reports', icon: <Report />, href: '#' },
      { id: '6', label: 'Settings', icon: <Settings />, href: '#' },
    ],
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '300px' }}>
          <Typography variant="h5">Compact Horizontal Navigation</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Small size variant for compact header navigation with icons.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const HorizontalIconsLarge: Story = {
  args: {
    variant: 'horizontal',
    items: [
      { id: '1', label: 'Dashboard', icon: <Dashboard />, href: '#', active: true },
      { id: '2', label: 'Analytics', icon: <Analytics />, href: '#' },
      { id: '3', label: 'Inventory', icon: <Inventory />, href: '#' },
      { id: '4', label: 'Notifications', icon: <Notifications />, href: '#', badge: 12 },
    ],
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 4, bgcolor: 'grey.50', minHeight: '400px' }}>
          <Typography variant="h3">Large Horizontal Navigation</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Large size variant ideal for prominent main navigation with clear visual hierarchy.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const HorizontalWithSubitems: Story = {
  args: {
    variant: 'horizontal',
    items: horizontalItemsWithSubitems,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '400px' }}>
          <Typography variant="h4">Horizontal Navigation with Dropdown Subitems</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This demonstrates horizontal navigation with dropdown menus for items that have children.
            Hover over "Products", "Services", or "Resources" to see the dropdown menus appear automatically.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            The dropdowns remain open when you mouse over them, providing easy access to nested items.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const HorizontalWithSubitemsAndIcons: Story = {
  args: {
    variant: 'horizontal',
    items: horizontalItemsWithSubitemsAndIcons,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '400px' }}>
          <Typography variant="h4">Horizontal Navigation with Icons & Dropdowns</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Enhanced horizontal navigation featuring both icons and dropdown menus.
            This combines visual hierarchy with functional organization.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Icons help users quickly identify menu sections, while dropdowns provide
            organized access to related functionality.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const HorizontalInfiniteLevel: Story = {
  args: {
    variant: 'horizontal',
    items: [
      {
        id: '1',
        label: 'Home',
        icon: <Home />,
        href: '#',
        active: true,
      },
      {
        id: '2',
        label: 'Organization',
        icon: <Business />,
        children: [
          {
            id: '2-1',
            label: 'Departments',
            children: [
              {
                id: '2-1-1',
                label: 'Engineering',
                children: [
                  {
                    id: '2-1-1-1',
                    label: 'Frontend',
                    children: [
                      { id: '2-1-1-1-1', label: 'React Team', href: '#' },
                      { id: '2-1-1-1-2', label: 'Vue Team', href: '#' },
                      { id: '2-1-1-1-3', label: 'Design System', href: '#' },
                    ],
                  },
                  {
                    id: '2-1-1-2',
                    label: 'Backend',
                    children: [
                      { id: '2-1-1-2-1', label: 'API Team', href: '#' },
                      { id: '2-1-1-2-2', label: 'Database Team', href: '#' },
                      { id: '2-1-1-2-3', label: 'Infrastructure', href: '#' },
                    ],
                  },
                ],
              },
              {
                id: '2-1-2',
                label: 'Sales',
                children: [
                  {
                    id: '2-1-2-1',
                    label: 'Regions',
                    children: [
                      {
                        id: '2-1-2-1-1',
                        label: 'Americas',
                        children: [
                          { id: '2-1-2-1-1-1', label: 'North', href: '#', badge: 5 },
                          { id: '2-1-2-1-1-2', label: 'South', href: '#' },
                        ],
                      },
                      {
                        id: '2-1-2-1-2',
                        label: 'EMEA', // cSpell:ignore EMEA
                        children: [
                          { id: '2-1-2-1-2-1', label: 'Europe', href: '#' },
                          { id: '2-1-2-1-2-2', label: 'Middle East', href: '#' },
                          { id: '2-1-2-1-2-3', label: 'Africa', href: '#' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: '2-2',
            label: 'Resources',
            children: [
              { id: '2-2-1', label: 'Documentation', href: '#' },
              { id: '2-2-2', label: 'Training Materials', href: '#' },
            ],
          },
        ],
      },
      {
        id: '3',
        label: 'Products',
        icon: <ShoppingCart />,
        children: [
          {
            id: '3-1',
            label: 'Categories',
            children: [
              {
                id: '3-1-1',
                label: 'Electronics',
                children: [
                  { id: '3-1-1-1', label: 'Computers', href: '#' },
                  { id: '3-1-1-2', label: 'Phones', href: '#' },
                  { id: '3-1-1-3', label: 'Accessories', href: '#' },
                ],
              },
              {
                id: '3-1-2',
                label: 'Clothing',
                children: [
                  { id: '3-1-2-1', label: 'Men\'s', href: '#' },
                  { id: '3-1-2-2', label: 'Women\'s', href: '#' },
                ],
              },
            ],
          },
          { id: '3-2', label: 'New Arrivals', href: '#', badge: 'NEW' },
        ],
      },
      {
        id: '4',
        label: 'Analytics',
        icon: <Analytics />,
        children: [
          {
            id: '4-1',
            label: 'Reports',
            children: [
              { id: '4-1-1', label: 'Sales Report', href: '#' },
              { id: '4-1-2', label: 'Traffic Report', href: '#' },
            ],
          },
          { id: '4-2', label: 'Real-time Dashboard', href: '#' },
        ],
      },
      {
        id: '5',
        label: 'Settings',
        icon: <Settings />,
        href: '#',
      },
    ],
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '500px' }}>
          <Typography variant="h4">Horizontal Navigation with Deep Nesting</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This example demonstrates horizontal navigation with deeply nested dropdowns (up to 6
            levels). Hover over "Organization" to see the deep hierarchy.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Path example: Organization → Departments → Engineering → Frontend → React Team (5
            levels)
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Deepest path: Organization → Departments → Sales → Regions → Americas → North (6
            levels!)
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'info.main' }}>
            Note: In horizontal menus, nested children expand vertically within the dropdown using
            collapse/expand behavior for better UX.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};
export const HorizontalVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Simple Horizontal Navigation
        </Typography>
        <NavigationMenu variant="horizontal" items={horizontalItems} size="md" />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Horizontal with Dropdown Subitems
        </Typography>
        <NavigationMenu variant="horizontal" items={horizontalItemsWithSubitems} size="md" />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Horizontal with Icons & Dropdowns
        </Typography>
        <NavigationMenu variant="horizontal" items={horizontalItemsWithSubitemsAndIcons} size="md" />
      </Box>
      <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body1">
          These examples demonstrate the progression from simple horizontal navigation
          to more complex dropdown-enabled layouts. The component can handle both
          text-only and icon-enhanced menu items with nested children.
        </Typography>
      </Box>
    </Box>
  ),
};