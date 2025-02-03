import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";

interface CustomAlertProps {
  type: AlertColor; // "info" | "success" | "warning" | "error"
  message: string;
  onClose?: () => void; // Función opcional para manejar el cierre
}


const CustomAlert = ({ type, message, onClose }: CustomAlertProps) => {
  const [open, setOpen] = useState(true);

  // Cierra la alerta automáticamente después de 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      if (onClose) onClose(); // Llama a la función onClose si está definida
    }, 6000);

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [onClose]);

  // Cierra la alerta manualmente
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose(); // Llama a la función onClose si está definida
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;