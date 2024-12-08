import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const store = useStore();
  const navigate = useNavigate();
  
  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    login: store.login,
    logout: () => {
      store.logout();
      navigate('/login');
    },
  };
};