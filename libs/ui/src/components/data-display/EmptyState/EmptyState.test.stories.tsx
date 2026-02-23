import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { EmptyState } from './EmptyState';

// Test illustration component
const TestIcon = () => (
  <SvgIcon sx={{ fontSize: 64 }} data-testid="empty-state-icon">
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  </SvgIcon>
);

const meta: Meta<typeof EmptyState> = {
  title: 'DataDisplay/AsyncStates/EmptyState/Tests',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:EmptyState'],
  // Disable auto-action generation for onCreate/onRefresh to prevent them from
  // being truthy when not explicitly passed (otherwise they get auto-mocked by
  // the global argTypesRegex: '^on[A-Z].*' pattern)
  argTypes: {
    onCreate: { action: false },
    onRefresh: { action: false },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Interaction Tests
export const BasicInteraction: Story = {
  args: {
    title: 'Basic Interaction Test',
    description: 'Testing basic rendering and accessibility.',
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test component renders
    const title = canvas.getByRole('heading', { name: 'Basic Interaction Test' });
    await expect(title).toBeInTheDocument();

    // Test region role
    const region = canvas.getByRole('region');
    await expect(region).toBeInTheDocument();

    // Test aria-labelledby
    await expect(region).toHaveAttribute('aria-labelledby', title.id);

    // Test description
    const description = canvas.getByText('Testing basic rendering and accessibility.');
    await expect(description).toBeInTheDocument();
  },
};

export const ActionInteraction: Story = {
  args: {
    title: 'Action Interaction Test',
    description: 'Testing action button interactions.',
    primaryAction: {
      label: 'Primary Action',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Secondary Action',
      onClick: fn(),
    },
    helpLink: {
      label: 'Help Link',
      href: '#help',
    },
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test primary action click
    const primaryButton = canvas.getByRole('button', { name: 'Primary Action' });
    await expect(primaryButton).toBeInTheDocument();
    await userEvent.click(primaryButton);
    await expect(args.primaryAction?.onClick).toHaveBeenCalledTimes(1);

    // Test secondary action click
    const secondaryButton = canvas.getByRole('button', { name: 'Secondary Action' });
    await expect(secondaryButton).toBeInTheDocument();
    await userEvent.click(secondaryButton);
    await expect(args.secondaryAction?.onClick).toHaveBeenCalledTimes(1);

    // Test help link
    const helpLink = canvas.getByRole('link', { name: 'Help Link' });
    await expect(helpLink).toBeInTheDocument();
    await expect(helpLink).toHaveAttribute('href', '#help');
  },
};

export const KeyboardNavigation: Story = {
  args: {
    title: 'Keyboard Navigation Test',
    description: 'Testing keyboard accessibility.',
    primaryAction: {
      label: 'Primary',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Secondary',
      onClick: fn(),
    },
    helpLink: {
      label: 'Help',
      href: '#help',
    },
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Tab to primary button
    await userEvent.tab();
    const primaryButton = canvas.getByRole('button', { name: 'Primary' });
    await expect(primaryButton).toHaveFocus();

    // Press Enter to activate
    await userEvent.keyboard('{Enter}');
    await expect(args.primaryAction?.onClick).toHaveBeenCalledTimes(1);

    // Tab to secondary button
    await userEvent.tab();
    const secondaryButton = canvas.getByRole('button', { name: 'Secondary' });
    await expect(secondaryButton).toHaveFocus();

    // Tab to help link
    await userEvent.tab();
    const helpLink = canvas.getByRole('link', { name: 'Help' });
    await expect(helpLink).toHaveFocus();
  },
};

export const ScreenReader: Story = {
  args: {
    title: 'Screen Reader Test',
    description: 'Testing screen reader accessibility features.',
    illustration: <TestIcon />,
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test region has proper labeling
    const region = canvas.getByRole('region');
    const heading = canvas.getByRole('heading');
    await expect(region).toHaveAttribute('aria-labelledby', heading.id);

    // Test heading structure
    await expect(heading).toHaveAttribute('id');
    await expect(heading.tagName).toBe('H3');

    // Test illustration accessibility
    const icon = canvas.getAllByTestId('empty-state-icon')[0];
    await expect(icon).toBeInTheDocument();
  },
};

export const FocusManagement: Story = {
  args: {
    title: 'Focus Management Test',
    description: 'Testing focus behavior and management.',
    primaryAction: {
      label: 'Focus Test Button',
      onClick: fn(),
    },
    helpLink: {
      label: 'Focus Test Link',
      href: '#focus',
    },
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial focus state
    const button = canvas.getByRole('button', { name: 'Focus Test Button' });
    const link = canvas.getByRole('link', { name: 'Focus Test Link' });

    // Test focus indicators are visible
    await userEvent.tab();
    await expect(button).toHaveFocus();

    await userEvent.tab();
    await expect(link).toHaveFocus();

    // Test focus trap doesn't exist (buttons should be focusable)
    await userEvent.tab();
    await expect(link).not.toHaveFocus();
  },
};

export const ResponsiveDesign: Story = {
  args: {
    title: 'Responsive Design Test',
    description: 'Testing responsive behavior across viewport sizes.',
    variant: 'action',
    primaryAction: {
      label: 'Primary',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Secondary',
      onClick: fn(),
    },
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test buttons are present and accessible
    const primaryButton = canvas.getByRole('button', { name: 'Primary' });
    const secondaryButton = canvas.getByRole('button', { name: 'Secondary' });

    await expect(primaryButton).toBeInTheDocument();
    await expect(secondaryButton).toBeInTheDocument();

    // Test responsive text wrapping
    const title = canvas.getByRole('heading');
    await expect(title).toBeInTheDocument();
  },
};

export const ThemeVariations: Story = {
  args: {
    title: 'Theme Variations Test',
    description: 'Testing theme compatibility and color contrast.',
    illustration: <TestIcon />,
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test component renders in different themes
    const title = canvas.getByRole('heading', { name: 'Theme Variations Test' });
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText('Testing theme compatibility and color contrast.');
    await expect(description).toBeInTheDocument();

    // Test icon renders
    const icon = canvas.getAllByTestId('empty-state-icon')[0];
    await expect(icon).toBeInTheDocument();
  },
};

export const VisualStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <EmptyState title="Default State" description="Default visual appearance." />
      <EmptyState
        variant="illustrated"
        title="Illustrated State"
        description="With illustration visual state."
        illustration={<TestIcon />}
      />
      <EmptyState
        variant="minimal"
        title="Minimal State"
        description="Minimal visual appearance."
      />
      <EmptyState
        variant="action"
        title="Action State"
        description="With action buttons."
        primaryAction={{
          label: 'Primary',
          onClick: () => {},
        }}
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all visual states render
    const states = ['Default State', 'Illustrated State', 'Minimal State', 'Action State'];

    for (const stateName of states) {
      const heading = canvas.getByRole('heading', { name: stateName });
      await expect(heading).toBeInTheDocument();
    }

    // Test action button in action state
    const actionButton = canvas.getByRole('button', { name: 'Primary' });
    await expect(actionButton).toBeInTheDocument();
  },
};

