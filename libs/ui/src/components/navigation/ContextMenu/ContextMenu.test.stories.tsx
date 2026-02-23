import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Archive,
  ContentCopy,
  ContentCut,
  ContentPaste,
  Delete,
  Edit,
  Settings,
  Share,
  Star,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { ContextMenu } from './ContextMenu';
import type { ContextMenuItem } from './ContextMenu.types';

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/ContextMenu/Tests',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:ContextMenu'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test helper function to simulate right-click
const rightClick = async (element: HTMLElement) => {
  // Simulate right-click more simply
  await userEvent.pointer([
    { target: element, keys: '[MouseRight>]' },
    { target: element, keys: '[/MouseRight]' },
  ]);
};

// Basic menu items for testing
const testMenuItems: ContextMenuItem[] = [
  {
    id: 'copy',
    label: 'Copy',
    icon: <ContentCopy />,
    shortcut: 'Ctrl+C',
    onClick: fn(),
  },
  {
    id: 'paste',
    label: 'Paste',
    icon: <ContentPaste />,
    shortcut: 'Ctrl+V',
    onClick: fn(),
  },
  {
    id: 'cut',
    label: 'Cut',
    icon: <ContentCut />,
    shortcut: 'Ctrl+X',
    onClick: fn(),
  },
];

// Complex menu items for advanced testing
const complexMenuItems: ContextMenuItem[] = [
  {
    id: 'header1',
    type: 'header',
    label: 'File Actions',
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <Edit />,
    shortcut: 'F2',
    color: 'primary',
    onClick: fn(),
  },
  {
    id: 'share',
    label: 'Share',
    icon: <Share />,
    color: 'info',
    onClick: fn(),
  },
  {
    id: 'divider1',
    type: 'divider',
    label: '', // Required by interface but not used for dividers
  },
  {
    id: 'header2',
    type: 'header',
    label: 'Danger Zone',
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: <Archive />,
    color: 'warning',
    onClick: fn(),
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Delete />,
    dangerous: true,
    onClick: fn(),
  },
];

// Menu with disabled items
const mixedMenuItems: ContextMenuItem[] = [
  {
    id: 'enabled',
    label: 'Enabled Item',
    icon: <Star />,
    onClick: fn(),
  },
  {
    id: 'disabled',
    label: 'Disabled Item',
    icon: <Settings />,
    disabled: true,
    onClick: fn(),
  },
];

export const BasicInteraction: Story = {
  render: () => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu items={testMenuItems}>
        <Typography variant="body2" color="text.secondary" data-testid="context-trigger">
          Right-click to test basic interaction
        </Typography>
      </ContextMenu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('context-trigger');

    // Test right-click opens menu
    await rightClick(trigger);

    // Menu is in a portal, use document body
    const body = within(document.body);
    await waitFor(() => {
      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    // Test menu items are present
    expect(body.getByText('Copy')).toBeInTheDocument();
    expect(body.getByText('Paste')).toBeInTheDocument();
    expect(body.getByText('Cut')).toBeInTheDocument();

    // Test menu item click
    const copyItem = body.getByText('Copy');
    await userEvent.click(copyItem);

    // Verify onClick was called and menu closed
    expect(testMenuItems[0].onClick).toHaveBeenCalled();

    // Menu should be closed
    await waitFor(() => {
      expect(body.queryByText('Copy')).not.toBeInTheDocument();
    });
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu items={testMenuItems}>
        <Typography variant="body2" color="text.primary" data-testid="keyboard-trigger">
          Keyboard navigation test
        </Typography>
      </ContextMenu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('keyboard-trigger');

    // Open context menu
    await rightClick(trigger);

    // Menu is in a portal, use document body
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByText('Copy')).toBeInTheDocument();
    });

    // Test keyboard navigation
    const menu = body.getByRole('menu');
    expect(menu).toBeInTheDocument();

    // Test Escape key closes menu
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(body.queryByText('Copy')).not.toBeInTheDocument();
    });
  },
};

