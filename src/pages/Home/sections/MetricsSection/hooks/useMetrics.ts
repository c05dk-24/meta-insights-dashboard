import { useMemo } from 'react';
import { Metric } from '../types';

export const useMetrics = () => {
  const metrics = useMemo<Metric[]>(() => [
    { percentage: 85, label: 'Campaign Success', color: 'text-blue-500' },
    { percentage: 92, label: 'Engagement Rate', color: 'text-purple-500' },
    { percentage: 78, label: 'ROI', color: 'text-green-500' },
    { percentage: 95, label: 'AI Accuracy', color: 'text-orange-500' }
  ], []);

  return { metrics };
};