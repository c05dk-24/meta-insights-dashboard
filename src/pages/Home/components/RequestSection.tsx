import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Request {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
}

export const RequestSection = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [newRequest, setNewRequest] = useState('');

  const addRequest = () => {
    if (newRequest.trim()) {
      const request: Request = {
        id: crypto.randomUUID(),
        title: newRequest.trim(),
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      setRequests([request, ...requests]);
      setNewRequest('');
    }
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 backdrop-blur-lg bg-opacity-90">
      <h2 className="text-2xl font-bold mb-6">Support Requests</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Submit a new request..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addRequest}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit
        </button>
      </div>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{request.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(request.timestamp).toLocaleString()}
              </p>
            </div>
            <span className={`${getStatusColor(request.status)} px-3 py-1 rounded-full text-white text-sm`}>
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};