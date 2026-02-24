import type { ReactNode } from 'react';

export type SonnerVariant = 'default' | 'glass' | 'minimal';
export type SonnerType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface SonnerProps {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  type?: SonnerType;
  variant?: SonnerVariant;
  duration?: number;
  persistent?: boolean;
  closable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
  important?: boolean;
  onClose?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export interface SonnerToasterProps {
  position?:
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';
  hotkey?: string[];
  richColors?: boolean;
  expand?: boolean;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: Partial<SonnerProps>;
  className?: string;
  style?: React.CSSProperties;
  offset?: string | number;
  dir?: 'rtl' | 'ltr' | 'auto';
}

export interface SonnerContextType {
  toast: (message: ReactNode, options?: Partial<SonnerProps>) => string;
  success: (message: ReactNode, options?: Partial<SonnerProps>) => string;
  error: (message: ReactNode, options?: Partial<SonnerProps>) => string;
  warning: (message: ReactNode, options?: Partial<SonnerProps>) => string;
  info: (message: ReactNode, options?: Partial<SonnerProps>) => string;
  loading: (message: ReactNode, options?: Partial<SonnerProps>) => string;
  dismiss: (id?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: ReactNode;
      success: ReactNode | ((data: T) => ReactNode);
      error: ReactNode | ((error: Error) => ReactNode);
    },
  ) => Promise<T>;
}
