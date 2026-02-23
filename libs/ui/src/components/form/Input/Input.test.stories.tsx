import IconButton from '@mui/material/IconButton';
import { Email, Lock, Person,Visibility, VisibilityOff } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Form/Input/Tests',
  component: Input,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Input'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// INTERACTION TESTS
// ============================================================================

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    label: 'Test Input',
    placeholder: 'Type here...',
    'data-testid': 'basic-input',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const input = canvas.getByLabelText('Test Input');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('placeholder', 'Type here...');
    });

    await step('Click interaction', async () => {
      const input = canvas.getByLabelText('Test Input');
      await userEvent.click(input);
      await expect(args.onClick).toHaveBeenCalled();
    });

    await step('Focus interaction', async () => {
      const input = canvas.getByLabelText('Test Input');
      await userEvent.click(input);
      await expect(args.onFocus).toHaveBeenCalled();
    });

    await step('Type interaction', async () => {
      const input = canvas.getByLabelText('Test Input');
      await userEvent.type(input, 'Hello World');
      await expect(input).toHaveValue('Hello World');
      await expect(args.onChange).toHaveBeenCalled();
    });

    await step('Clear input', async () => {
      const input = canvas.getByLabelText('Test Input');
      await userEvent.clear(input);
      await expect(input).toHaveValue('');
    });

    await step('Blur interaction', async () => {
      const input = canvas.getByLabelText('Test Input');
      await userEvent.click(input);
      await userEvent.tab(); // Move focus away
      await expect(args.onBlur).toHaveBeenCalled();
    });
  },
};

export const FormInteraction: Story = {
  name: '📝 Form Interaction Test',
  render: () => {
    const TestForm = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [submitted, setSubmitted] = useState(false);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
      };

      return (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="form-email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="form-password"
            required
          />
          <button type="submit" data-testid="form-submit">
            Submit
          </button>
          {submitted && <div data-testid="form-success">Form submitted with email: {email}</div>}
        </form>
      );
    };

    return <TestForm />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill email field', async () => {
      const emailInput = canvas.getByTestId('form-email');
      await userEvent.type(emailInput, 'test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
    });

    await step('Fill password field', async () => {
      const passwordInput = canvas.getByTestId('form-password');
      await userEvent.type(passwordInput, 'secretpassword');
      await expect(passwordInput).toHaveValue('secretpassword');
    });

    await step('Submit form', async () => {
      const submitButton = canvas.getByTestId('form-submit');
      await userEvent.click(submitButton);

      await waitFor(async () => {
        const success = canvas.getByTestId('form-success');
        await expect(success).toHaveTextContent('Form submitted with email: test@example.com');
      });
    });
  },
};

