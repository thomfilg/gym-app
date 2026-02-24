/**
 * Impersonation Module
 *
 * Shared utilities for user impersonation across admin applications.
 * Includes Microsoft Graph API validation, secure token management,
 * and permission checking.
 */

// Graph API
export {
  clearTokenCache as clearGraphApiTokenCache,
  getGraphApiAccessToken,
  getGraphApiConfigFromEnv,
  validateUserInAzureAD,
} from './lib/graph-api';

// Permissions
export {
  getClientIpFromHeaders,
  getEffectiveEmail,
  getEffectiveRoles,
  hasImpersonationPermission,
  isImpersonating,
  validateImpersonationTarget,
} from './lib/permissions';

// Token Management
export type { TokenDatabase } from './lib/token';
export {
  cleanupExpiredTokens,
  createImpersonationToken,
  generateSecureToken,
  getTokenById,
  validateAndConsumeToken,
} from './lib/token';

// Types
export type {
  AdminRoleConfig,
  AzureAdUserInfo,
  CreateImpersonationTokenInput,
  GraphApiConfig,
  ImpersonationLogEntry,
  ImpersonationLogUpdate,
  ImpersonationSessionData,
  ImpersonationTargetApp,
  ImpersonationTokenData,
  TokenValidationResult,
} from './lib/types';
export {
  DEFAULT_ADMIN_ROLE_PREFIXES,
  DEFAULT_TOKEN_EXPIRATION_MINUTES,
} from './lib/types';
