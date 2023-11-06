import React, { useState, useRef } from 'react';

export const ButtonContainer = (props) => {
  const fileInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(false)

  const handleFileInputChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    props.setLoadingState(true);
    if (file) {
      props.setFileName(`Selected file: ${file.name}`);
      let fileType = file.name.substr(file.name.length - 3);
      if (fileType === 'pdf') {
        setTimeout(() => {
          props.setLoadingState(false);
          props.setError(null); 
          props.submitEvidence(file);
        }, 3700);
      } else {
        setTimeout(() => {
          const txt = `
          <h4>Please correct the following mistakes in your submission:</h4>
          <p>1. Data Curation: You mentioned you work in financial services; however, this is not reflected in the wiki page you've submitted. Are you scraping the page for the correct company?</p>
          <p>2. Data Formatting: The file you submitted is of the wrong format. Please ensure submission is a .pdf file</p>
          <p>3. Submission Completeness: The file submitted does not seem to reflect a complete HTML page. Check to make sure your Python is also scraping the page's body, not just the metadata</p>
          `;
          props.setLoadingState(false); 
          props.setError(txt);
        }, 3500);
      }

      event.target.value = null;
    }
  };

  const renderButtons = () => {
    switch (props.stateIdx) {
      case 2:
        return (
          <div>
            <button onClick={props.handleButtonClick}>
              Agree
            </button>
            <button >
              Refine suggestion
            </button>
          </div>
        );
      case 3:
        return (
          <div className="evidence-container">
            {props.fileName && (<h4 className="highlight">{props.fileName}</h4>)}
            <button onClick={handleFileInputChange}>{props.submitMsg}</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h4 className="highlight">Well Done!</h4>
            <div className="evidence-container">
              <button onClick={props.handleButtonClick}>
                Begin Next Stage
              </button>
            </div>
          </div>
        );
      default:
        return <h1>Error</h1>;
    }
  };

  return (
    <div className="button-container">
      {props.error && (
        <div className="error-message" dangerouslySetInnerHTML={{ __html: props.error }}></div>
      )}
      {renderButtons()}
    </div>
  );
};
