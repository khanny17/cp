import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import PlanView from './components/plan-view';

const App = ({ plan }) => (
  <div className="App" style={{ display: 'flex', flexFlow: 'column' }}>
    <header className="App-header" style={{ flex: '0 0 auto' }}>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <PlanView plan={plan}/>
  </div>
);

App.propTypes = { plan: PropTypes.string };

const AppContainer = connect(
  state => ({ plan: state.plan.plan }),
  dispatch => ({}),
)(App);

export default AppContainer;
