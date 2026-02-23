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
  title: 'Navigation/NavigationMenu/Vertical',
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

const logo = (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Home color="primary" />
    <Typography variant="h6" fontWeight="bold">
      Procurement
    </Typography>
  </Box>
);

const userProfile = (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
    <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
    <Box>
      <Typography variant="body2" fontWeight="medium">
        John Doe
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Admin
      </Typography>
    </Box>
  </Box>
);

export const VerticalDefault: Story = {
  args: {
    variant: 'vertical',
    items: basicVerticalItems,
    size: 'md',
    logo,
    endContent: userProfile,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '600px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">Main Content Area</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This is the main content area. The navigation menu is on the left.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const VerticalCollapsible: Story = {
  args: {
    variant: 'vertical',
    items: basicVerticalItems,
    size: 'md',
    collapsible: true,
    logo,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '600px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">Collapsible Menu</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Click the menu icon to collapse/expand the navigation.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const VerticalCollapsed: Story = {
  args: {
    variant: 'vertical',
    items: basicVerticalItems,
    size: 'md',
    collapsible: true,
    collapsed: true,
    logo,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '600px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">Collapsed Menu</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            The navigation is collapsed, showing only icons.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const VerticalWithDividers: Story = {
  args: {
    variant: 'vertical',
    items: [...basicVerticalItems.slice(0, 3), ...basicVerticalItems.slice(3)],
    size: 'md',
    showDividers: true,
    logo,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '600px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">With Dividers</Typography>
        </Box>
      </Box>
    ),
  ],
};

export const DeepNesting: Story = {
  args: {
    variant: 'vertical',
    items: [
      {
        id: '1',
        label: 'Dashboard',
        icon: <Dashboard />,
        href: '#',
        active: true,
      },
      {
        id: '2',
        label: 'E-commerce',
        icon: <ShoppingCart />,
        children: [
          {
            id: '2-1',
            label: 'Products',
            children: [
              { id: '2-1-1', label: 'All Products', href: '#' },
              { id: '2-1-2', label: 'Categories', href: '#' },
              { id: '2-1-3', label: 'Brands', href: '#' },
            ],
          },
          {
            id: '2-2',
            label: 'Orders',
            children: [
              { id: '2-2-1', label: 'All Orders', href: '#' },
              { id: '2-2-2', label: 'Pending', href: '#', badge: 3 },
              { id: '2-2-3', label: 'Completed', href: '#' },
            ],
          },
          { id: '2-3', label: 'Customers', href: '#' },
        ],
      },
      {
        id: '3',
        label: 'Analytics',
        icon: <Analytics />,
        children: [
          { id: '3-1', label: 'Overview', href: '#' },
          { id: '3-2', label: 'Sales Report', href: '#' },
          { id: '3-3', label: 'Traffic', href: '#' },
        ],
      },
    ],
    size: 'md',
    logo,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '600px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">Deep Nesting Example</Typography>
        </Box>
      </Box>
    ),
  ],
};

export const InfiniteLevel: Story = {
  args: {
    variant: 'vertical',
    items: [
      {
        id: '1',
        label: 'Dashboard',
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
                    label: 'Frontend Team',
                    children: [
                      { id: '2-1-1-1-1', label: 'React Developers', href: '#' },
                      { id: '2-1-1-1-2', label: 'UI/UX Designers', href: '#' },
                      { id: '2-1-1-1-3', label: 'QA Engineers', href: '#' },
                    ],
                  },
                  {
                    id: '2-1-1-2',
                    label: 'Backend Team',
                    children: [
                      { id: '2-1-1-2-1', label: 'API Developers', href: '#' },
                      { id: '2-1-1-2-2', label: 'Database Admins', href: '#' },
                      { id: '2-1-1-2-3', label: 'DevOps Engineers', href: '#' },
                    ],
                  },
                  {
                    id: '2-1-1-3',
                    label: 'Mobile Team',
                    children: [
                      { id: '2-1-1-3-1', label: 'iOS Developers', href: '#' },
                      { id: '2-1-1-3-2', label: 'Android Developers', href: '#' },
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
                        label: 'North America',
                        children: [
                          { id: '2-1-2-1-1-1', label: 'US East', href: '#', badge: 5 },
                          { id: '2-1-2-1-1-2', label: 'US West', href: '#', badge: 3 },
                          { id: '2-1-2-1-1-3', label: 'Canada', href: '#' },
                        ],
                      },
                      {
                        id: '2-1-2-1-2',
                        label: 'Europe',
                        children: [
                          { id: '2-1-2-1-2-1', label: 'UK', href: '#' },
                          { id: '2-1-2-1-2-2', label: 'Germany', href: '#' },
                          { id: '2-1-2-1-2-3', label: 'France', href: '#' },
                        ],
                      },
                      { id: '2-1-2-1-3', label: 'Asia Pacific', href: '#' },
                    ],
                  },
                  { id: '2-1-2-2', label: 'Enterprise Sales', href: '#' },
                  { id: '2-1-2-3', label: 'SMB Sales', href: '#' },
                ],
              },
              {
                id: '2-1-3',
                label: 'Support',
                children: [
                  { id: '2-1-3-1', label: 'Technical Support', href: '#' },
                  { id: '2-1-3-2', label: 'Customer Success', href: '#' },
                  { id: '2-1-3-3', label: 'Training', href: '#' },
                ],
              },
            ],
          },
          {
            id: '2-2',
            label: 'Projects',
            children: [
              {
                id: '2-2-1',
                label: 'Active Projects',
                children: [
                  { id: '2-2-1-1', label: 'Product Launch Q1', href: '#' },
                  { id: '2-2-1-2', label: 'Infrastructure Upgrade', href: '#', badge: '!' },
                  { id: '2-2-1-3', label: 'Marketing Campaign', href: '#' },
                ],
              },
              { id: '2-2-2', label: 'Completed Projects', href: '#' },
              { id: '2-2-3', label: 'On Hold', href: '#' },
            ],
          },
          { id: '2-3', label: 'Resources', href: '#' },
        ],
      },
      {
        id: '3',
        label: 'Reports',
        icon: <Report />,
        children: [
          {
            id: '3-1',
            label: 'Financial',
            children: [
              { id: '3-1-1', label: 'Revenue', href: '#' },
              { id: '3-1-2', label: 'Expenses', href: '#' },
              { id: '3-1-3', label: 'Profit & Loss', href: '#' },
            ],
          },
          {
            id: '3-2',
            label: 'Operational',
            children: [
              { id: '3-2-1', label: 'Performance Metrics', href: '#' },
              { id: '3-2-2', label: 'Resource Utilization', href: '#' },
            ],
          },
        ],
      },
      {
        id: '4',
        label: 'Settings',
        icon: <Settings />,
        href: '#',
      },
    ],
    size: 'md',
    logo,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '700px', display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h4">Infinite Level Navigation</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This example demonstrates deeply nested navigation up to 5 levels deep. The component
            handles arbitrary nesting depth with proper indentation and expand/collapse functionality.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Navigate through Organization → Departments → Engineering → Frontend Team to see
            5-level deep nesting. The component automatically handles spacing and visual hierarchy
            at any depth level.
          </Typography>
        </Box>
      </Box>
    ),
  ],
};
