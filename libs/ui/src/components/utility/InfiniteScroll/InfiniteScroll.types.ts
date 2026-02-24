import type { ReactNode } from 'react';

export type InfiniteScrollVariant = 'default' | 'reverse' | 'horizontal';

export interface InfiniteScrollProps {
  children: ReactNode;
  variant?: InfiniteScrollVariant;
  hasMore: boolean;
  loading: boolean;
  threshold?: number; // Distance from bottom/edge to trigger loading
  loadMore: () => void | Promise<void>;
  loader?: ReactNode;
  endMessage?: ReactNode;
  error?: Error | null;
  errorComponent?: ReactNode;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
  // Horizontal specific
  width?: number | string;
  scrollableTarget?: string | HTMLElement; // For custom scroll containers
  /**
   * Test mode: Bypasses IntersectionObserver and provides direct trigger.
   * Use only in test environments.
   * @internal
   */
  testMode?: boolean;
  /**
   * Test trigger: Function to manually trigger load more in test mode.
   * @internal
   */
  testTriggerRef?: React.MutableRefObject<(() => void) | undefined>;
}

export interface InfiniteScrollState {
  loading: boolean;
  hasMore: boolean;
  error: Error | null;
}