export const getApiUrl = () => {
  return 'https://graph.facebook.com/v18.0';
};

export const API_CONFIG = {
  META: {
    ENDPOINTS: {
      INSIGHTS: '/insights',
      CAMPAIGNS: '/campaigns',
      ADSETS: '/adsets',
      ADS: '/ads'
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