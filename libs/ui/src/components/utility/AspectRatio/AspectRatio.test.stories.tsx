import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Utility/AspectRatio/Tests',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:AspectRatio', 'checked'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for consistent test content
const TestContent = ({
  title,
  color = '#1976d2',
  testId,
}: {
  title: string;
  color?: string;
  testId?: string;
}) => (
  <Box
    data-testid={testId || 'test-content'}
    sx={{
      width: '100%',
      height: '100%',
      bgcolor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.2)',
    }}
  >
    {title}
  </Box>
);

// 1. Basic Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    variant: '16:9',
    maxWidth: 400,
  },
  render: (args) => (
    <Box
      data-testid="aspect-ratio-container"
      sx={{
        width: 500, // Fixed width instead of percentage
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 1,
        margin: 'auto',
      }}
    >
      <AspectRatio {...args} data-testid="aspect-ratio-component">
        <TestContent title="Interaction Test" testId="interaction-content" />
      </AspectRatio>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify component renders correctly', async () => {
      const container = canvas.getByTestId('aspect-ratio-container');
      const content = canvas.getByTestId('interaction-content');

      await expect(container).toBeInTheDocument();
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveTextContent('Interaction Test');
    });

    await step('Verify aspect ratio structure', async () => {
      const component = canvas.getByTestId('aspect-ratio-component');
      const computedStyle = window.getComputedStyle(component);

      await expect(computedStyle.position).toBe('relative');
      // Check that component has some width (not 0px) - it should inherit from container
      const width = parseInt(computedStyle.width);
      await expect(width).toBeGreaterThan(0);

      // Verify component has proper CSS structure for aspect ratio
      const childElements = component.children;
      await expect(childElements.length).toBeGreaterThan(0);
    });

    await step('Verify content is properly contained and interactive', async () => {
      const content = canvas.getByTestId('interaction-content');
      const contentStyle = window.getComputedStyle(content);

      // Verify content has proper styling for centering
      await expect(contentStyle.display).toBe('flex');
      await expect(contentStyle.alignItems).toBe('center');
      await expect(contentStyle.justifyContent).toBe('center');

      // Verify content is clickable/interactive
      await expect(content).toBeVisible();

      // Test basic interaction - hover
      await userEvent.hover(content);
      await expect(content).toHaveTextContent('Interaction Test');
    });

    await step('Verify aspect ratio dimensions', async () => {
      const component = canvas.getByTestId('aspect-ratio-component');
      const rect = component.getBoundingClientRect();

      // For 16:9 ratio, width should be approximately 1.78x height
      const aspectRatio = rect.width / rect.height;
      await expect(aspectRatio).toBeGreaterThan(1.6);
      await expect(aspectRatio).toBeLessThan(2.0);
    });
  },
};

// 2. Form Interaction Test (Not directly applicable but testing prop changes)
export const FormInteraction: Story = {
  name: '📝 Form Interaction Test',
  args: {
    variant: 'custom',
    ratio: 2.0,
    maxWidth: 300,
  },
  render: (args) => (
    <Box data-testid="form-container">
      <Typography variant="subtitle2" gutterBottom>
        Custom Ratio: {args.ratio}:1
      </Typography>
      <AspectRatio {...args} data-testid="form-aspect-ratio">
        <TestContent title={`${args.ratio}:1`} testId="form-content" />
      </AspectRatio>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify custom ratio renders', async () => {
      const content = canvas.getByTestId('form-content');
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveTextContent('2:1');
    });

    await step('Verify aspect ratio dimensions', async () => {
      const component = canvas.getByTestId('form-aspect-ratio');
      const rect = component.getBoundingClientRect();

      // For 2:1 ratio, width should be approximately 2x height
      const aspectRatio = rect.width / rect.height;
      await expect(aspectRatio).toBeGreaterThan(1.8);
      await expect(aspectRatio).toBeLessThan(2.2);
    });
  },
};

// 3. Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    variant: '1:1',
    maxWidth: 250,
  },
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  render: (args) => (
    <Box data-testid="keyboard-container">
      <AspectRatio {...args} data-testid="keyboard-aspect-ratio" tabIndex={0}>
        <TestContent title="Keyboard Test" testId="keyboard-content" />
      </AspectRatio>
      <button data-testid="next-focusable">Next Element</button>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify keyboard focus', async () => {
      const component = canvas.getByTestId('keyboard-aspect-ratio');

      // Focus the component
      component.focus();
      await expect(component).toHaveFocus();
    });

    await step('Tab navigation', async () => {
      const nextButton = canvas.getByTestId('next-focusable');

      // Tab to next element
      await userEvent.tab();
      await expect(nextButton).toHaveFocus();
    });
  },
};

