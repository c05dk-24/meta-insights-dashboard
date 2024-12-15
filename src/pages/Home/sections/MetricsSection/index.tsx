import React from 'react';
import { ProgressCircles } from './components/ProgressCircles';
import { useMetrics } from './hooks/useMetrics';

export const MetricsSection = () => {
  const { metrics } = useMetrics();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Performance Metrics</h2>
      <ProgressCircles metrics={metrics} />
    </div>
  );
};