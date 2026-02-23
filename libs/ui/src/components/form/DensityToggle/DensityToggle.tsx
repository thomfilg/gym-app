import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import {
  DENSITY_MODES,
  type DensityMode,
  useDensity,
} from '../../../utils/density';
import { Tooltip } from '../../data-display/Tooltip';
import { Button } from '../Button';

// Icon mapping for each density mode
const DENSITY_ICONS: Record<DensityMode, ReactNode> = {
  compact: <DensitySmallIcon sx={{ fontSize: '1rem' }} />,
  normal: <DensityMediumIcon sx={{ fontSize: '1rem' }} />,
  spacious: <DensityLargeIcon sx={{ fontSize: '1rem' }} />,
};

// Labels for each density mode
const DENSITY_LABELS: Record<DensityMode, string> = {
  compact: 'Compact',
  normal: 'Normal',
  spacious: 'Spacious',
};

export interface DensityToggleProps {
  /**
   * Button variant
   * @default 'outline'
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'glass' | 'gradient' | 'text';
  /**
   * Button size
   * @default 'sm'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Whether to show the full label (mobile mode) or just icon
   * @default false
   */
  mobile?: boolean;
  /**
   * Custom sx props
   */
  sx?: SxProps<Theme>;
  /**
   * Aria label for accessibility
   * @default 'Toggle density'
   */
  'aria-label'?: string;
}

/**
 * DensityToggle - A button that cycles through density modes (compact/normal/spacious)
 *
 * Shows the current density mode icon and cycles to the next mode on click.
 * Can be used in headers, toolbars, or settings panels.
 *
 * @example
 * ```tsx
 * // Icon-only mode (default)
 * <DensityToggle />
 *
 * // Full label mode (for mobile menus)
 * <DensityToggle mobile />
 *
 * // Custom variant and size
 * <DensityToggle variant="ghost" size="md" />
 * ```
 */
export function DensityToggle({
  variant = 'outline',
  size = 'sm',
  mobile = false,
  sx,
  'aria-label': ariaLabel = 'Toggle density',
}: DensityToggleProps) {
  const { mode, setMode } = useDensity();

  // Cycle to next density mode
  const handleClick = () => {
    const currentIndex = DENSITY_MODES.indexOf(mode);
    const nextIndex = (currentIndex + 1) % DENSITY_MODES.length;
    setMode(DENSITY_MODES[nextIndex]);
  };

  const currentLabel = DENSITY_LABELS[mode];
  const currentIcon = DENSITY_ICONS[mode];
  const tooltipText = `Density: ${currentLabel} (click to change)`;

  if (mobile) {
    // Full label mode for mobile menus
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        icon={currentIcon}
        iconPosition="left"
        aria-label={ariaLabel}
        sx={{
          justifyContent: 'flex-start',
          width: '100%',
          ...sx,
        }}
      >
        Density: {currentLabel}
      </Button>
    );
  }

  // Icon-only mode with tooltip
  return (
    <Tooltip title={tooltipText} placement="bottom">
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        aria-label={ariaLabel}
        sx={{
          minWidth: '36px',
          width: '36px',
          height: '36px',
          padding: 0,
          ...sx,
        }}
      >
        {currentIcon}
      </Button>
    </Tooltip>
  );
}
