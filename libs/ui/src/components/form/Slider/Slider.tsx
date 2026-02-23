import Box from '@mui/material/Box';
import MuiSlider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { alpha, keyframes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { forwardRef } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { SliderProps } from './Slider.types';

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    box-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
  }
  100% {
    box-shadow: 0 0 5px currentColor;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const gradientShiftAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return {
      main: theme.palette.grey[700],
      dark: theme.palette.grey[800],
      light: theme.palette.grey[500],
      contrastText: '#fff',
    };
  }

  const colorMap = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    danger: theme.palette.error,
  } as const;

  const palette = colorMap[color as keyof typeof colorMap] || theme.palette.primary;

  // Ensure palette has required properties
  return {
    main: palette.main,
    dark: palette.dark || palette.main,
    light: palette.light || palette.main,
    contrastText: palette.contrastText || '#fff',
  };
};

const StyledSlider = styled(MuiSlider, {
  shouldForwardProp: (prop) =>
    !['customColor', 'customSize', 'glow', 'glass', 'gradient', 'customVariant'].includes(
      prop as string,
    ),
})<{
  customColor?: string;
  customSize?: string;
  glow?: boolean;
  glass?: boolean;
  gradient?: boolean;
  customVariant?: string;
}>(({
  theme,
  customColor = 'primary',
  customSize = 'md',
  glow,
  glass,
  gradient,
  customVariant,
}) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const sizeMap = {
    xs: { height: 4, thumbSize: 16, markHeight: 8 },
    sm: { height: 6, thumbSize: 18, markHeight: 10 },
    md: { height: 8, thumbSize: 20, markHeight: 12 },
    lg: { height: 10, thumbSize: 24, markHeight: 14 },
    xl: { height: 12, thumbSize: 28, markHeight: 16 },
  };

  const currentSize = sizeMap[customSize as keyof typeof sizeMap];

  return {
    color: colorPalette.main,
    height: currentSize.height,
    '& .MuiSlider-track': {
      border: 'none',
      height: currentSize.height,
      borderRadius: currentSize.height / 2,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      ...(gradient && {
        background:
          customVariant === 'gradient'
            ? `linear-gradient(90deg, 
              ${colorPalette.light} 0%, 
              ${colorPalette.main} 50%, 
              ${colorPalette.dark} 100%)`
            : `linear-gradient(90deg, ${colorPalette.light}, ${colorPalette.main})`,
        backgroundSize: '200% 100%',
        animation:
          customVariant === 'gradient' ? `${gradientShiftAnimation} 3s ease infinite` : 'none',
      }),
      ...(glow && {
        animation: `${glowAnimation} 2s ease-in-out infinite`,
        boxShadow: `0 0 10px ${alpha(colorPalette.main, 0.6)}, inset 0 0 10px ${alpha(colorPalette.main, 0.2)}`,
      }),
      ...(glass && {
        backgroundColor: alpha(colorPalette.main, 0.8),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(colorPalette.light || colorPalette.main, 0.3)}`,
      }),
      '&::after': gradient
        ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.2)}, transparent)`,
          animation: `${gradientShiftAnimation} 2s linear infinite`,
        }
        : {},
    },
    '& .MuiSlider-rail': {
      color: alpha(theme.palette.action.disabled, 0.3),
      opacity: 1,
      height: currentSize.height,
      borderRadius: currentSize.height / 2,
      transition: 'all 0.3s ease',
      ...(glass && {
        backgroundColor: alpha(theme.palette.background.paper, 0.1),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      }),
      ...(customVariant === 'gradient' && {
        background: `linear-gradient(90deg, 
          ${alpha(theme.palette.action.disabled, 0.2)}, 
          ${alpha(theme.palette.action.disabled, 0.3)}, 
          ${alpha(theme.palette.action.disabled, 0.2)})`,
      }),
    },
    '& .MuiSlider-thumb': {
      height: currentSize.thumbSize,
      width: currentSize.thumbSize,
      backgroundColor: gradient ? colorPalette.main : '#fff',
      border: `2px solid ${colorPalette.main}`,
      boxShadow: `${theme.shadows[2]}, 0 0 0 0 ${alpha(colorPalette.main, 0.2)}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: colorPalette.main,
        opacity: 0,
      },
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: `${theme.shadows[4]}, 0 0 0 8px ${alpha(colorPalette.main, 0.15)}`,
        transform: 'scale(1.15)',
        ...(glow && {
          boxShadow: `${theme.shadows[4]}, 0 0 20px ${alpha(colorPalette.main, 0.6)}, 0 0 0 8px ${alpha(colorPalette.main, 0.15)}`,
        }),
        '&::before': {
          animation: `${pulseAnimation} 0.6s ease-out`,
        },
      },
      '&:active': {
        transform: 'scale(1.05)',
      },
      ...(glass && {
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(10px)',
        border: `2px solid ${alpha(colorPalette.main, 0.8)}`,
      }),
      ...(gradient && {
        background: `linear-gradient(135deg, ${colorPalette.light}, ${colorPalette.main})`,
        border: 'none',
        color: '#fff',
      }),
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: customSize === 'xs' ? 10 : customSize === 'sm' ? 11 : 12,
      padding: 0,
      width: customSize === 'xs' ? 28 : customSize === 'sm' ? 30 : 32,
      height: customSize === 'xs' ? 28 : customSize === 'sm' ? 30 : 32,
      borderRadius: gradient ? '8px' : '50% 50% 50% 0',
      backgroundColor: gradient
        ? 'transparent'
        : glass
          ? alpha(colorPalette.main, 0.9)
          : colorPalette.main,
      background: gradient
        ? `linear-gradient(135deg, ${colorPalette.light}, ${colorPalette.main})`
        : 'unset',
      backdropFilter: glass ? 'blur(10px)' : 'none',
      transformOrigin: 'bottom left',
      transform: gradient
        ? 'translate(50%, -150%) scale(0)'
        : 'translate(50%, -100%) rotate(-45deg) scale(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: `${theme.shadows[2]}, 0 0 10px ${alpha(colorPalette.main, 0.2)}`,
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: gradient
          ? 'translate(50%, -150%) scale(1)'
          : 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: gradient ? 'none' : 'rotate(45deg)',
        fontWeight: 600,
      },
    },
    '& .MuiSlider-mark': {
      backgroundColor: alpha(theme.palette.action.disabled, 0.5),
      height: currentSize.markHeight,
      width: customVariant === 'marks' ? 3 : 2,
      marginTop: -(currentSize.markHeight - currentSize.height) / 2,
      borderRadius: 1,
      transition: 'all 0.3s ease',
      '&.MuiSlider-markActive': {
        backgroundColor: gradient ? colorPalette.light : colorPalette.main,
        width: customVariant === 'marks' ? 4 : 2,
        height: currentSize.markHeight + 2,
        marginTop: -(currentSize.markHeight + 2 - currentSize.height) / 2,
        ...(glow && {
          boxShadow: `0 0 8px ${alpha(colorPalette.main, 0.5)}`,
        }),
      },
    },
    '& .MuiSlider-markLabel': {
      fontSize: customSize === 'xs' ? '0.65rem' : customSize === 'sm' ? '0.7rem' : '0.75rem',
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(1.5),
      fontWeight: 500,
      transition: 'all 0.3s ease',
      '&.MuiSlider-markLabelActive': {
        color: colorPalette.main,
        fontWeight: 600,
        transform: 'scale(1.05)',
      },
    },
  };
});

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      variant = 'default',
      color = 'primary',
      size = 'md',
      label,
      showValue = false,
      glow = false,
      glass = false,
      gradient = false,
      showMarks = false,
      customMarks,
      unit = '',
      formatValue,
      value,
      onChange,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const { spacing, spacingPx } = useDensitySpacing();
    const displayValue = Array.isArray(value)
      ? `${formatValue ? formatValue(value[0] ?? 0) : (value[0] ?? 0)}${unit} - ${formatValue ? formatValue(value[1] ?? 0) : (value[1] ?? 0)}${unit}`
      : `${formatValue ? formatValue((value as number) ?? 0) : (value ?? 0)}${unit}`;

    const marks =
      variant === 'marks' || showMarks
        ? customMarks || (variant === 'marks' ? true : undefined)
        : undefined;

    return (
      <Box sx={{ width: '100%' }} data-testid={dataTestId}>
        {(label || showValue) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // Base: 8px margin-bottom, scales with density
              mb: spacing(2),
            }}
          >
            {label && (
              <Typography
                variant="body2"
                fontWeight={500}
                color="text.primary"
                data-testid={dataTestId ? `${dataTestId}-label` : undefined}
              >
                {label}
              </Typography>
            )}
            {showValue && (
              <Typography
                variant="body2"
                color="text.secondary"
                data-testid={dataTestId ? `${dataTestId}-value-label` : undefined}
              >
                {displayValue}
              </Typography>
            )}
          </Box>
        )}

        {/* Base: 4px horizontal padding, scales with density */}
        <Box sx={{ px: spacingPx(1) }}>
          <StyledSlider
            ref={ref}
            customColor={color}
            customSize={size}
            glow={glow}
            glass={glass}
            gradient={gradient}
            customVariant={variant}
            value={value}
            onChange={onChange}
            marks={marks}
            valueLabelDisplay={showValue ? 'auto' : 'off'}
            data-testid={dataTestId ? `${dataTestId}-slider` : undefined}
            slotProps={{
              track: {
                'data-testid': dataTestId ? `${dataTestId}-track` : undefined,
              } as React.HTMLAttributes<HTMLSpanElement>,
              thumb: {
                'data-testid': dataTestId ? `${dataTestId}-thumb` : undefined,
              } as React.HTMLAttributes<HTMLSpanElement>,
            }}
            {...props}
          />
        </Box>
      </Box>
    );
  },
);

Slider.displayName = 'Slider';
