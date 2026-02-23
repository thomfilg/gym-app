import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Dashboard,Home, Menu as MenuIcon, Person, Settings } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Drawer, DrawerContent,DrawerHeader } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer/Tests',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Drawer'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction',
  render: () => {
    const BasicInteractionComponent = () => {
      const [open, setOpen] = useState(false);
      const [interactionState, setInteractionState] = useState('closed');
      const handleOpen = fn(() => {
        setOpen(true);
        setInteractionState('opened');
      });
      const handleClose = fn(() => {
        setOpen(false);
        setInteractionState('closed');
      });

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Button
            data-testid="open-drawer-button"
            onClick={handleOpen}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
          >
            Open Drawer
          </Button>
          <Typography data-testid="interaction-state" sx={{ position: 'fixed', top: 60, left: 16 }}>
            State: {interactionState}
          </Typography>
          <Drawer open={open} onClose={handleClose} data-testid="drawer">
            <DrawerHeader onClose={handleClose}>
              <Typography variant="h6">Test Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <List>
                <ListItemButton data-testid="nav-item-home">
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton data-testid="nav-item-settings">
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <BasicInteractionComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test drawer opens
    const openButton = canvas.getByTestId('open-drawer-button');
    expect(openButton).toBeInTheDocument();

    // Verify initial state
    const stateIndicator = canvas.getByTestId('interaction-state');
    expect(stateIndicator).toHaveTextContent('State: closed');

    await userEvent.click(openButton);

    // Verify state change after opening
    await waitFor(() => {
      expect(stateIndicator).toHaveTextContent('State: opened');
    });

    // Test that MUI backdrop is rendered (drawer is open)
    await waitFor(() => {
      const backdrop = document.querySelector('.MuiBackdrop-root');
      expect(backdrop).toBeInTheDocument();
    });

    // Test ESC key closes drawer
    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(stateIndicator).toHaveTextContent('State: closed');
    });
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation',
  render: () => {
    const KeyboardNavigationComponent = () => {
      const [open, setOpen] = useState(false);
      const [keyboardState, setKeyboardState] = useState('ready');
      const handleOpen = fn(() => setOpen(true));
      const handleClose = fn(() => {
        setOpen(false);
        setKeyboardState('closed-by-escape');
      });

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Button
            data-testid="kbd-open-button"
            onClick={handleOpen}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
          >
            Open for Keyboard Test
          </Button>
          <Typography data-testid="keyboard-state" sx={{ position: 'fixed', top: 60, left: 16 }}>
            Keyboard State: {keyboardState}
          </Typography>
          <Drawer open={open} onClose={handleClose} data-testid="keyboard-drawer">
            <DrawerHeader onClose={handleClose}>
              <Typography variant="h6">Keyboard Navigation</Typography>
            </DrawerHeader>
            <DrawerContent>
              <List>
                <ListItemButton data-testid="kbd-nav-home">
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton data-testid="kbd-nav-dashboard">
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton data-testid="kbd-nav-settings">
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton data-testid="kbd-nav-profile">
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <KeyboardNavigationComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test opening drawer
    const openButton = canvas.getByTestId('kbd-open-button');
    expect(openButton).toBeInTheDocument();

    await userEvent.click(openButton);

    // Test that backdrop appears (drawer is open)
    await waitFor(() => {
      const backdrop = document.querySelector('.MuiBackdrop-root');
      expect(backdrop).toBeInTheDocument();
    });

    // Test Escape key closes drawer
    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      const stateIndicator = canvas.getByTestId('keyboard-state');
      expect(stateIndicator).toHaveTextContent('Keyboard State: closed-by-escape');
    });

    // Verify drawer is closed (no backdrop)
    await waitFor(() => {
      const backdrop = document.querySelector('.MuiBackdrop-root');
      expect(backdrop).not.toBeInTheDocument();
    });
  },
};

