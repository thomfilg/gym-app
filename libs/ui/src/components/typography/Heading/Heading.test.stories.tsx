import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import React from 'react';

import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading/Tests',
  component: Heading,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
    docs: {
      description: {
        component:
          'Comprehensive test stories for the Heading component covering interaction, accessibility, visual states, performance, and edge cases.',
      },
    },
  },
  tags: ['autodocs', 'test', 'component:Heading'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Test Component
const BasicInteractionComponent = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const handleClick = () => setClickCount((prev) => prev + 1);

  return (
    <Stack spacing={2} data-testid="basic-interaction-container">
      <Heading level="h1" onClick={handleClick} data-testid="clickable-heading">
        Click me! (Clicked: {clickCount})
      </Heading>
      <Heading level="h2" color="primary">
        Static Heading
      </Heading>
      <div data-testid="click-count">{clickCount}</div>
    </Stack>
  );
};

// Keyboard Navigation Test Component
const KeyboardNavigationComponent = () => {
  const [focusedId, setFocusedId] = React.useState<string>('');

  return (
    <Stack spacing={2} data-testid="keyboard-container">
      <div data-testid="focused-element">Focused: {focusedId}</div>
      <Heading
        level="h1"
        tabIndex={0}
        onFocus={() => setFocusedId('h1')}
        onBlur={() => setFocusedId('')}
        data-testid="heading-h1"
      >
        Focusable H1 Heading
      </Heading>
      <Heading
        level="h2"
        tabIndex={0}
        onFocus={() => setFocusedId('h2')}
        onBlur={() => setFocusedId('')}
        data-testid="heading-h2"
      >
        Focusable H2 Heading
      </Heading>
      <Heading
        level="h3"
        tabIndex={0}
        onFocus={() => setFocusedId('h3')}
        onBlur={() => setFocusedId('')}
        data-testid="heading-h3"
      >
        Focusable H3 Heading
      </Heading>
    </Stack>
  );
};

// Focus Management Test Component
const FocusManagementComponent = () => {
  const [activeHeading, setActiveHeading] = React.useState<string>('');
  const headingRefs = {
    h1: React.useRef<globalThis.HTMLHeadingElement>(null),
    h2: React.useRef<globalThis.HTMLHeadingElement>(null),
    h3: React.useRef<globalThis.HTMLHeadingElement>(null),
  };

  const focusHeading = (level: string) => {
    const ref = headingRefs[level as keyof typeof headingRefs];
    if (ref.current) {
      ref.current.focus();
      setActiveHeading(level);
    }
  };

  return (
    <Stack spacing={2} data-testid="focus-management-container">
      <Box>
        <button onClick={() => focusHeading('h1')} data-testid="focus-h1-btn">
          Focus H1
        </button>
        <button onClick={() => focusHeading('h2')} data-testid="focus-h2-btn">
          Focus H2
        </button>
        <button onClick={() => focusHeading('h3')} data-testid="focus-h3-btn">
          Focus H3
        </button>
      </Box>
      <div data-testid="active-heading">Active: {activeHeading}</div>

      <Heading
        level="h1"
        ref={headingRefs.h1}
        tabIndex={-1}
        onFocus={() => setActiveHeading('h1')}
        data-testid="managed-h1"
      >
        Programmatically Focusable H1
      </Heading>

      <Heading
        level="h2"
        ref={headingRefs.h2}
        tabIndex={-1}
        onFocus={() => setActiveHeading('h2')}
        data-testid="managed-h2"
      >
        Programmatically Focusable H2
      </Heading>

      <Heading
        level="h3"
        ref={headingRefs.h3}
        tabIndex={-1}
        onFocus={() => setActiveHeading('h3')}
        data-testid="managed-h3"
      >
        Programmatically Focusable H3
      </Heading>
    </Stack>
  );
};

