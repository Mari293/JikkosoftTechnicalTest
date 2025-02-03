/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define la estructura del usuario
export interface User {
  uid: string;
  [key: string]: any; // Permite otras propiedades si es necesario
}

// Define la estructura de los datos del contexto
export interface ContextData {
  user: User | null;
  uid: string | null;
}


export interface UserEmail {
  email?: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, updatedName: string, updatedDescription: string) => void;
  onToggleComplete: (id: string) => void;
}

export interface HeaderProps {
  setActiveComponent: (component: "home" | "api"| "redux") => void;
}

export interface ItemProps {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedName: string, updatedDescription: string) => void;
  onToggleComplete: (id: string) => void;
}