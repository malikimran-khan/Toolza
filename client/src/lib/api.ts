import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('toolza_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('toolza_token');
    }
    return Promise.reject(error);
  }
);

// ─── Link API ─────────────────────────────────────────────

export interface Link {
  _id: string;
  subdomain: string;
  originalUrl: string;
  clickCount: number;
  isActive: boolean;
  expiresAt: string | null;
  generatedUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export const linkApi = {
  create: async (subdomain: string, originalUrl: string): Promise<ApiResponse<Link>> => {
    const { data } = await api.post('/links', { subdomain, originalUrl });
    return data;
  },

  getAll: async (): Promise<ApiResponse<Link[]>> => {
    const { data } = await api.get('/links');
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Link>> => {
    const { data } = await api.get(`/links/${id}`);
    return data;
  },

  getStats: async (id: string): Promise<ApiResponse<{ subdomain: string; clickCount: number; createdAt: string }>> => {
    const { data } = await api.get(`/links/${id}/stats`);
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete(`/links/${id}`);
    return data;
  },
};

// ─── Auth API ─────────────────────────────────────────────

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export const authApi = {
  register: async (name: string, email: string, password: string): Promise<ApiResponse<AuthUser>> => {
    const { data } = await api.post('/auth/register', { name, email, password });
    if (data.data.token) {
      localStorage.setItem('toolza_token', data.data.token);
    }
    return data;
  },

  login: async (email: string, password: string): Promise<ApiResponse<AuthUser>> => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.data.token) {
      localStorage.setItem('toolza_token', data.data.token);
    }
    return data;
  },

  googleLogin: async (idToken: string): Promise<ApiResponse<AuthUser>> => {
    const { data } = await api.post('/auth/google-login', { idToken });
    if (data.data.token) {
      localStorage.setItem('toolza_token', data.data.token);
    }
    return data;
  },

  getMe: async (): Promise<ApiResponse<Omit<AuthUser, 'token'>>> => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout: () => {
    localStorage.removeItem('toolza_token');
  },
};

export default api;
