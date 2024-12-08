import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
}

export const InsightCard: React.FC<Props> = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base text-gray-600">{title}</h3>
        <Icon className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
      <p className={`text-xs sm:text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}% from last period
      </p>
    </div>
  );
};