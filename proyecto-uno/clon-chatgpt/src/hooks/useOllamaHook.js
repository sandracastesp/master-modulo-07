import { useState } from 'react';

function useOllamaHook() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (_prompt) => {
    setLoading(true);
    setResponse('');
    setError(null);

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b',
          prompt: _prompt,
          max_tokens: 500,
          stream: false,
        }),
      });

      if (!res.ok) {
        throw new Error('Respuesta inválida');
      }

       const data = await res.json();
       const cleanResponse = data.response.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
      setResponse(cleanResponse);
    } catch (err) {
      console.error('Error en petición:', err);
      setError(err.message || 'Error en petición');
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, response, error, loading };
}

export default useOllamaHook;