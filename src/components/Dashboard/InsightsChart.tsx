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

  console.log('Chart data:', { insights, isLoading, error });

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

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const yearlyData = months.map(month => ({
    month,
    leads: Math.floor(Math.random() * 100), // Replace with actual data
    amountSpent: Math.random() * 10000 // Replace with actual data
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm">
            <span style={{ color: entry.color }}>
              {entry.name === 'amountSpent' ? 'Spend: ' : 'Leads: '}
            </span>
            {entry.name === 'amountSpent' 
              ? formatCurrency(entry.value)
              : formatNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        {currentYear} Performance
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
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
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `£${formatNumber(value)}`}
            label={{ 
              value: 'Spend',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="leads"
            stroke="#8884d8"
            name="Leads"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="amountSpent"
            stroke="#82ca9d"
            name="Spend"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};