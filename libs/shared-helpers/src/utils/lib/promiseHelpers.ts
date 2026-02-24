/**
 * Helpers wrapping Promise.allSettled so code can migrate away from Promise.all directly.
 * Provides several patterns:
 *  - allSettledValues: return only fulfilled values (drop rejected)
 *  - allSettledOrdered: preserve index order, placing undefined for rejected entries
 *  - allSettledOrThrow: replicate Promise.all semantics but via allSettled (throws AggregateError)
 *  - mapAllSettled / mapAllSettledOrThrow: convenience to map an iterable with async mapper
 */

import { logger } from './logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AllSettledOrderedResult<T = any> {
  values: (T | undefined)[];          // aligned with input order; rejected -> undefined
  errors: (unknown | undefined)[];        // aligned with input order; fulfilled -> undefined
  fulfilled: Array<{ index: number; value: T }>;
  rejected: Array<{ index: number; reason: unknown }>;
  hasErrors: boolean;
}

export async function allSettledValues<T>(promises: Iterable<Promise<T>>): Promise<T[]> {
  const settled = await Promise.allSettled(promises);
  settled.filter(r => r.status === 'rejected').map(r => r.reason).forEach(reason => logger.error(`Promise rejected: ${reason}`));
  return settled.filter(r => r.status === 'fulfilled').map(r => r.value);
}

interface IAllSettledOrderedOptions { logErrors?: boolean }
export async function allSettledOrdered<T>(promises: Iterable<Promise<T>>, { logErrors }: IAllSettledOrderedOptions = {}): Promise<AllSettledOrderedResult<T>> {
  const settled = await Promise.allSettled(promises as Iterable<Promise<T>>);
  const values: (T | undefined)[] = new Array(settled.length);
  const errors: (unknown | undefined)[] = new Array(settled.length);
  const fulfilled: Array<{ index: number; value: T }> = [];
  const rejected: Array<{ index: number; reason: unknown }> = [];
  settled.forEach((res, i) => {
    if (res.status === 'fulfilled') {
      values[i] = res.value as T;
      fulfilled.push({ index: i, value: res.value as T });
    } else {
      if (logErrors) {
        logger.error(res.reason);
      }
      errors[i] = res.reason;
      rejected.push({ index: i, reason: res.reason });
    }
  });
  return { values, errors, fulfilled, rejected, hasErrors: rejected.length > 0 };
}

export async function allSettledOrThrow<T>(promises: Iterable<Promise<T>>): Promise<T[]> {
  const ordered = await allSettledOrdered(promises);
  if (ordered.hasErrors) {
    const reasons = ordered.rejected.map(r => r.reason);
    // Provide AggregateError fallback for runtimes missing it
    const Agg = (globalThis as { AggregateError?: new (errors: unknown[], message?: string) => Error }).AggregateError || class extends Error {
      errors: unknown[]; constructor(errors: unknown[], message?: string) { super(message); this.name = 'AggregateError'; this.errors = errors; }
    };
    throw new Agg(reasons, `One or more promises rejected (${reasons.length}).`);
  }
  return ordered.values.filter(v => v !== undefined) as T[];
}

export async function mapAllSettled<T, R>(items: readonly T[], mapper: (item: T, index: number) => Promise<R>): Promise<AllSettledOrderedResult<R>> {
  return allSettledOrdered(items.map((item, i) => mapper(item, i)));
}

export async function mapAllSettledValues<T, R>(items: readonly T[], mapper: (item: T, index: number) => Promise<R>): Promise<R[]> {
  return allSettledValues(items.map((item, i) => mapper(item, i)));
}

export async function mapAllSettledOrThrow<T, R>(items: readonly T[], mapper: (item: T, index: number) => Promise<R>): Promise<R[]> {
  return allSettledOrThrow(items.map((item, i) => mapper(item, i)));
}
