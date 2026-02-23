import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { Command } from './Command';
import type { CommandItem,CommandProps } from './Command.types';

const meta: Meta<typeof Command> = {
  title: 'Form/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Command'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient', 'minimal', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

const sampleItems: CommandItem[] = [
  // Navigation
  {
    id: '1',
    label: 'Home',
    icon: <HomeIcon />,
    shortcut: '⌘H',
    category: 'Navigation',
    action: () => {
      /* Home action */
    },
    description: 'Navigate to home page',
  },
  {
    id: '2',
    label: 'Settings',
    icon: <SettingsIcon />,
    shortcut: '⌘,',
    category: 'Navigation',
    action: () => {
      /* Settings action */
    },
    description: 'Open application settings',
  },
  {
    id: '3',
    label: 'Profile',
    icon: <PersonIcon />,
    shortcut: '⌘P',
    category: 'Navigation',
    action: () => {
      /* Profile action */
    },
    description: 'View user profile',
  },

  // Actions
  {
    id: '4',
    label: 'Search',
    icon: <SearchIcon />,
    shortcut: '⌘K',
    category: 'Actions',
    action: () => {
      /* Search action */
    },
    description: 'Open search dialog',
  },
  {
    id: '5',
    label: 'Add New Item',
    icon: <AddIcon />,
    shortcut: '⌘N',
    category: 'Actions',
    action: () => {
      /* Add action */
    },
    description: 'Create a new item',
  },
  {
    id: '6',
    label: 'Edit',
    icon: <EditIcon />,
    shortcut: '⌘E',
    category: 'Actions',
    action: () => {
      /* Edit action */
    },
    description: 'Edit current selection',
  },
  {
    id: '7',
    label: 'Delete',
    icon: <DeleteIcon />,
    shortcut: '⌘⌫',
    category: 'Actions',
    action: () => {
      /* Delete action */
    },
    description: 'Delete current selection',
    keywords: ['remove', 'trash'],
  },

  // File Operations
  {
    id: '8',
    label: 'Save',
    icon: <SaveIcon />,
    shortcut: '⌘S',
    category: 'File',
    action: () => {
      /* Save action */
    },
    description: 'Save current document',
  },
  {
    id: '9',
    label: 'Open File',
    icon: <FileOpenIcon />,
    shortcut: '⌘O',
    category: 'File',
    action: () => {
      /* Open action */
    },
    description: 'Open existing file',
  },
  {
    id: '10',
    label: 'New Folder',
    icon: <FolderIcon />,
    shortcut: '⇧⌘N',
    category: 'File',
    action: () => {
      /* Folder action */
    },
    description: 'Create new folder',
  },

  // Disabled item for testing
  {
    id: '11',
    label: 'Disabled Action',
    icon: <EditIcon />,
    shortcut: '⌘D',
    category: 'Actions',
    disabled: true,
    description: 'This action is currently disabled',
  },
];

const CommandWrapper: React.FC<CommandProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <Command {...props} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    placeholder: 'Type a command or search...',
    showCategories: true,
    showShortcuts: true,
    showDescriptions: true,
  },
};

export const Glass: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    variant: 'glass',
    glow: true,
    placeholder: 'Type a command...',
    showCategories: true,
    showShortcuts: true,
  },
};

export const Gradient: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    variant: 'gradient',
    color: 'primary',
    placeholder: 'Search commands...',
    showCategories: true,
  },
};

export const WithPulse: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    variant: 'elevated',
    pulse: true,
    glow: true,
    color: 'secondary',
  },
};

export const Minimal: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    variant: 'minimal',
    showCategories: false,
    showShortcuts: false,
    showDescriptions: false,
  },
};

export const Loading: Story = {
  render: (args) => <CommandWrapper {...args} />,
  args: {
    loading: true,
    placeholder: 'Loading commands...',
  },
};

export const Empty: Story = {
  render: (args) => <CommandWrapper {...args} />,
  args: {
    items: [],
    emptyMessage: 'No commands available',
  },
};

const SizesComponent = () => {
  const [openSize, setOpenSize] = useState<string | null>(null);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <React.Fragment key={size}>
          <Button variant="outlined" onClick={() => setOpenSize(size)}>
            Size: {size.toUpperCase()}
          </Button>
          <Command
            open={openSize === size}
            onOpenChange={(open) => !open && setOpenSize(null)}
            items={sampleItems}
            size={size}
            placeholder={`Command palette (${size})`}
          />
        </React.Fragment>
      ))}
    </Box>
  );
};

export const Sizes: Story = {
  render: () => <SizesComponent />,
};

const ColorsComponent = () => {
  const [openColor, setOpenColor] = useState<string | null>(null);
  const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {colors.map((color) => (
        <React.Fragment key={color}>
          <Button variant="contained" color={color} onClick={() => setOpenColor(color)}>
            {color}
          </Button>
          <Command
            open={openColor === color}
            onOpenChange={(open) => !open && setOpenColor(null)}
            items={sampleItems}
            color={color}
            variant="glass"
            glow
          />
        </React.Fragment>
      ))}
    </Box>
  );
};

export const Colors: Story = {
  render: () => <ColorsComponent />,
};

export const CustomFilter: Story = {
  render: (args) => <CommandWrapper {...args} />,
  args: {
    items: sampleItems,
    customFilter: (item, search) => {
      // Custom filter that also searches shortcuts
      const searchLower = search.toLowerCase();
      return (
        item.label.toLowerCase().includes(searchLower) ||
        item.shortcut?.toLowerCase().includes(searchLower) ||
        false
      );
    },
    placeholder: 'Search by name or shortcut...',
  },
};

