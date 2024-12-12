import { LoginCredentials, AuthError } from './types';
import { AUTH_ERROR_CODES } from './constants';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginInput = (
  credentials: LoginCredentials
): AuthError | null => {
  const { email, password } = credentials;

  if (!email) {
    return {
      code: AUTH_ERROR_CODES.BAD_REQUEST,
      message: 'Email is required'
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      code: AUTH_ERROR_CODES.BAD_REQUEST,
      message: 'Invalid email format'
    };
  }

  if (!password) {
    return {
      code: AUTH_ERROR_CODES.BAD_REQUEST,
      message: 'Password is required'
    };
  }

  if (password.length < 6) {
    return {
      code: AUTH_ERROR_CODES.BAD_REQUEST,
      message: 'Password must be at least 6 characters'
    };
  }

  return null;
};