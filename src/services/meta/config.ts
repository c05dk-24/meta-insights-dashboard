export const META_API_CONFIG = {
  VERSION: 'v21.0',
  BASE_URL: 'https://graph.facebook.com/v21.0',
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