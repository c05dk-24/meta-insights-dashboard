export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user'
} as const;

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout'
} as const;