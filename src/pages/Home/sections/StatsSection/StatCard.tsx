import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {value}
      </p>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
};