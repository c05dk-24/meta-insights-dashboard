// Meta Graph API field specifications
export const META_API_FIELDS = {
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
    'daily_budget',
    'lifetime_budget',
    'start_time',
    'stop_time',
    'insights{impressions,reach,actions,spend}'
  ].join(','),
  
  ADSETS: [
    'id',
    'name',
    'campaign_id',
    'status',
    'targeting',
    'insights{impressions,reach,actions,spend}'
  ].join(',')
} as const;