// Performance Test Component
const PerformanceTestComponent = () => {
  const startTime = React.useRef(globalThis.performance.now());
  const [renderTime, setRenderTime] = React.useState<number>(0);

  React.useEffect(() => {
    setRenderTime(globalThis.performance.now() - startTime.current);
  }, []);

  return (
    <Stack spacing={1} data-testid="performance-container">
      <div data-testid="render-time">Render time: {renderTime.toFixed(2)}ms</div>
      {Array.from({ length: 50 }, (_, index) => (
        <Heading
          key={index}
          level={(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)[index % 6]}
          color={
            (['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'] as const)[
              index % 6
            ]
          }
          weight={(['light', 'normal', 'medium', 'semibold', 'bold'] as const)[index % 5]}
          data-testid={`perf-heading-${index}`}
        >
          Performance Test Heading {index + 1}
        </Heading>
      ))}
    </Stack>
  );
};

// Integration Test Component
const IntegrationTestComponent = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <Stack spacing={3} data-testid="integration-container">
      <Heading level="h1" data-testid="page-title">
        Integration Testing Page
      </Heading>

      <Paper sx={{ p: 3 }}>
        <Heading level="h2" color="primary" data-testid="section-title">
          Content Section
        </Heading>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(index)}
              style={{
                padding: '8px 16px',
                marginRight: '8px',
                backgroundColor: selectedTab === index ? '#1976d2' : 'transparent',
                color: selectedTab === index ? 'white' : 'inherit',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              data-testid={`tab-${index}`}
            >
              {tab}
            </button>
          ))}
        </Box>

        <Box data-testid="tab-content">
          <Heading level="h3" data-testid="tab-heading">
            {tabs[selectedTab]} Content
          </Heading>
          <Heading level="h4" weight="normal" data-testid="tab-subheading">
            This is the content for {tabs[selectedTab].toLowerCase()}
          </Heading>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Heading level="h3" color="success" data-testid="card1-title">
            Success Card
          </Heading>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Heading level="h3" color="warning" data-testid="card2-title">
            Warning Card
          </Heading>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Heading level="h3" color="danger" data-testid="card3-title">
            Danger Card
          </Heading>
        </Paper>
      </Box>
    </Stack>
  );
};

// Basic Interaction Tests
export const BasicInteraction: Story = {
  render: () => <BasicInteractionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test basic rendering
    const heading = canvas.getByTestId('clickable-heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Click me! (Clicked: 0)');

    // Test click interaction
    await userEvent.click(heading);
    await waitFor(() => {
      expect(heading).toHaveTextContent('Click me! (Clicked: 1)');
    });

    // Test multiple clicks
    await userEvent.click(heading);
    await userEvent.click(heading);
    await waitFor(() => {
      expect(heading).toHaveTextContent('Click me! (Clicked: 3)');
    });

    // Test container exists
    expect(canvas.getByTestId('basic-interaction-container')).toBeInTheDocument();
  },
};

// Anchor Links Test
export const AnchorLinks: Story = {
  render: () => (
    <Stack spacing={4} data-testid="anchor-links-container">
      <Heading level="h1" id="main-title" data-testid="main-heading">
        Main Title
      </Heading>
      <Heading level="h2" id="section-1" data-testid="section-heading">
        Section 1
      </Heading>
      <Heading level="h3" id="subsection-1-1" data-testid="subsection-heading">
        Subsection 1.1
      </Heading>
      <Box sx={{ mt: 4 }}>
        <a href="#main-title" data-testid="main-link">
          Go to Main Title
        </a>
        <br />
        <a href="#section-1" data-testid="section-link">
          Go to Section 1
        </a>
        <br />
        <a href="#subsection-1-1" data-testid="subsection-link">
          Go to Subsection 1.1
        </a>
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test heading elements exist with proper IDs
    const mainHeading = canvas.getByTestId('main-heading');
    const sectionHeading = canvas.getByTestId('section-heading');
    const subsectionHeading = canvas.getByTestId('subsection-heading');

    expect(mainHeading).toHaveAttribute('id', 'main-title');
    expect(sectionHeading).toHaveAttribute('id', 'section-1');
    expect(subsectionHeading).toHaveAttribute('id', 'subsection-1-1');

    // Test anchor links exist
    const mainLink = canvas.getByTestId('main-link');
    const sectionLink = canvas.getByTestId('section-link');
    const subsectionLink = canvas.getByTestId('subsection-link');

    expect(mainLink).toHaveAttribute('href', '#main-title');
    expect(sectionLink).toHaveAttribute('href', '#section-1');
    expect(subsectionLink).toHaveAttribute('href', '#subsection-1-1');

    // Test clicking anchor links
    await userEvent.click(mainLink);
    await userEvent.click(sectionLink);
    await userEvent.click(subsectionLink);
  },
};

// Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  render: () => <KeyboardNavigationComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test keyboard navigation
    const h1 = canvas.getByTestId('heading-h1');
    const h2 = canvas.getByTestId('heading-h2');
    const h3 = canvas.getByTestId('heading-h3');
    const focusDisplay = canvas.getByTestId('focused-element');

    // Tab to first heading
    await userEvent.tab();
    expect(h1).toHaveFocus();
    await waitFor(() => {
      expect(focusDisplay).toHaveTextContent('Focused: h1');
    });

    // Tab to second heading
    await userEvent.tab();
    expect(h2).toHaveFocus();
    await waitFor(() => {
      expect(focusDisplay).toHaveTextContent('Focused: h2');
    });

    // Tab to third heading
    await userEvent.tab();
    expect(h3).toHaveFocus();
    await waitFor(() => {
      expect(focusDisplay).toHaveTextContent('Focused: h3');
    });
  },
};

// Screen Reader Test
export const ScreenReader: Story = {
  render: () => (
    <Stack spacing={2} data-testid="screen-reader-container">
      <Heading level="h1" data-testid="main-heading">
        Main Page Title
      </Heading>
      <Heading level="h2" aria-label="Section heading for navigation" data-testid="section-heading">
        Navigation Section
      </Heading>
      <Heading level="h3" role="heading" aria-level={3} data-testid="custom-heading">
        Custom Semantic Heading
      </Heading>
      <Heading level="h4" aria-describedby="heading-description" data-testid="described-heading">
        Heading with Description
      </Heading>
      <div id="heading-description">This heading describes important content below</div>
      <Heading level="display" data-testid="display-heading">
        Display Style Heading
      </Heading>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test semantic heading elements
    const mainHeading = canvas.getByTestId('main-heading');
    const sectionHeading = canvas.getByTestId('section-heading');
    const customHeading = canvas.getByTestId('custom-heading');
    const describedHeading = canvas.getByTestId('described-heading');
    const displayHeading = canvas.getByTestId('display-heading');

    // Test correct HTML elements
    expect(mainHeading.tagName).toBe('H1');
    expect(sectionHeading.tagName).toBe('H2');
    expect(customHeading.tagName).toBe('H3');
    expect(describedHeading.tagName).toBe('H4');
    expect(displayHeading.tagName).toBe('H1'); // display level maps to h1

    // Test accessibility attributes
    expect(sectionHeading).toHaveAttribute('aria-label', 'Section heading for navigation');
    expect(customHeading).toHaveAttribute('role', 'heading');
    expect(customHeading).toHaveAttribute('aria-level', '3');
    expect(describedHeading).toHaveAttribute('aria-describedby', 'heading-description');

    // Test heading hierarchy
    const headings = canvas.getAllByRole('heading');
    expect(headings).toHaveLength(5);
  },
};

// Focus Management Test
export const FocusManagement: Story = {
  render: () => <FocusManagementComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test programmatic focus
    const focusH1Btn = canvas.getByTestId('focus-h1-btn');
    const focusH2Btn = canvas.getByTestId('focus-h2-btn');
    const focusH3Btn = canvas.getByTestId('focus-h3-btn');

    const h1 = canvas.getByTestId('managed-h1');
    const h2 = canvas.getByTestId('managed-h2');
    const h3 = canvas.getByTestId('managed-h3');

    const activeDisplay = canvas.getByTestId('active-heading');

    // Focus H1
    await userEvent.click(focusH1Btn);
    expect(h1).toHaveFocus();
    await waitFor(() => {
      expect(activeDisplay).toHaveTextContent('Active: h1');
    });

    // Focus H2
    await userEvent.click(focusH2Btn);
    expect(h2).toHaveFocus();
    await waitFor(() => {
      expect(activeDisplay).toHaveTextContent('Active: h2');
    });

    // Focus H3
    await userEvent.click(focusH3Btn);
    expect(h3).toHaveFocus();
    await waitFor(() => {
      expect(activeDisplay).toHaveTextContent('Active: h3');
    });
  },
};

