import React from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { ChartContainer } from './ChartContainer';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export const InsightsChart = () => {
  const { useYearlyData } = useMeta();
  const { data, isLoading, error } = useYearlyData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    console.error('Chart error:', error);
    return <ErrorState error={error} />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {new Date().getFullYear()} Performance
        </h2>
        <div className="h-full flex items-center justify-center text-gray-500">
          No data available for this period
        </div>
      </div>
    );
  }

  return <ChartContainer data={data} />;
};