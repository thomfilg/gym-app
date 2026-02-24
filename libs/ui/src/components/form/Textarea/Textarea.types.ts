import type { TextareaAutosizeProps } from '@mui/material/TextareaAutosize';
import type React from 'react';

export interface TextareaProps extends Omit<TextareaAutosizeProps, 'variant' | 'color' | 'size'> {
  /**
   * The variant of the textarea
   */
  variant?: 'default' | 'autosize' | 'resizable' | 'rich';

  /**
   * The color theme of the textarea
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

  /**
   * The size of the textarea
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether the textarea has an error
   */
  error?: boolean;

  /**
   * Help text to display below the textarea
   */
  helperText?: string;

  /**
   * Label for the textarea
   */
  label?: string;

  /**
   * Whether the label should have a glass effect
   */
  glassLabel?: boolean;

  /**
   * Whether the textarea should have a glow effect
   */
  glow?: boolean;

  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon
   */
  iconPosition?: 'start' | 'end';

  /**
   * Whether the textarea should have glass morphism effect
   */
  glass?: boolean;

  /**
   * Whether the textarea should have gradient borders
   */
  gradient?: boolean;

  /**
   * Minimum number of rows for autosize variant
   */
  minRows?: number;

  /**
   * Maximum number of rows for autosize variant
   */
  maxRows?: number;

  /**
   * Custom test ID for testing
   */
  dataTestId?: string;

  /**
   * Data attribute for testing (HTML standard format)
   */
  'data-testid'?: string;
}