// Responsive Design Test
export const ResponsiveDesign: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Stack spacing={2} data-testid="responsive-container">
      <Heading
        level="h1"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
        data-testid="responsive-h1"
      >
        Responsive H1
      </Heading>

      <Heading
        level="h2"
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
        data-testid="desktop-only-h2"
      >
        Desktop Only H2
      </Heading>

      <Heading
        level="h2"
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
        data-testid="mobile-only-h2"
      >
        Mobile Only H2
      </Heading>

      <Heading
        level="h3"
        sx={{
          textAlign: { xs: 'center', md: 'left' },
        }}
        data-testid="adaptive-alignment-h3"
      >
        Adaptive Alignment H3
      </Heading>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test responsive elements exist
    expect(canvas.getByTestId('responsive-h1')).toBeInTheDocument();
    expect(canvas.getByTestId('desktop-only-h2')).toBeInTheDocument();
    expect(canvas.getByTestId('mobile-only-h2')).toBeInTheDocument();
    expect(canvas.getByTestId('adaptive-alignment-h3')).toBeInTheDocument();

    // Test responsive breakpoints applied (basic style verification)
    const responsiveH1 = canvas.getByTestId('responsive-h1');
    expect(responsiveH1).toHaveStyle('font-family: Roboto, Helvetica, Arial, sans-serif');
  },
};

// Theme Variations Test
export const ThemeVariations: Story = {
  render: () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (
      <Stack spacing={4} data-testid="theme-variations-container">
        <ThemeProvider theme={lightTheme}>
          <Paper sx={{ p: 2 }} data-testid="light-theme-section">
            <Heading level="h2" color="primary" data-testid="light-primary-heading">
              Light Theme Primary
            </Heading>
            <Heading level="h3" color="secondary" data-testid="light-secondary-heading">
              Light Theme Secondary
            </Heading>
            <Heading level="h4" color="neutral" data-testid="light-neutral-heading">
              Light Theme Neutral
            </Heading>
          </Paper>
        </ThemeProvider>

        <ThemeProvider theme={darkTheme}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper' }} data-testid="dark-theme-section">
            <Heading level="h2" color="primary" data-testid="dark-primary-heading">
              Dark Theme Primary
            </Heading>
            <Heading level="h3" color="secondary" data-testid="dark-secondary-heading">
              Dark Theme Secondary
            </Heading>
            <Heading level="h4" color="neutral" data-testid="dark-neutral-heading">
              Dark Theme Neutral
            </Heading>
          </Paper>
        </ThemeProvider>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test theme sections exist
    expect(canvas.getByTestId('light-theme-section')).toBeInTheDocument();
    expect(canvas.getByTestId('dark-theme-section')).toBeInTheDocument();

    // Test headings exist in both themes
    expect(canvas.getByTestId('light-primary-heading')).toBeInTheDocument();
    expect(canvas.getByTestId('light-secondary-heading')).toBeInTheDocument();
    expect(canvas.getByTestId('light-neutral-heading')).toBeInTheDocument();

    expect(canvas.getByTestId('dark-primary-heading')).toBeInTheDocument();
    expect(canvas.getByTestId('dark-secondary-heading')).toBeInTheDocument();
    expect(canvas.getByTestId('dark-neutral-heading')).toBeInTheDocument();
  },
};

