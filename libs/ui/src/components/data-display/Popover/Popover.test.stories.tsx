import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'DataDisplay/Popover/Tests',
  component: Popover,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Popover'],
};
export default meta;
export type Story = StoryObj<typeof meta>;

// Helper function to get popover elements from document (since MUI renders in portal)
const getPopoverElement = (testId: string) => document.querySelector(`[data-testid="${testId}"]`);
const queryPopoverElement = (testId: string) => document.querySelector(`[data-testid="${testId}"]`);

// Helper component for tests
const PopoverTestWrapper = ({
  children,
  onOpen = fn(),
  onClose = fn(),
  ...props
}: {
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  variant?: 'default' | 'glass' | 'arrow';
  glow?: boolean;
  pulse?: boolean;
  maxWidth?: number;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick} data-testid="popover-trigger">
        Open Popover
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        data-testid="popover"
        {...props}
      >
        {children}
      </Popover>
    </>
  );
};

// 1. Basic Interaction Tests
export const BasicInteraction: Story = {
  render: () => (
    <>
      <PopoverTestWrapper>
        <Typography sx={{ p: 2 }} data-testid="popover-content">
          This is basic popover content.
        </Typography>
      </PopoverTestWrapper>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Initial state should be closed', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      expect(trigger).toBeInTheDocument();

      // Popover should not be visible initially
      expect(document.querySelector('[data-testid="popover-content"]')).not.toBeInTheDocument();
    });

    await step('Should open popover on trigger click', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        // MUI Popover renders content in a portal (document body), not in canvas
        const content = document.querySelector('[data-testid="popover-content"]');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent('This is basic popover content.');

        // Verify popover is positioned relative to trigger
        const popoverContainer = document.querySelector('[role="presentation"]');
        expect(popoverContainer).toBeInTheDocument();

        // Test that popover Paper element exists with proper styling
        const paper = document.querySelector('.MuiPaper-root');
        expect(paper).toBeInTheDocument();
      });
    });

    await step('Should close popover on outside click', async () => {
      // Click outside the popover (on backdrop)
      const backdrop = document.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        await userEvent.click(backdrop as HTMLElement);
      } else {
        await userEvent.click(canvasElement);
      }

      await waitFor(() => {
        expect(document.querySelector('[data-testid="popover-content"]')).not.toBeInTheDocument();
      });
    });

    // Mark test as passed
    statusElement.textContent = 'PASS';
  },
};

// 2. Form Interaction Tests
export const FormInteraction: Story = {
  render: () => {
    const [clickedItem, setClickedItem] = React.useState('');
    return (
      <>
        <PopoverTestWrapper>
          <div style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              User Menu
            </Typography>
            <List dense>
              <ListItem
                component="button"
                data-testid="menu-item-profile"
                onClick={() => setClickedItem('profile')}
              >
                <ListItemText primary="Profile Settings" />
              </ListItem>
              <ListItem
                component="button"
                data-testid="menu-item-account"
                onClick={() => setClickedItem('account')}
              >
                <ListItemText primary="Account Security" />
              </ListItem>
              <ListItem
                component="button"
                data-testid="menu-item-notifications"
                onClick={() => setClickedItem('notifications')}
              >
                <ListItemText primary="Notifications" />
              </ListItem>
            </List>
          </div>
        </PopoverTestWrapper>
        <div data-testid="clicked-item" style={{ display: 'none' }}>
          {clickedItem}
        </div>
        <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
          PASS
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should open popover with menu items', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        const profileItem = getPopoverElement('menu-item-profile');
        const accountItem = getPopoverElement('menu-item-account');
        const notificationsItem = getPopoverElement('menu-item-notifications');

        expect(profileItem).toBeInTheDocument();
        expect(accountItem).toBeInTheDocument();
        expect(notificationsItem).toBeInTheDocument();

        // Verify menu items have proper text content
        expect(profileItem).toHaveTextContent('Profile Settings');
        expect(accountItem).toHaveTextContent('Account Security');
        expect(notificationsItem).toHaveTextContent('Notifications');
      });
    });

    await step('Should be able to click menu items and trigger actions', async () => {
      const profileItem = getPopoverElement('menu-item-profile') as HTMLElement;
      await userEvent.click(profileItem);

      // Verify click handler was called
      await waitFor(() => {
        const clickedItemElement = canvas.getByTestId('clicked-item');
        expect(clickedItemElement).toHaveTextContent('profile');
      });

      // Menu item should still be accessible after click
      expect(profileItem).toBeInTheDocument();

      // Test clicking another item
      const accountItem = getPopoverElement('menu-item-account') as HTMLElement;
      await userEvent.click(accountItem);

      await waitFor(() => {
        const clickedItemElement = canvas.getByTestId('clicked-item');
        expect(clickedItemElement).toHaveTextContent('account');
      });
    });

    statusElement.textContent = 'PASS';
  },
};

