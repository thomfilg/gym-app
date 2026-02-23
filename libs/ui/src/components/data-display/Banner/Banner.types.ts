import type { ReactNode } from 'react';

export type BannerVariant = 'info' | 'success' | 'warning' | 'critical';

export type BannerActionVariant = 'primary' | 'secondary';

export interface BannerAction {
  /** Button label text */
  label: string;
  /** Click handler function */
  onClick: () => void;
  /** Visual style variant */
  variant?: BannerActionVariant;
}

export interface BannerProps {
  /** Message severity type */
  variant?: BannerVariant;
  /** Main message title text */
  title?: string;
  /** Additional description text */
  description?: string;
  /** Custom icon React node */
  icon?: ReactNode;
  /** Whether banner can be dismissed */
  dismissible?: boolean;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** Array of action buttons */
  actions?: BannerAction[];
  /** Affix banner to top on scroll */
  sticky?: boolean;
  /** Span container or full viewport width */
  fullWidth?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** Children content */
  children?: ReactNode;
  /** Test ID for component testing */
  'data-testid'?: string;
}