import React from 'react';
import { HomeLayout } from './layouts/HomeLayout';
import { MetricsSection } from './sections/MetricsSection';
import { WorkspaceSection } from './sections/WorkspaceSection';

export const Home = () => {
  return (
    <HomeLayout>
      <MetricsSection />
      <WorkspaceSection />
    </HomeLayout>
  );
};