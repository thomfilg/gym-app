import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import MuiRadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { alpha, keyframes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { forwardRef } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { RadioGroupProps } from './RadioGroup.types';

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

const slideAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
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

  const colorMap: Record<
  string,
  { main: string; dark?: string; light?: string; contrastText?: string }
  > = {
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

const StyledFormLabel = styled(FormLabel, {
  shouldForwardProp: (prop) => !['glass', 'error'].includes(prop as string),
})<{ glass?: boolean; error?: boolean }>(({ theme, glass, error }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: error ? theme.palette.error.main : theme.palette.text.primary,
  ...(glass && {
    backgroundColor: alpha(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(10px)',
    padding: '8px 12px',
    borderRadius: '8px',
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    display: 'inline-block',
  }),
}));

const StyledRadioCard = styled(Card, {
  shouldForwardProp: (prop) =>
    !['selected', 'customColor', 'glass', 'gradient', 'glow', 'customSize', 'animated'].includes(
      prop as string,
    ),
})<{
  selected?: boolean;
  customColor?: string;
  glass?: boolean;
  gradient?: boolean;
  glow?: boolean;
  customSize?: string;
  animated?: boolean;
}>(({
  theme,
  selected,
  customColor = 'primary',
  glass,
  gradient,
  glow,
  customSize = 'md',
  animated,
}) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const sizeMap = {
    xs: { padding: '8px', minHeight: '60px' },
    sm: { padding: '12px', minHeight: '70px' },
    md: { padding: '16px', minHeight: '80px' },
    lg: { padding: '20px', minHeight: '90px' },
    xl: { padding: '24px', minHeight: '100px' },
  };

  const baseStyles = {
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `2px solid ${selected ? colorPalette.main : alpha(theme.palette.divider, 0.3)}`,
    backgroundColor: selected ? alpha(colorPalette.main, 0.05) : theme.palette.background.paper,
    position: 'relative' as const,
    overflow: 'hidden' as const,

    ...(animated && {
      animation: `${slideAnimation} 0.4s ease-out`,
    }),

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: selected ? '100%' : '0',
      height: selected ? '100%' : '0',
      background: `radial-gradient(circle, ${alpha(colorPalette.main, 0.1)} 0%, transparent 70%)`,
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.5s ease',
      borderRadius: '50%',
    },

    '&:hover': {
      borderColor: colorPalette.main,
      backgroundColor: alpha(colorPalette.main, 0.02),
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: `${theme.shadows[4]}, 0 10px 30px -5px ${alpha(colorPalette.main, 0.2)}`,

      '&::before': {
        width: '120%',
        height: '120%',
      },
    },

    '&:active': {
      transform: 'scale(0.98)',
    },

    ...sizeMap[customSize as keyof typeof sizeMap],
  };

  const glassStyles = glass
    ? {
      backgroundColor: selected
        ? alpha(colorPalette.main, 0.1)
        : alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    }
    : {};

  const gradientStyles =
    gradient && selected
      ? {
        background: `linear-gradient(135deg, ${alpha(colorPalette.main, 0.1)}, ${alpha(colorPalette.light || colorPalette.main, 0.05)})`,
        borderColor: colorPalette.main,
      }
      : {};

  const glowStyles =
    glow && selected
      ? {
        animation: `${glowAnimation} 2s ease-in-out infinite`,
        boxShadow: `0 0 15px ${alpha(colorPalette.main, 0.4)}`,
      }
      : {};

  return {
    ...baseStyles,
    ...glassStyles,
    ...gradientStyles,
    ...glowStyles,
  };
});

const StyledButtonRadio = styled(ButtonBase, {
  shouldForwardProp: (prop) =>
    !['selected', 'customColor', 'glass', 'gradient', 'customSize', 'animated'].includes(
      prop as string,
    ),
})<{
  selected?: boolean;
  customColor?: string;
  glass?: boolean;
  gradient?: boolean;
  customSize?: string;
  animated?: boolean;
}>(({ theme, selected, customColor = 'primary', glass, gradient, customSize = 'md', animated }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const sizeMap = {
    xs: { padding: '6px 12px', fontSize: '0.75rem', minHeight: '32px' },
    sm: { padding: '8px 16px', fontSize: '0.875rem', minHeight: '36px' },
    md: { padding: '10px 20px', fontSize: '1rem', minHeight: '40px' },
    lg: { padding: '12px 24px', fontSize: '1.125rem', minHeight: '44px' },
    xl: { padding: '14px 28px', fontSize: '1.25rem', minHeight: '48px' },
  };

  const baseStyles = {
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 500,
    border: `2px solid ${selected ? colorPalette.main : alpha(theme.palette.divider, 0.5)}`,
    backgroundColor: selected ? colorPalette.main : 'transparent',
    color: selected ? colorPalette.contrastText || '#fff' : theme.palette.text.primary,
    position: 'relative' as const,
    overflow: 'hidden' as const,

    ...(animated &&
      selected && {
      animation: `${scaleAnimation} 0.3s ease-out`,
    }),

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 0,
      height: 0,
      borderRadius: '50%',
      backgroundColor: alpha(colorPalette.contrastText || '#fff', 0.3),
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none' as const,
    },

    '&:active::after': {
      animation: `${rippleAnimation} 0.6s ease-out`,
      width: '100%',
      height: '100%',
    },

    '&:hover': {
      borderColor: colorPalette.main,
      backgroundColor: selected ? colorPalette.dark : alpha(colorPalette.main, 0.1),
      transform: 'translateY(-1px) scale(1.02)',
      boxShadow: `0 4px 12px ${alpha(colorPalette.main, 0.2)}`,
    },

    '&:active': {
      transform: 'scale(0.98)',
    },

    ...sizeMap[customSize as keyof typeof sizeMap],
  };

  const glassStyles = glass
    ? {
      backgroundColor: selected
        ? alpha(colorPalette.main, 0.8)
        : alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    }
    : {};

  const gradientStyles =
    gradient && selected
      ? {
        background: `linear-gradient(135deg, ${colorPalette.main}, ${colorPalette.dark})`,
        border: 'none',
      }
      : {};

  return {
    ...baseStyles,
    ...glassStyles,
    ...gradientStyles,
  };
});

