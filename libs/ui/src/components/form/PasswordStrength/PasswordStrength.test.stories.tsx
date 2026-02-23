import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect, waitFor } from 'storybook/test';
import React, { useState } from 'react';

import { PasswordStrength } from './PasswordStrength';

const meta: Meta<typeof PasswordStrength> = {
  title: 'Form/PasswordStrength/Tests',
  component: PasswordStrength,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'component:PasswordStrength'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Test
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <PasswordStrength
        data-testid="password-strength"
        value="weak"
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify component renders', async () => {
      const component = await canvas.findByTestId('password-strength');
      expect(component).toBeInTheDocument();
    });

    await step('Verify strength label is shown', async () => {
      const strengthText = await canvas.findByText(/Password Strength/i);
      expect(strengthText).toBeInTheDocument();
    });

    await step('Verify requirements section is present', async () => {
      const requirementsText = await canvas.findByText(/Requirements:/i);
      expect(requirementsText).toBeInTheDocument();
    });
  },
};

// A stateful wrapper to test user input
const InteractivePasswordStrength = () => {
  const [password, setPassword] = useState('');
  return (
    <Stack spacing={3} sx={{ width: 400, padding: 2 }}>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{ 'data-testid': 'password-input' }}
        variant="outlined"
      />
      <PasswordStrength
        data-testid="password-strength-indicator"
        value={password}
        showRequirements={true}
        showStrengthLabel={true}
      />
    </Stack>
  );
};

// Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  name: '🧪 Keyboard Navigation Test',
  render: () => <InteractivePasswordStrength />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('password-input');

    await step('User types a weak password', async () => {
      await userEvent.type(input, 'test');
      const strengthLabel = await canvas.findByText(/Weak/i);
      expect(strengthLabel).toBeInTheDocument();
    });

    await step('User types a stronger password', async () => {
      // Clear and type a new password
      await userEvent.clear(input);
      await userEvent.type(input, 'test1234');
      const strengthLabel = await canvas.findByText(/Good/i);
      expect(strengthLabel).toBeInTheDocument();
    });

    await step('User clears the input', async () => {
      await userEvent.clear(input);
      expect(canvas.queryByText(/Weak|Fair|Good|Strong/i)).not.toBeInTheDocument();
    });
  },
};

// Screen Reader Test
export const ScreenReader: Story = {
  name: '🧪 Screen Reader Test',
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <PasswordStrength
        data-testid="password-strength"
        value="MyStrongP@ssw0rd123!"
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify progressbar role and ARIA attributes are present', async () => {
      const progressBar = await canvas.findByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    await step('Verify strong password strength is announced', async () => {
      const strongLabel = await canvas.findByText(/Strong/i);
      expect(strongLabel).toBeInTheDocument();
    });

    await step('Verify all requirements are visibly met with check icons', async () => {
      const metRequirements = await canvas.findAllByTestId('check-icon');
      expect(metRequirements).toHaveLength(5);
    });
  },
};

// Responsive Design Test
export const ResponsiveDesign: Story = {
  name: '🧪 Responsive Design Test',
  render: () => (
    <Stack spacing={2} sx={{ width: '90vw' }}>
      <PasswordStrength
        data-testid="password-strength-responsive"
        value="MyStrongP@ssw0rd123!"
        variant="linear"
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify component renders', async () => {
      const component = await canvas.findByTestId('password-strength-responsive');
      expect(component).toBeInTheDocument();
    });

    await step('Verify component takes up parent width', async () => {
      const component = await canvas.findByTestId('password-strength-responsive');
      const parent = canvasElement.querySelector('.MuiStack-root') as HTMLElement;
      const componentWidth = component.getBoundingClientRect().width;
      const parentWidth = parent.getBoundingClientRect().width;
      // Check that component width is close to parent's width
      expect(componentWidth).toBeCloseTo(parentWidth, -1);
    });
  },
};

