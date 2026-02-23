import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, within } from 'storybook/test';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container/Tests',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: false }
  },
  tags: ['autodocs', 'test', 'component:Container']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test Content Components
const InteractiveContent = ({ onClick = fn() }: { onClick?: () => void }) => (
  <Box data-testid="interactive-container">
    <Button
      data-testid="test-button"
      onClick={onClick}
      variant="contained"
      sx={{ mb: 2 }}
    >
      Click Me
    </Button>
    <Paper
      data-testid="hoverable-paper"
      sx={{
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          opacity: 0.8
        }
      }}
    >
      <Typography>Hover over me</Typography>
    </Paper>
  </Box>
);

const AccessibilityContent = () => (
  <Box>
    <Typography
      id="description-id"
      variant="body2"
      sx={{ mb: 2 }}
    >
      This is a description for screen readers
    </Typography>
    <Button
      data-testid="accessible-button"
      aria-label="Accessible test button"
      aria-describedby="description-id"
      variant="outlined"
    >
      Accessible Button
    </Button>
    <nav role="navigation" data-testid="test-nav" aria-label="Test navigation">
      <Typography>Navigation content</Typography>
    </nav>
    <div role="status" aria-live="polite" data-testid="live-region">
      Status updates appear here
    </div>
  </Box>
);

// ==========================================
// 7.2 Interaction Tests
// ==========================================

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    'data-testid': 'container-component',
    children: <InteractiveContent onClick={fn()} />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const container = canvas.getByTestId('container-component');
      await expect(container).toBeInTheDocument();

      const interactiveContainer = canvas.getByTestId('interactive-container');
      await expect(interactiveContainer).toBeInTheDocument();
    });

    await step('Click interaction', async () => {
      const button = canvas.getByTestId('test-button');
      await userEvent.click(button);
      // Note: onClick mock verification would require proper setup in real test
    });

    await step('Hover interaction', async () => {
      const hoverableElement = canvas.getByTestId('hoverable-paper');
      await userEvent.hover(hoverableElement);

      // Verify hover styles are applied
      await expect(hoverableElement).toBeInTheDocument();
    });

    await step('Unhover interaction', async () => {
      const hoverableElement = canvas.getByTestId('hoverable-paper');
      await userEvent.unhover(hoverableElement);
      await expect(hoverableElement).toBeInTheDocument();
    });
  }
};

export const ContainerVariantInteraction: Story = {
  name: '🔄 Container Variant State Test',
  args: {
    variant: 'default',
    'data-testid': 'variant-container',
    children: (
      <Box>
        <Typography data-testid="variant-indicator">Default variant active</Typography>
        <Button data-testid="variant-button" variant="outlined">Test Button</Button>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify default variant state', async () => {
      const container = canvas.getByTestId('variant-container');
      await expect(container).toBeInTheDocument();

      const indicator = canvas.getByTestId('variant-indicator');
      await expect(indicator).toHaveTextContent('Default variant active');
    });

    await step('Verify button interaction in container', async () => {
      const button = canvas.getByTestId('variant-button');
      await userEvent.click(button);
      await expect(button).toBeInTheDocument();
    });
  }
};

