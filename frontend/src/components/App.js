import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import '../css/App.css';
import Private from './private';
import Home from '../pages/home';
import Plan from '../pages/plan';
import Landing from '../pages/landing';
import LoginPage from './login-page';


const App = () => (
  <div className="App" style={{ display: 'flex', flexFlow: 'column' }}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/plan/:id?" component={Plan} />
      <Private>
        <Route exact path="/home" component={Home} />
      </Private>
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
