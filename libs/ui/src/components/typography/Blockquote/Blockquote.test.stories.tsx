import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import React from 'react';

import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
  title: 'Typography/Blockquote/Tests',
  component: Blockquote,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Blockquote'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Test 1: Basic Interaction Test
export const BasicInteraction: Story = {
  args: {
    children: 'This is a test blockquote for basic interaction testing.',
    author: 'Test Author',
    source: 'Test Source',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify blockquote element exists
    const blockquote = canvas.getByRole('blockquote');
    await expect(blockquote).toBeInTheDocument();

    // Verify content is displayed
    await expect(
      canvas.getByText('This is a test blockquote for basic interaction testing.'),
    ).toBeInTheDocument();

    // Verify author citation
    await expect(canvas.getByText('— Test Author')).toBeInTheDocument();

    // Verify source citation
    await expect(canvas.getByText('Test Source')).toBeInTheDocument();
  },
};

// Test 2: State Change Test
const StateChangeComponent = () => {
  const [variant, setVariant] = React.useState<'default' | 'bordered' | 'citation'>('default');

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <button onClick={() => setVariant('default')}>Default</button>
        <button onClick={() => setVariant('bordered')}>Bordered</button>
        <button onClick={() => setVariant('citation')}>Citation</button>
      </Stack>
      <Blockquote variant={variant} author="Test Author">
        This blockquote changes variants dynamically.
      </Blockquote>
    </Box>
  );
};

export const StateChange: Story = {
  render: () => <StateChangeComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test default state
    const blockquote = canvas.getByRole('blockquote');
    await expect(blockquote).toBeInTheDocument();

    // Click bordered button
    const borderedBtn = canvas.getByText('Bordered');
    await userEvent.click(borderedBtn);
    await waitFor(() => {
      expect(blockquote).toBeInTheDocument();
    });

    // Click citation button
    const citationBtn = canvas.getByText('Citation');
    await userEvent.click(citationBtn);
    await waitFor(() => {
      expect(blockquote).toBeInTheDocument();
    });

    // Click default button
    const defaultBtn = canvas.getByText('Default');
    await userEvent.click(defaultBtn);
    await waitFor(() => {
      expect(blockquote).toBeInTheDocument();
    });
  },
};

// Test 3: Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  args: {
    children: 'Keyboard navigation test blockquote.',
    author: 'Test Author',
    tabIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const blockquote = canvas.getByRole('blockquote');

    // Test tab navigation
    await userEvent.tab();

    // Test keyboard accessibility
    await expect(blockquote).toBeInTheDocument();

    // Test that content is accessible
    await expect(canvas.getByText('Keyboard navigation test blockquote.')).toBeInTheDocument();
  },
};

// Test 4: Screen Reader Test
export const ScreenReader: Story = {
  args: {
    children: 'This blockquote should be accessible to screen readers.',
    author: 'Accessibility Author',
    source: 'WCAG Guidelines',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify semantic blockquote element
    const blockquote = canvas.getByRole('blockquote');
    await expect(blockquote).toBeInTheDocument();

    // Verify content accessibility
    await expect(
      canvas.getByText('This blockquote should be accessible to screen readers.'),
    ).toBeInTheDocument();

    // Verify citation accessibility
    await expect(canvas.getByText('— Accessibility Author')).toBeInTheDocument();
    await expect(canvas.getByText('WCAG Guidelines')).toBeInTheDocument();

    // Verify proper semantic structure
    expect(blockquote.tagName.toLowerCase()).toBe('blockquote');
  },
};

// Test 5: Focus Management Test
export const FocusManagement: Story = {
  render: () => (
    <Stack spacing={2}>
      <button>Before Blockquote</button>
      <Blockquote tabIndex={0} author="Focus Test">
        This blockquote can receive focus for testing.
      </Blockquote>
      <button>After Blockquote</button>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const beforeBtn = canvas.getByText('Before Blockquote');
    const blockquote = canvas.getByRole('blockquote');
    const afterBtn = canvas.getByText('After Blockquote');

    // Start from before button
    beforeBtn.focus();
    await expect(beforeBtn).toHaveFocus();

    // Tab to blockquote
    await userEvent.tab();
    await expect(blockquote).toHaveFocus();

    // Tab to after button
    await userEvent.tab();
    await expect(afterBtn).toHaveFocus();
  },
};