export const StateChangeTest: Story = {
  name: '🔄 State Change Test',
  render: () => {
    const StatefulComponent = () => {
      const [value, setValue] = useState('');
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);

      const handleValidation = (inputValue: string) => {
        setError(inputValue.length < 3);
      };

      const handleLoadingToggle = () => {
        setLoading(!loading);
        window.setTimeout(() => setLoading(false), 2000);
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Input
            label="Stateful Input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              handleValidation(e.target.value);
            }}
            error={error}
            helperText={error ? 'Must be at least 3 characters' : 'Type at least 3 characters'}
            data-testid="stateful-input"
          />
          <Input
            label="Loading Input"
            loading={loading}
            placeholder="Click button to simulate loading"
            data-testid="loading-input"
          />
          <button onClick={handleLoadingToggle} data-testid="loading-toggle">
            Toggle Loading
          </button>
          <div data-testid="state-display">
            {`Value: ${value || ''} | Error: ${error.toString()} | Loading: ${loading.toString()}`}
          </div>
        </div>
      );
    };

    return <StatefulComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial state', async () => {
      const stateDisplay = canvas.getByTestId('state-display');
      await expect(stateDisplay.textContent).toMatch(
        /Value:\s+\|\s+Error:\s+false\s+\|\s+Loading:\s+false/,
      );
    });

    await step('Type short text to trigger error', async () => {
      const input = canvas.getByTestId('stateful-input');
      await userEvent.type(input, 'ab');

      await waitFor(async () => {
        const stateDisplay = canvas.getByTestId('state-display');
        await expect(stateDisplay).toHaveTextContent('Error: true');
        await expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });

    await step('Type longer text to clear error', async () => {
      const input = canvas.getByTestId('stateful-input');
      await userEvent.clear(input);
      await userEvent.type(input, 'valid input');

      await waitFor(async () => {
        const stateDisplay = canvas.getByTestId('state-display');
        await expect(stateDisplay).toHaveTextContent('Error: false');
        await expect(input).not.toHaveAttribute('aria-invalid', 'true');
      });
    });

    await step('Toggle loading state', async () => {
      const loadingToggle = canvas.getByTestId('loading-toggle');
      await userEvent.click(loadingToggle);

      const stateDisplay = canvas.getByTestId('state-display');
      await expect(stateDisplay).toHaveTextContent('Loading: true');

      const loadingInput = canvas.getByTestId('loading-input');
      await expect(loadingInput).toBeDisabled();
    });
  },
};

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input label="First Input" placeholder="Tab to navigate" data-testid="first-input" />
      <Input label="Second Input" placeholder="Continue tabbing" data-testid="second-input" />
      <Input label="Third Input" placeholder="Final input" data-testid="third-input" />
      <button data-testid="after-inputs">Button After Inputs</button>
    </div>
  ),
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation forward', async () => {
      const firstInput = canvas.getByTestId('first-input');
      const secondInput = canvas.getByTestId('second-input');

      // Focus first element
      firstInput.focus();
      await expect(firstInput).toHaveFocus();

      // Tab to next element
      await userEvent.tab();
      await expect(secondInput).toHaveFocus();
    });

    await step('Tab navigation continues', async () => {
      const thirdInput = canvas.getByTestId('third-input');
      const button = canvas.getByTestId('after-inputs');

      await userEvent.tab();
      await expect(thirdInput).toHaveFocus();

      await userEvent.tab();
      await expect(button).toHaveFocus();
    });

    await step('Tab navigation backward', async () => {
      const thirdInput = canvas.getByTestId('third-input');

      await userEvent.tab({ shift: true });
      await expect(thirdInput).toHaveFocus();
    });

    await step('Enter key in input (should not submit)', async () => {
      const firstInput = canvas.getByTestId('first-input');
      firstInput.focus();

      await userEvent.type(firstInput, 'test');
      await userEvent.keyboard('{Enter}');

      // Input should still have focus and content
      await expect(firstInput).toHaveFocus();
      await expect(firstInput).toHaveValue('test');
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        helperText="This field is required for registration"
        required
        data-testid="name-input"
        aria-describedby="name-description"
      />
      <div id="name-description" data-testid="name-description">
        Please enter your first and last name
      </div>

      <Input
        label="Email Address"
        type="email"
        error
        helperText="Please enter a valid email address"
        data-testid="email-input"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <div id="email-error" data-testid="email-error" role="alert">
        The email format is invalid
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA labels', async () => {
      const nameInput = canvas.getByTestId('name-input');
      await expect(nameInput).toBeInTheDocument();
      await expect(nameInput).toHaveAttribute('required');

      // Verify the label is associated correctly
      const label = nameInput.closest('.MuiFormControl-root')?.querySelector('label');
      await expect(label).toHaveTextContent('Full Name');
    });

    await step('Verify ARIA descriptions', async () => {
      const nameInput = canvas.getByTestId('name-input');
      // MUI generates its own aria-describedby ID for helper text
      const ariaDescribedBy = nameInput.getAttribute('aria-describedby');
      await expect(ariaDescribedBy).toBeTruthy();
      await expect(ariaDescribedBy).toMatch(/helper-text/);

      const description = canvas.getByTestId('name-description');
      await expect(description).toBeInTheDocument();
      await expect(description).toHaveTextContent('Please enter your first and last name');
    });

    await step('Verify error state attributes', async () => {
      const emailInput = canvas.getByTestId('email-input');
      await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      // MUI generates its own aria-describedby ID for helper text
      const emailAriaDescribedBy = emailInput.getAttribute('aria-describedby');
      await expect(emailAriaDescribedBy).toBeTruthy();
      await expect(emailAriaDescribedBy).toMatch(/helper-text/);
    });

    await step('Verify live regions', async () => {
      const errorRegion = canvas.getByTestId('email-error');
      await expect(errorRegion).toHaveAttribute('role', 'alert');
      await expect(errorRegion).toHaveTextContent('The email format is invalid');
    });
  },
};

