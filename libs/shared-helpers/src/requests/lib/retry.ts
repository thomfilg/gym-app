export interface RetryOptions {
  /** Number of retry attempts AFTER the first try. Default 3 (total attempts = retries + 1). */
  retries?: number;
  /** Base delay in milliseconds for the first backoff (default 2000 ms = 2s). */
  baseDelayMs?: number;
  /** Exponential factor (default 2). */
  factor?: number;
  /** Optional max delay cap in ms. */
  maxDelayMs?: number;
  /** Optional hook to decide if an error is retryable. Return false to stop retrying. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Called right before a retry wait. */
  onRetry?: (error: unknown, attempt: number, nextDelayMs: number) => void;
}

const defaultShouldRetry = () => true;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Run a task with exponential backoff retry. Delays sequence (default): 2s, 4s, 8s ...
 * Example delays: baseDelayMs * factor^(attempt-1) where attempt starts at 1 for first retry.
 */
export async function withRetry<T>(task: () => Promise<T>, options?: RetryOptions): Promise<T> {
  const {
    retries = 3,
    baseDelayMs = 2000,
    factor = 2,
    maxDelayMs,
    shouldRetry = defaultShouldRetry,
    onRetry,
  } = options || {};

  let attempt = 0; // 0 = first attempt
  while (true) {
    try {
      return await task();
    } catch (err) {
      if (attempt >= retries || !shouldRetry(err, attempt)) {
        throw err;
      }
      const delayBase = baseDelayMs * Math.pow(factor, attempt); // attempt 0 -> baseDelayMs
      const delay = maxDelayMs ? Math.min(delayBase, maxDelayMs) : delayBase;
      onRetry?.(err, attempt + 1, delay);
      await sleep(delay);
      attempt++;
    }
  }
}
