import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { RequestModal } from './RequestModal';

interface Request {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
}

export const RequestSection = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddRequest = ({ title, description, priority }: { title: string; description: string; priority: string }) => {
    const request: Request = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setRequests([request, ...requests]);
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Support Requests</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          New Request
        </button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium dark:text-white">{request.title}</h3>
              <span className={`${getStatusColor(request.status)} px-3 py-1 rounded-full text-white text-sm`}>
                {request.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{request.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className={`font-medium ${getPriorityColor(request.priority)}`}>
                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {new Date(request.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRequest}
      />
    </div>
  );
};