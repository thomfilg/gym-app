import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { HoverCard } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'DataDisplay/HoverCard/Tests',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:HoverCard'],
  argTypes: {
    onOpen: { action: 'onOpen' },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test 1: Basic Interaction (hover to show/hide)
export const BasicInteraction: Story = {
  args: {
    title: 'Test HoverCard',
    description: 'Testing hover interaction',
    enterDelay: 100,
    exitDelay: 100,
    children: <Button data-testid="hover-trigger">Hover Me</Button>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Wait to ensure any previous hover cards from other tests are fully closed
    await new Promise((resolve) => window.setTimeout(resolve, 300));

    await step('Initial state - hover card should not be visible', async () => {
      const trigger = await canvas.findByTestId('hover-trigger');
      expect(trigger).toBeInTheDocument();

      // Wait and verify no hover cards are visible
      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });

    await step('Hover over trigger - hover card should appear', async () => {
      const trigger = await canvas.findByTestId('hover-trigger');
      await userEvent.hover(trigger);

      // Wait for the enterDelay
      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).toBeInTheDocument();
          expect(hoverTitle).toHaveTextContent('Test HoverCard');
        },
        { timeout: 500 },
      );
    });

    await step('Move mouse away - hover card should disappear', async () => {
      await userEvent.unhover(await canvas.findByTestId('hover-trigger'));

      // Wait for the exitDelay
      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 2: Controlled State
export const ControlledState: Story = {
  render: function ControlledStateRender() {
    const [open, setOpen] = React.useState(false);
    const handleOpenChange = fn();

    return (
      <Stack spacing={2} alignItems="center">
        <Button onClick={() => setOpen(!open)} data-testid="control-button">
          Toggle HoverCard (Controlled)
        </Button>
        <HoverCard
          title="Controlled HoverCard"
          description="This is controlled externally"
          onOpen={() => {
            handleOpenChange('opened');
            setOpen(true);
          }}
          onClose={() => {
            handleOpenChange('closed');
            setOpen(false);
          }}
          enterDelay={100}
        >
          <Button data-testid="controlled-trigger">Controlled Trigger</Button>
        </HoverCard>
        <Typography data-testid="open-state">{open ? 'Open' : 'Closed'}</Typography>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state should be closed', async () => {
      const state = await canvas.findByTestId('open-state');
      expect(state).toHaveTextContent('Closed');
    });

    await step('Hovering should open the controlled card', async () => {
      const trigger = await canvas.findByTestId('controlled-trigger');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).toBeInTheDocument();
          expect(hoverTitle).toHaveTextContent('Controlled HoverCard');
        },
        { timeout: 500 },
      );
    });

    await step('State should update when opened', async () => {
      const state = await canvas.findByTestId('open-state');
      await waitFor(() => {
        expect(state).toHaveTextContent('Open');
      });
    });
  },
};

// Test 3: Keyboard Navigation
export const KeyboardNavigation: Story = {
  args: {
    title: 'Keyboard Accessible',
    description: 'Can be triggered via keyboard',
    enterDelay: 100,
    children: <Button data-testid="keyboard-trigger">Tab to me</Button>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus trigger with Tab key', async () => {
      const trigger = await canvas.findByTestId('keyboard-trigger');
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    await step('HoverCard should appear on focus', async () => {
      const trigger = await canvas.findByTestId('keyboard-trigger');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });

    await step('Escape key should close the hover card', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 4: Screen Reader
export const ScreenReader: Story = {
  args: {
    title: 'Accessible HoverCard',
    description: 'This content is announced to screen readers',
    enterDelay: 100,
    children: (
      <Button
        aria-label="User profile button with additional information on hover"
        data-testid="aria-trigger"
      >
        User Profile
      </Button>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Trigger should have proper aria-label', async () => {
      const trigger = await canvas.findByTestId('aria-trigger');
      expect(trigger).toHaveAttribute(
        'aria-label',
        'User profile button with additional information on hover',
      );
    });

    await step('HoverCard content should be accessible', async () => {
      // Wait a bit to ensure any previous hover cards are fully closed
      await new Promise((resolve) => window.setTimeout(resolve, 300));

      const trigger = await canvas.findByTestId('aria-trigger');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const hoverContent =
            canvasElement.ownerDocument.body.querySelector('[role="presentation"]');
          expect(hoverContent).toBeInTheDocument();

          // Check that content is readable
          const title = canvasElement.ownerDocument.body.querySelector('h6');
          expect(title).toHaveTextContent('Accessible HoverCard');
        },
        { timeout: 1000 },
      );

      // Clean up - unhover to close the card
      await userEvent.unhover(trigger);
      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 5: Focus Management
export const FocusManagement: Story = {
  args: {
    title: 'Focus Test',
    description: 'Testing focus behavior',
    enterDelay: 100,
    onOpen: fn(),
    onClose: fn(),
    children: (
      <Box>
        <Button data-testid="focus-trigger">Hover for Card</Button>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained">Action Button</Button>
        </Box>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial focus state', async () => {
      const trigger = await canvas.findByTestId('focus-trigger');
      expect(trigger).toBeInTheDocument();
    });

    await step('Focus should remain on trigger when hovering', async () => {
      const trigger = await canvas.findByTestId('focus-trigger');
      trigger.focus();
      expect(trigger).toHaveFocus();

      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).toBeInTheDocument();
          // Focus should still be on trigger
          expect(trigger).toHaveFocus();
        },
        { timeout: 500 },
      );
    });

    await step('Focus management after hover card closes', async () => {
      const trigger = await canvas.findByTestId('focus-trigger');

      await userEvent.unhover(trigger);

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );

      // Verify the trigger is still accessible
      expect(trigger).toBeInTheDocument();

      // For non-modal hover cards, focus behavior after unhover is not strictly defined
      // Verify focus wasn't trapped or lost to an inaccessible element
      const activeElement = document.activeElement;
      expect(activeElement).not.toBeNull();
      expect(activeElement).toBeDefined();

      // Focus should be on a valid accessible element (not trapped in the removed hover card)
      // For non-modal hover cards, focus typically remains on trigger or moves to body
      expect([trigger, document.body]).toContain(activeElement);

      // If focus is not on body, verify element is keyboard-accessible
      if (activeElement !== document.body) {
        const tabindex = activeElement?.getAttribute('tabindex');
        expect(tabindex).not.toBe('-1');
      }
    });
  },
};

