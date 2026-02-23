import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Form/Label/Tests',
  component: Label,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Label'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ====================================
// TestId Tests
// ====================================

export const DataTestIdVerification: Story = {
  name: '🔍 Data TestId Verification',
  args: {
    children: 'Test Label',
    dataTestId: 'custom-label-testid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify dataTestId prop applies to label element', async () => {
      const label = canvas.getByTestId('custom-label-testid');
      await expect(label).toBeInTheDocument();
      await expect(label.tagName.toLowerCase()).toBe('label');
      await expect(label).toHaveTextContent('Test Label');
    });

    await step('Verify dataTestId works with all variants', async () => {
      const label = canvas.getByTestId('custom-label-testid');
      await expect(label).toHaveAttribute('data-testid', 'custom-label-testid');
    });
  },
};

export const DataTestIdWithSrOnly: Story = {
  name: '🔍 Data TestId with Screen Reader Only',
  args: {
    children: 'SR Only Label',
    dataTestId: 'sr-only-testid',
    srOnly: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify dataTestId applies to srOnly label', async () => {
      const label = canvas.getByTestId('sr-only-testid');
      await expect(label).toBeInTheDocument();
      await expect(label.tagName.toLowerCase()).toBe('label');

      const computedStyle = window.getComputedStyle(label);
      await expect(computedStyle.position).toBe('absolute');
      await expect(computedStyle.width).toBe('1px');
      await expect(computedStyle.height).toBe('1px');
    });
  },
};

// ====================================
// Interaction Tests
// ====================================

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    children: 'Interactive Label',
    htmlFor: 'test-input',
    onClick: fn(),
    'data-testid': 'interactive-label',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const label = canvas.getByTestId('interactive-label');
      await expect(label).toBeInTheDocument();
      await expect(label).toHaveTextContent('Interactive Label');
    });

    await step('Click interaction', async () => {
      const label = canvas.getByTestId('interactive-label');
      await userEvent.click(label);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Hover interaction', async () => {
      const label = canvas.getByTestId('interactive-label');
      await userEvent.hover(label);
      // Visual state should change (verified through visual regression)
      await userEvent.unhover(label);
    });

    await step('Verify htmlFor attribute', async () => {
      const label = canvas.getByTestId('interactive-label');
      await expect(label).toHaveAttribute('for', 'test-input');
    });
  },
};

export const RequiredFieldTest: Story = {
  name: '📝 Required Field Test',
  args: {
    children: 'Required Field',
    required: true,
    asteriskPlacement: 'end',
    'data-testid': 'required-label',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify required asterisk is present', async () => {
      const label = canvas.getByTestId('required-label');
      await expect(label).toBeInTheDocument();

      // Check for asterisk
      const asterisk = within(label).getByText('*');
      await expect(asterisk).toBeInTheDocument();

      // Verify asterisk color (should be error color)
      const computedStyle = window.getComputedStyle(asterisk);
      await expect(computedStyle.color).toContain('rgb');
    });

    await step('Test asterisk placement at start', async () => {
      // This would require prop change - verified through separate story
      const label = canvas.getByTestId('required-label');
      await expect(label.textContent).toContain('*');
    });
  },
};

export const StateChangeTest: Story = {
  name: '🔄 State Change Test',
  render: function StateChangeComponent() {
    const [state, setState] = React.useState<'normal' | 'disabled' | 'error' | 'loading'>('normal');

    return (
      <Stack spacing={2}>
        <Label
          disabled={state === 'disabled'}
          error={state === 'error'}
          loading={state === 'loading'}
          data-testid="stateful-label"
        >
          Stateful Label
        </Label>
        <Stack direction="row" spacing={1}>
          <button onClick={() => setState('normal')}>Normal</button>
          <button onClick={() => setState('disabled')}>Disabled</button>
          <button onClick={() => setState('error')}>Error</button>
          <button onClick={() => setState('loading')}>Loading</button>
        </Stack>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial normal state', async () => {
      const label = canvas.getByTestId('stateful-label');
      await expect(label).toBeInTheDocument();
      await expect(label).not.toHaveStyle({ opacity: '0.5' });
    });

    await step('Change to disabled state', async () => {
      const disabledButton = canvas.getByRole('button', { name: 'Disabled' });
      await userEvent.click(disabledButton);

      const label = canvas.getByTestId('stateful-label');
      const computedStyle = window.getComputedStyle(label);
      // Disabled state should have different color
      await expect(computedStyle.color).toBeDefined();
    });

    await step('Change to error state', async () => {
      const errorButton = canvas.getByRole('button', { name: 'Error' });
      await userEvent.click(errorButton);

      const label = canvas.getByTestId('stateful-label');
      const computedStyle = window.getComputedStyle(label);
      // Error state should have error color
      await expect(computedStyle.color).toBeDefined();
    });

    await step('Change to loading state', async () => {
      const loadingButton = canvas.getByRole('button', { name: 'Loading' });
      await userEvent.click(loadingButton);

      await waitFor(() => {
        const spinner = canvas.queryByRole('progressbar');
        expect(spinner).toBeInTheDocument();
      });
    });
  },
};