// 4. Screen Reader Test
export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    variant: '4:3',
    maxWidth: 300,
    'aria-label': 'Content with 4:3 aspect ratio',
    role: 'img',
  },
  render: (args) => (
    <Box data-testid="screen-reader-container">
      <AspectRatio {...args} data-testid="screen-reader-component">
        <TestContent title="Screen Reader Test" testId="sr-content" />
        <Box id="description" sx={{ position: 'absolute', left: '-10000px' }}>
          Image with 4:3 aspect ratio containing test content
        </Box>
      </AspectRatio>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA attributes', async () => {
      const component = canvas.getByTestId('screen-reader-component');

      await expect(component).toHaveAttribute('aria-label', 'Content with 4:3 aspect ratio');
      await expect(component).toHaveAttribute('role', 'img');
    });

    await step('Verify content accessibility', async () => {
      const content = canvas.getByTestId('sr-content');
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveTextContent('Screen Reader Test');
    });
  },
};

// 5. Focus Management Test
export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  args: {
    variant: '3:2',
    maxWidth: 300,
  },
  render: (args) => (
    <Box data-testid="focus-container">
      <button data-testid="before-button">Before</button>
      <AspectRatio {...args} data-testid="focus-aspect-ratio" tabIndex={0}>
        <Box
          data-testid="focusable-content"
          tabIndex={0}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#388e3c',
            color: 'white',
            fontWeight: 'bold',
            outline: 'none',
            '&:focus': {
              boxShadow: 'inset 0 0 0 2px white',
            },
          }}
        >
          Focusable Content
        </Box>
      </AspectRatio>
      <button data-testid="after-button">After</button>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus management sequence', async () => {
      const beforeButton = canvas.getByTestId('before-button');
      const aspectRatio = canvas.getByTestId('focus-aspect-ratio');
      const focusableContent = canvas.getByTestId('focusable-content');
      const afterButton = canvas.getByTestId('after-button');

      // Start with first button
      beforeButton.focus();
      await expect(beforeButton).toHaveFocus();

      // Tab to aspect ratio container
      await userEvent.tab();
      await expect(aspectRatio).toHaveFocus();

      // Tab to focusable content inside
      await userEvent.tab();
      await expect(focusableContent).toHaveFocus();

      // Tab to after button
      await userEvent.tab();
      await expect(afterButton).toHaveFocus();
    });
  },
};

// 6. Responsive Design Test
export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    variant: '16:9',
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' }, type: 'mobile' },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
    },
    chromatic: {
      viewports: [375, 768, 1920],
      delay: 300,
    },
  },
  render: (args) => (
    <Box
      data-testid="responsive-container"
      sx={{ width: 600, maxWidth: '100%', padding: 2, margin: 'auto' }}
    >
      <AspectRatio {...args} data-testid="responsive-aspect-ratio">
        <TestContent title="Responsive 16:9" testId="responsive-content" />
      </AspectRatio>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify responsive behavior', async () => {
      // Wait for component to be fully rendered
      await waitFor(() => {
        const component = canvas.getByTestId('responsive-aspect-ratio');
        const rect = component.getBoundingClientRect();
        expect(rect.width).toBeGreaterThan(0);
        expect(rect.height).toBeGreaterThan(0);
      });

      const container = canvas.getByTestId('responsive-container');
      const component = canvas.getByTestId('responsive-aspect-ratio');

      const containerRect = container.getBoundingClientRect();
      const componentRect = component.getBoundingClientRect();

      // Component should be within container bounds
      await expect(componentRect.width).toBeLessThanOrEqual(containerRect.width);
      await expect(componentRect.width).toBeGreaterThan(0);
    });

    await step('Verify aspect ratio maintained', async () => {
      // Ensure component has dimensions before calculating aspect ratio
      await waitFor(() => {
        const component = canvas.getByTestId('responsive-aspect-ratio');
        const rect = component.getBoundingClientRect();
        expect(rect.width).toBeGreaterThan(0);
        expect(rect.height).toBeGreaterThan(0);
      });

      const component = canvas.getByTestId('responsive-aspect-ratio');
      const rect = component.getBoundingClientRect();

      // Only calculate aspect ratio if both dimensions are valid
      if (rect.width > 0 && rect.height > 0) {
        // 16:9 aspect ratio
        const aspectRatio = rect.width / rect.height;
        await expect(aspectRatio).toBeGreaterThan(1.6);
        await expect(aspectRatio).toBeLessThan(2.0);
      }
    });
  },
};

