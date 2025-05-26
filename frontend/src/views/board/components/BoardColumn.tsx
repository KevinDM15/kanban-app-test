import { cn } from "../../../utils/utils";

type BoardColumnProps = {
  title: string;
  color?: string;
  total: number;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export const BoardColumn = ({ title, children, color = 'bg-gray-300', actions, total }: BoardColumnProps) => {
  return (
    <div className="rounded-lg hover">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-xl min-h-vw">
            <span className={cn(`${color} px-5 py-1 rounded-lg font-bold text-lg flex`)}>
              {title}
            </span>
          </h2>
          <p className="text-gray-500 text-md">{total}</p>
        </div>

        {actions && actions}
      </div>

      <div className="border-b-2 border-white mb-4"></div>

      <ul>{children}</ul>
    </div>
  )
}
