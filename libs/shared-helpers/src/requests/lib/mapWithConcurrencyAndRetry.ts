import { createConcurrencyLimiter } from './concurrencyLimiter';
import type { Task } from './requests.types';
import type { RetryOptions} from './retry';
import { withRetry } from './retry';

/**
 * Create a limiter that automatically retries failed tasks according to provided options.
 * Each retry re-enters the limiter (so failures free a slot; retries compete fairly).
 */
function createRetryableLimiter(concurrency: number, retryOptions?: RetryOptions) {
  const limit = createConcurrencyLimiter(concurrency);
  return function <T>(task: Task<T>): Promise<T> {
    return limit(() => withRetry(task, retryOptions));
  };
}

/**
 * Convenience wrapper to map with concurrency + retry.
 */
export async function mapWithConcurrencyAndRetry<I, O>(
  items: readonly I[],
  mapper: (item: I, index: number) => Promise<O>,
  retryOptions?: RetryOptions & { concurrency: number },
): Promise<O[]> {
  const limit = createRetryableLimiter(retryOptions?.concurrency || 1, retryOptions);
  const tasks = items.map((item, index) => limit(() => mapper(item, index)));
  const settled = await Promise.allSettled(tasks);
  const rejected = settled.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
  if (rejected.length) {
    const errors = rejected.map(r => r.reason);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Agg: any = (globalThis as any).AggregateError || class extends Error { errors: any[]; constructor(errors: any[], message?: string) { super(message); this.name = 'AggregateError'; this.errors = errors; } };
    throw new Agg(errors, `mapWithConcurrencyAndRetry: ${rejected.length} task(s) failed.`);
  }
  return (settled as PromiseFulfilledResult<O>[]).map(r => r.value);
}
