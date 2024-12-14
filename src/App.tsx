```typescript
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Boards } from './pages/Boards';
import { AI } from './pages/AI';
import { Education } from './pages/Education';
import { BlogGenerator } from './pages/BlogGenerator';
import { ContentTools } from './pages/ContentTools';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { PrivateRoute } from './components/PrivateRoute';
import { MainLayout } from './components/Layout/MainLayout';
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route 
            path="/login" 
            element={<Login />}
          />
          
          <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/blog-generator" element={<BlogGenerator />} />
            <Route path="/education" element={<Education />} />
            <Route path="/content-tools" element={<ContentTools />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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