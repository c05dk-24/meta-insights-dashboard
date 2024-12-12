import { useAxios } from '../../hooks/useAxios';
import { META_API_ENDPOINTS } from './config/endpoints';

export class MetaAuthService {
  private axios = useAxios();

  async getAuthStatus() {
    const { data } = await this.axios.get(`${META_API_ENDPOINTS.BASE_URL}/auth/status`);
    return data;
  }

  async exchangeCodeForToken(code: string) {
    const { data } = await this.axios.post(`${META_API_ENDPOINTS.BASE_URL}/auth/token`, { code });
    return data;
  }

  async disconnect() {
    const { data } = await this.axios.post(`${META_API_ENDPOINTS.BASE_URL}/auth/disconnect`);
    return data;
  }
}