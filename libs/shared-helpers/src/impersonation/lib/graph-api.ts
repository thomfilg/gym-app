/**
 * Microsoft Graph API Client
 *
 * Provides user validation against Azure AD using Microsoft Graph API.
 * Uses client credentials flow (application permissions) for service-to-service auth.
 */
import { logger } from '../../utils/lib/logger';
import type { AzureAdUserInfo, GraphApiConfig } from './types';

const GRAPH_API_BASE_URL = 'https://graph.microsoft.com/v1.0';
const AZURE_AD_TOKEN_URL = 'https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token';
const FETCH_TIMEOUT_MS = 10000; // 10 second timeout for API calls

/**
 * Escape a string value for use in OData filter expressions
 * Single quotes must be escaped as '' (doubled)
 */
function escapeODataString(value: string): string {
  return value.replace(/'/g, '\'\'');
}

/**
 * Create a fetch request with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: globalThis.RequestInit,
  timeoutMs: number = FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// API response types
interface TokenResponse {
  access_token: string;
  expires_in?: number;
}

interface GraphUser {
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
}

interface GraphUsersResponse {
  value: GraphUser[];
}

interface GraphGroupMembership {
  '@odata.type': string;
  displayName: string;
}

interface GraphMemberOfResponse {
  value: GraphGroupMembership[];
}

/**
 * Cache for access tokens to avoid unnecessary token requests
 */
interface TokenCache {
  accessToken: string;
  expiresAt: Date;
}

const tokenCache = new Map<string, TokenCache>();

/**
 * Get an access token for Microsoft Graph API using client credentials flow
 *
 * @param config - Graph API configuration (tenant, client ID, secret)
 * @returns Access token string
 * @throws Error if token acquisition fails
 */
export async function getGraphApiAccessToken(config: GraphApiConfig): Promise<string> {
  const cacheKey = `${config.tenantId}:${config.clientId}`;
  const cached = tokenCache.get(cacheKey);

  // Return cached token if still valid (with 5 minute buffer)
  if (cached && cached.expiresAt.getTime() > Date.now() + 5 * 60 * 1000) {
    return cached.accessToken;
  }

  const tokenUrl = AZURE_AD_TOKEN_URL.replace('{tenantId}', config.tenantId);

  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  try {
    const response = await fetchWithTimeout(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Failed to acquire Graph API access token', {
        status: response.status,
        error: errorText,
      });
      throw new Error(`Failed to acquire access token: ${response.status}`);
    }

    const data = await response.json() as TokenResponse;
    const accessToken = data.access_token;
    const expiresIn = data.expires_in ?? 3600;

    // Cache the token
    tokenCache.set(cacheKey, {
      accessToken,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
    });

    return accessToken;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.error('Graph API token request timed out');
      throw new Error('Token request timed out');
    }
    logger.error('Error acquiring Graph API access token', error);
    throw error;
  }
}

/**
 * Validate if a user exists in Azure AD by email
 *
 * @param email - Email address to validate
 * @param config - Graph API configuration
 * @returns User info if exists, or error info if not found/failed
 */
export async function validateUserInAzureAD(
  email: string,
  config: GraphApiConfig,
): Promise<AzureAdUserInfo> {
  // Input validation
  if (!email || typeof email !== 'string') {
    return {
      exists: false,
      errorMessage: 'Email address is required',
    };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Validate email format and length
  if (trimmedEmail.length > 254) {
    return {
      exists: false,
      errorMessage: 'Email address too long',
    };
  }

  // Check for control characters or null bytes (ASCII 0-31 and 127)
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1F\x7F]/.test(trimmedEmail)) {
    return {
      exists: false,
      errorMessage: 'Email contains invalid characters',
    };
  }

  try {
    const accessToken = await getGraphApiAccessToken(config);

    // Escape email for OData filter expression to prevent injection
    // OData string literals require single quotes to be doubled
    const escapedEmail = escapeODataString(trimmedEmail);

    // Search for user by mail or userPrincipalName
    // Using $filter to find by email (mail or userPrincipalName)
    const searchUrl = `${GRAPH_API_BASE_URL}/users?$filter=mail eq '${encodeURIComponent(escapedEmail)}' or userPrincipalName eq '${encodeURIComponent(escapedEmail)}'&$select=id,displayName,mail,userPrincipalName`;

    const response = await fetchWithTimeout(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Graph API user search failed', {
        status: response.status,
        error: errorText,
        email: trimmedEmail,
      });

      return {
        exists: false,
        errorMessage: `Failed to search for user: ${response.status}`,
      };
    }

    const data = await response.json() as GraphUsersResponse;
    const users = data.value ?? [];

    if (users.length === 0) {
      logger.info(`User not found in Azure AD: ${trimmedEmail}`);
      return {
        exists: false,
        errorMessage: 'User not found in Azure Active Directory',
      };
    }

    const user = users[0];

    // Optionally get user's group memberships
    const groups = await getUserGroups(user.id, accessToken);

    logger.info(`User found in Azure AD: ${trimmedEmail}`, {
      displayName: user.displayName,
      groupCount: groups.length,
    });

    return {
      exists: true,
      displayName: user.displayName,
      userPrincipalName: user.userPrincipalName,
      mail: user.mail,
      groups,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.error('Graph API user search timed out', { email: trimmedEmail });
      return {
        exists: false,
        errorMessage: 'Request timed out',
      };
    }
    logger.error('Error validating user in Azure AD', error, { email: trimmedEmail });
    return {
      exists: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get user's group memberships from Azure AD
 *
 * @param userId - Azure AD user ID
 * @param accessToken - Graph API access token
 * @returns Array of group display names
 */
async function getUserGroups(userId: string, accessToken: string): Promise<string[]> {
  try {
    const groupsUrl = `${GRAPH_API_BASE_URL}/users/${encodeURIComponent(userId)}/memberOf?$select=displayName`;

    const response = await fetchWithTimeout(groupsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      logger.warn('Failed to fetch user groups', { userId, status: response.status });
      return [];
    }

    const data = await response.json() as GraphMemberOfResponse;
    const groups = (data.value ?? [])
      .filter((item) => item['@odata.type'] === '#microsoft.graph.group')
      .map((group) => group.displayName);

    return groups;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.warn('User groups request timed out', { userId });
    } else {
      logger.warn('Error fetching user groups', error, { userId });
    }
    return [];
  }
}

/**
 * Clear the token cache (useful for testing or credential rotation)
 */
export function clearTokenCache(): void {
  tokenCache.clear();
}

/**
 * Create a Graph API config from environment variables
 *
 * @returns GraphApiConfig or null if environment variables are not set
 */
export function getGraphApiConfigFromEnv(): GraphApiConfig | null {
  const tenantId = process.env['AZURE_AD_TENANT_ID'];
  const clientId = process.env['AZURE_AD_CLIENT_ID'];
  const clientSecret = process.env['AZURE_AD_CLIENT_SECRET'];

  if (!tenantId || !clientId || !clientSecret) {
    logger.warn('Graph API configuration not found in environment variables');
    return null;
  }

  return {
    tenantId,
    clientId,
    clientSecret,
  };
}