// Visual States Test
export const VisualStates: Story = {
  render: () => (
    <Stack spacing={3} data-testid="visual-states-container">
      <Stack spacing={1}>
        <div>Heading Levels:</div>
        <Heading level="h1" data-testid="level-h1">
          H1 Heading
        </Heading>
        <Heading level="h2" data-testid="level-h2">
          H2 Heading
        </Heading>
        <Heading level="h3" data-testid="level-h3">
          H3 Heading
        </Heading>
        <Heading level="h4" data-testid="level-h4">
          H4 Heading
        </Heading>
        <Heading level="h5" data-testid="level-h5">
          H5 Heading
        </Heading>
        <Heading level="h6" data-testid="level-h6">
          H6 Heading
        </Heading>
        <Heading level="display" data-testid="level-display">
          Display Heading
        </Heading>
      </Stack>

      <Stack spacing={1}>
        <div>Color Variations:</div>
        <Heading level="h3" color="primary" data-testid="color-primary">
          Primary Color
        </Heading>
        <Heading level="h3" color="secondary" data-testid="color-secondary">
          Secondary Color
        </Heading>
        <Heading level="h3" color="success" data-testid="color-success">
          Success Color
        </Heading>
        <Heading level="h3" color="warning" data-testid="color-warning">
          Warning Color
        </Heading>
        <Heading level="h3" color="danger" data-testid="color-danger">
          Danger Color
        </Heading>
        <Heading level="h3" color="neutral" data-testid="color-neutral">
          Neutral Color
        </Heading>
      </Stack>

      <Stack spacing={1}>
        <div>Weight Variations:</div>
        <Heading level="h3" weight="light" data-testid="weight-light">
          Light Weight
        </Heading>
        <Heading level="h3" weight="normal" data-testid="weight-normal">
          Normal Weight
        </Heading>
        <Heading level="h3" weight="medium" data-testid="weight-medium">
          Medium Weight
        </Heading>
        <Heading level="h3" weight="semibold" data-testid="weight-semibold">
          Semibold Weight
        </Heading>
        <Heading level="h3" weight="bold" data-testid="weight-bold">
          Bold Weight
        </Heading>
      </Stack>

      <Stack spacing={1}>
        <div>Gradient Effect:</div>
        <Heading level="h2" gradient={true} data-testid="gradient-heading">
          Gradient Heading
        </Heading>
        <Heading level="h2" gradient={false} data-testid="non-gradient-heading">
          Non-Gradient Heading
        </Heading>
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all heading levels
    expect(canvas.getByTestId('level-h1').tagName).toBe('H1');
    expect(canvas.getByTestId('level-h2').tagName).toBe('H2');
    expect(canvas.getByTestId('level-h3').tagName).toBe('H3');
    expect(canvas.getByTestId('level-h4').tagName).toBe('H4');
    expect(canvas.getByTestId('level-h5').tagName).toBe('H5');
    expect(canvas.getByTestId('level-h6').tagName).toBe('H6');
    expect(canvas.getByTestId('level-display').tagName).toBe('H1');

    // Test color variations exist
    expect(canvas.getByTestId('color-primary')).toBeInTheDocument();
    expect(canvas.getByTestId('color-secondary')).toBeInTheDocument();
    expect(canvas.getByTestId('color-success')).toBeInTheDocument();
    expect(canvas.getByTestId('color-warning')).toBeInTheDocument();
    expect(canvas.getByTestId('color-danger')).toBeInTheDocument();
    expect(canvas.getByTestId('color-neutral')).toBeInTheDocument();

    // Test weight variations exist
    expect(canvas.getByTestId('weight-light')).toBeInTheDocument();
    expect(canvas.getByTestId('weight-normal')).toBeInTheDocument();
    expect(canvas.getByTestId('weight-medium')).toBeInTheDocument();
    expect(canvas.getByTestId('weight-semibold')).toBeInTheDocument();
    expect(canvas.getByTestId('weight-bold')).toBeInTheDocument();

    // Test gradient variations exist
    expect(canvas.getByTestId('gradient-heading')).toBeInTheDocument();
    expect(canvas.getByTestId('non-gradient-heading')).toBeInTheDocument();
  },
};

// Performance Test
export const Performance: Story = {
  render: () => <PerformanceTestComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all performance headings render
    for (let i = 0; i < 50; i++) {
      expect(canvas.getByTestId(`perf-heading-${i}`)).toBeInTheDocument();
    }

    // Test render time is reasonable (under 100ms)
    const renderTimeElement = canvas.getByTestId('render-time');
    const renderTimeText = renderTimeElement.textContent;
    const renderTime = parseFloat(renderTimeText?.match(/[\d.]+/)?.[0] || '0');

    expect(renderTime).toBeLessThan(100);
  },
};

