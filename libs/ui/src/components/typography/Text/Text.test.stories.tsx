import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

// Type extension for performance.memory API
interface PerformanceWithMemory {
  memory?: {
    usedJSHeapSize: number;
  };
  now?: () => number;
}

import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text/Tests',
  component: Text,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Text'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test text content is rendered
    const textElement = canvas.getByText(/interactive text/i);
    expect(textElement).toBeInTheDocument();

    // Test text element has correct text content
    expect(textElement.textContent).toBe('This is interactive text content');

    // Test clicking text element doesn't cause errors
    await userEvent.click(textElement);

    // Test text element maintains focus capabilities
    textElement.focus();
    expect(textElement).toHaveFocus();

    // Test element can be selected
    await userEvent.tripleClick(textElement);

    // Verify text element is accessible
    expect(textElement).toBeVisible();
  },
  render: () => <Text tabIndex={0}>This is interactive text content</Text>,
};

// State Change Tests - Testing different variants and props
export const StateChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test body variant
    const bodyText = canvas.getByTestId('body-text');
    expect(bodyText).toBeInTheDocument();
    expect(bodyText).toHaveStyle({ fontWeight: '400' });

    // Test heading variant
    const headingText = canvas.getByTestId('heading-text');
    expect(headingText).toBeInTheDocument();
    expect(headingText).toHaveStyle({ fontWeight: '600' });

    // Test caption variant
    const captionText = canvas.getByTestId('caption-text');
    expect(captionText).toBeInTheDocument();
    expect(captionText).toHaveStyle({ opacity: '0.8' });

    // Test code variant
    const codeText = canvas.getByTestId('code-text');
    expect(codeText).toBeInTheDocument();
    // Verify code font family by checking computed style
    const codeStyle = window.getComputedStyle(codeText);
    expect(codeStyle.fontFamily).toMatch(/Monaco|Menlo|Ubuntu Mono|Courier New|monospace/i);

    // Test size variations
    const largeText = canvas.getByTestId('large-text');
    const largeStyle = window.getComputedStyle(largeText);
    expect(largeStyle.fontSize).toBe('18px'); // 1.125rem = 18px

    const smallText = canvas.getByTestId('small-text');
    const smallStyle = window.getComputedStyle(smallText);
    expect(smallStyle.fontSize).toBe('14px'); // 0.875rem = 14px

    // Test weight variations
    const boldText = canvas.getByTestId('bold-text');
    expect(boldText).toHaveStyle({ fontWeight: '700' });

    // Test text decorations
    const italicText = canvas.getByTestId('italic-text');
    expect(italicText).toHaveStyle({ fontStyle: 'italic' });

    const underlineText = canvas.getByTestId('underline-text');
    expect(underlineText).toHaveStyle({ textDecoration: expect.stringContaining('underline') });

    const strikethroughText = canvas.getByTestId('strikethrough-text');
    expect(strikethroughText).toHaveStyle({
      textDecoration: expect.stringContaining('line-through'),
    });
  },
  render: () => (
    <Stack spacing={2}>
      <Text variant="body" data-testid="body-text">
        Body text
      </Text>
      <Text variant="heading" data-testid="heading-text">
        Heading text
      </Text>
      <Text variant="caption" data-testid="caption-text">
        Caption text
      </Text>
      <Text variant="code" data-testid="code-text">
        Code text
      </Text>
      <Text size="lg" data-testid="large-text">
        Large text
      </Text>
      <Text size="sm" data-testid="small-text">
        Small text
      </Text>
      <Text weight="bold" data-testid="bold-text">
        Bold text
      </Text>
      <Text italic data-testid="italic-text">
        Italic text
      </Text>
      <Text underline data-testid="underline-text">
        Underline text
      </Text>
      <Text strikethrough data-testid="strikethrough-text">
        Strikethrough text
      </Text>
    </Stack>
  ),
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const focusableTexts = [
      canvas.getByTestId('nav-text-1'),
      canvas.getByTestId('nav-text-2'),
      canvas.getByTestId('nav-text-3'),
    ];

    // Test initial focus
    focusableTexts[0].focus();
    expect(focusableTexts[0]).toHaveFocus();

    // Test Tab navigation between elements
    await userEvent.tab();
    expect(focusableTexts[1]).toHaveFocus();

    await userEvent.tab();
    expect(focusableTexts[2]).toHaveFocus();

    // Test Shift+Tab backward navigation
    await userEvent.tab({ shift: true });
    expect(focusableTexts[1]).toHaveFocus();

    // Test keyboard interaction doesn't lose focus
    await userEvent.keyboard('{Enter}');
    expect(focusableTexts[1]).toHaveFocus();

    // Test Space key interaction
    await userEvent.keyboard(' ');
    expect(focusableTexts[1]).toHaveFocus();

    // Test Escape key interaction
    await userEvent.keyboard('{Escape}');
    expect(focusableTexts[1]).toHaveFocus();
  },
  render: () => (
    <Stack spacing={2}>
      <Text tabIndex={0} data-testid="nav-text-1">
        Focusable text 1
      </Text>
      <Text tabIndex={0} data-testid="nav-text-2">
        Focusable text 2
      </Text>
      <Text tabIndex={0} data-testid="nav-text-3">
        Focusable text 3
      </Text>
    </Stack>
  ),
};