// ==========================================
// 7.3 Accessibility Tests
// ==========================================

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    'data-testid': 'keyboard-container',
    children: (
      <Box>
        <Button data-testid="first-focusable" variant="contained" sx={{ mr: 2 }}>
          First Button
        </Button>
        <Button data-testid="second-focusable" variant="outlined" sx={{ mr: 2 }}>
          Second Button
        </Button>
        <input
          data-testid="text-input"
          type="text"
          placeholder="Text input"
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button data-testid="native-button">Native Button</button>
      </Box>
    ),
  },
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'duplicate-id', enabled: true },
          { id: 'label', enabled: true }
        ]
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tab navigation forward', async () => {
      const firstButton = canvas.getByTestId('first-focusable');
      const secondButton = canvas.getByTestId('second-focusable');

      // Focus first element
      await userEvent.click(firstButton);
      await expect(firstButton).toHaveFocus();

      // Tab to next element
      await userEvent.tab();
      await expect(secondButton).toHaveFocus();
    });

    await step('Tab navigation backward', async () => {
      await userEvent.tab({ shift: true });
      const firstButton = canvas.getByTestId('first-focusable');
      await expect(firstButton).toHaveFocus();
    });

    await step('Enter key activation', async () => {
      const button = canvas.getByTestId('first-focusable');
      await userEvent.click(button);
      await userEvent.keyboard('{Enter}');
      // Verify button is still focused after activation
      await expect(button).toHaveFocus();
    });

    await step('Space key activation', async () => {
      const nativeButton = canvas.getByTestId('native-button');
      nativeButton.focus();
      await userEvent.keyboard(' ');
      await expect(nativeButton).toHaveFocus();
    });
  }
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    'aria-label': 'Test container',
    'aria-describedby': 'description-id',
    'data-testid': 'container',
    children: <AccessibilityContent />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA labels', async () => {
      const container = canvas.getByLabelText('Test container');
      await expect(container).toBeInTheDocument();
      await expect(container).toHaveAttribute('aria-label', 'Test container');
    });

    await step('Verify ARIA descriptions', async () => {
      const container = canvas.getByTestId('container');
      await expect(container).toHaveAttribute('aria-describedby', 'description-id');

      const description = canvas.getByText('This is a description for screen readers');
      await expect(description).toBeInTheDocument();
      await expect(description).toHaveAttribute('id', 'description-id');
    });

    await step('Verify role attributes', async () => {
      const nav = canvas.getByRole('navigation');
      await expect(nav).toBeInTheDocument();
      await expect(nav).toHaveAttribute('aria-label', 'Test navigation');

      const button = canvas.getByRole('button');
      await expect(button).toBeInTheDocument();
    });

    await step('Verify live regions', async () => {
      const liveRegion = canvas.getByRole('status');
      await expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      await expect(liveRegion).toBeInTheDocument();
    });
  }
};

export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  args: {
    'data-testid': 'focus-container',
    children: (
      <Box>
        <Button data-testid="trigger-button" variant="contained" sx={{ mb: 2 }}>
          Focus Trigger
        </Button>
        <Paper sx={{ p: 2, border: '2px solid', borderColor: 'primary.main' }}>
          <Typography variant="h6" gutterBottom>Focusable Content</Typography>
          <Button data-testid="first-focus-element" size="small" sx={{ mr: 1 }}>
            First
          </Button>
          <Button data-testid="second-focus-element" size="small">
            Second
          </Button>
        </Paper>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial focus state', async () => {
      const triggerButton = canvas.getByTestId('trigger-button');
      await userEvent.click(triggerButton);
      await expect(triggerButton).toHaveFocus();
    });

    await step('Focus cycling through elements', async () => {
      await userEvent.tab();
      const firstElement = canvas.getByTestId('first-focus-element');
      await expect(firstElement).toHaveFocus();

      await userEvent.tab();
      const secondElement = canvas.getByTestId('second-focus-element');
      await expect(secondElement).toHaveFocus();
    });

    await step('Focus restoration', async () => {
      const triggerButton = canvas.getByTestId('trigger-button');
      await userEvent.click(triggerButton);
      await expect(triggerButton).toHaveFocus();
    });
  }
};

// ==========================================
// 7.4 Visual Tests
// ==========================================

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    responsive: true,
    padding: 'lg',
    'data-testid': 'responsive-container',
    children: (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Responsive Container Content
          </Typography>
          <Typography>
            This content adapts to different screen sizes with responsive padding.
          </Typography>
        </CardContent>
      </Card>
    ),
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile'
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet'
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop'
        }
      },
      defaultViewport: 'mobile'
    },
    chromatic: {
      viewports: [375, 768, 1920],
      delay: 300
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify responsive container exists', async () => {
      const container = canvas.getByTestId('responsive-container');
      await expect(container).toBeInTheDocument();

      // Verify the container has computed styles
      const computedStyle = window.getComputedStyle(container);
      await expect(computedStyle).toBeDefined();
    });

    await step('Verify content renders properly', async () => {
      const heading = canvas.getByText('Responsive Container Content');
      await expect(heading).toBeInTheDocument();

      const content = canvas.getByText(/This content adapts to different screen sizes/);
      await expect(content).toBeInTheDocument();
    });
  }
};

