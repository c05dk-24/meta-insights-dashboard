import React from 'react';
import { Circle } from 'lucide-react';

interface ProgressCircleProps {
  percentage: number;
  label: string;
  color: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage, label, color }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold dark:text-white">{percentage}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
};

export const ProgressCircles = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg backdrop-blur-lg bg-opacity-90">
      <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Performance Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <ProgressCircle percentage={85} label="Campaign Success" color="text-blue-500" />
        <ProgressCircle percentage={92} label="Engagement Rate" color="text-purple-500" />
        <ProgressCircle percentage={78} label="ROI" color="text-green-500" />
        <ProgressCircle percentage={95} label="AI Accuracy" color="text-orange-500" />
      </div>
    </div>
  );
};