import React, {useState} from 'react';


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
  const plan = [...props.messages].slice(-1);
  const toolArr = props.tools || ["Vertex AI", "Sentiment Analysis"];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
      <div className="input-container">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Submit Evidence</button>
      </div>
    </div>
  );
};
