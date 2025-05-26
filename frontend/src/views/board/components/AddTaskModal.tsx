import { BaseModal } from '../../../@core/components/BaseModal';
import { CustomUserSelect } from '../../../@core/components/CustomUserSelect';
import {
  ModalIdentifiers,
  type ModalIdentifier,
} from '../../../hooks/useModal';
import { useGetAllUsers } from '../../../hooks/users/useGetAllUsers';
import type { TaskDto } from '../../../services/tasks/dto/task.dto';
import { Controller, useForm } from 'react-hook-form';

type AddProductModalProps = {
  isOpen: (id: ModalIdentifier) => boolean;
  onClose: (id: ModalIdentifier) => void;
  modalIdentifier: ModalIdentifier;
  initialData?: TaskDto | null;
  onSubmit?: (data: TaskDto) => void;
};

export const AddTaskModal = ({
  isOpen,
  onClose,
  modalIdentifier,
  initialData = null,
  onSubmit,
}: AddProductModalProps) => {
  const { users } = useGetAllUsers();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskDto>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      userId: initialData?.userId || undefined,
      status: initialData?.status || 'pendiente',
    }
  });

  const submit = (data: TaskDto) => {
    if (onSubmit) {
      onSubmit(data);
      reset();
      onClose(modalIdentifier);
    }
  };

  return (
    <BaseModal
      title={`${modalIdentifier === ModalIdentifiers.addTask ? 'Agregar Tarea' : 'Editar Tarea'}`}
      isOpen={() => isOpen(modalIdentifier)}
      onClose={() => onClose(modalIdentifier)}
      size="lg"
      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <div className="space-y-6">
        <form onSubmit={handleSubmit(submit)} className="space-y-6" key={initialData?.id ?? 'new'}>
          {/* Título */}
          <div className="space-y-2">
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-gray-600"
            >
              Título
            </label>
            <input
              {...register('title', { required: 'El título es obligatorio' })}
              type="text"
              id="taskTitle"
              className="w-full bg-transparent border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              placeholder="Ej. Crear API con json-server"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-600"
            >
              Descripción
            </label>
            <textarea
              {...register('description', {
                required: 'La descripción es obligatoria',
              })}
              id="taskDescription"
              rows={4}
              className="w-full bg-transparent border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition resize-none"
              placeholder="Explica brevemente qué debe hacer esta tarea"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Usuario */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Asignar a
            </label>
            <Controller
              control={control}
              name="userId"
              rules={{ required: 'Debe asignar la tarea a un usuario' }}
              render={({ field: { onChange, value } }) => (
                <CustomUserSelect
                  users={users}
                  selectedUserId={value}
                  onSelect={(userId) => onChange(userId)}
                />
              )}
            />
            {errors.userId && (
              <p className="text-red-500 text-xs">
                {errors.userId.message}
              </p>
            )}
          </div>

          {/* Nota de estado */}
          {modalIdentifier === ModalIdentifiers.addTask && (
            <p className="text-xs text-gray-400">
              Esta tarea se creará con estado{' '}
              <span className="text-blue-600 font-medium">pendiente</span>.
            </p>
          )}

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => onClose(modalIdentifier)}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
