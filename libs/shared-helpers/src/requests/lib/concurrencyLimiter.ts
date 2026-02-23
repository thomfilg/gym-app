import { logger } from '../../utils/lib/logger';
import type { Task } from './requests.types';

export function createConcurrencyLimiter(concurrency: number) {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error('concurrency must be a positive integer');
  }

  let active = 0;
  const queue: Array<() => void> = [];
  let taskIdSeq = 0;
  const runningIds = new Set<number>();

  let draining = false;
  function startNext() {
    if (draining) return; // prevent re-entrancy loops
    draining = true;
    try {
      while (active < concurrency && queue.length) {
        const nextRunner = queue.shift();
        if (!nextRunner) break;
        nextRunner();
        // If tasks complete synchronously, loop continues safely.
      }
    } finally {
      draining = false;
    }
  }

  function finish(id: number) {
    if (runningIds.has(id)) runningIds.delete(id);
    if (active > 0) active--; else active = 0; // guard
    if (active > concurrency) {
      // Should never happen; log + clamp.
      logger.info('Concurrency Limiter invariant breach: active>concurrency, clamping', { active, concurrency, queueLength: queue.length });
      active = Math.min(active, concurrency);
    }
    startNext();
  }

  const limit = <T>(task: Task<T>): Promise<T> => new Promise<T>((resolve, reject) => {
    const id = ++taskIdSeq;
    const run = () => {
      let p: Promise<T>;
      try {
        p = Promise.resolve(task());
      } catch (err) {
        reject(err);
        return;
      }
      active++;
      runningIds.add(id);
      p.then(v => { resolve(v); }, reject)
        .finally(() => finish(id));
    };

    if (active < concurrency) run(); else queue.push(run);
  });

  return limit;
}

/**
 * Functional helper: given a concurrency limit and an async function, returns
 * a wrapped version that ensures no more than `concurrency` executions of the
 * underlying function run simultaneously. Order of completion is not altered;
 * calls are queued FIFO.
 *
 * Example:
 *   const limitedFetchUser = withConcurrencyLimit (5, fetchUser);
 *   await Promise.all(ids.map(id => limitedFetchUser(id)));
 */
export function withConcurrencyLimit <Args extends unknown[], R>(
  concurrency: number,
  fn: (...args: Args) => Promise<R>,
) {
  const limit = createConcurrencyLimiter(concurrency);
  return (...args: Args): Promise<R> => limit(() => fn(...args));
}

/**
 * Concurrency-limited map that preserves the input order in the result.
 */
export async function mapWithConcurrency<I, O>(
  items: readonly I[],
  concurrency: number,
  mapper: (item: I, index: number) => Promise<O>,
): Promise<O[]> {
  const limit = createConcurrencyLimiter(concurrency);
  const tasks = items.map((item, index) => limit(() => mapper(item, index)));
  const settled = await Promise.allSettled(tasks);
  const rejected = settled.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
  if (rejected.length) {
    const errors = rejected.map(r => r.reason);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Agg: any = (globalThis as any).AggregateError || class extends Error { errors: any[]; constructor(errors: any[], message?: string) { super(message); this.name = 'AggregateError'; this.errors = errors; } };
    throw new Agg(errors, `mapWithConcurrency: ${rejected.length} task(s) failed.`);
  }
  return (settled as PromiseFulfilledResult<O>[]).map(r => r.value);
}
