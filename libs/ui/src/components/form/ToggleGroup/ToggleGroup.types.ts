import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import type React from 'react';

export interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ToggleGroupProps extends Omit<ToggleButtonGroupProps, 'color' | 'size'> {
  /**
   * The variant of the toggle group
   */
  variant?: 'single' | 'multiple' | 'exclusive';

  /**
   * The color theme of the toggle group
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

  /**
   * The size of the toggle group
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Array of toggle options
   */
  options: ToggleOption[];

  /**
   * Whether the toggle group should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the toggle group should have glass morphism effect
   */
  glass?: boolean;

  /**
   * Whether the toggle group should have gradient effects
   */
  gradient?: boolean;

  /**
   * Custom data-testid attribute for the toggle group container
   * Individual toggle items will receive testIds in the format: `${dataTestId}-item-${option.value}`
   * @default 'toggle-group'
   */
  dataTestId?: string;
}