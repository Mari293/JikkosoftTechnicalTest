import React from "react";
import ItemRedux from "../item/toDoItemRedux";
import { Task } from "../../../services/interfaces"; 

interface TaskListProps {
  tasks: Task[];
}

const TaskListRedux: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="flex flex-col items-center ">
      {/* Lista de elementos */}
      <div className="w-full md:max-w-xl lg:max-w-2xl p-4">
        <ul className="space-y-2">
          {tasks.length ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 rounded-md text-gray-800"
              >
                {/* Usar el componente Item para renderizar cada tarea */}
                <ItemRedux key={task.id} task={task} />
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No hay tareas pendientes</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskListRedux;