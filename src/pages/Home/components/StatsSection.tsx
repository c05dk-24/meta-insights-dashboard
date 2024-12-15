import React from 'react';
import { stats } from '../data/stats';

export const StatsSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stat.value}
            </p>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};