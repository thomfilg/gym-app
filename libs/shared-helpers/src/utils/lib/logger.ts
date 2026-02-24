import * as util from 'util';
import * as winston from 'winston';

const isDevelopment = () => process.env['NODE_ENV'] === 'development';

const getDateTime = (date: Date) => date.toISOString().replace('T', ' ').substring(0, 19);

const splatSymbol = Symbol.for('splat');
export type ILogger = winston.Logger;
export const logger: ILogger = winston.createLogger({
  level: process.env['LOG_LEVEL'] || 'silly',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ level, message, feature, [splatSymbol]: splatArgs = [] }) => {
      const isProd = !isDevelopment();
      const timestamp = getDateTime(new Date());
      const formattedMessage = [timestamp, message, ...(Array.isArray(splatArgs) ? splatArgs : [])].map((value) => {
        try {
          if (typeof value === 'object' || Array.isArray(value) || typeof value === 'function') {
            return util.inspect(value, {
              depth: 5,
              showHidden: false,
              showProxy: false,
              maxArrayLength: null,
              compact: isProd,
            });
          }
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return value;
          }
          if (typeof value === 'symbol' || typeof value === 'bigint') {
            return value.toString();
          }
          return String(value);
        } catch (error) {
          console.error(`Error formatting value: ${error}`);
          return value;
        }
      }).join(' ');

      const prefix = feature ? `${level} [${feature}]` : level;
      return `${prefix} ${formattedMessage}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export const createFeatureLogger = (featureName: string, enabled: boolean = true): ILogger => logger.child({ feature: featureName, silent: !enabled });

/**
 * Default timeout for flushing logs in milliseconds.
 */
const DEFAULT_FLUSH_TIMEOUT_MS = 5000;

/**
 * Track if logger has been flushed/ended to make flushLogs idempotent
 */
let loggerEnded = false;

/**
 * Flushes all pending log messages by waiting for Winston transports to finish writing.
 * This function should be called before process.exit() to ensure all log messages are written.
 *
 * This function is idempotent - safe to call multiple times. Subsequent calls after the
 * first will resolve immediately without re-ending the logger.
 *
 * @param timeoutMs - Maximum time to wait for logs to flush (default: 5000ms)
 * @returns A promise that resolves when all transports have finished or timeout is reached
 *
 * @remarks
 * This function relies on Winston transport's 'finish' event which is available in Winston v3+.
 * Tested with Winston ^3.17.0. Behavior may vary with other versions.
 *
 * @example
 * ```typescript
 * await flushLogs();
 * process.exit(0);
 * ```
 */
export async function flushLogs(timeoutMs: number = DEFAULT_FLUSH_TIMEOUT_MS): Promise<void> {
  // Make function idempotent - if already flushed, return immediately
  if (loggerEnded) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    // Track event handlers for cleanup on timeout (both 'finish' and 'error')
    const cleanupHandlers: Array<{
      transport: winston.transport;
      finishHandler: () => void;
      errorHandler: () => void;
    }> = [];

    const cleanup = () => {
      cleanupHandlers.forEach(({ transport, finishHandler, errorHandler }) => {
        try {
          const t = transport as unknown as { removeListener?: (event: string, handler: () => void) => void };
          if (typeof t.removeListener === 'function') {
            t.removeListener('finish', finishHandler);
            t.removeListener('error', errorHandler);
          }
        } catch {
          // Ignore cleanup errors
        }
      });
    };

    const timeout = setTimeout(() => {
      cleanup();
      loggerEnded = true;
      resolve(); // Don't block process exit if flush times out
    }, timeoutMs);

    try {
      // Wait for all transports to finish
      const transports = logger.transports;
      let finishedCount = 0;
      const totalTransports = transports.length;

      if (totalTransports === 0) {
        clearTimeout(timeout);
        loggerEnded = true;
        resolve();
        return;
      }

      const checkDone = () => {
        finishedCount++;
        if (finishedCount >= totalTransports) {
          clearTimeout(timeout);
          cleanup();
          loggerEnded = true;
          resolve();
        }
      };

      transports.forEach((transport) => {
        try {
          // Most Winston transports support the 'finish' event via EventEmitter
          if (typeof transport.once === 'function') {
            const finishHandler = checkDone;
            const errorHandler = () => {
              checkDone(); // Count as done even on error
            };
            transport.once('finish', finishHandler);
            transport.once('error', errorHandler);
            cleanupHandlers.push({ transport, finishHandler, errorHandler });
          } else {
            // Transport doesn't support events, count as finished
            checkDone();
          }
        } catch {
          // If we can't attach listener, count as done
          checkDone();
        }
      });

      // Signal the logger to flush
      logger.end();
    } catch {
      // If anything goes wrong, ensure we don't block shutdown
      clearTimeout(timeout);
      loggerEnded = true;
      resolve();
    }
  });
}

/**
 * Reset the logger ended state. Only for testing purposes.
 * @internal
 */
export function _resetLoggerState(): void {
  loggerEnded = false;
}
