```typescript
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trello, 
  Settings, 
  Wand2, 
  GraduationCap, 
  BookOpen,
  Sparkles,
  X 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Boards', href: '/boards', icon: Trello },
    { name: 'AI Post Generator', href: '/ai', icon: Wand2 },
    { name: 'Blog Generator', href: '/blog-generator', icon: BookOpen },
    { name: 'Content Tools', href: '/content-tools', icon: Sparkles },
    { name: 'Education', href: '/education', icon: GraduationCap },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Meta Insights</h1>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>
        
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
      </aside>
    </>
  );
};
```