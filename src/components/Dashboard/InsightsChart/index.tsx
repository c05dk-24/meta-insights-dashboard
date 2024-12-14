import React from 'react';
import { InsightsChartView } from './InsightsChartView';
import { useInsightsData } from './useInsightsData';

export const InsightsChart = () => {
  const { data, isLoading, error } = useInsightsData();

  if (isLoading) {
    return <InsightsChartView.Loading />;
  }

  if (error) {
    return <InsightsChartView.Error error={error} />;
  }

  if (!data?.length) {
    return <InsightsChartView.Empty />;
  }

  return <InsightsChartView data={data} />;
};