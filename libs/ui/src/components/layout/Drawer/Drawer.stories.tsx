import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  Analytics,
  Dashboard,
  Help,
  Home,
  Menu as MenuIcon,
  Notifications,
  Person,
  Settings,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Drawer, DrawerContent,DrawerHeader } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'component:Drawer'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom', 'glass'],
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = (args: { open: boolean; variant: string; width: number }) => {
  const [open, setOpen] = useState(args.open);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Button
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
      >
        Open Drawer
      </Button>
      <Drawer {...args} open={open} onClose={() => setOpen(false)}>
        <DrawerHeader onClose={() => setOpen(false)}>
          <Typography variant="h6">Navigation</Typography>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Analytics />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography>Main content area</Typography>
      </Box>
    </Box>
  );
};

export const Default: Story = {
  args: {
    open: true,
    variant: 'left',
    width: 280,
  },
  render: (args) => <DefaultComponent {...args} />,
};

const AllVariantsComponent = () => {
  const [openDrawers, setOpenDrawers] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
    glass: false,
  });

  const toggleDrawer = (variant: keyof typeof openDrawers) => {
    setOpenDrawers((prev) => ({
      ...prev,
      [variant]: !prev[variant],
    }));
  };

  const DrawerButton = ({
    variant,
    label,
  }: {
    variant: keyof typeof openDrawers;
    label: string;
  }) => (
    <Button variant="outlined" onClick={() => toggleDrawer(variant)} sx={{ m: 1 }}>
      {label}
    </Button>
  );

  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <DrawerButton variant="left" label="Left Drawer" />
        <DrawerButton variant="right" label="Right Drawer" />
        <DrawerButton variant="top" label="Top Drawer" />
        <DrawerButton variant="bottom" label="Bottom Drawer" />
        <DrawerButton variant="glass" label="Glass Drawer" />
      </Stack>

      {/* Left Drawer */}
      <Drawer open={openDrawers.left} onClose={() => toggleDrawer('left')} variant="left">
        <DrawerHeader onClose={() => toggleDrawer('left')}>Left Navigation</DrawerHeader>
        <DrawerContent>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
        </DrawerContent>
      </Drawer>

      {/* Right Drawer */}
      <Drawer open={openDrawers.right} onClose={() => toggleDrawer('right')} variant="right">
        <DrawerHeader onClose={() => toggleDrawer('right')}>Right Panel</DrawerHeader>
        <DrawerContent>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </List>
        </DrawerContent>
      </Drawer>

      {/* Top Drawer */}
      <Drawer open={openDrawers.top} onClose={() => toggleDrawer('top')} variant="top" height={200}>
        <DrawerHeader onClose={() => toggleDrawer('top')}>Top Panel</DrawerHeader>
        <DrawerContent>
          <Typography variant="body2">
            This is a top drawer that slides down from the top of the screen.
          </Typography>
        </DrawerContent>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        open={openDrawers.bottom}
        onClose={() => toggleDrawer('bottom')}
        variant="bottom"
        height={200}
      >
        <DrawerHeader onClose={() => toggleDrawer('bottom')}>Bottom Panel</DrawerHeader>
        <DrawerContent>
          <Typography variant="body2">
            This is a bottom drawer that slides up from the bottom of the screen.
          </Typography>
        </DrawerContent>
      </Drawer>

      {/* Glass Drawer */}
      <Drawer open={openDrawers.glass} onClose={() => toggleDrawer('glass')} variant="glass">
        <DrawerHeader onClose={() => toggleDrawer('glass')}>Glass Panel</DrawerHeader>
        <DrawerContent>
          <Typography variant="body2" sx={{ p: 2 }}>
            This drawer uses a glass morphism effect with backdrop blur.
          </Typography>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </List>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ p: 4, pt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Drawer Variants Demo
        </Typography>
        <Typography variant="body1">
          Click the buttons above to open different drawer variants. Each variant demonstrates
          different positioning and styling options.
        </Typography>
      </Box>
    </Box>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsComponent />,
};

