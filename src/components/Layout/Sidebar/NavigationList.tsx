import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { navigation } from './navigation';

interface Props {
  onClose: () => void;
}

export const NavigationList: React.FC<Props> = ({ onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const renderNavItem = (item: any, level = 0) => {
    const isActive = location.pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const Icon = item.icon;
    
    return (
      <div key={item.name}>
        <div className="flex">
          <Link
            to={item.href}
            onClick={onClose}
            className={`
              flex-1 flex items-center px-6 py-3 text-sm font-medium
              ${isActive 
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
            `}
            style={{ paddingLeft: `${level * 16 + 24}px` }}
          >
            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400 dark:text-gray-500'}`} />
            {item.name}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleExpand(item.name)}
              className="px-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children.map((child: any) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="mt-6">
      {navigation.map(item => renderNavItem(item))}
    </nav>
  );
};