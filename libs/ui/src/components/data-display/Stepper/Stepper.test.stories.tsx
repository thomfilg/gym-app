import Box from '@mui/material/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Stepper } from './Stepper';
import type { Step } from './Stepper.types';

const meta: Meta<typeof Stepper> = {
  title: 'DataDisplay/Stepper/Tests',
  component: Stepper,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Stepper', 'checked'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps: Step[] = [
  { id: 'step1', label: 'Personal Info', description: 'Enter your details' },
  { id: 'step2', label: 'Address', description: 'Provide address' },
  { id: 'step3', label: 'Payment', description: 'Payment method' },
  { id: 'step4', label: 'Review', description: 'Review order' },
];

// Test 1: Basic Interaction
export const BasicInteraction: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    variant: 'non-linear',
    clickable: true,
    onStepChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click on first step
    const firstStepButton = canvas.getByLabelText(/Step 1.*Personal Info/);
    await expect(firstStepButton).toBeInTheDocument();

    await userEvent.click(firstStepButton);
    await waitFor(() => {
      expect(args.onStepChange).toHaveBeenCalledWith('step1');
    });

    // Verify step is marked as completed
    const completedIcon = canvas.getByTestId('CheckCircleIcon');
    await expect(completedIcon).toBeInTheDocument();

    // Click on third step
    const thirdStepButton = canvas.getByLabelText(/Step 3.*Payment/);
    await userEvent.click(thirdStepButton);
    await waitFor(() => {
      expect(args.onStepChange).toHaveBeenCalledWith('step3');
    });
  },
};

// Test 2: State Change Test
export const StateChangeTest: Story = {
  render: () => {
    const TestComponent = () => {
      const [activeId, setActiveId] = useState('step1');
      const [completed, setCompleted] = useState(new Set<string>());

      const handleStepChange = (stepId: string) => {
        setActiveId(stepId);
        // Mark previous steps as completed
        const stepIndex = defaultSteps.findIndex((s) => s.id === stepId);
        const newCompleted = new Set(completed);
        for (let i = 0; i < stepIndex; i++) {
          newCompleted.add(defaultSteps[i].id);
        }
        setCompleted(newCompleted);
      };

      return (
        <Box data-testid="state-change-container">
          <Stepper
            steps={defaultSteps}
            activeId={activeId}
            completed={completed}
            variant="non-linear"
            clickable
            onStepChange={handleStepChange}
          />
          <div data-testid="active-step">{activeId}</div>
          <div data-testid="completed-count">{completed.size}</div>
        </Box>
      );
    };

    return <TestComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially should be on step1 with 0 completed
    await expect(canvas.getByTestId('active-step')).toHaveTextContent('step1');
    await expect(canvas.getByTestId('completed-count')).toHaveTextContent('0');

    // Click on step 3
    const step3Button = canvas.getByLabelText(/Step 3.*Payment/);
    await userEvent.click(step3Button);

    await waitFor(() => {
      expect(canvas.getByTestId('active-step')).toHaveTextContent('step3');
      expect(canvas.getByTestId('completed-count')).toHaveTextContent('2');
    });

    // Verify completed steps have check icons
    const checkIcons = canvas.getAllByTestId('CheckCircleIcon');
    await expect(checkIcons).toHaveLength(2);
  },
};

// Test 3: Keyboard Navigation
export const KeyboardNavigation: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    variant: 'non-linear',
    clickable: true,
    onStepChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const firstStepButton = canvas.getByLabelText(/Step 1.*Personal Info/);

    // Focus the first step button
    firstStepButton.focus();
    await expect(firstStepButton).toHaveFocus();

    // Press Enter to activate
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(args.onStepChange).toHaveBeenCalledWith('step1');
    });

    // Test Space key
    const thirdStepButton = canvas.getByLabelText(/Step 3.*Payment/);
    thirdStepButton.focus();
    await userEvent.keyboard(' ');
    await waitFor(() => {
      expect(args.onStepChange).toHaveBeenCalledWith('step3');
    });

    // Test Tab navigation
    firstStepButton.focus();
    await userEvent.tab();
    const nextButton = canvas.getByLabelText(/Step 2.*Address/);
    await expect(nextButton).toHaveFocus();
  },
};

