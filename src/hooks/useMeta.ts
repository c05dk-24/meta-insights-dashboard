import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const fetchInsights = async (range: string) => {
    console.log('Fetching insights:', {
      range,
      userId: user?.id,
      metaPageId: user?.meta_page_id
    });

    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected. Please add your Meta page ID in settings.');
    }

    try {
      const { data } = await axios.get('/meta/ads/insights', {
        params: { 
          range,
          accountId: user.meta_page_id
        }
      });
      
      console.log('Insights response:', data);
      return {
        impressions: data.impressions || 0,
        leads: data.results || 0,
        costPerLead: data.costPerResult || 0,
        amountSpent: data.amountSpent || 0
      };
    } catch (error: any) {
      console.error('Error fetching insights:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      throw error;
    }
  };

  const fetchCampaigns = async (dateRange: { from: Date; to: Date }) => {
    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected');
    }

    try {
      const { data } = await axios.get('/meta/campaigns', {
        params: {
          accountId: user.meta_page_id,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0]
        }
      });

      console.log('Campaigns response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  };

  const fetchAdSets = async (dateRange: { from: Date; to: Date }, campaignId: string | null) => {
    if (!user?.meta_page_id || !campaignId) return null;

    try {
      const { data } = await axios.get('/meta/campaigns/adsets', {
        params: {
          accountId: user.meta_page_id,
          campaignId,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0]
        }
      });

      console.log('Ad Sets response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching ad sets:', error);
      throw error;
    }
  };

  const fetchAds = async (dateRange: { from: Date; to: Date }, campaignId: string | null) => {
    if (!user?.meta_page_id || !campaignId) return null;

    try {
      const { data } = await axios.get('/meta/campaigns/ads', {
        params: {
          accountId: user.meta_page_id,
          campaignId,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0]
        }
      });

      console.log('Ads response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => fetchInsights(range),
        enabled: !!user?.id && !!user?.meta_page_id,
        retry: 1
      }),

    useCampaigns: (dateRange: { from: Date; to: Date }) =>
      useQuery({
        queryKey: ['campaigns', dateRange.from, dateRange.to],
        queryFn: () => fetchCampaigns(dateRange),
        enabled: !!user?.id && !!user?.meta_page_id
      }),

    useAdSets: (dateRange: { from: Date; to: Date }, campaignId: string | null) =>
      useQuery({
        queryKey: ['adsets', dateRange.from, dateRange.to, campaignId],
        queryFn: () => fetchAdSets(dateRange, campaignId),
        enabled: !!user?.id && !!user?.meta_page_id && !!campaignId
      }),

    useAds: (dateRange: { from: Date; to: Date }, campaignId: string | null) =>
      useQuery({
        queryKey: ['ads', dateRange.from, dateRange.to, campaignId],
        queryFn: () => fetchAds(dateRange, campaignId),
        enabled: !!user?.id && !!user?.meta_page_id && !!campaignId
      })
  };
};