// 7. Theme Variations Test
export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  args: {
    variant: '1:1',
    maxWidth: 200,
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  render: (args) => (
    <Box data-testid="theme-container" sx={{ display: 'flex', gap: 2 }}>
      <Box data-testid="theme-light">
        <Typography variant="caption" display="block" gutterBottom>
          Light Theme
        </Typography>
        <AspectRatio {...args} data-testid="light-aspect-ratio">
          <TestContent title="Light" color="#2196f3" testId="light-content" />
        </AspectRatio>
      </Box>
      <Box data-testid="theme-dark">
        <Typography variant="caption" display="block" gutterBottom>
          Dark Theme
        </Typography>
        <AspectRatio {...args} data-testid="dark-aspect-ratio">
          <TestContent title="Dark" color="#424242" testId="dark-content" />
        </AspectRatio>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify both theme variants render', async () => {
      const lightContent = canvas.getByTestId('light-content');
      const darkContent = canvas.getByTestId('dark-content');

      await expect(lightContent).toBeInTheDocument();
      await expect(darkContent).toBeInTheDocument();
      await expect(lightContent).toHaveTextContent('Light');
      await expect(darkContent).toHaveTextContent('Dark');
    });

    await step('Verify theme-specific styling', async () => {
      const lightContent = canvas.getByTestId('light-content');
      const darkContent = canvas.getByTestId('dark-content');

      const lightStyle = window.getComputedStyle(lightContent);
      const darkStyle = window.getComputedStyle(darkContent);

      // Different background colors
      await expect(lightStyle.backgroundColor).toMatch(/rgb\(33, 150, 243\)/);
      await expect(darkStyle.backgroundColor).toMatch(/rgb\(66, 66, 66\)/);
    });
  },
};

// 8. Visual States Test
export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  args: {
    variant: '4:3',
    maxWidth: 250,
  },
  render: (args) => (
    <Box
      data-testid="visual-states-container"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box data-testid="default-state">
        <Typography variant="caption" gutterBottom>
          Default State
        </Typography>
        <AspectRatio {...args} data-testid="default-aspect-ratio">
          <TestContent title="Default" testId="default-content" />
        </AspectRatio>
      </Box>

      <Box data-testid="hover-state">
        <Typography variant="caption" gutterBottom>
          Hover State
        </Typography>
        <AspectRatio
          {...args}
          data-testid="hover-aspect-ratio"
          className="hover-aspect-ratio"
          sx={{
            transition: 'transform 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            '&.hover-active': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <TestContent title="Hover Me" testId="hover-content" />
        </AspectRatio>
      </Box>

      <Box data-testid="custom-styling">
        <Typography variant="caption" gutterBottom>
          Custom Styled
        </Typography>
        <AspectRatio
          {...args}
          data-testid="custom-aspect-ratio"
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 2,
          }}
        >
          <TestContent title="Custom" color="#9c27b0" testId="custom-content" />
        </AspectRatio>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify default state', async () => {
      const defaultContent = canvas.getByTestId('default-content');
      await expect(defaultContent).toBeInTheDocument();
      await expect(defaultContent).toHaveTextContent('Default');
    });

    await step('Test hover interaction', async () => {
      const hoverComponent = canvas.getByTestId('hover-aspect-ratio');
      const hoverContent = canvas.getByTestId('hover-content');

      await expect(hoverContent).toHaveTextContent('Hover Me');

      // Get initial transform state
      const initialStyle = window.getComputedStyle(hoverComponent);
      const initialTransform = initialStyle.transform || 'none';

      // Simulate hover by adding the hover-active class
      hoverComponent.classList.add('hover-active');

      // Wait a bit for the styles to apply
      await new Promise((resolve) => window.setTimeout(resolve, 100));

      // Check if hover styles are applied (transform should change)
      await waitFor(
        () => {
          const style = window.getComputedStyle(hoverComponent);
          const currentTransform = style.transform || 'none';

          // The transform should be a matrix (for scale) and different from initial
          const isTransformed =
            currentTransform !== 'none' && currentTransform !== initialTransform;
          expect(isTransformed).toBe(true);
        },
        { timeout: 1000 },
      );

      // Clean up - remove the hover class
      hoverComponent.classList.remove('hover-active');
    });

    await step('Verify custom styling', async () => {
      const customComponent = canvas.getByTestId('custom-aspect-ratio');
      const customContent = canvas.getByTestId('custom-content');

      await expect(customContent).toHaveTextContent('Custom');

      const style = window.getComputedStyle(customComponent);
      await expect(style.borderRadius).not.toBe('0px');
    });
  },
};

