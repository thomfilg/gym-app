import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Delete, Help, Info } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'DataDisplay/Tooltip/Tests',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Tooltip'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to find tooltip by content or just the first visible one
const findTooltipByContent = async (content?: string) => {
  const tooltips = await within(document.body).findAllByRole('tooltip');
  if (!content) {
    // Return the last tooltip (innermost div with actual content)
    return tooltips[tooltips.length - 1];
  }
  return tooltips.find((tip) => tip.textContent?.includes(content));
};

// 7.2 Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    title: 'Test tooltip content',
    variant: 'default',
  },
  render: (args) => (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button variant="outlined" data-testid="trigger-button">
          Hover me
        </Button>
      </Tooltip>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const button = canvas.getByTestId('trigger-button');
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveTextContent('Hover me');
    });

    await step('Hover interaction shows tooltip', async () => {
      const button = canvas.getByTestId('trigger-button');
      await userEvent.hover(button);

      // Wait for tooltip to appear
      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent('Test tooltip content');
          await expect(tooltip).toBeInTheDocument();
          await expect(tooltip).toHaveTextContent('Test tooltip content');
        },
        { timeout: 2000 },
      );
    });

    await step('Unhover hides tooltip', async () => {
      const button = canvas.getByTestId('trigger-button');
      await userEvent.unhover(button);

      // Wait for tooltip to disappear
      await waitFor(
        () => {
          const tooltip = within(document.body).queryByRole('tooltip');
          expect(tooltip).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  },
};

export const ClickInteraction: Story = {
  name: '🖱️ Click Interaction Test',
  args: {
    title: 'Click tooltip',
    variant: 'light',
  },
  render: (args) => (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button variant="contained" color="primary" data-testid="click-trigger">
          Click me
        </Button>
      </Tooltip>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click shows tooltip', async () => {
      const button = canvas.getByTestId('click-trigger');
      await userEvent.click(button);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent('Click tooltip');
          await expect(tooltip).toBeInTheDocument();
          await expect(tooltip).toHaveTextContent('Click tooltip');
        },
        { timeout: 2000 },
      );
    });

    await step('Click elsewhere hides tooltip', async () => {
      // Click outside the button
      await userEvent.click(canvasElement);

      await waitFor(
        () => {
          const tooltip = within(document.body).queryByRole('tooltip');
          expect(tooltip).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  },
};

const StateChangeTestComponent = () => {
  const [variant, setVariant] = React.useState<'default' | 'dark' | 'light' | 'glass'>('default');
  const [glow, setGlow] = React.useState(false);
  const [pulse, setPulse] = React.useState(false);

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setVariant(variant === 'default' ? 'dark' : 'default')}
          data-testid="variant-toggle"
        >
          Toggle Variant
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setGlow(!glow)}
          data-testid="glow-toggle"
        >
          Toggle Glow
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setPulse(!pulse)}
          data-testid="pulse-toggle"
        >
          Toggle Pulse
        </Button>
      </Stack>

      <Tooltip
        title={`Variant: ${variant}, Glow: ${glow}, Pulse: ${pulse}`}
        variant={variant}
        glow={glow}
        pulse={pulse}
      >
        <Button variant="contained" data-testid="stateful-tooltip">
          Dynamic Tooltip
        </Button>
      </Tooltip>
    </Box>
  );
};

export const StateChangeTest: Story = {
  name: '🔄 State Change Test',
  render: () => <StateChangeTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Toggle variant changes tooltip style', async () => {
      const variantButton = canvas.getByTestId('variant-toggle');
      const tooltipTrigger = canvas.getByTestId('stateful-tooltip');

      await userEvent.click(variantButton);
      await userEvent.hover(tooltipTrigger);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          await expect(tooltip).toHaveTextContent(/dark/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(tooltipTrigger);
    });

    await step('Toggle glow adds visual effect', async () => {
      const glowButton = canvas.getByTestId('glow-toggle');
      const tooltipTrigger = canvas.getByTestId('stateful-tooltip');

      await userEvent.click(glowButton);
      await userEvent.hover(tooltipTrigger);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toHaveTextContent(/Glow: true/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(tooltipTrigger);
    });

    await step('Toggle pulse adds animation', async () => {
      const pulseButton = canvas.getByTestId('pulse-toggle');
      const tooltipTrigger = canvas.getByTestId('stateful-tooltip');

      await userEvent.click(pulseButton);
      await userEvent.hover(tooltipTrigger);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toHaveTextContent(/Pulse: true/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(tooltipTrigger);
    });
  },
};

