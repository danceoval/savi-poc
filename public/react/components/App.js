import React, {useState} from 'react';

import { QuestionForm } from './QuestionForm'
import { Chatbot } from './Chatbot';
import logo from '../images/logo.svg'

export const App = () => {
  
  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([])

  return (
    <div className="App">
      <img src={logo} id="logo" />
      {
        view == 'survey' ?  < QuestionForm setView={setView} setInfo={setInfo}/> : < Chatbot info={info}/>
      }
    </div>
  );
}


