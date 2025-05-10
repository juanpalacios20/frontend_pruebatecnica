import { useState } from "react";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [libros, setLibros] = useState([]);
  const [contador, setContador] = useState(1);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Administrar libros</h1>

        <div className="mb-6">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del libro"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          <button
            className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600"
          >
            Crear libro
          </button>
        </div>

        <div>
          {libros.length === 0 ? (
            <p className="text-center text-gray-500">No hay libros creados aún.</p>
          ) : (
            libros.map((libro) => (
              <div
                key={libro.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2"
              >
                <div>
                  <p className="font-semibold">ID: {libro.id}</p>
                  <p className="text-gray-700">Nombre: {libro.nombre}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const nuevoNombre = prompt("Nuevo nombre:", libro.nombre);
                      if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
                        editarLibro(libro.id, nuevoNombre);
                      }
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarLibro(libro.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
