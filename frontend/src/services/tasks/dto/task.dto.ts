import type { UserDto } from "../../users/dto/user.dto";

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  status: string; // e.g., 'pending', 'in-progress', 'completed'
  user_id: number;
  user: UserDto;
}

export const AVAILABLE_TASK_STATUSES = [
  'pendiente',
  'en progreso',
  'completado',
]

