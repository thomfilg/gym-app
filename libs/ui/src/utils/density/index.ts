/**
 * Density System
 *
 * A global density system for controlling UI spacing with three modes:
 * - compact: 0.8x multiplier for dense information displays
 * - normal: 1.0x multiplier (default, standard spacing)
 * - spacious: 1.25x multiplier for increased readability
 *
 * @example
 * ```tsx
 * import {
 *   DensityProvider,
 *   useDensity,
 *   type DensityMode,
 * } from '@gym-app/ui/utils';
 *
 * // Wrap your app with DensityProvider
 * function App() {
 *   return (
 *     <DensityProvider defaultMode="normal" persist>
 *       <Content />
 *     </DensityProvider>
 *   );
 * }
 *
 * // Use the density hook in components
 * function Content() {
 *   const { mode, multiplier, setMode, getSpacing } = useDensity();
 *
 *   return (
 *     <div style={{ padding: getSpacing(2) * 4 }}>
 *       Mode: {mode} ({multiplier}x)
 *     </div>
 *   );
 * }
 * ```
 */

// Types
export type { DensityMode, DensityConfig, DensityStyleConfig, DensityProviderConfig, WithDensity } from './types';
export {
  DENSITY_MULTIPLIERS,
  DENSITY_MODES,
  DEFAULT_DENSITY_MODE,
  DENSITY_STORAGE_KEY,
  isDensityMode,
  createDensityConfig,
} from './types';

// Context
export { DensityContext, type DensityContextValue } from './DensityContext';

// Provider
export {
  DensityProvider,
  DENSITY_CHANGE_EVENT,
  type DensityProviderProps,
  type DensityChangeEventDetail,
} from './DensityProvider';

// Hooks
export { useDensity } from './useDensity';
export {
  useDensitySpacing,
  type ThemeSpacingFn,
  type DensitySpacingResult,
} from './useDensitySpacing';

// Spacing utilities
export {
  DEFAULT_BASE_PIXELS,
  scaleSpacing,
  getResponsiveSpacing,
  createDensitySpacing,
  getDensityPixels,
  getDensityPixelString,
} from './spacing';
