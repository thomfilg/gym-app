import * as dotenv from 'dotenv';

import { getConfigFromPreset } from './config';
import { Database } from './database';
import { getConfigFromMssqlPreset } from './drivers/mssql/config';
import { SqlServerDatabase } from './drivers/mssql/database';
import type {
  MssqlDatabaseConfig,
  MssqlDatabaseConfigPreset,
  MssqlDatabaseInstance,
} from './drivers/mssql/types';
import { setLogger } from './logger';
import type {
  DatabaseConfig,
  DatabaseConfigPreset,
  DatabaseDriver,
  DatabaseInstance,
  DatabaseLogger,
} from './types';

dotenv.config();

const databaseInstances = new Map<string, DatabaseInstance>();

/**
 * Creates a database instance from a config getter.
 *
 * @example
 * // PG (default) — returns DatabaseInstance
 * const db = createDatabase(() => ({ host: 'localhost', database: 'mydb', ... }));
 *
 * // MSSQL (via dbClass) — returns DatabaseDriver
 * const msDb = createDatabase(() => ({
 *   dbClass: SqlServerDatabase,
 *   name: 'my-mssql',
 *   connection: { server: '...', database: '...', userName: '...', password: '...' },
 * }));
 */
export function createDatabase(getConfig: () => DatabaseConfig): DatabaseInstance;
export function createDatabase(getConfig: () => Record<string, unknown>): DatabaseDriver;
export function createDatabase(
  getConfig: () => DatabaseConfig | Record<string, unknown>,
): DatabaseDriver {
  const config = getConfig();

  if ('dbClass' in config && typeof config.dbClass === 'function') {
    const DriverClass = config.dbClass as new (getConfig: () => unknown) => DatabaseDriver;
    return new DriverClass(getConfig);
  }

  return new Database(getConfig as unknown as () => DatabaseConfig);
}

/**
 * Creates a database from a preset name. Supports both PG and MSSQL presets.
 *
 * PG presets ('as', 'status-site') return DatabaseInstance.
 * MSSQL presets ('metronome', 'usrp') return DatabaseDriver.
 */
export function createDatabaseFromPreset(preset: 'as' | 'status-site', overrides?: Record<string, unknown>): DatabaseInstance;
export function createDatabaseFromPreset(preset: DatabaseConfigPreset, overrides?: Record<string, unknown>): DatabaseDriver;
export function createDatabaseFromPreset(
  preset: DatabaseConfigPreset,
  overrides?: Record<string, unknown>,
): DatabaseDriver {
  return createDatabase(() => {
    const config = getConfigFromPreset(preset);
    if (!overrides) return config;
    return { ...config, ...overrides };
  });
}

/**
 * Creates an MSSQL database instance from a config getter.
 * Convenience function for backward compatibility.
 */
export function createMssqlDatabase(
  getConfig: () => MssqlDatabaseConfig,
): MssqlDatabaseInstance {
  return new SqlServerDatabase(getConfig);
}

/**
 * Creates an MSSQL database from a preset name.
 * Convenience function for backward compatibility.
 */
export function createMssqlDatabaseFromPreset(
  preset: MssqlDatabaseConfigPreset,
  overrides?: Partial<MssqlDatabaseConfig>,
): MssqlDatabaseInstance {
  return createMssqlDatabase(() => {
    const config = getConfigFromMssqlPreset(preset);
    if (!overrides) return config;

    return {
      ...config,
      ...overrides,
      connection: {
        ...config.connection,
        ...overrides.connection,
      },
      pool: {
        ...config.pool,
        ...overrides.pool,
      },
    };
  });
}

export function getDatabaseInstance(
  name: string,
  config?: DatabaseConfig,
): DatabaseInstance {
  if (!databaseInstances.has(name)) {
    if (!config) {
      throw new Error(`Database instance '${name}' not found and no config provided`);
    }
    const instance = new Database(() => ({ ...config, name }));
    databaseInstances.set(name, instance);
  }
  return databaseInstances.get(name)!;
}

export async function closeDatabaseInstance(name: string): Promise<void> {
  const instance = databaseInstances.get(name);
  if (instance) {
    await instance.end();
    databaseInstances.delete(name);
  }
}

export async function closeAllDatabases(): Promise<void> {
  const promises = Array.from(databaseInstances.values()).map(instance =>
    instance.end(),
  );
  await Promise.all(promises);
  databaseInstances.clear();
}

export function configureDatabaseLogger(logger: DatabaseLogger): void {
  setLogger(logger);
}
