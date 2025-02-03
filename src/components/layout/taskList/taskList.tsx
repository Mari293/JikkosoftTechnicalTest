import React from "react";
import Item from "../item/toDoItem";
import { TaskListProps} from "../../../services/interfaces";



const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onEditTask, onToggleComplete }) => {
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
                <Item id={task.id} name={task.name} description={task.description} completed={task.completed} onDelete={onDeleteTask} onEdit={onEditTask} onToggleComplete={onToggleComplete}/>
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

export default TaskList;