import type { CSSProperties, HTMLAttributes,ReactNode } from 'react';

export interface LabelProps extends HTMLAttributes<globalThis.HTMLLabelElement> {
  children?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  variant?: 'default' | 'filled' | 'outlined' | 'glass' | 'gradient' | 'minimal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  glow?: boolean;
  pulse?: boolean;
  glass?: boolean;
  gradient?: boolean;
  ripple?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  tooltip?: string | ReactNode;
  helperText?: string;
  asteriskPlacement?: 'start' | 'end';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  onClick?: (event: React.MouseEvent<globalThis.HTMLLabelElement>) => void;
  onFocus?: (event: React.FocusEvent<globalThis.HTMLLabelElement>) => void;
  onBlur?: (event: React.FocusEvent<globalThis.HTMLLabelElement>) => void;
  srOnly?: boolean;
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  align?: 'left' | 'center' | 'right';
  nowrap?: boolean;
  truncate?: boolean;
  dataTestId?: string;
}