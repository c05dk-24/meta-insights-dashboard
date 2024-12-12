import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Boards } from './pages/Boards/Boards';
import { AI } from './pages/AI/AI';
import { Login } from './pages/Login/Login';
import { MainLayout } from './components/Layout/MainLayout';
import { PrivateRoute } from './components/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
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
                    <Dashboard />
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
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}