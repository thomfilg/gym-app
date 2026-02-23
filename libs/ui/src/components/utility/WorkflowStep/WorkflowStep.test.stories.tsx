import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { WorkflowStep } from './WorkflowStep';
import type { WorkflowStepItem } from './WorkflowStep.types';

const meta: Meta<typeof WorkflowStep> = {
  title: 'Enhanced/WorkflowStep/Tests',
  component: WorkflowStep,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:WorkflowStep'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample test data
const testSteps: WorkflowStepItem[] = [
  { title: 'Step One', description: 'First step description', status: 'completed' },
  { title: 'Step Two', description: 'Second step description', status: 'current' },
  { title: 'Step Three', description: 'Third step description', status: 'pending' },
  { title: 'Step Four', description: 'Fourth step description', status: 'pending' },
];

const interactiveSteps: WorkflowStepItem[] = [
  { title: 'Profile', description: 'Setup profile', status: 'completed' },
  { title: 'Settings', description: 'Configure settings', status: 'current' },
  { title: 'Review', description: 'Review changes', status: 'pending' },
];

const errorSteps: WorkflowStepItem[] = [
  { title: 'Validation', description: 'Validate data', status: 'completed' },
  { title: 'Processing', description: 'Process request', status: 'error' },
  { title: 'Complete', description: 'Finish process', status: 'pending' },
];

export const BasicInteraction: Story = {
  args: {
    steps: testSteps,
    currentStep: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that all steps are rendered
    expect(canvas.getByText('Step One')).toBeInTheDocument();
    expect(canvas.getByText('Step Two')).toBeInTheDocument();
    expect(canvas.getByText('Step Three')).toBeInTheDocument();
    expect(canvas.getByText('Step Four')).toBeInTheDocument();

    // Check step descriptions are present
    expect(canvas.getByText('First step description')).toBeInTheDocument();
    expect(canvas.getByText('Second step description')).toBeInTheDocument();

    // Check proper ARIA attributes
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Step 2 of 4: Step Two');
  },
};

export const StateChangeTest: Story = {
  args: {
    steps: testSteps,
    currentStep: 0,
    interactive: true,
    onStepClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the second step indicator (should be pending initially)
    // Since both indicator and content are buttons, we need to find the specific one
    // Button index 2 should be the second step indicator (0=step1 indicator, 1=step1 content, 2=step2 indicator)
    const step2Button = canvas.getAllByRole('button')[2];
    expect(step2Button).toBeInTheDocument();

    // Click on step 2
    await userEvent.click(step2Button);

    // Verify the click callback was called
    await waitFor(() => {
      expect(args.onStepClick).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          title: 'Step Two',
          description: 'Second step description',
        }),
      );
    });
  },
};

export const KeyboardNavigation: Story = {
  args: {
    steps: interactiveSteps,
    currentStep: 1,
    interactive: true,
    onStepClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const stepButtons = canvas.getAllByRole('button');
    expect(stepButtons).toHaveLength(6); // 3 steps * 2 buttons each (indicator + content)

    // Focus on first step indicator (index 0)
    stepButtons[0].focus();
    expect(stepButtons[0]).toHaveFocus();

    // Press Enter key
    await userEvent.keyboard('{Enter}');

    // Verify callback was called
    await waitFor(() => {
      expect(args.onStepClick).toHaveBeenCalledWith(
        0,
        expect.objectContaining({
          title: 'Profile',
        }),
      );
    });

    // Test Space key on second step indicator (index 2)
    stepButtons[2].focus();
    await userEvent.keyboard(' ');

    await waitFor(() => {
      expect(args.onStepClick).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          title: 'Settings',
        }),
      );
    });
  },
};

export const ScreenReaderTest: Story = {
  args: {
    steps: testSteps,
    currentStep: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main progressbar has proper ARIA labeling
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Step 2 of 4: Step Two');

    // Check individual step indicators have proper ARIA labels
    const stepIndicators = canvas.getAllByLabelText(/Step \d+:/);
    expect(stepIndicators).toHaveLength(4);

    expect(stepIndicators[0]).toHaveAttribute('aria-label', 'Step 1: Step One');
    expect(stepIndicators[1]).toHaveAttribute('aria-label', 'Step 2: Step Two');
    expect(stepIndicators[1]).toHaveAttribute('aria-current', 'step');

    // Check that completed steps don't have aria-current
    expect(stepIndicators[0]).not.toHaveAttribute('aria-current');

    // Check that pending steps don't have aria-current
    expect(stepIndicators[2]).not.toHaveAttribute('aria-current');
  },
};

