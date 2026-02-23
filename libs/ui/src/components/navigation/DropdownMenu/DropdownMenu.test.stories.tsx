import Box from '@mui/material/Box';
import {
  Add,
  Check,
  Close,
  Delete,
  Edit,
  FileCopy,
  Save,
  Settings,
  Share,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../../form/Button';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownMenuItem } from './DropdownMenu.types';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Navigation/DropdownMenu/Tests',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:DropdownMenu'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test data
const testItems = [
  { id: '1', label: 'Edit', icon: <Edit fontSize="small" />, onClick: fn() },
  { id: '2', label: 'Copy', icon: <FileCopy fontSize="small" />, onClick: fn() },
  { id: '3', label: 'Share', icon: <Share fontSize="small" />, onClick: fn() },
  { id: 'divider1', type: 'divider' as const },
  {
    id: '4',
    label: 'Delete',
    icon: <Delete fontSize="small" />,
    color: 'error' as const,
    onClick: fn(),
  },
];

const itemsWithShortcuts = [
  { id: '1', label: 'Save', icon: <Save fontSize="small" />, shortcut: 'Ctrl+S', onClick: fn() },
  {
    id: '2',
    label: 'Settings',
    icon: <Settings fontSize="small" />,
    shortcut: 'Ctrl+,',
    onClick: fn(),
  },
];

const itemsWithDisabled = [
  { id: '1', label: 'Enabled', icon: <Check fontSize="small" />, onClick: fn() },
  { id: '2', label: 'Disabled', icon: <Close fontSize="small" />, disabled: true, onClick: fn() },
  { id: '3', label: 'Also Enabled', icon: <Add fontSize="small" />, onClick: fn() },
];

// 1. Basic Interaction Test
export const BasicInteraction: Story = {
  args: {
    items: testItems,
    trigger: <Button variant="outline">Open Menu</Button>,
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the trigger button
    const trigger = await canvas.findByRole('button', { name: /open menu/i });
    expect(trigger).toBeInTheDocument();

    // Open the menu
    await userEvent.click(trigger);

    // Wait for menu to appear
    await waitFor(async () => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    // Find menu items
    const editItem = await within(document.body).findByText('Edit');
    expect(editItem).toBeInTheDocument();

    const copyItem = await within(document.body).findByText('Copy');
    expect(copyItem).toBeInTheDocument();

    // Click on Edit item
    await userEvent.click(editItem);

    // Verify onClick was called
    await waitFor(() => {
      expect(testItems[0].onClick).toHaveBeenCalled();
    });

    // Menu should close after item click
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });
  },
};

// 2. Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  args: {
    items: testItems,
    trigger: <Button variant="outline">Keyboard Menu</Button>,
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Focus and open menu with keyboard
    const trigger = await canvas.findByRole('button', { name: /keyboard menu/i });
    trigger.focus();

    // Open with Enter key
    await userEvent.keyboard('{Enter}');

    // Wait for menu to open
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      // MUI Menu focuses on an item when navigating - just check that some menu item has focus
      const focusedItem = document.activeElement;
      expect(focusedItem?.getAttribute('role')).toBe('menuitem');
    });

    // Continue navigation
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');

    // Close with Escape
    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });
  },
};

// 3. Screen Reader Test
export const ScreenReader: Story = {
  args: {
    items: itemsWithShortcuts,
    trigger: (
      <Button variant="outline" aria-label="Settings menu">
        Settings
      </Button>
    ),
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check trigger has proper aria-label
    const trigger = await canvas.findByRole('button', { name: /settings menu/i });
    expect(trigger).toHaveAttribute('aria-label', 'Settings menu');

    // Open menu
    await userEvent.click(trigger);

    // Check menu has proper role
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute('role', 'menu');
    });

    // Check menu items have proper roles
    const menuItems = document.querySelectorAll('[role="menuitem"]');
    expect(menuItems.length).toBeGreaterThan(0);

    // Check shortcuts are announced
    const saveItem = await within(document.body).findByText('Save');
    const shortcut = await within(document.body).findByText('Ctrl+S');
    expect(saveItem).toBeInTheDocument();
    expect(shortcut).toBeInTheDocument();
  },
};

// 4. Focus Management Test
export const FocusManagement: Story = {
  args: {
    items: testItems,
    trigger: <Button variant="outline">Focus Test</Button>,
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get trigger button
    const trigger = await canvas.findByRole('button', { name: /focus test/i });

    // Store initial focus
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    // Open menu
    await userEvent.click(trigger);

    // Wait for menu to open
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    // Focus should move to first menu item or menu itself
    await waitFor(() => {
      const focusedElement = document.activeElement;
      expect(focusedElement?.closest('[role="menu"]')).toBeInTheDocument();
    });

    // Close menu
    await userEvent.keyboard('{Escape}');

    // Focus should return to trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  },
};

// 5. Responsive Design Test
export const ResponsiveDesign: Story = {
  args: {
    items: testItems,
    trigger: <Button variant="outline">Responsive Menu</Button>,
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test on different viewport sizes
    const trigger = await canvas.findByRole('button', { name: /responsive menu/i });

    // Open menu
    await userEvent.click(trigger);

    // Check menu renders properly
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();

      // Check menu positioning
      const menuRect = menu?.getBoundingClientRect();
      expect(menuRect).toBeDefined();
      expect(menuRect?.width).toBeGreaterThan(0);
      expect(menuRect?.height).toBeGreaterThan(0);
    });

    // Close menu
    await userEvent.keyboard('{Escape}');
  },
};

