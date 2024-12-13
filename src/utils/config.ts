export const getApiUrl = () => {
  return process.env.VITE_API_URL || 'https://meta-insights-dashboard-1.onrender.com/api';
};

export const META_API_CONFIG = {
  ENDPOINTS: {
    INSIGHTS: '/meta/insights',
    CAMPAIGNS: '/meta/campaigns',
    ADSETS: '/meta/adsets',
    ADS: '/meta/ads'
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
} as const;