```typescript
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './routes';
import { queryClient } from './config/queryClient';
import { useThemeStore } from './store/themeStore';

export function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}
```