// Edge Cases Test
export const EdgeCases: Story = {
  render: () => (
    <Stack spacing={2} data-testid="edge-cases-container">
      <Heading level="h1" data-testid="empty-content"></Heading>

      <Heading level="h2" data-testid="very-long-content">
        This is a very long heading that should wrap properly and maintain readability even when the
        content extends beyond the normal width of the container and continues to multiple lines to
        test text overflow and wrapping behavior
      </Heading>

      <Heading level="h3" data-testid="special-characters">
        Special Characters: !@#$%^&*()_+-=[]{}|;:&apos;&quot;,./?`~
      </Heading>

      <Heading level="h4" data-testid="unicode-content">
        Unicode: 你好 🌟 العربية Ελληνικά 🚀 日本語
      </Heading>

      <Heading level="h5" data-testid="html-entities">
        HTML Entities: &lt;div&gt; &amp; &quot;quotes&quot; &apos;apostrophes&apos;
      </Heading>

      <Heading level="h6" data-testid="numbers-and-symbols">
        123456789 αβγδε ∑∆∏π ∞≠≤≥ → ← ↑ ↓
      </Heading>

      <Heading level="display" data-testid="mixed-content">
        Mixed: Text123 🎯 <span>HTML</span> &amp; More!
      </Heading>

      <Box sx={{ width: 200, overflow: 'hidden' }}>
        <Heading level="h3" data-testid="constrained-width">
          Constrained Width Heading That Should Wrap
        </Heading>
      </Box>

      <Heading
        level="h2"
        data-testid="all-props"
        color="primary"
        weight="bold"
        gradient={true}
        style={{ textDecoration: 'underline' }}
      >
        All Props Combined
      </Heading>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty content handling
    const emptyHeading = canvas.getByTestId('empty-content');
    expect(emptyHeading).toBeInTheDocument();

    // Test very long content
    const longHeading = canvas.getByTestId('very-long-content');
    expect(longHeading).toBeInTheDocument();
    expect(longHeading.textContent).toContain('very long heading');

    // Test special characters
    const specialCharsHeading = canvas.getByTestId('special-characters');
    expect(specialCharsHeading).toHaveTextContent('Special Characters');

    // Test unicode content
    const unicodeHeading = canvas.getByTestId('unicode-content');
    expect(unicodeHeading).toHaveTextContent('你好 🌟 العربية Ελληνικά 🚀 日本語');

    // Test HTML entities
    const entitiesHeading = canvas.getByTestId('html-entities');
    expect(entitiesHeading).toBeInTheDocument();

    // Test numbers and symbols
    const numbersHeading = canvas.getByTestId('numbers-and-symbols');
    expect(numbersHeading).toBeInTheDocument();

    // Test mixed content
    const mixedHeading = canvas.getByTestId('mixed-content');
    expect(mixedHeading).toBeInTheDocument();

    // Test constrained width
    const constrainedHeading = canvas.getByTestId('constrained-width');
    expect(constrainedHeading).toBeInTheDocument();

    // Test all props combined
    const allPropsHeading = canvas.getByTestId('all-props');
    expect(allPropsHeading).toBeInTheDocument();
    expect(allPropsHeading.tagName).toBe('H2');
  },
};

// Integration Test
export const Integration: Story = {
  render: () => <IntegrationTestComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    expect(canvas.getByTestId('page-title')).toHaveTextContent('Integration Testing Page');
    expect(canvas.getByTestId('section-title')).toHaveTextContent('Content Section');
    expect(canvas.getByTestId('tab-heading')).toHaveTextContent('Tab 1 Content');

    // Test tab switching
    const tab2Button = canvas.getByTestId('tab-1');
    await userEvent.click(tab2Button);

    await waitFor(() => {
      expect(canvas.getByTestId('tab-heading')).toHaveTextContent('Tab 2 Content');
      expect(canvas.getByTestId('tab-subheading')).toHaveTextContent(
        'This is the content for tab 2',
      );
    });

    // Test card titles
    expect(canvas.getByTestId('card1-title')).toHaveTextContent('Success Card');
    expect(canvas.getByTestId('card2-title')).toHaveTextContent('Warning Card');
    expect(canvas.getByTestId('card3-title')).toHaveTextContent('Danger Card');
  },
};
