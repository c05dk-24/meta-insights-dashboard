export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://meta-insights-dashboard-1.onrender.com';
  }
  return 'https://meta-insights-dashboard-1.onrender.com';
};

export const API_PATHS = {
  META: {
    INSIGHTS: '/api/meta/ads/insights',
    CAMPAIGNS: '/api/meta/ads/campaigns',
    ADSETS: '/api/meta/ads/campaigns/:campaignId/adsets',
    ADS: '/api/meta/ads/campaigns/:campaignId/ads'
  }
} as const;