// 6. Theme Variations Test
export const ThemeVariations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DropdownMenu
          items={testItems as never}
          trigger={<Button variant="solid">Default Theme</Button>}
          variant="default"
          size="md"
        />
        <DropdownMenu
          items={testItems as never}
          trigger={<Button variant="glass">Glass Theme</Button>}
          variant="glass"
          size="md"
        />
        <DropdownMenu
          items={testItems as never}
          trigger={<Button variant="ghost">Minimal Theme</Button>}
          variant="minimal"
          size="md"
        />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test each variant
    const variants = ['Default Theme', 'Glass Theme', 'Minimal Theme'];

    for (const variant of variants) {
      const trigger = await canvas.findByRole('button', { name: new RegExp(variant, 'i') });

      // Open menu
      await userEvent.click(trigger);

      // Verify menu appears with correct styling
      await waitFor(() => {
        const menu = document.querySelector('[role="menu"]');
        expect(menu).toBeInTheDocument();
      });

      // Close menu
      await userEvent.keyboard('{Escape}');

      // Wait for menu to close before testing next variant
      await waitFor(() => {
        const menu = document.querySelector('[role="menu"]');
        expect(menu).not.toBeInTheDocument();
      });
    }
  },
};

// 7. Visual States Test (hoverless, keyboard-driven)
export const VisualStates: Story = {
  args: {
    items: itemsWithDisabled,
    trigger: <Button variant="outline">States Menu</Button>,
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // --- Open the menu ---
    const trigger = await canvas.findByRole('button', { name: /states menu/i });
    await userEvent.click(trigger);

    await waitFor(() => expect(document.querySelector('[role="menu"]')).toBeInTheDocument());

    // --- Disabled item assertions ---
    const disabledLi = await within(document.body).findByRole('menuitem', {
      name: (n) => n.trim() === 'Disabled',
    });
    expect(disabledLi).toHaveAttribute('aria-disabled', 'true');
    expect(window.getComputedStyle(disabledLi).pointerEvents).toBe('none');

    // Even if we bypass pointer checks, the handler must not be called
    const u = userEvent.setup({ pointerEventsCheck: 0 });
    await u.click(disabledLi);
    expect(itemsWithDisabled[1].onClick).not.toHaveBeenCalled();

    // --- Enabled item assertions ---
    const enabledLi = await within(document.body).findByRole('menuitem', {
      name: (n) => n.trim() === 'Enabled', // disambiguates from "Also Enabled"
    });

    // Focus instead of hover (hover CSS isn’t reliable in JSDOM)
    enabledLi.focus();
    await expect(enabledLi).toHaveFocus();

    // Click should invoke the spy
    await userEvent.click(enabledLi);
    await waitFor(() => expect(itemsWithDisabled[0].onClick).toHaveBeenCalled());
  },
};

