export type LoadingStateVariant = 'spinner' | 'skeleton';
export type LoadingStateSize = 'sm' | 'md' | 'lg';

export interface LoadingStateProps {
  /**
   * The visual style of the loading indicator
   * @default 'spinner'
   */
  variant?: LoadingStateVariant;

  /**
   * Optional message to display below the loading indicator
   */
  message?: string;

  /**
   * Size of the loading indicator
   * @default 'md'
   */
  size?: LoadingStateSize;

  /**
   * Number of skeleton rows to display (only for skeleton variant)
   * @default 3
   */
  skeletonRows?: number;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Test ID for component testing
   */
  dataTestId?: string;
}
