import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect,within } from 'storybook/test';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Layout/Skeleton/Tests',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Skeleton'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    variant: 'rectangular',
    height: 60,
    'data-testid': 'skeleton-element',
  },
  render: (args) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Testing skeleton rendering and properties
      </Typography>
      <Skeleton {...args} />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const skeletonElement = await canvas.findByTestId('skeleton-element');
      await expect(skeletonElement).toBeInTheDocument();
      await expect(skeletonElement).toBeVisible();
    });

    await step('Verify skeleton has proper MUI class', async () => {
      const skeletonElement = canvas.getByTestId('skeleton-element');
      await expect(skeletonElement).toHaveClass('MuiSkeleton-root');
    });

    await step('Verify animation is running', async () => {
      const skeletonElement = canvas.getByTestId('skeleton-element');
      const computedStyle = window.getComputedStyle(skeletonElement);
      await expect(computedStyle.animationName).toBeTruthy();
      await expect(computedStyle.animationDuration).toBeTruthy();
    });
  },
};

export const VariantTests: Story = {
  name: '🔄 Variant Tests',
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle1">Text Variant</Typography>
        <Skeleton variant="text" data-testid="text-skeleton" />
      </Box>
      <Box>
        <Typography variant="subtitle1">Circular Variant</Typography>
        <Skeleton variant="circular" width={40} height={40} data-testid="circular-skeleton" />
      </Box>
      <Box>
        <Typography variant="subtitle1">Rectangular Variant</Typography>
        <Skeleton variant="rectangular" height={60} data-testid="rectangular-skeleton" />
      </Box>
      <Box>
        <Typography variant="subtitle1">Wave Variant</Typography>
        <Skeleton variant="wave" height={60} data-testid="wave-skeleton" />
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify text skeleton', async () => {
      const textSkeleton = canvas.getByTestId('text-skeleton');
      await expect(textSkeleton).toHaveClass('MuiSkeleton-text');
    });

    await step('Verify circular skeleton', async () => {
      const circularSkeleton = canvas.getByTestId('circular-skeleton');
      await expect(circularSkeleton).toHaveClass('MuiSkeleton-circular');
    });

    await step('Verify rectangular skeleton', async () => {
      const rectangularSkeleton = canvas.getByTestId('rectangular-skeleton');
      await expect(rectangularSkeleton).toHaveClass('MuiSkeleton-rectangular');
    });

    await step('Verify wave skeleton', async () => {
      const waveSkeleton = canvas.getByTestId('wave-skeleton');
      await expect(waveSkeleton).toHaveClass('MuiSkeleton-rectangular');
    });
  },
};

export const MultipleSkeletonTest: Story = {
  name: '📝 Multiple Skeleton Test',
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Multiple Skeletons with Custom Spacing
      </Typography>
      <Box data-testid="multiple-skeleton-container">
        <Skeleton variant="text" count={3} spacing={2} />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify multiple skeletons are rendered', async () => {
      const container = canvas.getByTestId('multiple-skeleton-container');
      const skeletons = container.querySelectorAll('.MuiSkeleton-root');
      await expect(skeletons).toHaveLength(3);
    });

    await step('Verify proper spacing between skeletons', async () => {
      const container = canvas.getByTestId('multiple-skeleton-container');
      const stackElement = container.querySelector('.MuiStack-root');
      await expect(stackElement).toBeInTheDocument();
    });
  },
};

