import React from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { formatCurrency, formatNumber } from '../../../utils/metrics';
import { AdSet } from '../../../types/meta';

interface Props {
  dateRange: { from: Date; to: Date };
  campaignId: string | null;
}

interface Totals {
  impressions: number;
  reach: number;
  leads: number;
  amountSpent: number;
}

export const AdSetTable: React.FC<Props> = ({ dateRange, campaignId }) => {
  const { useAdSets } = useMeta();
  const { data: adSets = [], isLoading } = useAdSets(campaignId, dateRange);

  const totals = React.useMemo(() => 
    adSets.reduce<Totals>(
      (acc, adSet) => ({
        impressions: acc.impressions + adSet.impressions,
        reach: acc.reach + adSet.reach,
        leads: acc.leads + adSet.leads,
        amountSpent: acc.amountSpent + adSet.amountSpent
      }),
      { impressions: 0, reach: 0, leads: 0, amountSpent: 0 }
    ),
    [adSets]
  );

  if (!campaignId) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Please select a campaign to view its ad sets
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHeader />
        <TableBody adSets={adSets} totals={totals} />
      </table>
    </div>
  );
};

const LoadingState = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded mb-4"></div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded mb-2"></div>
    ))}
  </div>
);

const TableHeader = () => (
  <thead>
    <tr className="border-b dark:border-gray-700">
      <th className="text-left py-3 px-4">Ad Set Name</th>
      <th className="text-right py-3 px-4">Impressions</th>
      <th className="text-right py-3 px-4">Reach</th>
      <th className="text-right py-3 px-4">Leads</th>
      <th className="text-right py-3 px-4">Cost per Lead</th>
      <th className="text-right py-3 px-4">Amount Spent</th>
    </tr>
  </thead>
);

interface TableBodyProps {
  adSets: AdSet[];
  totals: Totals;
}

const TableBody: React.FC<TableBodyProps> = ({ adSets, totals }) => (
  <tbody>
    {adSets.map((adSet) => (
      <tr key={adSet.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
        <td className="py-3 px-4">{adSet.name}</td>
        <td className="text-right py-3 px-4">{formatNumber(adSet.impressions)}</td>
        <td className="text-right py-3 px-4">{formatNumber(adSet.reach)}</td>
        <td className="text-right py-3 px-4">{formatNumber(adSet.leads)}</td>
        <td className="text-right py-3 px-4">{formatCurrency(adSet.costPerLead)}</td>
        <td className="text-right py-3 px-4">{formatCurrency(adSet.amountSpent)}</td>
      </tr>
    ))}
    {adSets.length > 0 && (
      <tr className="font-semibold bg-gray-50 dark:bg-gray-800">
        <td className="py-3 px-4">Total</td>
        <td className="text-right py-3 px-4">{formatNumber(totals.impressions)}</td>
        <td className="text-right py-3 px-4">{formatNumber(totals.reach)}</td>
        <td className="text-right py-3 px-4">{formatNumber(totals.leads)}</td>
        <td className="text-right py-3 px-4">
          {formatCurrency(totals.leads > 0 ? totals.amountSpent / totals.leads : 0)}
        </td>
        <td className="text-right py-3 px-4">{formatCurrency(totals.amountSpent)}</td>
      </tr>
    )}
  </tbody>
);