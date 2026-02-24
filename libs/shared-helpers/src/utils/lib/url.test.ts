import { describe, expect, it } from 'vitest';

import { getCookieValue, getServerBaseUrl } from './url';

/**
 * Helper to create a minimal Request with a Cookie header
 */
function createRequestWithCookies(cookieHeader: string, url = 'https://example.com/page'): Request {
  return new Request(url, {
    headers: { Cookie: cookieHeader },
  });
}

function createRequestWithoutCookies(url = 'https://example.com/page'): Request {
  return new Request(url);
}

describe('getCookieValue', () => {
  it('should return empty string when no Cookie header is present', () => {
    const request = createRequestWithoutCookies();
    expect(getCookieValue(request, 'test')).toBe('');
  });

  it('should return empty string when cookie is not found', () => {
    const request = createRequestWithCookies('other=value');
    expect(getCookieValue(request, 'test')).toBe('');
  });

  it('should return the cookie value for a simple cookie', () => {
    const request = createRequestWithCookies('session=abc123');
    expect(getCookieValue(request, 'session')).toBe('abc123');
  });

  it('should return the correct cookie from multiple cookies', () => {
    const request = createRequestWithCookies('a=1; b=2; c=3');
    expect(getCookieValue(request, 'b')).toBe('2');
  });

  it('should handle cookies with = in the value (base64 padding)', () => {
    const jwtValue = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.signature==';
    const request = createRequestWithCookies(`sso_token=${jwtValue}`);
    expect(getCookieValue(request, 'sso_token')).toBe(jwtValue);
  });

  it('should handle cookies with multiple = in the value', () => {
    // Note: a semicolon in a value would split it, so test a clean base64 case
    const encodedValue = 'dGVzdA==';
    const request = createRequestWithCookies(`data=${encodedValue}; other=val`);
    expect(getCookieValue(request, 'data')).toBe(encodedValue);
  });

  it('should handle JWT tokens with base64url encoding (no padding)', () => {
    const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.sig';
    const request = createRequestWithCookies(`status_site_sso=${jwt}`);
    expect(getCookieValue(request, 'status_site_sso')).toBe(jwt);
  });

  it('should handle cookie with empty value', () => {
    const request = createRequestWithCookies('empty=; other=val');
    expect(getCookieValue(request, 'empty')).toBe('');
  });

  it('should handle whitespace around cookies', () => {
    // trim() removes leading/trailing whitespace of each cookie pair
    const request = createRequestWithCookies('  spaced=value ; other=2');
    expect(getCookieValue(request, 'spaced')).toBe('value');
    expect(getCookieValue(request, 'other')).toBe('2');
  });

  it('should skip malformed cookies without =', () => {
    const request = createRequestWithCookies('malformed; good=value');
    expect(getCookieValue(request, 'good')).toBe('value');
    expect(getCookieValue(request, 'malformed')).toBe('');
  });

  it('should handle the as_dashboard_sso cookie name', () => {
    const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.payload.sig';
    const request = createRequestWithCookies(`as_dashboard_sso=${jwt}`);
    expect(getCookieValue(request, 'as_dashboard_sso')).toBe(jwt);
  });
});

describe('getServerBaseUrl', () => {
  it('should extract base URL from a full URL', () => {
    const request = new Request('https://example.com/some/path?query=1');
    expect(getServerBaseUrl(request, false)).toBe('https://example.com');
  });

  it('should keep http for localhost when changeToHttps is true', () => {
    const request = new Request('http://localhost:3000/page');
    expect(getServerBaseUrl(request, true)).toBe('http://localhost:3000');
  });

  it('should change http to https for non-localhost when changeToHttps is true', () => {
    const request = new Request('http://example.com/page');
    expect(getServerBaseUrl(request, true)).toBe('https://example.com');
  });

  it('should keep https as-is when changeToHttps is true', () => {
    const request = new Request('https://example.com/page');
    expect(getServerBaseUrl(request, true)).toBe('https://example.com');
  });

  it('should keep http as-is when changeToHttps is false', () => {
    const request = new Request('http://example.com/page');
    expect(getServerBaseUrl(request, false)).toBe('http://example.com');
  });
});
