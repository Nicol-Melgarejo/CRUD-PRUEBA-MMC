import React from "react";
import ListaProductos from "./ListaProductos";
import { FaBox, FaCog } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5 shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-6"> Panel de Control</h2>
        <nav className="flex-1">
          <ul>
            <li className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-blue-700 cursor-pointer transition font-medium">
              <FaBox /> Gestión de Productos
            </li>
            <li className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-blue-700 cursor-pointer transition font-medium">
              <FaCog /> Configuración
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center border-b-4 border-blue-900">
          <h1 className="text-3xl font-bold text-gray-800">📋 Gestión de Productos</h1>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-6">
          <ListaProductos />
        </main>
      </div>
    </div>
  );
}
