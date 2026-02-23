import type { ModalProps as MuiModalProps } from '@mui/material/Modal';
import type { ReactNode } from 'react';

export type ModalVariant = 'center' | 'top' | 'bottom' | 'glass';
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps extends Omit<MuiModalProps, 'children'> {
  children: ReactNode;
  variant?: ModalVariant;
  size?: ModalSize;
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

export interface ModalContentProps {
  children: ReactNode;
  padding?: number | string;
  dataTestId?: string;
}