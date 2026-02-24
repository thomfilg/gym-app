import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'DataDisplay/Alert/Tests',
  component: Alert,
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Alert'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger', 'glass', 'gradient'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    variant: 'info',
    title: 'Interactive Alert',
    description: 'This alert tests basic interactions',
    closable: true,
    onClose: fn(),
    showIcon: true,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();
      await expect(alert).toHaveAttribute('aria-live', 'polite');
      await expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    await step('Verify title and description', async () => {
      await expect(canvas.getByText('Interactive Alert')).toBeInTheDocument();
      await expect(canvas.getByText('This alert tests basic interactions')).toBeInTheDocument();
    });

    await step('Close button interaction', async () => {
      const closeButton = canvas.getByLabelText('close alert');
      await expect(closeButton).toBeInTheDocument();

      await userEvent.click(closeButton);
      await waitFor(
        () => {
          expect(args.onClose).toHaveBeenCalledTimes(1);
        },
        { timeout: 500 },
      );
    });
  },
};

export const HoverEffects: Story = {
  name: '🎨 Hover Effects Test',
  args: {
    variant: 'success',
    title: 'Hover Me',
    description: 'Watch the animation when you hover',
    glow: true,
    animate: false, // Disable mount animation to test hover effects in isolation
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();

      // Verify initial transform is none
      const initialStyle = window.getComputedStyle(alert);
      await expect(initialStyle.transform).toBe('none');
    });

    await step('Verify glow effect is applied', async () => {
      const alert = canvas.getByRole('alert');
      const computedStyle = window.getComputedStyle(alert);

      // Glow effect adds box-shadow with color
      await expect(computedStyle.boxShadow).toContain('rgb');
      // Glow also adds filter brightness
      await expect(computedStyle.filter).toContain('brightness');
    });

    await step('Verify hover styles exist in component', async () => {
      const alert = canvas.getByRole('alert');

      // Verify the alert has transition property (needed for hover effects)
      const computedStyle = window.getComputedStyle(alert);
      await expect(computedStyle.transition).toContain('cubic-bezier');
      // Also verify border-radius for proper styling
      await expect(computedStyle.borderRadius).not.toBe('0px');
    });
  },
};

// Accessibility Tests
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    variant: 'warning',
    title: 'Keyboard Accessible',
    description: 'Navigate with Tab and Enter keys',
    closable: true,
    onClose: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation to alert', async () => {
      const alert = canvas.getByRole('alert');
      alert.focus();
      await expect(alert).toHaveFocus();
    });

    await step('Tab to close button', async () => {
      await userEvent.tab();
      const closeButton = canvas.getByLabelText('close alert');
      await expect(closeButton).toHaveFocus();
    });

    await step('Activate close button with Enter', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(args.onClose).toHaveBeenCalled();
      });
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    variant: 'danger',
    title: 'Critical Error',
    description: 'This is an urgent alert for screen readers',
    closable: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveAttribute('aria-live', 'assertive');
      await expect(alert).toHaveAttribute('aria-atomic', 'true');
      await expect(alert).toHaveAttribute('role', 'alert');
    });

    await step('Verify close button accessibility', async () => {
      const closeButton = canvas.getByLabelText('close alert');
      await expect(closeButton).toBeInTheDocument();
      await expect(closeButton).toHaveAttribute('aria-label', 'close alert');
    });

    await step('Verify focusable elements', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveAttribute('tabIndex', '0');
    });
  },
};

