import { useStore } from '../store';
import { boardApi } from '../services/api/boardApi';

export const useAuth = () => {
  const store = useStore();
  
  // Set token in boardApi when auth state changes
  if (store.auth.token) {
    boardApi.setToken(store.auth.token);
  }
  
  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    login: store.login,
    logout: () => {
      store.logout();
      boardApi.setToken(''); // Clear token on logout
    },
  };
};