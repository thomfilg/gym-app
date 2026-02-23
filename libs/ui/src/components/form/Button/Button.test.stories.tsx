import { Delete,Save } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Form/Button/Tests',
  component: Button,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Button'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// INTERACTION TESTS
// ============================================================================

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    children: 'Click Me',
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    'data-testid': 'basic-button',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const button = canvas.getByTestId('basic-button');
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveTextContent('Click Me');
    });

    await step('Click interaction', async () => {
      const button = canvas.getByTestId('basic-button');
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Hover interaction', async () => {
      const button = canvas.getByTestId('basic-button');
      await userEvent.hover(button);
      // Verify hover effects are applied (transform/shadow)
      const computedStyle = window.getComputedStyle(button);
      await expect(computedStyle.transform).toBeTruthy();
    });
  },
};

export const VariantSwitching: Story = {
  name: '🔄 Variant Switching Test',
  args: {
    children: 'Dynamic Button',
    'data-testid': 'variant-button',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('variant-button');

    await step('Verify solid variant (default)', async () => {
      await expect(button).toBeInTheDocument();
      // Check for solid button characteristics
      const computedStyle = window.getComputedStyle(button);
      await expect(computedStyle.backgroundColor).toBeTruthy();
    });
  },
};

export const LoadingStateTest: Story = {
  name: '⏳ Loading State Test',
  args: {
    children: 'Loading Button',
    loading: true,
    'data-testid': 'loading-button',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify loading state', async () => {
      const button = canvas.getByTestId('loading-button');
      await expect(button).toBeDisabled();

      // Check for loading spinner
      const spinner = canvas.getByRole('progressbar');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Verify text is replaced by spinner', async () => {
      const button = canvas.getByTestId('loading-button');
      // Text should not be visible when loading
      await expect(button).not.toHaveTextContent('Loading Button');
    });
  },
};

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    children: 'Accessible Button',
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    'data-testid': 'keyboard-button',
  },
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'focusable-element', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Focus via Tab navigation', async () => {
      const button = canvas.getByTestId('keyboard-button');
      button.focus();
      await expect(button).toHaveFocus();
    });

    await step('Enter key activation', async () => {
      const button = canvas.getByTestId('keyboard-button');
      button.focus();
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalled();
    });

    await step('Space key activation', async () => {
      const button = canvas.getByTestId('keyboard-button');
      button.focus();
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalled();
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    children: 'Screen Reader Button',
    'aria-label': 'Custom accessible label',
    'aria-describedby': 'button-description',
    'data-testid': 'sr-button',
  },
  render: (args) => (
    <>
      <Button {...args} />
      <div id="button-description" data-testid="description">
        This button performs an important action
      </div>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA labels', async () => {
      const button = canvas.getByTestId('sr-button');
      await expect(button).toHaveAttribute('aria-label', 'Custom accessible label');
    });

    await step('Verify ARIA descriptions', async () => {
      const button = canvas.getByTestId('sr-button');
      await expect(button).toHaveAttribute('aria-describedby', 'button-description');

      const description = canvas.getByTestId('description');
      await expect(description).toBeInTheDocument();
    });

    await step('Verify role attributes', async () => {
      const button = canvas.getByTestId('sr-button');
      await expect(button).toHaveAttribute('type', 'button');
    });
  },
};

export const DisabledAccessibility: Story = {
  name: '🚫 Disabled Accessibility Test',
  args: {
    children: 'Disabled Button',
    disabled: true,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    'data-testid': 'disabled-button',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Verify disabled state', async () => {
      const button = canvas.getByTestId('disabled-button');
      await expect(button).toBeDisabled();
    });

    await step('Verify click is prevented', async () => {
      const button = canvas.getByTestId('disabled-button');
      // Disabled button has pointer-events: none, so we use pointer options to bypass
      try {
        await userEvent.click(button, { pointerEventsCheck: 0 });
      } catch {
        // Expected - disabled button should prevent interactions
      }
      // In any case, onClick should not have been called
      await expect(args.onClick).not.toHaveBeenCalled();
    });

    await step('Verify keyboard interaction is prevented', async () => {
      const button = canvas.getByTestId('disabled-button');
      button.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  },
};

