/**
 * URL Utilities for Remix Applications
 *
 * This module provides utilities for working with URLs in Remix applications.
 *
 * @module shared-ui/url
 */

/**
 * Extracts the base server URL from a Remix Request object
 * @param request - Remix Request object
 * @param changeToHttpsIfNotLocalhost - If true, changes http to https for non-localhost URLs
 * @returns Base server URL (e.g., "https://example.com")
 * @example
 * getServerBaseUrl(request, true) // "https://example.com"
 * getServerBaseUrl(request, false) // "http://localhost:3000"
 */
export function getServerBaseUrl(request: Request, changeToHttpsIfNotLocalhost: boolean): string {
  // Get the requested URL
  const requestUrl = request.url;

  // Remove the page name
  const colonSlashSlashPosition = requestUrl.indexOf('://');
  const firstSlashPosition = requestUrl.indexOf('/', colonSlashSlashPosition + 3);
  let serverUrl = requestUrl.substring(0, firstSlashPosition);

  // Change the protocol to HTTPS if not localhost
  if (changeToHttpsIfNotLocalhost && !serverUrl.includes('localhost')) {
    serverUrl = serverUrl.replace('http://', 'https://');
  }

  return serverUrl;
}

/**
 * Extracts a cookie value from a Remix Request object
 * @param request - Remix Request object
 * @param cookieName - Name of the cookie to retrieve
 * @returns Cookie value or empty string if not found
 * @example
 * const token = getCookieValue(request, 'auth_token');
 */
export function getCookieValue(request: Request, cookieName: string): string {
  const cookieString = request.headers.get('Cookie');

  if (!cookieString) {
    return '';
  }

  const cookies = cookieString.split(';');

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    const eqIndex = trimmedCookie.indexOf('=');
    if (eqIndex === -1) continue;
    const name = trimmedCookie.substring(0, eqIndex);
    const value = trimmedCookie.substring(eqIndex + 1);

    if (name === cookieName) {
      return value || '';
    }
  }

  return '';
}
