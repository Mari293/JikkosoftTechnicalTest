import { useState } from "react";
import ToDoForm from "../../layout/form/ToDoForm";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/footer";
import ApiDataTable from "../ApiDataTable/ApiDataTable";
import Redux from "../redux/redux";

const Home: React.FC = () => {
  
  const [activeComponent, setActiveComponent] = useState<"home" | "api"| "redux">("home");
  
  return (
    <main className="min-h-screen bg-slate-100 overflow-auto flex flex-col">
      <Header setActiveComponent={setActiveComponent}/>
      {/* Sección principal con el formulario de tareas */}
      <section className="p-6 flex-grow">   
        {activeComponent === "home" && <ToDoForm />}
        {activeComponent === "api" && <ApiDataTable />}
        {activeComponent === "redux" && <Redux />}
      </section>
      <Footer/>
    </main>
  );
};

export default Home;