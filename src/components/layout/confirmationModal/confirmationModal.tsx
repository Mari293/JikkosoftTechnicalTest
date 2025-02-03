import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">¿Estás seguro de completar esta tarea?</h2>
        <p className="text-sm text-gray-600 text-center">Si aceptas, esta tarea no se podrá volver a activar.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;