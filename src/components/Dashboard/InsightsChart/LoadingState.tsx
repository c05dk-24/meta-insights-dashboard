import React from 'react';

export const LoadingState = () => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-full bg-gray-100 rounded"></div>
  </div>
);