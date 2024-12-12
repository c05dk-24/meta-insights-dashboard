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

  console.log('InsightsChart - Raw Data:', { insights, isLoading, error });

  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-72 sm:h-96 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (error) {
    console.error('InsightsChart - Error:', error);
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="text-red-500 p-4 rounded-lg bg-red-50">
          <p className="font-medium">Failed to load insights</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  // Generate monthly data points for the current year
  const currentYear = new Date().getFullYear();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthlyData = months.map((month, index) => {
    // Get real data from insights if available, otherwise use placeholder
    const monthData = insights?.monthly?.[index] || {
      leads: Math.floor(Math.random() * 100),
      amountSpent: Math.random() * 10000
    };

    console.log(`InsightsChart - Month Data (${month}):`, monthData);

    return {
      month,
      leads: monthData.leads,
      spend: monthData.amountSpent // Changed from amountSpent to spend for clarity
    };
  });

  console.log('InsightsChart - Processed Monthly Data:', monthlyData);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} className="text-sm">
            <span style={{ color: entry.color }}>
              {entry.dataKey === 'spend' ? 'Spend: ' : 'Leads: '}
            </span>
            {entry.dataKey === 'spend' 
              ? formatCurrency(entry.value)
              : `${formatNumber(entry.value)} leads`}
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
          <Tooltip content={<CustomTooltip />} />
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