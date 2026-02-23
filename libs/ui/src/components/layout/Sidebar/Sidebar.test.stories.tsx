import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Send as SendIcon,
  Settings as SettingsIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Sidebar, SidebarContent, SidebarFooter,SidebarHeader } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar/Tests',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: false },
    docs: {
      description: {
        component:
          'Comprehensive test suite for the Sidebar component covering interaction, accessibility, visual states, and performance.',
      },
    },
  },
  tags: ['autodocs', 'test', 'component:Sidebar'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['fixed', 'collapsible', 'floating', 'glass'],
    },
    open: {
      control: { type: 'boolean' },
    },
    width: {
      control: { type: 'number' },
    },
    collapsedWidth: {
      control: { type: 'number' },
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
};
export default meta;
export type Story = StoryObj<typeof meta>;

const navigationItems = [
  { icon: <HomeIcon />, label: 'Home', 'data-testid': 'nav-home' },
  { icon: <DashboardIcon />, label: 'Dashboard', 'data-testid': 'nav-dashboard' },
  { icon: <InboxIcon />, label: 'Inbox', 'data-testid': 'nav-inbox' },
  { icon: <StarIcon />, label: 'Favorites', 'data-testid': 'nav-favorites' },
  { icon: <SendIcon />, label: 'Sent', 'data-testid': 'nav-sent' },
];

// Basic Interaction Tests
const BasicInteractionComponent = () => {
  const [open, setOpen] = useState(true);
  const mockOnToggle = fn();

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      <Sidebar variant="fixed" open={open} onToggle={mockOnToggle} data-testid="sidebar">
        <SidebarHeader data-testid="sidebar-header">
          <Typography variant="h6">Test Sidebar</Typography>
        </SidebarHeader>

        <SidebarContent data-testid="sidebar-content">
          <List>
            {navigationItems.map((item, index) => (
              <ListItemButton key={index} data-testid={item['data-testid']}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter data-testid="sidebar-footer">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }} data-testid="user-avatar">
              U
            </Avatar>
            <Typography variant="body2">Test User</Typography>
          </Box>
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" data-testid="main-content">
          Main Content
        </Typography>
        <Button onClick={() => setOpen(!open)} data-testid="toggle-button">
          Toggle Sidebar
        </Button>
      </Box>
    </Box>
  );
};

export const BasicInteraction: Story = {
  render: () => <BasicInteractionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test basic rendering
    await expect(canvas.getByTestId('sidebar')).toBeInTheDocument();
    await expect(canvas.getByTestId('sidebar-header')).toBeInTheDocument();
    await expect(canvas.getByTestId('sidebar-content')).toBeInTheDocument();
    await expect(canvas.getByTestId('sidebar-footer')).toBeInTheDocument();
    await expect(canvas.getByTestId('main-content')).toBeInTheDocument();

    // Test navigation items are rendered
    await expect(canvas.getByTestId('nav-home')).toBeInTheDocument();
    await expect(canvas.getByTestId('nav-dashboard')).toBeInTheDocument();
    await expect(canvas.getByTestId('nav-inbox')).toBeInTheDocument();
    await expect(canvas.getByTestId('nav-favorites')).toBeInTheDocument();
    await expect(canvas.getByTestId('nav-sent')).toBeInTheDocument();

    // Test user avatar is rendered
    await expect(canvas.getByTestId('user-avatar')).toBeInTheDocument();

    // Test sidebar has expected width
    const sidebar = canvas.getByTestId('sidebar');
    const sidebarStyles = window.getComputedStyle(sidebar);
    await expect(sidebarStyles.width).toBe('280px');
  },
};

// Form Interaction Test
const FormInteractionComponent = () => {
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      <Sidebar variant="fixed" data-testid="form-sidebar">
        <SidebarHeader>
          <Typography variant="h6">Form Sidebar</Typography>
        </SidebarHeader>

        <SidebarContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>
              Selected: {selectedItem}
            </Typography>
            <List>
              {navigationItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  data-testid={`form-${item['data-testid']}`}
                  onClick={() => setSelectedItem(item.label)}
                  selected={selectedItem === item.label}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </SidebarContent>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5">Form Content</Typography>
        <Typography data-testid="selected-display">
          Current selection: {selectedItem || 'None'}
        </Typography>
      </Box>
    </Box>
  );
};