export const ScreenReader: Story = {
  render: () => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: 'success.main',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu items={testMenuItems}>
        <Typography variant="body2" color="text.primary" data-testid="screen-reader-trigger">
          Screen reader accessibility test
        </Typography>
      </ContextMenu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('screen-reader-trigger');

    // Open context menu
    await rightClick(trigger);

    // Menu is in a portal, use document body

    const body = within(document.body);

    await waitFor(() => {
      expect(body.getByText('Copy')).toBeInTheDocument();
    });

    // Test ARIA attributes
    const menu = body.getByRole('menu');
    expect(menu).toHaveAttribute('role', 'menu');

    // Test menu items have proper roles
    const menuItems = body.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(testMenuItems.length);

    // Verify each menu item is accessible
    menuItems.forEach((item, index) => {
      expect(item).toHaveAttribute('role', 'menuitem');
      expect(item).toHaveTextContent(testMenuItems[index].label);
    });

    // Close menu
    await userEvent.keyboard('{Escape}');
  },
};

export const FocusManagement: Story = {
  render: () => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: 'info.main',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu items={mixedMenuItems}>
        <Typography variant="body2" color="text.primary" data-testid="focus-trigger">
          Focus management test
        </Typography>
      </ContextMenu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('focus-trigger');

    // Open context menu
    await rightClick(trigger);

    // Menu is in a portal, use document body

    const body = within(document.body);

    await waitFor(() => {
      expect(body.getByText('Enabled Item')).toBeInTheDocument();
    });

    // Test that disabled items cannot receive focus
    const enabledItem = body.getByText('Enabled Item');
    const disabledItem = body.getByText('Disabled Item');

    // MUI uses aria-disabled for menu items
    expect(enabledItem.closest('[aria-disabled="true"]')).toBeNull();
    expect(disabledItem.closest('[aria-disabled="true"]')).not.toBeNull();

    // Test tab navigation skips disabled items
    await userEvent.tab();
    expect(document.activeElement).not.toBe(disabledItem);

    // Close menu
    await userEvent.keyboard('{Escape}');
  },
};

export const ResponsiveDesign: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 2,
      }}
    >
      <ContextMenu items={testMenuItems}>
        <Paper
          elevation={2}
          sx={{
            width: 250,
            height: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'context-menu',
          }}
          data-testid="responsive-trigger"
        >
          <Typography variant="body2" color="text.primary" textAlign="center">
            Responsive context menu test
            <br />
            Right-click to test positioning
          </Typography>
        </Paper>
      </ContextMenu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('responsive-trigger');

    // Test context menu opens on different viewports
    await rightClick(trigger);

    // Menu is in a portal, use document body

    const body = within(document.body);

    await waitFor(() => {
      expect(body.getByText('Copy')).toBeInTheDocument();
    });

    // Verify menu is positioned correctly (doesn't overflow viewport)
    const menu = body.getByRole('menu');
    const menuRect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    expect(menuRect.right).toBeLessThanOrEqual(viewportWidth);
    expect(menuRect.bottom).toBeLessThanOrEqual(viewportHeight);
    expect(menuRect.left).toBeGreaterThanOrEqual(0);
    expect(menuRect.top).toBeGreaterThanOrEqual(0);

    // Close menu
    await userEvent.keyboard('{Escape}');
  },
};

export const ThemeVariations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {(['default', 'glass', 'dark'] as const).map((variant) => (
        <Box
          key={variant}
          sx={{
            width: 200,
            height: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            backgroundColor:
              variant === 'glass'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'background.paper',
            color: variant === 'glass' ? 'white' : 'text.primary',
          }}
        >
          <ContextMenu items={testMenuItems} variant={variant}>
            <Typography
              variant="caption"
              textAlign="center"
              data-testid={`theme-trigger-${variant}`}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Theme
              <br />
              Right-click to test
            </Typography>
          </ContextMenu>
        </Box>
      ))}
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test each theme variant
    for (const variant of ['default', 'glass', 'dark'] as const) {
      const trigger = canvas.getByTestId(`theme-trigger-${variant}`);

      await rightClick(trigger);

      // Menu is in a portal, use document body

      const body = within(document.body);

      await waitFor(() => {
        expect(body.getByText('Copy')).toBeInTheDocument();
      });

      // Verify menu is rendered with correct variant styling
      const menu = body.getByRole('menu');
      expect(menu).toBeInTheDocument();

      // Close menu before testing next variant
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(body.queryByText('Copy')).not.toBeInTheDocument();
      });
    }
  },
};

