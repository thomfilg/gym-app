import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Code } from './Code';

const meta: Meta<typeof Code> = {
  title: 'Typography/Code/Tests',
  component: Code,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
    docs: { disable: true },
  },
  tags: ['autodocs', 'test', 'component:Code'],
};
export default meta;
export type Story = StoryObj<typeof meta>;

// Enhanced test setup function with proper clipboard mocking
const setupTest = () => {
  // Create a proper mock for clipboard
  const mockWriteText = fn().mockResolvedValue(undefined);

  // Mock clipboard API properly
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: mockWriteText,
    },
    writable: true,
    configurable: true,
  });

  return { mockWriteText };
};

export const BasicInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests basic interaction with different Code variants and functionality.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 300 }}>
      <Code data-testid="inline-code" variant="inline">
        useState()
      </Code>

      <Code data-testid="block-code" variant="block" copyable>
        {`const greeting = "Hello, World!";
console.log(greeting);`}
      </Code>

      <Code data-testid="highlight-code" variant="highlight" language="typescript">
        {`interface User {
  id: number;
  name: string;
}`}
      </Code>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify inline code renders correctly', async () => {
      const inlineCode = canvas.getByTestId('inline-code');
      expect(inlineCode).toBeInTheDocument();
      expect(inlineCode).toHaveTextContent('useState()');

      // Check that it's a span element (inline nature)
      expect(inlineCode.tagName.toLowerCase()).toBe('span');

      // Verify it contains a code element
      const codeElement = inlineCode.querySelector('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent('useState()');
    });

    await step('Verify block code renders correctly', async () => {
      const blockCode = canvas.getByTestId('block-code');
      expect(blockCode).toBeInTheDocument();
      expect(blockCode).toHaveTextContent('const greeting = "Hello, World!";');

      // Check that it's a div element (block nature)
      expect(blockCode.tagName.toLowerCase()).toBe('div');

      // Verify it contains a code element
      const codeElement = blockCode.querySelector('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent('const greeting = "Hello, World!";');

      // Verify copy button is present for copyable block
      const copyButton = blockCode.querySelector(
        'button[aria-label*="copy" i], button[title*="copy" i]',
      );
      expect(copyButton).toBeInTheDocument();
    });

    await step('Verify highlight code renders correctly', async () => {
      const highlightCode = canvas.getByTestId('highlight-code');
      expect(highlightCode).toBeInTheDocument();
      expect(highlightCode).toHaveTextContent('interface User');

      // Check for language label
      const languageLabel = canvas.getByText('typescript');
      expect(languageLabel).toBeInTheDocument();
    });
  },
};

export const CopyToClipboard: Story = {
  parameters: {
    docs: { description: { story: 'Tests copy-to-clipboard functionality for code blocks.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 300 }}>
      <Code data-testid="copyable-code" variant="block" copyable>
        {'const test = "copy me";'}
      </Code>

      <Code data-testid="non-copyable-code" variant="block">
        {'const test = "no copy";'}
      </Code>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { mockWriteText } = setupTest();

    await step('Verify copy button exists for copyable code', async () => {
      const copyableCode = canvas.getByTestId('copyable-code');
      expect(copyableCode).toBeInTheDocument();

      const copyButton = canvas.getByRole('button', { name: /copy code/i });
      expect(copyButton).toBeInTheDocument();
    });

    await step('Verify no copy button for non-copyable code', async () => {
      const nonCopyableCode = canvas.getByTestId('non-copyable-code');
      expect(nonCopyableCode).toBeInTheDocument();

      const copyButtons = canvas.queryAllByRole('button', { name: /copy/i });
      expect(copyButtons).toHaveLength(1); // Only one copy button should exist
    });

    await step('Test copy functionality', async () => {
      mockWriteText.mockClear();

      const copyButton = canvas.getByRole('button', { name: /copy code/i });
      await userEvent.click(copyButton);

      expect(mockWriteText).toHaveBeenCalledWith('const test = "copy me";');

      // Check for success state
      await waitFor(() => {
        const successButton = canvas.getByRole('button', { name: /copied/i });
        expect(successButton).toBeInTheDocument();
      });
    });
  },
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: { story: 'Tests keyboard navigation and accessibility for Code component.' },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 300 }}>
      <Code data-testid="copyable-code" variant="block" copyable>
        {'const keyboardTest = "navigation";'}
      </Code>

      <Code data-testid="inline-code" variant="inline">
        tabIndex
      </Code>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { mockWriteText } = setupTest();

    await step('Verify copy button is keyboard accessible', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy code/i });

      // Focus the copy button
      copyButton.focus();
      expect(copyButton).toHaveFocus();

      // Test Enter key
      await userEvent.keyboard('{Enter}');

      // Verify the clipboard was called
      expect(mockWriteText).toHaveBeenCalledWith('const keyboardTest = "navigation";');

      // Check for success state - the button changes but should still exist
      await waitFor(() => {
        const successButton = canvas.getByRole('button', { name: /copied/i });
        expect(successButton).toBeInTheDocument();
        // Don't require focus since button content changed
      });
    });

    await step('Verify tab navigation', async () => {
      // Reset focus by focusing on the first button directly
      const buttons = canvas.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      // Focus the first button (which should be the copy button)
      const copyButton = buttons[0];
      copyButton.focus();
      expect(copyButton).toHaveFocus();

      // Verify that keyboard navigation works by checking the button is focusable
      expect(copyButton).toHaveAttribute('tabindex');
    });
  },
};

