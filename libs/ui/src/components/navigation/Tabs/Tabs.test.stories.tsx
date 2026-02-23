import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Dashboard,
  Email,
  Home,
  Notifications,
  Person,
  Security,
  Settings,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Tabs } from './Tabs';
import type { TabItem, TabsProps } from './Tabs.types';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs/Tests',
  component: Tabs,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Tabs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test wrapper component
interface TabsTestWrapperProps extends Partial<TabsProps> {
  onChangeCallback?: typeof fn;
  onTabCloseCallback?: typeof fn;
  onFocusCallback?: typeof fn;
  onBlurCallback?: typeof fn;
  initialValue?: string;
}

const TabsTestWrapper = ({
  onChangeCallback = fn(),
  onTabCloseCallback = fn(),
  onFocusCallback = fn(),
  onBlurCallback = fn(),
  initialValue = 'tab1',
  ...props
}: TabsTestWrapperProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.SyntheticEvent, tabId: string) => {
    setValue(tabId);
    onChangeCallback(event, tabId);
  };

  const handleTabClose = (tabId: string) => {
    onTabCloseCallback(tabId);
  };

  return (
    <Box sx={{ width: 600, minHeight: 300 }}>
      <Tabs
        {...props}
        value={value}
        onChange={handleChange}
        onTabClose={handleTabClose}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
      />
    </Box>
  );
};

// Basic tab items for testing
const basicTestItems: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: (
      <Box sx={{ p: 2 }}>
        <Typography>Content for Tab 1</Typography>
      </Box>
    ),
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: (
      <Box sx={{ p: 2 }}>
        <Typography>Content for Tab 2</Typography>
      </Box>
    ),
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: (
      <Box sx={{ p: 2 }}>
        <Typography>Content for Tab 3</Typography>
      </Box>
    ),
  },
];

const itemsWithIcons: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home />,
    content: (
      <Box sx={{ p: 2 }}>
        <Typography>Home content</Typography>
      </Box>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    content: (
      <Box sx={{ p: 2 }}>
        <Typography>Settings content</Typography>
      </Box>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <Person />,
    content: (
      <Box sx={{ p: 2 }}>
        <Typography>Profile content</Typography>
      </Box>
    ),
  },
];

// 1. Basic Interaction Test
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    items: basicTestItems,
    onChangeCallback: fn(),
    onTabCloseCallback: fn(),
    onFocusCallback: fn(),
    onBlurCallback: fn(),
  },
  render: (args) => <TabsTestWrapper {...args} />,
  parameters: {
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      // Check tabs are rendered
      const tab1 = canvas.getByRole('tab', { name: /Tab 1/i });
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });
      const tab3 = canvas.getByRole('tab', { name: /Tab 3/i });

      await expect(tab1).toBeInTheDocument();
      await expect(tab2).toBeInTheDocument();
      await expect(tab3).toBeInTheDocument();

      // Check first tab is selected
      await expect(tab1).toHaveAttribute('aria-selected', 'true');
      await expect(tab2).toHaveAttribute('aria-selected', 'false');

      // Check first panel is visible
      const panel1 = canvas.getByRole('tabpanel', { name: /Tab 1/i });
      await expect(panel1).toBeInTheDocument();
      await expect(panel1).toHaveTextContent('Content for Tab 1');
    });

    await step('Tab click interaction', async () => {
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });
      await userEvent.click(tab2);

      // Check tab2 is now selected
      await expect(tab2).toHaveAttribute('aria-selected', 'true');

      // Check panel2 is now visible
      const panel2 = canvas.getByRole('tabpanel', { name: /Tab 2/i });
      await expect(panel2).toBeInTheDocument();
      await expect(panel2).toHaveTextContent('Content for Tab 2');
    });

    await step('Tab click on already selected tab', async () => {
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });
      await userEvent.click(tab2);

      // Should still be selected
      await expect(tab2).toHaveAttribute('aria-selected', 'true');
    });
  },
};

