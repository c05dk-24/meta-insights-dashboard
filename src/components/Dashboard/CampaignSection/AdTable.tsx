import React from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { formatCurrency, formatNumber } from '../../../utils/metrics';

interface Props {
  dateRange: { from: Date; to: Date };
  campaignId: string | null;
}

export const AdTable: React.FC<Props> = ({ dateRange, campaignId }) => {
  const { useAds } = useMeta();
  const { data: ads, isLoading } = useAds(dateRange, campaignId);

  if (!campaignId) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a campaign to view its ads
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
            <th className="text-left py-3 px-4">Ad Name</th>
            <th className="text-right py-3 px-4">Impressions</th>
            <th className="text-right py-3 px-4">Reach</th>
            <th className="text-right py-3 px-4">Leads</th>
            <th className="text-right py-3 px-4">Cost per Lead</th>
            <th className="text-right py-3 px-4">Amount Spent</th>
          </tr>
        </thead>
        <tbody>
          {ads?.map((ad) => (
            <tr key={ad.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{ad.name}</td>
              <td className="text-right py-3 px-4">{formatNumber(ad.impressions)}</td>
              <td className="text-right py-3 px-4">{formatNumber(ad.reach)}</td>
              <td className="text-right py-3 px-4">{formatNumber(ad.leads)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(ad.costPerLead)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(ad.amountSpent)}</td>
            </tr>
          ))}
          {ads && ads.length > 0 && (
            <tr className="font-semibold bg-gray-50">
              <td className="py-3 px-4">Total</td>
              <td className="text-right py-3 px-4">
                {formatNumber(ads.reduce((sum, a) => sum + a.impressions, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatNumber(ads.reduce((sum, a) => sum + a.reach, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatNumber(ads.reduce((sum, a) => sum + a.leads, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatCurrency(
                  ads.reduce((sum, a) => sum + a.amountSpent, 0) /
                  ads.reduce((sum, a) => sum + a.leads, 0)
                )}
              </td>
              <td className="text-right py-3 px-4">
                {formatCurrency(ads.reduce((sum, a) => sum + a.amountSpent, 0))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};