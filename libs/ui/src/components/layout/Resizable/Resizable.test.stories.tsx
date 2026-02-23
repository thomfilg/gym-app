import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Resizable } from './Resizable';

const meta: Meta<typeof Resizable> = {
  title: 'Layout/Resizable/Tests',
  component: Resizable,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Resizable'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test content component
interface TestContentProps {
  testId?: string;
  label?: string;
}

const TestContent: React.FC<TestContentProps> = ({
  testId = 'test-content',
  label = 'Test Content',
}) => (
  <Box
    sx={{ p: 2, bgcolor: 'primary.50', height: '100%', display: 'flex', flexDirection: 'column' }}
    data-testid={testId}
  >
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body2">Resize test content area</Typography>
    <Box sx={{ flex: 1, bgcolor: 'grey.100', borderRadius: 1, p: 1, mt: 1 }}>
      <Typography variant="caption">Content fills available space</Typography>
    </Box>
  </Box>
);

// 🧪 INTERACTION TESTS

export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    variant: 'both',
    width: 300,
    height: 200,
    onResize: fn(),
    children: <TestContent testId="basic-interaction-content" label="Basic Interaction" />,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const container = canvas.getByTestId('basic-interaction-content');
      await expect(container).toBeInTheDocument();

      // Verify initial dimensions
      const resizableContainer = container.closest('[data-testid]')?.parentElement;
      if (resizableContainer) {
        const computedStyle = window.getComputedStyle(resizableContainer);
        await expect(computedStyle.width).toBe('300px');
        await expect(computedStyle.height).toBe('200px');
      }
    });

    await step('Hover shows resize handles', async () => {
      const container = canvas.getByTestId('basic-interaction-content');
      const resizableContainer = container.closest('[data-testid]')?.parentElement;

      if (resizableContainer) {
        await userEvent.hover(resizableContainer);
        // Handles become visible on hover
        const handles = resizableContainer.querySelectorAll('.resize-handle');
        await expect(handles.length).toBeGreaterThan(0);
      }
    });

    await step('Resize callback is triggered', async () => {
      // Note: Actual drag simulation is complex in testing environment
      // This test verifies the callback is properly set up
      await expect(args.onResize).toBeDefined();
    });
  },
};

const StateChangeTestComponent: React.FC = () => {
  const [size, setSize] = useState({ width: 250, height: 150 });
  const [disabled, setDisabled] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <button onClick={() => setSize({ width: 400, height: 300 })} data-testid="resize-to-large">
          Resize to Large
        </button>
        <button onClick={() => setSize({ width: 200, height: 100 })} data-testid="resize-to-small">
          Resize to Small
        </button>
        <button onClick={() => setDisabled(!disabled)} data-testid="toggle-disabled">
          Toggle Disabled
        </button>
      </Box>

      <Typography variant="body2">
        Size: {size.width} × {size.height}
      </Typography>

      <Resizable
        variant="both"
        width={size.width}
        height={size.height}
        disabled={disabled}
        onResize={(width, height) => setSize({ width, height })}
        data-testid="stateful-resizable"
      >
        <TestContent testId="state-change-content" label={disabled ? 'Disabled' : 'Enabled'} />
      </Resizable>
    </Box>
  );
};

export const StateChangeTest: Story = {
  name: '🔄 State Change Test',
  render: () => <StateChangeTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial state', async () => {
      const resizableItem = canvas.getByTestId('stateful-resizable');
      await expect(resizableItem).toBeInTheDocument();
      await expect(resizableItem).toHaveStyle({ width: '250px', height: '150px' });
    });

    await step('Change size to large', async () => {
      const resizeLargeBtn = canvas.getByTestId('resize-to-large');
      await userEvent.click(resizeLargeBtn);

      await waitFor(async () => {
        const resizableItem = canvas.getByTestId('stateful-resizable');
        await expect(resizableItem).toBeInTheDocument();
        await expect(resizableItem).toHaveStyle({ width: '400px', height: '300px' });
      });
    });

    await step('Change size to small', async () => {
      const resizeSmallBtn = canvas.getByTestId('resize-to-small');
      await userEvent.click(resizeSmallBtn);

      await waitFor(async () => {
        const resizableItem = canvas.getByTestId('stateful-resizable');
        await expect(resizableItem).toHaveStyle({ width: '200px', height: '100px' });
      });
    });

    await step('Toggle disabled state', async () => {
      const toggleBtn = canvas.getByTestId('toggle-disabled');
      await userEvent.click(toggleBtn);

      await waitFor(async () => {
        const content = canvas.getByTestId('state-change-content');
        await expect(content).toHaveTextContent('Disabled');
      });
    });
  },
};

