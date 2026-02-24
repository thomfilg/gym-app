import { useCallback, useMemo } from 'react';

import { useDensity } from './useDensity';

/**
 * Theme spacing function signature (compatible with MUI theme.spacing)
 */
export type ThemeSpacingFn = (units: number) => string | number;

/**
 * Return type for useDensitySpacing hook
 */
export interface DensitySpacingResult {
  /** Get density-scaled spacing value */
  spacing: (units: number) => number;
  /** Get density-scaled spacing as CSS string (e.g., "8px") */
  spacingPx: (units: number) => string;
  /** Current density multiplier */
  multiplier: number;
}

/**
 * Hook for integrating density system with theme spacing functions
 *
 * Provides density-aware spacing that can integrate with MUI's theme.spacing
 * or similar theme systems. When a themeSpacingFn is provided, it will first
 * scale the units by the density multiplier, then apply the theme's spacing.
 *
 * @param themeSpacingFn - Optional theme spacing function (e.g., theme.spacing from MUI)
 * @param basePixels - Base pixel value per spacing unit (default: 4)
 * @returns Object with spacing functions and current multiplier
 *
 * @example
 * ```tsx
 * // Basic usage without theme integration
 * function Component() {
 *   const { spacing, spacingPx } = useDensitySpacing();
 *   return <div style={{ padding: spacingPx(2) }}>Content</div>;
 * }
 *
 * // With MUI theme integration
 * function ThemedComponent() {
 *   const theme = useTheme();
 *   const { spacing } = useDensitySpacing(theme.spacing);
 *   return <Box sx={{ p: spacing(2) }}>Content</Box>;
 * }
 *
 * // With custom base pixels
 * function CustomComponent() {
 *   const { spacingPx } = useDensitySpacing(undefined, 8);
 *   return <div style={{ margin: spacingPx(1) }}>Content</div>;
 * }
 * ```
 */
export function useDensitySpacing(
  themeSpacingFn?: ThemeSpacingFn,
  basePixels: number = 4
): DensitySpacingResult {
  const { getSpacing, multiplier } = useDensity();

  const spacing = useCallback(
    (units: number): number => {
      const scaledUnits = getSpacing(units);

      if (themeSpacingFn) {
        // When theme function is provided, apply it to scaled units
        const result = themeSpacingFn(scaledUnits);
        // If theme returns a string (e.g., "16px"), parse it
        if (typeof result === 'string') {
          return parseFloat(result) || scaledUnits * basePixels;
        }
        return result;
      }

      // Without theme function, convert to pixels using base
      return scaledUnits * basePixels;
    },
    [getSpacing, themeSpacingFn, basePixels]
  );

  const spacingPx = useCallback(
    (units: number): string => {
      return `${spacing(units)}px`;
    },
    [spacing]
  );

  return useMemo(
    () => ({
      spacing,
      spacingPx,
      multiplier,
    }),
    [spacing, spacingPx, multiplier]
  );
}
