import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { alpha, useTheme } from '@mui/material/styles';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import React, { useCallback,useEffect, useRef, useState } from 'react';

import type { ScrollAreaProps } from './ScrollArea.types';

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  width = '100%',
  height = '100%',
  maxHeight,
  maxWidth,
  orientation = 'vertical',
  scrollbarSize = 'medium',
  autoHide = true,
  autoHideDelay = 1000,
  smoothScroll = true,
  variant = 'default',
  onScroll,
  scrollToTopButton = false,
  scrollToTopThreshold = 100,
  scrollbarColor,
  scrollbarTrackColor,
  contentPadding = 0,
  alwaysShowScrollbar = false,
  disabled = false,
  loading = false,
  emptyContent,
  testId = 'scroll-area',
  scrollRef: externalScrollRef,
  onResize,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const internalScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Track container dimensions with ResizeObserver
  useEffect(() => {
    if (!internalScrollRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setContainerDimensions({ width, height });
        onResize?.({ width, height });
      }
    });

    resizeObserver.observe(internalScrollRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  // Callback ref that updates both internal and external refs
  const setScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Update internal ref
      (internalScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      // Update external ref if provided
      if (externalScrollRef) {
        (externalScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [externalScrollRef],
  );

  // Use internal ref for accessing the element
  const scrollRef = internalScrollRef;
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  // Get scrollbar size in pixels
  const getScrollbarSize = () => {
    switch (scrollbarSize) {
      case 'thin':
        return 8;
      case 'thick':
        return 16;
      default:
        return 12;
    }
  };

  // Get scrollbar colors
  const getScrollbarColors = () => {
    const defaultScrollbarColor =
      variant === 'glass'
        ? alpha(theme.palette.primary.main, 0.5)
        : theme.palette.mode === 'dark'
          ? theme.palette.grey[600]
          : theme.palette.grey[400];

    const defaultTrackColor =
      variant === 'glass'
        ? alpha(theme.palette.background.paper, 0.1)
        : theme.palette.mode === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[200];

    return {
      scrollbar: scrollbarColor || defaultScrollbarColor,
      track: scrollbarTrackColor || defaultTrackColor,
    };
  };

  // Get overflow style based on orientation
  const getOverflowStyle = () => {
    if (disabled) return { overflow: 'hidden' as const };

    switch (orientation) {
      case 'horizontal':
        return {
          overflow: 'hidden' as const,
          overflowX: 'auto' as const,
          overflowY: 'hidden' as const,
        };
      case 'both':
        return { overflow: 'auto' as const };
      default:
        return {
          overflow: 'hidden' as const,
          overflowY: 'auto' as const,
          overflowX: 'hidden' as const,
        };
    }
  };

  // Handle scroll event
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Handle auto-hide behavior
      if (autoHide && !alwaysShowScrollbar) {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, autoHideDelay);
      }

      // Check if should show scroll to top button
      if (scrollToTopButton && scrollRef.current) {
        const scrollTop = scrollRef.current.scrollTop;
        setShowScrollToTop(scrollTop > scrollToTopThreshold);
      }

      // Call user's onScroll handler
      if (onScroll) {
        onScroll(event);
      }
    },
    [
      disabled,
      autoHide,
      alwaysShowScrollbar,
      autoHideDelay,
      scrollToTopButton,
      scrollToTopThreshold,
      onScroll,
    ],
  );

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: smoothScroll ? 'smooth' : 'auto',
      });
    }
  }, [smoothScroll]);

  // Clean up timeout on unmount
  useEffect(() => () => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
  }, []);

  // Determine if scrollbar should be visible
  const shouldShowScrollbar = alwaysShowScrollbar || !autoHide || isScrolling;

  // Get variant-specific styles
  const getVariantStyles = () => {
    const colors = getScrollbarColors();
    const size = getScrollbarSize();

    // Common scrollbar styles with auto-hide support
    const getAutoHideStyles = (thumbColor: string, trackColor: string) => ({
      '&::-webkit-scrollbar': {
        width: orientation !== 'horizontal' ? size : '100%',
        height: orientation !== 'vertical' ? size : '100%',
      },
      '&::-webkit-scrollbar-track': {
        background: shouldShowScrollbar ? trackColor : 'transparent',
        borderRadius: size / 2,
        transition: 'background 0.3s ease',
      },
      '&::-webkit-scrollbar-thumb': {
        background: shouldShowScrollbar ? thumbColor : 'transparent',
        borderRadius: size / 2,
        transition: 'background 0.3s ease',
        '&:hover': {
          background: shouldShowScrollbar ? theme.palette.primary.main : 'transparent',
        },
      },
      '&::-webkit-scrollbar-corner': {
        background: shouldShowScrollbar ? trackColor : 'transparent',
      },
      // Firefox scrollbar styling
      scrollbarWidth: shouldShowScrollbar
        ? scrollbarSize === 'thin'
          ? ('thin' as const)
          : ('auto' as const)
        : ('none' as const),
      scrollbarColor: shouldShowScrollbar
        ? `${thumbColor} ${trackColor}`
        : 'transparent transparent',
    });

    switch (variant) {
      case 'overlay':
        return {
          '&::-webkit-scrollbar': {
            width: orientation !== 'horizontal' ? size : '100%',
            height: orientation !== 'vertical' ? size : '100%',
            position: 'absolute',
            right: 0,
            top: 0,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: size / 2,
          },
          '&::-webkit-scrollbar-thumb': {
            background: shouldShowScrollbar
              ? alpha(colors.scrollbar, 0.5)
              : 'transparent',
            borderRadius: size / 2,
            transition: 'background 0.3s ease',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            '&:hover': {
              background: shouldShowScrollbar ? theme.palette.primary.main : 'transparent',
            },
          },
          '&::-webkit-scrollbar-corner': {
            background: 'transparent',
          },
          scrollbarWidth: shouldShowScrollbar
            ? scrollbarSize === 'thin'
              ? ('thin' as const)
              : ('auto' as const)
            : ('none' as const),
          scrollbarColor: shouldShowScrollbar
            ? `${alpha(colors.scrollbar, 0.5)} transparent`
            : 'transparent transparent',
        };

      case 'glass': {
        const glassThumbColor = `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.3)})`;
        const glassTrackColor = alpha(theme.palette.background.paper, 0.1);
        return {
          '&::-webkit-scrollbar': {
            width: orientation !== 'horizontal' ? size : '100%',
            height: orientation !== 'vertical' ? size : '100%',
          },
          '&::-webkit-scrollbar-track': {
            background: shouldShowScrollbar ? glassTrackColor : 'transparent',
            borderRadius: size / 2,
            backdropFilter: shouldShowScrollbar ? 'blur(5px)' : 'none',
            transition: 'background 0.3s ease',
          },
          '&::-webkit-scrollbar-thumb': {
            background: shouldShowScrollbar ? glassThumbColor : 'transparent',
            borderRadius: size / 2,
            transition: 'background 0.3s ease',
            boxShadow: shouldShowScrollbar
              ? `inset 0 0 6px ${alpha(theme.palette.common.white, 0.3)}`
              : 'none',
            '&:hover': {
              background: shouldShowScrollbar ? theme.palette.primary.main : 'transparent',
            },
          },
          '&::-webkit-scrollbar-corner': {
            background: shouldShowScrollbar ? glassTrackColor : 'transparent',
          },
          scrollbarWidth: shouldShowScrollbar
            ? scrollbarSize === 'thin'
              ? ('thin' as const)
              : ('auto' as const)
            : ('none' as const),
          scrollbarColor: shouldShowScrollbar
            ? `${colors.scrollbar} ${glassTrackColor}`
            : 'transparent transparent',
          backdropFilter: 'blur(10px)',
        };
      }

      default:
        return getAutoHideStyles(colors.scrollbar, colors.track);
    }
  };

  // Render empty content if no children and emptyContent is provided
  const renderContent = () => {
    if (!children && emptyContent) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: 200,
            color: theme.palette.text.secondary,
          }}
        >
          {emptyContent}
        </Box>
      );
    }

    // Auto-enhance children that accept scrollContainerRef (like VirtualList/VirtualGrid)
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // Check if the child component accepts scrollContainerRef prop
        // by looking at its props type or if it's a known virtualization component
        const childProps = child.props as Record<string, unknown>;

        // If child has disableInternalScroll prop, it's likely a VirtualList/VirtualGrid
        // Auto-inject scrollContainerRef, disableInternalScroll, and container width
        if ('disableInternalScroll' in childProps || childProps.scrollContainerRef !== undefined) {
          const enhancedProps: Record<string, unknown> = {
            scrollContainerRef: internalScrollRef,
            disableInternalScroll: true,
          };

          // If child accepts width and doesn't have one set, provide container width
          if (containerDimensions.width > 0 && childProps.width === '100%') {
            enhancedProps.width = containerDimensions.width;
          }

          return React.cloneElement(child, enhancedProps);
        }
      }
      return child;
    });
  };

  return (
    <Box
      data-testid={testId}
      sx={{
        position: 'relative',
        width,
        height,
        maxHeight,
        maxWidth,
        ...sx,
      }}
      {...props}
    >
      <Box
        ref={setScrollRef}
        onScroll={handleScroll}
        role="region"
        aria-label="Scrollable content"
        aria-busy={loading}
        tabIndex={disabled ? -1 : 0}
        sx={{
          width: '100%',
          height: '100%',
          // Use explicit maxHeight when height is 'auto', otherwise inherit from parent
          maxHeight: height === 'auto' && maxHeight ? maxHeight : '100%',
          padding: contentPadding,
          opacity: loading ? 0.5 : 1,
          pointerEvents: disabled || loading ? 'none' : 'auto',
          transition: 'opacity 0.3s ease',
          '&:focus': {
            outline: 'none',
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: -2,
            },
          },
          ...getOverflowStyle(),
          ...getVariantStyles(),
        }}
        style={{
          scrollBehavior: smoothScroll ? 'smooth' : 'auto',
        }}
      >
        {renderContent()}
      </Box>

      {/* Loading overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Scroll to top button */}
      {scrollToTopButton && !disabled && !loading && (
        <Zoom in={showScrollToTop}>
          <Fab
            size="small"
            aria-label="Scroll to top"
            onClick={scrollToTop}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 1,
              backgroundColor:
                variant === 'glass'
                  ? alpha(theme.palette.primary.main, 0.2)
                  : theme.palette.primary.main,
              backdropFilter: variant === 'glass' ? 'blur(10px)' : 'none',
              '&:hover': {
                backgroundColor:
                  variant === 'glass'
                    ? alpha(theme.palette.primary.main, 0.3)
                    : theme.palette.primary.dark,
              },
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </Zoom>
      )}
    </Box>
  );
};
