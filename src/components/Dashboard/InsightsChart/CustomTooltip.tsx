import React from 'react';
import { formatNumber, formatCurrency } from '../../../utils/metrics';

interface Props {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip: React.FC<Props> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-3 border rounded shadow-lg">
      <p className="font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm">
          <span style={{ color: entry.color }}>
            {entry.dataKey === 'amountSpent' ? 'Spend: ' : 'Results: '}
          </span>
          {entry.dataKey === 'amountSpent' 
            ? formatCurrency(entry.value)
            : formatNumber(entry.value)}
        </p>
      ))}
    </div>
  );
};