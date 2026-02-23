import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Slide from '@mui/material/Slide';
import { alpha, styled, useTheme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type {
  FC,
  ReactNode,
} from 'react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ModalInfo, ModalStackContextValue, StackedModalProps } from './StackedModal.types';

// Modal Stack Context
const ModalStackContext = createContext<ModalStackContextValue>({
  stack: [],
  pushModal: () => {
    /** do nothing */
  },
  popModal: () => {
    /** do nothing */
  },
  clearStack: () => {
    /** do nothing */
  },
  currentDepth: 0,
  isModalInStack: () => false,
  getModalRole: () => null,
});

// Hook to use modal stack
export const useModalStack = () => {
  const context = useContext(ModalStackContext);
  if (!context) {
    throw new Error('useModalStack must be used within a ModalStackProvider');
  }
  return context;
};

// Modal Stack Provider
export const ModalStackProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [stack, setStack] = useState<ModalInfo[]>([]);
  const baseZIndex = 1300; // MUI Dialog default z-index

  // Manage body scroll lock at provider level
  // Uses removeProperty instead of save/restore to avoid conflicts with MUI's scroll lock
  useEffect(() => {
    if (stack.length > 0) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Remove inline style entirely — lets CSS defaults take over
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    };
  }, [stack.length]);

  const pushModal = useCallback(
    (modalId: string) => {
      setStack((prev) => {
        // Check if modal already exists
        if (prev.some((m) => m.id === modalId)) return prev;

        // Update roles for existing modals
        const updatedStack = prev.map((modal, index) => ({
          ...modal,
          role:
            index === prev.length - 1 ? 'secondary' : ('background' as 'secondary' | 'background'),
        }));

        // Add new modal as primary
        return [
          ...updatedStack,
          {
            id: modalId,
            zIndex: baseZIndex + prev.length * 10,
            role: 'primary' as const,
          },
        ];
      });
    },
    [baseZIndex],
  );

  const popModal = useCallback((modalId?: string) => {
    setStack((prev) => {
      if (modalId) {
        // Remove specific modal
        const newStack = prev.filter((m) => m.id !== modalId);
        // Update roles
        return newStack.map(
          (modal, index) =>
            ({
              ...modal,
              role:
                index === newStack.length - 1
                  ? 'primary'
                  : index === newStack.length - 2
                    ? 'secondary'
                    : 'background',
            }) as ModalInfo,
        );
      } else {
        // Remove top modal
        const newStack = prev.slice(0, -1);
        // Update roles
        return newStack.map(
          (modal, index) =>
            ({
              ...modal,
              role:
                index === newStack.length - 1
                  ? 'primary'
                  : index === newStack.length - 2
                    ? 'secondary'
                    : 'background',
            }) as ModalInfo,
        );
      }
    });
  }, []);

  const clearStack = useCallback(() => {
    setStack([]);
  }, []);

  const isModalInStack = useCallback(
    (modalId: string) => stack.some((m) => m.id === modalId),
    [stack],
  );

  const getModalRole = useCallback(
    (modalId: string) => {
      const modal = stack.find((m) => m.id === modalId);
      return modal?.role || null;
    },
    [stack],
  );

  const value = useMemo(
    () => ({
      stack,
      pushModal,
      popModal,
      clearStack,
      currentDepth: stack.length,
      isModalInStack,
      getModalRole,
    }),
    [stack, pushModal, popModal, clearStack, isModalInStack, getModalRole],
  );

  return <ModalStackContext.Provider value={value}>{children}</ModalStackContext.Provider>;
};

