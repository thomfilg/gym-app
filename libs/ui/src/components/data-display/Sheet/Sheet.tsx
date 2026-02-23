import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import type { BackdropProps } from '@mui/material/Backdrop';
import React, { useCallback, useEffect, useMemo,useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type {
  SheetContentProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetProps,
} from './Sheet.types';

// Spring physics configuration for smooth animations
const SPRING_CONFIG = {
  tension: 200,
  friction: 25,
  velocity: 0,
};

// Velocity threshold for snap detection (pixels per millisecond)
const DEFAULT_VELOCITY_THRESHOLD = 0.5;

// Drag resistance factor at boundaries
const DEFAULT_DRAG_RESISTANCE = 0.3;

// Keyframe animations
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(var(--pulse-color), 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(var(--pulse-color), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--pulse-color), 0);
  }
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px 5px rgba(var(--glow-color), 0.3);
  }
  50% {
    box-shadow: 0 0 35px 10px rgba(var(--glow-color), 0.5);
  }
`;

export const Sheet: React.FC<SheetProps> = ({
  open = false,
  onOpenChange,
  children,
  title,
  description,
  position = 'bottom',
  variant = 'default',
  size = 'md',
  color = 'primary',
  glow = false,
  pulse = false,
  glass = false,
  gradient = false,
  loading = false,
  disabled = false,
  className,
  style,
  showOverlay = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  showHandle = true,
  swipeable = true,
  snapPoints = [0.25, 0.5, 0.75, 1],
  defaultSnapPoint = 0.5,
  onSnapPointChange,
  minSnapPoint = 0,
  maxSnapPoint = 1,
  velocityThreshold = DEFAULT_VELOCITY_THRESHOLD,
  dragResistance = DEFAULT_DRAG_RESISTANCE,
  animationConfig = SPRING_CONFIG,
  onClick,
  onFocus,
  onBlur,
  onClose,
  onOpen,
  onDragStart,
  onDragEnd,
  footer,
  header,
  persistent = false,
  fullHeight = false,
  rounded = true,
  elevation = 16,
  dataTestId = 'sheet',
  ...rest
}) => {
  const theme = useTheme();
  const { spacing } = useDensitySpacing();
  const [isOpen, setIsOpen] = useState(open);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(defaultSnapPoint);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Support both dataTestId prop and data-testid HTML attribute
  const testId = (rest as { 'data-testid'?: string })['data-testid'] || dataTestId;

  const isDraggableVariant = variant === 'draggable';
  const isBottomSheet = position === 'bottom';
  const isTopSheet = position === 'top';
  const isVerticalSheet = isBottomSheet || isTopSheet;

  // Sort snap points for easier navigation
  const sortedSnapPoints = useMemo(() => {
    const points = [...snapPoints].sort((a, b) => a - b);
    // Ensure snap points are within bounds
    return points.filter((point) => point >= minSnapPoint && point <= maxSnapPoint);
  }, [snapPoints, minSnapPoint, maxSnapPoint]);

  const handleClose = useCallback(() => {
    if (!persistent && !disabled) {
      setIsOpen(false);
      onOpenChange?.(false);
      onClose?.();
    }
  }, [persistent, disabled, onOpenChange, onClose]);

  const updateSheetHeight = useCallback(
    (snapPoint: number) => {
      if (!sheetRef.current || !isVerticalSheet) return;

      const viewportHeight = window.innerHeight;
      const height = Math.round(viewportHeight * snapPoint);

      if (isBottomSheet) {
        sheetRef.current.style.height = `${height}px`;
        sheetRef.current.style.transform = 'translateY(0)';
      } else if (isTopSheet) {
        sheetRef.current.style.height = `${height}px`;
      }

      setCurrentHeight(height);
    },
    [isBottomSheet, isTopSheet, isVerticalSheet],
  );

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick && !persistent) {
      handleClose();
    }
  }, [closeOnOverlayClick, persistent, handleClose]);

  const animateToSnapPoint = useCallback(
    (targetSnapPoint: number, velocity = 0) => {
      if (!sheetRef.current || !isVerticalSheet) return;

      setIsAnimating(true);
      const startSnapPoint = currentSnapPoint;
      const distance = targetSnapPoint - startSnapPoint;
      const startTime = globalThis.performance.now();

      // Spring animation parameters
      const { tension, friction } = { ...SPRING_CONFIG, ...animationConfig };
      const springLength = 0;
      let currentVelocity = velocity * 1000; // Convert to pixels per second

      const animate = () => {
        const now = globalThis.performance.now();
        const elapsed = (now - startTime) / 1000; // Convert to seconds

        // Spring physics calculations
        const springForce = -tension * (startSnapPoint - targetSnapPoint + springLength);
        const dampingForce = -friction * currentVelocity;
        const acceleration = springForce + dampingForce;

        currentVelocity += acceleration * 0.016; // 60fps timestep
        const progress = Math.min(1, elapsed * 4); // Smooth easing

        const currentPosition = startSnapPoint + distance * progress;

        updateSheetHeight(currentPosition);

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setCurrentSnapPoint(targetSnapPoint);
          onSnapPointChange?.(targetSnapPoint);
          updateSheetHeight(targetSnapPoint);
        }
      };

      animate();
    },
    [currentSnapPoint, isVerticalSheet, updateSheetHeight, animationConfig, onSnapPointChange],
  );

  const findClosestSnapPoint = useCallback(
    (currentPosition: number, velocity: number = 0) => {
      // If velocity is significant, snap to next/previous point
      if (Math.abs(velocity) > velocityThreshold) {
        const currentIndex = sortedSnapPoints.findIndex(
          (point) => Math.abs(point - currentSnapPoint) < 0.01,
        );

        if (velocity > 0 && currentIndex < sortedSnapPoints.length - 1) {
          // Dragging up (for bottom sheet) - go to next higher snap point
          return sortedSnapPoints[currentIndex + 1];
        } else if (velocity < 0 && currentIndex > 0) {
          // Dragging down (for bottom sheet) - go to next lower snap point
          return sortedSnapPoints[currentIndex - 1];
        }
      }

      // Find closest snap point
      return sortedSnapPoints.reduce((closest, point) => {
        const currentDistance = Math.abs(currentPosition - closest);
        const pointDistance = Math.abs(currentPosition - point);
        return pointDistance < currentDistance ? point : closest;
      }, sortedSnapPoints[0] || currentSnapPoint);
    },
    [sortedSnapPoints, currentSnapPoint, velocityThreshold],
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDraggableVariant || !isVerticalSheet || isAnimating) return;

      e.preventDefault();
      e.stopPropagation();

      const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;

      setIsDragging(true);
      setDragStartY(clientY);
      lastYRef.current = clientY;
      lastTimeRef.current = globalThis.performance.now();
      velocityRef.current = 0;

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      onDragStart?.();
    },
    [isDraggableVariant, isVerticalSheet, isAnimating, onDragStart],
  );

  const handleDragMove = useCallback(
    (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!isDragging || !sheetRef.current || !isVerticalSheet) return;

      e.preventDefault();
      const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;
      const currentTime = globalThis.performance.now();

      // Calculate velocity
      const deltaY = clientY - lastYRef.current;
      const deltaTime = currentTime - lastTimeRef.current;
      if (deltaTime > 0) {
        velocityRef.current = deltaY / deltaTime;
      }

      lastYRef.current = clientY;
      lastTimeRef.current = currentTime;

      const viewportHeight = window.innerHeight;
      const dragDelta = isBottomSheet ? dragStartY - clientY : clientY - dragStartY;
      const deltaSnapPoint = dragDelta / viewportHeight;
      let newSnapPoint = currentSnapPoint + deltaSnapPoint;

      // Apply resistance at boundaries
      if (newSnapPoint < minSnapPoint) {
        const overshoot = minSnapPoint - newSnapPoint;
        newSnapPoint = minSnapPoint - overshoot * dragResistance;
      } else if (newSnapPoint > maxSnapPoint) {
        const overshoot = newSnapPoint - maxSnapPoint;
        newSnapPoint = maxSnapPoint + overshoot * dragResistance;
      }

      updateSheetHeight(newSnapPoint);
    },
    [
      isDragging,
      isVerticalSheet,
      isBottomSheet,
      dragStartY,
      currentSnapPoint,
      minSnapPoint,
      maxSnapPoint,
      dragResistance,
      updateSheetHeight,
    ],
  );

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      onOpen?.();
      if (isDraggableVariant && isVerticalSheet) {
        // Initialize at default snap point
        setCurrentSnapPoint(defaultSnapPoint);
        updateSheetHeight(defaultSnapPoint);
      }
    }
  }, [open, onOpen, isDraggableVariant, isVerticalSheet, defaultSnapPoint, updateSheetHeight]);

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, handleClose]);

  const handleDragEnd = useCallback(
    (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!isDragging || !isVerticalSheet) return;

      e.preventDefault();
      setIsDragging(false);

      const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;
      const viewportHeight = window.innerHeight;
      const totalDragDelta = isBottomSheet ? dragStartY - clientY : clientY - dragStartY;
      const deltaSnapPoint = totalDragDelta / viewportHeight;
      const currentPosition = currentSnapPoint + deltaSnapPoint;

      // Calculate final velocity for momentum-based snapping
      const velocity = isBottomSheet ? -(velocityRef.current || 0) : velocityRef.current || 0;

      // Find and animate to closest snap point
      const targetSnapPoint = findClosestSnapPoint(currentPosition, velocity);
      if (targetSnapPoint !== undefined) {
        animateToSnapPoint(targetSnapPoint, velocity);
        onDragEnd?.(targetSnapPoint);
      }
    },
    [
      isDragging,
      isVerticalSheet,
      isBottomSheet,
      dragStartY,
      currentSnapPoint,
      findClosestSnapPoint,
      animateToSnapPoint,
      onDragEnd,
    ],
  );

  // Add drag event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: globalThis.MouseEvent) => handleDragMove(e);
      const handleMouseUp = (e: globalThis.MouseEvent) => handleDragEnd(e);
      const handleTouchMove = (e: globalThis.TouchEvent) => handleDragMove(e);
      const handleTouchEnd = (e: globalThis.TouchEvent) => handleDragEnd(e);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  const getSizeStyles = () => {
    const isHorizontal = position === 'left' || position === 'right';

    // For draggable variant, use dynamic height based on snap point
    if (isDraggableVariant && isVerticalSheet && currentHeight !== null) {
      return { height: currentHeight };
    }

    switch (size) {
      case 'xs':
        return isHorizontal ? { width: 240 } : { height: 200 };
      case 'sm':
        return isHorizontal ? { width: 320 } : { height: 300 };
      case 'md':
        return isHorizontal ? { width: 400 } : { height: 400 };
      case 'lg':
        return isHorizontal ? { width: 560 } : { height: 500 };
      case 'xl':
        return isHorizontal ? { width: 720 } : { height: 600 };
      case 'full':
        return isHorizontal ? { width: '100%' } : { height: '100%' };
      default:
        return isHorizontal ? { width: 400 } : { height: 400 };
    }
  };

  const getVariantStyles = () => {
    // Extract RGB values for CSS variables
    const getRgbValues = (hexColor: string) => {
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    };

    const colorMain = theme.palette[color]?.main || theme.palette.primary.main;
    const colorRgb = getRgbValues(colorMain);

    const baseStyles = {
      backgroundColor: theme.palette.background.paper,
      transition:
        !isDragging && !isAnimating
          ? theme.transitions.create(['all'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          })
          : 'none',
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? ('none' as const) : ('auto' as const),
      cursor: isDraggableVariant && isVerticalSheet ? 'grab' : 'auto',
      '--pulse-color': colorRgb,
      '--glow-color': colorRgb,
      ...(isDragging && { cursor: 'grabbing' }),
    };

    const glowStyles = glow
      ? {
        animation: `${glowAnimation} 2s ease-in-out infinite`,
        filter: 'brightness(1.05)',
      }
      : {};

    const pulseStyles = pulse
      ? {
        animation: `${pulseAnimation} 2s infinite`,
        position: 'relative' as const,
      }
      : {};

    const roundedStyles =
      rounded && (position === 'top' || position === 'bottom')
        ? {
          borderRadius:
              position === 'top'
                ? `0 0 ${theme.spacing(2)} ${theme.spacing(2)}`
                : `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
        }
        : rounded && (position === 'left' || position === 'right')
          ? {
            borderRadius:
                position === 'left'
                  ? `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`
                  : `${theme.spacing(2)} 0 0 ${theme.spacing(2)}`,
          }
          : {};

    switch (variant) {
      case 'draggable':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...roundedStyles,
          boxShadow: `
            ${theme.shadows[Math.min(elevation + 4, 24)]},
            0 -2px 10px 0 ${alpha(theme.palette.common.black, 0.1)}
          `,
          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          borderTop: `2px solid ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.3)}`,
          transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }),
          '&:hover': {
            borderTopColor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.5),
          },
        };

      case 'glass':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...roundedStyles,
          backgroundColor: alpha(theme.palette.background.paper, glass ? 0.75 : 0.95),
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          boxShadow: `
            0 8px 32px 0 ${alpha(theme.palette.common.black, 0.15)},
            inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}
          `,
        };

      case 'gradient':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...roundedStyles,
          background: gradient
            ? `linear-gradient(
                135deg,
                ${theme.palette.background.paper} 0%,
                ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.08)} 50%,
                ${alpha(theme.palette[color]?.dark || theme.palette[color]?.main || theme.palette.primary.main, 0.12)} 100%
              )`
            : theme.palette.background.paper,
          position: 'relative' as const,
          overflow: 'hidden' as const,
          '&::before': gradient
            ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: `linear-gradient(
              90deg,
              transparent,
              ${alpha(theme.palette.common.white, 0.2)},
              transparent
            )`,
              animation: `${shimmerAnimation} 3s infinite`,
            }
            : {},
        };

      case 'elevated':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...roundedStyles,
          boxShadow: `
            ${theme.shadows[elevation]},
            0 20px 40px -15px ${alpha(theme.palette.common.black, 0.15)}
          `,
          transform: 'translateZ(0)',
          willChange: 'transform',
        };

      case 'minimal':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...roundedStyles,
          boxShadow: 'none',
          border: 'none',
        };

      default:
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...roundedStyles,
        };
    }
  };

  const isSwipeable = swipeable && !isDraggableVariant;

  // Create a proper BackdropComponent that accepts refs and matches BackdropProps
  const NoBackdrop = React.forwardRef<HTMLDivElement, BackdropProps>((props, ref) => null) as React.ComponentType<BackdropProps>;
  NoBackdrop.displayName = 'NoBackdrop';

  return (
    <>
      {showOverlay && isOpen && (
        <SheetOverlay open={isOpen} onClick={handleOverlayClick} blur={variant === 'glass'} />
      )}

      {isSwipeable ? (
        <SwipeableDrawer
          onOpen={() => {
            setIsOpen(true);
            onOpenChange?.(true);
            onOpen?.();
          }}
          onClose={handleClose}
          disableSwipeToOpen={false}
          swipeAreaWidth={20}
          anchor={position}
          open={isOpen}
          className={className}
          PaperProps={{
            ref: sheetRef,
            sx: {
              ...getSizeStyles(),
              ...getVariantStyles(),
              ...style,
              overflow: 'visible',
              ...(fullHeight &&
                !isDraggableVariant && {
                height: position === 'left' || position === 'right' ? '100%' : 'auto',
                width: position === 'top' || position === 'bottom' ? '100%' : 'auto',
              }),
            },
          }}
          ModalProps={{
            keepMounted: true,
            BackdropComponent: NoBackdrop,
          }}
        >
          <Box
            ref={contentRef}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            data-testid={testId}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              userSelect: isDragging ? 'none' : 'auto',
            }}
          >
            {(showHandle || title || description || showCloseButton || header) && (
              <SheetHeader
                title={title}
                description={description}
                showCloseButton={showCloseButton}
                onClose={handleClose}
                showHandle={showHandle && isVerticalSheet}
                isDraggable={isDraggableVariant && isVerticalSheet}
                onDragStart={handleDragStart}
                dataTestId={`${testId}-header`}
              >
                {header}
              </SheetHeader>
            )}

            <SheetContent padded dataTestId={`${testId}-content`} densityPadding={spacing(2)}>
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 200,
                  }}
                >
                  <CircularProgress color={color} />
                </Box>
              ) : (
                children
              )}
            </SheetContent>

            {footer && (
              <SheetFooter sticky divider dataTestId={`${testId}-footer`} densityPadding={spacing(2)}>
                {footer}
              </SheetFooter>
            )}
          </Box>
        </SwipeableDrawer>
      ) : (
        <Drawer
          onClose={handleClose}
          anchor={position}
          open={isOpen}
          className={className}
          PaperProps={{
            ref: sheetRef,
            sx: {
              ...getSizeStyles(),
              ...getVariantStyles(),
              ...style,
              overflow: 'visible',
              ...(fullHeight &&
                !isDraggableVariant && {
                height: position === 'left' || position === 'right' ? '100%' : 'auto',
                width: position === 'top' || position === 'bottom' ? '100%' : 'auto',
              }),
            },
          }}
          ModalProps={{
            keepMounted: true,
            BackdropComponent: NoBackdrop,
          }}
        >
          <Box
            ref={contentRef}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            data-testid={testId}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              userSelect: isDragging ? 'none' : 'auto',
            }}
          >
            {(showHandle || title || description || showCloseButton || header) && (
              <SheetHeader
                title={title}
                description={description}
                showCloseButton={showCloseButton}
                onClose={handleClose}
                showHandle={showHandle && isVerticalSheet}
                isDraggable={isDraggableVariant && isVerticalSheet}
                onDragStart={handleDragStart}
                dataTestId={`${testId}-header`}
              >
                {header}
              </SheetHeader>
            )}

            <SheetContent padded dataTestId={`${testId}-content`} densityPadding={spacing(2)}>
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 200,
                  }}
                >
                  <CircularProgress color={color} />
                </Box>
              ) : (
                children
              )}
            </SheetContent>

            {footer && (
              <SheetFooter sticky divider dataTestId={`${testId}-footer`} densityPadding={spacing(2)}>
                {footer}
              </SheetFooter>
            )}
          </Box>
        </Drawer>
      )}
    </>
  );
};

