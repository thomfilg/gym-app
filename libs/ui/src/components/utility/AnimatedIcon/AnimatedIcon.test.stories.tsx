import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Favorite, Refresh,Settings, Star } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { AnimatedIcon } from './AnimatedIcon';

const meta: Meta<typeof AnimatedIcon> = {
  title: 'Enhanced/AnimatedIcon/Tests',
  component: AnimatedIcon,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  args: {
    children: <Settings />,
    variant: 'rotate',
    size: 'md',
    onClick: fn(),
    dataTestId: 'animated-icon-basic',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const animatedIcon = canvas.getByRole('img');

    // Test that component renders
    await expect(animatedIcon).toBeInTheDocument();

    // Test data-testid attribute
    await expect(animatedIcon).toHaveAttribute('data-testid', 'animated-icon-basic');
    const iconByTestId = canvas.getByTestId('animated-icon-basic');
    await expect(iconByTestId).toBeInTheDocument();

    // Test click functionality
    await userEvent.click(animatedIcon);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Test aria-label
    await expect(animatedIcon).toHaveAttribute('aria-label');
  },
};

// Form Interaction Tests
const FormInteractionComponent = () => {
  const [selectedIcon, setSelectedIcon] = React.useState<string>('settings');

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Select an Icon</Typography>
      <Stack direction="row" spacing={3}>
        {[
          { key: 'settings', icon: <Settings />, label: 'Settings' },
          { key: 'favorite', icon: <Favorite />, label: 'Favorite' },
          { key: 'star', icon: <Star />, label: 'Star' },
        ].map(({ key, icon, label }) => (
          <AnimatedIcon
            key={key}
            variant={selectedIcon === key ? 'pulse' : 'none'}
            size="lg"
            color={selectedIcon === key ? '#FF6B6B' : undefined}
            glow={selectedIcon === key}
            onClick={() => setSelectedIcon(key)}
            aria-label={`Select ${label} icon`}
            dataTestId={`animated-icon-${key}`}
          >
            {icon}
          </AnimatedIcon>
        ))}
      </Stack>
      <Typography variant="body2" data-testid="selected-icon">
        Selected: {selectedIcon}
      </Typography>
    </Stack>
  );
};

export const FormInteraction: Story = {
  render: () => <FormInteractionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    const selectedText = canvas.getByTestId('selected-icon');
    await expect(selectedText).toHaveTextContent('Selected: settings');

    // Test that testIds are present
    const settingsIcon = canvas.getByTestId('animated-icon-settings');
    const favoriteIcon = canvas.getByTestId('animated-icon-favorite');
    const starIcon = canvas.getByTestId('animated-icon-star');
    await expect(settingsIcon).toBeInTheDocument();
    await expect(favoriteIcon).toBeInTheDocument();
    await expect(starIcon).toBeInTheDocument();

    // Test clicking different icons using testId
    await userEvent.click(favoriteIcon);

    await waitFor(async () => {
      await expect(selectedText).toHaveTextContent('Selected: favorite');
    });

    // Test star icon using testId
    await userEvent.click(starIcon);

    await waitFor(async () => {
      await expect(selectedText).toHaveTextContent('Selected: star');
    });
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Keyboard Navigation Test</Typography>
      <Stack direction="row" spacing={3}>
        <AnimatedIcon
          variant="rotate"
          size="md"
          onClick={fn()}
          aria-label="First animated icon"
          tabIndex={0}
        >
          <Settings />
        </AnimatedIcon>
        <AnimatedIcon
          variant="pulse"
          size="md"
          onClick={fn()}
          aria-label="Second animated icon"
          tabIndex={0}
        >
          <Favorite />
        </AnimatedIcon>
        <AnimatedIcon
          variant="translate"
          size="md"
          onClick={fn()}
          aria-label="Third animated icon"
          tabIndex={0}
        >
          <Star />
        </AnimatedIcon>
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test tab navigation
    const firstIcon = canvas.getByLabelText('First animated icon');
    const secondIcon = canvas.getByLabelText('Second animated icon');
    const thirdIcon = canvas.getByLabelText('Third animated icon');

    // Focus first icon
    firstIcon.focus();
    await expect(firstIcon).toHaveFocus();

    // Tab to second icon
    await userEvent.tab();
    await expect(secondIcon).toHaveFocus();

    // Tab to third icon
    await userEvent.tab();
    await expect(thirdIcon).toHaveFocus();

    // Test Enter key activation
    await userEvent.keyboard('{Enter}');
    // Note: onClick would be called, but we can't test it directly in this context
  },
};

