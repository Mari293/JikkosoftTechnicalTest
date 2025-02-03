import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Reducer para manejar el estado de las tareas
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;