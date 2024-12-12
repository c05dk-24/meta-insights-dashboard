import axios from 'axios';

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = 'AUTH_ERROR',
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
      message: error.message
    });

    switch (status) {
      case 400:
        return new AuthError(
          errorData?.message || 'Invalid login credentials',
          'INVALID_CREDENTIALS',
          status
        );
      case 401:
        return new AuthError(
          'Invalid email or password',
          'UNAUTHORIZED',
          status
        );
      case 404:
        return new AuthError(
          'User not found',
          'USER_NOT_FOUND',
          status
        );
      case 500:
        return new AuthError(
          'Server error occurred. Please try again later.',
          'SERVER_ERROR',
          status
        );
      default:
        return new AuthError(
          'An unexpected error occurred during login',
          'UNKNOWN_ERROR',
          status
        );
    }
  }

  if (error instanceof Error) {
    return new AuthError(error.message);
  }

  return new AuthError('An unexpected error occurred');
};