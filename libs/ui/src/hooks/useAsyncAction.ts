import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAsyncActionOptions {
  /**
   * Cooldown period in milliseconds after sync actions complete.
   * Used for actions like window.open that don't return promises.
   * @default 0 (no cooldown for async actions)
   */
  cooldownMs?: number;
  /**
   * Enable AbortController support for canceling previous requests.
   * When true, a new AbortController signal is passed to the action.
   * @default false
   */
  abortable?: boolean;
}

export interface UseAsyncActionResult<T extends unknown[], R> {
  /**
   * The wrapped action function that prevents double-execution
   */
  execute: (...args: T) => Promise<R | undefined>;
  /**
   * Whether the action is currently executing or in cooldown
   */
  isExecuting: boolean;
  /**
   * Reset the executing state manually
   */
  reset: () => void;
  /**
   * Abort the current operation (only available when abortable: true)
   */
  abort: () => void;
}

/**
 * Hook to prevent double-clicks and concurrent execution of async actions.
 * Optionally supports AbortController for canceling previous requests.
 *
 * @example
 * // Async action (API call)
 * const { execute, isExecuting } = useAsyncAction(async () => {
 *   await api.createTask(data);
 * });
 *
 * @example
 * // Sync action with cooldown (window.open)
 * const { execute, isExecuting } = useAsyncAction(
 *   () => { window.open(url, '_blank'); },
 *   { cooldownMs: 3000 }
 * );
 *
 * @example
 * // Abortable fetch action (cancels previous request on new call)
 * const { execute, isExecuting } = useAsyncAction(
 *   async (query: string, signal: AbortSignal) => {
 *     const response = await fetch(`/api/search?q=${query}`, { signal });
 *     return response.json();
 *   },
 *   { abortable: true }
 * );
 *
 * @example
 * // Usage in JSX
 * <Button onClick={execute} disabled={isExecuting}>
 *   {isExecuting ? 'Processing...' : 'Submit'}
 * </Button>
 */
export function useAsyncAction<T extends unknown[], R>(
  action: (...args: [...T, AbortSignal?]) => R | Promise<R>,
  options: UseAsyncActionOptions = {},
): UseAsyncActionResult<T, R> {
  const { cooldownMs = 0, abortable = false } = options;
  const [isExecuting, setIsExecuting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Abort any pending request on unmount
      abortControllerRef.current?.abort();
    };
  }, []);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    abort();
    if (mountedRef.current) {
      setIsExecuting(false);
    }
  }, [abort]);

  const execute = useCallback(
    async (...args: T): Promise<R | undefined> => {
      // For abortable actions, cancel previous request instead of blocking
      if (abortable) {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
      } else if (isExecuting) {
        // Guard against concurrent execution for non-abortable actions
        return undefined;
      }

      setIsExecuting(true);

      try {
        // Pass signal to action if abortable
        const actionArgs = abortable
          ? [...args, abortControllerRef.current!.signal]
          : args;
        const result = action(...(actionArgs as [...T, AbortSignal?]));

        // Check if result is a Promise
        if (result instanceof Promise) {
          const resolved = await result;
          if (mountedRef.current) {
            setIsExecuting(false);
          }
          return resolved;
        }

        // Sync action - apply cooldown if specified
        if (cooldownMs > 0) {
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              setIsExecuting(false);
            }
          }, cooldownMs);
        } else if (mountedRef.current) {
          setIsExecuting(false);
        }

        return result;
      } catch (error) {
        // Don't update state for aborted requests
        if (error instanceof Error && error.name === 'AbortError') {
          return undefined;
        }
        if (mountedRef.current) {
          setIsExecuting(false);
        }
        throw error;
      }
    },
    [action, cooldownMs, isExecuting, abortable],
  );

  return { execute, isExecuting, reset, abort };
}
