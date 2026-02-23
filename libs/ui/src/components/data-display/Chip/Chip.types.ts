import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import type { DensityMode } from '../../../utils/density/types';

export type ChipVariant = 'filled' | 'outlined';
// Standard sizes following design system conventions
// Also supports 'small' and 'medium' for backwards compatibility with MUI
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'small' | 'medium';

export interface ChipProps {
  /** Content displayed in the chip (text or React elements) */
  label: ReactNode;

  /** Visual style variant */
  variant?: ChipVariant;

  /** Size of the chip */
  size?: ChipSize;

  /** Theme color token */
  color?: string;

  /** Source URL for avatar image */
  avatarSrc?: string;

  /** Custom avatar React node (overrides avatarSrc) */
  avatar?: ReactNode;

  /** Leading icon React node */
  icon?: ReactNode;

  /** Current selection state */
  selected?: boolean;

  /** Enables selection toggle capability */
  selectable?: boolean;

  /** Shows delete button */
  deletable?: boolean;

  /** Disables all interactions */
  disabled?: boolean;

  /** Click/selection handler */
  onClick?: () => void;

  /** Delete action handler */
  onDelete?: () => void;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for component testing */
  dataTestId?: string;

  /**
   * Density mode for responsive sizing.
   * When provided, overrides the global density context.
   * Affects padding, font-size, and height scaling.
   */
  density?: DensityMode;

  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}