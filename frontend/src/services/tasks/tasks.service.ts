import { ApiGateway } from '../../config/ApiGateway';
import type { TaskDto } from './dto/task.dto';

class TasksService {
  async getTasks(): Promise<TaskDto[]> {
    try {
      const response = await ApiGateway.get<TaskDto[]>('/tasks?_expand=user');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(task: TaskDto): Promise<TaskDto> {
    try {
      const response = await ApiGateway.post<TaskDto>('/tasks', {
        title: task.title,
        description: task.description,
        user_id: Number(task.user_id),
        status: task.status || 'pendiente',
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(taskId: number, task: TaskDto): Promise<TaskDto> {
    try {
      const response = await ApiGateway.put<TaskDto>(`/tasks/${taskId}`, task);

      return response.data;
    } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      throw error;
    }
  }

  async deleteTask(taskId: number): Promise<void> {
    try {
      await ApiGateway.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      throw error;
    }
  }
}

export const tasksService = new TasksService();