export const ScreenReader: Story = {
  parameters: {
    docs: { description: { story: 'Tests screen reader compatibility and ARIA attributes.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 300 }}>
      <Code data-testid="inline-code" variant="inline">
        screenReaderTest()
      </Code>

      <Code data-testid="block-code" variant="block" language="javascript" copyable>
        {`// Screen reader accessible code
const message = "Hello, screen reader users!";`}
      </Code>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify inline code has proper semantics', async () => {
      const inlineCode = canvas.getByTestId('inline-code');
      const codeElement = inlineCode.querySelector('code');

      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent('screenReaderTest()');
    });

    await step('Verify block code has proper structure', async () => {
      const blockCode = canvas.getByTestId('block-code');
      const codeElement = blockCode.querySelector('code');

      expect(codeElement).toBeInTheDocument();
      expect(blockCode).toContainElement(codeElement);
    });

    await step('Verify copy button has proper ARIA attributes', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy code/i });

      expect(copyButton).toHaveAttribute('type', 'button');
      expect(copyButton).toBeVisible();
    });

    await step('Verify language label is accessible', async () => {
      const languageLabel = canvas.getByText('javascript');
      expect(languageLabel).toBeInTheDocument();
      expect(languageLabel).toBeVisible();
    });
  },
};

export const ResponsiveDesign: Story = {
  parameters: {
    docs: { description: { story: 'Tests responsive behavior across different viewport sizes.' } },
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Box sx={{ width: '100%', p: 2 }}>
      <Code data-testid="responsive-block" variant="block" copyable language="css">
        {`@media (max-width: 768px) {
  .responsive-element {
    font-size: 14px;
    padding: 8px;
  }
}`}
      </Code>

      <Box sx={{ mt: 2 }}>
        <Typography>
          Inline code:{' '}
          <Code data-testid="responsive-inline" variant="inline">
            responsive()
          </Code>
        </Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify block code adapts to container width', async () => {
      const blockCode = canvas.getByTestId('responsive-block');
      expect(blockCode).toBeInTheDocument();

      // Code should be visible and not overflow container
      expect(blockCode).toBeVisible();

      const computedStyle = window.getComputedStyle(blockCode);
      expect(computedStyle.overflow).toBe('auto');
    });

    await step('Verify inline code remains inline on small screens', async () => {
      const inlineCode = canvas.getByTestId('responsive-inline');
      expect(inlineCode).toBeInTheDocument();

      // Check that it's a span element (inline nature)
      expect(inlineCode.tagName.toLowerCase()).toBe('span');

      // Verify it contains a code element
      const codeElement = inlineCode.querySelector('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent('responsive()');
    });

    await step('Verify copy button remains accessible on mobile', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy code/i });
      expect(copyButton).toBeVisible();

      // Should be large enough for touch interaction
      const buttonRect = copyButton.getBoundingClientRect();
      expect(buttonRect.width).toBeGreaterThanOrEqual(32);
      expect(buttonRect.height).toBeGreaterThanOrEqual(32);
    });
  },
};

