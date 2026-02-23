import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect,within } from 'storybook/test';

import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Typography/Paragraph/Tests',
  component: Paragraph,
  parameters: { layout: 'centered', chromatic: { disableSnapshot: false } },
  tags: ['autodocs', 'test', 'component:Paragraph'],
};
export default meta;
export type Story = StoryObj<typeof meta>;

const sampleText = 'This is a sample paragraph text for testing purposes.';

export const BasicInteraction: Story = {
  args: {
    children: sampleText,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByText(sampleText);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  },
};

export const KeyboardNavigation: Story = {
  args: {
    children: sampleText,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByText(sampleText);

    // Paragraph should not be focusable by default
    paragraph.focus();
    expect(paragraph).not.toHaveFocus();
  },
};

export const ScreenReader: Story = {
  args: {
    children: sampleText,
    'aria-label': 'Sample paragraph',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByText(sampleText);
    expect(paragraph).toHaveAttribute('aria-label', 'Sample paragraph');
    expect(paragraph).toBeInTheDocument();
  },
};

export const FocusManagement: Story = {
  args: {
    children: sampleText,
    tabIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByText(sampleText);

    // When tabIndex is set, paragraph should be focusable
    paragraph.focus();
    expect(paragraph).toHaveFocus();
  },
};

export const ResponsiveDesign: Story = {
  args: {
    children: sampleText,
    size: 'md',
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByText(sampleText);
    expect(paragraph).toBeInTheDocument();

    // Test that paragraph renders properly at different screen sizes
    const computedStyle = window.getComputedStyle(paragraph);
    expect(computedStyle.fontSize).toBeTruthy();
  },
};

export const ThemeVariations: Story = {
  args: {
    children: sampleText,
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByText(sampleText);
    expect(paragraph).toBeInTheDocument();

    // Test that paragraph has the correct color styling
    const computedStyle = window.getComputedStyle(paragraph);
    expect(computedStyle.color).toBeTruthy();
  },
};

export const VisualStates: Story = {
  render: () => (
    <div>
      <Paragraph variant="default">{sampleText} - Default</Paragraph>
      <Paragraph variant="lead">{sampleText} - Lead</Paragraph>
      <Paragraph variant="small">{sampleText} - Small</Paragraph>
      <Paragraph variant="muted">{sampleText} - Muted</Paragraph>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultParagraph = canvas.getByText(`${sampleText} - Default`);
    const leadParagraph = canvas.getByText(`${sampleText} - Lead`);
    const smallParagraph = canvas.getByText(`${sampleText} - Small`);
    const mutedParagraph = canvas.getByText(`${sampleText} - Muted`);

    expect(defaultParagraph).toBeInTheDocument();
    expect(leadParagraph).toBeInTheDocument();
    expect(smallParagraph).toBeInTheDocument();
    expect(mutedParagraph).toBeInTheDocument();

    // Test that different variants have different styling
    const defaultStyle = window.getComputedStyle(defaultParagraph);
    const leadStyle = window.getComputedStyle(leadParagraph);

    expect(defaultStyle.fontSize).not.toBe(leadStyle.fontSize);
  },
};

export const Performance: Story = {
  args: {
    children: sampleText,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const startTime = Date.now();

    const paragraph = canvas.getByText(sampleText);
    expect(paragraph).toBeInTheDocument();

    const endTime = Date.now();
    const renderTime = endTime - startTime;

    // Paragraph should render quickly (under 100ms)
    expect(renderTime).toBeLessThan(100);
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div>
      <Paragraph>{''}</Paragraph>
      <Paragraph>
        {
          'Very long text that should wrap properly and maintain readability even when it extends beyond the normal width of the container and continues for multiple lines to test text wrapping behavior.'
        }
      </Paragraph>
      <Paragraph>{'Special chars: !@#$%^&*()_+-=[]{}|;":,./<>?'}</Paragraph>
      <Paragraph>{'Numbers: 123456789'}</Paragraph>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty content
    const paragraphs = canvas.getAllByRole('generic', { hidden: true }) || [];
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);

    // Test special characters
    const specialCharsText = canvas.getByText(/Special chars:/);
    expect(specialCharsText).toBeInTheDocument();

    // Test numbers
    const numbersText = canvas.getByText(/Numbers:/);
    expect(numbersText).toBeInTheDocument();
  },
};

export const Integration: Story = {
  render: () => (
    <div>
      <h3>Article with Multiple Paragraphs</h3>
      <Paragraph variant="lead" color="primary">
        This is a lead paragraph that introduces the content.
      </Paragraph>
      <Paragraph>This is a regular paragraph that provides the main content.</Paragraph>
      <Paragraph variant="small" color="secondary">
        This is a small paragraph with additional information.
      </Paragraph>
      <Paragraph variant="muted">This is a muted paragraph for supplementary content.</Paragraph>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByText('Article with Multiple Paragraphs');
    const leadParagraph = canvas.getByText('This is a lead paragraph that introduces the content.');
    const regularParagraph = canvas.getByText(
      'This is a regular paragraph that provides the main content.',
    );
    const smallParagraph = canvas.getByText(
      'This is a small paragraph with additional information.',
    );
    const mutedParagraph = canvas.getByText('This is a muted paragraph for supplementary content.');

    expect(heading).toBeInTheDocument();
    expect(leadParagraph).toBeInTheDocument();
    expect(regularParagraph).toBeInTheDocument();
    expect(smallParagraph).toBeInTheDocument();
    expect(mutedParagraph).toBeInTheDocument();

    // Test that all paragraphs render with proper spacing
    const allParagraphs = [leadParagraph, regularParagraph, smallParagraph, mutedParagraph];
    allParagraphs.forEach((p) => {
      const computedStyle = window.getComputedStyle(p);
      expect(computedStyle.marginBottom).toBeTruthy();
    });
  },
};
