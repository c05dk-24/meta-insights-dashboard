import React from 'react';
import { formatNumber, formatCurrency } from '../../../utils/formatters';

interface Props {
  type?: 'overview' | 'traffic' | 'conversion';
}

export const PerformanceTable: React.FC<Props> = ({ type = 'overview' }) => {
  // Sample data - replace with real data
  const data = [
    {
      name: 'Homepage',
      views: 12500,
      visitors: 8900,
      conversions: 234,
      revenue: 12340
    },
    {
      name: 'Products',
      views: 8900,
      visitors: 6700,
      conversions: 189,
      revenue: 9450
    },
    {
      name: 'Blog',
      views: 6700,
      visitors: 4500,
      conversions: 123,
      revenue: 6150
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Page</th>
            <th className="text-right py-3 px-4">Views</th>
            <th className="text-right py-3 px-4">Visitors</th>
            <th className="text-right py-3 px-4">Conversions</th>
            <th className="text-right py-3 px-4">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{item.name}</td>
              <td className="text-right py-3 px-4">{formatNumber(item.views)}</td>
              <td className="text-right py-3 px-4">{formatNumber(item.visitors)}</td>
              <td className="text-right py-3 px-4">{formatNumber(item.conversions)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(item.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};