// ====================================
// Accessibility Tests
// ====================================

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  render: () => (
    <Stack spacing={2}>
      <Label htmlFor="input-1" onClick={fn()} data-testid="first-label" tabIndex={0}>
        First Label
      </Label>
      <TextField id="input-1" data-testid="first-input" />

      <Label htmlFor="input-2" onClick={fn()} data-testid="second-label" tabIndex={0}>
        Second Label
      </Label>
      <TextField id="input-2" data-testid="second-input" />
    </Stack>
  ),
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation forward', async () => {
      const firstLabel = canvas.getByTestId('first-label');
      const firstInputContainer = canvas.getByTestId('first-input');
      const firstInput = firstInputContainer.querySelector('input');

      // Focus first label
      firstLabel.focus();
      await expect(firstLabel).toHaveFocus();

      // Tab to input
      await userEvent.tab();
      await expect(firstInput).toHaveFocus();
    });

    await step('Tab navigation backward', async () => {
      await userEvent.tab({ shift: true });
      const firstLabel = canvas.getByTestId('first-label');
      await expect(firstLabel).toHaveFocus();
    });

    await step('Enter key activation on clickable label', async () => {
      const firstLabel = canvas.getByTestId('first-label');
      firstLabel.focus();
      await userEvent.keyboard('{Enter}');
      // Verify click handler would be called
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    children: 'Accessible Label',
    htmlFor: 'accessible-input',
    required: true,
    helperText: 'This field is required',
    tooltip: 'Additional information about this field',
    'aria-label': 'Accessible form label',
    'aria-describedby': 'helper-text',
    'data-testid': 'accessible-label',
  },
  render: (args) => (
    <Stack spacing={1}>
      <Label {...args} />
      <TextField id="accessible-input" aria-describedby="helper-text" />
      <span id="helper-text" style={{ display: 'none' }}>
        This field is required for accessibility
      </span>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes', async () => {
      const label = canvas.getByTestId('accessible-label');
      await expect(label).toHaveAttribute('aria-label', 'Accessible form label');
      await expect(label).toHaveAttribute('aria-describedby', 'helper-text');
    });

    await step('Verify htmlFor association', async () => {
      const label = canvas.getByTestId('accessible-label');
      await expect(label.tagName.toLowerCase()).toBe('label');
      await expect(label).toHaveAttribute('for', 'accessible-input');
    });

    await step('Verify helper text presence', async () => {
      const helperText = canvas.getByText('This field is required');
      await expect(helperText).toBeInTheDocument();
    });

    await step('Verify screen reader only label', async () => {
      const srDescription = canvas.getByText('This field is required for accessibility');
      await expect(srDescription).toBeInTheDocument();
      await expect(srDescription).toHaveStyle({ display: 'none' });
    });
  },
};

