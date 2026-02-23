import MuiCheckbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { alpha, keyframes, styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { CheckboxProps } from './Checkbox.types';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(25, 118, 210, 0.8);
  }
`;

const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => !['customVariant', 'ripple', 'glow', 'pulse'].includes(prop as string),
})<{
  customVariant?: CheckboxProps['variant'];
  ripple?: boolean;
  glow?: boolean;
  pulse?: boolean;
}>(
  ({ theme, customVariant, ripple, glow: glowProp, pulse: pulseProp }) => ({
    ...(customVariant === 'rounded' && {
      '& .MuiSvgIcon-root': {
        borderRadius: '50%',
      },
    }),

    ...(customVariant === 'toggle' && {
      '& .MuiSvgIcon-root': {
        borderRadius: '12px',
        transform: 'scale(1.2)',
      },
    }),

    '&.MuiCheckbox-root': {
      transition: 'all 0.3s ease',
      ...(ripple === false && {
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      }),
      ...(glowProp && {
        animation: `${glow} 2s ease-in-out infinite`,
      }),
      ...(pulseProp && {
        animation: `${pulse} 2s infinite`,
      }),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
    },

    '&.Mui-checked': {
      color: theme.palette.primary.main,
    },

    '&.MuiCheckbox-indeterminate': {
      color: theme.palette.primary.main,
    },
  })
);

const StyledFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>(
  ({ theme, error }) => ({
    marginLeft: 0,
    '& .MuiFormControlLabel-label': {
      color: error ? theme.palette.error.main : theme.palette.text.primary,
      fontSize: '0.875rem',
    },
  })
);

// StyledFormHelperText - margin will be applied via sx prop for density scaling
const StyledFormHelperText = styled(FormHelperText)({
  // Margins are applied via sx prop for density scaling
});

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({
    variant = 'default',
    label,
    error,
    helperText,
    loading,
    ripple = true,
    glow = false,
    pulse = false,
    disabled,
    'data-testid': dataTestId,
    ...props
  }, ref) => {
    const { spacingPx } = useDensitySpacing();
    const isDisabled = disabled || loading;

    // Calculate density-aware margins for helper text
    const helperTextMarginLeft = spacingPx(4);   // 16px at normal density
    const helperTextMarginTop = spacingPx(0.5);  // 2px at normal density

    const checkbox = (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <StyledCheckbox
          ref={ref}
          customVariant={variant}
          ripple={ripple}
          glow={glow}
          pulse={pulse}
          disabled={isDisabled}
          data-testid={dataTestId || 'checkbox'}
          {...props}
        />
        {loading && (
          <CircularProgress
            size={20}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-10px',
              marginLeft: '-10px',
              color: 'primary.main',
            }}
          />
        )}
      </div>
    );

    if (label) {
      return (
        <div data-testid={dataTestId ? `${dataTestId}-container` : 'checkbox-container'}>
          <StyledFormControlLabel
            control={checkbox}
            label={label}
            error={error}
            disabled={isDisabled}
          />
          {helperText && (
            <StyledFormHelperText
              error={error}
              data-testid={dataTestId ? `${dataTestId}-helper` : 'checkbox-helper'}
              sx={{ marginLeft: helperTextMarginLeft, marginTop: helperTextMarginTop }}
            >
              {helperText}
            </StyledFormHelperText>
          )}
        </div>
      );
    }

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';