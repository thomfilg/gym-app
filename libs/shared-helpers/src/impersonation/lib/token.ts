/**
 * Impersonation Token Management
 *
 * Handles secure token generation, storage, and validation for cross-app
 * impersonation flows. Tokens are stored in the database with expiration.
 */
import { randomBytes } from 'crypto';

import { logger } from '../../utils/lib/logger';
import type {
  CreateImpersonationTokenInput,
  ImpersonationTokenData,
  TokenValidationResult,
} from './types';
import { DEFAULT_TOKEN_EXPIRATION_MINUTES } from './types';

/**
 * Database interface for token operations
 * This allows the token logic to work with any database implementation
 * Compatible with pg QueryResult structure
 */
export interface TokenDatabase {
  query<T extends Record<string, unknown> = Record<string, unknown>>(
    sql: string,
    values?: unknown[],
  ): Promise<{ rows: T[] } | undefined>;
}

/**
 * Generate a cryptographically secure random token
 *
 * @param length - Length of the token in bytes (default: 32, produces 64 hex chars)
 * @returns Secure random hex string
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Create an impersonation token record in the database
 *
 * @param db - Database instance
 * @param input - Token creation input data
 * @returns The created token data or null if failed
 */
export async function createImpersonationToken(
  db: TokenDatabase,
  input: CreateImpersonationTokenInput,
): Promise<ImpersonationTokenData | null> {
  // Input validation
  if (!input.adminEmail?.trim() || !input.targetEmail?.trim()) {
    logger.error('Invalid email parameters for token creation');
    return null;
  }

  if (!Array.isArray(input.targetRoles)) {
    logger.error('Invalid target roles for token creation');
    return null;
  }

  if (!input.targetApp) {
    logger.error('Target app is required for token creation');
    return null;
  }

  const token = generateSecureToken();
  const expirationMinutes = input.expirationMinutes ?? DEFAULT_TOKEN_EXPIRATION_MINUTES;
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + expirationMinutes * 60 * 1000);

  const query = `
    INSERT INTO impersonation_token (
      token,
      admin_email,
      target_email,
      target_roles,
      target_app,
      created_at,
      expires_at,
      ip_address
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `;

  const values = [
    token,
    input.adminEmail,
    input.targetEmail,
    input.targetRoles.join(','),
    input.targetApp,
    createdAt.toISOString(),
    expiresAt.toISOString(),
    input.ipAddress,
  ];

  try {
    const result = await db.query<{ id: number }>(query, values);
    const id = result?.rows[0]?.id;

    if (!id) {
      logger.error('Failed to create impersonation token - no ID returned');
      return null;
    }

    logger.info('Impersonation token created', {
      id,
      adminEmail: input.adminEmail,
      targetEmail: input.targetEmail,
      targetApp: input.targetApp,
      expiresAt: expiresAt.toISOString(),
    });

    return {
      id,
      token,
      adminEmail: input.adminEmail,
      targetEmail: input.targetEmail,
      targetRoles: input.targetRoles,
      targetApp: input.targetApp,
      createdAt,
      expiresAt,
      ipAddress: input.ipAddress,
    };
  } catch (error) {
    logger.error('Error creating impersonation token', error);
    return null;
  }
}

/**
 * Validate and consume an impersonation token
 *
 * This function:
 * 1. Looks up the token in the database
 * 2. Verifies it hasn't expired
 * 3. Verifies it hasn't been used
 * 4. Marks the token as used (single-use)
 * 5. Returns the token data if valid
 *
 * @param db - Database instance
 * @param token - The token string to validate
 * @returns Validation result with token data if valid
 */
