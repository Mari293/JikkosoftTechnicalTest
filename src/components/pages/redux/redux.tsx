import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../../../services/store";
import ToDoFormRedux from "../../layout/form/toDoFormRedux";
import { loadTasks } from "../../../services/tasksSlice";

const Redux: React.FC = () => {
  useEffect(() => {
    // Cargar tareas desde localStorage al iniciar
    const savedTasks = localStorage.getItem("tasks3");
    if (savedTasks) {
      store.dispatch(loadTasks(JSON.parse(savedTasks)));
    }

    // Guardar tareas en localStorage cada vez que cambien
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("tasks3", JSON.stringify(state.tasks));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <ToDoFormRedux />
    </Provider>
  );
};

export default Redux;