export const WithKeywords: Story = {
  render: (args) => {
    const itemsWithKeywords: CommandItem[] = sampleItems.map((item) => ({
      ...item,
      keywords: item.category ? [item.category.toLowerCase(), 'command'] : ['command'],
    }));

    return <CommandWrapper {...args} items={itemsWithKeywords} />;
  },
  args: {
    placeholder: 'Search with keywords...',
  },
};

const InteractiveComponent = () => {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const interactiveItems: CommandItem[] = sampleItems.map((item) => ({
    ...item,
    action: () => {
      setLastAction(`Executed: ${item.label}`);
    },
  }));

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Interactive Command
      </Button>
      {lastAction && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Last action: {lastAction}
        </Typography>
      )}
      <Command
        open={open}
        onOpenChange={setOpen}
        items={interactiveItems}
        onSelect={(item) => {
          if (item.action) {
            item.action();
          }
          setOpen(false);
        }}
      />
    </Box>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};

// Edge Cases
export const LongText: Story = {
  render: (args) => {
    const longTextItems: CommandItem[] = [
      {
        id: '1',
        label: 'This is a very long command label that might overflow in narrow containers',
        description:
          'This is an extremely long description that tests how the component handles text overflow and wrapping in the description area. It should be truncated or wrapped appropriately.',
        shortcut: '⌘⇧⌥⌃L',
        category: 'Long Text Examples',
        icon: <EditIcon />,
      },
      {
        id: '2',
        label: 'Another super long command name that tests the component limits',
        description: 'Short desc',
        shortcut: '⌘L',
        category: 'Very Long Category Name That Tests Overflow',
        icon: <SaveIcon />,
      },
    ];

    return <CommandWrapper {...args} items={longTextItems} />;
  },
  args: {
    size: 'sm',
    placeholder: 'Test long text handling...',
  },
};

export const ManyItems: Story = {
  render: (args) => {
    const manyItems: CommandItem[] = Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i}`,
      label: `Command ${i + 1}`,
      description: `Description for command ${i + 1}`,
      shortcut: `⌘${i + 1}`,
      category: `Category ${Math.floor(i / 10) + 1}`,
      icon: <SearchIcon />,
      action: () => {
        /* Command action */
      },
    }));

    return <CommandWrapper {...args} items={manyItems} />;
  },
  args: {
    placeholder: 'Search through many items...',
    maxHeight: 300,
  },
};

export const NoCategories: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    showCategories: false,
    placeholder: 'Flat list of commands...',
  },
};

export const NoShortcuts: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    showShortcuts: false,
    placeholder: 'Commands without shortcuts...',
  },
};

export const NoDescriptions: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    showDescriptions: false,
    placeholder: 'Minimal command view...',
  },
};

export const DisabledItems: Story = {
  render: (args) => {
    const disabledItems = sampleItems.map((item, index) => ({
      ...item,
      disabled: index % 2 === 0, // Disable every other item
    }));

    return <CommandWrapper {...args} items={disabledItems} />;
  },
  args: {
    placeholder: 'Mix of enabled and disabled items...',
  },
};

// Accessibility focused stories
export const AccessibilityTest: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    placeholder: 'Test keyboard navigation...',
    autoFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Test keyboard navigation: Use Tab, Arrow keys, Enter, and Escape. Component should be fully keyboard accessible.',
      },
    },
  },
};

export const HighContrast: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    variant: 'elevated',
    color: 'primary',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Test component visibility in high contrast and dark themes.',
      },
    },
  },
};

// Required exports for validation
export const AllVariants: Story = {
  render: function AllVariantsComponent() {
    const [openVariant, setOpenVariant] = useState<string | null>(null);
    const variants = ['default', 'glass', 'gradient', 'minimal', 'elevated'] as const;

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            <Button variant="outlined" onClick={() => setOpenVariant(variant)}>
              Variant: {variant}
            </Button>
            <Command
              open={openVariant === variant}
              onOpenChange={(open) => !open && setOpenVariant(null)}
              items={sampleItems}
              variant={variant}
              placeholder={`Command palette (${variant})`}
              showCategories={true}
              showShortcuts={true}
              glow={variant === 'glass'}
            />
          </React.Fragment>
        ))}
      </Box>
    );
  },
};

export const AllSizes = Sizes;
export const AllStates: Story = {
  render: function AllStatesComponent() {
    const [openState, setOpenState] = useState<string | null>(null);
    const states = ['default', 'loading', 'empty', 'disabled'] as const;

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {states.map((state) => (
          <React.Fragment key={state}>
            <Button variant="outlined" onClick={() => setOpenState(state)}>
              State: {state}
            </Button>
            <Command
              open={openState === state}
              onOpenChange={(open) => !open && setOpenState(null)}
              items={state === 'empty' ? [] : sampleItems}
              loading={state === 'loading'}
              disabled={state === 'disabled'}
              placeholder={`Command palette (${state})`}
            />
          </React.Fragment>
        ))}
      </Box>
    );
  },
};

export const InteractiveStates = Interactive;
export const Responsive: Story = {
  render: (args) => <CommandWrapper {...args} items={sampleItems} />,
  args: {
    placeholder: 'Responsive command palette...',
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
};

const DensityModesComponent = () => {
  const [openDensity, setOpenDensity] = useState<string | null>(null);
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
              Open Command
            </Button>
            <Command
              open={openDensity === density}
              onOpenChange={(open) => !open && setOpenDensity(null)}
              items={sampleItems.slice(0, 5)}
              placeholder={`${density} density...`}
              showCategories={true}
              showShortcuts={true}
            />
          </Box>
        </DensityProvider>
      ))}
    </Stack>
  );
};

export const DensityModes: Story = {
  render: () => <DensityModesComponent />,
};
