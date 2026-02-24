import type { Pool, PoolClient, PoolConfig, QueryResult, QueryResultRow } from 'pg';

/**
 * Best-effort diagnostic snapshot of a connection pool's state.
 * Not intended for SLO-grade metrics. Field semantics (e.g. what counts
 * as "idle" vs "used") may vary between pool implementations (tarn, pg).
 */
export interface PoolStats {
  total: number;
  idle: number;
  used: number;
  pending: number;
}

/**
 * Base interface every database driver implements.
 * Infrastructure code (shutdown, health) depends only on this.
 */
export interface DatabaseDriver {
  readonly name: string;
  close(): Promise<void>;
  isHealthy(): Promise<boolean>;
  getPoolStats(): PoolStats;
}

export interface DatabaseConfig extends PoolConfig {
  name?: string;
  enableLogging?: boolean;
  enableProfiling?: boolean;
  logQuery?: (query: string, params?: unknown[], duration?: number, rowCount?: number | null) => void;
  logError?: (error: unknown, query?: string, params?: unknown[]) => void;
}

export interface QueryOptions {
  skipLogging?: boolean;
  skipProfiling?: boolean;
}

export interface BulkInsertOptions {
  chunkSize?: number;
  onProgress?: (processed: number, total: number) => void;
  /** ON CONFLICT clause for upsert behavior. Examples: 'DO NOTHING', 'DO UPDATE SET col = EXCLUDED.col' */
  onConflict?: string;
  /** Conflict target columns for ON CONFLICT clause. Example: ['cr_sys_id', 'server_sys_id'] */
  conflictColumns?: string[];
}

export interface DatabaseLogger {
  info: (message: string, data?: unknown) => void;
  error: (message: string, error?: unknown, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
}

export interface DatabaseInstance extends DatabaseDriver {
  pool: Pool;
  config: DatabaseConfig;
  query: <T extends QueryResultRow = QueryResultRow>(text: string, params?: unknown[], options?: QueryOptions) => Promise<QueryResult<T> | undefined>;
  bulkInsert: (
    tableWithSchema: string,
    columns: string[],
    rows: unknown[][],
    options?: BulkInsertOptions
  ) => Promise<void>;
  transaction: <T = unknown>(
    callback: (client: PoolClient) => Promise<T>
  ) => Promise<T>;
  end: () => Promise<void>;
}

export interface QueryProfiler {
  start: () => void;
  end: (rowCount?: number | null, queryText?: string) => void;
}

export type DatabaseConfigPreset = 'as' | 'status-site' | 'metronome' | 'usrp';
