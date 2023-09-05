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
      // Invoke the submitEvidence function with the selected file
      props.submitEvidence(file);
      // Clear the file input
      event.target.value = null;
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Invoke the submitEvidence function with the selected file
      props.submitEvidence(selectedFile);
      // Clear the selected file
      setSelectedFile(null);
    }
  };

  return (
    <div>
      {toolArr.length ? (
        toolArr.map((el, i) => (
          <button key={i} onClick={() => props.handleButtonClick(el)}>
            Ask Savi about {el}
          </button>
        ))
      ) : null}
{/*      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={props.newMessage}
          onChange={(e) => props.setNewMessage(e.target.value)}
        />
        <button onClick={props.handleMessageSend}>Ask Savi a Question</button>
      </div>*/}
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
              accept=".pdf"
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
