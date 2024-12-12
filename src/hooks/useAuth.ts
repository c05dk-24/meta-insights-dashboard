import { useStore } from '../store';

export const useAuth = () => {
  const store = useStore();
  
  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    login: store.login,
    logout: store.logout,
  };
};