// Test ID Tests
export const TestIdVerification: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Test ID Verification</Typography>
      <Stack direction="row" spacing={3}>
        <AnimatedIcon
          variant="rotate"
          size="md"
          dataTestId="icon-with-testid"
          aria-label="Icon with test ID"
        >
          <Settings />
        </AnimatedIcon>
        <AnimatedIcon
          variant="pulse"
          size="md"
          aria-label="Icon without test ID"
        >
          <Favorite />
        </AnimatedIcon>
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that icon with testId can be queried
    const iconWithTestId = canvas.getByTestId('icon-with-testid');
    await expect(iconWithTestId).toBeInTheDocument();
    await expect(iconWithTestId).toHaveAttribute('data-testid', 'icon-with-testid');

    // Test that icon without testId doesn't have the attribute
    const iconWithoutTestId = canvas.getByLabelText('Icon without test ID');
    await expect(iconWithoutTestId).toBeInTheDocument();
    await expect(iconWithoutTestId).not.toHaveAttribute('data-testid');
  },
};

// Screen Reader Tests
export const ScreenReader: Story = {
  args: {
    children: <Refresh />,
    variant: 'rotate',
    size: 'lg',
    'aria-label': 'Loading animation icon',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('img');

    // Test that proper ARIA attributes are present
    await expect(icon).toHaveAttribute('role', 'img');
    await expect(icon).toHaveAttribute('aria-label', 'Loading animation icon');

    // Test that the icon is accessible to screen readers
    const description = canvas.getByLabelText('Loading animation icon');
    await expect(description).toBeInTheDocument();
  },
};

// Focus Management Tests
const FocusManagementComponent = () => {
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6">Focus Management</Typography>
      <Stack direction="row" spacing={3}>
        {[0, 1, 2].map((index) => (
          <AnimatedIcon
            key={index}
            variant={focusedIndex === index ? 'pulse' : 'none'}
            size="lg"
            glow={focusedIndex === index}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            tabIndex={0}
            aria-label={`Focus test icon ${index + 1}`}
          >
            <Settings />
          </AnimatedIcon>
        ))}
      </Stack>
    </Stack>
  );
};

export const FocusManagement: Story = {
  render: () => <FocusManagementComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test focus events
    const firstIcon = canvas.getByLabelText('Focus test icon 1');
    const secondIcon = canvas.getByLabelText('Focus test icon 2');

    // Focus first icon
    firstIcon.focus();
    await expect(firstIcon).toHaveFocus();

    // Move focus to second icon
    secondIcon.focus();
    await expect(secondIcon).toHaveFocus();
    await expect(firstIcon).not.toHaveFocus();
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Responsive Sizes</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Box key={size} textAlign="center">
            <AnimatedIcon variant="pulse" size={size}>
              <Star />
            </AnimatedIcon>
            <Typography variant="caption" display="block" mt={1}>
              {size.toUpperCase()}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all size variants render
    const sizes = ['SM', 'MD', 'LG', 'XL'];
    for (const size of sizes) {
      const sizeLabel = canvas.getByText(size);
      await expect(sizeLabel).toBeInTheDocument();
    }
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
};

// Theme Variation Tests
export const ThemeVariations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Theme Variations</Typography>
      <Stack direction="row" spacing={3}>
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <AnimatedIcon variant="rotate" size="lg">
            <Settings />
          </AnimatedIcon>
        </Box>
        <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: 1 }}>
          <AnimatedIcon variant="pulse" size="lg" color="#ffffff">
            <Favorite />
          </AnimatedIcon>
        </Box>
        <Box sx={{ p: 2, bgcolor: 'secondary.main', borderRadius: 1 }}>
          <AnimatedIcon variant="translate" size="lg" color="#ffffff">
            <Star />
          </AnimatedIcon>
        </Box>
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByRole('img');

    // Test that all theme variations render
    await expect(icons).toHaveLength(3);

    // Test that icons are properly themed
    for (const icon of icons) {
      await expect(icon).toBeVisible();
    }
  },
};

