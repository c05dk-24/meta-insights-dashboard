export const META_API_ENDPOINTS = {
  INSIGHTS: (accountId: string) => `/act_${accountId}/insights`,
  CAMPAIGNS: (accountId: string) => `/act_${accountId}/campaigns`,
  ADSETS: (accountId: string) => `/act_${accountId}/adsets`,
} as const;

export const META_API_FIELDS = {
  INSIGHTS: [
    'impressions',
    'reach',
    'spend',
    'actions'
  ].join(','),
  CAMPAIGNS: [
    'campaign_id',
    'campaign_name',
    'objective',
    'status',
    'insights'
  ].join(',')
} as const;