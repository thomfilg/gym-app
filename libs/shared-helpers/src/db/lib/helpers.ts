import type { QueryResult, QueryResultRow } from 'pg';

export function getFirstRow<T extends QueryResultRow = QueryResultRow>(result?: QueryResult<T>): T | null {
  if (!result || !result.rows || result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

export function getRows<T extends QueryResultRow = QueryResultRow>(result?: QueryResult<T>): T[] {
  if (!result || !result.rows) {
    return [];
  }
  return result.rows;
}

export function getRowCount(result?: QueryResult): number {
  return result?.rowCount ?? 0;
}

export function escapeIdentifier(identifier: string): string {
  return `"${identifier.replace(/"/g, '""')}"`;
}

export function buildWhereClause(
  conditions: Record<string, unknown>,
  paramOffset: number = 0,
): { whereClause: string; params: unknown[] } {
  const clauses: string[] = [];
  const params: unknown[] = [];
  let paramIndex = paramOffset;

  for (const [key, value] of Object.entries(conditions)) {
    if (value === null) {
      clauses.push(`${escapeIdentifier(key)} IS NULL`);
    } else if (value === undefined) {
      continue;
    } else if (Array.isArray(value)) {
      const placeholders = value.map(() => `$${++paramIndex}`).join(', ');
      clauses.push(`${escapeIdentifier(key)} IN (${placeholders})`);
      params.push(...value);
    } else {
      clauses.push(`${escapeIdentifier(key)} = $${++paramIndex}`);
      params.push(value);
    }
  }

  const whereClause = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
  return { whereClause, params };
}

export function buildInsertStatement(
  table: string,
  data: Record<string, unknown>,
  returning?: string,
): { statement: string; params: unknown[] } {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const columnList = columns.map(escapeIdentifier).join(', ');

  let statement = `INSERT INTO ${table} (${columnList}) VALUES (${placeholders})`;
  if (returning) {
    statement += ` RETURNING ${returning}`;
  }

  return { statement, params: values };
}

export function buildUpdateStatement(
  table: string,
  data: Record<string, unknown>,
  conditions: Record<string, unknown>,
  returning?: string,
): { statement: string; params: unknown[] } {
  const setColumns = Object.keys(data);
  const setValues = Object.values(data);
  const setClauses = setColumns.map((col, i) => `${escapeIdentifier(col)} = $${i + 1}`).join(', ');

  const { whereClause, params: whereParams } = buildWhereClause(conditions, setValues.length);

  let statement = `UPDATE ${table} SET ${setClauses} ${whereClause}`;
  if (returning) {
    statement += ` RETURNING ${returning}`;
  }

  return { statement, params: [...setValues, ...whereParams] };
}

export function formatSqlQuery(query: string): string {
  return query
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s*,\s*/g, ', ')
    .trim();
}
