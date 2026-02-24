import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  createDensitySpacing,
  getDensityPixels,
  getDensityPixelString,
  getResponsiveSpacing,
  scaleSpacing,
} from '../spacing';
import { DENSITY_MULTIPLIERS } from '../types';

/**
 * Test component that displays spacing calculation results
 */
function SpacingTestDisplay({
  testId,
  label,
  value,
}: {
  testId: string;
  label: string;
  value: string | number;
}) {
  return (
    <div data-testid={testId} style={{ padding: '0.5rem', fontFamily: 'monospace' }}>
      <strong>{label}:</strong> {String(value)}
    </div>
  );
}

const meta: Meta = {
  title: 'Utils/Density/Spacing/Tests',
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
  tags: ['test', 'utils', 'density'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// SCALE SPACING TESTS
// ============================================================================

export const ScaleSpacingTest: Story = {
  name: 'scaleSpacing - Basic Calculations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SpacingTestDisplay
        testId="compact-2"
        label="scaleSpacing(2, 0.8)"
        value={scaleSpacing(2, 0.8)}
      />
      <SpacingTestDisplay
        testId="normal-2"
        label="scaleSpacing(2, 1.0)"
        value={scaleSpacing(2, 1.0)}
      />
      <SpacingTestDisplay
        testId="spacious-2"
        label="scaleSpacing(2, 1.25)"
        value={scaleSpacing(2, 1.25)}
      />
      <SpacingTestDisplay
        testId="zero"
        label="scaleSpacing(0, 1.0)"
        value={scaleSpacing(0, 1.0)}
      />
      <SpacingTestDisplay
        testId="negative"
        label="scaleSpacing(-2, 0.8)"
        value={scaleSpacing(-2, 0.8)}
      />
      <SpacingTestDisplay
        testId="decimal"
        label="scaleSpacing(1.5, 0.8)"
        value={scaleSpacing(1.5, 0.8)}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Compact mode (0.8x)', async () => {
      const element = canvas.getByTestId('compact-2');
      await expect(element).toHaveTextContent('1.6');
    });

    await step('Normal mode (1.0x)', async () => {
      const element = canvas.getByTestId('normal-2');
      await expect(element).toHaveTextContent('2');
    });

    await step('Spacious mode (1.25x)', async () => {
      const element = canvas.getByTestId('spacious-2');
      await expect(element).toHaveTextContent('2.5');
    });

    await step('Zero value', async () => {
      const element = canvas.getByTestId('zero');
      await expect(element).toHaveTextContent('0');
    });

    await step('Negative value', async () => {
      const element = canvas.getByTestId('negative');
      await expect(element).toHaveTextContent('-1.6');
    });

    await step('Decimal value', async () => {
      const element = canvas.getByTestId('decimal');
      await expect(element).toHaveTextContent('1.2');
    });
  },
};

// ============================================================================
// GET RESPONSIVE SPACING TESTS
// ============================================================================

export const GetResponsiveSpacingTest: Story = {
  name: 'getResponsiveSpacing - Mode-based Calculations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SpacingTestDisplay
        testId="compact-mode"
        label="getResponsiveSpacing('compact', 2)"
        value={getResponsiveSpacing('compact', 2)}
      />
      <SpacingTestDisplay
        testId="normal-mode"
        label="getResponsiveSpacing('normal', 2)"
        value={getResponsiveSpacing('normal', 2)}
      />
      <SpacingTestDisplay
        testId="spacious-mode"
        label="getResponsiveSpacing('spacious', 2)"
        value={getResponsiveSpacing('spacious', 2)}
      />
      <SpacingTestDisplay
        testId="compact-4"
        label="getResponsiveSpacing('compact', 4)"
        value={getResponsiveSpacing('compact', 4)}
      />
      <SpacingTestDisplay
        testId="spacious-4"
        label="getResponsiveSpacing('spacious', 4)"
        value={getResponsiveSpacing('spacious', 4)}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Compact mode uses 0.8 multiplier', async () => {
      const element = canvas.getByTestId('compact-mode');
      await expect(element).toHaveTextContent('1.6');
    });

    await step('Normal mode uses 1.0 multiplier', async () => {
      const element = canvas.getByTestId('normal-mode');
      await expect(element).toHaveTextContent('2');
    });

    await step('Spacious mode uses 1.25 multiplier', async () => {
      const element = canvas.getByTestId('spacious-mode');
      await expect(element).toHaveTextContent('2.5');
    });

    await step('Compact with larger value', async () => {
      const element = canvas.getByTestId('compact-4');
      await expect(element).toHaveTextContent('3.2');
    });

    await step('Spacious with larger value', async () => {
      const element = canvas.getByTestId('spacious-4');
      await expect(element).toHaveTextContent('5');
    });
  },
};

