import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import App from './components/App'; // Correctly import the App component
import Dashboard from './components/Dashboard'; // Correctly import the DashboardHeader component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
