import React, {useState} from 'react';

import { QuestionForm } from './QuestionForm'
import { Chatbot } from './Chatbot';


export const App = () => {
  
  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([])

  console.log("INFO: ", info)
  return (
    <div className="App">
      <h1>Chat w/ Savi</h1>
      {
        view == 'survey' ?  < QuestionForm setView={setView} setInfo={setInfo}/> : < Chatbot />
      }
    </div>
  );
}


