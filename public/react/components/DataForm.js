import React, { useState } from 'react';

export const DataForm = (props) => {
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [submittedDataSources, setSubmittedDataSources] = useState([]);
  const commonDataSources = [
    {
      title: "US Census Bureau",
      desc: "general population data"
    },
    {
      title: "Bureau of Labor Statistics",
      desc: "labor data"
    },
    {
      title: "Data.gov",
      desc: "open Data sources by the U.S. government"
    },
    {
      title: "Nielsen",
      desc: "market research data"
    }
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddDataSource = () => {
    if (inputValue.trim() !== '') {
      setSelectedDataSources([...selectedDataSources, inputValue]);
      setInputValue('');
    }
  };

  const handleCheckBoxChange = (source) => {
    const updatedDataSources = selectedDataSources.includes(source)
      ? selectedDataSources.filter((s) => s !== source)
      : [...selectedDataSources, source];

    setSelectedDataSources(updatedDataSources);
  };

  const handleSubmit = () => {
    setSubmittedDataSources(selectedDataSources);
    props.setStateIdx(props.stateIdx + 1);
  };

  return (
    <div className="help-form">
      <div className="question">
        <h2>I can help you with that.</h2>
        <h3>Could you state relevant data sources? Here are some common data sources:</h3>
        {commonDataSources.map((source, i) => (
          <div className="checkbox-container" key={i}>
            <label key={source.title} className="checkbox-label">
              
              <input
                type="checkbox"
                checked={selectedDataSources.includes(source.title)}
                onChange={() => handleCheckBoxChange(source.title)}
              />
              <span className="highlight bold">{source.title}: </span>{source.desc}
            </label>
          </div>
        ))}
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a data source"
          />
          <button onClick={handleAddDataSource}>Add</button>
        </div>
        </div>
        <div className="submitted-data">
          <h3>Your Data Sources:</h3>
          <div>
            {selectedDataSources.map((source, index) => (
              <p key={index} className="data-source">
                <span className="bold">{source}</span>
              </p>
            ))
          }
          </div>
        </div>
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

