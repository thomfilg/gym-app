import type { DataType } from 'tedious/lib/data-type';

import type { TarnPoolConfig } from '../../constants';
import type { DatabaseDriver, PoolStats } from '../../types';

export type MssqlPoolStats = PoolStats;
export type MssqlPoolConfig = TarnPoolConfig;

export type MssqlQueryParameter = {
  name: string;
  type: DataType;
  value: string;
};

export type MssqlColumnMetadata = {
  colName: string;
};

export type MssqlColumn = {
  metadata: MssqlColumnMetadata;
  value: string;
};

export interface MssqlConnectionConfig {
  server: string;
  database: string;
  userName: string;
  password: string;
  requestTimeoutMs: number;
  encrypt?: boolean;
  trustServerCertificate?: boolean;
}

export interface MssqlDatabaseConfig {
  name: string;
  connection: MssqlConnectionConfig;
  pool?: Partial<MssqlPoolConfig>;
}

export interface MssqlDatabaseInstance extends DatabaseDriver {
  query: <T>(
    text: string,
    parameters?: MssqlQueryParameter[] | null,
  ) => Promise<T[]>;
}

export type MssqlDatabaseConfigPreset = 'metronome' | 'usrp';
