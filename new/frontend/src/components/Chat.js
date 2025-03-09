import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim()) {
      setChat((prevChat) => [...prevChat, { user: 'You', text: message }]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          message,
        });

        setChat((prevChat) => [
          ...prevChat,
          { user: 'AI', text: response.data.reply }, // Assuming API returns `{ reply: "AI response" }`
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