// 9. Performance Test
export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  args: {
    variant: '1:1',
    maxWidth: 100,
  },
  render: (args) => (
    <Box
      data-testid="performance-container"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 1,
        width: 520, // Fixed width to ensure grid columns work properly
        margin: 'auto',
      }}
    >
      {Array.from({ length: 25 }, (_, i) => (
        <AspectRatio key={i} {...args} data-testid={`perf-item-${i}`}>
          <TestContent
            title={`${i + 1}`}
            color={`hsl(${(i * 14) % 360}, 70%, 50%)`}
            testId={`perf-content-${i}`}
          />
        </AspectRatio>
      ))}
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render performance', async () => {
      const startTime = window.performance.now();

      // Verify all items are rendered
      for (let i = 0; i < 25; i++) {
        const item = canvas.getByTestId(`perf-content-${i}`);
        await expect(item).toBeInTheDocument();
        await expect(item).toHaveTextContent((i + 1).toString());
      }

      const endTime = window.performance.now();
      const renderTime = endTime - startTime;

      // Log performance info (removed console.log to fix lint)
      // Performance Test: Rendered 25 AspectRatio components in ${renderTime}ms

      // Reasonable render time threshold
      await expect(renderTime).toBeLessThan(2000);
    });

    await step('Verify layout stability', async () => {
      const container = canvas.getByTestId('performance-container');
      const containerStyle = window.getComputedStyle(container);

      await expect(containerStyle.display).toBe('grid');

      // Check that grid is properly applied - should have 5 columns
      // The computed style might show actual pixel values instead of repeat(5, 1fr)
      // So we check that grid items are arranged properly
      const firstItem = canvas.getByTestId('perf-item-0');
      const sixthItem = canvas.getByTestId('perf-item-5'); // First item of second row

      const firstRect = firstItem.getBoundingClientRect();
      const sixthRect = sixthItem.getBoundingClientRect();

      // Sixth item should be in the second row (below the first item)
      await expect(sixthRect.top).toBeGreaterThan(firstRect.bottom);
      // But should be aligned with the first column
      await expect(Math.abs(sixthRect.left - firstRect.left)).toBeLessThan(2);
    });
  },
};