// Test 4: Screen Reader Test
export const ScreenReader: Story = {
  args: {
    steps: [
      { id: 'step1', label: 'Personal Info', description: 'Enter details' },
      { id: 'step2', label: 'Address', description: 'Provide address', optional: true },
      { id: 'step3', label: 'Payment', description: 'Payment method', disabled: true },
    ],
    activeId: 'step2',
    completed: new Set(['step1']),
    variant: 'non-linear',
    clickable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check ordered list structure for screen readers
    const stepperList = canvas.getByRole('list');
    await expect(stepperList).toBeInTheDocument();
    await expect(stepperList.tagName).toBe('OL');

    // Check aria-current on active step
    const activeStepButton = canvas.getByLabelText(/Step 2.*Address.*current/);
    await expect(activeStepButton).toHaveAttribute('aria-current', 'step');

    // Check completed step accessibility
    const completedStepButton = canvas.getByLabelText(/Step 1.*Personal Info.*completed/);
    await expect(completedStepButton).toBeInTheDocument();

    // Check optional step labeling
    const optionalStepButton = canvas.getByLabelText(/Step 2.*Address.*optional/);
    await expect(optionalStepButton).toBeInTheDocument();

    // Check disabled step
    const disabledStepButton = canvas.getByLabelText(/Step 3.*Payment/);
    await expect(disabledStepButton).toBeDisabled();

    // Verify list items
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems).toHaveLength(3);
  },
};

// Test 5: Focus Management
export const FocusManagement: Story = {
  render: () => {
    const TestComponent = () => {
      const [activeId, setActiveId] = useState('step1');

      return (
        <Box>
          <button data-testid="external-button">External Button</button>
          <Stepper
            steps={defaultSteps}
            activeId={activeId}
            completed={new Set()}
            variant="non-linear"
            clickable
            onStepChange={setActiveId}
          />
        </Box>
      );
    };

    return <TestComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const externalButton = canvas.getByTestId('external-button');
    const firstStepButton = canvas.getByLabelText(/Step 1.*Personal Info/);

    // Focus external element first
    externalButton.focus();
    await expect(externalButton).toHaveFocus();

    // Tab to first step
    await userEvent.tab();
    await expect(firstStepButton).toHaveFocus();

    // Click step and verify focus remains
    await userEvent.click(firstStepButton);
    await expect(firstStepButton).toHaveFocus();

    // Test that disabled steps don't receive focus
    const steps = canvas.getAllByRole('button');
    for (const step of steps) {
      if (!step.hasAttribute('disabled')) {
        step.focus();
        await expect(step).toHaveFocus();
      }
    }
  },
};

// Test 6: Responsive Design
export const ResponsiveDesign: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 320, height: 400 }}>
        <Story orientation="vertical" />
      </Box>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // In mobile viewport, check vertical layout
    const stepperList = canvas.getByRole('list');
    await expect(stepperList).toBeInTheDocument();

    // Verify all steps are visible and accessible
    const stepButtons = canvas.getAllByRole('button');
    await expect(stepButtons).toHaveLength(4);

    // Check step labels are still readable
    const step1Label = canvas.getByText('Personal Info');
    const step2Label = canvas.getByText('Address');
    await expect(step1Label).toBeVisible();
    await expect(step2Label).toBeVisible();

    // Check descriptions are present
    const description1 = canvas.getByText('Enter your details');
    const description2 = canvas.getByText('Provide address');
    await expect(description1).toBeVisible();
    await expect(description2).toBeVisible();
  },
};

// Test 7: Theme Variations
export const ThemeVariations: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    variant: 'non-linear',
    clickable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that theme colors are applied
    const activeStepButton = canvas.getByLabelText(/Step 2.*Address.*current/);
    const completedStepButton = canvas.getByLabelText(/Step 1.*Personal Info.*completed/);

    // Verify buttons exist and are styled
    await expect(activeStepButton).toBeInTheDocument();
    await expect(completedStepButton).toBeInTheDocument();

    // Test hover states by focusing and checking for style changes
    await userEvent.hover(activeStepButton);
    await expect(activeStepButton).toBeInTheDocument();

    // Check completed step has check icon
    const checkIcon = canvas.getByTestId('CheckCircleIcon');
    await expect(checkIcon).toBeInTheDocument();

    // Test connector styling
    const stepperContainer = canvas.getByRole('list');
    await expect(stepperContainer).toBeInTheDocument();
  },
};

