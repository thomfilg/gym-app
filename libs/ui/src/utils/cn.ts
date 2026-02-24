import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function for merging class names using clsx
 * Provides a consistent way to handle conditional classes
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
