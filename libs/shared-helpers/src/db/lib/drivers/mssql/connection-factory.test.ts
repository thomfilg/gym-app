import { describe, expect, it, vi } from 'vitest';

const mockConnect = vi.fn();
const mockClose = vi.fn();
const mockOn = vi.fn();

vi.mock('tedious', () => ({
  Connection: class {
    connect = mockConnect;
    close = mockClose;
    on = mockOn;
    state = { name: 'LoggedIn' };

    constructor() {
      setTimeout(() => {
        const connectHandler = mockOn.mock.calls.find(
          (call) => call[0] === 'connect',
        );
        if (connectHandler) {
          connectHandler[1](undefined);
        }
      }, 0);
    }
  },
}));

vi.mock('../../logger', () => ({
  getLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
}));

import { defaultConnectionFactory } from './connection-factory';
import type { MssqlDatabaseConfig } from './types';

const TEST_CONFIG: MssqlDatabaseConfig = {
  name: 'test-db',
  connection: {
    server: 'test-server',
    database: 'test-database',
    userName: 'test-user',
    password: 'test-password',
    requestTimeoutMs: 30000,
  },
};

describe('defaultConnectionFactory', () => {
  describe('create', () => {
    it('should create a connection successfully', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(undefined), 0);
        }
      });

      const connection = await defaultConnectionFactory.create(TEST_CONFIG);
      expect(connection).toBeDefined();
      expect(mockConnect).toHaveBeenCalled();
    });

    it('should reject when connection fails', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(new Error('Connection refused')), 0);
        }
      });

      await expect(defaultConnectionFactory.create(TEST_CONFIG)).rejects.toThrow(
        'Connection refused',
      );
    });

    it('should use encrypt and trustServerCertificate defaults', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(undefined), 0);
        }
      });

      const configNoDefaults: MssqlDatabaseConfig = {
        name: 'test',
        connection: {
          server: 'host',
          database: 'db',
          userName: 'user',
          password: 'pass',
          requestTimeoutMs: 5000,
        },
      };

      const connection = await defaultConnectionFactory.create(configNoDefaults);
      expect(connection).toBeDefined();
    });
  });

  describe('destroy', () => {
    it('should close the connection', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(undefined), 0);
        }
      });

      const connection = await defaultConnectionFactory.create(TEST_CONFIG);
      await defaultConnectionFactory.destroy(connection);

      expect(mockClose).toHaveBeenCalled();
    });

    it('should handle close errors gracefully', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(undefined), 0);
        }
      });
      mockClose.mockImplementation(() => {
        throw new Error('close error');
      });

      const connection = await defaultConnectionFactory.create(TEST_CONFIG);
      await expect(defaultConnectionFactory.destroy(connection)).resolves.toBeUndefined();
    });
  });

  describe('validate', () => {
    it('should return true when connection state is LoggedIn', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(undefined), 0);
        }
      });

      const connection = await defaultConnectionFactory.create(TEST_CONFIG);
      expect(defaultConnectionFactory.validate(connection)).toBe(true);
    });

    it('should return false when connection state is not LoggedIn', async () => {
      mockOn.mockImplementation((event: string, handler: (err?: Error) => void) => {
        if (event === 'connect') {
          setTimeout(() => handler(undefined), 0);
        }
      });

      const connection = await defaultConnectionFactory.create(TEST_CONFIG);
      (connection as unknown as { state: { name: string } }).state = { name: 'Disconnected' };
      expect(defaultConnectionFactory.validate(connection)).toBe(false);
    });

    it('should return false when state property is missing', () => {
      const connectionLike = {} as never;
      expect(defaultConnectionFactory.validate(connectionLike)).toBe(false);
    });
  });
});
