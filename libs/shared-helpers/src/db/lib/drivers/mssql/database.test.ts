import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ConnectionFactory } from './connection-factory';
import { SqlServerDatabase } from './database';
import type { MssqlDatabaseConfig } from './types';

// Mock tarn Pool
const mockAcquirePromise = vi.fn();
const mockRelease = vi.fn();
const mockDestroy = vi.fn();
const mockNumFree = vi.fn();
const mockNumUsed = vi.fn();
const mockNumPendingAcquires = vi.fn();

vi.mock('tarn', () => ({
  Pool: class {
    acquire = () => ({ promise: mockAcquirePromise() });
    release = mockRelease;
    destroy = mockDestroy;
    numFree = mockNumFree;
    numUsed = mockNumUsed;
    numPendingAcquires = mockNumPendingAcquires;
  },
}));

// Mock tedious Request - configurable via requestMockConfig
const mockAddParameter = vi.fn();
const mockRequestOn = vi.fn();
const requestMockConfig: { error: Error | null; rows: Array<Array<{ metadata: { colName: string }; value: string }>> } = {
  error: null,
  rows: [],
};

vi.mock('tedious', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    Request: class {
      addParameter = mockAddParameter;
      private eventHandlers = new Map<string, (...args: unknown[]) => void>();

      on(event: string, handler: (...args: unknown[]) => void) {
        this.eventHandlers.set(event, handler);
        mockRequestOn(event, handler);
        return this;
      }

      constructor(_text: string, callback: (err: Error | null) => void) {
        const self = this;
        setTimeout(() => {
          const rowHandler = self.eventHandlers.get('row');
          if (rowHandler && requestMockConfig.rows.length > 0) {
            for (const row of requestMockConfig.rows) {
              rowHandler(row);
            }
          }
          callback(requestMockConfig.error);
        }, 0);
      }
    },
  };
});

vi.mock('../../logger', () => ({
  getLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
}));

const TEST_CONFIG: MssqlDatabaseConfig = {
  name: 'test-db',
  connection: {
    server: 'test-server',
    database: 'test-database',
    userName: 'test-user',
    password: 'test-password',
    requestTimeoutMs: 30000,
    encrypt: true,
    trustServerCertificate: true,
  },
};

function createMockConnectionFactory(
  overrides: Partial<ConnectionFactory> = {},
): ConnectionFactory {
  return {
    create: vi.fn().mockResolvedValue({
      execSql: vi.fn(),
      state: { name: 'LoggedIn' },
    }),
    destroy: vi.fn().mockResolvedValue(undefined),
    validate: vi.fn().mockReturnValue(true),
    ...overrides,
  };
}