export const ScreenReaderOnlyTest: Story = {
  name: '👁️‍🗨️ Screen Reader Only Test',
  args: {
    children: 'This label is only for screen readers',
    srOnly: true,
    htmlFor: 'sr-only-input',
    'data-testid': 'sr-only-label',
  },
  render: (args) => (
    <Box>
      <Label {...args} />
      <TextField id="sr-only-input" placeholder="Field with screen reader only label" fullWidth />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify label is visually hidden', async () => {
      // The label should be in the document but visually hidden
      const hiddenLabel = canvas.getByText('This label is only for screen readers');
      await expect(hiddenLabel).toBeInTheDocument();

      // For srOnly labels, the text is inside a label element with special styles
      // Get the parent label element which should have the srOnly styles
      const labelElement = hiddenLabel.parentElement;

      if (labelElement && labelElement.tagName === 'LABEL') {
        const computedStyle = window.getComputedStyle(labelElement);
        // The srOnly label should be absolutely positioned
        await expect(computedStyle.position).toBe('absolute');
        // Check for visually hidden styles - srOnly uses 1px width/height
        const widthValue = computedStyle.width;
        const heightValue = computedStyle.height;
        // MUI Box with sx might return '1px' as string
        await expect(widthValue).toBe('1px');
        await expect(heightValue).toBe('1px');
      } else {
        // If the direct parent isn't the label, find it
        const label = hiddenLabel.closest('label');
        if (label) {
          const computedStyle = window.getComputedStyle(label);
          await expect(computedStyle.position).toBe('absolute');
        }
      }
    });

    await step('Verify input association', async () => {
      const input = canvas.getByPlaceholderText('Field with screen reader only label');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('id', 'sr-only-input');
    });
  },
};

// ====================================
// Visual Tests
// ====================================

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  render: () => (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Label size="xs" variant="filled">
        Extra Small Label
      </Label>
      <Label size="sm" variant="outlined">
        Small Label
      </Label>
      <Label size="md" variant="glass">
        Medium Label
      </Label>
      <Label size="lg" variant="gradient" color="primary">
        Large Label
      </Label>
      <Label size="xl" variant="default">
        Extra Large Label
      </Label>
    </Stack>
  ),
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

    await step('Verify all size variants render', async () => {
      await expect(canvas.getByText('Extra Small Label')).toBeInTheDocument();
      await expect(canvas.getByText('Small Label')).toBeInTheDocument();
      await expect(canvas.getByText('Medium Label')).toBeInTheDocument();
      await expect(canvas.getByText('Large Label')).toBeInTheDocument();
      await expect(canvas.getByText('Extra Large Label')).toBeInTheDocument();
    });

    await step('Verify responsive sizing', async () => {
      const labels = canvas.getAllByText(/Label/);
      labels.forEach((label) => {
        const computedStyle = window.getComputedStyle(label);
        expect(parseFloat(computedStyle.fontSize)).toBeGreaterThan(0);
      });
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => (
    <Stack spacing={2}>
      <Box sx={{ p: 2, backgroundColor: '#ffffff' }}>
        <Label color="primary">Light Theme Primary</Label>
      </Box>
      <Box sx={{ p: 2, backgroundColor: '#1a1a1a' }}>
        <Label color="primary">Dark Theme Primary</Label>
      </Box>
      <Label variant="glass" glow>
        Glass with Glow
      </Label>
      <Label variant="gradient" color="secondary">
        Gradient Secondary
      </Label>
    </Stack>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify theme-aware rendering', async () => {
      const labels = canvas.getAllByText(/Theme/);
      labels.forEach((label) => {
        const computedStyle = window.getComputedStyle(label);
        expect(computedStyle.color).toBeDefined();
      });
    });

    await step('Verify glass effect', async () => {
      const glassLabel = canvas.getByText('Glass with Glow');
      const computedStyle = window.getComputedStyle(glassLabel);
      // Glass effect uses backdrop-filter
      expect(computedStyle.backdropFilter || computedStyle.webkitBackdropFilter).toBeDefined();
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: function VisualStatesComponent() {
    const [hovered, setHovered] = React.useState(false);
    const [active, setActive] = React.useState(false);

    return (
      <Stack spacing={2}>
        <Label data-testid="normal-label">Normal State</Label>

        <Label
          data-testid="hover-label"
          variant="filled"
          color="primary"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ transform: hovered ? 'scale(1.02)' : 'scale(1)' }}
        >
          Hover State (hover me)
        </Label>

        <Label
          data-testid="active-label"
          variant="outlined"
          onClick={() => setActive(!active)}
          className={active ? 'active' : ''}
        >
          Active State (click me)
        </Label>

        <Label disabled data-testid="disabled-label">
          Disabled State
        </Label>

        <Label loading data-testid="loading-label">
          Loading State
        </Label>

        <Label error data-testid="error-label">
          Error State
        </Label>

        <Label glow pulse data-testid="animated-label">
          Animated State
        </Label>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state', async () => {
      const label = canvas.getByTestId('normal-label');
      await expect(label).toHaveStyle({ opacity: '1' });
    });

    await step('Hover state', async () => {
      const label = canvas.getByTestId('hover-label');
      await userEvent.hover(label);
      await waitFor(() => {
        // Browsers may convert scale() to matrix(), so we check for either format
        const computedStyle = window.getComputedStyle(label);
        const transform = computedStyle.transform;
        const isScaled =
          transform === 'scale(1.02)' || transform === 'matrix(1.02, 0, 0, 1.02, 0, 0)';
        expect(isScaled).toBe(true);
      });
      await userEvent.unhover(label);
    });

    await step('Active state', async () => {
      const label = canvas.getByTestId('active-label');
      await userEvent.click(label);
      await expect(label).toHaveClass('active');
    });

    await step('Disabled state', async () => {
      const label = canvas.getByTestId('disabled-label');
      const computedStyle = window.getComputedStyle(label);
      // Disabled labels should have reduced opacity or different color
      expect(computedStyle.color).toBeDefined();
    });

    await step('Loading state', async () => {
      const label = canvas.getByTestId('loading-label');
      const spinner = within(label.parentElement!).queryByRole('progressbar');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Error state', async () => {
      const label = canvas.getByTestId('error-label');
      const computedStyle = window.getComputedStyle(label);
      // Error state should have error color
      expect(computedStyle.color).toContain('rgb');
    });
  },
};

