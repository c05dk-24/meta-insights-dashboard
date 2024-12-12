import { MetaInsightsParams } from '../../../types/meta';

type EndpointType = 'insights' | 'campaigns' | 'adsets';

const ENDPOINT_FIELDS = {
  insights: 'impressions,reach,actions,spend',
  campaigns: 'campaign_id,campaign_name,insights',
  adsets: 'adset_id,adset_name,insights'
};

export const buildQueryParams = (endpoint: EndpointType, params: any) => {
  console.log('buildQueryParams - Input:', { endpoint, params });

  const queryParams = {
    fields: ENDPOINT_FIELDS[endpoint],
    page_id: params.accountId,
    time_range: JSON.stringify({
      since: params.start_date || params.startDate,
      until: params.end_date || params.endDate
    })
  };

  if (params.level) {
    queryParams['level'] = params.level;
  }

  if (params.campaignId) {
    queryParams['campaign_id'] = params.campaignId;
  }

  console.log('buildQueryParams - Output:', queryParams);
  return queryParams;
};