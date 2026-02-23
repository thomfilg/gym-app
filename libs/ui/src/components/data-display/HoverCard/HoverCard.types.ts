import type { PopoverProps as MuiPopoverProps } from '@mui/material/Popover';
import type React from 'react';

export type HoverCardPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type HoverCardAnimation = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

export interface HoverCardProps extends Omit<MuiPopoverProps, 'variant' | 'open' | 'anchorEl'> {
  /**
   * The variant of the hover card
   */
  variant?: 'default' | 'glass' | 'detailed' | 'minimal';

  /**
   * Whether the card should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the card should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Title of the hover card
   */
  title?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Avatar/image source or React element
   */
  avatar?: string | React.ReactElement;

  /**
   * Custom trigger element
   */
  trigger?: React.ReactElement;

  /**
   * Placement of the hover card relative to trigger
   */
  placement?: HoverCardPlacement;

  /**
   * Whether to show an arrow pointing to trigger
   */
  showArrow?: boolean;

  /**
   * Animation type for entrance/exit
   */
  animation?: HoverCardAnimation;

  /**
   * Delay before showing hover card (ms)
   */
  enterDelay?: number;

  /**
   * Delay before hiding hover card (ms)
   */
  exitDelay?: number;

  /**
   * Maximum width of the card
   */
  maxWidth?: number;

  /**
   * Whether the card is in loading state
   */
  loading?: boolean;

  /**
   * Loading component to show when loading=true
   */
  loadingComponent?: React.ReactNode;

  /**
   * Whether to enable touch/click interaction on mobile devices
   */
  touchEnabled?: boolean;

  /**
   * Custom offset from the trigger element
   */
  offset?: number;

  /**
   * Whether to disable the hover card
   */
  disabled?: boolean;

  /**
   * Callback when hover card opens
   */
  onOpen?: () => void;

  /**
   * Callback when hover card closes
   */
  onClose?: () => void;

  /**
   * Data test ID for testing purposes
   */
  dataTestId?: string;
}