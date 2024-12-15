import { AxiosInstance } from 'axios';

export class MetaConnectionService {
  constructor(private axios: AxiosInstance) {}

  async verifyConnection(pageId: string): Promise<boolean> {
    try {
      const { data } = await this.axios.get('/api/meta/verify', {
        params: { page_id: pageId }
      });
      return data.isValid;
    } catch (error) {
      return false;
    }
  }

  async getConnectedAccounts(): Promise<Array<{ id: string, name: string }>> {
    try {
      const { data } = await this.axios.get('/api/meta/accounts');
      return data.accounts;
    } catch (error) {
      return [];
    }
  }
}