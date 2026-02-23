import type { CountryCode } from 'libphonenumber-js';

export interface PhoneInputProps {
  variant?: 'glass' | 'outlined' | 'filled';
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  defaultValue?: string;
  countryCode?: CountryCode;
  floating?: boolean;
  onChange?: (value: string, isValid: boolean, countryCode?: CountryCode) => void;
  helper?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
}

export interface CountryData {
  code: CountryCode;
  name: string;
  dial: string;
  flag: string;
}
