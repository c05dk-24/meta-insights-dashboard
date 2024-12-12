export const getApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  // Remove trailing slash and /api if present
  return baseUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
};

export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: '/api/auth',
    BOARDS: '/api/boards',
    HEALTH: '/api/health'
  }
} as const;