import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { alpha, useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React, { useCallback,useEffect, useRef, useState } from 'react';

import type {
  CarouselArrowsProps,
  CarouselIndicatorsProps,
  CarouselItem,
  CarouselProps,
  CarouselThumbnailsProps,
} from './Carousel.types';

export const Carousel: React.FC<CarouselProps> = ({
  items,
  variant = 'default',
  size = 'md',
  color = 'primary',
  autoPlay = false,
  autoPlayInterval = 3000,
  loop = true,
  showIndicators = true,
  showArrows = true,
  showThumbnails = false,
  glow = false,
  pulse = false,
  glass = false,
  gradient = false,
  loading = false,
  disabled = false,
  className,
  style,
  height = 400,
  width = '100%',
  pauseOnHover = true,
  onClick,
  onChange,
  onFocus,
  onBlur,
  indicatorPosition = 'bottom',
  arrowPosition = 'overlay',
  animation = 'slide',
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1;
      if (next >= items.length) {
        const newIndex = loop ? 0 : prev;
        if (newIndex !== prev) {
          onChange?.(newIndex);
        }
        return newIndex;
      }
      onChange?.(next);
      return next;
    });
  }, [items.length, loop, onChange]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev - 1;
      if (next < 0) {
        const newIndex = loop ? items.length - 1 : 0;
        if (newIndex !== prev) {
          onChange?.(newIndex);
        }
        return newIndex;
      }
      onChange?.(next);
      return next;
    });
  }, [items.length, loop, onChange]);

  useEffect(() => {
    if (autoPlay && !isHovered && !disabled) {
      intervalRef.current = window.setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, autoPlay, autoPlayInterval, isHovered, disabled, handleNext]);

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onChange?.(index);
    },
    [onChange],
  );

  const handleItemClick = useCallback(
    (item: CarouselItem, index: number) => {
      if (!disabled) {
        onClick?.(item, index);
      }
    },
    [disabled, onClick],
  );

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return { height: 200, fontSize: '0.75rem' };
      case 'sm':
        return { height: 300, fontSize: '0.875rem' };
      case 'md':
        return { height: 400, fontSize: '1rem' };
      case 'lg':
        return { height: 500, fontSize: '1.125rem' };
      case 'xl':
        return { height: 600, fontSize: '1.25rem' };
      default:
        return { height: 400, fontSize: '1rem' };
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      width,
      height: typeof height === 'number' ? height : getSizeStyles().height,
      overflow: 'hidden',
      borderRadius: theme.spacing(1),
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.standard,
      }),
    };

    const glowStyles = glow
      ? {
        boxShadow: `0 0 30px ${alpha(theme.palette[color].main, 0.4)}`,
      }
      : {};

    const pulseStyles = pulse
      ? {
        animation: 'pulse 2s infinite',
        '@keyframes pulse': {
          '0%': { boxShadow: `0 0 0 0 ${alpha(theme.palette[color].main, 0.4)}` },
          '70%': { boxShadow: `0 0 0 20px ${alpha(theme.palette[color].main, 0)}` },
          '100%': { boxShadow: `0 0 0 0 ${alpha(theme.palette[color].main, 0)}` },
        },
      }
      : {};

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor: alpha(theme.palette.background.paper, glass ? 0.1 : 0.9),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        };

      case 'gradient':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          background: gradient
            ? `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.1)}, ${alpha(theme.palette[color].dark, 0.1)})`
            : 'transparent',
        };

      case 'elevated':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          boxShadow: theme.shadows[8],
        };

      case 'minimal':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          border: 'none',
          boxShadow: 'none',
        };

      case 'cards':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          padding: theme.spacing(2),
        };

      default:
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
        };
    }
  };

  const renderSlide = (item: CarouselItem, index: number) => {
    const isActive = index === activeIndex;

    const slideContent = (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: onClick ? 'pointer' : 'default',
          position: 'relative',
        }}
        onClick={() => handleItemClick(item, index)}
      >
        {item.image && (
          <Box
            component="img"
            src={item.image}
            alt={item.alt || item.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            p: 3,
          }}
        >
          {item.title && (
            <Typography
              variant="h5"
              sx={{
                color: item.image ? 'white' : 'text.primary',
                textShadow: item.image ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
                mb: 1,
              }}
            >
              {item.title}
            </Typography>
          )}

          {item.description && (
            <Typography
              variant="body1"
              sx={{
                color: item.image ? 'white' : 'text.secondary',
                textShadow: item.image ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              {item.description}
            </Typography>
          )}

          {item.content}
        </Box>
      </Box>
    );

    if (variant === 'cards') {
      return (
        <Paper
          elevation={isActive ? 8 : 2}
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            transform: isActive ? 'scale(1)' : 'scale(0.9)',
            transition: theme.transitions.create(['transform', 'box-shadow']),
          }}
        >
          {slideContent}
        </Paper>
      );
    }

    return slideContent;
  };

  const getTransitionComponent = () => {
    switch (animation) {
      case 'fade':
        return Fade;
      case 'zoom':
        return Zoom;
      case 'flip':
        return Slide;
      default:
        return Slide;
    }
  };

  const TransitionComponent = getTransitionComponent();

  if (loading) {
    return (
      <Box
        sx={{
          ...getVariantStyles(),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color={color} />
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      className={className}
      data-testid="carousel-container"
      sx={{
        ...getVariantStyles(),
        ...style,
      }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Box
        data-testid="carousel-track"
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {items.map((item, index) => (
          <TransitionComponent
            key={item.id}
            in={index === activeIndex}
            timeout={600}
            {...(animation === 'flip' && { direction: 'left' })}
          >
            <Box
              data-testid={`carousel-slide-${index}`}
              data-active={index === activeIndex}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: index === activeIndex ? 'block' : 'none',
              }}
            >
              {renderSlide(item, index)}
            </Box>
          </TransitionComponent>
        ))}
      </Box>

      {showArrows && !disabled && (
        <CarouselArrows
          onPrev={handlePrev}
          onNext={handleNext}
          position={arrowPosition}
          color={color}
          disablePrev={!loop && activeIndex === 0}
          disableNext={!loop && activeIndex === items.length - 1}
        />
      )}

      {showIndicators && (
        <CarouselIndicators
          count={items.length}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          position={indicatorPosition}
          color={color}
        />
      )}

      {showThumbnails && (
        <CarouselThumbnails
          items={items}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          size={size}
        />
      )}
    </Box>
  );
};

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  count,
  activeIndex,
  onSelect,
  position = 'bottom',
  color = 'primary',
  variant = 'dots',
  className,
  style,
}) => {
  const theme = useTheme();

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return { top: theme.spacing(2), left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { bottom: theme.spacing(2), left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return {
          left: theme.spacing(2),
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
        };
      case 'right':
        return {
          right: theme.spacing(2),
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
        };
      default:
        return { bottom: theme.spacing(2), left: '50%', transform: 'translateX(-50%)' };
    }
  };

  const renderIndicator = (index: number) => {
    const isActive = index === activeIndex;

    switch (variant) {
      case 'lines':
        return (
          <Box
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`carousel-indicator-${index}`}
            data-active={isActive}
            sx={{
              width: isActive ? 30 : 20,
              height: 3,
              backgroundColor: isActive
                ? theme.palette[color].main
                : alpha(theme.palette[color].main, 0.3),
              borderRadius: 1.5,
              transition: theme.transitions.create(['width', 'background-color']),
              cursor: 'pointer',
            }}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(index);
              }
            }}
          />
        );

      case 'numbers':
        return (
          <Box
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`carousel-indicator-${index}`}
            data-active={isActive}
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: isActive ? theme.palette[color].main : 'transparent',
              color: isActive ? theme.palette[color].contrastText : theme.palette[color].main,
              border: `1px solid ${theme.palette[color].main}`,
              fontSize: '0.75rem',
              fontWeight: isActive ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: theme.transitions.create(['all']),
            }}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(index);
              }
            }}
          >
            {index + 1}
          </Box>
        );

      default:
        return (
          <IconButton
            size="small"
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`carousel-indicator-${index}`}
            data-active={isActive}
            onClick={() => onSelect(index)}
            sx={{
              p: 0.5,
              color: isActive ? theme.palette[color].main : alpha(theme.palette[color].main, 0.3),
              transform: isActive ? 'scale(1.2)' : 'scale(1)',
              transition: theme.transitions.create(['transform', 'color']),
            }}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        );
    }
  };

  return (
    <Box
      className={className}
      data-testid="carousel-indicators"
      sx={{
        position: 'absolute',
        display: 'flex',
        gap: 1,
        zIndex: 2,
        ...getPositionStyles(),
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderIndicator(index)}</React.Fragment>
      ))}
    </Box>
  );
};

