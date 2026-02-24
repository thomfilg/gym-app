import type { SxProps, Theme } from '@mui/material/styles';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type React from 'react';

export type InputVariant = 'outlined' | 'filled' | 'glass' | 'underline' | 'gradient';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
  floating?: boolean;
  glow?: boolean;
  pulse?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  'data-testid'?: string;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}
