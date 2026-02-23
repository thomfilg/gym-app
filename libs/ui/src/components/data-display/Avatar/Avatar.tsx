import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Fade from '@mui/material/Fade';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import BrokenImage from '@mui/icons-material/BrokenImage';
import Person from '@mui/icons-material/Person';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { useCallback,useEffect, useState } from 'react';

import type { AvatarProps, AvatarSize, AvatarStatus } from './Avatar.types';

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

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const scaleInAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const getColorFromTheme = (theme: Theme, color: string) => {
  const colorMap: Record<
  string,
  { main: string; contrastText?: string; light?: string; dark?: string }
  > = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    neutral: { main: theme.palette.grey[700], contrastText: '#fff' },
  };

  return colorMap[color] || theme.palette.primary;
};

const getSizeStyles = (size: AvatarSize) => {
  const sizeMap: Record<AvatarSize, { width: number; height: number; fontSize: string }> = {
    xs: { width: 24, height: 24, fontSize: '0.75rem' },
    sm: { width: 32, height: 32, fontSize: '0.875rem' },
    md: { width: 40, height: 40, fontSize: '1rem' },
    lg: { width: 48, height: 48, fontSize: '1.125rem' },
    xl: { width: 64, height: 64, fontSize: '1.5rem' },
    xxl: { width: 80, height: 80, fontSize: '2rem' },
  };

  return sizeMap[size] || sizeMap.md;
};

const getStatusColor = (status: AvatarStatus, theme: Theme) => {
  const statusColorMap: Record<AvatarStatus, string> = {
    online: theme.palette.success.main,
    offline: theme.palette.grey[500],
    away: theme.palette.warning.main,
    busy: theme.palette.error.main,
  };

  return statusColorMap[status] || statusColorMap.offline;
};

const StyledAvatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) =>
    ![
      'customVariant',
      'customSize',
      'customColor',
      'glow',
      'pulse',
      'bordered',
      'isLoading',
      'hasError',
      'interactive',
    ].includes(prop as string),
})<{
  customVariant?: string;
  customSize?: AvatarSize;
  customColor?: string;
  glow?: boolean;
  pulse?: boolean;
  bordered?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  interactive?: boolean;
}>(({
  theme,
  customVariant,
  customSize = 'md',
  customColor = 'primary',
  glow,
  pulse,
  bordered,
  isLoading,
  hasError,
  interactive,
}) => {
  const colorPalette = getColorFromTheme(theme, customColor);
  const sizeStyles = getSizeStyles(customSize);

  return {
    ...sizeStyles,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'visible',
    animation: `${scaleInAnimation} 0.3s ease-out`,
    cursor: interactive ? 'pointer' : 'default',

    // Base background color when no image
    backgroundColor: hasError ? theme.palette.error.main : colorPalette.main,
    color: hasError ? theme.palette.error.contrastText : (colorPalette.contrastText ?? '#fff'),

    // Interactive hover effects
    ...(interactive && {
      '&:hover': {
        transform: 'scale(1.1) translateY(-2px)',
        boxShadow: `0 8px 20px ${alpha(colorPalette.main, 0.3)}`,
        filter: 'brightness(1.1)',
        zIndex: 10,
      },
      '&:active': {
        transform: 'scale(1.05)',
      },
    }),

    // Loading state with shimmer
    ...(isLoading && {
      background: `linear-gradient(
        90deg,
        ${alpha(colorPalette.main, 0.6)},
        ${alpha(colorPalette.main, 0.8)},
        ${alpha(colorPalette.main, 0.6)}
      )`,
      backgroundSize: '200% 100%',
      animation: `${shimmerAnimation} 1.5s ease-in-out infinite`,
    }),

    // Variant styles
    ...(customVariant === 'circle' && {
      borderRadius: '50%',
    }),

    ...(customVariant === 'square' && {
      borderRadius: 0,
    }),

    ...(customVariant === 'rounded' && {
      borderRadius: theme.spacing(1),
    }),

    ...(customVariant === 'status' && {
      borderRadius: '50%',
    }),

    // Border
    ...(bordered && {
      border: `2px solid ${theme.palette.background.paper}`,
      boxShadow: `0 0 0 1px ${alpha(theme.palette.divider, 0.2)}`,
    }),

    // Glow effect
    ...(glow &&
      !pulse && {
      boxShadow: `0 0 20px 5px ${alpha(colorPalette.main, 0.4)} !important`,
      filter: 'brightness(1.05)',
    }),

    // Pulse animation
    ...(pulse &&
      !glow && {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        transform: 'translate(-50%, -50%)',
        backgroundColor: colorPalette.main,
        opacity: 0.3,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),

    // Both glow and pulse
    ...(glow &&
      pulse && {
      position: 'relative',
      boxShadow: `0 0 20px 5px ${alpha(colorPalette.main, 0.4)} !important`,
      filter: 'brightness(1.05)',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        transform: 'translate(-50%, -50%)',
        backgroundColor: colorPalette.main,
        opacity: 0.3,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),

    // Focus state for accessibility
    '&:focus-visible': {
      outline: `3px solid ${alpha(colorPalette.main, 0.5)}`,
      outlineOffset: 2,
    },
  };
});

const AvatarGroupContainer = styled('div')<{ overlap?: number }>(({ theme, overlap = 8 }) => ({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    marginLeft: -overlap,
    transition: 'all 0.3s ease',
    position: 'relative',
    border: `2px solid ${theme.palette.background.paper}`,
    '&:hover': {
      zIndex: 100,
      transform: 'scale(1.1) translateY(-4px)',
    },
    '&:first-of-type': {
      marginLeft: 0,
    },
  },
}));

const LoadingOverlay = styled('div')<{ size: AvatarSize }>(({ theme, size }) => {
  const sizeStyles = getSizeStyles(size);
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: sizeStyles.width,
    height: sizeStyles.height,
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    backdropFilter: 'blur(2px)',
    '& .loading-spinner': {
      width: sizeStyles.width * 0.4,
      height: sizeStyles.height * 0.4,
      border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
      borderTopColor: theme.palette.primary.main,
      borderRadius: '50%',
      animation: `${rotateAnimation} 0.8s linear infinite`,
    },
  };
});

