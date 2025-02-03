import { useState, useEffect } from "react";
import TaskList from "../taskList/taskList";
import { Task } from "../../../services/interfaces";
import { showAlert } from '../../../utils/alertUtils';

const ToDoForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks1");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks1", JSON.stringify(tasks));
  }, [tasks]);

  // Función para agregar una tarea
  const handleAddTask = () => {
    if (!taskName.trim() || tasks.some((task) => task.name === taskName)){
      showAlert("info","No se pueden agregar tareas con el mismo nombre de una ya existente");
      setTaskName("")
      setTaskDescription("")
      return;
    };

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      description: taskDescription,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask].sort((a, b) => a.name.localeCompare(b.name)));
    setTaskName("");
    setTaskDescription("");
  };

  // Función para editar una tarea
  const handleEditTask = (id: string, updatedName: string, updatedDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: updatedName, description: updatedDescription } : task
    );
    setTasks(updatedTasks);
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Función para marcar/desmarcar una tarea como completada
  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Función para manejar la tecla "Enter" en el campo de descripción
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask(); // Agregar la tarea al presionar Enter
    }
  };

  const handleTrimTaskName = () => {
    setTaskName(taskName.trim()); // Elimina espacios en blanco al principio y al final
  };

  // Filtrar las tareas según la opción seleccionada
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed; // Mostrar solo tareas completadas
    } else if (filter === "active") {
      return !task.completed; // Mostrar solo tareas activas
    } else {
      return true; // Mostrar todas las tareas
    }
  });

  return (
    <div className="flex flex-col space-y-4 items-center p-4">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Lista de Tareas</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Agregar Tarea</h2>
      {/* Entrada para el nombre de la tarea */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full max-w-md">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onBlur={handleTrimTaskName}
          placeholder="Nombre de la tarea"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Descripción de la tarea"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        <button
          onClick={handleAddTask}
          disabled={!taskName.trim()}
          className={`px-4 py-2 rounded-full text-white font-medium w-full md:w-auto ${
            !taskName.trim()
              ? "bg-gray-400 cursor-not-allowed border-gray-300 hover:bg-gray-500"
              : "bg-[#10B981] hover:bg-[#059669] border-[#059669]"
          }`}
        >
          Agregar
        </button>
      </div>

      {/* Selector de filtro */}
      <div className="mt-4 w-full max-w-md">
        <label htmlFor="filter" className="mr-2 text-gray-700">
          Mostrar:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "active")
          }
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="active">Activas</option>
        </select>
      </div>

      {/* Lista de tareas */}
      <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} onToggleComplete={handleToggleComplete} />
    </div>
  );
};

export default ToDoForm;