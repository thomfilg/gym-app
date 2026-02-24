import type { BadgeProps as MuiBadgeProps } from '@mui/material/Badge';
import type React from 'react';

export type BadgeVariant =
  | 'default'
  | 'dot'
  | 'count'
  | 'gradient'
  | 'glass'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<MuiBadgeProps, 'variant' | 'color' | 'content'> {
  /**
   * The variant of the badge
   */
  variant?: BadgeVariant;

  /**
   * The size of the badge
   */
  size?: BadgeSize;

  /**
   * The color of the badge
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' | 'info';

  /**
   * Whether the badge should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the badge should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Whether to animate the badge on mount
   */
  animate?: boolean;

  /**
   * Maximum count to display (shows "max+" when exceeded)
   */
  max?: number;

  /**
   * Whether to show zero count
   */
  showZero?: boolean;

  /**
   * Custom content for the badge
   */
  content?: React.ReactNode;

  /**
   * Position of the badge
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * ARIA live region behavior
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';

  /**
   * Whether the live region should be atomic
   */
  'aria-atomic'?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether the badge should be closable
   */
  closable?: boolean;

  /**
   * Callback when badge is closed
   */
  onClose?: () => void;

  /**
   * Whether to show a shimmer effect
   */
  shimmer?: boolean;

  /**
   * Whether to bounce on mount
   */
  bounce?: boolean;

  /**
   * Custom icon element to display in the badge
   */
  icon?: React.ReactNode;

  /**
   * Custom test ID for testing
   */
  'data-testid'?: string;
}