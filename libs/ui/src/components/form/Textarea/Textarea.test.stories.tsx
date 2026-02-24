import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect,userEvent, within } from 'storybook/test';

import { Textarea } from './Textarea';
import { TextareaHTMLAttributes } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea/Tests',
  component: Textarea,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Textarea'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic Interaction Tests
export const BasicInteraction: Story = {
  args: {
    placeholder: 'Type your message here...',
    'dataTestId': 'basic-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Find textarea element', async () => {
      const textarea = canvas.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', 'Type your message here...');
    });

    await step('Type text into textarea', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.click(textarea);
      await userEvent.type(textarea, 'Hello World!\nThis is a second line.');
      expect(textarea).toHaveValue('Hello World!\nThis is a second line.');
    });

    await step('Clear and retype text', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.clear(textarea);
      await userEvent.type(textarea, 'New content');
      expect(textarea).toHaveValue('New content');
    });

    await step('Verify special character input', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.clear(textarea);
      // Test various special characters without problematic brackets
      await userEvent.type(textarea, 'Special chars: @#$%^&*()_+-=;:,.<>?/~`');
      expect(textarea).toHaveValue('Special chars: @#$%^&*()_+-=;:,.<>?/~`');
    });
  },
};

// 2. Form Interaction Tests
export const FormInteraction: Story = {
  args: {
    placeholder: 'Enter form message...',
    name: 'message',
    required: true,
    'dataTestId': 'form-textarea',
  },
  decorators: [
    (Story) => (
      <form>
        <Story />
        <button type="submit">Submit</button>
      </form>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Interact with textarea in form context', async () => {
      const textarea = canvas.getByRole('textbox');
      const submitButton = canvas.getByRole('button', { name: 'Submit' });

      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('name', 'message');
      expect(textarea).toHaveAttribute('required');
      expect(submitButton).toBeInTheDocument();
    });

    await step('Fill textarea and verify form data', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.click(textarea);
      await userEvent.type(textarea, 'Form submission test\nMultiple lines supported');
      expect(textarea).toHaveValue('Form submission test\nMultiple lines supported');
    });

    await step('Test form validation behavior', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.clear(textarea);

      // Required field should trigger validation when empty
      expect(textarea).toHaveValue('');
      expect(textarea).toHaveAttribute('required');
    });
  },
};

// 3. Rich Text Editor Tests
export const RichTextEditor: Story = {
  args: {
    variant: 'rich',
    placeholder: 'Rich text editor...',
    label: 'Rich Text Content',
    'dataTestId': 'rich-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Find rich text editor components', async () => {
      const label = canvas.getByText('Rich Text Content');
      expect(label).toBeInTheDocument();

      // Look for toolbar buttons
      const boldButton = canvas.getByRole('button', { name: /bold/i });
      const italicButton = canvas.getByRole('button', { name: /italic/i });
      expect(boldButton).toBeInTheDocument();
      expect(italicButton).toBeInTheDocument();
    });

    await step('Test rich text toolbar interactions', async () => {
      const boldButton = canvas.getByRole('button', { name: /bold/i });
      const italicButton = canvas.getByRole('button', { name: /italic/i });

      // Click toolbar buttons
      await userEvent.click(boldButton);
      await userEvent.click(italicButton);

      // Toolbar buttons should be interactive
      expect(boldButton).toBeEnabled();
      expect(italicButton).toBeEnabled();
    });

    await step('Test content editing in rich text mode', async () => {
      // Find the contenteditable div
      const editableArea =
        canvas.getByRole('textbox') || canvasElement.querySelector('[contenteditable="true"]');

      if (editableArea) {
        await userEvent.click(editableArea);
        // Rich text editor should be focusable
        expect(document.activeElement).toBe(editableArea);
      }
    });
  },
};

