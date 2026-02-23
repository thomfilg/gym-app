/**
 * JWT (JSON Web Token) Utilities
 *
 * This module provides utilities for working with JWT tokens.
 *
 * @module shared-helpers/jwt
 */

import { jwtDecode } from 'jwt-decode';

import { logger } from './logger';

/**
 * Decodes a base64 encoded JWT token and returns the decoded object
 * @param tokenString - JWT token string to decode
 * @returns Decoded token object or null if invalid
 * @example
 * const decoded = decodeJWT(tokenString);
 * if (decoded) {
 *   console.log(decoded.exp); // expiration timestamp
 * }
 */
export function decodeJWT(tokenString: string): unknown | null {
  if (!tokenString) {
    return null;
  }

  try {
    return jwtDecode(tokenString);
  } catch (error) {
    logger.error(`In decodeJWT, tokenstring: ${tokenString} error: `, error);
    return null;
  }
}
