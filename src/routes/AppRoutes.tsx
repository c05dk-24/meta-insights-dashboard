```typescript
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { PrivateRoute } from '../components/PrivateRoute';
import { useAuth } from '../hooks/useAuth';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Boards = React.lazy(() => import('../pages/Boards'));
const AI = React.lazy(() => import('../pages/AI'));
const Education = React.lazy(() => import('../pages/Education'));
const BlogGenerator = React.lazy(() => import('../pages/BlogGenerator'));
const ContentTools = React.lazy(() => import('../pages/ContentTools'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Login = React.lazy(() => import('../pages/Login'));

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/blog-generator" element={<BlogGenerator />} />
          <Route path="/content-tools" element={<ContentTools />} />
          <Route path="/education" element={<Education />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};
```