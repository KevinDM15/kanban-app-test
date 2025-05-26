import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

type StatusDropdownProps = {
  currentStatus: string;
  statuses: string[];
  onChange: (newStatus: string) => void;
};

export const StatusDropdown = ({ currentStatus, statuses, onChange }: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="cursor-pointer inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <span className="capitalize">{currentStatus}</span>
        <Icon icon="mdi:chevron-down" className="ml-1" />
      </button>

      {open && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white z-50 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  onChange(status);
                  setOpen(false);
                }}
                className={`${
                  status === currentStatus ? 'bg-gray-100 font-semibold' : ''
                } block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 capitalize`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
