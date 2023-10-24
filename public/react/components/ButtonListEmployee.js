import React, {useState, useRef} from 'react';


function extractRecommendedTools(inputArr) {
  console.log("INPUT", inputArr)
  const inputString = inputArr[inputArr.length - 1]
  console.log("INPUT STR", inputString)
  const startIndex = inputString.indexOf("Technologies:") + "Technologies:".length;
  const recommendedText = inputString.substring(startIndex).trim();
  const recommendedArray = recommendedText.split('-').map(item => item.trim());

  return recommendedArray;
}

export const ButtonListEmployee = (props) => {
  console.log("INN EMPLOYEEEE ", props.stage)
  const plan = [...props.messages].slice(-1);
  const toolArr = props.tools || ["Vertex AI", "Sentiment Analysis"];

  const [selectedFile, setSelectedFile] = useState(null);

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
      if(fileType === 'pdf'){
        props.submitEvidence(file);
      } else {
        alert("ERROR PLEASE SUBMIT A PDF")
      }
      
      // Clear the file input
      event.target.value = null;
    }
  };

  return (
    <div>

      {/* Add the "Submit Evidence" button and file input */}
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
