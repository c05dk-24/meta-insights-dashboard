import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/authSlice';

export const useStore = create<AuthSlice>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        auth: {
          token: state.auth.token,
          isAuthenticated: state.auth.isAuthenticated,
          user: state.auth.user,
        },
      }),
    }
  )
);