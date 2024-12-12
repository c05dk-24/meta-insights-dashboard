import { useAuth } from '../useAuth';
import { useAxios } from '../useAxios';
import { getDateRange } from '../../utils/dateRanges';
import { getApiUrl, API_CONFIG } from '../../utils/config';

export const useMetaService = () => {
  const { user } = useAuth();
  const axios = useAxios();

  const getInsights = async (range: string) => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    const { startDate, endDate } = getDateRange(range);
    
    console.log('Fetching Meta insights:', {
      pageId: user.meta_page_id,
      startDate,
      endDate,
      range
    });

    try {
      const { data } = await axios.get(`${getApiUrl()}/${user.meta_page_id}/insights`, {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: API_CONFIG.META.FIELDS.INSIGHTS,
          time_range: JSON.stringify({
            since: startDate,
            until: endDate
          })
        }
      });

      console.log('Meta insights response:', data);
      return data;
    } catch (error: any) {
      console.error('Meta insights error:', error.response?.data || error);
      throw error;
    }
  };

  const getCampaigns = async (dateRange: { from: Date; to: Date }) => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    console.log('Fetching Meta campaigns:', {
      pageId: user.meta_page_id,
      startDate: dateRange.from,
      endDate: dateRange.to
    });

    try {
      const { data } = await axios.get(`${getApiUrl()}/act_${user.meta_page_id}/campaigns`, {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: API_CONFIG.META.FIELDS.CAMPAIGNS,
          time_range: JSON.stringify({
            since: dateRange.from.toISOString().split('T')[0],
            until: dateRange.to.toISOString().split('T')[0]
          })
        }
      });

      console.log('Meta campaigns response:', data);
      return data;
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