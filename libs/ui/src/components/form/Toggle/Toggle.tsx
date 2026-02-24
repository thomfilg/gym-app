import ToggleButton from '@mui/material/ToggleButton';
import { alpha, keyframes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { forwardRef } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ToggleProps } from './Toggle.types';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px currentColor; }
  50% { box-shadow: 0 0 15px currentColor, 0 0 25px currentColor; }
  100% { box-shadow: 0 0 5px currentColor; }
`;

// Ripple animation - reserved for future use
// const rippleAnimation = keyframes`
//   0% {
//     transform: scale(0);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(4);
//     opacity: 0;
//   }
// `;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`;

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return {
      main: theme.palette.grey?.[700] || '#616161',
      dark: theme.palette.grey?.[800] || '#424242',
      light: theme.palette.grey?.[500] || '#9e9e9e',
      contrastText: '#fff',
    };
  }

  const colorMap: Record<string, typeof theme.palette.primary> = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    danger: theme.palette.error,
  };

  const palette = colorMap[color] || theme.palette.primary;

  // Ensure palette has required properties
  return {
    main: palette?.main || theme.palette.primary.main,
    dark: palette?.dark || palette?.main || theme.palette.primary.dark,
    light: palette?.light || palette?.main || theme.palette.primary.light,
    contrastText: palette?.contrastText || '#fff',
  };
};

const StyledToggle = styled(ToggleButton, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customColor', 'customSize', 'glow', 'glass', 'gradient'].includes(
      prop as string,
    ),
})<{
  customVariant?: string;
  customColor?: string;
  customSize?: string;
  glow?: boolean;
  glass?: boolean;
  gradient?: boolean;
}>(({
  theme,
  customVariant,
  customColor = 'primary',
  customSize = 'md',
  glow,
  glass,
  gradient,
}) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const sizeMap = {
    xs: { padding: '4px 8px', fontSize: '0.75rem' },
    sm: { padding: '6px 12px', fontSize: '0.875rem' },
    md: { padding: '8px 16px', fontSize: '1rem' },
    lg: { padding: '10px 20px', fontSize: '1.125rem' },
    xl: { padding: '12px 24px', fontSize: '1.25rem' },
  };

  const baseStyles = {
    textTransform: 'none' as const,
    fontWeight: 500,
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `2px solid ${alpha(theme.palette.divider, 0.3)}`,
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    position: 'relative' as const,
    overflow: 'hidden' as const,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 0,
      height: 0,
      borderRadius: '50%',
      backgroundColor: alpha(colorPalette.main, 0.2),
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.4s, height 0.4s',
    },

    '&:hover': {
      backgroundColor: alpha(colorPalette.main, 0.08),
      borderColor: colorPalette.main,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 8px ${alpha(colorPalette.main, 0.15)}`,
      animation: `${floatAnimation} 2s ease-in-out infinite`,

      '&::before': {
        width: '100%',
        height: '100%',
      },
    },

    '&:active': {
      transform: 'scale(0.98)',
    },

    '&.Mui-selected': {
      backgroundColor: colorPalette.main,
      color: colorPalette.contrastText || '#fff',
      borderColor: colorPalette.main,
      boxShadow: `0 2px 8px ${alpha(colorPalette.main, 0.3)}`,

      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, transparent, ${alpha('#fff', 0.1)})`,
        pointerEvents: 'none',
      },

      '&:hover': {
        backgroundColor: colorPalette.dark,
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: `0 6px 20px ${alpha(colorPalette.main, 0.4)}`,
      },
    },

    ...sizeMap[customSize as keyof typeof sizeMap],
  };

  const variantStyles = {
    ...(customVariant === 'outline' && {
      backgroundColor: 'transparent',
      border: `2px solid ${colorPalette.main}`,
      color: colorPalette.main,

      '&.Mui-selected': {
        backgroundColor: colorPalette.main,
        color: colorPalette.contrastText || '#fff',
      },
    }),

    ...(customVariant === 'soft' && {
      backgroundColor: alpha(colorPalette.main, 0.1),
      border: 'none',
      color: colorPalette.main,

      '&.Mui-selected': {
        backgroundColor: alpha(colorPalette.main, 0.2),
        color: colorPalette.main,
      },
    }),
  };

  const effectStyles = {
    ...(glass && {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    }),

    ...(gradient && {
      '&.Mui-selected': {
        background: `linear-gradient(135deg, ${colorPalette.light}, ${colorPalette.main}, ${colorPalette.dark})`,
        backgroundSize: '200% 200%',
        animation: `${floatAnimation} 3s ease-in-out infinite`,
        border: 'none',

        '&:hover': {
          backgroundPosition: '100% 100%',
        },
      },
    }),

    ...(glow && {
      '&.Mui-selected': {
        animation: `${glowAnimation} 2s ease-in-out infinite`,
        boxShadow: `0 0 15px ${alpha(colorPalette.main, 0.6)}`,
      },
    }),
  };

  return {
    ...baseStyles,
    ...variantStyles,
    ...effectStyles,
  };
});

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingToggle = {
  xs: { py: 1, px: 2 },      // 4px 8px at normal density
  sm: { py: 1.5, px: 3 },    // 6px 12px at normal density
  md: { py: 2, px: 4 },      // 8px 16px at normal density
  lg: { py: 2.5, px: 5 },    // 10px 20px at normal density
  xl: { py: 3, px: 6 },      // 12px 24px at normal density
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      variant = 'default',
      color = 'primary',
      size = 'md',
      icon,
      glow = false,
      glass = false,
      gradient = false,
      dataTestId,
      children,
      ...props
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();

    // Calculate density-aware padding
    const sizeConfig = basePaddingToggle[size];
    const togglePadding = `${spacingPx(sizeConfig.py)} ${spacingPx(sizeConfig.px)}`;

    const testIds = {
      container: dataTestId,
      icon: dataTestId ? `${dataTestId}-icon` : undefined,
    };

    return (
      <StyledToggle
        ref={ref}
        customVariant={variant}
        customColor={color}
        customSize={size}
        glow={glow}
        glass={glass}
        gradient={gradient}
        data-testid={testIds.container}
        sx={{ padding: togglePadding }}
        {...props}
      >
        {icon && (
          <span
            style={{ marginRight: children ? '8px' : '0' }}
            data-testid={testIds.icon}
          >
            {icon}
          </span>
        )}
        {children}
      </StyledToggle>
    );
  },
);

Toggle.displayName = 'Toggle';
