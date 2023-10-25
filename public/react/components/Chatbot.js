import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {ButtonContainer} from './ButtonContainer';
import {ProgressBar} from './ProgressBar';

const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const introManager = `Hello, I am Savi! As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.`;

  const introEmployee = `Hello, I am Savi! As your trusted coach, I will guide you to using AI in your role!`;

  const [messages, setMessages] = useState([introManager]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingState, setLoadingState] = useState(true); // Use a different name to avoid naming conflicts
  const [percentage, setPercentage] = useState(0);

  const handleButtonClick = () => {
    let message;

    if (props.stateIdx == 1) { // Set UseCase
      props.setStateIdx(2)
      socket.emit('show-plan', {})
    } else if (props.stateIdx == 2) { // Show Project
      props.setStateIdx(3)
      socket.emit('start-plan', {})
    } else { //Upskilling Plan
      props.setStateIdx(4)
    }

    setMessages([introEmployee]);
    setLoadingState(true); // Set loading to true when sending message
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

  const submitEvidence = (file) => {
    //setLoading(true); // Set loading to true when sending message
    setNewMessage('');
    handleProgress(12);
  }

  const submitBadEvidence = (file) => {
    alert("HIII BAD EVIDENCE")
  }

  const handleProgress = (num) => {
    if (percentage < 100) {
      setPercentage(percentage + num);
    }
  };



  useEffect(() => {
    socket.emit('userConnected', '');

    socket.on('response', (message) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setLoadingState(false); // Turn off loading when response received
      }, 1800);
    });

    return () => {
      // Cleanup logic, if needed
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="chat-container">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div dangerouslySetInnerHTML={{ __html: message }}></div>
            </div>
          ))}
        </div>
        {loadingState ? (
          <div className="loader-dots">One moment please</div>
        ) : (
          <div>
            {props.stateIdx == 3 && <ProgressBar percentage={percentage} />}
          <ButtonContainer
            stateIdx={props.stateIdx}
            handleButtonClick={handleButtonClick}
            messages={messages}
            submitEvidence={submitEvidence}
            submitBadEvidence={submitBadEvidence}
            handleProgress={handleProgress}
          />
          </div>
        )}
      </div>
    </div>
  );
};

