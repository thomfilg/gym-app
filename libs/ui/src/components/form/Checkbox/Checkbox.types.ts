import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import type { ChangeEvent, FocusEventHandler,MouseEventHandler } from 'react';

export type CheckboxVariant = 'default' | 'rounded' | 'toggle';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'variant'> {
  variant?: CheckboxVariant;
  label?: string;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
  pulse?: boolean;
  'data-testid'?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onChange?: (event: ChangeEvent<HTMLElement>, checked: boolean) => void;
}