// ============================================================================
// CREATE DENSITY SPACING TESTS
// ============================================================================

export const CreateDensitySpacingTest: Story = {
  name: 'createDensitySpacing - Factory Function',
  render: () => {
    const compactSpacing = createDensitySpacing('compact');
    const normalSpacing = createDensitySpacing('normal');
    const spaciousSpacing = createDensitySpacing('spacious');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <SpacingTestDisplay
          testId="factory-compact-2"
          label="compactSpacing(2)"
          value={compactSpacing(2)}
        />
        <SpacingTestDisplay
          testId="factory-normal-2"
          label="normalSpacing(2)"
          value={normalSpacing(2)}
        />
        <SpacingTestDisplay
          testId="factory-spacious-2"
          label="spaciousSpacing(2)"
          value={spaciousSpacing(2)}
        />
        <SpacingTestDisplay
          testId="factory-compact-8"
          label="compactSpacing(8)"
          value={compactSpacing(8)}
        />
        <SpacingTestDisplay
          testId="factory-spacious-8"
          label="spaciousSpacing(8)"
          value={spaciousSpacing(8)}
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Factory creates correct compact function', async () => {
      const element = canvas.getByTestId('factory-compact-2');
      await expect(element).toHaveTextContent('1.6');
    });

    await step('Factory creates correct normal function', async () => {
      const element = canvas.getByTestId('factory-normal-2');
      await expect(element).toHaveTextContent('2');
    });

    await step('Factory creates correct spacious function', async () => {
      const element = canvas.getByTestId('factory-spacious-2');
      await expect(element).toHaveTextContent('2.5');
    });

    await step('Factory functions work with larger values', async () => {
      const compactElement = canvas.getByTestId('factory-compact-8');
      const spaciousElement = canvas.getByTestId('factory-spacious-8');
      await expect(compactElement).toHaveTextContent('6.4');
      await expect(spaciousElement).toHaveTextContent('10');
    });
  },
};

// ============================================================================
// GET DENSITY PIXELS TESTS
// ============================================================================

export const GetDensityPixelsTest: Story = {
  name: 'getDensityPixels - Pixel Calculations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SpacingTestDisplay
        testId="pixels-normal-2"
        label="getDensityPixels('normal', 2)"
        value={getDensityPixels('normal', 2)}
      />
      <SpacingTestDisplay
        testId="pixels-compact-2"
        label="getDensityPixels('compact', 2)"
        value={getDensityPixels('compact', 2)}
      />
      <SpacingTestDisplay
        testId="pixels-spacious-2"
        label="getDensityPixels('spacious', 2)"
        value={getDensityPixels('spacious', 2)}
      />
      <SpacingTestDisplay
        testId="pixels-custom-base"
        label="getDensityPixels('normal', 2, 8)"
        value={getDensityPixels('normal', 2, 8)}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Normal mode: 2 units * 4px = 8px', async () => {
      const element = canvas.getByTestId('pixels-normal-2');
      await expect(element).toHaveTextContent('8');
    });

    await step('Compact mode: 2 units * 4px * 0.8 = 6.4px', async () => {
      const element = canvas.getByTestId('pixels-compact-2');
      await expect(element).toHaveTextContent('6.4');
    });

    await step('Spacious mode: 2 units * 4px * 1.25 = 10px', async () => {
      const element = canvas.getByTestId('pixels-spacious-2');
      await expect(element).toHaveTextContent('10');
    });

    await step('Custom base pixels: 2 units * 8px = 16px', async () => {
      const element = canvas.getByTestId('pixels-custom-base');
      await expect(element).toHaveTextContent('16');
    });
  },
};

