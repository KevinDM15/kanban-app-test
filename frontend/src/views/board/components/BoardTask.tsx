import { Icon } from "@iconify/react/dist/iconify.js";
import { AVAILABLE_TASK_STATUSES, type TaskDto } from "../../../services/tasks/dto/task.dto";
import { cn } from "../../../utils/utils";
import { StatusDropdown } from "./StatusDropdown";
import { ModalIdentifiers, useModal } from "../../../hooks/useModal";
import { DeleteProductModal } from "./DeleteTaskModal";
import type { UserDto } from "../../../services/users/dto/user.dto";

type BoardTaskProps = {
  task: TaskDto;
  users: UserDto[]
  onClick?: () => void;
  onChangeStatus?: (taskId: number, newStatus: string) => void;
  onDelete?: (taskId: number) => void;
};

export const BoardTask = ({ task, onClick, onChangeStatus, onDelete, users }: BoardTaskProps) => {
  const { id, title, description, status, user_id } = task;
  const assignedUser = users.find((u) => String(u.id) === String(user_id));
  const { isModalOpen, closeModal, openModal } = useModal();

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
    <>
      {isModalOpen(ModalIdentifiers.deleteTask) && onDelete && (
        <DeleteProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDeleteTask={onDelete}
          modalIdentifier={ModalIdentifiers.deleteTask}
          id={id}
        />
      )}

      <li
        key={id}
        className={cn(`border-2 border-t-0 border-white rounded-lg mb-2 hover:cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-gray-300 `)}
        {...onClick ? { onClick } : {}}
      >
        <div className={cn(`bg-white p-4 rounded-lg shadow-sm rounded-t-none border-t-6 ${getColorByStatus(status)}`)}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{title}</h3>
            {assignedUser && (
              <img
                src={assignedUser.avatarUrl}
                alt={assignedUser.name}
                title={assignedUser.name}
                className="rounded-full w-7 h-7 object-cover"
              />
            )}
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

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(ModalIdentifiers.deleteTask);
                }}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </li>
    </>
  );
};
