import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar/index';
import { useLayoutStore } from '../../store/layoutStore';

export const MainLayout = () => {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isSidebarOpen} onClose={() => toggleSidebar(false)} />
        <main className="flex-1 overflow-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};