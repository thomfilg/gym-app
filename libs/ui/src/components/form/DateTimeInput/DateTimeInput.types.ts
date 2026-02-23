import type { InputProps } from '../Input/Input.types';

export interface DateTimeInputProps extends Omit<InputProps, 'mask' | 'endAdornment'> {
  /** Input mode: datetime, date, or time */
  mode?: 'datetime' | 'date' | 'time';
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Controlled calendar open state */
  calendarOpen?: boolean;
  /** Callback when calendar open state changes */
  onCalendarOpenChange?: (open: boolean) => void;
  /** Callback when datetime selection is complete (date + time selected in datetime mode) */
  onComplete?: () => void;
}