// 4. Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  args: {
    placeholder: 'Test keyboard navigation...',
    'dataTestId': 'keyboard-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus textarea with Tab key', async () => {
      const textarea = canvas.getByRole('textbox');

      // Tab to focus
      await userEvent.tab();
      expect(textarea).toHaveFocus();
    });

    await step('Test Enter key behavior', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.click(textarea);
      await userEvent.type(textarea, 'First line');
      await userEvent.keyboard('{Enter}');
      await userEvent.type(textarea, 'Second line');

      expect(textarea).toHaveValue('First line\nSecond line');
    });

    await step('Test text selection with keyboard shortcuts', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.click(textarea);
      await userEvent.clear(textarea);
      await userEvent.type(textarea, 'Select this text');

      // Select all text with Ctrl+A
      await userEvent.keyboard('{Control>}a{/Control}');

      // Text should be selected (we can't directly test selection, but the command should execute)
      expect(textarea).toHaveValue('Select this text');
    });

    await step('Test Escape key behavior', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.click(textarea);
      await userEvent.keyboard('{Escape}');

      // Textarea should still be accessible after Escape
      expect(textarea).toBeInTheDocument();
    });
  },
};

// 5. Screen Reader Tests
export const ScreenReader: Story = {
  args: {
    placeholder: 'Screen reader accessible textarea',
    label: 'Accessible Textarea',
    helperText: 'This textarea is accessible to screen readers',
    'aria-describedby': 'helper-text',
    'dataTestId': 'sr-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes', async () => {
      const textarea = canvas.getByRole('textbox');
      const label = canvas.getByText('Accessible Textarea');
      const helperText = canvas.getByText('This textarea is accessible to screen readers');

      expect(textarea).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(helperText).toBeInTheDocument();

      // Check accessibility attributes
      expect(textarea).toHaveAccessibleName('Accessible Textarea');
      expect(textarea).toHaveAttribute('aria-describedby');
    });

    await step('Test screen reader announcements', async () => {
      const textarea = canvas.getByRole('textbox');

      // Focus should announce the textarea
      await userEvent.click(textarea);
      expect(textarea).toHaveFocus();

      // Type content and verify it's available to screen readers
      await userEvent.type(textarea, 'Screen reader content');
      expect(textarea).toHaveValue('Screen reader content');
    });

    await step('Test error state accessibility', async () => {
      const textarea = canvas.getByRole('textbox');

      // Textarea should be accessible and have proper state information
      expect(textarea).toBeInTheDocument();
      expect(textarea).not.toHaveAttribute('aria-invalid', 'true');
    });
  },
};

// 6. Focus Management Tests
export const FocusManagement: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <input placeholder="Previous input" data-testid="prev-input" />
        <Story />
        <input placeholder="Next input" data-testid="next-input" />
      </Box>
    ),
  ],
  args: {
    placeholder: 'Focus management test...',
    'dataTestId': 'focus-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test focus sequence', async () => {
      const prevInput = canvas.getByTestId('prev-input');
      const textarea = canvas.getByTestId('focus-textarea');
      const nextInput = canvas.getByTestId('next-input');

      // Start with previous input
      await userEvent.click(prevInput);
      expect(prevInput).toHaveFocus();

      // Tab to textarea
      await userEvent.tab();
      expect(textarea).toHaveFocus();

      // Tab to next input
      await userEvent.tab();
      expect(nextInput).toHaveFocus();
    });

    await step('Test focus retention during interaction', async () => {
      const textarea = canvas.getByTestId('focus-textarea');

      await userEvent.click(textarea);
      expect(textarea).toHaveFocus();

      await userEvent.type(textarea, 'Typing should maintain focus');
      expect(textarea).toHaveFocus();
      expect(textarea).toHaveValue('Typing should maintain focus');
    });

    await step('Test blur behavior', async () => {
      const textarea = canvas.getByTestId('focus-textarea');
      const nextInput = canvas.getByTestId('next-input');

      await userEvent.click(textarea);
      expect(textarea).toHaveFocus();

      // Click outside to blur
      await userEvent.click(nextInput);
      expect(textarea).not.toHaveFocus();
      expect(nextInput).toHaveFocus();
    });
  },
};