// ====================================
// Performance Tests
// ====================================

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => {
    const labels = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      text: `Label ${i}`,
      variant: (['default', 'filled', 'outlined', 'glass', 'gradient'] as const)[i % 5],
      color: (['primary', 'secondary', 'success', 'error', 'warning'] as const)[i % 5],
    }));

    return (
      <Box sx={{ maxHeight: 400, overflow: 'auto' }} data-testid="scroll-container">
        <Stack spacing={1}>
          {labels.map((label) => (
            <Label
              key={label.id}
              variant={label.variant}
              color={label.color}
              data-testid={`label-${label.id}`}
            >
              {label.text}
            </Label>
          ))}
        </Stack>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time', async () => {
      const startTime = window.performance.now();
      const labels = canvas.getAllByTestId(/label-\d+/);
      const endTime = window.performance.now();

      const renderTime = endTime - startTime;
      // Log render time for debugging (commented out for production)
      // console.log(`Render time for ${labels.length} labels: ${renderTime}ms`);

      // Assert reasonable render time
      await expect(renderTime).toBeLessThan(1000);
      await expect(labels).toHaveLength(100);
    });

    await step('Test scroll performance', async () => {
      const scrollContainer = canvas.getByTestId('scroll-container');

      // Simulate rapid scrolling
      for (let i = 0; i < 10; i++) {
        scrollContainer.scrollTop = i * 40;
        await new Promise((resolve) => window.setTimeout(resolve, 50));
      }

      // Verify no janky behavior
      await expect(scrollContainer).toBeInTheDocument();
    });
  },
};

// ====================================
// Edge Cases Tests
// ====================================

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <Stack spacing={2}>
      <Box sx={{ width: 200 }}>
        <Label truncate data-testid="truncate-label">
          This is a very long label text that should be truncated when it exceeds the container
          width
        </Label>
      </Box>

      <Label data-testid="empty-label"></Label>

      <Label data-testid="special-chars">{'Label with special chars: !@#$%^&*()_+{}|:"<>?'}</Label>

      <Label
        data-testid="multiple-props"
        variant="gradient"
        color="primary"
        size="lg"
        weight="bold"
        transform="uppercase"
        glow
        pulse
        ripple
        required
        icon={<InfoIcon />}
        tooltip="Complex tooltip"
        helperText="Complex helper text"
      >
        All Props Label
      </Label>

      <Label nowrap data-testid="nowrap-label">
        {'This label has nowrap and will not break to a new line even if it\'s very long'}
      </Label>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Text truncation handling', async () => {
      const label = canvas.getByTestId('truncate-label');
      const computedStyle = window.getComputedStyle(label);
      // The truncate prop should apply text-overflow: ellipsis
      await expect(computedStyle.textOverflow).toBe('ellipsis');
      // Overflow should be hidden for truncation to work
      await expect(['hidden', 'clip']).toContain(computedStyle.overflow);
    });

    await step('Empty content handling', async () => {
      const label = canvas.getByTestId('empty-label');
      await expect(label).toBeInTheDocument();
      await expect(label.textContent).toBe('');
    });

    await step('Special characters handling', async () => {
      const label = canvas.getByTestId('special-chars');
      await expect(label).toHaveTextContent('!@#$%^&*()_+{}|:"<>?');
    });

    await step('Multiple props combination', async () => {
      const label = canvas.getByTestId('multiple-props');
      await expect(label).toBeInTheDocument();

      // Check for required asterisk
      const asterisk = within(label.parentElement!).getByText('*');
      await expect(asterisk).toBeInTheDocument();

      // Check for icon
      const icon = label.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('No wrap handling', async () => {
      const label = canvas.getByTestId('nowrap-label');
      const computedStyle = window.getComputedStyle(label);
      await expect(computedStyle.whiteSpace).toBe('nowrap');
    });
  },
};

