import axios from 'axios';
import { Admin, Inspector } from '@/types/admin';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const adminApi = {
  getAllAdmins: async (): Promise<Admin[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/superadmin/all-admins`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
    return response.data;
  },

  getInspectorsForAdmin: async (adminId: number): Promise<Inspector[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/superadmin/inspectorsviaadmin/${adminId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
    return response.data;
  },

  getUnassignedInspectors: async (): Promise<Inspector[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/superadmin/inspectorswithoutadmin`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
    return response.data;
  },

  assignInspector: async (inspectorId: number, adminId: number): Promise<void> => {
    await axios.patch(
      `${API_BASE_URL}/superadmin/assign-inspector/${inspectorId}`,
      { assignedAdminId: adminId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
  },

  unassignInspector: async (inspectorId: number): Promise<void> => {
    await axios.patch(
      `${API_BASE_URL}/superadmin/unassign-inspector/${inspectorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
  },
};