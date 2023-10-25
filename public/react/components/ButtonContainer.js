import React, { useState, useRef } from 'react';

export const ButtonContainer = (props) => {
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleError = (message) => {
    setError(message);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleFileInputChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      let fileType = file.name.substr(file.name.length - 3);
      if (fileType === 'pdf') {
        props.submitEvidence(file);
      } else {
        const txt = 'placeholder for bad upload';
        handleError(txt);
      }

      event.target.value = null;
    }
  };

  const renderButtons = () => {
    switch (props.stateIdx) {
      case 1:
        return (
          <div>
            <button onClick={props.handleButtonClick}>
              Agree
            </button>
            <button >
              Recommend another suitable use case
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="evidence-container">
              <button onClick={props.handleButtonClick}>
                Let's Get Started
              </button>

            </div>
          </div>
        );
      case 3:
        return (
          <div className="evidence-container">
            <button onClick={handleFileInputChange}>Submit Evidence</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        );
      default:
        return <h1>Error</h1>;
    }
  };

  return (
    <div className="button-container">
      {error && (
        <div className="error-message" onClick={handleCloseError}>
          {error}
        </div>
      )}
      {renderButtons()}
    </div>
  );
};