// 3. Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: () => (
    <>
      <PopoverTestWrapper>
        <div style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            Keyboard Navigation Test
          </Typography>
          <List dense>
            <ListItem component="button" tabIndex={0} data-testid="item-1">
              <ListItemText primary="First Item" />
            </ListItem>
            <ListItem component="button" tabIndex={0} data-testid="item-2">
              <ListItemText primary="Second Item" />
            </ListItem>
            <ListItem component="button" tabIndex={0} data-testid="item-3">
              <ListItemText primary="Third Item" />
            </ListItem>
          </List>
        </div>
      </PopoverTestWrapper>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should open popover with Enter key', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      trigger.focus();
      expect(trigger).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      await waitFor(() => {
        const firstItem = getPopoverElement('item-1');
        expect(firstItem).toBeInTheDocument();

        // Verify all items are present and focusable
        const secondItem = getPopoverElement('item-2');
        const thirdItem = getPopoverElement('item-3');
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();

        // Verify items have proper tabIndex for keyboard navigation
        expect(firstItem).toHaveAttribute('tabIndex', '0');
        expect(secondItem).toHaveAttribute('tabIndex', '0');
        expect(thirdItem).toHaveAttribute('tabIndex', '0');
      });
    });

    await step('Should navigate between items with Tab key', async () => {
      // Tab through items
      const firstItem = getPopoverElement('item-1') as HTMLElement;
      firstItem.focus();
      expect(firstItem).toHaveFocus();

      await userEvent.keyboard('{Tab}');
      const secondItem = getPopoverElement('item-2') as HTMLElement;
      expect(secondItem).toHaveFocus();

      await userEvent.keyboard('{Tab}');
      const thirdItem = getPopoverElement('item-3') as HTMLElement;
      expect(thirdItem).toHaveFocus();
    });

    await step('Should close popover with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(queryPopoverElement('item-1')).not.toBeInTheDocument();
        expect(queryPopoverElement('item-2')).not.toBeInTheDocument();
        expect(queryPopoverElement('item-3')).not.toBeInTheDocument();

        // Verify focus returns to trigger
        const trigger = canvas.getByTestId('popover-trigger');
        expect(trigger).toHaveFocus();
      });
    });

    statusElement.textContent = 'PASS';
  },
};

