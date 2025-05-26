import { AVAILABLE_TASK_STATUSES, type TaskDto } from "../../../services/tasks/dto/task.dto";
import { cn } from "../../../utils/utils";
import { StatusDropdown } from "./StatusDropdown";

type BoardTaskProps = {
  task: TaskDto;
  onClick?: () => void;
  onChangeStatus?: (taskId: string, newStatus: string) => void;
};

export const BoardTask = ({ task, onClick, onChangeStatus }: BoardTaskProps) => {
  const { id, title, description, status } = task;

  const handleStatusChange = (newStatus: string) => {
    if (onChangeStatus) {
      onChangeStatus(id, newStatus);
    }
  }

  const getColorByStatus = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'border-blue-200';
      case 'en progreso':
        return 'border-yellow-200';
      case 'completado':
        return 'border-green-200';
    }
  }

  return (
    <li
      key={id}
      className={cn(`border-2 border-t-0 border-white rounded-lg mb-2 hover:cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-gray-300 `)}
      {...onClick ? { onClick } : {}}
    >
      <div className={cn(`bg-white p-4 rounded-lg shadow-sm rounded-t-none border-t-6 ${getColorByStatus(status)}`)}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <img
            src="https://placehold.co/600x400/000000/png?text=A"
            alt="User"
            className="rounded-full w-7 h-7 mr-2 object-cover"
          />
        </div>

        <div className="flex">
          <p className="text-gray-600 max-w-lg">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          {onChangeStatus && (
            <div onClick={(e) => e.stopPropagation()}>
              <StatusDropdown
                currentStatus={status}
                statuses={AVAILABLE_TASK_STATUSES}
                onChange={handleStatusChange}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
