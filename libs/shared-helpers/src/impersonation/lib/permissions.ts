/**
 * Impersonation Permission Checking
 *
 * Utilities for checking user permissions related to impersonation.
 */
import type { AdminRoleConfig } from './types';
import { DEFAULT_ADMIN_ROLE_PREFIXES } from './types';

/**
 * Check if user has admin/elevated roles required for impersonation
 *
 * @param roles - Array of user's roles
 * @param config - Optional custom admin role configuration
 * @returns True if user has impersonation permission
 */
export function hasImpersonationPermission(
  roles: string[],
  config?: AdminRoleConfig,
): boolean {
  const adminPrefixes = config?.adminRolePrefixes ?? DEFAULT_ADMIN_ROLE_PREFIXES;

  return roles.some(role =>
    adminPrefixes.some(prefix => role.startsWith(prefix)),
  );
}

/**
 * Check if user is currently impersonating
 *
 * @param session - Session data containing impersonation fields
 * @returns True if user is currently impersonating another user
 */
export function isImpersonating(session: {
  impersonatedEmail?: string;
  impersonatingAdminEmail?: string;
}): boolean {
  return Boolean(session.impersonatedEmail && session.impersonatingAdminEmail);
}

/**
 * Get the effective email for the current session
 *
 * Returns the impersonated email if impersonating, otherwise the actual user email
 *
 * @param actualEmail - The actual logged-in user's email
 * @param session - Session data containing impersonation fields
 * @returns The effective email to use for permissions/display
 */
export function getEffectiveEmail(
  actualEmail: string,
  session: { impersonatedEmail?: string },
): string {
  return session.impersonatedEmail || actualEmail;
}

/**
 * Get the effective roles for the current session
 *
 * Returns the impersonated roles if impersonating, otherwise the actual user roles
 *
 * @param actualRoles - The actual logged-in user's roles
 * @param session - Session data containing impersonation fields
 * @returns The effective roles to use for permissions
 */
export function getEffectiveRoles(
  actualRoles: string[],
  session: { impersonatedRoles?: string[] },
): string[] {
  return session.impersonatedRoles ?? actualRoles;
}

/**
 * Validate that a user can be impersonated
 *
 * @param targetEmail - Email of user to impersonate
 * @param adminEmail - Email of admin attempting impersonation
 * @returns Object with valid flag and optional error message
 */
export function validateImpersonationTarget(
  targetEmail: string,
  adminEmail: string,
): { valid: boolean; errorMessage?: string } {
  // Normalize emails for comparison
  const normalizedTarget = targetEmail.toLowerCase().trim();
  const normalizedAdmin = adminEmail.toLowerCase().trim();

  // Prevent self-impersonation
  if (normalizedTarget === normalizedAdmin) {
    return {
      valid: false,
      errorMessage: 'You cannot impersonate yourself',
    };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedTarget)) {
    return {
      valid: false,
      errorMessage: 'Invalid email format',
    };
  }

  return { valid: true };
}

/**
 * Extract client IP address from request headers
 *
 * Handles proxied requests with multiple IPs in x-forwarded-for
 *
 * @param headers - Request headers (Headers object or plain object)
 * @returns Client IP address
 */
export function getClientIpFromHeaders(
  headers: Headers | Record<string, string | string[] | undefined>,
): string {
  const getHeader = (name: string): string | null => {
    if (headers instanceof Headers) {
      return headers.get(name);
    }
    const value = headers[name];
    return typeof value === 'string' ? value : value?.[0] || null;
  };

  const forwarded = getHeader('x-forwarded-for');
  if (forwarded) {
    // Take first IP from comma-separated list (original client)
    return forwarded.split(',')[0].trim();
  }

  return (
    getHeader('x-real-ip') ||
    getHeader('cf-connecting-ip') ||
    'unknown'
  );
}
