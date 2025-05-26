export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: string; // e.g., 'pending', 'in-progress', 'completed'
  userId: number; // User ID of the person assigned to the task
}

export const AVAILABLE_TASK_STATUSES = [
  'pendiente',
  'en progreso',
  'completado',
]

