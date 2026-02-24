import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useCallback, useState } from 'react';

import { DensityProvider } from '../DensityProvider';
import { useDensity } from '../useDensity';

/**
 * Component that uses all parts of the useDensity hook
 */
function HookTestComponent({ testId = 'hook-test' }: { testId?: string }) {
  const { mode, multiplier, setMode, getSpacing } = useDensity();
  const [spacingValue, setSpacingValue] = useState(2);

  return (
    <div data-testid={testId} style={{ fontFamily: 'monospace', padding: '1rem' }}>
      <div data-testid={`${testId}-mode`}>mode: {mode}</div>
      <div data-testid={`${testId}-multiplier`}>multiplier: {multiplier}</div>
      <div data-testid={`${testId}-type-mode`}>typeof mode: {typeof mode}</div>
      <div data-testid={`${testId}-type-multiplier`}>typeof multiplier: {typeof multiplier}</div>
      <div data-testid={`${testId}-type-setMode`}>typeof setMode: {typeof setMode}</div>
      <div data-testid={`${testId}-type-getSpacing`}>typeof getSpacing: {typeof getSpacing}</div>

      <div style={{ marginTop: '1rem' }}>
        <label>
          Spacing value:
          <input
            type="number"
            data-testid={`${testId}-spacing-input`}
            value={spacingValue}
            onChange={(e) => setSpacingValue(Number(e.target.value))}
            style={{ width: '60px', marginLeft: '0.5rem' }}
          />
        </label>
        <div data-testid={`${testId}-calculated-spacing`}>
          getSpacing({spacingValue}): {getSpacing(spacingValue)}
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button data-testid={`${testId}-set-compact`} onClick={() => setMode('compact')}>
          Set Compact
        </button>
        <button data-testid={`${testId}-set-normal`} onClick={() => setMode('normal')}>
          Set Normal
        </button>
        <button data-testid={`${testId}-set-spacious`} onClick={() => setMode('spacious')}>
          Set Spacious
        </button>
      </div>
    </div>
  );
}

/**
 * Component that tracks getSpacing reference stability
 */
function GetSpacingStabilityTest({ testId = 'stability' }: { testId?: string }) {
  const { getSpacing, mode } = useDensity();
  const [callCount, setCallCount] = useState(0);
  const [results, setResults] = useState<number[]>([]);

  const testGetSpacing = useCallback(() => {
    const result = getSpacing(4);
    setResults((prev) => [...prev.slice(-4), result]);
    setCallCount((c) => c + 1);
  }, [getSpacing]);

  return (
    <div data-testid={testId} style={{ fontFamily: 'monospace', padding: '1rem' }}>
      <div data-testid={`${testId}-mode`}>Current mode: {mode}</div>
      <div data-testid={`${testId}-call-count`}>Call count: {callCount}</div>
      <div data-testid={`${testId}-results`}>Results: [{results.join(', ')}]</div>
      <button data-testid={`${testId}-call-button`} onClick={testGetSpacing}>
        Call getSpacing(4)
      </button>
    </div>
  );
}

