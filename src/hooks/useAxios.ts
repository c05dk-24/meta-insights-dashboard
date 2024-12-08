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
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
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