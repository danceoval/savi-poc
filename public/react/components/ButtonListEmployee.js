import React, {useState, useRef} from 'react';
import {Toast} from './Toast'


export const ButtonListEmployee = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
  };

  const handleCloseError = () => {
    setError(null);
  };


  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Identify if file is correct or not
      let fileType = file.name.substr((file.name).length - 3)
      console.log("FILLE Type", fileType)
      if(fileType === 'pdf'){
        props.submitEvidence(file);
      } else {
        //props.submitBadEvidence(file);
        const txt = `Please correct the following mistakes in your submission:
          </br> 1) Data Curation: Submission does not match current user’s organization 
          </br> 2) Data Formatting: Please ensure submission is a .pdf file
        `;
        handleError(txt)
      }

      // Clear the file input
      event.target.value = null;
    }
  };

  return (
    <div>
    {error && <Toast message={error} onClose={handleCloseError} />}
       {
        props.stage == 'Show' ? (
          <div className="evidence-container">
            <button onClick={props.startPlan}>Let's Get Started</button>
          </div>

        ) : (
          <div className="evidence-container">
            <button onClick={handleFileInputChange}>Submit Evidence</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

        )
       }

    </div>
  );
};
