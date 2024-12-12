import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { MetaService } from '../services/meta/MetaService';
import { getDateRange } from '../utils/dateRanges';
import { DateRange } from '../types/meta';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const metaService = new MetaService(axios);

  const validateUser = () => {
    if (!user?.meta_page_id) {
      console.warn('No Meta page ID found for user:', user?.id);
      throw new Error('No Meta ad account connected');
    }
    console.log('Meta Page ID validated:', user.meta_page_id);
    return user.meta_page_id;
  };

  return {
    useAccountInfo: (pageId?: string) =>
      useQuery({
        queryKey: ['meta', 'account', pageId],
        queryFn: async () => {
          if (!pageId) {
            console.warn('No page ID provided for account info');
            return null;
          }
          console.log('Fetching account info for page ID:', pageId);
          return metaService.getAccountInfo(pageId);
        },
        enabled: !!pageId
      }),

    // ... rest of the hooks
  };
};