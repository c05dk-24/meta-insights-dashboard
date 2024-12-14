```typescript
import React, { useState } from 'react';
import { ChartBar } from 'lucide-react';
import { useGoogleAnalytics } from '../../../hooks/useGoogleAnalytics';
import { toast } from 'react-hot-toast';

export const GoogleAnalyticsSetup = () => {
  const [propertyId, setPropertyId] = useState('');
  const [viewId, setViewId] = useState('');
  const { useConnect } = useGoogleAnalytics();
  const connect = useConnect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await connect.mutateAsync({ propertyId, viewId });
      toast.success('Google Analytics connected successfully!');
    } catch (error) {
      toast.error('Failed to connect Google Analytics');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <ChartBar className="w-6 h-6 text-blue-500" />
        <h2 className="text-lg font-semibold dark:text-white">Google Analytics</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Property ID
          </label>
          <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            placeholder="UA-XXXXXXXXX-X"
            className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            View ID
          </label>
          <input
            type="text"
            value={viewId}
            onChange={(e) => setViewId(e.target.value)}
            placeholder="XXXXXXXXX"
            className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={connect.isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800"
        >
          {connect.isPending ? 'Connecting...' : 'Connect Google Analytics'}
        </button>
      </form>
    </div>
  );
};
```