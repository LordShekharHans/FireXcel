'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ApplicationsState, Application } from '@/types/application';
import { applicationApi } from '@/lib/api';

export const useApplicationStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: [],
      isLoading: false,
      error: null,

      fetchApplications: async () => {
        set({ isLoading: true });
        try {
          const applications = await applicationApi.getAllApplications();
          set({ applications, error: null });
        } catch (error) {
          set({ error: 'Failed to fetch applications' });
        } finally {
          set({ isLoading: false });
        }
      },

      updateApplicationStatus: async (id: number, statusId: number) => {
        try {
          const updatedApplication = await applicationApi.updateApplicationStatus(id, statusId);
          set((state) => ({
            applications: state.applications.map((app) =>
              app.applicationId === id ? updatedApplication : app
            ),
          }));
        } catch (error) {
          set({ error: 'Failed to update application status' });
          throw error;
        }
      },
    }),
    {
      name: 'application-storage',
      partialize: (state) => ({ applications: state.applications }),
    }
  )
);