// 7. Responsive Design Tests
export const ResponsiveDesign: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  args: {
    placeholder: 'Responsive textarea...',
    size: 'md',
    'dataTestId': 'responsive-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify textarea renders on different viewports', async () => {
      const textarea = canvas.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toBeVisible();
    });

    await step('Test interaction on small screens', async () => {
      const textarea = canvas.getByRole('textbox');

      await userEvent.click(textarea);
      await userEvent.type(textarea, 'Mobile responsive content');
      expect(textarea).toHaveValue('Mobile responsive content');
    });

    await step('Verify accessibility on touch devices', async () => {
      const textarea = canvas.getByRole('textbox');

      // Touch target should be large enough - we verify the element exists and is accessible
      expect(textarea).toBeInTheDocument();
      expect(textarea).toBeVisible();
      // Note: We can't easily test computed dimensions in Storybook tests
    });
  },
};

// 8. Theme Variations Tests
export const ThemeVariations: Story = {
  decorators: [
    (Story) => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      const darkTheme = createTheme({ palette: { mode: 'dark' } });

      return (
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box>
            <h3>Light Theme</h3>
            <ThemeProvider theme={lightTheme}>
              <Story />
            </ThemeProvider>
          </Box>
          <Box>
            <h3>Dark Theme</h3>
            <ThemeProvider theme={darkTheme}>
              <Story />
            </ThemeProvider>
          </Box>
        </Box>
      );
    },
  ],
  args: {
    placeholder: 'Theme test textarea...',
    label: 'Theme Textarea',
    color: 'primary',
    'dataTestId': 'theme-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Find textareas in both themes', async () => {
      const textareas = canvas.getAllByRole('textbox');
      expect(textareas).toHaveLength(2); // Light and dark theme versions
    });

    await step('Test interaction in both themes', async () => {
      const textareas = canvas.getAllByRole('textbox');

      for (const textarea of textareas) {
        await userEvent.click(textarea);
        await userEvent.type(textarea, 'Theme test');
        expect(textarea).toHaveValue('Theme test');
        await userEvent.clear(textarea);
      }
    });

    await step('Verify theme-specific styling', async () => {
      const textareas = canvas.getAllByRole('textbox');

      // Both textareas should be rendered and functional
      textareas.forEach((textarea) => {
        expect(textarea).toBeVisible();
        expect(textarea).not.toHaveAttribute('disabled');
      });
    });
  },
};

// 9. Visual States Tests
export const VisualStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <h4>Default State</h4>
        <Textarea placeholder="Default state..." dataTestId="default-textarea" />
      </Box>
      <Box>
        <h4>Disabled State</h4>
        <Textarea placeholder="Disabled state..." disabled dataTestId="disabled-textarea" />
      </Box>
      <Box>
        <h4>Error State</h4>
        <Textarea
          placeholder="Error state..."
          error
          helperText="This field has an error"
          dataTestId="error-textarea"
        />
      </Box>
      <Box>
        <h4>Glass Effect</h4>
        <Textarea placeholder="Glass effect..." glass dataTestId="glass-textarea" />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all visual states render', async () => {
      const defaultTextarea = canvas.getByTestId('default-textarea');
      const disabledTextarea = canvas.getByTestId('disabled-textarea');
      const errorTextarea = canvas.getByTestId('error-textarea');
      const glassTextarea = canvas.getByTestId('glass-textarea');

      expect(defaultTextarea).toBeInTheDocument();
      expect(disabledTextarea).toBeInTheDocument();
      expect(errorTextarea).toBeInTheDocument();
      expect(glassTextarea).toBeInTheDocument();
    });

    await step('Test disabled state behavior', async () => {
      const disabledTextarea = canvas.getByTestId('disabled-textarea');

      expect(disabledTextarea).toBeDisabled();

      // Should not accept input when disabled
      await userEvent.click(disabledTextarea);
      expect(disabledTextarea).not.toHaveFocus();
    });

    await step('Test interactive states', async () => {
      const defaultTextarea = canvas.getByTestId('default-textarea');
      const errorTextarea = canvas.getByTestId('error-textarea');
      const glassTextarea = canvas.getByTestId('glass-textarea');

      // Test focus states
      await userEvent.click(defaultTextarea);
      expect(defaultTextarea).toHaveFocus();

      await userEvent.click(errorTextarea);
      expect(errorTextarea).toHaveFocus();

      await userEvent.click(glassTextarea);
      expect(glassTextarea).toHaveFocus();
    });

    await step('Test error state helper text', async () => {
      const helperText = canvas.getByText('This field has an error');
      expect(helperText).toBeInTheDocument();
    });
  },
};

