/**
 * Impersonation Types
 *
 * Shared TypeScript types for the impersonation feature.
 */

/**
 * Configuration for Microsoft Graph API client
 */
export interface GraphApiConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
}

/**
 * Response from Azure AD user validation
 */
export interface AzureAdUserInfo {
  exists: boolean;
  displayName?: string;
  userPrincipalName?: string;
  mail?: string;
  groups?: string[];
  errorMessage?: string;
}

/**
 * Target application for impersonation
 */
export type ImpersonationTargetApp =
  | 'status-site'
  | 'status-site-admin'
  | 'as-dashboard'
  | 'as-dashboard-admin';

/**
 * Data stored in impersonation token record
 */
export interface ImpersonationTokenData {
  id?: number;
  token: string;
  adminEmail: string;
  targetEmail: string;
  targetRoles: string[];
  targetApp: ImpersonationTargetApp;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
  ipAddress: string;
}

/**
 * Input for creating an impersonation token
 */
export interface CreateImpersonationTokenInput {
  adminEmail: string;
  targetEmail: string;
  targetRoles: string[];
  targetApp: ImpersonationTargetApp;
  ipAddress: string;
  expirationMinutes?: number;
}

/**
 * Result of token validation
 */
export interface TokenValidationResult {
  valid: boolean;
  data?: ImpersonationTokenData;
  errorMessage?: string;
}

/**
 * Impersonation log entry for audit purposes
 */
export interface ImpersonationLogEntry {
  adminEmail: string;
  targetEmail: string;
  startTime: string;
  ipAddress: string;
  userAgent: string;
  targetApp?: ImpersonationTargetApp;
}

/**
 * Impersonation log update data
 */
export interface ImpersonationLogUpdate {
  endTime: string;
  durationMinutes: number;
}

/**
 * Impersonation session data stored in cookie session
 */
export interface ImpersonationSessionData {
  impersonatedEmail?: string;
  impersonatedRoles?: string[];
  impersonatingAdminEmail?: string;
  impersonationStartTime?: string;
  impersonationLogId?: string;
}

/**
 * Admin role configuration for permission checking
 */
export interface AdminRoleConfig {
  /** Role prefixes that grant impersonation permission */
  adminRolePrefixes: string[];
}

export { DEFAULT_ADMIN_ROLE_PREFIXES, DEFAULT_TOKEN_EXPIRATION_MINUTES } from './constants';
