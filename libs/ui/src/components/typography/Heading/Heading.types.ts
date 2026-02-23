import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'display';

export interface HeadingProps extends React.HTMLAttributes<globalThis.HTMLHeadingElement> {
  level?: HeadingLevel;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  gradient?: boolean;
  children: React.ReactNode;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}