// 4. Screen Reader Tests
export const ScreenReader: Story = {
  render: () => (
    <>
      <PopoverTestWrapper>
        <div
          role="dialog"
          aria-label="User menu popover"
          aria-describedby="popover-desc"
          style={{ padding: 16 }}
        >
          <Typography variant="h6" gutterBottom id="popover-title">
            Accessible Menu
          </Typography>
          <Typography variant="body2" id="popover-desc" sx={{ mb: 1 }}>
            Navigate menu options using arrow keys
          </Typography>
          <List dense aria-labelledby="popover-title">
            <ListItem
              component="button"
              role="menuitem"
              data-testid="accessible-item-1"
              aria-label="Navigate to profile settings"
            >
              <ListItemText primary="Accessible Item 1" />
            </ListItem>
            <ListItem
              component="button"
              role="menuitem"
              data-testid="accessible-item-2"
              aria-label="Navigate to account settings"
            >
              <ListItemText primary="Accessible Item 2" />
            </ListItem>
          </List>
        </div>
      </PopoverTestWrapper>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should have proper ARIA attributes for screen readers', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        // Use document queries for portal-rendered content
        const dialog = document.querySelector('[role="dialog"]');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-label', 'User menu popover');
        expect(dialog).toHaveAttribute('aria-describedby', 'popover-desc');

        // Verify menu items have proper roles and labels
        const menuItems = document.querySelectorAll('[role="menuitem"]');
        expect(menuItems).toHaveLength(2);
        expect(menuItems[0]).toHaveAttribute('aria-label', 'Navigate to profile settings');
        expect(menuItems[1]).toHaveAttribute('aria-label', 'Navigate to account settings');
      });
    });

    await step('Should have proper heading structure for screen readers', async () => {
      // Use document queries for portal-rendered content
      const title = document.querySelector('#popover-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Accessible Menu');

      const description = document.querySelector('#popover-desc');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('Navigate menu options using arrow keys');

      const list = document.querySelector('[aria-labelledby="popover-title"]');
      expect(list).toBeInTheDocument();

      // Verify MUI Popover backdrop has proper role
      const backdrop = document.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        expect(backdrop).toHaveAttribute('aria-hidden', 'true');
      }
    });

    statusElement.textContent = 'PASS';
  },
};

// 5. Focus Management Tests
export const FocusManagement: Story = {
  render: () => (
    <>
      <div>
        <Button data-testid="before-popover">Before Popover</Button>
        <PopoverTestWrapper>
          <div style={{ padding: 16 }}>
            <Button data-testid="first-focusable" autoFocus>
              First Focusable
            </Button>
            <Button data-testid="second-focusable">Second Focusable</Button>
            <Button data-testid="third-focusable">Third Focusable</Button>
          </div>
        </PopoverTestWrapper>
        <Button data-testid="after-popover">After Popover</Button>
      </div>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should manage focus when popover opens', async () => {
      const trigger = canvas.getByTestId('popover-trigger');

      // Set initial focus to before button
      const beforeButton = canvas.getByTestId('before-popover');
      beforeButton.focus();
      expect(beforeButton).toHaveFocus();

      // Open popover
      await userEvent.click(trigger);

      await waitFor(() => {
        // Use document queries for portal-rendered content
        const firstFocusable = document.querySelector('[data-testid="first-focusable"]');
        expect(firstFocusable).toBeInTheDocument();

        // Verify autoFocus worked
        expect(firstFocusable).toHaveFocus();

        // Verify all focusable elements are present
        const secondFocusable = document.querySelector('[data-testid="second-focusable"]');
        const thirdFocusable = document.querySelector('[data-testid="third-focusable"]');
        expect(secondFocusable).toBeInTheDocument();
        expect(thirdFocusable).toBeInTheDocument();
      });
    });

    await step('Should cycle focus within popover', async () => {
      // Tab through elements (use document queries for portal content)
      await userEvent.keyboard('{Tab}');
      const secondFocusable = document.querySelector('[data-testid="second-focusable"]');
      expect(secondFocusable).toHaveFocus();

      await userEvent.keyboard('{Tab}');
      const thirdFocusable = document.querySelector('[data-testid="third-focusable"]');
      expect(thirdFocusable).toHaveFocus();

      // Shift+Tab to go back
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      expect(secondFocusable).toHaveFocus();
    });

    await step('Should return focus to trigger when closed', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        const trigger = canvas.getByTestId('popover-trigger');
        expect(trigger).toHaveFocus();

        // Verify popover content is removed (check in document, not canvas)
        expect(document.querySelector('[data-testid="first-focusable"]')).not.toBeInTheDocument();
        expect(document.querySelector('[data-testid="second-focusable"]')).not.toBeInTheDocument();
      });
    });

    statusElement.textContent = 'PASS';
  },
};

