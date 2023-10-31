import React, { useState } from 'react';

export const QuestionForm = (props) => {
  const options = [
    "I spend a lot of time manually consolidating data in various formats across disparate sources",
    "I spent a lot of time manually summarizing a large amount of data to derive meaningful insights",
    "I spend a lot of time performing rule-based, repetitive, highly standardized tasks"
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter((o) => o !== option);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const handleDataSourceChange = (event, index) => {
    const source = event.target.value;
    setDataSources((prevSources) => {
      const newSources = [...prevSources];
      newSources[index] = source;
      return newSources;
    });
  };

  const handleAddDataSource = () => {
    setDataSources([...dataSources, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOptions.length > 0) {
      props.setStateIdx(1);
    } else {
      alert("Please select at least one option before submitting.");
    }
  };

  return (
    <form className="help-form" onSubmit={handleSubmit}>
      <div className="question">
        <p>What do you need help with?</p>
        <select
          multiple
          value={selectedOptions}
          onChange={handleOptionChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p>Selected Options: </p>
        <div>
        {
          (selectedOptions.length > 0) && selectedOptions.map((opt, i) => <p key={i}>{opt}</p>)
        }
        </div>
      </div>
      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
