import React from 'react';
import {ButtonListEmployee} from './ButtonListEmployee'
import {ButtonListManager} from './ButtonListManager'


export const ButtonContainer = (props) => {

  return (
    <div className="button-container">
      {
        props.user == 'manager' ? (
          <ButtonListManager stage={props.stage} handleButtonClick={props.handleButtonClick} setuseCase={props.setuseCase}/>
          ) : (
            <ButtonListEmployee stage={props.stage} handleMessageSend={props.handleMessageSend} setNewMessage={props.setNewMessage} newMessage={props.newMessage}/>
          )
      }
    </div>
  );
};
