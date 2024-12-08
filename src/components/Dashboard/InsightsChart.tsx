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
import { useAuth } from '../../hooks/useAuth';

export const InsightsChart = () => {
  const { user } = useAuth();
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights('thisMonth');

  console.log('Chart render:', {
    user,
    insights,
    isLoading,
    error
  });

  if (!user?.meta_page_id) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <p className="text-gray-500">
          No Meta ad account connected. Please add your Meta page ID in settings.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (error) {
    console.error('Chart error:', error);
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <p className="text-red-500">
          Failed to load insights. Please try again later.
        </p>
      </div>
    );
  }

  const chartData = insights ? [
    {
      name: 'Current Period',
      impressions: insights.impressions || 0,
      reach: insights.reach || 0,
      engagement: insights.engagement || 0,
      clicks: insights.clicks || 0,
    }
  ] : [];

  console.log('Chart data:', chartData);

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
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#ff8042"
            name="Clicks"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};