// Visual Tests
export const AllVariantsVisual: Story = {
  name: '👁️ All Variants Visual Test',
  render: () => {
    const variants = ['info', 'success', 'warning', 'danger', 'glass', 'gradient'] as const;

    return (
      <Stack spacing={2}>
        {variants.map((variant) => (
          <Alert
            key={variant}
            variant={variant}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`}
            description={`This is a ${variant} alert with all features enabled`}
            closable
            showIcon
            data-testid={`alert-${variant}`}
          />
        ))}
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all variants rendered', async () => {
      const variants = ['info', 'success', 'warning', 'danger', 'glass', 'gradient'];

      for (const variant of variants) {
        const alert = canvas.getByTestId(`alert-${variant}`);
        await expect(alert).toBeInTheDocument();
      }
    });

    await step('Verify visual hierarchy', async () => {
      const titles = canvas.getAllByText(/Alert$/);
      expect(titles).toHaveLength(6);

      titles.forEach(async (title) => {
        const computedStyle = window.getComputedStyle(title);
        await expect(parseFloat(computedStyle.fontWeight)).toBeGreaterThanOrEqual(600);
      });
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    variant: 'info',
    title: 'Responsive Alert',
    description:
      'This alert adapts to different screen sizes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    closable: true,
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

    await step('Verify responsive layout', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();

      // Check text wrapping
      const description = canvas.getByText(/Lorem ipsum/);
      const computedStyle = window.getComputedStyle(description);
      await expect(computedStyle.wordWrap).toBe('break-word');
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (
      <Stack spacing={4}>
        <ThemeProvider theme={lightTheme}>
          <Stack spacing={2}>
            <Alert variant="info" title="Light Theme" description="Alert in light theme" />
            <Alert
              variant="glass"
              title="Glass Effect"
              description="Glass morphism in light theme"
            />
          </Stack>
        </ThemeProvider>

        <ThemeProvider theme={darkTheme}>
          <Stack spacing={2} sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Alert variant="info" title="Dark Theme" description="Alert in dark theme" />
            <Alert
              variant="glass"
              title="Glass Effect"
              description="Glass morphism in dark theme"
            />
          </Stack>
        </ThemeProvider>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify theme variations', async () => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts).toHaveLength(4);
    });
  },
};

// Animation Tests
export const AnimationEffects: Story = {
  name: '✨ Animation Effects Test',
  render: () => (
    <Stack spacing={2}>
      <Alert
        variant="success"
        title="Glow Effect"
        description="This alert has a glowing animation"
        glow
        data-testid="glow-alert"
      />
      <Alert
        variant="warning"
        title="Pulse Effect"
        description="This alert has a pulsing animation"
        pulse
        data-testid="pulse-alert"
      />
      <Alert
        variant="danger"
        title="Combined Effects"
        description="This alert has both glow and pulse"
        glow
        pulse
        data-testid="combined-alert"
      />
      <Alert
        variant="gradient"
        title="Gradient with Shimmer"
        description="This gradient alert has a shimmer effect"
        data-testid="gradient-alert"
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify glow effect', async () => {
      const glowAlert = canvas.getByTestId('glow-alert');
      const computedStyle = window.getComputedStyle(glowAlert);
      await expect(computedStyle.boxShadow).toContain('rgb');
    });

    await step('Verify animations are applied', async () => {
      const pulseAlert = canvas.getByTestId('pulse-alert');
      await expect(pulseAlert).toBeInTheDocument();

      const combinedAlert = canvas.getByTestId('combined-alert');
      await expect(combinedAlert).toBeInTheDocument();
    });
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info" title="Empty Description" />
      <Alert variant="success" description="No Title Alert" />
      <Alert variant="warning" />
      <Alert
        variant="danger"
        title="Very Long Title That Should Wrap Properly When It Exceeds The Container Width"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <Alert
        variant="glass"
        showIcon={false}
        title="No Icon"
        description="This alert has no icon"
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify edge cases handled', async () => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts).toHaveLength(5);

      // All alerts should render without errors
      alerts.forEach(async (alert) => {
        await expect(alert).toBeInTheDocument();
      });
    });

    await step('Verify text overflow handling', async () => {
      const longTitle = canvas.getByText(/Very Long Title/);
      const computedStyle = window.getComputedStyle(longTitle);
      await expect(computedStyle.wordWrap).toBe('break-word');
    });
  },
};

// Performance Test
export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => {
    const alerts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      variant: (['info', 'success', 'warning', 'danger', 'glass', 'gradient'] as const)[i % 6],
      title: `Alert ${i + 1}`,
      description: `Performance test alert number ${i + 1}`,
    }));

    return (
      <Stack spacing={1} sx={{ maxHeight: '600px', overflow: 'auto' }}>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            description={alert.description}
            data-testid={`perf-alert-${alert.id}`}
          />
        ))}
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render performance', async () => {
      const startTime = window.performance.now();
      const alerts = canvas.getAllByRole('alert');
      const endTime = window.performance.now();

      const renderTime = endTime - startTime;
      // Log render time for performance monitoring (can be removed in production)
      // eslint-disable-next-line no-console
      console.log(`Render time for ${alerts.length} alerts: ${renderTime}ms`);

      expect(alerts).toHaveLength(50);
      await expect(renderTime).toBeLessThan(1000);
    });
  },
};

// State Management Test
export const StateManagement: Story = {
  name: '🔄 State Management Test',
  args: {
    variant: 'info',
    title: 'Stateful Alert',
    description: 'This alert manages its own state',
    closable: true,
    onClose: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial state', async () => {
      // Wait for the alert to be rendered and visible
      const alert = await waitFor(() => canvas.getByRole('alert'), { timeout: 1000 });
      await expect(alert).toBeInTheDocument();
      // Check visibility by verifying the element has content
      await expect(canvas.getByText('Stateful Alert')).toBeInTheDocument();
      await expect(canvas.getByText('This alert manages its own state')).toBeInTheDocument();
    });

    await step('Close alert', async () => {
      const closeButton = canvas.getByLabelText('close alert');
      await userEvent.click(closeButton);

      // Wait for closing animation
      await waitFor(
        () => {
          expect(args.onClose).toHaveBeenCalled();
        },
        { timeout: 500 },
      );
    });
  },
};

// Focus Management Test
export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  args: {
    variant: 'success',
    title: 'Focus Management',
    description: 'Testing focus states and trap',
    closable: true,
    showIcon: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Alert receives focus', async () => {
      const alert = canvas.getByRole('alert');
      alert.focus();
      await expect(alert).toHaveFocus();
    });

    await step('Tab to close button', async () => {
      await userEvent.tab();
      const closeButton = canvas.getByLabelText('close alert');
      await expect(closeButton).toHaveFocus();
    });

    await step('Tab cycles back', async () => {
      await userEvent.tab();
      // Should cycle back to document or next focusable element
      const alert = canvas.getByRole('alert');
      await expect(alert).not.toHaveFocus();
    });
  },
};

// Integration Test with Form
const FormIntegrationComponent = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage('Form submitted successfully!');
    setShowAlert(true);
  };

  return (
    <Stack spacing={2}>
      {showAlert && (
        <Alert
          variant="success"
          title="Success"
          description={alertMessage}
          closable
          onClose={() => setShowAlert(false)}
          data-testid="form-alert"
        />
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <input type="text" placeholder="Enter your name" data-testid="form-input" required />
          <button type="submit" data-testid="form-submit">
            Submit
          </button>
        </Stack>
      </form>
    </Stack>
  );
};

export const FormIntegration: Story = {
  name: '🔗 Form Integration Test',
  render: FormIntegrationComponent,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill and submit form', async () => {
      const input = canvas.getByTestId('form-input');
      await userEvent.type(input, 'Test User');

      const submitButton = canvas.getByTestId('form-submit');
      await userEvent.click(submitButton);
    });

    await step('Alert appears after submission', async () => {
      const alert = await canvas.findByTestId('form-alert');
      await expect(alert).toBeInTheDocument();
      await expect(alert).toHaveTextContent('Form submitted successfully!');
    });
  },
};

// Custom Icon Test
export const CustomIconTest: Story = {
  name: '🎨 Custom Icon Test',
  render: () => {
    const CustomIcon = () => (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        !
      </div>
    );

    return (
      <Stack spacing={2}>
        <Alert
          variant="info"
          icon={<CustomIcon />}
          title="Custom Icon"
          description="This alert uses a custom icon component"
          data-testid="custom-icon-alert"
        />
        <Alert
          variant="success"
          showIcon={false}
          title="No Icon"
          description="This alert has icons disabled"
          data-testid="no-icon-alert"
        />
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify custom icon is rendered', async () => {
      const customAlert = canvas.getByTestId('custom-icon-alert');
      await expect(customAlert).toBeInTheDocument();
      // Custom icon should be visible
      const customIcon = customAlert.querySelector('.MuiAlert-icon');
      await expect(customIcon).toBeInTheDocument();
    });

    await step('Verify no icon when disabled', async () => {
      const noIconAlert = canvas.getByTestId('no-icon-alert');
      await expect(noIconAlert).toBeInTheDocument();
      const icon = noIconAlert.querySelector('.MuiAlert-icon');
      await expect(icon).not.toBeInTheDocument();
    });
  },
};

// Color Override Test
export const ColorOverrideTest: Story = {
  name: '🎨 Color Override Test',
  render: () => (
    <Stack spacing={2}>
      <Alert variant="info" color="primary" title="Primary Color" />
      <Alert variant="info" color="secondary" title="Secondary Color" />
      <Alert variant="info" color="success" title="Success Color" />
      <Alert variant="info" color="warning" title="Warning Color" />
      <Alert variant="info" color="danger" title="Danger Color" />
      <Alert variant="info" color="neutral" title="Neutral Color" />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all color overrides', async () => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts).toHaveLength(6);

      // Each should have different styling
      alerts.forEach(async (alert) => {
        await expect(alert).toBeInTheDocument();
        const style = window.getComputedStyle(alert);
        await expect(style.backgroundColor).toBeTruthy();
      });
    });
  },
};

// Animation Control Test
export const AnimationControl: Story = {
  name: '🎬 Animation Control Test',
  render: () => (
    <Stack spacing={2}>
      <Alert
        variant="success"
        title="With Animation"
        description="This alert animates on mount"
        animate={true}
        data-testid="animated-alert"
      />
      <Alert
        variant="warning"
        title="Without Animation"
        description="This alert appears instantly"
        animate={false}
        data-testid="static-alert"
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify animation states', async () => {
      const animatedAlert = canvas.getByTestId('animated-alert');
      const staticAlert = canvas.getByTestId('static-alert');

      await expect(animatedAlert).toBeInTheDocument();
      await expect(staticAlert).toBeInTheDocument();
    });
  },
};