// Screen Reader Accessibility Tests
export const ScreenReader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test semantic elements
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName.toLowerCase()).toBe('p');

    // Test aria-label is preserved
    const labeledText = canvas.getByLabelText('Important announcement');
    expect(labeledText).toBeInTheDocument();
    expect(labeledText).toHaveAttribute('aria-label', 'Important announcement');

    // Test role attributes
    const statusText = canvas.getByRole('status');
    expect(statusText).toBeInTheDocument();
    expect(statusText.textContent).toBe('Status message');

    // Test aria-describedby relationships
    const describedText = canvas.getByText('Main content');
    const description = canvas.getByText('This is the description');
    expect(describedText).toHaveAttribute('aria-describedby', 'description-1');
    expect(description).toHaveAttribute('id', 'description-1');

    // Test heading semantics
    const headingText = canvas.getByRole('heading', { level: 2 });
    expect(headingText).toBeInTheDocument();
    expect(headingText.textContent).toBe('Section Heading');

    // Test text content accessibility
    const codeText = canvas.getByText('console.log("hello")');
    expect(codeText).toHaveAttribute('role', 'code');
  },
  render: () => (
    <Stack spacing={2}>
      <Text as="p" data-testid="paragraph">
        Paragraph text content
      </Text>
      <Text aria-label="Important announcement">This is an important message</Text>
      <Text role="status">Status message</Text>
      <Text aria-describedby="description-1">Main content</Text>
      <Text id="description-1">This is the description</Text>
      <Text as="h2" variant="heading">
        Section Heading
      </Text>
      <Text variant="code" role="code">
        console.log("hello")
      </Text>
    </Stack>
  ),
};

