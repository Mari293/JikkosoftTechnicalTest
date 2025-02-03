import { Route, Routes, Navigate } from "react-router-dom";
import { useUserContext } from "./provider/provider";
import Home from "./components/pages/home/home";
import Auth from "./components/pages/auth/auth";
import Footer from "./components/layout/footer/Footer";
import ApiDataTable from "./components/pages/ApiDataTable/ApiDataTable";
import Redux from "./components/pages/redux/redux";


function App() {
  const { user } = useUserContext();

  const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <main className="h-screen flex flex-col justify-between overflow-hidden">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/api"
          element={
            <PrivateRoute>
              <ApiDataTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/redux"
          element={
            <PrivateRoute>
              <Redux />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
