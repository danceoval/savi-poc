import React, {useState} from 'react';
import { QuestionForm } from './QuestionForm'
import { Chatbot } from './Chatbot';

export const ManagerView = (props) => {
console.log("MANGER PROPS ", props)
  return (
    <div>
      {
        props.view == 'survey' ?  < QuestionForm setView={props.setView} setInfo={props.setInfo}/> : < Chatbot info={props.info} user={props.user} setUser={props.setUser}/>
      }
    </div>
  );
};
