```typescript
import React, { useState } from 'react';
import { RealTimeMetrics } from './RealTimeMetrics';
import { DateRangePicker } from './DateRangePicker';
import { PageViewsChart } from './PageViewsChart';
import { UserLocationMap } from './UserLocationMap';
import { DeviceBreakdown } from './DeviceBreakdown';
import { DateRange } from '../../../../types/analytics';

export const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    endDate: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold dark:text-white">Analytics Overview</h2>
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
        />
      </div>

      <RealTimeMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PageViewsChart dateRange={dateRange} />
        <UserLocationMap dateRange={dateRange} />
      </div>

      <DeviceBreakdown dateRange={dateRange} />
    </div>
  );
};
```