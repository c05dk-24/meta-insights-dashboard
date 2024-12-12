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

  console.log('InsightsChart - Raw data:', { insights, isLoading, error });

  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="text-red-500 p-4 rounded-lg bg-red-50">
          <p className="font-medium">Failed to load insights</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  if (!insights?.data?.length) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="text-gray-500 p-4 text-center">
          <p className="font-medium">No data available</p>
          <p className="text-sm mt-1">Connect your Meta account to see insights</p>
        </div>
      </div>
    );
  }

  // Transform API data for the chart
  const chartData = insights.data.map(item => {
    const date = new Date(item.date_start || item.date);
    const leads = item.actions?.find(a => 
      a.action_type === 'lead' || 
      a.action_type === 'leadgen'
    )?.value || 0;

    return {
      month: date.toLocaleString('default', { month: 'short' }),
      leads: parseInt(leads, 10),
      amountSpent: parseFloat(item.spend || '0')
    };
  });

  console.log('Chart data:', chartData);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        {new Date().getFullYear()} Performance
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
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
              if (name === 'amountSpent') return formatCurrency(value);
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
            dataKey="amountSpent"
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