// Focus Management Tests
export const FocusManagement: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    canvas.getByTestId('focus-container');
    const focusableText = canvas.getByTestId('focusable-text');
    const triggerButton = canvas.getByTestId('focus-trigger');

    // Test initial focus state
    expect(focusableText).not.toHaveFocus();

    // Test programmatic focus
    await userEvent.click(triggerButton);
    await waitFor(() => {
      expect(focusableText).toHaveFocus();
    });

    // Test focus containment within container
    focusableText.focus();
    expect(document.activeElement).toBe(focusableText);

    // Test focus visibility
    expect(focusableText).toHaveFocus();

    // Test blur handling
    focusableText.blur();
    expect(focusableText).not.toHaveFocus();
  },
  render: function FocusManagementRender() {
    const [focusTarget, setFocusTarget] = React.useState<HTMLElement | null>(null);

    const handleFocus = () => {
      if (focusTarget) {
        focusTarget.focus();
      }
    };

    return (
      <Stack spacing={2} data-testid="focus-container">
        <button data-testid="focus-trigger" onClick={handleFocus}>
          Focus Text
        </button>
        <Text tabIndex={0} data-testid="focusable-text" ref={setFocusTarget}>
          This text can be focused programmatically
        </Text>
      </Stack>
    );
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test responsive text scaling
    const responsiveText = canvas.getByTestId('responsive-text');
    expect(responsiveText).toBeInTheDocument();

    // Test responsive visibility (check computed styles)
    const mobileOnlyText = canvas.getByTestId('mobile-only');
    const desktopOnlyText = canvas.getByTestId('desktop-only');

    expect(mobileOnlyText).toBeInTheDocument();
    expect(desktopOnlyText).toBeInTheDocument();

    // Test line height adjustments for mobile
    const bodyText = canvas.getByTestId('body-responsive');
    const computedStyle = window.getComputedStyle(bodyText);
    expect(parseFloat(computedStyle.lineHeight)).toBeGreaterThan(1);

    // Test text wrapping behavior
    const longText = canvas.getByTestId('long-text');
    expect(longText).toBeInTheDocument();
    expect(longText.scrollWidth).toBeGreaterThan(0);
  },
  render: () => (
    <Box sx={{ width: '100%', maxWidth: '320px' }}>
      <Stack spacing={2}>
        <Text
          data-testid="responsive-text"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
          }}
        >
          Responsive text that scales with screen size
        </Text>
        <Text data-testid="mobile-only" sx={{ display: { xs: 'block', md: 'none' } }}>
          Mobile only text
        </Text>
        <Text data-testid="desktop-only" sx={{ display: { xs: 'none', md: 'block' } }}>
          Desktop only text
        </Text>
        <Text data-testid="body-responsive">Regular body text that adapts to screen size</Text>
        <Text data-testid="long-text">
          This is a very long text that should wrap properly on smaller screens and maintain
          readability across different device sizes
        </Text>
      </Stack>
    </Box>
  ),
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test primary color
    const primaryText = canvas.getByTestId('primary-text');
    expect(primaryText).toBeInTheDocument();

    // Test secondary color
    const secondaryText = canvas.getByTestId('secondary-text');
    expect(secondaryText).toBeInTheDocument();

    // Test success color
    const successText = canvas.getByTestId('success-text');
    expect(successText).toBeInTheDocument();

    // Test warning color
    const warningText = canvas.getByTestId('warning-text');
    expect(warningText).toBeInTheDocument();

    // Test danger color
    const dangerText = canvas.getByTestId('danger-text');
    expect(dangerText).toBeInTheDocument();

    // Test neutral color
    const neutralText = canvas.getByTestId('neutral-text');
    expect(neutralText).toBeInTheDocument();

    // Verify colors are applied (basic check for color property existence)
    const primaryStyle = window.getComputedStyle(primaryText);
    expect(primaryStyle.color).toBeTruthy();

    const secondaryStyle = window.getComputedStyle(secondaryText);
    expect(secondaryStyle.color).toBeTruthy();

    // Test theme integration
    expect(primaryText.textContent).toBe('Primary themed text');
    expect(successText.textContent).toBe('Success themed text');
  },
  render: () => (
    <Stack spacing={2}>
      <Text color="primary" data-testid="primary-text">
        Primary themed text
      </Text>
      <Text color="secondary" data-testid="secondary-text">
        Secondary themed text
      </Text>
      <Text color="success" data-testid="success-text">
        Success themed text
      </Text>
      <Text color="warning" data-testid="warning-text">
        Warning themed text
      </Text>
      <Text color="danger" data-testid="danger-text">
        Danger themed text
      </Text>
      <Text color="neutral" data-testid="neutral-text">
        Neutral themed text
      </Text>
    </Stack>
  ),
};

// Visual States Tests
export const VisualStates: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all size variants
    const extraSmallText = canvas.getByTestId('xs-text');
    const smallText = canvas.getByTestId('sm-text');
    const mediumText = canvas.getByTestId('md-text');
    const largeText = canvas.getByTestId('lg-text');
    const extraLargeText = canvas.getByTestId('xl-text');

    expect(window.getComputedStyle(extraSmallText).fontSize).toBe('12px'); // 0.75rem
    expect(window.getComputedStyle(smallText).fontSize).toBe('14px'); // 0.875rem
    expect(window.getComputedStyle(mediumText).fontSize).toBe('16px'); // 1rem
    expect(window.getComputedStyle(largeText).fontSize).toBe('18px'); // 1.125rem
    expect(window.getComputedStyle(extraLargeText).fontSize).toBe('20px'); // 1.25rem

    // Test all weight variants
    const lightText = canvas.getByTestId('light-text');
    const normalText = canvas.getByTestId('normal-text');
    const mediumWeightText = canvas.getByTestId('medium-text');
    const semiboldText = canvas.getByTestId('semibold-text');
    const boldText = canvas.getByTestId('bold-text');

    expect(lightText).toHaveStyle({ fontWeight: '300' });
    expect(normalText).toHaveStyle({ fontWeight: '400' });
    expect(mediumWeightText).toHaveStyle({ fontWeight: '500' });
    expect(semiboldText).toHaveStyle({ fontWeight: '600' });
    expect(boldText).toHaveStyle({ fontWeight: '700' });

    // Test combined decorations
    const combinedText = canvas.getByTestId('combined-text');
    expect(combinedText).toHaveStyle({
      fontStyle: 'italic',
      textDecoration: expect.stringContaining('underline'),
    });
  },
  render: () => (
    <Stack spacing={2}>
      <Text size="xs" data-testid="xs-text">
        Extra Small (xs)
      </Text>
      <Text size="sm" data-testid="sm-text">
        Small (sm)
      </Text>
      <Text size="md" data-testid="md-text">
        Medium (md)
      </Text>
      <Text size="lg" data-testid="lg-text">
        Large (lg)
      </Text>
      <Text size="xl" data-testid="xl-text">
        Extra Large (xl)
      </Text>

      <Text weight="light" data-testid="light-text">
        Light Weight
      </Text>
      <Text weight="normal" data-testid="normal-text">
        Normal Weight
      </Text>
      <Text weight="medium" data-testid="medium-text">
        Medium Weight
      </Text>
      <Text weight="semibold" data-testid="semibold-text">
        Semibold Weight
      </Text>
      <Text weight="bold" data-testid="bold-text">
        Bold Weight
      </Text>

      <Text italic underline data-testid="combined-text">
        Combined Italic & Underline
      </Text>
    </Stack>
  ),
};

