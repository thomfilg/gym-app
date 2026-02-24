import { createContext } from 'react';

import {
  DEFAULT_DENSITY_MODE,
  DENSITY_MULTIPLIERS,
  type DensityMode,
} from './types';

/**
 * Context value interface for density state management
 */
export interface DensityContextValue {
  /** Current density mode */
  mode: DensityMode;
  /** Current density multiplier (derived from mode) */
  multiplier: number;
  /** Update the density mode */
  setMode: (mode: DensityMode) => void;
  /**
   * Calculate density-aware spacing value
   * @param baseValue - Base spacing value (typically in theme.spacing units)
   * @returns Scaled spacing value based on current density
   */
  getSpacing: (baseValue: number) => number;
  /**
   * Transition duration for density changes in milliseconds
   * 0 means transitions are disabled
   */
  transitionDuration: number;
}

/**
 * Default context value used when DensityProvider is not present
 * Falls back to 'normal' density mode
 */
const defaultContextValue: DensityContextValue = {
  mode: DEFAULT_DENSITY_MODE,
  multiplier: DENSITY_MULTIPLIERS[DEFAULT_DENSITY_MODE],
  setMode: () => {
    // No-op in default context
  },
  getSpacing: (baseValue: number) => baseValue,
  transitionDuration: 0,
};

/**
 * React Context for density state management
 *
 * Provides access to the current density mode and utilities for
 * calculating density-aware spacing values.
 *
 * @example
 * ```tsx
 * import { useContext } from 'react';
 * import { DensityContext } from '@gym-app/ui/utils';
 *
 * function MyComponent() {
 *   const { mode, getSpacing } = useContext(DensityContext);
 *   return <div style={{ padding: getSpacing(2) * 4 }}>Content</div>;
 * }
 * ```
 */
export const DensityContext = createContext<DensityContextValue>(defaultContextValue);

DensityContext.displayName = 'DensityContext';