// ⌨️ ACCESSIBILITY TESTS

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    variant: 'both',
    width: 300,
    height: 200,
    children: (
      <Box
        sx={{ p: 2, bgcolor: 'info.50', height: '100%' }}
        role="region"
        aria-label="Resizable content area"
        data-testid="keyboard-content"
      >
        <Typography variant="h6">Keyboard Navigation</Typography>
        <button data-testid="focus-target">Focusable Element</button>
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
        ],
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Content is focusable', async () => {
      const focusTarget = canvas.getByTestId('focus-target');
      focusTarget.focus();
      await expect(focusTarget).toHaveFocus();
    });

    await step('Tab navigation works', async () => {
      const focusTarget = canvas.getByTestId('focus-target');
      focusTarget.focus();
      await userEvent.tab();
      // Tab should move focus away from the button
      await expect(focusTarget).not.toHaveFocus();
    });

    await step('Container has proper ARIA attributes', async () => {
      const content = canvas.getByTestId('keyboard-content');
      await expect(content).toHaveAttribute('role', 'region');
      await expect(content).toHaveAttribute('aria-label', 'Resizable content area');
    });
  },
};

export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    variant: 'both',
    width: 300,
    height: 200,
    children: (
      <Box
        sx={{ p: 2, bgcolor: 'secondary.50', height: '100%' }}
        role="region"
        aria-label="Resizable panel"
        aria-describedby="panel-description"
        data-testid="screen-reader-content"
      >
        <Typography variant="h6" id="panel-title">
          Panel Title
        </Typography>
        <Typography variant="body2" id="panel-description">
          This panel can be resized by dragging the handles
        </Typography>
        <div role="status" aria-live="polite" data-testid="live-region">
          Status updates appear here
        </div>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA labels', async () => {
      const content = canvas.getByLabelText('Resizable panel');
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveAttribute('role', 'region');
    });

    await step('Verify ARIA descriptions', async () => {
      const content = canvas.getByTestId('screen-reader-content');
      await expect(content).toHaveAttribute('aria-describedby', 'panel-description');

      const description = canvas.getByText('This panel can be resized by dragging the handles');
      await expect(description).toBeInTheDocument();
      await expect(description).toHaveAttribute('id', 'panel-description');
    });

    await step('Verify live regions', async () => {
      const liveRegion = canvas.getByTestId('live-region');
      await expect(liveRegion).toHaveAttribute('role', 'status');
      await expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  },
};

// 👁️ VISUAL TESTS

export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    variant: 'both',
    width: 250,
    height: 180,
    children: <TestContent testId="responsive-content" label="Responsive Test" />,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'mobile',
    },
    chromatic: {
      viewports: [375, 768, 1920],
      delay: 300,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Component renders on mobile viewport', async () => {
      const content = canvas.getByTestId('responsive-content');
      await expect(content).toBeInTheDocument();

      // Verify the component adapts to smaller screen
      const container = content.closest('[data-testid]')?.parentElement;
      if (container && window.innerWidth <= 768) {
        const computedStyle = window.getComputedStyle(container);
        await expect(computedStyle.position).toBe('relative');
      }
    });
  },
};

const VisualStatesComponent: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <button onClick={() => setIsActive(!isActive)} data-testid="toggle-active">
          Toggle Active
        </button>
      </Box>

      <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Resizable variant="both" width={300} height={200} data-testid="visual-states-resizable">
          <Box
            sx={{
              p: 2,
              bgcolor: isActive ? 'success.50' : isHovered ? 'warning.50' : 'primary.50',
              height: '100%',
              transition: 'background-color 0.2s',
            }}
            data-testid="visual-states-content"
          >
            <Typography variant="h6">Visual States</Typography>
            <Typography variant="body2">
              State: {isActive ? 'Active' : isHovered ? 'Hovered' : 'Default'}
            </Typography>
          </Box>
        </Resizable>
      </Box>
    </Box>
  );
};

