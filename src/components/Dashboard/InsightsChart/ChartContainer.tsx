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
import { YearlyData } from '../../../types/meta';
import { CustomTooltip } from './CustomTooltip';
import { formatNumber } from '../../../utils/metrics';

interface Props {
  data: YearlyData[];
}

export const ChartContainer: React.FC<Props> = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {new Date().getFullYear()} Performance
        </h2>
        <div className="h-full flex items-center justify-center text-gray-500">
          No data available for this period
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        {new Date().getFullYear()} Performance
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
              value: 'Results',
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
            dataKey="results"
            stroke="#8884d8"
            name="Results"
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