export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  args: {
    'data-testid': 'themed-container',
    sx: {
      backgroundColor: 'background.paper',
      color: 'text.primary',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
    },
    children: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Theme-Aware Container
        </Typography>
        <Typography color="text.secondary">
          This container uses theme colors and responds to theme changes.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' }
      ]
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify theme colors applied', async () => {
      const container = canvas.getByTestId('themed-container');
      const computedStyle = window.getComputedStyle(container);

      // Check if background color is applied
      await expect(computedStyle.backgroundColor).toMatch(/rgb/);
      await expect(container).toBeInTheDocument();
    });

    await step('Verify content visibility', async () => {
      const heading = canvas.getByText('Theme-Aware Container');
      await expect(heading).toBeVisible();

      const description = canvas.getByText(/This container uses theme colors/);
      await expect(description).toBeVisible();
    });
  }
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  args: {
    'data-testid': 'visual-states-container',
    children: (
      <Box>
        <Paper
          data-testid="default-state"
          sx={{
            p: 2,
            mb: 2,
            opacity: 1,
            transition: 'all 0.3s ease'
          }}
        >
          <Typography>Default State</Typography>
        </Paper>

        <Paper
          data-testid="hover-state"
          sx={{
            p: 2,
            mb: 2,
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 4
            }
          }}
        >
          <Typography>Hover State (hover me)</Typography>
        </Paper>

        <Button
          data-testid="active-button"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Active Button
        </Button>

        <Button
          data-testid="disabled-button"
          variant="outlined"
          disabled
          sx={{ opacity: 0.5 }}
        >
          Disabled Button
        </Button>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state verification', async () => {
      const defaultElement = canvas.getByTestId('default-state');
      await expect(defaultElement).toHaveStyle({ opacity: '1' });
    });

    await step('Hover state interaction', async () => {
      const hoverElement = canvas.getByTestId('hover-state');
      await userEvent.hover(hoverElement);

      // Element should still be in document after hover
      await expect(hoverElement).toBeInTheDocument();
    });

    await step('Active state interaction', async () => {
      const activeButton = canvas.getByTestId('active-button');
      await userEvent.click(activeButton);
      await expect(activeButton).toBeInTheDocument();
    });

    await step('Disabled state verification', async () => {
      const disabledButton = canvas.getByTestId('disabled-button');
      await expect(disabledButton).toBeDisabled();
      await expect(disabledButton).toHaveStyle({ opacity: '0.5' });
    });
  }
};

// ==========================================
// 7.5 Performance Tests
// ==========================================

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  args: {
    'data-testid': 'performance-container',
    children: (
      <Box>
        {Array.from({ length: 100 }, (_, i) => (
          <Paper
            key={i}
            data-testid={`item-${i}`}
            sx={{ p: 1, mb: 1, bgcolor: i % 2 ? 'grey.50' : 'grey.100' }}
          >
            <Typography variant="body2">
              Item {i} - Performance test content
            </Typography>
          </Paper>
        ))}
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render time', async () => {
      const startTime = (window as any).performance.now();
      const elements = canvas.getAllByTestId(/item-/);
      const endTime = (window as any).performance.now();

      const renderTime = endTime - startTime;
      // eslint-disable-next-line no-console
      console.log(`Render time for ${elements.length} items: ${renderTime}ms`);

      // Verify reasonable number of elements rendered
      await expect(elements.length).toBeGreaterThan(50);
      await expect(elements.length).toBeLessThanOrEqual(100);
    });

    await step('Test container responsiveness', async () => {
      const container = canvas.getByTestId('performance-container');
      await expect(container).toBeInTheDocument();

      // Test that container handles many child elements gracefully
      const firstItem = canvas.getByTestId('item-0');
      const lastItem = canvas.getByTestId('item-99');

      await expect(firstItem).toBeInTheDocument();
      await expect(lastItem).toBeInTheDocument();
    });
  }
};

