export const API_CONFIG = {
  BASE_URL: 'https://graph.facebook.com/v18.0',
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
      'spend'
    ],
    CAMPAIGNS: [
      'campaign_id',
      'campaign_name',
      'objective',
      'status',
      'insights'
    ],
    ADSETS: [
      'adset_id',
      'adset_name',
      'status',
      'targeting',
      'insights'
    ]
  }
} as const;