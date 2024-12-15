export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface MetaInsightsParams {
  accountId: string;
  start_date: string;
  end_date: string;
  campaignId?: string;
  level?: 'campaign' | 'adset' | 'ad';
}

export interface InsightsResponse {
  impressions: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
}

export interface MetaInsight {
  id: string;
  date: string;
  impressions: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
}

export interface Campaign {
  id: string;
  name: string;
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
}

export interface AdSet extends Campaign {}

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