// Focus trap helper
const useFocusTrap = (ref: React.RefObject<HTMLElement | null>, isActive: boolean, disabled?: boolean) => {
  useEffect(() => {
    if (!isActive || disabled || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element
    window.setTimeout(() => firstElement?.focus(), 100);

    const handleTabKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    return () => element.removeEventListener('keydown', handleTabKey);
  }, [ref, isActive, disabled]);
};

// Styled Components
const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) =>
    !['modalRole', 'isAnimating', 'glass', 'rtl', 'customMaxWidth'].includes(prop as string),
})<{ modalRole?: string; isAnimating?: boolean; glass?: boolean; rtl?: boolean; customMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false }>(
  ({ theme, modalRole, isAnimating, glass, rtl, customMaxWidth }) => {
    // Map MUI breakpoint values to pixel widths
    const maxWidthMap = {
      xs: 444,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    };

    const maxWidthPx = customMaxWidth !== false && customMaxWidth ? maxWidthMap[customMaxWidth as keyof typeof maxWidthMap] : null;

    return ({
      direction: rtl ? 'rtl' : 'ltr',
      '& .MuiBackdrop-root': {
        backgroundColor:
          modalRole === 'secondary'
            ? 'rgba(0, 0, 0, 0.3)'
            : modalRole === 'background'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: modalRole === 'primary' ? 'blur(4px)' : 'none',
      },
      '& .MuiDialog-container': {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      },
      '& .MuiDialog-paper': {
        margin: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        maxHeight: '100vh',
        borderRadius: 0,
        willChange: 'transform, width, border-radius',
        transition: theme.transitions.create(
          ['width', 'max-width', 'border-radius', 'transform', 'opacity'],
          {
            duration: 300,
            easing: theme.transitions.easing.easeInOut,
          },
        ),
        ...(modalRole === 'primary' && {
          // Mobile: 100%
          [theme.breakpoints.down('sm')]: {
            width: maxWidthPx ? `min(100%, ${maxWidthPx}px)` : '100%',
            maxWidth: maxWidthPx ? `${maxWidthPx}px` : '100%',
          },
          // Tablet: 90%
          [theme.breakpoints.between('sm', 'md')]: {
            width: maxWidthPx ? `min(90vw, ${maxWidthPx}px)` : '90vw',
            maxWidth: maxWidthPx ? `${maxWidthPx}px` : '90vw',
          },
          // Desktop: 80%
          [theme.breakpoints.between('md', 'lg')]: {
            width: maxWidthPx ? `min(80vw, ${maxWidthPx}px)` : '80vw',
            maxWidth: maxWidthPx ? `${maxWidthPx}px` : '80vw',
          },
          // Large screens: 70%
          [theme.breakpoints.up('lg')]: {
            width: maxWidthPx ? `min(70vw, ${maxWidthPx}px)` : '70vw',
            maxWidth: maxWidthPx ? `${maxWidthPx}px` : '70vw',
          },
        }),
        ...(modalRole === 'secondary' && {
          width: '100vw !important',
          maxWidth: '100vw !important',
          right: '0 !important',
          top: '0 !important',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: '0 !important',
          opacity: 0.95,
          transform: 'scale(1)',
        }),
        ...(modalRole === 'background' && {
          display: 'none', // Hide background modals for performance
        }),
        ...(glass &&
          modalRole === 'primary' && {
          backgroundColor: alpha(theme.palette.background.paper, 0.85),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
        }),
        ...(isAnimating && {
          animation:
            modalRole === 'secondary'
              ? 'expandModal 300ms ease-in-out forwards'
              : modalRole === 'primary'
                ? 'contractModal 300ms ease-in-out forwards'
                : 'none',
        }),
      },
      '@keyframes expandModal': {
        from: {
          width: '70vw',
          transform: 'translateX(0)',
        },
        to: {
          width: '100vw',
          transform: 'translateX(0)',
        },
      },
      '@keyframes contractModal': {
        from: {
          width: '100vw',
          transform: 'translateX(0)',
        },
        to: {
          width: '70vw',
          transform: 'translateX(0)',
        },
      },
    });
  },
);

const StyledDialogTitle = styled(DialogTitle, {
  shouldForwardProp: (prop) => !['rtl'].includes(prop as string),
})<{ rtl?: boolean }>(({ theme, rtl }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // Padding will be set dynamically via sx prop based on density
  borderBottom: `1px solid ${theme.palette.divider}`,
  direction: rtl ? 'rtl' : 'ltr',
}));

const DialogTitleLeft = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  // Gap will be set dynamically via sx prop based on density
  flex: 1,
}));

const DialogTitleRight = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  // Gap will be set dynamically via sx prop based on density
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  zIndex: 9999,
}));

// Modal subcomponents
const BaseStackedModalContent = styled(DialogContent)(() => ({
  // Padding will be set dynamically via sx prop based on density
}));

export const StackedModalContent: FC<{ children?: ReactNode }> = ({ children }) => {
  const { spacing } = useDensitySpacing();

  // Base padding: 3 spacing units (12px at normal density)
  const contentPadding = spacing(3);

  return (
    <BaseStackedModalContent sx={{ padding: `${contentPadding}px` }}>
      {children}
    </BaseStackedModalContent>
  );
};