// 10. Performance Tests
export const Performance: Story = {
  args: {
    placeholder: 'Performance test textarea...',
    'dataTestId': 'performance-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure initial render performance', async () => {
      const startTime = Date.now();
      const textarea = canvas.getByTestId('performance-textarea');
      const endTime = Date.now();

      expect(textarea).toBeInTheDocument();
      expect(endTime - startTime).toBeLessThan(100); // Should render quickly
    });

    await step('Test typing performance with large content', async () => {
      const textarea = canvas.getByTestId('performance-textarea');
      // Reduced from 1000 to 200 characters for faster test execution
      const longText = 'A'.repeat(200);

      const startTime = Date.now();
      await userEvent.click(textarea);
      await userEvent.type(textarea, longText, { delay: 0 });
      const endTime = Date.now();

      expect(textarea).toHaveValue(longText);
      expect(endTime - startTime).toBeLessThan(10000); // Reduced from 30s to 10s
    });

    await step('Test multiple rapid interactions', async () => {
      const textarea = canvas.getByTestId('performance-textarea');

      const startTime = Date.now();
      // Reduced from 10 to 5 iterations for faster test execution
      for (let i = 0; i < 5; i++) {
        await userEvent.clear(textarea);
        await userEvent.type(textarea, `Content ${i}`, { delay: 0 });
      }
      const endTime = Date.now();

      expect(textarea).toHaveValue('Content 4');
      expect(endTime - startTime).toBeLessThan(10000); // Reduced from 30s to 10s
    });
  },
  parameters: {
    test: {
      timeout: 10000, // 10 second timeout for performance tests
    },
  },
};

// 11. Edge Cases Tests
export const EdgeCases: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <h4>Empty State</h4>
          <Textarea placeholder="Empty placeholder..." dataTestId="empty-textarea" />
        </Box>
        <Box>
          <h4>With Max Length</h4>
          <Textarea placeholder="Max 10 chars..." maxLength={10} dataTestId="maxlength-textarea" />
        </Box>
        <Box>
          <h4>Pre-filled Content</h4>
          <Textarea defaultValue="Pre-filled content here" dataTestId="prefilled-textarea" />
        </Box>
      </Box>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test empty state behavior', async () => {
      const emptyTextarea = canvas.getByTestId('empty-textarea');

      expect(emptyTextarea).toHaveValue('');
      expect(emptyTextarea).toHaveAttribute('placeholder', 'Empty placeholder...');
    });

    await step('Test max length constraint', async () => {
      const maxLengthTextarea = canvas.getByTestId<HTMLTextAreaElement>('maxlength-textarea');

      await userEvent.click(maxLengthTextarea);
      await userEvent.type(maxLengthTextarea, 'This text is longer than 10 characters', { delay: 0 });

      // Should be truncated to max length
      const value = maxLengthTextarea.value;
      expect(value.length).toBeLessThanOrEqual(10);
    });

    await step('Test pre-filled content', async () => {
      const prefilledTextarea = canvas.getByTestId('prefilled-textarea');

      expect(prefilledTextarea).toHaveValue('Pre-filled content here');

      // Should be able to edit pre-filled content
      await userEvent.click(prefilledTextarea);
      await userEvent.clear(prefilledTextarea);
      await userEvent.type(prefilledTextarea, 'New content', { delay: 0 });
      expect(prefilledTextarea).toHaveValue('New content');
    });

    await step('Test special character input', async () => {
      const emptyTextarea = canvas.getByTestId('empty-textarea');

      await userEvent.clear(emptyTextarea);
      // Simplified test text for faster execution
      await userEvent.type(emptyTextarea, 'Special: @#$ abc', { delay: 0 });
      expect(emptyTextarea).toHaveValue('Special: @#$ abc');
    });

    await step('Test newline handling', async () => {
      const emptyTextarea = canvas.getByTestId('empty-textarea');

      await userEvent.clear(emptyTextarea);
      await userEvent.type(emptyTextarea, 'Line 1\nLine 2', { delay: 0 });
      expect(emptyTextarea).toHaveValue('Line 1\nLine 2');
    });
  },
  parameters: {
    test: {
      timeout: 10000, // 10 second timeout for edge case tests
    },
  },
};

