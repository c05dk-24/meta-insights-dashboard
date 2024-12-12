import { MetaInsightsParams } from '../../../types/meta';

type EndpointType = 'insights' | 'campaigns' | 'adsets';

const ENDPOINT_FIELDS = {
  insights: 'impressions,reach,actions,spend',
  campaigns: 'campaign_id,campaign_name,insights',
  adsets: 'adset_id,adset_name,insights'
};

export const buildQueryParams = (endpoint: EndpointType, params: any) => {
  console.log('buildQueryParams - Input:', { endpoint, params });

  const queryParams: Record<string, any> = {
    fields: ENDPOINT_FIELDS[endpoint]
  };

  // Add time range if dates are provided
  if (params.start_date && params.end_date) {
    queryParams.time_range = JSON.stringify({
      since: params.start_date || params.startDate,
      until: params.end_date || params.endDate
    });
  }

  // Add access token if provided
  if (params.access_token) {
    queryParams.access_token = params.access_token;
  }

  // Add account ID if provided
  if (params.accountId) {
    queryParams.account_id = params.accountId;
  }

  // Add level for campaign/adset queries
  if (params.level) {
    queryParams.level = params.level;
  }

  // Add campaign_id for adset queries
  if (params.campaignId) {
    queryParams.campaign_id = params.campaignId;
  }

  console.log('buildQueryParams - Output:', queryParams);
  return queryParams;
};