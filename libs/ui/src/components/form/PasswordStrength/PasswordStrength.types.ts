export interface PasswordRequirements {
  minLength?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  special?: boolean;
}

export interface PasswordStrengthProps {
  value: string;
  showRequirements?: boolean;
  requirements?: PasswordRequirements;
  showStrengthLabel?: boolean;
  showSuggestions?: boolean;
  variant?: 'linear' | 'circular' | 'steps';
  animated?: boolean;
  'data-testid'?: string;
}
