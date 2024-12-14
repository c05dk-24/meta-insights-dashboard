import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Search, Settings, User, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface Props {
  onMenuClick: () => void;
}

export const Header: React.FC<Props> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Menu className="w-6 h-6 dark:text-gray-300" />
        </button>

        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-200 dark:placeholder-gray-400"
          />
        </div>

        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Search className="w-6 h-6 dark:text-gray-300" />
        </button>
      </div>

      {showSearch && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 p-4 md:hidden border-b dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l dark:border-gray-700">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium dark:text-gray-200">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
          <div className="relative group">
            <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-2">
                <div className="sm:hidden px-3 py-2 border-b dark:border-gray-700">
                  <p className="font-medium dark:text-gray-200">{user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};