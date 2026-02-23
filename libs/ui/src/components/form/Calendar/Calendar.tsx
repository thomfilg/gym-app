import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { CalendarProps, DayRenderArgs, MonthMatrix, MonthMatrixDay } from './Calendar.types';

// Date utility functions
const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(12, 0, 0, 0);
  return normalized;
};

const isSameDay = (date1: Date, date2: Date): boolean => date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();

const isBetween = (date: Date, start: Date, end: Date): boolean => {
  const normalized = normalizeDate(date);
  const normalizedStart = normalizeDate(start);
  const normalizedEnd = normalizeDate(end);
  return normalized >= normalizedStart && normalized <= normalizedEnd;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const startOfWeek = (date: Date, firstDayOfWeek: number = 0): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  result.setDate(result.getDate() - diff);
  return result;
};


const endOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0);

// Generate month matrix for calendar grid
const generateMonthMatrix = (month: number, year: number, firstDayOfWeek: number = 0): MonthMatrix => {
  const firstDay = new Date(year, month, 1);
  const lastDay = endOfMonth(firstDay);
  const startDate = startOfWeek(firstDay, firstDayOfWeek);

  const weeks: MonthMatrixDay[][] = [];
  let currentWeek: MonthMatrixDay[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) { // 6 weeks max
    const inCurrentMonth = currentDate.getMonth() === month;

    currentWeek.push({
      date: new Date(currentDate),
      inCurrentMonth,
      key: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
    });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);

    // Stop if we've completed a week and are past the current month
    if (currentWeek.length === 0 && currentDate > lastDay) {
      break;
    }
  }

  return { weeks, month, year };
};

// Get weekday names based on locale
const getWeekdayNames = (locale: string = 'en-US', firstDayOfWeek: number = 0): string[] => {
  const baseDate = new Date(2025, 0, 5); // A Sunday
  const weekdays: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(baseDate, (i + firstDayOfWeek) % 7);
    weekdays.push(date.toLocaleDateString(locale, { weekday: 'narrow' }));
  }

  return weekdays;
};

