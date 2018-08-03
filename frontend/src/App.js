import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Private from './components/private';
import BrowseView from './components/browse-view';
import PlanView from './components/plan-view';
import Landing from './components/landing';

const App = () => (
  <div className="App" style={{ display: 'flex', flexFlow: 'column' }}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/plan/:id?" component={PlanView} />
      <Private>
        <Route exact path="/browse" component={BrowseView} />
      </Private>
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
