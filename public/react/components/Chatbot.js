import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import loading from '../images/loading.gif'

import {ButtonContainer} from './ButtonContainer'
import {ProgressBar} from './ProgressBar';

const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const introManager = ` 
  Hello, I am Savi! 
  As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.
  `;

  const introEmployee =  ` 
  Hello, I am Savi! 
  As your trusted coach, I will guide you to using AI in your role!
  `;

  const [messages, setMessages] = useState([introManager]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading
  const [stage, setStage] = useState('Discovery')
  const [tools, setTools] = useState([])
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    socket.emit('userConnected', props.info);

    socket.on('response', (message) => {
      setTimeout(() => { // Remove when not
        console.log("THINKING")
        setMessages((prevMessages) => [...prevMessages, message]);
        setLoading(false); // Turn off loading when response received
      }, 1800)
    });

  }, []);

  const submitEvidence = (file) => {
    //setLoading(true); // Set loading to true when sending message
    setNewMessage('');
    handleProgress(12);
  }

  const submitBadEvidence = (file) => {
    console.log("HIII BAD EVIDENCE")
    socket.emit('send-bad', file)
  }

  const handleButtonClick = (txt) => {
    let message;
    if(txt == 'Show'){
      message = "Show me the implementation plan and dependencies"
      setStage('Show')
      socket.emit('show-plan', message);
      setMessages([introEmployee])
      setLoading(true); // Set loading to true when sending message
      setNewMessage('');
    } else if(txt == 'Plan') {
      message = "Implement this plan"
      setStage('Implement')
      const plan = [...messages].slice(-1)
      setMessages([introEmployee])
      socket.emit('employee-message', plan);
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

  const startPlan = () => {
    setStage('Begin')
    socket.emit('start-plan', {})
    setLoading(true)
    setNewMessage('')
  }


  const addNewLineAfterSentences = (inputString) => {
    // Split the input string into an array of sentences
    const sentences = inputString.split(/[.!?:]/);

    // Filter out empty strings and join the sentences with a new line
    const result = sentences
      .filter((sentence) => sentence.trim() !== '')
      .join('.\n');
    return result;
  };


  const handleProgress = (num) => {
    if (percentage < 100) {
      setPercentage(percentage + num);
    }
  };
  return (
    <div>
      <div className="chat-container">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div dangerouslySetInnerHTML={{__html: message}}></div>
            </div>
          ))}
          {
            (stage == 'Begin') && <ProgressBar percentage={percentage} />
          }
        </div>
        {
          loading  ? <div className='loader-dots'>One moment please</div>  : ( <ButtonContainer stage={stage} tools={tools} handleButtonClick={handleButtonClick} messages={messages} submitEvidence={submitEvidence} submitBadEvidence={submitBadEvidence} startPlan={startPlan} handleProgress={handleProgress}/> )
        }
      </div>
    </div>

  );
};