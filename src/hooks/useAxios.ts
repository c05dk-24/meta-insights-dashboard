import axios, { AxiosInstance } from 'axios';
import { useAuth } from './useAuth';
import { getApiUrl } from '../utils/config';

export const useAxios = (): AxiosInstance => {
  const { token, logout } = useAuth();
  const API_URL = getApiUrl();

  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    withCredentials: true
  });

  instance.interceptors.request.use(
    (config) => {
      if (config.url?.startsWith('/api')) {
        config.url = config.url.replace('/api', '');
      }
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );

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