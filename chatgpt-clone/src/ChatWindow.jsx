import React, { useState } from 'react';
import { askQuestion } from './api';
import ReactMarkdown from 'react-markdown';
import './ChatWindow.css'; // Create this file for custom styles

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setLoading(true);

    try {
      const answer = await askQuestion(input);
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: answer }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: 'Error fetching answer.' }
      ]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role}`}
          >
            <div className="bubble">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="bubble">...</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="input-form">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={loading}
          autoFocus
        />
        <button type="submit" disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;