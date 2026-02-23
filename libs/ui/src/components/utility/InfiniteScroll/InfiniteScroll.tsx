import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { InfiniteScrollProps } from './InfiniteScroll.types';

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  variant = 'default',
  hasMore,
  loading,
  threshold = 150,
  loadMore,
  loader,
  endMessage,
  error,
  errorComponent,
  onError,
  className,
  style,
  width,
  scrollableTarget,
  testMode = false,
  testTriggerRef,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const defaultLoader = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <CircularProgress size={24} />
      <Typography variant="body2" sx={{ ml: 1 }}>
        Loading...
      </Typography>
    </Box>
  );

  const defaultEndMessage = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        No more items to load
      </Typography>
    </Box>
  );

  const defaultErrorComponent = error ? (
    <Alert severity="error" sx={{ m: 2 }}>
      {error.message || 'An error occurred while loading more items'}
    </Alert>
  ) : null;

  const handleLoadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || error) {
      return;
    }

    loadingRef.current = true;

    try {
      await loadMore();
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error');
      onError?.(errorObj);
    } finally {
      loadingRef.current = false;
    }
  }, [hasMore, error, loadMore, onError]);

  // Expose test trigger for test mode
  useEffect(() => {
    if (testMode && testTriggerRef) {
      testTriggerRef.current = handleLoadMore;
    }

    return () => {
      if (testMode && testTriggerRef) {
        testTriggerRef.current = undefined;
      }
    };
  }, [testMode, testTriggerRef, handleLoadMore]);

  useEffect(() => {
    if (testMode || !sentinelRef.current) return;

    const getScrollableElement = () => {
      if (!scrollableTarget) return null;

      if (typeof scrollableTarget === 'string') {
        return (
          document.getElementById(scrollableTarget) || document.querySelector(scrollableTarget)
        );
      }

      return scrollableTarget;
    };

    const scrollableElement = getScrollableElement();
    const rootElement = scrollableElement || undefined;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      {
        root: rootElement,
        rootMargin: `${threshold}px`,
        threshold: 0,
      },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [threshold, scrollableTarget]);

  useEffect(() => {
    if (isIntersecting && hasMore && !loading && !error) {
      handleLoadMore();
    }
  }, [isIntersecting, hasMore, loading, error, handleLoadMore]);

  const getContainerStyles = () => {
    const baseStyles = {
      width: variant === 'horizontal' ? width || '100%' : '100%',
      height: variant === 'horizontal' ? '100%' : 'auto',
      overflowX: variant === 'horizontal' ? 'auto' : 'hidden',
      overflowY: variant === 'horizontal' ? 'hidden' : 'visible',
      display: 'flex',
      flexDirection: variant === 'horizontal' ? 'row' : 'column',
    };

    if (variant === 'reverse') {
      return {
        ...baseStyles,
        flexDirection: 'column-reverse',
      };
    }

    return baseStyles;
  };

  const renderSentinel = () => {
    if (!hasMore) {
      return endMessage || defaultEndMessage;
    }

    if (error) {
      return errorComponent || defaultErrorComponent;
    }

    if (loading) {
      return loader || defaultLoader;
    }

    return (
      <div
        ref={sentinelRef}
        data-testid="infinite-scroll-sentinel"
        style={{
          height: variant === 'horizontal' ? '100%' : '1px',
          width: variant === 'horizontal' ? '1px' : '100%',
        }}
      />
    );
  };

  return (
    <Box
      className={className}
      sx={{
        ...getContainerStyles(),
        ...style,
      }}
    >
      {variant === 'reverse' && renderSentinel()}

      {variant === 'horizontal' ? (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>{children}</Box>
      ) : (
        children
      )}

      {variant !== 'reverse' && renderSentinel()}

      {variant === 'horizontal' && renderSentinel()}
    </Box>
  );
};
