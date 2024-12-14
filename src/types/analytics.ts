```typescript
export interface AnalyticsConfig {
  propertyId: string;
  viewId: string;
}

export interface AnalyticsMetrics {
  activeUsers: number;
  pageViews: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface PageViewData {
  path: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

export interface UserData {
  country: string;
  count: number;
  percentage: number;
}

export interface DeviceData {
  type: string;
  count: number;
  percentage: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
```