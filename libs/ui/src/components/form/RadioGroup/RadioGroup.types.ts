import type { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import type React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'color'> {
  /**
   * The variant of the radio group
   */
  variant?: 'default' | 'cards' | 'buttons' | 'segments';

  /**
   * The color theme of the radio group
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

  /**
   * The size of the radio group
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Array of radio options
   */
  options: RadioOption[];

  /**
   * Label for the radio group
   */
  label?: string;

  /**
   * Whether the radio group has an error
   */
  error?: boolean;

  /**
   * Help text to display below the radio group
   */
  helperText?: string;

  /**
   * Whether the label should have a glass effect
   */
  glassLabel?: boolean;

  /**
   * Whether the radio group should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the radio group should have glass morphism effect
   */
  glass?: boolean;

  /**
   * Whether the radio group should have gradient effects
   */
  gradient?: boolean;

  /**
   * Layout direction for the radio options
   */
  direction?: 'row' | 'column';

  /**
   * Whether to show descriptions for card variant
   */
  showDescriptions?: boolean;

  /**
   * Test ID for the radio group container element
   */
  dataTestId?: string;
}
