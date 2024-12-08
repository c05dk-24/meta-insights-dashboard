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
import { format } from 'date-fns';

interface Props {
  data: any[];
  isLoading: boolean;
}

export const InsightsChart: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm h-96 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-96">
      <h2 className="text-lg font-semibold mb-6">Performance Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#8884d8"
            name="Impressions"
          />
          <Line
            type="monotone"
            dataKey="reach"
            stroke="#82ca9d"
            name="Reach"
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#ffc658"
            name="Engagement"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};