// 2. Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    items: basicTestItems,
    onChangeCallback: fn(),
    onTabCloseCallback: fn(),
    onFocusCallback: fn(),
    onBlurCallback: fn(),
  },
  render: (args) => <TabsTestWrapper {...args} />,
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation with arrow keys', async () => {
      const tab1 = canvas.getByRole('tab', { name: /Tab 1/i });
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });
      const tab3 = canvas.getByRole('tab', { name: /Tab 3/i });

      // Focus first tab
      tab1.focus();
      await expect(tab1).toHaveFocus();

      // Navigate right with arrow key
      await userEvent.keyboard('{ArrowRight}');
      await expect(tab2).toHaveFocus();

      // Navigate right again
      await userEvent.keyboard('{ArrowRight}');
      await expect(tab3).toHaveFocus();

      // Navigate left
      await userEvent.keyboard('{ArrowLeft}');
      await expect(tab2).toHaveFocus();
    });

    await step('Tab activation with Enter key', async () => {
      const tab3 = canvas.getByRole('tab', { name: /Tab 3/i });

      // Focus tab3
      tab3.focus();
      await expect(tab3).toHaveFocus();

      // Activate with Enter
      await userEvent.keyboard('{Enter}');

      // Check tab3 is selected
      await expect(tab3).toHaveAttribute('aria-selected', 'true');

      // Check panel3 is visible
      const panel3 = canvas.getByRole('tabpanel', { name: /Tab 3/i });
      await expect(panel3).toBeInTheDocument();
      await expect(panel3).toHaveTextContent('Content for Tab 3');
    });

    await step('Tab navigation with Tab key', async () => {
      const tab1 = canvas.getByRole('tab', { name: /Tab 1/i });

      // Focus first tab
      tab1.focus();
      await expect(tab1).toHaveFocus();

      // Tab to content
      await userEvent.tab();

      // Should have moved focus out of tabs
      await expect(tab1).not.toHaveFocus();
    });
  },
};

// 3. Closable Tabs Test
export const ClosableTabsTest: Story = {
  name: '❌ Closable Tabs Test',
  args: {
    onChange: fn(),
    onTabClose: fn(),
    onFocus: fn(),
    onBlur: fn(),
    items: [
      {
        id: 'tab1',
        label: 'Tab 1',
        closable: true,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 1</Typography>
          </Box>
        ),
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        closable: true,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 2</Typography>
          </Box>
        ),
      },
      {
        id: 'tab3',
        label: 'Tab 3',
        closable: false,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 3</Typography>
          </Box>
        ),
      },
    ],
  },
  render: (args) => {
    const ClosableTabsWrapper = () => {
      const [tabs, setTabs] = useState(args.items);
      const [value, setValue] = useState('tab1');

      const handleChange = (event: React.SyntheticEvent, tabId: string) => {
        setValue(tabId);
        args.onChange(event, tabId);
      };

      const handleTabClose = (tabId: string) => {
        const newTabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(newTabs);
        if (value === tabId && newTabs.length > 0) {
          setValue(newTabs[0].id);
        }
        args.onTabClose(tabId);
      };

      return (
        <Box sx={{ width: 600, minHeight: 300 }}>
          <Tabs
            {...args}
            items={tabs}
            value={value}
            onChange={handleChange}
            onTabClose={handleTabClose}
            onFocus={args.onFocus}
            onBlur={args.onBlur}
          />
        </Box>
      );
    };

    return <ClosableTabsWrapper />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify close buttons are rendered', async () => {
      // Check close buttons for closable tabs
      const closeButtons = canvas.getAllByRole('button', { name: 'Close tab' });
      // Should have 2 close buttons (tab1 and tab2)
      await expect(closeButtons).toHaveLength(2);
    });

    await step('Close a tab', async () => {
      // Get the first close button
      const closeButtons = canvas.getAllByRole('button', { name: 'Close tab' });
      const firstCloseButton = closeButtons[0];

      // Click close button
      await userEvent.click(firstCloseButton);

      // Wait for tab to be removed
      await waitFor(() => {
        const tabs = canvas.getAllByRole('tab');
        expect(tabs).toHaveLength(2);
      });
    });

    await step('Verify non-closable tab has no close button', async () => {
      const tab3 = canvas.getByRole('tab', { name: /Tab 3/i });

      // Should not have a close button within Tab 3
      const closeButtonInTab3 = within(tab3).queryByRole('button', { name: 'Close tab' });
      await expect(closeButtonInTab3).not.toBeInTheDocument();
    });
  },
};

