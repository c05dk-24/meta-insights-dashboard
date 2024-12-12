import React from 'react';
import { Facebook } from 'lucide-react';
import { useMetaAuth } from '../hooks/useMetaAuth';
import { useAxios } from '../hooks/useAxios';
import { toast } from 'react-hot-toast';

export const MetaConnect = () => {
  const { isConnected, disconnect } = useMetaAuth();
  const axios = useAxios();

  const handleConnect = async () => {
    try {
      const { data } = await axios.get('/api/meta/auth/url');
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        toast.error('Failed to get Meta authentication URL');
      }
    } catch (error) {
      console.error('Meta connection error:', error);
      toast.error('Failed to initiate Meta connection');
    }
  };

  const handleDisconnect = () => {
    disconnect.mutate(undefined, {
      onSuccess: () => toast.success('Successfully disconnected Meta account'),
      onError: () => toast.error('Failed to disconnect Meta account')
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Facebook className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-medium">Meta Connection</h3>
            <p className="text-sm text-gray-500">
              {isConnected 
                ? 'Your Meta account is connected'
                : 'Connect your Meta account to view insights'
              }
            </p>
          </div>
        </div>

        {isConnected ? (
          <button
            onClick={handleDisconnect}
            disabled={disconnect.isPending}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            {disconnect.isPending ? 'Disconnecting...' : 'Disconnect'}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Connect Meta
          </button>
        )}
      </div>
    </div>
  );
};