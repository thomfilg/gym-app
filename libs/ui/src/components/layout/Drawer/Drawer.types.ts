import type { HTMLAttributes,ReactNode } from 'react';

export type DrawerVariant = 'left' | 'right' | 'top' | 'bottom' | 'glass';
export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  variant?: DrawerVariant;
  anchor?: DrawerAnchor;
  width?: number | string;
  height?: number | string;
  persistent?: boolean;
  temporary?: boolean;
  backdrop?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  className?: string;
  dataTestId?: string;
}

export interface DrawerHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  dataTestId?: string;
}

export interface DrawerContentProps {
  children: ReactNode;
  padding?: boolean;
  dataTestId?: string;
}
