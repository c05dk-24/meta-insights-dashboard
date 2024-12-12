```typescript
import { useStore } from '../store';
import { apiClient } from '../services/api/client';

export const useAuth = () => {
  const store = useStore();
  
  // Set token in apiClient when auth state changes
  if (store.auth.token) {
    apiClient.setAuthToken(store.auth.token);
  }
  
  return {
    user: store.auth.user,
    token: store.auth.token,
    isAuthenticated: store.auth.isAuthenticated,
    login: store.login,
    logout: () => {
      store.logout();
      apiClient.setAuthToken(null);
    },
  };
};
```