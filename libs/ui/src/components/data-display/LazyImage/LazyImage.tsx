import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, useTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../../layout/Skeleton';
import type { LazyImageProps, LazyImageState } from './LazyImage.types';

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
}));

const StyledImage = styled('img')<{
  fadeIn?: boolean;
  fadeInDuration?: number;
  isLoaded?: boolean;
}>(({ fadeIn, fadeInDuration = 300, isLoaded }) => ({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
  transition: fadeIn ? `opacity ${fadeInDuration}ms ease-in-out` : 'none',
}));

const SpinnerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  padding: theme.spacing(1),
}));

const FallbackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.disabledBackground,
  color: theme.palette.text.secondary,
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
}));

/**
 * LazyImage component with enhanced features for optimized image loading
 * Supports lazy loading, placeholders, error handling, and various loading states
 */
export const LazyImage = React.memo<LazyImageProps>(function LazyImage({
  src,
  alt,
  width,
  height = 'auto',
  placeholder,
  fallback,
  loadingState = 'skeleton',
  showSpinner,
  objectFit = 'cover',
  objectPosition = 'center',
  borderRadius,
  lazy = true,
  rootMargin = '100px',
  threshold = 0,
  fadeIn = true,
  fadeInDuration = 300,
  onLoad,
  onError,
  onLoadStart,
  retryOnError = false,
  maxRetries = 3,
  retryDelay = 1000,
  decoding = 'async',
  loading: nativeLoading,
  fetchPriority,
  skeletonProps = {},
  spinnerProps = {},
  sx = {},
  className,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role = 'img',
  ...imgProps
}) {
  const theme = useTheme();
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Handle deprecated showSpinner prop
  const effectiveLoadingState = showSpinner ? 'spinner' : loadingState;

  const [state, setState] = useState<LazyImageState>({
    isLoading: true,
    hasError: false,
    isVisible: !lazy, // If not lazy, load immediately
    retryCount: 0,
    currentSrc: lazy ? (placeholder || null) : src,
  });

  // Clean up retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || state.isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState((prev) => ({ ...prev, isVisible: true, currentSrc: src }));
            onLoadStart?.();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [lazy, src, rootMargin, threshold, state.isVisible, onLoadStart]);

  // Load image when it becomes visible
  useEffect(() => {
    if (!state.isVisible || !src || state.currentSrc === src) {
      return;
    }

    setState((prev) => ({ ...prev, currentSrc: src, isLoading: true, hasError: false }));
  }, [state.isVisible, src, state.currentSrc]);

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setState((prev) => ({ ...prev, isLoading: false, hasError: false, retryCount: 0 }));
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const shouldRetry = retryOnError && state.retryCount < maxRetries;

      if (shouldRetry) {
        retryTimeoutRef.current = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            retryCount: prev.retryCount + 1,
            currentSrc: `${src}?retry=${prev.retryCount + 1}`, // Force reload with cache buster
          }));
        }, retryDelay);
      } else {
        setState((prev) => ({ ...prev, isLoading: false, hasError: true }));
        onError?.(event);
      }
    },
    [onError, retryOnError, state.retryCount, maxRetries, retryDelay, src]
  );

  // Determine what to show for loading state
  const renderLoadingState = () => {
    if (!state.isLoading) return null;

    switch (effectiveLoadingState) {
      case 'skeleton':
        return (
          <Skeleton
            variant="rectangular"
            width={width || '100%'}
            height={height || 200}
            animation={skeletonProps.animation || 'pulse'}
            intensity={skeletonProps.intensity}
            borderRadius={borderRadius}
            data-testid={`${dataTestId}-skeleton`}
          />
        );
      case 'spinner':
        return (
          <SpinnerOverlay>
            <CircularProgress
              size={spinnerProps.size || 40}
              thickness={spinnerProps.thickness || 4}
              sx={{ color: spinnerProps.color || theme.palette.primary.main }}
              data-testid={`${dataTestId}-spinner`}
            />
          </SpinnerOverlay>
        );
      case 'placeholder':
        if (placeholder && !state.currentSrc) {
          return (
            <StyledImage
              src={placeholder}
              alt={`${alt} (loading)`}
              style={{
                width,
                height,
                objectFit,
                objectPosition,
              }}
              data-testid={`${dataTestId}-placeholder`}
            />
          );
        }
        return null;
      case 'none':
      default:
        return null;
    }
  };

  // Render error fallback
  const renderErrorFallback = () => {
    if (!state.hasError || !fallback) return null;

    if (typeof fallback === 'string') {
      return (
        <StyledImage
          src={fallback}
          alt={`${alt} (fallback)`}
          style={{
            width,
            height,
            objectFit,
            objectPosition,
          }}
          fadeIn={false}
          isLoaded={true}
          data-testid={`${dataTestId}-fallback`}
        />
      );
    }

    return (
      <FallbackContainer
        sx={{
          width,
          height,
          borderRadius,
        }}
        data-testid={`${dataTestId}-fallback`}
      >
        {fallback}
      </FallbackContainer>
    );
  };

  const imageStyles: React.CSSProperties = {
    width,
    height,
    objectFit,
    objectPosition,
    borderRadius,
    ...sx,
  };

  const showImage = state.currentSrc && !state.hasError;
  const showLoading = state.isLoading && (!state.currentSrc || effectiveLoadingState !== 'placeholder');

  return (
    <ImageContainer
      ref={containerRef}
      className={className}
      sx={{
        width: width || 'auto',
        height: height || 'auto',
        borderRadius,
      }}
      data-testid={dataTestId}
    >
      {showLoading && renderLoadingState()}

      {showImage && (
        <StyledImage
          ref={imgRef}
          src={state.currentSrc || undefined}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          fadeIn={fadeIn}
          fadeInDuration={fadeInDuration}
          isLoaded={!state.isLoading}
          decoding={decoding}
          loading={lazy ? 'lazy' : nativeLoading}
          style={imageStyles}
          aria-label={ariaLabel || alt}
          aria-describedby={ariaDescribedBy}
          role={role}
          data-testid={`${dataTestId}-img`}
          {...imgProps}
        />
      )}

      {state.hasError && renderErrorFallback()}
    </ImageContainer>
  );
});

LazyImage.displayName = 'LazyImage';