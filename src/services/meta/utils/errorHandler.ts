export const handleApiError = (error: any): Error => {
  if (!error.response) {
    return new Error('Network error occurred');
  }

  const { status, data } = error.response;
  const message = data?.error?.message || data?.message || error.message;

  switch (status) {
    case 400:
      return new Error(`Invalid request parameters: ${message}`);
    case 401:
      return new Error('Authentication failed. Please reconnect your Meta account');
    case 403:
      return new Error('Not authorized to access this data');
    case 404:
      return new Error('Requested resource not found');
    default:
      return new Error(`Failed to fetch data: ${message}`);
  }
};