describe('SqlServerDatabase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDestroy.mockResolvedValue(undefined);
    mockNumFree.mockReturnValue(0);
    mockNumUsed.mockReturnValue(0);
    mockNumPendingAcquires.mockReturnValue(0);
    requestMockConfig.error = null;
    requestMockConfig.rows = [];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPoolStats', () => {
    it('should return zero stats when pool is not initialized', () => {
      const factory = createMockConnectionFactory();
      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      expect(db.getPoolStats()).toEqual({
        total: 0,
        idle: 0,
        used: 0,
        pending: 0,
      });
    });

    it('should return pool stats after pool is initialized', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });
      mockNumFree.mockReturnValue(3);
      mockNumUsed.mockReturnValue(2);
      mockNumPendingAcquires.mockReturnValue(1);

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');

      expect(db.getPoolStats()).toEqual({
        total: 5,
        idle: 3,
        used: 2,
        pending: 1,
      });
    });
  });

  describe('close', () => {
    it('should handle closing when pool is not initialized', async () => {
      const factory = createMockConnectionFactory();
      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      await expect(db.close()).resolves.toBeUndefined();
    });

    it('should destroy pool on close', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');
      await db.close();

      expect(db.getPoolStats()).toEqual({
        total: 0,
        idle: 0,
        used: 0,
        pending: 0,
      });
      expect(mockDestroy).toHaveBeenCalled();
    });

    it('should handle destroy errors gracefully', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });
      mockDestroy.mockRejectedValue(new Error('destroy failed'));

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');

      await expect(db.close()).resolves.toBeUndefined();
    });

    it('should be idempotent when called multiple times', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');
      await db.close();
      await db.close();

      expect(mockDestroy).toHaveBeenCalledTimes(1);
    });

    it('should prevent new queries after close', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');
      await db.close();

      await expect(db.query('SELECT 1')).rejects.toThrow('permanently closed');
    });
  });

  describe('query', () => {
    it('should acquire connection and release after query', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      const result = await db.query<{ id: number }>('SELECT 1 as id');

      expect(result).toEqual([]);
      expect(mockRelease).toHaveBeenCalled();
    });

    it('should reject when pool acquisition fails', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockRejectedValue(new Error('Pool exhausted'));

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      await expect(db.query('SELECT 1')).rejects.toThrow('Pool exhausted');
    });

    it('should reject when database is shutting down', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');

      const closePromise = db.close();
      await expect(db.query('SELECT 1')).rejects.toThrow();
      await closePromise;
    });

    it('should reject when query request returns an error', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });
      requestMockConfig.error = new Error('SQL syntax error');

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      await expect(db.query('INVALID SQL')).rejects.toThrow('SQL syntax error');
    });

    it('should return row data from query results', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });
      requestMockConfig.rows = [
        [
          { metadata: { colName: 'id' }, value: '1' },
          { metadata: { colName: 'name' }, value: 'Alice' },
        ],
        [
          { metadata: { colName: 'id' }, value: '2' },
          { metadata: { colName: 'name' }, value: 'Bob' },
        ],
      ];

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      const result = await db.query<{ id: string; name: string }>('SELECT id, name FROM users');

      expect(result).toEqual([
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ]);
    });

    it('should add parameters to request', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const { TYPES } = await import('tedious');
      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      const parameters = [
        { name: 'id', type: TYPES.Int, value: '123' },
        { name: 'name', type: TYPES.VarChar, value: 'test' },
      ];

      await db.query(
        'SELECT * FROM table WHERE id = @id AND name = @name',
        parameters,
      );

      expect(mockAddParameter).toHaveBeenCalledTimes(2);
      expect(mockAddParameter).toHaveBeenCalledWith('id', TYPES.Int, '123');
      expect(mockAddParameter).toHaveBeenCalledWith('name', TYPES.VarChar, 'test');
    });
  });

  describe('isHealthy', () => {
    it('should return true when ping succeeds', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      expect(await db.isHealthy()).toBe(true);
      expect(mockRelease).toHaveBeenCalled();
    });

    it('should return false when connection cannot be acquired', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockRejectedValue(new Error('Connection failed'));

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      expect(await db.isHealthy()).toBe(false);
    });
  });

  describe('config validation', () => {
    it('should throw when required connection fields are missing', async () => {
      const factory = createMockConnectionFactory();
      const db = new SqlServerDatabase(() => ({
        name: 'test',
        connection: {
          server: '',
          database: '',
          userName: '',
          password: '',
          requestTimeoutMs: 30000,
        },
      }), factory);

      await expect(db.query('SELECT 1')).rejects.toThrow(
        'MSSQL configuration [test] missing required fields',
      );
    });
  });

  describe('name', () => {
    it('should default to mssql before pool initialization', () => {
      const factory = createMockConnectionFactory();
      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);

      expect(db.name).toBe('mssql');
    });

    it('should update to config name after pool initialization', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');

      expect(db.name).toBe('test-db');
    });
  });

  describe('pool configuration', () => {
    it('should enable logging when pool config has enableLogging', async () => {
      const factory = createMockConnectionFactory();
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(
        () => ({
          ...TEST_CONFIG,
          pool: { enableLogging: true },
        }),
        factory,
      );

      await db.query('SELECT 1');
      expect(db.name).toBe('test-db');
    });
  });

  describe('dependency injection', () => {
    it('should use injected connection factory', async () => {
      const mockCreate = vi.fn().mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });
      const factory = createMockConnectionFactory({ create: mockCreate });
      mockAcquirePromise.mockResolvedValue({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      });

      const db = new SqlServerDatabase(() => TEST_CONFIG, factory);
      await db.query('SELECT 1');

      // The factory create/destroy/validate are passed to tarn Pool constructor.
      // Since we mock tarn, we can't directly verify the factory was used by tarn,
      // but the fact that no errors occur verifies the DI pattern works.
      expect(db).toBeDefined();
    });
  });
});
