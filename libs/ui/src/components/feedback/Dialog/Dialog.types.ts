import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export type DialogVariant = 'default' | 'glass' | 'fullscreen' | 'drawer';
export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DialogProps extends Omit<MuiDialogProps, 'variant' | 'title'> {
  children: ReactNode;
  variant?: DialogVariant;
  size?: DialogSize;
  title?: ReactNode;
  description?: string;
  showCloseButton?: boolean;
  backdrop?: boolean;
  persistent?: boolean;
  glass?: boolean;
  gradient?: boolean;
  glow?: boolean;
  pulse?: boolean;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClose?: () => void;
  dataTestId?: string;
}

export interface DialogHeaderProps {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  dataTestId?: string;
}

export interface DialogContentProps {
  children: ReactNode;
  dividers?: boolean;
  dense?: boolean;
  dataTestId?: string;
}

export interface DialogActionsProps {
  children: ReactNode;
  alignment?: 'left' | 'center' | 'right' | 'space-between';
  spacing?: number;
  dataTestId?: string;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}