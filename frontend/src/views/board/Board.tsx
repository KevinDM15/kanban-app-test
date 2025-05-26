import { ModalIdentifiers, useModal } from '../../hooks/useModal';
import { AddTaskModal, BoardColumn, BoardTask } from './components';
import { Icon } from '@iconify/react';
import { useBoardContext } from './hooks/tasks/useBoardContext';
import { useState } from 'react';
import type { TaskDto } from '../../services/tasks/dto/task.dto';

export const Board = () => {
  const { tasks, loading, updateTask, createTask, updateTaskStatus } = useBoardContext();
  const { isModalOpen, closeModal, openModal } = useModal();
  const [taskSelected, setTaskSelected] = useState<TaskDto | null>(null);


  const columns = [
    {
      title: 'Pendiente',
      color: 'bg-blue-300',
      status: 'pendiente',
    },
    {
      title: 'En Progreso',
      color: 'bg-yellow-200',
      status: 'en progreso',
    },
    {
      title: 'Completado',
      color: 'bg-green-200',
      status: 'completado',
    },
  ];

  const updateTaskFromModal = (task: TaskDto) => {
    if (!taskSelected) return;

    const updatedTask = { ...taskSelected, ...task };
    updateTask(taskSelected.id, updatedTask);
  }

  const totalTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const filterByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleEditTask = (task: TaskDto) => {
    setTaskSelected(task);
    openModal(ModalIdentifiers.editTask);
  };

  return (
    <div className="w-full max-w-9/12 mx-auto py-20">
      {isModalOpen(ModalIdentifiers.addTask) && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalIdentifier={ModalIdentifiers.addTask}
          onSubmit={createTask}
        />
      )}

      {isModalOpen(ModalIdentifiers.editTask) && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalIdentifier={ModalIdentifiers.editTask}
          initialData={taskSelected}
          onSubmit={updateTaskFromModal}
        />
      )}

      <h1 className="font-extrabold text-5xl mb-4">Personal</h1>
      <p className="mb-10 text-gray-500 text-xl">
        A board to keep track of personal tasks.
      </p>

      <div className="rounded-lg p-10 bg-gray-100 max-h-full shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 text-center">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : (
            <>
              {columns.map(({ title, status, color }) => (
                <BoardColumn
                  key={status}
                  title={title}
                  color={color}
                  actions={
                    status === 'pendiente' && (
                      <button
                        className="cursor-pointer px-1 py-1 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        onClick={() => openModal(ModalIdentifiers.addTask)}
                      >
                        <Icon icon="material-symbols:add-rounded" width={25} />
                      </button>
                    )
                  }
                  total={totalTasksByStatus(status)}
                >
                  {filterByStatus(status).map((task) => (
                    <BoardTask
                      key={task.id}
                      task={task}
                      onChangeStatus={updateTaskStatus}
                      onClick={() => handleEditTask(task)}
                    />
                  ))}
                </BoardColumn>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
