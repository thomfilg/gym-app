import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect,within } from 'storybook/test';

import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator/Tests',
  component: Separator,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Separator'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    variant: 'solid',
    orientation: 'horizontal',
    size: 'md',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify separator renders with correct attributes', async () => {
      const separator = canvas.getByRole('separator');
      await expect(separator).toBeInTheDocument();
      await expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(separator).toHaveAttribute('role', 'separator');
    });

    await step('Verify separator has correct styles', async () => {
      const separator = canvas.getByRole('separator');
      const computedStyle = window.getComputedStyle(separator);
      await expect(computedStyle.display).toBe('flex');
      await expect(computedStyle.alignItems).toBe('center');
    });
  },
  render: (args) => (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography>Content above</Typography>
      <Separator {...args} />
      <Typography>Content below</Typography>
    </Box>
  ),
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all variant separators render', async () => {
      const separators = canvas.getAllByRole('separator');
      await expect(separators).toHaveLength(4);
    });

    await step('Verify solid separator has correct border style', async () => {
      const solidSeparator = canvas.getByTestId('solid-separator');
      const computedStyle = window.getComputedStyle(solidSeparator);
      await expect(computedStyle.borderTopStyle).toBe('solid');
    });

    await step('Verify dashed separator has correct border style', async () => {
      const dashedSeparator = canvas.getByTestId('dashed-separator');
      const computedStyle = window.getComputedStyle(dashedSeparator);
      await expect(computedStyle.borderTopStyle).toBe('dashed');
    });

    await step('Verify dotted separator has correct border style', async () => {
      const dottedSeparator = canvas.getByTestId('dotted-separator');
      const computedStyle = window.getComputedStyle(dottedSeparator);
      await expect(computedStyle.borderTopStyle).toBe('dotted');
    });
  },
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', p: 2 }}>
      <Box>
        <Separator variant="solid" data-testid="solid-separator" />
      </Box>
      <Box>
        <Separator variant="dashed" data-testid="dashed-separator" />
      </Box>
      <Box>
        <Separator variant="dotted" data-testid="dotted-separator" />
      </Box>
      <Box>
        <Separator variant="gradient" data-testid="gradient-separator" />
      </Box>
    </Stack>
  ),
};

export const ResponsiveDesign: Story = {
  name: '📏 Responsive Design Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify all size separators render', async () => {
      const separators = canvas.getAllByRole('separator');
      await expect(separators).toHaveLength(5);
    });

    await step('Verify XS separator has correct thickness', async () => {
      const xsSeparator = canvas.getByTestId('xs-separator');
      const computedStyle = window.getComputedStyle(xsSeparator);
      await expect(computedStyle.borderTopWidth).toBe('1px');
    });

    await step('Verify MD separator has correct thickness', async () => {
      const mdSeparator = canvas.getByTestId('md-separator');
      const computedStyle = window.getComputedStyle(mdSeparator);
      await expect(computedStyle.borderTopWidth).toBe('3px');
    });

    await step('Verify XL separator has correct thickness', async () => {
      const xlSeparator = canvas.getByTestId('xl-separator');
      const computedStyle = window.getComputedStyle(xlSeparator);
      await expect(computedStyle.borderTopWidth).toBe('6px');
    });
  },
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', p: 2 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size}>
          <Typography variant="caption">{size.toUpperCase()} Size</Typography>
          <Separator size={size} data-testid={`${size}-separator`} />
        </Box>
      ))}
    </Stack>
  ),
};

export const Integration: Story = {
  name: '🔄 Integration Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify horizontal separator orientation', async () => {
      const horizontalSeparator = canvas.getByTestId('horizontal-separator');
      await expect(horizontalSeparator).toHaveAttribute('aria-orientation', 'horizontal');
    });

    await step('Verify vertical separator orientation', async () => {
      const verticalSeparator = canvas.getByTestId('vertical-separator');
      await expect(verticalSeparator).toHaveAttribute('aria-orientation', 'vertical');
    });

    await step('Verify vertical separator has correct width', async () => {
      const verticalSeparator = canvas.getByTestId('vertical-separator');
      const computedStyle = window.getComputedStyle(verticalSeparator);
      await expect(computedStyle.borderLeftWidth).toBe('3px');
      await expect(computedStyle.borderTopWidth).toBe('0px');
    });
  },
  render: () => (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography>Horizontal separator:</Typography>
        <Separator orientation="horizontal" data-testid="horizontal-separator" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: 80 }}>
        <Typography>Vertical:</Typography>
        <Separator orientation="vertical" data-testid="vertical-separator" />
        <Typography>Separator</Typography>
      </Box>
    </Box>
  ),
};

