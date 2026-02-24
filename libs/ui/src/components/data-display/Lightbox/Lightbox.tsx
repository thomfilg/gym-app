import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PrevIcon from '@mui/icons-material/ChevronLeft';
import NextIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import ResetZoomIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import type { LightboxProps, LightboxRef } from './Lightbox.types';

export const Lightbox = React.forwardRef<LightboxRef, LightboxProps>(
  (
    {
      isOpen = false,
      onClose,
      items = [],
      startIndex = 0,
      showControls = true,
      showCaptions = true,
      loop = false,
      autoplay = false,
      thumbnails = false,
      zoomable = true,
      className,
      style,
      dataTestId,
    },
    ref,
  ) => {
    // State management
    const [currentIndex, setCurrentIndex] = useState(
      Math.max(0, Math.min(startIndex, items.length - 1)),
    );
    const [isLoading, setIsLoading] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

    // Refs
    const autoplayTimerRef = useRef<number | undefined>(undefined);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const isDraggingRef = useRef(false);

    const currentItem = items[currentIndex];

    // Preload images
    const preloadImage = useCallback(
      (src: string) => {
        if (preloadedImages.has(src)) return;

        const img = new window.Image();
        img.onload = () => {
          setPreloadedImages((prev) => new Set([...prev, src]));
        };
        img.src = src;
      },
      [preloadedImages],
    );

    // Navigation functions
    const goToIndex = useCallback(
      (index: number) => {
        if (items.length === 0) return;

        let newIndex = index;
        if (loop) {
          newIndex = ((index % items.length) + items.length) % items.length;
        } else {
          newIndex = Math.max(0, Math.min(index, items.length - 1));
        }

        setCurrentIndex(newIndex);
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });

        // Preload adjacent images
        const prevItem = items[newIndex - 1];
        const nextItem = items[newIndex + 1];
        if (prevItem && (prevItem.type === 'image' || !prevItem.type)) {
          preloadImage(prevItem.src);
        }
        if (nextItem && (nextItem.type === 'image' || !nextItem.type)) {
          preloadImage(nextItem.src);
        }
      },
      [items, loop, preloadImage],
    );

    const next = useCallback(() => {
      if (currentIndex < items.length - 1 || loop) {
        goToIndex(currentIndex + 1);
      }
    }, [currentIndex, items.length, loop, goToIndex]);

    const prev = useCallback(() => {
      if (currentIndex > 0 || loop) {
        goToIndex(currentIndex - 1);
      }
    }, [currentIndex, loop, goToIndex]);

    const close = useCallback(() => {
      setIsAutoPlaying(false);
      if (autoplayTimerRef.current) {
        window.clearTimeout(autoplayTimerRef.current);
      }
      onClose();
    }, [onClose]);

    const open = useCallback(
      (index: number = 0) => {
        goToIndex(index);
      },
      [goToIndex],
    );

    // Expose imperative API
    useImperativeHandle(ref, () => ({
      open,
      close,
      next,
      prev,
      goTo: goToIndex,
    }));

    // Keyboard handling
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
        switch (event.key) {
          case 'Escape':
            close();
            break;
          case 'ArrowLeft':
            if (showControls) {
              event.preventDefault();
              prev();
            }
            break;
          case 'ArrowRight':
            if (showControls) {
              event.preventDefault();
              next();
            }
            break;
          case ' ':
            event.preventDefault();
            if (autoplay) {
              setIsAutoPlaying((prev) => !prev);
            }
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, showControls, close, prev, next, autoplay]);

    // Autoplay functionality
    useEffect(() => {
      if (!isAutoPlaying || !autoplay || items.length <= 1) return;

      const interval = typeof autoplay === 'object' ? autoplay.interval || 4000 : 4000;

      autoplayTimerRef.current = window.setTimeout(() => {
        next();
      }, interval);

      return () => {
        if (autoplayTimerRef.current) {
          window.clearTimeout(autoplayTimerRef.current);
        }
      };
    }, [isAutoPlaying, autoplay, currentIndex, next, items.length]);

    // Start autoplay when component opens
    useEffect(() => {
      if (isOpen && autoplay && items.length > 1) {
        setIsAutoPlaying(true);
      } else {
        setIsAutoPlaying(false);
      }
    }, [isOpen, autoplay, items.length]);

    // Touch/gesture handling
    const handleTouchStart = useCallback((event: React.TouchEvent) => {
      if (event.touches.length === 1 && event.touches[0]) {
        touchStartRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    }, []);

    const handleTouchEnd = useCallback(
      (event: React.TouchEvent) => {
        if (!touchStartRef.current) return;

        const touch = event.changedTouches[0];
        if (!touch) return;

        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
              prev();
            } else {
              next();
            }
          }
        } else {
          // Vertical swipe
          if (deltaY > minSwipeDistance) {
            close();
          }
        }

        touchStartRef.current = null;
      },
      [prev, next, close],
    );

    // Zoom functionality
    const handleWheel = useCallback(
      (event: React.WheelEvent) => {
        if (!zoomable || !currentItem || currentItem.type === 'video') return;

        event.preventDefault();
        const delta = event.deltaY * -0.01;
        const newZoom = Math.max(0.5, Math.min(5, zoomLevel + delta));
        setZoomLevel(newZoom);
      },
      [zoomable, currentItem, zoomLevel],
    );

    const resetZoom = useCallback(() => {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }, []);

    const zoomIn = useCallback(() => {
      setZoomLevel((prev) => Math.min(5, prev * 1.2));
    }, []);

    const zoomOut = useCallback(() => {
      setZoomLevel((prev) => Math.max(0.5, prev / 1.2));
    }, []);

    // Render media content
    const renderMedia = () => {
      if (!currentItem) return null;

      const isVideo = currentItem.type === 'video';
      const isImage = !currentItem.type || currentItem.type === 'image';

      if (isVideo) {
        return (
          <video
            src={currentItem.src}
            controls
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
            aria-label={currentItem.alt || `Video ${currentIndex + 1} of ${items.length}`}
            data-testid={dataTestId ? `${dataTestId}-video` : 'lightbox-video'}
          />
        );
      }

      if (isImage) {
        return (
          <img
            src={currentItem.src}
            alt={currentItem.alt || `Image ${currentIndex + 1} of ${items.length}`}
            style={{
              maxWidth: zoomLevel === 1 ? '90vw' : 'none',
              maxHeight: zoomLevel === 1 ? '80vh' : 'none',
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: 'center',
              cursor: zoomLevel > 1 ? 'move' : zoomable ? 'zoom-in' : 'default',
              transition: isDraggingRef.current ? 'none' : 'transform 0.2s ease',
              objectFit: 'contain',
            }}
            onLoad={() => setIsLoading(false)}
            onWheel={handleWheel}
            onDoubleClick={zoomLevel > 1 ? resetZoom : zoomIn}
            draggable={false}
            data-testid={dataTestId ? `${dataTestId}-image` : 'lightbox-image'}
          />
        );
      }

      return null;
    };

    // Render thumbnails
    const renderThumbnails = () => {
      if (!thumbnails || items.length <= 1) return null;

      return (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            maxWidth: '90vw',
            overflowX: 'auto',
            padding: 1,
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 1,
          }}
          data-testid={dataTestId ? `${dataTestId}-thumbnails` : 'lightbox-thumbnails'}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              onClick={() => goToIndex(index)}
              sx={{
                width: 60,
                height: 40,
                cursor: 'pointer',
                border: currentIndex === index ? '2px solid white' : '2px solid transparent',
                borderRadius: 0.5,
                overflow: 'hidden',
                flexShrink: 0,
                '&:hover': {
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                },
              }}
              data-testid={
                dataTestId ? `${dataTestId}-thumbnail-${index}` : `lightbox-thumbnail-${index}`
              }
            >
              {item.type === 'video' ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlayIcon sx={{ color: 'white', fontSize: 16 }} />
                </Box>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || `Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      );
    };

    return (
      <Dialog
        open={isOpen}
        onClose={close}
        maxWidth={false}
        fullScreen
        TransitionComponent={Fade}
        TransitionProps={{
          timeout: 300,
        }}
        PaperProps={{
          sx: {
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(2px)',
          },
        }}
        aria-label="Lightbox"
        aria-labelledby="lightbox-title"
        role="dialog"
        aria-modal="true"
        className={className}
        style={style}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-testid={dataTestId || 'lightbox'}
      >
        {/* Visually hidden title for screen readers */}
        <Typography id="lightbox-title" variant="h6" sx={{ position: 'absolute', left: -10000 }}>
          Lightbox - {currentItem?.alt || `Item ${currentIndex + 1} of ${items.length}`}
        </Typography>

        {/* Close button */}
        <IconButton
          onClick={close}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
          aria-label="Close lightbox"
          data-testid={dataTestId ? `${dataTestId}-close` : 'lightbox-close'}
        >
          <CloseIcon />
        </IconButton>

        {/* Navigation controls */}
        {showControls && items.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              disabled={!loop && currentIndex === 0}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover:not(:disabled)': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                '&:disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
              aria-label="Previous item"
              data-testid={dataTestId ? `${dataTestId}-prev` : 'lightbox-prev'}
            >
              <PrevIcon />
            </IconButton>

            <IconButton
              onClick={next}
              disabled={!loop && currentIndex === items.length - 1}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover:not(:disabled)': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                '&:disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
              aria-label="Next item"
              data-testid={dataTestId ? `${dataTestId}-next` : 'lightbox-next'}
            >
              <NextIcon />
            </IconButton>
          </>
        )}

        {/* Zoom controls */}
        {zoomable && currentItem && currentItem.type !== 'video' && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              zIndex: 1000,
            }}
            data-testid={dataTestId ? `${dataTestId}-zoom-controls` : 'lightbox-zoom-controls'}
          >
            <IconButton
              onClick={zoomIn}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              aria-label="Zoom in"
              data-testid={dataTestId ? `${dataTestId}-zoom-in` : 'lightbox-zoom-in'}
            >
              <ZoomInIcon />
            </IconButton>
            <IconButton
              onClick={zoomOut}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              aria-label="Zoom out"
              data-testid={dataTestId ? `${dataTestId}-zoom-out` : 'lightbox-zoom-out'}
            >
              <ZoomOutIcon />
            </IconButton>
            <IconButton
              onClick={resetZoom}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              aria-label="Reset zoom"
              data-testid={dataTestId ? `${dataTestId}-zoom-reset` : 'lightbox-zoom-reset'}
            >
              <ResetZoomIcon />
            </IconButton>
          </Box>
        )}

        {/* Autoplay controls */}
        {autoplay && items.length > 1 && (
          <IconButton
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            sx={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            aria-label={isAutoPlaying ? 'Pause slideshow' : 'Start slideshow'}
            data-testid={dataTestId ? `${dataTestId}-autoplay` : 'lightbox-autoplay'}
          >
            {isAutoPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
        )}

        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
          }}
          data-testid={dataTestId ? `${dataTestId}-content` : 'lightbox-content'}
        >
          {/* Loading indicator */}
          {isLoading && (
            <CircularProgress
              sx={{
                position: 'absolute',
                color: 'white',
                zIndex: 999,
              }}
              data-testid={dataTestId ? `${dataTestId}-loading` : 'lightbox-loading'}
            />
          )}

          {/* Media content */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
            data-testid={dataTestId ? `${dataTestId}-image-container` : 'lightbox-image-container'}
          >
            {renderMedia()}
          </Box>

          {/* Caption */}
          {showCaptions && currentItem?.caption && (
            <Typography
              id="lightbox-description"
              sx={{
                position: 'absolute',
                bottom: thumbnails ? 120 : 16,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                textAlign: 'center',
                maxWidth: '80vw',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 2,
                borderRadius: 1,
              }}
              data-testid={dataTestId ? `${dataTestId}-caption` : 'lightbox-caption'}
            >
              {currentItem.caption}
            </Typography>
          )}

          {/* Item counter */}
          {items.length > 1 && (
            <Typography
              sx={{
                position: 'absolute',
                top: 70,
                right: 16,
                color: 'white',
                fontSize: '0.875rem',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '4px 8px',
                borderRadius: 1,
              }}
              aria-live="polite"
              data-testid={dataTestId ? `${dataTestId}-counter` : 'lightbox-counter'}
            >
              {currentIndex + 1} / {items.length}
            </Typography>
          )}

          {/* Thumbnails */}
          {renderThumbnails()}
        </DialogContent>
      </Dialog>
    );
  },
);

Lightbox.displayName = 'Lightbox';

export default Lightbox;
