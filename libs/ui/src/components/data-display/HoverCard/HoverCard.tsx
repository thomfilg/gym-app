import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { alpha, keyframes } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type { HoverCardAnimation,HoverCardPlacement, HoverCardProps } from './HoverCard.types';

// Animation definitions
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

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Arrow component
const ArrowContainer = styled('div')<{ placement: HoverCardPlacement; offset: number }>(({
  theme,
  placement,
}) => {
  const arrowSize = 8;
  const isTop = placement.startsWith('top');
  const isBottom = placement.startsWith('bottom');
  const isLeft = placement.startsWith('left');
  const isRight = placement.startsWith('right');

  let position: React.CSSProperties = {};
  let borderStyle: React.CSSProperties = {};

  if (isTop) {
    position = { bottom: -arrowSize, left: '50%', transform: 'translateX(-50%)' };
    borderStyle = {
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderTop: `${arrowSize}px solid ${theme.palette.background.paper}`,
    };
  } else if (isBottom) {
    position = { top: -arrowSize, left: '50%', transform: 'translateX(-50%)' };
    borderStyle = {
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid ${theme.palette.background.paper}`,
    };
  } else if (isLeft) {
    position = { right: -arrowSize, top: '50%', transform: 'translateY(-50%)' };
    borderStyle = {
      borderTop: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid transparent`,
      borderLeft: `${arrowSize}px solid ${theme.palette.background.paper}`,
    };
  } else if (isRight) {
    position = { left: -arrowSize, top: '50%', transform: 'translateY(-50%)' };
    borderStyle = {
      borderTop: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid ${theme.palette.background.paper}`,
    };
  }

  return {
    position: 'absolute',
    width: 0,
    height: 0,
    ...position,
    ...borderStyle,
    zIndex: 1,
  };
});

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'glow', 'pulse', 'animation'].includes(prop as string),
})<{
  customVariant?: string;
  glow?: boolean;
  pulse?: boolean;
  animation?: HoverCardAnimation;
}>(({ theme, customVariant, glow, pulse, animation }) => ({
  borderRadius: theme.spacing(1.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'visible',
  minWidth: 200,
  maxWidth: 400,

  // Animation styles
  ...(animation === 'fade' && {
    animation: `${slideInUp} 0.2s ease-out`,
  }),
  ...(animation === 'scale' && {
    transformOrigin: 'center',
    animation: `${scaleIn} 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),
  ...(animation === 'slide-up' && {
    animation: `${slideInUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),
  ...(animation === 'slide-down' && {
    animation: `${slideInDown} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),
  ...(animation === 'slide-left' && {
    animation: `${slideInLeft} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),
  ...(animation === 'slide-right' && {
    animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),

  '@keyframes scaleIn': {
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },

  // Variant styles
  ...(customVariant === 'default' && {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    boxShadow: theme.shadows[8],
  }),

  ...(customVariant === 'glass' && {
    backgroundColor: alpha(theme.palette.background.paper, 0.85),
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
  }),

  ...(customVariant === 'detailed' && {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    boxShadow: theme.shadows[12],
  }),

  ...(customVariant === 'minimal' && {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: theme.shadows[4],
  }),

  // Glow effect
  ...(glow &&
    !pulse && {
    boxShadow: `0 0 20px 5px ${alpha(theme.palette.primary.main, 0.3)} !important`,
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
      backgroundColor: theme.palette.primary.main,
      opacity: 0.1,
      animation: `${pulseAnimation} 2s infinite`,
      pointerEvents: 'none',
      zIndex: -1,
    },
  }),

  // Both glow and pulse
  ...(glow &&
    pulse && {
    position: 'relative',
    boxShadow: `0 0 20px 5px ${alpha(theme.palette.primary.main, 0.3)} !important`,
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
}));

const StyledPopover = styled(Popover, {
  shouldForwardProp: (prop) => prop !== 'customAnimation',
})<{ customAnimation?: HoverCardAnimation }>(({ customAnimation }) => ({
  '& .MuiPopover-paper': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'visible',
  },
  ...(customAnimation === 'scale' && {
    '& .MuiPopover-paper': {
      transformOrigin: 'center',
    },
  }),
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 80,
  color: theme.palette.text.secondary,
}));

// Utility functions
const getAnchorOrigin = (placement: HoverCardPlacement) => {
  if (placement.startsWith('top')) {
    return { vertical: 'top' as const, horizontal: 'center' as const };
  }
  if (placement.startsWith('bottom')) {
    return { vertical: 'bottom' as const, horizontal: 'center' as const };
  }
  if (placement.startsWith('left')) {
    return { vertical: 'center' as const, horizontal: 'left' as const };
  }
  if (placement.startsWith('right')) {
    return { vertical: 'center' as const, horizontal: 'right' as const };
  }
  return { vertical: 'bottom' as const, horizontal: 'center' as const };
};

const getTransformOrigin = (placement: HoverCardPlacement) => {
  if (placement.startsWith('top')) {
    return { vertical: 'bottom' as const, horizontal: 'center' as const };
  }
  if (placement.startsWith('bottom')) {
    return { vertical: 'top' as const, horizontal: 'center' as const };
  }
  if (placement.startsWith('left')) {
    return { vertical: 'center' as const, horizontal: 'right' as const };
  }
  if (placement.startsWith('right')) {
    return { vertical: 'center' as const, horizontal: 'left' as const };
  }
  return { vertical: 'top' as const, horizontal: 'center' as const };
};

export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      variant = 'default',
      glow = false,
      pulse = false,
      title,
      description,
      avatar,
      trigger,
      placement = 'bottom',
      showArrow = false,
      animation = 'fade',
      enterDelay = 700,
      exitDelay = 0,
      maxWidth = 400,
      loading = false,
      loadingComponent,
      touchEnabled = true,
      offset = 8,
      disabled = false,
      onOpen,
      onClose,
      children,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const { spacing } = useDensitySpacing();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    const [touchTimeout, setTouchTimeout] = React.useState<number>();
    const enterTimeoutRef = React.useRef<number | undefined>(undefined);
    const exitTimeoutRef = React.useRef<number | undefined>(undefined);

    // Detect touch device
    React.useEffect(() => {
      setIsTouchDevice('ontouchstart' in window);
    }, []);

    const openCard = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
      if (disabled) return;

      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      const target = event.currentTarget;
      enterTimeoutRef.current = window.setTimeout(() => {
        setAnchorEl(target);
        setIsOpen(true);
        onOpen?.();
      }, enterDelay);
    };

    const closeCard = () => {
      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }

      exitTimeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
        setAnchorEl(null);
        onClose?.();
      }, exitDelay);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      if (isTouchDevice && !touchEnabled) return;
      openCard(event);
    };

    const handleMouseLeave = () => {
      if (isTouchDevice && !touchEnabled) return;
      closeCard();
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
      if (!touchEnabled) return;

      // Clear any existing timeout
      if (touchTimeout) {
        window.clearTimeout(touchTimeout);
      }

      // Set a timeout to show hover card on long press
      const timeout = window.setTimeout(() => {
        openCard(event);
      }, enterDelay);

      setTouchTimeout(timeout);
    };

    const handleTouchEnd = () => {
      if (touchTimeout) {
        window.clearTimeout(touchTimeout);
        setTouchTimeout(undefined);
      }
    };

    const handleTouchCancel = () => {
      if (touchTimeout) {
        window.clearTimeout(touchTimeout);
        setTouchTimeout(undefined);
      }
    };

    const handlePopoverMouseEnter = () => {
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    };

    const handlePopoverMouseLeave = () => {
      closeCard();
    };

    const handleClose = React.useCallback(() => {
      setIsOpen(false);
      setAnchorEl(null);
      onClose?.();
    }, [onClose]);

    // Handle escape key press
    React.useEffect(() => {
      const handleEscape = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, handleClose]);

    React.useEffect(() => () => {
      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
      if (touchTimeout) {
        window.clearTimeout(touchTimeout);
      }
    }, [touchTimeout]);

    const triggerProps = {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
      style: { cursor: disabled ? 'default' : 'pointer' },
      'data-testid': dataTestId ? `${dataTestId}-trigger` : 'hover-card-trigger',
    };

    const triggerElement = trigger ? (
      React.cloneElement(trigger, triggerProps)
    ) : (
      <span {...triggerProps} style={{ display: 'inline-block', ...triggerProps.style }}>
        {children}
      </span>
    );

    const renderAvatar = () => {
      if (!avatar) return null;

      if (typeof avatar === 'string') {
        return <Avatar src={avatar} sx={{ width: 48, height: 48, mr: 2 }} />;
      }

      const avatarElement = avatar as React.ReactElement<{ sx?: object }>;
      return React.cloneElement(avatarElement, {
        sx: { width: 48, height: 48, mr: 2, ...avatarElement.props.sx },
      });
    };

    const renderContent = () => {
      if (loading) {
        return (
          <LoadingContainer>
            {loadingComponent || (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2">Loading...</Typography>
              </Box>
            )}
          </LoadingContainer>
        );
      }

      if (variant === 'detailed' && (avatar || title || description)) {
        return (
          <>
            {avatar && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {renderAvatar()}
                <Box>
                  {title && (
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                      data-testid={dataTestId ? `${dataTestId}-title` : 'hover-card-title'}
                    >
                      {title}
                    </Typography>
                  )}
                  {description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      data-testid={dataTestId ? `${dataTestId}-description` : 'hover-card-description'}
                    >
                      {description}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            {!avatar && title && (
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1 }}
                data-testid={dataTestId ? `${dataTestId}-title` : 'hover-card-title'}
              >
                {title}
              </Typography>
            )}
            {!avatar && description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
                data-testid={dataTestId ? `${dataTestId}-description` : 'hover-card-description'}
              >
                {description}
              </Typography>
            )}
            {children && <Box>{children}</Box>}
          </>
        );
      }

      return (
        <>
          {title && (
            <Typography
              variant={variant === 'minimal' ? 'body2' : 'subtitle1'}
              sx={{ fontWeight: 600, mb: 0.5 }}
              data-testid={dataTestId ? `${dataTestId}-title` : 'hover-card-title'}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              data-testid={dataTestId ? `${dataTestId}-description` : 'hover-card-description'}
            >
              {description}
            </Typography>
          )}
          {children}
        </>
      );
    };

    return (
      <>
        {triggerElement}
        <StyledPopover
          ref={ref}
          open={isOpen && !disabled}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={getAnchorOrigin(placement)}
          transformOrigin={getTransformOrigin(placement)}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          disableAutoFocus={true}
          disableEnforceFocus={true}
          disableRestoreFocus={true}
          customAnimation={animation}
          slotProps={{
            paper: {
              style: {
                pointerEvents: 'auto',
              },
            },
          }}
          {...props}
        >
          <Box sx={{ position: 'relative' }}>
            {showArrow && <ArrowContainer placement={placement} offset={offset} />}
            <StyledCard
              customVariant={variant}
              glow={glow}
              pulse={pulse}
              animation={animation}
              data-testid={dataTestId || 'hover-card-content'}
              sx={{
                maxWidth,
                mt: placement.startsWith('top') ? `${offset}px` : 0,
                mb: placement.startsWith('bottom') ? `${offset}px` : 0,
                ml: placement.startsWith('left') ? `${offset}px` : 0,
                mr: placement.startsWith('right') ? `${offset}px` : 0,
              }}
            >
              <CardContent
                sx={{
                  // Base padding: detailed=12px, minimal=6px, default=8px - scales with density
                  p: variant === 'detailed' ? spacing(3) : variant === 'minimal' ? spacing(1.5) : spacing(2),
                  '&:last-child': {
                    pb: variant === 'detailed' ? spacing(3) : variant === 'minimal' ? spacing(1.5) : spacing(2),
                  },
                }}
              >
                {renderContent()}
              </CardContent>
            </StyledCard>
          </Box>
        </StyledPopover>
      </>
    );
  },
);

HoverCard.displayName = 'HoverCard';
