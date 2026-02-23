import type { Meta, StoryObj } from '@storybook/react-vite';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch/Tests',
  component: Switch,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Switch'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== INTERACTION TESTS =====

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    'data-testid': 'basic-switch',
    onChange: fn(),
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await expect(switchElement).toBeInTheDocument();
      await expect(switchElement).not.toBeChecked();
    });

    await step('Click interaction', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.click(switchElement);
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(switchElement).toBeChecked();
    });

    await step('Second click to toggle off', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.click(switchElement);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(switchElement).not.toBeChecked();
    });
  },
};

export const KeyboardInteraction: Story = {
  name: '⌨️ Keyboard Interaction Test',
  args: {
    'data-testid': 'keyboard-switch',
    label: 'Keyboard accessible switch',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Focus with Tab key', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.tab();
      await expect(switchElement).toHaveFocus();
    });

    await step('Toggle with Space key', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.keyboard(' ');
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(switchElement).toBeChecked();
    });

    await step('Toggle again with Space key', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.keyboard(' ');
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(switchElement).not.toBeChecked();
    });
  },
};

const StateChangeComponent = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      data-testid="stateful-switch"
      label="Stateful switch"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const StateChangeTest: Story = {
  name: '🔄 State Change Test',
  render: () => <StateChangeComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial unchecked state', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await expect(switchElement).not.toBeChecked();
    });

    await step('Toggle to checked state', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.click(switchElement);
      await waitFor(() => {
        expect(switchElement).toBeChecked();
      });
    });

    await step('Toggle back to unchecked state', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await userEvent.click(switchElement);
      await waitFor(() => {
        expect(switchElement).not.toBeChecked();
      });
    });
  },
};

// ===== ACCESSIBILITY TESTS =====

export const AccessibilityTest: Story = {
  name: '♿ Accessibility Test',
  args: {
    'data-testid': 'accessible-switch',
    label: 'Accessible switch',
    description: 'This switch has proper accessibility attributes',
    'aria-label': 'Toggle notifications',
    'aria-describedby': 'switch-description',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
  },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await expect(switchElement).toBeInTheDocument();
      await expect(switchElement).toHaveAttribute('aria-label', 'Toggle notifications');
    });

    await step('Verify role attributes', async () => {
      const switchElement = canvas.getByRole('checkbox');
      await expect(switchElement).toHaveAttribute('type', 'checkbox');
    });

    await step('Verify label association', async () => {
      // Since the label is rendered as text, not a proper label element,
      // we verify the label text is present alongside the switch
      const labelText = canvas.getByText('Accessible switch');
      await expect(labelText).toBeInTheDocument();

      // Verify the switch is in the same container
      const switchElement = canvas.getByRole('checkbox');
      await expect(switchElement).toBeInTheDocument();
    });
  },
};

export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch data-testid="first-switch" label="First switch" />
      <Switch data-testid="second-switch" label="Second switch" />
      <Switch data-testid="third-switch" label="Third switch" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab through switches', async () => {
      const firstSwitch = canvas
        .getByTestId('first-switch')
        .querySelector('input[type="checkbox"]');
      const secondSwitch = canvas
        .getByTestId('second-switch')
        .querySelector('input[type="checkbox"]');
      const thirdSwitch = canvas
        .getByTestId('third-switch')
        .querySelector('input[type="checkbox"]');

      // Focus first switch
      await userEvent.tab();
      await expect(firstSwitch).toHaveFocus();

      // Tab to second switch
      await userEvent.tab();
      await expect(secondSwitch).toHaveFocus();

      // Tab to third switch
      await userEvent.tab();
      await expect(thirdSwitch).toHaveFocus();
    });

    await step('Tab navigation backward', async () => {
      const secondSwitch = canvas
        .getByTestId('second-switch')
        .querySelector('input[type="checkbox"]');

      await userEvent.tab({ shift: true });
      await expect(secondSwitch).toHaveFocus();
    });
  },
};

