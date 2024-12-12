import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Boards = React.lazy(() => import('./pages/Boards'));
const AI = React.lazy(() => import('./pages/AI'));
const Login = React.lazy(() => import('./pages/Login'));
const MainLayout = React.lazy(() => import('./components/Layout/MainLayout').then(m => ({ default: m.MainLayout })));
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute').then(m => ({ default: m.PrivateRoute })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Suspense fallback={<LoadingSpinner />}>
                    <Login />
                  </Suspense>
                )
              } 
            />
            
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Dashboard />
                    </Suspense>
                  </MainLayout>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/boards"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Boards />
                    </Suspense>
                  </MainLayout>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/ai"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AI />
                    </Suspense>
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