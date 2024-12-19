import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';
import { BoardCard, CardComment, CardChecklist } from '../../types/meta';

export class CardService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async getComments(cardId: string): Promise<CardComment[]> {
    const { data, error } = await this.supabase
      .from('Comments')
      .select(`
        id,
        text,
        user_id,
        card_id,
        created_at,
        Users (
          name
        )
      `)
      .eq('card_id', cardId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(comment => ({
      ...comment,
      author: comment.Users.name
    }));
  }

  async addComment(cardId: string, text: string, userId: string): Promise<CardComment> {
    const { data, error } = await this.supabase
      .from('Comments')
      .insert({
        text,
        card_id: cardId,
        user_id: userId
      })
      .select(`
        id,
        text,
        user_id,
        card_id,
        created_at,
        Users (
          name
        )
      `)
      .single();

    if (error) throw error;
    return {
      ...data,
      author: data.Users.name
    };
  }

  async getChecklists(cardId: string): Promise<CardChecklist[]> {
    const { data, error } = await this.supabase
      .from('Checklists')
      .select('*')
      .eq('card_id', cardId)
      .order('position');

    if (error) throw error;
    return data;
  }

  async addChecklist(cardId: string, text: string): Promise<CardChecklist> {
    // Get max position
    const { data: items } = await this.supabase
      .from('Checklists')
      .select('position')
      .eq('card_id', cardId)
      .order('position', { ascending: false })
      .limit(1);

    const position = items?.[0]?.position ?? -1;

    const { data, error } = await this.supabase
      .from('Checklists')
      .insert({
        text,
        card_id: cardId,
        position: position + 1
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async toggleChecklistItem(itemId: string): Promise<void> {
    const { error } = await this.supabase
      .from('Checklists')
      .update({ completed: this.supabase.raw('NOT completed') })
      .eq('id', itemId);

    if (error) throw error;
  }
}