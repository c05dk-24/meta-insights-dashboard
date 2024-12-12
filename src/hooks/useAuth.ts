import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { AuthService } from '../services/auth/AuthService';
import { validateLoginInput } from '../services/auth/utils/validation';
import { toast } from 'react-hot-toast';
import { AUTH_ERROR_CODES } from '../services/auth/config/constants';

const authService = new AuthService();

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore();
  
  const login = useCallback(async (email: string, password: string) => {
    // Validate input first
    const validationError = validateLoginInput(email, password);
    if (validationError) {
      toast.error(validationError);
      throw new Error(validationError);
    }

    setIsLoading(true);
    try {
      const { user, token } = await authService.login(email, password);
      store.login(user, token);
      
      // Show welcome message with company name
      toast.success(
        user.companyName
          ? `Welcome back to ${user.companyName}!`
          : `Welcome back, ${user.name}!`
      );
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error codes
      switch (error.code) {
        case AUTH_ERROR_CODES.INVALID_CREDENTIALS:
          toast.error('Invalid email or password');
          break;
        case AUTH_ERROR_CODES.NETWORK_ERROR:
          toast.error('Network error. Please check your connection.');
          break;
        case AUTH_ERROR_CODES.SERVER_ERROR:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(error.message || 'Failed to login');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [store]);

  const logout = useCallback(() => {
    const user = store.auth.user;
    authService.logout();
    store.logout();
    
    // Show goodbye message with company name
    if (user) {
      toast.success(
        user.companyName
          ? `Logged out from ${user.companyName}`
          : `Goodbye, ${user.name}!`
      );
    }
  }, [store]);

  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    isLoading,
    login,
    logout
  };
};