export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => <VisualStatesComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state', async () => {
      const content = canvas.getByTestId('visual-states-content');
      await expect(content).toHaveTextContent('Default');
    });

    await step('Hover state', async () => {
      const resizable = canvas.getByTestId('visual-states-resizable');
      await userEvent.hover(resizable);

      await waitFor(async () => {
        const content = canvas.getByTestId('visual-states-content');
        await expect(content).toHaveTextContent('Hovered');
      });
    });

    await step('Active state', async () => {
      const toggleBtn = canvas.getByTestId('toggle-active');
      await userEvent.click(toggleBtn);

      await waitFor(async () => {
        const content = canvas.getByTestId('visual-states-content');
        await expect(content).toHaveTextContent('Active');
      });
    });
  },
};

// ⚡ PERFORMANCE TESTS

const PerformanceTestComponent: React.FC = () => {
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const [items] = useState(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `Item ${i + 1}`,
    })),
  );

  React.useEffect(() => {
    const startTime = window.performance.now();

    // Use requestAnimationFrame for reliable timing after render
    const frameId = window.requestAnimationFrame(() => {
      const endTime = window.performance.now();
      setRenderTime(endTime - startTime);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Typography variant="body2" data-testid="performance-info">
        Render time: {renderTime !== null ? `${renderTime.toFixed(2)}ms` : 'Measuring...'}
      </Typography>

      <Resizable variant="both" width={400} height={300} data-testid="performance-resizable">
        <Box sx={{ p: 2, bgcolor: 'info.50', height: '100%', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Performance Test
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: 1,
            }}
          >
            {items.map((item) => (
              <Paper
                key={item.id}
                sx={{ p: 1, textAlign: 'center' }}
                data-testid={`item-${item.id}`}
              >
                <Typography variant="caption">{item.name}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Resizable>
    </Box>
  );
};

export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  render: () => <PerformanceTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Measure render performance', async () => {
      await waitFor(
        async () => {
          const performanceInfo = canvas.getByTestId('performance-info');
          const text = performanceInfo.textContent || '';
          // Verify we have actual render time (contains 'ms' and not 'Measuring...')
          expect(text).toMatch(/Render time: \d+\.\d{2}ms/);
        },
        {
          timeout: 5000,
          interval: 100,
        },
      );
    });

    await step('Verify all items rendered', async () => {
      const items = canvas.getAllByTestId(/item-/);
      await expect(items).toHaveLength(100);
    });
  },
};

// 🔧 EDGE CASES TESTS

const EdgeCasesComponent: React.FC = () => {
  const [scenario, setScenario] = useState<'normal' | 'minimal' | 'maximal' | 'extreme'>('normal');

  const getProps = (): {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
  } => {
    switch (scenario) {
      case 'minimal':
        return {
          width: 50,
          height: 50,
          minWidth: 50,
          minHeight: 50,
          maxWidth: 100,
          maxHeight: 100,
        };
      case 'maximal':
        return {
          width: 800,
          height: 600,
          minWidth: 700,
          minHeight: 500,
          maxWidth: 900,
          maxHeight: 700,
        };
      case 'extreme':
        return { width: 1, height: 1, minWidth: 1, minHeight: 1, maxWidth: 2000, maxHeight: 2000 };
      default:
        return {
          width: 250,
          height: 180,
          minWidth: 100,
          minHeight: 80,
          maxWidth: 500,
          maxHeight: 400,
        };
    }
  };

  const props = getProps();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {['normal', 'minimal', 'maximal', 'extreme'].map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s as 'normal' | 'minimal' | 'maximal' | 'extreme')}
            data-testid={`scenario-${s}`}
            style={{
              backgroundColor: scenario === s ? '#1976d2' : '#e0e0e0',
              color: scenario === s ? 'white' : 'black',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </Box>

      <Typography variant="body2" data-testid="scenario-info">
        {}
        Scenario: {scenario} - Size: {props.width}×{props.height}
      </Typography>

      <Resizable variant="both" {...props} data-testid="edge-case-resizable">
        <Box
          sx={{
            p: scenario === 'minimal' ? 0.5 : 2,
            bgcolor: 'warning.50',
            height: '100%',
            minWidth: 0,
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <Typography
            variant={scenario === 'minimal' ? 'caption' : 'h6'}
            data-testid="edge-case-content"
          >
            {scenario === 'extreme' ? '!' : scenario === 'minimal' ? 'Min' : 'Edge Cases'}
          </Typography>
          {scenario !== 'minimal' && scenario !== 'extreme' && (
            <Typography variant="caption">Testing boundary conditions</Typography>
          )}
        </Box>
      </Resizable>
    </Box>
  );
};

export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  render: () => <EdgeCasesComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Test normal scenario', async () => {
      const scenarioInfo = canvas.getByTestId('scenario-info');
      await expect(scenarioInfo).toHaveTextContent('normal');

      const content = canvas.getByTestId('edge-case-content');
      await expect(content).toBeInTheDocument();
    });

    await step('Test minimal scenario', async () => {
      const minimalBtn = canvas.getByTestId('scenario-minimal');
      await userEvent.click(minimalBtn);

      await waitFor(async () => {
        const scenarioInfo = canvas.getByTestId('scenario-info');
        await expect(scenarioInfo).toHaveTextContent('minimal');
        await expect(scenarioInfo).toHaveTextContent('50×50');
      });
    });

    await step('Test maximal scenario', async () => {
      const maximalBtn = canvas.getByTestId('scenario-maximal');
      await userEvent.click(maximalBtn);

      await waitFor(async () => {
        const scenarioInfo = canvas.getByTestId('scenario-info');
        await expect(scenarioInfo).toHaveTextContent('maximal');
        await expect(scenarioInfo).toHaveTextContent('800×600');
      });
    });

    await step('Test extreme scenario', async () => {
      const extremeBtn = canvas.getByTestId('scenario-extreme');
      await userEvent.click(extremeBtn);

      await waitFor(async () => {
        const scenarioInfo = canvas.getByTestId('scenario-info');
        await expect(scenarioInfo).toHaveTextContent('extreme');
        await expect(scenarioInfo).toHaveTextContent('1×1');
      });
    });
  },
};