export const FormInteraction: Story = {
  render: () => <FormInteractionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially no item selected
    await expect(canvas.getByTestId('selected-display')).toHaveTextContent(
      'Current selection: None',
    );

    // Click on Home item
    await userEvent.click(canvas.getByTestId('form-nav-home'));
    await waitFor(() => {
      expect(canvas.getByTestId('selected-display')).toHaveTextContent('Current selection: Home');
    });

    // Click on Dashboard item
    await userEvent.click(canvas.getByTestId('form-nav-dashboard'));
    await waitFor(() => {
      expect(canvas.getByTestId('selected-display')).toHaveTextContent(
        'Current selection: Dashboard',
      );
    });

    // Click on Inbox item
    await userEvent.click(canvas.getByTestId('form-nav-inbox'));
    await waitFor(() => {
      expect(canvas.getByTestId('selected-display')).toHaveTextContent('Current selection: Inbox');
    });
  },
};

// Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  render: () => (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      <Sidebar variant="fixed" data-testid="keyboard-sidebar">
        <SidebarHeader>
          <Typography variant="h6">Keyboard Navigation</Typography>
        </SidebarHeader>

        <SidebarContent>
          <List>
            {navigationItems.map((item, index) => (
              <ListItemButton
                key={index}
                data-testid={`keyboard-${item['data-testid']}`}
                tabIndex={0}
                role="button"
                aria-label={`Navigate to ${item.label}`}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter>
          <Button data-testid="footer-button" tabIndex={0}>
            Settings
          </Button>
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5">Main Content</Typography>
        <Button data-testid="main-button" tabIndex={0}>
          Main Action
        </Button>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test Tab navigation through sidebar items
    const firstNavItem = canvas.getByTestId('keyboard-nav-home');
    firstNavItem.focus();
    await expect(firstNavItem).toHaveFocus();

    // Tab to next item
    await userEvent.tab();
    await expect(canvas.getByTestId('keyboard-nav-dashboard')).toHaveFocus();

    // Tab to next item
    await userEvent.tab();
    await expect(canvas.getByTestId('keyboard-nav-inbox')).toHaveFocus();

    // Tab to footer button
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByTestId('footer-button')).toHaveFocus();

    // Tab to main content
    await userEvent.tab();
    await expect(canvas.getByTestId('main-button')).toHaveFocus();

    // Test Enter key activation
    const homeItem = canvas.getByTestId('keyboard-nav-home');
    homeItem.focus();
    await userEvent.keyboard('{Enter}');
    // Verify item is still accessible after Enter
    await expect(homeItem).toBeInTheDocument();
  },
};

// Screen Reader Accessibility Test
export const ScreenReader: Story = {
  render: () => (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      <Sidebar
        variant="fixed"
        data-testid="screen-reader-sidebar"
        role="navigation"
        aria-label="Main navigation sidebar"
      >
        <SidebarHeader>
          <Typography variant="h6" role="banner">
            Screen Reader Test
          </Typography>
        </SidebarHeader>

        <SidebarContent>
          <nav role="navigation" aria-label="Primary navigation">
            <List role="menu">
              {navigationItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  data-testid={`sr-${item['data-testid']}`}
                  role="menuitem"
                  aria-label={`Navigate to ${item.label} section`}
                  tabIndex={0}
                >
                  <ListItemIcon aria-hidden="true">{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </nav>
        </SidebarContent>

        <SidebarFooter>
          <Box
            role="contentinfo"
            aria-label="User information"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32 }} aria-label="User avatar" data-testid="sr-avatar">
              U
            </Avatar>
            <Box>
              <Typography variant="body2">Screen Reader User</Typography>
              <Typography variant="caption" color="text.secondary">
                sr-user@example.com
              </Typography>
            </Box>
          </Box>
        </SidebarFooter>
      </Sidebar>

      <main role="main" aria-label="Main content area" style={{ flex: 1, padding: '24px' }}>
        <Typography variant="h5">Main Content Area</Typography>
        <Typography variant="body1">This area contains the main application content.</Typography>
      </main>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test ARIA attributes
    const sidebar = canvas.getByTestId('screen-reader-sidebar');
    await expect(sidebar).toHaveAttribute('role', 'navigation');
    await expect(sidebar).toHaveAttribute('aria-label', 'Main navigation sidebar');

    // Test navigation structure
    const navigation = canvas.getByRole('navigation', { name: 'Primary navigation' });
    await expect(navigation).toBeInTheDocument();

    const menu = canvas.getByRole('menu');
    await expect(menu).toBeInTheDocument();

    // Test menu items have proper ARIA labels
    const homeMenuItem = canvas.getByTestId('sr-nav-home');
    await expect(homeMenuItem).toHaveAttribute('role', 'menuitem');
    await expect(homeMenuItem).toHaveAttribute('aria-label', 'Navigate to Home section');

    const dashboardMenuItem = canvas.getByTestId('sr-nav-dashboard');
    await expect(dashboardMenuItem).toHaveAttribute('aria-label', 'Navigate to Dashboard section');

    // Test avatar accessibility
    const avatar = canvas.getByTestId('sr-avatar');
    await expect(avatar).toHaveAttribute('aria-label', 'User avatar');

    // Test main content area
    const main = canvas.getByRole('main');
    await expect(main).toHaveAttribute('aria-label', 'Main content area');

    // Test contentinfo role
    const userInfo = canvas.getByRole('contentinfo');
    await expect(userInfo).toHaveAttribute('aria-label', 'User information');
  },
};