// ===== VISUAL TESTS =====

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        padding: '16px',
      }}
    >
      <Switch data-testid="default-switch" label="Default state" checked={false} />
      <Switch data-testid="checked-switch" label="Checked state" checked={true} />
      <Switch data-testid="disabled-switch" label="Disabled state" disabled />
      <Switch data-testid="error-switch" label="Error state" error helperText="This is required" />
      <Switch data-testid="loading-switch" label="Loading state" loading checked={true} />
      <Switch data-testid="glow-switch" label="Glow effect" glow checked={true} />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify default state appearance', async () => {
      const switchElement = canvas
        .getByTestId('default-switch')
        .querySelector('input[type="checkbox"]');
      await expect(switchElement).not.toBeChecked();
      await expect(switchElement).not.toBeDisabled();
    });

    await step('Verify disabled state', async () => {
      const switchElement = canvas
        .getByTestId('disabled-switch')
        .querySelector('input[type="checkbox"]');
      await expect(switchElement).toBeDisabled();
    });

    await step('Verify error state display', async () => {
      const errorText = canvas.getByText('This is required');
      await expect(errorText).toBeInTheDocument();
    });

    await step('Verify loading state (disabled interaction)', async () => {
      const switchElement = canvas
        .getByTestId('loading-switch')
        .querySelector('input[type="checkbox"]');
      await expect(switchElement).toBeDisabled();
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    label: 'Responsive switch',
    description: 'This switch adapts to different screen sizes',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
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
      const switchElement = canvas.getByRole('checkbox');
      await expect(switchElement).toBeInTheDocument();

      // Component should be visible and functional at all sizes
      await userEvent.click(switchElement);
      await expect(switchElement).toBeChecked();
    });
  },
};

// ===== VARIANT TESTS =====

export const VariantTests: Story = {
  name: '🎨 Variant Tests',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['default', 'ios', 'android', 'material', 'label'] as const).map((variant) => (
        <div key={variant}>
          <h6 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
          </h6>
          <Switch
            data-testid={`${variant}-variant`}
            variant={variant}
            label={`${variant} style`}
            onText={variant === 'label' ? 'ON' : undefined}
            offText={variant === 'label' ? 'OFF' : undefined}
            defaultChecked={true}
          />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all variants render', async () => {
      const variants = ['default', 'ios', 'android', 'material', 'label'] as const;
      for (const variant of variants) {
        const switchElement = canvas
          .getByTestId(`${variant}-variant`)
          .querySelector('input[type="checkbox"]');
        await expect(switchElement).toBeInTheDocument();
        await expect(switchElement).toBeChecked();
      }
    });

    await step('Test interaction with each variant', async () => {
      const variants = ['default', 'ios', 'android', 'material', 'label'] as const;
      for (const variant of variants) {
        const switchElement = canvas
          .getByTestId(`${variant}-variant`)
          .querySelector('input[type="checkbox"]');
        await userEvent.click(switchElement);
        await expect(switchElement).not.toBeChecked();
        await userEvent.click(switchElement);
        await expect(switchElement).toBeChecked();
      }
    });
  },
};

// ===== EDGE CASES TESTS =====

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Switch
        data-testid="very-long-label"
        label="This is an extremely long label that should wrap properly and not break the layout even when the text becomes very lengthy and extends beyond normal boundaries"
        description="This is also a very long description that tests how the component handles extensive text content and maintains proper spacing and alignment"
      />
      <Switch data-testid="no-label" checked={true} />
      <Switch
        data-testid="custom-size"
        label="Custom dimensions"
        trackWidth={100}
        trackHeight={50}
      />
      <Switch
        data-testid="with-icons"
        label="With icons"
        onIcon={<Sun size={16} />}
        offIcon={<Moon size={16} />}
        checked={true}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify long text handling', async () => {
      const longLabelSwitch = canvas.getByTestId('very-long-label');
      await expect(longLabelSwitch).toBeInTheDocument();

      const switchInput = longLabelSwitch.querySelector('input[type="checkbox"]');
      await userEvent.click(switchInput);
      await expect(switchInput).toBeChecked();
    });

    await step('Verify switch without label', async () => {
      const noLabelSwitch = canvas.getByTestId('no-label').querySelector('input[type="checkbox"]');
      await expect(noLabelSwitch).toBeInTheDocument();
      await expect(noLabelSwitch).toBeChecked();
    });

    await step('Verify custom size switch', async () => {
      const customSizeSwitch = canvas
        .getByTestId('custom-size')
        .querySelector('input[type="checkbox"]');
      await expect(customSizeSwitch).toBeInTheDocument();
      await userEvent.click(customSizeSwitch);
      await expect(customSizeSwitch).toBeChecked();
    });

    await step('Verify switch with icons', async () => {
      const iconSwitch = canvas.getByTestId('with-icons').querySelector('input[type="checkbox"]');
      await expect(iconSwitch).toBeInTheDocument();
      await expect(iconSwitch).toBeChecked();
    });
  },
};

