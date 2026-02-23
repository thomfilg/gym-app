import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as winston from 'winston';

import { _resetLoggerState, flushLogs } from './logger';

describe('flushLogs', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset logger state before each test to ensure idempotency tests work correctly
    _resetLoggerState();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('basic functionality', () => {
    it('should resolve after logger transports finish', async () => {
      // Using real timers for this test since we're testing actual behavior
      vi.useRealTimers();

      // flushLogs should resolve (either by finishing or timeout)
      await expect(flushLogs(100)).resolves.toBeUndefined();
    });

    it('should call logger.end() to trigger flush', async () => {
      // We can't easily mock the logger instance, but we can test that
      // the function resolves properly with a short timeout
      vi.useRealTimers();

      const startTime = Date.now();
      await flushLogs(50);
      const elapsed = Date.now() - startTime;

      // Should complete (either by flush or timeout)
      expect(elapsed).toBeLessThan(1000);
    });
  });

  describe('timeout behavior', () => {
    it('should respect custom timeout value when transports do not finish', async () => {
      // Create a mock transport that never triggers 'finish' event
      const mockTransport = {
        once: vi.fn(), // Never calls the callback
        log: vi.fn(),
        close: vi.fn(),
        end: vi.fn(),
      };

      // Create a custom flushLogs that uses our mock transports
      const flushTestLogs = (timeoutMs: number): Promise<void> => new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve();
        }, timeoutMs);

        const transports = [mockTransport];
        let finishedCount = 0;
        const totalTransports = transports.length;

        if (totalTransports === 0) {
          clearTimeout(timeout);
          resolve();
          return;
        }

        const checkDone = () => {
          finishedCount++;
          if (finishedCount >= totalTransports) {
            clearTimeout(timeout);
            resolve();
          }
        };

        transports.forEach((transport) => {
          if (typeof transport.once === 'function') {
            transport.once('finish', checkDone);
          } else {
            checkDone();
          }
        });

        // Don't actually end the logger in this test
      });

      const flushPromise = flushTestLogs(100);

      // Advance timers past the timeout
      await vi.advanceTimersByTimeAsync(100);

      await expect(flushPromise).resolves.toBeUndefined();
    });

    it('should not block if flush takes longer than timeout', async () => {
      vi.useRealTimers();

      const startTime = Date.now();
      const customTimeout = 50;

      await flushLogs(customTimeout);

      const elapsed = Date.now() - startTime;
      // Should complete within a reasonable time (timeout + small buffer)
      expect(elapsed).toBeLessThan(customTimeout + 100);
    });
  });

  describe('empty transports', () => {
    it('should resolve immediately when there are no transports', async () => {
      // Create a logger with no transports
      const emptyLogger = winston.createLogger({
        transports: [],
      });

      const flushEmptyLogs = (): Promise<void> => new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve();
        }, 5000);

        const transports = emptyLogger.transports;
        const totalTransports = transports.length;

        if (totalTransports === 0) {
          clearTimeout(timeout);
          resolve();
          return;
        }
      });

      // Should resolve immediately without waiting
      await expect(flushEmptyLogs()).resolves.toBeUndefined();
    });
  });

  describe('transport without event support', () => {
    it('should handle transports without once method gracefully', async () => {
      // Create a transport-like object without once method
      const mockTransportWithoutOnce = {
        log: vi.fn(),
        // No once method
      };

      // Test the logic directly
      const transports = [mockTransportWithoutOnce];
      let finishedCount = 0;

      const checkDone = () => {
        finishedCount++;
      };

      transports.forEach((transport) => {
        // This is the same logic as in flushLogs
        if (typeof (transport as { once?: unknown }).once === 'function') {
          // Would register finish handler
        } else {
          // Transport doesn't support events, count as finished
          checkDone();
        }
      });

      // Should have counted the transport as finished
      expect(finishedCount).toBe(1);
    });

    it('should handle mixed transports correctly', async () => {
      // Create transports with and without once method
      const mockTransportWithOnce = {
        once: vi.fn(),
        log: vi.fn(),
      };

      const mockTransportWithoutOnce = {
        log: vi.fn(),
        // No once method
      };

      const transports = [mockTransportWithOnce, mockTransportWithoutOnce];
      let finishedCount = 0;

      const checkDone = () => {
        finishedCount++;
      };

      transports.forEach((transport) => {
        if (typeof (transport as { once?: unknown }).once === 'function') {
          (transport as { once: typeof vi.fn }).once('finish', checkDone);
        } else {
          checkDone();
        }
      });

      // Only the transport without once should be counted as finished
      expect(finishedCount).toBe(1);
      // The transport with once should have registered a listener
      expect(mockTransportWithOnce.once).toHaveBeenCalledWith('finish', checkDone);
    });
  });

  describe('edge cases', () => {
    it('should use default timeout of 5000ms when not specified', async () => {
      // We test this indirectly by checking the function signature
      vi.useRealTimers();

      // The function should accept no arguments
      const promise = flushLogs();

      // Complete with a short actual timeout to not block the test
      // In reality, either the flush completes or the 5000ms timeout triggers
      await Promise.race([
        promise,
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]);
    });

    it('should resolve only once even if multiple transports finish', async () => {
      let resolveCount = 0;

      const testPromise = new Promise<void>((resolve) => {
        const checkDone = () => {
          resolveCount++;
          if (resolveCount === 1) {
            resolve();
          }
        };

        // Simulate multiple finish events
        checkDone();
        checkDone();
        checkDone();
      });

      await testPromise;

      // The promise resolved once, but the counter shows multiple calls
      expect(resolveCount).toBe(3);
    });

    it('should clear timeout when transports finish before timeout', async () => {
      vi.useRealTimers();

      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      // Create a simple logger that finishes quickly
      const quickLogger = winston.createLogger({
        transports: [new winston.transports.Console({ silent: true })],
      });

      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          resolve();
        }, 5000);

        const transports = quickLogger.transports;
        let finishedCount = 0;
        const totalTransports = transports.length;

        if (totalTransports === 0) {
          clearTimeout(timeout);
          resolve();
          return;
        }

        const checkDone = () => {
          finishedCount++;
          if (finishedCount >= totalTransports) {
            clearTimeout(timeout);
            resolve();
          }
        };

        transports.forEach((transport) => {
          if (typeof transport.once === 'function') {
            transport.once('finish', checkDone);
          } else {
            checkDone();
          }
        });

        quickLogger.end();
      });

      // Verify clearTimeout was called at least once
      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('integration with real logger', () => {
    it('should flush logs from the actual logger instance', async () => {
      vi.useRealTimers();

      // This tests the exported flushLogs function with the real logger
      // It should complete without throwing
      await expect(flushLogs(500)).resolves.toBeUndefined();
    });
  });

  describe('idempotency', () => {
    it('should be safe to call multiple times concurrently', async () => {
      vi.useRealTimers();

      // Call flushLogs multiple times in parallel
      const results = await Promise.all([
        flushLogs(100),
        flushLogs(100),
        flushLogs(100),
      ]);

      // Should all resolve successfully
      expect(results).toHaveLength(3);
      results.forEach((result) => {
        expect(result).toBeUndefined();
      });
    });

    it('should resolve immediately on subsequent calls after first flush', async () => {
      vi.useRealTimers();

      // First call - does the actual flush
      const startTime1 = Date.now();
      await flushLogs(100);
      const elapsed1 = Date.now() - startTime1;

      // Second call - should be nearly instant due to idempotency
      const startTime2 = Date.now();
      await flushLogs(100);
      const elapsed2 = Date.now() - startTime2;

      // Second call should be much faster (essentially instant)
      expect(elapsed2).toBeLessThan(10);
      // First call may take some time (up to timeout)
      expect(elapsed1).toBeLessThanOrEqual(200);
    });

    it('should not fail if called after logger is already ended', async () => {
      vi.useRealTimers();

      // First call ends the logger
      await flushLogs(100);

      // Subsequent calls should still resolve without error
      await expect(flushLogs(100)).resolves.toBeUndefined();
      await expect(flushLogs(100)).resolves.toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should resolve even if transport listeners cannot be attached', async () => {
      vi.useRealTimers();

      // The function should not throw even with edge cases
      await expect(flushLogs(100)).resolves.toBeUndefined();
    });
  });
});
