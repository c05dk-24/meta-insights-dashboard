import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { Boards } from '../pages/Boards';
import { AI } from '../pages/AI';
import { Education } from '../pages/Education';
import { BlogGenerator } from '../pages/BlogGenerator';
import { ContentTools } from '../pages/ContentTools';
import { ContentRemix } from '../pages/ContentRemix';
import { Login } from '../pages/Login';
import { Settings } from '../pages/Settings';
import { PrivateRoute } from '../components/PrivateRoute';
import { MainLayout } from '../components/Layout/MainLayout';
import { useAuth } from '../hooks/useAuth';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } 
      />
      
      {/* Protected Routes */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards" element={<Boards />} />
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