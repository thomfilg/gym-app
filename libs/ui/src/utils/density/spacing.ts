import { DENSITY_MULTIPLIERS, type DensityMode } from './types';

/**
 * Default base pixel value for spacing calculations.
 * Aligns with MUI's default spacing unit (4px).
 */
export const DEFAULT_BASE_PIXELS = 4;

/**
 * Scale a spacing value by a density multiplier
 *
 * @param value - Base spacing value (typically in theme.spacing units)
 * @param multiplier - Density multiplier (0.8, 1.0, or 1.25)
 * @returns Scaled spacing value rounded to 2 decimal places
 *
 * @example
 * ```ts
 * scaleSpacing(2, 0.8);  // Returns 1.6 (compact)
 * scaleSpacing(2, 1.0);  // Returns 2 (normal)
 * scaleSpacing(2, 1.25); // Returns 2.5 (spacious)
 * ```
 */
export function scaleSpacing(value: number, multiplier: number): number {
  // Round to 2 decimal places to avoid floating point precision issues
  return Math.round(value * multiplier * 100) / 100;
}

/**
 * Get density-aware spacing for a given mode
 *
 * @param mode - Density mode ('compact', 'normal', or 'spacious')
 * @param baseValue - Base spacing value (typically in theme.spacing units)
 * @returns Scaled spacing value based on the mode's multiplier
 *
 * @example
 * ```ts
 * getResponsiveSpacing('compact', 2);  // Returns 1.6
 * getResponsiveSpacing('normal', 2);   // Returns 2
 * getResponsiveSpacing('spacious', 2); // Returns 2.5
 * ```
 */
export function getResponsiveSpacing(mode: DensityMode, baseValue: number): number {
  const multiplier = DENSITY_MULTIPLIERS[mode];
  return scaleSpacing(baseValue, multiplier);
}

/**
 * Create a spacing function bound to a specific density mode
 *
 * Useful for creating a stable spacing function for use in styling.
 *
 * @param mode - Density mode to bind to
 * @returns Function that calculates spacing for the given mode
 *
 * @example
 * ```ts
 * const spacing = createDensitySpacing('compact');
 * spacing(2); // Returns 1.6
 * spacing(4); // Returns 3.2
 * ```
 */
export function createDensitySpacing(mode: DensityMode): (baseValue: number) => number {
  const multiplier = DENSITY_MULTIPLIERS[mode];
  return (baseValue: number) => scaleSpacing(baseValue, multiplier);
}

/**
 * Calculate pixel value for density-aware spacing
 *
 * Converts spacing units to pixels using the standard 4px base unit
 * and applies the density multiplier.
 *
 * @param mode - Density mode
 * @param spacingUnits - Number of spacing units (1 unit = 4px base)
 * @returns Pixel value as a number
 *
 * @example
 * ```ts
 * // With 4px base unit:
 * getDensityPixels('normal', 2);   // Returns 8 (2 * 4 * 1.0)
 * getDensityPixels('compact', 2);  // Returns 6.4 (2 * 4 * 0.8)
 * getDensityPixels('spacious', 2); // Returns 10 (2 * 4 * 1.25)
 * ```
 */
export function getDensityPixels(
  mode: DensityMode,
  spacingUnits: number,
  basePixels: number = DEFAULT_BASE_PIXELS
): number {
  const multiplier = DENSITY_MULTIPLIERS[mode];
  return scaleSpacing(spacingUnits * basePixels, multiplier);
}

/**
 * Get CSS pixel string for density-aware spacing
 *
 * @param mode - Density mode
 * @param spacingUnits - Number of spacing units
 * @param basePixels - Base pixel value per unit (default: 4)
 * @returns CSS pixel string (e.g., "8px")
 *
 * @example
 * ```ts
 * getDensityPixelString('normal', 2);  // Returns "8px"
 * getDensityPixelString('compact', 2); // Returns "6.4px"
 * ```
 */
export function getDensityPixelString(
  mode: DensityMode,
  spacingUnits: number,
  basePixels: number = DEFAULT_BASE_PIXELS
): string {
  return `${getDensityPixels(mode, spacingUnits, basePixels)}px`;
}
