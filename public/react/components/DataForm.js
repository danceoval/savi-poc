import React, { useState } from 'react';

export const DataForm = (props) => {
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [submittedDataSources, setSubmittedDataSources] = useState([]);
  const commonDataSources = [
    "US Census Bureau: general population data",
    "Bureau of Labor Statistics: labor data",
    "Data.gov: open Data sources by the U.S. government ",
    "Nielsen: market research data"
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
    <div className="data-form">
      <h3>I can help you with that.</h3>
      <p>Could you state relevant data sources? Here are some common data sources:</p>
      {commonDataSources.map((source) => (
        <p key={source} className="highlight data-source">
          <input
            type="checkbox"
            checked={selectedDataSources.includes(source)}
            onChange={() => handleCheckBoxChange(source)}
          />
          {source}
        </p>
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
      <div className="submitted-data">
        <h3>Your Data Sources:</h3>
        <div>
          {selectedDataSources.map((source, index) => (
            <p key={index} className="data-source">
              {source}
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

