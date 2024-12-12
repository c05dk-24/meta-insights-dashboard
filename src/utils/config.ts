export const getApiUrl = () => {
  // Remove /api from VITE_API_URL if present since we add it in the endpoints
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  return baseUrl.replace(/\/api\/?$/, '');
};

export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: '/api/auth',
    BOARDS: '/api/boards',
    HEALTH: '/api/health'
  }
} as const;