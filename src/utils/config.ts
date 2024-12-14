```typescript
export const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://meta-insights-dashboard-1.onrender.com';
  // Remove trailing slash if present
  return apiUrl.replace(/\/$/, '');
};

export const API_CONFIG = {
  META: {
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
};
```