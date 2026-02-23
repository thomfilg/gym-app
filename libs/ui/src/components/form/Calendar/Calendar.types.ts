export type SelectionMode = 'single' | 'range';

export interface DateRange {
  start?: Date | null;
  end?: Date | null;
}

export interface DayRenderArgs {
  date: Date;
  inCurrentMonth: boolean;
  selected: boolean;
  inRange: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
  disabled: boolean;
  today: boolean;
  hovered?: boolean;
}

export interface HeaderRenderContext {
  month: number;
  year: number;
}

export interface CalendarProps {
  // Mode
  selectionMode?: SelectionMode; // default: 'single'

  // Controlled values
  value?: Date | null; // single mode
  range?: DateRange; // range mode
  onChange?: (value: Date | null) => void; // single
  onRangeChange?: (range: Required<DateRange>) => void; // fired when both ends chosen
  onIntermediateRangeChange?: (partial: DateRange) => void; // while hovering/choosing

  // Display
  numberOfMonths?: number; // default: 1 in single, 2 in range
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // default: locale
  locale?: string; // e.g. 'en-US'
  showOutsideDays?: boolean; // days from prev/next month
  showWeekNumbers?: boolean;

  // Constraints
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean; // business logic disable
  minRangeLength?: number; // nights, default 1
  maxRangeLength?: number;

  // Behavior
  allowSameDayRange?: boolean; // default: true
  closeOnSelect?: boolean; // for popover host; default: single=true, range=when both set
  fixedRange?: boolean; // pick start then auto-calc end by minRangeLength
  autoFocus?: boolean;

  // Rendering hooks
  renderDay?: (args: DayRenderArgs) => React.ReactNode;
  renderHeader?: (ctx: HeaderRenderContext) => React.ReactNode;
  renderFooter?: React.ReactNode;

  // Styling hooks
  className?: string;
  dayClassName?: (args: DayRenderArgs) => string;
}

export interface MonthMatrixDay {
  date: Date;
  inCurrentMonth: boolean;
  key: string;
}

export interface MonthMatrix {
  weeks: MonthMatrixDay[][];
  month: number;
  year: number;
}

export interface CalendarInternalState {
  focusedDate: Date;
  hoveredDate: Date | null;
}