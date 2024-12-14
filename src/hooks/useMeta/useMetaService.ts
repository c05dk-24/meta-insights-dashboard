import { useAuth } from '../useAuth';
import { useAxios } from '../useAxios';
import { getDateRange } from '../../utils/dateRanges';
import { getApiUrl } from '../../utils/config';
import { API_CONFIG } from '../../services/meta/config';
import { InsightsResponse, Campaign, DateRange } from '../../types/meta';

export const useMetaService = () => {
  const { user } = useAuth();
  const axios = useAxios();

  const getInsights = async (range: string): Promise<InsightsResponse> => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    const { startDate, endDate } = getDateRange(range);
    
    try {
      const { data } = await axios.get(`${getApiUrl()}/meta/insights`, {
        params: {
          page_id: user.meta_page_id,
          fields: API_CONFIG.FIELDS.INSIGHTS.join(','),
          time_range: JSON.stringify({
            since: startDate,
            until: endDate
          })
        }
      });

      return data;
    } catch (error: any) {
      console.error('Meta insights error:', error.response?.data || error);
      throw error;
    }
  };

  const getCampaigns = async (dateRange: DateRange): Promise<Campaign[]> => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    try {
      const { data } = await axios.get(`${getApiUrl()}/meta/campaigns`, {
        params: {
          page_id: user.meta_page_id,
          fields: API_CONFIG.FIELDS.CAMPAIGNS.join(','),
          time_range: JSON.stringify({
            since: dateRange.from.toISOString().split('T')[0],
            until: dateRange.to.toISOString().split('T')[0]
          })
        }
      });

      return data.data || [];
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