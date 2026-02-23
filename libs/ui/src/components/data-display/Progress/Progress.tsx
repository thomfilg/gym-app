import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import type { PaletteColor, Theme } from '@mui/material/styles';
import { alpha, keyframes, styled, useTheme } from '@mui/material/styles';
import React from 'react';

import type { ProgressProps, ProgressSize, ProgressVariant } from './Progress.types';

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;

const getColorFromTheme = (theme: Theme, color: string): PaletteColor => {
  const colorMap: Record<string, PaletteColor> = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    danger: theme.palette.error, // Add danger alias
  };

  // Handle special case for neutral (grey) which is a Color, not PaletteColor
  if (color === 'neutral') {
    return {
      light: theme.palette.grey[300],
      main: theme.palette.grey[500],
      dark: theme.palette.grey[700],
      contrastText: theme.palette.getContrastText(theme.palette.grey[500]),
    };
  }

  const selectedColor = colorMap[color];
  // Ensure we always return a valid color object with main and dark properties
  return selectedColor || theme.palette.primary;
};

const getSizeStyles = (size: ProgressSize) => {
  const sizeMap: Record<ProgressSize, { height: number; circularSize: number; fontSize: string }> =
    {
      sm: { height: 4, circularSize: 32, fontSize: '0.75rem' },
      md: { height: 6, circularSize: 40, fontSize: '0.875rem' },
      lg: { height: 8, circularSize: 48, fontSize: '1rem' },
    };

  return sizeMap[size] || sizeMap.md;
};

