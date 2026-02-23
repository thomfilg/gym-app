import type { CSSProperties,ReactNode } from 'react';

export interface MenubarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
  children?: MenubarItem[];
}

export interface MenubarProps {
  items: MenubarItem[];
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'minimal' | 'bordered';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  orientation?: 'horizontal' | 'vertical';
  glow?: boolean;
  pulse?: boolean;
  glass?: boolean;
  gradient?: boolean;
  ripple?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  logo?: ReactNode;
  endContent?: ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  blur?: boolean;
  elevation?: number;
  fullWidth?: boolean;
  onClick?: (item: MenubarItem) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  'data-testid'?: string;
}

export interface MenubarGroupProps {
  label: string;
  items: MenubarItem[];
  icon?: ReactNode;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClick?: (item: MenubarItem) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  className?: string;
  style?: CSSProperties;
}

export interface MenubarItemProps extends MenubarItem {
  selected?: boolean;
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  showShortcut?: boolean;
  ripple?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface MenubarSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
}
