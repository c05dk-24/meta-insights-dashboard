import { useAuth } from '../useAuth';
import { useAxios } from '../useAxios';
import { MetaService } from '../../services/meta/MetaService';

export const useMetaService = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const service = new MetaService(axios);

  return {
    isEnabled: () => !!user?.id && !!user?.meta_page_id,
    getInsights: (range: string) => service.getInsights(range, user?.meta_page_id!),
    getCampaigns: (dateRange: any) => service.getCampaigns(user?.meta_page_id!, dateRange),
    getAdSets: (campaignId: string, dateRange: any) => 
      service.getAdSets(user?.meta_page_id!, campaignId, dateRange)
  };
};