const NavigationDrawerComponent = () => {
  const [open, setOpen] = useState(false);
  const [persistent, setPersistent] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
    { id: 'profile', label: 'Profile', icon: <Person /> },
    { id: 'help', label: 'Help', icon: <Help /> },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer open={open} onClose={() => setOpen(false)} persistent={persistent}>
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              P
            </Box>
            <Typography variant="h6">Procurement</Typography>
          </Box>
        </DrawerHeader>
        <DrawerContent>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={selectedItem === item.id}
                onClick={() => setSelectedItem(item.id)}
              >
                <ListItemIcon
                  sx={{
                    color: selectedItem === item.id ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" sx={{ px: 2, color: 'text.secondary' }}>
            Version 1.0.0
          </Typography>
        </DrawerContent>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {navItems.find((item) => item.id === selectedItem)?.label}
          </Typography>
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant={persistent ? 'contained' : 'outlined'}
              onClick={() => setPersistent(!persistent)}
            >
              {persistent ? 'Persistent' : 'Temporary'}
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 3, flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {navItems.find((item) => item.id === selectedItem)?.label} Page
          </Typography>
          <Typography variant="body1">
            This is the content for the{' '}
            {navItems.find((item) => item.id === selectedItem)?.label.toLowerCase()} section. The
            drawer can be toggled using the menu button in the header.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const NavigationDrawer: Story = {
  render: () => <NavigationDrawerComponent />,
};

// Required story exports for validation

const AllSizesComponent = () => {
  const [openDrawers, setOpenDrawers] = useState({
    small: false,
    medium: false,
    large: false,
    fullHeight: false,
  });

  const toggleDrawer = (size: keyof typeof openDrawers) => {
    setOpenDrawers((prev) => ({
      ...prev,
      [size]: !prev[size],
    }));
  };

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Drawer Size Variations
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={() => toggleDrawer('small')}>
          Small (200px)
        </Button>
        <Button variant="outlined" onClick={() => toggleDrawer('medium')}>
          Medium (300px)
        </Button>
        <Button variant="outlined" onClick={() => toggleDrawer('large')}>
          Large (400px)
        </Button>
        <Button variant="outlined" onClick={() => toggleDrawer('fullHeight')}>
          Full Height
        </Button>
      </Stack>

      <Drawer open={openDrawers.small} onClose={() => toggleDrawer('small')} width={200}>
        <DrawerHeader onClose={() => toggleDrawer('small')}>Small Drawer</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Width: 200px</Typography>
        </DrawerContent>
      </Drawer>

      <Drawer open={openDrawers.medium} onClose={() => toggleDrawer('medium')} width={300}>
        <DrawerHeader onClose={() => toggleDrawer('medium')}>Medium Drawer</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Width: 300px</Typography>
        </DrawerContent>
      </Drawer>

      <Drawer open={openDrawers.large} onClose={() => toggleDrawer('large')} width={400}>
        <DrawerHeader onClose={() => toggleDrawer('large')}>Large Drawer</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Width: 400px</Typography>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={openDrawers.fullHeight}
        onClose={() => toggleDrawer('fullHeight')}
        variant="top"
        height="100%"
      >
        <DrawerHeader onClose={() => toggleDrawer('fullHeight')}>Full Height Drawer</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Height: 100% of viewport</Typography>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesComponent />,
};

const AllStatesComponent = () => {
  const [persistent, setPersistent] = useState(true);
  const [temporary, setTemporary] = useState(false);
  const [withBackdrop, setWithBackdrop] = useState(false);
  const [withoutBackdrop, setWithoutBackdrop] = useState(false);

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Drawer States
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={() => setPersistent(!persistent)}>
          Persistent State
        </Button>
        <Button variant="outlined" onClick={() => setTemporary(!temporary)}>
          Temporary State
        </Button>
        <Button variant="outlined" onClick={() => setWithBackdrop(!withBackdrop)}>
          With Backdrop
        </Button>
        <Button variant="outlined" onClick={() => setWithoutBackdrop(!withoutBackdrop)}>
          Without Backdrop
        </Button>
      </Stack>

      <Drawer open={persistent} onClose={() => setPersistent(false)} persistent={true}>
        <DrawerHeader onClose={() => setPersistent(false)}>Persistent Drawer</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>This drawer stays open persistently</Typography>
        </DrawerContent>
      </Drawer>

      <Drawer open={temporary} onClose={() => setTemporary(false)} temporary={true}>
        <DrawerHeader onClose={() => setTemporary(false)}>Temporary Drawer</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>This is a temporary drawer</Typography>
        </DrawerContent>
      </Drawer>

      <Drawer open={withBackdrop} onClose={() => setWithBackdrop(false)} backdrop={true}>
        <DrawerHeader onClose={() => setWithBackdrop(false)}>With Backdrop</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>This drawer has a backdrop</Typography>
        </DrawerContent>
      </Drawer>

      <Drawer open={withoutBackdrop} onClose={() => setWithoutBackdrop(false)} hideBackdrop={true}>
        <DrawerHeader onClose={() => setWithoutBackdrop(false)}>Without Backdrop</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>This drawer has no backdrop</Typography>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
};

const InteractiveStatesComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const items = ['Home', 'Dashboard', 'Settings', 'Profile', 'Help'];

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Interactive States Demo
      </Typography>
      <Button variant="contained" onClick={() => setDrawerOpen(true)}>
        Open Interactive Drawer
      </Button>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerHeader onClose={() => setDrawerOpen(false)}>Interactive Menu</DrawerHeader>
        <DrawerContent>
          <List>
            {items.map((item) => (
              <ListItemButton
                key={item}
                selected={selectedItem === item}
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => setHoverItem(item)}
                onMouseLeave={() => setHoverItem(null)}
                sx={{
                  backgroundColor:
                    hoverItem === item
                      ? 'action.hover'
                      : selectedItem === item
                        ? 'action.selected'
                        : 'transparent',
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Selected: {selectedItem || 'None'}
            </Typography>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

const ResponsiveComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Responsive Drawer Behavior
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={() => setMobileOpen(true)}>
          Mobile View (240px)
        </Button>
        <Button variant="outlined" onClick={() => setTabletOpen(true)}>
          Tablet View (320px)
        </Button>
        <Button variant="outlined" onClick={() => setDesktopOpen(true)}>
          Desktop View (400px)
        </Button>
      </Stack>

      {/* Mobile Drawer */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} width={240} variant="left">
        <DrawerHeader onClose={() => setMobileOpen(false)}>Mobile Menu</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Optimized for mobile devices with 240px width</Typography>
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

      {/* Tablet Drawer */}
      <Drawer open={tabletOpen} onClose={() => setTabletOpen(false)} width={320} variant="right">
        <DrawerHeader onClose={() => setTabletOpen(false)}>Tablet Menu</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Optimized for tablet devices with 320px width</Typography>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Analytics />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </List>
        </DrawerContent>
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer open={desktopOpen} onClose={() => setDesktopOpen(false)} width={400} variant="glass">
        <DrawerHeader onClose={() => setDesktopOpen(false)}>Desktop Menu</DrawerHeader>
        <DrawerContent>
          <Typography sx={{ p: 2 }}>Full-featured desktop drawer with 400px width</Typography>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" secondary="Go to homepage" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" secondary="View analytics" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" secondary="Manage account" />
            </ListItemButton>
          </List>
        </DrawerContent>
      </Drawer>

      <Typography variant="body1" sx={{ mt: 3 }}>
        Click the buttons above to see how the drawer adapts to different screen sizes. Each drawer
        is optimized for its target device category.
      </Typography>
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveComponent />,
};

export const DensityModes: Story = {
  render: () => {

    const DensityDrawerDemo = ({ mode, label }: { mode: string; label: string }) => {
      const [open, setOpen] = useState(false);

      return (
        <DensityProvider defaultMode={mode}>
          <Box sx={{ width: 150 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              {label}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
              Open {mode}
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)} width={260}>
              <DrawerHeader onClose={() => setOpen(false)}>{label} Drawer</DrawerHeader>
              <DrawerContent>
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
        </DensityProvider>
      );
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityDrawerDemo mode="compact" label="Compact (0.8x)" />
        <DensityDrawerDemo mode="normal" label="Normal (1.0x)" />
        <DensityDrawerDemo mode="spacious" label="Spacious (1.25x)" />
      </Box>
    );
  },
};
