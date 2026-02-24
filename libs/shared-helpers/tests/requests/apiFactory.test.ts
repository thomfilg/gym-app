import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { apiFactory } from '../../src/requests/apiFactory';

const TEST_BASE_URL = 'http://localhost:9998';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('apiFactory', () => {
  describe('request method', () => {
    it('should make GET requests by default', async () => {
      let receivedMethod: string | undefined;

      server.use(
        http.get(`${TEST_BASE_URL}/api/test`, ({ request }) => {
          receivedMethod = request.method;
          return HttpResponse.json({ data: 'test' });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ data: string }>({ path: '/api/test' });

      expect(receivedMethod).toBe('GET');
      expect(result).toEqual({ data: 'test' });
    });

    it('should make POST requests with body', async () => {
      let receivedMethod: string | undefined;
      let receivedBody: unknown;

      server.use(
        http.post(`${TEST_BASE_URL}/api/create`, async ({ request }) => {
          receivedMethod = request.method;
          receivedBody = await request.json();
          return HttpResponse.json({ id: 1, created: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ id: number; created: boolean }>({
        path: '/api/create',
        method: 'POST',
        body: { name: 'New Item' },
      });

      expect(receivedMethod).toBe('POST');
      expect(receivedBody).toEqual({ name: 'New Item' });
      expect(result).toEqual({ id: 1, created: true });
    });

    it('should make PUT requests with body', async () => {
      let receivedMethod: string | undefined;
      let receivedBody: unknown;

      server.use(
        http.put(`${TEST_BASE_URL}/api/update/123`, async ({ request }) => {
          receivedMethod = request.method;
          receivedBody = await request.json();
          return HttpResponse.json({ updated: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ updated: boolean }>({
        path: '/api/update/123',
        method: 'PUT',
        body: { name: 'Updated Item' },
      });

      expect(receivedMethod).toBe('PUT');
      expect(receivedBody).toEqual({ name: 'Updated Item' });
      expect(result).toEqual({ updated: true });
    });

    it('should make DELETE requests', async () => {
      let receivedMethod: string | undefined;

      server.use(
        http.delete(`${TEST_BASE_URL}/api/delete/123`, ({ request }) => {
          receivedMethod = request.method;
          return HttpResponse.json({ deleted: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ deleted: boolean }>({
        path: '/api/delete/123',
        method: 'DELETE',
      });

      expect(receivedMethod).toBe('DELETE');
      expect(result).toEqual({ deleted: true });
    });

    it('should make PATCH requests with body', async () => {
      let receivedMethod: string | undefined;
      let receivedBody: unknown;

      server.use(
        http.patch(`${TEST_BASE_URL}/api/patch/123`, async ({ request }) => {
          receivedMethod = request.method;
          receivedBody = await request.json();
          return HttpResponse.json({ patched: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ patched: boolean }>({
        path: '/api/patch/123',
        method: 'PATCH',
        body: { field: 'updated value' },
      });

      expect(receivedMethod).toBe('PATCH');
      expect(receivedBody).toEqual({ field: 'updated value' });
      expect(result).toEqual({ patched: true });
    });
  });

  describe('path handling', () => {
    it('should handle paths without leading slash', async () => {
      server.use(
        http.get(`${TEST_BASE_URL}/api/test`, () => HttpResponse.json({ data: 'test' })),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ data: string }>({ path: 'api/test' });
      expect(result).toEqual({ data: 'test' });
    });

    it('should handle base URL with trailing slash', async () => {
      server.use(
        http.get(`${TEST_BASE_URL}/api/test`, () => HttpResponse.json({ data: 'test' })),
      );

      const client = apiFactory({
        baseUrl: `${TEST_BASE_URL}/`,
        authToken: 'test-token',
      });

      const result = await client.request<{ data: string }>({ path: '/api/test' });
      expect(result).toEqual({ data: 'test' });
    });
  });

  describe('retry logic', () => {
    it('should retry on 5xx errors', async () => {
      let attemptCount = 0;

      server.use(
        http.get(`${TEST_BASE_URL}/api/retry`, () => {
          attemptCount++;
          if (attemptCount < 2) {
            return new HttpResponse('Server Error', { status: 500 });
          }
          return HttpResponse.json({ success: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ success: boolean }>({
        path: '/api/retry',
        retry: 3,
      });

      expect(attemptCount).toBe(2);
      expect(result).toEqual({ success: true });
    });

    it('should not retry on 4xx errors', async () => {
      let attemptCount = 0;

      server.use(
        http.get(`${TEST_BASE_URL}/api/no-retry`, () => {
          attemptCount++;
          return new HttpResponse('Not Found', { status: 404, statusText: 'Not Found' });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      await expect(
        client.request({ path: '/api/no-retry', retry: 3 }),
      ).rejects.toThrow('HTTP 404 Not Found');

      expect(attemptCount).toBe(1);
    });

    it('should retry on 429 rate limit errors', async () => {
      let attemptCount = 0;

      server.use(
        http.get(`${TEST_BASE_URL}/api/rate-limited`, () => {
          attemptCount++;
          if (attemptCount < 2) {
            return new HttpResponse('Rate Limited', {
              status: 429,
              statusText: 'Too Many Requests',
            });
          }
          return HttpResponse.json({ success: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      const result = await client.request<{ success: boolean }>({
        path: '/api/rate-limited',
        retry: 3,
      });

      expect(attemptCount).toBe(2); // Should retry 429 errors
      expect(result).toEqual({ success: true });
    });

    it('should include Retry-After header in 429 error message', async () => {
      server.use(
        http.get(`${TEST_BASE_URL}/api/rate-limited-header`, () => new HttpResponse('Rate Limited', {
          status: 429,
          statusText: 'Too Many Requests',
          headers: { 'Retry-After': '30' },
        })),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      await expect(
        client.request({ path: '/api/rate-limited-header', retry: 0 }),
      ).rejects.toThrow(/HTTP 429\|30\|/);
    });

    it('should parse Retry-After as HTTP-date and include in error', async () => {
      const futureDate = new Date(Date.now() + 3000).toUTCString();

      server.use(
        http.get(`${TEST_BASE_URL}/api/rate-limited-date`, () => new HttpResponse('Rate Limited', {
          status: 429,
          statusText: 'Too Many Requests',
          headers: { 'Retry-After': futureDate },
        })),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      await expect(
        client.request({ path: '/api/rate-limited-date', retry: 0 }),
      ).rejects.toThrow(/HTTP 429\|/);
    });
  });

  describe('shared 429 backoff', () => {
    it('should trigger shared backoff when 429 received with rate limiting enabled', async () => {
      let requestCount = 0;
      const requestTimes: number[] = [];
      const startTime = Date.now();

      server.use(
        http.get(`${TEST_BASE_URL}/api/backoff-test`, () => {
          requestCount++;
          requestTimes.push(Date.now() - startTime);
          if (requestCount === 1) {
            // First request returns 429 with 1 second backoff
            return new HttpResponse('Rate Limited', {
              status: 429,
              statusText: 'Too Many Requests',
              headers: { 'Retry-After': '1' },
            });
          }
          return HttpResponse.json({ success: true, count: requestCount });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
        rateLimit: { max: 10, windowMs: 60000 }, // Enable rate limiting to get shared backoff
      });

      // First request will get 429 and trigger backoff, then retry after 1s
      const result = await client.request<{ success: boolean; count: number }>({
        path: '/api/backoff-test',
        retry: 2,
      });

      expect(result).toEqual({ success: true, count: 2 });
      expect(requestCount).toBe(2);
      // Second request should come after at least 1s (backoff) + retry delay
      // The exact timing depends on retry mechanism, but there should be a gap
      expect(requestTimes[1] - requestTimes[0]).toBeGreaterThanOrEqual(1000);
    });

    it('should respect Retry-After and pause subsequent requests', async () => {
      let endpoint1Calls = 0;
      let endpoint2Calls = 0;

      server.use(
        http.get(`${TEST_BASE_URL}/api/endpoint1`, () => {
          endpoint1Calls++;
          if (endpoint1Calls === 1) {
            return new HttpResponse('Rate Limited', {
              status: 429,
              statusText: 'Too Many Requests',
              headers: { 'Retry-After': '1' },
            });
          }
          return HttpResponse.json({ endpoint: 1, call: endpoint1Calls });
        }),
        http.get(`${TEST_BASE_URL}/api/endpoint2`, () => {
          endpoint2Calls++;
          return HttpResponse.json({ endpoint: 2, call: endpoint2Calls });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
        rateLimit: { max: 10, windowMs: 60000 },
      });

      // Start first request - will get 429 and trigger shared backoff
      const p1 = client.request<{ endpoint: number; call: number }>({
        path: '/api/endpoint1',
        retry: 2,
      });

      // Start second request shortly after - should be paused by shared backoff
      const p2 = client.request<{ endpoint: number; call: number }>({
        path: '/api/endpoint2',
        retry: 0,
      });

      const [r1, r2] = await Promise.all([p1, p2]);

      expect(r1).toEqual({ endpoint: 1, call: 2 });
      expect(r2).toEqual({ endpoint: 2, call: 1 });
    });
  });

  describe('authentication', () => {
    it('should include Basic auth header', async () => {
      let receivedAuthHeader: string | null = null;

      server.use(
        http.get(`${TEST_BASE_URL}/api/auth`, ({ request }) => {
          receivedAuthHeader = request.headers.get('Authorization');
          return HttpResponse.json({ authenticated: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'my-secret-token',
      });

      await client.request({ path: '/api/auth' });

      expect(receivedAuthHeader).toBe('Basic my-secret-token');
    });
  });

  describe('body serialization', () => {
    it('should serialize object body to JSON', async () => {
      let receivedBody: unknown;
      let receivedContentType: string | null = null;

      server.use(
        http.post(`${TEST_BASE_URL}/api/json`, async ({ request }) => {
          receivedContentType = request.headers.get('Content-Type');
          receivedBody = await request.json();
          return HttpResponse.json({ received: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      await client.request({
        path: '/api/json',
        method: 'POST',
        body: {
          nested: {
            array: [1, 2, 3],
            object: { key: 'value' },
          },
        },
      });

      expect(receivedContentType).toBe('application/json');
      expect(receivedBody).toEqual({
        nested: {
          array: [1, 2, 3],
          object: { key: 'value' },
        },
      });
    });

    it('should pass pre-stringified body as-is', async () => {
      let receivedBody: unknown;

      server.use(
        http.post(`${TEST_BASE_URL}/api/string`, async ({ request }) => {
          receivedBody = await request.json();
          return HttpResponse.json({ received: true });
        }),
      );

      const client = apiFactory({
        baseUrl: TEST_BASE_URL,
        authToken: 'test-token',
      });

      await client.request({
        path: '/api/string',
        method: 'POST',
        body: '{"already": "stringified"}',
      });

      expect(receivedBody).toEqual({ already: 'stringified' });
    });
  });
});