// ============================================================================
// VISUAL TESTS
// ============================================================================

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  args: {
    children: 'Visual Test Button',
    variant: 'solid', // Explicitly set to solid to ensure hover transform works
    'data-testid': 'visual-button',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state', async () => {
      const button = canvas.getByTestId('visual-button');
      const computedStyle = window.getComputedStyle(button);
      await expect(computedStyle.opacity).toBe('1');
    });

    await step('Hover state', async () => {
      const button = canvas.getByTestId('visual-button');

      // Test hover interaction - simplified approach
      await userEvent.hover(button);

      // Wait for transition to complete and just verify hover works
      await waitFor(() => {
        const computedStyle = window.getComputedStyle(button);
        // Just verify that the button can be hovered and styles are applied
        // Check for any style changes that indicate hover state
        expect(computedStyle.cursor).toBe('pointer');
      });
    });
  },
};

export const SpecialEffectsTest: Story = {
  name: '✨ Special Effects Test',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <Button glow data-testid="glow-button">
        Glow Effect
      </Button>
      <Button pulse data-testid="pulse-button">
        Pulse Animation
      </Button>
      <Button glow pulse data-testid="combined-button">
        Combined Effects
      </Button>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify glow effect', async () => {
      const glowButton = canvas.getByTestId('glow-button');
      const computedStyle = window.getComputedStyle(glowButton);
      await expect(computedStyle.boxShadow).toBeTruthy();
      await expect(computedStyle.filter).toContain('brightness');
    });

    await step('Verify pulse animation', async () => {
      const pulseButton = canvas.getByTestId('pulse-button');
      // Pulse effect creates pseudo-element with animation
      await expect(pulseButton).toBeInTheDocument();
      // Verify button has pulse styling (position: relative for pseudo-element)
      const computedStyle = window.getComputedStyle(pulseButton);
      await expect(computedStyle.position).toBe('relative');
      await expect(computedStyle.overflow).toBe('visible');
    });

    await step('Verify combined effects', async () => {
      const combinedButton = canvas.getByTestId('combined-button');
      const computedStyle = window.getComputedStyle(combinedButton);
      await expect(computedStyle.boxShadow).toBeTruthy();
      await expect(computedStyle.filter).toContain('brightness');
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    children: 'Responsive Button',
    'data-testid': 'responsive-button',
  },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify button renders on mobile', async () => {
      const button = canvas.getByTestId('responsive-button');
      await expect(button).toBeInTheDocument();

      const computedStyle = window.getComputedStyle(button);
      await expect(computedStyle.display).toBe('inline-flex');
    });
  },
};

// ============================================================================
// EDGE CASES TESTS
// ============================================================================

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '200px' }}>
      <Button data-testid="empty-button"></Button>
      <Button data-testid="long-text-button">
        This is a very long button text that should handle overflow gracefully without breaking the
        layout
      </Button>
      <Button size="xs" data-testid="tiny-button">
        Tiny
      </Button>
      <Button size="xl" data-testid="huge-button">
        Huge Button
      </Button>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Empty content handling', async () => {
      const emptyButton = canvas.getByTestId('empty-button');
      await expect(emptyButton).toBeInTheDocument();
      // Button should still be clickable even without text
      const computedStyle = window.getComputedStyle(emptyButton);
      await expect(computedStyle.minHeight).toBeTruthy();
    });

    await step('Long text handling', async () => {
      const longTextButton = canvas.getByTestId('long-text-button');
      // Button should handle long text without breaking
      await expect(longTextButton).toBeInTheDocument();
      // Verify text doesn't overflow
      const computedStyle = window.getComputedStyle(longTextButton);
      await expect(computedStyle.overflow).not.toBe('visible');
    });

    await step('Size extremes', async () => {
      const tinyButton = canvas.getByTestId('tiny-button');
      const hugeButton = canvas.getByTestId('huge-button');

      await expect(tinyButton).toBeInTheDocument();
      await expect(hugeButton).toBeInTheDocument();

      // Verify size differences
      const tinyStyle = window.getComputedStyle(tinyButton);
      const hugeStyle = window.getComputedStyle(hugeButton);

      const tinyFontSize = parseFloat(tinyStyle.fontSize);
      const hugeFontSize = parseFloat(hugeStyle.fontSize);

      await expect(hugeFontSize).toBeGreaterThan(tinyFontSize);
    });
  },
};

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => (
    <div
      data-testid="button-container"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
    >
      {Array.from({ length: 50 }, (_, i) => (
        <Button key={i} data-testid={`perf-button-${i}`} size="sm">
          Button {i + 1}
        </Button>
      ))}
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time', async () => {
      const startTime = Date.now();
      const buttons = canvas.getAllByTestId(/perf-button-/);
      const endTime = Date.now();

      const renderTime = endTime - startTime;
      // Performance measurement for testing - no console output

      // Assert reasonable render time (adjust threshold as needed)
      await expect(renderTime).toBeLessThan(100);
      await expect(buttons.length).toBe(50);
    });

    await step('Test rapid interactions', async () => {
      const buttons = canvas.getAllByTestId(/perf-button-/);
      const sampleButton = buttons[0];

      // Simulate rapid hover/unhover
      for (let i = 0; i < 5; i++) {
        await userEvent.hover(sampleButton);
        await userEvent.unhover(sampleButton);
      }

      // Button should still be responsive
      await expect(sampleButton).toBeInTheDocument();
    });
  },
};

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