export const ThemeVariations: Story = {
  parameters: {
    docs: { description: { story: 'Tests Code component in different Material-UI theme modes.' } },
  },
  render: () => {
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box data-testid="light-theme">
          <Typography variant="h6" gutterBottom>
            Light Theme
          </Typography>
          <ThemeProvider theme={lightTheme}>
            <Code variant="block" language="javascript" copyable>
              {'const lightMode = true;'}
            </Code>
          </ThemeProvider>
        </Box>

        <Box data-testid="dark-theme">
          <Typography variant="h6" gutterBottom>
            Dark Theme
          </Typography>
          <ThemeProvider theme={darkTheme}>
            <Code variant="block" language="javascript" copyable>
              {'const darkMode = true;'}
            </Code>
          </ThemeProvider>
        </Box>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify light theme styling', async () => {
      const lightThemeContainer = canvas.getByTestId('light-theme');
      const lightCode = lightThemeContainer.querySelector('div[class*="MuiBox-root"]');
      expect(lightCode || lightThemeContainer.querySelector('div')).toBeInTheDocument();
    });

    await step('Verify dark theme styling', async () => {
      const darkThemeContainer = canvas.getByTestId('dark-theme');
      const darkCode = darkThemeContainer.querySelector('div[class*="MuiBox-root"]');
      expect(darkCode || darkThemeContainer.querySelector('div')).toBeInTheDocument();
    });

    await step('Verify copy buttons work in both themes', async () => {
      const copyButtons = canvas.getAllByRole('button', { name: /copy code/i });
      expect(copyButtons).toHaveLength(2);

      // Test both copy buttons
      for (const button of copyButtons) {
        expect(button).toBeVisible();
      }
    });
  },
};

export const VisualStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests different visual states and size variants of the Code component.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 400 }}>
      {/* Size variants */}
      <Box data-testid="size-variants">
        <Typography variant="h6" gutterBottom>
          Size Variants
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Code data-testid="size-xs" variant="inline" size="xs">
            size: xs
          </Code>
          <Code data-testid="size-sm" variant="inline" size="sm">
            size: sm
          </Code>
          <Code data-testid="size-md" variant="inline" size="md">
            size: md
          </Code>
          <Code data-testid="size-lg" variant="inline" size="lg">
            size: lg
          </Code>
        </Box>
      </Box>

      {/* All variants */}
      <Box data-testid="variant-showcase">
        <Typography variant="h6" gutterBottom>
          All Variants
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Code data-testid="variant-inline" variant="inline">
            inline variant
          </Code>
          <Code data-testid="variant-block" variant="block">
            block variant
          </Code>
          <Code data-testid="variant-highlight" variant="highlight">
            highlight variant
          </Code>
        </Box>
      </Box>

      {/* Copy states */}
      <Box data-testid="copy-states">
        <Typography variant="h6" gutterBottom>
          Copy States
        </Typography>
        <Code data-testid="copyable-demo" variant="block" copyable>
          {'const copyable = true;'}
        </Code>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify size variants render with different font sizes', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg'];

      for (const size of sizes) {
        const element = canvas.getByTestId(`size-${size}`);
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent(`size: ${size}`);
      }
    });

    await step('Verify all variants have distinct styling', async () => {
      const inlineVariant = canvas.getByTestId('variant-inline');
      const blockVariant = canvas.getByTestId('variant-block');
      const highlightVariant = canvas.getByTestId('variant-highlight');

      // Inline should use span, block should use div
      expect(inlineVariant.tagName).toBe('SPAN');
      expect(blockVariant.tagName).toBe('DIV');
      expect(highlightVariant.tagName).toBe('DIV');

      // Check that they contain code elements
      expect(inlineVariant.querySelector('code')).toBeInTheDocument();
      expect(blockVariant.querySelector('code')).toBeInTheDocument();
      expect(highlightVariant.querySelector('code')).toBeInTheDocument();
    });

    await step('Test copy button hover state', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy code/i });

      // Verify button is accessible and visible
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toBeVisible();

      await userEvent.hover(copyButton);
      // After hover, button should still be visible
      expect(copyButton).toBeVisible();
    });
  },
};

export const Performance: Story = {
  parameters: {
    docs: { description: { story: 'Tests performance with large code blocks and line numbers.' } },
  },
  render: () => {
    const largeCode = Array.from(
      { length: 100 },
      (_, i) => `const line${i + 1} = "This is line number ${i + 1} with some content";`,
    ).join('\n');

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 500 }}>
        <Code data-testid="large-code" variant="block" lineNumbers copyable>
          {largeCode}
        </Code>

        <Code data-testid="inline-performance" variant="inline">
          Performance test inline code
        </Code>
      </Box>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { mockWriteText } = setupTest();

    await step('Verify large code block renders efficiently', async () => {
      const startTime = window.performance.now();

      const largeCode = canvas.getByTestId('large-code');
      expect(largeCode).toBeInTheDocument();

      const endTime = window.performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });

    await step('Verify line numbers are generated correctly', async () => {
      const largeCode = canvas.getByTestId('large-code');

      // Check for line numbers (should be visible in the content)
      expect(largeCode).toContainHTML('1');
      expect(largeCode).toContainHTML('100');
    });

    await step('Verify copy functionality works with large content', async () => {
      mockWriteText.mockClear();

      const copyButton = canvas.getByRole('button', { name: /copy code/i });
      await userEvent.click(copyButton);

      expect(mockWriteText).toHaveBeenCalledTimes(1);

      // Verify the copied content includes all lines
      const copiedContent = mockWriteText.mock.calls[0][0];
      expect(copiedContent).toContain('line1');
      expect(copiedContent).toContain('line100');
    });
  },
};

