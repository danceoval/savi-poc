import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import loading from '../images/loading.gif'

const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const intro = `🧚 
  Hello, I am Savi! 
  As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.
  🧚`;
  const [messages, setMessages] = useState([intro]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    socket.emit('userConnected', props.info);

    socket.on('response', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setLoading(false); // Turn off loading when response received
    });
  }, []);

  const handleMessageSend = () => {
    if (newMessage.trim() !== '') {
      setLoading(true); // Set loading to true when sending message
      socket.emit('message', newMessage);
      setNewMessage('');
    }
  };

  const addNewLineAfterSentences = (inputString) => {
    // Split the input string into an array of sentences
    const sentences = inputString.split(/[.!?:]/);

    // Filter out empty strings and join the sentences with a new line
    const result = sentences
      .filter((sentence) => sentence.trim() !== '')
      .join('.\n');
    return result;
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {addNewLineAfterSentences(message)}
          </div>
        ))}
      </div>
      {loading  ? <div className='loader-dots'> Loading</div>  : (
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      )}
    </div>
  );
};
