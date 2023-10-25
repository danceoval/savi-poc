import React, {useState} from 'react';

import { QuestionForm } from './QuestionForm'
import { Chatbot } from './Chatbot';
import logo from '../images/logo.svg'


export const App = () => {
  const states = ['survey', 'use-case', 'project', 'plan'];

  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([])
  const [user, setUser] = useState('manager')
  const [stateIdx, setStateIdx] = useState(0)

  return (
    <div className="App">
      State Idx:  {stateIdx} Current Stage:  {states[stateIdx]}
      <img src={logo} id="logo" />
      {
        stateIdx === 0 ? < QuestionForm setInfo={setInfo} setStateIdx={setStateIdx}/> : < Chatbot  setStateIdx={setStateIdx} stateIdx={stateIdx} />
      }

    </div>
  );
}


