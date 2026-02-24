import Paper from '@mui/material/Paper';
import MuiPopover from '@mui/material/Popover';
import { alpha, keyframes } from '@mui/material/styles';
import type { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type { PopoverProps } from './Popover.types';

// Define pulse animation
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

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'glow', 'pulse', 'densityPadding'].includes(prop as string),
})<{
  customVariant?: string;
  glow?: boolean;
  pulse?: boolean;
  densityPadding?: string;
}>(({ theme, customVariant, glow, pulse, densityPadding }) => ({
  padding: densityPadding, // Base: 8px, scales with density
  borderRadius: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',

  // Variant styles
  ...(customVariant === 'default' && {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    boxShadow: theme.shadows[8],
  }),

  ...(customVariant === 'glass' && {
    backgroundColor: alpha(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  }),

  ...(customVariant === 'arrow' && {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    boxShadow: theme.shadows[12],
  }),

  // Glow effect
  ...(glow && !pulse && {
    boxShadow: `0 0 20px 5px ${alpha(theme.palette.primary.main, 0.3)} !important`,
    filter: 'brightness(1.05)',
  }),

  // Pulse animation
  ...(pulse && !glow && {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 'inherit',
      backgroundColor: theme.palette.primary.main,
      opacity: 0.1,
      animation: `${pulseAnimation} 2s infinite`,
      pointerEvents: 'none',
      zIndex: -1,
    },
  }),

  // Both glow and pulse
  ...(glow && pulse && {
    position: 'relative',
    boxShadow: `0 0 20px 5px ${alpha(theme.palette.primary.main, 0.3)} !important`,
    filter: 'brightness(1.05)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 'inherit',
      backgroundColor: theme.palette.primary.main,
      opacity: 0.1,
      animation: `${pulseAnimation} 2s infinite`,
      pointerEvents: 'none',
      zIndex: -1,
    },
  }),
}));

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({
    variant = 'default',
    glow = false,
    pulse = false,
    maxWidth = 400,
    dataTestId,
    children,
    ...props
  }, ref) => {
    const { spacingPx } = useDensitySpacing();

    return (
      <MuiPopover
        ref={ref}
        data-testid={dataTestId || 'popover-content'}
        PaperProps={{
          component: StyledPaper as React.ComponentType<PaperProps>,
          customVariant: variant,
          glow,
          pulse,
          densityPadding: spacingPx(2), // Base: 8px, scales with density
          sx: { maxWidth },
          ...props.PaperProps,
        } as PaperProps & { customVariant?: string; glow?: boolean; pulse?: boolean; densityPadding?: string }}
        {...props}
      >
        {children}
      </MuiPopover>
    );
  }
);

Popover.displayName = 'Popover';