export const SheetHeader: React.FC<SheetHeaderProps> = ({
  title,
  description,
  showCloseButton,
  onClose,
  showHandle,
  isDraggable = false,
  onDragStart,
  className,
  style,
  children,
  dataTestId = 'sheet-header',
}) => {
  const theme = useTheme();

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      sx={{
        p: 2,
        pb: showHandle ? 1 : 2,
        cursor: isDraggable ? 'grab' : 'auto',
        '&:active': isDraggable ? { cursor: 'grabbing' } : {},
        ...style,
      }}
      onMouseDown={isDraggable ? onDragStart : undefined}
      onTouchStart={isDraggable ? onDragStart : undefined}
    >
      {showHandle && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 1,
            pointerEvents: isDraggable ? 'none' : 'auto',
          }}
        >
          <Box
            sx={{
              width: isDraggable ? 48 : 32,
              height: isDraggable ? 6 : 4,
              backgroundColor: alpha(theme.palette.text.primary, 0.3),
              borderRadius: 3,
              transition: theme.transitions.create(['all'], {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeInOut,
              }),
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: `linear-gradient(
                  90deg,
                  transparent,
                  ${alpha(theme.palette.common.white, 0.3)},
                  transparent
                )`,
                animation: isDraggable ? `${shimmerAnimation} 2s infinite` : 'none',
              },
              ...(isDraggable && {
                backgroundColor: alpha(theme.palette.primary.main, 0.4),
                boxShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  transform: 'scaleX(1.15) scaleY(1.2)',
                  boxShadow: `0 3px 6px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
              }),
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: 1 }}>
          {title && (
            <Typography variant="h6" sx={{ fontWeight: 600 }} data-testid={`${dataTestId}-title`}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
          {children}
        </Box>

        {showCloseButton && (
          <IconButton onClick={onClose} size="small" sx={{ ml: 1, mt: -0.5 }} data-testid={`${dataTestId}-close-button`}>
            <CloseIcon data-testid={`${dataTestId}-close-icon`} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export const SheetContent: React.FC<SheetContentProps & { densityPadding?: number }> = ({
  children,
  className,
  style,
  padded = true,
  dataTestId = 'sheet-content',
  densityPadding,
}) => (
  <Box
    className={className}
    data-testid={dataTestId}
    sx={{
      flex: 1,
      overflow: 'auto',
      // Base: 8px, scales with density
      p: padded ? (densityPadding !== undefined ? `${densityPadding}px` : 2) : 0,
      ...style,
    }}
  >
    {children}
  </Box>
);

export const SheetFooter: React.FC<SheetFooterProps & { densityPadding?: number }> = ({
  children,
  className,
  style,
  sticky = false,
  divider = false,
  dataTestId = 'sheet-footer',
  densityPadding,
}) => (
  <>
    {divider && <Divider />}
    <Box
      className={className}
      data-testid={dataTestId}
      sx={{
        // Base: 8px, scales with density
        p: densityPadding !== undefined ? `${densityPadding}px` : 2,
        position: sticky ? 'sticky' : 'relative',
        bottom: sticky ? 0 : 'auto',
        backgroundColor: 'background.paper',
        borderTop: sticky ? '1px solid' : 'none',
        borderColor: 'divider',
        ...style,
      }}
    >
      {children}
    </Box>
  </>
);

export const SheetOverlay: React.FC<SheetOverlayProps> = ({
  open = false,
  onClick,
  className,
  style,
  blur = false,
}) => {
  const theme = useTheme();

  return (
    <Fade in={open} timeout={300}>
      <Backdrop
        open={open}
        onClick={onClick}
        className={className}
        sx={{
          zIndex: theme.zIndex.drawer - 1,
          backgroundColor: alpha(theme.palette.common.black, blur ? 0.6 : 0.5),
          backdropFilter: blur ? 'blur(8px) saturate(180%)' : 'none',
          WebkitBackdropFilter: blur ? 'blur(8px) saturate(180%)' : 'none',
          ...style,
        }}
      />
    </Fade>
  );
};
