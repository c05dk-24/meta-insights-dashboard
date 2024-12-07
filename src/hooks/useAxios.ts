import axios from 'axios';
import { useAuth } from './useAuth';

const API_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || '/api')
  : 'http://localhost:3001/api';

export const useAxios = () => {
  const { token, logout } = useAuth();

  const instance = axios.create({
    baseURL: API_URL,
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