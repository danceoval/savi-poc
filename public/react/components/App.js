import React, {useState} from 'react';

import { QuestionForm } from './QuestionForm'
import { DataForm } from './DataForm'
import { Chatbot } from './Chatbot';
import logo from '../images/logo.svg'


export const App = () => {
  const states = ['survey', 'use-case', 'plan', 'next'];

  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([])
  const [user, setUser] = useState('manager')
  const [stateIdx, setStateIdx] = useState(0)
  const [success, setSuccess] = useState(false);
  return (
    <div className="App">
      <img src={logo} id="logo" />
      {(() => {
        switch(stateIdx){
          case 0:
            return < QuestionForm setInfo={setInfo} setStateIdx={setStateIdx}/>
          case 1:
            return <DataForm setStateIdx={setStateIdx} stateIdx={stateIdx}/>
          default:
            return < Chatbot setStateIdx={setStateIdx} stateIdx={stateIdx} />
        }
      })()}
    </div>
  );
}


