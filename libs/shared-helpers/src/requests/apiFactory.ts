import { Agent, setGlobalDispatcher } from 'undici';

import { logger } from '../utils/lib/logger';
import { withAbortController } from './lib/abortController';
import { withConcurrencyLimit } from './lib/concurrencyLimiter';
import { type AuthType, doRequest, type HttpMethod } from './lib/doRequest';
import { withRateLimit } from './lib/rateLimiter';
import { CONNECT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS } from './lib/requests.types';
import { withRetry } from './lib/retry';

(function configureGlobalDispatcher() {
  try {
    setGlobalDispatcher(new Agent({ connect: { timeout: CONNECT_TIMEOUT_MS } }));
    logger.info(`Configured Global API connect timeout: ${CONNECT_TIMEOUT_MS}ms (env SNOW_CONNECT_TIMEOUT_MS)`);
  } catch (e) {
    logger.warning('Failed to set global dispatcher for connect timeout', e);
  }
})();

export type FetchJSONOptions = {
  path: string;
  signal?: AbortSignal;
  retry?: number;
  timeoutMs?: number;
  method?: HttpMethod;
  body?: string | object;
};

interface IApiFactory {
  baseUrl: string;
  authToken: string;
  authType?: AuthType;
  concurrency?: number;
  rateLimit?: { max: number; windowMs?: number }
}

interface BaseAttemptOptions {
  url: string;
  timeoutMs?: number;
  externalSignal?: AbortSignal;
  method?: HttpMethod;
  body?: string | object;
}

/** Default backoff duration when Retry-After header is missing (60 seconds) */
const DEFAULT_429_BACKOFF_MS = 60000;

/** Maximum allowed backoff duration (5 minutes) to prevent excessive delays from buggy servers */
const MAX_BACKOFF_MS = 300000;

/**
 * Parse Retry-After value from error message.
 * Error format for 429: "HTTP 429|<retryAfter>|<body>"
 * Retry-After can be seconds (number) or HTTP-date.
 * Returns null if invalid, 0 if backoff already expired, capped at MAX_BACKOFF_MS.
 */
function parseRetryAfterFromError(err: Error): number | null {
  const match = err.message.match(/^HTTP 429\|([^|]*)\|/);
  if (!match || !match[1]) return null;

  const retryAfter = match[1].trim();
  if (!retryAfter) return null;

  // Try parsing as seconds (number)
  const seconds = parseInt(retryAfter, 10);
  if (!isNaN(seconds) && seconds > 0) {
    // Cap at MAX_BACKOFF_MS to prevent excessive delays
    return Math.min(seconds * 1000, MAX_BACKOFF_MS);
  }

  // Try parsing as HTTP-date
  const date = Date.parse(retryAfter);
  if (!isNaN(date)) {
    const delayMs = date - Date.now();
    // Return 0 for past dates (immediate retry OK), cap at MAX_BACKOFF_MS
    return Math.max(0, Math.min(delayMs, MAX_BACKOFF_MS));
  }

  return null;
}

export function apiFactory({ baseUrl, authToken, authType, concurrency, rateLimit }: IApiFactory) {
  const normBase = baseUrl.replace(/\/+$/, '');

  // Shared backoff trigger (set when rate limiting is enabled)
  let triggerBackoff: ((ms: number) => void) | undefined;

  let baseAttempt = async <T>(opts: BaseAttemptOptions): Promise<T> => withAbortController(
    (abortSignal) => doRequest<T>({
      url: opts.url,
      authToken,
      authType,
      signal: abortSignal,
      method: opts.method,
      body: opts.body,
    }),
    { timeoutMs: opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, externalSignal: opts.externalSignal },
  );

  if (concurrency && concurrency > 0) {
    const prev = baseAttempt;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    baseAttempt = withConcurrencyLimit<[BaseAttemptOptions], any>(
      concurrency,
      (opts: BaseAttemptOptions) => prev(opts),
    );
  }

  if (rateLimit && rateLimit.max > 0) {
    const prev = baseAttempt;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { rateLimited, setBackoff } = withRateLimit<[BaseAttemptOptions], any>(
      rateLimit,
      (opts: BaseAttemptOptions) => prev(opts),
    );
    baseAttempt = rateLimited;
    triggerBackoff = setBackoff;
  }

  async function request<T>({ path, signal, retry = 2, timeoutMs, method, body }: FetchJSONOptions): Promise<T> {
    const rel = path.startsWith('/') ? path : `/${path}`;
    const url = `${normBase}${rel}`;
    return withRetry(
      () => baseAttempt({ url, timeoutMs, externalSignal: signal, method, body }),
      {
        retries: retry,
        baseDelayMs: 2000,
        factor: 2,
        shouldRetry: (err) => {
          // Don't retry on 4xx client errors (except 429 rate limit)
          if (err instanceof Error) {
            const match = err.message.match(/^HTTP (\d{3})/);
            if (match) {
              const statusCode = parseInt(match[1], 10);
              // On 429, trigger shared backoff so all queued requests pause
              if (statusCode === 429 && triggerBackoff) {
                const backoffMs = parseRetryAfterFromError(err) ?? DEFAULT_429_BACKOFF_MS;
                triggerBackoff(backoffMs);
                logger.info(`429 received - triggering shared backoff for ${backoffMs}ms`);
              }
              if (statusCode >= 400 && statusCode < 500 && statusCode !== 429) {
                return false;
              }
            }
          }
          return true;
        },
        onRetry: (err, attempt, nextDelayMs) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          logger.info(`Retry ${attempt} for ${url} in ${nextDelayMs}ms due to: ${String((err as any)?.message || err)}`);
        },
      },
    );
  }
  return { request };
}
