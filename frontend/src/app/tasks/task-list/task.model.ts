// src/app/tasks/task.model.ts
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId?: number;
}