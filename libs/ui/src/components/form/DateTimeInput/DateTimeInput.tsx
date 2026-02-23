import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Input } from '../Input';
import type { DateTimeInputProps } from './DateTimeInput.types';

type InputMask = 'datetime' | 'date' | 'time';


// Mask configuration for different formats
const MASK_CONFIG: Record<InputMask, { placeholder: string; maxLength: number }> = {
  datetime: { placeholder: 'YYYY-MM-DD HH:MM', maxLength: 16 },
  date: { placeholder: 'YYYY-MM-DD', maxLength: 10 },
  time: { placeholder: 'HH:MM', maxLength: 5 },
};

/**
 * Format input value according to mask type
 */
function formatMaskedValue(value: string, mask: InputMask): string {
  const digits = value.replace(/\D/g, '');

  switch (mask) {
    case 'datetime': {
      let result = '';
      if (digits.length > 0) result += digits.slice(0, 4);
      if (digits.length > 4) result += '-' + digits.slice(4, 6);
      if (digits.length > 6) result += '-' + digits.slice(6, 8);
      if (digits.length > 8) result += ' ' + digits.slice(8, 10);
      if (digits.length > 10) result += ':' + digits.slice(10, 12);
      return result;
    }
    case 'date': {
      let result = '';
      if (digits.length > 0) result += digits.slice(0, 4);
      if (digits.length > 4) result += '-' + digits.slice(4, 6);
      if (digits.length > 6) result += '-' + digits.slice(6, 8);
      return result;
    }
    case 'time': {
      let result = '';
      if (digits.length > 0) result += digits.slice(0, 2);
      if (digits.length > 2) result += ':' + digits.slice(2, 4);
      return result;
    }
    default:
      return value;
  }
}

