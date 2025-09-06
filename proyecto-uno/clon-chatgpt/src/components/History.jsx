import React from "react";

export default function History({history}) {
  return (
    <div className="flex flex-col h-screen w-80 bg-gray-900 text-white p-4 border-r border-gray-800">
      <div className="flex flex-col items-start">
        <h2 className="mb-4 font-bold">Historial de búsqueda</h2>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 mb-4">
        <h3 className="font-bold"> Chats </h3>
        <ul className="space-y-2 text-sm mt-4">
          {history.length === 0 && <li>No hay historial aún</li>}
          {history.map((item, index) => (
            <li
              key={index}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
              <p className="font-semibold truncate">Pregunta: {item.prompt}</p>
              <p className="text-gray-400 truncate">Respuesta: {item.response}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
