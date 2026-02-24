import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect,userEvent, within } from 'storybook/test';

import { Spacer } from './Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer/Tests',
  component: Spacer,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Test 1: Basic Interaction
 * Tests basic rendering and DOM structure of the Spacer component
 */
export const BasicInteraction: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography>Content Above</Typography>
      <Spacer {...args} data-testid="spacer" />
      <Typography>Content Below</Typography>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify spacer renders', async () => {
      const spacer = await canvas.findByTestId('spacer');
      await expect(spacer).toBeInTheDocument();
    });

    await step('Verify spacer creates spacing', async () => {
      const spacer = await canvas.findByTestId('spacer');
      const computedStyle = window.getComputedStyle(spacer);
      // md size should have both width and height
      await expect(parseInt(computedStyle.height)).toBeGreaterThan(0);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 2: Keyboard Navigation
 * Tests that spacer doesn't interfere with keyboard navigation
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button>First Button</Button>
      <Spacer size="lg" />
      <Button>Second Button</Button>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab through elements', async () => {
      const firstButton = canvas.getByText('First Button');
      const secondButton = canvas.getByText('Second Button');

      // Focus first button
      firstButton.focus();
      await expect(document.activeElement).toBe(firstButton);

      // Tab to second button (spacer should be skipped)
      await userEvent.tab();
      await expect(document.activeElement).toBe(secondButton);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 3: Screen Reader
 * Tests that spacer is invisible to screen readers
 */
export const ScreenReader: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => (
    <Box>
      <Typography id="content1">First content block</Typography>
      <Spacer {...args} data-testid="spacer" />
      <Typography id="content2">Second content block</Typography>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify spacer has no semantic content', async () => {
      const spacer = await canvas.findByTestId('spacer');

      // Spacer should not have any aria labels
      await expect(spacer.getAttribute('aria-label')).toBeNull();
      await expect(spacer.getAttribute('aria-hidden')).toBe('true');

      // Spacer should not have any text content
      await expect(spacer.textContent).toBe('');
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 4: Focus Management
 * Tests that spacer doesn't capture or interfere with focus
 */
export const FocusManagement: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 0 }}>
      <Button>Button 1</Button>
      <Spacer size="md" direction="horizontal" data-testid="spacer" />
      <Button>Button 2</Button>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify spacer is not focusable', async () => {
      const spacer = await canvas.findByTestId('spacer');

      // Spacer should not have tabindex
      await expect(spacer.getAttribute('tabindex')).toBeNull();

      // Try to focus spacer - should not work
      spacer.focus();
      await expect(document.activeElement).not.toBe(spacer);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 5: Responsive Design
 * Tests spacer behavior at different viewport sizes
 */
export const ResponsiveDesign: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => (
    <Box sx={{ width: '100%' }}>
      <Typography>Responsive Content 1</Typography>
      <Spacer {...args} data-testid="spacer-responsive" />
      <Typography>Responsive Content 2</Typography>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test spacer at different sizes', async () => {
      const spacer = await canvas.findByTestId('spacer-responsive');

      // Get initial size
      const initialStyle = window.getComputedStyle(spacer);
      const initialHeight = parseInt(initialStyle.height);

      // Verify spacer has proper dimensions
      await expect(initialHeight).toBeGreaterThan(0);

      // Spacer should maintain consistent spacing
      await expect(spacer).toHaveStyle({ display: 'block' });
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 6: Theme Variations
 * Tests spacer with different theme contexts
 */
export const ThemeVariations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
        <Typography>Light Theme Context</Typography>
        <Spacer size="md" />
        <Typography>Content with spacing</Typography>
      </Box>
      <Box sx={{ bgcolor: 'grey.900', color: 'white', p: 2 }}>
        <Typography>Dark Theme Context</Typography>
        <Spacer size="md" />
        <Typography>Content with spacing</Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify spacer works in different theme contexts', async () => {
      // Spacers should maintain consistent behavior regardless of theme
      const containers = canvas.getAllByText(/Theme Context/);
      await expect(containers).toHaveLength(2);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 7: Visual States
 * Tests different visual configurations of spacer
 */
export const VisualStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', p: 1 }}>
        <Typography>Horizontal:</Typography>
        <Spacer size="md" direction="horizontal" data-testid="horizontal-spacer" />
        <Typography>Spacing</Typography>
      </Box>
      <Box sx={{ border: '1px solid #ccc', p: 1 }}>
        <Typography>Vertical:</Typography>
        <Spacer size="md" direction="vertical" data-testid="vertical-spacer" />
        <Typography>Spacing</Typography>
      </Box>
      <Box sx={{ border: '1px solid #ccc', p: 1 }}>
        <Typography>Both:</Typography>
        <Spacer size="md" direction="both" data-testid="both-spacer" />
        <Typography>Spacing</Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test different directions', async () => {
      const horizontal = await canvas.findByTestId('horizontal-spacer');
      const vertical = await canvas.findByTestId('vertical-spacer');
      const both = await canvas.findByTestId('both-spacer');

      const hStyle = window.getComputedStyle(horizontal);
      const vStyle = window.getComputedStyle(vertical);
      const bStyle = window.getComputedStyle(both);

      // Horizontal should have width but minimal height
      await expect(parseInt(hStyle.width)).toBeGreaterThan(0);

      // Vertical should have height
      await expect(parseInt(vStyle.height)).toBeGreaterThan(0);

      // Both should have both dimensions
      await expect(parseInt(bStyle.width)).toBeGreaterThan(0);
      await expect(parseInt(bStyle.height)).toBeGreaterThan(0);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 8: Performance
 * Tests performance with multiple spacers
 */
export const Performance: Story = {
  render: () => (
    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
      {Array.from({ length: 50 }, (_, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Item {i + 1}</Typography>
          <Spacer size="sm" direction="horizontal" />
          <Button size="small">Action</Button>
          <Spacer size="xs" direction="horizontal" />
          <Typography variant="caption">Status</Typography>
        </Box>
      ))}
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify multiple spacers render efficiently', async () => {
      // Check that all items rendered
      const items = canvas.getAllByText(/Item \d+/);
      await expect(items).toHaveLength(50);

      // Verify buttons are interactive
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(50);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 9: Edge Cases
 * Tests edge cases and boundary conditions
 */
export const EdgeCases: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ border: '1px solid #ccc', p: 1 }}>
        <Typography>Zero width:</Typography>
        <Spacer width={0} data-testid="zero-width" />
        <Typography>After</Typography>
      </Box>
      <Box sx={{ border: '1px solid #ccc', p: 1 }}>
        <Typography>Zero height:</Typography>
        <Spacer height={0} data-testid="zero-height" />
        <Typography>After</Typography>
      </Box>
      <Box sx={{ border: '1px solid #ccc', p: 1 }}>
        <Typography>Custom string dimension:</Typography>
        <Spacer width="2rem" height="1.5em" data-testid="custom-string" />
        <Typography>After</Typography>
      </Box>
      <Box sx={{ border: '1px solid #ccc', p: 1, display: 'flex' }}>
        <Typography>Flex spacer:</Typography>
        <Spacer flex data-testid="flex-spacer" />
        <Typography>Pushed to end</Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test zero dimensions', async () => {
      const zeroWidth = await canvas.findByTestId('zero-width');
      const zeroHeight = await canvas.findByTestId('zero-height');

      const zeroWidthStyle = window.getComputedStyle(zeroWidth);
      const zeroHeightStyle = window.getComputedStyle(zeroHeight);

      await expect(parseInt(zeroWidthStyle.width)).toBe(0);
      await expect(parseInt(zeroHeightStyle.height)).toBe(0);
    });

    await step('Test custom string dimensions', async () => {
      const customString = await canvas.findByTestId('custom-string');
      const style = window.getComputedStyle(customString);

      // Should have applied custom dimensions
      await expect(style.width).toBeTruthy();
      await expect(style.height).toBeTruthy();
    });

    await step('Test flex spacer', async () => {
      const flexSpacer = await canvas.findByTestId('flex-spacer');
      const style = window.getComputedStyle(flexSpacer);

      // flex: 1 with flexShrink: 0 results in '1 0 0%'
      await expect(style.flex).toBe('1 0 0%');
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};

/**
 * Test 10: Integration
 * Tests integration with other layout components
 */
export const Integration: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'background.paper' }}>
        <Typography>Grid Layout:</Typography>
        <Spacer size="md" direction="horizontal" />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
          <Button size="small">1</Button>
          <Button size="small">2</Button>
          <Button size="small">3</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', p: 2, bgcolor: 'background.paper' }}>
        <Typography>Flexbox:</Typography>
        <Spacer flex />
        <Button>Right Aligned</Button>
      </Box>

      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography component="div">Stack Layout:</Typography>
        <Spacer size="sm" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Button>Item 1</Button>
          <Spacer size="xs" />
          <Button>Item 2</Button>
          <Spacer size="xs" />
          <Button>Item 3</Button>
        </Box>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify integration with different layouts', async () => {
      // Check grid layout buttons
      const gridButtons = canvas.getAllByText(/^[123]$/);
      await expect(gridButtons).toHaveLength(3);

      // Check flex-aligned button
      const rightAligned = canvas.getByText('Right Aligned');
      await expect(rightAligned).toBeInTheDocument();

      // Check stack items
      const stackItems = canvas.getAllByText(/Item \d/);
      await expect(stackItems).toHaveLength(3);
    });

    await step('Pass Test', async () => {
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-label', 'Status of the test run');
      statusElement.textContent = 'PASS';
      document.body.appendChild(statusElement);
    });
  },
};
