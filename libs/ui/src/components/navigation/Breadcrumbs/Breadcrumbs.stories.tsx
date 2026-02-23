import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  AccountTree,
  Analytics,
  Article,
  Category,
  CloudUpload,
  Code,
  Dashboard,
  Folder,
  Home,
  Security,
  Settings,
  Storage,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem } from './Breadcrumbs.types';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A sophisticated breadcrumb navigation component with glass morphism effects, smooth animations, and comprehensive accessibility features.

## Features
- **Glass Morphism**: Beautiful frosted glass effect with backdrop blur
- **Multiple Variants**: Default, glass, elevated, and outlined styles
- **Separator Types**: Arrow, chevron, slash, dot, and pipe separators
- **Responsive Design**: Intelligent collapsing on mobile devices
- **Dark Mode Support**: Seamless adaptation to light and dark themes
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- **Smooth Animations**: Elegant hover and transition effects
- **Mobile Optimized**: Touch-friendly with collapsible menu options
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
  },
  tags: ['autodocs', 'component:Breadcrumbs', 'checked'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'elevated', 'outlined'],
      description: 'Visual style of the breadcrumb container',
      table: {
        category: 'Appearance',
      },
    },
    separatorType: {
      control: 'select',
      options: ['default', 'slash', 'arrow', 'chevron', 'dot', 'pipe'],
      description: 'Type of separator between breadcrumb items',
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the breadcrumb text and icons',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Color scheme for separators and accents',
      table: {
        category: 'Appearance',
      },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Shadow elevation for glass and elevated variants',
      table: {
        category: 'Appearance',
      },
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'Whether to show a home icon for the first item',
      table: {
        category: 'Behavior',
      },
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to display before collapsing',
      table: {
        category: 'Behavior',
      },
    },
    mobileMaxItems: {
      control: 'number',
      description: 'Maximum number of items to display on mobile',
      table: {
        category: 'Behavior',
      },
    },
    collapseBehavior: {
      control: 'select',
      options: ['menu', 'ellipsis'],
      description: 'How to handle collapsed items',
      table: {
        category: 'Behavior',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ minWidth: 400, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Electronics', href: '#' },
  { label: 'Laptops' },
];

const itemsWithIcons = [
  { label: 'Dashboard', href: '#', icon: <Dashboard fontSize="small" /> },
  { label: 'Projects', href: '#', icon: <Folder fontSize="small" /> },
  { label: 'Settings', href: '#', icon: <Settings fontSize="small" /> },
  { label: 'Profile' },
];

// Default variant showcase
export const Default: Story = {
  args: {
    items: basicItems,
    variant: 'default',
    separatorType: 'default',
    size: 'md',
  },
};

// Glass morphism showcase - the star of the show
export const GlassMorphism: Story = {
  args: {
    items: itemsWithIcons,
    variant: 'glass',
    separatorType: 'chevron',
    size: 'md',
    elevation: 2,
  },
  parameters: {
    backgrounds: { default: 'gradient' },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 4,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

// Elevated card-like appearance
export const Elevated: Story = {
  args: {
    items: basicItems,
    variant: 'elevated',
    separatorType: 'arrow',
    size: 'md',
    elevation: 3,
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    items: basicItems,
    variant: 'outlined',
    separatorType: 'slash',
    size: 'md',
  },
};

// Separator types showcase
export const SeparatorTypes: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Default Separator
        </Typography>
        <Breadcrumbs items={items} separatorType="arrow" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Chevron Separator
        </Typography>
        <Breadcrumbs items={items} separatorType="chevron" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Slash Separator
        </Typography>
        <Breadcrumbs items={items} separatorType="slash" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Dot Separator
        </Typography>
        <Breadcrumbs items={items} separatorType="dot" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Pipe Separator
        </Typography>
        <Breadcrumbs items={items} separatorType="pipe" />
      </Box>
    </Stack>
  ),
};

// Size variations - Required story export
export const AllSizes: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Small Size
        </Typography>
        <Breadcrumbs items={items} size="sm" variant="glass" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Medium Size (Default)
        </Typography>
        <Breadcrumbs items={items} size="md" variant="glass" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Large Size
        </Typography>
        <Breadcrumbs items={items} size="lg" variant="glass" />
      </Box>
    </Stack>
  ),
};

// Color variations
export const ColorVariations: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Default Color
        </Typography>
        <Breadcrumbs items={items} color="default" variant="elevated" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Primary Color
        </Typography>
        <Breadcrumbs items={items} color="primary" variant="elevated" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Secondary Color
        </Typography>
        <Breadcrumbs items={items} color="secondary" variant="elevated" />
      </Box>
    </Stack>
  ),
};

// Import needed for the interactive example

// Interactive example with click handlers
export const Interactive: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => {
    const InteractiveBreadcrumbs = () => {
      const [path, setPath] = useState(items.map((item) => item.label));

      const mappedItems: BreadcrumbItem[] = path.map((label, index) => ({
        label,
        href: '#',
        onClick: (e) => {
          e.preventDefault();
          if (index < path.length - 1) {
            setPath(path.slice(0, index + 1));
          }
        },
        tooltip: index < path.length - 1 ? `Navigate to ${label}` : undefined,
      }));

      return (
        <Stack spacing={3}>
          <Breadcrumbs items={mappedItems} variant="glass" separatorType="chevron" showHomeIcon />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setPath([...path, 'Gaming'])}
              disabled={path.length >= 6}
            >
              Add Level
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setPath(path.slice(0, -1))}
              disabled={path.length <= 1}
            >
              Remove Level
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setPath(['Home', 'Products', 'Electronics', 'Laptops'])}
            >
              Reset
            </Button>
          </Box>
        </Stack>
      );
    };

    return <InteractiveBreadcrumbs />;
  },
};