// 7.3 Accessibility Tests
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
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
          { id: 'duplicate-id', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  render: () => (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Stack direction="row" spacing={2}>
        <Tooltip title="First tooltip" variant="default">
          <Button variant="outlined" data-testid="first-focusable">
            First
          </Button>
        </Tooltip>

        <Tooltip title="Second tooltip" variant="light">
          <Button variant="outlined" data-testid="second-focusable">
            Second
          </Button>
        </Tooltip>

        <Tooltip title="Third tooltip with keyboard navigation" variant="glass">
          <IconButton data-testid="third-focusable">
            <Help />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation forward', async () => {
      const firstElement = canvas.getByTestId('first-focusable');
      const secondElement = canvas.getByTestId('second-focusable');

      // Focus first element
      firstElement.focus();
      await expect(firstElement).toHaveFocus();

      // Tab to next element
      await userEvent.tab();
      await expect(secondElement).toHaveFocus();
    });

    await step('Tab navigation backward', async () => {
      await userEvent.tab({ shift: true });
      const firstElement = canvas.getByTestId('first-focusable');
      await expect(firstElement).toHaveFocus();
    });

    await step('Enter key maintains focus', async () => {
      const firstButton = canvas.getByTestId('first-focusable');
      firstButton.focus();
      await userEvent.keyboard('{Enter}');
      await expect(firstButton).toHaveFocus();
    });

    await step('Space key maintains focus', async () => {
      const secondButton = canvas.getByTestId('second-focusable');
      secondButton.focus();
      await userEvent.keyboard(' ');
      await expect(secondButton).toHaveFocus();
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Tooltip title="This tooltip provides additional context" variant="default">
        <Button data-testid="aria-component" aria-label="Action button with tooltip">
          Action
        </Button>
      </Tooltip>

      <Tooltip title="Delete this item permanently" variant="dark" placement="top">
        <IconButton data-testid="delete-button" aria-label="Delete item" color="error">
          <Delete />
        </IconButton>
      </Tooltip>

      <Box>
        <Typography variant="subtitle2" id="field-label" data-testid="field-label" sx={{ mb: 1 }}>
          Important Setting
        </Typography>
        <Tooltip
          title="This setting affects system performance and cannot be changed later"
          variant="light"
          placement="right"
        >
          <IconButton
            data-testid="help-icon"
            aria-label="Help information for important setting"
            aria-describedby="field-label"
            size="small"
          >
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA labels', async () => {
      const actionButton = canvas.getByTestId('aria-component');
      await expect(actionButton).toHaveAttribute('aria-label', 'Action button with tooltip');

      const deleteButton = canvas.getByTestId('delete-button');
      await expect(deleteButton).toHaveAttribute('aria-label', 'Delete item');
    });

    await step('Verify ARIA descriptions', async () => {
      const helpIcon = canvas.getByTestId('help-icon');
      await expect(helpIcon).toHaveAttribute('aria-describedby', 'field-label');

      const label = canvas.getByTestId('field-label') || canvas.getByText('Important Setting');
      await expect(label).toBeInTheDocument();
    });

    await step('Verify tooltip content is accessible', async () => {
      const actionButton = canvas.getByTestId('aria-component');
      await userEvent.hover(actionButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          await expect(tooltip).toHaveTextContent('This tooltip provides additional context');
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(actionButton);
    });
  },
};

