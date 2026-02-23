import type { DensityMode, DensityStyleConfig } from './types';

/**
 * Helper function to create a density configuration object.
 * Ensures all density modes are covered and provides type safety.
 *
 * @param config - Configuration for each density mode
 * @returns A Record mapping DensityMode to the config type
 *
 * @example
 * ```ts
 * const CARD_CONFIG = createDensityConfig({
 *   compact: { padding: '0.5rem', gap: 4 },
 *   normal: { padding: '0.75rem', gap: 6 },
 *   spacious: { padding: '1rem', gap: 8 },
 * });
 * ```
 */
export function createDensityConfig<T>(config: DensityStyleConfig<T>): DensityStyleConfig<T> {
  return config;
}

/**
 * Multiplier values for each density mode
 * These values are applied to base spacing units
 */
export const DENSITY_MULTIPLIERS: DensityStyleConfig<number> = {
  compact: 0.8,
  normal: 1.0,
  spacious: 1.25,
};

/**
 * Available density modes as an array for iteration
 */
export const DENSITY_MODES: DensityMode[] = ['compact', 'normal', 'spacious'];

/**
 * Default density mode
 */
export const DEFAULT_DENSITY_MODE: DensityMode = 'normal';

/**
 * LocalStorage key for persisting density preference
 */
export const DENSITY_STORAGE_KEY = 'ui-density-mode';

/**
 * Type guard to check if a value is a valid DensityMode
 *
 * @param value - Value to check
 * @returns True if value is a valid DensityMode
 *
 * @example
 * ```ts
 * const value = localStorage.getItem('density');
 * if (isDensityMode(value)) {
 *   // value is now typed as DensityMode
 *   setMode(value);
 * }
 * ```
 */
export function isDensityMode(value: unknown): value is DensityMode {
  return typeof value === 'string' && DENSITY_MODES.includes(value as DensityMode);
}