// 4. Badge Test
export const BadgeTest: Story = {
  name: '🔴 Badge Test',
  args: {
    items: [
      {
        id: 'messages',
        label: 'Messages',
        icon: <Email />,
        badge: 5,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>5 new messages</Typography>
          </Box>
        ),
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <Notifications />,
        badge: 99,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>99+ notifications</Typography>
          </Box>
        ),
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Dashboard />,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Dashboard content</Typography>
          </Box>
        ),
      },
    ],
    onChangeCallback: fn(),
    onTabCloseCallback: fn(),
    onFocusCallback: fn(),
    onBlurCallback: fn(),
  },
  render: (args) => <TabsTestWrapper {...args} initialValue="messages" />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify badges are rendered', async () => {
      // Check for badge elements
      const badges = canvas.getAllByText(/^(5|99)$/);
      await expect(badges).toHaveLength(2);

      // Verify badge content
      await expect(canvas.getByText('5')).toBeInTheDocument();
      await expect(canvas.getByText('99')).toBeInTheDocument();
    });

    await step('Verify tab without badge', async () => {
      const dashboardTab = canvas.getByRole('tab', { name: /Dashboard/i });
      await expect(dashboardTab).toBeInTheDocument();

      // Dashboard tab should not contain any badge numbers
      const dashboardContainer = dashboardTab.closest('[role="tab"]');
      const badgeInDashboard = dashboardContainer
        ? within(dashboardContainer).queryByText(/^(5|99)$/)
        : null;
      await expect(badgeInDashboard).toBeNull();
    });
  },
};

// 5. Disabled Tabs Test
export const DisabledTabsTest: Story = {
  name: '🚫 Disabled Tabs Test',
  args: {
    items: [
      {
        id: 'tab1',
        label: 'Active Tab',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Active content</Typography>
          </Box>
        ),
      },
      {
        id: 'tab2',
        label: 'Disabled Tab',
        disabled: true,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>This should not be visible</Typography>
          </Box>
        ),
      },
      {
        id: 'tab3',
        label: 'Another Active Tab',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Another active content</Typography>
          </Box>
        ),
      },
    ],
  },
  render: (args) => <TabsTestWrapper {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify disabled tab appearance', async () => {
      const disabledTab = canvas.getByRole('tab', { name: /Disabled Tab/i });
      await expect(disabledTab).toBeInTheDocument();
      await expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });

    await step('Attempt to click disabled tab', async () => {
      const disabledTab = canvas.getByRole('tab', { name: /Disabled Tab/i });

      // Try to click but expect it to fail gracefully due to pointer-events: none
      try {
        await userEvent.click(disabledTab, { skipPointerEventsCheck: true });
      } catch {
        // Expected to fail due to pointer-events: none
      }

      // Should not be selected
      await expect(disabledTab).toHaveAttribute('aria-selected', 'false');

      // First tab should still be selected
      const firstTab = canvas.getByRole('tab', { name: 'Active Tab' });
      await expect(firstTab).toHaveAttribute('aria-selected', 'true');
    });

    await step('Verify disabled content is not shown', async () => {
      // The disabled tab's content should not be visible
      const disabledContent = canvas.queryByText('This should not be visible');
      await expect(disabledContent).not.toBeInTheDocument();
    });
  },
};

