import Box from '@mui/material/Box';
import MuiSkeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

import type { SkeletonProps } from './Skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = React.memo(
  ({
    variant = 'text',
    animation = 'pulse',
    width,
    height,
    count = 1,
    spacing = 1,
    borderRadius,
    className,
    intensity = 'medium',
    glassmorphism = false,
    shimmer = false,
    'data-testid': dataTestId,
    style,
    ...props
  }) => {
    const theme = useTheme();

    const getSkeletonVariant = () => {
      switch (variant) {
        case 'circular':
          return 'circular';
        case 'rectangular':
          return 'rectangular';
        case 'wave':
          return 'rectangular';
        default:
          return 'text';
      }
    };

    const getSkeletonAnimation = () => {
      if (variant === 'wave') return 'wave';
      if (animation === false) return false;
      return animation;
    };

    const getDefaultDimensions = () => {
      switch (variant) {
        case 'circular':
          return { width: 40, height: 40 };
        case 'rectangular':
        case 'wave':
          return { width: '100%', height: 40 };
        default:
          return { width: '100%', height: undefined };
      }
    };

    const getIntensityOpacity = () => {
      switch (intensity) {
        case 'low':
          return 0.11;
        case 'medium':
          return 0.13;
        case 'high':
          return 0.15;
        default:
          return 0.13;
      }
    };

    const getGlassmorphismStyles = () => {
      if (!glassmorphism) return {};

      return {
        background: `linear-gradient(135deg, 
        ${alpha(theme.palette.background.paper, 0.8)} 0%, 
        ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
      };
    };

    const getShimmerStyles = () => {
      if (!shimmer) return {};

      return {
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `linear-gradient(
          90deg,
          transparent,
          ${alpha(theme.palette.common.white, 0.3)},
          transparent
        )`,
          transform: 'translateX(-100%)',
          animation: 'shimmer 2s infinite',
        },
        '@keyframes shimmer': {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      };
    };

    const defaults = getDefaultDimensions();
    const finalWidth = width ?? defaults.width;
    const finalHeight = height ?? defaults.height;

    // Handle edge case: count of 0 should render nothing
    if (count === 0) {
      return null;
    }

    const skeletonStyles = {
      borderRadius,
      backgroundColor: alpha(
        theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
        getIntensityOpacity(),
      ),
      ...(shimmer && {
        position: 'relative' as const,
        overflow: 'hidden' as const,
      }),
      ...getGlassmorphismStyles(),
      ...getShimmerStyles(),
      ...style,
    };

    const singleSkeleton = (
      <MuiSkeleton
        variant={getSkeletonVariant()}
        animation={getSkeletonAnimation()}
        width={finalWidth}
        height={finalHeight}
        sx={skeletonStyles}
        className={className}
        data-testid={dataTestId}
        aria-hidden="true"
        {...props}
      />
    );

    if (count === 1) {
      return singleSkeleton;
    }

    return (
      <Stack spacing={spacing}>
        {Array.from({ length: count }).map((_, index) => (
          <Box key={`skeleton-${index}`}>
            {React.cloneElement(singleSkeleton, {
              'data-testid': dataTestId ? `${dataTestId}-${index}` : undefined,
            })}
          </Box>
        ))}
      </Stack>
    );
  },
);

Skeleton.displayName = 'Skeleton';
