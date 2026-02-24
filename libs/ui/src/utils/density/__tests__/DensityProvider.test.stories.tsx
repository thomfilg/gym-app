import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { DensityProvider } from '../DensityProvider';
import type { DensityMode } from '../types';
import { useDensity } from '../useDensity';

/**
 * Test component that displays density context values
 */
function DensityDisplay({ testId = 'density-display' }: { testId?: string }) {
  const { mode, multiplier, getSpacing } = useDensity();
  return (
    <div data-testid={testId} style={{ fontFamily: 'monospace', padding: '1rem' }}>
      <div data-testid={`${testId}-mode`}>Mode: {mode}</div>
      <div data-testid={`${testId}-multiplier`}>Multiplier: {multiplier}</div>
      <div data-testid={`${testId}-spacing-2`}>getSpacing(2): {getSpacing(2)}</div>
      <div data-testid={`${testId}-spacing-4`}>getSpacing(4): {getSpacing(4)}</div>
    </div>
  );
}

/**
 * Test component with mode toggle buttons
 */
function DensityControls({ testId = 'controls' }: { testId?: string }) {
  const { mode, setMode } = useDensity();
  return (
    <div data-testid={testId} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <button
        data-testid={`${testId}-compact`}
        onClick={() => setMode('compact')}
        style={{ fontWeight: mode === 'compact' ? 'bold' : 'normal' }}
      >
        Compact
      </button>
      <button
        data-testid={`${testId}-normal`}
        onClick={() => setMode('normal')}
        style={{ fontWeight: mode === 'normal' ? 'bold' : 'normal' }}
      >
        Normal
      </button>
      <button
        data-testid={`${testId}-spacious`}
        onClick={() => setMode('spacious')}
        style={{ fontWeight: mode === 'spacious' ? 'bold' : 'normal' }}
      >
        Spacious
      </button>
    </div>
  );
}

/**
 * Wrapper component for controlled mode test
 */
function ControlledModeWrapper() {
  const [mode, setMode] = useState<DensityMode>('normal');

  return (
    <div>
      <div data-testid="external-mode" style={{ marginBottom: '1rem' }}>
        External state: {mode}
      </div>
      <DensityProvider mode={mode} onModeChange={setMode}>
        <DensityControls testId="controlled" />
        <DensityDisplay testId="controlled-display" />
      </DensityProvider>
    </div>
  );
}

/**
 * Wrapper component for context value stability test
 */
function StabilityTestWrapper() {
  const [renderCount, setRenderCount] = useState(0);

  return (
    <DensityProvider defaultMode="normal">
      <div style={{ marginBottom: '1rem' }}>
        <button data-testid="force-render" onClick={() => setRenderCount((c) => c + 1)}>
          Force Re-render ({renderCount})
        </button>
      </div>
      <DensityDisplay testId="stable" />
      <DensityControls testId="stable-controls" />
    </DensityProvider>
  );
}

const meta: Meta = {
  title: 'Utils/Density/DensityProvider/Tests',
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
  tags: ['test', 'utils', 'density'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// DEFAULT MODE TESTS
// ============================================================================

export const DefaultModeTest: Story = {
  name: 'Default Mode (Normal)',
  render: () => (
    <DensityProvider>
      <DensityDisplay testId="default" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default mode is normal', async () => {
      const modeElement = canvas.getByTestId('default-mode');
      await expect(modeElement).toHaveTextContent('Mode: normal');
    });

    await step('Default multiplier is 1', async () => {
      const multiplierElement = canvas.getByTestId('default-multiplier');
      await expect(multiplierElement).toHaveTextContent('Multiplier: 1');
    });

    await step('getSpacing returns unscaled values', async () => {
      const spacing2 = canvas.getByTestId('default-spacing-2');
      const spacing4 = canvas.getByTestId('default-spacing-4');
      await expect(spacing2).toHaveTextContent('getSpacing(2): 2');
      await expect(spacing4).toHaveTextContent('getSpacing(4): 4');
    });
  },
};

// ============================================================================
// CUSTOM DEFAULT MODE TESTS
// ============================================================================

export const CompactDefaultModeTest: Story = {
  name: 'Custom Default Mode (Compact)',
  render: () => (
    <DensityProvider defaultMode="compact">
      <DensityDisplay testId="compact-default" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Mode is compact', async () => {
      const modeElement = canvas.getByTestId('compact-default-mode');
      await expect(modeElement).toHaveTextContent('Mode: compact');
    });

    await step('Multiplier is 0.8', async () => {
      const multiplierElement = canvas.getByTestId('compact-default-multiplier');
      await expect(multiplierElement).toHaveTextContent('Multiplier: 0.8');
    });

    await step('getSpacing returns scaled values', async () => {
      const spacing2 = canvas.getByTestId('compact-default-spacing-2');
      const spacing4 = canvas.getByTestId('compact-default-spacing-4');
      await expect(spacing2).toHaveTextContent('getSpacing(2): 1.6');
      await expect(spacing4).toHaveTextContent('getSpacing(4): 3.2');
    });
  },
};

