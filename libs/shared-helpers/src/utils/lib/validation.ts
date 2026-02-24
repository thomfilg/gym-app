/**
 * Validation Utilities
 *
 * This module provides common validation functions for data types and formats.
 *
 * @module shared-helpers/validation
 */

/**
 * Options for validating optional date strings
 */
export interface ValidateOptionalDateOptions {
  /** Custom field name for error messages (default: 'date') */
  fieldName?: string;
  /** Custom error message format (receives fieldName and value) */
  errorMessage?: (fieldName: string, value: string) => string;
}

/**
 * Result of date validation
 */
export interface DateValidationResult {
  /** Whether the date is valid */
  isValid: boolean;
  /** Parsed Date object (undefined if invalid or empty) */
  date?: Date;
  /** Error message (undefined if valid) */
  error?: string;
}

/**
 * Validates an optional ISO 8601 date string.
 * Returns a result object with validation status, parsed date, and optional error.
 *
 * Empty strings, undefined, and null are considered valid (returns isValid: true with no date).
 * Invalid date formats return isValid: false with an error message.
 *
 * @param value - The date string to validate (can be empty, undefined, or null)
 * @param options - Validation options
 * @returns DateValidationResult with isValid, date, and error properties
 *
 * @example
 * // Valid empty value
 * validateOptionalDate('') // { isValid: true }
 * validateOptionalDate(undefined) // { isValid: true }
 *
 * @example
 * // Valid date
 * validateOptionalDate('2024-11-01') // { isValid: true, date: Date }
 * validateOptionalDate('2024-11-01T00:00:00') // { isValid: true, date: Date }
 *
 * @example
 * // Invalid date
 * validateOptionalDate('invalid') // { isValid: false, error: '...' }
 */
export function validateOptionalDate(
  value: string | undefined | null,
  options: ValidateOptionalDateOptions = {},
): DateValidationResult {
  const { fieldName = 'date', errorMessage } = options;

  // Empty, undefined, or null is valid (optional field)
  if (value === undefined || value === null || value.trim() === '') {
    return { isValid: true };
  }

  const parsedDate = new Date(value);

  if (isNaN(parsedDate.getTime())) {
    const defaultError = `${fieldName} has invalid format: "${value}". Expected ISO 8601 format (e.g., "2024-11-01" or "2024-11-01T00:00:00")`;
    return {
      isValid: false,
      error: errorMessage ? errorMessage(fieldName, value) : defaultError,
    };
  }

  return {
    isValid: true,
    date: parsedDate,
  };
}

/**
 * Validates an optional ISO 8601 date string and throws an error if invalid.
 *
 * This is a convenience wrapper around validateOptionalDate that throws instead
 * of returning an error object. Useful for configuration validation where
 * invalid values should stop execution.
 *
 * @param value - The date string to validate
 * @param options - Validation options
 * @throws Error if the date format is invalid
 *
 * @example
 * // In config validation
 * assertOptionalDate(process.env.OVERRIDE_DATE, { fieldName: 'OVERRIDE_DATE' });
 */
export function assertOptionalDate(
  value: string | undefined | null,
  options: ValidateOptionalDateOptions = {},
): void {
  const result = validateOptionalDate(value, options);
  if (!result.isValid) {
    throw new Error(result.error);
  }
}
