import { useState } from 'react';
import { useStore } from '../store';
import { AuthService } from '../services/auth/AuthService';
import { toast } from 'react-hot-toast';

const authService = new AuthService();

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore();
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.login(email, password);
      store.login(user, token);
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.message || 'Failed to login';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    store.logout();
    toast.success('Logged out successfully');
  };

  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    isLoading,
    login,
    logout
  };
};