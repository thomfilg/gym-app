import { getConfigFromMssqlPreset } from './drivers/mssql/config';
import { SqlServerDatabase } from './drivers/mssql/database';
import type { DatabaseConfig, DatabaseConfigPreset } from './types';

function parseConnectionUrl(url?: string): Partial<DatabaseConfig> | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    return {
      user: parsed.username || undefined,
      password: parsed.password || undefined,
      host: parsed.hostname || undefined,
      port: parsed.port ? parseInt(parsed.port) : undefined,
      database: parsed.pathname.slice(1) || undefined, // Remove leading '/'
    };
  } catch {
    return null;
  }
}

const CONFIG_PRESETS: Record<DatabaseConfigPreset, (env: NodeJS.ProcessEnv) => Record<string, unknown>> = {
  'as': (env) => {
    const urlConfig = parseConnectionUrl(env.DATABASE_URL_DASHBOARD);
    return {
      user: env.DATABASE_AS_DASHBOARD_MASTER_USER_NAME || env.DATABASE_MASTER_USER_NAME || urlConfig?.user,
      password: env.DATABASE_AS_DASHBOARD_MASTER_PASSWORD || env.DATABASE_MASTER_PASSWORD || urlConfig?.password,
      host: env.DATABASE_AS_DASHBOARD_HOST || env.DATABASE_HOST || urlConfig?.host,
      port: parseInt(env.DATABASE_AS_DASHBOARD_PORT || env.DATABASE_PORT || String(urlConfig?.port || 5432)),
      database: env.DATABASE_AS_DASHBOARD_NAME || env.DATABASE_NAME || urlConfig?.database || 'as',
      name: 'as',
    };
  },
  'status-site': (env) => {
    const urlConfig = parseConnectionUrl(env.DATABASE_URL_STATUS);
    return {
      user: env.DATABASE_STATUS_SITE_MASTER_USER_NAME || env.DATABASE_MASTER_USER_NAME || urlConfig?.user,
      password: env.DATABASE_STATUS_SITE_MASTER_PASSWORD || env.DATABASE_MASTER_PASSWORD || urlConfig?.password,
      host: env.DATABASE_STATUS_SITE_HOST || env.DATABASE_HOST || urlConfig?.host,
      port: parseInt(env.DATABASE_STATUS_SITE_PORT || env.DATABASE_PORT || String(urlConfig?.port || 5432)),
      database: env.DATABASE_STATUS_SITE_NAME || env.DATABASE_NAME || urlConfig?.database || 'status-site',
      name: 'status-site',
    };
  },
  'metronome': (env) => {
    const mssqlConfig = getConfigFromMssqlPreset('metronome', env);
    return { dbClass: SqlServerDatabase, ...mssqlConfig };
  },
  'usrp': (env) => {
    const mssqlConfig = getConfigFromMssqlPreset('usrp', env);
    return { dbClass: SqlServerDatabase, ...mssqlConfig };
  },
};

export function getConfigFromPreset(preset: DatabaseConfigPreset, env: NodeJS.ProcessEnv = process.env): Record<string, unknown> {
  const configBuilder = CONFIG_PRESETS[preset];
  if (!configBuilder) {
    throw new Error(`Unknown database config preset: ${preset}`);
  }
  return configBuilder(env);
}

class ConfigError extends Error {
  public config: DatabaseConfig;

  constructor(message: string, config: DatabaseConfig) {
    super(message);
    this.name = 'ConfigError';
    this.config = config;
    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}

export function validateConfig(config: DatabaseConfig): void {
  const required = ['user', 'password', 'host', 'database'];
  const missing = required.filter(key => !config[key as keyof DatabaseConfig]);

  if (missing.length > 0) {
    const configDetails = {
      name: config.name,
      host: config.host || 'undefined',
      port: config.port || 'undefined',
      database: config.database || 'undefined',
      user: config.user || 'undefined',
      password: config.password ? '***' : 'undefined',
    };
    throw new ConfigError(
      `Database configuration missing required fields: ${missing.join(', ')}. Config: ${JSON.stringify(configDetails)}`,
      config,
    );
  }
}
