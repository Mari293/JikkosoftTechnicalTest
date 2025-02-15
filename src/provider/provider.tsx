/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext } from "react";
import { User, ContextData } from "../services/interfaces";

const defaultContextData: ContextData = {
  user: null,
  uid: null,
};

// Crea el contexto con el tipo adecuado
export const UserContext = createContext<ContextData>(defaultContextData);

// Define el tipo de las propiedades del proveedor
interface ProviderProps {
  children: ReactNode;
}

// Implementa el proveedor con el tipado
export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  // Recupera el usuario desde localStorage
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const data: ContextData = {
    user,
    uid: user?.uid || null,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

// Hook para usar el contexto
export const useUserContext = () => useContext(UserContext);