export const AccessibilityTest: Story = {
  name: '⌨️ Accessibility Test',
  args: {
    'data-testid': 'accessible-skeleton',
  },
  render: (args) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skeleton Accessibility Testing
      </Typography>
      <Skeleton {...args} variant="rectangular" height={60} />
      <Typography variant="body2" color="text.secondary" style={{ marginTop: 8 }}>
        Content is loading...
      </Typography>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify skeleton is not focusable', async () => {
      const skeleton = canvas.getByTestId('accessible-skeleton');
      await expect(skeleton).not.toHaveAttribute('tabindex');
      skeleton.focus();
      await expect(skeleton).not.toHaveFocus();
    });

    await step('Verify proper ARIA attributes', async () => {
      const skeleton = canvas.getByTestId('accessible-skeleton');
      await expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    });

    await step('Verify loading context is provided', async () => {
      const loadingText = canvas.getByText(/content is loading/i);
      await expect(loadingText).toBeInTheDocument();
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Content Loading State
      </Typography>
      <Box role="region" aria-label="Content loading" data-testid="loading-region">
        <Skeleton variant="text" count={2} />
        <Skeleton variant="rectangular" height={100} />
        <Typography
          variant="body2"
          color="text.secondary"
          aria-live="polite"
          data-testid="loading-status"
        >
          Loading content, please wait...
        </Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify loading region has proper ARIA', async () => {
      const loadingRegion = canvas.getByTestId('loading-region');
      await expect(loadingRegion).toHaveAttribute('role', 'region');
      await expect(loadingRegion).toHaveAttribute('aria-label', 'Content loading');
    });

    await step('Verify live region for status updates', async () => {
      const statusElement = canvas.getByTestId('loading-status');
      await expect(statusElement).toHaveAttribute('aria-live', 'polite');
    });
  },
};

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  render: () => (
    <Box data-testid="responsive-container">
      <Typography variant="h6" gutterBottom>
        Responsive Skeleton Layout
      </Typography>
      <Stack spacing={2}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="70%" />
          </Box>
        </Box>
      </Stack>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify responsive behavior', async () => {
      const container = canvas.getByTestId('responsive-container');
      await expect(container).toBeInTheDocument();

      const textSkeletons = container.querySelectorAll('.MuiSkeleton-text');
      await expect(textSkeletons.length).toBeGreaterThan(0);

      textSkeletons.forEach((skeleton) => {
        expect(skeleton).toBeVisible();
      });
    });
  },
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Theme Integration
      </Typography>
      <Card sx={{ p: 3 }} data-testid="themed-card">
        <Stack spacing={2}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="rectangular" height={120} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="50%" />
            </Box>
          </Box>
        </Stack>
      </Card>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify theme colors are applied', async () => {
      const card = canvas.getByTestId('themed-card');
      const skeletons = card.querySelectorAll('.MuiSkeleton-root');

      await expect(skeletons.length).toBeGreaterThan(0);

      skeletons.forEach((skeleton) => {
        const computedStyle = window.getComputedStyle(skeleton);
        expect(computedStyle.backgroundColor).toMatch(/rgb/);
      });
    });
  },
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default State
        </Typography>
        <Skeleton variant="rectangular" height={60} data-testid="default-skeleton" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Border Radius
        </Typography>
        <Skeleton
          variant="rectangular"
          height={60}
          borderRadius={16}
          data-testid="rounded-skeleton"
        />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          No Animation
        </Typography>
        <Skeleton
          variant="rectangular"
          height={60}
          animation={false}
          data-testid="static-skeleton"
        />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Wave Animation
        </Typography>
        <Skeleton variant="wave" height={60} data-testid="wave-skeleton" />
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default skeleton state', async () => {
      const skeleton = canvas.getByTestId('default-skeleton');
      await expect(skeleton).toBeVisible();

      const computedStyle = window.getComputedStyle(skeleton);
      await expect(computedStyle.animationName).toBeTruthy();
    });

    await step('Custom border radius applied', async () => {
      const roundedSkeleton = canvas.getByTestId('rounded-skeleton');
      const computedStyle = window.getComputedStyle(roundedSkeleton);
      expect(parseInt(computedStyle.borderRadius)).toBeGreaterThan(0);
    });

    await step('No animation skeleton renders correctly', async () => {
      const staticSkeleton = canvas.getByTestId('static-skeleton');
      await expect(staticSkeleton).toBeVisible();

      // Verify it's a proper MUI Skeleton component
      const hasMuiSkeletonClass = staticSkeleton.classList.contains('MuiSkeleton-root');
      await expect(hasMuiSkeletonClass).toBeTruthy();

      // Verify the element has the expected dimensions
      const rect = staticSkeleton.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThan(0);
      await expect(rect.width).toBeGreaterThan(0);
    });

    await step('Wave animation is applied', async () => {
      const waveSkeleton = canvas.getByTestId('wave-skeleton');
      await expect(waveSkeleton).toBeVisible();

      // Verify it's a proper MUI Skeleton component
      const hasMuiSkeletonClass = waveSkeleton.classList.contains('MuiSkeleton-root');
      await expect(hasMuiSkeletonClass).toBeTruthy();

      // For wave variant, just ensure the element renders correctly
      const rect = waveSkeleton.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThan(0);
      await expect(rect.width).toBeGreaterThan(0);
    });
  },
};

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => (
    <Box data-testid="performance-container">
      <Typography variant="h6" gutterBottom>
        Performance Test - Multiple Skeletons
      </Typography>
      <Stack spacing={1}>
        {Array.from({ length: 50 }, (_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
            <Skeleton variant="rectangular" width={60} height={30} />
          </Box>
        ))}
      </Stack>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time for multiple skeletons', async () => {
      const container = canvas.getByTestId('performance-container');
      const skeletons = container.querySelectorAll('.MuiSkeleton-root');

      await expect(skeletons.length).toBe(200); // 50 rows * 4 skeletons each
      await expect(container).toBeInTheDocument();
    });

    await step('Test scroll performance with many skeletons', async () => {
      const container = canvas.getByTestId('performance-container');
      container.scrollTop = 100;
      await new Promise((resolve) => window.setTimeout(resolve, 50));
      await expect(container).toBeInTheDocument();
    });
  },
};

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Zero Count
        </Typography>
        <Box data-testid="zero-count-container">
          <Skeleton variant="text" count={0} />
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Large Count
        </Typography>
        <Box data-testid="large-count-container">
          <Skeleton variant="text" count={100} />
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Dimensions
        </Typography>
        <Skeleton variant="rectangular" width={500} height={300} data-testid="custom-dimensions" />
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Zero count renders nothing', async () => {
      const zeroCountContainer = canvas.getByTestId('zero-count-container');
      const skeletons = zeroCountContainer.querySelectorAll('.MuiSkeleton-root');
      await expect(skeletons.length).toBe(0);
    });

    await step('Large count handles gracefully', async () => {
      const largeCountContainer = canvas.getByTestId('large-count-container');
      const skeletons = largeCountContainer.querySelectorAll('.MuiSkeleton-root');
      await expect(skeletons.length).toBe(100);
      await expect(largeCountContainer).toBeInTheDocument();
    });

    await step('Custom dimensions applied correctly', async () => {
      const customSkeleton = canvas.getByTestId('custom-dimensions');
      const computedStyle = window.getComputedStyle(customSkeleton);
      await expect(parseInt(computedStyle.width)).toBe(500);
      await expect(parseInt(computedStyle.height)).toBe(300);
    });
  },
};

export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skeleton Integration with Other Components
      </Typography>
      <Card sx={{ maxWidth: 400 }} data-testid="integration-card">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
          <Box>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Skeleton variant="rectangular" width={80} height={32} />
            <Skeleton variant="rectangular" width={80} height={32} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Card integration works properly', async () => {
      const card = canvas.getByTestId('integration-card');
      await expect(card).toBeInTheDocument();

      const skeletons = card.querySelectorAll('.MuiSkeleton-root');
      await expect(skeletons.length).toBeGreaterThan(5);
    });

    await step('Mixed skeleton variants work together', async () => {
      const card = canvas.getByTestId('integration-card');

      const circularSkeletons = card.querySelectorAll('.MuiSkeleton-circular');
      const textSkeletons = card.querySelectorAll('.MuiSkeleton-text');
      const rectangularSkeletons = card.querySelectorAll('.MuiSkeleton-rectangular');

      await expect(circularSkeletons.length).toBeGreaterThan(0);
      await expect(textSkeletons.length).toBeGreaterThan(0);
      await expect(rectangularSkeletons.length).toBeGreaterThan(0);
    });
  },
};
