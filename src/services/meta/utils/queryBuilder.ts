type EndpointType = 'insights' | 'campaigns';

interface QueryParams {
  accountId: string;
  fields: string;
  start_date: string;
  end_date: string;
  [key: string]: any;
}

export const buildQueryParams = (endpoint: EndpointType, params: QueryParams) => {
  const queryParams: Record<string, any> = {
    fields: params.fields,
    start_date: params.start_date,
    end_date: params.end_date
  };

  if (params.accountId) {
    queryParams.accountId = params.accountId;
  }

  return queryParams;
};