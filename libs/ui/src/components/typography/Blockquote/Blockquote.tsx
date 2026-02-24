import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import FormatQuote from '@mui/icons-material/FormatQuote';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { BlockquoteProps } from './Blockquote.types';

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return {
      main: theme.palette.grey?.[700] || '#616161',
      light: theme.palette.grey?.[500] || '#9e9e9e',
      dark: theme.palette.grey?.[800] || '#424242',
    };
  }

  const colorMap: Record<string, typeof theme.palette.primary> = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    danger: theme.palette.error,
  };

  return colorMap[color] || theme.palette.primary;
};

const StyledBlockquote = styled('blockquote', {
  shouldForwardProp: (prop) => !['customVariant', 'customColor'].includes(prop as string),
})<{
  customVariant?: string;
  customColor?: string;
}>(({ theme, customVariant = 'default', customColor = 'neutral' }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const baseStyles = {
    // Margin and padding are now handled via sx prop with density
    margin: 0,
    padding: 0,
    position: 'relative' as const,
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: '1.125rem',
    lineHeight: 1.6,
    fontStyle: 'italic',
    color: theme.palette.text.primary,
  };

  // Return styles based on variant (without padding/margin - those come from density)
  if (customVariant === 'bordered') {
    return {
      ...baseStyles,
      border: `2px solid ${alpha(colorPalette.main, 0.2)}`,
      borderRadius: theme.shape.borderRadius * 2,
      backgroundColor: alpha(colorPalette.main, 0.03),
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        background: `linear-gradient(135deg, ${colorPalette.main}, ${colorPalette.light})`,
        borderRadius: theme.shape.borderRadius * 2,
        padding: '2px',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'exclude',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
      },
    };
  }

  if (customVariant === 'citation') {
    return {
      ...baseStyles,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.grey[50], 0.95),
      backdropFilter: theme.palette.mode === 'dark' ? 'blur(10px)' : 'none',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.palette.mode === 'dark' ? theme.shadows[4] : 'none',
      textAlign: 'center' as const,
    };
  }

  // Default variant
  return {
    ...baseStyles,
    borderLeft: `4px solid ${colorPalette.main}`,
    backgroundColor: alpha(colorPalette.main, 0.05),
    borderRadius: theme.shape.borderRadius,
  };
});

const QuoteIcon = styled(FormatQuote)<{ customColor: string }>(({ theme, customColor }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  return {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    fontSize: '2rem',
    opacity: 0.3,
    transform: 'rotate(180deg)',
    color: colorPalette.main,
  };
});

const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
}));

const SourceName = styled(Typography)(() => ({
  fontSize: '0.75rem',
  opacity: 0.7,
}));

export const Blockquote = React.forwardRef<globalThis.HTMLQuoteElement, BlockquoteProps>(
  ({ variant = 'default', author, source, color = 'neutral', children, sx, ...props }, ref) => {
    const { spacingPx } = useDensitySpacing();
    const showCitation = author || source;
    const showIcon = variant === 'bordered' || variant === 'citation';

    // Base spacing values (will be scaled by density)
    // Base: margin 24px (6 units), padding 12px vertical / 12px horizontal (3 units)
    const marginY = spacingPx(6); // Base: 24px, scales with density
    const paddingY = spacingPx(3); // Base: 12px, scales with density
    const paddingX = spacingPx(3); // Base: 12px, scales with density
    const paddingLeft = spacingPx(3); // Base: 12px, scales with density (for default variant border)
    const citationMarginTop = spacingPx(2); // Base: 8px, scales with density

    // Get variant-specific padding
    const getPadding = () => {
      if (variant === 'bordered') {
        return paddingY; // Same padding all around
      }
      if (variant === 'citation') {
        return `${paddingY} ${paddingX}`;
      }
      // Default variant: needs extra left padding for border
      return `${paddingY} ${paddingX} ${paddingY} ${paddingLeft}`;
    };

    return (
      <StyledBlockquote
        ref={ref}
        customVariant={variant}
        customColor={color}
        sx={{
          margin: `${marginY} 0`, // Base: 24px, scales with density
          padding: getPadding(),
          ...sx,
        }}
        {...props}
      >
        {showIcon && <QuoteIcon customColor={color} />}

        <Typography
          component="div"
          sx={{
            fontSize: 'inherit',
            lineHeight: 'inherit',
            fontStyle: 'inherit',
            color: 'inherit',
            margin: 0,
          }}
        >
          {children}
        </Typography>

        {showCitation && (
          <Box
            sx={{
              marginTop: citationMarginTop, // Base: 8px, scales with density
              textAlign: 'right',
              fontStyle: 'normal',
              opacity: 0.8,
            }}
          >
            {author && <AuthorName>— {author}</AuthorName>}
            {source && <SourceName>{source}</SourceName>}
          </Box>
        )}
      </StyledBlockquote>
    );
  },
);

Blockquote.displayName = 'Blockquote';
