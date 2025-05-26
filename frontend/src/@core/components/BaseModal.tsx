import { cn } from "../../utils/utils";

type BaseModalProps = {
  isOpen: () => boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

export const BaseModal = ({
  isOpen,
  title,
  children,
  onClose,
  actions,
  size = "md",
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro con opacidad */}
      <div
        className="fixed inset-0 transition-opacity duration-200 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenido del modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={cn(
            "bg-white w-full rounded-xl shadow-lg p-6 transition-all duration-200 relative",
            sizeMap[size]
          )}
        >
          {/* Encabezado */}
          <div className="flex justify-between items-center p-4">
            <h3 className="text-2xl font-extrabold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Contenido */}
          <div className="p-4">{children}</div>

          {/* Acciones */}
          {actions && (
            <div className="flex justify-end space-x-2 p-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