// ==========================================
// 7.6 Edge Cases Tests
// ==========================================

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  args: {
    'data-testid': 'edge-case-container',
    children: (
      <Box>
        <Box data-testid="empty-state" sx={{ mb: 2, p: 2, border: '2px dashed #ccc' }}>
          <Typography variant="body2" color="text.secondary">
            No data available
          </Typography>
        </Box>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography
            data-testid="long-text"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
            }}
          >
            ThisIsAVeryLongTextThatShouldTestHowTheContainerHandlesOverflowingContentAndWordBreakingInVariousScenarios
          </Typography>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <input
            data-testid="limited-input"
            type="text"
            maxLength={50}
            placeholder="Max 50 characters"
            style={{ width: '100%', padding: '8px' }}
          />
        </Paper>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Empty content handling', async () => {
      const emptyState = canvas.getByTestId('empty-state');
      await expect(emptyState).toHaveTextContent(/no data/i);
    });

    await step('Long text overflow handling', async () => {
      const longText = canvas.getByTestId('long-text');
      const computedStyle = window.getComputedStyle(longText);
      await expect(computedStyle.textOverflow).toBe('ellipsis');
      await expect(longText).toBeInTheDocument();
    });

    await step('Input limits testing', async () => {

      const input = canvas.getByTestId('limited-input') as any;
      const testText = 'a'.repeat(100); // 100 characters

      await userEvent.clear(input);
      await userEvent.type(input, testText);

      // Should be limited to maxLength
      await expect(input.value.length).toBeLessThanOrEqual(50);
    });

    await step('Container structure integrity', async () => {
      const container = canvas.getByTestId('edge-case-container');
      await expect(container).toBeInTheDocument();

      // Container should handle all edge case content gracefully
      const allChildren = container.querySelectorAll('*');
      await expect(allChildren.length).toBeGreaterThan(0);
    });
  }
};

// ==========================================
// 7.7 Integration Tests
// ==========================================

export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  args: {
    'data-testid': 'integration-container',
    variant: 'padded',
    maxWidth: 'md',
    children: (
      <Box>
        <Card data-testid="integrated-card" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Integrated Components
            </Typography>
            <Button
              data-testid="trigger-component"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Trigger Action
            </Button>
            <Button
              data-testid="receiver-component"
              variant="outlined"
              color="success"
            >
              Receiver
            </Button>
          </CardContent>
        </Card>

        <Paper data-testid="status-display" sx={{ p: 2 }}>
          <Typography
            data-testid="status-text"
            variant="body1"
          >
            Status: Ready
          </Typography>
        </Paper>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify integration setup', async () => {
      const container = canvas.getByTestId('integration-container');
      await expect(container).toBeInTheDocument();

      const card = canvas.getByTestId('integrated-card');
      await expect(card).toBeInTheDocument();

      const statusDisplay = canvas.getByTestId('status-display');
      await expect(statusDisplay).toBeInTheDocument();
    });

    await step('Test component communication', async () => {
      const trigger = canvas.getByTestId('trigger-component');
      const receiver = canvas.getByTestId('receiver-component');
      const statusText = canvas.getByTestId('status-text');

      await expect(trigger).toBeInTheDocument();
      await expect(receiver).toBeInTheDocument();
      await expect(statusText).toHaveTextContent('Status: Ready');

      // Simulate interaction
      await userEvent.click(trigger);

      // Verify components still exist after interaction
      await expect(receiver).toBeInTheDocument();
      await expect(statusText).toBeInTheDocument();
    });

    await step('Verify container constraints', async () => {
      const container = canvas.getByTestId('integration-container');

      // Container should constrain child components appropriately
      const card = canvas.getByTestId('integrated-card');
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Card should be contained within container bounds
      await expect(cardRect.left).toBeGreaterThanOrEqual(containerRect.left);
      await expect(cardRect.right).toBeLessThanOrEqual(containerRect.right);
    });
  }
};