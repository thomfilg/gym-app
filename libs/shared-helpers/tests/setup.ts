// Setup file for tests
import { beforeAll, vi } from 'vitest';

// Block all non-localhost network requests during tests
beforeAll(() => {
  const originalFetch = global.fetch;

  vi.stubGlobal('fetch', async (url: Parameters<typeof fetch>[0], options?: Parameters<typeof fetch>[1]) => {
    const urlString = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url;

    // Allow localhost, 127.0.0.1, and ::1
    const localhostPatterns = [
      /^https?:\/\/localhost(:\d+)?/,
      /^https?:\/\/127\.0\.0\.1(:\d+)?/,
      /^https?:\/\/\[::1\](:\d+)?/,
    ];

    const isLocalhost = localhostPatterns.some(pattern => pattern.test(urlString));

    if (!isLocalhost) {
      throw new Error(
        `Network request to external URL blocked in tests: ${urlString}\n` +
        'Tests should not make external API calls. Use mocks or test against localhost services.',
      );
    }

    // Allow localhost requests to pass through
    return originalFetch(url as Parameters<typeof fetch>[0], options);
  });
});
