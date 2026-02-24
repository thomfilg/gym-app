import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { alpha, keyframes } from '@mui/material/styles';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Close from '@mui/icons-material/Close';
import Error from '@mui/icons-material/Error';
import Info from '@mui/icons-material/Info';
import Warning from '@mui/icons-material/Warning';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { AlertProps } from './Alert.types';

// Define animations
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 10px currentColor;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 0;
  }
`;

// Additional animations can be enabled as needed
// const slideInAnimation = keyframes`
//   from {
//     transform: translateX(-100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;

// const bounceIn = keyframes`
//   0% {
//     transform: scale(0.3);
//     opacity: 0;
//   }
//   50% {
//     transform: scale(1.05);
//   }
//   70% {
//     transform: scale(0.9);
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// `;

// Removed unused slideInAnimation - can be re-added if needed for future features

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const iconRotate = keyframes`
  0% {
    transform: rotate(0deg) scale(0.8);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const getColorFromTheme = (theme: Theme, variant: string) => {
  const colorMap: Record<string, { main: string; light?: string; dark?: string }> = {
    info: theme.palette.info,
    success: theme.palette.success,
    warning: theme.palette.warning,
    danger: theme.palette.error,
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    neutral: {
      main: theme.palette.grey[500] || '#9E9E9E',
      light: theme.palette.grey[300] || '#E0E0E0',
      dark: theme.palette.grey[700] || '#616161',
    },
  };

  return colorMap[variant] || theme.palette.info;
};

const getVariantIcon = (variant: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    info: <Info />,
    success: <CheckCircle />,
    warning: <Warning />,
    danger: <Error />,
  };

  return iconMap[variant];
};

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customColor', 'glow', 'pulse', 'animate'].includes(prop as string),
})<{
  customVariant?: string;
  customColor?: string;
  glow?: boolean;
  pulse?: boolean;
  animate?: boolean;
}>(({ theme, customVariant, customColor, glow, pulse, animate }) => {
  const colorPalette = getColorFromTheme(theme, customColor || customVariant || 'info');

  return {
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: animate ? `${fadeInScale} 0.3s ease-out` : 'none',
    willChange: 'transform, opacity',

    // Enhanced base styles
    '.MuiAlert-message': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(0.5),
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },

    '.MuiAlert-icon': {
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      alignItems: 'center',
      animation: animate ? `${iconRotate} 0.6s ease-out` : 'none',
    },

    // Hover effects
    '&:hover': {
      transform: 'translateY(-3px) scale(1.01)',
      boxShadow: `0 8px 20px ${alpha(colorPalette.main, 0.2)}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

      '.MuiAlert-icon': {
        transform: 'scale(1.15) rotate(10deg)',
      },

      '&::before': {
        opacity: 1,
      },
    },

    // Active state
    '&:active': {
      transform: 'translateY(-1px) scale(0.99)',
      transition: 'transform 0.1s ease',
    },

    // Focus styles for accessibility
    '&:focus-within': {
      outline: `3px solid ${alpha(colorPalette.main, 0.5)}`,
      outlineOffset: '3px',
      boxShadow: `0 0 0 6px ${alpha(colorPalette.main, 0.1)}`,
      transition: 'all 0.2s ease',
    },

    // Variant styles
    ...(customVariant === 'info' && {
      backgroundColor: alpha(colorPalette.main, 0.1),
      color: colorPalette.main,
      border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
      '.MuiAlert-icon': {
        color: colorPalette.main,
      },
    }),

    ...(customVariant === 'success' && {
      backgroundColor: alpha(colorPalette.main, 0.1),
      color: colorPalette.main,
      border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
      '.MuiAlert-icon': {
        color: colorPalette.main,
      },
    }),

    ...(customVariant === 'warning' && {
      backgroundColor: alpha(colorPalette.main, 0.1),
      color: colorPalette.main,
      border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
      '.MuiAlert-icon': {
        color: colorPalette.main,
      },
    }),

    ...(customVariant === 'danger' && {
      backgroundColor: alpha(colorPalette.main, 0.1),
      color: colorPalette.main,
      border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
      '.MuiAlert-icon': {
        color: colorPalette.main,
      },
    }),

    ...(customVariant === 'glass' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      color: theme.palette.text.primary,
      '.MuiAlert-icon': {
        color: theme.palette.primary.main,
      },
    }),

    ...(customVariant === 'gradient' && {
      background: `linear-gradient(135deg, ${alpha(colorPalette.light || colorPalette.main, 0.9)}, ${alpha(colorPalette.dark || colorPalette.main, 0.9)})`,
      color: theme.palette.getContrastText(colorPalette.main),
      border: 'none',
      position: 'relative',
      overflow: 'hidden',
      '.MuiAlert-icon': {
        color: theme.palette.getContrastText(colorPalette.main),
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-1000px',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
        animation: `${shimmerAnimation} 3s infinite`,
      },
      '&:hover': {
        filter: 'brightness(1.1)',
        transform: 'translateY(-2px) scale(1.01)',
      },
    }),

    // Glow effect
    ...(glow &&
      !pulse && {
      boxShadow: `0 0 20px 5px ${alpha(colorPalette.main, 0.3)} !important`,
      filter: 'brightness(1.05)',
    }),

    // Pulse animation
    ...(pulse &&
      !glow && {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        backgroundColor: colorPalette.main,
        opacity: 0.2,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),

    // Both glow and pulse
    ...(glow &&
      pulse && {
      position: 'relative',
      boxShadow: `0 0 20px 5px ${alpha(colorPalette.main, 0.3)} !important`,
      filter: 'brightness(1.05)',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        backgroundColor: colorPalette.main,
        opacity: 0.2,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),
  };
});

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      color,
      glow = false,
      pulse = false,
      icon,
      showIcon = true,
      closable = false,
      onClose,
      title,
      description,
      children,
      animate = true,
      role = 'alert',
      'aria-live': ariaLive = variant === 'danger' ? 'assertive' : 'polite',
      'aria-atomic': ariaAtomic = 'true',
      'data-testid': dataTestId = 'alert',
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(true);
    const [isClosing, setIsClosing] = React.useState(false);
    const { spacingPx } = useDensitySpacing();

    const handleClose = () => {
      setIsClosing(true);
      window.setTimeout(() => {
        setOpen(false);
        onClose?.();
      }, 200);
    };

    const severity =
      variant === 'danger'
        ? 'error'
        : variant === 'glass'
          ? 'info'
          : variant === 'gradient'
            ? 'info'
            : variant;

    const displayIcon = showIcon ? (
      <Box component="span" data-testid={dataTestId ? `${dataTestId}-icon` : 'alert-icon'}>
        {icon || getVariantIcon(variant)}
      </Box>
    ) : false;

    // Density-aware spacing: Base title margin bottom: 0.5 units (2px at normal density)
    const titleMarginBottom = description ? spacingPx(0.5) : 0;

    const content = (
      <>
        {title && (
          <AlertTitle
            data-testid={dataTestId ? `${dataTestId}-title` : 'alert-title'}
            sx={{
              fontWeight: 600,
              fontSize: '1.05rem',
              marginBottom: titleMarginBottom,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {title}
          </AlertTitle>
        )}
        {description && (
          <Box
            component="div"
            data-testid={dataTestId ? `${dataTestId}-message` : 'alert-message'}
            sx={{
              opacity: 0.9,
              fontSize: '0.925rem',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {description}
          </Box>
        )}
        {children}
      </>
    );

    return (
      <Collapse in={open && !isClosing} timeout={300}>
        <StyledAlert
          ref={ref}
          data-testid={dataTestId || 'alert'}
          severity={severity}
          customVariant={variant}
          customColor={color}
          glow={glow}
          pulse={pulse}
          animate={animate}
          icon={displayIcon}
          role={role}
          aria-live={ariaLive}
          aria-atomic={ariaAtomic}
          tabIndex={0}
          action={
            closable && (
              <IconButton
                data-testid={dataTestId ? `${dataTestId}-close` : 'alert-close'}
                aria-label="close alert"
                color="inherit"
                size="small"
                onClick={handleClose}
                sx={(theme) => ({
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0.7,
                  '&:hover': {
                    transform: 'rotate(90deg) scale(1.1)',
                    opacity: 1,
                    backgroundColor: alpha(theme.palette.action.hover, 0.1),
                  },
                  '&:focus': {
                    opacity: 1,
                    outline: 'none',
                    backgroundColor: alpha(theme.palette.action.focus, 0.1),
                  },
                })}
              >
                <Close fontSize="inherit" />
              </IconButton>
            )
          }
          {...props}
        >
          {content}
        </StyledAlert>
      </Collapse>
    );
  },
);

Alert.displayName = 'Alert';