// 6. Responsive Design Tests
export const ResponsiveDesign: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <>
      <PopoverTestWrapper maxWidth={280}>
        <div style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            Mobile Responsive Content
          </Typography>
          <Typography variant="body2" data-testid="mobile-content">
            This content should adapt to mobile viewport sizes and maintain readability.
          </Typography>
          <Button data-testid="mobile-button" size="small" fullWidth>
            Mobile Action
          </Button>
        </div>
      </PopoverTestWrapper>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should display properly on mobile viewport with constrained width', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = getPopoverElement('mobile-content');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent(
          'This content should adapt to mobile viewport sizes and maintain readability.',
        );

        // Verify mobile button is full width
        const mobileButton = getPopoverElement('mobile-button');
        expect(mobileButton).toBeInTheDocument();
        expect(mobileButton).toHaveClass('MuiButton-fullWidth');

        // Verify popover Paper respects maxWidth
        const paper = document.querySelector('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          const maxWidth = computedStyle.maxWidth;
          expect(maxWidth).toBe('280px');
        }
      });
    });

    await step('Should position correctly on mobile screens', async () => {
      // Verify popover is visible within viewport
      const popoverRoot = document.querySelector('[role="presentation"]') as HTMLElement;
      if (popoverRoot) {
        const rect = popoverRoot.getBoundingClientRect();
        expect(rect.left).toBeGreaterThanOrEqual(0);
        expect(rect.top).toBeGreaterThanOrEqual(0);
      }
    });

    statusElement.textContent = 'PASS';
  },
};

// 7. Theme Variations Tests
export const ThemeVariations: Story = {
  render: () => (
    <>
      <Stack spacing={2} direction="row">
        <PopoverTestWrapper variant="default" data-testid="default-popover">
          <Typography sx={{ p: 2 }} data-testid="default-content">
            Default Theme
          </Typography>
        </PopoverTestWrapper>
        <PopoverTestWrapper variant="glass" data-testid="glass-popover">
          <Typography sx={{ p: 2 }} data-testid="glass-content">
            Glass Theme
          </Typography>
        </PopoverTestWrapper>
        <PopoverTestWrapper variant="arrow" data-testid="arrow-popover">
          <Typography sx={{ p: 2 }} data-testid="arrow-content">
            Arrow Theme
          </Typography>
        </PopoverTestWrapper>
      </Stack>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should render and style all theme variants correctly', async () => {
      const triggers = canvas.getAllByTestId('popover-trigger');
      expect(triggers).toHaveLength(3);

      // Test default variant
      await userEvent.click(triggers[0]);
      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="default-content"]');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent('Default Theme');

        // Verify default variant styling
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          expect(computedStyle.borderRadius).toBeTruthy();
          expect(computedStyle.backgroundColor).toBeTruthy();
        }
      });
      await userEvent.keyboard('{Escape}');

      // Wait for animation
      await waitFor(() => {
        expect(document.querySelector('[data-testid="default-content"]')).not.toBeInTheDocument();
      });

      // Test glass variant
      await userEvent.click(triggers[1]);
      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="glass-content"]');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent('Glass Theme');

        // Verify glass variant has backdrop filter
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          // Glass variant should have backdrop-filter
          expect(computedStyle.backdropFilter || computedStyle.webkitBackdropFilter).toBeTruthy();
        }
      });
      await userEvent.keyboard('{Escape}');

      // Wait for animation
      await waitFor(() => {
        expect(document.querySelector('[data-testid="glass-content"]')).not.toBeInTheDocument();
      });

      // Test arrow variant
      await userEvent.click(triggers[2]);
      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="arrow-content"]');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent('Arrow Theme');

        // Verify arrow variant styling
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          expect(computedStyle.boxShadow).toBeTruthy();
        }
      });
      await userEvent.keyboard('{Escape}');
    });

    statusElement.textContent = 'PASS';
  },
};

