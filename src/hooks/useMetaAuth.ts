import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MetaAuthService } from '../services/meta/MetaAuthService';
import { toast } from 'react-hot-toast';

export const useMetaAuth = () => {
  const queryClient = useQueryClient();
  const authService = new MetaAuthService();

  const { data: authStatus, isLoading } = useQuery({
    queryKey: ['meta-auth-status'],
    queryFn: () => authService.getAuthStatus(),
    retry: 1
  });

  const exchangeCode = useMutation({
    mutationFn: (code: string) => authService.exchangeCodeForToken(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta-auth-status'] });
      toast.success('Successfully connected Meta account');
    },
    onError: () => {
      toast.error('Failed to connect Meta account');
    }
  });

  const disconnect = useMutation({
    mutationFn: () => authService.disconnect(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta-auth-status'] });
      toast.success('Successfully disconnected Meta account');
    },
    onError: () => {
      toast.error('Failed to disconnect Meta account');
    }
  });

  return {
    isConnected: authStatus?.isConnected || false,
    pageId: authStatus?.pageId,
    isLoading,
    exchangeCode,
    disconnect
  };
};