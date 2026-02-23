import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import type { SeparatorProps } from './Separator.types';

export const Separator: React.FC<SeparatorProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  size = 'md',
  color,
  margin,
  length,
  children,
  className,
  'data-testid': dataTestId,
}) => {
  const theme = useTheme();

  const getThickness = () => {
    switch (size) {
      case 'xs':
        return 1;
      case 'sm':
        return 2;
      case 'md':
        return 3;
      case 'lg':
        return 4;
      case 'xl':
        return 6;
      default:
        return 3;
    }
  };

  const getMargin = () => {
    if (margin !== undefined) return margin;
    switch (size) {
      case 'xs':
        return 4; // 0.5 * 8 = 4px
      case 'sm':
        return 8; // 1 * 8 = 8px
      case 'md':
        return 16; // 2 * 8 = 16px
      case 'lg':
        return 24; // 3 * 8 = 24px
      case 'xl':
        return 32; // 4 * 8 = 32px
      default:
        return 16;
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'dashed':
        return 'dashed';
      case 'dotted':
        return 'dotted';
      case 'gradient':
        return 'solid';
      default:
        return 'solid';
    }
  };

  const getColor = () => {
    if (color) return color;
    return theme.palette.divider;
  };

  const getGradientBackground = () => {
    if (variant !== 'gradient') return undefined;

    if (orientation === 'horizontal') {
      return `linear-gradient(90deg, transparent 0%, ${getColor()} 50%, transparent 100%)`;
    } else {
      return `linear-gradient(180deg, transparent 0%, ${getColor()} 50%, transparent 100%)`;
    }
  };

  const getSeparatorStyles = () => {
    const isHorizontal = orientation === 'horizontal';
    const thickness = getThickness();
    const marginValue = getMargin();

    // Handle margin - if it's a string with units, use as-is, otherwise add px
    const marginStr = typeof marginValue === 'string' ? marginValue : `${marginValue}px`;

    const baseStyles = {
      display: 'flex' as const,
      alignItems: 'center' as const,
      margin: isHorizontal ? `${marginStr} 0` : `0 ${marginStr}`,
      width: isHorizontal ? length || '100%' : `${thickness}px`,
      height: isHorizontal ? `${thickness}px` : length || '100%',
      boxSizing: 'border-box' as const,
    };

    if (variant === 'gradient') {
      return {
        ...baseStyles,
        background: getGradientBackground(),
      };
    }

    // Apply border styles separately for better compatibility with MUI's sx prop
    const borderStyle = getBorderStyle();
    const borderColor = getColor();

    const borderStyles = isHorizontal
      ? {
        borderTopWidth: thickness,
        borderTopStyle: borderStyle,
        borderTopColor: borderColor,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomStyle: 'none',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      }
      : {
        borderLeftWidth: thickness,
        borderLeftStyle: borderStyle,
        borderLeftColor: borderColor,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderTopStyle: 'none',
        borderBottomStyle: 'none',
        borderRightStyle: 'none',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
      };

    return {
      ...baseStyles,
      backgroundColor: 'transparent' as const,
      ...borderStyles,
    };
  };

  if (children) {
    const isHorizontal = orientation === 'horizontal';

    return (
      <Box
        className={className}
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: getMargin(),
          flexDirection: isHorizontal ? 'row' : 'column',
          gap: theme.spacing(2),
        }}
      >
        <Box sx={getSeparatorStyles()} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flexShrink: 0,
            padding: theme.spacing(0, 1),
            backgroundColor: theme.palette.background.default,
          }}
        >
          {children}
        </Typography>
        <Box sx={getSeparatorStyles()} />
      </Box>
    );
  }

  return (
    <Box
      className={className}
      sx={getSeparatorStyles()}
      role="separator"
      aria-orientation={orientation}
      data-testid={dataTestId}
    />
  );
};
