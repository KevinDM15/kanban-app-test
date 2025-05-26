import { useEffect, useState } from "react";
import type { TaskDto } from "../../../../services/tasks/dto/task.dto";
import { tasksService } from "../../../../services/tasks/tasks.service";

export const useGetAllTasks = () => {
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

  return { tasks, loading };
}
