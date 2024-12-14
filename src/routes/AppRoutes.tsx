import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Boards } from '../pages/Boards';
import { AI } from '../pages/AI';
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};