// 10. Edge Cases Test
export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  args: {
    variant: 'custom',
  },
  render: (args) => (
    <Box
      data-testid="edge-cases-container"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {/* Extreme ratios */}
      <Box data-testid="extreme-wide">
        <Typography variant="caption" gutterBottom>
          Extreme Wide (10:1)
        </Typography>
        <AspectRatio {...args} ratio={10} maxWidth={400} data-testid="extreme-wide-ratio">
          <TestContent title="10:1 Wide" testId="extreme-wide-content" />
        </AspectRatio>
      </Box>

      <Box data-testid="extreme-tall">
        <Typography variant="caption" gutterBottom>
          Extreme Tall (1:10)
        </Typography>
        <AspectRatio {...args} ratio={0.1} maxWidth={100} data-testid="extreme-tall-ratio">
          <TestContent title="1:10 Tall" testId="extreme-tall-content" />
        </AspectRatio>
      </Box>

      {/* Empty content */}
      <Box data-testid="empty-content">
        <Typography variant="caption" gutterBottom>
          Empty Content
        </Typography>
        <AspectRatio variant="1:1" maxWidth={200} data-testid="empty-ratio">
          {null}
        </AspectRatio>
      </Box>

      {/* Maximum dimensions */}
      <Box data-testid="max-dimensions">
        <Typography variant="caption" gutterBottom>
          With maxWidth and maxHeight
        </Typography>
        <AspectRatio variant="1:1" maxWidth={150} maxHeight={150} data-testid="max-dim-ratio">
          <TestContent title="Max Dims" testId="max-dim-content" />
        </AspectRatio>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test extreme wide ratio', async () => {
      const wideContent = canvas.getByTestId('extreme-wide-content');
      const wideRatio = canvas.getByTestId('extreme-wide-ratio');

      await expect(wideContent).toBeInTheDocument();
      await expect(wideContent).toHaveTextContent('10:1 Wide');

      const rect = wideRatio.getBoundingClientRect();
      const aspectRatio = rect.width / rect.height;
      await expect(aspectRatio).toBeGreaterThan(8);
    });

    await step('Test extreme tall ratio', async () => {
      const tallContent = canvas.getByTestId('extreme-tall-content');
      const tallRatio = canvas.getByTestId('extreme-tall-ratio');

      await expect(tallContent).toBeInTheDocument();
      await expect(tallContent).toHaveTextContent('1:10 Tall');

      const rect = tallRatio.getBoundingClientRect();
      const aspectRatio = rect.width / rect.height;
      await expect(aspectRatio).toBeLessThan(0.2);
    });

    await step('Test empty content', async () => {
      const emptyRatio = canvas.getByTestId('empty-ratio');
      await expect(emptyRatio).toBeInTheDocument();

      // Should still maintain structure
      const rect = emptyRatio.getBoundingClientRect();
      await expect(rect.width).toBeGreaterThan(0);
      await expect(rect.height).toBeGreaterThan(0);
    });

    await step('Test max dimensions', async () => {
      const maxDimContent = canvas.getByTestId('max-dim-content');
      const maxDimRatio = canvas.getByTestId('max-dim-ratio');

      await expect(maxDimContent).toBeInTheDocument();

      const rect = maxDimRatio.getBoundingClientRect();
      await expect(rect.width).toBeLessThanOrEqual(150);
      await expect(rect.height).toBeLessThanOrEqual(150);
    });
  },
};

// 11. Integration Test
export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  args: {
    variant: '16:9',
    maxWidth: 300,
  },
  render: (args) => (
    <Box
      data-testid="integration-container"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        AspectRatio Integration
      </Typography>

      {/* Integration with MUI Card */}
      <Box data-testid="card-integration" sx={{ maxWidth: 300 }}>
        <Box sx={{ border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
          <AspectRatio {...args} data-testid="card-aspect-ratio">
            <Box
              data-testid="card-image"
              sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Card Header Image
            </Box>
          </AspectRatio>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card uses AspectRatio for the header image.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Integration with Grid Layout */}
      <Box data-testid="grid-integration">
        <Typography variant="subtitle2" gutterBottom>
          Grid Integration
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
          {['A', 'B', 'C', 'D'].map((letter, index) => (
            <AspectRatio
              key={letter}
              variant="1:1"
              data-testid={`grid-item-${letter.toLowerCase()}`}
            >
              <TestContent
                title={`Grid ${letter}`}
                color={`hsl(${index * 90}, 60%, 50%)`}
                testId={`grid-content-${letter.toLowerCase()}`}
              />
            </AspectRatio>
          ))}
        </Box>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test card integration', async () => {
      const cardImage = canvas.getByTestId('card-image');
      const cardRatio = canvas.getByTestId('card-aspect-ratio');

      await expect(cardImage).toBeInTheDocument();
      await expect(cardImage).toHaveTextContent('Card Header Image');

      // Verify aspect ratio is maintained within card
      const rect = cardRatio.getBoundingClientRect();
      const aspectRatio = rect.width / rect.height;
      await expect(aspectRatio).toBeGreaterThan(1.6);
      await expect(aspectRatio).toBeLessThan(2.0);
    });

    await step('Test grid integration', async () => {
      const gridItems = ['a', 'b', 'c', 'd'];

      for (const item of gridItems) {
        const gridContent = canvas.getByTestId(`grid-content-${item}`);
        await expect(gridContent).toBeInTheDocument();
        await expect(gridContent).toHaveTextContent(`Grid ${item.toUpperCase()}`);
      }
    });

    await step('Verify grid layout properties', async () => {
      // All grid items should have similar square dimensions (1:1 ratio)
      for (const item of ['a', 'b', 'c', 'd']) {
        const gridItem = canvas.getByTestId(`grid-item-${item}`);
        const rect = gridItem.getBoundingClientRect();
        const aspectRatio = rect.width / rect.height;

        await expect(aspectRatio).toBeGreaterThan(0.9);
        await expect(aspectRatio).toBeLessThan(1.1);
      }
    });
  },
};
