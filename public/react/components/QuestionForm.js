import React, { useState } from 'react';

export const QuestionForm = (props) => {
  const questions = [
    "Describe your role.",
    "What are your current priorities?",
    "How do you measure success?",
    "What are the top pain points in your work?",
    "How many hours per week do you currently spend on this pain point?",
    "What kind of data (unstructured (e.g. user feedback) and structured (e.g. Excel spreadsheets)) do you have access to?",
    " How do you currently use that data?"
  ];

  const questionsPerPage = 4;
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
      props.setStateIdx(1);
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