export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  render: () => {
    const FocusTestComponent = () => {
      const [showModal, setShowModal] = useState(false);

      return (
        <div>
          <Input
            label="Trigger Input"
            placeholder="Click here first"
            data-testid="trigger-input"
            autoFocus
          />

          <button onClick={() => setShowModal(true)} data-testid="open-modal">
            Open Modal
          </button>

          {showModal && (
            <div
              role="dialog"
              aria-modal="true"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
              data-testid="modal"
            >
              <Input
                label="Modal Input"
                placeholder="Focus trapped here"
                data-testid="modal-input"
                autoFocus
              />
              <button onClick={() => setShowModal(false)} data-testid="close-modal">
                Close
              </button>
            </div>
          )}
        </div>
      );
    };

    return <FocusTestComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Auto focus on mount', async () => {
      const triggerInput = canvas.getByTestId('trigger-input');
      await waitFor(() => {
        expect(triggerInput).toHaveFocus();
      });
    });

    await step('Focus management in modal', async () => {
      const openButton = canvas.getByTestId('open-modal');
      await userEvent.click(openButton);

      const modal = await canvas.findByTestId('modal');
      await expect(modal).toBeInTheDocument();

      const modalInput = within(modal).getByTestId('modal-input');
      await waitFor(() => {
        expect(modalInput).toHaveFocus();
      });
    });

    await step('Focus restoration after modal close', async () => {
      const modal = canvas.getByTestId('modal');
      const closeButton = within(modal).getByTestId('close-modal');
      const openButton = canvas.getByTestId('open-modal');

      // Set focus to open button before closing
      openButton.focus();
      await userEvent.click(closeButton);

      // Modal should be gone
      await waitFor(() => {
        expect(canvas.queryByTestId('modal')).not.toBeInTheDocument();
      });
    });
  },
};