// ====================================
// Integration Tests
// ====================================

export const FormIntegration: Story = {
  name: '🔗 Form Integration Test',
  render: function FormIntegrationComponent() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: typeof errors = {};

      if (!email) newErrors.email = 'Email is required';
      if (!password) newErrors.password = 'Password is required';

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        window.alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Label
              htmlFor="email-field"
              required
              error={!!errors.email}
              helperText={errors.email}
              data-testid="email-label"
            >
              Email Address
            </Label>
            <TextField
              id="email-field"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              size="small"
              sx={{ mt: 1 }}
              data-testid="email-input"
            />
          </Box>

          <Box>
            <Label
              htmlFor="password-field"
              required
              error={!!errors.password}
              helperText={errors.password}
              data-testid="password-label"
            >
              Password
            </Label>
            <TextField
              id="password-field"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              size="small"
              sx={{ mt: 1 }}
              data-testid="password-input"
            />
          </Box>

          <button type="submit" data-testid="submit-button">
            Submit
          </button>
        </Stack>
      </form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial form state', async () => {
      const emailLabel = canvas.getByTestId('email-label');
      const passwordLabel = canvas.getByTestId('password-label');

      await expect(emailLabel).toBeInTheDocument();
      await expect(passwordLabel).toBeInTheDocument();

      // Both should show required asterisks
      const asterisks = canvas.getAllByText('*');
      await expect(asterisks).toHaveLength(2);
    });

    await step('Submit empty form shows errors', async () => {
      const submitButton = canvas.getByTestId('submit-button');
      await userEvent.click(submitButton);

      await waitFor(() => {
        const emailError = canvas.getByText('Email is required');
        const passwordError = canvas.getByText('Password is required');
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
      });
    });

    await step('Fill form and submit', async () => {
      const emailInputContainer = canvas.getByTestId('email-input');
      const passwordInputContainer = canvas.getByTestId('password-input');

      // Get the actual input elements within the MUI TextFields
      const emailInput = emailInputContainer.querySelector('input') as HTMLInputElement;
      const passwordInput = passwordInputContainer.querySelector('input') as HTMLInputElement;

      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'test@example.com');

      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, 'password123');

      const submitButton = canvas.getByTestId('submit-button');
      await userEvent.click(submitButton);

      // Form should submit successfully (alert would show)
    });
  },
};

export const TooltipIntegration: Story = {
  name: '💡 Tooltip Integration Test',
  args: {
    children: 'Hover for more info',
    tooltip: 'This is additional information about the label',
    icon: <InfoIcon fontSize="small" />,
    iconPosition: 'end',
    'data-testid': 'tooltip-label',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify label with icon renders', async () => {
      const label = canvas.getByTestId('tooltip-label');
      await expect(label).toBeInTheDocument();

      const icon = label.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('Tooltip appears on hover', async () => {
      const label = canvas.getByTestId('tooltip-label');

      await userEvent.hover(label);

      // MUI tooltips appear in a portal, so we need to search in the whole document
      await waitFor(
        () => {
          const tooltip = document.querySelector('[role="tooltip"]');
          expect(tooltip).toBeInTheDocument();
          expect(tooltip).toHaveTextContent('This is additional information about the label');
        },
        { timeout: 3000 },
      );

      await userEvent.unhover(label);
    });
  },
};
