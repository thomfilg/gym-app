import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { TextProps } from './Text.types';

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return theme.palette.text.primary;
  }

  if (color === 'secondary') {
    return theme.palette.text.secondary;
  }

  const colorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    danger: theme.palette.error.main,
  };

  return colorMap[color] || theme.palette.text.primary;
};

const StyledText = styled(Typography, {
  shouldForwardProp: (prop) =>
    ![
      'customVariant',
      'customColor',
      'customSize',
      'customWeight',
      'italic',
      'underline',
      'strikethrough',
    ].includes(prop as string),
})<{
  customVariant?: string;
  customColor?: string;
  customSize?: string;
  customWeight?: string;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}>(({
  theme,
  customVariant,
  customColor = 'neutral',
  customSize = 'md',
  customWeight = 'normal',
  italic,
  underline,
  strikethrough,
}) => {
  const textColor = getColorFromTheme(theme, customColor);

  // Size mapping (font sizes remain fixed, not affected by density)
  const sizeMap = {
    xs: { fontSize: '0.75rem', lineHeight: 1.2 },
    sm: { fontSize: '0.875rem', lineHeight: 1.3 },
    md: { fontSize: '1rem', lineHeight: 1.5 },
    lg: { fontSize: '1.125rem', lineHeight: 1.4 },
    xl: { fontSize: '1.25rem', lineHeight: 1.3 },
  };

  // Weight mapping
  const weightMap = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  // Base styles
  const baseStyles = {
    color: textColor,
    fontSize: sizeMap[customSize as keyof typeof sizeMap]?.fontSize,
    lineHeight: sizeMap[customSize as keyof typeof sizeMap]?.lineHeight,
    fontWeight: weightMap[customWeight as keyof typeof weightMap],
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration:
      [underline && 'underline', strikethrough && 'line-through'].filter(Boolean).join(' ') ||
      'none',
    transition: 'all 0.2s ease',
  };

  // Variant-specific styles (padding for code variant is handled via sx prop with density)
  const variantStyles = {
    body: {
      ...baseStyles,
      fontFamily: theme.typography.body1.fontFamily,
    },
    heading: {
      ...baseStyles,
      fontFamily: theme.typography.h4.fontFamily,
      fontWeight:
        customWeight === 'normal' ? 600 : weightMap[customWeight as keyof typeof weightMap],
      letterSpacing: '-0.01em',
    },
    caption: {
      ...baseStyles,
      fontSize:
        customSize === 'md' ? '0.75rem' : sizeMap[customSize as keyof typeof sizeMap]?.fontSize,
      opacity: 0.8,
      letterSpacing: '0.02em',
    },
    code: {
      ...baseStyles,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Courier New", monospace',
      fontSize:
        customSize === 'md' ? '0.875rem' : sizeMap[customSize as keyof typeof sizeMap]?.fontSize,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      // Padding is handled via sx prop with density
      borderRadius: theme.shape.borderRadius / 2,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
    },
  };

  return variantStyles[customVariant as keyof typeof variantStyles] || variantStyles.body;
});

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      color = 'neutral',
      size = 'md',
      weight = 'normal',
      as = 'span',
      italic = false,
      underline = false,
      strikethrough = false,
      children,
      sx,
      ...props
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();

    // Calculate density-aware padding for code variant
    // Base: 2px 6px (0.5 units vertical, 1.5 units horizontal)
    const codePadding = variant === 'code'
      ? `${spacingPx(0.5)} ${spacingPx(1.5)}` // Base: 2px 6px, scales with density
      : undefined;

    return (
      <StyledText
        ref={ref}
        customVariant={variant}
        customColor={color}
        customSize={size}
        customWeight={weight}
        italic={italic}
        underline={underline}
        strikethrough={strikethrough}
        sx={{
          ...(codePadding && { padding: codePadding }),
          ...sx,
        }}
        {...(as && { as })}
        {...props}
      >
        {children}
      </StyledText>
    );
  },
);

Text.displayName = 'Text';