export const SpaciousDefaultModeTest: Story = {
  name: 'Custom Default Mode (Spacious)',
  render: () => (
    <DensityProvider defaultMode="spacious">
      <DensityDisplay testId="spacious-default" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Mode is spacious', async () => {
      const modeElement = canvas.getByTestId('spacious-default-mode');
      await expect(modeElement).toHaveTextContent('Mode: spacious');
    });

    await step('Multiplier is 1.25', async () => {
      const multiplierElement = canvas.getByTestId('spacious-default-multiplier');
      await expect(multiplierElement).toHaveTextContent('Multiplier: 1.25');
    });

    await step('getSpacing returns scaled values', async () => {
      const spacing2 = canvas.getByTestId('spacious-default-spacing-2');
      const spacing4 = canvas.getByTestId('spacious-default-spacing-4');
      await expect(spacing2).toHaveTextContent('getSpacing(2): 2.5');
      await expect(spacing4).toHaveTextContent('getSpacing(4): 5');
    });
  },
};

// ============================================================================
// MODE SWITCHING TESTS
// ============================================================================

export const ModeSwitchingTest: Story = {
  name: 'Mode Switching (Uncontrolled)',
  render: () => (
    <DensityProvider defaultMode="normal">
      <DensityControls testId="switch" />
      <DensityDisplay testId="switch-display" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state is normal', async () => {
      const modeElement = canvas.getByTestId('switch-display-mode');
      await expect(modeElement).toHaveTextContent('Mode: normal');
    });

    await step('Switch to compact mode', async () => {
      const compactButton = canvas.getByTestId('switch-compact');
      await userEvent.click(compactButton);

      const modeElement = canvas.getByTestId('switch-display-mode');
      const multiplierElement = canvas.getByTestId('switch-display-multiplier');
      const spacingElement = canvas.getByTestId('switch-display-spacing-2');

      await expect(modeElement).toHaveTextContent('Mode: compact');
      await expect(multiplierElement).toHaveTextContent('Multiplier: 0.8');
      await expect(spacingElement).toHaveTextContent('getSpacing(2): 1.6');
    });

    await step('Switch to spacious mode', async () => {
      const spaciousButton = canvas.getByTestId('switch-spacious');
      await userEvent.click(spaciousButton);

      const modeElement = canvas.getByTestId('switch-display-mode');
      const multiplierElement = canvas.getByTestId('switch-display-multiplier');
      const spacingElement = canvas.getByTestId('switch-display-spacing-2');

      await expect(modeElement).toHaveTextContent('Mode: spacious');
      await expect(multiplierElement).toHaveTextContent('Multiplier: 1.25');
      await expect(spacingElement).toHaveTextContent('getSpacing(2): 2.5');
    });

    await step('Switch back to normal mode', async () => {
      const normalButton = canvas.getByTestId('switch-normal');
      await userEvent.click(normalButton);

      const modeElement = canvas.getByTestId('switch-display-mode');
      await expect(modeElement).toHaveTextContent('Mode: normal');
    });
  },
};

// ============================================================================
// CONTROLLED MODE TESTS
// ============================================================================

export const ControlledModeTest: Story = {
  name: 'Controlled Mode',
  render: () => <ControlledModeWrapper />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial controlled state', async () => {
      const externalMode = canvas.getByTestId('external-mode');
      const displayMode = canvas.getByTestId('controlled-display-mode');

      await expect(externalMode).toHaveTextContent('External state: normal');
      await expect(displayMode).toHaveTextContent('Mode: normal');
    });

    await step('Controlled mode updates via callback', async () => {
      const compactButton = canvas.getByTestId('controlled-compact');
      await userEvent.click(compactButton);

      const externalMode = canvas.getByTestId('external-mode');
      const displayMode = canvas.getByTestId('controlled-display-mode');

      await expect(externalMode).toHaveTextContent('External state: compact');
      await expect(displayMode).toHaveTextContent('Mode: compact');
    });
  },
};

// ============================================================================
// CONTEXT WITHOUT PROVIDER TESTS
// ============================================================================

