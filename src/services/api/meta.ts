import { apiClient } from './config';
import { MetaInsight } from '../../types/meta';

export const metaApi = {
  getInsights: async (startDate: string, endDate: string) => {
    const { data } = await apiClient.get<MetaInsight[]>('/meta/insights', {
      params: { start_date: startDate, end_date: endDate }
    });
    return data;
  },

  updateMetaToken: async (token: string, pageId: string) => {
    const { data } = await apiClient.put('/users/meta-credentials', {
      meta_access_token: token,
      meta_page_id: pageId
    });
    return data;
  }
};