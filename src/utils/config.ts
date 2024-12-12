export const getApiUrl = () => {
  // Use the production URL from .env.production or localhost for development
  return import.meta.env.VITE_API_URL || 'https://meta-insights-api.onrender.com';
};

export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: '/api/auth',
    BOARDS: '/api/boards',
    LISTS: (boardId: string) => `/api/boards/${boardId}/lists`,
    CARDS: (boardId: string, listId: string) => `/api/boards/${boardId}/lists/${listId}/cards`
  }
} as const;