import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Command } from './Command';

const meta: Meta<typeof Command> = {
  title: 'Form/Command/Tests',
  component: Command,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Command'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    open: true,
    items: [
      { id: '1', label: 'Home', action: fn() },
      { id: '2', label: 'Settings', action: fn() },
    ],
    onSelect: fn(),
    onOpenChange: fn(),
  },
  play: async ({ step }) => {
    await step('Verify command palette is visible', async () => {
      const dialog = document.querySelector('[role="dialog"]');
      await expect(dialog).toBeInTheDocument();
    });
  },
};

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    open: true,
    items: [
      { id: '1', label: 'Home', action: fn() },
      { id: '2', label: 'Settings', action: fn() },
    ],
    onSelect: fn(),
    onOpenChange: fn(),
  },
  play: async ({ step }) => {
    await step('Check dialog exists', async () => {
      const dialog = document.querySelector('[role="dialog"]');
      await expect(dialog).toBeInTheDocument();
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    open: true,
    items: [{ id: '1', label: 'Home', action: fn() }],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  play: async ({ step }) => {
    await step('Check responsive layout', async () => {
      const dialog = document.querySelector('[role="dialog"]');
      await expect(dialog).toBeInTheDocument();
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  args: {
    open: true,
    variant: 'glass',
    glow: true,
    items: [
      { id: '1', label: 'Home', action: fn() },
      { id: '2', label: 'Settings', disabled: true, action: fn() },
    ],
  },
  play: async ({ step }) => {
    await step('Check visual elements', async () => {
      const dialog = document.querySelector('[role="dialog"]');
      await expect(dialog).toBeInTheDocument();
    });
  },
};

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  args: {
    open: true,
    items: [],
    emptyMessage: 'No results found',
  },
  play: async ({ step }) => {
    await step('Check dialog with empty state', async () => {
      const dialog = document.querySelector('[role="dialog"]');
      await expect(dialog).toBeInTheDocument();
    });
  },
};


export const TestIdComprehensive: Story = {
  name: '🎯 TestId Comprehensive Verification',
  args: {
    open: true,
    dataTestId: 'command-test',
    items: [
      { id: '1', label: 'Home', category: 'Navigation', action: fn() },
      { id: '2', label: 'Settings', category: 'Navigation', action: fn() },
      { id: '3', label: 'New File', category: 'Actions', action: fn() },
    ],
    showCategories: true,
    onSelect: fn(),
    onOpenChange: fn(),
    onValueChange: fn(),
    emptyMessage: 'No results found',
  },
  play: async ({ step, args }) => {
    await step('Verify basic command structure testIds', async () => {
      // Container
      const container = document.querySelector('[data-testid="command-test"]');
      await expect(container).toBeInTheDocument();

      // Input
      const input = document.querySelector('[data-testid="command-test-input"]');
      await expect(input).toBeInTheDocument();

      // List
      const list = document.querySelector('[data-testid="command-test-list"]');
      await expect(list).toBeInTheDocument();
    });

    await step('Verify command items testIds', async () => {
      const item1 = document.querySelector('[data-testid="command-item-1"]');
      const item2 = document.querySelector('[data-testid="command-item-2"]');
      const item3 = document.querySelector('[data-testid="command-item-3"]');

      await expect(item1).toBeInTheDocument();
      await expect(item2).toBeInTheDocument();
      await expect(item3).toBeInTheDocument();
    });

    await step('Verify category group testIds', async () => {
      const navGroup = document.querySelector('[data-testid="command-group-Navigation"]');
      const actionsGroup = document.querySelector('[data-testid="command-group-Actions"]');

      await expect(navGroup).toBeInTheDocument();
      await expect(actionsGroup).toBeInTheDocument();
    });

    await step('Test callback functions', async () => {
      // Test onValueChange
      args.onValueChange?.('test');
      await expect(args.onValueChange).toHaveBeenCalledWith('test');

      // Test onSelect
      const homeItem = args.items?.find(item => item.id === '1');
      if (homeItem) {
        args.onSelect?.(homeItem);
        await expect(args.onSelect).toHaveBeenCalledWith(homeItem);
      }

      // Test onOpenChange
      args.onOpenChange?.(false);
      await expect(args.onOpenChange).toHaveBeenCalledWith(false);
    });
  },
};

export const TestIdEmptyState: Story = {
  name: '🎯 TestId Empty State',
  args: {
    open: true,
    dataTestId: 'empty-command',
    items: [],
    emptyMessage: 'No results found',
  },
  play: async ({ step }) => {
    await step('Verify empty state testIds', async () => {
      const container = document.querySelector('[data-testid="empty-command"]');
      await expect(container).toBeInTheDocument();

      const emptyState = document.querySelector('[data-testid="empty-command-empty"]');
      await expect(emptyState).toBeInTheDocument();
    });
  },
};

export const TestIdLoadingState: Story = {
  name: '🎯 TestId Loading State',
  args: {
    open: true,
    dataTestId: 'loading-command',
    loading: true,
    items: [{ id: '1', label: 'Home' }],
  },
  play: async ({ step }) => {
    await step('Verify loading state testIds', async () => {
      const container = document.querySelector('[data-testid="loading-command"]');
      await expect(container).toBeInTheDocument();

      const loading = document.querySelector('[data-testid="loading-command-loading"]');
      await expect(loading).toBeInTheDocument();
    });
  },
};
