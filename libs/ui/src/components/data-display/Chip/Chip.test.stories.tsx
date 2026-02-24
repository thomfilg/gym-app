import { Star } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,Mock,userEvent, within } from 'storybook/test';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'DataDisplay/Chip/Tests',
  component: Chip,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Chip'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInteraction: Story = {
  args: {
    label: 'Click me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button');

    // Test initial render
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('Click me');

    // Test click interaction
    await userEvent.click(chip);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const KeyboardNavigation: Story = {
  args: {
    label: 'Keyboard Chip',
    selectable: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('option');

    // Focus the chip
    chip.focus();
    expect(chip).toHaveFocus();

    // Test Enter key
    await userEvent.keyboard('{Enter}');
    expect(args.onClick).toHaveBeenCalled();

    // Clear the mock
    (args.onClick as Mock).mockClear();

    // Test Space key
    await userEvent.keyboard(' ');
    expect(args.onClick).toHaveBeenCalled();
  },
};

export const FocusManagement: Story = {
  args: {
    label: 'Focus Test',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button');

    // Test programmatic focus
    chip.focus();
    expect(chip).toHaveFocus();
  },
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        maxWidth: '300px',
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <Chip key={i} label={`Responsive ${i + 1}`} size="small" onClick={() => {}} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chips = canvas.getAllByRole('button');

    // Test responsive wrapping
    expect(chips).toHaveLength(8);

    // Test chip visibility
    chips.forEach((chip) => {
      expect(chip).toBeVisible();
    });
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const ThemeVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Chip label="Primary" color="primary" onClick={() => {}} />
        <Chip label="Secondary" color="secondary" onClick={() => {}} />
        <Chip label="Success" color="success" onClick={() => {}} />
        <Chip label="Error" color="error" onClick={() => {}} />
        <Chip label="Warning" color="warning" onClick={() => {}} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Chip label="Primary Outlined" color="primary" variant="outlined" onClick={() => {}} />
        <Chip label="Secondary Outlined" color="secondary" variant="outlined" onClick={() => {}} />
        <Chip label="Success Outlined" color="success" variant="outlined" onClick={() => {}} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chips = canvas.getAllByRole('button');

    // Test theme color application
    expect(chips).toHaveLength(8);

    // Test filled vs outlined variants
    const filledChips = chips.slice(0, 5);
    const outlinedChips = chips.slice(5, 8);

    filledChips.forEach((chip) => {
      expect(chip).toBeVisible();
    });

    outlinedChips.forEach((chip) => {
      expect(chip).toBeVisible();
    });
  },
};

export const VisualStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip label="Normal" onClick={() => {}} dataTestId="chip-normal" />
      <Chip label="Selected" selectable selected onClick={() => {}} dataTestId="chip-selected" />
      <Chip label="Disabled" disabled onClick={() => {}} dataTestId="chip-disabled" />
      <Chip
        label="With Avatar"
        avatarSrc="https://mui.com/static/images/avatar/1.jpg"
        onClick={() => {}}
        dataTestId="chip-avatar"
      />
      <Chip label="With Icon" icon={<Star />} onClick={() => {}} dataTestId="chip-icon" />
      <Chip label="Deletable" deletable onDelete={() => {}} onClick={() => {}} dataTestId="chip-deletable" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different visual states using testIds
    const normalChip = canvas.getByTestId('chip-normal');
    expect(normalChip).toBeVisible();
    expect(normalChip).toHaveTextContent('Normal');

    const selectedChip = canvas.getByTestId('chip-selected');
    expect(selectedChip).toBeVisible();
    expect(selectedChip).toHaveAttribute('aria-selected', 'true');

    const disabledChip = canvas.getByTestId('chip-disabled');
    expect(disabledChip).toBeInTheDocument();
    expect(disabledChip).toHaveTextContent('Disabled');

    const avatarChip = canvas.getByTestId('chip-avatar');
    expect(avatarChip).toBeVisible();
    expect(avatarChip).toHaveTextContent('With Avatar');

    const iconChip = canvas.getByTestId('chip-icon');
    expect(iconChip).toBeVisible();
    expect(iconChip).toHaveTextContent('With Icon');

    const deletableChip = canvas.getByTestId('chip-deletable');
    expect(deletableChip).toBeVisible();
    expect(deletableChip).toHaveTextContent('Deletable');

    // Verify the delete icon exists within the deletable chip
    const deleteIcon = canvas.getByTestId('chip-deletable-delete');
    expect(deleteIcon).toBeInTheDocument();
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Chip label="" onClick={() => {}} dataTestId="chip-empty" /> {/* Empty label */}
        <Chip label="A" onClick={() => {}} dataTestId="chip-single" /> {/* Single character */}
        <Chip
          label="This is an extremely long label that should be truncated or handled gracefully by the component"
          onClick={() => {}}
          dataTestId="chip-long"
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Chip label="No handlers" onClick={() => {}} dataTestId="chip-no-handlers" /> {/* No click handlers */}
        <Chip
          label="Multiple states"
          selectable
          selected
          deletable
          onDelete={() => {}}
          onClick={() => {}}
          dataTestId="chip-multiple"
        />
        <Chip label="Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?" onClick={() => {}} dataTestId="chip-special" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty label handling using testId
    const emptyChip = canvas.getByTestId('chip-empty');
    expect(emptyChip).toBeInTheDocument();

    // Test single character
    const singleChip = canvas.getByTestId('chip-single');
    expect(singleChip).toBeVisible();
    expect(singleChip).toHaveTextContent('A');

    // Test long label
    const longChip = canvas.getByTestId('chip-long');
    expect(longChip).toBeVisible();
    expect(longChip).toHaveTextContent(/This is an extremely long label/);

    // Test special characters
    const specialChip = canvas.getByTestId('chip-special');
    expect(specialChip).toBeVisible();
    expect(specialChip).toHaveTextContent(/Special chars:/);

    // Test multiple states
    const multipleChip = canvas.getByTestId('chip-multiple');
    expect(multipleChip).toBeVisible();
    expect(multipleChip).toHaveTextContent('Multiple states');
    expect(multipleChip).toHaveAttribute('aria-selected', 'true');

    // Verify delete icon exists on the multiple states chip
    const deleteIcon = canvas.getByTestId('chip-multiple-delete');
    expect(deleteIcon).toBeInTheDocument();
  },
};
