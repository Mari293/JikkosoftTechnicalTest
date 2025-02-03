import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./interfaces"; 
import { showAlert } from "../utils/alertUtils";

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Agregar una tarea
    addTask: (state, action: PayloadAction<{ name: string; description: string }>) => {
      const { name, description } = action.payload;

      if (!name.trim() || state.some((task) => task.name === name)) { 
        showAlert("info","No se pueden agregar tareas con el mismo nombre de una ya existente");
        return;
      }

      const newTask: Task = {
        id: Date.now().toString(),
        name: name,
        description: description,
        completed: false,
      };
      state.push(newTask); // Agrega la nueva tarea al estado
      state.sort((a, b) => a.name.localeCompare(b.name)); // Ordena las tareas por nombre
    },
    // Marcar/desmarcar una tarea como completada
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // Eliminar una tarea
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    // Editar una tarea
    editTask: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string }>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
        task.description = action.payload.description;
      }
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { addTask, toggleComplete, deleteTask, editTask, loadTasks } = tasksSlice.actions;

export default tasksSlice.reducer;