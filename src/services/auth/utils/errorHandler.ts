import axios, { AxiosError } from 'axios';
import { AUTH_ERROR_CODES } from '../config/constants';

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = AUTH_ERROR_CODES.UNKNOWN_ERROR,
    public status?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const handleAuthError = (error: unknown): AuthError => {
  console.error('Auth Error:', error);

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const errorData = error.response?.data;

    // Log detailed error information
    console.error('Auth Service - Detailed Error:', {
      status,
      data: errorData,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    // Handle specific API error responses
    if (errorData?.error) {
      switch (errorData.error) {
        case 'INVALID_CREDENTIALS':
          return new AuthError(
            'Invalid email or password',
            AUTH_ERROR_CODES.INVALID_CREDENTIALS,
            401
          );
        case 'USER_NOT_FOUND':
          return new AuthError(
            'User not found',
            AUTH_ERROR_CODES.USER_NOT_FOUND,
            404
          );
        case 'SERVER_ERROR':
          return new AuthError(
            'Server error occurred. Please try again later.',
            AUTH_ERROR_CODES.SERVER_ERROR,
            500
          );
      }
    }

    // Handle HTTP status codes
    switch (status) {
      case 400:
        return new AuthError(
          errorData?.message || 'Invalid request',
          AUTH_ERROR_CODES.INVALID_CREDENTIALS,
          status
        );
      case 401:
        return new AuthError(
          'Invalid email or password',
          AUTH_ERROR_CODES.UNAUTHORIZED,
          status
        );
      case 404:
        return new AuthError(
          'User not found',
          AUTH_ERROR_CODES.USER_NOT_FOUND,
          status
        );
      case 500:
        return new AuthError(
          'Server error occurred. Please try again later.',
          AUTH_ERROR_CODES.SERVER_ERROR,
          status
        );
      default:
        if (!error.response) {
          return new AuthError(
            'Network error. Please check your connection.',
            AUTH_ERROR_CODES.NETWORK_ERROR
          );
        }
        return new AuthError(
          'An unexpected error occurred during login',
          AUTH_ERROR_CODES.UNKNOWN_ERROR,
          status
        );
    }
  }

  if (error instanceof Error) {
    return new AuthError(error.message);
  }

  return new AuthError('An unexpected error occurred');
};