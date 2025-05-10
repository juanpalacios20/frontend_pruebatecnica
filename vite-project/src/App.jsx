import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [medicine, setMedicine] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/").then((response) => {
      setMedicine(response.data);}).catch((error) => {
        console.error("Error fetching data:", error);});
  }, []);

const managementMedicine = async () => {
  if (name.trim() === "") return;

  try {
    if (editMode && editId != null) {
      await axios.put(`https://backend-pruebatecnica-2cuj.onrender.com/api/${editId}`, {
        name: name,
      });

      const response = await axios.get("https://backend-pruebatecnica-2cuj.onrender.com/api/");
      setMedicine(response.data);

      setEditMode(false);
      setEditId(null);
    } else {
      await axios.post("https://backend-pruebatecnica-2cuj.onrender.com/api/", {
        name: name,
      });

      const response = await axios.get("https://backend-pruebatecnica-2cuj.onrender.com/api/");
      setMedicine(response.data);
    }

    setName("");
  } catch (error) {
    console.error("Error al guardar el medicamento:", error);
  }
};


  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`https://backend-pruebatecnica-2cuj.onrender.com/api/${id}`);
      const response = await axios.get("https://backend-pruebatecnica-2cuj.onrender.com/api/");
      setMedicine(response.data);
    } catch (error) {
      console.error("Error al eliminar el medicamento:", error);
    }
  };

  const editMedicine = (medicineToEdit) => {
    setName(medicineToEdit.medicineName);
    setEditMode(true);
    setEditId(medicineToEdit.id);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Administrar medicamentos</h1>

        <div className="mb-6">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del medicamento
          </label>
          <input
            type="text"
            id="nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa el nombre del medicamento"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          <button
            onClick={managementMedicine}
            className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600"
          >
            {editMode ? "Actualizar medicamento" : "Ingresar medicamento"}
          </button>
        </div>

        <div>
          {medicine.length === 0 ? (
            <p className="text-center text-gray-500">No hay medicamentos creados aún.</p>
          ) : (
            medicine.map((medicine) => (
              <div
                key={medicine.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2"
              >
                <div>
                  <p className="font-semibold">ID: {medicine.id}</p>
                  <p className="text-gray-700">Nombre: {medicine.medicineName}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => editMedicine(medicine)}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteMedicine(medicine.id)}
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
