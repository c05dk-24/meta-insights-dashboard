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
  const { data: insights, isLoading, error } = useInsights('thisMonth');

  console.log('Chart render:', { insights, isLoading, error });

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
          {error.response?.data?.message || 'Failed to load insights'}
        </p>
      </div>
    );
  }

  const chartData = insights ? [
    {
      name: 'Current Period',
      impressions: insights.impressions || 0,
      results: insights.results || 0,
      costPerResult: insights.costPerResult || 0,
      amountSpent: insights.amountSpent || 0,
    }
  ] : [];

  console.log('Chart data:', chartData);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            {entry.name.includes('cost') || entry.name.includes('amount')
              ? formatCurrency(entry.value)
              : formatNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Performance Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
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
            dataKey="results"
            stroke="#82ca9d"
            name="Results"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="costPerResult"
            stroke="#ffc658"
            name="Cost per Result"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="amountSpent"
            stroke="#ff8042"
            name="Amount Spent"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};