// Visual States Test
export const VisualStates: Story = {
  name: '🧪 Visual States Test',
  render: () => (
    <Stack spacing={3}>
      <PasswordStrength data-testid="very-weak-password" value="1" showStrengthLabel={true} />
      <PasswordStrength data-testid="weak-password" value="pass" showStrengthLabel={true} />
      <PasswordStrength data-testid="fair-password" value="password" showStrengthLabel={true} />
      <PasswordStrength data-testid="good-password" value="password123" showStrengthLabel={true} />
      <PasswordStrength data-testid="strong-password" value="MyStrongP@ssw0rd123!" showStrengthLabel={true} />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify very weak password state and label', async () => {
      const veryWeakContainer = await canvas.findByTestId('very-weak-password');
      const label = within(veryWeakContainer).getByText('Very Weak');
      expect(label).toBeInTheDocument();
    });

    await step('Verify weak password state and label', async () => {
      const weakContainer = await canvas.findByTestId('weak-password');
      const label = within(weakContainer).getByText('Weak');
      expect(label).toBeInTheDocument();
    });

    await step('Verify fair password state and label', async () => {
      const fairContainer = await canvas.findByTestId('fair-password');
      const label = within(fairContainer).getByText('Fair');
      expect(label).toBeInTheDocument();
    });

    await step('Verify good password state and label', async () => {
      const goodContainer = await canvas.findByTestId('good-password');
      const label = within(goodContainer).getByText('Good');
      expect(label).toBeInTheDocument();
    });

    await step('Verify strong password state and label', async () => {
      const strongContainer = await canvas.findByTestId('strong-password');
      const label = within(strongContainer).getByText('Strong');
      expect(label).toBeInTheDocument();
    });
  },
};

// This test is commented out because client-side performance checks in a test
// environment are inherently flaky and unreliable. They can be affected by system load,
// Storybook overhead, and other factors, leading to inconsistent results.
// Performance profiling should be done with dedicated browser developer tools.
/*
export const Performance: Story = {
  name: '🧪 Performance Test',
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <PasswordStrength
        data-testid="performance-strength"
        value="MyPassword123!"
        animated={true}
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Measure render performance', async () => {
      const startTime = window.performance.now();
      const component = await canvas.findByTestId('performance-strength');
      const endTime = window.performance.now();
      expect(component).toBeInTheDocument();
      const renderTime = endTime - startTime;
      console.log(`Render time: ${renderTime}ms`);
      expect(renderTime).toBeLessThan(100); // This is not a reliable assertion
    });
  },
};
*/

// Edge Cases Test
export const EdgeCases: Story = {
  name: '🧪 Edge Cases Test',
  render: () => (
    <Stack spacing={3}>
      <PasswordStrength
        data-testid="empty-password"
        value=""
        showRequirements={true}
        showStrengthLabel={true}
      />
      <PasswordStrength
        data-testid="very-long-password"
        value="ThisIsAnExtremelyLongPasswordThatExceedsTypicalLengthRequirementsAndShouldStillWork123!@#"
        showStrengthLabel={true}
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify empty password state shows no strength label', async () => {
      const emptyContainer = await canvas.findByTestId('empty-password');
      expect(emptyContainer).toBeInTheDocument();
      const label = within(emptyContainer).queryByText(/Very Weak|Weak|Fair|Good|Strong/i);
      expect(label).not.toBeInTheDocument();
    });

    await step('Verify very long password state shows "Strong"', async () => {
      const veryLongContainer = await canvas.findByTestId('very-long-password');
      const label = await within(veryLongContainer).findByText('Strong');
      expect(label).toBeInTheDocument();
    });
  },
};

// Integration Test
export const Integration: Story = {
  name: '🧪 Integration Test',
  render: () => (
    <Stack spacing={2} sx={{ width: 500 }}>
      <PasswordStrength
        data-testid="integration-strength"
        value="Pass123"
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
        animated={true}
      />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all features render together', async () => {
      const component = await canvas.findByTestId('integration-strength');
      expect(component).toBeInTheDocument();
      expect(await canvas.findByText(/Password Strength/i)).toBeInTheDocument();
      expect(await canvas.findByText(/Requirements:/i)).toBeInTheDocument();
    });

    await step('Verify password strength is calculated correctly as "Fair"', async () => {
      const strengthIndicator = await canvas.findByText('Fair');
      expect(strengthIndicator).toBeInTheDocument();
    });

    await step('Verify correct requirements are met', async () => {
      const metIcons = await canvas.findAllByTestId('check-icon');
      const unmetIcons = await canvas.findAllByTestId('close-icon');
      // Password "Pass123" meets: length (7), uppercase, lowercase, numbers
      // Missing: special character
      expect(unmetIcons).toHaveLength(2); // minLength requires 8, missing special
      expect(metIcons).toHaveLength(3); // uppercase, lowercase, numbers
    });
  },
};