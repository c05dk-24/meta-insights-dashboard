import axios from 'axios';
import { User } from '../types/auth';
import { getApiUrl } from '../utils/config';

const API_URL = getApiUrl();

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    );

    const { token, user } = response.data;
    
    // Store token and user data
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    console.log('Logged in user:', {
      userId: user.id,
      companyId: user.company_id,
      companyName: user.companyName
    });

    return { user, token };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials and try again.';
    throw new Error(errorMessage);
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