export const DEFAULT_TIMEOUT_MS = Number(process.env.SNOW_TIMEOUT_MS) || 60000; // overall request timeout (abort)
export const CONNECT_TIMEOUT_MS = Number(process.env.SNOW_CONNECT_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS; // TCP connect timeout

export type Task<T> = () => Promise<T>;