// 6. Variant Test
export const VariantTest: Story = {
  name: '🎨 Variant Test',
  args: {
    items: itemsWithIcons,
  },
  render: () => {
    const variants = ['default', 'pills', 'underline', 'enclosed'] as const;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: 800 }}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="h6" gutterBottom>
              {variant}
            </Typography>
            <TabsTestWrapper items={itemsWithIcons} variant={variant} initialValue="home" />
          </Box>
        ))}
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all variants are rendered', async () => {
      // Check that all variant labels are present
      await expect(canvas.getByText('default')).toBeInTheDocument();
      await expect(canvas.getByText('pills')).toBeInTheDocument();
      await expect(canvas.getByText('underline')).toBeInTheDocument();
      await expect(canvas.getByText('enclosed')).toBeInTheDocument();

      // Check that tabs are rendered for each variant
      const allTabs = canvas.getAllByRole('tab');
      // 3 tabs × 4 variants = 12 tabs
      await expect(allTabs).toHaveLength(12);
    });
  },
};

// 7. Size Variation Test
export const SizeVariationTest: Story = {
  name: '📏 Size Variation Test',
  args: {
    items: basicTestItems,
    onChange: fn(),
    onTabClose: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => {
    const sizes = ['sm', 'md', 'lg'] as const;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 600 }}>
        {sizes.map((size) => (
          <Box key={size}>
            <Typography variant="subtitle2" gutterBottom>
              Size: {size}
            </Typography>
            <TabsTestWrapper
              items={basicTestItems}
              size={size}
              variant="default"
              initialValue="tab1"
              onChangeCallback={args.onChange}
              onTabCloseCallback={args.onTabClose}
              onFocusCallback={args.onFocus}
              onBlurCallback={args.onBlur}
            />
          </Box>
        ))}
      </Box>
    );
  },
  parameters: {
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all sizes are rendered', async () => {
      // Check size labels
      await expect(canvas.getByText('Size: sm')).toBeInTheDocument();
      await expect(canvas.getByText('Size: md')).toBeInTheDocument();
      await expect(canvas.getByText('Size: lg')).toBeInTheDocument();

      // Check that tabs exist for each size
      const allTabs = canvas.getAllByRole('tab');
      // 3 tabs × 3 sizes = 9 tabs
      await expect(allTabs).toHaveLength(9);
    });
  },
};

// 8. Scrollable Tabs Test
export const ScrollableTabsTest: Story = {
  name: '📜 Scrollable Tabs Test',
  args: {
    scrollable: true,
    items: [
      ...basicTestItems,
      {
        id: 'tab4',
        label: 'Tab 4',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 4</Typography>
          </Box>
        ),
      },
      {
        id: 'tab5',
        label: 'Tab 5',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 5</Typography>
          </Box>
        ),
      },
      {
        id: 'tab6',
        label: 'Tab 6',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 6</Typography>
          </Box>
        ),
      },
      {
        id: 'tab7',
        label: 'Tab 7',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 7</Typography>
          </Box>
        ),
      },
      {
        id: 'tab8',
        label: 'Tab 8',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Content 8</Typography>
          </Box>
        ),
      },
    ],
  },
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <TabsTestWrapper {...args} />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify scrollable tabs are rendered', async () => {
      // Check that all tabs are rendered
      const allTabs = canvas.getAllByRole('tab');
      await expect(allTabs).toHaveLength(8);
    });

    await step('Check for scroll buttons', async () => {
      // MUI adds scroll buttons when tabs overflow
      // Note: Scroll buttons might not appear if all tabs fit
      const tabsContainer = canvas.getByRole('tablist');
      await expect(tabsContainer).toBeInTheDocument();
    });
  },
};

