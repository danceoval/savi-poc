import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
	const intro = `🧚 Hello, I am Savi! Your fairy AI assistant! Just one moment while I do my magic! 🧚`;
  const [messages, setMessages] = useState([intro]);
  const [newMessage, setNewMessage] = useState('');

	useEffect(() => {

		socket.emit('userConnected', props.info)

		socket.on('response', (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
		
	}, []);



  const handleMessageSend = () => {
    if (newMessage.trim() !== '') {
      socket.emit('message', newMessage);
      setNewMessage('');
    }
  };

  return (
  	   <div className="chat-container">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        {
          messages.length <= 1 ? null : (
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleMessageSend}>Send</button>
              </div>
          )

        }
      </div>
  )

}