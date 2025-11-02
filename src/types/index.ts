// User & Auth Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'agent' | 'supervisor';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Contact & Lead Types
export interface Contact {
  id: string;
  code: string;
  channel: 'Telegram' | 'Whatsapp' | 'Instagram Msg';
  channelId: string;
  name: string;
  contactStatus: 'Leads' | 'Contact';
  temperature: 'Cold' | 'Warm' | 'Hot';
  firstContact: string;
  lastContact: string;
  lastAgent: string;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  stock: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

// Chat Types
export interface ChatLabel {
  id: string;
  description: string;
  color: string;
}

export interface Chat {
  id: string;
  contactId: string;
  contact?: Contact;
  status: 'Unassigned' | 'Pending' | 'Assigned' | 'Resolved';
  assignedTo?: string;
  assignedAgent?: User;
  channel: string;
  lastMessage: string;
  lastMessageAt: string;
  labels?: ChatLabel[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderType: 'customer' | 'ai' | 'human';
  content: string;
  createdAt: string;
}

// AI Configuration Types
export interface AIConfiguration {
  id: string;
  aiEngine: 'Open AI' | 'Deepseek' | 'Grok xAI' | 'Gemini';
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIAgent {
  id: string;
  name: string;
  aiEngine: string;
  basicPrompt: string;
  createdAt: string;
  updatedAt: string;
}

// Platform Types
export interface ConnectedPlatform {
  id: string;
  platform: 'Whatsapp' | 'Telegram' | 'Instagram';
  platformId: string;
  accessToken: string;
  clientId: string;
  clientSecret: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Service Package Types
export type ServiceType = 'DIVINE_CRM' | 'DIVINE_WMS' | 'DIVINE_HRIS' | 'DIVINE_SCM' | 'DIVINE_MANU' | 'DIVINE_FM' | 'DIVINE_PM';
export type PackageType = 'DIVINE_STARTUP' | 'DIVINE_FACTORY' | 'DIVINE_ENTERPRISE';

export interface ServicePackage {
  type: PackageType;
  services: ServiceType[];
  description: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
