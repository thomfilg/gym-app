import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { alpha, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { forwardRef } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ToggleGroupProps } from './ToggleGroup.types';

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return {
      main: theme.palette.grey[700],
      dark: theme.palette.grey[800],
      light: theme.palette.grey[500],
      contrastText: theme.palette.getContrastText(theme.palette.grey[700]),
    };
  }

  const colorMap = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    danger: theme.palette.error,
  };

  const palette = colorMap[color as keyof typeof colorMap] || theme.palette.primary;

  // Ensure palette has required properties
  return {
    main: palette.main,
    dark: palette.dark || palette.main,
    light: palette.light || palette.main,
    contrastText: palette.contrastText || theme.palette.getContrastText(palette.main),
  };
};

const StyledToggleGroup = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => !['customColor', 'customSize', 'glass'].includes(prop as string),
})<{
  customColor?: string;
  customSize?: string;
  glass?: boolean;
}>(({ theme, glass }) => ({
  backgroundColor: glass ? alpha(theme.palette.background.paper, 0.1) : 'transparent',
  backdropFilter: glass ? 'blur(20px)' : 'none',
  borderRadius: theme.spacing(1),
  padding: glass ? 4 : 0,
  border: glass ? `1px solid ${alpha(theme.palette.divider, 0.2)}` : 'none',

  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: `${theme.shape.borderRadius}px !important`,
  },
}));

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      variant = 'single',
      color = 'primary',
      size = 'md',
      options,
      glass = false,
      gradient = false,
      value,
      onChange,
      dataTestId = 'toggle-group',
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const { spacingPx } = useDensitySpacing();
    const colorPalette = getColorFromTheme(theme, color);

    // Base padding values that scale with density
    const sizeMap = {
      // Base: 4px 8px padding, scales with density
      xs: { padding: `${spacingPx(1)} ${spacingPx(2)}`, fontSize: '0.75rem' },
      // Base: 6px 12px padding, scales with density
      sm: { padding: `${spacingPx(1.5)} ${spacingPx(3)}`, fontSize: '0.875rem' },
      // Base: 8px 16px padding, scales with density
      md: { padding: `${spacingPx(2)} ${spacingPx(4)}`, fontSize: '1rem' },
      // Base: 10px 20px padding, scales with density
      lg: { padding: `${spacingPx(2.5)} ${spacingPx(5)}`, fontSize: '1.125rem' },
      // Base: 12px 24px padding, scales with density
      xl: { padding: `${spacingPx(3)} ${spacingPx(6)}`, fontSize: '1.25rem' },
    };

    return (
      <StyledToggleGroup
        ref={ref}
        customColor={color}
        customSize={size}
        glass={glass}
        value={value}
        onChange={onChange}
        exclusive={variant === 'exclusive' || variant === 'single'}
        data-testid={dataTestId}
        {...props}
      >
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            data-testid={`${dataTestId}-item-${option.value}`}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              ...sizeMap[size as keyof typeof sizeMap],

              '&.Mui-selected': {
                backgroundColor: colorPalette.main,
                color: colorPalette.contrastText,

                ...(gradient && {
                  background: `linear-gradient(135deg, ${colorPalette.main}, ${colorPalette.dark})`,
                }),
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {option.icon}
              {option.label}
            </Box>
          </ToggleButton>
        ))}
      </StyledToggleGroup>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';
