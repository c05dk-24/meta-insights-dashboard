import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  comingSoon?: boolean;
  onClick: () => void;
}

export const FeatureCard: React.FC<Props> = ({
  icon: Icon,
  title,
  description,
  comingSoon = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow relative group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
          
          {comingSoon && (
            <span className="inline-block mt-4 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
              Coming Soon
            </span>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-lg transition-colors" />
    </div>
  );
};