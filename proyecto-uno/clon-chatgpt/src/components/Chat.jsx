import React, { useState, useEffect } from "react";
import useOllamaHook from "../hooks/useOllamaHook";
import History from "./History";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const { handleSubmit, response, loading, error } = useOllamaHook();
  const [history, setHistory] = useState([]);

  const onSend = () => {
    if (prompt.trim()) {
      handleSubmit(prompt);
    }
  };

  // Cuando llega una respuesta nueva, se guarda en history
  useEffect(() => {
    if (response) {
      setHistory((prev) => [...prev, { prompt, response }]);
    }
  }, [response, prompt]);

  // Función para reiniciar historial
  const handleNewChat = () => {
    setHistory([]);
    setPrompt("");
  };

  return (
    <div className="flex">
      {/* Sidebar de historial */}
      <History history={history} onNewChat={handleNewChat} />

      {/* Área principal del chat */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">🤖 ChatGPT Light </h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Pregunta lo que quieras..."
          rows="3"
          className="w-full p-2 border rounded mt-4"
        />
        <br />
        <button
          onClick={onSend}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Cargando..." : "Enviar"}
        </button>

        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        {response && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <strong>🤖:</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
