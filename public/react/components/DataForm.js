import React, { useState } from 'react';

export const DataForm = (props) => {
  const [dataSources, setDataSources] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [submittedDataSources, setSubmittedDataSources] = useState([]);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddDataSource = () => {
    if (inputValue.trim() !== '') {
      setDataSources([...dataSources, inputValue]);
      setInputValue('');
    }
  };

  const handleSubmit = () => {
    setSubmittedDataSources(dataSources);
    props.setStateIdx(props.stateIdx + 1);
  };

  return (
    <div className="data-form">
      <h3>I can help you with that.</h3> 
      <p>Could you state relevant data sources? Here are some common data sources:</p>
        <p className="highlight data-source">- US Census Bureau</p >
        <p className="highlight data-source">- Bureau of Labor Statistics</p>
        <p className="highlight data-source">- Data.gov</p>
        <p className="highlight data-source">- Nielson</p>
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
          {dataSources.map((source, index) => (
            <p key={index} className="data-source">{source}</p>
          ))}
        </div>
      </div>
      <button className="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};