// Performance Tests
export const Performance: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const startTime = globalThis.performance?.now() || Date.now();

    // Test rendering many text elements
    const textElements = canvas.getAllByText(/Performance text/);
    expect(textElements).toHaveLength(50);

    const endTime = globalThis.performance?.now() || Date.now();
    const renderTime = endTime - startTime;

    // Performance should be reasonable (less than 100ms for 50 elements)
    expect(renderTime).toBeLessThan(100);

    // Test large text content rendering
    const largeTextElement = canvas.getByTestId('large-content');
    expect(largeTextElement).toBeInTheDocument();

    // Test memory usage doesn't increase dramatically
    const initialMemory =
      (globalThis.performance as PerformanceWithMemory)?.memory?.usedJSHeapSize || 0;

    // Trigger re-renders
    for (let i = 0; i < 10; i++) {
      await userEvent.hover(textElements[0]);
      await userEvent.unhover(textElements[0]);
    }

    const finalMemory =
      (globalThis.performance as PerformanceWithMemory)?.memory?.usedJSHeapSize || 0;

    // Memory increase should be minimal (if memory API is available)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      expect(memoryIncrease).toBeLessThan(1000000); // Less than 1MB increase
    }
  },
  render: () => (
    <Stack spacing={1}>
      {Array.from({ length: 50 }, (_, i) => (
        <Text key={i}>Performance text item {i + 1}</Text>
      ))}
      <Text data-testid="large-content">
        {Array.from({ length: 1000 }, () => 'Large content text. ').join('')}
      </Text>
    </Stack>
  ),
};

// Edge Cases Tests
export const EdgeCases: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty content
    const emptyText = canvas.getByTestId('empty-text');
    expect(emptyText).toBeInTheDocument();
    expect(emptyText.textContent).toBe('');

    // Test very long single word
    const longWordText = canvas.getByTestId('long-word');
    expect(longWordText).toBeInTheDocument();
    expect(longWordText.textContent).toContain('supercalifragilisticexpialidocious');

    // Test special characters
    const specialCharsText = canvas.getByTestId('special-chars');
    expect(specialCharsText).toBeInTheDocument();
    expect(specialCharsText.textContent).toBe('Special chars: !@#$%^&*()_+-=[]|;:,<>?');

    // Test HTML entities
    const htmlEntitiesText = canvas.getByTestId('html-entities');
    expect(htmlEntitiesText).toBeInTheDocument();
    expect(htmlEntitiesText.textContent).toContain('<>&"\'');

    // Test numbers and mixed content
    const mixedContentText = canvas.getByTestId('mixed-content');
    expect(mixedContentText).toBeInTheDocument();
    expect(mixedContentText.textContent).toBe('Mixed 123 content with émojis 🚀');

    // Test zero-width content
    const zeroWidthText = canvas.getByTestId('zero-width');
    expect(zeroWidthText).toBeInTheDocument();

    // Test multiline content - verify it exists and contains expected text
    const multilineText = canvas.getByTestId('multiline');
    expect(multilineText).toBeInTheDocument();
    // Check for line content (text may be rendered without line breaks in DOM)
    expect(multilineText.textContent).toContain('Line 1');
    expect(multilineText.textContent).toContain('Line 2');
    expect(multilineText.textContent).toContain('Line 3');

    // Test RTL text
    const rtlText = canvas.getByTestId('rtl-text');
    expect(rtlText).toBeInTheDocument();
    expect(rtlText.textContent).toBe('مرحبا بك في النص العربي');
  },
  render: () => (
    <Stack spacing={2}>
      <Text data-testid="empty-text"></Text>
      <Text data-testid="long-word">
        supercalifragilisticexpialidociousantidisestablishmentarianism
      </Text>
      <Text data-testid="special-chars">Special chars: !@#$%^&*()_+-=[]{}|;:,&lt;&gt;?</Text>
      <Text data-testid="html-entities">&lt;&gt;&amp;&quot;&#39;</Text>
      <Text data-testid="mixed-content">Mixed 123 content with émojis 🚀</Text>
      <Text data-testid="zero-width">{String.fromCharCode(8203)}</Text>
      <Text data-testid="multiline">
        Line 1{'\n'}Line 2{'\n'}Line 3
      </Text>
      <Text data-testid="rtl-text" dir="rtl">
        مرحبا بك في النص العربي
      </Text>
    </Stack>
  ),
};

