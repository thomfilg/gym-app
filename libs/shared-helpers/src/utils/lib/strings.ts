/**
 * String Utilities
 *
 * This module provides common string manipulation functions.
 *
 * @module shared-helpers/strings
 */

/**
 * Adds a new value to a string with the prefix as separator
 * @param string - The existing string
 * @param newValue - The new value to append
 * @param prefix - The separator prefix to use between values
 * @returns Updated string with new value appended
 * @example
 * addToString("hello", "world", ", ") // "hello, world"
 * addToString("", "world", ", ") // "world"
 * addToString("hello", "", ", ") // "hello"
 */
export function addToString(string: string, newValue: string, prefix: string): string {
  if (!newValue) {
    // Nothing to add
    return string;
  }

  if (string) {
    // We already have value in the string, add the prefix as separator
    string += prefix;
  }

  // Append the new value to the string
  string += newValue;

  return string;
}
