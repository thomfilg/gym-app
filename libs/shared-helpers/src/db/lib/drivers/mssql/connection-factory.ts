import { Connection } from 'tedious';

import { getLogger } from '../../logger';
import type { MssqlDatabaseConfig } from './types';

export interface ConnectionFactory {
  create(config: MssqlDatabaseConfig): Promise<Connection>;
  destroy(connection: Connection): Promise<void>;
  validate(connection: Connection): boolean;
}

function createConnection(config: MssqlDatabaseConfig): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const { connection: connConfig } = config;

    const connection = new Connection({
      server: connConfig.server,
      authentication: {
        type: 'default',
        options: {
          userName: connConfig.userName,
          password: connConfig.password,
        },
      },
      options: {
        database: connConfig.database,
        encrypt: connConfig.encrypt ?? true,
        trustServerCertificate: connConfig.trustServerCertificate ?? true,
        requestTimeout: connConfig.requestTimeoutMs,
      },
    });

    connection.on('connect', (err: Error | undefined) => {
      if (err) {
        getLogger().error(
          `Error creating MSSQL connection [${config.name}]. ` +
            `server: ${connConfig.server}, ` +
            `database: ${connConfig.database}, ` +
            `userName: ${connConfig.userName}`,
          err,
        );
        reject(err);
      } else {
        resolve(connection);
      }
    });

    connection.on('error', (err: Error) => {
      getLogger().error(`MSSQL connection error [${config.name}]`, err);
    });

    connection.connect();
  });
}

function destroyConnection(connection: Connection): Promise<void> {
  return new Promise<void>((resolve) => {
    try {
      connection.close();
      resolve();
    } catch (err) {
      getLogger().error('Error closing MSSQL connection', err);
      resolve();
    }
  });
}

function validateConnection(connection: Connection): boolean {
  try {
    const state = (
      connection as Connection & { state?: { name?: string } }
    ).state?.name;
    return state === 'LoggedIn';
  } catch {
    return false;
  }
}

export const defaultConnectionFactory: ConnectionFactory = {
  create: createConnection,
  destroy: destroyConnection,
  validate: validateConnection,
};
