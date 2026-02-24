import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPoolQuery = vi.fn();
const mockPoolEnd = vi.fn();
const mockClientQuery = vi.fn();
const mockClientRelease = vi.fn();
const mockPoolConnect = vi.fn();

vi.mock('pg', () => ({
  Pool: class {
    totalCount = 5;
    idleCount = 3;
    waitingCount = 1;
    query = mockPoolQuery;
    end = mockPoolEnd;
    connect = mockPoolConnect;
  },
}));

vi.mock('./config', () => ({
  validateConfig: vi.fn(),
}));

vi.mock('./logger', () => ({
  getLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
  createQueryProfiler: () => vi.fn().mockReturnValue(0),
}));

import { Database } from './database';

describe('Database', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPoolConnect.mockResolvedValue({
      query: mockClientQuery,
      release: mockClientRelease,
    });
  });

  describe('query', () => {
    it('should execute a query without params', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [{ id: 1 }], rowCount: 1 });
      const db = new Database(() => ({ host: 'localhost' }));

      const result = await db.query('SELECT 1');

      expect(result).toEqual({ rows: [{ id: 1 }], rowCount: 1 });
      expect(mockPoolQuery).toHaveBeenCalledWith('SELECT 1');
    });

    it('should execute a query with params', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [{ id: 1 }], rowCount: 1 });
      const db = new Database(() => ({ host: 'localhost' }));

      await db.query('SELECT $1', [42]);

      expect(mockPoolQuery).toHaveBeenCalledWith('SELECT $1', [42]);
    });

    it('should throw and log error on query failure', async () => {
      mockPoolQuery.mockRejectedValue(new Error('query failed'));
      const db = new Database(() => ({ host: 'localhost' }));

      await expect(db.query('BAD SQL')).rejects.toThrow('query failed');
    });

    it('should use custom logError when provided', async () => {
      const logError = vi.fn();
      mockPoolQuery.mockRejectedValue(new Error('fail'));
      const db = new Database(() => ({ host: 'localhost', logError }));

      await expect(db.query('BAD SQL')).rejects.toThrow('fail');
      expect(logError).toHaveBeenCalled();
    });

    it('should call logQuery when logging enabled', async () => {
      const logQuery = vi.fn();
      mockPoolQuery.mockResolvedValue({ rows: [], rowCount: 0 });
      const db = new Database(() => ({
        host: 'localhost',
        enableLogging: true,
        logQuery,
      }));

      await db.query('SELECT 1');

      expect(logQuery).toHaveBeenCalled();
    });
  });

  describe('bulkInsert', () => {
    it('should return early for empty rows', async () => {
      const db = new Database(() => ({ host: 'localhost' }));

      await db.bulkInsert('test_table', ['col1'], []);

      expect(mockPoolQuery).not.toHaveBeenCalled();
    });

    it('should insert rows with correct SQL', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [], rowCount: 1 });
      const db = new Database(() => ({ host: 'localhost' }));

      await db.bulkInsert('test_table', ['col1', 'col2'], [
        ['a', 'b'],
        ['c', 'd'],
      ]);

      expect(mockPoolQuery).toHaveBeenCalledTimes(1);
      const [sql, params] = mockPoolQuery.mock.calls[0];
      expect(sql).toContain('INSERT INTO test_table');
      expect(sql).toContain('($1, $2), ($3, $4)');
      expect(params).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should handle onConflict clause', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [], rowCount: 1 });
      const db = new Database(() => ({ host: 'localhost' }));

      await db.bulkInsert('test_table', ['id', 'name'], [['1', 'test']], {
        onConflict: 'DO NOTHING',
        conflictColumns: ['id'],
      });

      const [sql] = mockPoolQuery.mock.calls[0];
      expect(sql).toContain('ON CONFLICT (id) DO NOTHING');
    });

    it('should call onProgress callback', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [], rowCount: 1 });
      const onProgress = vi.fn();
      const db = new Database(() => ({ host: 'localhost' }));

      await db.bulkInsert('test_table', ['col1'], [['a'], ['b']], {
        onProgress,
      });

      expect(onProgress).toHaveBeenCalledWith(2, 2);
    });

    it('should chunk large inserts', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [], rowCount: 1 });
      const db = new Database(() => ({ host: 'localhost' }));
      const rows = Array.from({ length: 5 }, (_, i) => [`val${i}`]);

      await db.bulkInsert('test_table', ['col1'], rows, {
        chunkSize: 2,
      });

      // 5 rows / chunkSize 2 = 3 chunks
      expect(mockPoolQuery).toHaveBeenCalledTimes(3);
    });
  });

  describe('transaction', () => {
    it('should execute callback in transaction', async () => {
      mockClientQuery.mockResolvedValue(undefined);
      const db = new Database(() => ({ host: 'localhost' }));

      const result = await db.transaction(async (client) => {
        await client.query('INSERT INTO t VALUES (1)');
        return 'done';
      });

      expect(result).toBe('done');
      expect(mockClientQuery).toHaveBeenCalledWith('BEGIN');
      expect(mockClientQuery).toHaveBeenCalledWith('COMMIT');
      expect(mockClientRelease).toHaveBeenCalled();
    });

    it('should rollback on error', async () => {
      mockClientQuery.mockResolvedValue(undefined);
      const db = new Database(() => ({ host: 'localhost' }));

      await expect(
        db.transaction(async () => {
          throw new Error('tx failed');
        }),
      ).rejects.toThrow('tx failed');

      expect(mockClientQuery).toHaveBeenCalledWith('ROLLBACK');
      expect(mockClientRelease).toHaveBeenCalled();
    });
  });

  describe('end', () => {
    it('should call pool.end()', async () => {
      mockPoolEnd.mockResolvedValue(undefined);
      const db = new Database(() => ({ host: 'localhost' }));

      await db.end();

      expect(mockPoolEnd).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('should delegate to end()', async () => {
      mockPoolEnd.mockResolvedValue(undefined);
      const db = new Database(() => ({ host: 'localhost' }));

      await db.close();

      expect(mockPoolEnd).toHaveBeenCalled();
    });
  });

  describe('isHealthy', () => {
    it('should return true when SELECT 1 succeeds', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [{ '?column?': 1 }] });
      const db = new Database(() => ({ host: 'localhost' }));

      expect(await db.isHealthy()).toBe(true);
      expect(mockPoolQuery).toHaveBeenCalledWith('SELECT 1');
    });

    it('should return false when query fails', async () => {
      mockPoolQuery.mockRejectedValue(new Error('connection refused'));
      const db = new Database(() => ({ host: 'localhost' }));

      expect(await db.isHealthy()).toBe(false);
    });
  });

  describe('getPoolStats', () => {
    it('should return pool statistics', async () => {
      mockPoolQuery.mockResolvedValue({ rows: [] });
      const db = new Database(() => ({ host: 'localhost' }));

      // Initialize pool
      await db.isHealthy();

      expect(db.getPoolStats()).toEqual({
        total: 5,
        idle: 3,
        used: 2,
        pending: 1,
      });
    });

    it('should return zero stats when pool not initialized', () => {
      const db = new Database(() => ({ host: 'localhost' }));

      expect(db.getPoolStats()).toEqual({
        total: 0,
        idle: 0,
        used: 0,
        pending: 0,
      });
    });
  });

  describe('getConnectionCount', () => {
    it('should return total count', async () => {
      const db = new Database(() => ({ host: 'localhost' }));
      expect(db.getConnectionCount()).toBe(5);
    });
  });

  describe('getIdleConnectionCount', () => {
    it('should return idle count', async () => {
      const db = new Database(() => ({ host: 'localhost' }));
      expect(db.getIdleConnectionCount()).toBe(3);
    });
  });

  describe('getWaitingCount', () => {
    it('should return waiting count', async () => {
      const db = new Database(() => ({ host: 'localhost' }));
      expect(db.getWaitingCount()).toBe(1);
    });
  });
});