export const ContextWithoutProviderTest: Story = {
  name: 'Context Without Provider (Default Values)',
  render: () => <DensityDisplay testId="no-provider" />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Falls back to normal mode', async () => {
      const modeElement = canvas.getByTestId('no-provider-mode');
      await expect(modeElement).toHaveTextContent('Mode: normal');
    });

    await step('Falls back to 1.0 multiplier', async () => {
      const multiplierElement = canvas.getByTestId('no-provider-multiplier');
      await expect(multiplierElement).toHaveTextContent('Multiplier: 1');
    });

    await step('getSpacing returns unscaled values', async () => {
      const spacingElement = canvas.getByTestId('no-provider-spacing-2');
      await expect(spacingElement).toHaveTextContent('getSpacing(2): 2');
    });
  },
};

// ============================================================================
// NESTED PROVIDER TESTS
// ============================================================================

export const NestedProvidersTest: Story = {
  name: 'Nested Providers',
  render: () => (
    <DensityProvider defaultMode="compact">
      <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h4>Outer Provider (compact)</h4>
        <DensityDisplay testId="outer" />
      </div>
      <DensityProvider defaultMode="spacious">
        <div style={{ border: '1px solid #999', padding: '1rem' }}>
          <h4>Inner Provider (spacious)</h4>
          <DensityDisplay testId="inner" />
        </div>
      </DensityProvider>
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Outer provider has compact mode', async () => {
      const outerMode = canvas.getByTestId('outer-mode');
      await expect(outerMode).toHaveTextContent('Mode: compact');
    });

    await step('Inner provider overrides with spacious mode', async () => {
      const innerMode = canvas.getByTestId('inner-mode');
      await expect(innerMode).toHaveTextContent('Mode: spacious');
    });

    await step('Spacing calculations are independent', async () => {
      const outerSpacing = canvas.getByTestId('outer-spacing-2');
      const innerSpacing = canvas.getByTestId('inner-spacing-2');

      await expect(outerSpacing).toHaveTextContent('getSpacing(2): 1.6');
      await expect(innerSpacing).toHaveTextContent('getSpacing(2): 2.5');
    });
  },
};

// ============================================================================
// CONTEXT VALUE STABILITY TESTS
// ============================================================================

export const ContextValueStabilityTest: Story = {
  name: 'Context Value Stability',
  render: () => <StabilityTestWrapper />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render', async () => {
      const modeElement = canvas.getByTestId('stable-mode');
      await expect(modeElement).toHaveTextContent('Mode: normal');
    });

    await step('Force re-render preserves state', async () => {
      // Switch to compact
      const compactButton = canvas.getByTestId('stable-controls-compact');
      await userEvent.click(compactButton);

      // Force parent re-render
      const forceRenderButton = canvas.getByTestId('force-render');
      await userEvent.click(forceRenderButton);

      // Verify state is preserved
      const modeElement = canvas.getByTestId('stable-mode');
      await expect(modeElement).toHaveTextContent('Mode: compact');
    });

    await step('Multiple re-renders preserve state', async () => {
      const forceRenderButton = canvas.getByTestId('force-render');

      for (let i = 0; i < 3; i++) {
        await userEvent.click(forceRenderButton);
      }

      const modeElement = canvas.getByTestId('stable-mode');
      await expect(modeElement).toHaveTextContent('Mode: compact');
    });
  },
};

// ============================================================================
// ALL MODES VISUAL TEST
// ============================================================================

export const AllModesVisualTest: Story = {
  name: 'All Modes Visual Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <DensityProvider defaultMode="compact">
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h4>Compact (0.8x)</h4>
          <DensityDisplay testId="visual-compact" />
        </div>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h4>Normal (1.0x)</h4>
          <DensityDisplay testId="visual-normal" />
        </div>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h4>Spacious (1.25x)</h4>
          <DensityDisplay testId="visual-spacious" />
        </div>
      </DensityProvider>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All three modes render correctly', async () => {
      const compactMode = canvas.getByTestId('visual-compact-mode');
      const normalMode = canvas.getByTestId('visual-normal-mode');
      const spaciousMode = canvas.getByTestId('visual-spacious-mode');

      await expect(compactMode).toHaveTextContent('Mode: compact');
      await expect(normalMode).toHaveTextContent('Mode: normal');
      await expect(spaciousMode).toHaveTextContent('Mode: spacious');
    });

    await step('Spacing values differ correctly', async () => {
      const compactSpacing = canvas.getByTestId('visual-compact-spacing-4');
      const normalSpacing = canvas.getByTestId('visual-normal-spacing-4');
      const spaciousSpacing = canvas.getByTestId('visual-spacious-spacing-4');

      await expect(compactSpacing).toHaveTextContent('getSpacing(4): 3.2');
      await expect(normalSpacing).toHaveTextContent('getSpacing(4): 4');
      await expect(spaciousSpacing).toHaveTextContent('getSpacing(4): 5');
    });
  },
};
