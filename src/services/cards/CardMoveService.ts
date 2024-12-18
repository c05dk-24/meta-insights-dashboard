import { AxiosInstance } from 'axios';

export class CardMoveService {
  constructor(private axios: AxiosInstance) {}

  async moveCard(cardId: string, newListId: string) {
    try {
      const { data } = await this.axios.put(`/api/cards/${cardId}/move`, {
        list_id: newListId
      });
      return data;
    } catch (error) {
      console.error('CardMoveService.moveCard error:', error);
      throw error;
    }
  }
}