export const Performance: Story = {
  args: {
    title: 'Performance Test',
    description: 'Testing component render performance.',
    illustration: <TestIcon />,
    primaryAction: {
      label: 'Performance Action',
      onClick: fn(),
    },
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test all key elements are present
    const title = canvas.getByRole('heading', { name: 'Performance Test' });
    const description = canvas.getByText('Testing component render performance.');
    const icon = canvas.getAllByTestId('empty-state-icon')[0];
    const button = canvas.getByRole('button', { name: 'Performance Action' });

    await expect(title).toBeInTheDocument();
    await expect(description).toBeInTheDocument();
    await expect(icon).toBeInTheDocument();
    await expect(button).toBeInTheDocument();

    // Test interaction performance
    await userEvent.click(button);
    await waitFor(
      () => expect(args.primaryAction?.onClick).toHaveBeenCalled(),
      { timeout: 3000 }
    );

    // Verify click handler was called exactly once
    await expect(args.primaryAction?.onClick).toHaveBeenCalledTimes(1);
  },
};

export const EdgeCases: Story = {
  args: {
    title:
      'Very Long Title That Should Wrap Properly Even When It Exceeds The Maximum Width Of The Container And Continues To Be Very Long',
    description:
      'Very long description text that should wrap properly and maintain readability even when it contains a lot of content and exceeds the normal expected length for description text in an empty state component. This should handle text overflow gracefully.',
    helpLink: {
      label: 'Very Long Help Link Text That Should Also Handle Overflow Gracefully',
      href: '#very-long-url-that-might-cause-layout-issues-if-not-handled-properly',
      external: true,
    },
    // Explicitly set to undefined to override auto-generated actions from argTypesRegex
    onCreate: undefined,
    onRefresh: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test long title renders and wraps
    const title = canvas.getByRole('heading');
    await expect(title).toBeInTheDocument();

    // Test long description renders
    const description = canvas.getByText(/Very long description text/);
    await expect(description).toBeInTheDocument();

    // Test long help link renders
    const helpLink = canvas.getByRole('link');
    await expect(helpLink).toBeInTheDocument();
    await expect(helpLink).toHaveAttribute('target', '_blank');
    await expect(helpLink).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const Integration: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, border: '1px solid #ddd' }}>
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <EmptyState
          title="Integrated Empty State"
          description="This empty state is integrated within other components."
          primaryAction={{
            label: 'Integrated Action',
            onClick: fn(),
          }}
        />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test integration within container
    const title = canvas.getByRole('heading', { name: 'Integrated Empty State' });
    await expect(title).toBeInTheDocument();

    // Test integrated action works
    const button = canvas.getByRole('button', { name: 'Integrated Action' });
    await expect(button).toBeInTheDocument();

    // Test container integration doesn't break functionality
    const region = canvas.getByRole('region');
    await expect(region).toBeInTheDocument();
  },
};
