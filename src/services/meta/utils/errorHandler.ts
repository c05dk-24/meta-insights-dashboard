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
      return new Error('Authentication failed. Reconnect your Meta account.');
    case 403:
      return new Error('You are not authorised to access this resource.');
    case 404:
      return new Error('Requested resource not found.');
    case 500:
      return new Error('Internal server error. Try again later.');
    default:
      return new Error(`Unexpected error (${status}): ${message}`);
  }
};