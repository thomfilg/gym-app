import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Portal from '@mui/material/Portal';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import SuccessIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import React, { createContext, useCallback, useContext, useRef,useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { SonnerContextType,SonnerProps } from './Sonner.types';

const SonnerContext = createContext<SonnerContextType | null>(null);

interface SonnerItem extends SonnerProps {
  id: string;
  createdAt: number;
  visible: boolean;
}

export const SonnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<SonnerItem[]>([]);
  const toastCounter = useRef(0);

  const dismiss = useCallback((id?: string) => {
    if (id) {
      setToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast)),
      );

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300);
    } else {
      setToasts((prev) => prev.map((toast) => ({ ...toast, visible: false })));

      window.setTimeout(() => {
        setToasts([]);
      }, 300);
    }
  }, []);

  const addToast = useCallback(
    (toast: Omit<SonnerProps, 'id'>, type?: SonnerProps['type']): string => {
      const id = `sonner-${++toastCounter.current}`;
      const newToast: SonnerItem = {
        ...toast,
        id,
        type: type || toast.type || 'default',
        createdAt: Date.now(),
        visible: true,
      };

      setToasts((prev) => [...prev, newToast]);

      if (!toast.persistent && toast.duration !== 0) {
        const duration = toast.duration ?? 4000;
        window.setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss],
  );

  const toast = useCallback(
    (message: React.ReactNode, options?: Partial<SonnerProps>) => addToast({ ...options, title: message }, 'default'),
    [addToast],
  );

  const success = useCallback(
    (message: React.ReactNode, options?: Partial<SonnerProps>) => addToast({ ...options, title: message }, 'success'),
    [addToast],
  );

  const error = useCallback(
    (message: React.ReactNode, options?: Partial<SonnerProps>) => addToast({ ...options, title: message }, 'error'),
    [addToast],
  );

  const warning = useCallback(
    (message: React.ReactNode, options?: Partial<SonnerProps>) => addToast({ ...options, title: message }, 'warning'),
    [addToast],
  );

  const info = useCallback(
    (message: React.ReactNode, options?: Partial<SonnerProps>) => addToast({ ...options, title: message }, 'info'),
    [addToast],
  );

  const loading = useCallback(
    (message: React.ReactNode, options?: Partial<SonnerProps>) => addToast({ ...options, title: message, persistent: true }, 'loading'),
    [addToast],
  );

  const promise = useCallback(
    async <T,>(
      promiseToResolve: Promise<T>,
      options: {
        loading: React.ReactNode;
        success: React.ReactNode | ((data: T) => React.ReactNode);
        error: React.ReactNode | ((error: Error) => React.ReactNode);
      },
    ): Promise<T> => {
      const toastId = loading(options.loading);

      try {
        const data = await promiseToResolve;
        dismiss(toastId);

        const successMessage =
          typeof options.success === 'function' ? options.success(data) : options.success;

        success(successMessage);
        return data;
      } catch (err) {
        dismiss(toastId);

        const errorMessage =
          typeof options.error === 'function'
            ? options.error(err instanceof Error ? err : new Error(String(err)))
            : options.error;

        error(errorMessage);
        throw err;
      }
    },
    [loading, success, error, dismiss],
  );

  const contextValue: SonnerContextType = {
    toast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  };

  // Register this context globally for imperative API
  useRegisterGlobalToast(contextValue);

  return (
    <SonnerContext.Provider value={contextValue}>
      {children}
      <SonnerToaster toasts={toasts} onDismiss={dismiss} />
    </SonnerContext.Provider>
  );
};

export const useSonner = (): SonnerContextType => {
  const context = useContext(SonnerContext);
  if (!context) {
    throw new Error('useSonner must be used within a SonnerProvider');
  }
  return context;
};

