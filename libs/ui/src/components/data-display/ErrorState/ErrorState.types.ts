export type ErrorStateSeverity = 'error' | 'warning';

export interface ErrorStateProps {
  /**
   * The error message to display
   */
  message: string;

  /**
   * Optional title for the error state
   */
  title?: string;

  /**
   * Callback function when retry button is clicked
   */
  onRetry?: () => void;

  /**
   * Custom label for the retry button
   * @default 'Retry'
   */
  retryLabel?: string;

  /**
   * Visual severity of the error
   * @default 'error'
   */
  severity?: ErrorStateSeverity;

  /**
   * Optional custom icon to display
   */
  icon?: React.ReactNode;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Test ID for component testing
   */
  dataTestId?: string;
}
