import MuiTooltip from '@mui/material/Tooltip';
import { alpha, keyframes } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { TooltipProps } from './Tooltip.types';

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Font size map for different tooltip sizes
const getSizeFontSize = (size: string): string => {
  const sizeMap = {
    sm: '0.75rem',
    md: '0.875rem',
    lg: '1rem',
  } as const;

  return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
};

const StyledTooltip = styled(MuiTooltip, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customSize', 'glow', 'pulse', 'densityPadding'].includes(prop as string),
})<{
  customVariant?: string;
  customSize?: string;
  glow?: boolean;
  pulse?: boolean;
  densityPadding?: string;
}>(({ theme, customVariant, customSize = 'md', glow, pulse, densityPadding }) => {
  const fontSize = getSizeFontSize(customSize);

  return {
    '& .MuiTooltip-tooltip': {
      borderRadius: theme.spacing(1),
      fontSize,
      padding: densityPadding,
      fontWeight: 500,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',

      // Variant styles
      ...(customVariant === 'default' && {
        backgroundColor: alpha(theme.palette.grey[900], 0.9),
        color: theme.palette.common.white,
      }),

      ...(customVariant === 'dark' && {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
      }),

      ...(customVariant === 'light' && {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        boxShadow: theme.shadows[4],
      }),

      ...(customVariant === 'glass' && {
        backgroundColor: alpha(theme.palette.background.paper, 0.1),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        color: theme.palette.text.primary,
      }),

      // Glow effect
      ...(glow &&
        !pulse && {
        boxShadow: `0 0 15px 3px ${alpha(theme.palette.primary.main, 0.4)} !important`,
        filter: 'brightness(1.05)',
      }),

      // Pulse animation
      ...(pulse &&
        !glow && {
        animation: `${pulseAnimation} 2s infinite`,
      }),

      // Both glow and pulse
      ...(glow &&
        pulse && {
        boxShadow: `0 0 15px 3px ${alpha(theme.palette.primary.main, 0.4)} !important`,
        filter: 'brightness(1.05)',
        animation: `${pulseAnimation} 2s infinite`,
      }),
    },

    '& .MuiTooltip-arrow': {
      color:
        customVariant === 'light'
          ? theme.palette.common.white
          : customVariant === 'glass'
            ? alpha(theme.palette.background.paper, 0.1)
            : customVariant === 'dark'
              ? theme.palette.grey[900]
              : alpha(theme.palette.grey[900], 0.9),
    },
  };
});

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      variant = 'default',
      size = 'md',
      glow = false,
      pulse = false,
      maxWidth = 300,
      dataTestId,
      children,
      ...props
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();

    // Density-aware padding based on size
    // Base padding values (at normal density):
    // sm: 1/2 units (4px/8px), md: 1.5/3 units (6px/12px), lg: 2/4 units (8px/16px)
    const getPaddingForSize = (): string => {
      switch (size) {
        case 'sm':
          return `${spacingPx(1)} ${spacingPx(2)}`;
        case 'lg':
          return `${spacingPx(2)} ${spacingPx(4)}`;
        case 'md':
        default:
          return `${spacingPx(1.5)} ${spacingPx(3)}`;
      }
    };

    const densityPadding = getPaddingForSize();

    const childWithTestId = dataTestId
      ? React.cloneElement(children as React.ReactElement<{ 'data-testid'?: string }>, {
        'data-testid': `${dataTestId}-trigger`,
      })
      : children;

    return (
      <StyledTooltip
        ref={ref}
        customVariant={variant}
        customSize={size}
        glow={glow}
        pulse={pulse}
        densityPadding={densityPadding}
        enterDelay={0}
        leaveDelay={0}
        disableHoverListener={false}
        disableFocusListener={false}
        disableTouchListener={false}
        slotProps={{
          tooltip: {
            sx: { maxWidth },
            role: 'tooltip',
            ...(dataTestId && { 'data-testid': `${dataTestId}-content` }),
          },
        }}
        {...props}
      >
        {childWithTestId}
      </StyledTooltip>
    );
  },
);

Tooltip.displayName = 'Tooltip';