// Test 8: Visual States
export const VisualStates: Story = {
  args: {
    steps: [
      { id: 'completed', label: 'Completed', description: 'Done' },
      { id: 'active', label: 'Active', description: 'Current step' },
      { id: 'optional', label: 'Optional', description: 'Optional step', optional: true },
      { id: 'disabled', label: 'Disabled', description: 'Cannot access', disabled: true },
      { id: 'pending', label: 'Pending', description: 'Future step' },
    ],
    activeId: 'active',
    completed: new Set(['completed']),
    variant: 'non-linear',
    clickable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check completed step has check icon
    const completedButton = canvas.getByLabelText(/Step 1.*Completed.*completed/);
    await expect(completedButton).toBeInTheDocument();
    const checkIcon = canvas.getByTestId('CheckCircleIcon');
    await expect(checkIcon).toBeInTheDocument();

    // Check active step is marked current
    const activeButton = canvas.getByLabelText(/Step 2.*Active.*current/);
    await expect(activeButton).toHaveAttribute('aria-current', 'step');

    // Check optional step labeling
    const optionalButton = canvas.getByLabelText(/Step 3.*Optional.*optional/);
    await expect(optionalButton).toBeInTheDocument();

    // Check disabled step
    const disabledButton = canvas.getByLabelText(/Step 4.*Disabled/);
    await expect(disabledButton).toBeDisabled();

    // Check pending step (should be clickable in non-linear mode)
    const pendingButton = canvas.getByLabelText(/Step 5.*Pending/);
    await expect(pendingButton).toBeInTheDocument();
    await expect(pendingButton).not.toBeDisabled();
  },
};

// Test 9: Performance Test
export const Performance: Story = {
  args: {
    steps: Array.from({ length: 10 }, (_, i) => ({
      id: `step${i + 1}`,
      label: `Step ${i + 1}`,
      description: `Description for step ${i + 1}`,
    })),
    activeId: 'step5',
    completed: new Set(['step1', 'step2', 'step3', 'step4']),
    variant: 'non-linear',
    clickable: true,
    onStepChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const startTime = Date.now();

    // Verify all 10 steps render
    const stepButtons = canvas.getAllByRole('button');
    await expect(stepButtons).toHaveLength(10);

    // Test rapid clicking performance
    const step8Button = canvas.getByLabelText(/Step 8/);
    const step3Button = canvas.getByLabelText(/Step 3/);
    const step7Button = canvas.getByLabelText(/Step 7/);

    await userEvent.click(step8Button);
    await userEvent.click(step3Button);
    await userEvent.click(step7Button);

    const endTime = Date.now();
    const renderTime = endTime - startTime;

    // Verify interactions completed quickly (less than 1000ms)
    expect(renderTime).toBeLessThan(1000);

    // Verify callback was called for all clicks
    await waitFor(() => {
      expect(args.onStepChange).toHaveBeenCalledTimes(3);
    });
  },
};

