import MuiTooltip from '@mui/material/Tooltip';
import { alpha, keyframes } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type { InteractiveTooltipProps } from './InteractiveTooltip.types';

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

// Base padding values that scale with density
// sm: 4px 8px, md: 6px 12px, lg: 8px 16px
const getSizeStyles = (size: string, densityMultiplier: number = 1): { fontSize: string; padding: string } => {
  const scalePadding = (vPx: number, hPx: number) =>
    `${Math.round(vPx * densityMultiplier)}px ${Math.round(hPx * densityMultiplier)}px`;

  const sizeMap = {
    sm: { fontSize: '0.75rem', padding: scalePadding(4, 8) }, // Base: 4px 8px, scales with density
    md: { fontSize: '0.875rem', padding: scalePadding(6, 12) }, // Base: 6px 12px, scales with density
    lg: { fontSize: '1rem', padding: scalePadding(8, 16) }, // Base: 8px 16px, scales with density
  } as const;

  return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
};

const StyledTooltip = styled(MuiTooltip, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customSize', 'glow', 'pulse', 'densityMultiplier'].includes(prop as string),
})<{
  customVariant?: string;
  customSize?: string;
  glow?: boolean;
  pulse?: boolean;
  densityMultiplier?: number;
}>(({ theme, customVariant, customSize = 'md', glow, pulse, densityMultiplier = 1 }) => {
  const sizeStyles = getSizeStyles(customSize, densityMultiplier);

  return {
    '& .MuiTooltip-tooltip': {
      borderRadius: theme.spacing(1),
      fontSize: sizeStyles.fontSize,
      padding: sizeStyles.padding,
      fontWeight: 500,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',

      // Variant styles - made more distinct
      ...(customVariant === 'default' && {
        backgroundColor: alpha(theme.palette.grey[900], 0.92),
        color: theme.palette.common.white,
        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}`,
      }),

      ...(customVariant === 'dark' && {
        backgroundColor: '#000000',
        color: theme.palette.common.white,
        boxShadow: `0 6px 16px ${alpha(theme.palette.common.black, 0.5)}`,
        border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
      }),

      ...(customVariant === 'light' && {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey[900],
        border: `1px solid ${alpha(theme.palette.grey[400], 0.4)}`,
        boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.15)}`,
      }),

      ...(customVariant === 'glass' && {
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        color: theme.palette.text.primary,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
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
            ? alpha(theme.palette.background.paper, 0.75)
            : customVariant === 'dark'
              ? '#000000'
              : alpha(theme.palette.grey[900], 0.92),
    },
  };
});

export const InteractiveTooltip = React.forwardRef<HTMLDivElement, InteractiveTooltipProps>(
  (
    {
      variant = 'default',
      size = 'md',
      glow = false,
      pulse = false,
      maxWidth = 300,
      dataTestId,
      hoverContent,
      pinnedContent,
      clickable = true,
      onPin,
      onUnpin,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { multiplier } = useDensitySpacing();
    const [isPinned, setIsPinned] = useState(false);
    const [isControlledOpen, setIsControlledOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tooltipId = useId();

    // Handle outside clicks to unpin
    useEffect(() => {
      if (!isPinned || !clickable) {
        return;
      }

      const handleClickOutside = (event: MouseEvent) => {
        const targetElement = event.target as Element;

        // Check if click was on tooltip or trigger
        const isClickOnTooltip = targetElement.closest('[role="tooltip"]');
        const isClickOnTrigger = wrapperRef.current?.contains(targetElement);

        if (isClickOnTooltip || isClickOnTrigger) {
          return;
        }

        // Click was outside - unpin
        setIsPinned(false);
        setIsControlledOpen(false);
        onUnpin?.();
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isPinned, clickable, onUnpin]);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (!clickable) return;

        e.preventDefault();
        e.stopPropagation();

        setIsPinned((current) => {
          const newPinned = !current;
          setIsControlledOpen(newPinned);

          if (newPinned) {
            onPin?.();
          } else {
            onUnpin?.();
          }

          return newPinned;
        });
      },
      [clickable, onPin, onUnpin],
    );

    // Determine which content to show
    const tooltipContent = isPinned ? pinnedContent : hoverContent;

    // Child with click handler and ref
    const childElement = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
      'data-testid'?: string;
    }>;

    const childWithProps = React.cloneElement(childElement, {
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        // Call original onClick if it exists
        childElement.props.onClick?.(e);
      },
      'data-testid': dataTestId ? `${dataTestId}-trigger` : undefined,
    });

    return (
      <div ref={wrapperRef} className={className}>
        <StyledTooltip
          ref={ref}
          customVariant={variant}
          customSize={size}
          glow={glow}
          pulse={pulse}
          densityMultiplier={multiplier}
          title={tooltipContent}
          open={isPinned ? isControlledOpen : undefined}
          enterDelay={isPinned ? 0 : 100}
          leaveDelay={0}
          disableHoverListener={isPinned}
          disableFocusListener={isPinned}
          disableTouchListener={isPinned}
          slotProps={{
            tooltip: {
              sx: { maxWidth },
              role: 'tooltip',
              ...(dataTestId && { 'data-testid': `${dataTestId}-content` }),
            },
          }}
          {...props}
        >
          {childWithProps}
        </StyledTooltip>
      </div>
    );
  },
);

InteractiveTooltip.displayName = 'InteractiveTooltip';
