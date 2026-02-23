import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { doRequest } from '../../src/requests/lib/doRequest';

const TEST_BASE_URL = 'http://localhost:9999';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('doRequest', () => {
  describe('HTTP methods', () => {
    it('should make a GET request by default', async () => {
      let receivedMethod: string | undefined;

      server.use(
        http.get(`${TEST_BASE_URL}/test`, ({ request }) => {
          receivedMethod = request.method;
          return HttpResponse.json({ success: true });
        }),
      );

      const result = await doRequest<{ success: boolean }>({
        url: `${TEST_BASE_URL}/test`,
      });

      expect(receivedMethod).toBe('GET');
      expect(result).toEqual({ success: true });
    });

    it('should make a POST request with body', async () => {
      let receivedMethod: string | undefined;
      let receivedBody: unknown;

      server.use(
        http.post(`${TEST_BASE_URL}/test`, async ({ request }) => {
          receivedMethod = request.method;
          receivedBody = await request.json();
          return HttpResponse.json({ id: 123 });
        }),
      );

      const result = await doRequest<{ id: number }>({
        url: `${TEST_BASE_URL}/test`,
        method: 'POST',
        body: { name: 'test' },
      });

      expect(receivedMethod).toBe('POST');
      expect(receivedBody).toEqual({ name: 'test' });
      expect(result).toEqual({ id: 123 });
    });

    it('should make a PUT request with body', async () => {
      let receivedMethod: string | undefined;
      let receivedBody: unknown;

      server.use(
        http.put(`${TEST_BASE_URL}/test/123`, async ({ request }) => {
          receivedMethod = request.method;
          receivedBody = await request.json();
          return HttpResponse.json({ updated: true });
        }),
      );

      const result = await doRequest<{ updated: boolean }>({
        url: `${TEST_BASE_URL}/test/123`,
        method: 'PUT',
        body: { name: 'updated' },
      });

      expect(receivedMethod).toBe('PUT');
      expect(receivedBody).toEqual({ name: 'updated' });
      expect(result).toEqual({ updated: true });
    });

    it('should make a DELETE request', async () => {
      let receivedMethod: string | undefined;

      server.use(
        http.delete(`${TEST_BASE_URL}/test/123`, ({ request }) => {
          receivedMethod = request.method;
          return HttpResponse.json({ deleted: true });
        }),
      );

      const result = await doRequest<{ deleted: boolean }>({
        url: `${TEST_BASE_URL}/test/123`,
        method: 'DELETE',
      });

      expect(receivedMethod).toBe('DELETE');
      expect(result).toEqual({ deleted: true });
    });

    it('should make a PATCH request with body', async () => {
      let receivedMethod: string | undefined;
      let receivedBody: unknown;

      server.use(
        http.patch(`${TEST_BASE_URL}/test/123`, async ({ request }) => {
          receivedMethod = request.method;
          receivedBody = await request.json();
          return HttpResponse.json({ patched: true });
        }),
      );

      const result = await doRequest<{ patched: boolean }>({
        url: `${TEST_BASE_URL}/test/123`,
        method: 'PATCH',
        body: { field: 'value' },
      });

      expect(receivedMethod).toBe('PATCH');
      expect(receivedBody).toEqual({ field: 'value' });
      expect(result).toEqual({ patched: true });
    });
  });

  describe('body handling', () => {
    it('should serialize object body to JSON string', async () => {
      let receivedContentType: string | null = null;
      let receivedBody: unknown;

      server.use(
        http.post(`${TEST_BASE_URL}/test`, async ({ request }) => {
          receivedContentType = request.headers.get('Content-Type');
          receivedBody = await request.json();
          return HttpResponse.json({ success: true });
        }),
      );

      await doRequest({
        url: `${TEST_BASE_URL}/test`,
        method: 'POST',
        body: { nested: { data: [1, 2, 3] } },
      });

      expect(receivedContentType).toBe('application/json');
      expect(receivedBody).toEqual({ nested: { data: [1, 2, 3] } });
    });

    it('should pass string body as-is', async () => {
      let receivedBody: unknown;

      server.use(
        http.post(`${TEST_BASE_URL}/test`, async ({ request }) => {
          receivedBody = await request.json();
          return HttpResponse.json({ success: true });
        }),
      );

      await doRequest({
        url: `${TEST_BASE_URL}/test`,
        method: 'POST',
        body: '{"preStringified": true}',
      });

      expect(receivedBody).toEqual({ preStringified: true });
    });
  });

  describe('authentication', () => {
    it('should include Basic auth header when authToken is provided', async () => {
      let receivedAuthHeader: string | null = null;

      server.use(
        http.get(`${TEST_BASE_URL}/test`, ({ request }) => {
          receivedAuthHeader = request.headers.get('Authorization');
          return HttpResponse.json({ success: true });
        }),
      );

      await doRequest({
        url: `${TEST_BASE_URL}/test`,
        authToken: 'dXNlcjpwYXNz', // base64 of "user:pass"
      });

      expect(receivedAuthHeader).toBe('Basic dXNlcjpwYXNz');
    });

    it('should not include auth header when authToken is not provided', async () => {
      let receivedAuthHeader: string | null = null;

      server.use(
        http.get(`${TEST_BASE_URL}/test`, ({ request }) => {
          receivedAuthHeader = request.headers.get('Authorization');
          return HttpResponse.json({ success: true });
        }),
      );

      await doRequest({
        url: `${TEST_BASE_URL}/test`,
      });

      expect(receivedAuthHeader).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should throw error on non-OK response', async () => {
      server.use(
        http.get(`${TEST_BASE_URL}/test`, () =>
          new HttpResponse('Not Found', { status: 404, statusText: 'Not Found' }),
        ),
      );

      await expect(
        doRequest({ url: `${TEST_BASE_URL}/test` }),
      ).rejects.toThrow('HTTP 404 Not Found: Not Found');
    });

    it('should include response body in error message', async () => {
      server.use(
        http.get(`${TEST_BASE_URL}/test`, () =>
          new HttpResponse('{"error": "Resource not found"}', {
            status: 404,
            statusText: 'Not Found',
          }),
        ),
      );

      await expect(
        doRequest({ url: `${TEST_BASE_URL}/test` }),
      ).rejects.toThrow('HTTP 404 Not Found: {"error": "Resource not found"}');
    });

    it('should truncate long error response body', async () => {
      const longBody = 'x'.repeat(500);
      server.use(
        http.get(`${TEST_BASE_URL}/test`, () =>
          new HttpResponse(longBody, { status: 500, statusText: 'Server Error' }),
        ),
      );

      await expect(
        doRequest({ url: `${TEST_BASE_URL}/test` }),
      ).rejects.toThrow(`HTTP 500 Server Error: ${'x'.repeat(300)}`);
    });
  });
});
