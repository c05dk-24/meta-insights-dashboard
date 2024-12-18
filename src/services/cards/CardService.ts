import { AxiosInstance } from 'axios';
import { BoardCard } from '../../types/meta';

export class CardService {
  constructor(private axios: AxiosInstance) {}

  async moveCard(
    cardId: string, 
    sourceListId: string, 
    destinationListId: string
  ): Promise<BoardCard> {
    console.log('CardService.moveCard:', { cardId, sourceListId, destinationListId });
    
    try {
      const { data } = await this.axios.put(`/api/cards/${cardId}/move`, {
        source_list_id: sourceListId,
        destination_list_id: destinationListId
      });
      
      return data;
    } catch (error) {
      console.error('Error moving card:', error);
      throw error;
    }
  }

  async updateCard(cardId: string, updates: Partial<BoardCard>): Promise<BoardCard> {
    const { data } = await this.axios.put(`/api/cards/${cardId}`, updates);
    return data;
  }

  async deleteCard(cardId: string): Promise<void> {
    await this.axios.delete(`/api/cards/${cardId}`);
  }
}