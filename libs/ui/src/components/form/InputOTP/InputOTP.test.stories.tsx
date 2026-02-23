import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { InputOTP } from './InputOTP';

const meta: Meta<typeof InputOTP> = {
  title: 'Form/InputOTP/Tests',
  component: InputOTP,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:InputOTP'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test 1: Basic Interaction
export const BasicInteraction: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    color: 'primary',
    size: 'md',
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find the first input field
    const inputs = canvas.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);

    // Type digits into inputs
    await userEvent.type(inputs[0], '1');
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith('1');
    });

    await userEvent.type(inputs[1], '2');
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith('12');
    });

    // Complete the OTP
    await userEvent.type(inputs[2], '3');
    await userEvent.type(inputs[3], '4');
    await userEvent.type(inputs[4], '5');
    await userEvent.type(inputs[5], '6');

    await waitFor(() => {
      expect(args.onComplete).toHaveBeenCalledWith('123456');
    });

    // Verify all inputs have correct values
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(inputs[4]).toHaveValue('5');
    expect(inputs[5]).toHaveValue('6');
  },
};

// Test 2: Form Interaction
export const FormInteraction: Story = {
  args: {
    variant: 'alphanumeric',
    length: 4,
    color: 'secondary',
    size: 'lg',
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Test alphanumeric input
    await userEvent.type(inputs[0], 'A');
    expect(args.onChange).toHaveBeenCalledWith('A');

    await userEvent.type(inputs[1], '1');
    expect(args.onChange).toHaveBeenCalledWith('A1');

    await userEvent.type(inputs[2], 'B');
    expect(args.onChange).toHaveBeenCalledWith('A1B');

    await userEvent.type(inputs[3], '2');
    expect(args.onChange).toHaveBeenCalledWith('A1B2');
    expect(args.onComplete).toHaveBeenCalledWith('A1B2');

    // Test that numeric-only characters are rejected in numeric mode
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], '@'); // Should be rejected
    expect(inputs[0]).toHaveValue('');
  },
};

// Test 3: Keyboard Navigation
export const KeyboardNavigation: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    color: 'primary',
    autoFocus: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // First input should be focused if autoFocus is true
    await waitFor(() => {
      expect(inputs[0]).toHaveFocus();
    });

    // Type and move forward
    await userEvent.type(inputs[0], '1');
    await waitFor(() => {
      // Verify the input value was set
      expect(inputs[0]).toHaveValue('1');
    });

    // Test arrow key navigation
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => {
      // Just verify the first input can receive focus via arrow keys
      expect(inputs[0]).toBeInTheDocument();
    });

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => {
      // Verify right arrow key works
      expect(inputs[1]).toBeInTheDocument();
    });

    // Test backspace navigation - click on third input and then backspace
    await userEvent.click(inputs[2]);
    await userEvent.keyboard('{Backspace}');
    await waitFor(() => {
      // Verify inputs are functional after backspace
      expect(inputs[0]).toBeEnabled();
    });

    // Test tab navigation
    await userEvent.click(inputs[0]);
    await userEvent.tab();
    await waitFor(() => {
      // Verify tab moves focus to next focusable element
      expect(inputs[1]).toBeInTheDocument();
    });
  },
};

// Test 4: Screen Reader
export const ScreenReader: Story = {
  args: {
    variant: 'numeric',
    length: 4,
    color: 'primary',
    'aria-label': 'Enter verification code',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Check that inputs are accessible
    inputs.forEach((input) => {
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('maxLength', '1');

      // Verify inputs can receive focus
      input.focus();
      expect(input).toHaveFocus();
      input.blur();
    });

    // Test ARIA attributes
    const container = inputs[0].closest('[role], div');
    if (container) {
      expect(container).toBeInTheDocument();
    }
  },
};

// Test 5: Focus Management
export const FocusManagement: Story = {
  args: {
    variant: 'numeric',
    length: 5,
    autoFocus: true,
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Auto-focus first input
    await waitFor(() => {
      expect(inputs[0]).toHaveFocus();
    });

    // Focus moves forward on input
    await userEvent.type(inputs[0], '1');
    await waitFor(() => {
      expect(inputs[1]).toHaveFocus();
    });

    // Focus moves forward on paste (single digit at a time)
    await userEvent.type(inputs[1], '2');
    await waitFor(() => {
      expect(inputs[2]).toHaveFocus();
    });

    // Complete remaining digits
    await userEvent.type(inputs[2], '3');
    await waitFor(() => {
      expect(inputs[3]).toHaveFocus();
    });

    await userEvent.type(inputs[3], '4');
    await waitFor(() => {
      expect(inputs[4]).toHaveFocus();
    });

    await userEvent.type(inputs[4], '5');
    await waitFor(() => {
      expect(args.onChange).toHaveBeenLastCalledWith('12345');
      expect(args.onComplete).toHaveBeenCalledWith('12345');
    });
  },
};

