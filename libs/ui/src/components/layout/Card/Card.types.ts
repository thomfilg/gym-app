import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { ReactNode } from 'react';

import type { DensityMode } from '../../../utils/density/types';

export type CardVariant = 'elevated' | 'outlined' | 'glass' | 'gradient' | 'neumorphic' | 'section';
export type CardEntranceAnimation = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'grow' | 'none';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  children: ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  glow?: boolean;
  pulse?: boolean;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  loading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpandToggle?: (expanded: boolean) => void;
  entranceAnimation?: CardEntranceAnimation;
  animationDelay?: number;
  skeleton?: boolean;
  hoverScale?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  dataTestId?: string;
  /**
   * Density mode for responsive sizing.
   * When provided, overrides the global density context.
   * Affects padding and spacing throughout the card.
   */
  density?: DensityMode;
}

export interface CardHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  avatar?: ReactNode;
  children?: ReactNode;
  dataTestId?: string;
  /**
   * Density mode for responsive sizing.
   * When provided, overrides the global density context.
   * Affects padding of the header area.
   */
  density?: DensityMode;
}

export interface CardContentProps {
  children: ReactNode;
  /** @deprecated Use density prop instead */
  dense?: boolean;
  dataTestId?: string;
  /**
   * Density mode for responsive sizing.
   * When provided, overrides the global density context.
   * Affects padding of the content area.
   */
  density?: DensityMode;
}

export interface CardActionsProps {
  children: ReactNode;
  disableSpacing?: boolean;
  alignment?: 'left' | 'center' | 'right' | 'space-between';
  dataTestId?: string;
  /**
   * Density mode for responsive sizing.
   * When provided, overrides the global density context.
   * Affects padding of the actions area.
   */
  density?: DensityMode;
}

export interface CardMediaProps {
  component?: React.ElementType;
  image?: string;
  title?: string;
  height?: number | string;
  children?: ReactNode;
  dataTestId?: string;
}