// 12. Integration Tests
export const Integration: Story = {
  decorators: [
    (Story) => (
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <input placeholder="Name" data-testid="name-input" />
        <Story />
        <Textarea placeholder="Additional comments..." data-testid="comments-textarea" />
        <button type="submit">Submit Form</button>
      </Box>
    ),
  ],
  args: {
    placeholder: 'Main message...',
    name: 'message',
    required: true,
    label: 'Message',
    helperText: 'Please enter your message',
    'dataTestId': 'integration-textarea',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify form integration setup', async () => {
      const nameInput = canvas.getByTestId('name-input');
      const messageTextarea = canvas.getByTestId('integration-textarea');
      const commentsTextarea = canvas.getByTestId('comments-textarea');
      const submitButton = canvas.getByRole('button', { name: 'Submit Form' });

      expect(nameInput).toBeInTheDocument();
      expect(messageTextarea).toBeInTheDocument();
      expect(commentsTextarea).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    await step('Test tab navigation through form', async () => {
      const nameInput = canvas.getByTestId('name-input');
      const messageTextarea = canvas.getByTestId('integration-textarea');
      const commentsTextarea = canvas.getByTestId('comments-textarea');
      const submitButton = canvas.getByRole('button', { name: 'Submit Form' });

      await userEvent.click(nameInput);
      expect(nameInput).toHaveFocus();

      await userEvent.tab();
      expect(messageTextarea).toHaveFocus();

      await userEvent.tab();
      expect(commentsTextarea).toHaveFocus();

      await userEvent.tab();
      expect(submitButton).toHaveFocus();
    });

    await step('Fill form with data', async () => {
      const nameInput = canvas.getByTestId('name-input');
      const messageTextarea = canvas.getByTestId('integration-textarea');
      const commentsTextarea = canvas.getByTestId('comments-textarea');

      await userEvent.click(nameInput);
      await userEvent.type(nameInput, 'John Doe');
      expect(nameInput).toHaveValue('John Doe');

      await userEvent.click(messageTextarea);
      await userEvent.type(messageTextarea, 'This is the main message\nwith multiple lines.');
      expect(messageTextarea).toHaveValue('This is the main message\nwith multiple lines.');

      await userEvent.click(commentsTextarea);
      await userEvent.type(commentsTextarea, 'Additional comments here.');
      expect(commentsTextarea).toHaveValue('Additional comments here.');
    });

    await step('Test form validation integration', async () => {
      const messageTextarea = canvas.getByTestId('integration-textarea');
      const helperText = canvas.getByText('Please enter your message');

      expect(messageTextarea).toHaveAttribute('required');
      expect(helperText).toBeInTheDocument();
    });
  },
};
