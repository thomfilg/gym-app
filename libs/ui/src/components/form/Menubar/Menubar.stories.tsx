import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Menubar } from './Menubar';
import type { MenubarItem } from './Menubar.types';

const meta: Meta<typeof Menubar> = {
  title: 'Form/Menubar',
  component: Menubar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'component:Menubar'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient', 'elevated', 'minimal', 'bordered'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'default'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

const sampleMenuItems: MenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    children: [{ id: 'new', label: 'New', shortcut: '⌘N', action: () => {} }],
  },
];

const Logo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <HomeIcon />
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      AppName
    </Typography>
  </Box>
);

const EndContent = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <IconButton color="inherit" size="small">
      <NotificationsIcon />
    </IconButton>
    <IconButton color="inherit" size="small">
      <DarkModeIcon />
    </IconButton>
    <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
  </Box>
);

export const Default: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'default',
    size: 'md',
  },
};

export const WithLogo: Story = {
  args: {
    items: sampleMenuItems,
    logo: <Logo />,
    variant: 'default',
  },
};

export const WithEndContent: Story = {
  args: {
    items: sampleMenuItems,
    logo: <Logo />,
    endContent: <EndContent />,
    variant: 'elevated',
  },
};

export const Glass: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'glass',
    glass: true,
    glow: true,
    logo: <Logo />,
    endContent: <EndContent />,
  },
};

export const Gradient: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'gradient',
    gradient: true,
    color: 'primary',
    logo: <Logo />,
  },
};

export const Elevated: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'elevated',
    elevation: 8,
    logo: <Logo />,
    endContent: <EndContent />,
  },
};

export const Minimal: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'minimal',
    logo: <Logo />,
  },
};

export const Bordered: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'bordered',
    color: 'primary',
    logo: <Logo />,
  },
};

export const Sizes: Story = {
  render: () => (
    <Box>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size} sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Size: {size}
          </Typography>
          <Menubar items={sampleMenuItems} size={size} variant="bordered" logo={<Logo />} />
        </Box>
      ))}
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box>
      {(['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'] as const).map(
        (color) => (
          <Box key={color} sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Color: {color}
            </Typography>
            <Menubar items={sampleMenuItems} color={color} variant="elevated" logo={<Logo />} />
          </Box>
        ),
      )}
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 250, borderRight: 1, borderColor: 'divider' }}>
        <Menubar items={sampleMenuItems} orientation="vertical" variant="minimal" logo={<Logo />} />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h6">Content Area</Typography>
        <Typography variant="body2" color="text.secondary">
          Vertical menubar displayed on the left
        </Typography>
      </Box>
    </Box>
  ),
};

export const Sticky: Story = {
  render: () => (
    <Box>
      <Menubar
        items={sampleMenuItems}
        sticky
        variant="glass"
        glass
        blur
        logo={<Logo />}
        endContent={<EndContent />}
      />
      <Box sx={{ p: 3, height: '150vh' }}>
        <Typography variant="h4" gutterBottom>
          Scroll to see sticky behavior
        </Typography>
        <Typography variant="body1" paragraph>
          The menubar will stick to the top as you scroll down.
        </Typography>
        {[...Array(20)].map((_, i) => (
          <Typography key={i} variant="body2" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        ))}
      </Box>
    </Box>
  ),
};

export const Transparent: Story = {
  render: () => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
      }}
    >
      <Menubar
        items={sampleMenuItems}
        transparent
        variant="glass"
        glass
        blur
        logo={<Logo />}
        endContent={<EndContent />}
      />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Transparent Menubar
        </Typography>
      </Box>
    </Box>
  ),
};

export const WithEffects: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'glass',
    glow: true,
    pulse: true,
    glass: true,
    blur: true,
    color: 'primary',
    logo: <Logo />,
    endContent: <EndContent />,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    logo: <Logo />,
  },
};

export const Disabled: Story = {
  args: {
    items: sampleMenuItems,
    disabled: true,
    logo: <Logo />,
  },
};

export const CustomContent: Story = {
  render: () => {
    const customItems: MenubarItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <HomeIcon fontSize="small" />,
        action: () => {},
      },
    ];

    return (
      <Menubar
        items={customItems}
        variant="gradient"
        gradient
        color="secondary"
        logo={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1 }}>
                Admin Panel
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                v2.0.0
              </Typography>
            </Box>
          </Box>
        }
        endContent={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">John Doe</Typography>
            <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
          </Box>
        }
      />
    );
  },
};

// Required exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box>
      {(['default', 'glass', 'gradient', 'elevated', 'minimal', 'bordered'] as const).map(
        (variant) => (
          <Box key={variant} sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Variant: {variant}
            </Typography>
            <Menubar
              items={sampleMenuItems}
              variant={variant}
              logo={<Logo />}
              glass={variant === 'glass'}
              gradient={variant === 'gradient'}
            />
          </Box>
        ),
      )}
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size} sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Size: {size}
          </Typography>
          <Menubar items={sampleMenuItems} size={size} variant="bordered" logo={<Logo />} />
        </Box>
      ))}
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          State: Default
        </Typography>
        <Menubar items={sampleMenuItems} variant="default" logo={<Logo />} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          State: Loading
        </Typography>
        <Menubar items={[]} loading variant="default" logo={<Logo />} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          State: Disabled
        </Typography>
        <Menubar items={sampleMenuItems} disabled variant="default" logo={<Logo />} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          State: With Effects (glow, pulse)
        </Typography>
        <Menubar items={sampleMenuItems} variant="glass" glow pulse glass logo={<Logo />} />
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Interactive: Clickable with callbacks
        </Typography>
        <Menubar
          items={[
            {
              id: 'interactive',
              label: 'Click Me',
              action: () => {},
            },
          ]}
          variant="elevated"
          logo={<Logo />}
          onClick={() => {}}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Interactive: With focus management
        </Typography>
        <Menubar
          items={sampleMenuItems}
          variant="bordered"
          logo={<Logo />}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Interactive: With ripple effects
        </Typography>
        <Menubar items={sampleMenuItems} variant="default" ripple logo={<Logo />} />
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Responsive Design Examples
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Mobile View (full width, minimal)
        </Typography>
        <Box sx={{ maxWidth: '375px', border: 1, borderColor: 'divider' }}>
          <Menubar items={sampleMenuItems} variant="minimal" fullWidth logo={<Logo />} />
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Tablet View (with end content)
        </Typography>
        <Box sx={{ maxWidth: '768px', border: 1, borderColor: 'divider' }}>
          <Menubar
            items={sampleMenuItems}
            variant="elevated"
            logo={<Logo />}
            endContent={<EndContent />}
          />
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Desktop View (full features)
        </Typography>
        <Menubar
          items={sampleMenuItems}
          variant="glass"
          glass
          glow
          logo={<Logo />}
          endContent={<EndContent />}
        />
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack spacing={4}>
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Menubar items={sampleMenuItems.slice(0, 3)} />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Menubar items={sampleMenuItems.slice(0, 3)} />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Menubar items={sampleMenuItems.slice(0, 3)} />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
