import { describe, expect, it } from 'vitest';

import { getConfigFromPreset, validateConfig } from './config';
import type { DatabaseConfig } from './types';

describe('config', () => {
  describe('getConfigFromPreset', () => {
    it('should return PG config for "as" preset', () => {
      const config = getConfigFromPreset('as', {
        DATABASE_AS_DASHBOARD_MASTER_USER_NAME: 'user',
        DATABASE_AS_DASHBOARD_MASTER_PASSWORD: 'pass',
        DATABASE_AS_DASHBOARD_HOST: 'host',
        DATABASE_AS_DASHBOARD_PORT: '5432',
        DATABASE_AS_DASHBOARD_NAME: 'as-db',
      });

      expect(config).toEqual(
        expect.objectContaining({
          user: 'user',
          password: 'pass',
          host: 'host',
          port: 5432,
          database: 'as-db',
          name: 'as',
        }),
      );
    });

    it('should return PG config for "status-site" preset', () => {
      const config = getConfigFromPreset('status-site', {
        DATABASE_STATUS_SITE_MASTER_USER_NAME: 'user',
        DATABASE_STATUS_SITE_MASTER_PASSWORD: 'pass',
        DATABASE_STATUS_SITE_HOST: 'host',
        DATABASE_STATUS_SITE_PORT: '5433',
        DATABASE_STATUS_SITE_NAME: 'status',
      });

      expect(config).toEqual(
        expect.objectContaining({
          user: 'user',
          password: 'pass',
          host: 'host',
          port: 5433,
          database: 'status',
          name: 'status-site',
        }),
      );
    });

    it('should fall back to generic DATABASE_* env vars', () => {
      const config = getConfigFromPreset('as', {
        DATABASE_MASTER_USER_NAME: 'generic-user',
        DATABASE_MASTER_PASSWORD: 'generic-pass',
        DATABASE_HOST: 'generic-host',
        DATABASE_PORT: '5555',
        DATABASE_NAME: 'generic-db',
      });

      expect(config).toEqual(
        expect.objectContaining({
          user: 'generic-user',
          password: 'generic-pass',
          host: 'generic-host',
          port: 5555,
          database: 'generic-db',
        }),
      );
    });

    it('should fall back to DATABASE_URL connection string', () => {
      const config = getConfigFromPreset('as', {
        DATABASE_URL_DASHBOARD: 'postgres://urluser:urlpass@urlhost:5444/urldb',
      });

      expect(config).toEqual(
        expect.objectContaining({
          user: 'urluser',
          password: 'urlpass',
          host: 'urlhost',
          port: 5444,
          database: 'urldb',
        }),
      );
    });

    it('should return MSSQL config for "metronome" preset', () => {
      const config = getConfigFromPreset('metronome', {
        MSSQL_METRONOME_SERVER: 'mssql-host',
        MSSQL_METRONOME_DATABASE: 'met-db',
        MSSQL_METRONOME_USER: 'mssql-user',
        MSSQL_METRONOME_PASSWORD: 'mssql-pass',
      });

      expect(config).toHaveProperty('dbClass');
      expect(config).toHaveProperty('name', 'metronome');
      expect(config).toHaveProperty('connection');
    });

    it('should return MSSQL config for "usrp" preset', () => {
      const config = getConfigFromPreset('usrp', {
        MSSQL_USRP_SERVER: 'usrp-host',
        MSSQL_USRP_DATABASE: 'usrp-db',
        MSSQL_USRP_USER: 'usrp-user',
        MSSQL_USRP_PASSWORD: 'usrp-pass',
      });

      expect(config).toHaveProperty('dbClass');
      expect(config).toHaveProperty('name', 'usrp');
    });

    it('should throw for unknown preset', () => {
      expect(() =>
        getConfigFromPreset('unknown' as never),
      ).toThrow('Unknown database config preset: unknown');
    });

    it('should use default port 5432 when no port env var set', () => {
      const config = getConfigFromPreset('as', {
        DATABASE_AS_DASHBOARD_MASTER_USER_NAME: 'user',
        DATABASE_AS_DASHBOARD_MASTER_PASSWORD: 'pass',
        DATABASE_AS_DASHBOARD_HOST: 'host',
      });

      expect(config).toHaveProperty('port', 5432);
    });

    it('should use default database name when no env var set', () => {
      const config = getConfigFromPreset('as', {});
      expect(config).toHaveProperty('database', 'as');
    });

    it('should use default database name for status-site when no env var set', () => {
      const config = getConfigFromPreset('status-site', {});
      expect(config).toHaveProperty('database', 'status-site');
    });
  });

  describe('validateConfig', () => {
    it('should pass with all required fields', () => {
      const config: DatabaseConfig = {
        user: 'user',
        password: 'pass',
        host: 'host',
        database: 'db',
      };

      expect(() => validateConfig(config)).not.toThrow();
    });

    it('should throw when user is missing', () => {
      const config = {
        password: 'pass',
        host: 'host',
        database: 'db',
      } as DatabaseConfig;

      expect(() => validateConfig(config)).toThrow('missing required fields');
    });

    it('should throw when multiple fields are missing', () => {
      const config = {} as DatabaseConfig;

      expect(() => validateConfig(config)).toThrow('missing required fields');
    });

    it('should include config details in error', () => {
      const config = { name: 'test' } as DatabaseConfig;

      try {
        validateConfig(config);
        expect.unreachable('should have thrown');
      } catch (err) {
        expect((err as Error).message).toContain('test');
        expect((err as { config: DatabaseConfig }).config).toBeDefined();
      }
    });
  });
});
