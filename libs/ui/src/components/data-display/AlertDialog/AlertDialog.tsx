import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, keyframes } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import Error from '@mui/icons-material/Error';
import Info from '@mui/icons-material/Info';
import type { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { AlertDialogProps } from './AlertDialog.types';

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 15px currentColor;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 0;
  }
`;

const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'glow', 'pulse'].includes(prop as string),
})<{
  customVariant?: string;
  glow?: boolean;
  pulse?: boolean;
}>(({ theme, customVariant, glow, pulse }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',

    // Variant styles
    ...(customVariant === 'default' && {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    }),

    ...(customVariant === 'destructive' && {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${alpha(theme.palette.error.main, 0.5)}`,
    }),

    ...(customVariant === 'glass' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    }),

    // Glow effect
    ...(glow && !pulse && {
      boxShadow: `0 0 30px 10px ${alpha(theme.palette.primary.main, 0.3)} !important`,
      filter: 'brightness(1.05)',
    }),

    // Pulse animation
    ...(pulse && !glow && {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.1,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),

    // Both glow and pulse
    ...(glow && pulse && {
      position: 'relative',
      boxShadow: `0 0 30px 10px ${alpha(theme.palette.primary.main, 0.3)} !important`,
      filter: 'brightness(1.05)',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.1,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  paddingRight: theme.spacing(6), // Space for close button
  '& .MuiTypography-root': {
    fontWeight: 600,
    fontSize: '1.25rem',
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  gap: theme.spacing(1),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({
    variant = 'default',
    glow = false,
    pulse = false,
    title,
    description,
    icon,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onCancel,
    onConfirm,
    showCancel = true,
    loading = false,
    confirmDisabled = false,
    children,
    onClose,
    'data-testid': dataTestId = 'alert-dialog',
    ...props
  }, ref) => {
    const { spacingPx } = useDensitySpacing();

    const handleCancel = () => {
      onCancel?.();
      onClose?.({}, 'backdropClick');
    };

    const handleConfirm = () => {
      onConfirm?.();
    };

    const getVariantIcon = () => {
      if (icon) return icon;

      switch (variant) {
        case 'destructive':
          return <Error color="error" />;
        default:
          return <Info color="primary" />;
      }
    };

    const getConfirmButtonVariant = (): ButtonProps['variant'] => {
      switch (variant) {
        case 'destructive':
          return 'contained';
        default:
          return 'contained';
      }
    };

    const getConfirmButtonColor = () => {
      switch (variant) {
        case 'destructive':
          return 'error';
        default:
          return 'primary';
      }
    };

    // Density-aware spacing values (base values documented in comments)
    // Base title gap: 1.5 units (6px at normal density)
    const titleGap = spacingPx(1.5);
    // Base title right padding: 6 units (24px at normal density) for close button
    const titlePaddingRight = spacingPx(6);
    // Base content padding top: 1 unit (4px at normal density)
    const contentPaddingTop = spacingPx(1);
    // Base content padding bottom: 2 units (8px at normal density)
    const contentPaddingBottom = spacingPx(2);
    // Base actions padding: 2/3/3/3 units (8px/12px/12px/12px at normal density)
    const actionsPadding = `${spacingPx(2)} ${spacingPx(3)} ${spacingPx(3)} ${spacingPx(3)}`;
    // Base actions gap: 1 unit (4px at normal density)
    const actionsGap = spacingPx(1);
    // Base close button position: 1 unit (4px at normal density)
    const closeButtonPosition = spacingPx(1);

    return (
      <StyledDialog
        ref={ref}
        customVariant={variant}
        glow={glow}
        pulse={pulse}
        onClose={onClose}
        data-testid={dataTestId}
        {...props}
      >
        <CloseButton
          aria-label="close"
          onClick={handleCancel}
          size="small"
          data-testid={`${dataTestId}-close-button`}
          sx={{
            right: closeButtonPosition,
            top: closeButtonPosition,
          }}
        >
          <Close />
        </CloseButton>

        {title && (
          <StyledDialogTitle
            data-testid={`${dataTestId}-title`}
            sx={{
              gap: titleGap,
              paddingRight: titlePaddingRight,
            }}
          >
            {(icon !== null) && (
              <span data-testid={`${dataTestId}-icon`}>
                {getVariantIcon()}
              </span>
            )}
            <Typography variant="h6" component="span">
              {title}
            </Typography>
          </StyledDialogTitle>
        )}

        <StyledDialogContent
          data-testid={`${dataTestId}-content`}
          sx={{
            paddingTop: contentPaddingTop,
            paddingBottom: contentPaddingBottom,
          }}
        >
          {description && (
            <DialogContentText data-testid={`${dataTestId}-description`}>
              {description}
            </DialogContentText>
          )}
          {children}
        </StyledDialogContent>

        <StyledDialogActions
          data-testid={`${dataTestId}-actions`}
          sx={{
            padding: actionsPadding,
            gap: actionsGap,
          }}
        >
          {showCancel && (
            <Button
              onClick={handleCancel}
              variant="outlined"
              color="inherit"
              disabled={loading}
              data-testid={`${dataTestId}-cancel-button`}
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            variant={getConfirmButtonVariant()}
            color={getConfirmButtonColor()}
            disabled={confirmDisabled || loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" data-testid={`${dataTestId}-loading-spinner`} /> : undefined}
            autoFocus
            data-testid={`${dataTestId}-confirm-button`}
          >
            {confirmText}
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';