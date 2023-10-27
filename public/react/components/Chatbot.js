import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {ButtonContainer} from './ButtonContainer';
import {ProgressBar} from './ProgressBar';


const socket = io('http://localhost:3000'); // Connect to the server's address

export const Chatbot = (props) => {
  const introManager = `Hello, I am Savi! As your trusted assistant, your team will unlock a new realm of unparalleled efficiency, effectiveness, and performance.`;

  const introEmployee = `Hello, I am Savi! As your trusted coach, I will guide you to using AI in your role!`;

  const [messages, setMessages] = useState([introManager]);
  const [newMessage, setNewMessage] = useState(''); //This is for the Usecase Identification
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

    socket.on('response-usecase', (messageArr) => {
      setMessages((prevMessages) => [...prevMessages, ...messageArr]);
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

  return (
    <div>
      <div className="chat-container">
        <div className="message-container">
          <div className="message">
            { 
              /* This is for usecase agreement */
              messages.length && messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))
            }
            {
               /* This is for upskilling plan*/ 
              (props.stateIdx == 2 && Object.keys(plan).length > 0) && (
              <div>
                <h1>{plan.header}</h1>
                {
                  plan.steps.map((step, idx) => {
                    return ( idx == 0 ? (
                        <div className="step-active">
                          <h3 className="highlight">{step.title}</h3>
                          <h4 className="highlight">{step.length}</h4>
                          <p>Your goals are as follows:</p>
                          <ol>
                            {
                              step.goals.map((goal, goalIdx) => {
                                return <li key={goalIdx}>{goal}</li>
                              })
                            }
                          </ol>
                          <p>{step.submission}</p>
                          <h4>Recommended Resources:</h4>
                          <ul>
                            {
                              step.resources.map((resource, resourceIdx) => (
                                <li key={resourceIdx}><u className="highlight">{resource.title}</u> {resource.len} </li>
                              ))
                            }
                          </ul>
                          <ButtonContainer
                                stateIdx={props.stateIdx}
                                handleButtonClick={handleButtonClick}
                                messages={messages}
                                submitEvidence={submitEvidence}
                                handleProgress={handleProgress}
                                setLoadingState={setLoadingState}
                                error={error}
                                setError={setError}
                                submitMsg={submitMsg}
                                setFileName={setFileName}
                                fileName={fileName}
                                success={success}
                              />
                        </div>
                      ) : (
                        <div className="step-inactive">
                          <div className="step-body">
                            <span className="step-title">{step.title}</span>
                            <span className="step-time">{step.length}</span>
                          </div>
                          <div className="open-icon">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </div>
                        </div>
                      )
                    )
                  })
                }
              </div> 
              )
            }
          </div>
        </div>
        {loadingState ? (
          <div className="loader-dots">One moment please</div>
        ) : (
          <div>
          {success && <h1>Well done!</h1>}
          {props.stateIdx == 2 && <ProgressBar percentage={percentage} />}
          {props.stateIdx == 1 && <ButtonContainer
            stateIdx={props.stateIdx}
            handleButtonClick={handleButtonClick}
            messages={messages}
            submitEvidence={submitEvidence}
            handleProgress={handleProgress}
            setLoadingState={setLoadingState}
            error={error}
            setError={setError}
            submitMsg={submitMsg}
            setFileName={setFileName}
            fileName={fileName}
            success={success}
          />
          }
          </div>
        )}
      </div>
    </div>
  );
};

