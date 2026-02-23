import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import type React from 'react';

export interface AlertDialogProps extends Omit<MuiDialogProps, 'variant'> {
  /**
   * The variant of the alert dialog
   */
  variant?: 'default' | 'destructive' | 'glass';

  /**
   * Whether the dialog should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the dialog should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Title of the dialog
   */
  title?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Icon to display in the dialog
   */
  icon?: React.ReactNode;

  /**
   * Text for the cancel button
   */
  cancelText?: string;

  /**
   * Text for the confirm button
   */
  confirmText?: string;

  /**
   * Callback when cancel is clicked
   */
  onCancel?: () => void;

  /**
   * Callback when confirm is clicked
   */
  onConfirm?: () => void;

  /**
   * Whether to show the cancel button
   */
  showCancel?: boolean;

  /**
   * Whether the confirm action is loading
   */
  loading?: boolean;

  /**
   * Whether the confirm button is disabled
   */
  confirmDisabled?: boolean;

  /**
   * Optional data-testid attribute for testing
   */
  'data-testid'?: string;
}