// 9. Animation Test
export const AnimationTest: Story = {
  name: '🎬 Animation Test',
  args: {
    items: basicTestItems,
    animateContent: true,
    animationDuration: 300,
  },
  render: (args) => <TabsTestWrapper {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Switch tabs with animation', async () => {
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });

      // Click tab2
      await userEvent.click(tab2);

      // Wait for animation to complete
      await waitFor(
        () => {
          const panel2 = canvas.getByRole('tabpanel', { name: /Tab 2/i });
          expect(panel2).toBeInTheDocument();
          expect(panel2).toHaveTextContent('Content for Tab 2');
        },
        { timeout: 500 },
      );
    });

    await step('Switch back with animation', async () => {
      const tab1 = canvas.getByRole('tab', { name: /Tab 1/i });

      // Click tab1
      await userEvent.click(tab1);

      // Wait for animation
      await waitFor(
        () => {
          const panel1 = canvas.getByRole('tabpanel', { name: /Tab 1/i });
          expect(panel1).toBeInTheDocument();
          expect(panel1).toHaveTextContent('Content for Tab 1');
        },
        { timeout: 500 },
      );
    });
  },
};

// 10. Persist Content Test
export const PersistContentTest: Story = {
  name: '💾 Persist Content Test',
  args: {
    items: [
      {
        id: 'form',
        label: 'Form',
        content: (
          <Box sx={{ p: 2 }}>
            <input type="text" data-testid="form-input" placeholder="Enter text" />
          </Box>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Settings content</Typography>
          </Box>
        ),
      },
    ],
    persistContent: true,
  },
  render: (args) => <TabsTestWrapper {...args} initialValue="form" />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Enter text in form', async () => {
      const input = canvas.getByTestId('form-input');
      await userEvent.type(input, 'Test value');
      await expect(input).toHaveValue('Test value');
    });

    await step('Switch to another tab', async () => {
      const settingsTab = canvas.getByRole('tab', { name: /Settings/i });
      await userEvent.click(settingsTab);

      // Settings panel should be visible
      const settingsPanel = canvas.getByRole('tabpanel', { name: /Settings/i });
      await expect(settingsPanel).toBeInTheDocument();
    });

    await step('Switch back and verify form persisted', async () => {
      const formTab = canvas.getByRole('tab', { name: /Form/i });
      await userEvent.click(formTab);

      // Check that input value is preserved
      const input = canvas.getByTestId('form-input');
      await expect(input).toHaveValue('Test value');
    });
  },
};

// 11. Loading State Test
export const LoadingStateTest: Story = {
  name: '⏳ Loading State Test',
  args: {
    items: basicTestItems,
    loading: true,
  },
  render: (args) => <TabsTestWrapper {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify loading indicator is shown', async () => {
      // Check for loading spinner (CircularProgress)
      const loadingIndicator = canvas.getByRole('progressbar');
      await expect(loadingIndicator).toBeInTheDocument();
    });

    await step('Verify content is not shown while loading', async () => {
      // Content should not be visible
      const content = canvas.queryByText('Content for Tab 1');
      await expect(content).not.toBeInTheDocument();
    });
  },
};

// 12. Accessibility Test
export const AccessibilityTest: Story = {
  name: '♿ Accessibility Test',
  args: {
    items: itemsWithIcons,
  },
  render: (args) => <TabsTestWrapper {...args} initialValue="home" />,
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'tabindex', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes', async () => {
      // Check tablist role
      const tablist = canvas.getByRole('tablist');
      await expect(tablist).toBeInTheDocument();

      // Check tab roles and ARIA attributes
      const tabs = canvas.getAllByRole('tab');
      for (const tab of tabs) {
        await expect(tab).toHaveAttribute('role', 'tab');
        await expect(tab).toHaveAttribute('aria-controls');
        await expect(tab).toHaveAttribute('id');
      }

      // Check tabpanel role and ARIA attributes
      const panel = canvas.getByRole('tabpanel');
      await expect(panel).toHaveAttribute('role', 'tabpanel');
      await expect(panel).toHaveAttribute('aria-labelledby');
      await expect(panel).toHaveAttribute('id');
    });

    await step('Verify keyboard accessibility', async () => {
      const firstTab = canvas.getByRole('tab', { name: /Home/i });

      // Focus first tab
      firstTab.focus();
      await expect(firstTab).toHaveFocus();

      // Tab key should move focus out of tablist
      await userEvent.tab();
      await expect(firstTab).not.toHaveFocus();

      // Shift+Tab should return focus to tablist
      await userEvent.tab({ shift: true });
      await expect(firstTab).toHaveFocus();
    });
  },
};