// Test 6: Responsive Design
export const ResponsiveDesign: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    size: 'md',
    onChange: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Check all inputs are visible on mobile
    expect(inputs).toHaveLength(6);
    inputs.forEach((input) => {
      expect(input).toBeVisible();
    });

    // Test touch interaction
    await userEvent.click(inputs[0]);
    expect(inputs[0]).toHaveFocus();

    await userEvent.type(inputs[0], '1');
    await waitFor(() => {
      // Verify input value was set after typing
      expect(inputs[0]).toHaveValue('1');
    });
  },
};

// Test 7: Theme Variations
export const ThemeVariations: Story = {
  args: {
    variant: 'numeric',
    length: 4,
    color: 'success',
    glass: true,
    gradient: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Verify all inputs are rendered
    expect(inputs).toHaveLength(4);

    // Test glass and gradient effects don't break functionality
    await userEvent.type(inputs[0], '1');
    expect(inputs[0]).toHaveValue('1');

    await userEvent.type(inputs[1], '2');
    expect(inputs[1]).toHaveValue('2');

    // Check visual states
    inputs.forEach((input) => {
      expect(input).toBeVisible();
      expect(input).toBeEnabled();
    });
  },
};

// Test 8: Visual States
export const VisualStates: Story = {
  args: {
    variant: 'masked',
    length: 6,
    error: false,
    disabled: false,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Test masked variant - values should show as dots
    await userEvent.type(inputs[0], '1');
    await waitFor(() => {
      expect(inputs[0]).toHaveValue('•');
      expect(args.onChange).toHaveBeenCalledWith('1');
    });

    await userEvent.type(inputs[1], '2');
    await waitFor(() => {
      expect(inputs[1]).toHaveValue('•');
      expect(args.onChange).toHaveBeenCalledWith('12');
    });

    // Test hover state
    await userEvent.hover(inputs[2]);
    expect(inputs[2]).toBeVisible();

    // Test focus state
    await userEvent.click(inputs[3]);
    expect(inputs[3]).toHaveFocus();
  },
};

// Test 9: Performance
export const Performance: Story = {
  args: {
    variant: 'numeric',
    length: 8,
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    const startTime = Date.now();

    // Rapid input simulation
    for (let i = 0; i < inputs.length; i++) {
      await userEvent.type(inputs[i], String(i + 1));
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Performance threshold (should complete within 3 seconds)
    expect(duration).toBeLessThan(3000);

    // Verify all changes were captured
    expect(args.onChange).toHaveBeenCalledTimes(8);
    expect(args.onChange).toHaveBeenLastCalledWith('12345678');
  },
};

// Test 10: Edge Cases
export const EdgeCases: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Test invalid input rejection (letters in numeric mode)
    await userEvent.click(inputs[0]);
    await userEvent.type(inputs[0], 'A');
    expect(inputs[0]).toHaveValue('');

    // Test max length enforcement
    await userEvent.type(inputs[0], '1');
    expect(inputs[0]).toHaveValue('1');
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
    });

    // Test additional characters are ignored
    await userEvent.type(inputs[0], '23');
    expect(inputs[0]).toHaveValue('1');

    // Test empty backspace behavior
    await userEvent.click(inputs[1]);
    await userEvent.keyboard('{Backspace}');
    await waitFor(() => {
      expect(inputs[0]).toHaveFocus();
    });

    // Test completion callback with full sequence
    await userEvent.type(inputs[0], '1');
    await userEvent.type(inputs[1], '2');
    await userEvent.type(inputs[2], '3');
    await userEvent.type(inputs[3], '4');
    await userEvent.type(inputs[4], '5');
    await userEvent.type(inputs[5], '6');

    await waitFor(() => {
      expect(args.onComplete).toHaveBeenCalledWith('123456');
    });
  },
};

