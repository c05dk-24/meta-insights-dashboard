import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutDashboard, Trello, Settings, Wand2 } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { Boards } from './pages/Boards';
import { AI } from './pages/AI';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';

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
      <div className="flex h-screen bg-gray-100">
        {isAuthenticated && (
          <nav className="w-64 bg-white shadow-lg">
            <div className="p-6">
              <h1 className="text-xl font-bold text-gray-800">Meta Insights</h1>
            </div>
            <div className="mt-6">
              <Link
                to="/"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              <Link
                to="/boards"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              >
                <Trello className="w-5 h-5 mr-3" />
                Boards
              </Link>
              <Link
                to="/ai"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              >
                <Wand2 className="w-5 h-5 mr-3" />
                AI Generator
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </div>
          </nav>
        )}

        <div className="flex-1 overflow-auto">
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
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/boards"
              element={
                <PrivateRoute>
                  <Boards />
                </PrivateRoute>
              }
            />
            <Route
              path="/ai"
              element={
                <PrivateRoute>
                  <AI />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <div className="p-8">Settings Page</div>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;