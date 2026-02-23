import { describe, expect, it } from 'vitest';

import {
  getConfigFromPreset,
  validateConfig,
} from '../../src/db/lib/config';
import type { DatabaseConfig } from '../../src/db/lib/types';

describe('Database Config', () => {
  describe('getConfigFromPreset', () => {
    it('should return AS database config', () => {
      const env = {
        DATABASE_AS_DASHBOARD_MASTER_USER_NAME: 'asuser',
        DATABASE_AS_DASHBOARD_MASTER_PASSWORD: 'aspass',
        DATABASE_AS_DASHBOARD_HOST: 'ashost',
        DATABASE_AS_DASHBOARD_PORT: '5433',
        DATABASE_AS_DASHBOARD_NAME: 'asdb',
      };

      const config = getConfigFromPreset('as', env);
      expect(config).toEqual({
        user: 'asuser',
        password: 'aspass',
        host: 'ashost',
        port: 5433,
        database: 'asdb',
        name: 'as',
      });
    });

    it('should return status-site database config', () => {
      const env = {
        DATABASE_STATUS_SITE_MASTER_USER_NAME: 'statususer',
        DATABASE_STATUS_SITE_MASTER_PASSWORD: 'statuspass',
        DATABASE_STATUS_SITE_HOST: 'statushost',
        DATABASE_STATUS_SITE_PORT: '5434',
        DATABASE_STATUS_SITE_NAME: 'statusdb',
      };

      const config = getConfigFromPreset('status-site', env);
      expect(config).toEqual({
        user: 'statususer',
        password: 'statuspass',
        host: 'statushost',
        port: 5434,
        database: 'statusdb',
        name: 'status-site',
      });
    });

    it('should fall back to default env vars', () => {
      const env = {
        DATABASE_MASTER_USER_NAME: 'defaultuser',
        DATABASE_MASTER_PASSWORD: 'defaultpass',
        DATABASE_HOST: 'defaulthost',
        DATABASE_PORT: '5432',
        DATABASE_NAME: 'defaultdb',
      };

      const config = getConfigFromPreset('as', env);
      expect(config).toEqual({
        user: 'defaultuser',
        password: 'defaultpass',
        host: 'defaulthost',
        port: 5432,
        database: 'defaultdb',
        name: 'as',
      });
    });
  });

  describe('validateConfig', () => {
    it('should pass for valid config', () => {
      const config = {
        user: 'user',
        password: 'pass',
        host: 'host',
        database: 'db',
        port: 5432,
      };

      expect(() => validateConfig(config)).not.toThrow();
    });

    it('should throw for missing user', () => {
      const config = {
        password: 'pass',
        host: 'host',
        database: 'db',
      } as DatabaseConfig;

      expect(() => validateConfig(config)).toThrow('Database configuration missing required fields: user');
    });

    it('should throw for multiple missing fields', () => {
      const config = {
        user: 'user',
        host: 'host',
      } as DatabaseConfig;

      expect(() => validateConfig(config)).toThrow('Database configuration missing required fields: password, database');
    });
  });
});
