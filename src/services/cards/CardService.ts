import { AxiosInstance } from 'axios';
import { BoardCard, CardComment, CardChecklist, Label } from '../../types/meta';

export class CardService {
  constructor(private axios: AxiosInstance) {}

  async addCard(listId: string, title: string, userId: string): Promise<BoardCard> {
    const { data } = await this.axios.post(`/api/lists/${listId}/cards`, {
      title,
      user_id: userId
    });
    return data;
  }

  async updateCard(cardId: string, updates: Partial<BoardCard>): Promise<BoardCard> {
    const { data } = await this.axios.put(`/api/cards/${cardId}`, updates);
    return data;
  }

  async addComment(cardId: string, text: string, userId: string): Promise<CardComment> {
    const { data } = await this.axios.post(`/api/cards/${cardId}/comments`, {
      text,
      user_id: userId
    });
    return data;
  }

  async addChecklist(cardId: string, text: string): Promise<CardChecklist> {
    const { data } = await this.axios.post(`/api/cards/${cardId}/checklist`, {
      text
    });
    return data;
  }

  async toggleChecklistItem(cardId: string, itemId: string): Promise<CardChecklist> {
    const { data } = await this.axios.put(`/api/cards/${cardId}/checklist/${itemId}/toggle`);
    return data;
  }

  async addLabel(cardId: string, labelId: string): Promise<Label> {
    const { data } = await this.axios.post(`/api/cards/${cardId}/labels/${labelId}`);
    return data;
  }

  async removeLabel(cardId: string, labelId: string): Promise<void> {
    await this.axios.delete(`/api/cards/${cardId}/labels/${labelId}`);
  }
}