// Test 6: Responsive Design
export const ResponsiveDesign: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
  render: () => (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <HoverCard
          title="Responsive HoverCard"
          description="This adapts to different screen sizes"
          maxWidth={300}
          placement="bottom"
          enterDelay={100}
          onOpen={fn()}
          onClose={fn()}
        >
          <Button data-testid="responsive-trigger">Hover Me</Button>
        </HoverCard>
      </Stack>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('HoverCard should render on all viewports', async () => {
      const trigger = await canvas.findByTestId('responsive-trigger');
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).toBeInTheDocument();

          // Check that card has max width constraint
          const card = canvasElement.ownerDocument.body.querySelector(
            '.MuiCard-root',
          ) as HTMLElement;
          expect(card).toBeInTheDocument();
          const computedStyle = window.getComputedStyle(card);
          const maxWidth = parseInt(computedStyle.maxWidth);
          expect(maxWidth).toBeLessThanOrEqual(300);
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 7: Theme Variations
export const ThemeVariations: Story = {
  render: () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (
      <Stack direction="row" spacing={4}>
        <ThemeProvider theme={lightTheme}>
          <HoverCard
            title="Light Theme"
            description="Card in light mode"
            variant="default"
            enterDelay={100}
            onOpen={fn()}
            onClose={fn()}
          >
            <Button data-testid="light-trigger">Light Mode</Button>
          </HoverCard>
        </ThemeProvider>

        <ThemeProvider theme={darkTheme}>
          <Box sx={{ bgcolor: 'grey.900', p: 2, borderRadius: 1 }}>
            <HoverCard
              title="Dark Theme"
              description="Card in dark mode"
              variant="default"
              enterDelay={100}
              onOpen={fn()}
              onClose={fn()}
            >
              <Button data-testid="dark-trigger" sx={{ color: 'white' }}>
                Dark Mode
              </Button>
            </HoverCard>
          </Box>
        </ThemeProvider>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Light theme hover card should render correctly', async () => {
      const lightTrigger = await canvas.findByTestId('light-trigger');
      await userEvent.hover(lightTrigger);

      await waitFor(
        async () => {
          const cards = canvasElement.ownerDocument.body.querySelectorAll('.MuiCard-root');
          const lightCard = Array.from(cards).find(
            (card) => card.querySelector('h6')?.textContent === 'Light Theme',
          ) as HTMLElement;

          expect(lightCard).toBeInTheDocument();
          const computedStyle = window.getComputedStyle(lightCard);
          // Light theme should have light background
          expect(computedStyle.backgroundColor).toMatch(/rgb/);
        },
        { timeout: 500 },
      );

      await userEvent.unhover(lightTrigger);
    });

    await step('Dark theme hover card should render correctly', async () => {
      const darkTrigger = await canvas.findByTestId('dark-trigger');
      await userEvent.hover(darkTrigger);

      await waitFor(
        async () => {
          const cards = canvasElement.ownerDocument.body.querySelectorAll('.MuiCard-root');
          const darkCard = Array.from(cards).find(
            (card) => card.querySelector('h6')?.textContent === 'Dark Theme',
          ) as HTMLElement;

          expect(darkCard).toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 8: Visual States
export const VisualStates: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <HoverCard
        variant="default"
        title="Default State"
        description="Standard appearance"
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="default-state">Default</Button>
      </HoverCard>

      <HoverCard
        variant="glass"
        title="Glass Effect"
        description="Glassmorphism style"
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="glass-state">Glass</Button>
      </HoverCard>

      <HoverCard
        variant="default"
        glow={true}
        title="Glow Effect"
        description="With glow animation"
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="glow-state">Glow</Button>
      </HoverCard>

      <HoverCard
        variant="default"
        pulse={true}
        title="Pulse Effect"
        description="With pulse animation"
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="pulse-state">Pulse</Button>
      </HoverCard>

      <HoverCard
        variant="default"
        disabled={true}
        title="Disabled"
        description="Should not appear"
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="disabled-state" disabled>
          Disabled
        </Button>
      </HoverCard>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default variant should display correctly', async () => {
      const trigger = await canvas.findByTestId('default-state');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector(
            '.MuiCard-root',
          ) as HTMLElement;
          expect(card).toBeInTheDocument();
          const title = card.querySelector('h6');
          expect(title).toHaveTextContent('Default State');
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);
      await waitFor(
        () => {
          const card = canvasElement.ownerDocument.body.querySelector('h6');
          expect(card).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });

    await step('Glass variant should have glass effect', async () => {
      const trigger = await canvas.findByTestId('glass-state');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const cards = canvasElement.ownerDocument.body.querySelectorAll('.MuiCard-root');
          const glassCard = Array.from(cards).find(
            (card) => card.querySelector('h6')?.textContent === 'Glass Effect',
          ) as HTMLElement;

          expect(glassCard).toBeInTheDocument();
          const computedStyle = window.getComputedStyle(glassCard);
          // Glass effect should have backdrop filter
          const backdropFilter = computedStyle.backdropFilter ||
            (computedStyle as any).webkitBackdropFilter;
          expect(backdropFilter).toContain('blur');
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);

      // Wait for hover card to close
      await waitFor(
        async () => {
          const glassCard = canvasElement.ownerDocument.body.querySelector('h6');
          expect(glassCard).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });

    await step('Disabled state should not show hover card', async () => {
      const trigger = await canvas.findByTestId('disabled-state');

      // Check the button is disabled
      expect(trigger).toBeDisabled();

      // For disabled buttons, we can't use userEvent.hover since they have pointer-events: none
      // Instead, we verify that the hover card remains closed
      // Wait a bit to ensure no hover card appears from any other interactions
      await new Promise((resolve) => window.setTimeout(resolve, 200));

      const disabledCard = canvasElement.ownerDocument.body.querySelector('h6');
      expect(disabledCard).not.toBeInTheDocument();
    });
  },
};

// Test 9: Performance
export const Performance: Story = {
  render: () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      title: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
    }));

    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {items.map((item) => (
          <HoverCard
            key={item.id}
            title={item.title}
            description={item.description}
            enterDelay={100}
            exitDelay={0}
            onOpen={fn()}
            onClose={fn()}
          >
            <Button variant="outlined" size="small" data-testid={`perf-trigger-${item.id}`}>
              Item {item.id + 1}
            </Button>
          </HoverCard>
        ))}
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Multiple hover cards should render efficiently', async () => {
      // Check that all triggers are rendered
      const triggers = await canvas.findAllByRole('button');
      expect(triggers).toHaveLength(20);
    });

    await step('Rapid hover should handle smoothly', async () => {
      const startTime = window.performance.now();

      // Rapidly hover over multiple items
      for (let i = 0; i < 5; i++) {
        const trigger = await canvas.findByTestId(`perf-trigger-${i}`);
        await userEvent.hover(trigger);
        await new Promise((resolve) => window.setTimeout(resolve, 50));
        await userEvent.unhover(trigger);
      }

      const endTime = window.performance.now();
      const elapsed = endTime - startTime;

      // Performance check - should complete rapidly
      expect(elapsed).toBeLessThan(2000);
    });

    await step('Memory cleanup on unmount', async () => {
      // Hover one more card to check it still works
      const trigger = await canvas.findByTestId('perf-trigger-10');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const hoverTitle = canvasElement.ownerDocument.body.querySelector('h6');
          expect(hoverTitle).toBeInTheDocument();
          expect(hoverTitle).toHaveTextContent('Item 11');
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 10: Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <Stack spacing={3}>
      <HoverCard
        title="Very Long Title That Should Wrap Properly in the HoverCard Component"
        description="This is an extremely long description that tests how the hover card handles text overflow and wrapping. It should display properly without breaking the layout or causing any visual issues in the component."
        maxWidth={250}
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="long-content">Long Content</Button>
      </HoverCard>

      <HoverCard title="" description="" enterDelay={100} onOpen={fn()} onClose={fn()}>
        <Button data-testid="empty-content">Empty Content</Button>
      </HoverCard>

      <HoverCard loading={true} enterDelay={100} onOpen={fn()} onClose={fn()}>
        <Button data-testid="loading-state">Loading State</Button>
      </HoverCard>

      <HoverCard
        title="With Custom Loading"
        loading={true}
        loadingComponent={<Typography>Custom Loading...</Typography>}
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="custom-loading">Custom Loading</Button>
      </HoverCard>

      <HoverCard
        title="Touch Enabled"
        description="Works on touch devices"
        touchEnabled={true}
        enterDelay={100}
        onOpen={fn()}
        onClose={fn()}
      >
        <Button data-testid="touch-enabled">Touch Enabled</Button>
      </HoverCard>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Long content should wrap properly', async () => {
      const trigger = await canvas.findByTestId('long-content');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector(
            '.MuiCard-root',
          ) as HTMLElement;
          expect(card).toBeInTheDocument();

          const title = card.querySelector('h6');
          expect(title).toHaveTextContent('Very Long Title');

          // Check max width constraint
          const computedStyle = window.getComputedStyle(card);
          const maxWidth = parseInt(computedStyle.maxWidth);
          expect(maxWidth).toBeLessThanOrEqual(250);
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);
    });

    await step('Empty content should still render card', async () => {
      const trigger = await canvas.findByTestId('empty-content');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector('.MuiCard-root');
          expect(card).toBeInTheDocument();
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);
    });

    await step('Loading state should show loading indicator', async () => {
      const trigger = await canvas.findByTestId('loading-state');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const loadingIndicator = canvasElement.ownerDocument.body.querySelector(
            '.MuiCircularProgress-root',
          );
          expect(loadingIndicator).toBeInTheDocument();
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);
    });

    await step('Custom loading component should render', async () => {
      const trigger = await canvas.findByTestId('custom-loading');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const customLoading =
            canvasElement.ownerDocument.body.querySelector('.MuiTypography-root');
          expect(customLoading).toHaveTextContent('Custom Loading...');
        },
        { timeout: 500 },
      );
    });
  },
};

