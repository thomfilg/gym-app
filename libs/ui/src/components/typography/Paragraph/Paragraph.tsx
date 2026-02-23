import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ParagraphProps } from './Paragraph.types';

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return theme.palette.text.primary;
  }

  const colorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    danger: theme.palette.error.main,
  };

  return colorMap[color] || theme.palette.text.primary;
};

const StyledParagraph = styled(Typography, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customColor', 'customSize'].includes(prop as string),
})<{
  customVariant?: string;
  customColor?: string;
  customSize?: string;
}>(({ theme, customVariant = 'default', customColor = 'neutral', customSize = 'md' }) => {
  const textColor = getColorFromTheme(theme, customColor);

  // Size mapping (font sizes remain fixed, not affected by density)
  const sizeMap = {
    xs: { fontSize: '0.75rem', lineHeight: 1.4 },
    sm: { fontSize: '0.875rem', lineHeight: 1.5 },
    md: { fontSize: '1rem', lineHeight: 1.6 },
    lg: { fontSize: '1.125rem', lineHeight: 1.6 },
    xl: { fontSize: '1.25rem', lineHeight: 1.7 },
  };

  const baseStyles = {
    fontFamily: theme.typography.body1.fontFamily,
    // Margin is now handled via sx prop with density
    margin: 0,
    transition: 'all 0.2s ease',
    ...sizeMap[customSize as keyof typeof sizeMap],
  };

  // Variant-specific styles
  const variantStyles = {
    default: {
      ...baseStyles,
      color: textColor,
      fontWeight: 400,
    },
    lead: {
      ...baseStyles,
      color: textColor,
      fontWeight: 400,
      fontSize:
        customSize === 'md' ? '1.125rem' : sizeMap[customSize as keyof typeof sizeMap]?.fontSize,
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    muted: {
      ...baseStyles,
      color: theme.palette.text.secondary,
      fontWeight: 400,
      opacity: 0.8,
    },
    small: {
      ...baseStyles,
      color: theme.palette.text.secondary,
      fontSize:
        customSize === 'md' ? '0.875rem' : sizeMap[customSize as keyof typeof sizeMap]?.fontSize,
      fontWeight: 400,
      lineHeight: 1.5,
    },
  };

  return variantStyles[customVariant as keyof typeof variantStyles] || variantStyles.default;
});

export const Paragraph = React.forwardRef<globalThis.HTMLParagraphElement, ParagraphProps>(
  ({ variant = 'default', color = 'neutral', size = 'md', children, sx, ...props }, ref) => {
    const { spacingPx } = useDensitySpacing();

    // Base bottom margin: 4 spacing units (16px at normal density, ~1em)
    // This scales with density for consistent spacing
    const marginBottom = spacingPx(4); // Base: 16px, scales with density

    return (
      <StyledParagraph
        ref={ref}
        customVariant={variant}
        customColor={color}
        customSize={size}
        sx={{
          marginBottom, // Base: 16px, scales with density
          ...sx,
        }}
        {...props}
      >
        {children}
      </StyledParagraph>
    );
  },
);

Paragraph.displayName = 'Paragraph';
