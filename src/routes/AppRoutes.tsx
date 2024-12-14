```typescript
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { PrivateRoute } from '../components/PrivateRoute';
import { useAuth } from '../hooks/useAuth';

// Pages
import { Dashboard } from '../pages/Dashboard';
import { Boards } from '../pages/Boards';
import { AI } from '../pages/AI';
import { BlogGenerator } from '../pages/BlogGenerator';
import { ContentTools } from '../pages/ContentTools';
import { Education } from '../pages/Education';
import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
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
  );
};
```