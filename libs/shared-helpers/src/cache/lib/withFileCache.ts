import { promises as fs } from 'fs';
import * as path from 'path';

import { logger } from '../../utils/lib/logger';

interface FileCacheEntry<V> { value: V; expiresAt: number; }
interface FileCacheData<V> { entries: Record<string, FileCacheEntry<V>>; }

const DEFAULT_TTL_MS = 30 * 60 * 1000; // 30 minutes

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PersistentCacheOptions<A extends any[], K, V> {
  getKey: (...args: A) => K | undefined | null;
  fetcher: (...args: A) => Promise<V>;
  ttlMs?: number;
  cacheDir?: string;
  fileName?: string;
  shouldCache?: (val: V) => boolean;
  onError?: (err: unknown, key: K) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withFileCache<A extends any[], K extends string | number, V>(opts: PersistentCacheOptions<A, K, V>) {
  const ttlMs = opts.ttlMs ?? DEFAULT_TTL_MS;
  const cacheDir = opts.cacheDir ?? path.resolve(process.cwd(), '.cache');
  const fileName = opts.fileName ?? 'persistent-cache.json';
  const filePath = path.join(cacheDir, fileName);
  let loaded = false;
  let dirty = false;
  let flushTimer: NodeJS.Timeout | null = null;
  let data: FileCacheData<V> = { entries: {} };

  async function load() {
    if (loaded) {
      return;
    }
    loaded = true;
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.entries) {
        data = parsed;
      }
    } catch (_) {
      logger.error(`Failure parsing cache ${filePath}`);
    }
    prune();
  }

  function prune() {
    const now = Date.now();
    let changed = false;
    for (const [k, v] of Object.entries(data.entries)) {
      if (!v || v.expiresAt < now) {
        delete data.entries[k];
        changed = true;
      }
    }
    if (changed) {
      scheduleFlush();
    }
  }

  function scheduleFlush() {
    if (flushTimer) return;
    flushTimer = setTimeout(async () => {
      flushTimer = null;
      if (!dirty) return;
      dirty = false;
      try {
        await fs.mkdir(cacheDir, { recursive: true });
        const tmp = `${filePath}.tmp`;
        await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
        await fs.rename(tmp, filePath);
      } catch (_) {}
    }, 250);
  }

  function set(key: K, value: V) {
    data.entries[String(key)] = { value, expiresAt: Date.now() + ttlMs };
    dirty = true;
    scheduleFlush();
  }

  return async (...args: A): Promise<V | undefined> => {
    const key = opts.getKey(...args);
    if (key === undefined || key === null || key === '') {
      return undefined;
    }
    await load();
    prune();
    const k = String(key);
    const entry = data.entries[k];
    if (entry && entry.expiresAt > Date.now()) {
      return entry.value;
    }
    try {
      const val = await opts.fetcher(...args);
      if (opts.shouldCache ? opts.shouldCache(val) : true) set(key as K, val);
      return val;
    } catch (e) {
      opts.onError?.(e, key as K);
      throw e;
    }
  };
}
