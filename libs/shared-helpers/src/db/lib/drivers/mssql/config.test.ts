import { describe, expect, it } from 'vitest';

import { getConfigFromMssqlPreset, validateConfig } from './config';

describe('MSSQL config', () => {
  describe('getConfigFromMssqlPreset', () => {
    it('should return metronome config from env', () => {
      const env = {
        METRONOME_HOST: 'metronome-server',
        METRONOME_DATABASE: 'Metronome',
        METRONOME_USER_NAME: 'reader',
        METRONOME_PASSWORD: 'secret',
        METRONOME_REQUEST_TIMEOUT_MS: '45000',
      } as unknown as NodeJS.ProcessEnv;

      const config = getConfigFromMssqlPreset('metronome', env);

      expect(config.name).toBe('metronome');
      expect(config.connection).toEqual({
        server: 'metronome-server',
        database: 'Metronome',
        userName: 'reader',
        password: 'secret',
        requestTimeoutMs: 45000,
        encrypt: false,
        trustServerCertificate: true,
      });
    });

    it('should return usrp config from env', () => {
      const env = {
        USRP_DATABASE_SERVER: 'usrp-server',
        USRP_DATABASE_NAME: 'UsrpDb',
        USRP_DATABASE_USER_NAME: 'admin',
        USRP_DATABASE_PASSWORD: 'pass123',
        USRP_DATABASE_REQUEST_TIMEOUT_MS: '30000',
        USRP_DATABASE_POOL_MIN: '5',
        USRP_DATABASE_POOL_MAX: '20',
      } as unknown as NodeJS.ProcessEnv;

      const config = getConfigFromMssqlPreset('usrp', env);

      expect(config.name).toBe('usrp');
      expect(config.connection).toEqual({
        server: 'usrp-server',
        database: 'UsrpDb',
        userName: 'admin',
        password: 'pass123',
        requestTimeoutMs: 30000,
        encrypt: true,
        trustServerCertificate: true,
      });
      expect(config.pool?.min).toBe(5);
      expect(config.pool?.max).toBe(20);
    });

    it('should use default values for missing env vars', () => {
      const env = {} as unknown as NodeJS.ProcessEnv;

      const config = getConfigFromMssqlPreset('metronome', env);

      expect(config.connection.server).toBe('');
      expect(config.connection.requestTimeoutMs).toBe(60000);
    });

    it('should throw for unknown preset', () => {
      expect(() =>
        getConfigFromMssqlPreset('unknown' as never),
      ).toThrow('Unknown MSSQL config preset: unknown');
    });

    it('should configure metronome with encrypt: false', () => {
      const env = {
        METRONOME_HOST: 'host',
        METRONOME_DATABASE: 'db',
        METRONOME_USER_NAME: 'user',
        METRONOME_PASSWORD: 'pass',
      } as unknown as NodeJS.ProcessEnv;

      const config = getConfigFromMssqlPreset('metronome', env);
      expect(config.connection.encrypt).toBe(false);
    });

    it('should configure usrp with encrypt: true', () => {
      const env = {
        USRP_DATABASE_SERVER: 'host',
        USRP_DATABASE_NAME: 'db',
        USRP_DATABASE_USER_NAME: 'user',
        USRP_DATABASE_PASSWORD: 'pass',
      } as unknown as NodeJS.ProcessEnv;

      const config = getConfigFromMssqlPreset('usrp', env);
      expect(config.connection.encrypt).toBe(true);
    });
  });

  describe('validateConfig', () => {
    it('should pass for valid config', () => {
      expect(() =>
        validateConfig({
          name: 'test',
          connection: {
            server: 'host',
            database: 'db',
            userName: 'user',
            password: 'pass',
            requestTimeoutMs: 30000,
          },
        }),
      ).not.toThrow();
    });

    it('should throw for missing server', () => {
      expect(() =>
        validateConfig({
          name: 'test',
          connection: {
            server: '',
            database: 'db',
            userName: 'user',
            password: 'pass',
            requestTimeoutMs: 30000,
          },
        }),
      ).toThrow('missing required fields: server');
    });

    it('should throw for multiple missing fields', () => {
      expect(() =>
        validateConfig({
          name: 'test',
          connection: {
            server: '',
            database: '',
            userName: '',
            password: '',
            requestTimeoutMs: 30000,
          },
        }),
      ).toThrow(
        'missing required fields: server, database, userName, password',
      );
    });

    it('should mask password in error message', () => {
      expect(() =>
        validateConfig({
          name: 'test',
          connection: {
            server: '',
            database: 'db',
            userName: 'user',
            password: 'secret',
            requestTimeoutMs: 30000,
          },
        }),
      ).toThrow('password=***');
    });
  });
});
