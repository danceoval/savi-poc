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
  const [useCase, setuseCase] = useState('')

  useEffect(() => {
    if(props.user == "manager"){
      socket.emit('userConnected', props.info);
    }
    

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
      console.log("MMM", messages)
      setuseCase(messages.slice(-1))
      props.setUser('Employee')
      setStage('Implement')
      socket.emit('employeeConnected', messages.slice(-1));
    } else {
      message = "Recommend another suitable use case"
      setStage('Discovery')
    }
    socket.emit('message', message);
    setLoading(true); // Set loading to true when sending message
    setNewMessage('');
  };

  const handleMessageSend = () => {
    if (newMessage.trim() !== '') {
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
            {props.user == 'manager' ? addNewLineAfterSentences(message) : message}
          </div>
        ))}
      </div>
      {
        loading  ? <div className='loader-dots'>Working my fairy magic</div>  : ( <ButtonContainer stage={stage} handleButtonClick={handleButtonClick} user={props.user} setNewMessage={setNewMessage} newMessage={newMessage} setuseCase={setuseCase}/> )
      }
    </div>
  );
};
