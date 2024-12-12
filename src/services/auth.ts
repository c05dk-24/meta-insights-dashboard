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
    
    // Log authentication details
    console.log('Auth Service - Login Success:', {
      userId: user.id,
      email: user.email,
      companyId: user.company_id,
      companyName: user.companyName
    });
    
    return { user, token };
  } catch (error: any) {
    console.error('Auth Service - Login Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials and try again.';
    throw new Error(errorMessage);
  }
};

export const logoutUser = () => {
  const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
  
  // Log logout action
  console.log('Auth Service - Logout:', {
    userId: user.id,
    companyName: user.companyName
  });
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  delete axios.defaults.headers.common['Authorization'];
};