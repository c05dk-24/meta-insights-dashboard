import { StateCreator } from 'zustand';
import { AuthState } from '../../types/auth';
import { loginUser, logoutUser } from '../../services/auth';

export interface AuthSlice {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
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