// ModalActions component that will be rendered differently based on device
export const StackedModalActions: FC<{ children?: ReactNode }> = ({ children }) =>
  // This component is just a wrapper, actual placement is handled in StackedModal
  <>{children}</>
;

// Custom transition for slide from right
const SlideTransition = forwardRef<HTMLDivElement, TransitionProps>(
  function SlideTransition(props, ref) {
    return (
      <Slide direction="left" ref={ref} {...props}>
        {props.children as React.ReactElement}
      </Slide>
    );
  },
);

// StackedModal Component
export const StackedModal: FC<StackedModalProps> = ({
  open = false,
  onClose,
  glass = false,
  navigationTitle = '',
  children,
  actions,
  modalId: modalIdProp,
  closeOnClickOutside = true,
  closeOnEsc = true,
  loading = false,
  loadingText = 'Loading...',
  fullScreen,
  maxWidth = false,
  disableBackdrop = false,
  disableFocusTrap = false,
  keepMounted = false,
  rtl = false,
  dataTestId,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...otherProps
}) => {
  // Generate a stable modalId if none provided - using ref to ensure it's only created once
  const generatedIdRef = useRef<string | null>(null);
  if (generatedIdRef.current === null) {
    generatedIdRef.current = Math.random().toString(36).substring(2, 11);
  }
  const modalId = modalIdProp ?? generatedIdRef.current;

  // Extract ModalActions from children
  let modalContent = children;
  let modalActions = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<{ children?: ReactNode }>(child) && child.type === StackedModalActions) {
      modalActions = child.props.children;
    }
  });

  // Filter out ModalActions from children for content
  modalContent = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === StackedModalActions),
  );
  const [modalRole, setModalRole] = useState<'primary' | 'secondary' | 'background'>('primary');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(loading);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousRoleRef = useRef(modalRole);
  const hasRegisteredRef = useRef(false);
  const { stack, pushModal, popModal } = useModalStack();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Reserved for future use
  const { spacing } = useDensitySpacing();

  // Density-aware spacing values
  // Base header padding: 2 spacing units vertical, 2.5 horizontal (8px/10px at normal density)
  const headerPaddingY = spacing(2);
  const headerPaddingX = spacing(2.5);
  // Base gap for title sections: 1.5 and 1 spacing units (6px and 4px at normal density)
  const titleLeftGap = spacing(1.5);
  const titleRightGap = spacing(1);
  // Base skeleton/content padding: 3 spacing units (12px at normal density)
  const contentPadding = spacing(3);
  // Base footer padding: 2 spacing units (8px at normal density)
  const footerPadding = spacing(2);

  // Use focus trap
  useFocusTrap(dialogRef, open && modalRole === 'primary', disableFocusTrap);

  // Lock body scroll - NOW MANAGED BY MODALSTACKPROVIDER
  // useBodyScrollLock(open && modalRole === 'primary');

  // Handle ESC key press
  useEffect(() => {
    if (!open || !closeOnEsc || modalRole !== 'primary') return;

    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, closeOnEsc, onClose, modalRole]);

  // Handle loading state
  useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
    } else {
      // Delay hiding skeleton for smooth transition
      const timer = window.setTimeout(() => setShowSkeleton(false), 200);
      return () => window.clearTimeout(timer);
    }
  }, [loading]);

  // Register modal when it opens, unregister when it closes
  // IMPORTANT: Registration and close cleanup must be in the SAME effect to avoid
  // race conditions with hasRegisteredRef — separate effects run in declaration order,
  // so a prior effect could reset the ref before a later effect reads it.
  useEffect(() => {
    if (open && !hasRegisteredRef.current) {
      pushModal(modalId);
      hasRegisteredRef.current = true;
    } else if (!open && hasRegisteredRef.current) {
      // Delay popModal to allow close animation to complete
      const timer = window.setTimeout(() => {
        popModal(modalId);
        hasRegisteredRef.current = false;
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [open, modalId, pushModal, popModal]);

  // Update modal role when stack changes
  // NOTE: modalRole is NOT in deps to avoid infinite loop - we use previousRoleRef for comparison
  useEffect(() => {
    if (!open) return;

    const currentModal = stack.find((m) => m.id === modalId);
    if (!currentModal) return;

    const newRole = currentModal.role;
    const currentRole = previousRoleRef.current;

    if (newRole !== currentRole) {
      setIsAnimating(true);
      previousRoleRef.current = newRole;
      setModalRole(newRole);

      window.setTimeout(() => setIsAnimating(false), 300);
    }
  }, [stack, modalId, open]);

  // Clean up on unmount (for navigation scenarios - immediate, no delay)
  // This ensures scroll is restored when navigating away while modal is open
  useEffect(() => {
    const currentModalId = modalId;
    return () => {
      if (hasRegisteredRef.current) {
        popModal(currentModalId);
        hasRegisteredRef.current = false;
      }
    };
  }, [modalId]);

  // Don't render if in background (performance optimization)
  if (modalRole === 'background' && !keepMounted) return null;

  const handleBackClick = () => {
    if (stack.length > 1) {
      onClose();
    }
  };

  const handleClose = (_event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (modalRole !== 'primary') return;

    if (reason === 'backdropClick' && !closeOnClickOutside) return;
    if (reason === 'escapeKeyDown' && !closeOnEsc) return;

    onClose();
  };

  // Use slide transition for all devices
  const Transition = SlideTransition;

  // Generate unique IDs for accessibility
  const titleId = ariaLabelledBy || `modal-title-${modalId}`;
  const descId = ariaDescribedBy || `modal-desc-${modalId}`;

  return (
    <StyledDialog
      ref={dialogRef}
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen ?? isMobile}
      modalRole={modalRole}
      isAnimating={isAnimating}
      glass={glass}
      rtl={rtl}
      customMaxWidth={maxWidth}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      disableScrollLock
      disableEscapeKeyDown={!closeOnEsc}
      hideBackdrop={disableBackdrop}
      keepMounted={keepMounted}
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-testid={dataTestId}
      sx={{
        zIndex: stack.find((m) => m.id === modalId)?.zIndex || 1300,
      }}
      {...otherProps}
    >
      {/* Loading Overlay */}
      {showSkeleton && (
        <LoadingOverlay data-testid={dataTestId ? `${dataTestId}-loading-overlay` : undefined}>
          <CircularProgress size={40} data-testid={dataTestId ? `${dataTestId}-loading-spinner` : undefined} />
          {loadingText && (
            <Typography variant="body2" sx={{ mt: 2 }} data-testid={dataTestId ? `${dataTestId}-loading-text` : undefined}>
              {loadingText}
            </Typography>
          )}
        </LoadingOverlay>
      )}

      <StyledDialogTitle id={titleId} rtl={rtl} sx={{ padding: `${headerPaddingY}px ${headerPaddingX}px` }} data-testid={dataTestId ? `${dataTestId}-header` : undefined}>
        <DialogTitleLeft sx={{ gap: `${titleLeftGap}px` }}>
          {stack.length > 1 ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackClick}
              aria-label="go back"
              size="small"
              sx={{ transform: rtl ? 'rotate(180deg)' : 'none' }}
              data-testid={dataTestId ? `${dataTestId}-back-button` : undefined}
            >
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              size="small"
              data-testid={dataTestId ? `${dataTestId}-close-button` : undefined}
            >
              <CloseIcon />
            </IconButton>
          )}
          {navigationTitle && (
            <Typography variant="h6" component="h2" noWrap sx={{ ml: 1 }} data-testid={dataTestId ? `${dataTestId}-title` : undefined}>
              {navigationTitle}
            </Typography>
          )}
        </DialogTitleLeft>
        <DialogTitleRight sx={{ gap: `${titleRightGap}px` }} data-testid={dataTestId ? `${dataTestId}-header-actions` : undefined}>
          {/* On desktop, show modalActions or actions prop in header */}
          {!isMobile && (modalActions || actions)}
        </DialogTitleRight>
      </StyledDialogTitle>

      <Box id={descId} sx={{ position: 'relative', flex: 1, overflow: 'auto' }} data-testid={dataTestId ? `${dataTestId}-content` : undefined}>
        {showSkeleton ? (
          <Box sx={{ p: `${contentPadding}px` }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
          </Box>
        ) : (
          modalContent
        )}
      </Box>

      {/* On mobile, show modalActions at the bottom */}
      {isMobile && (modalActions || actions) && (
        <DialogActions
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            padding: `${footerPadding}px`,
          }}
          data-testid={dataTestId ? `${dataTestId}-footer` : undefined}
        >
          {modalActions || actions}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

// Create aliases for convenience
export { ModalStackProvider as StackedModalProvider, useModalStack as useStackedModal };
