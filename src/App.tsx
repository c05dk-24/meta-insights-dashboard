import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Boards } from './pages/Boards';
import { AI } from './pages/AI';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { MainLayout } from './components/Layout/MainLayout';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } 
        />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <Boards />
              </MainLayout>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/boards"
          element={
            <PrivateRoute>
              <MainLayout>
                <Boards />
              </MainLayout>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <MainLayout>
                <AI />
              </MainLayout>
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;