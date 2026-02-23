import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import type { SelectVariants } from '@mui/material/Select';
import MuiSelect from '@mui/material/Select';
import { alpha, keyframes, styled } from '@mui/material/styles';
import React from 'react';

import type { MultipleSelectProps, SelectProps } from './Select.types';

/** Valid MUI Select variants for runtime checking */
const VALID_MUI_VARIANTS: SelectVariants[] = ['filled', 'outlined', 'standard'];

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 10px currentColor;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 0;
  }
`;

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== 'customVariant' && prop !== 'glow' && prop !== 'pulse',
})<{
  customVariant?: SelectProps['variant'];
  glow?: boolean;
  pulse?: boolean;
}>(({ theme, customVariant, glow, pulse }) => ({
  position: 'relative',

  // Glow effect
  ...(glow && {
    '& .MuiOutlinedInput-root': {
      boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
      '&.Mui-focused': {
        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
      },
    },
  }),

  // Pulse animation
  ...(pulse && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '0',
      right: '0',
      height: '56px',
      transform: 'translateY(-50%)',
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.primary.main,
      opacity: 0.3,
      animation: `${pulseAnimation} 2s infinite`,
      pointerEvents: 'none',
      zIndex: -1,
    },
  }),

  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease',

    // Glass variant
    ...(customVariant === 'glass' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      '& fieldset': {
        border: 'none',
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.15),
        borderColor: alpha(theme.palette.primary.main, 0.3),
      },
      '&.Mui-focused': {
        backgroundColor: alpha(theme.palette.background.paper, 0.2),
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
      },
    }),

    // Gradient variant
    ...(customVariant === 'gradient' && {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
      border: '2px solid transparent',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      position: 'relative',
      '& fieldset': {
        border: 'none',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        padding: '2px',
        zIndex: -1,
      },
      '&:hover': {
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
      },
      '&.Mui-focused': {
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
        '&::before': {
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        },
      },
    }),

    // Default styles
    ...((customVariant === 'default' || !customVariant) && {
      '& fieldset': {
        borderColor: alpha(theme.palette.text.primary, 0.35),
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      '&.Mui-error fieldset': {
        borderColor: theme.palette.error.main,
      },
    }),
  },

  // Minimal variant - standard input without underline (must be at root level, not inside .MuiOutlinedInput-root)
  ...(customVariant === 'minimal' && {
    '& .MuiInput-root': {
      '&::before, &::after, &:hover:not(.Mui-disabled)::before': {
        borderBottom: 'none',
      },
    },
  }),
}));

const StyledSelect = styled(MuiSelect)({});

// Size mapping to match Input component sizes
// Explicit heights ensure Input and Select align when placed side-by-side with labels
const sizeMap = {
  xs: { muiSize: 'small' as const, sx: { height: '32px', '& .MuiSelect-select': { padding: '4px 14px' } } },
  sm: { muiSize: 'small' as const, sx: { height: '40px', '& .MuiSelect-select': { padding: '8px 14px' } } },
  md: { muiSize: 'medium' as const, sx: { height: '56px', '& .MuiSelect-select': { padding: '12px 14px' } } },
  lg: { muiSize: 'medium' as const, sx: { height: '64px', '& .MuiSelect-select': { padding: '16px 14px' } } },
  xl: { muiSize: 'medium' as const, sx: { height: '72px', '& .MuiSelect-select': { padding: '20px 14px' } } },
};

// Type guard for multiple select props
function isMultipleSelect(props: SelectProps): props is MultipleSelectProps {
  return props.multiple === true;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
    const {
      variant = 'default',
      options,
      label,
      helperText,
      fullWidth = true,
      size = 'md',
      error,
      placeholder,
      glow = false,
      pulse = false,
      'data-testid': dataTestId,
      value,
      multiple,
      onChange,
      ...restProps
    } = props;

    const labelId = React.useId();
    const helperTextId = React.useId();
    const selectId = React.useId();

    // Get size configuration
    const sizeConfig = sizeMap[size];

    // Extract sx from props to merge with size sx
    const { sx: propsSx, ...muiSelectProps } = restProps;

    // Handle multiple select specific props
    const isMultiple = isMultipleSelect(props);
    const renderChips = isMultiple ? (props.renderChips ?? true) : false;
    const chipSize = isMultiple ? (props.chipSize ?? 'small') : 'small';
    const chipVariant = isMultiple ? (props.chipVariant ?? 'filled') : 'filled';

    // Ensure value is properly handled for MUI Select
    const selectValue = React.useMemo(() => {
      if (isMultiple) {
        return Array.isArray(value) ? value : [];
      }
      return value !== undefined ? value : '';
    }, [value, isMultiple]);

    // Determine if label should shrink: when there's a non-empty value,
    // OR when placeholder is displayed (both single and multi-select with empty value)
    // OR when there's an option for empty string (like "All Sections" for value="")
    const shouldShrinkLabel = React.useMemo(() => {
      if (isMultiple) {
        // In multi-select: shrink if has values OR if placeholder is shown (empty state)
        const hasValues = Array.isArray(selectValue) && selectValue.length > 0;
        const showingPlaceholder = !!placeholder && (!selectValue || (Array.isArray(selectValue) && selectValue.length === 0));
        return hasValues || showingPlaceholder;
      }
      // If value is truthy (non-empty string), shrink
      if (selectValue) return true;
      // If value is empty string, check if there's an option for it with a label
      if (selectValue === '') {
        const emptyOption = options.find((opt) => opt.value === '');
        if (emptyOption && emptyOption.label) return true;
      }
      // For single select: also shrink if placeholder is shown (empty value with placeholder)
      if (placeholder && !selectValue) return true;
      return false;
    }, [selectValue, options, isMultiple, placeholder]);

    // Get label for a value
    const getLabelForValue = React.useCallback(
      (val: string | number): string => {
        const option = options.find((opt) => opt.value === val);
        return option?.label ?? String(val);
      },
      [options],
    );

    // Render value for multiple select with chips
    const renderMultipleValue = React.useCallback(
      (selected: unknown) => {
        const selectedArray = selected as (string | number)[];
        if (!selectedArray || selectedArray.length === 0) {
          return placeholder ? <span style={{ opacity: 0.5 }}>{placeholder}</span> : null;
        }

        if (renderChips) {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedArray.map((val) => (
                <Chip
                  key={val}
                  label={getLabelForValue(val)}
                  size={chipSize}
                  variant={chipVariant}
                  sx={{ height: chipSize === 'small' ? 24 : 32 }}
                />
              ))}
            </Box>
          );
        }

        // Default: comma-separated labels
        return selectedArray.map(getLabelForValue).join(', ');
      },
      [placeholder, renderChips, getLabelForValue, chipSize, chipVariant],
    );

    return (
      <StyledFormControl
        fullWidth={fullWidth}
        size={sizeConfig.muiSize}
        error={error}
        customVariant={variant}
        glow={glow}
        pulse={pulse}
        ref={ref}
        data-testid={dataTestId}
      >
        {label && (
          <InputLabel id={labelId} htmlFor={selectId} shrink={shouldShrinkLabel}>
            {label}
          </InputLabel>
        )}
        <StyledSelect
          id={selectId}
          labelId={label ? labelId : undefined}
          label={label}
          displayEmpty={!!placeholder || shouldShrinkLabel}
          notched={shouldShrinkLabel}
          aria-describedby={helperText ? helperTextId : undefined}
          data-testid={dataTestId ? `${dataTestId}-select` : 'select'}
          value={selectValue}
          multiple={isMultiple}
          variant={variant === 'minimal' ? 'standard' : VALID_MUI_VARIANTS.includes(variant as SelectVariants) ? (variant as SelectVariants) : 'outlined'}
          onChange={onChange as React.ComponentProps<typeof MuiSelect>['onChange']}
          renderValue={isMultiple ? renderMultipleValue : undefined}
          sx={{
            ...sizeConfig.sx,
            // Adjust height for multi-select with chips
            ...(isMultiple && renderChips && {
              '& .MuiSelect-select': {
                minHeight: 'auto',
                paddingTop: '8px',
                paddingBottom: '8px',
              },
            }),
            ...propsSx,
          }}
          {...muiSelectProps}
        >
          {placeholder && !isMultiple && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              data-testid={
                dataTestId ? `${dataTestId}-option-${option.value}` : `option-${option.value}`
              }
            >
              {isMultiple && (
                <Checkbox
                  checked={Array.isArray(selectValue) && selectValue.includes(option.value)}
                  size="small"
                />
              )}
              <ListItemText
                primary={option.label}
                secondary={option.description}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'text.secondary',
                }}
              />
            </MenuItem>
          ))}
        </StyledSelect>
        {helperText && (
          <FormHelperText id={helperTextId} error={error}>
            {helperText}
          </FormHelperText>
        )}
      </StyledFormControl>
    );
  },
);

Select.displayName = 'Select';
