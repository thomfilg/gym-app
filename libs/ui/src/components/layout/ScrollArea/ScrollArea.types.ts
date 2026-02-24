import type { BoxProps } from '@mui/material/Box';
import type { ReactNode, RefObject } from 'react';

export type ScrollOrientation = 'vertical' | 'horizontal' | 'both';
export type ScrollbarSize = 'thin' | 'medium' | 'thick';
export type ScrollAreaVariant = 'default' | 'overlay' | 'glass';

export interface ScrollAreaProps extends Omit<BoxProps, 'children' | 'width' | 'height' | 'maxHeight' | 'maxWidth' | 'onResize' | 'onScroll'> {
  /** Content to be rendered inside the scrollable area */
  children: ReactNode;

  /** External ref to attach to the scrollable element - useful for composing with VirtualList */
  scrollRef?: RefObject<HTMLDivElement | null>;

  /** Width of the scroll area container */
  width?: number | string;

  /** Height of the scroll area container */
  height?: number | string;

  /** Maximum height before scrolling is enabled */
  maxHeight?: number | string;

  /** Maximum width before scrolling is enabled */
  maxWidth?: number | string;

  /** Scroll orientation */
  orientation?: ScrollOrientation;

  /** Size of the scrollbar */
  scrollbarSize?: ScrollbarSize;

  /** Whether scrollbars auto-hide when not in use */
  autoHide?: boolean;

  /** Auto-hide delay in milliseconds */
  autoHideDelay?: number;

  /** Enable smooth scrolling behavior */
  smoothScroll?: boolean;

  /** Visual variant of the scroll area */
  variant?: ScrollAreaVariant;

  /** Scroll event handler */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;

  /** Show scroll-to-top button */
  scrollToTopButton?: boolean;

  /** Threshold for showing scroll-to-top button (in pixels) */
  scrollToTopThreshold?: number;

  /** Custom scrollbar color */
  scrollbarColor?: string;

  /** Custom scrollbar track color */
  scrollbarTrackColor?: string;

  /** Padding for scroll content */
  contentPadding?: number | string;

  /** Always show scrollbars */
  alwaysShowScrollbar?: boolean;

  /** Disable scrolling */
  disabled?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Empty state content */
  emptyContent?: ReactNode;

  /** Test ID for testing */
  testId?: string;

  /** Callback when scroll area is resized - useful for responsive virtualization */
  onResize?: (dimensions: { width: number; height: number }) => void;
}