const StyledSegmentContainer = styled(Box, {
  shouldForwardProp: (prop) => !['glass', 'customColor'].includes(prop as string),
})<{ glass?: boolean; customColor?: string }>(({ theme, glass, customColor = 'primary' }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  return {
    padding: '4px',
    borderRadius: theme.spacing(1.5),
    backgroundColor: glass
      ? alpha(theme.palette.background.paper, 0.1)
      : alpha(colorPalette.main, 0.05),
    backdropFilter: glass ? 'blur(20px)' : 'none',
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    display: 'flex',
    gap: '2px',
  };
});

const StyledSegmentButton = styled(ButtonBase, {
  shouldForwardProp: (prop) =>
    !['selected', 'customColor', 'customSize', 'animated'].includes(prop as string),
})<{
  selected?: boolean;
  customColor?: string;
  customSize?: string;
  animated?: boolean;
}>(({ theme, selected, customColor = 'primary', customSize = 'md', animated }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const sizeMap = {
    xs: { padding: '4px 8px', fontSize: '0.75rem' },
    sm: { padding: '6px 12px', fontSize: '0.875rem' },
    md: { padding: '8px 16px', fontSize: '1rem' },
    lg: { padding: '10px 20px', fontSize: '1.125rem' },
    xl: { padding: '12px 24px', fontSize: '1.25rem' },
  };

  return {
    flex: 1,
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 500,
    backgroundColor: selected ? theme.palette.background.paper : 'transparent',
    color: selected ? colorPalette.main : theme.palette.text.secondary,
    boxShadow: selected
      ? `${theme.shadows[2]}, inset 0 1px 3px ${alpha(colorPalette.main, 0.1)}`
      : 'none',
    position: 'relative' as const,
    overflow: 'hidden' as const,

    ...(animated &&
      selected && {
      animation: `${scaleAnimation} 0.3s ease-out`,
    }),

    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: selected ? 0 : '50%',
      width: selected ? '100%' : 0,
      height: '2px',
      backgroundColor: colorPalette.main,
      transition: 'all 0.3s ease',
      transform: selected ? 'translateX(0)' : 'translateX(-50%)',
    },

    '&:hover': {
      backgroundColor: selected
        ? theme.palette.background.paper
        : alpha(theme.palette.action.hover, 0.08),
      color: colorPalette.main,

      '&::before': {
        width: '100%',
        left: 0,
        transform: 'translateX(0)',
      },
    },

    '&:active': {
      transform: 'scale(0.98)',
    },

    ...sizeMap[customSize as keyof typeof sizeMap],
  };
});

// Base padding values in spacing units (4px base) for RadioGroup variants
// These will be scaled by the density multiplier
const basePaddingCard = {
  xs: 2,    // 8px at normal density
  sm: 3,    // 12px at normal density
  md: 4,    // 16px at normal density
  lg: 5,    // 20px at normal density
  xl: 6,    // 24px at normal density
};

const basePaddingButton = {
  xs: { py: 1.5, px: 3 },    // 6px 12px at normal density
  sm: { py: 2, px: 4 },      // 8px 16px at normal density
  md: { py: 2.5, px: 5 },    // 10px 20px at normal density
  lg: { py: 3, px: 6 },      // 12px 24px at normal density
  xl: { py: 3.5, px: 7 },    // 14px 28px at normal density
};

