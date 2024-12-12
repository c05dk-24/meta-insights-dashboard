// Meta Graph API v18.0 endpoints
export const META_API_ENDPOINTS = {
  BASE_URL: 'https://graph.facebook.com/v18.0',
  INSIGHTS: (pageId: string) => `/${pageId}/insights`,
  CAMPAIGNS: (adAccountId: string) => `/act_${adAccountId}/campaigns`,
  ADSETS: (campaignId: string) => `/${campaignId}/adsets`,
  ADS: (adsetId: string) => `/${adsetId}/ads`
} as const;