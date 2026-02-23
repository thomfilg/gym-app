import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createRateLimiter, withRateLimit } from '../../src/requests/lib/rateLimiter';

describe('rateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createRateLimiter', () => {
    it('should enforce rate limit within window', async () => {
      const { limit } = createRateLimiter({ max: 2, windowMs: 1000 });
      const results: number[] = [];

      // Queue 4 tasks
      const task1 = limit(async () => { results.push(1); return 1; });
      const task2 = limit(async () => { results.push(2); return 2; });
      const task3 = limit(async () => { results.push(3); return 3; });
      const task4 = limit(async () => { results.push(4); return 4; });

      // First 2 should execute immediately
      await vi.advanceTimersByTimeAsync(0);
      expect(results).toEqual([1, 2]);

      // Advance past window to allow more
      await vi.advanceTimersByTimeAsync(1000);
      expect(results).toEqual([1, 2, 3, 4]);

      // All should complete
      const [r1, r2, r3, r4] = await Promise.all([task1, task2, task3, task4]);
      expect([r1, r2, r3, r4]).toEqual([1, 2, 3, 4]);
    });

    describe('setBackoff', () => {
      it('should pause all queued requests during backoff', async () => {
        const { limit, setBackoff } = createRateLimiter({ max: 10, windowMs: 60000 });
        const results: number[] = [];

        // Start a task
        const task1 = limit(async () => { results.push(1); return 1; });
        await vi.advanceTimersByTimeAsync(0);
        expect(results).toEqual([1]);

        // Trigger backoff
        setBackoff(5000);

        // Queue more tasks - they should NOT execute during backoff
        const task2 = limit(async () => { results.push(2); return 2; });
        const task3 = limit(async () => { results.push(3); return 3; });

        // Advance time but not past backoff
        await vi.advanceTimersByTimeAsync(3000);
        expect(results).toEqual([1]); // Still only task1

        // Advance past backoff
        await vi.advanceTimersByTimeAsync(2100);
        expect(results).toEqual([1, 2, 3]);

        await Promise.all([task1, task2, task3]);
      });

      it('should use longest backoff when called multiple times', async () => {
        const { limit, setBackoff } = createRateLimiter({ max: 10, windowMs: 60000 });
        const results: number[] = [];

        // Start a task
        limit(async () => { results.push(1); return 1; });
        await vi.advanceTimersByTimeAsync(0);

        // Set short backoff then longer backoff
        setBackoff(2000);
        setBackoff(5000); // Should use this one

        // Queue task
        limit(async () => { results.push(2); return 2; });

        // Advance 3 seconds - past first backoff but not second
        await vi.advanceTimersByTimeAsync(3000);
        expect(results).toEqual([1]); // Still paused

        // Advance past longer backoff
        await vi.advanceTimersByTimeAsync(2100);
        expect(results).toEqual([1, 2]);
      });

      it('should ignore shorter backoff if longer is already set', async () => {
        const { limit, setBackoff } = createRateLimiter({ max: 10, windowMs: 60000 });
        const results: number[] = [];

        limit(async () => { results.push(1); return 1; });
        await vi.advanceTimersByTimeAsync(0);

        // Set longer backoff first, then shorter
        setBackoff(5000);
        setBackoff(2000); // Should be ignored

        limit(async () => { results.push(2); return 2; });

        // Advance 3 seconds - past the shorter backoff we tried to set
        await vi.advanceTimersByTimeAsync(3000);
        expect(results).toEqual([1]); // Still paused because original 5s is active

        // Advance past original backoff
        await vi.advanceTimersByTimeAsync(2100);
        expect(results).toEqual([1, 2]);
      });
    });
  });

  describe('withRateLimit', () => {
    it('should return rateLimited function and setBackoff', async () => {
      const fn = async (x: number) => x * 2;
      const { rateLimited, setBackoff } = withRateLimit({ max: 5, windowMs: 1000 }, fn);

      expect(typeof rateLimited).toBe('function');
      expect(typeof setBackoff).toBe('function');

      const result = await rateLimited(5);
      expect(result).toBe(10);
    });

    it('should share backoff state across all rateLimited calls', async () => {
      const results: number[] = [];
      const fn = async (x: number) => {
        results.push(x);
        return x;
      };
      const { rateLimited, setBackoff } = withRateLimit({ max: 10, windowMs: 60000 }, fn);

      // Execute first call
      await rateLimited(1);
      expect(results).toEqual([1]);

      // Trigger backoff
      setBackoff(3000);

      // Queue more calls
      const p2 = rateLimited(2);
      const p3 = rateLimited(3);

      // Advance but not past backoff
      await vi.advanceTimersByTimeAsync(2000);
      expect(results).toEqual([1]); // Still paused

      // Advance past backoff
      await vi.advanceTimersByTimeAsync(1100);
      expect(results).toEqual([1, 2, 3]);

      await Promise.all([p2, p3]);
    });
  });
});
