import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlanView from './components/plan-view';
import uuidv4 from 'uuid/v4';

let plan = {
  name: 'Plan',
  years: [{
    name: 'Year 1',
    terms: [{
      name: 'Term 1',
      courses: [{
        name: 'Course 1',
      }],
    }],
  }]
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <PlanView plan={plan} />
      </div>
    );
  }
}

export default App;