const meta: Meta = {
  title: 'Utils/Density/useDensity/Tests',
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
  tags: ['test', 'utils', 'density'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// HOOK RETURN VALUE TESTS
// ============================================================================

export const HookReturnValuesTest: Story = {
  name: 'Hook Return Values',
  render: () => (
    <DensityProvider defaultMode="normal">
      <HookTestComponent testId="values" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('mode is a string', async () => {
      const typeElement = canvas.getByTestId('values-type-mode');
      await expect(typeElement).toHaveTextContent('typeof mode: string');
    });

    await step('multiplier is a number', async () => {
      const typeElement = canvas.getByTestId('values-type-multiplier');
      await expect(typeElement).toHaveTextContent('typeof multiplier: number');
    });

    await step('setMode is a function', async () => {
      const typeElement = canvas.getByTestId('values-type-setMode');
      await expect(typeElement).toHaveTextContent('typeof setMode: function');
    });

    await step('getSpacing is a function', async () => {
      const typeElement = canvas.getByTestId('values-type-getSpacing');
      await expect(typeElement).toHaveTextContent('typeof getSpacing: function');
    });
  },
};

// ============================================================================
// SET MODE FUNCTION TESTS
// ============================================================================

export const SetModeFunctionTest: Story = {
  name: 'setMode Function',
  render: () => (
    <DensityProvider defaultMode="normal">
      <HookTestComponent testId="setmode" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial mode is normal', async () => {
      const modeElement = canvas.getByTestId('setmode-mode');
      await expect(modeElement).toHaveTextContent('mode: normal');
    });

    await step('setMode changes to compact', async () => {
      const button = canvas.getByTestId('setmode-set-compact');
      await userEvent.click(button);

      const modeElement = canvas.getByTestId('setmode-mode');
      const multiplierElement = canvas.getByTestId('setmode-multiplier');

      await expect(modeElement).toHaveTextContent('mode: compact');
      await expect(multiplierElement).toHaveTextContent('multiplier: 0.8');
    });

    await step('setMode changes to spacious', async () => {
      const button = canvas.getByTestId('setmode-set-spacious');
      await userEvent.click(button);

      const modeElement = canvas.getByTestId('setmode-mode');
      const multiplierElement = canvas.getByTestId('setmode-multiplier');

      await expect(modeElement).toHaveTextContent('mode: spacious');
      await expect(multiplierElement).toHaveTextContent('multiplier: 1.25');
    });

    await step('setMode changes back to normal', async () => {
      const button = canvas.getByTestId('setmode-set-normal');
      await userEvent.click(button);

      const modeElement = canvas.getByTestId('setmode-mode');
      const multiplierElement = canvas.getByTestId('setmode-multiplier');

      await expect(modeElement).toHaveTextContent('mode: normal');
      await expect(multiplierElement).toHaveTextContent('multiplier: 1');
    });
  },
};

// ============================================================================
// GET SPACING FUNCTION TESTS
// ============================================================================

export const GetSpacingFunctionTest: Story = {
  name: 'getSpacing Function',
  render: () => (
    <DensityProvider defaultMode="normal">
      <HookTestComponent testId="getspacing" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('getSpacing returns correct value for normal mode', async () => {
      const spacingElement = canvas.getByTestId('getspacing-calculated-spacing');
      await expect(spacingElement).toHaveTextContent('getSpacing(2): 2');
    });

    await step('getSpacing updates when mode changes to compact', async () => {
      const compactButton = canvas.getByTestId('getspacing-set-compact');
      await userEvent.click(compactButton);

      const spacingElement = canvas.getByTestId('getspacing-calculated-spacing');
      await expect(spacingElement).toHaveTextContent('getSpacing(2): 1.6');
    });

    await step('getSpacing works with different input values', async () => {
      const input = canvas.getByTestId('getspacing-spacing-input');
      await userEvent.clear(input);
      await userEvent.type(input, '5');

      const spacingElement = canvas.getByTestId('getspacing-calculated-spacing');
      // 5 * 0.8 = 4
      await expect(spacingElement).toHaveTextContent('getSpacing(5): 4');
    });

    await step('getSpacing updates when mode changes to spacious', async () => {
      const spaciousButton = canvas.getByTestId('getspacing-set-spacious');
      await userEvent.click(spaciousButton);

      const spacingElement = canvas.getByTestId('getspacing-calculated-spacing');
      // 5 * 1.25 = 6.25
      await expect(spacingElement).toHaveTextContent('getSpacing(5): 6.25');
    });
  },
};

// ============================================================================
// GET SPACING STABILITY TESTS
// ============================================================================

export const GetSpacingStabilityTestStory: Story = {
  name: 'getSpacing Reference Stability',
  render: () => (
    <DensityProvider defaultMode="normal">
      <GetSpacingStabilityTest testId="stability" />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Multiple calls return consistent results', async () => {
      const callButton = canvas.getByTestId('stability-call-button');

      // Call getSpacing multiple times
      for (let i = 0; i < 3; i++) {
        await userEvent.click(callButton);
      }

      const resultsElement = canvas.getByTestId('stability-results');
      await expect(resultsElement).toHaveTextContent('Results: [4, 4, 4]');
    });

    await step('Call count is tracked correctly', async () => {
      const callCountElement = canvas.getByTestId('stability-call-count');
      await expect(callCountElement).toHaveTextContent('Call count: 3');
    });
  },
};

// ============================================================================
// HOOK WITHOUT PROVIDER TESTS
// ============================================================================

