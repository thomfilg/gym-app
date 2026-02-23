import type { ToggleButtonProps } from '@mui/material/ToggleButton';
import type React from 'react';

export interface ToggleProps extends Omit<ToggleButtonProps, 'color' | 'size'> {
  /**
   * The variant of the toggle
   */
  variant?: 'default' | 'outline' | 'soft';

  /**
   * The color theme of the toggle
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

  /**
   * The size of the toggle
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Icon for the toggle
   */
  icon?: React.ReactNode;

  /**
   * Whether the toggle should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the toggle should have glass morphism effect
   */
  glass?: boolean;

  /**
   * Whether the toggle should have gradient effects
   */
  gradient?: boolean;

  /**
   * Whether the toggle is in loading state
   */
  loading?: boolean;

  /**
   * Whether to show ripple effect
   */
  ripple?: boolean;

  /**
   * Whether the toggle should have pulse animation
   */
  pulse?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, value: string | number | undefined) => void;

  /**
   * Focus handler
   */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * Blur handler
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * Change handler
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: string | number | undefined) => void;

  /**
   * Test ID for the toggle button (applied via data-testid)
   */
  dataTestId?: string;
}