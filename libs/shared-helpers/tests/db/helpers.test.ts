import { describe, expect, it } from 'vitest';

import {
  buildInsertStatement,
  buildUpdateStatement,
  buildWhereClause,
  escapeIdentifier,
  formatSqlQuery,
  getFirstRow,
  getRowCount,
  getRows} from '../../src/db/lib/helpers';

describe('Database Helpers', () => {
  describe('getFirstRow', () => {
    it('should return first row from result', () => {
      const result = { rows: [{ id: 1 }, { id: 2 }], rowCount: 2 } as never;
      expect(getFirstRow(result)).toEqual({ id: 1 });
    });

    it('should return null for empty result', () => {
      expect(getFirstRow()).toBeNull();
      expect(getFirstRow({ rows: [], rowCount: 0 } as never)).toBeNull();
    });
  });

  describe('getRows', () => {
    it('should return all rows from result', () => {
      const result = { rows: [{ id: 1 }, { id: 2 }], rowCount: 2 } as never;
      expect(getRows(result)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should return empty array for undefined result', () => {
      expect(getRows()).toEqual([]);
      expect(getRows({ rows: undefined as never, rowCount: 0 } as never)).toEqual([]);
    });
  });

  describe('getRowCount', () => {
    it('should return row count from result', () => {
      expect(getRowCount({ rows: [], rowCount: 5 } as never)).toBe(5);
    });

    it('should return 0 for undefined result', () => {
      expect(getRowCount()).toBe(0);
      expect(getRowCount({ rows: [], rowCount: null } as never)).toBe(0);
    });
  });

  describe('escapeIdentifier', () => {
    it('should escape identifiers properly', () => {
      expect(escapeIdentifier('column')).toBe('"column"');
      expect(escapeIdentifier('col"umn')).toBe('"col""umn"');
      expect(escapeIdentifier('schema.table')).toBe('"schema.table"');
    });
  });

  describe('buildWhereClause', () => {
    it('should build WHERE clause for simple conditions', () => {
      const { whereClause, params } = buildWhereClause({
        id: 1,
        name: 'John',
      });
      expect(whereClause).toBe('WHERE "id" = $1 AND "name" = $2');
      expect(params).toEqual([1, 'John']);
    });

    it('should handle null values', () => {
      const { whereClause, params } = buildWhereClause({
        id: 1,
        deleted_at: null,
      });
      expect(whereClause).toBe('WHERE "id" = $1 AND "deleted_at" IS NULL');
      expect(params).toEqual([1]);
    });

    it('should handle array values with IN clause', () => {
      const { whereClause, params } = buildWhereClause({
        id: [1, 2, 3],
        status: 'active',
      });
      expect(whereClause).toBe('WHERE "id" IN ($1, $2, $3) AND "status" = $4');
      expect(params).toEqual([1, 2, 3, 'active']);
    });

    it('should skip undefined values', () => {
      const { whereClause, params } = buildWhereClause({
        id: 1,
        name: undefined,
        status: 'active',
      });
      expect(whereClause).toBe('WHERE "id" = $1 AND "status" = $2');
      expect(params).toEqual([1, 'active']);
    });

    it('should handle param offset', () => {
      const { whereClause, params } = buildWhereClause(
        { id: 1, name: 'John' },
        2,
      );
      expect(whereClause).toBe('WHERE "id" = $3 AND "name" = $4');
      expect(params).toEqual([1, 'John']);
    });

    it('should return empty where clause for empty conditions', () => {
      const { whereClause, params } = buildWhereClause({});
      expect(whereClause).toBe('');
      expect(params).toEqual([]);
    });
  });

  describe('buildInsertStatement', () => {
    it('should build INSERT statement', () => {
      const { statement, params } = buildInsertStatement(
        'users',
        { id: 1, name: 'John', email: 'john@example.com' },
      );
      expect(statement).toBe('INSERT INTO users ("id", "name", "email") VALUES ($1, $2, $3)');
      expect(params).toEqual([1, 'John', 'john@example.com']);
    });

    it('should add RETURNING clause when specified', () => {
      const { statement } = buildInsertStatement(
        'users',
        { name: 'John' },
        'id, created_at',
      );
      expect(statement).toContain('RETURNING id, created_at');
    });
  });

  describe('buildUpdateStatement', () => {
    it('should build UPDATE statement', () => {
      const { statement, params } = buildUpdateStatement(
        'users',
        { name: 'Jane', email: 'jane@example.com' },
        { id: 1 },
      );
      expect(statement).toBe('UPDATE users SET "name" = $1, "email" = $2 WHERE "id" = $3');
      expect(params).toEqual(['Jane', 'jane@example.com', 1]);
    });

    it('should handle multiple conditions', () => {
      const { statement, params } = buildUpdateStatement(
        'users',
        { status: 'inactive' },
        { id: [1, 2, 3], role: 'admin' },
      );
      expect(statement).toBe('UPDATE users SET "status" = $1 WHERE "id" IN ($2, $3, $4) AND "role" = $5');
      expect(params).toEqual(['inactive', 1, 2, 3, 'admin']);
    });

    it('should add RETURNING clause when specified', () => {
      const { statement } = buildUpdateStatement(
        'users',
        { name: 'Jane' },
        { id: 1 },
        'updated_at',
      );
      expect(statement).toContain('RETURNING updated_at');
    });
  });

  describe('formatSqlQuery', () => {
    it('should format SQL query', () => {
      const query = `
        SELECT   id,  name
        FROM     users
        WHERE    status = 'active'
          AND    created_at > '2024-01-01'
      `;
      const formatted = formatSqlQuery(query);
      expect(formatted).toBe(
        'SELECT id, name FROM users WHERE status = \'active\' AND created_at > \'2024-01-01\'',
      );
    });

    it('should handle parentheses', () => {
      const query = 'SELECT * FROM users WHERE ( id = 1 OR id = 2 )';
      expect(formatSqlQuery(query)).toBe('SELECT * FROM users WHERE (id = 1 OR id = 2)');
    });
  });
});