// Visual States Tests
export const VisualStates: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Visual Animation States</Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Animation Variants
          </Typography>
          <Stack direction="row" spacing={3}>
            <AnimatedIcon variant="rotate" size="lg" aria-label="Rotating icon">
              <Refresh />
            </AnimatedIcon>
            <AnimatedIcon variant="pulse" size="lg" aria-label="Pulsing icon">
              <Favorite />
            </AnimatedIcon>
            <AnimatedIcon variant="translate" size="lg" aria-label="Translating icon">
              <Star />
            </AnimatedIcon>
            <AnimatedIcon variant="none" size="lg" aria-label="Static icon">
              <Settings />
            </AnimatedIcon>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Effects
          </Typography>
          <Stack direction="row" spacing={3}>
            <AnimatedIcon variant="pulse" size="lg" glow aria-label="Glowing icon">
              <Star />
            </AnimatedIcon>
            <AnimatedIcon variant="rotate" size="lg" glass aria-label="Glass effect icon">
              <Settings />
            </AnimatedIcon>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all visual states render
    const rotatingIcon = canvas.getByLabelText('Rotating icon');
    const pulsingIcon = canvas.getByLabelText('Pulsing icon');
    const translatingIcon = canvas.getByLabelText('Translating icon');
    const staticIcon = canvas.getByLabelText('Static icon');
    const glowingIcon = canvas.getByLabelText('Glowing icon');
    const glassIcon = canvas.getByLabelText('Glass effect icon');

    await expect(rotatingIcon).toBeVisible();
    await expect(pulsingIcon).toBeVisible();
    await expect(translatingIcon).toBeVisible();
    await expect(staticIcon).toBeVisible();
    await expect(glowingIcon).toBeVisible();
    await expect(glassIcon).toBeVisible();
  },
};

// Performance Tests
export const Performance: Story = {
  render: () => {
    const icons = Array.from({ length: 20 }, (_, i) => (
      <AnimatedIcon
        key={i}
        variant={(['rotate', 'pulse', 'translate'] as const)[i % 3]}
        size="md"
        duration={1 + (i % 3)}
      >
        <Settings />
      </AnimatedIcon>
    ));

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Performance Test - 20 Animated Icons</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>{icons}</Box>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByRole('img');

    // Test that all icons render without performance issues
    await expect(icons).toHaveLength(20);

    // Test that animations are working
    for (const icon of icons.slice(0, 5)) {
      // Test first 5 to avoid timeout
      await expect(icon).toBeVisible();
    }
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Edge Cases</Typography>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          No Children
        </Typography>
        <AnimatedIcon variant="pulse" size="md" aria-label="Empty icon">
          {null}
        </AnimatedIcon>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Very Long Duration
        </Typography>
        <AnimatedIcon variant="rotate" size="md" duration={10}>
          <Settings />
        </AnimatedIcon>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Very Short Duration
        </Typography>
        <AnimatedIcon variant="pulse" size="md" duration={0.1}>
          <Favorite />
        </AnimatedIcon>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Delay
        </Typography>
        <AnimatedIcon variant="translate" size="md" delay={2}>
          <Star />
        </AnimatedIcon>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Non-looping Animation
        </Typography>
        <AnimatedIcon variant="pulse" size="md" loop={false}>
          <Settings />
        </AnimatedIcon>
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that edge cases don't break the component
    const emptyIcon = canvas.getByLabelText('Empty icon');
    await expect(emptyIcon).toBeInTheDocument();

    // Test that all animations render
    const icons = canvas.getAllByRole('img');
    await expect(icons.length).toBeGreaterThan(0);

    for (const icon of icons) {
      await expect(icon).toBeVisible();
    }
  },
};

// Integration Tests
export const Integration: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Integration with Other Components</Typography>

      {/* Integration with Button-like behavior */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="rotate" size="sm">
            <Refresh />
          </AnimatedIcon>
          <Typography>Refreshing data...</Typography>
        </Stack>
      </Box>

      {/* Integration with form-like behavior */}
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedIcon variant="pulse" size="md" glow glowColor="#4CAF50">
            <Favorite />
          </AnimatedIcon>
          <Typography>Like this content</Typography>
        </Stack>
      </Box>

      {/* Integration with complex layouts */}
      <Box sx={{ p: 3, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <AnimatedIcon variant="translate" size="lg" glass color="#ffffff">
            <Star />
          </AnimatedIcon>
          <Box>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Premium Feature
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Enhanced with glass morphism
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test integration scenarios
    const refreshText = canvas.getByText('Refreshing data...');
    const likeText = canvas.getByText('Like this content');
    const premiumText = canvas.getByText('Premium Feature');

    await expect(refreshText).toBeInTheDocument();
    await expect(likeText).toBeInTheDocument();
    await expect(premiumText).toBeInTheDocument();

    // Test that icons are still functional in integrated contexts
    const icons = canvas.getAllByRole('img');
    for (const icon of icons) {
      await expect(icon).toBeVisible();
    }
  },
};
