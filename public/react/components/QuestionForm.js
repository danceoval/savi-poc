import React, { useState } from 'react';

export const QuestionForm = (props) => {
  const options = [
    {
      title: 'Data Consolidation',
      desc: 'automatically consolidate diverse data across disparate sources',
    },
    {
      title: 'Summarization',
      desc: 'automatically summarize a large amount of information to derive meaningful insights',
    },
    {
      title: 'Automation',
      desc: 'automate rule-based, repetitive, highly standardized tasks',
    },
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
      alert('Please select at least one option before submitting.');
    }
  };

  return (
    <form className="help-form" onSubmit={handleSubmit}>
      <div className="question">
        <h2>What do you need help with?</h2>
        {options.map((option, index) => (
          <div key={option.title} className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                value={option.title}
                checked={selectedOptions.includes(option.title)}
                onChange={handleOptionChange}
              />
              <span className="highlight bold">{option.title}:</span> {option.desc}
            </label>
          </div>
        ))}
        <h3>Selected Options: </h3>
        <div>
          {selectedOptions.length > 0 &&
            selectedOptions.map((opt, i) => <p key={i}>{opt}</p>)}
        </div>
      </div>
      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
