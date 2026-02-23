
export interface InputOTPProps {
  /**
   * The variant of the OTP input
   */
  variant?: 'numeric' | 'alphanumeric' | 'masked';

  /**
   * The color theme of the OTP input
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

  /**
   * The size of the OTP input
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Number of OTP digits
   */
  length?: number;

  /**
   * Current value
   */
  value?: string;

  /**
   * Called when value changes
   */
  onChange?: (value: string) => void;

  /**
   * Called when OTP is complete
   */
  onComplete?: (value: string) => void;

  /**
   * Whether the input should have glass morphism effect
   */
  glass?: boolean;

  /**
   * Whether the input should have gradient effects
   */
  gradient?: boolean;

  /**
   * Whether to auto-focus first input
   */
  autoFocus?: boolean;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Test ID for automated testing
   * Container will have this ID, and individual slots will have {dataTestId}-slot-{index}
   */
  dataTestId?: string;
}