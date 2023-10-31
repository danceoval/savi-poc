import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {ButtonContainer} from './ButtonContainer';
import {ProgressBar} from './ProgressBar';
import {UseCase} from './UseCase'

const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const introManager = `Hello, I am Savi! As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.`;

  const introEmployee = `Hello, I am Savi! As your trusted coach, I will guide you to using AI in your role!`;

  const [messages, setMessages] = useState([introManager]);
  const [newMessage, setNewMessage] = useState(''); //This is for the Usecase Identification
  const [useCase, setUseCase] = useState({})
  const [plan, setPlan] = useState({}) //This is for the upskilling Plan
  const [loadingState, setLoadingState] = useState(true); // Use a different name to avoid naming conflicts
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [submitMsg, setSubmitMsg] = useState('Submit Scraped Data')
  const [fileName, setFileName] = useState('')
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    let message;

    if (props.stateIdx == 1) { // Set UseCase
      props.setStateIdx(2)
      socket.emit('start-plan', {})
    } else { // Show Project
      props.setStateIdx(3)
    } 
    setLoadingState(true); // Set loading to true when sending message
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

  const submitEvidence = (file) => {
    setNewMessage('');
    handleProgress(12);
    setSubmitMsg('Begin Next Step');
    setSuccess(true)
  }

  const handleProgress = (num) => {
    if (percentage < 100) {
      setPercentage(percentage + num);
    }
  };



  useEffect(() => {
    socket.emit('userConnected', '');

    socket.on('response-usecase', (messageObj) => {
      setUseCase(messageObj)
      setLoadingState(false); // Turn off loading when response received
    })

    socket.on('response-plan', (message) => {
      console.log("IS THIS THE obj?", message)
      setPlan(message)
      setLoadingState(false); // Turn off loading when response received
    });


    return () => {
      // Cleanup logic, if needed
      socket.disconnect();
    };
  }, []);

  const renderState = stateIdx => {
    switch(stateIdx){
      case 2:
        return (!loadingState && <UseCase 
            useCase={useCase}
            stateIdx={stateIdx}
            handleButtonClick={handleButtonClick}
          />)
      case 3:
        return <h1>Implementation Plan!</h1>
      default:
        return <h3>State not specified {stateIdx}</h3>
    }
  }

  return (
    <div>
      <div className="chat-container">
        <div className="message-container">
          <div className="message">
            <p>{introEmployee}</p>
          </div>
          {
            !loadingState && (
              <div className="message">
                {renderState(props.stateIdx)}
              </div>
            )
          }
        </div>
        {
          loadingState && (
            <div className="loader-dots">One moment please</div>
          ) 
        }
      </div>
    </div>
  );
};

