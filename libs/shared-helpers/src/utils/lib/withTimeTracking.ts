import { DateDiff } from './dateTime';
import { logger as _logger } from './logger';

interface withTimeTrackingProps {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger?: (...args: any[]) => void;
}

export const withTimeTracking = <ARGS, T>(
  fn: (...args: ARGS[]) => Promise<T>,
  { message, logger = _logger.info }: withTimeTrackingProps,
): (() => Promise<T>) => {
  return async () => {
    const begin = new Date();
    try {
      const result = await fn();
      const end = new Date();
      const duration = DateDiff(begin, end);
      logger(`${message}: ${duration}`);
      return result;
    } catch (err) {
      const end = new Date();
      const duration = DateDiff(begin, end);
      logger(`${message} FAILED after ${duration}:`, err);
      throw err;
    }
  };
};
