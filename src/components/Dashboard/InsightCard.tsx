import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
}

export const InsightCard: React.FC<Props> = ({ title, value, change, icon: Icon }) => {
  const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat().format(value)
    : value;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <Icon className="text-blue-500 w-5 h-5" />
      </div>
      <p className="text-2xl font-semibold mb-2">{formattedValue}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change.toFixed(1)}% from last period
      </p>
    </div>
  );
};