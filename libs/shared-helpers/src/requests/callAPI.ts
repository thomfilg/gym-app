import { logger } from '../utils/lib/logger';

export async function callAPI<T>(api: string, auth: string): Promise<T | undefined> {
  try {
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    });
    const responseJSON = await response.json() as T;
    return responseJSON;
  }
  catch (error) {
    logger.error('API call failed:', api, error);
    return undefined;
  }
}