const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customSize', 'customColor', 'glow', 'pulse'].includes(prop as string),
})<{
  customVariant?: ProgressVariant;
  customSize?: ProgressSize;
  customColor?: string;
  glow?: boolean;
  pulse?: boolean;
}>(({ theme, customVariant, customSize = 'md', customColor = 'primary', glow, pulse }) => {
  const colorPalette = getColorFromTheme(theme, customColor);
  const sizeStyles = getSizeStyles(customSize);

  return {
    height: sizeStyles.height,
    borderRadius: sizeStyles.height / 2,
    backgroundColor: alpha(colorPalette.main, 0.1),

    '& .MuiLinearProgress-bar': {
      borderRadius: 'inherit',
      transition: 'all 0.3s ease',

      ...(customVariant === 'linear' && {
        backgroundColor: colorPalette.main,
      }),

      ...(customVariant === 'gradient' && {
        background: `linear-gradient(90deg, ${colorPalette.main} 0%, ${colorPalette.dark || colorPalette.main} 100%)`,
      }),

      ...(customVariant === 'glass' && {
        backgroundColor: alpha(colorPalette.main, 0.8),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(colorPalette.main, 0.3)}`,
      }),

      // Glow effect
      ...(glow &&
        !pulse && {
        boxShadow: `0 0 10px 2px ${alpha(colorPalette.main, 0.4)}`,
        filter: 'brightness(1.1)',
      }),

      // Pulse animation
      ...(pulse &&
        !glow && {
        animation: `${pulseAnimation} 2s infinite`,
      }),

      // Both glow and pulse
      ...(glow &&
        pulse && {
        boxShadow: `0 0 10px 2px ${alpha(colorPalette.main, 0.4)}`,
        filter: 'brightness(1.1)',
        animation: `${pulseAnimation} 2s infinite`,
      }),
    },
  };
});

const StyledCircularProgress = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['customColor', 'glow', 'pulse'].includes(prop as string),
})<{
  customColor?: string;
  glow?: boolean;
  pulse?: boolean;
}>(({ theme, customColor = 'primary', glow, pulse }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  return {
    color: colorPalette.main,

    // Glow effect
    ...(glow &&
      !pulse && {
      filter: `drop-shadow(0 0 8px ${alpha(colorPalette.main, 0.6)})`,
    }),

    // Pulse animation
    ...(pulse &&
      !glow && {
      animation: `${pulseAnimation} 2s infinite`,
    }),

    // Both glow and pulse
    ...(glow &&
      pulse && {
      filter: `drop-shadow(0 0 8px ${alpha(colorPalette.main, 0.6)})`,
      animation: `${pulseAnimation} 2s infinite`,
    }),
  };
});

const SegmentedProgress: React.FC<{
  value?: number;
  segments: number;
  color: string;
  size: ProgressSize;
  glow: boolean;
  pulse: boolean;
  dataTestId?: string;
}> = ({ value = 0, segments, color, size, glow, pulse, dataTestId }) => {
  const theme = useTheme();
  const colorPalette = getColorFromTheme(theme, color);
  const sizeStyles = getSizeStyles(size);
  const filledSegments = Math.floor((value / 100) * segments);

  return (
    <Box sx={{ display: 'flex', gap: 0.5, width: '100%' }} data-testid={`${dataTestId}-segments-container`}>
      {Array.from({ length: segments }, (_, index) => (
        <Box
          key={index}
          data-testid={`${dataTestId}-segment-${index}`}
          sx={{
            flex: 1,
            height: sizeStyles.height,
            borderRadius: sizeStyles.height / 2,
            backgroundColor:
              index < filledSegments ? colorPalette.main : alpha(colorPalette.main, 0.1),
            transition: 'all 0.3s ease',
            ...(glow &&
              index < filledSegments && {
              boxShadow: `0 0 6px 1px ${alpha(colorPalette.main, 0.4)}`,
            }),
            ...(pulse &&
              index < filledSegments && {
              animation: `${pulseAnimation} 2s infinite`,
            }),
          }}
        />
      ))}
    </Box>
  );
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      variant = 'linear',
      size = 'md',
      color = 'primary',
      glow = false,
      pulse = false,
      showLabel = false,
      label,
      segments = 10,
      thickness = 4,
      circularSize,
      value,
      dataTestId = 'progress',
      ...props
    },
    ref,
  ) => {
    const sizeStyles = getSizeStyles(size);
    const finalCircularSize = circularSize || sizeStyles.circularSize;

    const displayValue = value || 0;
    const displayLabel = label || (showLabel ? `${Math.round(displayValue)}%` : '');

    if (variant === 'circular') {
      return (
        <Box ref={ref} sx={{ position: 'relative', display: 'inline-flex' }} data-testid={dataTestId}>
          <StyledCircularProgress
            variant={value !== undefined ? 'determinate' : 'indeterminate'}
            value={displayValue}
            size={finalCircularSize}
            thickness={thickness}
            customColor={color}
            glow={glow}
            pulse={pulse}
            data-testid={`${dataTestId}-circular`}
            {...props}
          />
          {showLabel && value !== undefined && (
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ fontSize: sizeStyles.fontSize, fontWeight: 600 }}
                data-testid={`${dataTestId}-label`}
              >
                {displayLabel}
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    if (variant === 'segmented') {
      return (
        <Box ref={ref} sx={{ width: '100%' }} data-testid={dataTestId} {...props}>
          <SegmentedProgress
            value={displayValue}
            segments={segments}
            color={color}
            size={size}
            glow={glow}
            pulse={pulse}
            dataTestId={dataTestId}
          />
          {showLabel && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 1,
                fontSize: sizeStyles.fontSize,
                fontWeight: 600,
              }}
              data-testid={`${dataTestId}-label`}
            >
              {displayLabel}
            </Typography>
          )}
        </Box>
      );
    }

    return (
      <Box ref={ref} sx={{ width: '100%' }} data-testid={dataTestId}>
        <StyledLinearProgress
          variant={value !== undefined ? 'determinate' : 'indeterminate'}
          value={displayValue}
          customVariant={variant}
          customSize={size}
          customColor={color}
          glow={glow}
          pulse={pulse}
          data-testid={`${dataTestId}-linear`}
          {...props}
        />
        {showLabel && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 1,
              fontSize: sizeStyles.fontSize,
              fontWeight: 600,
            }}
            data-testid={`${dataTestId}-label`}
          >
            {displayLabel}
          </Typography>
        )}
      </Box>
    );
  },
);

Progress.displayName = 'Progress';
