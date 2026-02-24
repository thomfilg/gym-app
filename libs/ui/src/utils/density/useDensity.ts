import { useContext } from 'react';

import { DensityContext, type DensityContextValue } from './DensityContext';

/**
 * Hook to access density context values and utilities
 *
 * Returns the current density mode, multiplier, and helper functions
 * for calculating density-aware spacing values.
 *
 * Can be used outside of a DensityProvider - will fall back to 'normal' mode
 * with a 1.0 multiplier.
 *
 * @example
 * ```tsx
 * import { useDensity } from '@gym-app/ui/utils';
 *
 * function MyComponent() {
 *   const { mode, multiplier, setMode, getSpacing } = useDensity();
 *
 *   // Get scaled spacing value
 *   const padding = getSpacing(2); // Returns 1.6, 2, or 2.5 based on mode
 *
 *   return (
 *     <div style={{ padding: `${padding * 4}px` }}>
 *       Current mode: {mode} ({multiplier}x)
 *       <button onClick={() => setMode('compact')}>Compact</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns DensityContextValue containing mode, multiplier, setMode, and getSpacing
 */
export function useDensity(): DensityContextValue {
  return useContext(DensityContext);
}