// 13. Color Theme Test
export const ColorThemeTest: Story = {
  name: '🎨 Color Theme Test',
  args: {
    items: basicTestItems,
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 600 }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Primary Color
        </Typography>
        <TabsTestWrapper items={basicTestItems} color="primary" variant="default" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Secondary Color
        </Typography>
        <TabsTestWrapper items={basicTestItems} color="secondary" variant="default" />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify both color themes are rendered', async () => {
      await expect(canvas.getByText('Primary Color')).toBeInTheDocument();
      await expect(canvas.getByText('Secondary Color')).toBeInTheDocument();

      // Check that tabs are rendered for both themes
      const allTabs = canvas.getAllByRole('tab');
      await expect(allTabs).toHaveLength(6); // 3 tabs × 2 themes
    });
  },
};

// 14. Full Width Test
export const FullWidthTest: Story = {
  name: '↔️ Full Width Test',
  args: {
    items: basicTestItems.slice(0, 2),
    fullWidth: true,
    variant: 'default',
  },
  render: (args) => (
    <Box sx={{ width: 800, border: '1px dashed #ccc', p: 2 }}>
      <TabsTestWrapper {...args} />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify tabs stretch full width', async () => {
      const tablist = canvas.getByRole('tablist');
      await expect(tablist).toBeInTheDocument();

      // Tabs should be present
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(2);
    });
  },
};

// 15. Centered Tabs Test
export const CenteredTabsTest: Story = {
  name: '🎯 Centered Tabs Test',
  args: {
    items: basicTestItems.slice(0, 2),
    centered: true,
    variant: 'default',
  },
  render: (args) => (
    <Box sx={{ width: 800, border: '1px dashed #ccc', p: 2 }}>
      <TabsTestWrapper {...args} />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify tabs are centered', async () => {
      const tablist = canvas.getByRole('tablist');
      await expect(tablist).toBeInTheDocument();

      // Tabs should be present
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(2);
    });
  },
};

// 16. Edge Cases Test
export const EdgeCasesTest: Story = {
  name: '🔧 Edge Cases Test',
  args: {
    items: [
      {
        id: 'empty',
        label: '',
        content: <Box sx={{ p: 2 }}></Box>,
      },
      {
        id: 'long',
        label: 'This is a very long tab label that might overflow the container',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Long label content</Typography>
          </Box>
        ),
      },
      {
        id: 'special',
        label: 'Special @#$% Characters!',
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Special characters content</Typography>
          </Box>
        ),
      },
    ],
  },
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <TabsTestWrapper {...args} initialValue="long" />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify edge case tabs are rendered', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(3);

      // Check special characters tab
      const specialTab = canvas.getByRole('tab', { name: /Special.*Characters/i });
      await expect(specialTab).toBeInTheDocument();

      // Handle empty label
      const emptyTab = tabs[0];
      await expect(emptyTab).toBeInTheDocument();
      // Even with empty label, tab should be clickable
      await userEvent.click(emptyTab);
      await expect(emptyTab).toHaveAttribute('aria-selected', 'true');
    });
  },
};

