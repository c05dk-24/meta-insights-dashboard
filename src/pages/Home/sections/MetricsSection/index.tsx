import React from 'react';
import { ProgressCircles } from './components/ProgressCircles';
import { useMetrics } from './hooks/useMetrics';

export const MetricsSection = () => {
  const { metrics } = useMetrics();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 backdrop-blur-lg bg-opacity-90">
      <h2 className="text-2xl font-bold mb-8 text-center">Performance Metrics</h2>
      <ProgressCircles metrics={metrics} />
    </div>
  );
};