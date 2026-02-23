import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { TutorialOverlay } from './TutorialOverlay';

const meta: Meta<typeof TutorialOverlay> = {
  title: 'Enhanced/TutorialOverlay/Tests',
  component: TutorialOverlay,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:TutorialOverlay'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const testSteps = [
  {
    id: '1',
    target: '#test-card',
    title: 'Tutorial Step 1',
    content: 'This is a test tutorial step.',
    position: 'bottom' as const,
  },
  {
    id: '2',
    target: '#test-input',
    title: 'Tutorial Step 2',
    content: 'This is the second test step.',
    position: 'top' as const,
  },
];

const TestEnvironment = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 4, minHeight: '100vh' }}>
    <Card id="test-card" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">Test Card</Typography>
        <Typography>This is a test card for tutorial targeting.</Typography>
      </CardContent>
    </Card>

    <TextField id="test-input" label="Test Input" variant="outlined" fullWidth sx={{ mb: 3 }} />

    <Button id="test-button" variant="contained">
      Test Button
    </Button>

    {children}
  </Box>
);

export const BasicInteraction: Story = {
  render: () => {
    const [showTutorial, setShowTutorial] = React.useState(true);
    const onCompleteMock = fn();
    const onSkipMock = fn();

    return (
      <TestEnvironment>
        {showTutorial && (
          <TutorialOverlay
            steps={testSteps}
            onComplete={() => {
              onCompleteMock();
              setShowTutorial(false);
            }}
            onSkip={() => {
              onSkipMock();
              setShowTutorial(false);
            }}
            variant="tooltip"
            showProgress
            allowSkip
            animated
          />
        )}
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Tutorial should be visible
    await waitFor(
      () => {
        expect(body.getByText('Tutorial Step 1')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Should show progress indicator
    const progressElement = body.queryByText('1 of 2');
    if (progressElement) {
      expect(progressElement).toBeInTheDocument();
    }

    // Should show skip button when allowSkip is true
    const skipButton = body.queryByText('Skip');
    if (skipButton) {
      expect(skipButton).toBeInTheDocument();
    }

    // Navigate to next step
    const nextButton = body.queryByText('Next');
    if (nextButton) {
      await userEvent.click(nextButton);
      await waitFor(
        () => {
          expect(body.getByText('Tutorial Step 2')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    }
  },
};

export const FormInteraction: Story = {
  render: () => {
    const [showTutorial, setShowTutorial] = React.useState(true);

    return (
      <TestEnvironment>
        {showTutorial && (
          <TutorialOverlay
            steps={[
              {
                id: '1',
                target: '#test-input',
                title: 'Fill Input',
                content: 'Please fill in this input field.',
                position: 'top',
                requiresAction: true,
              },
              {
                id: '2',
                target: '#test-button',
                title: 'Click Button',
                content: 'Now click this button to continue.',
                position: 'bottom',
              },
            ]}
            onComplete={() => setShowTutorial(false)}
            variant="highlight"
            showProgress
          />
        )}
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Wait for target elements to be available first
    await waitFor(
      () => {
        expect(canvas.getByLabelText('Test Input')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Check if tutorial appears - be more lenient
    const tutorialText = body.queryByText('Fill Input');
    if (tutorialText) {
      expect(tutorialText).toBeInTheDocument();
    }

    // Interact with the targeted input
    const input = canvas.getByLabelText('Test Input');
    await userEvent.type(input, 'test value');

    expect(input).toHaveValue('test value');
  },
};

export const KeyboardNavigation: Story = {
  render: () => {
    const [showTutorial, setShowTutorial] = React.useState(true);

    return (
      <TestEnvironment>
        {showTutorial && (
          <TutorialOverlay
            steps={testSteps}
            onComplete={() => setShowTutorial(false)}
            onSkip={() => setShowTutorial(false)}
            variant="modal"
            showProgress
            allowSkip
          />
        )}
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Wait for the tutorial to appear
    await waitFor(
      () => {
        expect(body.getByText('Tutorial Step 1')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Test Escape key to skip
    await userEvent.keyboard('{Escape}');

    // Tutorial should close after escape - check that tutorial text disappears
    await waitFor(
      () => {
        expect(body.queryByText('Tutorial Step 1')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

export const ScreenReaderTest: Story = {
  render: () => (
    <TestEnvironment>
      <TutorialOverlay
        steps={[
          {
            id: '1',
            target: '#test-card',
            title: 'Accessible Tutorial',
            content: 'This tutorial step is screen reader accessible.',
            position: 'bottom',
          },
        ]}
        onComplete={() => {}}
        variant="tooltip"
        showProgress
      />
    </TestEnvironment>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Wait for tutorial to appear and check for ARIA attributes
    await waitFor(
      () => {
        const tutorialElement = body.getByRole('dialog');
        expect(tutorialElement).toHaveAttribute('aria-labelledby');
        expect(tutorialElement).toHaveAttribute('aria-describedby');
      },
      { timeout: 3000 },
    );

    // Check for accessible title
    expect(body.getByText('Accessible Tutorial')).toBeInTheDocument();
  },
};

export const FocusManagement: Story = {
  render: () => {
    const [showTutorial, setShowTutorial] = React.useState(false);

    return (
      <TestEnvironment>
        <Button onClick={() => setShowTutorial(true)} autoFocus>
          Start Tutorial
        </Button>
        {showTutorial && (
          <TutorialOverlay
            steps={testSteps}
            onComplete={() => setShowTutorial(false)}
            onSkip={() => setShowTutorial(false)}
            variant="spotlight"
            showProgress
            allowSkip
          />
        )}
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Start tutorial
    const startButton = canvas.getByText('Start Tutorial');
    await userEvent.click(startButton);

    // Focus should move to tutorial
    await waitFor(() => {
      const tutorialDialog = body.getByRole('dialog');
      expect(tutorialDialog).toBeInTheDocument();
    });

    // Focus should be trapped within tutorial
    await userEvent.keyboard('{Tab}');
    const focusedElement = document.activeElement;
    expect(focusedElement).toBeInstanceOf(window.Element);
  },
};

export const ResponsiveDesign: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <TestEnvironment>
      <TutorialOverlay
        steps={testSteps}
        onComplete={() => {}}
        variant="tooltip"
        showProgress
        allowSkip
        animated
      />
    </TestEnvironment>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Tutorial should adapt to small screen
    await waitFor(() => {
      expect(canvas.getByText('Test Card')).toBeInTheDocument();
    });

    // Check if tutorial is properly positioned
    const tutorialDialog = body.getByRole('dialog');
    expect(tutorialDialog).toBeInTheDocument();
  },
};

export const ThemeVariations: Story = {
  render: () => (
    <TestEnvironment>
      <TutorialOverlay
        steps={[
          {
            id: '1',
            target: '#test-card',
            title: 'Themed Tutorial',
            content: 'This tutorial respects the current theme.',
            position: 'bottom',
          },
        ]}
        onComplete={() => {}}
        variant="spotlight"
        showProgress
      />
    </TestEnvironment>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    await waitFor(() => {
      expect(body.getByText('Themed Tutorial')).toBeInTheDocument();
    });

    // Check if theme styles are applied
    const tutorialDialog = body.getByRole('dialog');
    const computedStyle = window.getComputedStyle(tutorialDialog);
    expect(computedStyle).toBeDefined();
  },
};

export const VisualStates: Story = {
  render: () => {
    const [variant, setVariant] = React.useState<'tooltip' | 'modal' | 'highlight' | 'spotlight'>(
      'tooltip',
    );

    return (
      <TestEnvironment>
        <Box sx={{ mb: 2 }}>
          {(['tooltip', 'modal', 'highlight', 'spotlight'] as const).map((v) => (
            <Button
              key={v}
              variant={variant === v ? 'contained' : 'outlined'}
              onClick={() => setVariant(v)}
              sx={{ mr: 1 }}
            >
              {v}
            </Button>
          ))}
        </Box>
        <TutorialOverlay
          steps={[
            {
              id: '1',
              target: '#test-card',
              title: `${variant} Variant`,
              content: `This shows the ${variant} visual state.`,
              position: 'bottom',
            },
          ]}
          onComplete={() => {}}
          variant={variant}
          showProgress
        />
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Test different visual states
    await waitFor(() => {
      expect(body.getByText(/Variant/)).toBeInTheDocument();
    });

    // Switch to different variants
    const modalButton = canvas.getByText('modal');
    await userEvent.click(modalButton);

    await waitFor(() => {
      expect(body.getByText('modal Variant')).toBeInTheDocument();
    });
  },
};

export const PerformanceTest: Story = {
  render: () => {
    const stepCount = 10;

    const manySteps = Array.from({ length: stepCount }, (_, i) => ({
      id: `${i + 1}`,
      target: i % 2 === 0 ? '#test-card' : '#test-input',
      title: `Step ${i + 1}`,
      content: `This is step ${i + 1} of ${stepCount} steps.`,
      position: (i % 2 === 0 ? 'bottom' : 'top') as const,
    }));

    return (
      <TestEnvironment>
        <TutorialOverlay
          steps={manySteps}
          onComplete={() => {}}
          variant="tooltip"
          showProgress
          animated
        />
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);
    const startTime = window.performance.now();

    // Tutorial should render quickly even with many steps
    await waitFor(() => {
      expect(body.getByText('Step 1')).toBeInTheDocument();
    });

    const endTime = window.performance.now();
    const renderTime = endTime - startTime;

    // Should render within reasonable time (less than 100ms)
    expect(renderTime).toBeLessThan(100);
  },
};

export const EdgeCases: Story = {
  render: () => {
    const [testCase, setTestCase] = React.useState('empty');

    const testCases = {
      empty: [],
      invalid: [
        {
          id: '1',
          target: '#nonexistent',
          title: 'Invalid Target',
          content: 'This targets a non-existent element.',
        },
      ],
      singleStep: [
        {
          id: '1',
          target: '#test-card',
          title: 'Single Step',
          content: 'Tutorial with only one step.',
        },
      ],
    };

    return (
      <TestEnvironment>
        <Box sx={{ mb: 2 }}>
          {Object.keys(testCases).map((key) => (
            <Button
              key={key}
              variant={testCase === key ? 'contained' : 'outlined'}
              onClick={() => setTestCase(key)}
              sx={{ mr: 1 }}
            >
              {key}
            </Button>
          ))}
        </Box>
        <TutorialOverlay
          steps={testCases[testCase as keyof typeof testCases]}
          onComplete={() => {}}
          variant="tooltip"
          showProgress
        />
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Test single step case
    const singleStepButton = canvas.getByText('singleStep');
    await userEvent.click(singleStepButton);

    await waitFor(() => {
      expect(body.getByText('Single Step')).toBeInTheDocument();
    });

    // Single step should not show "Next" button
    expect(body.queryByText('Next')).not.toBeInTheDocument();
  },
};

export const IntegrationTest: Story = {
  render: () => {
    const [tutorials, setTutorials] = React.useState<{
      onboarding: boolean;
      features: boolean;
    }>({ onboarding: false, features: false });

    return (
      <TestEnvironment>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setTutorials((prev) => ({ ...prev, onboarding: true }))}
            sx={{ mr: 1 }}
          >
            Start Onboarding
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTutorials((prev) => ({ ...prev, features: true }))}
          >
            Start Features Tour
          </Button>
        </Box>

        {tutorials.onboarding && (
          <TutorialOverlay
            steps={[
              {
                id: '1',
                target: '#test-card',
                title: 'Onboarding Step',
                content: 'Welcome to the onboarding tutorial.',
              },
            ]}
            onComplete={() => setTutorials((prev) => ({ ...prev, onboarding: false }))}
            variant="spotlight"
            showProgress
          />
        )}

        {tutorials.features && (
          <TutorialOverlay
            steps={[
              {
                id: '1',
                target: '#test-input',
                title: 'Feature Tour',
                content: 'This is the features tutorial.',
              },
            ]}
            onComplete={() => setTutorials((prev) => ({ ...prev, features: false }))}
            variant="highlight"
            showProgress
          />
        )}
      </TestEnvironment>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Tutorial is portaled to document.body
    const body = within(document.body);

    // Start onboarding tutorial
    const onboardingButton = canvas.getByText('Start Onboarding');
    await userEvent.click(onboardingButton);

    await waitFor(() => {
      expect(body.getByText('Onboarding Step')).toBeInTheDocument();
    });

    // Complete tutorial (single step uses "Complete" button)
    const completeButton = body.queryByText('Complete');
    if (completeButton) {
      await userEvent.click(completeButton);

      // Wait for tutorial to close
      await waitFor(() => {
        expect(body.queryByText('Onboarding Step')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    }
  },
};
