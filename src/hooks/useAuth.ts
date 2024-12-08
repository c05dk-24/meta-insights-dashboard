import { useStore } from '../store';

interface AuthHook {
  user: {
    id: string;
    email: string;
    name: string;
    meta_page_id?: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthHook => {
  const store = useStore();
  
  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    login: store.login,
    logout: store.logout,
  };
};