'use client';

import { create } from 'zustand';
import { Column, Task, Id, Priority, Label, User, Status } from '@/types/types';
import { arrayMove } from '@dnd-kit/sortable';
import { applicationApi } from '@/lib/api';
import { Application } from '@/types/application';

interface BoardState {
  columns: Column[];
  tasks: Task[];
  labels: Label[];
  users: User[];
  activeColumn: Column | null;
  activeTask: Task | null;
  isLoading: boolean;
  error: string | null;
  
  fetchApplications: () => Promise<void>;
  convertApplicationToTask: (application: Application) => Task;
  moveTask: (taskId: Id, toColumnId: Id) => void;
  setActiveTask: (task: Task | null) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultColumns: Column[] = [
  { id: '1', title: 'Pending/Submitted', status: 'todo' },
  { id: '2', title: 'Under Review', status: 'in-progress' },
  { id: '3', title: 'Stage 1 Approved', status: 'review' },
  { id: '4', title: 'FSC Applied', status: 'in-progress' },
  { id: '5', title: 'Inspection', status: 'review' },
  { id: '6', title: 'Inspection Completed', status: 'review' },
  { id: '7', title: 'Approved', status: 'done' },
  { id: '8', title: 'Rejected', status: 'done' },
];

const getColumnIdByStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
    case 'SUBMITTED':
      return '1';
    case 'UNDER REVIEW':
      return '2';
    case 'STAGE 1 APPROVED':
      return '3';
    case 'FSC APPLIED':
      return '4';
    case 'INSPECTION SCHEDULED':
      return '5';
    case 'INSPECTION COMPLETED':
      return '6';
    case 'NOC APPROVED':
      return '7';
    case 'NOC REJECTED':
      return '8';
    default:
      return '1';
  }
};

const getPriorityByStatus = (status: string): Priority => {
  switch (status) {
    case 'PENDING':
    case 'SUBMITTED':
      return 'low';
    case 'UNDER REVIEW':
    case 'STAGE 1 APPROVED':
      return 'medium';
    case 'FSC APPLIED':
    case 'INSPECTION SCHEDULED':
      return 'high';
    case 'INSPECTION COMPLETED':
    case 'NOC APPROVED':
    case 'NOC REJECTED':
      return 'urgent';
    default:
      return 'medium';
  }
};

export const useBoardStore = create<BoardState>()((set, get) => ({
  columns: defaultColumns,
  tasks: [],
  labels: [],
  users: [],
  activeColumn: null,
  activeTask: null,
  isLoading: false,
  error: null,

  convertApplicationToTask: (application: Application): Task => ({
    id: application.applicationId.toString(),
    columnId: getColumnIdByStatus(application.application_status.code),
    title: `Application #${application.applicationId}`,
    description: `Applicant: ${application.user.name}\nEmail: ${application.user.email}\nStatus: ${application.application_status.code}`,
    priority: getPriorityByStatus(application.application_status.code),
    status: 'todo',
    labels: [],
    createdAt: new Date(application.createdAt),
    updatedAt: new Date(application.updatedAt),
  }),

  fetchApplications: async () => {
    set({ isLoading: true });
    try {
      const applications = await applicationApi.getAllApplications();
      const tasks = applications.map(get().convertApplicationToTask);
      set({ tasks, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch applications' });
    } finally {
      set({ isLoading: false });
    }
  },

  moveTask: (taskId, toColumnId) => set((state) => {
    const column = state.columns.find(col => col.id === toColumnId);
    if (!column) return state;

    return {
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, columnId: toColumnId, status: column.status, updatedAt: new Date() }
          : task
      ),
    };
  }),

  setActiveTask: (task) => set({ activeTask: task }),
}));