// 8. Visual States Tests
export const VisualStates: Story = {
  render: () => (
    <>
      <Stack spacing={2} direction="row">
        <PopoverTestWrapper glow data-testid="glow-popover">
          <Typography sx={{ p: 2 }} data-testid="glow-content">
            Glow Effect
          </Typography>
        </PopoverTestWrapper>
        <PopoverTestWrapper pulse data-testid="pulse-popover">
          <Typography sx={{ p: 2 }} data-testid="pulse-content">
            Pulse Effect
          </Typography>
        </PopoverTestWrapper>
        <PopoverTestWrapper glow pulse data-testid="both-effects-popover">
          <Typography sx={{ p: 2 }} data-testid="both-effects-content">
            Both Effects
          </Typography>
        </PopoverTestWrapper>
      </Stack>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should render and apply visual effect variants', async () => {
      const triggers = canvas.getAllByTestId('popover-trigger');
      expect(triggers).toHaveLength(3);

      // Test glow effect
      await userEvent.click(triggers[0]);
      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="glow-content"]');
        expect(content).toBeInTheDocument();

        // Verify glow effect is applied (enhanced box-shadow)
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          expect(computedStyle.boxShadow).toContain('rgb');
          expect(computedStyle.filter).toContain('brightness');
        }
      });
      await userEvent.keyboard('{Escape}');

      // Wait for close animation
      await waitFor(() => {
        expect(document.querySelector('[data-testid="glow-content"]')).not.toBeInTheDocument();
      });

      // Test pulse effect
      await userEvent.click(triggers[1]);
      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="pulse-content"]');
        expect(content).toBeInTheDocument();

        // Verify pulse animation is present
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          // Check for ::after pseudo element that creates pulse
          const computedStyle = window.getComputedStyle(paper, '::after');
          expect(computedStyle.animation || computedStyle.animationName).toBeTruthy();
        }
      });
      await userEvent.keyboard('{Escape}');

      // Wait for close animation
      await waitFor(() => {
        expect(document.querySelector('[data-testid="pulse-content"]')).not.toBeInTheDocument();
      });

      // Test both effects combined
      await userEvent.click(triggers[2]);
      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="both-effects-content"]');
        expect(content).toBeInTheDocument();

        // Verify both effects are applied
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          // Should have glow shadow
          expect(computedStyle.boxShadow).toContain('rgb');
          expect(computedStyle.filter).toContain('brightness');
          // Should have pulse animation
          const afterStyle = window.getComputedStyle(paper, '::after');
          expect(afterStyle.animation || afterStyle.animationName).toBeTruthy();
        }
      });
      await userEvent.keyboard('{Escape}');
    });

    statusElement.textContent = 'PASS';
  },
};

// 9. Performance Tests
const PerformanceTestComponent = () => {
  const [renderCount, setRenderCount] = React.useState(0);
  const [openCount, setOpenCount] = React.useState(0);

  React.useEffect(() => {
    setRenderCount((c) => c + 1);
  }, []);

  return (
    <div>
      <div data-testid="render-count">Renders: {renderCount}</div>
      <div data-testid="open-count" style={{ display: 'none' }}>
        Opens: {openCount}
      </div>
      <PopoverTestWrapper onOpen={() => setOpenCount((c) => c + 1)}>
        <div style={{ padding: 16 }}>
          <Typography variant="h6">Performance Test</Typography>
          <Typography data-testid="performance-content">
            This tests if the popover triggers excessive re-renders.
          </Typography>
        </div>
      </PopoverTestWrapper>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </div>
  );
};

