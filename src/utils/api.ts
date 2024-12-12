import axios from 'axios';
import { AppError } from './errorHandling';
import { getApiUrl } from './config';

export const createApiClient = (token?: string) => {
  const client = axios.create({
    baseURL: getApiUrl(),
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  client.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        throw new AppError('Network error occurred', 'NETWORK_ERROR', 0);
      }

      const { status, data } = error.response;
      const message = data?.message || error.message;

      switch (status) {
        case 401:
          throw new AppError('Session expired. Please login again.', 'AUTH_ERROR', status);
        case 403:
          throw new AppError('You do not have permission to perform this action', 'FORBIDDEN', status);
        case 404:
          throw new AppError('Resource not found', 'NOT_FOUND', status);
        case 429:
          throw new AppError('Too many requests. Please try again later.', 'RATE_LIMIT', status);
        default:
          throw new AppError(message, 'API_ERROR', status);
      }
    }
  );

  return client;
};