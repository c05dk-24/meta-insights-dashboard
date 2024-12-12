import axios, { AxiosInstance } from 'axios';
import { META_API_CONFIG } from './config';
import { MetaApiConfig, MetaApiParams, MetaApiResponse } from './types';
import { buildApiUrl, buildQueryParams } from './utils/urlBuilder';
import { handleApiError } from './utils/errorHandler';

export class MetaApiClient {
  private axios: AxiosInstance;
  private config: MetaApiConfig;

  constructor(config: MetaApiConfig) {
    this.config = config;
    this.axios = axios.create({
      baseURL: config.baseUrl,
      params: {
        access_token: config.accessToken
      }
    });

    // Add logging interceptors
    this.setupInterceptors();
  }

  async getInsights<T>(params: MetaApiParams): Promise<MetaApiResponse<T>> {
    try {
      console.log('Fetching Meta insights:', { accountId: this.config.accountId, params });
      
      const url = buildApiUrl(META_API_CONFIG.ENDPOINTS.INSIGHTS, this.config.accountId);
      const queryParams = buildQueryParams(params);
      
      const { data } = await this.axios.get(url, { params: queryParams });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getCampaigns<T>(params: MetaApiParams): Promise<MetaApiResponse<T>> {
    try {
      console.log('Fetching Meta campaigns:', { accountId: this.config.accountId, params });
      
      const url = buildApiUrl(META_API_CONFIG.ENDPOINTS.CAMPAIGNS, this.config.accountId);
      const queryParams = buildQueryParams(params);
      
      const { data } = await this.axios.get(url, { params: queryParams });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  private setupInterceptors() {
    // Request logging
    this.axios.interceptors.request.use(
      (config) => {
        console.log('Meta API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params
        });
        return config;
      },
      (error) => {
        console.error('Meta API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response logging
    this.axios.interceptors.response.use(
      (response) => {
        console.log('Meta API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data
        });
        return response;
      },
      (error) => {
        console.error('Meta API Response Error:', {
          status: error.response?.status,
          url: error.config?.url,
          error: error.response?.data
        });
        return Promise.reject(error);
      }
    );
  }
}