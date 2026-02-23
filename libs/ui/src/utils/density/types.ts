/**
 * Density mode types for UI spacing control
 *
 * Density modes allow applications to adjust spacing throughout the UI:
 * - compact: 0.8x multiplier for dense information displays
 * - normal: 1.0x multiplier (default, standard spacing)
 * - spacious: 1.25x multiplier for increased readability
 */
export type DensityMode = 'compact' | 'normal' | 'spacious';

/**
 * Interface for components that support density prop (Interface Segregation Principle)
 */
export interface WithDensity {
  /** Density level for UI components. Default: 'spacious' */
  density?: DensityMode;
}

/**
 * Utility type for density-based style configurations.
 * Use this to define component-specific style configs for each density mode.
 *
 * @example
 * ```ts
 * interface CardStyleConfig {
 *   padding: string;
 *   gap: number;
 * }
 *
 * const CARD_STYLE_CONFIG: DensityStyleConfig<CardStyleConfig> = {
 *   compact: { padding: '0.5rem', gap: 4 },
 *   normal: { padding: '0.75rem', gap: 6 },
 *   spacious: { padding: '1rem', gap: 8 },
 * };
 * ```
 */
export type DensityStyleConfig<T> = Record<DensityMode, T>;

/**
 * Configuration for density settings (used by DensityProvider)
 */
export interface DensityProviderConfig {
  mode: DensityMode;
  multiplier: number;
}

/**
 * @deprecated Use DensityProviderConfig instead
 */
export type DensityConfig = DensityProviderConfig;

export { createDensityConfig, DEFAULT_DENSITY_MODE, DENSITY_MODES, DENSITY_MULTIPLIERS, DENSITY_STORAGE_KEY, isDensityMode } from './constants';