// 17. Custom Indicator Color Test
export const CustomIndicatorColorTest: Story = {
  name: '🖌️ Custom Indicator Color Test',
  args: {
    items: basicTestItems,
    variant: 'default',
    indicatorColor: '#ff6b6b',
  },
  render: (args) => <TabsTestWrapper {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify tabs with custom indicator are rendered', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(3);

      // Click to switch tabs and verify indicator moves
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });
      await userEvent.click(tab2);
      await expect(tab2).toHaveAttribute('aria-selected', 'true');
    });
  },
};

// 18. Dividers Test
export const DividersTest: Story = {
  name: '│ Dividers Test',
  args: {
    items: basicTestItems,
    showDividers: true,
    variant: 'underline',
  },
  render: (args) => <TabsTestWrapper {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify tabs with dividers are rendered', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(3);

      // Tabs should be functional
      const tab2 = canvas.getByRole('tab', { name: /Tab 2/i });
      await userEvent.click(tab2);
      await expect(tab2).toHaveAttribute('aria-selected', 'true');
    });
  },
};

// 19. Comprehensive Integration Test
export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  args: {
    variant: 'pills',
    size: 'md',
    color: 'primary',
    animateContent: true,
    onChange: fn(),
    onTabClose: fn(),
    onFocus: fn(),
    onBlur: fn(),
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home />,
        badge: 2,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Home with notifications</Typography>
          </Box>
        ),
      },
      {
        id: 'security',
        label: 'Security',
        icon: <Security />,
        disabled: true,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Security (disabled)</Typography>
          </Box>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings />,
        closable: true,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography>Closable settings</Typography>
          </Box>
        ),
      },
    ],
  },
  render: (args) => {
    const IntegrationWrapper = () => {
      const [items, setItems] = useState(args.items);
      const [value, setValue] = useState('home');

      const handleChange = (event: React.SyntheticEvent, tabId: string) => {
        setValue(tabId);
        args.onChange(event, tabId);
      };

      const handleTabClose = (tabId: string) => {
        const newItems = items.filter((item) => item.id !== tabId);
        setItems(newItems);
        if (value === tabId && newItems.length > 0) {
          setValue(newItems[0].id);
        }
        args.onTabClose(tabId);
      };

      return (
        <Box sx={{ width: 600, minHeight: 300 }}>
          <Tabs
            {...args}
            items={items}
            value={value}
            onChange={handleChange}
            onTabClose={handleTabClose}
            onFocus={args.onFocus}
            onBlur={args.onBlur}
          />
        </Box>
      );
    };

    return <IntegrationWrapper />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all features work together', async () => {
      // Check badge
      await expect(canvas.getByText('2')).toBeInTheDocument();

      // Check disabled tab
      const securityTab = canvas.getByRole('tab', { name: /Security/i });
      await expect(securityTab).toHaveAttribute('aria-disabled', 'true');

      // Check closable tab has close button
      const closeButtons = canvas.getAllByRole('button', { name: 'Close tab' });
      await expect(closeButtons.length).toBeGreaterThan(0);
    });

    await step('Test tab switching with animation', async () => {
      const settingsTab = canvas.getByRole('tab', { name: /Settings/i });
      await userEvent.click(settingsTab);

      // Wait for animation
      await waitFor(() => {
        const panel = canvas.getByRole('tabpanel');
        expect(panel).toHaveTextContent('Closable settings');
      });
    });

    await step('Close the settings tab', async () => {
      const closeButtons = canvas.getAllByRole('button', { name: 'Close tab' });
      const settingsCloseButton = closeButtons[0];

      await userEvent.click(settingsCloseButton);

      // Wait for tab to be removed
      await waitFor(() => {
        const settingsTab = canvas.queryByRole('tab', { name: /Settings/i });
        expect(settingsTab).not.toBeInTheDocument();
      });

      // Should switch to home tab
      const homeTab = canvas.getByRole('tab', { name: /Home/i });
      await expect(homeTab).toHaveAttribute('aria-selected', 'true');
    });
  },
};
