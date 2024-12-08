export interface MetaInsight {
  id: string;
  date: string;
  impressions: number;
  results: number;
  costPerResult: number;
  amountSpent: number;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: any;
}

export interface ChartData {
  name: string;
  impressions: number;
  results: number;
  costPerResult: number;
  amountSpent: number;
}