// Get month name
const getMonthName = (month: number, year: number, locale: string = 'en-US'): string => {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
};

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(({
  selectionMode = 'single',
  value = null,
  range = { start: null, end: null },
  onChange,
  onRangeChange,
  onIntermediateRangeChange,
  numberOfMonths,
  firstDayOfWeek = 0,
  locale = 'en-US',
  showOutsideDays = true,
  // showWeekNumbers,  // TODO: Implement week numbers display
  minDate,
  maxDate,
  isDateDisabled,
  minRangeLength = 1,
  maxRangeLength,
  allowSameDayRange = true,
  // closeOnSelect,  // TODO: Implement close on select behavior
  // fixedRange,  // TODO: Implement fixed range behavior
  autoFocus = false,
  renderDay,
  renderHeader,
  renderFooter,
  className,
  dayClassName,
}, ref) => {
  const { spacing, spacingPx } = useDensitySpacing();

  // Default numberOfMonths based on mode
  const defaultMonths = selectionMode === 'range' ? 2 : 1;
  const monthsToShow = numberOfMonths ?? defaultMonths;

  // Internal state
  const today = useMemo(() => normalizeDate(new Date()), []);
  const [focusedDate, setFocusedDate] = useState<Date>(() => {
    if (selectionMode === 'single' && value) return normalizeDate(value);
    if (selectionMode === 'range' && range.start) return normalizeDate(range.start);
    return today;
  });

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() =>
    new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1)
  );

  const gridRef = useRef<HTMLDivElement>(null);

  // Auto focus management
  useEffect(() => {
    if (autoFocus && gridRef.current) {
      gridRef.current.focus();
    }
  }, [autoFocus]);

  // Generate matrices for all visible months
  const monthMatrices = useMemo(() => {
    const matrices: MonthMatrix[] = [];
    let currentDate = new Date(currentMonth);

    for (let i = 0; i < monthsToShow; i++) {
      matrices.push(generateMonthMatrix(
        currentDate.getMonth(),
        currentDate.getFullYear(),
        firstDayOfWeek
      ));
      currentDate = addMonths(currentDate, 1);
    }

    return matrices;
  }, [currentMonth, monthsToShow, firstDayOfWeek]);

  // Weekday names
  const weekdayNames = useMemo(() =>
    getWeekdayNames(locale, firstDayOfWeek),
  [locale, firstDayOfWeek]
  );

  // Check if date is disabled
  const isDisabled = useCallback((date: Date): boolean => {
    const normalizedDate = normalizeDate(date);
    if (minDate && normalizedDate < normalizeDate(minDate)) return true;
    if (maxDate && normalizedDate > normalizeDate(maxDate)) return true;
    if (isDateDisabled && isDateDisabled(date)) return true;
    return false;
  }, [minDate, maxDate, isDateDisabled]);

  // Check if date is selected
  const isSelected = useCallback((date: Date): boolean => {
    if (selectionMode === 'single') {
      return value ? isSameDay(date, value) : false;
    } else {
      const { start, end } = range;
      if (start && isSameDay(date, start)) return true;
      if (end && isSameDay(date, end)) return true;
      return false;
    }
  }, [selectionMode, value, range]);

  // Check if date is in range
  const isInRange = useCallback((date: Date): boolean => {
    if (selectionMode !== 'range') return false;

    const { start, end } = range;
    if (!start || !end) {
      // If we have a start date and we're hovering, show preview range
      if (start && hoveredDate && !isDisabled(hoveredDate)) {
        const rangeStart = start < hoveredDate ? start : hoveredDate;
        const rangeEnd = start < hoveredDate ? hoveredDate : start;
        return isBetween(date, rangeStart, rangeEnd) && !isSameDay(date, rangeStart) && !isSameDay(date, rangeEnd);
      }
      return false;
    }

    return isBetween(date, start, end) && !isSameDay(date, start) && !isSameDay(date, end);
  }, [selectionMode, range, hoveredDate, isDisabled]);

  // Navigation handlers
  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);

  // Date selection handler
  const handleDateClick = useCallback((date: Date) => {
    if (isDisabled(date)) return;

    const normalizedDate = normalizeDate(date);
    setFocusedDate(normalizedDate);

    if (selectionMode === 'single') {
      onChange?.(normalizedDate);
    } else {
      // Range mode
      const { start, end } = range;

      if (!start || (start && end)) {
        // First click or starting new selection
        onIntermediateRangeChange?.({ start: normalizedDate, end: null });
      } else if (start && !end) {
        // Second click - complete the range
        let rangeStart = start;
        let rangeEnd = normalizedDate;

        // Swap if end is before start
        if (rangeEnd < rangeStart) {
          [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
        }

        // Check range length constraints
        const daysDiff = Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24));

        if (!allowSameDayRange && isSameDay(rangeStart, rangeEnd)) {
          return; // Don't allow same day range
        }

        if (minRangeLength && daysDiff < minRangeLength - 1) {
          return; // Range too short
        }

        if (maxRangeLength && daysDiff > maxRangeLength - 1) {
          return; // Range too long
        }

        onRangeChange?.({ start: rangeStart, end: rangeEnd });
        onIntermediateRangeChange?.({ start: rangeStart, end: rangeEnd });
      }
    }
  }, [
    selectionMode,
    range,
    onChange,
    onRangeChange,
    onIntermediateRangeChange,
    isDisabled,
    allowSameDayRange,
    minRangeLength,
    maxRangeLength
  ]);

  // Mouse enter handler for range preview
  const handleDateMouseEnter = useCallback((date: Date) => {
    if (selectionMode === 'range' && range.start && !range.end && !isDisabled(date)) {
      setHoveredDate(normalizeDate(date));
    }
  }, [selectionMode, range, isDisabled]);

  // Mouse leave handler
  const handleDateMouseLeave = useCallback(() => {
    setHoveredDate(null);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key } = event;
    let newFocusedDate = new Date(focusedDate);
    let preventDefault = true;

    switch (key) {
      case 'ArrowLeft':
        newFocusedDate = addDays(focusedDate, -1);
        break;
      case 'ArrowRight':
        newFocusedDate = addDays(focusedDate, 1);
        break;
      case 'ArrowUp':
        newFocusedDate = addDays(focusedDate, -7);
        break;
      case 'ArrowDown':
        newFocusedDate = addDays(focusedDate, 7);
        break;
      case 'Home':
        newFocusedDate = startOfWeek(focusedDate, firstDayOfWeek);
        break;
      case 'End':
        newFocusedDate = addDays(startOfWeek(focusedDate, firstDayOfWeek), 6);
        break;
      case 'PageUp':
        newFocusedDate = addMonths(focusedDate, event.shiftKey ? -12 : -1);
        break;
      case 'PageDown':
        newFocusedDate = addMonths(focusedDate, event.shiftKey ? 12 : 1);
        break;
      case 'Enter':
      case ' ':
        handleDateClick(focusedDate);
        break;
      case 'Escape':
        setHoveredDate(null);
        break;
      default:
        preventDefault = false;
    }

    if (preventDefault) {
      event.preventDefault();

      if (key !== 'Enter' && key !== ' ' && key !== 'Escape') {
        setFocusedDate(normalizeDate(newFocusedDate));

        // Update current month if focused date moves to different month
        const newMonth = new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1);
        if (newMonth.getTime() !== currentMonth.getTime()) {
          setCurrentMonth(newMonth);
        }
      }
    }
  }, [focusedDate, firstDayOfWeek, handleDateClick, currentMonth]);

  // Render individual day cell
  const renderDayCell = useCallback((day: MonthMatrixDay) => {
    const { date, inCurrentMonth } = day;

    const dayArgs: DayRenderArgs = {
      date,
      inCurrentMonth,
      selected: isSelected(date),
      inRange: isInRange(date),
      rangeStart: selectionMode === 'range' && range.start ? isSameDay(date, range.start) : false,
      rangeEnd: selectionMode === 'range' && range.end ? isSameDay(date, range.end) : false,
      disabled: isDisabled(date),
      today: isSameDay(date, today),
      hovered: hoveredDate ? isSameDay(date, hoveredDate) : false,
    };

    if (renderDay) {
      return renderDay(dayArgs);
    }

    const isCurrentFocused = isSameDay(date, focusedDate);
    const baseClasses = ['calendar-day'];

    if (dayArgs.selected) baseClasses.push('selected');
    if (dayArgs.inRange) baseClasses.push('in-range');
    if (dayArgs.rangeStart) baseClasses.push('range-start');
    if (dayArgs.rangeEnd) baseClasses.push('range-end');
    if (dayArgs.disabled) baseClasses.push('disabled');
    if (dayArgs.today) baseClasses.push('today');
    if (!inCurrentMonth) baseClasses.push('outside');
    if (dayArgs.hovered) baseClasses.push('hovered');
    if (isCurrentFocused) baseClasses.push('focused');

    const customClassName = dayClassName?.(dayArgs);
    if (customClassName) baseClasses.push(customClassName);

    // Base: 40px cell size, scales with density
    const cellSize = spacingPx(10);

    return (
      <Box
        component="button"
        role="gridcell"
        tabIndex={isCurrentFocused ? 0 : -1}
        aria-selected={dayArgs.selected}
        aria-disabled={dayArgs.disabled}
        aria-current={dayArgs.today ? 'date' : undefined}
        className={baseClasses.join(' ')}
        data-testid={`calendar-date-${date.getDate()}`}
        onClick={() => handleDateClick(date)}
        onMouseEnter={() => handleDateMouseEnter(date)}
        onMouseLeave={handleDateMouseLeave}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: cellSize,
          height: cellSize,
          border: 'none',
          borderRadius: 1,
          cursor: dayArgs.disabled ? 'not-allowed' : 'pointer',
          backgroundColor: dayArgs.selected || dayArgs.rangeStart || dayArgs.rangeEnd
            ? 'primary.main'
            : dayArgs.inRange || dayArgs.hovered
              ? 'primary.light'
              : 'transparent',
          color: dayArgs.selected || dayArgs.rangeStart || dayArgs.rangeEnd
            ? 'primary.contrastText'
            : dayArgs.disabled
              ? 'text.disabled'
              : !inCurrentMonth && !showOutsideDays
                ? 'transparent'
                : 'text.primary',
          opacity: !inCurrentMonth && showOutsideDays ? 0.5 : 1,
          fontWeight: dayArgs.today ? 'bold' : 'normal',
          '&:hover': {
            backgroundColor: !dayArgs.disabled ?
              (dayArgs.selected ? 'primary.dark' : 'action.hover') : undefined,
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 1,
          },
        }}
      >
        {dayArgs.selected && <Box component="span" data-testid="calendar-selected-date" sx={{ display: 'none' }} />}
        {dayArgs.today && <Box component="span" data-testid="calendar-today" sx={{ display: 'none' }} />}
        {(!inCurrentMonth && !showOutsideDays) ? '' : date.getDate()}
      </Box>
    );
  }, [
    isSelected,
    isInRange,
    isDisabled,
    selectionMode,
    range,
    today,
    hoveredDate,
    focusedDate,
    renderDay,
    dayClassName,
    showOutsideDays,
    handleDateClick,
    handleDateMouseEnter,
    handleDateMouseLeave,
  ]);

  // Render month grid
  const renderMonth = useCallback((matrix: MonthMatrix, monthIndex: number) => {
    const monthName = getMonthName(matrix.month, matrix.year, locale);
    // Base: 32px weekday header height, scales with density
    const weekdayHeight = spacingPx(8);

    return (
      <Box key={`month-${monthIndex}`} sx={{ minWidth: 280 }}>
        {/* Header - Base: 8px margin-bottom, scales with density */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: spacing(2) }} data-testid="calendar-header">
          {monthIndex === 0 && (
            <IconButton onClick={goToPreviousMonth} size="small" data-testid="calendar-prev-month">
              <ChevronLeft />
            </IconButton>
          )}

          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
            {renderHeader ? renderHeader({ month: matrix.month, year: matrix.year }) : monthName}
          </Typography>

          {monthIndex === monthsToShow - 1 && (
            <IconButton onClick={goToNextMonth} size="small" data-testid="calendar-next-month">
              <ChevronRight />
            </IconButton>
          )}

          {monthIndex !== 0 && monthIndex !== monthsToShow - 1 && (
            <Box sx={{ width: 32 }} /> // Spacer for alignment
          )}
        </Box>

        {/* Weekday headers - Base: 4px margin-bottom, scales with density */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: spacing(0.5), mb: spacing(1) }}>
          {weekdayNames.map((weekday, index) => (
            <Box
              key={`weekday-${index}`}
              role="columnheader"
              data-testid={`calendar-weekday-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: weekdayHeight,
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: 'text.secondary',
              }}
            >
              {weekday}
            </Box>
          ))}
        </Box>

        {/* Calendar grid - Base: 2px gap, scales with density */}
        <Box
          role="grid"
          aria-labelledby={`month-${monthIndex}`}
          data-testid="calendar-grid"
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: spacing(0.5) }}
        >
          {matrix.weeks.map((week) =>
            week.map((day) => (
              <React.Fragment key={day.key}>
                {renderDayCell(day)}
              </React.Fragment>
            ))
          )}
        </Box>
      </Box>
    );
  }, [
    locale,
    monthsToShow,
    renderHeader,
    weekdayNames,
    goToPreviousMonth,
    goToNextMonth,
    renderDayCell,
    spacing,
    spacingPx,
  ]);

  return (
    <Paper
      ref={ref}
      className={className}
      role="application"
      aria-label="Calendar"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-testid="calendar-container"
      sx={{
        // Base: 12px padding, scales with density
        p: spacingPx(3),
        display: 'flex',
        flexDirection: monthsToShow > 1 ? 'row' : 'column',
        // Base: 12px gap, scales with density
        gap: spacingPx(3),
        outline: 'none',
        '&:focus-within': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
    >
      {/* Base: 12px gap between months, scales with density */}
      <Box ref={gridRef} sx={{ display: 'flex', gap: spacingPx(3), flexWrap: 'wrap' }}>
        {monthMatrices.map((matrix, index) => renderMonth(matrix, index))}
      </Box>

      {renderFooter && (
        // Base: 8px margin/padding, scales with density
        <Box sx={{ mt: spacingPx(2), pt: spacingPx(2), borderTop: 1, borderColor: 'divider' }}>
          {renderFooter}
        </Box>
      )}
    </Paper>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;