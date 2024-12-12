export const getApiUrl = () => {
  // In production, use the environment variable
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  return baseUrl.replace(/\/$/, ''); // Remove trailing slash if present
};

export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: '/api/auth',
    BOARDS: '/api/boards',
    HEALTH: '/api/health'
  }
} as const;