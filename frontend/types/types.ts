export type Id = string;

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Status = 'todo' | 'in-progress' | 'review' | 'done';

export type Label = {
  id: Id;
  name: string;
  color: string;
};

export type User = {
  id: Id;
  name: string;
  avatar: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee?: User;
  dueDate?: Date;
  labels: Label[];
  createdAt: Date;
  updatedAt: Date;
};

export type Column = {
  id: Id;
  title: string;
  status: Status;
};