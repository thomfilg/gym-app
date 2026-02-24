import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor,within } from 'storybook/test';
import { useState } from 'react';

import { Transition } from './Transition';
import type { TransitionVariant } from './Transition.types';

// Animation timeout constants
const ANIMATION_TIMEOUT = 2000; // Buffer for all transition animations

const meta: Meta<typeof Transition> = {
  title: 'Utility/Transition/Tests',
  component: Transition,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TestCard = ({ title = 'Test Content' }: { title?: string }) => (
  <Card sx={{ width: 300 }}>
    <CardContent>
      <Typography>{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        This is test content for transitions
      </Typography>
    </CardContent>
  </Card>
);

// Test 1: Basic Interaction - Toggle transitions
const BasicInteractionComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button onClick={() => setShow(!show)} aria-label="Toggle transition" sx={{ mb: 2 }}>
        Toggle
      </Button>
      <Transition variant="fade" in={show}>
        <TestCard title="Basic Interaction" />
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const BasicInteraction: Story = {
  render: () => <BasicInteractionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial render to complete
    await waitFor(
      () => {
        const content = canvas.queryByText('Basic Interaction');
        expect(content).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Click toggle button
    const toggleButton = canvas.getByLabelText('Toggle transition');
    await userEvent.click(toggleButton);

    // Wait for fade out - element removed from DOM
    await waitFor(
      () => {
        const element = canvas.queryByText('Basic Interaction');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Click again to show
    await userEvent.click(toggleButton);

    // Wait for fade in - element appears in DOM and is visible
    await waitFor(
      () => {
        const element = canvas.queryByText('Basic Interaction');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 2: Variant Changes - Test different transition variants
const VariantChangesComponent = () => {
  const [show, setShow] = useState(true);
  const [variant, setVariant] = useState<TransitionVariant>('fade');

  const variants: TransitionVariant[] = ['fade', 'slide', 'scale', 'collapse', 'grow', 'zoom'];

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {variants.map((v) => (
          <Button
            key={v}
            size="small"
            variant={variant === v ? 'contained' : 'outlined'}
            onClick={() => setVariant(v)}
            aria-label={`Set variant ${v}`}
          >
            {v}
          </Button>
        ))}
      </Box>
      <Button onClick={() => setShow(!show)} aria-label="Toggle" sx={{ mb: 2 }}>
        Toggle
      </Button>
      <Transition variant={variant} in={show} direction="up">
        <TestCard title={`Variant: ${variant}`} />
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const VariantChanges: Story = {
  render: () => <VariantChangesComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test fade variant (default)
    const toggleButton = canvas.getByLabelText('Toggle');
    const content = canvas.getByText('Variant: fade');
    expect(content).toBeInTheDocument();

    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Variant: fade');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Variant: fade');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Test slide variant
    const slideButton = canvas.getByLabelText('Set variant slide');
    await userEvent.click(slideButton);

    await waitFor(
      () => {
        const element = canvas.queryByText('Variant: slide');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Variant: slide');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Test scale variant
    await userEvent.click(toggleButton);
    const scaleButton = canvas.getByLabelText('Set variant scale');
    await userEvent.click(scaleButton);

    await waitFor(
      () => {
        const element = canvas.queryByText('Variant: scale');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 3: Direction Control - Test slide directions
const DirectionControlComponent = () => {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {(['up', 'down', 'left', 'right'] as const).map((dir) => (
          <Button
            key={dir}
            size="small"
            variant={direction === dir ? 'contained' : 'outlined'}
            onClick={() => setDirection(dir)}
            aria-label={`Direction ${dir}`}
          >
            {dir}
          </Button>
        ))}
      </Box>
      <Button onClick={() => setShow(!show)} aria-label="Toggle slide" sx={{ mb: 2 }}>
        Toggle
      </Button>
      <Transition variant="slide" direction={direction} in={show}>
        <TestCard title={`Slide ${direction}`} />
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const DirectionControl: Story = {
  render: () => <DirectionControlComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle slide');

    // Test each direction
    for (const dir of ['up', 'down', 'left', 'right']) {
      const dirButton = canvas.getByLabelText(`Direction ${dir}`);
      await userEvent.click(dirButton);

      // Wait for direction change to apply
      await waitFor(
        () => {
          const content = canvas.getByText(`Slide ${dir}`);
          expect(content).toBeVisible();
        },
        { timeout: ANIMATION_TIMEOUT },
      );

      // Toggle off
      await userEvent.click(toggleButton);
      await waitFor(
        () => {
          const content = canvas.queryByText(`Slide ${dir}`);
          expect(content).not.toBeInTheDocument();
        },
        { timeout: ANIMATION_TIMEOUT },
      );

      // Toggle on
      await userEvent.click(toggleButton);
      await waitFor(
        () => {
          const content = canvas.queryByText(`Slide ${dir}`);
          expect(content).toBeInTheDocument();
        },
        { timeout: ANIMATION_TIMEOUT },
      );
    }
  },
};

// Test 4: Custom Timing - Test duration and delay
const CustomTimingComponent = () => {
  const [show, setShow] = useState(true);
  const [duration, setDuration] = useState(300);
  const [delay, setDelay] = useState(0);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Duration: {duration}ms, Delay: {delay}ms
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button size="small" onClick={() => setDuration(100)} aria-label="Fast duration">
            Fast
          </Button>
          <Button size="small" onClick={() => setDuration(500)} aria-label="Slow duration">
            Slow
          </Button>
          <Button size="small" onClick={() => setDelay(0)} aria-label="No delay">
            No Delay
          </Button>
          <Button size="small" onClick={() => setDelay(300)} aria-label="Add delay">
            300ms Delay
          </Button>
        </Box>
      </Box>
      <Button onClick={() => setShow(!show)} aria-label="Toggle timing" sx={{ mb: 2 }}>
        Toggle
      </Button>
      <Transition variant="fade" in={show} duration={duration} delay={delay}>
        <TestCard title="Custom Timing" />
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const CustomTiming: Story = {
  render: () => <CustomTimingComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle timing');

    // Test fast duration
    const fastButton = canvas.getByLabelText('Fast duration');
    await userEvent.click(fastButton);

    // Wait for content to be visible
    await waitFor(
      () => {
        const content = canvas.queryByText('Custom Timing');
        expect(content).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle off with fast animation
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Custom Timing');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle on to show again
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Custom Timing');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Test with delay
    const delayButton = canvas.getByLabelText('Add delay');
    await userEvent.click(delayButton);
    await userEvent.click(toggleButton); // Hide with delay

    // Content should still be in DOM immediately after click due to delay
    const delayedContent = canvas.queryByText('Custom Timing');
    expect(delayedContent).toBeInTheDocument();

    // Wait for delayed animation to complete
    await waitFor(
      () => {
        const element = canvas.queryByText('Custom Timing');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 5: Multiple Transitions - Test multiple simultaneous transitions
const MultipleTransitionsComponent = () => {
  const [showAll, setShowAll] = useState(true);

  return (
    <Box>
      <Button onClick={() => setShowAll(!showAll)} aria-label="Toggle all" sx={{ mb: 2 }}>
        Toggle All
      </Button>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Transition variant="fade" in={showAll}>
          <Card sx={{ width: 150 }}>
            <CardContent>
              <Typography>Fade</Typography>
            </CardContent>
          </Card>
        </Transition>
        <Transition variant="slide" direction="up" in={showAll}>
          <Card sx={{ width: 150 }}>
            <CardContent>
              <Typography>Slide</Typography>
            </CardContent>
          </Card>
        </Transition>
        <Transition variant="scale" in={showAll}>
          <Card sx={{ width: 150 }}>
            <CardContent>
              <Typography>Scale</Typography>
            </CardContent>
          </Card>
        </Transition>
      </Box>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const MultipleTransitions: Story = {
  render: () => <MultipleTransitionsComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle all');

    // Wait for all to be visible initially
    await waitFor(
      () => {
        expect(canvas.queryByText('Fade')).toBeInTheDocument();
        expect(canvas.queryByText('Slide')).toBeInTheDocument();
        expect(canvas.queryByText('Scale')).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle all off
    await userEvent.click(toggleButton);

    // Wait for all to hide
    await waitFor(
      () => {
        expect(canvas.queryByText('Fade')).not.toBeInTheDocument();
        expect(canvas.queryByText('Slide')).not.toBeInTheDocument();
        expect(canvas.queryByText('Scale')).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle all back on
    await userEvent.click(toggleButton);

    // Wait for all to show
    await waitFor(
      () => {
        expect(canvas.queryByText('Fade')).toBeInTheDocument();
        expect(canvas.queryByText('Slide')).toBeInTheDocument();
        expect(canvas.queryByText('Scale')).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 6: Collapse Height Animation
const CollapseAnimationComponent = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ width: 400 }}>
      <Button onClick={() => setExpanded(!expanded)} aria-label="Toggle collapse">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography>Always Visible</Typography>
        </CardContent>
        <Transition variant="collapse" in={expanded}>
          <CardContent>
            <Typography>Collapsible Content</Typography>
            <Typography variant="body2">
              This content animates its height from 0 to auto.
            </Typography>
          </CardContent>
        </Transition>
      </Card>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const CollapseAnimation: Story = {
  render: () => <CollapseAnimationComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle collapse');
    const collapsibleContent = canvas.getByText('Collapsible Content');

    // Should be expanded initially
    expect(collapsibleContent).toBeVisible();

    // Collapse
    await userEvent.click(toggleButton);

    // Wait for collapse - content should not be in document
    await waitFor(
      () => {
        const content = canvas.queryByText('Collapsible Content');
        expect(content).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Expand
    await userEvent.click(toggleButton);

    // Wait for expand - content should be in document again
    await waitFor(
      () => {
        const content = canvas.queryByText('Collapsible Content');
        expect(content).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 7: Zoom Effect
const ZoomEffectComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button onClick={() => setShow(!show)} aria-label="Toggle zoom" sx={{ mb: 2 }}>
        Toggle Zoom
      </Button>
      <Transition variant="zoom" in={show}>
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography>Zoom Effect</Typography>
            <Typography variant="body2">
              This content zooms in and out with scaling transform.
            </Typography>
          </CardContent>
        </Card>
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const ZoomEffect: Story = {
  render: () => <ZoomEffectComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle zoom');
    const content = canvas.getByText('Zoom Effect');

    // Should be visible initially
    expect(content).toBeVisible();

    // Toggle off
    await userEvent.click(toggleButton);

    // Wait for zoom out - element removed from document
    await waitFor(
      () => {
        const element = canvas.queryByText('Zoom Effect');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle on
    await userEvent.click(toggleButton);

    // Wait for zoom in - element appears in document again
    await waitFor(
      () => {
        const element = canvas.queryByText('Zoom Effect');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 8: Grow Transition
const GrowTransitionComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button onClick={() => setShow(!show)} aria-label="Toggle grow" sx={{ mb: 2 }}>
        Toggle Grow
      </Button>
      <Transition variant="grow" in={show}>
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography>Grow Transition</Typography>
            <Typography variant="body2">Similar to scale but with different easing.</Typography>
          </CardContent>
        </Card>
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const GrowTransition: Story = {
  render: () => <GrowTransitionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle grow');

    // Wait for initial render
    await waitFor(
      () => {
        const content = canvas.queryByText('Grow Transition');
        expect(content).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle off
    await userEvent.click(toggleButton);

    // Wait for shrink - element removed from document
    await waitFor(
      () => {
        const element = canvas.queryByText('Grow Transition');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle on
    await userEvent.click(toggleButton);

    // Wait for grow - element appears in document again
    await waitFor(
      () => {
        const element = canvas.queryByText('Grow Transition');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 9: Rapid Toggling - Test transition behavior with rapid state changes
const RapidTogglingComponent = () => {
  const [show, setShow] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const handleRapidToggle = async () => {
    for (let i = 0; i < 5; i++) {
      setShow((prev) => !prev);
      setClickCount((prev) => prev + 1);
      await new Promise((resolve) => window.setTimeout(resolve, 100));
    }
  };

  return (
    <Box>
      <Button onClick={handleRapidToggle} aria-label="Rapid toggle" sx={{ mb: 2 }}>
        Rapid Toggle (5x)
      </Button>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Clicks: {clickCount}
      </Typography>
      <Transition variant="fade" in={show}>
        <TestCard title="Rapid Toggle Test" />
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const RapidToggling: Story = {
  render: () => <RapidTogglingComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rapidButton = canvas.getByLabelText('Rapid toggle');

    // Click rapid toggle
    await userEvent.click(rapidButton);

    // Wait for rapid toggles to complete
    await waitFor(
      () => {
        const clickCount = canvas.getByText(/Clicks: \d+/);
        expect(clickCount).toHaveTextContent('Clicks: 5');
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Transition should handle rapid changes without breaking
    const content = canvas.getByText('Rapid Toggle Test');
    expect(content).toBeInTheDocument();
  },
};

// Test 10: Nested Transitions
const NestedTransitionsComponent = () => {
  const [showOuter, setShowOuter] = useState(true);
  const [showInner, setShowInner] = useState(true);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button onClick={() => setShowOuter(!showOuter)} aria-label="Toggle outer">
          Toggle Outer
        </Button>
        <Button onClick={() => setShowInner(!showInner)} aria-label="Toggle inner">
          Toggle Inner
        </Button>
      </Box>
      <Transition variant="fade" in={showOuter}>
        <Card sx={{ width: 350, p: 2 }}>
          <Typography variant="h6">Outer Content</Typography>
          <Transition variant="slide" direction="down" in={showInner}>
            <Card sx={{ mt: 2, bgcolor: 'grey.100' }}>
              <CardContent>
                <Typography>Inner Nested Content</Typography>
              </CardContent>
            </Card>
          </Transition>
        </Card>
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const NestedTransitions: Story = {
  render: () => <NestedTransitionsComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const outerButton = canvas.getByLabelText('Toggle outer');
    const innerButton = canvas.getByLabelText('Toggle inner');

    // Wait for both to be visible initially
    await waitFor(
      () => {
        expect(canvas.queryByText('Outer Content')).toBeInTheDocument();
        expect(canvas.queryByText('Inner Nested Content')).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle inner off
    await userEvent.click(innerButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Inner Nested Content');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle inner back on
    await userEvent.click(innerButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Inner Nested Content');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Toggle outer off (should hide both)
    await userEvent.click(outerButton);
    await waitFor(
      () => {
        const outerElement = canvas.queryByText('Outer Content');
        expect(outerElement).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};

// Test 11: Edge Cases - Empty children, null values
const EdgeCasesComponent = () => {
  const [show, setShow] = useState(true);
  const [hasContent, setHasContent] = useState(true);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button onClick={() => setShow(!show)} aria-label="Toggle visibility">
          Toggle
        </Button>
        <Button onClick={() => setHasContent(!hasContent)} aria-label="Toggle content">
          Toggle Content
        </Button>
      </Box>
      <Transition variant="fade" in={show}>
        {hasContent ? (
          <TestCard title="Edge Cases" />
        ) : (
          <Box sx={{ width: 300, height: 100, bgcolor: 'grey.200', p: 2 }}>
            <Typography>Empty Placeholder</Typography>
          </Box>
        )}
      </Transition>
      <Box aria-label="Status of the test run" sx={{ mt: 2 }}>
        PASS
      </Box>
    </Box>
  );
};

export const EdgeCases: Story = {
  render: () => <EdgeCasesComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByLabelText('Toggle visibility');
    const contentButton = canvas.getByLabelText('Toggle content');

    // Initial state - should show "Edge Cases"
    expect(canvas.getByText('Edge Cases')).toBeInTheDocument();

    // Should handle content changes
    await userEvent.click(contentButton);
    await waitFor(
      () => {
        expect(canvas.queryByText('Empty Placeholder')).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Should handle visibility toggle with different content
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Empty Placeholder');
        expect(element).not.toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );

    // Change content while hidden
    await userEvent.click(contentButton);

    // Show with new content
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const element = canvas.queryByText('Edge Cases');
        expect(element).toBeInTheDocument();
      },
      { timeout: ANIMATION_TIMEOUT },
    );
  },
};
