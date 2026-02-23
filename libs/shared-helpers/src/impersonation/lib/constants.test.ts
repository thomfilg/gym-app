import { describe, expect, it } from 'vitest';

import { DEFAULT_ADMIN_ROLE_PREFIXES, DEFAULT_TOKEN_EXPIRATION_MINUTES } from './constants';

describe('impersonation constants', () => {
  it('should define admin role prefixes', () => {
    expect(DEFAULT_ADMIN_ROLE_PREFIXES).toEqual([
      'AAD-AsDashboard-User-Admin-',
      'AAD-AsDashboard-User-Elevated-',
    ]);
  });

  it('should define token expiration as 5 minutes', () => {
    expect(DEFAULT_TOKEN_EXPIRATION_MINUTES).toBe(5);
  });
});
