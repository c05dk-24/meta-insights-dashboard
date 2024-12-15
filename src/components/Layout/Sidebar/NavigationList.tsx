import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from './navigation';

interface Props {
  onClose: () => void;
}

export const NavigationList: React.FC<Props> = ({ onClose }) => {
  const location = useLocation();

  return (
    <nav className="mt-6">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={`
              flex items-center px-6 py-3 text-sm font-medium
              ${isActive 
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
            `}
          >
            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400 dark:text-gray-500'}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};