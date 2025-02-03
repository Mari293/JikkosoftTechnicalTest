import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider as UserProvider } from "./provider/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./utils/alertUtils.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </BrowserRouter>,
);