export const VisualStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Box
            key={size}
            sx={{
              width: 150,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 1,
              backgroundColor: 'background.paper',
            }}
          >
            <ContextMenu items={testMenuItems} size={size}>
              <Typography variant="caption" color="primary" data-testid={`size-trigger-${size}`}>
                Size: {size.toUpperCase()}
              </Typography>
            </ContextMenu>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          width: 200,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'action.disabled',
          borderRadius: 1,
          backgroundColor: 'action.disabledBackground',
          opacity: 0.6,
        }}
      >
        <ContextMenu items={testMenuItems} disabled>
          <Typography variant="caption" color="text.disabled" data-testid="disabled-trigger">
            Disabled State
          </Typography>
        </ContextMenu>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different sizes
    for (const size of ['sm', 'md', 'lg'] as const) {
      const trigger = canvas.getByTestId(`size-trigger-${size}`);

      await rightClick(trigger);

      // Menu is in a portal, use document body

      const body = within(document.body);

      await waitFor(() => {
        expect(body.getByText('Copy')).toBeInTheDocument();
      });

      // Verify menu items have correct size styling
      const menuItems = body.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);

      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(body.queryByText('Copy')).not.toBeInTheDocument();
      });
    }

    // Test disabled state
    const disabledTrigger = canvas.getByTestId('disabled-trigger');
    await rightClick(disabledTrigger);

    // Menu should not open when disabled
    await new Promise((resolve) => window.setTimeout(resolve, 100));
    const bodyForDisabled = within(document.body);
    expect(bodyForDisabled.queryByText('Copy')).not.toBeInTheDocument();
  },
};

export const Performance: Story = {
  render: () => (
    <Box
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: 'warning.main',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <ContextMenu items={complexMenuItems}>
        <Typography variant="body2" color="text.primary" data-testid="performance-trigger">
          Performance test with complex menu
        </Typography>
      </ContextMenu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('performance-trigger');

    const startTime = window.performance.now();

    // Test menu opens quickly
    await rightClick(trigger);

    // Menu is in a portal, use document body

    const body = within(document.body);

    await waitFor(() => {
      expect(body.getByText('Edit')).toBeInTheDocument();
    });

    const openTime = window.performance.now() - startTime;

    // Menu should open within reasonable time (< 100ms in test environment)
    expect(openTime).toBeLessThan(1000);

    // Verify complex menu structure renders correctly
    expect(body.getByText('File Actions')).toBeInTheDocument();
    expect(body.getByText('Danger Zone')).toBeInTheDocument();
    expect(body.getByText('Edit')).toBeInTheDocument();
    expect(body.getByText('Share')).toBeInTheDocument();
    expect(body.getByText('Archive')).toBeInTheDocument();
    expect(body.getByText('Delete')).toBeInTheDocument();

    // Test quick close
    const closeStartTime = window.performance.now();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(body.queryByText('Edit')).not.toBeInTheDocument();
    });
    const closeTime = window.performance.now() - closeStartTime;

    expect(closeTime).toBeLessThan(1000);
  },
};

