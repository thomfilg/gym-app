import { describe, expect, it } from 'vitest';

import { assertOptionalDate, validateOptionalDate } from './validation';

describe('validation utilities', () => {
  describe('validateOptionalDate', () => {
    describe('valid empty values', () => {
      it('should return isValid: true for undefined', () => {
        const result = validateOptionalDate(undefined);
        expect(result.isValid).toBe(true);
        expect(result.date).toBeUndefined();
        expect(result.error).toBeUndefined();
      });

      it('should return isValid: true for null', () => {
        const result = validateOptionalDate(null);
        expect(result.isValid).toBe(true);
        expect(result.date).toBeUndefined();
        expect(result.error).toBeUndefined();
      });

      it('should return isValid: true for empty string', () => {
        const result = validateOptionalDate('');
        expect(result.isValid).toBe(true);
        expect(result.date).toBeUndefined();
        expect(result.error).toBeUndefined();
      });

      it('should return isValid: true for whitespace-only string', () => {
        const result = validateOptionalDate('   ');
        expect(result.isValid).toBe(true);
        expect(result.date).toBeUndefined();
        expect(result.error).toBeUndefined();
      });
    });

    describe('valid date formats', () => {
      it('should validate ISO date format (yyyy-MM-dd)', () => {
        const result = validateOptionalDate('2024-11-01');
        expect(result.isValid).toBe(true);
        expect(result.date).toBeInstanceOf(Date);
        expect(result.date?.getFullYear()).toBe(2024);
        expect(result.date?.getMonth()).toBe(10); // 0-indexed
        expect(result.date?.getDate()).toBe(1);
      });

      it('should validate ISO datetime format (yyyy-MM-ddTHH:mm:ss)', () => {
        const result = validateOptionalDate('2024-11-01T14:30:00');
        expect(result.isValid).toBe(true);
        expect(result.date).toBeInstanceOf(Date);
      });

      it('should validate ISO datetime with timezone', () => {
        const result = validateOptionalDate('2024-11-01T14:30:00Z');
        expect(result.isValid).toBe(true);
        expect(result.date).toBeInstanceOf(Date);
      });

      it('should validate ISO datetime with offset', () => {
        const result = validateOptionalDate('2024-11-01T14:30:00+05:30');
        expect(result.isValid).toBe(true);
        expect(result.date).toBeInstanceOf(Date);
      });
    });

    describe('invalid date formats', () => {
      it('should return error for invalid string', () => {
        const result = validateOptionalDate('invalid-date');
        expect(result.isValid).toBe(false);
        expect(result.date).toBeUndefined();
        expect(result.error).toContain('invalid format');
        expect(result.error).toContain('invalid-date');
      });

      it('should return error for partial date', () => {
        const result = validateOptionalDate('2024-13-01'); // Invalid month
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });

      it('should return error for random text', () => {
        const result = validateOptionalDate('hello world');
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });

    describe('custom options', () => {
      it('should use custom field name in error message', () => {
        const result = validateOptionalDate('invalid', { fieldName: 'OVERRIDE_LAST_RUN_DATE' });
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('OVERRIDE_LAST_RUN_DATE');
      });

      it('should use custom error message function', () => {
        const customError = (field: string, value: string) => `Custom error: ${field} = ${value}`;
        const result = validateOptionalDate('invalid', {
          fieldName: 'myField',
          errorMessage: customError,
        });
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Custom error: myField = invalid');
      });
    });
  });

  describe('assertOptionalDate', () => {
    it('should not throw for valid empty values', () => {
      expect(() => assertOptionalDate(undefined)).not.toThrow();
      expect(() => assertOptionalDate(null)).not.toThrow();
      expect(() => assertOptionalDate('')).not.toThrow();
    });

    it('should not throw for valid dates', () => {
      expect(() => assertOptionalDate('2024-11-01')).not.toThrow();
      expect(() => assertOptionalDate('2024-11-01T00:00:00')).not.toThrow();
    });

    it('should throw for invalid dates', () => {
      expect(() => assertOptionalDate('invalid')).toThrow();
    });

    it('should throw with custom field name in error', () => {
      expect(() => assertOptionalDate('invalid', { fieldName: 'MY_DATE' })).toThrow('MY_DATE');
    });

    it('should throw with custom error message', () => {
      const customError = () => 'Custom validation failed';
      expect(() => assertOptionalDate('invalid', { errorMessage: customError })).toThrow(
        'Custom validation failed',
      );
    });
  });
});
