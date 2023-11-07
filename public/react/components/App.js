import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom'; // Import Switch, Route, and Link from react-router-dom
import { QuestionForm } from './QuestionForm';
import { DataForm } from './DataForm';
import { ImplementationContainer } from './ImplementationContainer';
import { Dashboard } from './Dashboard';
import logo from '../images/logo.svg';

const App = () => {
  const states = ['survey', 'use-case', 'plan', 'next'];

  const [view, setView] = useState('survey');
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState('manager');
  const [stateIdx, setStateIdx] = useState(0);
  const [success, setSuccess] = useState(false);

  return (
    <div className="App">
      <nav>
        <div className="nav-menu">
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>
      <img src={logo} id="logo" />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          {(() => {
            switch (stateIdx) {
              case 0:
                return <QuestionForm setInfo={setInfo} setStateIdx={setStateIdx} />;
              case 1:
                return <DataForm setStateIdx={setStateIdx} stateIdx={stateIdx} />;
              default:
                return <ImplementationContainer setStateIdx={setStateIdx} stateIdx={stateIdx} />;
            }
          })()}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
