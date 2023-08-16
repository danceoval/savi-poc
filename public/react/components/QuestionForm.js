import React, { useState } from 'react';

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

  const questionsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

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

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(questions.length / questionsPerPage)));
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
      {questions.slice(startIndex, endIndex).map((question, index) => (
        <div className="question" key={startIndex + index}>
          <p>{question}</p>
          <textarea
            value={userAnswers[startIndex + index].answer}
            onChange={(event) => handleAnswerChange(event, startIndex + index)}
            rows={4}
            cols={50}
          />
        </div>
      ))}
      <div className="button-container">
        {currentPage > 1 && (
          <button type="button" onClick={handlePrevious}>Previous</button>
        )}
        {currentPage < Math.ceil(questions.length / questionsPerPage) && (
          <button type="button" onClick={handleNext}>Next</button>
        )}
        {currentPage === Math.ceil(questions.length / questionsPerPage) && (
          <button type="submit">Submit</button>
        )}
      </div>
    </form>
  );
};