// Focus Management Test
const FocusManagementComponent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      {sidebarVisible && (
        <Sidebar variant="fixed" data-testid="focus-sidebar">
          <SidebarHeader>
            <Typography variant="h6">Focus Management</Typography>
            <Button
              data-testid="hide-sidebar-button"
              onClick={() => setSidebarVisible(false)}
              size="small"
            >
              Hide Sidebar
            </Button>
          </SidebarHeader>

          <SidebarContent>
            <List>
              {navigationItems.slice(0, 3).map((item, index) => (
                <ListItemButton
                  key={index}
                  data-testid={`focus-${item['data-testid']}`}
                  tabIndex={0}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </SidebarContent>

          <SidebarFooter>
            <Button data-testid="sidebar-action" tabIndex={0}>
              Sidebar Action
            </Button>
          </SidebarFooter>
        </Sidebar>
      )}

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5">Focus Management Test</Typography>
        <Button
          data-testid="show-sidebar-button"
          onClick={() => setSidebarVisible(true)}
          style={{ display: sidebarVisible ? 'none' : 'block' }}
        >
          Show Sidebar
        </Button>
        <Button data-testid="main-focus-button" tabIndex={0}>
          Main Button
        </Button>
      </Box>
    </Box>
  );
};

export const FocusManagement: Story = {
  render: () => <FocusManagementComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial focus on first sidebar item
    const firstItem = canvas.getByTestId('focus-nav-home');
    firstItem.focus();
    await expect(firstItem).toHaveFocus();

    // Test focus moves through sidebar elements
    await userEvent.tab();
    await expect(canvas.getByTestId('focus-nav-dashboard')).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByTestId('focus-nav-inbox')).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByTestId('sidebar-action')).toHaveFocus();

    // Test focus moves to main content
    await userEvent.tab();
    await expect(canvas.getByTestId('main-focus-button')).toHaveFocus();

    // Test hiding sidebar
    const hideButton = canvas.getByTestId('hide-sidebar-button');
    await userEvent.click(hideButton);

    // Verify sidebar is hidden
    await waitFor(() => {
      expect(canvas.queryByTestId('focus-sidebar')).not.toBeInTheDocument();
    });

    // Test showing sidebar again
    const showButton = canvas.getByTestId('show-sidebar-button');
    await userEvent.click(showButton);

    // Verify sidebar is visible again
    await waitFor(() => {
      expect(canvas.getByTestId('focus-sidebar')).toBeInTheDocument();
    });
  },
};