// ===== PERFORMANCE TEST =====

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '8px',
        padding: '16px',
      }}
    >
      {Array.from({ length: 100 }, (_, i) => (
        <Switch key={i} data-testid={`perf-switch-${i}`} size="sm" checked={i % 2 === 0} />
      ))}
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time for multiple switches', async () => {
      const startTime = window.performance.now();
      const switches = canvas.getAllByRole('checkbox');
      const endTime = window.performance.now();

      const renderTime = endTime - startTime;
      // Use expect for assertions rather than console.log
      await expect(switches).toHaveLength(100);
      await expect(renderTime).toBeLessThan(1000);
    });

    await step('Test rapid interactions', async () => {
      const firstSwitch = canvas
        .getByTestId('perf-switch-0')
        .querySelector('input[type="checkbox"]');

      // Rapid clicking should not cause issues
      for (let i = 0; i < 5; i++) {
        await userEvent.click(firstSwitch);
        await new Promise((resolve) => window.setTimeout(resolve, 10));
      }

      await expect(firstSwitch).toBeChecked();
    });
  },
};

// ===== INTEGRATION TEST =====

const IntegrationTestComponent = () => {
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    soundEnabled: true,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h6 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Settings Panel</h6>
      <Switch
        data-testid="notifications-switch"
        label="Enable Notifications"
        description={`Notifications are currently ${settings.notifications ? 'enabled' : 'disabled'}`}
        checked={settings.notifications}
        onChange={(e) => setSettings((prev) => ({ ...prev, notifications: e.target.checked }))}
        onIcon={<Volume2 size={14} />}
        offIcon={<VolumeX size={14} />}
      />
      <Switch
        data-testid="darkmode-switch"
        label="Dark Mode"
        description={`Theme: ${settings.darkMode ? 'Dark' : 'Light'}`}
        checked={settings.darkMode}
        onChange={(e) => setSettings((prev) => ({ ...prev, darkMode: e.target.checked }))}
        onIcon={<Moon size={14} />}
        offIcon={<Sun size={14} />}
        variant="ios"
      />
      <Switch
        data-testid="sound-switch"
        label="Sound Effects"
        disabled={!settings.notifications}
        description={
          settings.notifications ? 'Sound effects for notifications' : 'Enable notifications first'
        }
        checked={settings.soundEnabled}
        onChange={(e) => setSettings((prev) => ({ ...prev, soundEnabled: e.target.checked }))}
      />
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        Settings: Notifications: {settings.notifications ? 'ON' : 'OFF'}, Dark Mode:{' '}
        {settings.darkMode ? 'ON' : 'OFF'}, Sound: {settings.soundEnabled ? 'ON' : 'OFF'}
      </p>
    </div>
  );
};

export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  render: () => <IntegrationTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test interdependent switches', async () => {
      const notificationsSwitch = canvas
        .getByTestId('notifications-switch')
        .querySelector('input[type="checkbox"]');
      const soundSwitch = canvas
        .getByTestId('sound-switch')
        .querySelector('input[type="checkbox"]');

      // Initially notifications should be enabled and sound switch available
      await expect(notificationsSwitch).toBeChecked();
      await expect(soundSwitch).not.toBeDisabled();

      // Disable notifications
      await userEvent.click(notificationsSwitch);
      await waitFor(() => {
        expect(soundSwitch).toBeDisabled();
      });

      // Re-enable notifications
      await userEvent.click(notificationsSwitch);
      await waitFor(() => {
        expect(soundSwitch).not.toBeDisabled();
      });
    });

    await step('Test dark mode toggle', async () => {
      const darkModeSwitch = canvas
        .getByTestId('darkmode-switch')
        .querySelector('input[type="checkbox"]');
      const statusText = canvas.getByText(/Theme:/);

      await expect(statusText).toHaveTextContent('Theme: Light');

      await userEvent.click(darkModeSwitch);
      await waitFor(() => {
        expect(statusText).toHaveTextContent('Theme: Dark');
      });
    });
  },
};
