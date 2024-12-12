export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://meta-insights-dashboard-1.onrender.com';
  }
  return 'https://meta-insights-dashboard-1.onrender.com';
};

export const API_PATHS = {
  META: {
    INSIGHTS: '/meta/ads/insights',
    CAMPAIGNS: '/meta/campaigns',
    ADSETS: '/meta/campaigns/:campaignId/adsets'
  }
} as const;