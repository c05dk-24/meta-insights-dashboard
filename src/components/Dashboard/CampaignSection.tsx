import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { PerformanceTable } from './CampaignSection/PerformanceTable';

export const CampaignSection = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-6">Performance Analytics</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PerformanceTable />
        </TabsContent>

        <TabsContent value="traffic">
          <PerformanceTable type="traffic" />
        </TabsContent>

        <TabsContent value="conversion">
          <PerformanceTable type="conversion" />
        </TabsContent>
      </Tabs>
    </div>
  );
};