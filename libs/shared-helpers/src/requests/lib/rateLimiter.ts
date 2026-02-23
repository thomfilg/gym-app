import type { Task } from './requests.types';

export interface RateLimitOptions {
  /** Max number of executions allowed within the window. */
  max: number;
  /** Window size in ms (default: 60000 = 1 minute). */
  windowMs?: number;
}

export interface RateLimiter {
  /** Wraps a task to enforce rate limiting. */
  limit: <T>(task: Task<T>) => Promise<T>;
  /** Trigger a shared backoff - all queued requests pause until duration expires. */
  setBackoff: (durationMs: number) => void;
}

/**
 * Create a rate limiter enforcing at most `max` task executions per `windowMs` rolling window.
 * Tasks beyond the limit are queued FIFO and released as soon as capacity becomes available.
 *
 * Includes shared backoff support: when setBackoff() is called (e.g., on 429 response),
 * ALL queued requests pause until the backoff period expires.
 */
export function createRateLimiter({ max, windowMs = 60000 }: RateLimitOptions): RateLimiter {
  if (!Number.isInteger(max) || max < 1) {
    throw new Error('rate limiter \'max\' must be a positive integer');
  }
  if (!Number.isInteger(windowMs) || windowMs < 1) {
    throw new Error('rate limiter \'windowMs\' must be a positive integer ms value');
  }

  // Timestamps (ms) when tasks started execution (used for rolling window accounting)
  const starts: number[] = [];
  // Pending queue of runners
  const queue: Array<() => void> = [];
  let timer: NodeJS.Timeout | null = null;

  // Shared backoff state: timestamp when backoff expires (0 = no backoff)
  let backoffUntil = 0;

  function prune(now: number) {
    // Remove timestamps outside the window
    while (starts.length && (now - starts[0]) >= windowMs) {
      starts.shift();
    }
  }

  function scheduleNextCheck() {
    if (timer) return; // already scheduled
    if (!queue.length) return;

    const now = Date.now();

    // If in backoff period, schedule drain for when backoff expires
    if (now < backoffUntil) {
      const backoffWait = backoffUntil - now;
      timer = setTimeout(() => { timer = null; drain(); }, backoffWait);
      return;
    }

    if (!starts.length) {
      // capacity exists (no starts); schedule immediate microtask run
      timer = setTimeout(() => { timer = null; drain(); }, 0);
      return;
    }

    prune(now);
    if (starts.length < max) {
      timer = setTimeout(() => { timer = null; drain(); }, 0);
      return;
    }
    const waitMs = (starts[0] + windowMs) - now; // when earliest leaves window
    timer = setTimeout(() => { timer = null; drain(); }, Math.max(waitMs, 0));
  }

  function drain() {
    const now = Date.now();

    // If in backoff period, don't release any requests - reschedule
    if (now < backoffUntil) {
      scheduleNextCheck();
      return;
    }

    prune(now);
    while (queue.length && starts.length < max) {
      const run = queue.shift();
      if (!run) break;
      starts.push(Date.now());
      run();
      prune(Date.now()); // keep trimmed if long loops
    }
    if (queue.length) {
      scheduleNextCheck();
    }
  }

  /**
   * Trigger a shared backoff. All queued requests will pause until the backoff expires.
   * If called multiple times, uses the longest backoff (furthest expiry time).
   */
  function setBackoff(durationMs: number) {
    const until = Date.now() + durationMs;
    if (until > backoffUntil) {
      backoffUntil = until;
      // Cancel existing timer to reschedule with new backoff
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      scheduleNextCheck();
    }
  }

  const limit = <T>(task: Task<T>): Promise<T> => new Promise<T>((resolve, reject) => {
    const runner = () => {
      let p: Promise<T>;
      try {
        p = Promise.resolve(task());
      } catch (e) {
        reject(e);
        return;
      }
      p.then(resolve, reject).finally(() => {
        // After completion we don't remove timestamp (timestamp tracks start only). Capacity recovers by time expiry only.
        drain();
      });
    };
    queue.push(runner);
    drain();
    scheduleNextCheck();
  });

  return { limit, setBackoff };
}

export interface WithRateLimitResult<Args extends unknown[], R> {
  /** Rate-limited wrapper function */
  rateLimited: (...args: Args) => Promise<R>;
  /** Trigger a shared backoff - all queued requests pause until duration expires */
  setBackoff: (durationMs: number) => void;
}

/** Functional wrapper similar to withConcurrencyLimit but for rate limiting by time window. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withRateLimit<Args extends any[], R>(
  opts: RateLimitOptions,
  fn: (...args: Args) => Promise<R>,
): WithRateLimitResult<Args, R> {
  const { limit, setBackoff } = createRateLimiter(opts);
  const rateLimited = (...args: Args): Promise<R> => limit(() => fn(...args));
  return { rateLimited, setBackoff };
}
