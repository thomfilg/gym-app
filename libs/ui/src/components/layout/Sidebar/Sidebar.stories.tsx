import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
import { DensityProvider } from '../../../utils/density';
import React, { useState } from 'react';

import { Sidebar, SidebarContent, SidebarFooter,SidebarHeader } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A navigation sidebar component with multiple variants including fixed, collapsible, floating, and glass styles.',
      },
    },
  },
  tags: ['autodocs', 'component:Sidebar'],
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
type Story = StoryObj<typeof meta>;

const navigationItems = [
  { icon: <HomeIcon />, label: 'Home' },
  { icon: <DashboardIcon />, label: 'Dashboard' },
  { icon: <InboxIcon />, label: 'Inbox' },
  { icon: <StarIcon />, label: 'Favorites' },
  { icon: <SendIcon />, label: 'Sent' },
];

const SidebarDemo = ({
  variant = 'fixed',
  showToggle = false,
}: {
  variant?: 'fixed' | 'collapsible' | 'floating' | 'glass';
  showToggle?: boolean;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50', position: 'relative' }}>
      <Sidebar variant={variant} open={open} onToggle={() => setOpen(!open)}>
        <SidebarHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ display: open ? 'block' : 'none' }}>
              My App
            </Typography>
            {showToggle && (
              <IconButton onClick={() => setOpen(!open)} size="small">
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            )}
          </Box>
        </SidebarHeader>

        <SidebarContent>
          <List>
            {navigationItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ display: open ? 'block' : 'none' }} />
              </ListItem>
            ))}
          </List>
        </SidebarContent>

        <SidebarFooter>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            <Box sx={{ display: open ? 'block' : 'none' }}>
              <Typography variant="body2">User Name</Typography>
              <Typography variant="caption" color="text.secondary">
                user@example.com
              </Typography>
            </Box>
          </Box>
        </SidebarFooter>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Main Content Area
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is the main content area next to the sidebar. The sidebar can have different variants
          and behaviors.
        </Typography>
      </Box>
    </Box>
  );
};

export const Fixed: Story = {
  render: () => <SidebarDemo variant="fixed" />,
};

export const Collapsible: Story = {
  render: () => <SidebarDemo variant="collapsible" showToggle />,
};

export const Floating: Story = {
  render: () => (
    <Box sx={{ height: '500px', bgcolor: 'grey.100', position: 'relative' }}>
      <SidebarDemo variant="floating" />
    </Box>
  ),
};

