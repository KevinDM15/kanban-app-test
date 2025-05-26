import React from "react";
import type { TaskDto } from "../../../../services/tasks/dto/task.dto";

export interface BoardContextProps {
  tasks: TaskDto[];
  updateTask: (taskId: number, task: TaskDto) => void;
  updateTaskStatus: (taskId: number, newStatus: string) => void;
  createTask: (task: TaskDto) => void;
  deleteTask: (taskId: number) => void;
  loading: boolean;
}

export const BoardContext = React.createContext<BoardContextProps>({} as BoardContextProps);
