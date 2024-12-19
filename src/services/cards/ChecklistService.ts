import { AxiosInstance } from 'axios';
import { CardChecklist } from '../../types/meta';

export class ChecklistService {
  constructor(private axios: AxiosInstance) {}

  async getChecklists(cardId: string): Promise<CardChecklist[]> {
    const { data } = await this.axios.get(`/api/cards/${cardId}/checklists`);
    return data;
  }

  async addItem(cardId: string, text: string): Promise<CardChecklist> {
    const { data } = await this.axios.post(`/api/cards/${cardId}/checklists`, {
      text
    });
    return data;
  }

  async toggleItem(cardId: string, itemId: string): Promise<CardChecklist> {
    const { data } = await this.axios.put(`/api/cards/${cardId}/checklists/${itemId}/toggle`);
    return data;
  }

  async deleteItem(itemId: string): Promise<void> {
    await this.axios.delete(`/api/checklists/${itemId}`);
  }
}