import React from 'react';

interface Props {
  error: any;
}

export const ErrorState: React.FC<Props> = ({ error }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">
      {new Date().getFullYear()} Performance
    </h2>
    <div className="text-red-500">
      {error.response?.data?.message || 'Failed to load insights'}
    </div>
  </div>
);