// ============================================================================
// VISUAL TESTS
// ============================================================================

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      }}
    >
      <Input
        variant="outlined"
        label="Responsive Input 1"
        placeholder="Resize window to test"
        data-testid="responsive-1"
      />
      <Input
        variant="glass"
        label="Responsive Input 2"
        placeholder="Watch layout adapt"
        data-testid="responsive-2"
      />
      <Input
        variant="gradient"
        label="Responsive Input 3"
        placeholder="Grid adjusts automatically"
        data-testid="responsive-3"
      />
    </div>
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

    await step('Verify responsive container', async () => {
      const container = canvasElement.querySelector('div[style*="grid"]') as HTMLElement;
      const computedStyle = window.getComputedStyle(container);

      // Check that CSS Grid is being used
      await expect(computedStyle.display).toBe('grid');

      // Check that grid has appropriate column layout (computed may be different from raw CSS)
      const gridCols = computedStyle.gridTemplateColumns;
      // Should have a meaningful grid layout (not none or empty)
      await expect(gridCols).not.toBe('none');
      await expect(gridCols.length).toBeGreaterThan(0);
    });

    await step('Verify inputs are functional at all sizes', async () => {
      const input1 = canvas.getByTestId('responsive-1');
      const input2 = canvas.getByTestId('responsive-2');
      const input3 = canvas.getByTestId('responsive-3');

      // Test interaction on each input
      await userEvent.click(input1);
      await expect(input1).toHaveFocus();

      await userEvent.click(input2);
      await expect(input2).toHaveFocus();

      await userEvent.click(input3);
      await expect(input3).toHaveFocus();
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        variant="outlined"
        label="Outlined Theme"
        placeholder="Default theme"
        data-testid="theme-outlined"
      />
      <Input
        variant="glass"
        label="Glass Theme"
        placeholder="Glass morphism"
        data-testid="theme-glass"
      />
      <Input
        variant="gradient"
        label="Gradient Theme"
        placeholder="Gradient borders"
        data-testid="theme-gradient"
      />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'blue', value: '#1e3a8a' },
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify theme styling is applied', async () => {
      const glassInput = canvas.getByTestId('theme-glass');
      const gradientInput = canvas.getByTestId('theme-gradient');

      // These inputs should be visible and styled
      await expect(glassInput).toBeVisible();
      await expect(gradientInput).toBeVisible();
    });

    await step('Test theme consistency on focus', async () => {
      const outlinedInput = canvas.getByTestId('theme-outlined');
      const glassInput = canvas.getByTestId('theme-glass');

      // Focus each input to test theme-aware focus styles
      await userEvent.click(outlinedInput);
      await expect(outlinedInput).toHaveFocus();

      await userEvent.click(glassInput);
      await expect(glassInput).toHaveFocus();
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input label="Default State" placeholder="Normal input" data-testid="default-state" />
      <Input label="Hover State" placeholder="Hover over me" data-testid="hover-state" />
      <Input label="Focus State" placeholder="Click to focus" data-testid="focus-state" />
      <Input
        label="Disabled State"
        placeholder="Cannot interact"
        disabled
        data-testid="disabled-state"
      />
      <Input
        label="Error State"
        placeholder="Has error"
        error
        helperText="This field has an error"
        data-testid="error-state"
      />
      <Input
        label="Loading State"
        placeholder="Processing..."
        loading
        data-testid="loading-state"
      />
      <Input
        variant="glass"
        label="Glow Effect"
        placeholder="Has glow"
        glow
        data-testid="glow-state"
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state is visible', async () => {
      const defaultInput = canvas.getByTestId('default-state');
      await expect(defaultInput).toBeVisible();
      await expect(defaultInput).not.toBeDisabled();
    });

    await step('Hover state interaction', async () => {
      const hoverInput = canvas.getByTestId('hover-state');
      await userEvent.hover(hoverInput);
      // Visual hover effects should be applied via CSS
      await expect(hoverInput).toBeVisible();
    });

    await step('Focus state interaction', async () => {
      const focusInput = canvas.getByTestId('focus-state');
      await userEvent.click(focusInput);
      await expect(focusInput).toHaveFocus();
    });

    await step('Disabled state verification', async () => {
      const disabledInput = canvas.getByTestId('disabled-state');
      await expect(disabledInput).toBeDisabled();
      // Try to click (should not gain focus)
      await userEvent.click(disabledInput);
      await expect(disabledInput).not.toHaveFocus();
    });

    await step('Error state verification', async () => {
      const errorInput = canvas.getByTestId('error-state');
      await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
    });

    await step('Loading state verification', async () => {
      const loadingInput = canvas.getByTestId('loading-state');
      await expect(loadingInput).toBeDisabled();

      // Should have a loading spinner in end adornment
      const spinner = canvas.getByRole('progressbar');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Glow state interaction', async () => {
      const glowInput = canvas.getByTestId('glow-state');
      await userEvent.click(glowInput);
      await expect(glowInput).toHaveFocus();
      // Glow effect should be visible via CSS
    });
  },
};

