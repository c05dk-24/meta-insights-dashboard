import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Trello, Settings, Wand2, X } from 'lucide-react';

interface Props {
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Boards', href: '/boards', icon: Trello },
  { name: 'AI Generator', href: '/ai', icon: Wand2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC<Props> = ({ onClose }) => {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Meta Insights</h1>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 mt-6">
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
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};