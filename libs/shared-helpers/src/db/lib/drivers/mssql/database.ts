import { Pool } from 'tarn';
import { type Connection, Request } from 'tedious';

import { DEFAULT_POOL_CONFIG, type TarnPoolConfig } from '../../constants';
import { getLogger } from '../../logger';
import type { PoolStats } from '../../types';
import { validateConfig } from './config';
import { type ConnectionFactory, defaultConnectionFactory } from './connection-factory';
import type {
  MssqlColumn,
  MssqlDatabaseConfig,
  MssqlDatabaseInstance,
  MssqlQueryParameter,
} from './types';

export class SqlServerDatabase implements MssqlDatabaseInstance {
  private pool: Pool<Connection> | null = null;
  private isShuttingDown = false;
  private isClosed = false;
  private inflightCount = 0;
  private _name = 'mssql';

  constructor(
    private getConfig: () => MssqlDatabaseConfig,
    private connectionFactory: ConnectionFactory = defaultConnectionFactory,
  ) {}

  get name(): string {
    return this._name;
  }

  private getPool(): Pool<Connection> {
    if (this.isClosed) {
      throw new Error(`Database [${this._name}] is permanently closed`);
    }
    if (this.pool) return this.pool;

    const config = this.getConfig();
    validateConfig(config);
    this._name = config.name;

    const cfg: TarnPoolConfig = { ...DEFAULT_POOL_CONFIG, ...config.pool };
    const factory = this.connectionFactory;

    const log =
      cfg.enableLogging
        ? (message: string) =>
          getLogger().debug(`MSSQL Pool [${config.name}]: ${message}`)
        : undefined;

    this.pool = new Pool<Connection>({
      min: cfg.min,
      max: cfg.max,
      idleTimeoutMillis: cfg.idleTimeoutMs,
      acquireTimeoutMillis: cfg.acquireTimeoutMs,
      createTimeoutMillis: cfg.createTimeoutMs,
      destroyTimeoutMillis: cfg.destroyTimeoutMs,
      reapIntervalMillis: cfg.reapIntervalMs,
      create: () => factory.create(config),
      destroy: (conn) => factory.destroy(conn),
      validate: (conn) => factory.validate(conn),
      log,
    });

    return this.pool;
  }

  private async withConnection<T>(
    fn: (connection: Connection) => Promise<T>,
  ): Promise<T> {
    if (this.isClosed) {
      throw new Error(`Database [${this._name}] is permanently closed`);
    }
    if (this.isShuttingDown) {
      throw new Error(`Database [${this._name}] is shutting down`);
    }

    const pool = this.getPool();
    let connection: Connection | undefined;
    this.inflightCount++;
    try {
      connection = await pool.acquire().promise;
      return await fn(connection);
    } finally {
      if (connection !== undefined) {
        pool.release(connection);
      }
      this.inflightCount--;
    }
  }

  async close(drainTimeoutMs = 10000): Promise<void> {
    if (this.isClosed) return;

    this.isShuttingDown = true;

    if (!this.pool) {
      this.isClosed = true;
      return;
    }

    const stats = this.getPoolStats();
    getLogger().info(`Shutting down database pool [${this._name}]...`, { stats });

    if (this.inflightCount > 0) {
      getLogger().info(
        `Waiting for ${this.inflightCount} in-flight operations [${this._name}]...`,
      );
      const deadline = Date.now() + drainTimeoutMs;
      while (this.inflightCount > 0 && Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 50));
      }
      if (this.inflightCount > 0) {
        getLogger().warn(
          `Drain timeout reached with ${this.inflightCount} in-flight operations [${this._name}]`,
        );
      }
    }

    try {
      await this.pool.destroy();
      getLogger().info(`Database pool [${this._name}] closed successfully`);
    } catch (err) {
      getLogger().error(`Error closing database pool [${this._name}]`, err);
    } finally {
      this.pool = null;
      this.isClosed = true;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      return await this.withConnection(
        (connection) =>
          new Promise<boolean>((resolve) => {
            const request = new Request('SELECT 1', (err) => {
              resolve(!err);
            });
            connection.execSql(request);
          }),
      );
    } catch {
      return false;
    }
  }

  getPoolStats(): PoolStats {
    if (!this.pool) return { total: 0, idle: 0, used: 0, pending: 0 };
    return {
      total: this.pool.numFree() + this.pool.numUsed(),
      idle: this.pool.numFree(),
      used: this.pool.numUsed(),
      pending: this.pool.numPendingAcquires(),
    };
  }

  async query<T>(
    text: string,
    parameters: MssqlQueryParameter[] | null = null,
  ): Promise<T[]> {
    return this.withConnection(async (connection) => {
      const config = this.getConfig();
      const result: T[] = [];

      return new Promise<T[]>((resolve, reject) => {
        const request = new Request(
          text,
          (err: Error | null | undefined) => {
            if (err) {
              getLogger().error(`MSSQL query error [${config.name}]`, err);
              reject(err);
            } else {
              resolve(result);
            }
          },
        );

        if (parameters && parameters.length > 0) {
          for (let i = 0; i < parameters.length; i++) {
            request.addParameter(
              parameters[i].name,
              parameters[i].type,
              parameters[i].value,
            );
          }
        }

        request.on('row', (columns: MssqlColumn[]) => {
          const entry: Record<string, string> = {};
          columns.forEach((column: MssqlColumn) => {
            entry[column.metadata.colName] = column.value;
          });
          result.push(entry as unknown as T);
        });

        connection.execSql(request);
      });
    });
  }
}

/** @deprecated Use SqlServerDatabase instead */
export const MssqlDatabase = SqlServerDatabase;
