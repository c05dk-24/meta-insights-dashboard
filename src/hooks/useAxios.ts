import axios from 'axios';
import { useAuth } from './useAuth';
import { getApiUrl } from '../utils/config';

export const useAxios = () => {
  const { token, logout } = useAuth();
  const API_URL = getApiUrl();

  const instance = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
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