export async function validateAndConsumeToken(
  db: TokenDatabase,
  token: string,
): Promise<TokenValidationResult> {
  // Validate token format before database query
  // Token should be a 64-character hex string (32 bytes)
  if (!token || typeof token !== 'string' || !/^[a-f0-9]{64}$/i.test(token)) {
    logger.warn('Invalid token format', { tokenLength: token?.length });
    return {
      valid: false,
      errorMessage: 'Invalid token format',
    };
  }

  // Look up the token
  const selectQuery = `
    SELECT
      id,
      token,
      admin_email as "adminEmail",
      target_email as "targetEmail",
      target_roles as "targetRoles",
      target_app as "targetApp",
      created_at as "createdAt",
      expires_at as "expiresAt",
      used_at as "usedAt",
      ip_address as "ipAddress"
    FROM impersonation_token
    WHERE token = $1
  `;

  try {
    const result = await db.query<{
      id: number;
      token: string;
      adminEmail: string;
      targetEmail: string;
      targetRoles: string;
      targetApp: string;
      createdAt: string;
      expiresAt: string;
      usedAt: string | null;
      ipAddress: string;
    }>(selectQuery, [token]);

    const row = result?.rows[0];

    if (!row) {
      logger.warn('Impersonation token not found', { tokenPrefix: token.slice(0, 8) });
      return {
        valid: false,
        errorMessage: 'Invalid or expired token',
      };
    }

    // Check if already used
    if (row.usedAt) {
      logger.warn('Impersonation token already used', {
        id: row.id,
        usedAt: row.usedAt,
      });
      return {
        valid: false,
        errorMessage: 'Token has already been used',
      };
    }

    // Check if expired
    const expiresAt = new Date(row.expiresAt);
    if (expiresAt < new Date()) {
      logger.warn('Impersonation token expired', {
        id: row.id,
        expiresAt: row.expiresAt,
      });
      return {
        valid: false,
        errorMessage: 'Token has expired',
      };
    }

    // Mark as used
    const updateQuery = `
      UPDATE impersonation_token
      SET used_at = $2
      WHERE id = $1
    `;
    await db.query(updateQuery, [row.id, new Date().toISOString()]);

    logger.info('Impersonation token validated and consumed', {
      id: row.id,
      adminEmail: row.adminEmail,
      targetEmail: row.targetEmail,
      targetApp: row.targetApp,
    });

    return {
      valid: true,
      data: {
        id: row.id,
        token: row.token,
        adminEmail: row.adminEmail,
        targetEmail: row.targetEmail,
        targetRoles: row.targetRoles ? row.targetRoles.split(',').map(r => r.trim()) : [],
        targetApp: row.targetApp as ImpersonationTokenData['targetApp'],
        createdAt: new Date(row.createdAt),
        expiresAt: new Date(row.expiresAt),
        usedAt: new Date(),
        ipAddress: row.ipAddress,
      },
    };
  } catch (error) {
    logger.error('Error validating impersonation token', error);
    return {
      valid: false,
      errorMessage: 'Failed to validate token',
    };
  }
}

/**
 * Clean up expired tokens from the database
 *
 * Should be called periodically (e.g., via cron job) to remove old tokens
 *
 * @param db - Database instance
 * @returns Number of tokens deleted
 */
export async function cleanupExpiredTokens(db: TokenDatabase): Promise<number> {
  const query = `
    DELETE FROM impersonation_token
    WHERE expires_at < $1 OR used_at IS NOT NULL
    RETURNING id
  `;

  try {
    const result = await db.query<{ id: number }>(query, [new Date().toISOString()]);
    const deletedCount = result?.rows.length || 0;

    if (deletedCount > 0) {
      logger.info(`Cleaned up ${deletedCount} expired/used impersonation tokens`);
    }

    return deletedCount;
  } catch (error) {
    logger.error('Error cleaning up impersonation tokens', error);
    return 0;
  }
}

/**
 * Get a token by ID (for debugging/admin purposes)
 *
 * @param db - Database instance
 * @param id - Token ID
 * @returns Token data or null
 */
export async function getTokenById(
  db: TokenDatabase,
  id: number,
): Promise<ImpersonationTokenData | null> {
  const query = `
    SELECT
      id,
      token,
      admin_email as "adminEmail",
      target_email as "targetEmail",
      target_roles as "targetRoles",
      target_app as "targetApp",
      created_at as "createdAt",
      expires_at as "expiresAt",
      used_at as "usedAt",
      ip_address as "ipAddress"
    FROM impersonation_token
    WHERE id = $1
  `;

  try {
    const result = await db.query<{
      id: number;
      token: string;
      adminEmail: string;
      targetEmail: string;
      targetRoles: string;
      targetApp: string;
      createdAt: string;
      expiresAt: string;
      usedAt: string | null;
      ipAddress: string;
    }>(query, [id]);

    const row = result?.rows[0];

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      token: row.token,
      adminEmail: row.adminEmail,
      targetEmail: row.targetEmail,
      targetRoles: row.targetRoles ? row.targetRoles.split(',').map(r => r.trim()) : [],
      targetApp: row.targetApp as ImpersonationTokenData['targetApp'],
      createdAt: new Date(row.createdAt),
      expiresAt: new Date(row.expiresAt),
      usedAt: row.usedAt ? new Date(row.usedAt) : undefined,
      ipAddress: row.ipAddress,
    };
  } catch (error) {
    logger.error('Error fetching impersonation token', error, { id });
    return null;
  }
}