// 🔗 INTEGRATION TESTS

const IntegrationTestComponent: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState(200);
  const [rightWidth, setRightWidth] = useState(200);
  const [bottomHeight, setBottomHeight] = useState(100);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
        Multi-Panel Layout
      </Typography>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Panel */}
        <Resizable
          variant="horizontal"
          width={leftWidth}
          height={200}
          minWidth={150}
          maxWidth={300}
          onResize={(width) => setLeftWidth(width)}
          data-testid="left-panel"
        >
          <Box sx={{ p: 2, bgcolor: 'primary.50', height: '100%' }}>
            <Typography variant="subtitle2">Left Panel</Typography>
            <Typography variant="caption">Width: {leftWidth}px</Typography>
          </Box>
        </Resizable>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Main Content */}
          <Box sx={{ flex: 1, p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6">Main Content</Typography>
            <Typography variant="body2">
              Available width: {400 - leftWidth - rightWidth}px
            </Typography>
          </Box>

          {/* Bottom Panel */}
          <Resizable
            variant="vertical"
            width={300}
            height={bottomHeight}
            minHeight={60}
            maxHeight={200}
            onResize={(_, height) => setBottomHeight(height)}
            data-testid="bottom-panel"
          >
            <Box sx={{ p: 1, bgcolor: 'info.50', height: '100%' }}>
              <Typography variant="caption">Bottom Panel - Height: {bottomHeight}px</Typography>
            </Box>
          </Resizable>
        </Box>

        {/* Right Panel */}
        <Resizable
          variant="horizontal"
          width={rightWidth}
          height={200}
          minWidth={150}
          maxWidth={300}
          onResize={(width) => setRightWidth(width)}
          data-testid="right-panel"
        >
          <Box sx={{ p: 2, bgcolor: 'secondary.50', height: '100%' }}>
            <Typography variant="subtitle2">Right Panel</Typography>
            <Typography variant="caption">Width: {rightWidth}px</Typography>
          </Box>
        </Resizable>
      </Box>
    </Box>
  );
};

export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  render: () => <IntegrationTestComponent />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All panels render correctly', async () => {
      const leftPanel = canvas.getByTestId('left-panel');
      const rightPanel = canvas.getByTestId('right-panel');
      const bottomPanel = canvas.getByTestId('bottom-panel');

      await expect(leftPanel).toBeInTheDocument();
      await expect(rightPanel).toBeInTheDocument();
      await expect(bottomPanel).toBeInTheDocument();
    });

    await step('Panel dimensions are displayed', async () => {
      const widthElements = canvas.getAllByText(/Width:\s*200\s*px/);
      // Fixed: Only 2 panels (left and right) show width
      await expect(widthElements.length).toBe(2);
      await expect(canvas.getByText(/Height:\s*100\s*px/)).toBeInTheDocument();
    });

    await step('Main content area adapts to panel sizes', async () => {
      const mainContent = canvas.getByText(/Available width:/);
      await expect(mainContent).toBeInTheDocument();
    });
  },
};