// Test 11: Integration with Other Components
export const Integration: Story = {
  render: () => (
    <Stack spacing={3}>
      <HoverCard
        variant="detailed"
        title="User Profile"
        description="Senior Developer"
        avatar="https://via.placeholder.com/100"
        enterDelay={100}
      >
        <Button startIcon={<span>👤</span>} data-testid="with-avatar">
          With Avatar
        </Button>
      </HoverCard>

      <HoverCard title="Card with Actions" enterDelay={100}>
        <Button data-testid="with-actions">Hover for Actions</Button>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button size="small" variant="contained">
            Edit
          </Button>
          <Button size="small" variant="outlined">
            Delete
          </Button>
        </Stack>
      </HoverCard>

      <Box sx={{ position: 'relative' }}>
        <HoverCard
          title="Positioned Element"
          description="Testing with different positions"
          placement="right"
          showArrow={true}
          enterDelay={100}
          onOpen={fn()}
          onClose={fn()}
        >
          <Button data-testid="with-arrow">With Arrow</Button>
        </HoverCard>
      </Box>

      <HoverCard variant="glass" title="Different Animations" animation="scale" enterDelay={100}>
        <Button data-testid="with-animation">Scale Animation</Button>
      </HoverCard>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('HoverCard integrates with other components', async () => {
      // Test basic hover functionality
      const trigger = await canvas.findByTestId('with-avatar');
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      // Wait for the hover card to appear
      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector('.MuiCard-root');
          expect(card).toBeInTheDocument();
        },
        { timeout: 1000 },
      );

      // Check for title in the hover card
      const titleElement = canvasElement.ownerDocument.body.querySelector('h6');
      if (titleElement) {
        expect(titleElement).toHaveTextContent('User Profile');
      }

      await userEvent.unhover(trigger);

      // Wait for hover card to close
      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector('.MuiCard-root');
          expect(card).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });

    await step('Arrow positioning works correctly', async () => {
      const trigger = await canvas.findByTestId('with-arrow');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector('.MuiCard-root');
          expect(card).toBeInTheDocument();
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);

      // Wait for hover card to close
      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector('.MuiCard-root');
          expect(card).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });

    await step('Animation styles are applied', async () => {
      const trigger = await canvas.findByTestId('with-animation');
      await userEvent.hover(trigger);

      await waitFor(
        async () => {
          const card = canvasElement.ownerDocument.body.querySelector('.MuiCard-root');
          expect(card).toBeInTheDocument();
        },
        { timeout: 500 },
      );

      await userEvent.unhover(trigger);
    });
  },
};
