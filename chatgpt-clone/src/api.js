const API_URL = import.meta.env.VITE_API_URL;

export async function askQuestion(question) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.answer || 'No answer found.';
}