export const Glass: Story = {
  render: () => (
    <Box
      sx={{
        height: '500px',
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Sidebar variant="glass" open={true}>
          <SidebarHeader>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Glass Sidebar
            </Typography>
          </SidebarHeader>

          <SidebarContent>
            <List>
              {navigationItems.map((item, index) => (
                <ListItem button key={index} sx={{ color: 'white' }}>
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </SidebarContent>

          <SidebarFooter>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
              <Box>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Glass User
                </Typography>
              </Box>
            </Box>
          </SidebarFooter>
        </Sidebar>

        <Box sx={{ flex: 1, p: 3, color: 'white' }}>
          <Typography variant="h4" gutterBottom>
            Glass Morphism Effect
          </Typography>
          <Typography variant="body1">
            The glass variant creates a beautiful translucent effect with backdrop blur.
          </Typography>
        </Box>
      </Box>
    </Box>
  ),
};

export const RightPositioned: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        height: '500px',
        bgcolor: 'grey.50',
        position: 'relative',
        flexDirection: 'row-reverse',
      }}
    >
      <Sidebar variant="fixed" open={true} position="right">
        <SidebarHeader>
          <Typography variant="h6" align="center">
            Right Sidebar
          </Typography>
        </SidebarHeader>

        <SidebarContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </SidebarContent>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Right-Positioned Sidebar
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The sidebar can also be positioned on the right side of the layout.
        </Typography>
      </Box>
    </Box>
  ),
};

const MiniDrawerComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '500px', bgcolor: 'grey.50' }}>
      <Sidebar variant="collapsible" open={open} width={240} collapsedWidth={56}>
        <Box sx={{ p: 1, display: 'flex', justifyContent: open ? 'flex-end' : 'center' }}>
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <List>
          {navigationItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon sx={{ minWidth: open ? 56 : 40, justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>
      </Sidebar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Mini Drawer Variant
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Click the menu icon to expand/collapse the sidebar. When collapsed, only icons are
          visible.
        </Typography>
      </Box>
    </Box>
  );
};

export const MiniDrawer: Story = {
  render: () => <MiniDrawerComponent />,
};

// Required exports for validation
export const Default: Story = {
  render: () => <SidebarDemo variant="fixed" />,
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '1200px' }}>
      <Typography variant="h6" gutterBottom>
        Fixed Variant
      </Typography>
      <Box sx={{ height: '240px' }}>
        <SidebarDemo variant="fixed" />
      </Box>

      <Typography variant="h6" gutterBottom>
        Collapsible Variant
      </Typography>
      <Box sx={{ height: '240px' }}>
        <SidebarDemo variant="collapsible" showToggle />
      </Box>

      <Typography variant="h6" gutterBottom>
        Floating Variant
      </Typography>
      <Box sx={{ height: '240px', bgcolor: 'grey.100' }}>
        <SidebarDemo variant="floating" />
      </Box>

      <Typography variant="h6" gutterBottom>
        Glass Variant
      </Typography>
      <Box
        sx={{
          height: '240px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Sidebar variant="glass" open={true}>
            <SidebarHeader>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Glass App
              </Typography>
            </SidebarHeader>
            <SidebarContent>
              <List>
                {navigationItems.slice(0, 3).map((item, index) => (
                  <ListItem button key={index} sx={{ color: 'white' }}>
                    <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </SidebarContent>
          </Sidebar>
          <Box sx={{ flex: 1, p: 2, color: 'white' }}>
            <Typography variant="h6">Glass Effect Demo</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '800px' }}>
      <Typography variant="h6" gutterBottom>
        Default Width (280px)
      </Typography>
      <Box sx={{ height: '180px' }}>
        <SidebarDemo variant="fixed" />
      </Box>

      <Typography variant="h6" gutterBottom>
        Wide Sidebar (360px)
      </Typography>
      <Box sx={{ height: '180px' }}>
        <Box sx={{ display: 'flex', height: '100%', bgcolor: 'grey.50' }}>
          <Sidebar variant="fixed" open={true} width={360}>
            <SidebarHeader>
              <Typography variant="h6">Wide Sidebar</Typography>
            </SidebarHeader>
            <SidebarContent>
              <List>
                {navigationItems.map((item, index) => (
                  <ListItem button key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </SidebarContent>
          </Sidebar>
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography variant="body1">Wide sidebar content area</Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Narrow Sidebar (200px)
      </Typography>
      <Box sx={{ height: '180px' }}>
        <Box sx={{ display: 'flex', height: '100%', bgcolor: 'grey.50' }}>
          <Sidebar variant="fixed" open={true} width={200}>
            <SidebarHeader>
              <Typography variant="h6">Narrow</Typography>
            </SidebarHeader>
            <SidebarContent>
              <List>
                {navigationItems.slice(0, 3).map((item, index) => (
                  <ListItem button key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </SidebarContent>
          </Sidebar>
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography variant="body1">Narrow sidebar content area</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => {
    const [openState1, setOpenState1] = useState(true);
    const [openState2, setOpenState2] = useState(false);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '600px' }}>
        <Typography variant="h6" gutterBottom>
          Open State
        </Typography>
        <Box sx={{ height: '180px' }}>
          <Box sx={{ display: 'flex', height: '100%', bgcolor: 'grey.50' }}>
            <Sidebar
              variant="collapsible"
              open={openState1}
              onToggle={() => setOpenState1(!openState1)}
            >
              <SidebarHeader>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6">Open Sidebar</Typography>
                  <IconButton onClick={() => setOpenState1(!openState1)} size="small">
                    <ChevronLeftIcon />
                  </IconButton>
                </Box>
              </SidebarHeader>
              <SidebarContent>
                <List>
                  {navigationItems.slice(0, 3).map((item, index) => (
                    <ListItem button key={index}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </SidebarContent>
            </Sidebar>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="body1">Sidebar is expanded</Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          Collapsed State
        </Typography>
        <Box sx={{ height: '180px' }}>
          <Box sx={{ display: 'flex', height: '100%', bgcolor: 'grey.50' }}>
            <Sidebar
              variant="collapsible"
              open={openState2}
              onToggle={() => setOpenState2(!openState2)}
              collapsedWidth={60}
            >
              <SidebarHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton onClick={() => setOpenState2(!openState2)} size="small">
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              </SidebarHeader>
              <SidebarContent>
                <List>
                  {navigationItems.slice(0, 3).map((item, index) => (
                    <ListItem button key={index}>
                      <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                        {item.icon}
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </SidebarContent>
            </Sidebar>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="body1">Sidebar is collapsed</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  },
};

export const InteractiveStates: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Box sx={{ display: 'flex', height: '400px', bgcolor: 'grey.50' }}>
        <Sidebar variant="fixed" open={true}>
          <SidebarHeader>
            <Typography variant="h6">Interactive Sidebar</Typography>
          </SidebarHeader>
          <SidebarContent>
            <List>
              {navigationItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  selected={activeItem === index}
                  onClick={() => setActiveItem(index)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </SidebarContent>
          <SidebarFooter>
            <Box sx={{ p: 2, bgcolor: isHovered ? 'action.hover' : 'transparent' }}>
              <Typography variant="body2" color="text.secondary">
                Active: {navigationItems[activeItem]?.label}
              </Typography>
            </Box>
          </SidebarFooter>
        </Sidebar>
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Interactive States Demo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Click on sidebar items to see selection state. Hover over items to see hover effects.
            Currently selected: {navigationItems[activeItem]?.label}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '800px' }}>
      <Typography variant="h6" gutterBottom>
        Desktop View (&gt;= 768px)
      </Typography>
      <Box sx={{ height: '200px', width: '100%', minWidth: '768px' }}>
        <SidebarDemo variant="fixed" />
      </Box>

      <Typography variant="h6" gutterBottom>
        Tablet View (768px)
      </Typography>
      <Box sx={{ height: '200px', width: '768px', mx: 'auto' }}>
        <SidebarDemo variant="collapsible" showToggle />
      </Box>

      <Typography variant="h6" gutterBottom>
        Mobile View (&lt; 600px)
      </Typography>
      <Box sx={{ height: '200px', width: '375px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', height: '100%', bgcolor: 'grey.50', position: 'relative' }}>
          <Sidebar variant="floating" open={true} width={280}>
            <SidebarHeader>
              <Typography variant="h6">Mobile Menu</Typography>
            </SidebarHeader>
            <SidebarContent>
              <List>
                {navigationItems.slice(0, 3).map((item, index) => (
                  <ListItem button key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </SidebarContent>
          </Sidebar>
        </Box>
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 200, height: 300 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Box sx={{ display: 'flex', height: '250px', bgcolor: 'grey.50', position: 'relative' }}>
              <Sidebar variant="fixed" open={true} width={180}>
                <SidebarHeader>
                  <Typography variant="subtitle2">Compact</Typography>
                </SidebarHeader>
                <SidebarContent>
                  <List dense>
                    {navigationItems.slice(0, 3).map((item, index) => (
                      <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </SidebarContent>
              </Sidebar>
            </Box>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 220, height: 300 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Box sx={{ display: 'flex', height: '250px', bgcolor: 'grey.50', position: 'relative' }}>
              <Sidebar variant="fixed" open={true} width={200}>
                <SidebarHeader>
                  <Typography variant="subtitle2">Normal</Typography>
                </SidebarHeader>
                <SidebarContent>
                  <List>
                    {navigationItems.slice(0, 3).map((item, index) => (
                      <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </SidebarContent>
              </Sidebar>
            </Box>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 240, height: 300 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Box sx={{ display: 'flex', height: '250px', bgcolor: 'grey.50', position: 'relative' }}>
              <Sidebar variant="fixed" open={true} width={220}>
                <SidebarHeader>
                  <Typography variant="subtitle2">Spacious</Typography>
                </SidebarHeader>
                <SidebarContent>
                  <List>
                    {navigationItems.slice(0, 3).map((item, index) => (
                      <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </SidebarContent>
              </Sidebar>
            </Box>
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
