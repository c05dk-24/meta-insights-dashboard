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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600">{title}</h3>
        <Icon className="text-blue-500" />
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}% from last period
      </p>
    </div>
  );
};