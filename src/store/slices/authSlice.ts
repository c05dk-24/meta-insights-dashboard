```typescript
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
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
  },
  login: async (email: string, password: string) => {
    try {
      const { user, token } = await loginUser(email, password);
      set({ auth: { user, token, isAuthenticated: true } });
      localStorage.setItem('auth_user', JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },
  logout: () => {
    logoutUser();
    localStorage.removeItem('auth_user');
    set({ auth: { user: null, token: null, isAuthenticated: false } });
  },
});
```