import axios from 'axios';
import { useAuth } from './useAuth';
import { getApiUrl } from '../utils/config';

export const useAxios = () => {
  const { token, logout } = useAuth();
  const API_URL = getApiUrl();

  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  });

  // Add request interceptor
  instance.interceptors.request.use((config) => {
    // Remove /api prefix from URL since it's already included in the base URL
    if (config.url?.startsWith('/api/')) {
      config.url = config.url.substring(4);
    }
    return config;
  });

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};