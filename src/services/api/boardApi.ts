import axios from 'axios';
import { Board, List, Card } from '../../types/board';
import { getApiUrl, API_CONFIG } from '../../utils/config';

const api = axios.create({
  baseURL: getApiUrl()
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Board API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Board API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Board API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Board API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error.response?.data?.error || error.message);
  }
);

export const boardApi = {
  setToken: (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getBoards: async (): Promise<Board[]> => {
    const { data } = await api.get(API_CONFIG.ENDPOINTS.BOARDS);
    return data;
  },

  createBoard: async (title: string): Promise<Board> => {
    const { data } = await api.post(API_CONFIG.ENDPOINTS.BOARDS, { title });
    return data;
  },

  createList: async (boardId: string, title: string): Promise<List> => {
    const { data } = await api.post(
      `${API_CONFIG.ENDPOINTS.BOARDS}/${boardId}/lists`,
      { title }
    );
    return data;
  },

  createCard: async (
    boardId: string, 
    listId: string, 
    { title, description }: { title: string; description?: string }
  ): Promise<Card> => {
    const { data } = await api.post(
      `${API_CONFIG.ENDPOINTS.BOARDS}/${boardId}/lists/${listId}/cards`,
      { title, description }
    );
    return data;
  }
};