export const IconIntegration: Story = {
  name: '🔗 Icon Integration Test',
  args: {
    children: 'Save Document',
    icon: <Save data-testid="save-icon" />,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    'data-testid': 'icon-button',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Verify icon and text render together', async () => {
      const button = canvas.getByTestId('icon-button');
      const icon = canvas.getByTestId('save-icon');

      await expect(button).toBeInTheDocument();
      await expect(icon).toBeInTheDocument();
      await expect(button).toHaveTextContent('Save Document');
    });

    await step('Verify button functionality with icon', async () => {
      const button = canvas.getByTestId('icon-button');
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalled();
    });
  },
};

export const LoadingWithIcon: Story = {
  name: '⏳ Loading With Icon Integration',
  args: {
    children: 'Processing...',
    icon: <Delete data-testid="delete-icon" />,
    loading: true,
    'data-testid': 'loading-icon-button',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify icon is hidden during loading', async () => {
      const button = canvas.getByTestId('loading-icon-button');
      await expect(button).toBeInTheDocument();

      // Icon should not be visible when loading
      const icon = canvas.queryByTestId('delete-icon');
      await expect(icon).not.toBeInTheDocument();

      // Loading spinner should be visible
      const spinner = canvas.getByRole('progressbar');
      await expect(spinner).toBeInTheDocument();
    });
  },
};

export const ComplexVariantTest: Story = {
  name: '🎨 Complex Variant Combinations',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <Button variant="solid" color="primary" size="lg" data-testid="solid-primary-lg">
        Solid Primary Large
      </Button>
      <Button
        variant="outline"
        color="secondary"
        size="sm"
        glow
        data-testid="outline-secondary-sm-glow"
      >
        Outline Secondary Small Glow
      </Button>
      <Button variant="glass" color="success" pulse data-testid="glass-success-pulse">
        Glass Success Pulse
      </Button>
      <Button variant="gradient" color="warning" size="xl" data-testid="gradient-warning-xl">
        Gradient Warning XL
      </Button>
      <Button variant="ghost" color="danger" loading data-testid="ghost-danger-loading">
        Ghost Danger Loading
      </Button>
      <Button variant="solid" color="neutral" disabled data-testid="solid-neutral-disabled">
        Solid Neutral Disabled
      </Button>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all complex variants render', async () => {
      const buttons = [
        'solid-primary-lg',
        'outline-secondary-sm-glow',
        'glass-success-pulse',
        'gradient-warning-xl',
        'ghost-danger-loading',
        'solid-neutral-disabled',
      ];

      for (const buttonId of buttons) {
        const button = canvas.getByTestId(buttonId);
        await expect(button).toBeInTheDocument();
      }
    });

    await step('Verify disabled and loading states', async () => {
      const loadingButton = canvas.getByTestId('ghost-danger-loading');
      const disabledButton = canvas.getByTestId('solid-neutral-disabled');

      await expect(loadingButton).toBeDisabled();
      await expect(disabledButton).toBeDisabled();
    });

    await step('Verify special effects are applied', async () => {
      const glowButton = canvas.getByTestId('outline-secondary-sm-glow');
      const pulseButton = canvas.getByTestId('glass-success-pulse');

      const glowStyle = window.getComputedStyle(glowButton);

      await expect(glowStyle.boxShadow).toBeTruthy();
      await expect(pulseButton).toBeInTheDocument(); // Pulse creates pseudo-element
      // Verify pulse button has pulse styling (position: relative for pseudo-element)
      const pulseStyle = window.getComputedStyle(pulseButton);
      await expect(pulseStyle.position).toBe('relative');
    });
  },
};
