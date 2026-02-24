/**
 * Date and Time Utilities for Backend (Node.js/Express)
 *
 * This module provides common date/time manipulation functions for backend services.
 * Uses date-fns and date-fns-tz for reliable date operations.
 *
 * @module shared-helpers/dateTime
 */

import { format, isDate, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import { logger } from './logger';

/**
 * Converts a date to UTC timezone
 * @param date - Date to convert (defaults to current date)
 * @returns Date object in UTC
 * @example
 * const utcDate = toUtc(new Date());
 */
export function toUtc(date = new Date()): Date {
  const tz = formatInTimeZone(date, 'UTC', 'yyyy-MM-dd HH:mm:ss\'Z\'');
  const dt = new Date(tz);
  return dt;
}

/**
 * Formats a date for PostgreSQL database storage
 * Converts strings to Date objects using parseISO
 * @param date - Date object, ISO string, or null/undefined
 * @returns Formatted date string (yyyy-MM-dd HH:mm:ss) or null
 * @example
 * formatDateForPostgres(new Date()) // "2025-01-27 14:30:00"
 * formatDateForPostgres("2025-01-27T14:30:00Z") // "2025-01-27 14:30:00"
 */
export function formatDateForPostgres(date: Date | string | null | undefined): string | null {
  try {
    if (date === '' || date === undefined || date === null) {
      return null;
    }

    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = parseISO(date);
    } else {
      dateObj = date;
    }

    if (!isDate(dateObj)) {
      return null;
    }

    return format(dateObj, 'yyyy-MM-dd HH:mm:ss');
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

/**
 * Calculates the elapsed time between two dates and formats as "Xh Ym Zs"
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted elapsed time string
 * @example
 * DateDiff(new Date('2025-01-27 10:00:00'), new Date('2025-01-27 12:35:42'))
 * // Returns: "2h 35m 42s"
 */
export function DateDiff(startDate: Date, endDate: Date): string {
  const elapsedMS = Math.abs(endDate.getTime() - startDate.getTime());

  const hrs = Math.floor(elapsedMS / 3600000);
  const min = Math.floor((elapsedMS % 3600000) / 60000);
  const sec = Math.floor(((elapsedMS % 3600000) % 60000) / 1000);
  let elapsedTime = '';
  if (hrs > 0) {
    elapsedTime = `${elapsedTime + hrs.toString()}h `;
  }
  if (min > 0 || hrs > 0) {
    elapsedTime = `${elapsedTime + padTime(min.toString(), 2)}m `;
  }
  elapsedTime = `${elapsedTime + padTime(sec.toString(), 2)}s`;

  return elapsedTime;
}

/**
 * Pads a time string with leading zeros
 * @param time - Time string to pad
 * @param length - Desired length
 * @returns Padded time string
 * @example
 * padTime("5", 2) // "05"
 * padTime("42", 2) // "42"
 */
function padTime(time: string, length: number): string {
  let paddedTime = time;
  while (paddedTime.length < length) {
    paddedTime = `0${paddedTime}`;
  }
  return paddedTime;
}

/**
 * Formats a date for ServiceNow API gs.dateGenerate() function.
 * Returns format: 'yyyy-MM-dd','HH:mm:ss' (with quotes and comma)
 * @param date - Date object or timestamp number
 * @returns Formatted date string for gs.dateGenerate()
 * @example
 * formatSNOWDate(new Date()) // "'2025-01-27','14:30:00'"
 */
export function formatSNOWDate(date: number | Date): string {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const formattedTime = format(date, 'HH:mm:ss');
  return `'${formattedDate}','${formattedTime}'`;
}

/**
 * Formats a date for Everbridge API variables (MM-dd-yyyy HH:mm)
 * @param date - Date object, ISO string, or null
 * @returns Formatted date string or null
 * @example
 * formatDateForEverbridgeVariable(new Date()) // "01-27-2025 14:30"
 */
export function formatDateForEverbridgeVariable(date: Date | string | null): string | null {
  let dateToFormat = date;
  if (dateToFormat !== '' && typeof dateToFormat !== 'undefined' && !isDate(dateToFormat) && typeof dateToFormat === 'string') {
    dateToFormat = parseISO(dateToFormat);
  }

  const formattedDate = (!isDate(dateToFormat)) ? null : format(dateToFormat as Date, 'MM-dd-yyyy HH:mm');
  return formattedDate;
}

/**
 * Formats a date for email subjects (MMMM dd, yyyy)
 * @param date - Date object, string, or number
 * @returns Formatted date string
 * @example
 * formatEmailSubject(new Date()) // "January 27, 2025"
 */
export function formatEmailSubject(date: string | number | Date): string {
  return format(date, 'MMMM dd, yyyy');
}

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * @param date - Date to start with
 * @param datePart - One of: year, quarter, month, week, day, hour, minute, second
 * @param interval - Number of units of the given interval to add
 * @returns New date with the interval added
 * @example
 * dateAdd(new Date(), 'minute', 30) // Returns 30 minutes from now
 * dateAdd(new Date(), 'day', 7) // Returns 7 days from now
 */
export function dateAdd(date: Date, datePart: string, interval: number): Date {
  if (!(date instanceof Date)) {
    return new Date(0);
  }

  const ret = new Date(date); // don't change original date
  const checkRollover = function() {
    if (ret.getDate() !== date.getDate()) {
      ret.setDate(0);
    }
  };

  switch (String(datePart).toLowerCase()) {
    case 'year':
      ret.setFullYear(ret.getFullYear() + interval);
      checkRollover();
      break;
    case 'quarter':
      ret.setMonth(ret.getMonth() + 3 * interval);
      checkRollover();
      break;
    case 'month':
      ret.setMonth(ret.getMonth() + interval);
      checkRollover();
      break;
    case 'week':
      ret.setDate(ret.getDate() + 7 * interval);
      break;
    case 'day':
      ret.setDate(ret.getDate() + interval);
      break;
    case 'hour':
      ret.setTime(ret.getTime() + interval * 3600000);
      break;
    case 'minute':
      ret.setTime(ret.getTime() + interval * 60000);
      break;
    case 'second':
      ret.setTime(ret.getTime() + interval * 1000);
      break;
    default:
      return new Date(0); // Minimum date
  }
  return ret;
}

/**
 * Formats a date with timezone support
 * @param date - Date object or null
 * @param timeZone - Timezone string (e.g., 'America/Los_Angeles') or null for user's timezone
 * @returns Formatted date string or empty string if invalid
 * @example
 * formatDate(new Date(), 'America/Los_Angeles')
 * // Returns: "Monday Jan 27, 2025 14:30 PST"
 */
export function formatDate(date: Date | null, timeZone: string | null = null): string {
  if (!date || !(date instanceof Date)) {
    return '';
  }

  let result = '';
  const zeroDate = new Date(0);

  try {
    if (date.getTime() !== zeroDate.getTime()) {
      const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      result = formatInTimeZone(date, tz, 'eeee MMM dd, yyyy HH:mm zzz');
    }
  } catch {
    result = '';
  }

  return result;
}

/**
 * Formats a date using a custom pattern with timezone support
 * @param date - Date object or null
 * @param pattern - date-fns format pattern (e.g., 'yyyy-MM-dd', 'MMM dd yyyy HH:mm:ss')
 * @param timeZone - Timezone string (e.g., 'America/New_York') or null for system timezone
 * @returns Formatted date string or empty string if invalid/zero date
 * @example
 * formatDateWithPattern(new Date(), 'yyyy-MM-dd', 'America/Los_Angeles')
 * // Returns: "2025-01-27"
 *
 * formatDateWithPattern(new Date(), 'MMM dd, yyyy HH:mm:ss', null)
 * // Returns: "Jan 27, 2025 14:30:42" (in system timezone)
 *
 * @see {@link https://date-fns.org/docs/format date-fns format tokens}
 */
export function formatDateWithPattern(date: Date | null, pattern: string, timeZone: string | null = null) : string {
  try {
    if (!date || !(date instanceof Date)) {
      return '';
    }

    let result = '';
    const zeroDate = new Date(0);

    if (date != zeroDate ) {
      if (!timeZone) {
        timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
      if (date) {
        result = formatInTimeZone(date, timeZone, pattern);
      } else {
        result = '';
      }
    }
    return result;
  } catch (_error) {
    return '';
  }
}

/**
 * Utility delay function using promises
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 * @example
 * await delay(1000); // Wait 1 second
 */
export const delay = (ms: number | undefined): Promise<void> =>
  new Promise(res => setTimeout(res, ms));

// Calculates the days between the end and start date
export function calculateDays(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diff = endDate.getTime() - startDate.getTime();
  return Math.round(diff / oneDay);
}

export function calculateWorkdays(startDate: Date, endDate: Date): number {
  let workdays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
      workdays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workdays;
}
