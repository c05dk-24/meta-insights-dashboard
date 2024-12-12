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
import { formatCurrency, formatNumber } from '../../utils/metrics';

export const InsightsChart = () => {
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights('thisYear');

  console.log('InsightsChart - Data:', { insights, isLoading, error });

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
        <div className="text-red-500 p-4 rounded-lg bg-red-50">
          <p className="font-medium">Failed to load insights</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  // Use real data if available, otherwise use placeholder data
  const monthlyData = insights?.monthly || Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
    leads: Math.floor(Math.random() * 100),
    spend: Math.random() * 10000
  }));

  console.log('Chart data:', monthlyData);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        2024 Performance
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            tickFormatter={formatNumber}
            label={{ 
              value: 'Leads',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatCurrency}
            label={{ 
              value: 'Spend',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip 
            formatter={(value: any, name: string) => {
              if (name === 'spend') return formatCurrency(value);
              return formatNumber(value);
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="leads"
            stroke="#8884d8"
            name="Total Leads"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="spend"
            stroke="#82ca9d"
            name="Total Spend"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};