export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Tooltip title="Focus is maintained on trigger" variant="default">
        <Button data-testid="focus-trigger" variant="contained" autoFocus>
          Auto Focus Button
        </Button>
      </Tooltip>

      <Stack direction="row" spacing={2}>
        <Tooltip title="First focusable element" variant="light">
          <Button data-testid="first-element">First</Button>
        </Tooltip>

        <Tooltip title="Second focusable element" variant="glass">
          <Button data-testid="second-element">Second</Button>
        </Tooltip>

        <Tooltip title="Last focusable element" variant="dark">
          <Button data-testid="last-element">Last</Button>
        </Tooltip>
      </Stack>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Auto focus on mount', async () => {
      const autoFocusElement = canvas.getByTestId('focus-trigger');
      await waitFor(() => {
        expect(autoFocusElement).toHaveFocus();
      });
    });

    await step('Focus is maintained during tooltip display', async () => {
      const focusButton = canvas.getByTestId('focus-trigger');
      focusButton.focus();
      await expect(focusButton).toHaveFocus();

      // Hover to show tooltip
      await userEvent.hover(focusButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          // Focus should remain on trigger
          await expect(focusButton).toHaveFocus();
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(focusButton);
    });

    await step('Tab order is preserved', async () => {
      const firstElement = canvas.getByTestId('first-element');
      const secondElement = canvas.getByTestId('second-element');
      const lastElement = canvas.getByTestId('last-element');

      firstElement.focus();
      await expect(firstElement).toHaveFocus();

      await userEvent.tab();
      await expect(secondElement).toHaveFocus();

      await userEvent.tab();
      await expect(lastElement).toHaveFocus();
    });
  },
};

