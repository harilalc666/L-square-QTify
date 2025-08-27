export async function askQuestion(question) {
  const res = await fetch('https://sunny-smile-production.up.railway.app/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.answer || 'No answer found.';
}