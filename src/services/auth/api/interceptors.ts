import { AxiosInstance } from 'axios';

export const setupInterceptors = (client: AxiosInstance) => {
  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Log request details (excluding sensitive data)
      const sanitizedData = config.data ? {
        ...config.data,
        password: '[REDACTED]'
      } : undefined;

      console.log('Auth Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: sanitizedData
      });

      return config;
    },
    (error) => {
      console.error('Auth Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Log response (excluding sensitive data)
      const sanitizedData = response.data ? {
        ...response.data,
        token: '[REDACTED]'
      } : undefined;

      console.log('Auth Response:', {
        status: response.status,
        data: sanitizedData
      });

      return response;
    },
    (error) => {
      console.error('Auth Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return Promise.reject(error);
    }
  );
};