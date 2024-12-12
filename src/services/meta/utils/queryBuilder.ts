import { MetaInsightsParams } from '../../../types/meta';

type EndpointType = 'insights' | 'campaigns' | 'adsets';

const ENDPOINT_FIELDS = {
  insights: 'impressions,reach,actions,spend',
  campaigns: 'campaign_id,campaign_name,insights',
  adsets: 'adset_id,adset_name,insights'
};

export const buildQueryParams = (endpoint: EndpointType, params: any) => {
  const queryParams = {
    access_token: process.env.META_ACCESS_TOKEN,
    fields: ENDPOINT_FIELDS[endpoint],
    time_range: JSON.stringify({
      since: params.start_date || params.startDate,
      until: params.end_date || params.endDate
    })
  };

  if (params.level) {
    return {
      ...queryParams,
      level: params.level
    };
  }

  return queryParams;
};