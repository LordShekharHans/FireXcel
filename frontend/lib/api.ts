import axios from 'axios';
import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, ROLE_IDS } from '@/types/api';
import { Application } from '@/types/application';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const roles = [ROLE_IDS.SUPERADMIN, ROLE_IDS.ADMIN, ROLE_IDS.INSPECTOR, ROLE_IDS.APPLICANT];
    
    let lastError;
    for (const role of roles) {
      try {
        const response = await api.post('/auth/login', { ...data, role });
        return response.data;
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    
    throw lastError;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  setAuthToken: (token: string) => {
    if (typeof window !== 'undefined') {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('auth_token', token);
    }
  },

  clearAuthToken: () => {
    if (typeof window !== 'undefined') {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('auth_token');
    }
  },

  initializeToken: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  },
};

export const applicationApi = {
  getAllApplications: async (): Promise<Application[]> => {
    const response = await api.get('/application/all');
    return response.data.applications;
  },

  updateApplicationStatus: async (id: number, applicationStatusId: number): Promise<Application> => {
    const response = await api.patch(`/application/${id}/status`, { applicationStatusId });
    return response.data;
  },

  updateStatus: async (applicationId: string, status: number): Promise<void> => {
    await api.patch(`/application/${applicationId}`, { status });
  },
};

// Initialize token on client-side only
if (typeof window !== 'undefined') {
  authApi.initializeToken();
}