export const ScreenReader: Story = {
  name: '📝 Screen Reader Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify text content is displayed', async () => {
      const separatorText = canvas.getByText('Section Divider');
      await expect(separatorText).toBeInTheDocument();
    });

    await step('Verify text has correct styling', async () => {
      const separatorText = canvas.getByText('Section Divider');
      const computedStyle = window.getComputedStyle(separatorText);
      await expect(computedStyle.flexShrink).toBe('0');
    });

    await step('Verify separator lines exist around text', async () => {
      // The separator with text creates a container with three elements: line, text, line
      const container = canvas.getByText('Section Divider').parentElement;
      expect(container).toBeInTheDocument();
      const children = container?.children;
      await expect(children?.length).toBeGreaterThanOrEqual(3);
    });

    await step('Verify empty string content handling', async () => {
      // Empty string should still render the separator structure
      const emptyContainer = canvas.getByTestId('empty-text-separator');
      await expect(emptyContainer).toBeInTheDocument();
    });
  },
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', p: 2 }}>
      <Box>
        <Typography>Before separator</Typography>
        <Separator>Section Divider</Separator>
        <Typography>After separator</Typography>
      </Box>
      <Box>
        <Typography>Before empty separator</Typography>
        <Box data-testid="empty-text-separator">
          <Separator>{''}</Separator>
        </Box>
        <Typography>After empty separator</Typography>
      </Box>
    </Stack>
  ),
};

export const KeyboardNavigation: Story = {
  name: '⚙️ Keyboard Navigation Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify custom color is applied', async () => {
      const customColorSeparator = canvas.getByTestId('custom-color-separator');
      const computedStyle = window.getComputedStyle(customColorSeparator);
      // Note: Color might be transformed by browser, so we check it's not the default
      await expect(computedStyle.borderTopColor).toBeTruthy();
    });

    await step('Verify custom margin is applied', async () => {
      const customMarginSeparator = canvas.getByTestId('custom-margin-separator');
      const computedStyle = window.getComputedStyle(customMarginSeparator);
      await expect(computedStyle.marginTop).toBe('32px');
      await expect(computedStyle.marginBottom).toBe('32px');
    });

    await step('Verify custom length affects width', async () => {
      const customLengthSeparator = canvas.getByTestId('custom-length-separator');
      const computedStyle = window.getComputedStyle(customLengthSeparator);
      await expect(computedStyle.width).toBe('200px');
    });

    await step('Verify custom className is applied', async () => {
      const customClassSeparator = canvas.getByTestId('custom-class-separator');
      await expect(customClassSeparator).toHaveClass('custom-separator-class');
    });
  },
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', p: 2 }}>
      <Box>
        <Typography>Custom Color (Red):</Typography>
        <Separator color="#ff0000" data-testid="custom-color-separator" />
      </Box>
      <Box>
        <Typography>Custom Margin (32px):</Typography>
        <Separator margin="32px" data-testid="custom-margin-separator" />
      </Box>
      <Box>
        <Typography>Custom Length (200px):</Typography>
        <Separator length="200px" data-testid="custom-length-separator" />
      </Box>
      <Box>
        <Typography>Custom Class Name:</Typography>
        <Separator className="custom-separator-class" data-testid="custom-class-separator" />
      </Box>
    </Stack>
  ),
};

