import { useState } from "react";

export type ModalIdentifier = "addTask" | "editTask" | "deleteTask";

export const ModalIdentifiers = {
  addTask: "addTask",
  editTask: "editTask",
  deleteTask: "deleteTask",
} as const

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<Set<ModalIdentifier>>(new Set());

  const isModalOpen = (id: ModalIdentifier) => isOpen.has(id);

  const openModal = (id: ModalIdentifier) => {
    setIsOpen(prev => new Set([...prev, id]));
  };

  const closeModal = (id: ModalIdentifier) => {
    setIsOpen((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return {
    isModalOpen,
    isOpen,
    openModal,
    closeModal,
  };
};