export const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
  (
    {
      mode = 'datetime',
      minDate,
      maxDate,
      value,
      onChange,
      placeholder,
      calendarOpen: controlledCalendarOpen,
      onCalendarOpenChange,
      onComplete,
      ...inputProps
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const [internalCalendarOpen, setInternalCalendarOpen] = useState(false);
    const [hourSelectOpen, setHourSelectOpen] = useState(false);
    const [minuteSelectOpen, setMinuteSelectOpen] = useState(false);
    const inputContainerRef = React.useRef<HTMLDivElement | null>(null);

    // Support controlled calendar open state
    const isCalendarControlled = controlledCalendarOpen !== undefined;
    const isCalendarOpen = isCalendarControlled ? controlledCalendarOpen : internalCalendarOpen;

    const maskConfig = MASK_CONFIG[mode];
    const showCalendar = mode === 'datetime' || mode === 'date';

    // Format value for display
    const displayValue = value !== undefined
      ? formatMaskedValue(String(value), mode)
      : formatMaskedValue(internalValue, mode);

    // Handle input change with masking
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatMaskedValue(e.target.value, mode);
        setInternalValue(formattedValue);

        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: formattedValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      },
      [mode, onChange],
    );

    // Calendar handlers
    const handleOpenCalendar = useCallback(() => {
      if (!inputProps.disabled) {
        if (!isCalendarControlled) {
          setInternalCalendarOpen(true);
        }
        onCalendarOpenChange?.(true);
      }
    }, [inputProps.disabled, isCalendarControlled, onCalendarOpenChange]);

    const handleCloseCalendar = useCallback(() => {
      if (!isCalendarControlled) {
        setInternalCalendarOpen(false);
      }
      onCalendarOpenChange?.(false);
    }, [isCalendarControlled, onCalendarOpenChange]);

    // Parse value to Date
    const parseValueToDate = useCallback((): Date | null => {
      const val = typeof value === 'string' ? value : internalValue;
      if (!val) return null;

      if (mode === 'datetime') {
        const match = val.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
        if (!match) return null;
        const [, year, month, day, hour, minute] = match;
        return new Date(+year, +month - 1, +day, +hour, +minute);
      } else if (mode === 'date') {
        const match = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) return null;
        const [, year, month, day] = match;
        return new Date(+year, +month - 1, +day);
      }
      return null;
    }, [value, internalValue, mode]);

    // Handle date selection
    const handleDateSelect = useCallback((date: Dayjs | null) => {
      if (!date) return;

      let formatted: string;
      if (mode === 'datetime') {
        const current = parseValueToDate();
        const hours = current ? current.getHours() : 0;
        const minutes = current ? current.getMinutes() : 0;
        formatted = `${date.year()}-${String(date.month() + 1).padStart(2, '0')}-${String(date.date()).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        // Open hour select after date selection
        setTimeout(() => setHourSelectOpen(true), 0);
      } else {
        formatted = `${date.year()}-${String(date.month() + 1).padStart(2, '0')}-${String(date.date()).padStart(2, '0')}`;
      }

      setInternalValue(formatted);
      const syntheticEvent = { target: { value: formatted } } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);

      if (mode === 'date') {
        handleCloseCalendar();
      }
    }, [mode, parseValueToDate, onChange, handleCloseCalendar]);

    // Handle time change
    const handleTimeChange = useCallback((type: 'hour' | 'minute', val: number) => {
      const current = parseValueToDate() || new Date();
      if (type === 'hour') {
        current.setHours(val);
      } else {
        current.setMinutes(val);
      }
      const formatted = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')} ${String(current.getHours()).padStart(2, '0')}:${String(current.getMinutes()).padStart(2, '0')}`;
      setInternalValue(formatted);
      const syntheticEvent = { target: { value: formatted } } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);

      // Flow: hour -> minute -> close/complete
      if (type === 'hour') {
        setTimeout(() => setMinuteSelectOpen(true), 0);
      } else {
        handleCloseCalendar();
        onComplete?.();
      }
    }, [parseValueToDate, onChange, handleCloseCalendar, onComplete]);

    const calendarDate = parseValueToDate();
    const currentHour = calendarDate?.getHours() ?? 0;
    const currentMinute = calendarDate?.getMinutes() ?? 0;

    return (
      <Box ref={inputContainerRef} sx={{ position: 'relative' }}>
        <Input
          ref={ref}
          {...inputProps}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder || maskConfig.placeholder}
          endAdornment={
            showCalendar ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleOpenCalendar}
                  disabled={inputProps.disabled}
                  sx={{ p: 0.5 }}
                >
                  <CalendarIcon size={18} />
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
        />

        {showCalendar && (
          <Popover
            open={isCalendarOpen}
            anchorEl={inputContainerRef.current}
            onClose={handleCloseCalendar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{
              paper: { sx: { mt: 0.5, boxShadow: 3, borderRadius: 2, overflow: 'hidden' } },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={calendarDate ? dayjs(calendarDate) : null}
                onChange={handleDateSelect}
                minDate={minDate ? dayjs(minDate) : undefined}
                maxDate={maxDate ? dayjs(maxDate) : undefined}
                fixedWeekNumber={6}
                showDaysOutsideCurrentMonth
              />
              {mode === 'datetime' && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                    py: 1.5,
                    px: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                    Time:
                  </Box>
                  <Select
                    size="small"
                    value={currentHour}
                    open={hourSelectOpen}
                    onOpen={() => setHourSelectOpen(true)}
                    onClose={() => setHourSelectOpen(false)}
                    onChange={(e) => handleTimeChange('hour', e.target.value as number)}
                    sx={{
                      minWidth: 60,
                      fontSize: '0.875rem',
                      '& .MuiSelect-select': { py: 0.5, px: 1 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 200 },
                        ref: (el: HTMLDivElement | null) => {
                          if (el) {
                            // Scroll to center hour 12 in the dropdown
                            const itemHeight = 36;
                            const viewportHeight = 200;
                            const targetIndex = 12;
                            el.scrollTop = (targetIndex * itemHeight) - (viewportHeight / 2) + (itemHeight / 2);
                          }
                        },
                      },
                    }}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <MenuItem key={i} value={i} sx={{ fontSize: '0.875rem' }}>
                        {String(i).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box component="span" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>:</Box>
                  <Select
                    size="small"
                    value={currentMinute}
                    open={minuteSelectOpen}
                    onOpen={() => setMinuteSelectOpen(true)}
                    onClose={() => setMinuteSelectOpen(false)}
                    onChange={(e) => handleTimeChange('minute', e.target.value as number)}
                    sx={{
                      minWidth: 60,
                      fontSize: '0.875rem',
                      '& .MuiSelect-select': { py: 0.5, px: 1 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 200 },
                        ref: (el: HTMLDivElement | null) => {
                          if (el) {
                            // Scroll to center minute 30 in the dropdown
                            const itemHeight = 36;
                            const viewportHeight = 200;
                            const targetIndex = 30;
                            el.scrollTop = (targetIndex * itemHeight) - (viewportHeight / 2) + (itemHeight / 2);
                          }
                        },
                      },
                    }}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <MenuItem key={i} value={i} sx={{ fontSize: '0.875rem' }}>
                        {String(i).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            </LocalizationProvider>
          </Popover>
        )}
      </Box>
    );
  },
);

DateTimeInput.displayName = 'DateTimeInput';
