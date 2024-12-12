export const handleApiError = (error: any): Error => {
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  if (!error.response) {
    return new Error('Network error occurred. Please check your connection.');
  }

  const { status, data } = error.response;
  const message = data?.error?.message || data?.message || error.message;

  switch (status) {
    case 400:
      return new Error(`Invalid request: ${message}`);
    case 401:
      return new Error('Your session has expired. Please log in again.');
    case 403:
      return new Error('You do not have permission to access this data.');
    case 404:
      return new Error('The requested data could not be found.');
    case 429:
      return new Error('Rate limit exceeded. Please try again later.');
    case 500:
      return new Error('Server error. Please try again later.');
    default:
      return new Error(`An error occurred: ${message}`);
  }
};