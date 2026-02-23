import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type * as React from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  /**
   * The variant of the button
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'text' | 'glass' | 'gradient';

  /**
   * The color of the button
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'neutral';

  /**
   * The size of the button
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether the button is in loading state
   */
  loading?: boolean;

  /**
   * Icon to display in the button
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon
   */
  iconPosition?: 'left' | 'right';

  /**
   * Whether the button should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the button should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Whether to show ripple effect on click
   */
  ripple?: boolean;

  /**
   * Whether the button is in active state
   */
  active?: boolean;

  /**
   * Click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Focus handler
   */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * Blur handler
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * Test ID for testing purposes
   */
  dataTestId?: string;
}