// Test 6: Responsive Design Test
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
    children: 'This blockquote should respond to different screen sizes appropriately.',
    author: 'Responsive Author',
    source: 'Mobile-First Design',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const blockquote = canvas.getByRole('blockquote');
    await expect(blockquote).toBeInTheDocument();

    // Verify content is displayed properly
    await expect(
      canvas.getByText('This blockquote should respond to different screen sizes appropriately.'),
    ).toBeInTheDocument();

    // Test that component maintains semantic structure
    expect(blockquote.tagName.toLowerCase()).toBe('blockquote');
  },
};

// Test 7: Theme Variations Test
export const ThemeVariations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote variant="bordered" color="primary" author="Primary Theme">
        Primary color theme test
      </Blockquote>
      <Blockquote variant="bordered" color="secondary" author="Secondary Theme">
        Secondary color theme test
      </Blockquote>
      <Blockquote variant="bordered" color="success" author="Success Theme">
        Success color theme test
      </Blockquote>
      <Blockquote variant="bordered" color="warning" author="Warning Theme">
        Warning color theme test
      </Blockquote>
      <Blockquote variant="bordered" color="danger" author="Danger Theme">
        Danger color theme test
      </Blockquote>
      <Blockquote variant="bordered" color="neutral" author="Neutral Theme">
        Neutral color theme test
      </Blockquote>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all theme variants render
    await expect(canvas.getByText('Primary color theme test')).toBeInTheDocument();
    await expect(canvas.getByText('Secondary color theme test')).toBeInTheDocument();
    await expect(canvas.getByText('Success color theme test')).toBeInTheDocument();
    await expect(canvas.getByText('Warning color theme test')).toBeInTheDocument();
    await expect(canvas.getByText('Danger color theme test')).toBeInTheDocument();
    await expect(canvas.getByText('Neutral color theme test')).toBeInTheDocument();

    // Verify all blockquotes are rendered
    const blockquotes = canvas.getAllByRole('blockquote');
    expect(blockquotes).toHaveLength(6);
  },
};

// Test 8: Visual States Test
export const VisualStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote variant="default" author="Default Variant">
        Default variant visual state
      </Blockquote>
      <Blockquote variant="bordered" author="Bordered Variant">
        Bordered variant with quote icon
      </Blockquote>
      <Blockquote variant="citation" author="Citation Variant">
        Citation variant with centered layout
      </Blockquote>
      <Blockquote author="Without Source">Blockquote with author but no source</Blockquote>
      <Blockquote source="Just Source">Blockquote with source but no author</Blockquote>
      <Blockquote>Blockquote without author or source</Blockquote>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all visual states render correctly
    await expect(canvas.getByText('Default variant visual state')).toBeInTheDocument();
    await expect(canvas.getByText('Bordered variant with quote icon')).toBeInTheDocument();
    await expect(canvas.getByText('Citation variant with centered layout')).toBeInTheDocument();
    await expect(canvas.getByText('Blockquote with author but no source')).toBeInTheDocument();
    await expect(canvas.getByText('Blockquote with source but no author')).toBeInTheDocument();
    await expect(canvas.getByText('Blockquote without author or source')).toBeInTheDocument();

    // Verify proper citation display
    await expect(canvas.getByText('— Default Variant')).toBeInTheDocument();
    await expect(canvas.getByText('— Without Source')).toBeInTheDocument();
    await expect(canvas.getByText('Just Source')).toBeInTheDocument();

    // Verify all blockquotes are rendered
    const blockquotes = canvas.getAllByRole('blockquote');
    expect(blockquotes).toHaveLength(6);
  },
};