export const Performance: Story = {
  render: () => <PerformanceTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should not cause excessive re-renders during interactions', async () => {
      const renderCountElement = canvas.getByTestId('render-count');
      const initialRenders = parseInt(renderCountElement.textContent?.split(': ')[1] || '0');

      // Open and close popover multiple times
      const trigger = canvas.getByTestId('popover-trigger');

      // First open/close cycle
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(document.querySelector('[data-testid="performance-content"]')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(
          document.querySelector('[data-testid="performance-content"]'),
        ).not.toBeInTheDocument();
      });

      // Second open/close cycle
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(document.querySelector('[data-testid="performance-content"]')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(
          document.querySelector('[data-testid="performance-content"]'),
        ).not.toBeInTheDocument();
      });

      // Third open/close cycle
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(document.querySelector('[data-testid="performance-content"]')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(
          document.querySelector('[data-testid="performance-content"]'),
        ).not.toBeInTheDocument();
      });

      // Check that renders didn't increase dramatically
      const finalRenders = parseInt(
        canvas.getByTestId('render-count').textContent?.split(': ')[1] || '0',
      );
      expect(finalRenders - initialRenders).toBeLessThan(10);

      // Verify open count matches expected
      const openCount = parseInt(
        canvas.getByTestId('open-count').textContent?.split(': ')[1] || '0',
      );
      expect(openCount).toBe(3);
    });

    await step('Should handle rapid open/close without performance degradation', async () => {
      const trigger = canvas.getByTestId('popover-trigger');
      const startTime = Date.now();

      // Rapid open/close
      for (let i = 0; i < 5; i++) {
        await userEvent.click(trigger);
        await userEvent.keyboard('{Escape}');
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete rapid interactions within reasonable time (5 seconds)
      expect(duration).toBeLessThan(5000);
    });

    statusElement.textContent = 'PASS';
  },
};

// 10. Edge Cases Tests
export const EdgeCases: Story = {
  render: () => (
    <>
      <Stack spacing={2}>
        {/* Empty content */}
        <PopoverTestWrapper data-testid="empty-popover">
          <div style={{ padding: 16, minHeight: 50 }} data-testid="empty-content" />
        </PopoverTestWrapper>

        {/* Very long content */}
        <PopoverTestWrapper maxWidth={200} data-testid="long-content-popover">
          <Typography sx={{ p: 2 }} data-testid="long-content">
            This is a very long text content that should wrap properly and not break the popover
            layout. It should handle overflow gracefully and maintain proper spacing and typography.
            Additional text to ensure wrapping behavior is tested thoroughly.
          </Typography>
        </PopoverTestWrapper>

        {/* No maxWidth */}
        <PopoverTestWrapper maxWidth={undefined} data-testid="no-max-width-popover">
          <Typography sx={{ p: 2 }} data-testid="no-max-width-content">
            Content without maxWidth constraint should expand naturally
          </Typography>
        </PopoverTestWrapper>

        {/* Zero maxWidth edge case */}
        <PopoverTestWrapper maxWidth={0} data-testid="zero-width-popover">
          <Typography sx={{ p: 2 }} data-testid="zero-width-content">
            Zero width test
          </Typography>
        </PopoverTestWrapper>
      </Stack>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should handle empty content gracefully', async () => {
      const triggers = canvas.getAllByTestId('popover-trigger');
      await userEvent.click(triggers[0]);

      await waitFor(() => {
        // Use document queries for portal-rendered content
        const emptyContent = document.querySelector('[data-testid="empty-content"]');
        expect(emptyContent).toBeInTheDocument();

        // Verify minimum height is applied
        const computedStyle = window.getComputedStyle(emptyContent as HTMLElement);
        expect(computedStyle.minHeight).toBe('50px');

        // Verify popover renders even with empty content
        const paper = emptyContent?.closest('.MuiPaper-root');
        expect(paper).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Should handle long content with proper text wrapping', async () => {
      const triggers = canvas.getAllByTestId('popover-trigger');
      await userEvent.click(triggers[1]);

      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="long-content"]') as HTMLElement;
        expect(content).toBeInTheDocument();

        // Verify maxWidth is applied
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          expect(computedStyle.maxWidth).toBe('200px');
        }

        // Verify text wraps properly
        const contentHeight = content?.offsetHeight;
        expect(contentHeight).toBeGreaterThan(50); // Should be taller due to wrapping
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Should handle content without maxWidth constraint', async () => {
      const triggers = canvas.getAllByTestId('popover-trigger');
      await userEvent.click(triggers[2]);

      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="no-max-width-content"]');
        expect(content).toBeInTheDocument();

        // Verify no maxWidth constraint is applied (should use default)
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          // When undefined, should use default maxWidth of 400px
          expect(computedStyle.maxWidth).toBe('400px');
        }
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('Should handle zero maxWidth edge case', async () => {
      const triggers = canvas.getAllByTestId('popover-trigger');
      await userEvent.click(triggers[3]);

      await waitFor(() => {
        // Use document queries for portal-rendered content
        const content = document.querySelector('[data-testid="zero-width-content"]');
        expect(content).toBeInTheDocument();

        // Verify zero maxWidth is handled
        const paper = content?.closest('.MuiPaper-root') as HTMLElement;
        if (paper) {
          const computedStyle = window.getComputedStyle(paper);
          expect(computedStyle.maxWidth).toBe('0px');
        }
      });
      await userEvent.keyboard('{Escape}');
    });

    statusElement.textContent = 'PASS';
  },
};

