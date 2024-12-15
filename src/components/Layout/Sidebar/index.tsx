import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarHeader } from './SidebarHeader';
import { NavigationList } from './NavigationList';
import { MobileOverlay } from './MobileOverlay';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <MobileOverlay isOpen={isOpen} onClick={onClose} />
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarHeader onClose={onClose} />
        <NavigationList onClose={onClose} />
      </aside>
    </>
  );
};