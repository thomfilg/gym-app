import MuiBadge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import { alpha, keyframes } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { useEffect,useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type { BadgeProps, BadgeSize, BadgeVariant } from './Badge.types';
export type { BadgeProps } from './Badge.types';

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Define bounce animation
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-8px) scale(1.05);
  }
  60% {
    transform: translateY(-4px) scale(1.02);
  }
`;

// Define shimmer animation
const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Define fade in animation with scale
const fadeInScaleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Define glow pulse animation
const glowPulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px 2px rgba(var(--glow-color), 0.4);
  }
  50% {
    box-shadow: 0 0 20px 4px rgba(var(--glow-color), 0.8);
  }
  100% {
    box-shadow: 0 0 5px 2px rgba(var(--glow-color), 0.4);
  }
`;

const getColorFromTheme = (theme: Theme, color: string) => {
  const colorMap: Record<string, ReturnType<typeof theme.palette.augmentColor>> = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    info: theme.palette.info,
    neutral: {
      main: theme.palette.grey[600],
      light: theme.palette.grey[400],
      dark: theme.palette.grey[800],
      contrastText: theme.palette.getContrastText(theme.palette.grey[600]),
    },
  };

  return colorMap[color] || theme.palette.primary;
};

// Base padding values that scale with density
// xs: Base 3px, sm: Base 4px, md: Base 6px, lg: Base 8px
const getSizeStyles = (size: BadgeSize, densityMultiplier: number = 1) => {
  const scalePadding = (basePx: number) => Math.round(basePx * densityMultiplier);

  const sizeMap: Record<
  BadgeSize,
  {
    minWidth: number;
    height: number;
    fontSize: string;
    padding: string;
    dotSize: number;
    iconSize: string;
  }
  > = {
    xs: {
      minWidth: 14,
      height: 14,
      fontSize: '0.5rem',
      padding: `0 ${scalePadding(3)}px`, // Base: 3px, scales with density
      dotSize: 6,
      iconSize: '0.625rem',
    },
    sm: {
      minWidth: 16,
      height: 16,
      fontSize: '0.625rem',
      padding: `0 ${scalePadding(4)}px`, // Base: 4px, scales with density
      dotSize: 8,
      iconSize: '0.75rem',
    },
    md: {
      minWidth: 20,
      height: 20,
      fontSize: '0.75rem',
      padding: `0 ${scalePadding(6)}px`, // Base: 6px, scales with density
      dotSize: 10,
      iconSize: '0.875rem',
    },
    lg: {
      minWidth: 24,
      height: 24,
      fontSize: '0.875rem',
      padding: `0 ${scalePadding(8)}px`, // Base: 8px, scales with density
      dotSize: 12,
      iconSize: '1rem',
    },
  };

  return sizeMap[size] || sizeMap.md;
};

const getAnchorOrigin = (position: string) => {
  const positionMap: Record<string, { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }> =
    {
      'top-right': { vertical: 'top', horizontal: 'right' },
      'top-left': { vertical: 'top', horizontal: 'left' },
      'bottom-right': { vertical: 'bottom', horizontal: 'right' },
      'bottom-left': { vertical: 'bottom', horizontal: 'left' },
    };

  return positionMap[position] || positionMap['top-right'];
};

