export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'wave';
export type SkeletonAnimation = 'pulse' | 'wave' | false;
export type SkeletonIntensity = 'low' | 'medium' | 'high';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  count?: number;
  spacing?: number;
  borderRadius?: number | string;
  className?: string;
  intensity?: SkeletonIntensity;
  glassmorphism?: boolean;
  shimmer?: boolean;
  'data-testid'?: string;
  style?: React.CSSProperties;
}