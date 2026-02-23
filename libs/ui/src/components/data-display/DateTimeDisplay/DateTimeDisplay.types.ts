import type { SxProps, Theme } from '@mui/material/styles';

export interface DateTimeDisplayProps {
  /**
   * The date to display. Can be a Date object or ISO string.
   * Time is auto-detected: if time is midnight (00:00:00), only date is shown.
   */
  date: Date | string;
  /**
   * Date format for the date line
   * @default 'short' - "Dec 16, 2024"
   */
  dateFormat?: 'short' | 'long' | 'numeric';
  /**
   * Time format
   * @default '12h' - "3:45 PM"
   */
  timeFormat?: '12h' | '24h';
  /**
   * Whether to show timezone abbreviation in time
   * @default false
   */
  showTimezone?: boolean;
  /**
   * Size variant
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show a tooltip with full date/time
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Custom tooltip content
   */
  tooltipContent?: React.ReactNode;
  /**
   * Additional styles
   */
  sx?: SxProps<Theme>;
  /**
   * Test ID for testing
   */
  dataTestId?: string;
}
