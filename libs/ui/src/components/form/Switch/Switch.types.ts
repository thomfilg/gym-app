import type { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import type { FocusEventHandler,MouseEventHandler, ReactNode } from 'react';

export interface SwitchProps extends Omit<MuiSwitchProps, 'color' | 'size'> {
  /**
   * The variant of the switch
   */
  variant?: 'default' | 'ios' | 'android' | 'label' | 'material';

  /**
   * The color theme of the switch
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

  /**
   * The size of the switch
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Label text for the switch
   */
  label?: string;

  /**
   * Description text below the label
   */
  description?: string;

  /**
   * Whether the switch should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the switch should have glass morphism effect
   */
  glass?: boolean;

  /**
   * Whether the switch should have gradient effects
   */
  gradient?: boolean;

  /**
   * Position of the label relative to the switch
   */
  labelPosition?: 'start' | 'end' | 'top' | 'bottom';

  /**
   * Icon to show when switch is on
   */
  onIcon?: ReactNode;

  /**
   * Icon to show when switch is off
   */
  offIcon?: ReactNode;

  /**
   * Text to show when switch is on
   */
  onText?: string;

  /**
   * Text to show when switch is off
   */
  offText?: string;

  /**
   * Whether the switch has an error state
   */
  error?: boolean;

  /**
   * Help text to display
   */
  helperText?: string;

  /**
   * Custom width for the switch track
   */
  trackWidth?: number;

  /**
   * Custom height for the switch track
   */
  trackHeight?: number;

  /**
   * Whether to enable animations
   */
  animated?: boolean;

  /**
   * Whether the switch is in loading state
   */
  loading?: boolean;

  /**
   * Whether to show ripple effect
   */
  ripple?: boolean;

  /**
   * Whether the switch should have pulse animation
   */
  pulse?: boolean;

  /**
   * Click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Focus handler
   */
  onFocus?: FocusEventHandler<HTMLButtonElement>;

  /**
   * Blur handler
   */
  onBlur?: FocusEventHandler<HTMLButtonElement>;

  /**
   * Custom test ID for testing
   */
  dataTestId?: string;

}