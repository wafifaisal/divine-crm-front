import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082';
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8081';

// Create axios instances
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient: AxiosInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Response interceptor
const responseInterceptor = {
  onFulfilled: (response: any) => response,
  onRejected: async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await authClient.post('/api/auth/refresh', {
          refreshToken,
        });

        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
};

apiClient.interceptors.request.use(requestInterceptor as any);
apiClient.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

authClient.interceptors.request.use(requestInterceptor as any);
authClient.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

// API Functions
export const api = {
  // Auth
  auth: {
    login: (data: any) => authClient.post('/api/auth/login', data),
    register: (data: any) => authClient.post('/api/auth/register', data),
    logout: () => authClient.post('/api/auth/logout'),
    profile: () => authClient.get('/api/auth/profile'),
    refresh: (refreshToken: string) =>
      authClient.post('/api/auth/refresh', { refreshToken }),
  },

  // Contacts
  contacts: {
    list: (params?: any) => apiClient.get('/api/contacts', { params }),
    get: (id: string) => apiClient.get(`/api/contacts/${id}`),
    create: (data: any) => apiClient.post('/api/contacts', data),
    update: (id: string, data: any) => apiClient.put(`/api/contacts/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/contacts/${id}`),
  },

  // Products
  products: {
    list: (params?: any) => apiClient.get('/api/products', { params }),
    get: (id: string) => apiClient.get(`/api/products/${id}`),
    create: (data: any) => apiClient.post('/api/products', data),
    update: (id: string, data: any) => apiClient.put(`/api/products/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/products/${id}`),
  },

  // Chat
  chats: {
    list: (params?: any) => apiClient.get('/api/chats', { params }),
    get: (id: string) => apiClient.get(`/api/chats/${id}`),
    takeover: (id: string) => apiClient.post(`/api/chats/${id}/takeover`),
    assign: (id: string, agentId: string) =>
      apiClient.post(`/api/chats/${id}/assign`, { agentId }),
    resolve: (id: string) => apiClient.post(`/api/chats/${id}/resolve`),
    messages: (chatId: string, params?: any) =>
      apiClient.get(`/api/chats/${chatId}/messages`, { params }),
    sendMessage: (chatId: string, data: any) =>
      apiClient.post(`/api/chats/${chatId}/messages`, data),
  },

  // AI Configuration
  aiConfigs: {
    list: () => apiClient.get('/api/ai-configs'),
    create: (data: any) => apiClient.post('/api/ai-configs', data),
    update: (id: string, data: any) => apiClient.put(`/api/ai-configs/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/ai-configs/${id}`),
  },

  // AI Agents
  aiAgents: {
    list: () => apiClient.get('/api/ai-agents'),
    create: (data: any) => apiClient.post('/api/ai-agents', data),
    update: (id: string, data: any) => apiClient.put(`/api/ai-agents/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/ai-agents/${id}`),
  },

  // Platforms
  platforms: {
    list: () => apiClient.get('/api/platforms'),
    create: (data: any) => apiClient.post('/api/platforms', data),
    update: (id: string, data: any) => apiClient.put(`/api/platforms/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/platforms/${id}`),
  },

  // Chat Labels
  labels: {
    list: () => apiClient.get('/api/labels'),
    create: (data: any) => apiClient.post('/api/labels', data),
    update: (id: string, data: any) => apiClient.put(`/api/labels/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/labels/${id}`),
  },
};

export default api;
