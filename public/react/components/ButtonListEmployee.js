import React from 'react';

export const ButtonListEmployee = (props) => {

  return (
    <div>
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
