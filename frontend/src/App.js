import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import BrowseView from './components/browse-view';
import PlanView from './components/plan-view';
import Header from './components/header';

const App = () => (
  <div className="App" style={{ display: 'flex', flexFlow: 'column' }}>
    <Header />
    <Switch>
      <Route exact path="/" component={BrowseView} />
      <Route exact path="/plan" component={PlanView} />
    </Switch>
  </div>
);

export default App;
