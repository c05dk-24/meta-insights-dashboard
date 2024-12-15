import React from 'react';
import { NotesPanel } from './components/NotesPanel';
import { RequestsPanel } from './components/RequestsPanel';

export const WorkspaceSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <NotesPanel />
      <RequestsPanel />
    </div>
  );
};