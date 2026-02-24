import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { CodeProps } from './Code.types';

const StyledCodeContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customSize', 'copyable'].includes(prop as string),
})<{
  customVariant?: string;
  customSize?: string;
  copyable?: boolean;
  component?: React.ElementType;
}>(({ theme, customVariant = 'inline', customSize = 'md' }) => {
  // Size mapping - only font sizes, padding is handled via sx prop with density
  const sizeMap = {
    xs: { fontSize: '0.75rem' },
    sm: { fontSize: '0.8125rem' },
    md: { fontSize: '0.875rem' },
    lg: { fontSize: '1rem' },
  };

  const baseStyles = {
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Courier New", monospace',
    lineHeight: 1.5,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    ...sizeMap[customSize as keyof typeof sizeMap],
  };

  // Variant-specific styles (without padding - that comes from density)
  const variantStyles = {
    inline: {
      ...baseStyles,
      display: 'inline',
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: theme.palette.primary.main,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
    },
    block: {
      ...baseStyles,
      display: 'block',
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.grey[900], 0.95)
          : alpha(theme.palette.grey[100], 0.95),
      color:
        theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      overflow: 'auto',
      whiteSpace: 'pre' as const,
    },
    highlight: {
      ...baseStyles,
      display: 'block',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
      color: theme.palette.text.primary,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      overflow: 'auto',
      whiteSpace: 'pre' as const,
    },
  };

  return variantStyles[customVariant as keyof typeof variantStyles] || variantStyles.inline;
});

const StyledCode = styled('code')({
  margin: 0,
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',
});

const CopyButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  width: 32,
  height: 32,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.8)
      : theme.palette.background.paper,
  backdropFilter: theme.palette.mode === 'dark' ? 'blur(8px)' : 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: theme.palette.mode === 'light' ? theme.shadows[1] : 'none',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.9)
        : theme.palette.grey[100],
    transform: 'scale(1.05)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

const LanguageLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(2),
  fontSize: '0.75rem',
  fontWeight: 500,
  color: alpha(theme.palette.text.primary, 0.6),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.8)
      : theme.palette.background.paper,
  // Default padding - will be overridden by density-aware padding via sx prop
  padding: '2px 8px',
  borderRadius: theme.shape.borderRadius / 2,
  backdropFilter: theme.palette.mode === 'dark' ? 'blur(8px)' : 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: theme.palette.mode === 'light' ? theme.shadows[1] : 'none',
}));

// Base padding for LanguageLabel in spacing units (4px base)
// py: 0.5 = 2px, px: 2 = 8px at normal density, scales with density
const languageLabelPadding = { py: 0.5, px: 2 };

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingInline = {
  xs: { py: 0.5, px: 1 },      // Base: 2px 4px, scales with density
  sm: { py: 0.75, px: 1.5 },   // Base: 3px 6px, scales with density
  md: { py: 1, px: 2 },        // Base: 4px 8px, scales with density
  lg: { py: 1.5, px: 3 },      // Base: 6px 12px, scales with density
};

const basePaddingBlock = {
  xs: { py: 2, px: 3 },        // Base: 8px 12px, scales with density
  sm: { py: 3, px: 4 },        // Base: 12px 16px, scales with density
  md: { py: 4, px: 5 },        // Base: 16px 20px, scales with density
  lg: { py: 5, px: 6 },        // Base: 20px 24px, scales with density
};

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  (
    {
      variant = 'inline',
      language,
      copyable = false,
      lineNumbers = false,
      size = 'md',
      children,
      sx,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const { spacingPx } = useDensitySpacing();

    const handleCopy = async () => {
      if (typeof children === 'string') {
        try {
          await navigator.clipboard.writeText(children);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          // Silently fail if clipboard access is denied
        }
      }
    };

    const isBlock = variant === 'block' || variant === 'highlight';
    const shouldShowCopy = copyable && isBlock;
    const shouldShowLanguage = language && isBlock;

    // Calculate density-aware padding based on variant and size
    const getPadding = () => {
      if (isBlock) {
        const config = basePaddingBlock[size as keyof typeof basePaddingBlock] || basePaddingBlock.md;
        const py = spacingPx(config.py);
        const px = spacingPx(config.px);
        // Add extra right padding for copy button if copyable
        const rightPadding = shouldShowCopy ? '60px' : px;
        return `${py} ${rightPadding} ${py} ${px}`;
      }
      // Inline variant
      const config = basePaddingInline[size as keyof typeof basePaddingInline] || basePaddingInline.md;
      return `${spacingPx(config.py)} ${spacingPx(config.px)}`;
    };

    // Process children for line numbers if needed
    const processedChildren = React.useMemo(() => {
      if (!lineNumbers || !isBlock || typeof children !== 'string') {
        return children;
      }

      return children.split('\n').map((line, index) => {
        // Use line content hash + line number for more stable keys
        const stableKey = `line-${index + 1}-${line.slice(0, 10).replace(/\s+/g, '')}-${line.length}`;

        return (
          <div key={stableKey} style={{ display: 'flex' }}>
            <span
              style={{
                display: 'inline-block',
                minWidth: '3em',
                opacity: 0.5,
                userSelect: 'none',
                marginRight: '1em',
                textAlign: 'right',
              }}
            >
              {index + 1}
            </span>
            <span>{line}</span>
          </div>
        );
      });
    }, [children, lineNumbers, isBlock]);

    return (
      <StyledCodeContainer
        ref={ref}
        component={variant === 'inline' ? 'span' : 'div'}
        customVariant={variant}
        customSize={size}
        copyable={shouldShowCopy}
        sx={{
          padding: getPadding(),
          ...sx,
        }}
        {...props}
      >
        {shouldShowLanguage && (
          <LanguageLabel
            sx={{
              padding: `${spacingPx(languageLabelPadding.py)} ${spacingPx(languageLabelPadding.px)}`,
            }}
          >
            {language}
          </LanguageLabel>
        )}

        <StyledCode>{processedChildren}</StyledCode>

        {shouldShowCopy && (
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <CopyButton onClick={handleCopy} size="small" color={copied ? 'success' : 'default'}>
              {copied ? <Check /> : <ContentCopy />}
            </CopyButton>
          </Tooltip>
        )}
      </StyledCodeContainer>
    );
  },
);

Code.displayName = 'Code';
