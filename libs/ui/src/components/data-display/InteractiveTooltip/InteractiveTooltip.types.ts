import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export interface InteractiveTooltipProps extends Omit<MuiTooltipProps, 'variant' | 'title'> {
  /**
   * The variant of the tooltip
   */
  variant?: 'default' | 'dark' | 'light' | 'glass';

  /**
   * Whether the tooltip should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the tooltip should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Size of the tooltip
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Maximum width of the tooltip
   */
  maxWidth?: number;

  /**
   * Test ID for the tooltip (applied to tooltip content)
   */
  dataTestId?: string;

  /**
   * Content to display when hovering (not pinned)
   */
  hoverContent: React.ReactNode;

  /**
   * Content to display when pinned (clicked)
   */
  pinnedContent: React.ReactNode;

  /**
   * Whether the tooltip is clickable to pin
   * @default true
   */
  clickable?: boolean;

  /**
   * Callback when tooltip is pinned
   */
  onPin?: () => void;

  /**
   * Callback when tooltip is unpinned
   */
  onUnpin?: () => void;

  /**
   * Custom class name for the tooltip wrapper
   */
  className?: string;
}
