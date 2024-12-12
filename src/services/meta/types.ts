export interface MetaApiConfig {
  baseUrl: string;
  accessToken: string;
  accountId: string;
}

export interface TimeRange {
  since: string;
  until: string;
}

export interface MetaApiParams {
  fields?: string[];
  time_range?: TimeRange;
  level?: 'campaign' | 'adset' | 'ad';
  filtering?: Record<string, any>[];
  limit?: number;
}

export interface MetaApiError {
  code: number;
  type: string;
  message: string;
  fbtrace_id?: string;
}

export interface MetaApiResponse<T> {
  data: T[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
  error?: MetaApiError;
}