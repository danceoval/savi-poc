import React, { useState } from 'react';

export const QuestionForm = (props) => {
  const questions = [
    "Describe your role.",
    "What are your current priorities?",
    // "What challenges associated with those priorities do you face?",
    // "What kind of data does your team have access to?",
    // "How familiar is your team with AI?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  
  const handleAnswerChange = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="question-form">
      <h2>Answer the Questions</h2>
      <div className="question">
        <p>{questions[currentQuestionIndex]}</p>
        <textarea
          value={userAnswers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          rows={4}
          cols={50}
        />
      </div>
      <div className="button-group">
        {currentQuestionIndex > 0 && (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Previous
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={() => props.setView('chatbot')}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

