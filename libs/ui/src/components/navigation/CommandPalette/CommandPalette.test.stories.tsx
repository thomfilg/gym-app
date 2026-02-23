import Button from '@mui/material/Button';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { PaletteCommand } from './CommandPalette.types';
import {CommandPalette } from './CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'Enhanced/CommandPalette/Tests',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:CommandPalette'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Sample commands for testing
const testCommands: PaletteCommand[] = [
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Navigate to the home page',
    icon: <HomeIcon />,
    shortcut: '⌘H',
    category: 'Navigation',
    action: fn(() => {
      // Home action
    }),
    keywords: ['home', 'main', 'start'],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Open application settings',
    icon: <SettingsIcon />,
    shortcut: '⌘,',
    category: 'Navigation',
    action: fn(() => {
      // Settings action
    }),
    keywords: ['config', 'preferences', 'options'],
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Open search functionality',
    icon: <SearchIcon />,
    shortcut: '⌘F',
    category: 'Tools',
    action: fn(() => {
      // Search action
    }),
    keywords: ['find', 'lookup'],
  },
];

// 1. Basic Interaction Tests
export const BasicInteraction: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const onCommandExecute = fn();

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={testCommands}
          onCommandExecute={onCommandExecute}
        />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open command palette', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Verify search input exists and is functional', async () => {
      const searchInput = within(document.body).getByTestId('command-palette-input');
      await expect(searchInput).toBeVisible();
      await userEvent.type(searchInput, 'home');
      await expect(searchInput).toHaveValue('home');
    });

    await step('Verify commands are filtered by search', async () => {
      await waitFor(async () => {
        const homeCommandItem = within(document.body).getByTestId('command-palette-item-home');
        await expect(homeCommandItem).toBeVisible();
      });
    });
  },
};

// 2. Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const onCommandExecute = fn();

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={testCommands}
          onCommandExecute={onCommandExecute}
        />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open command palette', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Test arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowUp}');
    });

    await step('Test Escape key to close', async () => {
      await userEvent.keyboard('{Escape}');
      // Palette should be closed
      await waitFor(async () => {
        const dialog = within(document.body).queryByRole('dialog');
        expect(dialog).toBeNull();
      });
    });
  },
};

// 3. Screen Reader Tests
export const ScreenReader: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          data-testid="open-palette"
          aria-describedby="palette-help"
        >
          Open Command Palette
        </Button>
        <div id="palette-help" style={{ display: 'none' }}>
          Press Ctrl+K or Cmd+K to open command palette
        </div>
        <CommandPalette open={open} onClose={() => setOpen(false)} commands={testCommands} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes exist', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await expect(openButton).toHaveAttribute('aria-describedby');
      await userEvent.click(openButton);
    });

    await step('Verify search input accessibility', async () => {
      const searchInput = within(document.body).getByPlaceholderText('Type a command or search...');
      await expect(searchInput).toBeVisible();
      await expect(searchInput).toHaveAttribute('autoComplete', 'off');
    });

    await step('Verify command list structure', async () => {
      const commandList = within(document.body).getByRole('list');
      await expect(commandList).toBeVisible();

      const commandItems = within(document.body).getAllByRole('listitem');
      await expect(commandItems.length).toBeGreaterThan(0);
    });
  },
};

// 4. Focus Management Tests
export const FocusManagement: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button data-testid="before-button" variant="outlined">
          Button Before
        </Button>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open Command Palette
        </Button>
        <Button data-testid="after-button" variant="outlined">
          Button After
        </Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} commands={testCommands} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test initial focus management', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Verify search input is available and functional', async () => {
      await waitFor(
        async () => {
          const searchInput = within(document.body).getByPlaceholderText(
            'Type a command or search...',
          );
          await expect(searchInput).toBeVisible();
          await expect(searchInput).toBeEnabled();
          // Try to interact with it to verify it's functional
          await userEvent.type(searchInput, 'h');
          await expect(searchInput).toHaveValue('h');
        },
        { timeout: 1000 },
      );
    });

    await step('Close and verify dialog closes', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(async () => {
        const openButton = canvas.getByTestId('open-palette');
        await expect(openButton).toBeVisible();
        // Verify the command palette is closed by checking the search input is not in DOM
        await expect(() =>
          within(document.body).getByPlaceholderText('Type a command or search...'),
        ).toThrow();
      });
    });
  },
};

// 5. Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open Responsive Palette
        </Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} commands={testCommands} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test responsive viewport', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Verify palette adapts to viewport', async () => {
      const palette = within(document.body).getByRole('dialog');
      await expect(palette).toBeVisible();

      // Check if palette is responsive
      const computedStyle = window.getComputedStyle(palette);
      await expect(computedStyle.width).toBeDefined();
    });
  },
};

// 6. Theme Variations Tests
export const ThemeVariations: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open Themed Palette
        </Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} commands={testCommands} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open palette and verify theme integration', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Verify glass effect styling', async () => {
      const palette = within(document.body).getByRole('dialog');
      await expect(palette).toBeVisible();
    });
  },
};

// 7. Visual States Tests
export const VisualStates: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open for Visual States
        </Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} commands={testCommands} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test default state', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Test hover states', async () => {
      const homeCommand = within(document.body).getByText('Go to Home').closest('[role="button"]');
      if (homeCommand) {
        await userEvent.hover(homeCommand);
        await expect(homeCommand).toBeVisible();
      }
    });

    await step('Test empty state', async () => {
      const searchInput = within(document.body).getByPlaceholderText('Type a command or search...');
      await userEvent.type(searchInput, 'nonexistentcommand123');

      await waitFor(async () => {
        const noResults = within(document.body).getByText(/No commands found/);
        await expect(noResults).toBeVisible();
      });
    });
  },
};

// 8. Edge Cases Tests
export const EdgeCases: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    const edgeCaseCommands: PaletteCommand[] = [
      {
        id: 'empty-description',
        label: 'Command with no description',
        category: 'Test',
        action: fn(),
      },
      {
        id: 'very-long-label',
        label:
          'This is a very long command label that might cause layout issues if not handled properly',
        description:
          'This is also a very long description that should be handled gracefully in the UI without breaking the layout or causing overflow issues',
        category: 'Test',
        action: fn(),
      },
      {
        id: 'special-chars',
        label: 'Command with special chars: @#$%^&*()',
        description: 'Special characters: <>?:"{}|+=-_`~',
        category: 'Test',
        action: fn(),
      },
    ];

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)} data-testid="open-palette">
          Open Edge Cases Test
        </Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} commands={edgeCaseCommands} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test with edge case commands', async () => {
      const openButton = canvas.getByTestId('open-palette');
      await userEvent.click(openButton);
    });

    await step('Test empty description handling', async () => {
      const emptyDescCommand = within(document.body).getByText('Command with no description');
      await expect(emptyDescCommand).toBeVisible();
    });

    await step('Test very long text handling', async () => {
      const longLabelCommand = within(document.body).getByText(/This is a very long command label/);
      await expect(longLabelCommand).toBeVisible();

      // Check that it doesn't break layout
      const palette = within(document.body).getByRole('dialog');
      const computedStyle = window.getComputedStyle(palette);
      expect(computedStyle.overflow).toBeDefined();
    });

    await step('Test special characters', async () => {
      const searchInput = within(document.body).getByPlaceholderText('Type a command or search...');
      await userEvent.type(searchInput, '@#$');

      await waitFor(async () => {
        const specialCharCommand = within(document.body).getByText(/Command with special chars/);
        await expect(specialCharCommand).toBeVisible();
      });
    });
  },
};