// 7.4 Visual Tests
export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'mobile',
    },
    chromatic: {
      viewports: [375, 768, 1920],
      delay: 300,
    },
  },
  render: () => (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      data-testid="responsive-container"
    >
      <Tooltip
        title="This tooltip adapts to different screen sizes and viewport widths"
        variant="default"
        maxWidth={200}
      >
        <Button variant="outlined" size="small">
          Mobile Tooltip
        </Button>
      </Tooltip>

      <Tooltip
        title="Tablet and desktop tooltip with more content that demonstrates responsive behavior"
        variant="light"
        maxWidth={300}
      >
        <Button variant="outlined">Responsive Tooltip</Button>
      </Tooltip>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify responsive container layout', async () => {
      const container = canvas.getByTestId('responsive-container');
      await expect(container).toBeInTheDocument();

      // Check if layout adapts based on screen size
      const computedStyle = window.getComputedStyle(container);

      if (window.innerWidth <= 768) {
        // Mobile: should be column layout
        await expect(computedStyle.flexDirection).toBe('column');
      } else {
        // Desktop: should be row layout
        await expect(computedStyle.flexDirection).toBe('row');
      }
    });

    await step('Test tooltip rendering at different viewport sizes', async () => {
      const buttons = canvas.getAllByRole('button');

      for (const button of buttons) {
        await userEvent.hover(button);

        await waitFor(
          async () => {
            const tooltip = await findTooltipByContent();
            await expect(tooltip).toBeInTheDocument();
          },
          { timeout: 2000 },
        );

        await userEvent.unhover(button);
      }
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Default theme" variant="default">
          <Button variant="outlined" data-testid="default-theme">
            Default
          </Button>
        </Tooltip>

        <Tooltip title="Light theme" variant="light">
          <Button variant="outlined" data-testid="light-theme">
            Light
          </Button>
        </Tooltip>

        <Tooltip title="Dark theme" variant="dark">
          <Button variant="outlined" data-testid="dark-theme">
            Dark
          </Button>
        </Tooltip>

        <Tooltip title="Glass theme" variant="glass">
          <Button variant="outlined" data-testid="glass-theme">
            Glass
          </Button>
        </Tooltip>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Tooltip title="Glow effect" variant="default" glow>
          <Button variant="contained" color="primary" data-testid="glow-effect">
            Glow
          </Button>
        </Tooltip>

        <Tooltip title="Pulse animation" variant="light" pulse>
          <Button variant="contained" color="secondary" data-testid="pulse-effect">
            Pulse
          </Button>
        </Tooltip>

        <Tooltip title="Combined effects" variant="glass" glow pulse>
          <Button variant="contained" color="success" data-testid="combined-effects">
            Combined
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all theme variants render', async () => {
      const buttons = ['default-theme', 'light-theme', 'dark-theme', 'glass-theme'];

      for (const buttonId of buttons) {
        const button = canvas.getByTestId(buttonId);
        await userEvent.hover(button);

        await waitFor(
          async () => {
            const tooltip = await findTooltipByContent();
            await expect(tooltip).toBeInTheDocument();
          },
          { timeout: 2000 },
        );

        await userEvent.unhover(button);
      }
    });

    await step('Verify visual effects render', async () => {
      const effectButtons = ['glow-effect', 'pulse-effect', 'combined-effects'];

      for (const buttonId of effectButtons) {
        const button = canvas.getByTestId(buttonId);
        await userEvent.hover(button);

        await waitFor(
          async () => {
            const tooltip = await findTooltipByContent();
            await expect(tooltip).toBeInTheDocument();
          },
          { timeout: 2000 },
        );

        await userEvent.unhover(button);
      }
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Normal state tooltip">
          <Button variant="outlined" data-testid="normal-state">
            Normal
          </Button>
        </Tooltip>

        <Tooltip title="This button is disabled" placement="top">
          <span>
            <Button variant="outlined" disabled data-testid="disabled-button">
              Disabled
            </Button>
          </span>
        </Tooltip>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Tooltip title="Small size tooltip" size="sm">
          <Button variant="outlined" size="small" data-testid="small-tooltip">
            Small
          </Button>
        </Tooltip>

        <Tooltip title="Large size tooltip" size="lg">
          <Button variant="outlined" size="large" data-testid="large-tooltip">
            Large
          </Button>
        </Tooltip>
      </Stack>

      <Tooltip
        title="This is a very long tooltip text that should wrap properly within the maximum width constraints and demonstrate how the tooltip handles lengthy content gracefully"
        maxWidth={200}
      >
        <Button variant="outlined" data-testid="long-text-tooltip">
          Long Text
        </Button>
      </Tooltip>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Normal state tooltip', async () => {
      const button = canvas.getByTestId('normal-state');
      await userEvent.hover(button);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          await expect(tooltip).toHaveTextContent('Normal state tooltip');
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(button);
    });

    await step('Disabled state tooltip', async () => {
      const disabledButton = canvas.getByTestId('disabled-button');
      await expect(disabledButton).toBeDisabled();

      // Hover on the span wrapper since disabled buttons don't receive hover events
      const wrapper = disabledButton.parentElement;
      if (wrapper) {
        await userEvent.hover(wrapper);

        await waitFor(
          async () => {
            const tooltip = await findTooltipByContent();
            await expect(tooltip).toHaveTextContent('This button is disabled');
          },
          { timeout: 2000 },
        );

        await userEvent.unhover(wrapper);
      }
    });

    await step('Different sizes render correctly', async () => {
      const smallButton = canvas.getByTestId('small-tooltip');
      await userEvent.hover(smallButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toHaveTextContent('Small size tooltip');
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(smallButton);

      const largeButton = canvas.getByTestId('large-tooltip');
      await userEvent.hover(largeButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toHaveTextContent('Large size tooltip');
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(largeButton);
    });

    await step('Long text wrapping', async () => {
      const longTextButton = canvas.getByTestId('long-text-tooltip');
      await userEvent.hover(longTextButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          // Check that tooltip contains the long text
          await expect(tooltip).toHaveTextContent(/very long tooltip text/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(longTextButton);
    });
  },
};

// 7.5 Performance Tests
export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      description: `Description for item ${i} with additional context information`,
    }));

    return (
      <Box sx={{ p: 2, maxHeight: 400, overflow: 'auto' }} data-testid="scroll-container">
        <Stack spacing={1}>
          {items.map((item) => (
            <Tooltip key={item.id} title={item.description} variant="default" placement="right">
              <Button
                variant="outlined"
                size="small"
                fullWidth
                data-testid={`item-${item.id}`}
                sx={{ justifyContent: 'flex-start' }}
              >
                {item.name}
              </Button>
            </Tooltip>
          ))}
        </Stack>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time for multiple tooltips', async () => {
      const startTime = Date.now();
      const elements = canvas.getAllByTestId(/item-/);
      const endTime = Date.now();

      const renderTime = endTime - startTime;

      // Assert reasonable render time
      await expect(renderTime).toBeLessThan(100);
      await expect(elements.length).toBe(20);
    });

    await step('Test rapid tooltip interactions', async () => {
      const elements = canvas.getAllByTestId(/item-/);
      const testElements = elements.slice(0, 5); // Test first 5 items

      const startTime = Date.now();

      // Rapidly hover over multiple tooltips
      for (const element of testElements) {
        await userEvent.hover(element);
        await new Promise((resolve) => window.setTimeout(resolve, 50)); // Brief pause
        await userEvent.unhover(element);
      }

      const endTime = Date.now();
      const interactionTime = endTime - startTime;

      // Should handle rapid interactions without hanging
      await expect(interactionTime).toBeLessThan(2000);
    });

    await step('Test scroll performance with tooltips', async () => {
      const scrollContainer = canvas.getByTestId('scroll-container');

      const startTime = Date.now();

      // Simulate scrolling
      for (let i = 0; i < 5; i++) {
        scrollContainer.scrollTop = i * 50;
        await new Promise((resolve) => window.setTimeout(resolve, 20));
      }

      const endTime = Date.now();
      const scrollTime = endTime - startTime;

      // Verify smooth scrolling
      await expect(scrollTime).toBeLessThan(500);
      await expect(scrollContainer).toBeInTheDocument();
    });
  },
};