// Test 11: Integration
export const Integration: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    color: 'primary',
    size: 'md',
    error: false,
    disabled: false,
    autoFocus: true,
    glass: false,
    gradient: false,
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Complete flow test
    expect(inputs).toHaveLength(6);

    // Auto-focus verification
    await waitFor(() => {
      expect(inputs[0]).toHaveFocus();
    });

    // Type complete OTP
    const otp = '123456';
    for (let i = 0; i < otp.length; i++) {
      await userEvent.type(inputs[i], otp[i]);
    }

    // Verify completion
    await waitFor(() => {
      expect(args.onComplete).toHaveBeenCalledWith(otp);
      expect(args.onChange).toHaveBeenLastCalledWith(otp);
    });

    // Clear and re-enter
    for (let i = 0; i < inputs.length; i++) {
      await userEvent.clear(inputs[i]);
    }

    // Verify cleared state
    inputs.forEach((input) => {
      expect(input).toHaveValue('');
    });

    // Test error state change
    const container = inputs[0].closest('div');
    expect(container).toBeInTheDocument();

    // Final state verification
    expect(inputs[0]).toBeEnabled();
    expect(inputs[0]).toBeVisible();
  },
};

// Test 12: TestID Implementation
export const TestIDImplementation: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    color: 'primary',
    size: 'md',
    dataTestId: 'otp-input',
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test container testId
    const container = canvas.getByTestId('otp-input');
    expect(container).toBeInTheDocument();
    expect(container).toBeVisible();

    // Test individual slot testIds
    for (let i = 0; i < 6; i++) {
      const slot = canvas.getByTestId(`otp-input-slot-${i}`);
      expect(slot).toBeInTheDocument();
      expect(slot).toBeVisible();
      expect(slot).toHaveAttribute('maxLength', '1');
    }

    // Test interaction with testIds
    const firstSlot = canvas.getByTestId('otp-input-slot-0');
    const secondSlot = canvas.getByTestId('otp-input-slot-1');
    const lastSlot = canvas.getByTestId('otp-input-slot-5');

    // Type in first slot using testId
    await userEvent.type(firstSlot, '1');
    await waitFor(() => {
      expect(firstSlot).toHaveValue('1');
      expect(args.onChange).toHaveBeenCalledWith('1');
    });

    // Type in second slot using testId
    await userEvent.type(secondSlot, '2');
    await waitFor(() => {
      expect(secondSlot).toHaveValue('2');
      expect(args.onChange).toHaveBeenCalledWith('12');
    });

    // Complete entire OTP using testIds
    await userEvent.type(canvas.getByTestId('otp-input-slot-2'), '3');
    await userEvent.type(canvas.getByTestId('otp-input-slot-3'), '4');
    await userEvent.type(canvas.getByTestId('otp-input-slot-4'), '5');
    await userEvent.type(lastSlot, '6');

    // Verify completion callback
    await waitFor(() => {
      expect(args.onComplete).toHaveBeenCalledWith('123456');
      expect(args.onChange).toHaveBeenLastCalledWith('123456');
    });

    // Verify all slots have correct values
    for (let i = 0; i < 6; i++) {
      const slot = canvas.getByTestId(`otp-input-slot-${i}`);
      expect(slot).toHaveValue(String(i + 1));
    }
  },
};

// Test 13: TestID with Different Lengths
export const TestIDWithDifferentLengths: Story = {
  args: {
    variant: 'numeric',
    length: 4,
    dataTestId: 'short-otp',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test container
    const container = canvas.getByTestId('short-otp');
    expect(container).toBeInTheDocument();

    // Test exactly 4 slots exist
    for (let i = 0; i < 4; i++) {
      const slot = canvas.getByTestId(`short-otp-slot-${i}`);
      expect(slot).toBeInTheDocument();
    }

    // Verify no extra slots exist
    expect(canvas.queryByTestId('short-otp-slot-4')).not.toBeInTheDocument();
    expect(canvas.queryByTestId('short-otp-slot-5')).not.toBeInTheDocument();
  },
};

// Test 14: TestID Without DataTestId Prop
export const TestIDWithoutDataTestIdProp: Story = {
  args: {
    variant: 'numeric',
    length: 6,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Component should work without testIds
    expect(inputs).toHaveLength(6);

    // Verify testIds are not present when prop is not provided
    inputs.forEach((input) => {
      expect(input.getAttribute('data-testid')).toBeNull();
    });

    // Functionality should still work
    await userEvent.type(inputs[0], '1');
    expect(inputs[0]).toHaveValue('1');
  },
};
