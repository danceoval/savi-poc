import React, {useState} from 'react';

import { QuestionForm } from './QuestionForm'
import { Chatbot } from './Chatbot';


export const App = () => {
  const [view, setView] = useState('survey');
  return (
    <div className="App">
      <h1>Chat w/ Savi</h1>
      {
        view == 'survey' ?  < QuestionForm setView={setView}/> : < Chatbot />
      }
    </div>
  );
}


