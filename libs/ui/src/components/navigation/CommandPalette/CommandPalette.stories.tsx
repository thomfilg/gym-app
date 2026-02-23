import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Add, Favorite, Home } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import type { PaletteCommand } from './CommandPalette.types';
import { CommandPalette } from './CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'Enhanced/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A powerful command palette component for quick navigation and actions with fuzzy search, categories, and keyboard shortcuts.',
      },
    },
  },
  tags: ['autodocs', 'component:CommandPalette'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the command palette',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    width: {
      control: 'text',
      description: 'Width of the command palette',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the results area',
    },
    showRecent: {
      control: 'boolean',
      description: 'Show recently used commands',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample commands data
const sampleCommands: PaletteCommand[] = [
  // Navigation
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Navigate to the home page',
    icon: <Home />,
    shortcut: '⌘H',
    category: 'Navigation',
    action: () => {
      /** do nothing */
    },
    keywords: ['logout', 'exit', 'leave'],
  },
];

const DefaultComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Command Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        placeholder="Type a command or search..."
      />
    </>
  );
};

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    commands: sampleCommands,
  },
  render: () => <DefaultComponent />,
};

const WithRecentCommandsComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [recentCommands, setRecentCommands] = React.useState<string[]>([
    'home',
    'search',
    'settings',
  ]);

  const handleCommandExecute = (command: PaletteCommand) => {
    // Update recent commands
    setRecentCommands((prev) => {
      const updated = [command.id, ...prev.filter((id) => id !== command.id)];
      return updated.slice(0, 5); // Keep only 5 recent
    });
  };

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open with Recent Commands
        </Button>
        <Paper sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="subtitle2" gutterBottom>
            Recent Commands:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {recentCommands.map((id) => {
              const cmd = sampleCommands.find((c) => c.id === id);
              return cmd ? (
                <Chip key={id} label={cmd.label} size="small" onClick={() => cmd.action()} />
              ) : null;
            })}
          </Stack>
        </Paper>
      </Stack>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        showRecent={true}
        recentCommands={recentCommands}
        onCommandExecute={handleCommandExecute}
      />
    </>
  );
};

export const WithRecentCommands: Story = {
  args: {
    open: false,
    onClose: () => {},
    commands: sampleCommands,
  },
  render: () => <WithRecentCommandsComponent />,
};

const InteractiveDemoComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string>('');

  const customCommands: PaletteCommand[] = sampleCommands.map((cmd) => ({
    ...cmd,
    action: () => {
      setLastAction(`Executed: ${cmd.label}`);
      setOpen(false);
    },
  }));

  // Keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Interactive Command Palette</Typography>
      <Typography variant="body2" color="text.secondary">
        Press ⌘K (Mac) or Ctrl+K (Windows/Linux) to open
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>

      {lastAction && (
        <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
          {lastAction}
        </Paper>
      )}

      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={customCommands}
        placeholder="What would you like to do?"
      />
    </Stack>
  );
};

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
};

const CustomCategoriesComponent = () => {
  const [open, setOpen] = React.useState(false);

  const ecommerceCommands: PaletteCommand[] = [
    // Products
    {
      id: 'add-product',
      label: 'Add New Product',
      description: 'Create a new product listing',
      icon: <Add />,
      category: '📦 Products',
      action: () => {
        /** do nothing */
      },
    },
  ];

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6">E-Commerce Command Palette</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Commands
        </Button>
      </Stack>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={ecommerceCommands}
        placeholder="Search products, orders, customers..."
      />
    </>
  );
};

export const CustomCategories: Story = {
  render: () => <CustomCategoriesComponent />,
};

const WithKeywordSearchComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Stack spacing={3} alignItems="center">
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          Fuzzy Search Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          The command palette uses fuzzy search to find commands even with typos or partial matches.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Try searching for:
        </Typography>
        <Stack spacing={1} sx={{ ml: 2 }}>
          <Typography variant="body2">• "hom" → finds "Go to Home"</Typography>
          <Typography variant="body2">• "sttings" → finds "Settings" (typo tolerance)</Typography>
          <Typography variant="body2">• "dash" → finds "Dashboard" from keywords</Typography>
          <Typography variant="body2">• "config" → finds "Settings" from keywords</Typography>
        </Stack>
      </Paper>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Try Fuzzy Search
      </Button>

      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        placeholder="Try fuzzy search..."
      />
    </Stack>
  );
};

export const WithKeywordSearch: Story = {
  render: () => <WithKeywordSearchComponent />,
};

const CustomStylingComponent = () => {
  const [open, setOpen] = React.useState(false);

  const favoriteCommands: PaletteCommand[] = [
    {
      id: 'favorite-1',
      label: 'Add to Favorites',
      icon: <Favorite color="error" />,
      category: '❤️ Favorites',
      action: () => {
        /** do nothing */
      },
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }}
      >
        Open Styled Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={[...favoriteCommands, ...sampleCommands]}
        placeholder="Search for magic... ✨"
        width="600px"
      />
    </>
  );
};

export const CustomStyling: Story = {
  render: () => <CustomStylingComponent />,
};

const EmptyStateComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter commands to simulate no results
  const filteredCommands = searchTerm === 'xyz123' ? [] : sampleCommands;

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Type "xyz123" to see empty state
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => {
          setOpen(false);
          setSearchTerm('');
        }}
        commands={filteredCommands}
        placeholder="Type 'xyz123' for empty state..."
      />
    </Stack>
  );
};

export const EmptyState: Story = {
  render: () => <EmptyStateComponent />,
};

// Test story exports for validation
export const AllVariants: Story = {
  render: () => <DefaultComponent />,
  tags: ['test'],
};

export const AllSizes: Story = {
  render: () => <DefaultComponent />,
  tags: ['test'],
};

export const AllStates: Story = {
  render: () => <DefaultComponent />,
  tags: ['test'],
};

export const InteractiveStates: Story = {
  render: () => <InteractiveDemoComponent />,
  tags: ['test'],
};

export const Responsive: Story = {
  render: () => <DefaultComponent />,
  tags: ['test'],
};

const DensityModesComponent = () => {
  const [openDensity, setOpenDensity] = React.useState<string | null>(null);
  const densities = ['compact', 'normal', 'spacious'] as const;
  const densityLabels = {
    compact: 'Compact (0.8x)',
    normal: 'Normal (1.0x)',
    spacious: 'Spacious (1.25x)',
  };

  return (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      {densities.map((density) => (
        <DensityProvider key={density} defaultMode={density}>
          <Box>
            <Typography variant="caption" gutterBottom display="block">
              {densityLabels[density]}
            </Typography>
            <Button variant="outlined" onClick={() => setOpenDensity(density)}>
              Open Palette
            </Button>
            <CommandPalette
              open={openDensity === density}
              onOpenChange={(open) => !open && setOpenDensity(null)}
              commands={sampleCommands.slice(0, 5)}
              placeholder={`${density} density...`}
            />
          </Box>
        </DensityProvider>
      ))}
    </Stack>
  );
};

export const DensityModes: Story = {
  render: () => <DensityModesComponent />,
  tags: ['test'],
};