// Screen Reader Accessibility Tests
export const ScreenReader: Story = {
  name: '🔊 Screen Reader',
  render: () => {
    const ScreenReaderComponent = () => {
      const [open, setOpen] = useState(true);

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            data-testid="sr-drawer"
            aria-labelledby="drawer-title"
            role="navigation"
          >
            <DrawerHeader onClose={() => setOpen(false)}>
              <Typography id="drawer-title" variant="h6">
                Main Navigation
              </Typography>
            </DrawerHeader>
            <DrawerContent>
              <List role="menu" aria-labelledby="drawer-title">
                <ListItemButton role="menuitem" data-testid="sr-nav-home">
                  <ListItemIcon aria-hidden="true">
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton role="menuitem" data-testid="sr-nav-dashboard">
                  <ListItemIcon aria-hidden="true">
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton role="menuitem" data-testid="sr-nav-settings">
                  <ListItemIcon aria-hidden="true">
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <ScreenReaderComponent />;
  },
  play: async () => {
    // Wait for drawer to be rendered (check for backdrop first, then content)
    await waitFor(
      () => {
        const backdrop = document.querySelector('.MuiBackdrop-root');
        expect(backdrop).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    await waitFor(
      () => {
        const title = document.querySelector('h6');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Main Navigation');
      },
      { timeout: 5000 },
    );

    // Test ARIA attributes on the drawer (look in document since MUI renders in portal)
    const drawer = document.querySelector('[data-testid="sr-drawer"]');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('role', 'navigation');
    expect(drawer).toHaveAttribute('aria-labelledby', 'drawer-title');

    // Test drawer title
    const title = document.querySelector('#drawer-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Main Navigation');

    // Test navigation list
    const navList = document.querySelector('[role="menu"]');
    expect(navList).toBeInTheDocument();
    expect(navList).toHaveAttribute('aria-labelledby', 'drawer-title');

    // Test menu items
    const menuItems = document.querySelectorAll('[role="menuitem"]');
    expect(menuItems).toHaveLength(3);

    // Test icons are hidden from screen readers
    const icons = document.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);

    // Test close button accessibility
    const closeButton = document.querySelector('button[aria-label*="close" i]');
    expect(closeButton).toBeInTheDocument();
  },
};

// Focus Management Tests
export const FocusManagement: Story = {
  name: '🎯 Focus Management',
  render: () => {
    const FocusManagementComponent = () => {
      const [open, setOpen] = useState(false);

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Button
            data-testid="focus-open-button"
            onClick={() => setOpen(true)}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
          >
            Open Drawer
          </Button>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            data-testid="focus-drawer"
            keepMounted={false}
          >
            <DrawerHeader onClose={() => setOpen(false)}>
              <Typography variant="h6">Focus Test</Typography>
            </DrawerHeader>
            <DrawerContent>
              <List>
                <ListItemButton data-testid="focus-first-item">
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="First Item" />
                </ListItemButton>
                <ListItemButton data-testid="focus-second-item">
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Second Item" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>
          <Box sx={{ p: 3, pt: 10 }}>
            <Button data-testid="focus-main-button">Main Content Button</Button>
          </Box>
        </Box>
      );
    };

    return <FocusManagementComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial focus on main content
    const mainButton = canvas.getByTestId('focus-main-button');
    const openButton = canvas.getByTestId('focus-open-button');

    // Focus should be manageable on main content
    mainButton.focus();
    expect(document.activeElement).toBe(mainButton);

    // Open drawer
    await userEvent.click(openButton);

    await waitFor(() => {
      const drawerContent = document.querySelector('h6');
      expect(drawerContent).toBeInTheDocument();
      expect(drawerContent).toHaveTextContent('Focus Test');
    });

    // Test focus trap within drawer
    const firstItem = document.querySelector('[data-testid="focus-first-item"]');
    const secondItem = document.querySelector('[data-testid="focus-second-item"]');
    const closeButton = document.querySelector('button[aria-label*="close" i]');

    // Tab through drawer elements
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    firstItem.focus();
    expect(document.activeElement).toBe(firstItem);

    await userEvent.tab();
    expect(document.activeElement).toBe(secondItem);

    await userEvent.tab();
    expect(document.activeElement).toBe(closeButton);

    // Close drawer and verify focus returns
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(document.querySelector('h6')).not.toBeInTheDocument();
    });
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design',
  render: () => {
    const ResponsiveComponent = () => {
      const [open, setOpen] = useState(true);

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            data-testid="responsive-drawer"
            width={280}
          >
            <DrawerHeader onClose={() => setOpen(false)}>
              <Typography variant="h6">Responsive Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2" sx={{ p: 2 }}>
                This drawer should adapt to different screen sizes.
              </Typography>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <ResponsiveComponent />;
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
    },
  },
  play: async () => {
    // Wait for drawer to be rendered
    await waitFor(
      () => {
        const backdrop = document.querySelector('.MuiBackdrop-root');
        expect(backdrop).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Test drawer renders properly (look in document since MUI renders in portal)
    const drawer = document.querySelector('[data-testid="responsive-drawer"]');
    expect(drawer).toBeInTheDocument();
    const drawerPaper = drawer.querySelector('.MuiDrawer-paper');
    expect(drawerPaper).toBeInTheDocument();

    // Test drawer content is accessible (look in document since it's in portal)
    await waitFor(() => {
      const title = document.querySelector('h6');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Responsive Drawer');
    });

    const description = Array.from(document.querySelectorAll('*')).find((el) =>
      el.textContent?.includes('This drawer should adapt to different screen sizes'),
    );
    expect(description).toBeInTheDocument();

    // Test navigation items are present
    const homeItem = Array.from(document.querySelectorAll('*')).find(
      (el) => el.textContent === 'Home',
    );
    const settingsItem = Array.from(document.querySelectorAll('*')).find(
      (el) => el.textContent === 'Settings',
    );

    expect(homeItem).toBeInTheDocument();
    expect(settingsItem).toBeInTheDocument();
  },
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  name: '🎨 Theme Variations',
  render: () => {
    const ThemeVariationsComponent = () => {
      const [openDrawers, setOpenDrawers] = useState({
        default: true,
        glass: false,
      });

      const toggleDrawer = (type: keyof typeof openDrawers) => {
        setOpenDrawers((prev) => ({ ...prev, [type]: !prev[type] }));
      };

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Stack direction="row" spacing={2} sx={{ p: 2, zIndex: 1300, position: 'relative' }}>
            <Button
              variant="outlined"
              onClick={() => toggleDrawer('glass')}
              data-testid="theme-glass-button"
            >
              Toggle Glass Theme
            </Button>
          </Stack>

          {/* Default Theme Drawer */}
          <Drawer
            open={openDrawers.default}
            onClose={() => toggleDrawer('default')}
            data-testid="theme-default-drawer"
            width={280}
          >
            <DrawerHeader onClose={() => toggleDrawer('default')}>
              <Typography variant="h6">Default Theme</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2" sx={{ p: 2 }}>
                This drawer uses the default theme styling.
              </Typography>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>

          {/* Glass Theme Drawer */}
          <Drawer
            open={openDrawers.glass}
            onClose={() => toggleDrawer('glass')}
            data-testid="theme-glass-drawer"
            variant="glass"
            width={300}
          >
            <DrawerHeader onClose={() => toggleDrawer('glass')}>
              <Typography variant="h6">Glass Theme</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2" sx={{ p: 2 }}>
                This drawer uses glass morphism styling with backdrop blur.
              </Typography>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <ThemeVariationsComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for default theme drawer to render
    await waitFor(
      () => {
        const backdrop = document.querySelector('.MuiBackdrop-root');
        expect(backdrop).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Test default theme drawer (look in document since MUI renders in portal)
    const defaultDrawer = document.querySelector('[data-testid="theme-default-drawer"]');
    expect(defaultDrawer).toBeInTheDocument();

    await waitFor(() => {
      const defaultTitle = document.querySelector('h6');
      expect(defaultTitle).toBeInTheDocument();
      expect(defaultTitle).toHaveTextContent('Default Theme');
    });

    // Test glass theme toggle
    const glassButton = canvas.getByTestId('theme-glass-button');
    await userEvent.click(glassButton);

    await waitFor(() => {
      const glassDrawer = document.querySelector('[data-testid="theme-glass-drawer"]');
      expect(glassDrawer).toBeInTheDocument();
    });

    await waitFor(() => {
      const glassDrawer = document.querySelector('[data-testid="theme-glass-drawer"]');
      expect(glassDrawer).toBeInTheDocument();
      const glassTitle = glassDrawer.querySelector('h6');
      expect(glassTitle).toBeInTheDocument();
      expect(glassTitle).toHaveTextContent('Glass Theme');
    });

    // Test glass drawer styling
    const glassDrawerElement = document.querySelector('[data-testid="theme-glass-drawer"]');
    const glassDrawerPaper = glassDrawerElement.querySelector('.MuiDrawer-paper');
    expect(glassDrawerPaper).toBeInTheDocument();
  },
};

// Visual States Tests
export const VisualStates: Story = {
  name: '👁️ Visual States',
  render: () => {
    const VisualStatesComponent = () => {
      const [states, setStates] = useState({
        left: true,
        right: false,
        top: false,
        bottom: false,
      });

      const toggleState = (state: keyof typeof states) => {
        setStates((prev) => ({ ...prev, [state]: !prev[state] }));
      };

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Stack direction="row" spacing={1} sx={{ p: 2, zIndex: 1300, position: 'relative' }}>
            <Button
              size="small"
              onClick={() => toggleState('right')}
              data-testid="visual-right-btn"
            >
              Right
            </Button>
            <Button size="small" onClick={() => toggleState('top')} data-testid="visual-top-btn">
              Top
            </Button>
            <Button
              size="small"
              onClick={() => toggleState('bottom')}
              data-testid="visual-bottom-btn"
            >
              Bottom
            </Button>
          </Stack>

          {/* Left Drawer */}
          <Drawer
            open={states.left}
            onClose={() => toggleState('left')}
            variant="left"
            data-testid="visual-left-drawer"
          >
            <DrawerHeader onClose={() => toggleState('left')}>
              <Typography variant="h6">Left Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2">Left side content</Typography>
            </DrawerContent>
          </Drawer>

          {/* Right Drawer */}
          <Drawer
            open={states.right}
            onClose={() => toggleState('right')}
            variant="right"
            data-testid="visual-right-drawer"
          >
            <DrawerHeader onClose={() => toggleState('right')}>
              <Typography variant="h6">Right Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2">Right side content</Typography>
            </DrawerContent>
          </Drawer>

          {/* Top Drawer */}
          <Drawer
            open={states.top}
            onClose={() => toggleState('top')}
            variant="top"
            height={200}
            data-testid="visual-top-drawer"
          >
            <DrawerHeader onClose={() => toggleState('top')}>
              <Typography variant="h6">Top Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2">Top content</Typography>
            </DrawerContent>
          </Drawer>

          {/* Bottom Drawer */}
          <Drawer
            open={states.bottom}
            onClose={() => toggleState('bottom')}
            variant="bottom"
            height={200}
            data-testid="visual-bottom-drawer"
          >
            <DrawerHeader onClose={() => toggleState('bottom')}>
              <Typography variant="h6">Bottom Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2">Bottom content</Typography>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <VisualStatesComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for left drawer to render (initially open)
    await waitFor(
      () => {
        const backdrop = document.querySelector('.MuiBackdrop-root');
        expect(backdrop).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Test left drawer (initially open) - look in document since MUI renders in portal
    const leftDrawer = document.querySelector('[data-testid="visual-left-drawer"]');
    expect(leftDrawer).toBeInTheDocument();

    await waitFor(() => {
      const leftTitle = leftDrawer.querySelector('h6');
      expect(leftTitle).toBeInTheDocument();
      expect(leftTitle).toHaveTextContent('Left Drawer');
    });

    // Test right drawer toggle
    const rightButton = canvas.getByTestId('visual-right-btn');
    await userEvent.click(rightButton);

    await waitFor(() => {
      const rightDrawer = document.querySelector('[data-testid="visual-right-drawer"]');
      expect(rightDrawer).toBeInTheDocument();
      const rightTitle = rightDrawer.querySelector('h6');
      expect(rightTitle).toBeInTheDocument();
      expect(rightTitle).toHaveTextContent('Right Drawer');
    });

    // Test top drawer toggle
    const topButton = canvas.getByTestId('visual-top-btn');
    await userEvent.click(topButton);

    await waitFor(() => {
      const topDrawer = document.querySelector('[data-testid="visual-top-drawer"]');
      expect(topDrawer).toBeInTheDocument();
      const topTitle = topDrawer.querySelector('h6');
      expect(topTitle).toBeInTheDocument();
      expect(topTitle).toHaveTextContent('Top Drawer');
    });

    // Test bottom drawer toggle
    const bottomButton = canvas.getByTestId('visual-bottom-btn');
    await userEvent.click(bottomButton);

    await waitFor(() => {
      const bottomDrawer = document.querySelector('[data-testid="visual-bottom-drawer"]');
      expect(bottomDrawer).toBeInTheDocument();
      const bottomTitle = bottomDrawer.querySelector('h6');
      expect(bottomTitle).toBeInTheDocument();
      expect(bottomTitle).toHaveTextContent('Bottom Drawer');
    });
  },
};

// Performance Tests
export const Performance: Story = {
  name: '⚡ Performance',
  render: () => {
    const PerformanceComponent = () => {
      const [open, setOpen] = useState(true);
      const [itemCount, setItemCount] = useState(50);

      // Generate large list of items
      const items = Array.from({ length: itemCount }, (_, i) => ({
        id: i,
        label: `Item ${i + 1}`,
        icon: i % 3 === 0 ? <Home /> : i % 3 === 1 ? <Settings /> : <Person />,
      }));

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Stack direction="row" spacing={2} sx={{ p: 2, zIndex: 1300, position: 'relative' }}>
            <Button size="small" onClick={() => setItemCount(100)} data-testid="perf-100-items">
              100 Items
            </Button>
            <Button size="small" onClick={() => setItemCount(200)} data-testid="perf-200-items">
              200 Items
            </Button>
          </Stack>

          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            data-testid="performance-drawer"
            keepMounted={true}
          >
            <DrawerHeader onClose={() => setOpen(false)}>
              <Typography variant="h6">Performance Test ({itemCount} items)</Typography>
            </DrawerHeader>
            <DrawerContent>
              <List data-testid="performance-list">
                {items.map((item) => (
                  <ListItemButton key={item.id} data-testid={`perf-item-${item.id}`}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <PerformanceComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for performance drawer to render
    await waitFor(
      () => {
        const backdrop = document.querySelector('.MuiBackdrop-root');
        expect(backdrop).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Test initial render performance (look in document since MUI renders in portal)
    const performanceDrawer = document.querySelector('[data-testid="performance-drawer"]');
    expect(performanceDrawer).toBeInTheDocument();

    const performanceList = document.querySelector('[data-testid="performance-list"]');
    expect(performanceList).toBeInTheDocument();

    // Test that initial items are rendered
    const firstItem = document.querySelector('[data-testid="perf-item-0"]');
    const lastItem = document.querySelector('[data-testid="perf-item-49"]');
    expect(firstItem).toBeInTheDocument();
    expect(lastItem).toBeInTheDocument();

    // Test performance with more items
    const button100 = canvas.getByTestId('perf-100-items');
    await userEvent.click(button100);

    await waitFor(() => {
      const title = performanceDrawer.querySelector('h6');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Performance Test (100 items)');
    });

    // Verify new items are rendered
    await waitFor(() => {
      const item99 = document.querySelector('[data-testid="perf-item-99"]');
      expect(item99).toBeInTheDocument();
    });

    // Test scrolling performance
    const scrollableContent = performanceList.parentElement;
    if (scrollableContent) {
      scrollableContent.scrollTop = 1000;
      expect(scrollableContent.scrollTop).toBeGreaterThan(0);
    }
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  name: '🧩 Edge Cases',
  render: () => {
    const EdgeCasesComponent = () => {
      const [states, setStates] = useState({
        empty: true,
        noHeader: false,
        longContent: false,
        persistent: false,
      });

      const toggleState = (state: keyof typeof states) => {
        setStates((prev) => ({ ...prev, [state]: !prev[state] }));
      };

      const longText =
        'This is a very long text content that should test how the drawer handles overflow content. '.repeat(
          20,
        );

      return (
        <Box sx={{ height: '100vh', position: 'relative' }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ p: 1, zIndex: 1300, position: 'relative', flexWrap: 'wrap' }}
          >
            <Button
              size="small"
              onClick={() => toggleState('noHeader')}
              data-testid="edge-no-header"
            >
              No Header
            </Button>
            <Button
              size="small"
              onClick={() => toggleState('longContent')}
              data-testid="edge-long-content"
            >
              Long Content
            </Button>
            <Button
              size="small"
              onClick={() => toggleState('persistent')}
              data-testid="edge-persistent"
            >
              Persistent
            </Button>
          </Stack>

          {/* Empty Drawer */}
          <Drawer
            open={states.empty}
            onClose={() => toggleState('empty')}
            data-testid="edge-empty-drawer"
          >
            <DrawerHeader onClose={() => toggleState('empty')}>
              <Typography variant="h6">Empty Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>{/* Intentionally empty content */}</DrawerContent>
          </Drawer>

          {/* No Header Drawer */}
          <Drawer
            open={states.noHeader}
            onClose={() => toggleState('noHeader')}
            data-testid="edge-no-header-drawer"
          >
            <DrawerContent>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">No Header</Typography>
                <Typography variant="body2">This drawer has no header component.</Typography>
              </Box>
            </DrawerContent>
          </Drawer>

          {/* Long Content Drawer */}
          <Drawer
            open={states.longContent}
            onClose={() => toggleState('longContent')}
            data-testid="edge-long-content-drawer"
          >
            <DrawerHeader onClose={() => toggleState('longContent')}>
              <Typography variant="h6">Long Content</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2" data-testid="edge-long-text">
                {longText}
              </Typography>
            </DrawerContent>
          </Drawer>

          {/* Persistent Drawer */}
          <Drawer
            open={states.persistent}
            onClose={() => toggleState('persistent')}
            data-testid="edge-persistent-drawer"
            persistent={true}
          >
            <DrawerHeader>
              <Typography variant="h6">Persistent Drawer</Typography>
            </DrawerHeader>
            <DrawerContent>
              <Typography variant="body2">
                This is a persistent drawer without backdrop click-to-close.
              </Typography>
              <Button
                onClick={() => toggleState('persistent')}
                data-testid="edge-persistent-close"
                sx={{ mt: 2 }}
              >
                Close Manually
              </Button>
            </DrawerContent>
          </Drawer>
        </Box>
      );
    };

    return <EdgeCasesComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for empty drawer to render
    await waitFor(
      () => {
        const backdrop = document.querySelector('.MuiBackdrop-root');
        expect(backdrop).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Test empty drawer (look in document since MUI renders in portal)
    const emptyDrawer = document.querySelector('[data-testid="edge-empty-drawer"]');
    expect(emptyDrawer).toBeInTheDocument();

    await waitFor(() => {
      const emptyTitle = emptyDrawer.querySelector('h6');
      expect(emptyTitle).toBeInTheDocument();
      expect(emptyTitle).toHaveTextContent('Empty Drawer');
    });

    // Test no header drawer
    const noHeaderButton = canvas.getByTestId('edge-no-header');
    await userEvent.click(noHeaderButton);

    await waitFor(() => {
      const noHeaderDrawer = document.querySelector('[data-testid="edge-no-header-drawer"]');
      expect(noHeaderDrawer).toBeInTheDocument();
      const noHeaderText = Array.from(document.querySelectorAll('*')).find(
        (el) => el.textContent === 'No Header',
      );
      expect(noHeaderText).toBeInTheDocument();
    });

    // Test long content drawer
    const longContentButton = canvas.getByTestId('edge-long-content');
    await userEvent.click(longContentButton);

    await waitFor(() => {
      const longContentDrawer = document.querySelector('[data-testid="edge-long-content-drawer"]');
      expect(longContentDrawer).toBeInTheDocument();
      const longText = document.querySelector('[data-testid="edge-long-text"]');
      expect(longText).toBeInTheDocument();
      expect(longText.textContent?.length).toBeGreaterThan(100);
    });

    // Test persistent drawer
    const persistentButton = canvas.getByTestId('edge-persistent');
    await userEvent.click(persistentButton);

    await waitFor(() => {
      const persistentDrawer = document.querySelector('[data-testid="edge-persistent-drawer"]');
      expect(persistentDrawer).toBeInTheDocument();
      const persistentTitle = persistentDrawer.querySelector('h6');
      expect(persistentTitle).toBeInTheDocument();
      expect(persistentTitle).toHaveTextContent('Persistent Drawer');
    });

    // Test manual close for persistent drawer
    const manualCloseButton = canvas.getByTestId('edge-persistent-close');
    await userEvent.click(manualCloseButton);

    await waitFor(() => {
      const persistentDrawer = document.querySelector('[data-testid="edge-persistent-drawer"]');
      // For persistent drawers, check if it's hidden rather than removed from DOM
      if (persistentDrawer) {
        const drawerPaper = persistentDrawer.querySelector('.MuiDrawer-paper');
        const isHidden =
          drawerPaper &&
          (drawerPaper.style.visibility === 'hidden' ||
            drawerPaper.style.transform.includes('translateX(-'));
        expect(isHidden).toBe(true);
      } else {
        expect(persistentDrawer).not.toBeInTheDocument();
      }
    });
  },
};

// Integration Tests
export const Integration: Story = {
  name: '🔗 Integration',
  render: () => {
    const IntegrationComponent = () => {
      const [drawerOpen, setDrawerOpen] = useState(false);
      const [selectedPage, setSelectedPage] = useState('home');
      const [notifications, setNotifications] = useState(3);

      const handleNavigation = (page: string) => {
        setSelectedPage(page);
        if (page === 'notifications') {
          setNotifications(0);
        }
      };

      return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
          {/* Main Drawer */}
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            data-testid="integration-main-drawer"
            persistent={false}
          >
            <DrawerHeader onClose={() => setDrawerOpen(false)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }}
                >
                  A
                </Box>
                <Typography variant="h6">App Name</Typography>
              </Box>
            </DrawerHeader>
            <DrawerContent>
              <List>
                <ListItemButton
                  selected={selectedPage === 'home'}
                  onClick={() => handleNavigation('home')}
                  data-testid="integration-nav-home"
                >
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedPage === 'dashboard'}
                  onClick={() => handleNavigation('dashboard')}
                  data-testid="integration-nav-dashboard"
                >
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedPage === 'notifications'}
                  onClick={() => handleNavigation('notifications')}
                  data-testid="integration-nav-notifications"
                >
                  <ListItemIcon>
                    <Box sx={{ position: 'relative' }}>
                      <Settings />
                      {notifications > 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: 'error.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                          }}
                        >
                          {notifications}
                        </Box>
                      )}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    secondary={notifications > 0 ? `${notifications} new` : 'No new notifications'}
                  />
                </ListItemButton>
              </List>
            </DrawerContent>
          </Drawer>

          {/* Main Content Area */}
          <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* App Bar */}
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <IconButton
                onClick={() => setDrawerOpen(!drawerOpen)}
                data-testid="integration-menu-button"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
              </Typography>
              {notifications > 0 && (
                <Box
                  sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.75rem',
                  }}
                >
                  {notifications} notifications
                </Box>
              )}
            </Box>

            {/* Page Content */}
            <Box sx={{ p: 3, flex: 1 }} data-testid="integration-main-content">
              <Typography variant="h4" gutterBottom>
                {selectedPage === 'home' && 'Welcome Home'}
                {selectedPage === 'dashboard' && 'Dashboard Overview'}
                {selectedPage === 'notifications' && 'Notification Center'}
              </Typography>
              <Typography variant="body1">
                This is the {selectedPage} page content. The drawer integrates with the main
                application navigation and state management.
              </Typography>
              {selectedPage === 'notifications' && (
                <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                  All notifications have been marked as read.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      );
    };

    return <IntegrationComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    expect(canvas.getByText('Welcome Home')).toBeInTheDocument();

    // Test drawer opening
    const menuButton = canvas.getByTestId('integration-menu-button');
    await userEvent.click(menuButton);

    await waitFor(() => {
      const drawer = document.querySelector('[data-testid="integration-main-drawer"]');
      expect(drawer).toBeInTheDocument();
      const appName = Array.from(document.querySelectorAll('*')).find(
        (el) => el.textContent === 'App Name',
      );
      expect(appName).toBeInTheDocument();
    });

    // Test navigation to dashboard
    const dashboardItem = document.querySelector('[data-testid="integration-nav-dashboard"]');
    await userEvent.click(dashboardItem);

    await waitFor(() => {
      const dashboardOverview = canvas.getByText('Dashboard Overview');
      expect(dashboardOverview).toBeInTheDocument();
    });

    // Test notification badge functionality
    const notificationsItem = document.querySelector(
      '[data-testid="integration-nav-notifications"]',
    );

    // Should show notification badge
    const notificationBadge = Array.from(document.querySelectorAll('*')).find(
      (el) => el.textContent === '3',
    );
    expect(notificationBadge).toBeInTheDocument();

    await userEvent.click(notificationsItem);

    await waitFor(() => {
      const notificationCenter = canvas.getByText('Notification Center');
      expect(notificationCenter).toBeInTheDocument();
      const notificationMessage = canvas.getByText('All notifications have been marked as read.');
      expect(notificationMessage).toBeInTheDocument();
    });

    // Notification badge should be cleared
    await waitFor(() => {
      const notificationText = canvas.queryByText('3 notifications');
      expect(notificationText).not.toBeInTheDocument();
    });

    // Test drawer closing
    const closeButton = document.querySelector('button[aria-label*="close" i]');
    await userEvent.click(closeButton);

    await waitFor(() => {
      const appName = Array.from(document.querySelectorAll('*')).find(
        (el) => el.textContent === 'App Name',
      );
      // appName should be undefined (not found) when drawer is closed
      expect(appName).toBeUndefined();
    });
  },
};
