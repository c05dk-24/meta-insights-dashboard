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
import { formatCurrency, formatNumber } from '../../../utils/metrics';
import { ChartData, ChartProps } from './types';

export const InsightsChartView = {
  Loading: () => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="h-full bg-gray-100 dark:bg-gray-700 rounded"></div>
    </div>
  ),

  Error: ({ error }: { error: Error }) => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/10">
        <p className="font-medium">Failed to load insights</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    </div>
  ),

  Empty: () => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="text-gray-500 dark:text-gray-400 p-4 text-center">
        <p className="font-medium">No data available</p>
        <p className="text-sm mt-1">Connect your Meta account to see insights</p>
      </div>
    </div>
  ),

  Default: ({ data }: ChartProps) => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
        {new Date().getFullYear()} Performance
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
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
            formatter={(value: number, name: string) => {
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
  )
};