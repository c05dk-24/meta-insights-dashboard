import { AxiosError } from 'axios';
import { AuthError } from '../types';
import { AUTH_ERROR_CODES } from '../constants';

export const handleApiError = (error: unknown): AuthError => {
  if (error instanceof AxiosError) {
    const { response } = error;
    const status = response?.status;
    const data = response?.data;

    // Log detailed error for debugging
    console.error('Auth API Error:', {
      status,
      data,
      message: error.message
    });

    // Handle specific API error codes
    if (data?.error === 'INVALID_CREDENTIALS') {
      return {
        code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
        status: 401
      };
    }

    // Handle HTTP status codes
    switch (status) {
      case 400:
        return {
          code: AUTH_ERROR_CODES.BAD_REQUEST,
          message: data?.message || 'Invalid request',
          status
        };
      case 401:
        return {
          code: AUTH_ERROR_CODES.UNAUTHORIZED,
          message: 'Invalid credentials',
          status
        };
      case 500:
        return {
          code: AUTH_ERROR_CODES.SERVER_ERROR,
          message: 'Server error occurred',
          status
        };
      default:
        return {
          code: AUTH_ERROR_CODES.UNKNOWN,
          message: 'An unexpected error occurred',
          status
        };
    }
  }

  return {
    code: AUTH_ERROR_CODES.UNKNOWN,
    message: 'An unexpected error occurred'
  };
};