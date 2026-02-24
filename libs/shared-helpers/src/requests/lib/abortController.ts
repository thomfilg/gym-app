import { DEFAULT_TIMEOUT_MS } from './requests.types';

export interface IWithAbortController {
  timeoutMs?: number;
  externalSignal?: AbortSignal;
}
export function withAbortController<T>(
  task: (signal: AbortSignal) => Promise<T>,
  { timeoutMs, externalSignal }: IWithAbortController = {},
): Promise<T> {
  const controller = new AbortController();
  const { signal } = controller;
  const effectiveTimeout = timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const abortHandler = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    }
    else {
      externalSignal.addEventListener('abort', abortHandler, { once: true });
    }
  }
  const timer = setTimeout(() => controller.abort(), effectiveTimeout);
  const finalize = () => {
    clearTimeout(timer);
    externalSignal?.removeEventListener('abort', abortHandler);
  };
  return task(signal).finally(finalize);
}