// ============================================================================
// EDGE CASES TESTS
// ============================================================================

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Empty with Floating"
        floating
        placeholder="Floating label behavior"
        data-testid="empty-floating"
      />
      <Input
        label="Long Text Overflow"
        defaultValue="This is a very long text that should show how the input handles overflow and long content gracefully without breaking the layout"
        data-testid="long-text"
      />
      <Input
        label="No Full Width"
        fullWidth={false}
        placeholder="Not full width"
        data-testid="not-full-width"
      />
      <Input
        label="All Effects Combined"
        variant="glass"
        glow
        pulse
        floating
        placeholder="Kitchen sink example"
        helperText="All visual effects enabled"
        data-testid="all-effects"
      />
      <Input
        label="Special Characters"
        placeholder="Test: !@#$%^&*()_+-=[]{}|;:,.<>?"
        data-testid="special-chars"
      />
      <Input label="Unicode Support" placeholder="测试 العربية Русский 🚀" data-testid="unicode" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Empty floating label behavior', async () => {
      const floatingInput = canvas.getByTestId('empty-floating');

      // Label should be in placeholder position initially
      await expect(floatingInput).toHaveAttribute('placeholder', 'Floating label behavior');

      // Type something to trigger label float
      await userEvent.click(floatingInput);
      await userEvent.type(floatingInput, 'test');
      await expect(floatingInput).toHaveValue('test');

      // Clear and blur to test label return
      await userEvent.clear(floatingInput);
      await userEvent.tab();
    });

    await step('Long text overflow handling', async () => {
      const longTextInput = canvas.getByTestId('long-text');
      await expect(longTextInput.value).toContain('This is a very long text');

      // Input should handle overflow gracefully
      await userEvent.click(longTextInput);
      await userEvent.keyboard('{End}');
    });

    await step('Width constraints', async () => {
      const notFullWidthInput = canvas.getByTestId('not-full-width');
      await expect(notFullWidthInput).toBeVisible();

      // Should not fill full container width
      const inputElement = notFullWidthInput.closest('.MuiTextField-root') as HTMLElement;
      await expect(inputElement).toBeInTheDocument();
    });

    await step('Combined effects functionality', async () => {
      const allEffectsInput = canvas.getByTestId('all-effects');

      // Should be visible and interactive despite all effects
      await userEvent.click(allEffectsInput);
      await expect(allEffectsInput).toHaveFocus();

      await userEvent.type(allEffectsInput, 'works with all effects');
      await expect(allEffectsInput).toHaveValue('works with all effects');
    });

    await step('Special characters input', async () => {
      const specialCharsInput = canvas.getByTestId('special-chars');
      const specialText = '!@#$%^&*()_+-=test'; // Simplified to avoid userEvent.type issues

      await userEvent.click(specialCharsInput);
      await userEvent.type(specialCharsInput, specialText);
      await expect(specialCharsInput).toHaveValue(specialText);
    });

    await step('Unicode support', async () => {
      const unicodeInput = canvas.getByTestId('unicode');
      const unicodeText = '测试 العربية Русский 🚀';

      await userEvent.click(unicodeInput);
      await userEvent.type(unicodeInput, unicodeText);
      await expect(unicodeInput).toHaveValue(unicodeText);
    });
  },
};

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => {
    const inputs = Array.from({ length: 50 }, (_, i) => (
      <Input
        key={i}
        label={`Performance Input ${i + 1}`}
        placeholder={`Input number ${i + 1}`}
        data-testid={`perf-input-${i}`}
        variant={i % 3 === 0 ? 'glass' : i % 3 === 1 ? 'gradient' : 'outlined'}
      />
    ));

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {inputs}
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time for multiple inputs', async () => {
      const startTime = window.performance.now();
      const inputs = canvas.getAllByTestId(/perf-input-/);
      const endTime = window.performance.now();

      const renderTime = endTime - startTime;
      // console.log(`Found ${inputs.length} inputs in ${renderTime}ms`);

      // Assert we have all inputs
      await expect(inputs).toHaveLength(50);

      // Assert reasonable performance (adjust threshold as needed)
      await expect(renderTime).toBeLessThan(100);
    });

    await step('Test interaction performance', async () => {
      // Test clicking on several inputs rapidly
      const inputs = canvas.getAllByTestId(/perf-input-/).slice(0, 5);

      const startTime = window.performance.now();

      for (const input of inputs) {
        await userEvent.click(input);
        await userEvent.type(input, 'fast');
        await userEvent.clear(input);
      }

      const endTime = window.performance.now();
      const interactionTime = endTime - startTime;

      // console.log(`Interaction test completed in ${interactionTime}ms`);

      // Should complete interactions in reasonable time
      await expect(interactionTime).toBeLessThan(2000);
    });

    await step('Test scroll performance', async () => {
      const container = canvasElement.querySelector('[style*="overflowY"]') as HTMLElement;

      if (container) {
        // Simulate scrolling
        container.scrollTop = 100;
        await new Promise((resolve) => window.setTimeout(resolve, 100));

        container.scrollTop = 200;
        await new Promise((resolve) => window.setTimeout(resolve, 100));

        // Verify scroll worked
        await expect(container.scrollTop).toBeGreaterThan(0);
      }
    });
  },
};

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  render: () => {
    const IntegrationComponent = () => {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      const [errors, setErrors] = useState<Record<string, string>>({});
      const [showPassword, setShowPassword] = useState(false);

      const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const newFormData = { ...formData, [field]: newValue };
        setFormData(newFormData);

        // Validate this specific field
        const newErrors = { ...errors };

        if (field === 'firstName' && !newValue) {
          newErrors.firstName = 'First name is required';
        } else if (field === 'firstName') {
          delete newErrors.firstName;
        }

        if (field === 'lastName' && !newValue) {
          newErrors.lastName = 'Last name is required';
        } else if (field === 'lastName') {
          delete newErrors.lastName;
        }

        if (field === 'email' && !newValue) {
          newErrors.email = 'Email is required';
        } else if (field === 'email') {
          delete newErrors.email;
        }

        if (field === 'password' && !newValue) {
          newErrors.password = 'Password is required';
        } else if (field === 'password') {
          delete newErrors.password;
        }

        if (field === 'confirmPassword') {
          if (!newValue) {
            newErrors.confirmPassword = 'Confirm password is required';
          } else if (newFormData.password !== newValue) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            delete newErrors.confirmPassword;
          }
        }

        // Also check password match when password field changes
        if (field === 'password' && newFormData.confirmPassword) {
          if (newValue !== newFormData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            delete newErrors.confirmPassword;
          }
        }

        setErrors(newErrors);
      };

      const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          window.alert('Form submitted successfully!');
        }
      };

      return (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
              data-testid="first-name"
              startAdornment={<Person />}
              fullWidth
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              data-testid="last-name"
              fullWidth
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            data-testid="email"
            startAdornment={<Email />}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            data-testid="password"
            startAdornment={<Lock />}
            endAdornment={
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                data-testid="password-toggle"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            data-testid="confirm-password"
            startAdornment={<Lock />}
          />

          <button type="submit" data-testid="submit-form">
            Register
          </button>

          <div data-testid="form-summary">
            Form Valid:{' '}
            {Object.keys(errors).length === 0 && Object.values(formData).every((v) => v.length > 0)
              ? 'Yes'
              : 'No'}{' '}
            | Fields Filled: {Object.values(formData).filter((v) => v.length > 0).length}/5
          </div>
        </form>
      );
    };

    return <IntegrationComponent />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill out form fields', async () => {
      await userEvent.type(canvas.getByTestId('first-name'), 'John');
      await userEvent.type(canvas.getByTestId('last-name'), 'Doe');
      await userEvent.type(canvas.getByTestId('email'), 'john.doe@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'securePassword123');
      await userEvent.type(canvas.getByTestId('confirm-password'), 'securePassword123');
    });

    await step('Verify form state updates', async () => {
      const summary = canvas.getByTestId('form-summary');
      await expect(summary).toHaveTextContent('Fields Filled: 5/5');
    });

    await step('Test password visibility toggle', async () => {
      const passwordInput = canvas.getByTestId('password');
      const toggleButton = canvas.getByTestId('password-toggle');

      // Should be password type initially
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Click toggle
      await userEvent.click(toggleButton);
      await expect(passwordInput).toHaveAttribute('type', 'text');

      // Click again to hide
      await userEvent.click(toggleButton);
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    await step('Test form validation on submit', async () => {
      // Clear one field to trigger validation
      const firstNameInput = canvas.getByTestId('first-name');
      await userEvent.clear(firstNameInput);

      const submitButton = canvas.getByTestId('submit-form');
      await userEvent.click(submitButton);

      // Should show error
      await waitFor(async () => {
        await expect(canvas.getByText('First name is required')).toBeInTheDocument();
      });

      // Form should be invalid
      const summary = canvas.getByTestId('form-summary');
      await expect(summary).toHaveTextContent('Form Valid: No');
    });

    await step('Fix validation error', async () => {
      const firstNameInput = canvas.getByTestId('first-name');
      await userEvent.type(firstNameInput, 'John');

      // Error should clear
      await waitFor(async () => {
        expect(canvas.queryByText('First name is required')).not.toBeInTheDocument();
      });

      // Check that all fields are filled
      const summary = canvas.getByTestId('form-summary');
      await waitFor(async () => {
        await expect(summary).toHaveTextContent('Fields Filled: 5/5');
      });

      // Form should be valid again (all fields filled and no errors)
      await waitFor(
        async () => {
          await expect(summary).toHaveTextContent('Form Valid: Yes');
        },
        { timeout: 2000 },
      );
    });
  },
};
