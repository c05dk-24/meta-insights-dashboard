import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useMeta } from '../../hooks/useMeta';

export const InsightsChart = () => {
  const { useInsights } = useMeta();
  const { data: insights, isLoading } = useInsights('thisMonth');

  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  const chartData = insights ? [
    {
      name: 'Current Period',
      impressions: insights.impressions,
      reach: insights.reach,
      engagement: insights.engagement,
    }
  ] : [];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Performance Insights</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#8884d8"
            name="Impressions"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="reach"
            stroke="#82ca9d"
            name="Reach"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#ffc658"
            name="Engagement"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};