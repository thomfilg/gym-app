import type { CSSProperties,ReactNode } from 'react';

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  title?: string;
  description?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'minimal' | 'draggable';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  glow?: boolean;
  pulse?: boolean;
  glass?: boolean;
  gradient?: boolean;
  ripple?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  showHandle?: boolean;
  swipeable?: boolean;
  snapPoints?: number[];
  defaultSnapPoint?: number;
  onSnapPointChange?: (snapPoint: number) => void;
  minSnapPoint?: number;
  maxSnapPoint?: number;
  velocityThreshold?: number;
  dragResistance?: number;
  animationConfig?: {
    tension?: number;
    friction?: number;
    velocity?: number;
  };
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (snapPoint: number) => void;
  footer?: ReactNode;
  header?: ReactNode;
  persistent?: boolean;
  fullHeight?: boolean;
  rounded?: boolean;
  elevation?: number;
  dataTestId?: string;
}

export interface SheetHeaderProps {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  showHandle?: boolean;
  isDraggable?: boolean;
  onDragStart?: (e: React.MouseEvent | React.TouchEvent) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  dataTestId?: string;
}

export interface SheetContentProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  padded?: boolean;
  dataTestId?: string;
}

export interface SheetFooterProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  sticky?: boolean;
  divider?: boolean;
  dataTestId?: string;
}

export interface SheetOverlayProps {
  open?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  blur?: boolean;
}