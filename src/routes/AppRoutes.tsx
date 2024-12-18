```tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { Boards } from '../pages/Boards';
import { AI } from '../pages/AI';
import { BlogGenerator } from '../pages/BlogGenerator';
import { ContentTools } from '../pages/ContentTools';
import { ContentRemix } from '../pages/ContentRemix';
import { Education } from '../pages/Education';
import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';
import { MainLayout } from '../components/Layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { routerConfig } from './config';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes {...routerConfig}>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      
      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards/*" element={<Boards />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/blog-generator" element={<BlogGenerator />} />
        <Route path="/content-tools" element={<ContentTools />} />
        <Route path="/content-tools/remix" element={<ContentRemix />} />
        <Route path="/education" element={<Education />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
```