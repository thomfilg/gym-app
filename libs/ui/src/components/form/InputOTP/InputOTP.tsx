import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { forwardRef, useEffect,useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { InputOTPProps } from './InputOTP.types';

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    return {
      main: theme.palette.grey[700],
      dark: theme.palette.grey[800],
      light: theme.palette.grey[500],
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

const StyledOTPInput = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['customColor', 'customSize', 'glass', 'gradient'].includes(prop as string),
})<{
  customColor?: string;
  customSize?: string;
  glass?: boolean;
  gradient?: boolean;
}>(({ theme, customColor = 'primary', customSize = 'md', glass, gradient }) => {
  const colorPalette = getColorFromTheme(theme, customColor);

  const sizeMap = {
    xs: { width: '32px', height: '32px', fontSize: '0.75rem' },
    sm: { width: '40px', height: '40px', fontSize: '0.875rem' },
    md: { width: '48px', height: '48px', fontSize: '1rem' },
    lg: { width: '56px', height: '56px', fontSize: '1.125rem' },
    xl: { width: '64px', height: '64px', fontSize: '1.25rem' },
  };

  const currentSize = sizeMap[customSize as keyof typeof sizeMap];

  return {
    width: currentSize.width,
    height: currentSize.height,

    '& .MuiOutlinedInput-root': {
      width: currentSize.width,
      height: currentSize.height,
      fontSize: currentSize.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      borderRadius: theme.spacing(1),

      ...(glass && {
        backgroundColor: alpha(theme.palette.background.paper, 0.1),
        backdropFilter: 'blur(20px)',
        '& fieldset': {
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        },
      }),

      ...(gradient && {
        '&.Mui-focused fieldset': {
          background: `linear-gradient(135deg, ${colorPalette.main}, ${colorPalette.light})`,
          borderWidth: '2px',
        },
      }),

      '& input': {
        textAlign: 'center',
        padding: 0,
        fontWeight: 'inherit',
      },

      '&:hover fieldset': {
        borderColor: colorPalette.main,
      },

      '&.Mui-focused fieldset': {
        borderColor: colorPalette.main,
        borderWidth: '2px',
      },
    },
  };
});

export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      variant = 'numeric',
      color = 'primary',
      size = 'md',
      length = 6,
      value = '',
      onChange,
      onComplete,
      glass = false,
      gradient = false,
      autoFocus = false,
      error = false,
      disabled = false,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const { spacing } = useDensitySpacing();
    const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(globalThis.HTMLInputElement | null)[]>([]);

    useEffect(() => {
      const newDigits = value.split('').slice(0, length);
      while (newDigits.length < length) {
        newDigits.push('');
      }
      setDigits(newDigits);
    }, [value, length]);

    const handleInputChange = (index: number, inputValue: string) => {
      if (variant === 'numeric' && !/^\d*$/.test(inputValue)) return;
      if (variant === 'alphanumeric' && !/^[a-zA-Z0-9]*$/.test(inputValue)) return;

      const newDigits = [...digits];
      newDigits[index] = inputValue.slice(-1); // Take only the last character
      setDigits(newDigits);

      const newValue = newDigits.join('');
      onChange?.(newValue);

      if (inputValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newValue.length === length) {
        onComplete?.(newValue);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, length);

      if (variant === 'numeric' && !/^\d+$/.test(pastedData)) return;
      if (variant === 'alphanumeric' && !/^[a-zA-Z0-9]+$/.test(pastedData)) return;

      const newDigits = pastedData.split('');
      while (newDigits.length < length) {
        newDigits.push('');
      }
      setDigits(newDigits.slice(0, length));
      onChange?.(pastedData);

      if (pastedData.length === length) {
        onComplete?.(pastedData);
      }
    };

    return (
      <Box
        ref={ref}
        data-testid={dataTestId}
        sx={{
          display: 'flex',
          // Base: 4px gap between slots, scales with density
          gap: spacing(1),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...props}
      >
        {digits.map((digit, index) => (
          <StyledOTPInput
            key={index}
            ref={(el: HTMLDivElement | null) => {
              inputRefs.current[index] = el?.querySelector('input') || null;
            }}
            customColor={color}
            customSize={size}
            glass={glass}
            gradient={gradient}
            value={variant === 'masked' ? (digit ? '•' : '') : digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            autoFocus={autoFocus && index === 0}
            error={error}
            disabled={disabled}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center' },
              'data-testid': dataTestId ? `${dataTestId}-slot-${index}` : undefined,
            }}
          />
        ))}
      </Box>
    );
  },
);

InputOTP.displayName = 'InputOTP';