export const CarouselArrows: React.FC<CarouselArrowsProps> = ({
  onPrev,
  onNext,
  position = 'overlay',
  disabled = false,
  disablePrev = false,
  disableNext = false,
  color = 'primary',
  size = 'medium',
  className,
  style,
}) => {
  const theme = useTheme();

  const getArrowStyles = () => {
    const baseStyles = {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      color: theme.palette[color].main,
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
      },
      '&:disabled': {
        opacity: 0.3,
      },
    };

    switch (position) {
      case 'outside':
        return {
          ...baseStyles,
          position: 'absolute' as const,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
        };
      case 'inside':
        return {
          ...baseStyles,
          position: 'absolute' as const,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
        };
      case 'overlay':
      default:
        return {
          ...baseStyles,
          position: 'absolute' as const,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          opacity: 0.7,
          '&:hover': {
            ...baseStyles['&:hover'],
            opacity: 1,
          },
        };
    }
  };

  const leftPosition = position === 'outside' ? -40 : 8;
  const rightPosition = position === 'outside' ? -40 : 8;

  return (
    <Box data-testid="carousel-navigation">
      <IconButton
        onClick={onPrev}
        disabled={disabled || disablePrev}
        size={size}
        className={className}
        aria-label="Previous slide"
        data-testid="carousel-prev-button"
        sx={{
          ...getArrowStyles(),
          left: leftPosition,
          ...style,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={onNext}
        disabled={disabled || disableNext}
        aria-label="Next slide"
        size={size}
        className={className}
        data-testid="carousel-next-button"
        sx={{
          ...getArrowStyles(),
          right: rightPosition,
          ...style,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export const CarouselThumbnails: React.FC<CarouselThumbnailsProps> = ({
  items,
  activeIndex,
  onSelect,
  size = 'sm',
  className,
  style,
}) => {
  const theme = useTheme();

  const getThumbnailSize = () => {
    switch (size) {
      case 'xs':
        return 40;
      case 'sm':
        return 60;
      case 'md':
        return 80;
      case 'lg':
        return 100;
      case 'xl':
        return 120;
      default:
        return 60;
    }
  };

  return (
    <Box
      className={className}
      data-testid="carousel-thumbnails"
      sx={{
        position: 'absolute',
        bottom: -getThumbnailSize() - 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1,
        p: 1,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        borderRadius: 1,
        ...style,
      }}
    >
      {items.map((item, index) => (
        <Box
          key={item.id}
          onClick={() => onSelect(index)}
          data-testid={`carousel-thumbnail-${index}`}
          data-active={index === activeIndex}
          sx={{
            width: getThumbnailSize(),
            height: getThumbnailSize(),
            border: `2px solid ${
              index === activeIndex ? theme.palette.primary.main : 'transparent'
            }`,
            borderRadius: 1,
            overflow: 'hidden',
            cursor: 'pointer',
            opacity: index === activeIndex ? 1 : 0.6,
            transition: theme.transitions.create(['opacity', 'border-color']),
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          {item.image ? (
            <Box
              component="img"
              src={item.image}
              alt={item.alt || item.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.grey[300],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption">{index + 1}</Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
