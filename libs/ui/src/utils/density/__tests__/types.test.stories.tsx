import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  DEFAULT_DENSITY_MODE,
  DENSITY_MODES,
  DENSITY_MULTIPLIERS,
  isDensityMode,
} from '../types';

/**
 * Test component that displays type guard test results
 */
function TypesTestComponent() {
  return (
    <div data-testid="types-test">
      <h2>isDensityMode Type Guard Tests</h2>

      <section data-testid="valid-modes">
        <h3>Valid Density Modes</h3>
        <ul>
          <li data-testid="valid-compact">
            isDensityMode(&quot;compact&quot;): {String(isDensityMode('compact'))}
          </li>
          <li data-testid="valid-normal">
            isDensityMode(&quot;normal&quot;): {String(isDensityMode('normal'))}
          </li>
          <li data-testid="valid-spacious">
            isDensityMode(&quot;spacious&quot;): {String(isDensityMode('spacious'))}
          </li>
        </ul>
      </section>

      <section data-testid="invalid-modes">
        <h3>Invalid Values</h3>
        <ul>
          <li data-testid="invalid-string">
            isDensityMode(&quot;invalid&quot;): {String(isDensityMode('invalid'))}
          </li>
          <li data-testid="invalid-number">
            isDensityMode(123): {String(isDensityMode(123))}
          </li>
          <li data-testid="invalid-null">
            isDensityMode(null): {String(isDensityMode(null))}
          </li>
          <li data-testid="invalid-undefined">
            isDensityMode(undefined): {String(isDensityMode(undefined))}
          </li>
          <li data-testid="invalid-object">
            isDensityMode(&#123;&#125;): {String(isDensityMode({}))}
          </li>
          <li data-testid="invalid-array">
            isDensityMode([]): {String(isDensityMode([]))}
          </li>
          <li data-testid="invalid-empty">
            isDensityMode(&quot;&quot;): {String(isDensityMode(''))}
          </li>
        </ul>
      </section>

      <section data-testid="constants">
        <h3>Constants Verification</h3>
        <ul>
          <li data-testid="default-mode">
            DEFAULT_DENSITY_MODE: {DEFAULT_DENSITY_MODE}
          </li>
          <li data-testid="modes-count">
            DENSITY_MODES.length: {DENSITY_MODES.length}
          </li>
          <li data-testid="compact-multiplier">
            DENSITY_MULTIPLIERS.compact: {DENSITY_MULTIPLIERS.compact}
          </li>
          <li data-testid="normal-multiplier">
            DENSITY_MULTIPLIERS.normal: {DENSITY_MULTIPLIERS.normal}
          </li>
          <li data-testid="spacious-multiplier">
            DENSITY_MULTIPLIERS.spacious: {DENSITY_MULTIPLIERS.spacious}
          </li>
        </ul>
      </section>
    </div>
  );
}

const meta: Meta<typeof TypesTestComponent> = {
  title: 'Utils/Density/Types Tests',
  component: TypesTestComponent,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TypesTestComponent>;

/**
 * Tests for isDensityMode type guard with valid density modes
 */
export const ValidModes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test valid density modes return true
    const validCompact = canvas.getByTestId('valid-compact');
    expect(validCompact).toHaveTextContent('true');

    const validNormal = canvas.getByTestId('valid-normal');
    expect(validNormal).toHaveTextContent('true');

    const validSpacious = canvas.getByTestId('valid-spacious');
    expect(validSpacious).toHaveTextContent('true');
  },
};

/**
 * Tests for isDensityMode type guard with invalid values
 */
export const InvalidValues: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test invalid values return false
    const invalidString = canvas.getByTestId('invalid-string');
    expect(invalidString).toHaveTextContent('false');

    const invalidNumber = canvas.getByTestId('invalid-number');
    expect(invalidNumber).toHaveTextContent('false');

    const invalidNull = canvas.getByTestId('invalid-null');
    expect(invalidNull).toHaveTextContent('false');

    const invalidUndefined = canvas.getByTestId('invalid-undefined');
    expect(invalidUndefined).toHaveTextContent('false');

    const invalidObject = canvas.getByTestId('invalid-object');
    expect(invalidObject).toHaveTextContent('false');

    const invalidArray = canvas.getByTestId('invalid-array');
    expect(invalidArray).toHaveTextContent('false');

    const invalidEmpty = canvas.getByTestId('invalid-empty');
    expect(invalidEmpty).toHaveTextContent('false');
  },
};

/**
 * Tests for density constants
 */
export const ConstantsVerification: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify default mode
    const defaultMode = canvas.getByTestId('default-mode');
    expect(defaultMode).toHaveTextContent('normal');

    // Verify modes count
    const modesCount = canvas.getByTestId('modes-count');
    expect(modesCount).toHaveTextContent('3');

    // Verify multipliers
    const compactMultiplier = canvas.getByTestId('compact-multiplier');
    expect(compactMultiplier).toHaveTextContent('0.8');

    const normalMultiplier = canvas.getByTestId('normal-multiplier');
    expect(normalMultiplier).toHaveTextContent('1');

    const spaciousMultiplier = canvas.getByTestId('spacious-multiplier');
    expect(spaciousMultiplier).toHaveTextContent('1.25');
  },
};

/**
 * Comprehensive test for all type guard scenarios
 */
export const AllTypeGuardTests: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Valid modes
    expect(canvas.getByTestId('valid-compact')).toHaveTextContent('true');
    expect(canvas.getByTestId('valid-normal')).toHaveTextContent('true');
    expect(canvas.getByTestId('valid-spacious')).toHaveTextContent('true');

    // Invalid values
    expect(canvas.getByTestId('invalid-string')).toHaveTextContent('false');
    expect(canvas.getByTestId('invalid-number')).toHaveTextContent('false');
    expect(canvas.getByTestId('invalid-null')).toHaveTextContent('false');
    expect(canvas.getByTestId('invalid-undefined')).toHaveTextContent('false');
    expect(canvas.getByTestId('invalid-object')).toHaveTextContent('false');
    expect(canvas.getByTestId('invalid-array')).toHaveTextContent('false');
    expect(canvas.getByTestId('invalid-empty')).toHaveTextContent('false');

    // Constants
    expect(canvas.getByTestId('default-mode')).toHaveTextContent('normal');
    expect(canvas.getByTestId('modes-count')).toHaveTextContent('3');
  },
};
