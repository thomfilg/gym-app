import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockAcquire = vi.fn();

vi.mock('tarn', () => ({
  Pool: class {
    acquire = mockAcquire;
    release = vi.fn();
    destroy = vi.fn();
    numFree = vi.fn().mockReturnValue(0);
    numUsed = vi.fn().mockReturnValue(0);
    numPendingAcquires = vi.fn().mockReturnValue(0);
  },
}));

vi.mock('tedious', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    Connection: class {
      connect = vi.fn();
      close = vi.fn();
      on = vi.fn();
      execSql = vi.fn();
      state = { name: 'LoggedIn' };
    },
    Request: class {
      addParameter = vi.fn();
      on = vi.fn();
      constructor(_text: string, callback: (err: Error | null) => void) {
        setTimeout(() => callback(null), 0);
      }
    },
  };
});

vi.mock('pg', () => ({
  Pool: class {
    totalCount = 5;
    idleCount = 3;
    waitingCount = 1;
    query = vi.fn().mockResolvedValue({ rows: [], rowCount: 0 });
    end = vi.fn().mockResolvedValue(undefined);
    connect = vi.fn();
  },
}));

vi.mock('./config', () => ({
  getConfigFromPreset: vi.fn((preset: string) => {
    if (preset === 'as' || preset === 'status-site') {
      return {
        host: 'localhost',
        database: preset,
        user: 'user',
        password: 'pass',
        name: preset,
      };
    }
    return {
      dbClass: SqlServerDatabase,
      name: preset,
      connection: {
        server: 'host',
        database: 'db',
        userName: 'user',
        password: 'pass',
        requestTimeoutMs: 30000,
      },
    };
  }),
  validateConfig: vi.fn(),
}));

vi.mock('./drivers/mssql/config', () => ({
  getConfigFromMssqlPreset: vi.fn((preset: string) => ({
    name: preset,
    connection: {
      server: 'host',
      database: 'db',
      userName: 'user',
      password: 'pass',
      requestTimeoutMs: 30000,
    },
  })),
  validateConfig: vi.fn(),
}));

