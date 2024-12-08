import React from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { formatCurrency, formatNumber } from '../../../utils/metrics';

interface Props {
  dateRange: { from: Date; to: Date };
  onSelectCampaign: (campaignId: string) => void;
}

export const CampaignTable: React.FC<Props> = ({ dateRange, onSelectCampaign }) => {
  const { useCampaigns } = useMeta();
  const { data: campaigns, isLoading } = useCampaigns(dateRange);

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
            <th className="text-left py-3 px-4">Campaign Name</th>
            <th className="text-right py-3 px-4">Impressions</th>
            <th className="text-right py-3 px-4">Reach</th>
            <th className="text-right py-3 px-4">Leads</th>
            <th className="text-right py-3 px-4">Cost per Lead</th>
            <th className="text-right py-3 px-4">Amount Spent</th>
          </tr>
        </thead>
        <tbody>
          {campaigns?.map((campaign) => (
            <tr 
              key={campaign.id}
              onClick={() => onSelectCampaign(campaign.id)}
              className="border-b hover:bg-gray-50 cursor-pointer"
            >
              <td className="py-3 px-4">{campaign.name}</td>
              <td className="text-right py-3 px-4">{formatNumber(campaign.impressions)}</td>
              <td className="text-right py-3 px-4">{formatNumber(campaign.reach)}</td>
              <td className="text-right py-3 px-4">{formatNumber(campaign.leads)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(campaign.costPerLead)}</td>
              <td className="text-right py-3 px-4">{formatCurrency(campaign.amountSpent)}</td>
            </tr>
          ))}
          {campaigns && campaigns.length > 0 && (
            <tr className="font-semibold bg-gray-50">
              <td className="py-3 px-4">Total</td>
              <td className="text-right py-3 px-4">
                {formatNumber(campaigns.reduce((sum, c) => sum + c.impressions, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatNumber(campaigns.reduce((sum, c) => sum + c.reach, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatNumber(campaigns.reduce((sum, c) => sum + c.leads, 0))}
              </td>
              <td className="text-right py-3 px-4">
                {formatCurrency(
                  campaigns.reduce((sum, c) => sum + c.amountSpent, 0) /
                  campaigns.reduce((sum, c) => sum + c.leads, 0)
                )}
              </td>
              <td className="text-right py-3 px-4">
                {formatCurrency(campaigns.reduce((sum, c) => sum + c.amountSpent, 0))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};