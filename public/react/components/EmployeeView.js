import React, {useState} from 'react';
import { Chatbot } from './Chatbot';

export const EmployeeView = (props) => {
  return (
    <div>
       < Chatbot info={props.info} user={props.user} setUser={props.setUser}/>
    </div>
  );
};
