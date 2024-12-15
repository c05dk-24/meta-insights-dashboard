import React from 'react';
import { ProgressCircle } from './ProgressCircle';
import { Metric } from '../types';

interface Props {
  metrics: Metric[];
}

export const ProgressCircles: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {metrics.map((metric) => (
        <ProgressCircle key={metric.label} {...metric} />
      ))}
    </div>
  );
};