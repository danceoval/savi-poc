import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {ButtonContainer} from './ButtonContainer';
import {ProgressBar} from './ProgressBar';
import {UseCase} from './UseCase';
import {ImplementationPlan} from './ImplementationPlan';
import { Chatbox } from './Chatbox';

const socket = io('http://localhost:3000'); // Connect to the server's address

export const ImplementationContainer = (props) => {
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
  const [feedback, setFeedback] = useState('');

  const handleButtonClick = () => {
    let message;

    if (props.stateIdx == 2) { // Start Implementation
      props.setStateIdx(3)
      socket.emit('start-plan', {})
    } else { // Next Step
      props.setStateIdx(4)
    } 
    setLoadingState(true); // Set loading to true when sending message
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

  const askForHelp = (question) => {
    socket.emit('get-help', question)
    setLoadingState(true)
  }


  useEffect(() => {
    socket.emit('userConnected', '');

    socket.on('response-usecase', (messageObj) => {
      setUseCase(messageObj)
      setLoadingState(false); // Turn off loading when response received
    })

    socket.on('response-plan', (message) => {
      setPlan(message)
      setLoadingState(false); // Turn off loading when response received
    });

    socket.on('set-help', (message) => {
      setFeedback(message);
      setLoadingState(false); // Turn off loading when response received
    })


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
        return (<ImplementationPlan
            stateIdx={stateIdx}
            handleButtonClick={handleButtonClick}
            plan={plan}
            percentage={percentage}
            setPercentage={setPercentage}
            error={error}
            setError={setError}
            fileName={fileName}
            success={success}
            submitEvidence={submitEvidence}
            setFileName={setFileName}
            fileName={fileName}
            handleProgress={handleProgress}
            setLoadingState={setLoadingState}
            submitMsg={submitMsg}
          />)
      default:
        return <h3>Error: State not specified - #{stateIdx}</h3>
    }
  }

  return (
    <div>
      <div className="container">
        <div className="message-container">
          <div className="message">
            <p>{introEmployee}</p>
          </div>
          <div className="message">
            {renderState(props.stateIdx)}
          </div>
        </div>
        {
          loadingState && (
            <div className="loader-dots">One moment please</div>
          ) 
        }
        {
          (!loadingState && props.stateIdx == 3) && <ProgressBar percentage={percentage}/>
        }
        {
          (!loadingState && props.stateIdx == 3) &&  <Chatbox loadingState={loadingState} setLoadingState={setLoadingState} feedback={feedback} askForHelp={askForHelp} />
        }
      </div>
    </div>
  );
};

