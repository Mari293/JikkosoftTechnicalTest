/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Post} from '../../../services/interfaces';
import { showAlert } from '../../../utils/alertUtils';

const ApiDataTable: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string| null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)); //Promesa que se resuelve despues de un tiempo para pausar la ejecucion de codigo

  const fetchData = async () => {
    try {
      setLoading(true); // Activa el estado de Loading
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data); //Guarda los datos obtenidos
      await delay(5000); // Simular una carga de 5 segundos
      setLoading(false); // Desativa el Loading despues de 5 segundos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido'); // Convierte el error a un mensaje legible
      showAlert("error","Error al realizar la peticion")
      setLoading(false); // Desactiva el Loading para mostrar el mensaje de error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Funcion para filtar los datos cuyo titulo concuerde con el termino de busquedad 
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage; //index del ultimo item de la pagina 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; //index del primer item de la pagina
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); //Muestra los datos de la pagina actual

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Publicaciones de JSONPlaceholder
      </h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabla de datos */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contenido
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApiDataTable;