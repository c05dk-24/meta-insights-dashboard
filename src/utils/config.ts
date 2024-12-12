export const getApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://meta-insights-dashboard-1.onrender.com';
  // Remove trailing slash if present
  return baseUrl.replace(/\/$/, '');
};

export const API_CONFIG = {
  META: {
    ENDPOINTS: {
      INSIGHTS: '/api/meta/insights',
      CAMPAIGNS: '/api/meta/campaigns',
      ADSETS: '/api/meta/adsets',
      ADS: '/api/meta/ads'
    },
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
        'insights{impressions,reach,actions,spend}'
      ].join(',')
    }
  }
} as const;