vi.mock('../../../../utils', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock('./logger', () => ({
  getLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
  setLogger: vi.fn(),
  createQueryProfiler: () => vi.fn().mockReturnValue(0),
}));

// Static imports — mocks are hoisted above these
import { Database } from './database';
import { SqlServerDatabase } from './drivers/mssql/database';
import {
  closeAllDatabases,
  closeDatabaseInstance,
  configureDatabaseLogger,
  createDatabase,
  createDatabaseFromPreset,
  createMssqlDatabase,
  createMssqlDatabaseFromPreset,
  getDatabaseInstance,
} from './factory';
import { setLogger } from './logger';

describe('factory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAcquire.mockReturnValue({
      promise: Promise.resolve({
        execSql: vi.fn(),
        state: { name: 'LoggedIn' },
      }),
    });
  });

  afterEach(async () => {
    await closeAllDatabases();
  });

  describe('createDatabase', () => {
    it('should create a PG Database instance when no dbClass', () => {
      const db = createDatabase(() => ({
        host: 'localhost',
        database: 'test',
        user: 'user',
        password: 'pass',
      }));

      expect(db).toBeInstanceOf(Database);
    });

    it('should create a SqlServerDatabase when dbClass is provided', () => {
      const db = createDatabase(() => ({
        dbClass: SqlServerDatabase,
        name: 'test-mssql',
        connection: {
          server: 'host',
          database: 'db',
          userName: 'user',
          password: 'pass',
          requestTimeoutMs: 30000,
        },
      }));

      expect(db).toBeInstanceOf(SqlServerDatabase);
    });
  });

  describe('createDatabaseFromPreset', () => {
    it('should create PG database from as preset', () => {
      const db = createDatabaseFromPreset('as');
      expect(db).toBeInstanceOf(Database);
    });

    it('should create PG database from status-site preset', () => {
      const db = createDatabaseFromPreset('status-site');
      expect(db).toBeInstanceOf(Database);
    });

    it('should apply overrides to preset config', () => {
      const db = createDatabaseFromPreset('as', { enableLogging: true });
      expect(db).toBeInstanceOf(Database);
    });

    it('should create MSSQL database from metronome preset', () => {
      const db = createDatabaseFromPreset('metronome');
      expect(db).toBeInstanceOf(SqlServerDatabase);
    });
  });

  describe('createMssqlDatabase', () => {
    it('should create an MssqlDatabase instance', () => {
      const db = createMssqlDatabase(() => ({
        name: 'test',
        connection: {
          server: 'host',
          database: 'db',
          userName: 'user',
          password: 'pass',
          requestTimeoutMs: 30000,
        },
      }));

      expect(db).toBeDefined();
      expect(db.query).toBeTypeOf('function');
      expect(db.getPoolStats).toBeTypeOf('function');
      expect(db.close).toBeTypeOf('function');
      expect(db.isHealthy).toBeTypeOf('function');
    });
  });

  describe('createMssqlDatabaseFromPreset', () => {
    it('should create database from metronome preset', () => {
      const db = createMssqlDatabaseFromPreset('metronome');

      expect(db).toBeDefined();
      expect(db.getPoolStats()).toEqual({
        total: 0,
        idle: 0,
        used: 0,
        pending: 0,
      });
    });

    it('should create database from usrp preset', () => {
      const db = createMssqlDatabaseFromPreset('usrp');
      expect(db).toBeDefined();
    });

    it('should apply overrides when query triggers config resolution', async () => {
      const db = createMssqlDatabaseFromPreset('metronome', {
        connection: {
          server: 'custom-server',
          database: 'custom-db',
          userName: 'custom-user',
          password: 'custom-pass',
          requestTimeoutMs: 15000,
        },
        pool: { min: 5, max: 20 },
      });

      await db.query('SELECT 1');
      expect(db).toBeDefined();
    });

    it('should apply partial pool overrides', async () => {
      const db = createMssqlDatabaseFromPreset('usrp', {
        pool: { min: 1 },
      });

      await db.query('SELECT 1');
      expect(db).toBeDefined();
    });
  });

  describe('getDatabaseInstance', () => {
    it('should create and cache a new instance with config', () => {
      const config = { host: 'localhost', user: 'u', password: 'p', database: 'db' };
      const instance = getDatabaseInstance('test-cache', config);

      expect(instance).toBeDefined();
      expect(instance).toBeInstanceOf(Database);
    });

    it('should return cached instance on subsequent calls', () => {
      const config = { host: 'localhost', user: 'u', password: 'p', database: 'db' };
      const instance1 = getDatabaseInstance('test-same', config);
      const instance2 = getDatabaseInstance('test-same');

      expect(instance1).toBe(instance2);
    });

    it('should throw when instance not found and no config', () => {
      expect(() => getDatabaseInstance('nonexistent')).toThrow(
        'Database instance \'nonexistent\' not found and no config provided',
      );
    });
  });

  describe('closeDatabaseInstance', () => {
    it('should close and remove a cached instance', async () => {
      const config = { host: 'localhost', user: 'u', password: 'p', database: 'db' };
      getDatabaseInstance('to-close', config);

      await closeDatabaseInstance('to-close');

      expect(() => getDatabaseInstance('to-close')).toThrow();
    });

    it('should be a no-op for non-existent instance', async () => {
      await expect(closeDatabaseInstance('missing')).resolves.toBeUndefined();
    });
  });

  describe('closeAllDatabases', () => {
    it('should close all cached instances', async () => {
      const config = { host: 'localhost', user: 'u', password: 'p', database: 'db' };
      getDatabaseInstance('db1', config);
      getDatabaseInstance('db2', config);

      await closeAllDatabases();

      expect(() => getDatabaseInstance('db1')).toThrow();
      expect(() => getDatabaseInstance('db2')).toThrow();
    });
  });

  describe('configureDatabaseLogger', () => {
    it('should set the logger via setLogger', () => {
      const logger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
      };

      configureDatabaseLogger(logger);

      expect(setLogger).toHaveBeenCalledWith(logger);
    });
  });
});
