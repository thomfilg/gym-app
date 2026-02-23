import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export type CollapsibleVariant = 'default' | 'smooth' | 'spring';

export interface CollapsibleProps {
  children: ReactNode;
  open: boolean;
  variant?: CollapsibleVariant;
  duration?: number;
  easing?: string;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  keepMounted?: boolean;
  /** Maximum height constraint - useful when child has scrollable content */
  maxHeight?: number;
  sx?: SxProps<Theme>;
  className?: string;
  dataTestId?: string;
}

export interface CollapsibleTriggerProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  expanded?: boolean;
  className?: string;
  dataTestId?: string;
}

export interface CollapsibleContentProps {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
}