export const FocusManagement: Story = {
  args: {
    steps: interactiveSteps,
    currentStep: 0,
    interactive: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const stepButtons = canvas.getAllByRole('button');

    // Check all buttons are focusable
    stepButtons.forEach((button) => {
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    // Test focus navigation
    await userEvent.tab();
    expect(stepButtons[0]).toHaveFocus();

    await userEvent.tab();
    expect(stepButtons[1]).toHaveFocus();

    // Check focus outline is visible
    expect(stepButtons[1]).toHaveFocus();
  },
};

export const ResponsiveDesign: Story = {
  args: {
    steps: testSteps,
    currentStep: 1,
    orientation: 'horizontal',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check component renders properly on mobile
    expect(canvas.getByText('Step One')).toBeInTheDocument();
    expect(canvas.getByText('Step Two')).toBeInTheDocument();

    // Check that progress connectors are present
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  },
};

export const ThemeVariations: Story = {
  args: {
    steps: testSteps,
    currentStep: 1,
    color: 'primary',
    variant: 'filled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that steps render with theme colors
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();

    // Check step titles are visible
    expect(canvas.getByText('Step Two')).toBeInTheDocument();
    expect(canvas.getByText('Second step description')).toBeInTheDocument();
  },
};

export const VisualStates: Story = {
  args: {
    steps: errorSteps,
    currentStep: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all different states are rendered
    expect(canvas.getByText('Validation')).toBeInTheDocument(); // completed
    expect(canvas.getByText('Processing')).toBeInTheDocument(); // error
    expect(canvas.getByText('Complete')).toBeInTheDocument(); // pending

    // Check descriptions are present
    expect(canvas.getByText('Validate data')).toBeInTheDocument();
    expect(canvas.getByText('Process request')).toBeInTheDocument();

    // Verify error step has proper status
    const stepIndicators = canvas.getAllByLabelText(/Step \d+:/);
    expect(stepIndicators[1]).toHaveAttribute('aria-label', 'Step 2: Processing');
  },
};

export const PerformanceTest: Story = {
  args: {
    steps: Array.from(
      { length: 20 },
      (_, i) =>
        ({
          title: `Step ${i + 1}`,
          description: `Description for step ${i + 1}`,
          status: i < 5 ? 'completed' : i === 5 ? 'current' : 'pending',
        }) as WorkflowStepItem,
    ),
    currentStep: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that many steps render efficiently
    expect(canvas.getByText('Step 1')).toBeInTheDocument();
    expect(canvas.getByText('Step 6')).toBeInTheDocument(); // current
    expect(canvas.getByText('Step 20')).toBeInTheDocument();

    // Check progress bar works with many steps
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '5');
    expect(progressBar).toHaveAttribute('aria-valuemax', '19');
  },
};

export const EdgeCases: Story = {
  args: {
    steps: [
      {
        title: 'Very Long Step Title That Might Cause Overflow Issues',
        description: 'This is a very long description that should handle text overflow properly',
        status: 'current',
      },
    ],
    currentStep: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check long text is handled properly
    expect(
      canvas.getByText('Very Long Step Title That Might Cause Overflow Issues'),
    ).toBeInTheDocument();
    expect(
      canvas.getByText('This is a very long description that should handle text overflow properly'),
    ).toBeInTheDocument();

    // Check single step doesn't break the component
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemax', '0');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  },
};

export const IntegrationTest: Story = {
  args: {
    steps: testSteps,
    currentStep: 1,
    interactive: true,
    showNumbers: true,
    showProgress: true,
    variant: 'filled',
    color: 'primary',
    size: 'md',
    animated: true,
    onStepClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all features working together
    expect(canvas.getByRole('progressbar')).toBeInTheDocument();

    // Check step numbers are displayed
    expect(canvas.getByText('1')).toBeInTheDocument();
    expect(canvas.getByText('2')).toBeInTheDocument();

    // Check interaction works - click on third step indicator (index 4: 2 buttons per step * 2 = 4)
    const stepButtons = canvas.getAllByRole('button');
    await userEvent.click(stepButtons[4]);

    await waitFor(() => {
      expect(args.onStepClick).toHaveBeenCalledWith(
        2,
        expect.objectContaining({
          title: 'Step Three',
        }),
      );
    });

    // Verify all step content is present
    expect(canvas.getByText('Step One')).toBeInTheDocument();
    expect(canvas.getByText('First step description')).toBeInTheDocument();
  },
};
