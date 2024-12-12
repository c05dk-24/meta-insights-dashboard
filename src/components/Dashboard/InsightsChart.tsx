import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const InsightsChart = () => {
  // Sample data - replace with real data
  const data = [
    { month: 'Jan', users: 1000, revenue: 5000 },
    { month: 'Feb', users: 1500, revenue: 7500 },
    { month: 'Mar', users: 2000, revenue: 10000 },
    { month: 'Apr', users: 1800, revenue: 9000 },
    { month: 'May', users: 2200, revenue: 11000 },
    { month: 'Jun', users: 2800, revenue: 14000 }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Performance Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            yAxisId="left"
            tickFormatter={formatNumber}
            label={{ 
              value: 'Users',
              angle: -90,
              position: 'insideLeft'
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatCurrency}
            label={{ 
              value: 'Revenue',
              angle: 90,
              position: 'insideRight'
            }}
          />
          <Tooltip 
            formatter={(value: any, name: string) => {
              if (name === 'revenue') return formatCurrency(value);
              return formatNumber(value);
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            name="Users"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#82ca9d"
            name="Revenue"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};