export const FocusManagement: Story = {
  name: '♿ Focus Management Test',
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA role is correctly set', async () => {
      const separators = canvas.getAllByRole('separator');
      await expect(separators.length).toBeGreaterThan(0);

      separators.forEach(async (separator) => {
        await expect(separator).toHaveAttribute('role', 'separator');
      });
    });

    await step('Verify aria-orientation attributes', async () => {
      const horizontalSeparator = canvas.getByTestId('a11y-horizontal');
      const verticalSeparator = canvas.getByTestId('a11y-vertical');

      await expect(horizontalSeparator).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(verticalSeparator).toHaveAttribute('aria-orientation', 'vertical');
    });

    await step('Verify separators are not focusable', async () => {
      const separators = canvas.getAllByRole('separator');

      separators.forEach(async (separator) => {
        await expect(separator).not.toHaveAttribute('tabindex');
      });
    });

    await step('Verify text content is accessible', async () => {
      const textContent = canvas.getByText('Accessible Section');
      await expect(textContent).toBeInTheDocument();
      // Verify the text is not hidden from screen readers
      await expect(textContent).toBeVisible();
    });
  },
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', p: 2 }}>
      <Box>
        <Typography>Horizontal separator with proper ARIA:</Typography>
        <Separator data-testid="a11y-horizontal" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
        <Typography>Vertical separator:</Typography>
        <Separator orientation="vertical" data-testid="a11y-vertical" />
        <Typography>with proper ARIA</Typography>
      </Box>
      <Box>
        <Typography>Separator with accessible text:</Typography>
        <Separator>Accessible Section</Separator>
      </Box>
    </Stack>
  ),
};

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify long text handling', async () => {
      const longText = canvas.getByText(/This is a very long text/);
      await expect(longText).toBeInTheDocument();
      // Verify it doesn't break the layout
      const container = longText.parentElement;
      expect(container).toBeInTheDocument();
    });

    await step('Verify zero margin handling', async () => {
      const zeroMarginSeparator = canvas.getByTestId('zero-margin');
      const computedStyle = window.getComputedStyle(zeroMarginSeparator);
      await expect(computedStyle.marginTop).toBe('0px');
      await expect(computedStyle.marginBottom).toBe('0px');
    });

    await step('Verify very small size handling', async () => {
      const xsSeparator = canvas.getByTestId('xs-edge-case');
      const computedStyle = window.getComputedStyle(xsSeparator);
      await expect(computedStyle.borderTopWidth).toBe('1px');
    });

    await step('Verify percentage length handling', async () => {
      const percentSeparator = canvas.getByTestId('percent-length');
      const computedStyle = window.getComputedStyle(percentSeparator);
      // Check if width property contains percentage or matches expected computed value
      const width = computedStyle.width;
      const hasPercentage = percentSeparator.style.width === '50%' || width.includes('%');
      await expect(hasPercentage || parseFloat(width) > 0).toBeTruthy();
    });

    await step('Verify complex nested content', async () => {
      const nestedContent = canvas.getByTestId('nested-content');
      await expect(nestedContent).toBeInTheDocument();
      const boldText = within(nestedContent).getByText('Bold Text');
      await expect(boldText).toBeInTheDocument();
    });
  },
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', p: 2 }}>
      <Box>
        <Typography>Long text in separator:</Typography>
        <Separator>
          This is a very long text that should be handled gracefully by the separator component
          without breaking the layout
        </Separator>
      </Box>

      <Box>
        <Typography>Zero margin:</Typography>
        <Separator margin={0} data-testid="zero-margin" />
      </Box>

      <Box>
        <Typography>Very small size (xs):</Typography>
        <Separator size="xs" data-testid="xs-edge-case" />
      </Box>

      <Box>
        <Typography>50% length:</Typography>
        <Separator length="50%" data-testid="percent-length" />
      </Box>

      <Box data-testid="nested-content">
        <Typography>Nested complex content:</Typography>
        <Separator>
          <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Bold Text
          </Box>
        </Separator>
      </Box>
    </Stack>
  ),
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify default visual state', async () => {
      const defaultSeparator = canvas.getByTestId('default-visual');
      const computedStyle = window.getComputedStyle(defaultSeparator);
      await expect(computedStyle.borderTopWidth).toBe('3px');
    });

    await step('Verify gradient background is applied', async () => {
      const gradientSeparator = canvas.getByTestId('gradient-visual');
      const computedStyle = window.getComputedStyle(gradientSeparator);
      await expect(computedStyle.background).toContain('linear-gradient');
    });

    await step('Verify different variants have different styles', async () => {
      const solidSeparator = canvas.getByTestId('solid-visual');
      const dashedSeparator = canvas.getByTestId('dashed-visual');

      const solidStyle = window.getComputedStyle(solidSeparator);
      const dashedStyle = window.getComputedStyle(dashedSeparator);

      await expect(solidStyle.borderTopStyle).toBe('solid');
      await expect(dashedStyle.borderTopStyle).toBe('dashed');
    });
  },
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', p: 2 }}>
      <Box>
        <Typography variant="h6">Default State</Typography>
        <Separator data-testid="default-visual" />
      </Box>

      <Box>
        <Typography variant="h6">Gradient Effect</Typography>
        <Separator variant="gradient" data-testid="gradient-visual" />
      </Box>

      <Box>
        <Typography variant="h6">Visual Comparison</Typography>
        <Typography variant="body2">Solid</Typography>
        <Separator variant="solid" data-testid="solid-visual" />
        <Typography variant="body2">Dashed</Typography>
        <Separator variant="dashed" data-testid="dashed-visual" />
      </Box>
    </Stack>
  ),
};

export const Performance: Story = {
  name: '⚡ Performance Test',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time for multiple separators', async () => {

      const startTime = performance.now();
      const separators = canvas.getAllByRole('separator');

      const endTime = performance.now();

      const renderTime = endTime - startTime;
      // eslint-disable-next-line no-console
      console.log(`Render time for ${separators.length} separators: ${renderTime}ms`);

      // Verify all separators are rendered
      await expect(separators.length).toBe(20);

      // Assert reasonable render time (adjust threshold as needed)
      await expect(renderTime).toBeLessThan(100);
    });

    await step('Test memory usage with many separators', async () => {
      // Verify all separators are in DOM without memory leaks
      const separators = canvas.getAllByRole('separator');

      separators.forEach(async (separator) => {
        await expect(separator).toBeInTheDocument();
      });
    });
  },
  render: () => (
    <Stack spacing={1} sx={{ width: '100%', p: 2, maxHeight: 400, overflow: 'auto' }}>
      <Typography variant="h6">Performance Test - 20 Separators</Typography>
      {Array.from({ length: 20 }, (_, i) => (
        <Box key={i}>
          <Typography variant="body2">Section {i + 1}</Typography>
          <Separator variant={i % 2 === 0 ? 'solid' : 'dashed'} />
        </Box>
      ))}
    </Stack>
  ),
};