const SonnerToast: React.FC<SonnerItem & { onDismiss: (id: string) => void }> = ({
  id,
  title,
  description,
  type = 'default',
  variant = 'default',
  closable = true,
  action,
  cancel,
  icon,
  important = false,
  visible,
  onDismiss,
}) => {
  const theme = useTheme();
  const { spacing } = useDensitySpacing();

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'success':
        return <SuccessIcon sx={{ fontSize: 20, color: 'success.main' }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 20, color: 'error.main' }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 20, color: 'warning.main' }} />;
      case 'info':
        return <InfoIcon sx={{ fontSize: 20, color: 'info.main' }} />;
      case 'loading':
        return <CircularProgress size={16} />;
      default:
        return null;
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: theme.spacing(1.5),
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[4],
      transition: theme.transitions.create(['all', 'transform', 'opacity'], {
        duration: theme.transitions.duration.short,
      }),
      transform: visible ? 'scale(1)' : 'scale(0.95)',
      opacity: visible ? 1 : 0,
    };

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          backgroundColor: alpha(theme.palette.background.paper, 0.1),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        };

      case 'minimal':
        return {
          ...baseStyles,
          backgroundColor: theme.palette.background.default,
          border: 'none',
          boxShadow: 'none',
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          borderRadius: 0,
        };

      default:
        return baseStyles;
    }
  };

  const handleDismiss = () => {
    onDismiss(id);
  };

  // Base padding: 2 spacing units (8px at normal density)
  const toastPadding = spacing(2);
  // Base margin-bottom: 1 spacing unit (4px at normal density)
  const toastMarginBottom = spacing(1);
  // Base gap: 1.5 spacing units (6px at normal density)
  const contentGap = spacing(1.5);
  // Base action spacing
  const actionMarginTop = spacing(1.5);

  return (
    <Collapse in={visible} timeout={200}>
      <Box
        role={important || type === 'error' ? 'alert' : 'status'}
        aria-live={important || type === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
        sx={{
          ...getVariantStyles(),
          p: `${toastPadding}px`,
          mb: `${toastMarginBottom}px`,
          minWidth: 356,
          maxWidth: 400,
          display: 'flex',
          alignItems: 'flex-start',
          gap: `${contentGap}px`,
        }}
      >
        {getIcon()}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {title && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: important ? 600 : 500,
                color: 'text.primary',
                mb: description ? 0.5 : 0,
              }}
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              {description}
            </Typography>
          )}

          {(action || cancel) && (
            <Box sx={{ display: 'flex', gap: 1, mt: `${actionMarginTop}px` }}>
              {action && (
                <Button
                  size="small"
                  onClick={action.onClick}
                  variant="contained"
                  sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}
                >
                  {action.label}
                </Button>
              )}
              {cancel && (
                <Button
                  size="small"
                  onClick={cancel.onClick}
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}
                >
                  {cancel.label}
                </Button>
              )}
            </Box>
          )}
        </Box>

        {closable && (
          <IconButton
            size="small"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            sx={{
              ml: 'auto',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Collapse>
  );
};

const SonnerToaster: React.FC<{
  toasts: SonnerItem[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  const { spacing } = useDensitySpacing();

  // Limit visible toasts to prevent overflow
  const MAX_VISIBLE_TOASTS = 5;
  const visibleToasts = toasts.slice(-MAX_VISIBLE_TOASTS);
  const hiddenCount = Math.max(0, toasts.length - MAX_VISIBLE_TOASTS);

  // Base position offset: 4 spacing units (16px at normal density)
  const positionOffset = spacing(4);

  return (
    <Portal>
      <Box
        sx={{
          position: 'fixed',
          top: `${positionOffset}px`,
          right: `${positionOffset}px`,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
          maxHeight: `calc(100vh - ${positionOffset * 2}px)`,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {hiddenCount > 0 && (
          <Box
            sx={{
              p: 1,
              mb: 0.5,
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'text.secondary',
              pointerEvents: 'none',
            }}
          >
            +{hiddenCount} more
          </Box>
        )}
        {visibleToasts.map((toast) => (
          <Box key={toast.id} sx={{ pointerEvents: 'auto' }}>
            <SonnerToast {...toast} onDismiss={onDismiss} />
          </Box>
        ))}
      </Box>
    </Portal>
  );
};

// Global toast instance for imperative API
let globalToastContext: SonnerContextType | null = null;

// Hook to register the global context (used internally by SonnerProvider)
export const useRegisterGlobalToast = (context: SonnerContextType) => {
  React.useEffect(() => {
    globalToastContext = context;
    return () => {
      globalToastContext = null;
    };
  }, [context]);
};

// Create a production-ready toast instance for imperative usage
const createToastInstance = (): SonnerContextType => {
  const warnNoProvider = () => {
    // Use a more React-appropriate warning mechanism
    if (typeof window !== 'undefined' && window.console && window.console.warn) {
      window.console.warn('Sonner: No SonnerProvider found. Please wrap your app with SonnerProvider.');
    }
  };

  const methods: SonnerContextType = {
    toast: (message: React.ReactNode, options?: Partial<SonnerProps>) => {
      if (!globalToastContext) {
        warnNoProvider();
        return 'no-provider';
      }
      return globalToastContext.toast(message, options);
    },
    success: (message: React.ReactNode, options?: Partial<SonnerProps>) => {
      if (!globalToastContext) {
        warnNoProvider();
        return 'no-provider';
      }
      return globalToastContext.success(message, options);
    },
    error: (message: React.ReactNode, options?: Partial<SonnerProps>) => {
      if (!globalToastContext) {
        warnNoProvider();
        return 'no-provider';
      }
      return globalToastContext.error(message, options);
    },
    warning: (message: React.ReactNode, options?: Partial<SonnerProps>) => {
      if (!globalToastContext) {
        warnNoProvider();
        return 'no-provider';
      }
      return globalToastContext.warning(message, options);
    },
    info: (message: React.ReactNode, options?: Partial<SonnerProps>) => {
      if (!globalToastContext) {
        warnNoProvider();
        return 'no-provider';
      }
      return globalToastContext.info(message, options);
    },
    loading: (message: React.ReactNode, options?: Partial<SonnerProps>) => {
      if (!globalToastContext) {
        warnNoProvider();
        return 'no-provider';
      }
      return globalToastContext.loading(message, options);
    },
    dismiss: (id?: string) => {
      if (!globalToastContext) {
        warnNoProvider();
        return;
      }
      globalToastContext.dismiss(id);
    },
    promise: async <T,>(
      promiseToResolve: Promise<T>,
      options: {
        loading: React.ReactNode;
        success: React.ReactNode | ((data: T) => React.ReactNode);
        error: React.ReactNode | ((error: Error) => React.ReactNode);
      },
    ): Promise<T> => {
      if (!globalToastContext) {
        warnNoProvider();
        throw new Error('No SonnerProvider found');
      }
      return globalToastContext.promise(promiseToResolve, options);
    },
  };

  return methods;
};

// Export toast instance for imperative API usage
export const toast = createToastInstance();

// Export Toaster as alias for SonnerProvider for stories compatibility
export const Toaster: React.FC<{
  children?: React.ReactNode;
  position?: string;
  theme?: string;
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
}> = ({ children }) => <SonnerProvider>{children}</SonnerProvider>;
