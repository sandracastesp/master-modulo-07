import React, { useState, useEffect } from "react";
import useOllamaHook from "../hooks/useOllamaHook";
import History from "./History";
import sendLogo from "../assets/send-logo.png"; // 

function Chat() {
  const [prompt, setPrompt] = useState("");
  const { handleSubmit, response, loading } = useOllamaHook();
  const [history, setHistory] = useState([]);

  const onSend = () => {
    if (prompt.trim()) {
      handleSubmit(prompt);
      setHistory((prev) => [...prev, { prompt, response }]);
      setPrompt("");
    }
  };

  // Cuando llega una respuesta nueva, se guarda en el último mensaje
  useEffect(() => {
    if (response) {
      setHistory((prev) => {
        if (prev.length === 0) return prev;

        const newHistory = [...prev];

        newHistory[newHistory.length - 1] = {
          ...newHistory[newHistory.length - 1],
          response: response,
        };

        return newHistory;
      });
    }
  }, [response]);


  return (
    <div className="flex h-screen">
      {/*Historial */}
      <History history={history} className="w-80" />

      {/* Chat */}
      <div className="flex-1 flex flex-col relative bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-bold">🤖 ChatGPT Light </h1>
          {/* Preguntas y respuestas */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {history.map((item, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded shadow">
                <span className="font-semibold text-white">🧑 Tú:</span>
                <p className="mb-2">{item.prompt}</p>
                <p className="font-semibold text-white">🤖 IA:</p>
                <p>{item.response || (index === history.length - 1 && loading ? "Cargando..." : "")}</p>
              </div>
            ))}
          </div>

          {/* Entrada de texto*/}
          <div className="p-2 border-t bg-gray-800 flex">
            <p className="text-center mb-2 text-lg font-semibold">¿Por dónde deberíamos empezar?</p>
          <div className="flex items-center bg-gray-900 p-2 rounded-lg w-full">  
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Pregunta lo que quieras..."
              rows="1"
              className="flex-1 p-2 border rounded mr-2 resize-none"
            />
            <img
              src={sendLogo}
              alt="Enviar"
              onClick={onSend}
              className={`w-8 h-8 cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Chat;
