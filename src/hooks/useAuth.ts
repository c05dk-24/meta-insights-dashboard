import { useStore } from '../store';
import { AuthService } from '../services/auth/authService';

const authService = new AuthService();

export const useAuth = () => {
  const store = useStore();
  
  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    login: async (email: string, password: string) => {
      const { user, token } = await authService.login(email, password);
      store.login(user, token);
    },
    logout: () => {
      authService.logout();
      store.logout();
    }
  };
};