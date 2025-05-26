import React from "react";
import type { TaskDto } from "../../../../services/tasks/dto/task.dto";

export interface BoardContextProps {
  tasks: TaskDto[];
  updateTask: (taskId: string, task: TaskDto) => void;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  createTask: (task: TaskDto) => void;
  deleteTask: (taskId: string) => void;
  loading: boolean;
}

export const BoardContext = React.createContext<BoardContextProps>({} as BoardContextProps);
