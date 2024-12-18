import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export const CardSection: React.FC<Props> = ({ icon: Icon, title, children }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Icon className="w-5 h-5" />
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
};