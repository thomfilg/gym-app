export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type AuthType = 'Basic' | 'Api-Token' | 'Bearer';

interface IdoRequest {
  url: string;
  authToken?: string;
  authType?: AuthType;
  signal?: AbortSignal;
  method?: HttpMethod;
  body?: string | object;
}

export async function doRequest<T extends unknown>({
  url,
  authToken,
  authType = 'Basic',
  signal,
  method = 'GET',
  body,
}: IdoRequest): Promise<T> {
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  if (authToken) {
    headers.set('Authorization', `${authType} ${authToken}`);
  }

  const requestBody = body !== undefined
    ? (typeof body === 'string' ? body : JSON.stringify(body))
    : undefined;

  const res = await fetch(url, {
    method,
    headers,
    signal,
    body: requestBody,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const retryAfter = res.headers.get('Retry-After');
    // Include Retry-After in error message for 429 responses (format: HTTP 429|<retryAfter>|<body>)
    const errorMsg = retryAfter
      ? `HTTP ${res.status}|${retryAfter}|${text.slice(0, 300)}`
      : `HTTP ${res.status} ${res.statusText}: ${text.slice(0, 300)}`;
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}
