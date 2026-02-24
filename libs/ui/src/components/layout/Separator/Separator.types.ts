import type { ReactNode } from 'react';

export type SeparatorVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';
export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SeparatorProps {
  variant?: SeparatorVariant;
  orientation?: SeparatorOrientation;
  size?: SeparatorSize;
  color?: string;
  margin?: number | string;
  length?: number | string;
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}
