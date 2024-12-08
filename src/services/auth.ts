import axios from 'axios';
import { User } from '../types/auth';
import { getApiUrl } from '../utils/config';

const API_URL = getApiUrl();

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, user } = response.data;
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return { user, token };
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  delete axios.defaults.headers.common['Authorization'];
};

export const getStoredAuth = (): { user: User | null; token: string | null } => {
  const token = localStorage.getItem('auth_token');
  const userStr = localStorage.getItem('auth_user');
  
  return {
    token,
    user: userStr ? JSON.parse(userStr) : null,
  };
};