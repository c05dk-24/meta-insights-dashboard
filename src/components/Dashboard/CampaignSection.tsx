import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { DateRangePicker } from '../ui/DateRangePicker';
import { CampaignTable } from './CampaignSection/CampaignTable';
import { AdSetTable } from './CampaignSection/AdSetTable';
import { AdTable } from './CampaignSection/AdTable';

export const CampaignSection = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Campaign Performance</h2>
        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          onChange={({ from, to }) => setDateRange({ from, to })}
        />
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="adsets">Ad Sets</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <CampaignTable 
            dateRange={dateRange}
            onSelectCampaign={setSelectedCampaign}
          />
        </TabsContent>

        <TabsContent value="adsets">
          <AdSetTable 
            dateRange={dateRange}
            campaignId={selectedCampaign}
          />
        </TabsContent>

        <TabsContent value="ads">
          <AdTable 
            dateRange={dateRange}
            campaignId={selectedCampaign}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};