import React, { useState } from 'react';
import axios from 'axios';

export const QuestionForm = (props) => {
  const questions = [
    "Describe your role.",
    "What are your current priorities?",
    "What challenges associated with those priorities do you face?",
    "What kind of data does your team have access to?",
    "How familiar is your team with AI?",
    "Are there processes/tasks that you think could be automated to improve efficiency?",
    "Are there specific customer segments you struggle to reach effectively?",
    "How do you measure the success of your marketing campaigns?",
    "Who are your main competitors, and how do you differentiate yourselves from them?",
    "Are there aspects of your competitors' marketing strategies that you'd like to emulate or outperform?",
    "Can you describe the typical journey a customer takes from awareness to purchase?",
    "How do you currently personalize your interactions with customers?",
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