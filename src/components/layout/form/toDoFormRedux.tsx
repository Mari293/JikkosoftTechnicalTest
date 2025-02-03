import { useState } from "react";
import TaskListRedux from "../taskList/taskListRedux";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../services/tasksSlice";
import { RootState } from "../../../services/store";

const ToDoFormRedux = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleAddTask = () => {
    dispatch(addTask({ name: taskName, description: taskDescription }));
    setTaskName("");
    setTaskDescription("");
  };

  // Filtrar las tareas según la opción seleccionada
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    } else {
      return true;
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
          placeholder="Nombre de la tarea"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
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

      {/* Lista de tareas filtradas */}
      <TaskListRedux tasks={filteredTasks} />
    </div>
  );
};

export default ToDoFormRedux;