import { withFileCache } from '../../cache/lib/withFileCache';
import { withMemoryCache } from '../../cache/lib/withMemoryCache';
import { logger } from '../../utils/lib/logger';
import { withConcurrencyLimit } from './concurrencyLimiter';
import { withRateLimit } from './rateLimiter';
import { type SuccessRateStats, withSuccessRateMetrics } from './successRateMetrics';

const onErrorFn = <T>(err: unknown, key: T) => logger.error(`Error fetching ${key}: `, err);

/**
 * Generic factory that creates a 2‑tier (in‑memory + persistent) cached fetcher.
 * Encapsulates the previous verbose pattern used for getUserGrp.
 */
/**
 * createFetcherFactory
 * ---------------------------------
 * Builds a cached fetcher function with optional:
 *  - Concurrency limiting (in-flight cap)
 *  - Rate limiting (requests per time window)
 *  - In‑memory cache (fast, de-dupes concurrent calls, optional TTL handled inside wrappers)
 *  - Persistent file cache (disabled in current implementation unless re-enabled)
 *
 * Layers are composed in this order (if enabled):
 *   raw fetcher -> concurrency limiter -> rate limiter -> memory cache -> (persistent cache)
 *
 * The final object exposes a single method:
 *   get(key) -> Promise<V>
 * which returns the cached (or freshly fetched) value for the provided key.
 *
 * Type Parameters:
 *   T - key type (string | number)
 *   V - value type (defaults to string | undefined)
 *
 * @param opts Configuration object
 * @param opts.getKey Function deriving the canonical cache key from the supplied key
 * @param opts.fetcher Underlying async function that retrieves the value (only called on cache miss)
 * @param [opts.fileName] File name for persistent cache (currently ignored unless persistent cache is reintroduced)
 * @param [opts.shouldCache] Predicate deciding if a value should be cached (default: non-empty / non-null)
 * @param [opts.onError] Error hook (receives error + key)
 * @param [opts.concurrency] Max number of concurrent underlying fetcher executions
 * @param [opts.rateLimit] Rate limiting config { max, windowMs }
 * @param [opts.enableMemoryCache=true] Enable the in‑memory cache layer
 *
 * @returns { get: (key: T) => Promise<V>, setBackoff?: (ms: number) => void }
 *
 * @example
 * const { get: getUserName } = createFetcherFactory({
 *   getKey: id => id,
 *   fetcher: async (id) => api.fetchUserName(id),
 *   concurrency: 5,
 *   rateLimit: { max: 100, windowMs: 60_000 },
 *   enableMemoryCache: true
 * });
 *
 * const name = await getUserName(42);
 */
export const createFetcherFactory = <T extends string | number, V = string | undefined>(opts: {
  getKey: (key: T) => T;
  fetcher: (key: T) => Promise<V>;
  cacheFileName?: string;
  shouldCache?: (val: V) => boolean;
  onError?: (err: unknown, key: T) => void;
  concurrency?: number; // optional max concurrent underlying fetches
  rateLimit?: { max: number; windowMs?: number }; // optional rate limiting
  enableMemoryCache?: boolean; // default true
  successRate?: {
    minRequests?: number;
    minSuccessPercent?: number;
    includeLastErrorMessage?: boolean;
    onTrip?: (stats: SuccessRateStats) => void;
    cooldownMs?: number;
  };
}) => {
  const {
    getKey,
    fetcher,
    cacheFileName,
    shouldCache = (val: V) => (val) !== '' && val !== undefined && val !== null,
    onError = onErrorFn,
    concurrency,
    rateLimit,
    enableMemoryCache = true,
    successRate = {
      minRequests: 20,
      minSuccessPercent: 50,
      includeLastErrorMessage: false,
      onTrip: (stats) => logger.warning(`Success rate trip for ${stats.name}: ${stats.successPercent}%`),
      cooldownMs: 60000,
    },
  } = opts;

  let baseFetcher: (k: T) => Promise<V> = fetcher;
  let triggerBackoff: ((ms: number) => void) | undefined;

  if (successRate) {
    const original = baseFetcher;
    baseFetcher = withSuccessRateMetrics<[T], V>(
      async (k: T) => original(k),
      {
        minRequests: successRate.minRequests,
        minSuccessPercent: successRate.minSuccessPercent,
        includeLastErrorMessage: successRate.includeLastErrorMessage,
        onTrip: successRate.onTrip,
        cooldownMs: successRate.cooldownMs,
        name: `fetcher:${(fetcher).name || 'anonymous'}`,
      },
    );
  }
  if (concurrency && concurrency > 0) {
    const prev = baseFetcher;
    baseFetcher = withConcurrencyLimit <[T], V>(concurrency, async (k: T) => prev(k));
  }
  if (rateLimit && rateLimit.max > 0) {
    const prev = baseFetcher;
    const { rateLimited, setBackoff } = withRateLimit<[T], V>(rateLimit, async (k: T) => prev(k));
    baseFetcher = rateLimited;
    triggerBackoff = setBackoff;
  }

  if (enableMemoryCache) {
    const prev = baseFetcher;
    const memoryLayer = withMemoryCache<[T], T, V>({
      fetcher: (k: T) => prev(k),
      getKey: (k: T) => getKey(k),
      onError,
      shouldCacheEmpty: true,
    });
    baseFetcher = (k: T) => memoryLayer(k) as Promise<V>;
  }

  if (cacheFileName) {
    const prev = baseFetcher;
    const fileLayer = withFileCache<[T], T, V>({
      fileName: cacheFileName,
      getKey: (k: T) => getKey(k),
      fetcher: (k: T) => prev(k) as Promise<V>,
      shouldCache: (val) => shouldCache(val as V),
      onError,
    });
    baseFetcher = (k: T) => fileLayer(k) as Promise<V>;
  }

  const debug = !!process.env.CACHE_DEBUG;
  const get = async (key: T): Promise<V> => {
    const val = (await baseFetcher(key)) as V;
    if (debug) {
      logger.info(`[cache] key=${String(key)} => ${(val)?.toString?.().slice(0, 40)}`);
    }
    return val;
  };

  return { get, setBackoff: triggerBackoff };
};
