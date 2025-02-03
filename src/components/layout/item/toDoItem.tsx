import { useState } from "react";
import { ItemProps } from "../../../services/interfaces";
import ConfirmationModal from "../confirmationModal/confirmationModal";

const Item: React.FC<ItemProps> = ({ id, name, description, completed, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la modal
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false); // Estado para deshabilitar el checkbox

  const handleSave = () => {
    onEdit(id, editedName, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    if (!completed) {
      setIsModalOpen(true); // Abrir la modal si la tarea no está completada
    }
  };

  const handleConfirm = () => {
    onToggleComplete(id); // Marcar la tarea como completada
    setIsCheckboxDisabled(true); // Deshabilitar el checkbox
    setIsModalOpen(false); // Cerrar la modal
  };

  const handleCancelModal = () => {
    setIsModalOpen(false); // Cerrar la modal sin hacer cambios
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md gap-8 w-full sm:w-96 h-27 overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        {/* Checkbox para marcar como completada */}
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          disabled={isCheckboxDisabled || completed}
          className={`w-4 h-4 rounded border-2 border-[#10B981] bg-white checked:bg-[#10B981] checked:border-[#10B981] focus:ring-0 transition-colors ${isCheckboxDisabled || completed ? "cursor-not-allowed" : ""}`}
        />

        {/* Contenido principal (nombre y descripción) */}
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          {isEditing && !completed ? (
            // Campos editables
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full mt-2"
              />
            </>
          ) : (
            // Vista normal
            <>
              <h3 className={`font-medium text-gray-800 ${completed ? "line-through text-gray-400" : ""} break-words whitespace-normal`}>{name}</h3>
              <p className={`text-sm text-gray-600 ${completed ? "line-through text-gray-400" : ""} break-words whitespace-normal`}>{description}</p>
            </>
          )}
        </div>
      </div>

      {/* Botones de acciones (editar/guardar/cancelar y eliminar) */}
      <div className="flex space-x-2">
        {isEditing && !completed ? (
          // Botones en modo de edición (guardar y cancelar)
          <>
            <button
              onClick={handleSave}
              className="p-2 bg-[#10B981] text-white rounded-full hover:bg-[#059669] transition-colors duration-200 w-10 h-10 flex items-center justify-center"
            >
              <i className="pi pi-check"></i>
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-[#B81118] text-white rounded-full hover:bg-[#A20F15] transition-colors duration-200 w-10 h-10 flex items-center justify-center"
            >
              <i className="pi pi-times"></i>
            </button>
          </>
        ) : (
          // Botones en vista normal (editar y eliminar)
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={completed}
              className={`p-2 bg-[#01B4CB] text-white rounded-full hover:bg-[#00A3B8] transition-colors duration-200 w-10 h-10 flex items-center justify-center ${completed ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <i className="pi pi-pen-to-square"></i>
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 bg-[#B81118] text-white rounded-full hover:bg-[#A20F15] border-[#A20F15] transition-colors duration-200 w-10 h-10 flex items-center justify-center"
            >
              <i className="pi pi-trash"></i>
            </button>
          </>
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancelModal}
      />
    </div>
  );
};

export default Item;