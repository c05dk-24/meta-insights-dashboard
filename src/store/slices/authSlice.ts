import { StateCreator } from 'zustand';
import { AuthState } from '../../types/auth';
import { loginUser, logoutUser, getStoredAuth } from '../../services/auth';

export interface AuthSlice {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const storedAuth = getStoredAuth();

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  auth: {
    user: storedAuth.user,
    token: storedAuth.token,
    isAuthenticated: Boolean(storedAuth.token && storedAuth.user),
  },
  login: async (email: string, password: string) => {
    try {
      const { user, token } = await loginUser(email, password);
      set({ auth: { user, token, isAuthenticated: true } });
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },
  logout: () => {
    logoutUser();
    set({ auth: { user: null, token: null, isAuthenticated: false } });
  },
});