import type { SelectChangeEvent as MuiSelectChangeEvent, SelectProps as MuiSelectProps, SelectVariants } from '@mui/material/Select';

// Re-export SelectChangeEvent for use in consumer apps
export type SelectChangeEvent<T = string | number> = MuiSelectChangeEvent<T>;

export type SelectVariant = SelectVariants | 'default' | 'glass' | 'gradient' | 'minimal';

export interface SelectOption {
  value: string | number;
  label: string;
  /** Optional description shown below the label */
  description?: string;
  disabled?: boolean;
}

// Base props shared between single and multiple select
interface SelectBaseProps extends Omit<MuiSelectProps, 'variant' | 'size' | 'multiple' | 'value' | 'onChange'> {
  /**
   * Visual variant of the select component
   * @default 'default'
   */
  variant?: SelectVariant;
  /**
   * Array of options to display in the select
   */
  options: SelectOption[];
  /**
   * Label for the select field
   */
  label?: string;
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  /**
   * Whether the select should take full width
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Size of the select component
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Whether to show a glow effect
   * @default false
   */
  glow?: boolean;
  /**
   * Whether to show a pulse animation
   * @default false
   */
  pulse?: boolean;
  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string;
}

// Single select props (default behavior)
export interface SingleSelectProps extends SelectBaseProps {
  /**
   * Enable multiple selection mode
   * @default false
   */
  multiple?: false;
  /**
   * Current selected value (single)
   */
  value?: string | number;
  /**
   * Callback when selection changes (single)
   */
  onChange?: (event: MuiSelectChangeEvent<string | number>, child: React.ReactNode) => void;
}

// Multiple select props
export interface MultipleSelectProps extends SelectBaseProps {
  /**
   * Enable multiple selection mode
   */
  multiple: true;
  /**
   * Current selected values (array)
   */
  value?: (string | number)[];
  /**
   * Callback when selection changes (multiple)
   */
  onChange?: (event: MuiSelectChangeEvent<(string | number)[]>, child: React.ReactNode) => void;
  /**
   * Whether to render selected values as chips
   * @default true
   */
  renderChips?: boolean;
  /**
   * Chip size for multi-select
   * @default 'small'
   */
  chipSize?: 'small' | 'medium';
  /**
   * Chip variant for multi-select
   * @default 'filled'
   */
  chipVariant?: 'filled' | 'outlined';
}

// Union type for SelectProps with discriminated union pattern
export type SelectProps = SingleSelectProps | MultipleSelectProps;
