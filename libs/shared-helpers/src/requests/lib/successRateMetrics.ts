/**
 * withSuccessRateMetrics
 * Wrap an async function and enforce a minimum success rate after a minimum
 * number of attempts. If (totalCalls >= minRequests) AND (success% < minSuccessPercent),
 * the circuit "trips": it throws an error for the triggering call and all future calls.
 */
export interface SuccessRateOptions {
  /** Minimum number of total requests before evaluation (default 20) */
  minRequests?: number;
  /** Minimum success percentage required to keep allowing calls (default 50) */
  minSuccessPercent?: number; // expressed 0-100
  /** Optional hook invoked when trip condition met */
  onTrip?: (stats: SuccessRateStats) => void;
  /** Name for diagnostics */
  name?: string;
  /** If true, include last error message in the thrown TripError */
  includeLastErrorMessage?: boolean;
  /** Optional cooldown in ms after which the circuit will auto-reset allowing new attempts */
  cooldownMs?: number;
}

export interface SuccessRateStats {
  name?: string;
  total: number;
  success: number;
  failures: number;
  successPercent: number; // 0-100
  tripped: boolean;
  minRequests: number;
  minSuccessPercent: number;
  lastError?: unknown;
}

export class SuccessRateTripError extends Error {
  readonly stats: SuccessRateStats;
  constructor(message: string, stats: SuccessRateStats) {
    super(message);
    this.name = 'SuccessRateTripError';
    this.stats = stats;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withSuccessRateMetrics<Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  opts: SuccessRateOptions = {},
) {
  const minRequests = opts.minRequests ?? 20;
  const minSuccessPercent = opts.minSuccessPercent ?? 50;
  const name = opts.name;

  let total = 0;
  let success = 0;
  let failures = 0;
  let tripped = false;
  let lastError: unknown;
  let tripAt: number | undefined;

  const computeStats = (): SuccessRateStats => ({
    name,
    total,
    success,
    failures,
    successPercent: total === 0 ? 100 : (success / total) * 100,
    tripped,
    minRequests,
    minSuccessPercent,
    lastError,
  });

  const wrapped = async (...args: Args): Promise<R> => {
    if (tripped) {
      // If cooldown configured and elapsed, auto-reset and continue.
      if (opts.cooldownMs && tripAt && Date.now() - tripAt >= opts.cooldownMs) {
        total = 0; success = 0; failures = 0; tripped = false; lastError = undefined; tripAt = undefined;
      } else {
        throw new SuccessRateTripError(
          `Success rate guard already tripped for ${name || 'unnamed fetcher'}`,
          computeStats(),
        );
      }
    }

    try {
      const result = await fn(...args);
      total++;
      success++;
      maybeTrip();
      return result;
    } catch (err) {
      total++;
      failures++;
      lastError = err;
      maybeTrip();
      throw err;
    }
  };

  function maybeTrip() {
    if (tripped) return;
    if (total < minRequests) return; // not enough samples yet
    const rate = (success / total) * 100;
    if (rate < minSuccessPercent) {
      tripped = true;
      tripAt = Date.now();
      const stats = computeStats();
      opts.onTrip?.(stats);
      // Throwing here affects ONLY the current call; future calls will fast-fail at top.
      throw new SuccessRateTripError(
        `Success rate ${(rate).toFixed(2)}% below required ${minSuccessPercent}% after ${total} calls${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          opts.includeLastErrorMessage && stats.lastError ? `; last error: ${(stats.lastError as any)?.message || stats.lastError}` : ''}`,
        stats,
      );
    }
  }

  // Introspection helpers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (wrapped as any).getSuccessRateStats = () => computeStats();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (wrapped as any).resetSuccessRateStats = () => {
    total = 0; success = 0; failures = 0; tripped = false; lastError = undefined;
  };

  return wrapped as ((...args: Args) => Promise<R>) & {
    getSuccessRateStats: () => SuccessRateStats;
    resetSuccessRateStats: () => void;
  };
}

// Convenience wrapper for fetcher factories: apply after constructing the fetcher.
export function applySuccessRateGuard<T extends string | number, V>(
  fetcher: (key: T) => Promise<V>,
  opts?: SuccessRateOptions,
) {
  return withSuccessRateMetrics(fetcher, { ...opts, name: opts?.name || 'fetcher' });
}
