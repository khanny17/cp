import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import PlanView from './components/plan-view';
import Header from './components/header';

const App = ({ plan }) => (
  <div className="App" style={{ display: 'flex', flexFlow: 'column' }}>
    <Header />
    <PlanView plan={plan}/>
  </div>
);

App.propTypes = { plan: PropTypes.string };

const AppContainer = connect(
  state => ({ plan: state.plan.plan }),
  dispatch => ({}),
)(App);

export default AppContainer;
