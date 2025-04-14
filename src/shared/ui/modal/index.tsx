import React from "react";
import { Form } from "../form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  defaultValues?: { name: string };
}

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded shadow-lg w-[400px]"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">
            {defaultValues ? "Edit Category" : "Create Category"}
          </h2>
          <button onClick={onClose}>X</button>
        </div>
        <Form onSubmit={onSubmit} defaultValues={defaultValues} />
      </div>
    </div>
  );
};