const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) =>
    ![
      'customVariant',
      'customSize',
      'customColor',
      'glow',
      'pulse',
      'animate',
      'shimmer',
      'bounce',
      'hasIcon',
      'densityMultiplier',
    ].includes(prop as string),
})<{
  customVariant?: BadgeVariant;
  customSize?: BadgeSize;
  customColor?: string;
  glow?: boolean;
  pulse?: boolean;
  animate?: boolean;
  shimmer?: boolean;
  bounce?: boolean;
  hasIcon?: boolean;
  densityMultiplier?: number;
}>(({
  theme,
  customVariant,
  customSize = 'md',
  customColor = 'primary',
  glow,
  pulse,
  animate,
  shimmer,
  bounce,
  hasIcon,
  densityMultiplier = 1,
}) => {
  const colorPalette = getColorFromTheme(theme, customColor);
  const sizeStyles = getSizeStyles(customSize, densityMultiplier);

  // Extract RGB values for CSS variable
  const getRgbValues = (color: string) => {
    // Simple hex to RGB conversion
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    // For rgb/rgba colors, extract values
    const match = color.match(/\d+/g);
    if (match) {
      return `${match[0]}, ${match[1]}, ${match[2]}`;
    }
    return '255, 255, 255';
  };

  return {
    '--glow-color': getRgbValues(colorPalette.main),
    '& .MuiBadge-badge': {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: 600,
      border: `2px solid ${theme.palette.background.paper}`,
      letterSpacing: '0.025em',
      textTransform:
        customVariant === 'gradient' || customVariant === 'glass' ? 'uppercase' : 'none',
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden',

      // Base styles based on variant
      ...(customVariant === 'default' && {
        backgroundColor: colorPalette.main,
        color:
          colorPalette.contrastText || theme.palette.getContrastText?.(colorPalette.main) || '#fff',
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
      }),

      ...(customVariant === 'dot' && {
        backgroundColor: colorPalette.main,
        width: sizeStyles.dotSize,
        height: sizeStyles.dotSize,
        minWidth: sizeStyles.dotSize,
        borderRadius: '50%',
        padding: 0,
      }),

      ...(customVariant === 'count' && {
        backgroundColor: colorPalette.main,
        color:
          colorPalette.contrastText || theme.palette.getContrastText?.(colorPalette.main) || '#fff',
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: '50%',
      }),

      ...(customVariant === 'gradient' && {
        background: `linear-gradient(135deg, ${colorPalette.main} 0%, ${colorPalette.dark || colorPalette.main} 100%)`,
        color: '#fff',
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
      }),

      ...(customVariant === 'glass' && {
        backgroundColor: alpha(colorPalette.main, 0.1),
        backdropFilter: 'blur(10px) saturate(200%)',
        WebkitBackdropFilter: 'blur(10px) saturate(200%)',
        border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
        color: colorPalette.main,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
        boxShadow: `inset 0 1px 1px ${alpha(theme.palette.common.white, 0.1)}`,
      }),

      // Outline variant
      ...(customVariant === 'outline' && {
        backgroundColor: 'transparent',
        border: `2px solid ${colorPalette.main}`,
        color: colorPalette.main,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
      }),

      // Secondary variant
      ...(customVariant === 'secondary' && {
        backgroundColor: alpha(colorPalette.main, 0.15),
        color: colorPalette.main,
        border: `1px solid ${alpha(colorPalette.main, 0.3)}`,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
      }),

      // Destructive variant
      ...(customVariant === 'destructive' && {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
        fontWeight: 700,
      }),

      // Success variant
      ...(customVariant === 'success' && {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
      }),

      // Warning variant
      ...(customVariant === 'warning' && {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.height / 2,
      }),

      // Adjust padding when icon is present
      ...(hasIcon && {
        paddingLeft: sizeStyles.padding.split(' ')[1],
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
      }),

      // Animation on mount
      ...(animate &&
        !bounce && {
        animation: `${fadeInScaleAnimation} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      }),

      // Bounce animation
      ...(bounce && {
        animation: `${bounceAnimation} 1s ease-in-out`,
      }),

      // Shimmer effect
      ...(shimmer && {
        background:
          customVariant === 'gradient'
            ? `linear-gradient(135deg, ${colorPalette.main} 0%, ${colorPalette.dark || colorPalette.main} 100%)`
            : colorPalette.main,
        backgroundSize: shimmer ? '1000px 100%' : 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(
            90deg,
            transparent,
            ${alpha(theme.palette.common.white, 0.4)},
            transparent
          )`,
          animation: `${shimmerAnimation} 3s infinite`,
        },
      }),

      // Glow effect
      ...(glow &&
        !pulse && {
        boxShadow: `0 0 15px 3px ${alpha(colorPalette.main, 0.5)}`,
        filter: 'brightness(1.1)',
        '&:hover': {
          boxShadow: `0 0 20px 4px ${alpha(colorPalette.main, 0.6)}`,
        },
      }),

      // Pulse animation
      ...(pulse &&
        !glow && {
        animation: `${pulseAnimation} 2s ease-in-out infinite`,
      }),

      // Both glow and pulse
      ...(glow &&
        pulse && {
        animation: `${glowPulseAnimation} 2s ease-in-out infinite, ${pulseAnimation} 2s ease-in-out infinite`,
        filter: 'brightness(1.1)',
      }),

      // Hover effects
      '&:not(.MuiBadge-dot):hover': {
        transform: 'scale(1.1)',
        zIndex: 1,
      },
    },
  };
});

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      color = 'primary',
      glow = false,
      pulse = false,
      animate = true,
      shimmer = false,
      bounce = false,
      max = 99,
      showZero = false,
      content,
      position = 'top-right',
      badgeContent,
      children,
      invisible,
      closable = false,
      onClose,
      icon,
      'aria-label': ariaLabel,
      'aria-live': ariaLive = 'polite',
      'aria-atomic': ariaAtomic = true,
      'data-testid': dataTestId,
      className,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const { multiplier } = useDensitySpacing();

    useEffect(() => {
      if (animate || bounce) {
        setIsAnimating(true);
        const timer = window.setTimeout(() => setIsAnimating(false), 1000);
        return () => window.clearTimeout(timer);
      }
    }, [animate, bounce]);

    // Determine the badge content
    const getBadgeContent = () => {
      if (content !== undefined) return content;
      if (badgeContent !== undefined) return badgeContent;
      return null;
    };

    // For count variant, format numbers
    const formatCount = (count: React.ReactNode): React.ReactNode => {
      if (typeof count === 'number') {
        if (count === 0 && !showZero) return null;
        if (count > max) return `${max}+`;
        return count;
      }
      return count;
    };

    // Handle close action
    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsVisible(false);
      window.setTimeout(() => {
        onClose?.();
      }, 300);
    };

    // Prepare badge content with icon and close button
    const prepareBadgeContent = () => {
      const baseContent = variant === 'count' ? formatCount(getBadgeContent()) : getBadgeContent();

      if (variant === 'dot') return '';

      const contentElements: React.ReactNode[] = [];

      // Add icon if provided
      if (icon) {
        const sizeStyles = getSizeStyles(size);
        contentElements.push(
          <span
            key="icon"
            data-testid={dataTestId ? `${dataTestId}-icon` : 'badge-icon'}
            style={{ fontSize: sizeStyles.iconSize, display: 'inline-flex', alignItems: 'center' }}
          >
            {icon}
          </span>,
        );
      }

      // Add main content
      if (baseContent !== null && baseContent !== undefined) {
        contentElements.push(
          <span key="content" data-testid={dataTestId ? `${dataTestId}-content` : 'badge-content'}>
            {baseContent}
          </span>,
        );
      }

      // Add close button if closable
      if (closable && !variant.includes('dot')) {
        const closeIconSize =
          size === 'xs'
            ? '0.5rem'
            : size === 'sm'
              ? '0.625rem'
              : size === 'md'
                ? '0.75rem'
                : '0.875rem';
        contentElements.push(
          <IconButton
            key="close"
            size="small"
            onClick={handleClose}
            data-testid={dataTestId ? `${dataTestId}-close` : 'badge-close'}
            sx={{
              p: 0,
              ml: 0.5,
              color: 'inherit',
              '& svg': { fontSize: closeIconSize },
              '&:hover': { opacity: 0.8 },
            }}
          >
            <CloseIcon />
          </IconButton>,
        );
      }

      return contentElements.length > 0 ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          {contentElements}
        </span>
      ) : null;
    };

    const finalBadgeContent = prepareBadgeContent();
    const anchorOrigin = getAnchorOrigin(position);

    // Determine if badge should be invisible
    const shouldBeInvisible =
      invisible || (variant === 'count' && finalBadgeContent === null && !showZero) || !isVisible;

    // Build accessibility props
    const accessibilityProps: Record<string, string | boolean | undefined> = {
      'aria-label': ariaLabel,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
    };

    // Remove undefined values
    Object.keys(accessibilityProps).forEach((key) => {
      if (accessibilityProps[key] === undefined) {
        delete accessibilityProps[key];
      }
    });

    return (
      <Zoom in={isVisible} timeout={300}>
        <StyledBadge
          ref={ref}
          className={className}
          customVariant={variant}
          customSize={size}
          customColor={color}
          glow={glow}
          pulse={pulse}
          animate={animate}
          shimmer={shimmer}
          bounce={bounce && isAnimating}
          hasIcon={!!icon}
          densityMultiplier={multiplier}
          badgeContent={finalBadgeContent}
          variant={variant === 'dot' ? 'dot' : 'standard'}
          anchorOrigin={anchorOrigin}
          invisible={shouldBeInvisible}
          data-testid={dataTestId || 'badge'}
          slotProps={{
            badge: {
              ...accessibilityProps,
              // @ts-expect-error - MUI Badge slotProps doesn't include data-testid in types, but it works at runtime
              'data-testid': dataTestId ? `${dataTestId}-content-wrapper` : 'badge-content-wrapper',
            },
          }}
          {...props}
        >
          {children}
        </StyledBadge>
      </Zoom>
    );
  },
);

Badge.displayName = 'Badge';
