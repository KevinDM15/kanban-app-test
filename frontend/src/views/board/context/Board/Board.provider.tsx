import React, { useEffect, useState } from "react";
import { BoardContext } from "./Board.context";
import type { TaskDto } from "../../../../services/tasks/dto/task.dto";
import { tasksService } from "../../../../services/tasks/tasks.service";

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await tasksService.getTasks();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;
    const updatedTask = { ...task, status: newStatus };
    updateTask(taskId, updatedTask);
  }

  const updateTask = async (taskId: string, task: TaskDto) => {
    const existingTask = tasks.find((t) => t.id === taskId);
    if (!existingTask) return;

    // Reemplazar el task del estado con el nuevo status
    const updatedTask = { ...existingTask, ...task };

    try {
      const response = await tasksService.updateTask(taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? response : t))
      );

      console.log("Task updated successfully:", response);
    } catch (error) {
      console.error("Error updating task:", error);
      // Si hay un error, revertir el cambio en el estado
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? existingTask : t))
      );
    }

  };

  const createTask = async (task: TaskDto) => {
    // Aquí iría la lógica para crear una nueva tarea
    try {
      const newTask = await tasksService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log("Task created successfully:", newTask);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    // Aquí iría la lógica para eliminar una tarea
    try {
      await tasksService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log(`Task ${taskId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        tasks,
        updateTask,
        updateTaskStatus,
        createTask,
        deleteTask,
        loading,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
