import axios from 'axios';
import { useAuth } from './useAuth';
import { getApiUrl } from '../utils/config';

export const useAxios = () => {
  const { token, logout } = useAuth();
  const baseURL = getApiUrl();

  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Remove duplicate /api in URL if present
      if (config.url?.includes('/api/api/')) {
        config.url = config.url.replace('/api/api/', '/api/');
      }
      
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
      });
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
      return response;
    },
    (error) => {
      console.error('API Response Error:', {
        status: error.response?.status,
        url: error.config?.url,
        error: error.response?.data || error.message,
      });

      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};