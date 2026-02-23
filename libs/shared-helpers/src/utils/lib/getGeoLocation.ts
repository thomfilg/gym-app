import { WebServiceClient } from '@maxmind/geoip2-node';

import { logger } from './logger';

export type GeoLocation = {
  continent_code: string;
  continent: string;
  country_code: string;
  country: string;
  region_code: string;
  region: string;
  city: string;
  postal_code: string;
  timezone: string;
  longitude: number;
  latitude: number;
  isp_name: string;
  error: string;
}

// Call the Maxmind Geo Location API
// Queries to the GeoLite2 web services are capped at 1000 queries/day
// API documentation is at https://dev.maxmind.com/geoip/geolocate-an-ip/web-services
// API Endpoints https://dev.maxmind.com/geoip/docs/web-services/requests#geolite2-endpoints
// Usage: curl -u "<ACCOUNT_ID>:<LICENSE_KEY>" "https://geolite.info/geoip/v2.1/city/{ip_address}?pretty"
export async function getGeoLocation (ipAddress: string | unknown) {

  try {
    const accountId = process.env.MAXMIND_ACCOUNT_ID;
    const licenseKey = process.env.MAXMIND_LICENSE_KEY;

    if (!accountId || !licenseKey) {
      logger.warn(`In getGeoLocation, missing config value: accountId: ${accountId}, licenseKey: ${licenseKey}`, ', not getting data');
      return null;
    }

    // To query the GeoLite2 web service, you must set the optional `host` parameter
    const client = new WebServiceClient(accountId, licenseKey, {host: 'geolite.info'});

    // Get the country information
    const response = await client.city(ipAddress as string);

    if (!response) {
      logger.error('In getGeoLocation, No geolocation data received.', response);
      return null;
    }

    const geoLocation: GeoLocation = {
      continent_code: response.continent?.code || '',
      continent: response.continent?.names.en || '',
      country_code: response.country?.isoCode || '',
      country: response.country?.names.en || '',
      region_code: response.subdivisions ? response.subdivisions[0]?.isoCode : '',
      region: response.subdivisions ? response.subdivisions[0]?.names.en : '',
      city: response.city?.names.en || '',
      postal_code: response.postal?.code || '',
      timezone: response.location?.timeZone || '',
      latitude: response.location?.latitude || 0,
      longitude: response.location?.longitude || 0,
      isp_name: response.traits?.autonomousSystemOrganization || '',
      error: '',
    };
    return geoLocation;

  } catch ( error ) {
    logger.error('In getGeoLocation, error:', error);
    return null;
  }
}
