// --- PG config & validation ---
export {
  getConfigFromPreset,
  validateConfig,
} from './lib/config';

// --- PG Database class ---
export { Database } from './lib/database';

// --- Factory functions (PG + MSSQL) ---
export {
  closeAllDatabases,
  closeDatabaseInstance,
  configureDatabaseLogger,
  createDatabase,
  createDatabaseFromPreset,
  createMssqlDatabase,
  createMssqlDatabaseFromPreset,
  getDatabaseInstance,
} from './lib/factory';

// --- PG helpers ---
export {
  buildInsertStatement,
  buildUpdateStatement,
  buildWhereClause,
  escapeIdentifier,
  formatSqlQuery,
  getFirstRow,
  getRowCount,
  getRows,
} from './lib/helpers';

// --- Logger ---
export {
  createQueryProfiler,
  getLogger,
  setLogger,
} from './lib/logger';

// --- Shared types ---
export type {
  BulkInsertOptions,
  DatabaseConfig,
  DatabaseConfigPreset,
  DatabaseDriver,
  DatabaseInstance,
  DatabaseLogger,
  PoolStats,
  QueryOptions,
  QueryProfiler,
} from './lib/types';

// --- Shared constants ---
export type { TarnPoolConfig } from './lib/constants';
export { DEFAULT_POOL_CONFIG } from './lib/constants';

// --- MSSQL driver ---
export {
  getConfigFromMssqlPreset,
  validateConfig as validateMssqlConfig,
} from './lib/drivers/mssql/config';
export type { ConnectionFactory } from './lib/drivers/mssql/connection-factory';
export { defaultConnectionFactory } from './lib/drivers/mssql/connection-factory';
export { MssqlDatabase, SqlServerDatabase } from './lib/drivers/mssql/database';
export type {
  MssqlColumn,
  MssqlColumnMetadata,
  MssqlConnectionConfig,
  MssqlDatabaseConfig,
  MssqlDatabaseConfigPreset,
  MssqlDatabaseInstance,
  MssqlPoolConfig,
  MssqlPoolStats,
  MssqlQueryParameter,
} from './lib/drivers/mssql/types';

// --- Backward compatibility aliases ---
/** @deprecated Use DatabaseDriver instead */
export type { DatabaseDriver as DatabaseLifecycle } from './lib/types';
/** @deprecated Use TarnPoolConfig instead */
export type { TarnPoolConfig as DbCorePoolConfig } from './lib/constants';
/** @deprecated Use DEFAULT_POOL_CONFIG instead */
export { DEFAULT_POOL_CONFIG as DEFAULT_MSSQL_POOL_CONFIG } from './lib/constants';
/** @deprecated Use getConfigFromMssqlPreset instead */
export { getConfigFromMssqlPreset as getMssqlConfigFromPreset } from './lib/drivers/mssql/config';

// --- Re-export pg types for convenience ---
export type { PoolConfig, QueryResult } from 'pg';
