import React from 'react';


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
  const plan = [...props.messages].slice(-1)
  const toolArr = ["Python Programming", "Google AutoML"]
  return (
    <div>
          {
            toolArr.length ? toolArr.map((el, i) => {
              return <button key={i} onClick={() => props.handleButtonClick(el)}>Ask Savi about {el}</button>
            }) : null
          }
            <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={props.newMessage}
            onChange={(e) => props.setNewMessage(e.target.value)}
          />
          <button onClick={props.handleMessageSend}>Ask Savi a Question</button>
        </div>
    </div>
  );
};
