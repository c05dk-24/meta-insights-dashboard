```typescript
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './routes/AppRoutes';
import { queryClient } from './config/queryClient';
import { useThemeStore } from './store/themeStore';
import { Toaster } from 'react-hot-toast';

export default function App() {
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
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <AppRoutes />
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            style: {
              background: isDarkMode ? '#1f2937' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}
```