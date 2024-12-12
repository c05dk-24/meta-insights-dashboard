export const API_PATHS = {
  META: {
    INSIGHTS: '/api/meta/insights',
    CAMPAIGNS: '/api/meta/campaigns',
    ADSETS: '/api/meta/campaigns/:campaignId/adsets',
    ACCOUNT_INFO: '/api/meta/account'
  }
} as const;

export const DATE_RANGES = {
  TODAY: 'today',
  THIS_WEEK: 'thisWeek',
  LAST_WEEK: 'lastWeek',
  THIS_MONTH: 'thisMonth',
  THIS_YEAR: 'thisYear'
} as const;

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
} as const;