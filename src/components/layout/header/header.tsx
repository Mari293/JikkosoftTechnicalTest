import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmail, HeaderProps } from "../../../services/interfaces";

const Header: React.FC<HeaderProps> = ({ setActiveComponent }) => {
  const [userEmail, setUserEmail] = useState<UserEmail | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú desplegable
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user"); // Limpiar datos del usuario en localStorage
    navigate("/"); // Redirigir al usuario a la página de inicio
  };

  // Efecto para cargar los datos del usuario al montar el componente
  useEffect(() => {
    // Obtener el correo desde localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userEmail = storedUser.email;

    if (userEmail) {
      setUserEmail({ email: userEmail });
    }
  }, []);

  return (
    /* Header con mensaje de bienvenida y correo */
    <header className="flex flex-col md:flex-row items-center justify-between bg-gray-800 px-8 py-4 shadow-lg">
      {/* Parte superior: Logo y menú hamburguesa */}
      <div className="w-full md:w-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <i className="pi pi-user text-gray-300 text-2xl"></i>
          <p className="text-gray-300 text-lg">
            Bienvenido,{" "}
            {userEmail?.email && (
              <span className="block text-sm text-gray-400">{userEmail.email}</span>
            )}
          </p>
        </div>

        {/* Botón de menú hamburguesa (solo en móviles) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-gray-400 focus:outline-none"
        >
          <i className={`pi ${isMenuOpen ? "pi-times" : "pi-bars"} text-2xl`}></i>
        </button>
      </div>

      {/* Menú de botones (oculto en móviles, visible en pantallas medianas/grandes) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
      >
        <button
          onClick={() => {
            setActiveComponent("home");
            setIsMenuOpen(false); // Cerrar menú después de hacer clic
          }}
          className="w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Formulario
        </button>

        <button
          onClick={() => {
            setActiveComponent("api");
            setIsMenuOpen(false); // Cerrar menú después de hacer clic
          }}
          className="w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Tabla API
        </button>

        <button
          onClick={() => {
            setActiveComponent("redux");
            setIsMenuOpen(false); // Cerrar menú después de hacer clic
          }}
          className="w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Redux
        </button>

        <button
          onClick={handleLogout}
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;


// import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserEmail, HeaderProps } from "../../../services/interfaces";

// const Header: React.FC<HeaderProps> = ({ setActiveComponent }) => {

//   const [userEmail, setUserEmail] = useState<UserEmail | null>(null);
//   const navigate = useNavigate();

//   // Función para cerrar sesión
//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Limpiar datos del usuario en localStorage
//     navigate("/"); // Redirigir al usuario a la página de inicio
//   };

//   // Efecto para cargar los datos del usuario al montar el componente
//   useEffect(() => {
//     // Obtener el correo desde localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     const userEmail = storedUser.email;

//     if (userEmail) {
//       setUserEmail({ email: userEmail });
//     }
//   }, []);
//   return (
//   /* Header con mensaje de bienvenida y correo */
//   <header className="flex items-center justify-between bg-blue-600 px-6 py-4 shadow-md">
//   <div className="flex items-center space-x-4">
//     <i className="pi pi-user text-white text-2xl"></i>
//     <p className="text-white text-lg">
//       Bienvenido,{" "}
//       {userEmail?.email && <span className="block text-sm text-gray-200">{userEmail.email}</span>}
//     </p>
//   </div>
  
//   {/* Botones para cambiar la vista */}
//   <div className="flex space-x-4">
//     <button
//       onClick={() => setActiveComponent("home")}
//       className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
//     >
//       Formulario
//     </button>

//     <button
//       onClick={() => setActiveComponent("api")}
//       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
//     >
//       Tabla API
//     </button>

//     <button
//       onClick={() => setActiveComponent("redux")}
//       className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md"
//     >
//       Redux
//     </button>

//     <button
//       onClick={handleLogout}
//       className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
//     >
//       Cerrar sesión
//     </button>
//   </div>
// </header>
//   )
// }

// export default Header