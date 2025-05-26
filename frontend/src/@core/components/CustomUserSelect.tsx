import { useState, useRef, useEffect } from 'react';
import type { UserDto } from '../../services/users/dto/user.dto';

type CustomSelectProps = {
  users: UserDto[];
  selectedUserId?: number;
  onSelect: (userId: number) => void;
};

export const CustomUserSelect = ({ users, selectedUserId, onSelect }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 200);
  };

  return (
    <div ref={dropdownRef} className="relative mb-4">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(!open)
        }}
        className="w-full cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left flex items-center justify-between focus:outline-none"
      >
        {selectedUser ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedUser.avatarUrl}
              alt={selectedUser.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-gray-700">{selectedUser.name}</span>
          </div>
        ) : (
          <span className="text-gray-400">Seleccionar usuario</span>
        )}
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className={`absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(user.id);
                  closeDropdown();
                }}
                className="w-full cursor-pointer px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-left"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-gray-700">{user.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
