import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../types/auth';
import { loginUser, logoutUser } from '../services/auth';

interface Store {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        auth: {
          token: state.auth.token,
          user: state.auth.user,
          isAuthenticated: state.auth.isAuthenticated,
        },
      }),
    }
  )
);