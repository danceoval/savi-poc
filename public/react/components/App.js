import React, {useState} from 'react';

import { QuestionForm } from './QuestionForm'
import { Chatbot } from './Chatbot';
import logo from '../images/logo.svg'


export const App = () => {
  const states = ['survey', 'use-case', 'project', 'plan', 'next'];

  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([])
  const [user, setUser] = useState('manager')
  const [stateIdx, setStateIdx] = useState(0)
  const [success, setSuccess] = useState(false);
  return (
    <div className="App">
      <img src={logo} id="logo" />
      {
        stateIdx === 0 ? < QuestionForm setInfo={setInfo} setStateIdx={setStateIdx}/> : < Chatbot setStateIdx={setStateIdx} stateIdx={stateIdx} />
      }

    </div>
  );
}


