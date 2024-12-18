import React from 'react';

export const BoardLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-80 flex-shrink-0">
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-24 bg-gray-50 dark:bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);