export type EmptyStateColor = 'default' | 'info' | 'success' | 'warning';

export interface EmptyStateProps {
  variant?: 'default' | 'illustrated' | 'minimal' | 'action';
  /**
   * Semantic color for the empty state
   * - 'default': Uses muted/neutral styling (text.secondary)
   * - 'info': Uses info palette (blue) - good for informational messages
   * - 'success': Uses success palette (green) - good for completion states
   * - 'warning': Uses warning palette (amber) - good for attention-needed states
   * @default 'default'
   */
  color?: EmptyStateColor;
  title: string;
  description?: string;
  illustration?: React.ReactNode; // SVG/Lottie/etc
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  helpLink?: { label: string; href: string; external?: boolean };
  /**
   * Callback for the refresh button
   * Displays a refresh button in the action area when provided
   */
  onRefresh?: () => void;
  /**
   * Custom label for the refresh button
   * @default 'Refresh'
   */
  refreshLabel?: string;
  /**
   * Callback for the create/add new button
   * Displays a create button in the action area when provided
   */
  onCreate?: () => void;
  /**
   * Custom label for the create button
   * @default 'Create New'
   */
  createLabel?: string;
  className?: string;
  dataTestId?: string;
}