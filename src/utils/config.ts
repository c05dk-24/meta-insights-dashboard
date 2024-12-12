export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://meta-insights-dashboard-1.onrender.com';
  }
  return 'https://meta-insights-dashboard-1.onrender.com';
};

export const API_PATHS = {
  META: {
    INSIGHTS: '/api/meta/insights',
    CAMPAIGNS: '/api/meta/campaigns',
    ADSETS: '/api/meta/campaigns/:campaignId/adsets',
    ADS: '/api/meta/campaigns/:campaignId/ads'
  }
} as const;

export const META_API_CONFIG = {
  FIELDS: {
    INSIGHTS: [
      'impressions',
      'reach',
      'actions',
      'spend',
      'date_start',
      'date_stop'
    ].join(','),
    CAMPAIGNS: [
      'campaign_id',
      'campaign_name',
      'objective',
      'status',
      'insights'
    ].join(',')
  }
} as const;