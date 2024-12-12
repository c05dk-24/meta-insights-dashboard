import { MetaApiParams } from '../types';

export const buildApiUrl = (endpoint: string, accountId: string): string => {
  return `/${accountId}${endpoint}`;
};

export const buildQueryParams = (params: MetaApiParams): Record<string, any> => {
  const queryParams: Record<string, any> = {};

  if (params.fields) {
    queryParams.fields = params.fields.join(',');
  }

  if (params.time_range) {
    queryParams.time_range = JSON.stringify(params.time_range);
  }

  if (params.level) {
    queryParams.level = params.level;
  }

  if (params.filtering) {
    queryParams.filtering = JSON.stringify(params.filtering);
  }

  if (params.limit) {
    queryParams.limit = params.limit;
  }

  console.log('Built query params:', queryParams);
  return queryParams;
};