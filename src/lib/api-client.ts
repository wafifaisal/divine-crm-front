import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from './auth';

class ApiClient {
  private authClient: AxiosInstance;
  private crmClient: AxiosInstance;

  constructor() {
    this.authClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.crmClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_CRM_SERVICE_URL,
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Add auth token to requests
    const authInterceptor = (config: any) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    this.authClient.interceptors.request.use(authInterceptor);
    this.crmClient.interceptors.request.use(authInterceptor);

    // Handle 401 responses
    const responseInterceptor = (error: any) => {
      if (error.response?.status === 401) {
        removeToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    };

    this.authClient.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );
    this.crmClient.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );
  }

  // Auth Service Methods
  async login(username: string, password: string) {
    return this.authClient.post('/api/auth/login', { username, password });
  }

  async register(data: any) {
    return this.authClient.post('/api/auth/register', data);
  }

  async logout() {
    return this.authClient.post('/api/auth/logout');
  }

  async refreshToken() {
    return this.authClient.post('/api/auth/refresh');
  }

  async getProfile() {
    return this.authClient.get('/api/auth/profile');
  }

  // CRM Service Methods
  // Contacts/Leads
  async getContacts(params?: any) {
    return this.crmClient.get('/api/contacts', { params });
  }

  async getContact(id: string) {
    return this.crmClient.get(`/api/contacts/${id}`);
  }

  async createContact(data: any) {
    return this.crmClient.post('/api/contacts', data);
  }

  async updateContact(id: string, data: any) {
    return this.crmClient.put(`/api/contacts/${id}`, data);
  }

  async deleteContact(id: string) {
    return this.crmClient.delete(`/api/contacts/${id}`);
  }

  // Products
  async getProducts(params?: any) {
    return this.crmClient.get('/api/products', { params });
  }

  async getProduct(id: string) {
    return this.crmClient.get(`/api/products/${id}`);
  }

  async createProduct(data: any) {
    return this.crmClient.post('/api/products', data);
  }

  async updateProduct(id: string, data: any) {
    return this.crmClient.put(`/api/products/${id}`, data);
  }

  async deleteProduct(id: string) {
    return this.crmClient.delete(`/api/products/${id}`);
  }

  // Chat Labels
  async getChatLabels() {
    return this.crmClient.get('/api/chat-labels');
  }

  async createChatLabel(data: any) {
    return this.crmClient.post('/api/chat-labels', data);
  }

  async updateChatLabel(id: string, data: any) {
    return this.crmClient.put(`/api/chat-labels/${id}`, data);
  }

  async deleteChatLabel(id: string) {
    return this.crmClient.delete(`/api/chat-labels/${id}`);
  }

  // AI Configuration
  async getAIConfigurations() {
    return this.crmClient.get('/api/ai-configurations');
  }

  async createAIConfiguration(data: any) {
    return this.crmClient.post('/api/ai-configurations', data);
  }

  async updateAIConfiguration(id: string, data: any) {
    return this.crmClient.put(`/api/ai-configurations/${id}`, data);
  }

  async deleteAIConfiguration(id: string) {
    return this.crmClient.delete(`/api/ai-configurations/${id}`);
  }

  // Connected Platforms
  async getConnectedPlatforms() {
    return this.crmClient.get('/api/connected-platforms');
  }

  async createConnectedPlatform(data: any) {
    return this.crmClient.post('/api/connected-platforms', data);
  }

  async updateConnectedPlatform(id: string, data: any) {
    return this.crmClient.put(`/api/connected-platforms/${id}`, data);
  }

  async deleteConnectedPlatform(id: string) {
    return this.crmClient.delete(`/api/connected-platforms/${id}`);
  }

  // AI Agents
  async getAIAgents() {
    return this.crmClient.get('/api/ai-agents');
  }

  async createAIAgent(data: any) {
    return this.crmClient.post('/api/ai-agents', data);
  }

  async updateAIAgent(id: string, data: any) {
    return this.crmClient.put(`/api/ai-agents/${id}`, data);
  }

  async deleteAIAgent(id: string) {
    return this.crmClient.delete(`/api/ai-agents/${id}`);
  }

  // Human Agents
  async getHumanAgents() {
    return this.crmClient.get('/api/human-agents');
  }

  async createHumanAgent(data: any) {
    return this.crmClient.post('/api/human-agents', data);
  }

  async updateHumanAgent(id: string, data: any) {
    return this.crmClient.put(`/api/human-agents/${id}`, data);
  }

  async revokeHumanAgent(id: string) {
    return this.crmClient.post(`/api/human-agents/${id}/revoke`);
  }

  async resetHumanAgentPassword(id: string) {
    return this.crmClient.post(`/api/human-agents/${id}/reset-password`);
  }

  // Chats
  async getChats(params?: any) {
    return this.crmClient.get('/api/chats', { params });
  }

  async getChat(id: string) {
    return this.crmClient.get(`/api/chats/${id}`);
  }

  async sendMessage(chatId: string, message: string) {
    return this.crmClient.post(`/api/chats/${chatId}/messages`, { message });
  }

  async assignChat(chatId: string, agentId: string) {
    return this.crmClient.post(`/api/chats/${chatId}/assign`, { agentId });
  }

  async takeOverChat(chatId: string) {
    return this.crmClient.post(`/api/chats/${chatId}/takeover`);
  }

  async resolveChat(chatId: string) {
    return this.crmClient.post(`/api/chats/${chatId}/resolve`);
  }

  async returnChatToAI(chatId: string) {
    return this.crmClient.post(`/api/chats/${chatId}/return-to-ai`);
  }

  // Analytics
  async getAnalytics(params?: any) {
    return this.crmClient.get('/api/analytics', { params });
  }

  // Broadcast
  async getBroadcastTemplates() {
    return this.crmClient.get('/api/broadcast-templates');
  }

  async createBroadcast(data: any) {
    return this.crmClient.post('/api/broadcasts', data);
  }

  // Quick Reply
  async getQuickReplies() {
    return this.crmClient.get('/api/quick-replies');
  }

  async createQuickReply(data: any) {
    return this.crmClient.post('/api/quick-replies', data);
  }
}

export const apiClient = new ApiClient();
