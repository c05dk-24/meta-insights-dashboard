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

  const totals = adSets.reduce<Totals>((acc, adSet) => ({
    impressions: acc.impressions + adSet.impressions,
    reach: acc.reach + adSet.reach,
    leads: acc.leads + adSet.leads,
    amountSpent: acc.amountSpent + adSet.amountSpent
  }), {
    impressions: 0,
    reach: 0,
    leads: 0,
    amountSpent: 0
  });

  // Rest of the component remains the same
  return (
    // ... existing JSX
  );
};