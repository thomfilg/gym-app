import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';

export type TextVariant = 'body' | 'heading' | 'caption' | 'code';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  as?: keyof React.JSX.IntrinsicElements;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  children: React.ReactNode;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}
