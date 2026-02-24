export interface TarnPoolConfig {
  min: number;
  max: number;
  idleTimeoutMs: number;
  acquireTimeoutMs: number;
  createTimeoutMs: number;
  destroyTimeoutMs: number;
  reapIntervalMs: number;
  enableLogging?: boolean;
}

export const DEFAULT_POOL_CONFIG: TarnPoolConfig = {
  min: 2,
  max: 10,
  idleTimeoutMs: 30000,
  acquireTimeoutMs: 30000,
  createTimeoutMs: 30000,
  destroyTimeoutMs: 5000,
  reapIntervalMs: 1000,
  enableLogging: false,
};
