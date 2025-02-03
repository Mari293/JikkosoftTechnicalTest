/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { AlertColor } from "@mui/material";
import CustomAlert from "./CustomAlert"; // Importa el componente CustomAlert

// Estado global para controlar la alerta
let setAlertState: React.Dispatch<
  React.SetStateAction<{ type: AlertColor; message: string; open: boolean }>
>;

// Función para mostrar la alerta
export const showAlert = (type: AlertColor, message: string) => {
  if (setAlertState) {
    setAlertState({ type, message, open: true });

    // Cierra la alerta automáticamente después de 6 segundos
    setTimeout(() => {
      setAlertState((prev) => ({ ...prev, open: false }));
    }, 6000);
  }
};

// Define el tipo de las props de AlertProvider
interface AlertProviderProps {
  children: React.ReactNode; // Acepta children
}

// Componente que maneja la lógica de la alerta
export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<{ type: AlertColor; message: string; open: boolean }>({
    type: "info",
    message: "",
    open: false,
  });

  // Asigna la función setAlertState al estado global
  setAlertState = setAlert;

  return (
    <>
      {alert.open && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        />
      )}
      {children} {/* Renderiza los children */}
    </>
  );
};