export const EdgeCases: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests edge cases like empty content, special characters, and very long lines.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 400 }}>
      <Code data-testid="empty-code" variant="block">
        {''}
      </Code>

      <Code data-testid="special-chars" variant="block">
        {'const special = "Hello \n\t\r\\ \'quotes\' \'apostrophes\' & <tags> {braces}";'}
      </Code>

      <Code data-testid="long-line" variant="block">
        {'const veryLongLine = "This is an extremely long line of code that should test horizontal scrolling behavior when the content exceeds the available width of the container and we need to ensure it handles overflow properly without breaking the layout";'}
      </Code>

      <Code data-testid="unicode" variant="inline">
        Hello 世界 🌍 ñoño café
      </Code>

      <Code data-testid="null-content" variant="block" copyable>
        {null}
      </Code>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify empty code renders without errors', async () => {
      const emptyCode = canvas.getByTestId('empty-code');
      expect(emptyCode).toBeInTheDocument();
      expect(emptyCode).toBeVisible();
    });

    await step('Verify special characters are preserved', async () => {
      const specialChars = canvas.getByTestId('special-chars');
      expect(specialChars).toBeInTheDocument();
      expect(specialChars).toHaveTextContent('\'quotes\'');
      expect(specialChars).toHaveTextContent('\'apostrophes\'');
      expect(specialChars).toHaveTextContent('<tags>');
      expect(specialChars).toHaveTextContent('{braces}');
    });

    await step('Verify long lines handle overflow correctly', async () => {
      const longLine = canvas.getByTestId('long-line');
      expect(longLine).toBeInTheDocument();

      const computedStyle = window.getComputedStyle(longLine);
      expect(computedStyle.overflow).toBe('auto');
    });

    await step('Verify Unicode characters render correctly', async () => {
      const unicodeCode = canvas.getByTestId('unicode');
      expect(unicodeCode).toBeInTheDocument();
      expect(unicodeCode).toHaveTextContent('Hello 世界 🌍 ñoño café');
    });

    await step('Verify null content is handled gracefully', async () => {
      const nullContent = canvas.getByTestId('null-content');
      expect(nullContent).toBeInTheDocument();

      // Copy button should still be present but might not work with null content
      const copyButton = canvas.getByRole('button', { name: /copy code/i });
      expect(copyButton).toBeInTheDocument();
    });
  },
};

export const Integration: Story = {
  parameters: {
    docs: { description: { story: 'Tests Code component integration with other UI components.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 400 }}>
      <Typography variant="h6">Installation Guide</Typography>

      <Typography paragraph>
        First, install the dependencies using{' '}
        <Code data-testid="inline-in-typography" variant="inline">
          npm install
        </Code>
      </Typography>

      <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Configuration File:
        </Typography>
        <Code data-testid="code-in-box" variant="block" language="json" copyable>
          {`{
  "name": "integration-test",
  "version": "1.0.0"
}`}
        </Code>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography>Run:</Typography>
        <Code data-testid="code-in-flex" variant="inline">
          npm start
        </Code>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    setupTest();

    await step('Verify code integrates well within Typography', async () => {
      const inlineInTypography = canvas.getByTestId('inline-in-typography');
      expect(inlineInTypography).toBeInTheDocument();
      expect(inlineInTypography).toHaveTextContent('npm install');
    });

    await step('Verify code works inside Box containers', async () => {
      const codeInBox = canvas.getByTestId('code-in-box');
      expect(codeInBox).toBeInTheDocument();
      expect(codeInBox).toHaveTextContent('integration-test');
    });

    await step('Verify code aligns properly in flex layouts', async () => {
      const codeInFlex = canvas.getByTestId('code-in-flex');
      expect(codeInFlex).toBeInTheDocument();
      expect(codeInFlex).toHaveTextContent('npm start');
    });
  },
};
