import React from 'react';
import { RequestInput } from './RequestInput';
import { RequestsList } from './RequestsList';
import { useRequests } from '../../hooks/useRequests';

export const RequestsPanel = () => {
  const { requests, addRequest, updateRequest } = useRequests();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Support Requests</h2>
      <RequestInput onSubmit={addRequest} />
      <RequestsList requests={requests} onUpdateStatus={updateRequest} />
    </div>
  );
};