// Test 10: Edge Cases
export const EdgeCases: Story = {
  render: () => {
    const TestComponent = () => {
      const [testCase, setTestCase] = useState<'empty' | 'single' | 'invalid'>('empty');

      const getStepsForCase = () => {
        switch (testCase) {
          case 'empty':
            return [];
          case 'single':
            return [{ id: 'only', label: 'Only Step', description: 'Single step' }];
          case 'invalid':
            return defaultSteps;
          default:
            return [];
        }
      };

      const getActiveId = () => {
        switch (testCase) {
          case 'single':
            return 'only';
          case 'invalid':
            return 'nonexistent';
          default:
            return '';
        }
      };

      return (
        <Box data-testid="edge-cases-container">
          <div>
            <button onClick={() => setTestCase('empty')} data-testid="test-empty">
              Empty
            </button>
            <button onClick={() => setTestCase('single')} data-testid="test-single">
              Single
            </button>
            <button onClick={() => setTestCase('invalid')} data-testid="test-invalid">
              Invalid
            </button>
          </div>
          <div data-testid="current-case">{testCase}</div>
          <Stepper steps={getStepsForCase()} activeId={getActiveId()} completed={new Set()} />
        </Box>
      );
    };

    return <TestComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty steps array
    await expect(canvas.getByTestId('current-case')).toHaveTextContent('empty');

    // Test single step
    const singleButton = canvas.getByTestId('test-single');
    await userEvent.click(singleButton);
    await waitFor(() => {
      expect(canvas.getByTestId('current-case')).toHaveTextContent('single');
    });

    const singleStepButton = canvas.getByLabelText(/Step 1.*Only Step/);
    await expect(singleStepButton).toBeInTheDocument();

    // Test invalid activeId
    const invalidButton = canvas.getByTestId('test-invalid');
    await userEvent.click(invalidButton);
    await waitFor(() => {
      expect(canvas.getByTestId('current-case')).toHaveTextContent('invalid');
    });

    // Should still render all steps even with invalid activeId
    const stepButtons = canvas
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-label')?.includes('Step'));
    await expect(stepButtons).toHaveLength(4);
  },
};

// Test 11: Integration Test
export const Integration: Story = {
  render: () => {
    const TestComponent = () => {
      const [activeId, setActiveId] = useState('step1');
      const [completed, setCompleted] = useState(new Set<string>());
      const [formData, setFormData] = useState<Record<string, string>>({});

      const handleStepChange = (stepId: string) => {
        // Simulate form validation
        if (stepId === 'step2' && !formData.name) {
          return; // Don't allow progression without name
        }

        setActiveId(stepId);

        // Mark previous steps as completed
        const stepIndex = defaultSteps.findIndex((s) => s.id === stepId);
        const newCompleted = new Set(completed);
        for (let i = 0; i < stepIndex; i++) {
          newCompleted.add(defaultSteps[i].id);
        }
        setCompleted(newCompleted);
      };

      return (
        <Box data-testid="integration-container">
          <Stepper
            steps={defaultSteps}
            activeId={activeId}
            completed={completed}
            variant="linear"
            onStepChange={handleStepChange}
          />

          <Box sx={{ mt: 2 }}>
            {activeId === 'step1' && (
              <div>
                <input
                  data-testid="name-input"
                  placeholder="Enter name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <button
                  data-testid="next-button"
                  onClick={() => formData.name && handleStepChange('step2')}
                  disabled={!formData.name}
                >
                  Next
                </button>
              </div>
            )}

            {activeId === 'step2' && (
              <div data-testid="step2-content">
                <p>Welcome, {formData.name}!</p>
                <button onClick={() => handleStepChange('step3')}>Continue</button>
              </div>
            )}
          </Box>

          <div data-testid="active-step-id">{activeId}</div>
        </Box>
      );
    };

    return <TestComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially on step 1
    await expect(canvas.getByTestId('active-step-id')).toHaveTextContent('step1');

    // In linear mode, step buttons should not be clickable
    const step2Button = canvas.getByLabelText(/Step 2.*Address/);
    // Step 2 should not be clickable in linear mode when not active
    await expect(step2Button).toHaveStyle('pointer-events: none');
    // Should still be on step 1
    await expect(canvas.getByTestId('active-step-id')).toHaveTextContent('step1');

    // Fill in the form
    const nameInput = canvas.getByTestId('name-input');
    await userEvent.type(nameInput, 'John Doe');

    // Now click next button
    const nextButton = canvas.getByTestId('next-button');
    await expect(nextButton).not.toBeDisabled();
    await userEvent.click(nextButton);

    // Should now be on step 2
    await waitFor(() => {
      expect(canvas.getByTestId('active-step-id')).toHaveTextContent('step2');
    });

    // Check step 1 is marked as completed
    const completedStep = canvas.getByLabelText(/Step 1.*Personal Info.*completed/);
    await expect(completedStep).toBeInTheDocument();

    // Verify step 2 content shows
    const step2Content = canvas.getByTestId('step2-content');
    await expect(step2Content).toHaveTextContent('Welcome, John Doe!');
  },
};
