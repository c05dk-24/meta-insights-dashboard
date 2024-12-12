import { useAuth } from '../useAuth';
import { useAxios } from '../useAxios';
import { MetaService } from '../../services/meta/MetaService';
import { getDateRange } from '../../utils/dateRanges';

export const useMetaService = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const service = new MetaService(axios);

  const getInsights = async (range: string) => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    const { startDate, endDate } = getDateRange(range);
    
    console.log('useMetaService.getInsights:', {
      pageId: user.meta_page_id,
      startDate,
      endDate,
      range
    });

    try {
      const response = await axios.get('/api/meta/insights', {
        params: {
          page_id: user.meta_page_id,
          start_date: startDate,
          end_date: endDate
        }
      });

      console.log('Meta insights response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Meta insights error:', error.response?.data || error);
      throw error;
    }
  };

  const getCampaigns = async (dateRange: { from: Date; to: Date }) => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    console.log('useMetaService.getCampaigns:', {
      pageId: user.meta_page_id,
      startDate: dateRange.from,
      endDate: dateRange.to
    });

    try {
      const response = await axios.get('/api/meta/campaigns', {
        params: {
          page_id: user.meta_page_id,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0]
        }
      });

      console.log('Meta campaigns response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Meta campaigns error:', error.response?.data || error);
      throw error;
    }
  };

  return {
    isEnabled: () => !!user?.id && !!user?.meta_page_id,
    getInsights,
    getCampaigns
  };
};