import type { DatabaseLogger } from './types';

const DEFAULT_LOGGER: DatabaseLogger = {
  info: (message: string, data?: unknown) => {
    console.info(message, data);
  },
  error: (message: string, error?: unknown, data?: unknown) => {
    console.error(message, error, data);
  },
  warn: (message: string, data?: unknown) => {
    console.warn(message, data);
  },
  debug: (message: string, data?: unknown) => {
    console.debug(message, data);
  },
};

let currentLogger: DatabaseLogger = DEFAULT_LOGGER;

export function setLogger(logger: DatabaseLogger): void {
  currentLogger = logger;
}

export function getLogger(): DatabaseLogger {
  return currentLogger;
}

export function createQueryProfiler(enableProfiling: boolean = true, enableLogging: boolean = true) {
  const start = Date.now();

  return (rowCount?: number | null, queryText?: string) => {
    if (!enableProfiling && !enableLogging) {
      return;
    }

    const end = Date.now();
    const duration = end - start;
    const durationStr = `${duration}ms`;

    if (enableLogging) {
      currentLogger.info('Executed query', {
        rows: rowCount,
        duration: durationStr,
        text: queryText,
      });
    }

    return duration;
  };
}
