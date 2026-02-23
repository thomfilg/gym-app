import { flushLogs, logger } from './logger';
export interface GracefulShutdownOptions {
  /**
   * Name of the worker/process for logging purposes
   * @default 'Worker'
   */
  workerName?: string;

  /**
   * Time in milliseconds to wait before forcing exit
   * @default 1000
   */
  shutdownGracePeriodMs?: number;

  /**
   * Custom cleanup function to run before shutdown
   */
  onShutdown?: () => Promise<void> | void;

  /**
   * Whether to exit with code 0 on successful completion
   * @default true
   */
  exitOnSuccess?: boolean;

  /**
   * Optional initialization function to run before starting the main function
   */
  initFn?: () => Promise<void>;
}

/**
 * Higher-order function that wraps a worker's main function with graceful shutdown handling.
 *
 * Features:
 * - Handles SIGTERM and SIGINT signals for Kubernetes/Docker compatibility
 * - Prevents duplicate shutdown attempts
 * - Catches uncaught exceptions and unhandled rejections
 * - Provides configurable grace period for cleanup
 * - Optional custom cleanup logic
 *
 * @example
 * ```typescript
 * const mainWithShutdown = withGracefulShutdown(
 *   async () => {
 *     await doWork();
 *   },
 *   { workerName: 'Data Import Worker', shutdownGracePeriodMs: 2000 }
 * );
 *
 * mainWithShutdown();
 * ```
 */
export function withGracefulShutdown(
  mainFn: () => Promise<void>,
  options: GracefulShutdownOptions = {},
): () => Promise<void> {
  const {
    workerName = 'Worker',
    shutdownGracePeriodMs = 1000,
    onShutdown,
    exitOnSuccess = true,
    initFn,
  } = options;

  let isShuttingDown = false;

  // Graceful shutdown handler
  const gracefulShutdown = async (signal: string) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    logger.info(`Received ${signal} signal, shutting down ${workerName} gracefully...`);

    // Run custom cleanup if provided
    if (onShutdown) {
      try {
        await onShutdown();
      } catch (error) {
        logger.error(`Error during custom cleanup in ${workerName}`, error);
      }
    }

    // Give the process a bit of time to complete any ongoing operations
    setTimeout(() => {
      logger.info(`Graceful shutdown of ${workerName} completed`);
      flushLogs().finally(() => process.exit(0)); // Exit with success code after flushing logs
    }, shutdownGracePeriodMs);
  };

  // Register signal handlers for Kubernetes/Docker termination
  process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
  process.on('SIGHUP', () => void gracefulShutdown('SIGHUP'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception in ${workerName}`, error);
    flushLogs().finally(() => process.exit(1));
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled promise rejection in ${workerName}`, { reason, promise });
    flushLogs().finally(() => process.exit(1));
  });

  // Handle process warnings (memory leaks, deprecations, etc.)
  process.on('warning', (warning) => {
    logger.warn(`Process warning in ${workerName}`, {
      name: warning.name,
      message: warning.message,
      stack: warning.stack,
    });
  });

  // Return wrapped main function
  return async () => {
    try {
      logger.info(`Starting ${workerName}`);

      if (initFn) {
        logger.info(`Running initialization for ${workerName}`);
        await initFn();
        logger.info(`Initialization for ${workerName} completed`);
      }

      // Execute the main worker function
      await mainFn();

      logger.info(`${workerName} completed successfully`);

      // Exit with success code (0) to inform Kubernetes that the job completed successfully
      // This is important for Job/CronJob resources in Kubernetes
      if (exitOnSuccess) {
        logger.info('Shutting down application');
        await flushLogs();
        process.exit(0);
      } else {
        logger.info('Not shutting down application');
        throw new Error(`exitOnSuccess is ${exitOnSuccess}, not shutting down`);
      }
    } catch (error) {
      logger.error(`Fatal error in ${workerName}`, error);

      // Exit with error code to trigger restart if needed
      await flushLogs();
      process.exit(1);
    }
  };
}