const StatusBadge = styled(Badge, {
  shouldForwardProp: (prop) => !['statusColor', 'avatarSize'].includes(prop as string),
})<{
  statusColor?: string;
  avatarSize?: AvatarSize;
}>(({ theme, statusColor, avatarSize = 'md' }) => {
  const sizeStyles = getSizeStyles(avatarSize);
  const badgeSize = Math.max(8, sizeStyles.width * 0.2);

  return {
    '& .MuiBadge-badge': {
      backgroundColor: statusColor || theme.palette.success.main,
      color: statusColor || theme.palette.success.main,
      width: badgeSize,
      height: badgeSize,
      borderRadius: '50%',
      border: `2px solid ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        content: '""',
      },
    },
  };
});

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      variant = 'circle',
      size = 'md',
      glow = false,
      pulse = false,
      status,
      fallback,
      icon,
      bordered = false,
      color = 'primary',
      src,
      alt,
      children,
      loading = false,
      onError,
      onClick,
      interactive = false,
      showFallbackOnError = true,
      animationDelay = 0,
      className,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(!!src);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const timer = window.setTimeout(() => setMounted(true), animationDelay);
      return () => window.clearTimeout(timer);
    }, [animationDelay]);

    useEffect(() => {
      setImageError(false);
      setImageLoading(!!src);
    }, [src]);

    const handleImageError = useCallback<React.ReactEventHandler>(
      (event) => {
        setImageError(true);
        setImageLoading(false);
        onError?.(event);
      },
      [onError],
    );

    const handleImageLoad = useCallback(() => {
      setImageLoading(false);
    }, []);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (interactive || onClick) {
          onClick?.(event);
        }
      },
      [interactive, onClick],
    );

    // Determine what content to show
    let avatarContent = children || fallback || icon || <Person />;
    let contentType: 'children' | 'fallback' | 'icon' | 'default' = 'default';

    if (children) {
      contentType = 'children';
    } else if (fallback) {
      contentType = 'fallback';
    } else if (icon) {
      contentType = 'icon';
    }

    if (imageError && showFallbackOnError) {
      if (fallback) {
        avatarContent = fallback;
        contentType = 'fallback';
      } else if (icon) {
        avatarContent = icon;
        contentType = 'icon';
      } else {
        avatarContent = <BrokenImage />;
        contentType = 'icon';
      }
    }

    const ariaLabel = props['aria-label'] || alt || 'Avatar';

    const avatarElement = (
      <Fade in={mounted} timeout={300}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <StyledAvatar
            ref={ref}
            className={className}
            customVariant={variant}
            customSize={size}
            customColor={color}
            glow={glow}
            pulse={pulse}
            bordered={bordered}
            isLoading={loading || imageLoading}
            hasError={imageError}
            interactive={interactive || !!onClick}
            src={!imageError ? src : undefined}
            alt={alt}
            onClick={handleClick}
            onError={handleImageError}
            onLoad={handleImageLoad}
            tabIndex={interactive || onClick ? 0 : undefined}
            role={interactive || onClick ? 'button' : undefined}
            aria-label={ariaLabel}
            data-testid={dataTestId}
            {...props}
          >
            {loading || imageLoading ? null : (
              <span data-testid={dataTestId ? `${dataTestId}-${contentType}` : undefined}>
                {avatarContent}
              </span>
            )}
          </StyledAvatar>
          {(loading || imageLoading) && (
            <LoadingOverlay size={size} data-testid={dataTestId ? `${dataTestId}-loading` : undefined}>
              <div className="loading-spinner" data-testid={dataTestId ? `${dataTestId}-loading-spinner` : undefined} />
            </LoadingOverlay>
          )}
        </div>
      </Fade>
    );

    // Wrap with status badge if variant is 'status' and status is provided
    if (variant === 'status' && status) {
      return (
        <StatusBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          statusColor={getStatusColor(status, theme)}
          avatarSize={size}
          data-testid={dataTestId ? `${dataTestId}-badge` : undefined}
        >
          {avatarElement}
        </StatusBadge>
      );
    }

    return avatarElement;
  },
);

Avatar.displayName = 'Avatar';

// Export AvatarGroup for grouped avatars
export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  overlap?: number;
  className?: string;
  dataTestId?: string;
}> = ({ children, max = 4, overlap = 8, className, dataTestId }) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = childrenArray.length - visibleChildren.length;

  return (
    <AvatarGroupContainer overlap={overlap} className={className} data-testid={dataTestId}>
      {visibleChildren}
      {remainingCount > 0 && (
        <Avatar
          size={(visibleChildren[0] as React.ReactElement<AvatarProps>)?.props?.size || 'md'}
          color="neutral"
          fallback={`+${remainingCount}`}
          bordered
          dataTestId={dataTestId ? `${dataTestId}-overflow` : undefined}
        />
      )}
    </AvatarGroupContainer>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
