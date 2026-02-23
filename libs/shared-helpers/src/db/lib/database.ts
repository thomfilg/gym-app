import { Pool, type PoolClient, type QueryResult, type QueryResultRow } from 'pg';

import { validateConfig } from './config';
import { createQueryProfiler, getLogger } from './logger';
import type {
  BulkInsertOptions,
  DatabaseConfig,
  DatabaseInstance,
  PoolStats,
  QueryOptions,
} from './types';

export class Database implements DatabaseInstance {
  public pool!: Pool;
  public config!: DatabaseConfig;
  private initializationAttempts = 0;
  private readonly maxRetries = 5;
  private readonly retryDelay = 1000; // 1 second

  constructor(private getConfig: () => DatabaseConfig) {}

  get name(): string {
    return this.config?.name ?? 'pg';
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async getPoolWithRetry(): Promise<Pool> {
    if (this.pool) {
      return this.pool;
    }

    let lastError: Error | null = null;

    while (this.initializationAttempts < this.maxRetries) {
      try {
        this.initializationAttempts++;
        this.config = this.getConfig();
        validateConfig(this.config);
        this.pool = new Pool(this.config);
        return this.pool;
      } catch (error) {
        lastError = error as Error;
        const logger = getLogger();

        if (this.initializationAttempts < this.maxRetries) {
          const delay = (this.retryDelay * 2 + Math.random() * 500) * this.initializationAttempts; // Exponential backoff
          logger?.warn?.(
            `Database initialization attempt ${this.initializationAttempts}/${this.maxRetries} failed. Retrying in ${delay}ms...`,
            { error: lastError.message },
          );
          await this.sleep(delay);
        }
      }
    }

    // If we've exhausted all retries, throw the last error
    throw new Error(
      `Failed to initialize database after ${this.maxRetries} attempts. Last error: ${lastError?.message}`,
    );
  }

  private getPool(): Pool {
    if (!this.pool) {
      this.config = this.getConfig();
      validateConfig(this.config);
      this.pool = new Pool(this.config);
    }
    return this.pool;
  }

  async query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[],
    options: QueryOptions = {},
  ): Promise<QueryResult<T> | undefined> {
    const pool = await this.getPoolWithRetry();
    const logger = getLogger();
    const shouldLog = this.config.enableLogging && !options.skipLogging;
    const shouldProfile = this.config.enableProfiling && !options.skipProfiling;

    const profiler = createQueryProfiler(shouldProfile, shouldLog);
    let result: QueryResult<T> | undefined;

    try {
      if (params && params.length > 0) {
        result = await pool.query<T>(text, params);
      } else {
        result = await pool.query<T>(text);
      }

      if (this.config.logQuery && shouldLog) {
        const duration = profiler(result.rowCount, text);
        this.config.logQuery(text, params, duration, result.rowCount);
      } else {
        profiler(result.rowCount, text);
      }
    } catch (error) {
      if (this.config.logError) {
        this.config.logError(error, text, params);
      } else {
        logger.error('Database query error', error, {
          query: text,
          params,
          database: this.config.name || 'unknown',
        });
      }
      throw error;
    }

    return result;
  }

  async bulkInsert(
    tableWithSchema: string,
    columns: string[],
    rows: unknown[][],
    options: BulkInsertOptions = {},
  ): Promise<void> {
    if (!rows || rows.length === 0) {
      return;
    }

    const chunkSize = options.chunkSize ?? 200;
    const totalRows = rows.length;

    for (let i = 0; i < totalRows; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const valuesClause: string[] = [];
      const params: unknown[] = [];
      const colsPerRow = columns.length;

      chunk.forEach((row, rowIdx) => {
        const placeholders = Array.from(
          { length: colsPerRow },
          (_, colIdx) => `$${rowIdx * colsPerRow + colIdx + 1}`,
        );
        valuesClause.push(`(${placeholders.join(', ')})`);
        params.push(...row);
      });

      let statement = `INSERT INTO ${tableWithSchema} (${columns.join(', ')}) VALUES ${valuesClause.join(', ')}`;

      if (options.onConflict) {
        const conflictTarget = options.conflictColumns?.length
          ? `(${options.conflictColumns.join(', ')})`
          : '';
        statement += ` ON CONFLICT ${conflictTarget} ${options.onConflict}`;
      }

      await this.query(statement, params);

      if (options.onProgress) {
        options.onProgress(Math.min(i + chunkSize, totalRows), totalRows);
      }
    }
  }

  async transaction<T = unknown>(
    callback: (client: PoolClient) => Promise<T>,
  ): Promise<T> {
    const pool = await this.getPoolWithRetry();
    const client = await pool.connect();
    const logger = getLogger();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Transaction rolled back', error, {
        database: this.config.name || 'unknown',
      });
      throw error;
    } finally {
      client.release();
    }
  }

  async end(): Promise<void> {
    await this.getPool().end();
  }

  async close(): Promise<void> {
    return this.end();
  }

  async isHealthy(): Promise<boolean> {
    try {
      const pool = this.getPool();
      const result = await pool.query('SELECT 1');
      return !!result;
    } catch {
      return false;
    }
  }

  getPoolStats(): PoolStats {
    const pool = this.pool;
    if (!pool) return { total: 0, idle: 0, used: 0, pending: 0 };
    return {
      total: pool.totalCount,
      idle: pool.idleCount,
      used: pool.totalCount - pool.idleCount,
      pending: pool.waitingCount,
    };
  }

  getConnectionCount(): number {
    return this.getPool().totalCount;
  }

  getIdleConnectionCount(): number {
    return this.getPool().idleCount;
  }

  getWaitingCount(): number {
    return this.getPool().waitingCount;
  }
}