// Integration Tests
export const Integration: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test Text within various containers
    const boxText = canvas.getByTestId('box-text');
    expect(boxText).toBeInTheDocument();

    const stackText = canvas.getByTestId('stack-text');
    expect(stackText).toBeInTheDocument();

    // Test Text with different HTML elements
    const paragraphText = canvas.getByTestId('paragraph-text');
    expect(paragraphText.tagName.toLowerCase()).toBe('p');

    const divText = canvas.getByTestId('div-text');
    expect(divText.tagName.toLowerCase()).toBe('div');

    const spanText = canvas.getByTestId('span-text');
    expect(spanText.tagName.toLowerCase()).toBe('span');

    // Test nested Text components
    const outerText = canvas.getByTestId('outer-text');
    const innerText = within(outerText).getByTestId('inner-text');
    expect(outerText).toContainElement(innerText);

    // Test Text with form elements integration
    const labelText = canvas.getByTestId('label-text');
    expect(labelText).toBeInTheDocument();

    // Test Text in different layout contexts
    const flexText = canvas.getByTestId('flex-text');
    const flexParent = flexText.parentElement;
    expect(flexParent).toHaveStyle({ display: 'flex' });

    // Test Text with event handlers
    const clickableText = canvas.getByTestId('clickable-text');
    await userEvent.click(clickableText);
    // Verify no errors occurred during click
    expect(clickableText).toBeInTheDocument();
  },
  render: function IntegrationRender() {
    const [clicked, setClicked] = React.useState(false);

    return (
      <Stack spacing={2}>
        <Box>
          <Text data-testid="box-text">Text in Box</Text>
        </Box>

        <Stack>
          <Text data-testid="stack-text">Text in Stack</Text>
        </Stack>

        <Text as="p" data-testid="paragraph-text">
          Text as paragraph
        </Text>
        <Text as="div" data-testid="div-text">
          Text as div
        </Text>
        <Text as="span" data-testid="span-text">
          Text as span
        </Text>

        <Text data-testid="outer-text">
          Outer text with <Text data-testid="inner-text">inner text</Text>
        </Text>

        <label>
          <Text data-testid="label-text">Label text</Text>
          <input type="text" />
        </label>

        <Box sx={{ display: 'flex' }}>
          <Text data-testid="flex-text">Text in flex container</Text>
        </Box>

        <Text
          data-testid="clickable-text"
          onClick={() => setClicked(!clicked)}
          style={{ cursor: 'pointer' }}
        >
          Clickable text {clicked ? '(clicked)' : ''}
        </Text>
      </Stack>
    );
  },
};

// Required Story Exports for Validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="md">Medium Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text variant="body">Body Text</Text>
      <Text variant="heading">Heading Text</Text>
      <Text variant="caption">Caption Text</Text>
      <Text variant="code">Code Text</Text>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text tabIndex={0}>Focusable Text</Text>
      <Text style={{ cursor: 'pointer' }} onClick={() => {}}>
        Clickable Text
      </Text>
      <Text underline>Underlined Text</Text>
      <Text strikethrough>Strikethrough Text</Text>
    </Stack>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Text
      sx={{
        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
        lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
      }}
    >
      This text adapts to different screen sizes
    </Text>
  ),
};