const basePaddingSegment = {
  xs: { py: 1, px: 2 },      // 4px 8px at normal density
  sm: { py: 1.5, px: 3 },    // 6px 12px at normal density
  md: { py: 2, px: 4 },      // 8px 16px at normal density
  lg: { py: 2.5, px: 5 },    // 10px 20px at normal density
  xl: { py: 3, px: 6 },      // 12px 24px at normal density
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      variant = 'default',
      color = 'primary',
      size = 'md',
      options,
      label,
      error = false,
      helperText,
      glassLabel = false,
      glow = false,
      glass = false,
      gradient = false,
      direction = 'column',
      showDescriptions = true,
      value,
      onChange,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();

    // Calculate density-aware padding for different variants
    const cardPadding = spacingPx(basePaddingCard[size]);
    const buttonPadding = `${spacingPx(basePaddingButton[size].py)} ${spacingPx(basePaddingButton[size].px)}`;
    const segmentPadding = `${spacingPx(basePaddingSegment[size].py)} ${spacingPx(basePaddingSegment[size].px)}`;

    const renderDefaultRadio = () => (
      <MuiRadioGroup
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
        sx={{
          flexDirection: direction,
          gap: 1,
        }}
        data-testid={dataTestId ? `${dataTestId}-group` : undefined}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            data-testid={dataTestId ? `${dataTestId}-option-${index}` : undefined}
            control={
              <Radio
                color={
                  color === 'danger'
                    ? 'error'
                    : (color as 'primary' | 'secondary' | 'success' | 'warning' | 'error')
                }
                data-testid={dataTestId ? `${dataTestId}-radio-${index}` : undefined}
              />
            }
            label={
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                data-testid={dataTestId ? `${dataTestId}-label-${index}` : undefined}
              >
                {option.icon}
                <Box>
                  <Typography>{option.label}</Typography>
                  {option.description && showDescriptions && (
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            }
          />
        ))}
      </MuiRadioGroup>
    );

    const renderCardRadio = () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: direction,
          gap: 2,
        }}
        data-testid={dataTestId ? `${dataTestId}-container` : undefined}
      >
        {options.map((option, index) => (
          <StyledRadioCard
            key={option.value}
            selected={value === option.value}
            customColor={color}
            glass={glass}
            gradient={gradient}
            glow={glow}
            customSize={size}
            animated
            data-testid={dataTestId ? `${dataTestId}-card-${index}` : undefined}
            sx={{ padding: cardPadding }}
            onClick={() => {
              if (!option.disabled && onChange) {
                const event = {
                  target: { value: option.value },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event, option.value);
              }
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                {option.icon && (
                  <Box
                    sx={{
                      mt: 0.5,
                      color: value === option.value ? `${color}.main` : 'text.secondary',
                    }}
                  >
                    {option.icon}
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color={value === option.value ? `${color}.main` : 'text.primary'}
                    data-testid={dataTestId ? `${dataTestId}-label-${index}` : undefined}
                  >
                    {option.label}
                  </Typography>
                  {option.description && showDescriptions && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {option.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </StyledRadioCard>
        ))}
      </Box>
    );

    const renderButtonRadio = () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: direction,
          gap: 1,
          flexWrap: 'wrap',
        }}
        data-testid={dataTestId ? `${dataTestId}-container` : undefined}
      >
        {options.map((option, index) => (
          <StyledButtonRadio
            key={option.value}
            selected={value === option.value}
            customColor={color}
            glass={glass}
            gradient={gradient}
            customSize={size}
            animated
            disabled={option.disabled}
            data-testid={dataTestId ? `${dataTestId}-button-${index}` : undefined}
            sx={{ padding: buttonPadding }}
            onClick={() => {
              if (!option.disabled && onChange) {
                const event = {
                  target: { value: option.value },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event, option.value);
              }
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              data-testid={dataTestId ? `${dataTestId}-label-${index}` : undefined}
            >
              {option.icon}
              {option.label}
            </Box>
          </StyledButtonRadio>
        ))}
      </Box>
    );

    const renderSegmentRadio = () => (
      <StyledSegmentContainer
        glass={glass}
        customColor={color}
        data-testid={dataTestId ? `${dataTestId}-container` : undefined}
      >
        {options.map((option, index) => (
          <StyledSegmentButton
            key={option.value}
            selected={value === option.value}
            customColor={color}
            customSize={size}
            animated
            disabled={option.disabled}
            data-testid={dataTestId ? `${dataTestId}-segment-${index}` : undefined}
            sx={{ padding: segmentPadding }}
            onClick={() => {
              if (!option.disabled && onChange) {
                const event = {
                  target: { value: option.value },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event, option.value);
              }
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              data-testid={dataTestId ? `${dataTestId}-label-${index}` : undefined}
            >
              {option.icon}
              {option.label}
            </Box>
          </StyledSegmentButton>
        ))}
      </StyledSegmentContainer>
    );

    const renderRadioGroup = () => {
      switch (variant) {
        case 'cards':
          return renderCardRadio();
        case 'buttons':
          return renderButtonRadio();
        case 'segments':
          return renderSegmentRadio();
        default:
          return renderDefaultRadio();
      }
    };

    return (
      <Box data-testid={dataTestId}>
        {label && (
          <StyledFormLabel
            glass={glassLabel}
            error={error}
            data-testid={dataTestId ? `${dataTestId}-label` : undefined}
          >
            {label}
          </StyledFormLabel>
        )}

        {renderRadioGroup()}

        {helperText && (
          <FormHelperText
            error={error}
            sx={{ mt: 1 }}
            data-testid={dataTestId ? `${dataTestId}-helper-text` : undefined}
          >
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
