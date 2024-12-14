import React from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { formatCurrency, formatNumber } from '../../../utils/metrics';

interface Props {
  dateRange: { from: Date; to: Date };
  campaignId: string | null;
}

export const AdSetTable: React.FC<Props> = ({ dateRange, campaignId }) => {
  const { useAdSets } = useMeta();
  const { data: adSets, isLoading } = useAdSets(dateRange, campaignId);

  if (!campaignId) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a campaign to view its ad sets
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-100 rounded mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-50 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Ad Set Name</th>
            <th className="text-right py-3 px-4">Impressions</th>
            <th className="text-right py-3 px-4">Reach</th>
            <th className="text-right py-3 px-4">Leads</th>
            <th className="text-right py-3 px-4">Cost per Lead</th>
            <th className="text-right py-3 px-4">Amount Spent</th>
          </tr>
        </thead>
        <tbody>
          {adSets?.map((adSet) => (
            <tr key={adSet.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{adSet.name}</td>
              <td className="text-right py-3 px-4">{formatNumber(adSet.impressions)}</td>
              <td className="text-right py-3 px-4">{formatNumber(adSet.reach)}</td>
              <td className="text-right py-3 px-4">{formatNumber(adSet.leads)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(adSet.costPerLead)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(adSet.amountSpent)}</td>
            </tr>
          ))}
          {adSets && adSets.length > 0 && (
            <tr className="font-semibold bg-gray-50">
              <td className="py-3 px-4">Total</td>
              <td className="text-right py-3 px-4">
                {formatNumber(adSets.reduce((sum, a) => sum + a.impressions, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatNumber(adSets.reduce((sum, a) => sum + a.reach, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatNumber(adSets.reduce((sum, a) => sum + a.leads, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatCurrency(
                  adSets.reduce((sum, a) => sum + a.amountSpent, 0) /
                  adSets.reduce((sum, a) => sum + a.leads, 0)
                )}
              </td>
              <td className="text-right py-3 px-4">
                {formatCurrency(adSets.reduce((sum, a) => sum + a.amountSpent, 0))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};