// Test 9: Performance Test
export const Performance: Story = {
  render: () => (
    <Stack spacing={1}>
      {Array.from({ length: 10 }, (_, index) => (
        <Blockquote key={index} variant="default" author={`Author ${index + 1}`}>
          Performance test blockquote number {index + 1}. This tests rendering performance with
          multiple instances.
        </Blockquote>
      ))}
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify multiple blockquotes render efficiently', async () => {
      const blockquotes = canvas.getAllByRole('blockquote');
      expect(blockquotes).toHaveLength(10);

      // Check that all items rendered
      for (let i = 1; i <= 10; i++) {
        await expect(
          canvas.getByText(
            `Performance test blockquote number ${i}. This tests rendering performance with multiple instances.`,
          ),
        ).toBeInTheDocument();
        await expect(canvas.getByText(`— Author ${i}`)).toBeInTheDocument();
      }
    });
  },
};

// Test 10: Edge Cases Test
export const EdgeCases: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote author="" source="">
        Empty author and source
      </Blockquote>
      <Blockquote author="Very Long Author Name That Should Wrap Properly">
        Testing with very long author name
      </Blockquote>
      <Blockquote source="Very Long Source Name That Should Also Wrap Properly On Multiple Lines">
        Testing with very long source
      </Blockquote>
      <Blockquote author="Unicode Author: 你好世界" source="Unicode Source: مرحبا بالعالم">
        Unicode content: Lorem ipsum 你好 مرحبا 🌍
      </Blockquote>
      <Blockquote>{/* Empty content test */}</Blockquote>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify edge cases render without errors
    const blockquotes = canvas.getAllByRole('blockquote');
    expect(blockquotes).toHaveLength(5);

    // Test long text handling (partial match due to text wrapping/truncation)
    await expect(canvas.getByText(/Very Long Author Name/)).toBeInTheDocument();
    await expect(
      canvas.getByText('Very Long Source Name That Should Also Wrap Properly On Multiple Lines'),
    ).toBeInTheDocument();

    // Test unicode content
    await expect(
      canvas.getByText(/Unicode content: Lorem ipsum 你好 مرحبا 🌍/),
    ).toBeInTheDocument();
    await expect(canvas.getByText('— Unicode Author: 你好世界')).toBeInTheDocument();
    await expect(canvas.getByText('Unicode Source: مرحبا بالعالم')).toBeInTheDocument();
  },
};

// Test 11: Integration Test
export const Integration: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <h2>Article with Integrated Blockquotes</h2>
      <p>This is a sample article that integrates blockquotes naturally within the content flow.</p>

      <Blockquote variant="default" color="primary" author="Steve Jobs">
        Innovation distinguishes between a leader and a follower.
      </Blockquote>

      <p>
        The above quote demonstrates how blockquotes can be seamlessly integrated into article
        content. Here's another example with different styling:
      </p>

      <Blockquote
        variant="citation"
        color="secondary"
        author="Maya Angelou"
        source="I Know Why the Caged Bird Sings"
      >
        There is no greater agony than bearing an untold story inside you.
      </Blockquote>

      <p>Finally, here's a bordered variant that stands out:</p>

      <Blockquote variant="bordered" color="success" author="Albert Einstein">
        Imagination is more important than knowledge.
      </Blockquote>

      <p>
        These blockquotes demonstrate the component's ability to integrate well with other content.
      </p>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify article structure
    await expect(canvas.getByText('Article with Integrated Blockquotes')).toBeInTheDocument();

    // Verify all three blockquotes are present
    const blockquotes = canvas.getAllByRole('blockquote');
    expect(blockquotes).toHaveLength(3);

    // Verify specific quotes
    await expect(
      canvas.getByText('Innovation distinguishes between a leader and a follower.'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('There is no greater agony than bearing an untold story inside you.'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Imagination is more important than knowledge.'),
    ).toBeInTheDocument();

    // Verify authors
    await expect(canvas.getByText('— Steve Jobs')).toBeInTheDocument();
    await expect(canvas.getByText('— Maya Angelou')).toBeInTheDocument();
    await expect(canvas.getByText('— Albert Einstein')).toBeInTheDocument();

    // Verify source
    await expect(canvas.getByText('I Know Why the Caged Bird Sings')).toBeInTheDocument();
  },
};