// Responsive Design Test
export const ResponsiveDesign: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.50' }}>
      <Sidebar variant="fixed" width={280} data-testid="responsive-sidebar">
        <SidebarHeader>
          <Typography variant="h6" noWrap>
            Responsive Sidebar
          </Typography>
        </SidebarHeader>

        <SidebarContent>
          <List>
            {navigationItems.map((item, index) => (
              <ListItemButton key={index} data-testid={`resp-${item['data-testid']}`}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ noWrap: true }} />
              </ListItemButton>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter>
          <Typography variant="caption" noWrap data-testid="responsive-footer">
            Responsive Footer
          </Typography>
        </SidebarFooter>
      </Sidebar>

      <Box
        sx={{
          flex: 1,
          p: { xs: 1, sm: 2, md: 3 },
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Responsive Content
        </Typography>
        <Typography variant="body1" data-testid="responsive-content">
          This content adapts to different screen sizes. The sidebar maintains its functionality
          across all viewport sizes.
        </Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test sidebar is present
    const sidebar = canvas.getByTestId('responsive-sidebar');
    await expect(sidebar).toBeInTheDocument();

    // Test sidebar maintains structure
    await expect(canvas.getByTestId('resp-nav-home')).toBeInTheDocument();
    await expect(canvas.getByTestId('resp-nav-dashboard')).toBeInTheDocument();
    await expect(canvas.getByTestId('responsive-footer')).toBeInTheDocument();
    await expect(canvas.getByTestId('responsive-content')).toBeInTheDocument();

    // Test sidebar width
    const sidebarStyles = window.getComputedStyle(sidebar);
    await expect(sidebarStyles.width).toBe('280px');

    // Test overflow handling
    await expect(sidebarStyles.overflow).toBe('hidden');
    // Test that height is set (could be 100vh or computed pixels)
    await expect(parseInt(sidebarStyles.height) > 0).toBe(true);
  },
};

// Theme Variations Test
const ThemeVariationsComponent = () => {
  const [variant, setVariant] = useState<'fixed' | 'glass' | 'floating'>('fixed');

  const backgroundStyles =
    variant === 'glass'
      ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
      : { bgcolor: 'grey.100' };

  return (
    <Box sx={{ ...backgroundStyles, height: '500px', position: 'relative' }}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Sidebar variant={variant} data-testid="theme-sidebar">
          <SidebarHeader>
            <Typography variant="h6" sx={{ color: variant === 'glass' ? 'white' : 'inherit' }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Theme
            </Typography>
          </SidebarHeader>

          <SidebarContent>
            <List>
              {navigationItems.slice(0, 3).map((item, index) => (
                <ListItemButton
                  key={index}
                  data-testid={`theme-${item['data-testid']}`}
                  sx={{ color: variant === 'glass' ? 'white' : 'inherit' }}
                >
                  <ListItemIcon sx={{ color: variant === 'glass' ? 'white' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </SidebarContent>

          <SidebarFooter>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {(['fixed', 'glass', 'floating'] as const).map((themeVariant) => (
                <Button
                  key={themeVariant}
                  size="small"
                  variant={variant === themeVariant ? 'contained' : 'outlined'}
                  onClick={() => setVariant(themeVariant)}
                  data-testid={`theme-${themeVariant}-button`}
                  sx={{
                    color: variant === 'glass' ? 'white' : 'inherit',
                    borderColor: variant === 'glass' ? 'white' : 'inherit',
                  }}
                >
                  {themeVariant}
                </Button>
              ))}
            </Box>
          </SidebarFooter>
        </Sidebar>

        <Box sx={{ flex: 1, p: 3, color: variant === 'glass' ? 'white' : 'inherit' }}>
          <Typography variant="h5" gutterBottom data-testid="theme-title">
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
          </Typography>
          <Typography variant="body1" data-testid="theme-description">
            Current theme variant: {variant}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ThemeVariations: Story = {
  render: () => <ThemeVariationsComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial fixed theme
    await expect(canvas.getByTestId('theme-title')).toHaveTextContent('Fixed Variant');
    await expect(canvas.getByTestId('theme-description')).toHaveTextContent(
      'Current theme variant: fixed',
    );

    // Test switching to glass theme
    await userEvent.click(canvas.getByTestId('theme-glass-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('theme-title')).toHaveTextContent('Glass Variant');
      expect(canvas.getByTestId('theme-description')).toHaveTextContent(
        'Current theme variant: glass',
      );
    });

    // Test switching to floating theme
    await userEvent.click(canvas.getByTestId('theme-floating-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('theme-title')).toHaveTextContent('Floating Variant');
      expect(canvas.getByTestId('theme-description')).toHaveTextContent(
        'Current theme variant: floating',
      );
    });

    // Test switching back to fixed theme
    await userEvent.click(canvas.getByTestId('theme-fixed-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('theme-title')).toHaveTextContent('Fixed Variant');
      expect(canvas.getByTestId('theme-description')).toHaveTextContent(
        'Current theme variant: fixed',
      );
    });

    // Verify sidebar maintains structure across theme changes
    await expect(canvas.getByTestId('theme-sidebar')).toBeInTheDocument();
    await expect(canvas.getByTestId('theme-nav-home')).toBeInTheDocument();
    await expect(canvas.getByTestId('theme-nav-dashboard')).toBeInTheDocument();
    await expect(canvas.getByTestId('theme-nav-inbox')).toBeInTheDocument();
  },
};

// Visual States Test
const VisualStatesComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      <Sidebar
        variant="collapsible"
        open={!collapsed}
        width={280}
        collapsedWidth={64}
        data-testid="visual-states-sidebar"
      >
        <SidebarHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ display: collapsed ? 'none' : 'block' }}>
              Visual States
            </Typography>
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              data-testid="collapse-toggle"
              size="small"
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
        </SidebarHeader>

        <SidebarContent>
          <List>
            {navigationItems.map((item, index) => (
              <ListItemButton
                key={index}
                data-testid={`visual-${item['data-testid']}`}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '&:focus': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 40 : 56,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter>
          {!collapsed ? (
            <Typography variant="caption" data-testid="expanded-footer">
              Expanded Footer
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 24, height: 24 }} data-testid="collapsed-avatar">
                U
              </Avatar>
            </Box>
          )}
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Visual States Test
        </Typography>
        <Typography variant="body1" data-testid="collapse-status">
          Sidebar is {collapsed ? 'collapsed' : 'expanded'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Toggle the sidebar to see different visual states and transitions.
        </Typography>
      </Box>
    </Box>
  );
};

export const VisualStates: Story = {
  render: () => <VisualStatesComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial expanded state
    const sidebar = canvas.getByTestId('visual-states-sidebar');
    await expect(sidebar).toBeInTheDocument();
    await expect(canvas.getByTestId('collapse-status')).toHaveTextContent('Sidebar is expanded');
    await expect(canvas.getByTestId('expanded-footer')).toBeInTheDocument();

    // Test sidebar width when expanded
    let sidebarStyles = window.getComputedStyle(sidebar);
    await expect(sidebarStyles.width).toBe('280px');

    // Test collapsing
    const collapseToggle = canvas.getByTestId('collapse-toggle');
    await userEvent.click(collapseToggle);

    await waitFor(() => {
      expect(canvas.getByTestId('collapse-status')).toHaveTextContent('Sidebar is collapsed');
    });

    // Test sidebar width when collapsed
    await waitFor(() => {
      sidebarStyles = window.getComputedStyle(sidebar);
      expect(sidebarStyles.width).toBe('64px');
    });

    // Test collapsed avatar is visible
    await expect(canvas.getByTestId('collapsed-avatar')).toBeInTheDocument();

    // Test expanding again
    await userEvent.click(collapseToggle);

    await waitFor(() => {
      expect(canvas.getByTestId('collapse-status')).toHaveTextContent('Sidebar is expanded');
    });

    // Test navigation items are still clickable and accessible
    await expect(canvas.getByTestId('visual-nav-home')).toBeInTheDocument();
    await expect(canvas.getByTestId('visual-nav-dashboard')).toBeInTheDocument();

    // Test that navigation items remain interactive during visual state transitions
    const homeItem = canvas.getByTestId('visual-nav-home');

    // Verify item is clickable
    await userEvent.click(homeItem);

    // Verify item is still present and enabled after click
    await expect(homeItem).toBeInTheDocument();
    await expect(homeItem).toBeEnabled();
  },
};

// Performance Test
const PerformanceComponent = () => {
  const [itemCount, setItemCount] = useState(50);
  const [renderTime, setRenderTime] = useState<number>(0);

  const generateItems = (count: number) => Array.from({ length: count }, (_, index) => ({
    icon: <HomeIcon />,
    label: `Item ${index + 1}`,
    'data-testid': `perf-item-${index}`,
  }));

  const handleRender = () => {
    const start = window.performance.now();
    // Force re-render
    setItemCount((prev) => prev + 0);
    const end = window.performance.now();
    setRenderTime(end - start);
  };

  const items = generateItems(itemCount);

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50' }}>
      <Sidebar variant="fixed" data-testid="performance-sidebar">
        <SidebarHeader>
          <Typography variant="h6">Performance Test</Typography>
          <Typography variant="caption" data-testid="render-time">
            Render time: {renderTime.toFixed(2)}ms
          </Typography>
        </SidebarHeader>

        <SidebarContent>
          <List data-testid="performance-list">
            {items.map((item, index) => (
              <ListItemButton key={index} data-testid={item['data-testid']}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button size="small" onClick={() => setItemCount(25)} data-testid="perf-25-items">
              25 Items
            </Button>
            <Button size="small" onClick={() => setItemCount(50)} data-testid="perf-50-items">
              50 Items
            </Button>
            <Button size="small" onClick={() => setItemCount(100)} data-testid="perf-100-items">
              100 Items
            </Button>
            <Button size="small" onClick={handleRender} data-testid="measure-render">
              Measure
            </Button>
          </Box>
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Performance Metrics
        </Typography>
        <Typography variant="body1" data-testid="item-count">
          Current items: {itemCount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Test sidebar performance with different numbers of items.
        </Typography>
      </Box>
    </Box>
  );
};

export const Performance: Story = {
  render: () => <PerformanceComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    await expect(canvas.getByTestId('performance-sidebar')).toBeInTheDocument();
    await expect(canvas.getByTestId('item-count')).toHaveTextContent('Current items: 50');

    // Test items are rendered
    await expect(canvas.getByTestId('perf-item-0')).toBeInTheDocument();
    await expect(canvas.getByTestId('perf-item-49')).toBeInTheDocument();

    // Test performance with different item counts
    await userEvent.click(canvas.getByTestId('perf-25-items'));
    await waitFor(() => {
      expect(canvas.getByTestId('item-count')).toHaveTextContent('Current items: 25');
    });
    await expect(canvas.getByTestId('perf-item-0')).toBeInTheDocument();
    await expect(canvas.getByTestId('perf-item-24')).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('perf-100-items'));
    await waitFor(() => {
      expect(canvas.getByTestId('item-count')).toHaveTextContent('Current items: 100');
    });
    await expect(canvas.getByTestId('perf-item-0')).toBeInTheDocument();
    await expect(canvas.getByTestId('perf-item-99')).toBeInTheDocument();

    // Test render time measurement
    await userEvent.click(canvas.getByTestId('measure-render'));
    const renderTimeElement = canvas.getByTestId('render-time');
    await expect(renderTimeElement).toBeInTheDocument();

    // Verify list maintains scroll functionality
    const performanceList = canvas.getByTestId('performance-list');
    await expect(performanceList).toBeInTheDocument();
  },
};

// Edge Cases Test
const EdgeCasesComponent = () => {
  const [contentType, setContentType] = useState<'normal' | 'empty' | 'overflow' | 'special-chars'>(
    'normal',
  );

  const getContent = () => {
    switch (contentType) {
      case 'empty':
        return [];
      case 'overflow':
        return Array.from({ length: 100 }, (_, i) => ({
          icon: <HomeIcon />,
          label: `Very long navigation item name that might overflow the container ${i + 1}`,
          'data-testid': `overflow-item-${i}`,
        }));
      case 'special-chars':
        return [
          { icon: <HomeIcon />, label: '🏠 Home with Emoji', 'data-testid': 'emoji-item' },
          {
            icon: <DashboardIcon />,
            label: 'Spëçíàl Çhäracters',
            'data-testid': 'special-chars-item',
          },
          { icon: <SettingsIcon />, label: '中文字符', 'data-testid': 'chinese-item' },
          { icon: <PersonIcon />, label: 'العربية', 'data-testid': 'arabic-item' },
          { icon: <InboxIcon />, label: 'Русский', 'data-testid': 'russian-item' },
        ];
      default:
        return navigationItems;
    }
  };

  const content = getContent();

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50' }}>
      <Sidebar variant="fixed" data-testid="edge-cases-sidebar">
        <SidebarHeader>
          <Typography variant="h6" noWrap>
            Edge Cases Test
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {(['normal', 'empty', 'overflow', 'special-chars'] as const).map((type) => (
              <Button
                key={type}
                size="small"
                variant={contentType === type ? 'contained' : 'outlined'}
                onClick={() => setContentType(type)}
                data-testid={`edge-${type}-button`}
                sx={{ fontSize: '0.7rem', minWidth: 'auto' }}
              >
                {type}
              </Button>
            ))}
          </Box>
        </SidebarHeader>

        <SidebarContent data-testid="edge-cases-content">
          {content.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" data-testid="empty-state">
                No navigation items available
              </Typography>
            </Box>
          ) : (
            <List>
              {content.map((item, index) => (
                <ListItemButton key={index} data-testid={item['data-testid']}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      noWrap: contentType === 'overflow',
                      title: item.label,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </SidebarContent>

        <SidebarFooter>
          <Typography variant="caption" data-testid="content-type-display">
            Current: {contentType} ({content.length} items)
          </Typography>
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edge Cases
        </Typography>
        <Typography variant="body1" data-testid="edge-description">
          Testing sidebar with {contentType} content
        </Typography>
      </Box>
    </Box>
  );
};

export const EdgeCases: Story = {
  render: () => <EdgeCasesComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test normal state
    await expect(canvas.getByTestId('edge-cases-sidebar')).toBeInTheDocument();
    await expect(canvas.getByTestId('content-type-display')).toHaveTextContent(
      'Current: normal (5 items)',
    );
    await expect(canvas.getByTestId('edge-description')).toHaveTextContent(
      'Testing sidebar with normal content',
    );

    // Test empty state
    await userEvent.click(canvas.getByTestId('edge-empty-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('content-type-display')).toHaveTextContent(
        'Current: empty (0 items)',
      );
      expect(canvas.getByTestId('empty-state')).toHaveTextContent('No navigation items available');
    });

    // Test overflow state
    await userEvent.click(canvas.getByTestId('edge-overflow-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('content-type-display')).toHaveTextContent(
        'Current: overflow (100 items)',
      );
    });
    await expect(canvas.getByTestId('overflow-item-0')).toBeInTheDocument();
    await expect(canvas.getByTestId('overflow-item-99')).toBeInTheDocument();

    // Test special characters
    await userEvent.click(canvas.getByTestId('edge-special-chars-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('content-type-display')).toHaveTextContent(
        'Current: special-chars (5 items)',
      );
    });
    await expect(canvas.getByTestId('emoji-item')).toHaveTextContent('🏠 Home with Emoji');
    await expect(canvas.getByTestId('special-chars-item')).toHaveTextContent('Spëçíàl Çhäracters');
    await expect(canvas.getByTestId('chinese-item')).toHaveTextContent('中文字符');
    await expect(canvas.getByTestId('arabic-item')).toHaveTextContent('العربية');
    await expect(canvas.getByTestId('russian-item')).toHaveTextContent('Русский');

    // Test back to normal
    await userEvent.click(canvas.getByTestId('edge-normal-button'));
    await waitFor(() => {
      expect(canvas.getByTestId('content-type-display')).toHaveTextContent(
        'Current: normal (5 items)',
      );
    });
  },
};

// Integration Test
const IntegrationComponent = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);

  const integrationItems = [
    {
      id: 'home',
      icon: <HomeIcon />,
      label: 'Home',
      'data-testid': 'integration-home',
      badge: null,
    },
    {
      id: 'dashboard',
      icon: <DashboardIcon />,
      label: 'Dashboard',
      'data-testid': 'integration-dashboard',
      badge: null,
    },
    {
      id: 'inbox',
      icon: <InboxIcon />,
      label: 'Messages',
      'data-testid': 'integration-inbox',
      badge: notifications > 0 ? notifications : null,
    },
    {
      id: 'settings',
      icon: <SettingsIcon />,
      label: 'Settings',
      'data-testid': 'integration-settings',
      badge: null,
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50' }}>
      <Sidebar
        variant="collapsible"
        open={sidebarOpen}
        width={280}
        collapsedWidth={64}
        data-testid="integration-sidebar"
      >
        <SidebarHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ display: sidebarOpen ? 'block' : 'none' }}>
              Integration Test
            </Typography>
            <IconButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              data-testid="integration-toggle"
              size="small"
            >
              {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </SidebarHeader>

        <SidebarContent>
          <List>
            {integrationItems.map((item) => (
              <ListItemButton
                key={item.id}
                data-testid={item['data-testid']}
                selected={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: sidebarOpen ? 56 : 40,
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    {item.icon}
                    {item.badge && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: 'error.main',
                          color: 'white',
                          borderRadius: '50%',
                          width: 16,
                          height: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                        }}
                        data-testid={`badge-${item.id}`}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </Box>
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary={item.label} />}
              </ListItemButton>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>I</Avatar>
            {sidebarOpen && (
              <Box>
                <Typography variant="body2">Integration User</Typography>
                <Button
                  size="small"
                  onClick={() => setNotifications(0)}
                  data-testid="clear-notifications"
                  disabled={notifications === 0}
                >
                  Clear ({notifications})
                </Button>
              </Box>
            )}
          </Box>
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom data-testid="integration-title">
          {integrationItems.find((item) => item.id === activeSection)?.label} Section
        </Typography>
        <Typography variant="body1" data-testid="integration-content">
          Active section: {activeSection}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sidebar is {sidebarOpen ? 'expanded' : 'collapsed'}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setNotifications((prev) => prev + 1)}
          data-testid="add-notification"
          sx={{ mt: 2 }}
        >
          Add Notification
        </Button>
      </Box>
    </Box>
  );
};

export const Integration: Story = {
  render: () => <IntegrationComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    await expect(canvas.getByTestId('integration-sidebar')).toBeInTheDocument();
    await expect(canvas.getByTestId('integration-title')).toHaveTextContent('Home Section');
    await expect(canvas.getByTestId('integration-content')).toHaveTextContent(
      'Active section: home',
    );

    // Test notification badge
    await expect(canvas.getByTestId('badge-inbox')).toHaveTextContent('3');

    // Test navigation
    await userEvent.click(canvas.getByTestId('integration-dashboard'));
    await waitFor(() => {
      expect(canvas.getByTestId('integration-title')).toHaveTextContent('Dashboard Section');
      expect(canvas.getByTestId('integration-content')).toHaveTextContent(
        'Active section: dashboard',
      );
    });

    await userEvent.click(canvas.getByTestId('integration-inbox'));
    await waitFor(() => {
      expect(canvas.getByTestId('integration-title')).toHaveTextContent('Messages Section');
      expect(canvas.getByTestId('integration-content')).toHaveTextContent('Active section: inbox');
    });

    // Test adding notifications
    await userEvent.click(canvas.getByTestId('add-notification'));
    await waitFor(() => {
      expect(canvas.getByTestId('badge-inbox')).toHaveTextContent('4');
    });

    // Test clearing notifications
    await userEvent.click(canvas.getByTestId('clear-notifications'));
    await waitFor(() => {
      expect(canvas.queryByTestId('badge-inbox')).not.toBeInTheDocument();
    });

    // Test sidebar collapse
    await userEvent.click(canvas.getByTestId('integration-toggle'));
    await waitFor(() => {
      const sidebar = canvas.getByTestId('integration-sidebar');
      const sidebarStyles = window.getComputedStyle(sidebar);
      expect(sidebarStyles.width).toBe('64px');
    });

    // Test sidebar expand
    await userEvent.click(canvas.getByTestId('integration-toggle'));
    await waitFor(() => {
      const sidebar = canvas.getByTestId('integration-sidebar');
      const sidebarStyles = window.getComputedStyle(sidebar);
      expect(sidebarStyles.width).toBe('280px');
    });

    // Test settings navigation
    await userEvent.click(canvas.getByTestId('integration-settings'));
    await waitFor(() => {
      expect(canvas.getByTestId('integration-title')).toHaveTextContent('Settings Section');
      expect(canvas.getByTestId('integration-content')).toHaveTextContent(
        'Active section: settings',
      );
    });
  },
};