// 11. Integration Tests
const IntegrationTestComponent = () => {
  const [selectedItem, setSelectedItem] = React.useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (option: string) => {
    setSelectedItem(option);
    handleClose(); // Properly close popover after selection
  };

  return (
    <>
      <div>
        <Typography data-testid="selected-item">Selected: {selectedItem || 'None'}</Typography>
        <Button variant="contained" onClick={handleClick} data-testid="popover-trigger">
          Open Popover
        </Button>
        <Popover
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          data-testid="popover"
        >
          <div style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Select an Option
            </Typography>
            <List dense>
              {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                <ListItem
                  key={option}
                  component="button"
                  data-testid={`option-${option.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleItemClick(option)}
                >
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </div>
        </Popover>
        <Typography data-testid="popover-state" style={{ display: 'none' }}>
          {isOpen ? 'open' : 'closed'}
        </Typography>
      </div>
      <div aria-label="Status of the test run" style={{ marginTop: 20 }}>
        PASS
      </div>
    </>
  );
};

export const Integration: Story = {
  render: () => <IntegrationTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const statusElement = canvas.getByLabelText('Status of the test run');
    statusElement.textContent = 'RUNS';

    await step('Should integrate with external state management', async () => {
      // Verify initial state
      expect(canvas.getByTestId('selected-item')).toHaveTextContent('Selected: None');
      expect(canvas.getByTestId('popover-state')).toHaveTextContent('closed');

      const trigger = canvas.getByTestId('popover-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(canvas.getByTestId('popover-state')).toHaveTextContent('open');
        // Use document queries for portal-rendered content
        expect(document.querySelector('[data-testid="option-option-1"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="option-option-2"]')).toBeInTheDocument();
        expect(document.querySelector('[data-testid="option-option-3"]')).toBeInTheDocument();
      });

      // Click an option
      const option2 = document.querySelector('[data-testid="option-option-2"]') as HTMLElement;
      await userEvent.click(option2);

      // Should update external state and close popover
      await waitFor(() => {
        expect(canvas.getByTestId('selected-item')).toHaveTextContent('Selected: Option 2');
        expect(canvas.getByTestId('popover-state')).toHaveTextContent('closed');
      });

      // Wait for popover content to be removed from DOM
      await waitFor(
        () => {
          expect(document.querySelector('[data-testid="option-option-1"]')).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    await step('Should maintain state across multiple interactions', async () => {
      // Open again and select different option
      const trigger = canvas.getByTestId('popover-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(canvas.getByTestId('popover-state')).toHaveTextContent('open');
      });

      const option3 = document.querySelector('[data-testid="option-option-3"]') as HTMLElement;
      await userEvent.click(option3);

      await waitFor(() => {
        expect(canvas.getByTestId('selected-item')).toHaveTextContent('Selected: Option 3');
        expect(canvas.getByTestId('popover-state')).toHaveTextContent('closed');
      });

      // Open again and select first option
      await userEvent.click(trigger);

      await waitFor(() => {
        // Use document query for portal-rendered content
        expect(document.querySelector('[data-testid="option-option-1"]')).toBeInTheDocument();
      });

      const option1 = document.querySelector('[data-testid="option-option-1"]') as HTMLElement;
      await userEvent.click(option1);

      await waitFor(() => {
        expect(canvas.getByTestId('selected-item')).toHaveTextContent('Selected: Option 1');
        expect(canvas.getByTestId('popover-state')).toHaveTextContent('closed');
      });
    });

    statusElement.textContent = 'PASS';
  },
};
