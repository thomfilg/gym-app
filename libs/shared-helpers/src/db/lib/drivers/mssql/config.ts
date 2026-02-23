import type {
  MssqlDatabaseConfig,
  MssqlDatabaseConfigPreset,
} from './types';

const CONFIG_PRESETS: Record<
MssqlDatabaseConfigPreset,
(env: NodeJS.ProcessEnv) => MssqlDatabaseConfig
> = {
  metronome: (env) => ({
    name: 'metronome',
    connection: {
      server: env.METRONOME_HOST || '',
      database: env.METRONOME_DATABASE || '',
      userName: env.METRONOME_USER_NAME || '',
      password: env.METRONOME_PASSWORD || '',
      requestTimeoutMs: parseInt(
        env.METRONOME_REQUEST_TIMEOUT_MS || '60000',
        10,
      ),
      encrypt: false,
      trustServerCertificate: true,
    },
    pool: {
      min: parseInt(env.METRONOME_POOL_MIN || '2', 10),
      max: parseInt(env.METRONOME_POOL_MAX || '10', 10),
      enableLogging: env.METRONOME_POOL_LOGGING === 'true',
    },
  }),

  usrp: (env) => ({
    name: 'usrp',
    connection: {
      server: env.USRP_DATABASE_SERVER || '',
      database: env.USRP_DATABASE_NAME || '',
      userName: env.USRP_DATABASE_USER_NAME || '',
      password: env.USRP_DATABASE_PASSWORD || '',
      requestTimeoutMs: parseInt(
        env.USRP_DATABASE_REQUEST_TIMEOUT_MS || '60000',
        10,
      ),
      encrypt: true,
      trustServerCertificate: true,
    },
    pool: {
      min: parseInt(env.USRP_DATABASE_POOL_MIN || '2', 10),
      max: parseInt(env.USRP_DATABASE_POOL_MAX || '10', 10),
      idleTimeoutMs: parseInt(
        env.USRP_DATABASE_POOL_IDLE_TIMEOUT_MS || '30000',
        10,
      ),
      acquireTimeoutMs: parseInt(
        env.USRP_DATABASE_POOL_ACQUIRE_TIMEOUT_MS || '30000',
        10,
      ),
      createTimeoutMs: parseInt(
        env.USRP_DATABASE_POOL_CREATE_TIMEOUT_MS || '30000',
        10,
      ),
      destroyTimeoutMs: parseInt(
        env.USRP_DATABASE_POOL_DESTROY_TIMEOUT_MS || '5000',
        10,
      ),
      reapIntervalMs: parseInt(
        env.USRP_DATABASE_POOL_REAP_INTERVAL_MS || '1000',
        10,
      ),
      enableLogging: env.USRP_DATABASE_POOL_LOGGING === 'true',
    },
  }),
};

export function getConfigFromMssqlPreset(
  preset: MssqlDatabaseConfigPreset,
  env: NodeJS.ProcessEnv = process.env,
): MssqlDatabaseConfig {
  const configBuilder = CONFIG_PRESETS[preset];
  if (!configBuilder) {
    throw new Error(`Unknown MSSQL config preset: ${preset}`);
  }
  return configBuilder(env);
}

export function validateConfig(config: MssqlDatabaseConfig): void {
  const { connection } = config;
  const missing: string[] = [];

  if (!connection.server) missing.push('server');
  if (!connection.database) missing.push('database');
  if (!connection.userName) missing.push('userName');
  if (!connection.password) missing.push('password');

  if (missing.length > 0) {
    throw new Error(
      `MSSQL configuration [${config.name}] missing required fields: ${missing.join(', ')}. ` +
        `Config: server=${connection.server || 'undefined'}, ` +
        `database=${connection.database || 'undefined'}, ` +
        `userName=${connection.userName || 'undefined'}, ` +
        `password=${connection.password ? '***' : 'undefined'}`,
    );
  }
}
