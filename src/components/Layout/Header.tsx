import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Menu, Search, Settings, User } from 'lucide-react';

interface Props {
  onMenuClick: () => void;
}

export const Header: React.FC<Props> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-full md:hidden">
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-full hidden sm:block">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium truncate max-w-[120px]">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">{user?.email}</p>
          </div>
          <div className="relative group">
            <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-2">
                <div className="px-3 py-2 sm:hidden">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
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