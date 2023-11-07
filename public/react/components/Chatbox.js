import React, { useState, useEffect } from 'react';

export const Chatbox = (props) => {
  const [question, setQuestion] = useState('');


  const handleHelpRequest = () => {
    // When the user asks for help, set showHeader to true after an 8-second delay
    props.askForHelp(question)
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };


  return (
    <div>
      {
        !props.loadingState && (
          <div>
           <h1>Chatbox</h1>
            { 
              props.feedback && (
                <div>
                  <h4>Feedback</h4>
                  <p>{props.feedback}</p>
                </div>
              )
            }
            <input
              type="text"
              placeholder="Ask a question"
              value={question}
              onChange={handleQuestionChange}
            />
            <div className="button-container">
              <button onClick={handleHelpRequest}>Ask Savvy for Help</button>
            </div>
          </div>
        )
      }
    </div>
  );
}