// ============================================================================
// GET DENSITY PIXEL STRING TESTS
// ============================================================================

export const GetDensityPixelStringTest: Story = {
  name: 'getDensityPixelString - CSS String Output',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SpacingTestDisplay
        testId="string-normal-2"
        label="getDensityPixelString('normal', 2)"
        value={getDensityPixelString('normal', 2)}
      />
      <SpacingTestDisplay
        testId="string-compact-2"
        label="getDensityPixelString('compact', 2)"
        value={getDensityPixelString('compact', 2)}
      />
      <SpacingTestDisplay
        testId="string-spacious-2"
        label="getDensityPixelString('spacious', 2)"
        value={getDensityPixelString('spacious', 2)}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Returns correct CSS string for normal mode', async () => {
      const element = canvas.getByTestId('string-normal-2');
      await expect(element).toHaveTextContent('8px');
    });

    await step('Returns correct CSS string for compact mode', async () => {
      const element = canvas.getByTestId('string-compact-2');
      await expect(element).toHaveTextContent('6.4px');
    });

    await step('Returns correct CSS string for spacious mode', async () => {
      const element = canvas.getByTestId('string-spacious-2');
      await expect(element).toHaveTextContent('10px');
    });
  },
};

// ============================================================================
// DENSITY MULTIPLIERS TESTS
// ============================================================================

export const DensityMultipliersTest: Story = {
  name: 'DENSITY_MULTIPLIERS - Constants Verification',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SpacingTestDisplay
        testId="multiplier-compact"
        label="DENSITY_MULTIPLIERS.compact"
        value={DENSITY_MULTIPLIERS.compact}
      />
      <SpacingTestDisplay
        testId="multiplier-normal"
        label="DENSITY_MULTIPLIERS.normal"
        value={DENSITY_MULTIPLIERS.normal}
      />
      <SpacingTestDisplay
        testId="multiplier-spacious"
        label="DENSITY_MULTIPLIERS.spacious"
        value={DENSITY_MULTIPLIERS.spacious}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Compact multiplier is 0.8', async () => {
      const element = canvas.getByTestId('multiplier-compact');
      await expect(element).toHaveTextContent('0.8');
    });

    await step('Normal multiplier is 1', async () => {
      const element = canvas.getByTestId('multiplier-normal');
      await expect(element).toHaveTextContent('1');
    });

    await step('Spacious multiplier is 1.25', async () => {
      const element = canvas.getByTestId('multiplier-spacious');
      await expect(element).toHaveTextContent('1.25');
    });
  },
};

// ============================================================================
// PRECISION TESTS
// ============================================================================

export const PrecisionTest: Story = {
  name: 'Floating Point Precision',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SpacingTestDisplay
        testId="precision-1"
        label="scaleSpacing(3, 0.8)"
        value={scaleSpacing(3, 0.8)}
      />
      <SpacingTestDisplay
        testId="precision-2"
        label="scaleSpacing(7, 0.8)"
        value={scaleSpacing(7, 0.8)}
      />
      <SpacingTestDisplay
        testId="precision-3"
        label="scaleSpacing(1, 1.25)"
        value={scaleSpacing(1, 1.25)}
      />
      <SpacingTestDisplay
        testId="precision-4"
        label="scaleSpacing(3, 1.25)"
        value={scaleSpacing(3, 1.25)}
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('3 * 0.8 = 2.4 (not 2.4000000000000004)', async () => {
      const element = canvas.getByTestId('precision-1');
      await expect(element).toHaveTextContent('2.4');
    });

    await step('7 * 0.8 = 5.6 (not 5.6000000000000005)', async () => {
      const element = canvas.getByTestId('precision-2');
      await expect(element).toHaveTextContent('5.6');
    });

    await step('1 * 1.25 = 1.25', async () => {
      const element = canvas.getByTestId('precision-3');
      await expect(element).toHaveTextContent('1.25');
    });

    await step('3 * 1.25 = 3.75', async () => {
      const element = canvas.getByTestId('precision-4');
      await expect(element).toHaveTextContent('3.75');
    });
  },
};
