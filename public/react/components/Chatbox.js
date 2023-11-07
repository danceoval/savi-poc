import React, { useState, useEffect } from 'react';

export const Chatbox = () => {
  const [feedback, setFeedback] = useState('');
  const [question, setQuestion] = useState('');

  const handleHelpRequest = () => {
    // When the user asks for help, set showHeader to true after an 8-second delay
    setTimeout(() => {
      setFeedback('Out of luck!');
    }, 2200);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  useEffect(() => {
    // Cleanup the timeout if the component unmounts before the delay is reached
    return () => clearTimeout();
  }, []);

  return (
    <div>
      <h1>Chatbox</h1>
      {<h2>{feedback}</h2>}
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
  );
}