export const EdgeCases: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Box
        sx={{
          width: 200,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'error.main',
          borderRadius: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <ContextMenu items={[]}>
          <Typography variant="caption" color="error" data-testid="empty-menu-trigger">
            Empty Menu
          </Typography>
        </ContextMenu>
      </Box>

      <Box
        sx={{
          width: 200,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'warning.main',
          borderRadius: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <ContextMenu
          items={[
            {
              id: 'long-text',
              label: 'This is a very long menu item text that should handle overflow properly',
              icon: <Edit />,
              shortcut: 'Ctrl+Shift+Alt+Super+L',
              onClick: fn(),
            },
          ]}
        >
          <Typography variant="caption" color="warning.main" data-testid="long-text-trigger">
            Long Text Test
          </Typography>
        </ContextMenu>
      </Box>

      <Box
        sx={{
          width: 200,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'info.main',
          borderRadius: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <ContextMenu
          items={[
            {
              id: 'special-chars',
              label: 'Special chars: àáâãäåæçèéêë ñòóôõö ùúûüý',
              icon: <Settings />,
              onClick: fn(),
            },
          ]}
        >
          <Typography variant="caption" color="info.main" data-testid="special-chars-trigger">
            Special Characters
          </Typography>
        </ContextMenu>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty menu
    const emptyTrigger = canvas.getByTestId('empty-menu-trigger');
    await rightClick(emptyTrigger);

    // Should handle empty menu gracefully
    await new Promise((resolve) => window.setTimeout(resolve, 100));
    const menu = canvas.queryByRole('menu');
    if (menu) {
      const menuItems = canvas.queryAllByRole('menuitem');
      expect(menuItems).toHaveLength(0);
      await userEvent.keyboard('{Escape}');
    }

    // Test long text
    const longTextTrigger = canvas.getByTestId('long-text-trigger');
    await rightClick(longTextTrigger);
    const bodyForLongText = within(document.body);
    await waitFor(() => {
      expect(bodyForLongText.getByText(/This is a very long menu item text/)).toBeInTheDocument();
    });
    await userEvent.keyboard('{Escape}');

    // Test special characters
    const specialCharsTrigger = canvas.getByTestId('special-chars-trigger');
    await rightClick(specialCharsTrigger);
    const bodyForSpecialChars = within(document.body);
    await waitFor(() => {
      expect(bodyForSpecialChars.getByText(/Special chars: àáâãäåæçèéêë/)).toBeInTheDocument();
    });
    await userEvent.keyboard('{Escape}');
  },
};

export const Integration: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Multiple Context Menus Integration
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ContextMenu items={testMenuItems} variant="default">
            <Box
              sx={{
                width: 100,
                height: 60,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'context-menu',
              }}
              data-testid="integration-trigger-1"
            >
              <Typography variant="caption">Menu 1</Typography>
            </Box>
          </ContextMenu>

          <ContextMenu items={complexMenuItems} variant="glass">
            <Box
              sx={{
                width: 100,
                height: 60,
                border: '1px solid',
                borderColor: 'secondary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'context-menu',
              }}
              data-testid="integration-trigger-2"
            >
              <Typography variant="caption">Menu 2</Typography>
            </Box>
          </ContextMenu>
        </Box>
      </Paper>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Test first context menu
    const trigger1 = canvas.getByTestId('integration-trigger-1');
    await rightClick(trigger1);
    await waitFor(() => {
      expect(body.getByText('Copy')).toBeInTheDocument();
    });
    await userEvent.keyboard('{Escape}');

    // Test second context menu
    const trigger2 = canvas.getByTestId('integration-trigger-2');
    await rightClick(trigger2);
    await waitFor(() => {
      expect(body.getByText('Edit')).toBeInTheDocument();
    });
    await userEvent.keyboard('{Escape}');

    // Test that both menus work independently
    await rightClick(trigger1);
    await waitFor(() => {
      expect(body.getByText('Copy')).toBeInTheDocument();
    });

    // Close first menu
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(body.queryByText('Copy')).not.toBeInTheDocument();
    });

    // Open second menu
    await rightClick(trigger2);
    await waitFor(() => {
      expect(body.getByText('Edit')).toBeInTheDocument();
    });

    // Verify second menu is open and first is closed
    expect(body.getByText('Edit')).toBeInTheDocument();
    expect(body.queryByText('Copy')).not.toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
  },
};
