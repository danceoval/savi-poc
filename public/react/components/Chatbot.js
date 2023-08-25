import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import loading from '../images/loading.gif'
import {ButtonContainer} from './ButtonContainer'

const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const introManager = `🧚 
  Hello, I am Savi! 
  As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.
  🧚`;

  const introEmployee =  `🧚 
  Hello, I am Savi! 
  As your trusted coach, I will guide you to using AI in your role!
  🧚`;

  const [messages, setMessages] = useState([introManager]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading
  const [stage, setStage] = useState('Discovery')
  const [tools, setTools] = useState([])

  useEffect(() => {
    socket.emit('userConnected', props.info);

    socket.on('response', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setLoading(false); // Turn off loading when response received
    });

    socket.on('set-tools', (tools) => {
      setTools(tools)
    });
    
  }, []);


  const handleButtonClick = (txt) => {
    let message;
    if(txt == 'Show'){
      message = "Show me the implementation plan and dependencies"
      setStage('Show')
      socket.emit('message', message);
      setLoading(true); // Set loading to true when sending message
      setNewMessage('');
    } else if(txt == 'Plan') {
      message = "Implement this plan"
      setStage('Implement')
      const plan = [...messages].slice(-1)
      setMessages([introEmployee])
      socket.emit('employee-message', plan);
      socket.emit('get-tools', plan)
      setLoading(true); // Set loading to true when sending message
      setNewMessage('');
    } else if(txt == 'Recommend') {
      message = "Recommend another suitable use case"
      setStage('Discovery')
      socket.emit('message', message);
      setLoading(true); // Set loading to true when sending message
      setNewMessage('');
    } else { //Employee Q
      socket.emit('message', "Give me a learning plan for " + txt);
      setLoading(true); // Set loading to true when sending message
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
            {stage == 'Implement' ? message : addNewLineAfterSentences(message)}
          </div>
        ))}
      </div>
      {
        loading  ? <div className='loader-dots'>Working my fairy magic</div>  : ( <ButtonContainer stage={stage} tools={tools} handleButtonClick={handleButtonClick} messages={messages}/> )
      }
    </div>
  );
};