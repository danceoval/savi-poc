import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import loading from '../images/loading.gif'
import {ButtonContainer} from './ButtonContainer'

const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const intro = `🧚 
  Hello, I am Savi! 
  As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.
  🧚`;
  const [messages, setMessages] = useState([intro]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading
  const [stage, setStage] = useState('Discovery')

  useEffect(() => {
    socket.emit('userConnected', props.info);

    socket.on('response', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setLoading(false); // Turn off loading when response received
    });
  }, []);


  const handleButtonClick = (txt) => {
    let message;
    if(txt == 'Show'){
      message = "Show me the implementation plan and dependencies"
      setStage('Implement')
    } else if(txt == 'Plan') {
      message = "Implement this plan"
      setStage('Implement')
    } else {
      message = "Recommend another suitable use case"
      setStage('Discovery')
    }
    socket.emit('message', message);
    setLoading(true); // Set loading to true when sending message
    setNewMessage('');
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
      {
        loading  ? <div className='loader-dots'>Working my fairy magic</div>  : ( <ButtonContainer stage={stage} handleButtonClick={handleButtonClick} /> )
      }
    </div>
  );
};