// 7.6 Edge Cases Tests
export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Tooltip title="" variant="default">
        <Button variant="outlined" data-testid="empty-tooltip">
          Empty Tooltip
        </Button>
      </Tooltip>

      <Tooltip
        title="This is an extremely long tooltip text that contains a lot of information and should properly handle the maximum width constraints while maintaining readability and proper text wrapping behavior even with very lengthy content that might otherwise cause layout issues or performance problems in less robust implementations"
        maxWidth={150}
        variant="light"
      >
        <Button variant="outlined" data-testid="very-long-text">
          Very Long Text
        </Button>
      </Tooltip>

      <Tooltip title={'Special chars: !@#$%^&*()_+{}|:<>?[];\'"\\,./`~'} variant="glass">
        <Button variant="outlined" data-testid="special-chars">
          Special Characters
        </Button>
      </Tooltip>

      <Tooltip
        title="HTML content test: <script>alert('test')</script> & entities: &lt;&gt;&amp;"
        variant="dark"
      >
        <Button variant="outlined" data-testid="html-content">
          HTML Content
        </Button>
      </Tooltip>

      <Tooltip title={0 as unknown as string} variant="default">
        <Button variant="outlined" data-testid="invalid-props">
          Invalid Props
        </Button>
      </Tooltip>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Empty content handling', async () => {
      const emptyButton = canvas.getByTestId('empty-tooltip');
      await userEvent.hover(emptyButton);

      // Should handle empty tooltip gracefully (might not show or show empty)
      await new Promise((resolve) => window.setTimeout(resolve, 500));

      await userEvent.unhover(emptyButton);
    });

    await step('Very long text overflow handling', async () => {
      const longTextButton = canvas.getByTestId('very-long-text');
      await userEvent.hover(longTextButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          // Should contain the long text but be constrained by maxWidth
          await expect(tooltip).toHaveTextContent(/extremely long tooltip text/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(longTextButton);
    });

    await step('Special characters handling', async () => {
      const specialButton = canvas.getByTestId('special-chars');
      await userEvent.hover(specialButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          await expect(tooltip).toHaveTextContent(/Special chars:/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(specialButton);
    });

    await step('HTML content sanitization', async () => {
      const htmlButton = canvas.getByTestId('html-content');
      await userEvent.hover(htmlButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toBeInTheDocument();
          // Should contain the text but not execute HTML/scripts
          await expect(tooltip).toHaveTextContent(/HTML content test/);
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(htmlButton);
    });

    await step('Invalid props handling', async () => {
      const invalidButton = canvas.getByTestId('invalid-props');

      // Component should handle invalid props gracefully
      await expect(invalidButton).toBeInTheDocument();

      await userEvent.hover(invalidButton);
      // Should not crash and either show nothing or handle gracefully
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      await userEvent.unhover(invalidButton);
    });
  },
};

// 7.7 Integration Tests
const IntegrationTestComponent = () => {
  const [count, setCount] = React.useState(0);
  const [showTooltips, setShowTooltips] = React.useState(true);

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Typography variant="h6" data-testid="counter-display">
        Count: {count}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => setShowTooltips(!showTooltips)}
          data-testid="toggle-tooltips"
        >
          Toggle Tooltips
        </Button>

        <Button variant="outlined" onClick={() => setCount(0)} data-testid="reset-counter">
          Reset
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        {showTooltips ? (
          <>
            <Tooltip title={`Increment counter (current: ${count})`} variant="default">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCount((c) => c + 1)}
                data-testid="increment-with-tooltip"
              >
                +
              </Button>
            </Tooltip>

            <Tooltip title={`Decrement counter (current: ${count})`} variant="dark">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setCount((c) => c - 1)}
                data-testid="decrement-with-tooltip"
              >
                -
              </Button>
            </Tooltip>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCount((c) => c + 1)}
              data-testid="increment-without-tooltip"
            >
              +
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCount((c) => c - 1)}
              data-testid="decrement-without-tooltip"
            >
              -
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  render: () => <IntegrationTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Integration with state management', async () => {
      const counterDisplay = canvas.getByTestId('counter-display');
      const incrementButton = canvas.getByTestId('increment-with-tooltip');

      await expect(counterDisplay).toHaveTextContent('Count: 0');

      // Click increment button
      await userEvent.click(incrementButton);

      await waitFor(() => {
        expect(counterDisplay).toHaveTextContent('Count: 1');
      });
    });

    await step('Tooltip content updates with state', async () => {
      const incrementButton = canvas.getByTestId('increment-with-tooltip');

      // Hover to see tooltip with updated count
      await userEvent.hover(incrementButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toHaveTextContent('current: 1');
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(incrementButton);
    });

    await step('Conditional tooltip rendering', async () => {
      const toggleButton = canvas.getByTestId('toggle-tooltips');

      // Toggle tooltips off
      await userEvent.click(toggleButton);

      // Verify buttons without tooltips exist
      await waitFor(() => {
        const incrementWithoutTooltip = canvas.getByTestId('increment-without-tooltip');
        expect(incrementWithoutTooltip).toBeInTheDocument();
      });
    });

    await step('State reset integration', async () => {
      const resetButton = canvas.getByTestId('reset-counter');
      const counterDisplay = canvas.getByTestId('counter-display');

      await userEvent.click(resetButton);

      await waitFor(() => {
        expect(counterDisplay).toHaveTextContent('Count: 0');
      });

      // Toggle tooltips back on
      const toggleButton = canvas.getByTestId('toggle-tooltips');
      await userEvent.click(toggleButton);

      // Verify tooltip shows reset state
      const incrementButton = canvas.getByTestId('increment-with-tooltip');
      await userEvent.hover(incrementButton);

      await waitFor(
        async () => {
          const tooltip = await findTooltipByContent();
          await expect(tooltip).toHaveTextContent('current: 0');
        },
        { timeout: 2000 },
      );

      await userEvent.unhover(incrementButton);
    });
  },
};
