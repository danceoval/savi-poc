import React from 'react';
import { ButtonListEmployee } from './ButtonListEmployee'; // Make sure to provide the correct path to your components
import { ButtonListManager } from './ButtonListManager'; // Make sure to provide the correct path to your components

export const ButtonContainer = (props) => {
  return (
    <div className="button-container">
      {props.stage === 'Discovery' || props.stage === 'Show' ? (
        <ButtonListManager
          handleButtonClick={props.handleButtonClick}
          stage={props.stage}
        />
      ) : (
        <ButtonListEmployee
          handleButtonClick={props.handleButtonClick}
          stage={props.stage}
          messages={props.messages}
          tools={props.tools}
        />
      )}
    </div>
  );
};
