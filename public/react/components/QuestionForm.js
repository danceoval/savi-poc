import React, { useState } from 'react';
import axios from 'axios';

export const QuestionForm = (props) => {
  const questions = [
    "Describe your role.",
    "What are your current priorities?",
    "What challenges associated with those priorities do you face?",
    "What kind of data does your team have access to?",
    "How familiar is your team with AI?"
  ];

  const [userAnswers, setUserAnswers] = useState(Array(questions.length)
    .fill('')
    .map((el, idx) => {
      return { question: questions[idx], answer: '' };
    }));

  const handleAnswerChange = (event, questionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex].answer = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAnswers.every((answer) => answer.answer !== '')) {
      props.setInfo(userAnswers);
      props.setView('chatbot');
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div className="question" key={index}>
          <p>{question}</p>
          <textarea
            value={userAnswers[index].answer}
            onChange={(event) => handleAnswerChange(event, index)}
            rows={4}
            cols={50}
          />
        </div>
      ))}
      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