// Dark mode showcase
export const DarkMode: Story = {
  args: {
    items: itemsWithIcons,
    variant: 'glass',
    separatorType: 'arrow',
    size: 'md',
    elevation: 2,
  },
  decorators: [
    (Story) => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: 150 }}>
            <Story />
          </Box>
        </ThemeProvider>
      );
    },
  ],
};

// Responsive behavior - Required story export
export const Responsive: Story = {
  args: {
    items: [
      { label: 'Home', href: '#', icon: <Home fontSize="small" /> },
      { label: 'Documents', href: '#', icon: <Article fontSize="small" /> },
      { label: 'Projects', href: '#', icon: <AccountTree fontSize="small" /> },
      { label: 'Development', href: '#', icon: <Code fontSize="small" /> },
      { label: 'Cloud', href: '#', icon: <CloudUpload fontSize="small" /> },
      { label: 'Analytics', href: '#', icon: <Analytics fontSize="small" /> },
      { label: 'Security', href: '#', icon: <Security fontSize="small" /> },
      { label: 'Current Page' },
    ],
    variant: 'glass',
    separatorType: 'chevron',
    mobileMaxItems: 3,
    collapseBehavior: 'menu',
    elevation: 2,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Accessibility showcase
export const Accessibility: Story = {
  args: {
    items: basicItems.map((item, index) => ({
      ...item,
      ariaLabel: `Navigate to ${item.label}`,
      tooltip:
        index < basicItems.length - 1
          ? `Go to ${item.label} section`
          : `Currently viewing ${item.label}`,
    })),
    variant: 'elevated',
    separatorType: 'arrow',
    size: 'lg',
    ariaLabel: 'Main navigation breadcrumb',
  },
};

// Complex navigation path
export const ComplexPath: Story = {
  args: {
    items: [
      { label: 'Organization', href: '#', icon: <Storage fontSize="small" /> },
      { label: 'Departments', href: '#', icon: <Category fontSize="small" /> },
      { label: 'Engineering', href: '#', icon: <Code fontSize="small" /> },
      { label: 'Frontend', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Navigation', href: '#' },
      { label: 'Breadcrumbs', href: '#' },
      { label: 'Documentation' },
    ],
    variant: 'glass',
    separatorType: 'chevron',
    maxItems: 5,
    collapseBehavior: 'menu',
    elevation: 2,
  },
};

// All variants showcase
export const AllVariants: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => (
    <Stack spacing={4}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Default Variant
        </Typography>
        <Breadcrumbs items={items} variant="default" />
      </Paper>

      <Paper
        sx={{
          p: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
          Glass Morphism Variant
        </Typography>
        <Breadcrumbs items={itemsWithIcons} variant="glass" elevation={2} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Elevated Variant
        </Typography>
        <Breadcrumbs items={items} variant="elevated" elevation={3} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Outlined Variant
        </Typography>
        <Breadcrumbs items={items} variant="outlined" />
      </Paper>
    </Stack>
  ),
};

// All interactive states - Required story export
export const AllStates: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Default State
        </Typography>
        <Breadcrumbs items={items} variant="glass" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Hover State (simulate)
        </Typography>
        <Breadcrumbs
          items={items.map((item) => ({
            ...item,
            sx: { '&:hover': { backgroundColor: 'action.hover' } },
          }))}
          variant="glass"
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Focus State
        </Typography>
        <Breadcrumbs
          items={items}
          variant="elevated"
          sx={{
            '& .MuiBreadcrumbs-ol > li:first-of-type a': { outline: '2px solid primary.main' },
          }}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Collapsed State
        </Typography>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Electronics', href: '#' },
            { label: 'Computers', href: '#' },
            { label: 'Laptops', href: '#' },
            { label: 'Gaming', href: '#' },
            { label: 'Current' },
          ]}
          variant="glass"
          maxItems={3}
          collapseBehavior="menu"
        />
      </Box>
    </Stack>
  ),
};

// Interactive states - Required story export
export const InteractiveStates: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => {
    const InteractiveDemo = () => {
      const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
      const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

      const interactiveItems = items.map((item, index) => ({
        ...item,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          setActiveIndex(index);
          window.setTimeout(() => setActiveIndex(null), 200);
        },
        onMouseEnter: () => setHoveredIndex(index),
        onMouseLeave: () => setHoveredIndex(null),
        onFocus: () => setFocusedIndex(index),
        onBlur: () => setFocusedIndex(null),
        sx: {
          transition: 'all 0.2s ease-in-out',
          ...(hoveredIndex === index && {
            backgroundColor: 'action.hover',
            transform: 'scale(1.02)',
          }),
          ...(focusedIndex === index && {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          }),
          ...(activeIndex === index && {
            backgroundColor: 'action.selected',
            transform: 'scale(0.98)',
          }),
        },
      }));

      return (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Hover, focus, and click on breadcrumb items to see interactive states
          </Typography>
          <Breadcrumbs
            items={interactiveItems}
            variant="glass"
            separatorType="chevron"
            elevation={2}
          />
        </Stack>
      );
    };

    return <InteractiveDemo />;
  },
};

// Performance test with many items
export const StressTest: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      label: `Level ${i + 1}`,
      href: '#',
      tooltip: `This is level ${i + 1} of the navigation`,
    })),
    variant: 'glass',
    separatorType: 'chevron',
    maxItems: 5,
    collapseBehavior: 'menu',
    elevation: 2,
  },
};

export const DensityModes: Story = {
  args: {
    items: basicItems,
  },
  render: ({ items }) => {

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Breadcrumbs items={items} size="sm" variant="glass" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Breadcrumbs items={items} size="md" variant="glass" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Breadcrumbs items={items} size="lg" variant="glass" />
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
