export interface MetaInsight {
  id: string;
  date: string;
  impressions: number;
  leads: number;
  costPerLead: number;
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
  leads: number;
  amountSpent: number;
}

export interface YearlyData {
  month: string;
  leads: number;
  amountSpent: number;
}