import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { forwardRef, useMemo } from 'react';

import type { DateTimeDisplayProps } from './DateTimeDisplay.types';

/**
 * Format a date for display
 */
function formatDatePart(date: Date, format: 'short' | 'long' | 'numeric'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'numeric' ? '2-digit' : format === 'short' ? 'short' : 'long',
    day: format === 'numeric' ? '2-digit' : 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

/**
 * Format time for display
 */
function formatTimePart(
  date: Date,
  timeFormat: '12h' | '24h',
  showTimezone: boolean,
): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: timeFormat === '12h',
    ...(showTimezone && { timeZoneName: 'short' }),
  };
  return date.toLocaleTimeString(undefined, options);
}

/**
 * Get font sizes based on size prop
 */
function getFontSizes(size: 'small' | 'medium' | 'large') {
  switch (size) {
    case 'small':
      return { date: '0.75rem', time: '0.65rem' };
    case 'large':
      return { date: '1rem', time: '0.875rem' };
    case 'medium':
    default:
      return { date: '0.875rem', time: '0.75rem' };
  }
}

/**
 * DateTimeDisplay component - displays date and time in a stacked format
 * with date on one line and time on another.
 */
export const DateTimeDisplay = forwardRef<HTMLSpanElement, DateTimeDisplayProps>(
  (
    {
      date,
      dateFormat = 'short',
      timeFormat = '12h',
      showTimezone = false,
      size = 'medium',
      showTooltip = true,
      tooltipContent,
      sx,
      dataTestId,
    },
    ref,
  ) => {
    const dateObj = useMemo(() => {
      if (!date) return null;
      return date instanceof Date ? date : new Date(date);
    }, [date]);

    // Auto-detect if time is midnight (no meaningful time)
    const hasTime = useMemo(() => {
      if (!dateObj || isNaN(dateObj.getTime())) return false;
      // If time is midnight (ignoring milliseconds), assume no time was provided
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const seconds = dateObj.getSeconds();
      // Check if time is midnight (00:00:00) - ignore milliseconds
      const isMidnight = hours === 0 && minutes === 0 && seconds === 0;
      return !isMidnight;
    }, [dateObj]);


    const formattedDate = useMemo(() => {
      if (!dateObj || isNaN(dateObj.getTime())) return null;
      return formatDatePart(dateObj, dateFormat);
    }, [dateObj, dateFormat]);

    const formattedTime = useMemo(() => {
      if (!dateObj || isNaN(dateObj.getTime()) || !hasTime) return null;
      return formatTimePart(dateObj, timeFormat, showTimezone);
    }, [dateObj, hasTime, timeFormat, showTimezone]);

    const fullDateTime = useMemo(() => {
      if (!dateObj || isNaN(dateObj.getTime())) return null;

      // If no time to show, only show date in tooltip
      if (!hasTime) {
        return dateObj.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      return dateObj.toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
    }, [dateObj, hasTime]);

    const fontSizes = getFontSizes(size);

    // Handle invalid or missing date
    if (!dateObj || isNaN(dateObj.getTime())) {
      return (
        <Box
          component="span"
          ref={ref}
          data-testid={dataTestId}
          sx={{ color: 'text.disabled', ...sx }}
        >
          <Typography variant="caption">-</Typography>
        </Box>
      );
    }

    const content = (
      <Box
        component="span"
        ref={ref}
        data-testid={dataTestId}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          lineHeight: 1.3,
          cursor: showTooltip ? 'help' : 'default',
          ...sx,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 500,
            fontSize: fontSizes.date,
          }}
          data-testid={dataTestId ? `${dataTestId}-date` : undefined}
        >
          {formattedDate}
        </Typography>
        {formattedTime && (
          <Typography
            component="span"
            sx={{
              fontSize: fontSizes.time,
              color: 'text.secondary',
            }}
            data-testid={dataTestId ? `${dataTestId}-time` : undefined}
          >
            {formattedTime}
          </Typography>
        )}
      </Box>
    );

    if (!showTooltip) {
      return content;
    }

    return (
      <Tooltip
        title={tooltipContent || fullDateTime}
        arrow
        placement="top"
        slotProps={{
          tooltip: {
            sx: { px: 2, py: 1 },
          },
        }}
      >
        {content}
      </Tooltip>
    );
  },
);

DateTimeDisplay.displayName = 'DateTimeDisplay';
