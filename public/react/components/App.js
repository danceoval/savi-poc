import React, {useState} from 'react';

import { ManagerView } from './ManagerView'
import { EmployeeView } from './EmployeeView'

import logo from '../images/logo.svg'

export const App = () => {
  
  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([])
  const [user, setUser] = useState('manager')

  return (
    <div className="App">
      <img src={logo} id="logo" />
      {
        user == "manager" ? <ManagerView setView={setView} setInfo={setInfo} info={info} user={user} view={view} setUser={setUser} /> : <EmployeeView info={info} user={user} setUser={setUser}/>
      }
    </div>
  );
}


