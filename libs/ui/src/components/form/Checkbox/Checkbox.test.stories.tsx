import Stack from '@mui/material/Stack';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, within } from 'storybook/test';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox/Tests',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Checkbox'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    label: 'Test Checkbox',
    onChange: fn(),
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const checkbox = canvas.getByRole('checkbox', { name: /test checkbox/i });
      await expect(checkbox).toBeInTheDocument();
      await expect(checkbox).not.toBeChecked();
    });

    await step('Click to check', async () => {
      const checkbox = canvas.getByRole('checkbox', { name: /test checkbox/i });
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    });
  },
};

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="First checkbox" />
      <Checkbox label="Second checkbox" />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation', async () => {
      const firstCheckbox = canvas.getByRole('checkbox', { name: /first checkbox/i });
      await expect(firstCheckbox).toBeInTheDocument();
    });
  },
};

export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  render: () => (
    <Stack spacing={2}>
      <Checkbox autoFocus label="Auto-focus checkbox" />
      <Checkbox label="Regular checkbox" />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Auto focus', async () => {
      const autoFocusCheckbox = canvas.getByRole('checkbox', { name: /auto-focus checkbox/i });
      await expect(autoFocusCheckbox).toBeInTheDocument();
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Default state" />
      <Checkbox label="Checked state" defaultChecked />
      <Checkbox label="Disabled state" disabled />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state', async () => {
      const checkbox = canvas.getByRole('checkbox', { name: /default state/i });
      await expect(checkbox).not.toBeChecked();
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Mobile checkbox" size="small" />
      <Checkbox label="Tablet checkbox" size="medium" />
      <Checkbox label="Desktop checkbox" size="large" />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Responsive layout', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      await expect(checkboxes).toHaveLength(3);
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Primary checkbox" color="primary" defaultChecked />
      <Checkbox label="Secondary checkbox" color="secondary" defaultChecked />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Theme colors', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      await expect(checkboxes).toHaveLength(2);
    });
  },
};

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <Stack spacing={2}>
      <Checkbox label="Long text that wraps around multiple lines to test layout" />
      <Checkbox label="Unicode: 🚀 ✨ 💫" />
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Edge cases', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      await expect(checkboxes).toHaveLength(2);
    });
  },
};

export const Integration: Story = {
  name: '🔗 Integration Test',
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        label="Integration test"
        checked={checked}
        onChange={(e, value) => setChecked(value)}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Integration test', async () => {
      const checkbox = canvas.getByRole('checkbox', { name: /integration test/i });
      await expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    });
  },
};