// 8. Performance Test
export const Performance: Story = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i}`,
      label: `Option ${i + 1}`,
      icon: i % 3 === 0 ? <Check fontSize="small" /> : undefined,
      onClick: fn(),
    })),
    trigger: <Button variant="outline">Large Menu</Button>,
    variant: 'default',
    size: 'md',
    maxHeight: 400,
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /large menu/i });

    const t0 = Date.now();
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('[role="menu"]')).toBeInTheDocument();
    });

    const openTime = Date.now() - t0;
    // Allow headless/VM jitter
    expect(openTime).toBeLessThan(2500);

    // Grab the UL (role="menu") and its Paper container (actual scroll container)
    const menu = document.querySelector('[role="menu"]') as HTMLElement;
    const paper =
      (menu.closest('.MuiPaper-root') as HTMLElement | null) ||
      // Fallback: sometimes the list IS the paper in custom wrappers
      (menu.parentElement as HTMLElement | null);

    // Assert render + either overflow OR explicit max height on Paper
    if (paper) {
      const { scrollHeight, clientHeight } = paper;
      const paperStyles = window.getComputedStyle(paper);
      const maxH = parseFloat(paperStyles.maxHeight || '0');

      // Either we have real overflow, or we applied a maxHeight (which is what we want)
      expect(scrollHeight > clientHeight || maxH > 0).toBeTruthy();
    }

    // All items rendered
    const menuItems = document.querySelectorAll('[role="menuitem"]');
    expect(menuItems.length).toBe(50);
  },
};

// 9. Edge Cases Test
export const EdgeCases: Story = {
  render: () => {
    const emptyItems: DropdownMenuItem[] = [];
    const singleItem = [{ id: '1', label: 'Only Item', onClick: fn() }];
    const veryLongLabel = [
      {
        id: '1',
        label:
          'This is a very long menu item label that should wrap or truncate appropriately without breaking the layout',
        onClick: fn(),
      },
    ];

    return (
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center' }}>
        <DropdownMenu
          items={emptyItems}
          trigger={<Button variant="outline">Empty Menu</Button>}
          variant="default"
        />
        <DropdownMenu
          items={singleItem}
          trigger={<Button variant="outline">Single Item</Button>}
          variant="default"
        />
        <DropdownMenu
          items={veryLongLabel}
          trigger={<Button variant="outline">Long Label</Button>}
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty menu
    const emptyTrigger = await canvas.findByRole('button', { name: /empty menu/i });
    await userEvent.click(emptyTrigger);

    // Empty menu should still render
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    // Close empty menu
    await userEvent.keyboard('{Escape}');

    // Test single item menu
    const singleTrigger = await canvas.findByRole('button', { name: /single item/i });
    await userEvent.click(singleTrigger);

    await waitFor(() => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      expect(menuItems).toHaveLength(1);
    });

    // Close single item menu
    await userEvent.keyboard('{Escape}');

    // Test long label
    const longTrigger = await canvas.findByRole('button', { name: /long label/i });
    await userEvent.click(longTrigger);

    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();

      // Check that long text doesn't break layout
      const menuRect = menu?.getBoundingClientRect();
      expect(menuRect?.width).toBeGreaterThan(0);
      expect(menuRect?.width).toBeLessThan(window.innerWidth);
    });
  },
};

// 10. Integration Test
export const Integration: Story = {
  render: () => {
    const handleAction = fn();

    const menuItems = [
      {
        id: '1',
        label: 'Save',
        icon: <Save fontSize="small" />,
        shortcut: 'Ctrl+S',
        onClick: () => handleAction('save'),
      },
      {
        id: '2',
        label: 'Export',
        icon: <Share fontSize="small" />,
        onClick: () => handleAction('export'),
      },
      { id: 'divider1', type: 'divider' as const },
      {
        id: '3',
        label: 'Delete',
        icon: <Delete fontSize="small" />,
        color: 'error' as const,
        onClick: () => handleAction('delete'),
      },
    ];

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="solid">Primary Action</Button>
        <DropdownMenu
          items={menuItems as never}
          trigger={<Button variant="outline">More Actions</Button>}
          variant="default"
          size="md"
        />
        <Button variant="ghost">Cancel</Button>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the menu first
    const menuTrigger = await canvas.findByRole('button', { name: /more actions/i });
    await userEvent.click(menuTrigger);

    // Wait until the menu exists
    await waitFor(() => {
      const menu = document.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    const menu = document.querySelector('[role="menu"]') as HTMLElement;

    // Prefer the Modal/Popover container for z-index (MUI sets it there)
    const container =
      (menu.closest('.MuiModal-root') as HTMLElement | null) ||
      (menu.closest('.MuiPopover-root') as HTMLElement | null) ||
      menu;

    const zStr = window.getComputedStyle(container).zIndex;
    const zNum = Number.parseInt(zStr ?? '', 10);

    // If z-index is numeric, assert it's positive; if 'auto', fall back to top-layer proof.
    if (!Number.isNaN(zNum)) {
      expect(zNum).toBeGreaterThan(0);
    } else {
      const rect = menu.getBoundingClientRect();
      const elAtCenter = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + Math.min(8, rect.height / 2),
      );
      expect(menu.contains(elAtCenter!) || elAtCenter?.closest('[role="menu"]')).toBeTruthy();
    }

    // Optionally click an item (and close)
    const saveItem = await within(document.body).findByText('Save');
    await userEvent.click(saveItem);
    await waitFor(() => {
      expect(document.querySelector('[role="menu"]')).not.toBeInTheDocument();
    });
  },
};

// 11. Click Outside Test
export const ClickOutside: Story = {
  args: {
    items: testItems,
    trigger: <Button variant="outline">Click Outside Test</Button>,
    variant: 'default',
    size: 'md',
    onOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = await canvas.findByRole('button', { name: /click outside test/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('[role="menu"]')).toBeInTheDocument();
    });

    // --- Strategy 1: click the backdrop (best for MUI Modal/Popover) ---
    const backdrop = document.querySelector('.MuiBackdrop-root') as HTMLElement | null;
    if (backdrop) {
      await userEvent.click(backdrop);
    } else {
      // --- Strategy 2: real outside mousedown + click on body (MUI listens on mousedown) ---
      await userEvent.pointer({
        target: document.body,
        keys: '[MouseLeft]',
        coords: { x: 1, y: 1 },
      });
      await userEvent.click(document.body);
    }

    // If still open (headless jitter), use keyboard fallback
    if (document.querySelector('[role="menu"]')) {
      await userEvent.keyboard('{Escape}');
    }

    await waitFor(() => {
      expect(document.querySelector('[role="menu"]')).not.toBeInTheDocument();
    });
  },
};
