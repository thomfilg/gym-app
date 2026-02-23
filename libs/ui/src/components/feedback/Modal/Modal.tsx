import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import MuiModal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ModalContentProps,ModalProps } from './Modal.types';

// Define transition component props interface
interface TransitionProps {
  children?: React.ReactElement;
  in?: boolean;
  timeout?: number;
}

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 20px currentColor;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 0;
  }
`;

export const Modal: React.FC<ModalProps> = ({
  children,
  variant = 'center',
  size = 'md',
  backdrop = true,
  persistent = false,
  glass = false,
  gradient = false,
  glow = false,
  pulse = false,
  borderRadius = 'lg',
  onClose,
  open,
  dataTestId,
  ...props
}) => {
  const theme = useTheme();

  const getBorderRadius = () => {
    switch (borderRadius) {
      case 'none':
        return 0;
      case 'sm':
        return theme.spacing(0.5);
      case 'md':
        return theme.spacing(1);
      case 'lg':
        return theme.spacing(2);
      case 'xl':
        return theme.spacing(3);
      default:
        return theme.spacing(2);
    }
  };

  const getSize = () => {
    switch (size) {
      case 'xs':
        return { width: 320, maxWidth: '90vw' };
      case 'sm':
        return { width: 480, maxWidth: '90vw' };
      case 'md':
        return { width: 640, maxWidth: '90vw' };
      case 'lg':
        return { width: 800, maxWidth: '90vw' };
      case 'xl':
        return { width: 960, maxWidth: '90vw' };
      default:
        return { width: 640, maxWidth: '90vw' };
    }
  };

  const getPositionStyles = () => {
    const sizeStyles = getSize();

    const baseStyles = {
      position: 'absolute' as const,
      ...sizeStyles,
      borderRadius: getBorderRadius(),
      outline: 0,
      transition: theme.transitions.create(
        ['box-shadow', 'background-color', 'backdrop-filter', 'transform'],
        {
          duration: theme.transitions.duration.standard,
        },
      ),
    };

    switch (variant) {
      case 'top':
        return {
          ...baseStyles,
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          maxHeight: '80vh',
          overflowY: 'auto',
        };

      case 'bottom':
        return {
          ...baseStyles,
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          maxHeight: '80vh',
          overflowY: 'auto',
        };

      case 'glass':
      case 'center':
      default:
        return {
          ...baseStyles,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',
          overflowY: 'auto',
        };
    }
  };

  const getVariantStyles = () => {
    const positionStyles = getPositionStyles();

    const baseStyles = {
      ...positionStyles,
      position: pulse ? ('relative' as const) : positionStyles.position,
    };

    if (pulse) {
      Object.assign(baseStyles, {
        '&::after': {
          content: '""',
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.3,
          animation: `${pulseAnimation} 2s infinite`,
          pointerEvents: 'none' as const,
          zIndex: -1,
        },
      });
    }

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          backgroundColor: alpha(theme.palette.background.paper, 0.1),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: glow
            ? `0 0 40px ${alpha(theme.palette.primary.main, 0.3)}`
            : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        };

      default: {
        const styles = {
          ...baseStyles,
          backgroundColor: glass
            ? alpha(theme.palette.background.paper, 0.1)
            : theme.palette.background.paper,
          backdropFilter: glass ? 'blur(20px)' : gradient ? 'blur(10px)' : 'none',
          border: glass ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
          boxShadow: glow
            ? `0 0 40px ${alpha(theme.palette.primary.main, 0.3)}`
            : glass
              ? `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`
              : theme.shadows[8],
        };

        if (gradient) {
          Object.assign(styles, {
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          });
        }

        return styles;
      }
    }
  };

  const handleClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (persistent && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      return;
    }
    onClose?.();
  };

  const getTransitionComponent = () => {
    switch (variant) {
      case 'top': {
        const SlideDown = React.forwardRef<HTMLElement, TransitionProps>((props, ref) => {
          const { children, ...rest } = props;
          return children ? (
            <Slide direction="down" ref={ref} {...rest}>
              {children}
            </Slide>
          ) : null;
        });
        SlideDown.displayName = 'SlideDown';
        return SlideDown;
      }
      case 'bottom': {
        const SlideUp = React.forwardRef<HTMLElement, TransitionProps>((props, ref) => {
          const { children, ...rest } = props;
          return children ? (
            <Slide direction="up" ref={ref} {...rest}>
              {children}
            </Slide>
          ) : null;
        });
        SlideUp.displayName = 'SlideUp';
        return SlideUp;
      }
      default:
        return Fade;
    }
  };

  const TransitionComponent = getTransitionComponent();

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={backdrop ? Backdrop : undefined}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor:
            glass || variant === 'glass'
              ? alpha(theme.palette.common.black, 0.2)
              : alpha(theme.palette.common.black, 0.5),
          backdropFilter: glass || variant === 'glass' ? 'blur(8px)' : 'none',
        },
        // @ts-expect-error - data-testid is not part of BackdropProps type but is valid HTML
        'data-testid': dataTestId ? `${dataTestId}-backdrop` : 'modal-backdrop',
      }}
      {...props}
    >
      <TransitionComponent in={open} timeout={500}>
        <Box sx={getVariantStyles()} data-testid={dataTestId || 'modal'}>
          {children}
        </Box>
      </TransitionComponent>
    </MuiModal>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({ children, padding = 3, dataTestId }) => {
  const { spacing } = useDensitySpacing();

  // Base padding is the padding prop (default: 3 spacing units = 12px at normal density)
  // If padding is a string (e.g., '10px'), use it directly; otherwise scale it with density
  const scaledPadding = typeof padding === 'string' ? padding : `${spacing(padding)}px`;

  return (
    <Box sx={{ p: scaledPadding }} data-testid={dataTestId || 'modal-content'}>
      {children}
    </Box>
  );
};
