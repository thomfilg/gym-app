import type { PopoverProps as MuiPopoverProps } from '@mui/material/Popover';

export interface PopoverProps extends Omit<MuiPopoverProps, 'variant'> {
  /**
   * The variant of the popover
   */
  variant?: 'default' | 'glass' | 'arrow';

  /**
   * Whether the popover should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the popover should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Whether to show an arrow pointing to the anchor
   */
  arrow?: boolean;

  /**
   * Maximum width of the popover
   */
  maxWidth?: number;

  /**
   * Test ID for testing purposes
   */
  dataTestId?: string;
}