export const HookWithoutProviderTest: Story = {
  name: 'Hook Without Provider (Fallback)',
  render: () => <HookTestComponent testId="no-provider" />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Falls back to normal mode', async () => {
      const modeElement = canvas.getByTestId('no-provider-mode');
      await expect(modeElement).toHaveTextContent('mode: normal');
    });

    await step('Falls back to 1.0 multiplier', async () => {
      const multiplierElement = canvas.getByTestId('no-provider-multiplier');
      await expect(multiplierElement).toHaveTextContent('multiplier: 1');
    });

    await step('getSpacing works with fallback values', async () => {
      const spacingElement = canvas.getByTestId('no-provider-calculated-spacing');
      await expect(spacingElement).toHaveTextContent('getSpacing(2): 2');
    });

    await step('setMode is a no-op without provider', async () => {
      const compactButton = canvas.getByTestId('no-provider-set-compact');
      await userEvent.click(compactButton);

      // Mode should not change
      const modeElement = canvas.getByTestId('no-provider-mode');
      await expect(modeElement).toHaveTextContent('mode: normal');
    });
  },
};

// ============================================================================
// MULTIPLE CONSUMERS TESTS
// ============================================================================

export const MultipleConsumersTest: Story = {
  name: 'Multiple Hook Consumers',
  render: () => (
    <DensityProvider defaultMode="normal">
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
          <h4>Consumer 1</h4>
          <HookTestComponent testId="consumer-1" />
        </div>
        <div style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
          <h4>Consumer 2</h4>
          <HookTestComponent testId="consumer-2" />
        </div>
      </div>
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Both consumers start with same mode', async () => {
      const consumer1Mode = canvas.getByTestId('consumer-1-mode');
      const consumer2Mode = canvas.getByTestId('consumer-2-mode');

      await expect(consumer1Mode).toHaveTextContent('mode: normal');
      await expect(consumer2Mode).toHaveTextContent('mode: normal');
    });

    await step('Mode change from consumer 1 affects consumer 2', async () => {
      const consumer1CompactButton = canvas.getByTestId('consumer-1-set-compact');
      await userEvent.click(consumer1CompactButton);

      const consumer1Mode = canvas.getByTestId('consumer-1-mode');
      const consumer2Mode = canvas.getByTestId('consumer-2-mode');

      await expect(consumer1Mode).toHaveTextContent('mode: compact');
      await expect(consumer2Mode).toHaveTextContent('mode: compact');
    });

    await step('Mode change from consumer 2 affects consumer 1', async () => {
      const consumer2SpaciousButton = canvas.getByTestId('consumer-2-set-spacious');
      await userEvent.click(consumer2SpaciousButton);

      const consumer1Mode = canvas.getByTestId('consumer-1-mode');
      const consumer2Mode = canvas.getByTestId('consumer-2-mode');

      await expect(consumer1Mode).toHaveTextContent('mode: spacious');
      await expect(consumer2Mode).toHaveTextContent('mode: spacious');
    });
  },
};

// ============================================================================
// EDGE CASE TESTS
// ============================================================================

/**
 * Component for edge case testing
 */
function EdgeCasesComponent() {
  const { getSpacing } = useDensity();

  return (
    <div data-testid="edge-cases" style={{ fontFamily: 'monospace', padding: '1rem' }}>
      <div data-testid="edge-zero">getSpacing(0): {getSpacing(0)}</div>
      <div data-testid="edge-negative">getSpacing(-2): {getSpacing(-2)}</div>
      <div data-testid="edge-decimal">getSpacing(1.5): {getSpacing(1.5)}</div>
      <div data-testid="edge-large">getSpacing(100): {getSpacing(100)}</div>
    </div>
  );
}

export const EdgeCasesTest: Story = {
  name: 'Edge Cases',
  render: () => (
    <DensityProvider defaultMode="compact">
      <EdgeCasesComponent />
    </DensityProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Zero value', async () => {
      const element = canvas.getByTestId('edge-zero');
      await expect(element).toHaveTextContent('getSpacing(0): 0');
    });

    await step('Negative value', async () => {
      const element = canvas.getByTestId('edge-negative');
      // -2 * 0.8 = -1.6
      await expect(element).toHaveTextContent('getSpacing(-2): -1.6');
    });

    await step('Decimal value', async () => {
      const element = canvas.getByTestId('edge-decimal');
      // 1.5 * 0.8 = 1.2
      await expect(element).toHaveTextContent('getSpacing(1.5): 1.2');
    });

    await step('Large value', async () => {
      const element = canvas.getByTestId('edge-large');
      // 100 * 0.8 = 80
      await expect(element).toHaveTextContent('getSpacing(100): 80');
    });
  },
};
