import { describe, expect, it } from 'vitest';

import { DEFAULT_POOL_CONFIG } from './constants';

describe('db constants', () => {
  describe('DEFAULT_POOL_CONFIG', () => {
    it('should have expected default values', () => {
      expect(DEFAULT_POOL_CONFIG).toEqual({
        min: 2,
        max: 10,
        idleTimeoutMs: 30000,
        acquireTimeoutMs: 30000,
        createTimeoutMs: 30000,
        destroyTimeoutMs: 5000,
        reapIntervalMs: 1000,
        enableLogging: false,
      });
    });
  });
});
