/**
 * Generic async caching wrapper with optional TTL and in-flight de-duplication.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WithMemoryCacheOptions<A extends any[], K, V> {
  getKey: (...args: A) => K | undefined | null;
  fetcher: (...args: A) => Promise<V>;
  ttlMs?: number; // omit or <=0 for no TTL
  cacheMap?: Map<K, { value: V; expiresAt?: number }>;
  onError?: (err: unknown, key: K) => void;
  shouldCacheEmpty?: boolean; // default true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withMemoryCache<A extends any[], K, V>(options: WithMemoryCacheOptions<A, K, V>) {
  const {
    getKey,
    fetcher,
    ttlMs,
    cacheMap = new Map<K, { value: V; expiresAt?: number }>(),
    onError,
    shouldCacheEmpty = true,
  } = options;

  const inFlight = new Map<K, Promise<V>>();

  const isExpired = (entry: { value: V; expiresAt?: number } | undefined) => {
    if (!entry) return true;
    if (!ttlMs || ttlMs <= 0) return false;
    return typeof entry.expiresAt === 'number' && entry.expiresAt < Date.now();
  };

  return async function cached(...args: A): Promise<V | undefined> {
    const key = getKey(...args);
    if (key === undefined || key === null || key === '') {
      return undefined;
    }

    const cachedEntry = cacheMap.get(key as K);
    if (!isExpired(cachedEntry)) {
      return cachedEntry!.value;
    }

    if (inFlight.has(key as K)) {
      return inFlight.get(key as K)!;
    }

    const p = (async () => {
      try {
        const val = await fetcher(...args);
        const cacheable = shouldCacheEmpty || val !== '';
        if (cacheable) {
          cacheMap.set(key as K, {
            value: val,
            expiresAt: ttlMs && ttlMs > 0 ? Date.now() + ttlMs : undefined,
          });
        }
        return val;
      } catch (e) {
        onError?.(e, key as K);
        throw e;
      } finally {
        inFlight.delete(key as K);
      }
    })();

    inFlight.set(key as K, p);
    return p;
  };
}
