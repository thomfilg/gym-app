import { describe, expect, it } from 'vitest';

import { formatSNOWDate } from './dateTime';

describe('dateTime utilities', () => {
  describe('formatSNOWDate', () => {
    it('should format a Date object to ServiceNow gs.dateGenerate format', () => {
      const date = new Date('2024-11-01T14:30:45Z');
      const result = formatSNOWDate(date);
      // The format should be 'yyyy-MM-dd','HH:mm:ss' for gs.dateGenerate()
      expect(result).toBe('\'2024-11-01\',\'14:30:45\'');
    });

    it('should format a timestamp number to ServiceNow format', () => {
      const timestamp = new Date('2024-01-15T09:00:00Z').getTime();
      const result = formatSNOWDate(timestamp);
      expect(result).toBe('\'2024-01-15\',\'09:00:00\'');
    });

    it('should handle midnight correctly', () => {
      const date = new Date('2024-11-01T00:00:00Z');
      const result = formatSNOWDate(date);
      expect(result).toBe('\'2024-11-01\',\'00:00:00\'');
    });

    it('should handle end of day correctly', () => {
      const date = new Date('2024-11-01T23:59:59Z');
      const result = formatSNOWDate(date);
      expect(result).toBe('\'2024-11-01\',\'23:59:59\'');
    });

    it('should handle leap year date', () => {
      const date = new Date('2024-02-29T12:00:00Z');
      const result = formatSNOWDate(date);
      expect(result).toBe('\'2024-02-29\',\'12:00:00\'');
    });
  });
});
